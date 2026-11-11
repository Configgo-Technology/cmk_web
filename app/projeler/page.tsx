import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectListing from "@/components/ProjectListing";
import Reveal from "@/components/Reveal";
import { getProject, listingSlugs } from "@/data/projects";

export const metadata: Metadata = { title: "Projeler" };

const cards = listingSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        image="/images/hero-pages.jpg"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: "Projeler" },
        ]}
        title="Projelerimiz"
        text="Yaşanabilir şehirler için, bugünü ve yarını düşünen projeler geliştiriyoruz."
      />
      <Reveal>
        <section className="bg-sand">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[70px]">
            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <p className="text-base leading-none text-muted">PROJELERİMİZ</p>
                  <span className="h-px w-14 bg-gold" />
                </div>
                <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                  Daha iyi yaşam alanları
                  <span className="block text-gold">için çalışıyoruz.</span>
                </h2>
              </div>
              <p className="text-base leading-7 text-muted">
                CMK Holding, stratejik yatırımları ve bütüncül yaklaşımıyla insan odaklı, sürdürülebilir ve uzun
                vadeli değerler üretir.
              </p>
            </div>
            <ProjectListing projects={cards} />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
