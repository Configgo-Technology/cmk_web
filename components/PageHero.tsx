import Link from "next/link";

type Crumb = { href?: string; label: string };

export default function PageHero({
  image,
  crumbs,
  title,
  text,
  lines,
}: {
  image: string;
  crumbs: Crumb[];
  title?: string;
  text?: string;
  lines?: [string, string];
}) {
  return (
    <section className="relative min-h-[460px] overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
      <div className="relative mx-auto flex min-h-[460px] max-w-[1200px] flex-col justify-end px-5 pb-14 pt-32 md:px-8">
        <p className="text-sm text-white/80">
          {crumbs.map((crumb, index) => (
            <span key={crumb.label}>
              {index > 0 ? <span className="mx-2 text-gold">›</span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gold">
                  {crumb.label}
                </Link>
              ) : (
                <span className={index === crumbs.length - 1 ? "text-gold" : ""}>{crumb.label}</span>
              )}
            </span>
          ))}
        </p>
        {lines ? (
          <h1 className="mt-4 max-w-[459px] text-[40px] font-normal leading-none tracking-[-1px] md:text-[72px] md:tracking-[-1.8px]">
            {lines[0]}
            <span className="mt-1 block text-gold">{lines[1]}</span>
          </h1>
        ) : (
          <h1 className="mt-3 text-[40px] font-normal leading-none tracking-[-1px] md:text-[72px] md:tracking-[-1.8px]">{title}</h1>
        )}
        {text ? <p className="mt-4 max-w-md text-sm leading-6 text-white/85">{text}</p> : null}
      </div>
    </section>
  );
}
