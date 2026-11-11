import type { Metadata } from "next";
import Image from "next/image";
import HeroStage from "@/components/HeroStage";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getProject, homePreviewSlugs } from "@/data/projects";
import { aboutCopy, brands, corporateHero } from "@/data/site";

export const metadata: Metadata = { title: "Kurumsal" };

const preview = homePreviewSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function AboutPage() {
  return (
    <main>
      <HeroStage
        image="/images/hero-kurumsal.jpg"
        alt="Kurumsal bakış — modern mimari içinde siluet"
        objectPosition="55% center"
      >
        <section className="flex w-full max-w-[760px] flex-col items-start gap-8 text-white">
          <h1 className="w-full text-[40px] font-normal leading-none tracking-[-1px] md:text-[72px] md:tracking-[-1.8px]">
            <span className="block">{corporateHero.lines[0]}</span>
            <span className="block">{corporateHero.lines[1]}</span>
          </h1>
          <p className="max-w-[355px] text-base font-normal leading-6 text-white">{corporateHero.text}</p>
        </section>
      </HeroStage>

      <Marquee />

      <Reveal>
        <section className="relative z-10 -mt-16 bg-sand">
          <div className="mx-auto grid max-w-[1440px] items-start gap-10 px-5 py-20 md:grid-cols-2 md:px-[70px]">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-base leading-none text-muted">{aboutCopy.eyebrow}</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                {aboutCopy.title}
                <span className="block text-gold">{aboutCopy.accent}</span>
              </h2>
            </div>
            <div className="space-y-4 text-xl leading-7 text-muted">
              {aboutCopy.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-[1440px] px-5 pb-10 md:px-[70px]">
            <Image
              src="/images/about-buildings.jpg"
              alt="CMK konut blokları"
              width={1300}
              height={426}
              className="h-auto w-full object-cover"
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-sand">
          <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-[70px]">
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
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {preview.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[70px]">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">REFERANSLARIMIZ</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              Daha iyi yaşam alanları
              <span className="block text-gold">Markalarımız</span>
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {brands.map((brand) => (
                <div key={brand.alt} className="grid h-[164px] place-items-center border border-line bg-white px-4">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={290}
                    height={120}
                    className="max-h-[120px] w-auto max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}
