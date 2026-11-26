import { Reveal } from "@/components/motion/Reveal";
import { missionVision } from "@/data/site";

export default function MissionVisionBand() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-[70px]">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Reveal variant="up">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{missionVision.eyebrow}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {missionVision.title}
              <span className="block text-gold">{missionVision.accent}</span>
            </h2>
          </Reveal>

          <Reveal variant="up" delay={90} className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
            {missionVision.pillars.map((pillar, idx) => (
              <span
                key={pillar}
                className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-muted uppercase"
              >
                {idx > 0 && <span className="h-1 w-1 bg-gold" aria-hidden />}
                {pillar}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid divide-y divide-line border border-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {missionVision.items.map((item, idx) => (
            <Reveal
              as="article"
              key={item.code}
              variant="up"
              delay={idx * 110}
              className={`flex flex-col p-8 md:p-12 ${idx === 0 ? "bg-sand/45" : "bg-white"}`}
            >
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>

              <h3 className="font-geist mt-6 text-[28px] leading-none tracking-[-0.02em] text-ink md:text-[32px]">
                {item.title}
              </h3>

              <p className="mt-6 text-base leading-7 text-muted md:text-[17px] md:leading-8">{item.text}</p>

              <span className="mt-auto pt-8">
                <span className="block h-[2px] w-10 bg-gold" aria-hidden />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
