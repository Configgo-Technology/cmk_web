import Link from "next/link";
import BrandsBand from "@/components/BrandsBand";
import HeroStage from "@/components/HeroStage";
import Marquee from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import ProjectCard from "@/components/ProjectCard";
import SectorSlider from "@/components/SectorSlider";
import { getHomePreviewProjects } from "@/data/projects";
import { aboutCopy, homeHero } from "@/data/site";

const preview = getHomePreviewProjects();

export default function HomePage() {
  return (
    <main>
      <HeroStage image="/images/hero-home.jpg" objectPosition="72% center">
        <section className="flex w-full max-w-[460px] flex-col items-start gap-8 text-white">
          <Reveal immediate variant="up" duration={760} className="w-full">
            <h1 className="w-full text-[40px] font-normal leading-[1.02] tracking-[-1px] md:text-[72px] md:tracking-[-1.8px]">
              <span className="block">{homeHero.lines[0]}</span>
              <span className="block">{homeHero.lines[1]}</span>
              <span className="block">{homeHero.lines[2]}</span>
            </h1>
          </Reveal>
          <Reveal immediate variant="up" delay={120} duration={760}>
            <p className="max-w-[355px] text-base font-normal leading-6 text-white/95">{homeHero.text}</p>
          </Reveal>
          <Reveal immediate variant="up" delay={220} duration={760}>
            <Link
              href={homeHero.ctaHref}
              className="btn-cmk btn-cmk-light inline-flex h-[52px] items-center justify-center px-6 text-[20px] font-medium leading-none tracking-[-0.02em]"
            >
              {homeHero.cta}
            </Link>
          </Reveal>
        </section>
      </HeroStage>

      <Marquee />

      <section className="relative z-10 bg-sand">
        <div className="mx-auto grid max-w-[1440px] items-start gap-10 px-5 py-20 md:grid-cols-2 md:px-[70px]">
          <Reveal variant="up">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{aboutCopy.eyebrow}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {aboutCopy.title}
              <span className="block text-gold">{aboutCopy.accent}</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={90} className="space-y-4 text-xl leading-none tracking-[-0.02em] text-muted">
            {aboutCopy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
        <div className="mx-auto max-w-[1440px] px-5 pb-10 md:px-[70px]">
          <Reveal variant="scale" delay={120}>
            <SectorSlider />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-[70px]">
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
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {preview.map((project, index) => (
              <Reveal key={project.slug} variant="up" delay={index * 90} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Reveal variant="up" delay={120} className="mt-10 flex justify-center">
            <Link href="/projeler" className="btn-cmk btn-cmk-dark inline-flex h-14 items-center px-8 text-base">
              Tüm Projeler
            </Link>
          </Reveal>
        </div>
      </section>

      <BrandsBand />
    </main>
  );
}
