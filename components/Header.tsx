"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HoverText from "@/components/HoverText";
import { nav } from "@/data/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[120px] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[140px] ${
          solid
            ? "border-line/70 bg-[#F3F5F7]/95 shadow-[0_6px_24px_rgba(23,36,58,0.06)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center px-5 md:px-16">
          <Link href="/" className="relative z-10 block h-12 shrink-0">
            <Image
              src="/images/logo-dark.png"
              alt="CMK Holding"
              width={237}
              height={96}
              className={`h-12 w-auto transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                overHero ? "opacity-0" : "opacity-100"
              }`}
              style={{ width: "auto", height: "48px" }}
              priority
              sizes="118px"
              quality={100}
            />
            <Image
              src="/images/logo-gold.png"
              alt=""
              aria-hidden
              width={237}
              height={96}
              className={`pointer-events-none absolute inset-0 h-12 w-auto transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                overHero ? "opacity-100" : "opacity-0"
              }`}
              style={{ width: "auto", height: "48px" }}
              priority
              sizes="118px"
              quality={100}
            />
          </Link>

          <nav
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex ${open ? "invisible" : ""}`}
            aria-label="Ana menü"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-base font-normal leading-6 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${linkColor} ${
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
            className={`relative z-10 ml-auto grid h-12 w-12 place-items-center transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              overHero ? "bg-white text-black" : "bg-[#B58A5A] text-white"
            }`}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-6 flex-col gap-1.5">
              <span className={`h-px w-full bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
          <motion.button
            type="button"
            aria-label="Menüyü kapat"
            className="fixed inset-0 z-40 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={() => setOpen(false)}
          />
          <motion.nav
            aria-label="Menü"
            className="fixed top-0 right-0 z-40 flex h-full w-[min(420px,100%)] flex-col justify-center gap-6 bg-[#17243A] px-10 text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + index * 0.06, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={`text-4xl ${isActive(pathname, item.href) ? "text-gold underline decoration-2 underline-offset-8" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <HoverText text={item.label} />
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
