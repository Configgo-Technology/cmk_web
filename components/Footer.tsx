"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { contact } from "@/data/site";

const menu = [
  { href: "/", label: "Anasayfa" },
  { href: "/projeler", label: "Projelerimiz" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/kurumsal", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;

const legal = [
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/kullanim-kosullari", label: "Şartlar ve Koşullar" },
] as const;

const social = [
  { href: "https://instagram.com", label: "Instagram", external: true },
  { href: "https://linkedin.com", label: "LinkedIn", external: true },
  { href: contact.phoneHref, label: contact.phone, external: false },
  { href: `mailto:${contact.email}`, label: "E-posta", external: false },
] as const;

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-[1300px] px-5 pt-10 pb-8 md:px-[70px]">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-[100px]">
          <Reveal variant="up">
            <p className="text-sm leading-none tracking-[-0.02em] text-text-gray">MENÜ</p>
            <ul className="mt-[26px] space-y-[12px] text-base leading-none tracking-[-0.02em]">
              {menu.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link href={item.href} className="link-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="up" delay={70}>
            <p className="text-sm leading-none tracking-[-0.02em] text-text-gray">YASAL</p>
            <ul className="mt-[26px] space-y-[12px] text-base leading-none tracking-[-0.02em]">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="text-sm leading-none tracking-[-0.02em] text-text-gray">SOSYAL</p>
            <ul className="mt-[26px] space-y-3 text-base leading-none tracking-[-0.02em]">
              {social.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a href={item.href} className="link-hover" target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <a href={item.href} className="link-hover">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 h-px w-full bg-[#6B7280]/10" />

        <Reveal
          variant="fade"
          delay={120}
          className="mt-8 flex flex-col gap-3 text-sm leading-none tracking-[-0.02em] text-text-gray md:flex-row md:items-center md:justify-between"
        >
          <p>2026 © CMK Holding - Tüm Hakları Saklıdır</p>
          <button
            type="button"
            className="link-hover self-start text-left uppercase md:self-auto md:text-right"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Yukarı Çık
          </button>
        </Reveal>
      </div>
    </footer>
  );
}
