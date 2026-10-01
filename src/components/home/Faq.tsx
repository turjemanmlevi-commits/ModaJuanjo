"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import type { Faq as FaqType } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Faq({
  title,
  items,
  aside,
  id = "faq",
}: {
  title: string;
  items: FaqType[];
  aside?: React.ReactNode;
  id?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line py-16 lg:py-24" aria-labelledby={`${id}-heading`}>
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 id={`${id}-heading`} className="display-md">
              {title}
            </h2>
            {aside && <div className="mt-6 text-ink-soft">{aside}</div>}
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${id}-panel-${i}`;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
                  >
                    <span className="font-display text-lg lg:text-xl">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="shrink-0 text-ink-mute"
                    >
                      <Plus size={20} weight="light" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="prose-store space-y-3 pb-6 text-ink-soft lg:pr-12">
                          {item.a.map((p, k) => (
                            <p key={k}>{p}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
