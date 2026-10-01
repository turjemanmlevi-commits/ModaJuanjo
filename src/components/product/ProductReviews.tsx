"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";
import { PRODUCT_REVIEWS, REVIEWS_SUMMARY } from "@/content/site";
import { asset } from "@/lib/format";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Horizontal, swipeable wall of customer photos and quotes. */
export function ProductReviews() {
  const reduce = useReducedMotion();
  return (
    <section className="border-t border-line bg-beige-light py-16 lg:py-24" aria-labelledby="product-reviews-heading">
      <div className="container-site flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="product-reviews-heading" className="display-md uppercase">
          {REVIEWS_SUMMARY.title}
        </h2>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-medium">
            {REVIEWS_SUMMARY.ratingWord} {REVIEWS_SUMMARY.rating}
          </span>
          <span className="flex gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} weight="fill" />
            ))}
          </span>
          <span className="text-ink-mute">{REVIEWS_SUMMARY.count}</span>
        </p>
      </div>
      <div className="scrollbar-none mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 sm:px-6 sm:scroll-pl-6 lg:mt-12 lg:gap-6 lg:px-10 lg:scroll-pl-10">
        {PRODUCT_REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name + i}
            className="flex w-[78vw] shrink-0 snap-start flex-col bg-paper sm:w-[46vw] lg:w-[23vw] xl:w-[19vw]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: EASE }}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={asset(r.image)}
                alt={`Photo shared by ${r.name} from ${r.city}`}
                fill
                sizes="(min-width: 1280px) 19vw, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-1 flex-col p-5">
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={12} weight="fill" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">“{r.quote}”</blockquote>
              <p className="mt-auto pt-4 text-xs text-ink-mute">
                <span className="font-medium text-ink">{r.name}</span> · {r.city} · {r.when}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
