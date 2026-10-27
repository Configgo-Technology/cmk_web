import Image from "next/image";
import Link from "next/link";
import { cardExcerpt } from "@/data/projects";

export default function ProjectCard({
  slug,
  name,
  category,
}: {
  slug: string;
  name: string;
  category: string;
}) {
  return (
    <article className="border border-line bg-white" data-cursor="İNCELE" data-preview={`/images/projects/${slug}/1.jpg`}>
      <Link href={`/projeler/${slug}`} className="block">
        <Image
          src={`/images/projects/${slug}/1.jpg`}
          alt={name}
          width={900}
          height={560}
          className="h-52 w-full object-cover"
        />
      </Link>
      <div className="px-4 py-5">
        <p className="text-[11px] tracking-[0.14em] text-muted">{category}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <Link href={`/projeler/${slug}`} className="text-2xl font-medium leading-none tracking-[-0.4px] text-ink">
            {name}
          </Link>
          <span className="text-gold" aria-hidden>
            →
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{cardExcerpt}</p>
      </div>
    </article>
  );
}
