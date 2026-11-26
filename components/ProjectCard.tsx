import Image from "next/image";
import Link from "next/link";
import { projectListLabel, type Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.hasDetail ? `/projeler/${project.slug}` : "/projeler";
  const excerpt =
    project.excerpt.length > 140 ? `${project.excerpt.slice(0, 137).trimEnd()}…` : project.excerpt;
  const coverClass = "h-52 w-full object-cover img-zoom";

  return (
    <article
      className={`img-zoom-wrap border border-line bg-white ${
        project.hasDetail
          ? "group transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_12px_32px_rgba(23,36,58,0.08)]"
          : ""
      }`}
    >
      {project.hasDetail ? (
        <Link href={href} className="block h-52 overflow-hidden">
          <Image
            src={`/images/projects/${project.slug}/1.jpg`}
            alt={project.name}
            width={900}
            height={560}
            sizes="(min-width: 768px) 33vw, 100vw"
            className={coverClass}
          />
        </Link>
      ) : (
        <div className="h-52 overflow-hidden">
          <Image
            src={`/images/projects/${project.slug}/1.jpg`}
            alt={project.name}
            width={900}
            height={560}
            sizes="(min-width: 768px) 33vw, 100vw"
            className={coverClass}
          />
        </div>
      )}
      <div className="px-4 py-5">
        <p className="text-[11px] tracking-[0.14em] text-muted">{projectListLabel(project.category)}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          {project.hasDetail ? (
            <Link
              href={href}
              className="text-2xl font-medium leading-none tracking-[-0.4px] text-ink transition-colors duration-200 group-hover:text-gold focus-visible:text-gold focus-visible:outline-none"
            >
              {project.name}
            </Link>
          ) : (
            <p className="text-2xl font-medium leading-none tracking-[-0.4px] text-ink">{project.name}</p>
          )}
          <span
            className={`inline-block text-gold ${
              project.hasDetail
                ? "transition-transform duration-300 ease-[var(--ease-calm)] group-hover:translate-x-1.5"
                : ""
            }`}
            aria-hidden
          >
            →
          </span>
        </div>
        <p className="mt-3 text-sm leading-[21px] text-muted">{excerpt}</p>
      </div>
    </article>
  );
}
