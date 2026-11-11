import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProject, projectGallery, projects } from "@/data/projects";

function projectAsset(slug: string, file: string, fallback: string) {
  const full = path.join(process.cwd(), "public", "images", "projects", slug, file);
  return existsSync(full) ? `/images/projects/${slug}/${file}` : fallback;
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
  const midGallery = [3, 4, 5, 6].map((n) =>
    projectAsset(slug, `${n}.jpg`, gallery[Math.min(n - 1, gallery.length - 1)] ?? gallery[0]),
  );
  const socialImage = projectAsset(slug, "7.jpg", gallery[2] ?? gallery[0]);
  const technicalImage = projectAsset(slug, "8.jpg", gallery[3] ?? gallery[0]);
  const videoImage = projectAsset(slug, "9.jpg", gallery[4] ?? gallery[0]);
  const mapImage = projectAsset(slug, "10.jpg", "/images/map-altindag.jpg");

  const facts = [
    ["PROJE KATEGORİSİ", project.category],
    ["BAŞLANGIÇ / BİTİŞ TARİHİ", project.dates],
    ["ÜSTLENEN FİRMA", project.company],
    ["PROJE WEBSİTESİ", project.website?.replace(/^https?:\/\//, "") ?? ""],
  ].filter(([, value]) => value) as [string, string][];

  return (
    <main>
      <PageHero
        image={`/images/projects/${slug}/1.jpg`}
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { href: "/projeler", label: "Projeler" },
          { label: project.name },
        ]}
        lines={project.titleLines}
      />

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[70px]">
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{project.sectionLabel}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              Proje hakkında
              <span className="block text-gold">detaylar.</span>
            </h2>

            <div className="mt-10 border border-line bg-white">
              <div className="grid lg:grid-cols-[859fr_441fr]">
                <Image
                  src={`/images/projects/${slug}/2.jpg`}
                  alt={project.name}
                  width={859}
                  height={483}
                  className="h-full min-h-[280px] w-full object-cover"
                />
                <div className="flex flex-col justify-center gap-10 px-8 py-10">
                  {facts.map(([label, value], index) => (
                    <div key={label} className="flex items-start gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={FACT_ICONS[index] ?? FACT_ICONS[0]}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0"
                      />
                      <div>
                        <p className="text-base leading-none text-muted">{label}</p>
                        <p className="mt-2 text-2xl leading-none font-medium text-ink">
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
              <span className="mt-1 block text-gold">{project.headline}</span>
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
              project.socialItems.length > 0 ? "md:grid-cols-2" : ""
            }`}
          >
            <div>
              <h2 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                {project.socialTitle}
                {project.socialAccent ? (
                  <span className="block text-gold">{project.socialAccent}</span>
                ) : null}
              </h2>
              {project.socialText ? (
                <p className="mt-4 max-w-3xl text-base leading-6 text-muted">{project.socialText}</p>
              ) : null}
              <ChipGrid items={project.socialItems} />
            </div>
            {project.socialItems.length > 0 ? (
              <Image
                src={socialImage}
                alt=""
                width={900}
                height={640}
                className="h-80 w-full object-cover"
              />
            ) : null}
          </div>
        </section>
      )}

      {(project.technicalItems.length > 0 || (project.technicalText && project.technicalTitle)) && (
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-[70px]">
            <Image
              src={technicalImage}
              alt=""
              width={900}
              height={640}
              className="h-80 w-full object-cover"
            />
            <div>
              <h2 className="font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
                {project.technicalTitle}
                {project.technicalAccent ? (
                  <span className="block text-gold">{project.technicalAccent}</span>
                ) : null}
              </h2>
              {project.technicalText ? (
                <p className="mt-4 max-w-xl text-base leading-6 text-muted">{project.technicalText}</p>
              ) : null}
              <ChipGrid items={project.technicalItems} />
            </div>
          </div>
        </section>
      )}

      {project.showVideo !== false ? (
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
            <Image src={videoImage} alt="" width={1000} height={640} className="h-72 w-full object-cover" />
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:px-[70px]">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-base leading-none text-muted">{project.sectionLabel}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
              Proje
              <span className="block text-gold">Konumu</span>
            </h2>
            <p className="mt-4 max-w-sm text-base leading-6 text-muted">
              {project.name}, Ankara&apos;da konforlu ve ulaşımı kolay bir lokasyonda yer almaktadır.
            </p>
          </div>
          <Image src={mapImage} alt="Proje konumu" width={1000} height={640} className="h-72 w-full object-cover" />
        </div>
      </section>
    </main>
  );
}
