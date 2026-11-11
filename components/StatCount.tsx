"use client";

import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div ref={ref} className="flex flex-col items-start gap-1">
      <p className="text-[48px] leading-none font-semibold tracking-[-0.02em] text-black md:text-[64px]">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="text-lg leading-none tracking-[-0.02em] text-text-gray md:text-2xl">{label}</p>
    </div>
  );
}
