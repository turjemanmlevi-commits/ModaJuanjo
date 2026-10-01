"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
};

/** Heavy fade-up on viewport entry. Collapses to static under reduced motion. */
export function Reveal({ delay = 0, y = 28, amount = 0.25, once = true, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;
const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

/**
 * Masked text reveals observe the un-clipped parent and drive the clipped
 * children through variants (a clipped child never reaches an
 * IntersectionObserver threshold on its own).
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.09,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = TAGS[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Headline that enters word by word, each word rising out of a blur. */
export function RevealWords({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = TAGS[Tag];
  const words = text.split(" ");
  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] pr-[0.28em] align-top" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "100%", opacity: 0, filter: "blur(8px)" }, show: { y: 0, opacity: 1, filter: "blur(0px)" } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
