import { Hero } from "@/components/home/Hero";
import { SaleStrip } from "@/components/home/SaleStrip";
import { CategoryRail, type CategoryTile } from "@/components/home/CategoryRail";
import { BestSellers } from "@/components/home/BestSellers";
import { Reviews } from "@/components/home/Reviews";
import { Farewell } from "@/components/home/Farewell";
import { Faq } from "@/components/home/Faq";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { ClosingContact } from "@/components/home/ClosingContact";
import { BEST_SELLER_HANDLES, getCollection, getCollectionProducts, getProductsByHandles } from "@/lib/catalog";
import { FAQS, FAQ_TITLE } from "@/content/site";
import { STORE } from "@/lib/menu";

const CATEGORY_HANDLES = [
  "abiti",
  "salopette",
  "bluse-top",
  "cardigan",
  "pantaloni",
  "gonna",
  "costumi",
  "borse",
  "mocassini",
  "sneakers",
  "sandali",
  "tacchi",
  "scarpe-mary-jane",
  "occhiali-da-sole",
];

export default function HomePage() {
  const bestSellers = getProductsByHandles(BEST_SELLER_HANDLES);
  const tiles: CategoryTile[] = CATEGORY_HANDLES.flatMap((handle) => {
    const c = getCollection(handle);
    if (!c) return [];
    const products = getCollectionProducts(handle);
    const withImage = products.find((p) => p.image);
    return [
      {
        handle,
        title: c.title,
        count: products.length,
        image: withImage?.image ? { src: withImage.image.src, alt: withImage.image.alt ?? c.title } : null,
      },
    ];
  });

  return (
    <>
      <Hero />
      <SaleStrip />
      <CategoryRail tiles={tiles} />
      <BestSellers products={bestSellers} />
      <Reviews />
      <Farewell />
      <Faq
        title={FAQ_TITLE}
        items={FAQS}
        aside={
          <p>
            Still have a question? Email us any time at{" "}
            <a href={`mailto:${STORE.email}`} className="link-line font-medium text-ink">
              {STORE.email}
            </a>
            .
          </p>
        }
      />
      <ServiceStrip />
      <ClosingContact />
    </>
  );
}
