import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import StatCount from "@/components/motion/StatCount";
import { homeAbout } from "@/data/site";

export default function AboutBand() {
  return (
    <section className="bg-white px-5 pb-16 md:px-[70px]">
      <div className="mx-auto max-w-[1300px] bg-[#D9DEE6]/30 px-6 py-16 md:px-[110px] md:py-16">
        <div className="mx-auto flex max-w-[699px] flex-col items-center gap-12 text-center">
          <div className="flex w-full flex-col items-center gap-6">
            <Reveal variant="up">
              <p className="text-base leading-none tracking-[-0.02em] text-text-gray">{homeAbout.eyebrow}</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="text-[32px] leading-none tracking-[-0.02em] text-black md:text-[40px]">
                {homeAbout.title}
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="text-lg leading-none tracking-[-0.02em] text-text-gray md:text-xl">
                {homeAbout.text}
              </p>
            </Reveal>
          </div>
          <Reveal variant="up" delay={180}>
            <Link
              href={homeAbout.ctaHref}
              className="btn-cmk btn-cmk-dark inline-flex h-[68px] items-center justify-center px-9 text-xl leading-none tracking-[-0.02em]"
            >
              {homeAbout.cta}
            </Link>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 h-px w-full max-w-[1080px] bg-[#6B7280]/10" />

        <div className="mx-auto mt-12 grid max-w-[1080px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[120px]">
          {homeAbout.stats.map((stat, index) => (
            <Reveal key={stat.label} variant="up" delay={index * 70}>
              <StatCount value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
