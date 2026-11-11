"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

type HeroStageProps = {
  children: ReactNode;
  image?: string;
  alt?: string;
  /** focal point — homepage art sits on the right with open sky on the left */
  objectPosition?: string;
};

export default function HeroStage({
  children,
  image = "/images/hero-home.jpg",
  alt = "Gün batımında modern bir yaşam alanı",
  objectPosition = "72% center",
}: HeroStageProps) {
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
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{
            objectPosition,
            transform: `scale(${1 + progress * 0.12})`,
          }}
        />
        {/* Soft left wash so white type stays readable without muddying the building */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.14) 100%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-end px-5 pb-[14vh] pt-[140px] md:px-16 md:pb-[16vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
