"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Photo enters through a wipe mask while settling from a slight zoom.
 * The observed element is an un-clipped wrapper: Chrome treats a fully
 * clip-path'ed element as never intersecting, so it can't observe itself.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const hidden =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : direction === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{ hidden: { clipPath: hidden }, show: { clipPath: "inset(0 0 0 0)" } }}
        transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1 } }}
          transition={{ duration: 1.7, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
