"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/data/projects";

type Filter = "Tümü" | ProjectCategory;

export default function ProjectListing({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Filter>("Tümü");

  const options = useMemo(() => {
    const used = new Set(projects.map((project) => project.category));
    return PROJECT_CATEGORIES.filter((category) => used.has(category));
  }, [projects]);

  const visible = selected === "Tümü" ? projects : projects.filter((project) => project.category === selected);

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
                onClick={() => setSelected(item)}
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
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {visible.map((project, index) => (
          <Reveal key={project.slug} variant="up" delay={(index % 3) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
