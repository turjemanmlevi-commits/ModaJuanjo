"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";
import { REVIEWS, REVIEWS_SUMMARY } from "@/content/site";
import { RevealWords } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reviews() {
  const reduce = useReducedMotion();
  return (
    <section className="border-t border-line bg-beige-light py-16 lg:py-24" aria-labelledby="reviews-heading">
      <div className="container-site">
        <motion.div
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <RevealWords id="reviews-heading" text={REVIEWS_SUMMARY.title} className="display-md uppercase" />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-medium">
              {REVIEWS_SUMMARY.ratingWord} {REVIEWS_SUMMARY.rating}
            </span>
            <span className="flex gap-0.5 text-ink" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} weight="fill" />
              ))}
            </span>
            <span className="text-ink-mute">{REVIEWS_SUMMARY.count}</span>
          </p>
        </motion.div>
      </div>

      <div className="scrollbar-none mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 sm:px-6 sm:scroll-pl-6 lg:mt-12 lg:block lg:columns-3 lg:gap-6 lg:overflow-visible lg:px-10 xl:mx-auto xl:max-w-[90rem]">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name + r.city + i}
            className="group w-[78vw] shrink-0 snap-start bg-paper transition-shadow duration-700 hover:shadow-lift sm:w-[52vw] lg:mb-6 lg:w-auto lg:break-inside-avoid"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reduce ? undefined : { y: -6 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE }}
          >
            <div className={`relative overflow-hidden ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-square"}`}>
              <Image
                src={r.image}
                alt={`Photo shared by ${r.name} from ${r.city}`}
                fill
                sizes="(min-width: 1024px) 30vw, 78vw"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </div>
            <figcaption className="p-5 lg:p-6">
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={12} weight="fill" />
                ))}
              </div>
              <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                “{r.quote}”
              </blockquote>
              <p className="mt-4 text-xs text-ink-mute">
                <span className="font-medium text-ink">{r.name}</span> · {r.city} · {r.when}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
