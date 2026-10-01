"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import type { ProductCard as ProductCardType } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

const PAGE = 24;

type SortKey = "featured" | "title-asc" | "title-desc" | "price-asc" | "price-desc" | "created-desc" | "created-asc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "title-asc", label: "Alphabetically, A-Z" },
  { key: "title-desc", label: "Alphabetically, Z-A" },
  { key: "price-asc", label: "Price, low to high" },
  { key: "price-desc", label: "Price, high to low" },
  { key: "created-asc", label: "Date, old to new" },
  { key: "created-desc", label: "Date, new to old" },
];

function sortProducts(list: ProductCardType[], key: SortKey): ProductCardType[] {
  const copy = [...list];
  switch (key) {
    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return copy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case "price-desc":
      return copy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    case "created-asc":
      return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    case "created-desc":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return copy;
  }
}

export function CollectionGrid({ products, emptyText }: { products: ProductCardType[]; emptyText: string }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [shown, setShown] = useState(PAGE);
  const reduce = useReducedMotion();
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);
  const visible = sorted.slice(0, shown);

  if (products.length === 0) {
    return (
      <div className="border-y border-line py-20 text-center">
        <p className="font-display text-xl">{emptyText}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-y border-line py-3">
        <p className="text-sm text-ink-mute tabular-nums">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <label className="relative inline-flex items-center gap-2 text-sm">
          <span className="text-ink-mute">Sort</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setShown(PAGE);
            }}
            className="appearance-none bg-transparent py-1 pl-1 pr-6 font-medium outline-none focus-visible:underline"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <CaretDown size={12} weight="bold" className="pointer-events-none absolute right-1" />
        </label>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
        {visible.map((p, i) => (
          <motion.li
            key={p.handle}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard product={p} priority={i < 4} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
          </motion.li>
        ))}
      </ul>

      {shown < sorted.length && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-xs text-ink-mute tabular-nums">
            Showing {visible.length} of {sorted.length}
          </p>
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-outline">
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
