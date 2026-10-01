import Link from "next/link";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { CLOSING_SALE, CONTACT } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function ClosingContact() {
  return (
    <section className="py-16 lg:py-24" aria-label="Closing down sale and contact">
      <div className="container-site grid gap-4 lg:grid-cols-12 lg:gap-6">
        <Reveal className="bg-beige-light p-8 sm:p-12 lg:col-span-7 lg:p-16" amount={0.2}>
          <h2 className="display-md uppercase">{CLOSING_SALE.title}</h2>
          <div className="prose-store mt-6 space-y-4 text-ink-soft">
            {CLOSING_SALE.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <p className="mt-8 font-display text-xl lg:text-2xl">{CLOSING_SALE.closer}</p>
          <Link href="/collections/abiti" className="btn btn-primary mt-10">
            Shop now
            <span className="btn-icon">
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
        </Reveal>

        <Reveal className="flex flex-col bg-paper-dim p-8 sm:p-12 lg:col-span-5 lg:p-14" delay={0.1} amount={0.2}>
          <h2 className="display-md uppercase">{CONTACT.title}</h2>
          <p className="mt-6 text-sm text-ink-mute">{CONTACT.hoursTitle}</p>
          <ul className="mt-2 space-y-1 text-ink-soft">
            {CONTACT.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <p className="font-display text-lg">{CONTACT.questionTitle}</p>
            <p className="mt-1 text-sm text-ink-mute">{CONTACT.questionText}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-3 inline-flex items-center gap-3 font-medium"
            >
              <EnvelopeSimple size={20} weight="light" />
              <span className="link-line">{CONTACT.email}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
