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
  const onLightHero = pathname === "/";
  const solid = scrolled || open;
  const linkColor = solid || onLightHero ? "text-[#17243A]" : "text-white";

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
      <header className={`fixed inset-x-0 top-0 z-50 h-[120px] ${solid ? "bg-[#F3F5F7]" : "bg-transparent"}`}>
        <div className="mx-auto flex h-full max-w-[1440px] items-center px-5 md:px-[70px]">
          <Link href="/" className="relative z-10 block shrink-0">
            <Image
              src="/images/logo-gold.png"
              alt="CMK Holding"
              width={56}
              height={48}
              className="h-12 w-auto"
              style={{ width: "auto", height: "48px" }}
              priority
            />
          </Link>

          <nav className={`ml-[104px] hidden items-center gap-4 md:flex ${open ? "invisible" : ""}`} aria-label="Ana menü">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-normal leading-6 ${linkColor} ${
                  isActive(pathname, item.href)
                    ? "underline decoration-[#B58A5A] decoration-2 underline-offset-[10px]"
                    : ""
                }`}
              >
                <HoverText text={item.label} />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="relative z-10 ml-auto grid h-12 w-12 place-items-center bg-[#B58A5A] text-white"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-6 flex-col gap-1.5">
              <span className={`h-px w-full bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
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
                  className={`text-4xl ${isActive(pathname, item.href) ? "text-gold" : ""}`}
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
