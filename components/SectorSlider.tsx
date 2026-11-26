"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { sectorSlides } from "@/data/site";

const SWIPE_THRESHOLD_PX = 40;

export default function SectorSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const count = sectorSlides.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((value) => (value + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, inView, count]);

  const go = (step: number) => setIndex((value) => (value + step + count) % count);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    if (event.target instanceof Element && event.target.closest("button")) return;
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return (
    <div
      ref={rootRef}
      className="img-zoom-wrap relative overflow-hidden bg-ink"
      style={{ "--img-zoom-scale": 1.025 } as CSSProperties}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPaused(false);
      }}
    >
      <div
        className="relative aspect-[21/9] w-full touch-pan-y md:aspect-[2.6/1]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
      >
        {sectorSlides.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <div
              key={item.src}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[550ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
                active ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                priority={itemIndex === 0}
                sizes="(min-width: 1440px) 1300px, 100vw"
                className="object-cover img-zoom"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-5 py-5 md:px-8 md:py-7">
                <p className="text-lg font-medium tracking-[-0.02em] text-white md:text-2xl">{item.label}</p>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Önceki sektör"
          onClick={() => go(-1)}
          className="btn-cmk btn-cmk-gold group absolute top-1/2 left-3 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center text-lg md:left-5"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden>
            ←
          </span>
        </button>
        <button
          type="button"
          aria-label="Sonraki sektör"
          onClick={() => go(1)}
          className="btn-cmk btn-cmk-gold group absolute top-1/2 right-3 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center text-lg md:right-5"
        >
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </button>

        <div className="absolute right-5 bottom-5 z-10 flex gap-2 md:right-8 md:bottom-7">
          {sectorSlides.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              aria-label={item.label}
              aria-pressed={itemIndex === index}
              onClick={() => setIndex(itemIndex)}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                itemIndex === index ? "scale-110 bg-gold" : "bg-white/70 hover:scale-125 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
