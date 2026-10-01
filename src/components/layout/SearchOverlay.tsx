"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import { money, shopifyImage, splitTitle } from "@/lib/format";
import { useEscape, useScrollLock, useUI } from "./UIProvider";
import { searchIndex, type SearchEntry } from "@/lib/search";

export type SearchCollection = { handle: string; title: string };

let cache: SearchEntry[] | null = null;
let pending: Promise<SearchEntry[]> | null = null;

function loadIndex(): Promise<SearchEntry[]> {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        cache = data;
        return data;
      });
  }
  return pending;
}

export function SearchOverlay({ collections }: { collections: SearchCollection[] }) {
  const ui = useUI();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[] | null>(cache);
  const inputRef = useRef<HTMLInputElement>(null);
  useScrollLock(ui.searchOpen);
  useEscape(ui.searchOpen, ui.closeSearch);

  useEffect(() => {
    if (!ui.searchOpen) return;
    loadIndex().then(setIndex);
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [ui.searchOpen]);

  const results = useMemo(() => (index ? searchIndex(index, query).slice(0, 8) : []), [index, query]);
  const total = useMemo(() => (index ? searchIndex(index, query).length : 0), [index, query]);
  const matchedCollections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return collections.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 5);
  }, [collections, query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    ui.closeSearch();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <AnimatePresence>
      {ui.searchOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={ui.closeSearch}
            className="fixed inset-0 bg-ink/35 backdrop-blur-[2px]"
            style={{ zIndex: "var(--z-overlay)" as unknown as number }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-paper shadow-tray"
            style={{ zIndex: "var(--z-drawer)" as unknown as number }}
            initial={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-site py-6 lg:py-8">
              <form onSubmit={submit} role="search" className="flex items-center gap-4 border-b border-ink pb-3">
                <MagnifyingGlass size={24} weight="light" className="shrink-0 text-ink-mute" />
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <input
                  ref={inputRef}
                  id="site-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dresses, jumpsuits, bags…"
                  autoComplete="off"
                  className="w-full bg-transparent font-display text-xl outline-none placeholder:text-ink-mute/70 lg:text-2xl"
                />
                <button
                  type="button"
                  onClick={ui.closeSearch}
                  aria-label="Close search"
                  className="-mr-2 shrink-0 p-2 transition-transform hover:rotate-90"
                >
                  <X size={22} weight="light" />
                </button>
              </form>

              {query.trim().length >= 2 && (
                <div className="grid gap-8 pt-6 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    {matchedCollections.length > 0 && (
                      <>
                        <p className="label mb-3 text-ink-mute">Collections:</p>
                        <ul className="space-y-2">
                          {matchedCollections.map((c) => (
                            <li key={c.handle}>
                              <Link
                                href={`/collections/${c.handle}`}
                                onClick={ui.closeSearch}
                                className="link-line font-display"
                              >
                                {c.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {index && results.length > 0 && (
                      <p className="mt-6 text-sm text-ink-mute">
                        {total} {total === 1 ? "product" : "products"} for “{query.trim()}”
                      </p>
                    )}
                  </div>
                  <div className="lg:col-span-9">
                    {!index && <p className="text-sm text-ink-mute">Loading…</p>}
                    {index && results.length === 0 && (
                      <p className="text-ink-mute">No products match “{query.trim()}”. Try a simpler word, like “dress” or “bag”.</p>
                    )}
                    {results.length > 0 && (
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                        {results.map((r, i) => {
                          const { name, rest } = splitTitle(r.title);
                          return (
                            <motion.li
                              key={r.handle}
                              initial={reduce ? false : { opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.45, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <Link href={`/products/${r.handle}`} onClick={ui.closeSearch} className="group block">
                                <div className="relative overflow-hidden bg-paper-dim" style={{ aspectRatio: "3 / 4" }}>
                                  {r.image && (
                                    <Image
                                      src={shopifyImage(r.image, 400)}
                                      alt={r.title}
                                      fill
                                      sizes="(min-width: 640px) 20vw, 45vw"
                                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                    />
                                  )}
                                </div>
                                <p className="mt-2 font-display text-sm">{name}</p>
                                <p className="line-clamp-1 text-xs text-ink-mute">{rest}</p>
                                <p className="mt-1 text-sm">
                                  {r.compareAtPrice && (
                                    <span className="price-strike mr-2 text-ink-mute">{money(r.compareAtPrice)}</span>
                                  )}
                                  <span className="font-medium">{money(r.price)}</span>
                                </p>
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    )}
                    {total > results.length && (
                      <button
                        type="submit"
                        onClick={submit}
                        className="mt-6 inline-flex items-center gap-2 text-sm"
                      >
                        <span className="link-line">View all {total} results</span>
                        <ArrowRight size={14} weight="regular" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
