import { ArrowsCounterClockwise, LockKey, Truck } from "@phosphor-icons/react/dist/ssr";
import { SERVICES } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = [Truck, ArrowsCounterClockwise, LockKey];

export function ServiceStrip() {
  return (
    <section className="bg-beige" aria-label="Shipping, returns and payment">
      <div className="container-site grid divide-y divide-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={s.title} delay={i * 0.08} y={16} className="flex gap-5 py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0">
              <Icon size={30} weight="light" className="mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display text-base uppercase tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
