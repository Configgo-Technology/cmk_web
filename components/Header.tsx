"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HoverText from "@/components/motion/HoverText";
import { nav } from "@/data/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const onDarkHero =
    pathname === "/" ||
    pathname === "/kurumsal" ||
    pathname === "/projeler" ||
    pathname.startsWith("/projeler/") ||
    pathname === "/iletisim";
  const solid = scrolled || open;
  const overHero = onDarkHero && !solid;
  const linkColor = overHero ? "text-white" : "text-[#17243A]";
  const activeRule = overHero ? "after:bg-white" : "after:bg-[#B58A5A]";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onNavigateStart = () => setOpen(false);
    window.addEventListener("cmk:navigate-start", onNavigateStart);
    return () => window.removeEventListener("cmk:navigate-start", onNavigateStart);
  }, []);

  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.setProperty("--scrollbar-comp", `${scrollbarWidth}px`);
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.removeProperty("--scrollbar-comp");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="site-header fixed inset-x-0 top-0 z-50 h-[120px] md:h-[140px]"
        style={{ paddingRight: "var(--scrollbar-comp, 0px)" }}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 border-b border-line/70 bg-[#F3F5F7]/95 shadow-[0_6px_24px_rgba(23,36,58,0.06)] backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-5 md:px-16">
          <Link
            href="/"
            className="relative z-10 block h-16 shrink-0 transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:h-[76px]"
          >
            <Image
              src="/images/cmk-dikey-siyah.png"
              alt="CMK Holding"
              width={1171}
              height={1003}
              className={`h-full w-auto transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                overHero ? "opacity-0" : "opacity-100"
              }`}
              style={{ width: "auto" }}
              priority
              sizes="(min-width: 768px) 89px, 75px"
              quality={100}
            />
            <Image
              src="/images/cmk-dikey-beyaz.png"
              alt=""
              aria-hidden
              width={1171}
              height={1003}
              className={`pointer-events-none absolute inset-0 h-full w-auto transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                overHero ? "opacity-100" : "opacity-0"
              }`}
              style={{ width: "auto" }}
              priority
              sizes="(min-width: 768px) 89px, 75px"
              quality={100}
            />
          </Link>

          <nav
            aria-label="Ana menü"
            aria-hidden={open}
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? -1 : undefined}
                className={`relative text-base font-normal leading-6 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${linkColor} ${
                  isActive(pathname, item.href)
                    ? `after:absolute after:right-0 after:left-0 after:-bottom-3 after:h-0.5 after:transition-colors after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] ${activeRule}`
                    : ""
                }`}
              >
                <HoverText text={item.label} />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={`btn-cmk group relative z-10 ml-auto grid h-12 w-12 place-items-center ${
              overHero ? "btn-cmk-light" : "btn-cmk-gold"
            }`}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`relative block h-4 w-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "group-hover:rotate-90" : ""
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute inset-y-0 left-0 my-auto h-[1.5px] w-full origin-center rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open
                    ? "[transform:translate3d(0,0,0)_rotate(45deg)]"
                    : "[transform:translate3d(0,-6px,0)_rotate(0deg)]"
                }`}
              />
              <span
                className={`absolute inset-y-0 left-0 my-auto h-[1.5px] w-full origin-right rounded-full bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open
                    ? "opacity-0 [transform:scaleX(0)]"
                    : "opacity-100 [transform:scaleX(1)] group-hover:[transform:scaleX(0.68)]"
                }`}
              />
              <span
                className={`absolute inset-y-0 left-0 my-auto h-[1.5px] w-full origin-center rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open
                    ? "[transform:translate3d(0,0,0)_rotate(-45deg)]"
                    : "[transform:translate3d(0,6px,0)_rotate(0deg)]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <button
        type="button"
        aria-label="Menüyü kapat"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        data-open={open ? "true" : "false"}
        className="menu-backdrop fixed inset-0 z-40 bg-black/55"
        onClick={() => setOpen(false)}
      />

      <nav
        aria-label="Menü"
        aria-hidden={!open}
        data-open={open ? "true" : "false"}
        className="menu-drawer fixed top-0 right-0 z-40 flex h-full w-[min(420px,100%)] flex-col justify-center gap-6 bg-[#17243A] px-10 text-white"
      >
        {nav.map((item, index) => (
          <div
            key={item.href}
            className="menu-drawer-item"
            style={open ? { transitionDelay: `${140 + index * 50}ms` } : undefined}
          >
            <Link
              href={item.href}
              tabIndex={open ? undefined : -1}
              className={`inline-block text-4xl transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${isActive(pathname, item.href) ? "text-gold underline decoration-2 underline-offset-8" : ""}`}
              onClick={() => setOpen(false)}
            >
              <HoverText text={item.label} />
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
}
