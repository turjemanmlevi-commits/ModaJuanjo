import type { ReactNode } from "react";

/** One marquee per page: the closing-sale strip beneath the hero. */
export function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="label whitespace-nowrap">{item}</span>
            <span className="h-1 w-1 rounded-full bg-ink/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
