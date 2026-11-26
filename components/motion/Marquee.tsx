"use client";

import { useEffect, useRef } from "react";

const line = "CMK HOLDING  —  Yaşam Alanları Geleceği Şekillendirir.";
const items = Array.from({ length: 8 }, () => line);

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inView = "true";
        } else {
          delete el.dataset.inView;
        }
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="marquee-shell overflow-hidden border-y border-line bg-[#F3F5F7] py-4">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-16 pr-16 text-sm tracking-[0.18em] text-[#17243A]"
          >
            {items.map((item, index) => (
              <span key={`${copy}-${index}`}>{item}</span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
