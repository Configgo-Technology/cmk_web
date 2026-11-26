"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "li"
  | "span"
  | "figure"
  | "aside"
  | "nav"
  | "p"
  | "ul";

export type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale";

type ObserverEntryHandler = {
  once: boolean;
  onChange: (isIntersecting: boolean) => void;
};

let sharedObserver: IntersectionObserver | null = null;
const observedHandlers = new WeakMap<Element, ObserverEntryHandler>();
const pendingElements = new Set<Element>();
let bottomGuardAttached = false;
let bottomGuardRaf = 0;

function revealElement(el: Element, observer: IntersectionObserver | null) {
  const handler = observedHandlers.get(el);
  if (!handler) {
    pendingElements.delete(el);
    return;
  }
  handler.onChange(true);
  if (handler.once) {
    observer?.unobserve(el);
    observedHandlers.delete(el);
    pendingElements.delete(el);
  }
}

function detachBottomGuardIfIdle() {
  if (!bottomGuardAttached || pendingElements.size > 0 || typeof window === "undefined") return;
  window.removeEventListener("scroll", scheduleBottomCheck);
  window.removeEventListener("resize", scheduleBottomCheck);
  cancelAnimationFrame(bottomGuardRaf);
  bottomGuardRaf = 0;
  bottomGuardAttached = false;
}

function checkBottomEdgeElements() {
  bottomGuardRaf = 0;
  if (pendingElements.size === 0 || typeof window === "undefined") {
    detachBottomGuardIfIdle();
    return;
  }

  const viewportHeight = window.innerHeight;
  const nearPageBottom = window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 48;
  if (!nearPageBottom) return;

  const toReveal: Element[] = [];
  for (const el of pendingElements) {
    if (el.getBoundingClientRect().top <= viewportHeight + 8) {
      toReveal.push(el);
    }
  }
  for (const el of toReveal) {
    revealElement(el, sharedObserver);
  }
  detachBottomGuardIfIdle();
}

function scheduleBottomCheck() {
  if (bottomGuardRaf !== 0 || typeof window === "undefined") return;
  bottomGuardRaf = requestAnimationFrame(checkBottomEdgeElements);
}

function ensureBottomGuard() {
  if (bottomGuardAttached || typeof window === "undefined") return;
  bottomGuardAttached = true;
  window.addEventListener("scroll", scheduleBottomCheck, { passive: true });
  window.addEventListener("resize", scheduleBottomCheck, { passive: true });
}

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          const handler = observedHandlers.get(entry.target);
          if (!handler) continue;
          if (entry.isIntersecting || (handler.once && entry.boundingClientRect.bottom <= 0)) {
            revealElement(entry.target, observer);
          } else if (!handler.once) {
            handler.onChange(false);
          }
        }
        detachBottomGuardIfIdle();
      },
      { rootMargin: "0px 0px -36px 0px", threshold: 0.01 },
    );
  }
  return sharedObserver;
}

let reducedMotionMql: MediaQueryList | null = null;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (!reducedMotionMql) {
    reducedMotionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return reducedMotionMql.matches;
}

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration,
  once = true,
  immediate = false,
  as: Tag = "div",
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  style,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  immediate?: boolean;
  as?: RevealTag;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (once && el.dataset.revealed === "true") {
      return;
    }

    if (prefersReducedMotion()) {
      el.dataset.revealed = "true";
      return;
    }

    if (immediate) {
      let frame1 = 0;
      let frame2 = 0;
      let fallbackTimer = 0;

      const trigger = () => {
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
        frame1 = requestAnimationFrame(() => {
          frame2 = requestAnimationFrame(() => {
            el.dataset.revealed = "true";
          });
        });
      };

      const root = document.documentElement;
      const waitForPreloader = root.dataset.preloader === "active";
      const waitForTransition = root.classList.contains("is-transitioning");

      if (!waitForPreloader && !waitForTransition) {
        trigger();
        return () => {
          cancelAnimationFrame(frame1);
          cancelAnimationFrame(frame2);
        };
      }

      const eventName = waitForPreloader ? "cmk:preloader-leave" : "cmk:page-ready";
      const onReady = () => {
        window.clearTimeout(fallbackTimer);
        window.removeEventListener(eventName, onReady);
        trigger();
      };

      window.addEventListener(eventName, onReady, { once: true });
      fallbackTimer = window.setTimeout(onReady, waitForPreloader ? 1800 : 750);

      return () => {
        window.clearTimeout(fallbackTimer);
        window.removeEventListener(eventName, onReady);
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    }

    const observer = getSharedObserver();
    if (!observer) {
      el.dataset.revealed = "true";
      return;
    }

    observedHandlers.set(el, {
      once,
      onChange: (visible) => {
        if (visible) {
          el.dataset.revealed = "true";
        } else {
          delete el.dataset.revealed;
        }
      },
    });
    pendingElements.add(el);
    ensureBottomGuard();
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observedHandlers.delete(el);
      pendingElements.delete(el);
      detachBottomGuardIfIdle();
    };
  }, [once, immediate]);

  const hasCustomMotion = delay > 0 || duration !== undefined;
  const motionStyle: CSSProperties | undefined =
    style || hasCustomMotion
      ? {
          ...style,
          ...(delay > 0 ? ({ "--motion-delay": `${delay}ms` } as CSSProperties) : null),
          ...(duration !== undefined ? ({ "--motion-duration": `${duration}ms` } as CSSProperties) : null),
        }
      : undefined;

  return (
    <Tag
      ref={ref as never}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-reveal={variant}
      className={className ? `motion-reveal ${className}` : "motion-reveal"}
      style={motionStyle}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
