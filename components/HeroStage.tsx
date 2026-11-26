"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

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
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let lastProgress = -1;
    let range = 0;

    const measure = () => {
      const element = track.current;
      range = element ? Math.max(element.offsetHeight - window.innerHeight, 0) : 0;
    };

    const update = () => {
      rafId = 0;
      const media = mediaRef.current;
      if (!media) return;
      const traveled = Math.min(Math.max(window.scrollY, 0), range);
      const progress = range > 0 ? traveled / range : 0;
      if (progress === lastProgress) return;
      lastProgress = progress;
      media.style.transform = `scale3d(${1 + progress * 0.1}, ${1 + progress * 0.1}, 1)`;
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={track} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
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
