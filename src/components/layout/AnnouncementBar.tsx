"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ANNOUNCEMENTS } from "@/content/site";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="bg-beige text-ink">
      <div className="container-site relative flex h-9 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            className="label absolute inset-x-0 text-center"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
          >
            {ANNOUNCEMENTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
