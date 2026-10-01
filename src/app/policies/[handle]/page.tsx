import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import policies from "../../../../data/policies.json";
import { FOOTER_LINKS } from "@/lib/menu";

type Policy = { handle: string; title: string; html: string };
const POLICIES = policies as Policy[];

export const dynamicParams = false;

export function generateStaticParams() {
  return POLICIES.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = POLICIES.find((x) => x.handle === handle);
  return p ? { title: p.title, description: `MODESSAE ${p.title.toLowerCase()}.` } : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const policy = POLICIES.find((x) => x.handle === handle);
  if (!policy) notFound();

  return (
    <div className="container-site grid gap-10 pb-20 pt-10 lg:grid-cols-12 lg:pb-32 lg:pt-16">
      <aside className="lg:col-span-3">
        <h1 className="display-md">{policy.title}</h1>
        <nav aria-label="Policies" className="mt-8 lg:sticky lg:top-32">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:flex-col lg:gap-3">
            {FOOTER_LINKS.information.map((l) => {
              const active = l.href.endsWith(handle);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-line ${active ? "text-ink" : "text-ink-mute hover:text-ink"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div
        className="prose-store text-ink-soft lg:col-span-7 lg:col-start-5"
        dangerouslySetInnerHTML={{ __html: policy.html }}
      />
    </div>
  );
}
