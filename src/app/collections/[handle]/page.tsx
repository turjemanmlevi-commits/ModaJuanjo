import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCollections, getCollection, getCollectionProducts } from "@/lib/catalog";
import { CollectionGrid } from "@/components/collection/CollectionGrid";
import { CollectionLetter } from "@/components/collection/CollectionLetter";
import { MAIN_MENU } from "@/lib/menu";

type Params = { handle: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllCollections().map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { handle } = await params;
  const c = getCollection(handle);
  if (!c) return {};
  const title = c.title.charAt(0) + c.title.slice(1).toLowerCase();
  return {
    title,
    description: `${title} from MODESSAE's closing down sale. Everything 50% off with free tracked shipping to Australia and New Zealand.`,
  };
}

function siblings(handle: string) {
  for (const item of MAIN_MENU) {
    if (!item.children) continue;
    const match = item.href === `/collections/${handle}` || item.children.some((c) => c.href === `/collections/${handle}`);
    if (match) return { parent: item, children: item.children };
  }
  return null;
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();
  const products = getCollectionProducts(handle);
  const group = siblings(handle);

  return (
    <div className="container-site pb-16 pt-6 lg:pb-24 lg:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-ink-mute">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="link-line">
              Home
            </Link>
          </li>
          {group && group.parent.href !== `/collections/${handle}` && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={group.parent.href} className="link-line">
                  {group.parent.label}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li className="text-ink" aria-current="page">
            {collection.title.charAt(0) + collection.title.slice(1).toLowerCase()}
          </li>
        </ol>
      </nav>

      <header className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="display-lg uppercase">{collection.title}</h1>
        {group && (
          <ul className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {[group.parent, ...group.children]
              .filter((c, i, arr) => arr.findIndex((x) => x.href === c.href) === i)
              .map((c) => {
                const active = c.href === `/collections/${handle}`;
                return (
                  <li key={c.href} className="shrink-0">
                    <Link
                      href={c.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-block border px-3.5 py-1.5 text-xs uppercase tracking-[0.12em] transition-colors duration-300 ${
                        active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
      </header>

      <div className="mt-8 lg:mt-10">
        <CollectionLetter />
      </div>

      <div className="mt-10 lg:mt-14">
        <CollectionGrid
          products={products}
          emptyText="Everything in this category has sold out. Once pieces are gone, they won't be back."
        />
      </div>
    </div>
  );
}
