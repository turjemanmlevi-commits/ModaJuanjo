import type { Metadata } from "next";
import { WORK_PAGE } from "@/content/site";
import { STORE } from "@/lib/menu";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work With Us",
  description: WORK_PAGE.paragraphs[0],
};

export default function WorkWithUsPage() {
  return (
    <div className="container-site grid gap-10 pb-20 pt-10 lg:grid-cols-12 lg:pb-32 lg:pt-16">
      <div className="lg:col-span-5">
        <Reveal>
          <h1 className="display-lg uppercase">{WORK_PAGE.title}</h1>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal delay={0.1}>
          <p className="font-display text-xl">{WORK_PAGE.subtitle}</p>
          <div className="prose-store mt-6 space-y-4 text-ink-soft">
            <p>{WORK_PAGE.paragraphs[0]}</p>
            <p>
              If you have a question about an order, we&apos;d love to help: email us at{" "}
              <a href={`mailto:${STORE.email}`} className="link-line font-medium text-ink">
                {STORE.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
