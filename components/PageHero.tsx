import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

type Crumb = { href?: string; label: string };

export default function PageHero({
  image,
  crumbs,
  title,
  text,
  lines,
  wash = "black",
}: {
  image: string;
  crumbs: Crumb[];
  title?: string;
  text?: string;
  lines?: [string, string];
  /** Proje kapaklarında Figma’daki saydam lacivert geçiş */
  wash?: "black" | "navy";
}) {
  return (
    <section className="relative min-h-[460px] overflow-hidden bg-navy text-white">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div
        className={wash === "navy" ? "absolute inset-0" : "absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"}
        style={
          wash === "navy"
            ? {
                background:
                  "linear-gradient(90deg, rgba(23,36,58,0.88) 0%, rgba(23,36,58,0.62) 28%, rgba(23,36,58,0.28) 55%, rgba(23,36,58,0) 82%)",
              }
            : undefined
        }
      />
      <div className="relative mx-auto flex min-h-[460px] max-w-[1200px] flex-col justify-end px-5 pb-14 pt-32 md:px-8">
        <Reveal immediate variant="up" duration={680}>
          <p className="text-sm text-white/80">
            {crumbs.map((crumb, index) => (
              <span key={crumb.label}>
                {index > 0 ? <span className="mx-2 text-gold">›</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="link-hover">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={index === crumbs.length - 1 ? "text-gold" : ""}>{crumb.label}</span>
                )}
              </span>
            ))}
          </p>
        </Reveal>
        <Reveal immediate variant="up" delay={90} duration={760}>
          {lines ? (
            <h1 className="mt-4 max-w-[459px] text-[40px] font-normal leading-none tracking-[-1px] md:text-[72px] md:tracking-[-1.8px]">
              {lines[0]}
              <span className="mt-1 block text-gold">{lines[1]}</span>
            </h1>
          ) : (
            <h1 className="mt-3 text-[40px] font-normal leading-none tracking-[-1px] md:text-[72px] md:tracking-[-1.8px]">{title}</h1>
          )}
        </Reveal>
        {text ? (
          <Reveal immediate variant="up" delay={170} duration={760}>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/85">{text}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
