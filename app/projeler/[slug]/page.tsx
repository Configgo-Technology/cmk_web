import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import MapEmbed from "@/components/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";
import PageHero from "@/components/PageHero";
import { getProject, projectGallery, projects } from "@/data/projects";
import { interactiveBrandSlugs } from "@/data/site";
import { resolveMapEmbed } from "@/lib/maps";

function projectAsset(slug: string, file: string, fallback: string) {
  const full = path.join(process.cwd(), "public", "images", "projects", slug, file);
  return existsSync(full) ? `/images/projects/${slug}/${file}` : fallback;
}

function youtubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|embed\/|watch\?v=|v\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

type Params = { slug: string };

const FACT_ICONS = [
  "/icons/community-line.svg",
  "/icons/calendar-line.svg",
  "/icons/account-box-2-line.svg",
  "/icons/global-line.svg",
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((project) => project.hasDetail).map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    return { title: project?.name ?? "Proje" };
  });
}

function ChipGrid({ items, cols = 2, baseDelay = 80 }: { items: string[]; cols?: 2 | 4; baseDelay?: number }) {
  if (!items.length) return null;
  return (
    <Reveal
      variant="fade"
      delay={baseDelay}
      duration={560}
      className={`mt-6 grid gap-3 ${cols === 4 ? "md:grid-cols-4" : "sm:grid-cols-2"}`}
    >
      {items.map((item) => (
        <p
          key={item}
          className="feature-chip grid min-h-12 place-items-center border border-transparent bg-[#0B0D10] px-3 py-2 text-center text-sm text-white"
        >
          {item}
        </p>
      ))}
    </Reveal>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.hasDetail) notFound();

  const gallery = projectGallery(slug);
  const midGallery = [3, 4, 5, 6].flatMap((n) => {
    const file = `${n}.jpg`;
    const full = path.join(process.cwd(), "public", "images", "projects", slug, file);
    return existsSync(full) ? [`/images/projects/${slug}/${file}`] : [];
  });
  const socialImage = projectAsset(slug, "7.jpg", gallery[2] ?? gallery[0]);
  const technicalImage = projectAsset(slug, "8.jpg", gallery[3] ?? gallery[0]);
  const mapImage = projectAsset(slug, "10.jpg", "/images/map-altindag.jpg");
  const videoUrl = project.videoUrl?.trim();
  const mapEmbedUrl =
    project.mapQuery || project.mapPoint
      ? await resolveMapEmbed(project.mapQuery ?? project.name, project.mapPoint)
      : null;

  const isInteractiveBrand = interactiveBrandSlugs.has(project.slug);

  const facts = [
    ["PROJE KATEGORİSİ", project.categoryLabel ?? project.category],
    ["BAŞLANGIÇ / BİTİŞ TARİHİ", project.dates],
    ["ÜSTLENEN FİRMA", project.company],
    ["PROJE WEBSİTESİ", project.website?.replace(/^https?:\/\//, "") ?? ""],
  ].filter(([, value]) => value) as [string, string][];

  return (
    <main>
      <PageHero
        image={`/images/projects/${slug}/1.jpg`}
        crumbs={
          isInteractiveBrand
            ? [{ href: "/", label: "Anasayfa" }, { label: project.name }]
            : [
                { href: "/", label: "Anasayfa" },
                { href: "/projeler", label: "Projeler" },
                { label: project.name },
              ]
        }
        lines={project.titleLines}
        wash="navy"
      />

      <section className="overflow-x-clip bg-white">
        <div className="mx-auto max-w-[1440px] overflow-x-clip px-5 py-16 md:px-[70px]">
          <Reveal variant="up">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{project.sectionLabel}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {isInteractiveBrand ? "Marka" : "Proje"}
              <span className="text-gold"> Künyesi.</span>
            </h2>
          </Reveal>

          <div className="mt-10 overflow-hidden border border-line bg-white">
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,859fr)_minmax(0,441fr)]">
              <Reveal
                variant="scale"
                delay={80}
                className="img-zoom-wrap relative min-h-[240px] w-full min-w-0 max-w-full overflow-hidden lg:min-h-[280px]"
              >
                <Image
                  src={`/images/projects/${slug}/2.jpg`}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 860px, 100vw"
                  className="object-cover img-zoom"
                />
              </Reveal>
              <div className="flex min-w-0 flex-col justify-center gap-10 px-8 py-10">
                {facts.map(([label, value], index) => (
                  <Reveal
                    key={label}
                    variant="up"
                    delay={80 + index * 70}
                    className="flex min-w-0 items-start gap-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FACT_ICONS[index] ?? FACT_ICONS[0]}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-base leading-none text-muted">{label}</p>
                      <p className="mt-2 break-words text-2xl leading-none font-medium text-ink">
                        {label === "PROJE WEBSİTESİ" && project.website ? (
                          <a
                            href={project.website}
                            className="transition-colors duration-200 hover:text-gold hover:underline decoration-gold/70 underline-offset-4"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 md:px-[70px]">
          <Reveal variant="up">
            <h3 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {project.brandLine ?? "ASGARDIA"}
              {project.headline ? <span className="mt-1 block text-gold">{project.headline}</span> : null}
            </h3>
          </Reveal>
          <Reveal variant="up" delay={80} className="mt-6 max-w-[1299px] space-y-4 text-base leading-6 text-muted">
            {project.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          {project.highlights.length > 0 ? (
            <ChipGrid items={project.highlights} cols={4} baseDelay={100} />
          ) : null}

          {project.showMidGallery !== false ? (
            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
              {midGallery.map((src, index) => (
                <Reveal
                  key={`${src}-${index}`}
                  variant="scale"
                  delay={(index % 4) * 70}
                  className="img-zoom-wrap overflow-hidden"
                >
                  <Image
                    src={src}
                    alt=""
                    width={620}
                    height={350}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="aspect-square h-auto w-full object-cover img-zoom"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {(project.socialItems.length > 0 || project.socialText) && (
        <section className="bg-white">
          <div
            className={`mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:px-[70px] ${
              project.showSocialImage || project.socialItems.length > 0 ? "md:grid-cols-2 md:items-stretch" : ""
            }`}
          >
            <div className="flex flex-col">
              <Reveal variant="up">
                {project.socialTitle ? (
                  <h2 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                    {project.socialTitle}
                    {project.socialAccent ? (
                      <span className="block text-gold">{project.socialAccent}</span>
                    ) : null}
                  </h2>
                ) : null}
                {project.socialText
                  ? project.socialText.split(/\n\n+/).map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-6 text-muted">
                        {paragraph}
                      </p>
                    ))
                  : null}
              </Reveal>
              {project.socialItems.length > 0 ? (
                <div className="mt-auto">
                  <ChipGrid items={project.socialItems} baseDelay={80} />
                </div>
              ) : null}
            </div>
            {project.showSocialImage || project.socialItems.length > 0 ? (
              project.socialImageSquare || (project.showSocialImage && project.socialItems.length === 0) ? (
                <Reveal variant="scale" delay={100} className="img-zoom-wrap self-center overflow-hidden">
                  <Image
                    src={socialImage}
                    alt=""
                    width={900}
                    height={640}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={
                      project.socialImageSquare
                        ? "aspect-square h-auto w-full object-cover img-zoom"
                        : "aspect-video h-auto w-full object-cover img-zoom"
                    }
                  />
                </Reveal>
              ) : (
                <Reveal
                  variant="scale"
                  delay={100}
                  className="img-zoom-wrap relative min-h-[280px] w-full overflow-hidden md:h-full"
                >
                  <Image
                    src={socialImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover img-zoom"
                  />
                </Reveal>
              )
            ) : null}
          </div>
        </section>
      )}

      {(project.technicalItems.length > 0 || (project.technicalText && project.technicalTitle)) && (
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-2 md:items-stretch md:px-[70px]">
            <Reveal
              variant="scale"
              delay={100}
              className="img-zoom-wrap relative order-2 min-h-[280px] w-full overflow-hidden md:order-1 md:h-full"
            >
              <Image
                src={technicalImage}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover img-zoom"
              />
            </Reveal>
            <div className="order-1 flex flex-col md:order-2">
              <Reveal variant="up">
                <h2 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                  {project.technicalTitle}
                  {project.technicalAccent ? (
                    <span className="block text-gold">{project.technicalAccent}</span>
                  ) : null}
                </h2>
                {project.technicalText ? (
                  <p className="mt-4 max-w-xl text-base leading-6 text-muted">{project.technicalText}</p>
                ) : null}
              </Reveal>
              {project.technicalItems.length > 0 ? (
                <div className="mt-auto">
                  <ChipGrid items={project.technicalItems} baseDelay={80} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {videoUrl && project.showVideo !== false ? (
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-[70px]">
            <Reveal variant="up">
              <div className="flex items-center gap-4">
                <p className="text-base leading-none text-muted">{project.sectionLabel}</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="mt-4 font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                Tanıtım
                <span className="block text-gold">Videosu</span>
              </h2>
              <p className="mt-4 max-w-sm text-base leading-6 text-muted">
                {project.name}&apos;u daha yakından tanıyın. Projenin mimarisi, sosyal alanları ve yaşam ortamını
                keşfedin.
              </p>
            </Reveal>
            <Reveal variant="scale" delay={100} className="aspect-video w-full overflow-hidden bg-[#0B0D10]">
              <iframe
                src={youtubeEmbed(videoUrl)}
                title={`${project.name} tanıtım videosu`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-[70px]">
          <Reveal variant="up">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{project.sectionLabel}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {isInteractiveBrand ? (
                <span className="text-gold">Konum</span>
              ) : (
                <>
                  Proje
                  <span className="block text-gold">Konumu</span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-6 text-muted">
              {project.slug === "diyarbakir-surlari"
                ? `${project.name}, Diyarbakır’da tarihî kent dokusu içinde yer almaktadır.`
                : `${project.name}, Ankara’da konforlu ve ulaşımı kolay bir lokasyonda yer almaktadır.`}
            </p>
          </Reveal>
          <Reveal variant="fade" delay={100}>
            {mapEmbedUrl ? (
              <MapEmbed
                title={`${project.name} konumu`}
                src={mapEmbedUrl}
                className="aspect-video w-full bg-sand"
              />
            ) : (
              <div className="img-zoom-wrap overflow-hidden">
                <Image
                  src={mapImage}
                  alt={isInteractiveBrand ? "Konum" : "Proje konumu"}
                  width={1000}
                  height={640}
                  className="h-72 w-full object-cover img-zoom"
                />
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
