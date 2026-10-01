"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export function SearchForm({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  const router = useRouter();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
      }}
      className="flex items-center gap-3 border-b border-ink pb-2"
    >
      <MagnifyingGlass size={22} weight="light" className="shrink-0 text-ink-mute" />
      <label htmlFor="search-page-input" className="sr-only">
        Search products
      </label>
      <input
        id="search-page-input"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search dresses, jumpsuits, bags…"
        className="w-full bg-transparent py-2 font-display text-lg outline-none placeholder:text-ink-mute/70"
      />
      <button type="submit" className="label shrink-0 py-2">
        Search
      </button>
    </form>
  );
}
