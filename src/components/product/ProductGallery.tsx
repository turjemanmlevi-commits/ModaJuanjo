"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ProductImage } from "@/lib/types";
import { shopifyImage } from "@/lib/format";

export function ProductGallery({
  images,
  title,
  activeImageId,
}: {
  images: ProductImage[];
  title: string;
  activeImageId: number | null;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const ordered = useMemo(() => {
    if (!activeImageId) return images;
    const i = images.findIndex((im) => im.id === activeImageId);
    if (i <= 0) return images;
    return [images[i], ...images.slice(0, i), ...images.slice(i + 1)];
  }, [images, activeImageId]);

  const [lastActive, setLastActive] = useState(activeImageId);
  if (lastActive !== activeImageId) {
    setLastActive(activeImageId);
    setIndex(0);
  }

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" });
  }, [activeImageId, reduce]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex((prev) => (prev === i ? prev : i));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (ordered.length === 0) {
    return <div className="bg-paper-dim" style={{ aspectRatio: "3 / 4" }} />;
  }

  return (
    <>
      {/* Mobile: swipeable rail */}
      <div className="relative lg:hidden">
        <div
          ref={railRef}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
          aria-roledescription="carousel"
          aria-label={`${title} photos`}
        >
          {ordered.map((im, i) => (
            <div key={im.id ?? i} className="relative w-full shrink-0 snap-start bg-paper-dim" style={{ aspectRatio: "3 / 4" }}>
              <Image
                src={shopifyImage(im.src, 1000)}
                alt={im.alt ?? `${title}, photo ${i + 1}`}
                fill
                sizes="(max-width: 1023px) 100vw, 1px"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {ordered.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
            {ordered.map((im, i) => (
              <span
                key={im.id ?? i}
                className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/25"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: editorial stack, first photo full width then pairs */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-2">
        {ordered.map((im, i) => (
          <motion.div
            key={im.id ?? i}
            className={`relative overflow-hidden bg-paper-dim ${i === 0 ? "col-span-2" : ""}`}
            style={{ aspectRatio: i === 0 ? "4 / 5" : "3 / 4" }}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={shopifyImage(im.src, i === 0 ? 1600 : 900)}
              alt={im.alt ?? `${title}, photo ${i + 1}`}
              fill
              sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 50vw"}
              priority={i === 0}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
