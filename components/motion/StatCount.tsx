"use client";

import { useEffect, useRef } from "react";

function parseValue(raw: string) {
  const match = raw.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: raw };
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export default function StatCount({ value, label }: { value: string; label: string }) {
  const { prefix, target, suffix } = parseValue(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    const numEl = numberRef.current;
    if (!node || !numEl || target === 0) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    let frame = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const duration = 1100;
      const start = performance.now();
      let lastRendered = -1;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const next = Math.round(easeOutCubic(progress) * target);
        if (next !== lastRendered) {
          lastRendered = next;
          numEl.textContent = String(next);
        }
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      numEl.textContent = "0";
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div ref={containerRef} className="flex flex-col items-start gap-1">
      <p className="text-[48px] leading-none font-semibold tracking-[-0.02em] text-black tabular-nums md:text-[64px]">
        {prefix}
        <span ref={numberRef}>{target}</span>
        {suffix}
      </p>
      <p className="text-lg leading-none tracking-[-0.02em] text-text-gray md:text-2xl">{label}</p>
    </div>
  );
}
