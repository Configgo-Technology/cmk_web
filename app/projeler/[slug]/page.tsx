import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProcessBand from "@/components/ProcessBand";
import Reveal from "@/components/Reveal";
import { getProject, projectGallery, projects } from "@/data/projects";
import { sharedLocation, sharedVideo } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    return { title: project?.name ?? "Proje" };
  });
}

function ChipGrid({ items }: { items: string[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <p key={item} className="bg-gold px-4 py-3 text-center text-sm text-white">
          {item}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const gallery = projectGallery(slug);
  const facts = [
    ["PROJE KATEGORİSİ", project.detailCategory],
    ["BAŞLANGIÇ / BİTİŞ TARİHİ", project.dates],
    ["ÜSTLENEN FİRMA", project.company],
    ["PROJE WEB SİTESİ", project.website?.replace("https://", "") ?? ""],
  ].filter(([, value]) => value);

  return (
    <main>
      <PageHero
        image={gallery[0]}
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { href: "/projeler", label: "Projeler" },
          { label: project.name },
        ]}
        lines={project.titleLines}
      />

      <Reveal>
      <section className="bg-sand">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
          <div className="flex items-center gap-4">
            <p className="text-[11px] tracking-[0.18em] text-muted">{project.name.toLocaleUpperCase("tr-TR")}</p>
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
            Proje hakkında
            <span className="block text-gold">detaylar.</span>
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <Image src={gallery[1] ?? gallery[0]} alt={project.name} width={1100} height={720} className="h-full min-h-72 w-full object-cover" />
            <dl className="border border-line bg-white">
              {facts.map(([label, value]) => (
                <div key={label} className="border-b border-line px-6 py-5 last:border-b-0">
                  <dt className="text-[11px] tracking-[0.14em] text-muted">{label}</dt>
                  <dd className="mt-1 text-2xl font-medium leading-none text-ink">
                    {label === "PROJE WEB SİTESİ" && project.website ? (
                      <a href={project.website} className="hover:text-gold" rel="noreferrer" target="_blank">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <h3 className="mt-12 font-geist text-4xl text-ink">
            {project.titleLines[0]}
            <span className="mt-1 block text-gold">{project.headline}</span>
          </h3>
          <div className="mt-5 max-w-5xl space-y-4 text-sm leading-7 text-muted">
            {project.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {project.highlights.map((item) => (
              <p key={item} className="bg-gold px-3 py-4 text-center text-sm text-white">
                {item}
              </p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.slice(0, 4).map((src) => (
              <Image key={src} src={src} alt="" width={500} height={320} className="h-36 w-full object-cover md:h-44" />
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-8 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-geist text-4xl text-ink">
              {project.socialTitle}
              <span className="block text-gold">{project.socialAccent}</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{project.socialText}</p>
            <ChipGrid items={project.socialItems} />
          </div>
          <Image src={gallery[2] ?? gallery[0]} alt="" width={900} height={640} className="h-80 w-full object-cover" />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8">
          <Image src={gallery[3] ?? gallery[0]} alt="" width={900} height={640} className="h-80 w-full object-cover" />
          <div>
            <h2 className="font-geist text-4xl text-ink">
              {project.technicalTitle}
              <span className="block text-gold">{project.technicalAccent}</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{project.technicalText}</p>
            <ChipGrid items={project.technicalItems} />
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
          <h2 className="font-geist text-4xl text-ink">
            {project.galleryLabel}
            <span className="block text-gold">Proje Galerisi</span>
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((src) => (
              <Image key={`gallery-${src}`} src={src} alt="" width={500} height={340} className="h-40 w-full object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[11px] tracking-[0.18em] text-muted">{sharedVideo.eyebrow}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-4xl text-ink">
              {sharedVideo.title}
              <span className="block text-gold">{sharedVideo.accent}</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{sharedVideo.text}</p>
          </div>
          <Image src={gallery[4] ?? gallery[0]} alt="" width={1000} height={640} className="h-72 w-full object-cover" />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[11px] tracking-[0.18em] text-muted">{sharedLocation.eyebrow}</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-4xl text-ink">
              {sharedLocation.title}
              <span className="block text-gold">{sharedLocation.accent}</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{sharedLocation.text}</p>
          </div>
          <Image src="/images/map-altindag.jpg" alt="Proje konumu" width={1000} height={640} className="h-72 w-full object-cover" />
        </div>
      </section>

      <ProcessBand />
    </main>
  );
}
