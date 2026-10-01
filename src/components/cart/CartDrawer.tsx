"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "@phosphor-icons/react";
import { useCart } from "./CartProvider";
import { CartLineItem } from "./CartLineItem";
import { money } from "@/lib/format";
import { CART_STRINGS } from "@/content/site";
import { useEscape, useScrollLock } from "@/components/layout/UIProvider";

export function CartDrawer() {
  const cart = useCart();
  const reduce = useReducedMotion();
  useScrollLock(cart.isOpen);
  useEscape(cart.isOpen, cart.close);

  const saved = cart.compareSubtotal - cart.subtotal;

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={cart.close}
            className="fixed inset-0 bg-ink/35 backdrop-blur-[2px]"
            style={{ zIndex: "var(--z-overlay)" as unknown as number }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-lift"
            style={{ zIndex: "var(--z-drawer)" as unknown as number }}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl">
                Cart{" "}
                {cart.count > 0 && (
                  <span className="ml-1 text-sm text-ink-mute">({cart.count})</span>
                )}
              </h2>
              <button
                type="button"
                onClick={cart.close}
                aria-label="Close cart"
                className="-mr-2 p-2 transition-transform hover:rotate-90"
              >
                <X size={22} weight="light" />
              </button>
            </header>

            {cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="text-ink-mute">{CART_STRINGS.empty}</p>
                <Link href="/collections/abiti" onClick={cart.close} className="btn btn-primary">
                  Shop the sale
                  <span className="btn-icon">
                    <ArrowRight size={14} weight="bold" />
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {cart.lines.map((line, i) => (
                      <motion.div
                        key={line.variantId}
                        layout
                        initial={reduce ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <CartLineItem line={line} compact />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <footer className="border-t border-line bg-paper px-6 pb-6 pt-5">
                  {saved > 0 && (
                    <p className="mb-3 flex justify-between text-sm text-sale">
                      <span>Closing sale savings</span>
                      <span className="tabular-nums">−{money(saved)}</span>
                    </p>
                  )}
                  <p className="flex items-baseline justify-between">
                    <span className="font-display text-lg">{CART_STRINGS.subtotal}</span>
                    <span className="font-display text-xl tabular-nums">{money(cart.subtotal)}</span>
                  </p>
                  <p className="mt-2 text-sm text-ink-mute">{CART_STRINGS.note}</p>
                  <a href={cart.checkoutUrl} className="btn btn-primary mt-5 w-full">
                    {CART_STRINGS.checkout}
                    <span className="btn-icon">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </a>
                  <Link
                    href="/cart"
                    onClick={cart.close}
                    className="link-line mx-auto mt-4 block w-max text-sm text-ink-mute hover:text-ink"
                  >
                    View cart
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
