import type { Metadata } from "next";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { TRACK_PAGE } from "@/content/site";
import { STORE } from "@/lib/menu";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: TRACK_PAGE.paragraphs[0],
};

export default function TrackOrderPage() {
  return (
    <div className="container-site grid gap-10 pb-20 pt-10 lg:grid-cols-12 lg:pb-32 lg:pt-16">
      <div className="lg:col-span-5">
        <Reveal>
          <h1 className="display-lg uppercase">{TRACK_PAGE.title}</h1>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal delay={0.1}>
          <div className="prose-store space-y-4 text-ink-soft">
            {TRACK_PAGE.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a href={TRACK_PAGE.trackerUrl} className="btn btn-primary mt-8" rel="noopener">
            Open order tracking
            <span className="btn-icon">
              <ArrowSquareOut size={14} weight="bold" />
            </span>
          </a>
          <p className="mt-8 text-sm text-ink-mute">
            Can&apos;t find your tracking email? Write to{" "}
            <a href={`mailto:${STORE.email}`} className="link-line font-medium text-ink">
              {STORE.email}
            </a>{" "}
            with your order number and we&apos;ll send it again.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
