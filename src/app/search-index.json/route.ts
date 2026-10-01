import { getAllProductCards } from "@/lib/catalog";
import type { SearchEntry } from "@/lib/search";

export const dynamic = "force-static";

export function GET() {
  const entries: SearchEntry[] = getAllProductCards().map((p) => ({
    handle: p.handle,
    title: p.title,
    type: p.type,
    tags: p.tags.filter((t) => /^[A-Za-z][A-Za-z &-]+$/.test(t)),
    colors: p.colors,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    image: p.image?.src ?? null,
  }));
  return Response.json(entries, {
    headers: { "cache-control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
