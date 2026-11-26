"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/data/projects";

type Filter = "Tümü" | ProjectCategory;

const RESIZE_FALLBACK_MS = 540;

export default function ProjectListing({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Filter>("Tümü");
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const fromHeightRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const options = useMemo(() => {
    const used = new Set(projects.map((project) => project.category));
    return PROJECT_CATEGORIES.filter((category) => used.has(category));
  }, [projects]);

  const visible = selected === "Tümü" ? projects : projects.filter((project) => project.category === selected);

  const handleSelect = (next: Filter) => {
    if (next === selected) return;

    const stage = stageRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (stage && !reduced) {
      cleanupRef.current?.();
      cleanupRef.current = null;

      const currentHeight = stage.getBoundingClientRect().height;
      fromHeightRef.current = currentHeight;
      stage.style.transition = "none";
      stage.style.height = `${currentHeight}px`;
      stage.dataset.resizing = "true";
    } else {
      fromHeightRef.current = null;
    }

    setSelected(next);
  };

  useLayoutEffect(() => {
    const fromHeight = fromHeightRef.current;
    const stage = stageRef.current;
    const grid = gridRef.current;
    if (fromHeight === null || !stage || !grid) return;
    fromHeightRef.current = null;

    const toHeight = grid.getBoundingClientRect().height;
    if (Math.abs(toHeight - fromHeight) < 1) {
      stage.style.transition = "";
      stage.style.height = "";
      delete stage.dataset.resizing;
      return;
    }

    // Flush the locked starting height before re-enabling the CSS height transition
    void stage.offsetHeight;
    stage.style.transition = "";
    stage.style.height = `${toHeight}px`;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      stage.removeEventListener("transitionend", onEnd);
      stage.style.height = "";
      delete stage.dataset.resizing;
      if (cleanupRef.current === cancel) {
        cleanupRef.current = null;
      }
    };

    const onEnd = (event: TransitionEvent) => {
      if (event.target === stage && event.propertyName === "height") {
        finish();
      }
    };

    const cancel = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      stage.removeEventListener("transitionend", onEnd);
    };

    const timer = window.setTimeout(finish, RESIZE_FALLBACK_MS);
    stage.addEventListener("transitionend", onEnd);
    cleanupRef.current = cancel;
  }, [selected]);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <>
      <Reveal variant="up" delay={80}>
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Proje kategorisi">
          {(["Tümü", ...options] as Filter[]).map((item) => {
            const active = selected === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleSelect(item)}
                className={`h-10 cursor-pointer border px-4 text-sm tracking-[0.08em] transition-all duration-200 ease-[var(--ease-calm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink hover:border-gold hover:bg-gold hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </Reveal>
      <div ref={stageRef} className="project-listing-stage mt-8">
        <div ref={gridRef} className="grid gap-5 md:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.slug} variant="up" delay={(index % 3) * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
