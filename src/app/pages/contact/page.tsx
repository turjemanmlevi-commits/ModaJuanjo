import type { Metadata } from "next";
import { CONTACT, CONTACT_EXTRA_FAQS, CONTACT_PAGE, FAQS, FAQ_TITLE } from "@/content/site";
import { STORE } from "@/lib/menu";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Contact",
  description: `${CONTACT_PAGE.intro} ${CONTACT_PAGE.text}`,
};

export default function ContactPage() {
  return (
    <>
      <div className="container-site grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h1 className="display-lg">{CONTACT_PAGE.title}</h1>
            <p className="mt-6 font-display text-xl">{CONTACT_PAGE.intro}</p>
            <p className="mt-4 max-w-md text-ink-soft">{CONTACT_PAGE.text}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 bg-beige-light p-6">
            <p className="text-sm text-ink-mute">{CONTACT.hoursTitle}</p>
            <ul className="mt-2 space-y-1">
              {CONTACT.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-mute">{CONTACT.questionText}</p>
            <a href={`mailto:${STORE.email}`} className="link-line mt-1 inline-block font-medium">
              {STORE.email}
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
      <Faq id="contact-faq" title={FAQ_TITLE} items={[...FAQS, ...CONTACT_EXTRA_FAQS]} />
    </>
  );
}
