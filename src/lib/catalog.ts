import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import productsJson from "../../data/products.json";
import collectionsJson from "../../data/collections.json";
import type { Collection, Product, ProductCard } from "./types";

const PRODUCTS = productsJson as ProductCard[];
const COLLECTIONS = collectionsJson as Collection[];
const DATA_DIR = path.join(process.cwd(), "data", "products");

const cardByHandle = new Map(PRODUCTS.map((p) => [p.handle, p]));
const collectionByHandle = new Map(COLLECTIONS.map((c) => [c.handle, c]));

export function getAllProductCards(): ProductCard[] {
  return PRODUCTS;
}

export function getProductCard(handle: string): ProductCard | undefined {
  return cardByHandle.get(handle);
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!/^[a-z0-9-]+$/i.test(handle) || !cardByHandle.has(handle)) return null;
  try {
    const raw = await readFile(path.join(DATA_DIR, handle + ".json"), "utf8");
    return JSON.parse(raw) as Product;
  } catch {
    return null;
  }
}

export function getAllCollections(): Collection[] {
  return COLLECTIONS;
}

export function getCollection(handle: string): Collection | undefined {
  return collectionByHandle.get(handle);
}

/**
 * Parent collections that are empty on the live store but act as a menu
 * heading (e.g. "Shoes") show everything from their child collections.
 */
const PARENT_FALLBACK: Record<string, string[]> = {
  scarpe: ["mocassini", "sneakers", "sandali", "tacchi", "scarpe-mary-jane"],
};

export function getCollectionProducts(handle: string): ProductCard[] {
  const c = collectionByHandle.get(handle);
  if (!c) return [];
  let handles = c.productHandles;
  if (handles.length === 0 && PARENT_FALLBACK[handle]) {
    const seen = new Set<string>();
    handles = PARENT_FALLBACK[handle]
      .flatMap((h) => collectionByHandle.get(h)?.productHandles ?? [])
      .filter((h) => (seen.has(h) ? false : (seen.add(h), true)));
  }
  return handles
    .map((h) => cardByHandle.get(h))
    .filter((p): p is ProductCard => Boolean(p));
}

/** Collections a product belongs to (used for breadcrumbs and related items). */
export function getCollectionsForProduct(handle: string): Collection[] {
  return COLLECTIONS.filter((c) => c.productHandles.includes(handle));
}

export function getRelatedProducts(handle: string, limit = 8): ProductCard[] {
  const seen = new Set<string>([handle]);
  const out: ProductCard[] = [];
  const cols = getCollectionsForProduct(handle);
  for (const c of cols) {
    for (const h of c.productHandles) {
      if (seen.has(h)) continue;
      const p = cardByHandle.get(h);
      if (!p) continue;
      seen.add(h);
      out.push(p);
      if (out.length >= limit) return out;
    }
  }
  const me = cardByHandle.get(handle);
  for (const p of PRODUCTS) {
    if (out.length >= limit) break;
    if (seen.has(p.handle)) continue;
    if (me && p.type && p.type === me.type) {
      seen.add(p.handle);
      out.push(p);
    }
  }
  for (const p of PRODUCTS) {
    if (out.length >= limit) break;
    if (seen.has(p.handle)) continue;
    seen.add(p.handle);
    out.push(p);
  }
  return out;
}

export function getProductsByHandles(handles: string[]): ProductCard[] {
  return handles
    .map((h) => cardByHandle.get(h))
    .filter((p): p is ProductCard => Boolean(p));
}

/** The five "best sellers" the live homepage features, in order. */
export const BEST_SELLER_HANDLES = [
  "agata-abito",
  "donatella-completo",
  "lavinia1",
  "zaira",
  "zenaide-tuta",
];
