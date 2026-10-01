import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ProductCard as ProductCardType } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { BEST_SELLERS_TITLE } from "@/content/site";

export function BestSellers({ products }: { products: ProductCardType[] }) {
  const [first, ...rest] = products;
  if (!first) return null;
  return (
    <section className="border-t border-line py-16 lg:py-24" aria-labelledby="best-sellers-heading">
      <div className="container-site">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="best-sellers-heading" className="display-md uppercase">
            {BEST_SELLERS_TITLE}
          </h2>
          <Link href="/collections/abiti" className="inline-flex items-center gap-2 text-sm">
            <span className="link-line">View all dresses</span>
            <ArrowRight size={14} weight="regular" />
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-12 lg:grid-cols-4 lg:gap-x-6">
          <Reveal className="col-span-2 lg:row-span-2" amount={0.15}>
            <ProductCard product={first} large sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.handle} delay={0.08 + i * 0.06} amount={0.15}>
              <ProductCard product={p} sizes="(min-width: 1024px) 25vw, 50vw" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
