"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const EXIT_MS = 600;
const ENTER_MS = 600;
const ENTER_READY_MS = 420;

function sameDocument(url: URL) {
  return url.origin === window.location.origin;
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const shell = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const pending = useRef(false);
  const exitTimer = useRef(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const url = new URL(href, window.location.href);
      if (!sameDocument(url)) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (reducedMotion()) return;
      if (pending.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      pending.current = true;
      window.dispatchEvent(new Event("cmk:navigate-start"));
      document.documentElement.classList.add("is-transitioning");
      shell.current?.classList.remove("page-enter");
      shell.current?.classList.add("page-exit");
      const next = `${url.pathname}${url.search}${url.hash}`;
      window.clearTimeout(exitTimer.current);
      exitTimer.current = window.setTimeout(() => {
        router.push(next);
      }, EXIT_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(exitTimer.current);
    };
  }, [router]);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    const node = shell.current;
    if (!node) return;

    window.clearTimeout(exitTimer.current);
    node.classList.remove("page-exit");

    if (reducedMotion()) {
      node.classList.remove("page-enter");
      document.documentElement.classList.remove("is-transitioning");
      pending.current = false;
      window.dispatchEvent(new Event("cmk:page-ready"));
      return;
    }

    node.classList.add("page-enter");
    document.documentElement.classList.add("is-transitioning");

    const readyTimeout = window.setTimeout(() => {
      window.dispatchEvent(new Event("cmk:page-ready"));
    }, ENTER_READY_MS);

    const timeout = window.setTimeout(() => {
      node.classList.remove("page-enter");
      document.documentElement.classList.remove("is-transitioning");
      pending.current = false;
      window.dispatchEvent(new Event("cmk:page-ready"));
    }, ENTER_MS);

    return () => {
      window.clearTimeout(readyTimeout);
      window.clearTimeout(timeout);
      node.classList.remove("page-enter");
      document.documentElement.classList.remove("is-transitioning");
      pending.current = false;
    };
  }, [pathname]);

  return (
    <div ref={shell} className="page-shell">
      {children}
    </div>
  );
}
