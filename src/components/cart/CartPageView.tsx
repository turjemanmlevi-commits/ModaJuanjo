"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useCart } from "./CartProvider";
import { CartLineItem } from "./CartLineItem";
import { money } from "@/lib/format";
import { CART_STRINGS } from "@/content/site";

export function CartPageView() {
  const cart = useCart();
  const saved = cart.compareSubtotal - cart.subtotal;

  return (
    <div className="container-site pb-16 pt-8 lg:pb-24 lg:pt-12">
      <h1 className="display-lg uppercase">Cart</h1>

      {!cart.hydrated ? (
        <div className="mt-10 space-y-4" aria-busy="true" aria-label="Loading cart">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-32 w-24 animate-pulse bg-paper-dim" />
              <div className="flex-1 space-y-3 pt-2">
                <div className="h-4 w-1/2 animate-pulse bg-paper-dim" />
                <div className="h-3 w-1/3 animate-pulse bg-paper-dim" />
              </div>
            </div>
          ))}
        </div>
      ) : cart.lines.length === 0 ? (
        <div className="mt-10 border-y border-line py-20 text-center">
          <p className="font-display text-xl">{CART_STRINGS.empty}</p>
          <Link href="/collections/abiti" className="btn btn-primary mt-8">
            Shop now
            <span className="btn-icon">
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="divide-y divide-line border-y border-line lg:col-span-7">
            {cart.lines.map((line) => (
              <CartLineItem key={line.variantId} line={line} />
            ))}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="bg-beige-light p-6 lg:p-8">
              {saved > 0 && (
                <p className="mb-3 flex justify-between text-sm text-sale">
                  <span>Closing sale savings</span>
                  <span className="tabular-nums">−{money(saved)}</span>
                </p>
              )}
              <p className="flex items-baseline justify-between">
                <span className="font-display text-lg">{CART_STRINGS.subtotal}</span>
                <span className="font-display text-2xl tabular-nums">{money(cart.subtotal)}</span>
              </p>
              <p className="mt-3 text-sm text-ink-mute">{CART_STRINGS.note}</p>
              <a href={cart.checkoutUrl} className="btn btn-primary mt-6 w-full">
                {CART_STRINGS.checkout}
                <span className="btn-icon">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </a>
              <Link href="/collections/abiti" className="link-line mx-auto mt-5 block w-max text-sm">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
