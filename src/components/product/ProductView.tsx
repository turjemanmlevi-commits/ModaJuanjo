"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowsCounterClockwise, Check, Minus, Plus, Storefront, Truck } from "@phosphor-icons/react";
import type { Product, ProductVariant } from "@/lib/types";
import { money, percentOff, savings, splitTitle } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { CART_STRINGS } from "@/content/site";
import { ProductGallery } from "./ProductGallery";
import { ProductAccordion } from "./ProductAccordion";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST = [
  { icon: Truck, text: "Free tracked shipping to AU & NZ" },
  { icon: ArrowsCounterClockwise, text: "Easy 30-day returns" },
  { icon: Storefront, text: "Family-owned in Sydney since 2012" },
];

function findVariant(product: Product, selection: string[]): ProductVariant | undefined {
  return product.variants.find((v) => v.options.every((o, i) => o === selection[i]));
}

export function ProductView({
  product,
  breadcrumb,
}: {
  product: Product;
  breadcrumb: { label: string; href: string } | null;
}) {
  const cart = useCart();
  const reduce = useReducedMotion();
  const hasRealOptions = !(product.options.length === 1 && product.options[0].values.length === 1 && product.options[0].values[0] === "Default Title");

  const firstAvailable = product.variants.find((v) => v.available) ?? product.variants[0];
  const [selection, setSelection] = useState<string[]>(firstAvailable ? [...firstAvailable.options] : []);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = useMemo(() => findVariant(product, selection), [product, selection]);
  const price = variant?.price ?? product.variants[0]?.price ?? "0";
  const compare = variant?.compareAtPrice ?? product.variants[0]?.compareAtPrice ?? null;
  const saved = savings(price, compare);
  const off = percentOff(price, compare);
  const available = variant ? variant.available : false;
  const { name, rest } = splitTitle(product.title);

  const activeImage = useMemo(() => {
    if (variant?.featuredImageId) return variant.featuredImageId;
    const im = product.images.find((i) => variant && i.variantIds?.includes(variant.id));
    return im?.id ?? null;
  }, [variant, product.images]);

  const isOptionAvailable = (optionIndex: number, value: string) =>
    product.variants.some(
      (v) =>
        v.available &&
        v.options[optionIndex] === value &&
        v.options.every((o, i) => i === optionIndex || i > optionIndex || o === selection[i]),
    );

  const select = (optionIndex: number, value: string) => {
    setSelection((prev) => {
      const next = [...prev];
      next[optionIndex] = value;
      return next;
    });
  };

  const addToCart = () => {
    if (!variant || !available) return;
    const image =
      product.images.find((i) => i.id === variant.featuredImageId) ?? product.images[0] ?? null;
    cart.add(
      {
        variantId: variant.id,
        productHandle: product.handle,
        title: product.title,
        variantTitle: hasRealOptions ? variant.title : "",
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        image,
      },
      quantity,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="container-site pb-16 pt-6 lg:pb-24 lg:pt-8">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-ink-mute lg:mb-8">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="link-line">
              Home
            </Link>
          </li>
          {breadcrumb && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={breadcrumb.href} className="link-line">
                  {breadcrumb.label}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li className="text-ink" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} activeImageId={activeImage} />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <h1 className="display-md">{name}</h1>
              {rest && <p className="mt-2 text-ink-soft">{rest}</p>}

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {saved > 0 && <span className="price-strike text-ink-mute tabular-nums">{money(compare!)}</span>}
                <span className="font-display text-2xl tabular-nums">{money(price)}</span>
                {off > 0 && (
                  <span className="bg-ink-soft px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-paper">
                    {off}% off
                  </span>
                )}
                {saved > 0 && (
                  <span className="text-sm text-sale">
                    {CART_STRINGS.save} {money(saved)}
                  </span>
                )}
              </div>
            </motion.div>

            {hasRealOptions && (
              <div className="mt-8 space-y-6">
                {product.options.map((opt, optionIndex) => {
                  const isColor = /colou?r/i.test(opt.name);
                  return (
                    <fieldset key={opt.name}>
                      <legend className="mb-3 flex items-baseline gap-2 text-sm">
                        <span className="label">{opt.name}</span>
                        <span className="text-ink-mute">{selection[optionIndex]}</span>
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map((value) => {
                          const selected = selection[optionIndex] === value;
                          const enabled = isOptionAvailable(optionIndex, value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => select(optionIndex, value)}
                              aria-pressed={selected}
                              className={`relative border px-4 py-2.5 text-sm transition-colors duration-300 ${
                                selected
                                  ? "border-ink bg-ink text-paper"
                                  : "border-line bg-paper text-ink hover:border-ink"
                              } ${!enabled ? "text-ink-mute line-through decoration-ink-mute/60" : ""} ${isColor ? "min-w-[4.5rem]" : "min-w-[3.25rem]"}`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="inline-flex h-[3.25rem] items-center border border-line">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-full w-12 items-center justify-center transition-colors hover:bg-paper-dim"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-full w-12 items-center justify-center transition-colors hover:bg-paper-dim"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={addToCart}
                disabled={!available}
                className="btn btn-primary flex-1"
                aria-live="polite"
              >
                {!available ? CART_STRINGS.soldOut : justAdded ? "Added to cart" : "Add to cart"}
                {available && (
                  <span className="btn-icon">
                    {justAdded ? <Check size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                  </span>
                )}
              </button>
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-ink-mute">
              {available ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-600/60 motion-safe:animate-dot" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
                  </span>
                  {CART_STRINGS.inStock}
                </>
              ) : (
                CART_STRINGS.unavailable
              )}
            </p>

            <ul className="mt-8 grid gap-3 border-y border-line py-5 text-sm text-ink-soft">
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon size={20} weight="light" className="shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-beige-light p-5">
              <p className="label">🤍 Closing down sale</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                After 14 years we&apos;re closing our boutique, and everything left is <strong className="font-medium text-ink">50% off</strong>. As long as you can still click “Add to cart”, this piece is still available at its closing-down price.
              </p>
            </div>

            <div
              className="prose-store mt-8 text-[0.95rem] text-ink-soft"
              dangerouslySetInnerHTML={{ __html: product.bodyHtml }}
            />

            <ProductAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
