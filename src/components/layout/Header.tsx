"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, Handbag, List, MagnifyingGlass, User } from "@phosphor-icons/react";
import { MAIN_MENU, STORE, type MenuItem } from "@/lib/menu";
import { useCart } from "@/components/cart/CartProvider";
import { useUI } from "./UIProvider";
import { MegaMenuPanel, type MenuPreview } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export type MenuPreviews = Record<string, MenuPreview>;

const NAV_ITEMS = MAIN_MENU.filter((m) => m.label !== "Home" && m.label !== "Track Your Order" && m.label !== "About Us");
const ABOUT = MAIN_MENU.find((m) => m.label === "About Us") as MenuItem;
const TRACK = MAIN_MENU.find((m) => m.label === "Track Your Order") as MenuItem;

export function Header({ previews }: { previews: MenuPreviews }) {
  const pathname = usePathname();
  const cart = useCart();
  const ui = useUI();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [bump, setBump] = useState(false);
  const timer = useRef<number | null>(null);
  const prevCount = useRef(cart.count);

  useEffect(() => {
    if (cart.count > prevCount.current) {
      setBump(true);
      const id = window.setTimeout(() => setBump(false), 600);
      prevCount.current = cart.count;
      return () => window.clearTimeout(id);
    }
    prevCount.current = cart.count;
  }, [cart.count]);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setActive(null);
  }

  const open = useCallback((label: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(label), 90);
  }, []);

  const scheduleClose = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(null), 160);
  }, []);

  const cancelClose = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const activeItem = [...NAV_ITEMS, ABOUT].find((m) => m.label === active) ?? null;

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className="sticky top-0 border-b border-line bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/85"
        style={{ zIndex: "var(--z-header)" as unknown as number }}
        onMouseLeave={scheduleClose}
      >
        <div className="container-site">
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center lg:h-16">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={ui.openMenu}
                aria-label="Open menu"
                className="-ml-2 p-2 lg:hidden"
              >
                <List size={24} weight="light" />
              </button>
              <button
                type="button"
                onClick={ui.openSearch}
                aria-label="Search"
                className="hidden items-center gap-2 py-2 pr-3 text-sm text-ink-soft transition-colors hover:text-ink lg:flex"
              >
                <MagnifyingGlass size={20} weight="light" />
                <span className="link-line">Search</span>
              </button>
              <button
                type="button"
                onClick={ui.openSearch}
                aria-label="Search"
                className="p-2 lg:hidden"
              >
                <MagnifyingGlass size={22} weight="light" />
              </button>
            </div>

            <Link href="/" aria-label="MODESSAE home" className="block px-2">
              <Image
                src="/images/logo.png"
                alt="MODESSAE"
                width={510}
                height={71}
                priority
                className="h-[18px] w-auto lg:h-[22px]"
              />
            </Link>

            <div className="flex items-center justify-end gap-1 lg:gap-5">
              <Link
                href={TRACK.href}
                className="link-line hidden text-sm text-ink-soft hover:text-ink lg:inline-block"
                data-active={isCurrent(TRACK.href)}
              >
                {TRACK.label}
              </Link>
              <a
                href={STORE.loginUrl}
                aria-label="Log in"
                className="hidden items-center gap-2 p-2 text-sm text-ink-soft transition-colors hover:text-ink lg:flex"
              >
                <User size={20} weight="light" />
                <span className="link-line">Log in</span>
              </a>
              <button
                type="button"
                onClick={cart.open}
                aria-label={`Open cart, ${cart.count} items`}
                className="relative -mr-2 flex items-center gap-2 p-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <motion.span
                  animate={bump && !reduce ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex"
                >
                  <Handbag size={22} weight="light" />
                  <AnimatePresence>
                    {cart.hydrated && cart.count > 0 && (
                      <motion.span
                        key="dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-dot px-1 text-[10px] font-medium leading-none text-paper tabular-nums"
                      >
                        {cart.count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <span className="link-line hidden lg:inline-block">Cart</span>
              </button>
            </div>
          </div>

          <nav aria-label="Shop" className="hidden lg:block">
            <ul className="scrollbar-none flex h-11 items-center justify-start gap-7 overflow-x-auto xl:justify-center">
              {[...NAV_ITEMS, ABOUT].map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const current = isCurrent(item.href) || item.children?.some((c) => isCurrent(c.href));
                return (
                  <li
                    key={item.label}
                    className="shrink-0"
                    onMouseEnter={() => (hasChildren ? open(item.label) : setActive(null))}
                    onFocus={() => hasChildren && open(item.label)}
                  >
                    <Link
                      href={item.href}
                      className="link-line label inline-flex items-center gap-1 py-2 text-[11px] tracking-[0.16em]"
                      data-active={current || active === item.label}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? active === item.label : undefined}
                    >
                      {item.label}
                      {hasChildren && (
                        <CaretDown
                          size={10}
                          weight="bold"
                          className={`transition-transform duration-300 ${active === item.label ? "rotate-180" : ""}`}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <AnimatePresence>
          {activeItem && activeItem.children && (
            <MegaMenuPanel
              key={activeItem.label}
              item={activeItem}
              previews={previews}
              onEnter={cancelClose}
              onLeave={scheduleClose}
              onNavigate={() => setActive(null)}
            />
          )}
        </AnimatePresence>
      </header>

      <MobileMenu />
    </>
  );
}
