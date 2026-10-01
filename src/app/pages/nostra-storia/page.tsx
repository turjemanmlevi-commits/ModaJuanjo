import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { STORY_PAGE } from "@/content/site";
import { Reveal, RevealLines, RevealWords } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { asset } from "@/lib/format";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "MODESSAE was born from a divorce, a lease she couldn't afford and a nine-year-old daughter. Fourteen years later, Helen and Jess are closing the boutique.",
};

export default function StoryPage() {
  return (
    <article>
      <header className="container-site grid gap-10 pb-12 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-5">
          <RevealLines as="h1" lines={["Our", "Story"]} className="display-xl uppercase" />
          <Reveal delay={0.25} className="mt-8 max-w-md">
            <p className="font-display text-xl leading-snug lg:text-2xl">{STORY_PAGE.paragraphs[0]}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="tray">
            <ImageReveal direction="right" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={asset("/images/boutique-front.jpg")}
                alt="Helen and Jess at the door of the MODESSAE boutique in Paddington"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </Reveal>
      </header>

      <div className="container-site grid gap-12 border-t border-line py-14 lg:grid-cols-12 lg:py-24">
        <div className="prose-store space-y-5 text-ink-soft lg:col-span-6 lg:col-start-4">
          {STORY_PAGE.paragraphs.slice(1).map((p, i) => (
            <Reveal key={i} y={16} amount={0.3}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="bg-beige-light">
        <div className="container-site grid gap-10 py-16 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-5">
            <div className="tray rotate-[-1.5deg]">
              <ImageReveal direction="up" style={{ aspectRatio: "1 / 1" }}>
                <Image
                  src={asset("/images/boutique-inside.jpg")}
                  alt="Inside the boutique: Helen fitting sandals for a customer while Jess hangs a dress"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </Reveal>
          <div className="flex items-center lg:col-span-6 lg:col-start-7">
            <RevealWords as="p" text={`“${STORY_PAGE.pullQuote}”`} className="display-md" />
          </div>
        </div>
      </div>

      <div className="container-site grid gap-12 py-14 lg:grid-cols-12 lg:py-24">
        <div className="prose-store space-y-5 text-ink-soft lg:col-span-6 lg:col-start-4">
          {STORY_PAGE.paragraphsAfter.map((p, i) => (
            <Reveal key={i} y={16} amount={0.3}>
              <p className={i === 1 ? "font-medium text-ink" : ""}>{p}</p>
            </Reveal>
          ))}
          <Reveal y={16}>
            <p className="pt-4">{STORY_PAGE.signoff}</p>
            <p className="font-display text-2xl text-ink">{STORY_PAGE.signature}</p>
          </Reveal>
          <Reveal y={16}>
            <Link href="/collections/abiti" className="btn btn-primary mt-6">
              Shop now
              <span className="btn-icon">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
