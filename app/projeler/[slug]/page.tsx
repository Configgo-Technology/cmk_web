import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProject, projectGallery, projects } from "@/data/projects";
import { interactiveBrandSlugs } from "@/data/site";

function projectAsset(slug: string, file: string, fallback: string) {
  const full = path.join(process.cwd(), "public", "images", "projects", slug, file);
  return existsSync(full) ? `/images/projects/${slug}/${file}` : fallback;
}

function youtubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|embed\/|watch\?v=|v\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function extractPlaceCid(url: string): string | null {
  const match = url.match(/!1s0x[0-9a-fA-F]+:0x([0-9a-fA-F]+)/);
  return match ? BigInt(`0x${match[1]}`).toString() : null;
}

function extractCoords(url: string): [number, number] | null {
  const pinMatch = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (pinMatch) return [Number(pinMatch[1]), Number(pinMatch[2])];
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) return [Number(atMatch[1]), Number(atMatch[2])];
  const searchMatch = url.match(/\/(?:search|place)\/(-?\d+\.\d+),(?:\+|%20|\s)*(-?\d+\.\d+)/);
  if (searchMatch) return [Number(searchMatch[1]), Number(searchMatch[2])];
  return null;
}

async function resolveMapEmbed(query: string, point?: [number, number] | string) {
  if (Array.isArray(point)) {
    const q = `${point[0]},${point[1]}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=tr&output=embed`;
  }

  if (typeof point === "string" && point.trim()) {
    const raw = point.trim();
    if (raw.includes("output=embed") || raw.includes("/maps/embed")) {
      return raw;
    }

    let resolvedUrl = raw;
    if (!extractPlaceCid(resolvedUrl) && !extractCoords(resolvedUrl) && /^https?:\/\//.test(resolvedUrl)) {
      try {
        const res = await fetch(resolvedUrl, { method: "HEAD", redirect: "manual" });
        const location = res.headers.get("location");
        if (location) resolvedUrl = location;
      } catch {
        // Fallback to mapQuery below if short link cannot be resolved
      }
    }

    const cid = extractPlaceCid(resolvedUrl);
    if (cid) {
      return `https://maps.google.com/maps?cid=${cid}&z=16&hl=tr&output=embed`;
    }

    const coords = extractCoords(resolvedUrl);
    if (coords) {
      const q = `${coords[0]},${coords[1]}`;
      return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=tr&output=embed`;
    }
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=tr&output=embed`;
}

type Params = { slug: string };

const FACT_ICONS = [
  "/icons/community-line.svg",
  "/icons/calendar-line.svg",
  "/icons/account-box-2-line.svg",
  "/icons/global-line.svg",
] as const;

export function generateStaticParams() {
  return projects.filter((project) => project.hasDetail).map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    return { title: project?.name ?? "Proje" };
  });
}

function ChipGrid({ items, cols = 2 }: { items: string[]; cols?: 2 | 4 }) {
  if (!items.length) return null;
  return (
    <div className={`mt-6 grid gap-3 ${cols === 4 ? "md:grid-cols-4" : "sm:grid-cols-2"}`}>
      {items.map((item) => (
        <p
          key={item}
          className="grid h-12 place-items-center bg-[#0B0D10] px-3 text-center text-sm text-white"
        >
          {item}
        </p>
      ))}
    </div>
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

      <Reveal>
        <section className="overflow-x-clip bg-white">
          <div className="mx-auto max-w-[1440px] overflow-x-clip px-5 py-16 md:px-[70px]">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{project.sectionLabel}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {isInteractiveBrand ? "Marka" : "Proje"}
              <span className="text-gold"> Künyesi.</span>
            </h2>

            <div className="mt-10 overflow-hidden border border-line bg-white">
              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,859fr)_minmax(0,441fr)]">
                <div className="relative min-h-[240px] w-full min-w-0 max-w-full overflow-hidden lg:min-h-[280px]">
                  <Image
                    src={`/images/projects/${slug}/2.jpg`}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 860px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center gap-10 px-8 py-10">
                  {facts.map(([label, value], index) => (
                    <div key={label} className="flex min-w-0 items-start gap-4">
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
                            <a href={project.website} className="hover:text-gold" rel="noreferrer" target="_blank">
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 pb-16 md:px-[70px]">
            <h3 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              {project.brandLine ?? "ASGARDIA"}
              {project.headline ? <span className="mt-1 block text-gold">{project.headline}</span> : null}
            </h3>
            <div className="mt-6 max-w-[1299px] space-y-4 text-base leading-6 text-muted">
              {project.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ChipGrid items={project.highlights} cols={4} />

            {project.showMidGallery !== false ? (
              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
                {midGallery.map((src, index) => (
                  <Image
                    key={`${src}-${index}`}
                    src={src}
                    alt=""
                    width={620}
                    height={350}
                    className="aspect-square h-auto w-full object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </Reveal>

      {(project.socialItems.length > 0 || project.socialText) && (
        <section className="bg-white">
          <div
            className={`mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:px-[70px] ${
              project.showSocialImage || project.socialItems.length > 0 ? "md:grid-cols-2 md:items-stretch" : ""
            }`}
          >
            <div className="flex flex-col">
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
              {project.socialItems.length > 0 ? (
                <div className="mt-auto">
                  <ChipGrid items={project.socialItems} />
                </div>
              ) : null}
            </div>
            {project.showSocialImage || project.socialItems.length > 0 ? (
              project.socialImageSquare || (project.showSocialImage && project.socialItems.length === 0) ? (
                <Image
                  src={socialImage}
                  alt=""
                  width={900}
                  height={640}
                  className={
                    project.socialImageSquare
                      ? "aspect-square h-auto w-full self-center object-cover"
                      : "aspect-video h-auto w-full self-center object-cover"
                  }
                />
              ) : (
                <div className="relative min-h-[280px] w-full overflow-hidden md:h-full">
                  <Image
                    src={socialImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )
            ) : null}
          </div>
        </section>
      )}

      {(project.technicalItems.length > 0 || (project.technicalText && project.technicalTitle)) && (
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-2 md:items-stretch md:px-[70px]">
            <div className="relative min-h-[280px] w-full overflow-hidden md:h-full">
              <Image
                src={technicalImage}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                {project.technicalTitle}
                {project.technicalAccent ? (
                  <span className="block text-gold">{project.technicalAccent}</span>
                ) : null}
              </h2>
              {project.technicalText ? (
                <p className="mt-4 max-w-xl text-base leading-6 text-muted">{project.technicalText}</p>
              ) : null}
              {project.technicalItems.length > 0 ? (
                <div className="mt-auto">
                  <ChipGrid items={project.technicalItems} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {videoUrl && project.showVideo !== false ? (
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-[70px]">
            <div>
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
            </div>
            <div className="aspect-video w-full overflow-hidden bg-[#0B0D10]">
              <iframe
                src={youtubeEmbed(videoUrl)}
                title={`${project.name} tanıtım videosu`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-[70px]">
          <div>
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
          </div>
          {mapEmbedUrl ? (
            <iframe
              title={`${project.name} konumu`}
              src={mapEmbedUrl}
              className="aspect-video h-auto w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <Image
              src={mapImage}
              alt={isInteractiveBrand ? "Konum" : "Proje konumu"}
              width={1000}
              height={640}
              className="h-72 w-full object-cover"
            />
          )}
        </div>
      </section>
    </main>
  );
}
