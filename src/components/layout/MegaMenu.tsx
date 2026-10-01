"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import type { MenuItem } from "@/lib/menu";
import { shopifyImage } from "@/lib/format";

export type MenuPreview = {
  title: string;
  count: number;
  products: { handle: string; title: string; src: string; alt: string }[];
};

function handleOf(href: string) {
  return href.replace("/collections/", "");
}

export function MegaMenuPanel({
  item,
  previews,
  onEnter,
  onLeave,
  onNavigate,
}: {
  item: MenuItem;
  previews: Record<string, MenuPreview>;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}) {
  const reduce = useReducedMotion();
  const isShop = item.href.startsWith("/collections/");
  const preview = previews[handleOf(item.href)];
  const tiles = (
    preview?.products.length
      ? preview.products
      : (item.children ?? []).flatMap((c) => previews[handleOf(c.href)]?.products.slice(0, 1) ?? [])
  ).slice(0, 3);

  return (
    <motion.div
      className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-tray"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="container-site grid grid-cols-12 gap-10 py-10">
        <div className={isShop ? "col-span-4" : "col-span-12"}>
          <p className="label mb-5 text-ink-mute">{item.label}</p>
          <ul className={isShop ? "space-y-3" : "flex flex-wrap gap-x-12 gap-y-3"}>
            {item.children?.map((child, i) => {
              const p = previews[handleOf(child.href)];
              return (
                <motion.li
                  key={child.href}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className="group inline-flex items-baseline gap-3 font-display text-xl transition-colors hover:text-ink"
                  >
                    <span className="link-line">{child.label}</span>
                    {p && p.count > 0 && (
                      <span className="text-xs text-ink-mute tabular-nums">{p.count}</span>
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          {isShop && (
            <Link
              href={item.href}
              onClick={onNavigate}
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft"
            >
              <span className="link-line">View all {item.label.toLowerCase()}</span>
              <ArrowRight size={14} weight="regular" />
            </Link>
          )}
        </div>

        {isShop && tiles.length > 0 && (
          <div className="col-span-8 grid grid-cols-3 gap-5">
            {tiles.map((t, i) => (
              <motion.div
                key={t.handle}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/products/${t.handle}`} onClick={onNavigate} className="group block">
                  <div className="relative overflow-hidden bg-paper-dim" style={{ aspectRatio: "4 / 5" }}>
                    <Image
                      src={shopifyImage(t.src, 600)}
                      alt={t.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 line-clamp-1 text-sm">{t.title}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
