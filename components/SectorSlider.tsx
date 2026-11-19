"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sectorSlides } from "@/data/site";

export default function SectorSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = sectorSlides.length;
  const slide = sectorSlides[index];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const go = (step: number) => setIndex((value) => (value + step + count) % count);

  return (
    <div
      className="relative overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[21/9] w-full md:aspect-[2.6/1]">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              priority={index === 0}
              sizes="(min-width: 1440px) 1300px, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-5 py-5 md:px-8 md:py-7">
              <p className="text-lg font-medium tracking-[-0.02em] text-white md:text-2xl">{slide.label}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Önceki sektör"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center bg-gold text-lg text-white md:left-5"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Sonraki sektör"
          onClick={() => go(1)}
          className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center bg-gold text-lg text-white md:right-5"
        >
          →
        </button>

        <div className="absolute right-5 bottom-5 flex gap-2 md:right-8 md:bottom-7">
          {sectorSlides.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              aria-label={item.label}
              onClick={() => setIndex(itemIndex)}
              className={`h-2.5 w-2.5 rounded-full ${itemIndex === index ? "bg-gold" : "bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
