import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageView } from "@/components/search/SearchPageView";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every piece in MODESSAE's closing down sale.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-site py-16 text-ink-mute">Loading…</div>}>
      <SearchPageView />
    </Suspense>
  );
}
