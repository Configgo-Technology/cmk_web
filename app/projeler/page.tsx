import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProcessBand from "@/components/ProcessBand";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { getProject, listingSlugs } from "@/data/projects";

export const metadata: Metadata = { title: "Projeler" };

const cards = listingSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        image="/images/projects/kule/1.jpg"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: "Projeler" },
        ]}
        title="Projelerimiz"
        text="Yaşanabilir şehirler için, bugünü ve yarını düşünen projeler geliştiriyoruz."
      />
      <Reveal>
      <section className="bg-sand">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-[11px] tracking-[0.18em] text-muted">PROJELERİMİZ</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
                Daha iyi yaşam alanları
                <span className="block text-gold">için çalışıyoruz.</span>
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              CMK Holding, stratejik yatırımları ve bütüncül yaklaşımıyla insan odaklı, sürdürülebilir ve uzun vadeli
              değerler üretir.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {cards.map((project, index) => (
              <ProjectCard
                key={`${project.slug}-${index}`}
                slug={project.slug}
                name={project.name}
                category={project.listCategory}
              />
            ))}
          </div>
        </div>
      </section>
      </Reveal>
      <ProcessBand />
    </main>
  );
}
