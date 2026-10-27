"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function HeroStage({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const element = track.current;
      if (!element) return;
      const range = element.offsetHeight - window.innerHeight;
      const traveled = Math.min(Math.max(-element.getBoundingClientRect().top, 0), Math.max(range, 0));
      setProgress(range > 0 ? traveled / range : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={track} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Image
          src="/images/hero-home.jpg"
          alt="Gün batımında modern bir yaşam alanı"
          fill
          priority
          className="object-cover object-center"
          style={{ transform: `scale(${1 + progress * 0.18})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="relative flex h-full flex-col px-5 pt-[140px] pb-16 md:px-[70px]">{children}</div>
      </div>
    </div>
  );
}
