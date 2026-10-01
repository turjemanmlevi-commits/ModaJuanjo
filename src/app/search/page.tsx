import type { Metadata } from "next";
import { getAllProductCards } from "@/lib/catalog";
import { searchIndex } from "@/lib/search";
import { CollectionGrid } from "@/components/collection/CollectionGrid";
import { SearchForm } from "@/components/search/SearchForm";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every piece in MODESSAE's closing down sale.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q ?? "").trim();
  const all = getAllProductCards();
  const results = q
    ? searchIndex(
        all.map((p) => ({
          handle: p.handle,
          title: p.title,
          type: p.type,
          tags: p.tags,
          colors: p.colors,
          price: p.price,
          compareAtPrice: p.compareAtPrice,
          image: p.image?.src ?? null,
        })),
        q,
      ).map((r) => all.find((p) => p.handle === r.handle)!)
    : all;

  return (
    <div className="container-site pb-16 pt-8 lg:pb-24 lg:pt-12">
      <h1 className="display-lg uppercase">{q ? "Search" : "All pieces"}</h1>
      <div className="mt-6 max-w-xl">
        <SearchForm initial={q} />
      </div>
      {q && (
        <p className="mt-6 text-ink-soft">
          {results.length === 0 ? (
            <>No products match “{q}”. Try a simpler word, like “dress” or “bag”.</>
          ) : (
            <>
              {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
            </>
          )}
        </p>
      )}
      <div className="mt-8">
        <CollectionGrid
          products={results}
          emptyText={q ? `Nothing found for “${q}”.` : "No products available."}
        />
      </div>
    </div>
  );
}
