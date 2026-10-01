import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProductCards,
  getCollectionsForProduct,
  getProduct,
  getRelatedProducts,
} from "@/lib/catalog";
import { ProductView } from "@/components/product/ProductView";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ProductReviews } from "@/components/product/ProductReviews";
import { money, shopifyImage, splitTitle } from "@/lib/format";

type Params = { handle: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllProductCards().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  const { name, rest } = splitTitle(product.title);
  const v = product.variants[0];
  const text = product.bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return {
    title: product.title,
    description: `${rest || name}. Now ${money(v.price)} in the closing down sale. ${text.slice(0, 140)}`,
    openGraph: {
      title: product.title,
      images: product.images[0] ? [{ url: shopifyImage(product.images[0].src, 1200) }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const collections = getCollectionsForProduct(handle);
  const crumb = collections[0]
    ? {
        label: collections[0].title.charAt(0) + collections[0].title.slice(1).toLowerCase(),
        href: `/collections/${collections[0].handle}`,
      }
    : null;
  const related = getRelatedProducts(handle, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => i.src),
    description: product.bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    brand: { "@type": "Brand", name: "MODESSAE" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: Math.min(...product.variants.map((v) => parseFloat(v.price))).toFixed(2),
      highPrice: Math.max(...product.variants.map((v) => parseFloat(v.price))).toFixed(2),
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.available)
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} breadcrumb={crumb} />

      {related.length > 0 && (
        <section className="border-t border-line py-16 lg:py-24" aria-labelledby="related-heading">
          <div className="container-site">
            <Reveal>
              <h2 id="related-heading" className="display-md">
                Mix &amp; match and save an extra 10%
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Extra savings apply automatically at checkout: 10% extra on 2 pieces, 15% on 3, 20% on 4 and 25% on 5 or more.
              </p>
            </Reveal>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {related.map((p, i) => (
                <Reveal key={p.handle} delay={i * 0.06} amount={0.15}>
                  <li>
                    <ProductCard product={p} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ProductReviews />
    </>
  );
}
