export type SearchEntry = {
  handle: string;
  title: string;
  type: string;
  tags: string[];
  colors: string[];
  price: string;
  compareAtPrice: string | null;
  image: string | null;
};

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

/** Token search across title, type, tags and colours. Every token must match. */
export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const tokens = normalise(query).split(/\s+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return [];
  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of index) {
    const title = normalise(entry.title);
    const haystack = `${title} ${normalise(entry.type)} ${normalise(entry.tags.join(" "))} ${normalise(entry.colors.join(" "))}`;
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (title.includes(t)) score += title.startsWith(t) ? 3 : 2;
      else if (haystack.includes(t)) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (ok) scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}
