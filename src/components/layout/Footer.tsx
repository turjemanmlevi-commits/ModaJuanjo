import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, STORE } from "@/lib/menu";
import { CONTACT } from "@/content/site";
import { PaymentIcons } from "./PaymentIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-beige-light">
      <div className="container-site grid gap-12 pb-12 pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-14 lg:pt-20">
        <div className="lg:col-span-5">
          <Image src="/images/logo.png" alt="MODESSAE" width={510} height={71} className="h-6 w-auto" />
          <p className="mt-6 max-w-sm text-ink-soft">
            Since 2012, pieces chosen for women who work, go out and live full lives. After fourteen years,
            everything we have left is now 50% off.
          </p>
          <p className="mt-6 text-sm text-ink-mute">{CONTACT.hoursTitle}</p>
          <ul className="mt-1 text-sm">
            {CONTACT.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <nav className="lg:col-span-3" aria-label="Contact information">
          <p className="label mb-5">Contact information</p>
          <ul className="space-y-3 text-sm">
            {FOOTER_LINKS.information.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line text-ink-soft hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="About MODESSAE">
          <p className="label mb-5">MODESSAE</p>
          <ul className="space-y-3 text-sm">
            {FOOTER_LINKS.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line text-ink-soft hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={STORE.loginUrl} className="link-line text-ink-soft hover:text-ink">
                Log in
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="label mb-5">{CONTACT.questionTitle}</p>
          <p className="text-sm text-ink-soft">{CONTACT.questionText}</p>
          <a href={`mailto:${STORE.email}`} className="link-line mt-1 inline-block text-sm font-medium">
            {STORE.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line/80">
        <div className="container-site flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <PaymentIcons />
          <p className="text-xs text-ink-mute">
            © {year} MODESSAE ·{" "}
            <a
              href="https://www.shopify.com?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore"
              className="link-line"
              rel="noopener"
            >
              Powered by Shopify
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
