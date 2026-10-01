"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { HERO } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-beige-light">
      <div className="grid min-h-[calc(100dvh-6.5rem)] lg:grid-cols-12">
        <motion.div
          className="order-2 flex flex-col justify-center px-5 pb-14 pt-10 sm:px-8 lg:order-1 lg:col-span-5 lg:px-10 lg:pb-20 lg:pt-14 xl:px-16"
          style={{ y: copyY }}
        >
          <h1 className="font-display uppercase leading-[1.02] text-[clamp(2rem,0.8rem+2.3vw,3rem)]">
            {["After 14 years,", "we're closing"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 flex flex-wrap items-baseline gap-x-3 font-display uppercase"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
          >
            <span className="text-lg tracking-[0.14em] sm:text-xl">Everything</span>
            <span className="leading-none text-[clamp(3.5rem,2rem+5vw,6.5rem)]">50% off</span>
          </motion.p>

          <motion.div
            className="mt-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          >
            <Link href={HERO.ctaHref} className="btn btn-primary">
              {HERO.cta}
              <span className="btn-icon">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative order-1 min-h-[62vw] overflow-hidden lg:order-2 lg:col-span-7 lg:min-h-0">
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY, scale: imageScale }}
            initial={reduce ? false : { scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <Image
              src="/images/hero.jpg"
              alt={HERO.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[68%_35%]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-beige-light/60 to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
