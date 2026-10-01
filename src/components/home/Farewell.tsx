"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FAREWELL } from "@/content/site";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { asset } from "@/lib/format";

export function Farewell() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, reduce ? 0 : -70]);

  return (
    <section ref={ref} className="overflow-hidden border-t border-line py-20 lg:py-32" aria-labelledby="farewell-heading">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <motion.div style={{ y: backY }} className="tray w-[78%] rotate-[-2deg]">
              <ImageReveal direction="left" style={{ aspectRatio: "1 / 1" }}>
                <Image
                  src={asset("/images/boutique-front.jpg")}
                  alt="Helen and Jess at the door of the MODESSAE boutique"
                  fill
                  sizes="(min-width: 1024px) 38vw, 80vw"
                  className="object-cover"
                />
              </ImageReveal>
            </motion.div>
            <motion.div
              style={{ y: frontY }}
              className="tray absolute -bottom-10 right-0 w-[60%] rotate-[2.5deg] lg:-bottom-14"
            >
              <ImageReveal direction="up" delay={0.25} style={{ aspectRatio: "1 / 1" }}>
                <Image
                  src={asset("/images/boutique-inside.jpg")}
                  alt="Inside the boutique: Helen helping a customer try on sandals while Jess hangs a dress"
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover"
                />
              </ImageReveal>
            </motion.div>
          </div>
        </div>

        <div className="pt-8 lg:col-span-5 lg:col-start-8 lg:pt-4">
          <RevealWords id="farewell-heading" text={FAREWELL.title} className="display-md" />
          <div className="prose-store mt-8 space-y-5 text-ink-soft">
            {FAREWELL.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05} y={18}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.35} y={18}>
              <p className="font-medium text-ink">{FAREWELL.thanks}</p>
            </Reveal>
            <Reveal delay={0.4} y={18}>
              <p className="font-display text-xl text-ink">{FAREWELL.signature}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
