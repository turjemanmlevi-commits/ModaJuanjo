import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getAllCollections, getAllProductCards, getCollectionProducts } from "@/lib/catalog";

const BASE = "https://modessae.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/collections",
    "/search",
    "/pages/nostra-storia",
    "/pages/contact",
    "/pages/lavora-con-noi",
    "/pages/track-your-order",
    "/policies/privacy-policy",
    "/policies/refund-policy",
    "/policies/shipping-policy",
    "/policies/terms-of-service",
  ].map((path) => ({ url: BASE + path, lastModified: now }));

  const collections = getAllCollections()
    .filter((c) => getCollectionProducts(c.handle).length > 0)
    .map((c) => ({ url: `${BASE}/collections/${c.handle}`, lastModified: new Date(c.updatedAt) }));

  const products = getAllProductCards().map((p) => ({
    url: `${BASE}/products/${p.handle}`,
    lastModified: new Date(p.createdAt),
  }));

  return [...staticPages, ...collections, ...products];
}
