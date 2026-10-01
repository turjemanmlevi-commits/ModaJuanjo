"use client";

import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CartLine } from "@/lib/types";
import { STORE } from "@/lib/menu";

const STORAGE_KEY = "modessae-cart-v1";

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  compareSubtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  lastAdded: CartLine | null;
  checkoutUrl: string;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  remove: (variantId: number) => void;
  setQuantity: (variantId: number, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartState | null>(null);

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartLine | null>(null);
  const skipWrite = useRef(true);

  useEffect(() => {
    startTransition(() => {
      setLines(readStorage());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage can be unavailable in private mode; the cart still works for the session */
    }
  }, [lines]);

  const add = useCallback((line: Omit<CartLine, "quantity">, quantity = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.variantId === line.variantId);
      if (i === -1) return [...prev, { ...line, quantity }];
      const next = [...prev];
      next[i] = { ...next[i], quantity: next[i].quantity + quantity };
      return next;
    });
    setLastAdded({ ...line, quantity });
    setIsOpen(true);
  }, []);

  const remove = useCallback((variantId: number) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const setQuantity = useCallback((variantId: number, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + parseFloat(l.price) * l.quantity, 0);
    const compareSubtotal = lines.reduce(
      (n, l) => n + parseFloat(l.compareAtPrice ?? l.price) * l.quantity,
      0,
    );
    const checkoutUrl =
      STORE.checkoutBase + lines.map((l) => `${l.variantId}:${l.quantity}`).join(",");
    return {
      lines,
      count,
      subtotal,
      compareSubtotal,
      isOpen,
      hydrated,
      lastAdded,
      checkoutUrl,
      add,
      remove,
      setQuantity,
      clear,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [lines, isOpen, hydrated, lastAdded, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
