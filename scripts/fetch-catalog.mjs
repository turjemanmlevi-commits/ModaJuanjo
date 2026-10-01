/**
 * Pulls the live MODESSAE catalogue (Shopify storefront JSON) into ./data
 * so the site can be built statically.
 *
 *   node scripts/fetch-catalog.mjs
 *
 * Set CATALOG_CACHE_DIR to reuse previously downloaded JSON (useful when
 * the store rate-limits: every response is cached there by key).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const STORE = "https://modessae.com";
const OUT = path.resolve("data");
const CACHE = process.env.CATALOG_CACHE_DIR ? path.resolve(process.env.CATALOG_CACHE_DIR) : null;
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(route, cacheKey) {
  if (CACHE) {
    const f = path.join(CACHE, cacheKey + ".json");
    if (existsSync(f)) {
      const raw = await readFile(f, "utf8");
      try {
        return JSON.parse(raw);
      } catch {
        /* fall through to a live fetch */
      }
    }
  }
  for (let attempt = 1; attempt <= 5; attempt++) {
    const res = await fetch(STORE + route, {
      headers: { "user-agent": UA, "accept-language": "en-AU,en;q=0.9" },
    });
    const text = await res.text();
    if (res.ok && !text.includes("Verifying your connection")) {
      const json = JSON.parse(text);
      if (CACHE) {
        await mkdir(CACHE, { recursive: true });
        await writeFile(path.join(CACHE, cacheKey + ".json"), text);
      }
      return json;
    }
    console.warn(`  ${route} -> ${res.status}, retry ${attempt}`);
    await sleep(attempt * 15000);
  }
  throw new Error("Could not fetch " + route);
}

function slim(p) {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    type: p.product_type,
    tags: p.tags,
    createdAt: p.created_at,
    publishedAt: p.published_at,
    bodyHtml: p.body_html,
    options: p.options.map((o) => ({ name: o.name, values: o.values })),
    variants: p.variants.map((v) => ({
      id: v.id,
      title: v.title,
      options: [v.option1, v.option2, v.option3].filter((x) => x != null),
      price: v.price,
      compareAtPrice: v.compare_at_price,
      available: v.available,
      sku: v.sku,
      featuredImageId: v.featured_image ? v.featured_image.id : null,
    })),
    images: p.images.map((im) => ({
      id: im.id,
      src: im.src,
      width: im.width,
      height: im.height,
      alt: im.alt,
      variantIds: im.variant_ids || [],
    })),
  };
}

async function main() {
  await mkdir(path.join(OUT, "products"), { recursive: true });

  const products = [];
  for (let page = 1; page <= 20; page++) {
    console.log("products page", page);
    const json = await getJSON(`/products.json?limit=250&page=${page}`, `products-page-${page}`);
    if (!json.products.length) break;
    products.push(...json.products.map(slim));
    if (json.products.length < 250) break;
    await sleep(4000);
  }
  console.log("total products", products.length);

  console.log("collections");
  const colJson = await getJSON(`/collections.json?limit=250`, `collections`);
  const collections = [];
  for (const c of colJson.collections) {
    if (c.handle === "closing-ads") continue;
    await sleep(4000);
    console.log("  members of", c.handle);
    const members = await getJSON(
      `/collections/${c.handle}/products.json?limit=250`,
      `collection-${c.handle}`,
    );
    collections.push({
      id: c.id,
      handle: c.handle,
      title: c.title,
      description: c.body_html || "",
      updatedAt: c.updated_at,
      productHandles: members.products.map((p) => p.handle),
    });
  }

  const byHandle = new Map(products.map((p) => [p.handle, p]));
  for (const c of collections) {
    for (const h of c.productHandles) {
      if (!byHandle.has(h)) {
        console.warn("  collection", c.handle, "lists unknown product", h);
      }
    }
  }

  const list = products.map((p) => {
    const v0 = p.variants[0];
    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      type: p.type,
      tags: p.tags,
      createdAt: p.createdAt,
      price: v0 ? v0.price : "0",
      compareAtPrice: v0 ? v0.compareAtPrice : null,
      available: p.variants.some((v) => v.available),
      image: p.images[0] ? { src: p.images[0].src, width: p.images[0].width, height: p.images[0].height, alt: p.images[0].alt } : null,
      hoverImage: p.images[1] ? { src: p.images[1].src, width: p.images[1].width, height: p.images[1].height, alt: p.images[1].alt } : null,
      colors: (p.options.find((o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") || { values: [] }).values,
      sizes: (p.options.find((o) => o.name.toLowerCase() === "size") || { values: [] }).values,
    };
  });

  await writeFile(path.join(OUT, "products.json"), JSON.stringify(list));
  await writeFile(path.join(OUT, "collections.json"), JSON.stringify(collections, null, 1));
  for (const p of products) {
    await writeFile(path.join(OUT, "products", p.handle + ".json"), JSON.stringify(p));
  }
  await writeFile(
    path.join(OUT, "meta.json"),
    JSON.stringify({ fetchedAt: new Date().toISOString(), productCount: products.length }, null, 1),
  );
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
