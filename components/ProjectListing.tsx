"use client";

import { useMemo, useState } from "react";
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
              className={`h-10 px-4 text-sm tracking-[0.08em] transition-colors ${
                active ? "bg-ink text-white" : "border border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
