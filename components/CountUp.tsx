"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const [current, setCurrent] = useState(0);
  const node = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const tick = () => {
      const element = node.current;
      if (!element || started.current) return;
      if (element.getBoundingClientRect().top > window.innerHeight * 0.9) return;
      started.current = true;
      const begin = performance.now();
      const run = (now: number) => {
        const progress = Math.min((now - begin) / 1200, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCurrent(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, [target]);

  return (
    <span ref={node}>
      {current}
      {suffix}
    </span>
  );
}
