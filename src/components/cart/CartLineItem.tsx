"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "@phosphor-icons/react";
import type { CartLine } from "@/lib/types";
import { money, shopifyImage, splitTitle } from "@/lib/format";
import { useCart } from "./CartProvider";

export function CartLineItem({ line, compact = false }: { line: CartLine; compact?: boolean }) {
  const { setQuantity, remove } = useCart();
  const { name, rest } = splitTitle(line.title);
  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/products/${line.productHandle}`}
        className="relative block w-20 shrink-0 overflow-hidden bg-paper-dim sm:w-24"
        style={{ aspectRatio: "3 / 4" }}
      >
        {line.image && (
          <Image
            src={shopifyImage(line.image.src, 300)}
            alt={line.image.alt ?? line.title}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/products/${line.productHandle}`} className="block font-display text-base leading-tight">
              {name}
            </Link>
            {rest && !compact && (
              <p className="mt-1 line-clamp-2 text-sm text-ink-mute">{rest}</p>
            )}
            {line.variantTitle && line.variantTitle !== "Default Title" && (
              <p className="mt-1 text-sm text-ink-mute">{line.variantTitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => remove(line.variantId)}
            aria-label={`Remove ${name} from cart`}
            className="-mr-1 -mt-1 p-1 text-ink-mute transition-colors hover:text-ink"
          >
            <X size={18} weight="light" />
          </button>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="inline-flex items-center border border-line">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(line.variantId, line.quantity - 1)}
              className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-paper-dim"
            >
              <Minus size={14} weight="regular" />
            </button>
            <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity(line.variantId, line.quantity + 1)}
              className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-paper-dim"
            >
              <Plus size={14} weight="regular" />
            </button>
          </div>
          <div className="text-right">
            {line.compareAtPrice && parseFloat(line.compareAtPrice) > parseFloat(line.price) && (
              <span className="price-strike mr-2 text-sm text-ink-mute">
                {money(parseFloat(line.compareAtPrice) * line.quantity)}
              </span>
            )}
            <span className="font-medium tabular-nums">{money(parseFloat(line.price) * line.quantity)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
