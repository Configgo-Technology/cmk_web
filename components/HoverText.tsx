export default function HoverText({ text }: { text: string }) {
  const chars = [...text];
  return (
    <span className="hover-roll">
      {[0, 1].map((copy) => (
        <span key={copy} aria-hidden={copy === 1} className="hover-roll-line">
          {chars.map((char, index) => (
            <span key={`${copy}-${index}`} style={{ transitionDelay: `${index * 18}ms` }}>
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
