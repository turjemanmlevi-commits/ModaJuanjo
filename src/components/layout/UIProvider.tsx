"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type UIState = {
  searchOpen: boolean;
  menuOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close overlays on navigation (derived-state reset during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  const value = useMemo<UIState>(
    () => ({
      searchOpen,
      menuOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
    }),
    [searchOpen, menuOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}

/** Locks body scroll while an overlay is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/** Calls the handler on Escape. */
export function useEscape(active: boolean, onEscape: () => void) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    },
    [onEscape],
  );
  useEffect(() => {
    if (!active) return;
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, handler]);
}
