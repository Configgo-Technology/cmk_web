"use client";

import { useEffect, useRef, useState } from "react";

type MapEmbedProps = {
  src: string;
  title: string;
  className?: string;
  iframeClassName?: string;
};

/**
 * Defers mounting Google Maps iframes until hydration, page transitions, and the
 * preloader have settled and the container is near the viewport, then fades the
 * iframe in on load. This prevents Chromium WebGL/OOPIF compositing glitches,
 * white flashes, and layout jank on initial load or refresh.
 */
export default function MapEmbed({
  src,
  title,
  className = "",
  iframeClassName = "",
}: MapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageReady, setPageReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const root = document.documentElement;
    const isBusy = () =>
      root.dataset.preloader === "active" || root.classList.contains("is-transitioning");

    let frame = 0;
    let fallbackTimer = 0;

    const markReady = () => {
      window.clearTimeout(fallbackTimer);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPageReady(true);
      });
    };

    if (!isBusy()) {
      markReady();
      return () => {
        cancelAnimationFrame(frame);
      };
    }

    const onEvent = () => {
      if (!isBusy()) {
        markReady();
      }
    };

    window.addEventListener("cmk:preloader-leave", onEvent);
    window.addEventListener("cmk:page-ready", onEvent);
    fallbackTimer = window.setTimeout(markReady, 2200);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("cmk:preloader-leave", onEvent);
      window.removeEventListener("cmk:page-ready", onEvent);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldMount = pageReady && inView;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden [contain:layout_paint] ${className}`}
    >
      {shouldMount ? (
        <iframe
          title={title}
          src={src}
          onLoad={() => setLoaded(true)}
          className={`block h-full w-full border-0 transition-opacity duration-500 ease-[var(--ease-calm)] ${
            loaded ? "opacity-100" : "opacity-0"
          } ${iframeClassName}`}
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}
