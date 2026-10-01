"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, MagnifyingGlass, User, X } from "@phosphor-icons/react";
import { MAIN_MENU, STORE } from "@/lib/menu";
import { useEscape, useScrollLock, useUI } from "./UIProvider";

export function MobileMenu() {
  const ui = useUI();
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  useScrollLock(ui.menuOpen);
  useEscape(ui.menuOpen, ui.closeMenu);

  return (
    <AnimatePresence>
      {ui.menuOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 flex flex-col bg-paper lg:hidden"
          style={{ zIndex: "var(--z-drawer)" as unknown as number }}
          initial={reduce ? { opacity: 0 } : { x: "-100%" }}
          animate={reduce ? { opacity: 1 } : { x: 0 }}
          exit={reduce ? { opacity: 0 } : { x: "-100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
        >
          <div className="flex h-14 items-center justify-between border-b border-line px-4">
            <Link href="/" onClick={ui.closeMenu} aria-label="MODESSAE home">
              <Image src="/images/logo.png" alt="MODESSAE" width={510} height={71} className="h-[18px] w-auto" />
            </Link>
            <button
              type="button"
              onClick={ui.closeMenu}
              aria-label="Close menu"
              className="-mr-2 p-2 transition-transform hover:rotate-90"
            >
              <X size={24} weight="light" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Main">
            <ul>
              {MAIN_MENU.map((item, i) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = expanded === item.label;
                return (
                  <motion.li
                    key={item.label}
                    className="border-b border-line"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={ui.closeMenu}
                        className="block py-4 font-display text-lg uppercase tracking-wide"
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                          className="p-3"
                        >
                          <CaretDown
                            size={16}
                            weight="regular"
                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {hasChildren && isOpen && (
                        <motion.ul
                          key="children"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          {item.children?.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={ui.closeMenu}
                                className="block py-3 pl-4 text-base text-ink-soft"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div className="grid grid-cols-2 border-t border-line">
            <button
              type="button"
              onClick={() => {
                ui.closeMenu();
                ui.openSearch();
              }}
              className="flex items-center justify-center gap-2 border-r border-line py-4 text-sm"
            >
              <MagnifyingGlass size={18} weight="light" /> Search
            </button>
            <a href={STORE.loginUrl} className="flex items-center justify-center gap-2 py-4 text-sm">
              <User size={18} weight="light" /> Log in
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
