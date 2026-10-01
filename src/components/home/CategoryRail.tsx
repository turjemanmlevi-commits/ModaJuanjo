import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { shopifyImage } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export type CategoryTile = {
  handle: string;
  title: string;
  count: number;
  image: { src: string; alt: string } | null;
};

export function CategoryRail({ tiles }: { tiles: CategoryTile[] }) {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="categories-heading">
      <div className="container-site">
        <Reveal className="flex items-end justify-between gap-6">
          <h2 id="categories-heading" className="display-md uppercase">
            Shop the final collection
          </h2>
          <Link href="/collections" className="hidden items-center gap-2 text-sm sm:inline-flex">
            <span className="link-line">All categories</span>
            <ArrowRight size={14} weight="regular" />
          </Link>
        </Reveal>
      </div>
      <div className="scrollbar-none mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 sm:px-6 sm:scroll-pl-6 lg:mt-10 lg:gap-5 lg:px-10 lg:scroll-pl-10">
        {tiles.map((t, i) => (
          <Reveal
            key={t.handle}
            delay={Math.min(i, 6) * 0.05}
            y={20}
            amount={0.2}
            className="w-[44vw] shrink-0 snap-start sm:w-[30vw] lg:w-[18.5vw] xl:w-[15.5vw]"
          >
            <Link href={`/collections/${t.handle}`} className="group block">
              <div className="relative overflow-hidden bg-paper-dim" style={{ aspectRatio: "3 / 4" }}>
                {t.image && (
                  <Image
                    src={shopifyImage(t.image.src, 600)}
                    alt={t.image.alt}
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 19vw, (min-width: 640px) 30vw, 44vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/5" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="link-line font-display text-base uppercase tracking-wide">{t.title}</span>
                <span className="text-xs text-ink-mute tabular-nums">{t.count}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
