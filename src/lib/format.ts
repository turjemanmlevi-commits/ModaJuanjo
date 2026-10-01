/** The store sells in AUD and shows prices as "$89.95" (Shopify money format "${{amount}}"). */
export function money(value: string | number): string {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(n)) return "$0.00";
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function savings(price: string, compareAt: string | null): number {
  if (!compareAt) return 0;
  const diff = parseFloat(compareAt) - parseFloat(price);
  return diff > 0 ? diff : 0;
}

export function percentOff(price: string, compareAt: string | null): number {
  if (!compareAt) return 0;
  const c = parseFloat(compareAt);
  const p = parseFloat(price);
  if (!c || c <= p) return 0;
  return Math.round(((c - p) / c) * 100);
}

/** Shopify CDN images accept a width query for responsive sizes. */
export function shopifyImage(src: string, width: number): string {
  try {
    const url = new URL(src);
    url.searchParams.set("width", String(width));
    return url.toString();
  } catch {
    return src;
  }
}

/** Product titles follow "Amelia | Camel Jumpsuit with …". Split name and description. */
export function splitTitle(title: string): { name: string; rest: string } {
  const i = title.indexOf("|");
  if (i === -1) return { name: title.trim(), rest: "" };
  return { name: title.slice(0, i).trim(), rest: title.slice(i + 1).trim() };
}

export function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}

/** Prefixes a public asset path with the deployment base path (needed for static hosting under a sub-path). */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return path.startsWith("/") ? base + path : path;
}
