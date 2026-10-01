import Image from "next/image";
import Link from "next/link";
import type { ProductCard as ProductCardType } from "@/lib/types";
import { money, savings, shopifyImage, splitTitle } from "@/lib/format";
import { CART_STRINGS } from "@/content/site";

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  large = false,
}: {
  product: ProductCardType;
  priority?: boolean;
  sizes?: string;
  large?: boolean;
}) {
  const { name, rest } = splitTitle(product.title);
  const saved = savings(product.price, product.compareAtPrice);
  const onSale = saved > 0;
  const colourCount = product.colors.length;

  return (
    <article className="group relative flex h-full flex-col">
      <Link
        href={`/products/${product.handle}`}
        className="relative block overflow-hidden bg-paper-dim"
        style={{ aspectRatio: "3 / 4" }}
        aria-label={product.title}
      >
        {product.image && (
          <Image
            src={shopifyImage(product.image.src, large ? 1200 : 700)}
            alt={product.image.alt ?? product.title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />
        )}
        {product.hoverImage && (
          <Image
            src={shopifyImage(product.hoverImage.src, large ? 1200 : 700)}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 motion-reduce:hidden"
          />
        )}
        {onSale && product.available && (
          <span className="absolute left-3 top-3 bg-ink-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-paper">
            Sale
          </span>
        )}
        {!product.available && (
          <span className="absolute left-3 top-3 bg-paper px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ink">
            {CART_STRINGS.soldOut}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3.5">
        <h3 className={`font-display ${large ? "text-xl" : "text-base"} leading-tight`}>
          <Link href={`/products/${product.handle}`} className="after:absolute after:inset-0 after:content-['']">
            {name}
          </Link>
        </h3>
        {rest && <p className={`mt-1 ${large ? "" : "line-clamp-2 text-sm"} text-ink-mute`}>{rest}</p>}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-sm">
          {onSale && (
            <span className="price-strike text-ink-mute tabular-nums">{money(product.compareAtPrice!)}</span>
          )}
          <span className="font-medium tabular-nums">{money(product.price)}</span>
          {onSale && (
            <span className="text-xs text-sale">
              {CART_STRINGS.save} {money(saved)}
            </span>
          )}
        </div>
        {colourCount > 1 && (
          <p className="mt-1 text-xs text-ink-mute">
            {colourCount} colours
          </p>
        )}
      </div>
    </article>
  );
}
