import Image from "next/image";
import Link from "next/link";
import { projectListLabel, type Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.hasDetail ? `/projeler/${project.slug}` : "/projeler";
  const excerpt =
    project.excerpt.length > 140 ? `${project.excerpt.slice(0, 137).trimEnd()}…` : project.excerpt;

  return (
    <article
      className="border border-line bg-white"
      data-cursor="İNCELE"
      data-preview={`/images/projects/${project.slug}/1.jpg`}
    >
      {project.hasDetail ? (
        <Link href={href} className="block">
          <Image
            src={`/images/projects/${project.slug}/1.jpg`}
            alt={project.name}
            width={900}
            height={560}
            className="h-52 w-full object-cover"
          />
        </Link>
      ) : (
        <Image
          src={`/images/projects/${project.slug}/1.jpg`}
          alt={project.name}
          width={900}
          height={560}
          className="h-52 w-full object-cover"
        />
      )}
      <div className="px-4 py-5">
        <p className="text-[11px] tracking-[0.14em] text-muted">{projectListLabel(project.category)}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          {project.hasDetail ? (
            <Link href={href} className="text-2xl font-medium leading-none tracking-[-0.4px] text-ink">
              {project.name}
            </Link>
          ) : (
            <p className="text-2xl font-medium leading-none tracking-[-0.4px] text-ink">{project.name}</p>
          )}
          <span className="text-gold" aria-hidden>
            →
          </span>
        </div>
        <p className="mt-3 text-sm leading-[21px] text-muted">{excerpt}</p>
      </div>
    </article>
  );
}
