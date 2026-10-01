import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCollections, getCollectionProducts } from "@/lib/catalog";
import { shopifyImage } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "All categories",
  description: "Browse every category in MODESSAE's closing down sale.",
};

export default function CollectionsIndexPage() {
  const collections = getAllCollections()
    .map((c) => ({ ...c, products: getCollectionProducts(c.handle) }))
    .filter((c) => c.products.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="container-site pb-16 pt-8 lg:pb-24 lg:pt-12">
      <h1 className="display-lg uppercase">All categories</h1>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {collections.map((c, i) => {
          const img = c.products.find((p) => p.image)?.image ?? null;
          return (
            <Reveal key={c.handle} delay={(i % 4) * 0.06} amount={0.1}>
              <li>
                <Link href={`/collections/${c.handle}`} className="group block">
                  <div className="relative overflow-hidden bg-paper-dim" style={{ aspectRatio: "3 / 4" }}>
                    {img && (
                      <Image
                        src={shopifyImage(img.src, 700)}
                        alt={img.alt ?? c.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="link-line font-display uppercase tracking-wide">{c.title}</span>
                    <span className="text-xs text-ink-mute tabular-nums">{c.products.length}</span>
                  </div>
                </Link>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
