"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import { COLLECTION_LETTER } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CollectionLetter() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const [first, ...rest] = COLLECTION_LETTER.paragraphs;

  return (
    <div className="grid gap-6 bg-beige-light p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
      <div className="lg:col-span-7">
        <h2 className="font-display text-xl uppercase tracking-wide">{COLLECTION_LETTER.title}</h2>
        <p className="mt-4 text-ink-soft">{first}</p>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="more"
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 text-ink-soft">
                {rest.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p>{COLLECTION_LETTER.thanks}</p>
                <p className="font-display text-lg text-ink">{COLLECTION_LETTER.signature}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
        >
          <span className="link-line">{open ? "Show less" : "Read the full letter"}</span>
          <CaretDown size={12} weight="bold" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className="lg:col-span-5">
        <div className="h-full bg-paper p-6">
          <p className="label">{COLLECTION_LETTER.extraTitle}</p>
          <ul className="mt-4 divide-y divide-line">
            {COLLECTION_LETTER.extras.map((e) => {
              const [pct, ...restWords] = e.split(" ");
              return (
                <li key={e} className="flex items-baseline gap-3 py-2.5">
                  <span className="w-14 font-display text-xl tabular-nums">{pct}</span>
                  <span className="text-sm text-ink-soft">{restWords.join(" ")}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-ink-mute">{COLLECTION_LETTER.extraNote}</p>
        </div>
      </div>
    </div>
  );
}
