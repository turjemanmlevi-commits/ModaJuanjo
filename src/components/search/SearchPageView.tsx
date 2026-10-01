"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchIndex, type SearchEntry } from "@/lib/search";
import type { ProductCard } from "@/lib/types";
import { CollectionGrid } from "@/components/collection/CollectionGrid";
import { SearchForm } from "./SearchForm";

function toCard(e: SearchEntry): ProductCard {
  return {
    id: 0,
    handle: e.handle,
    title: e.title,
    type: e.type,
    tags: e.tags,
    createdAt: "",
    price: e.price,
    compareAtPrice: e.compareAtPrice,
    available: true,
    image: e.image ? { src: e.image, width: 900, height: 1200, alt: e.title } : null,
    hoverImage: null,
    colors: e.colors,
    sizes: [],
  };
}

export function SearchPageView() {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/search-index.json`)
      .then((r) => r.json())
      .then((data: SearchEntry[]) => setIndex(data))
      .catch(() => setFailed(true));
  }, []);

  const results = useMemo(() => {
    if (!index) return [];
    return (q ? searchIndex(index, q) : index).map(toCard);
  }, [index, q]);

  return (
    <div className="container-site pb-16 pt-8 lg:pb-24 lg:pt-12">
      <h1 className="display-lg uppercase">{q ? "Search" : "All pieces"}</h1>
      <div className="mt-6 max-w-xl">
        <SearchForm initial={q} />
      </div>
      {failed && <p className="mt-6 text-sale">We couldn&apos;t load the catalogue. Please refresh the page.</p>}
      {!index && !failed && (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Loading results">
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i}>
              <div className="animate-pulse bg-paper-dim" style={{ aspectRatio: "3 / 4" }} />
              <div className="mt-3 h-4 w-2/3 animate-pulse bg-paper-dim" />
              <div className="mt-2 h-3 w-1/3 animate-pulse bg-paper-dim" />
            </li>
          ))}
        </ul>
      )}
      {index && q && (
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
      {index && (
        <div className="mt-8">
          <CollectionGrid products={results} emptyText={q ? `Nothing found for “${q}”.` : "No products available."} />
        </div>
      )}
    </div>
  );
}
