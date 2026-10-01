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

/** Splits a headline into lines and reveals them with a clip mask, one after another. */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
