"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const EXIT_MS = 600;
const ENTER_MS = 600;

function sameDocument(url: URL) {
  return url.origin === window.location.origin;
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const shell = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const pending = useRef(false);

  useLayoutEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const first = main.querySelector("section");
    const sections = [...main.querySelectorAll("section")].filter((section) => section !== first);
    const reveal = () => {
      const limit = window.innerHeight * 0.88;
      for (const section of sections) {
        if (section.classList.contains("is-in")) continue;
        if (section.getBoundingClientRect().top < limit) section.classList.add("is-in");
      }
    };
    for (const section of sections) section.classList.add("scroll-reveal");
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    document.addEventListener("scroll", reveal, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", reveal);
      document.removeEventListener("scroll", reveal, { capture: true });
    };
  }, [pathname]);

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
      if (pending.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      pending.current = true;
      document.documentElement.classList.add("is-transitioning");
      shell.current?.classList.remove("page-enter");
      shell.current?.classList.add("page-exit");
      const next = `${url.pathname}${url.search}${url.hash}`;
      window.setTimeout(() => router.push(next), EXIT_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const node = shell.current;
    if (!node) return;
    node.classList.remove("page-exit");
    node.classList.add("page-enter");
    document.documentElement.classList.add("is-transitioning");
    const timeout = window.setTimeout(() => {
      node.classList.remove("page-enter");
      document.documentElement.classList.remove("is-transitioning");
      pending.current = false;
    }, ENTER_MS);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div ref={shell} className="page-shell">
      {children}
    </div>
  );
}
