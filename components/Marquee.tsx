const line = "CMK HOLDING  —  Yaşam Alanları Geleceği Şekillendirir.";

export default function Marquee() {
  const items = Array.from({ length: 8 }, () => line);
  return (
    <div className="overflow-hidden border-y border-line bg-[#F3F5F7] py-4">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <p key={copy} className="flex shrink-0 gap-16 pr-16 text-sm tracking-[0.18em] text-[#17243A]">
            {items.map((item, index) => (
              <span key={`${copy}-${index}`}>{item}</span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
