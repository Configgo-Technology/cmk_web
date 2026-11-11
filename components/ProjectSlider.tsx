"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

export default function ProjectSlider({ items }: { items: Project[] }) {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = Math.max(items.length - visible, 0);
  const start = Math.min(index, max);
  const slice = items.slice(start, start + visible);

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {slice.map((item) => (
            <motion.div
              key={`${item.slug}-${start}`}
              layout
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <ProjectCard project={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center bg-gold text-navy disabled:opacity-40"
          aria-label="Önceki projeler"
          disabled={start === 0}
          onClick={() => setIndex((value) => Math.max(value - 1, 0))}
        >
          ←
        </button>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center bg-gold text-navy disabled:opacity-40"
          aria-label="Sonraki projeler"
          disabled={start >= max}
          onClick={() => setIndex((value) => Math.min(value + 1, max))}
        >
          →
        </button>
      </div>
    </div>
  );
}
