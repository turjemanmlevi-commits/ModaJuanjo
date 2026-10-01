"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Sizing",
    body: (
      <>
        <p>Not sure which size to choose?</p>
        <p>
          Don&apos;t worry! To help you find the right fit, we&apos;ve put together a size chart. Just click the “Size
          Chart” link next to the size options on every product page.
        </p>
      </>
    ),
  },
  {
    title: "Secure payment",
    body: (
      <>
        <p>Secure payment: we use the most trusted payment providers in Australia and New Zealand.</p>
        <p>Pay 100% securely with your preferred payment method.</p>
      </>
    ),
  },
  {
    title: "Free shipping",
    body: (
      <p>
        We offer free tracked shipping to Australia and New Zealand. Orders are packed within 1–2 business days, and
        every order comes with a tracking number.
      </p>
    ),
  },
  {
    title: "30-day returns",
    body: (
      <>
        <p>Not sure yet?</p>
        <p>
          You have 30 days from delivery to return any unworn item with its tags attached. See our{" "}
          <Link href="/policies/refund-policy" className="underline underline-offset-2">
            refund policy
          </Link>{" "}
          for the details.
        </p>
      </>
    ),
  },
];

export function ProductAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  return (
    <ul className="mt-8 divide-y divide-line border-y border-line">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="label">{item.title}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
                <Plus size={16} weight="light" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="prose-store space-y-2 pb-5 text-sm text-ink-soft">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
