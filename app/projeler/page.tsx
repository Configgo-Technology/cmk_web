import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import PageHero from "@/components/PageHero";
import ProjectListing from "@/components/ProjectListing";
import { getListingProjects } from "@/data/projects";

export const metadata: Metadata = { title: "Projeler" };

const cards = getListingProjects();

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        image="/images/projeler-2.webp"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: "Projeler" },
        ]}
        title="Projelerimiz"
        text="Yaşanabilir şehirler için, bugünü ve yarını düşünen projeler geliştiriyoruz."
      />
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[70px]">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <Reveal variant="up">
              <div className="flex items-center gap-4">
                <p className="text-base leading-none text-muted">PROJELERİMİZ</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                Daha iyi yaşam alanları
                <span className="block text-gold">için çalışıyoruz.</span>
              </h2>
            </Reveal>
            <Reveal variant="up" delay={90}>
              <p className="text-base leading-7 text-muted">
                CMK Holding, stratejik yatırımları ve bütüncül yaklaşımıyla insan odaklı, sürdürülebilir ve uzun
                vadeli değerler üretir.
              </p>
            </Reveal>
          </div>
          <ProjectListing projects={cards} />
        </div>
      </section>
    </main>
  );
}
