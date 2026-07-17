"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { lookbookProjects } from "@/data/lookbook";

/**
 * LookbookScroller – gepinnte, horizontal scroll-gescrubbte Galerie.
 * Beim vertikalen Scrollen bleibt die Sektion stehen und der Karten-Track
 * fährt horizontal durch (Kino-Effekt). Auf Mobil/Reduced-Motion fällt es
 * auf normales horizontales Scrollen zurück.
 */
export function LookbookScroller() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canPin = !reduced && window.innerWidth >= 1024;
    setEnhanced(canPin);
    if (!canPin) return;

    const el = track.current;
    const sec = section.current;
    if (!el || !sec) return;

    const ctx = gsap.context(() => {
      const amount = () => Math.max(0, el.scrollWidth - window.innerWidth + 80);
      gsap.to(el, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          // längere Strecke = bewusstere, filmische Horizontalfahrt
          end: () => "+=" + (amount() * 1.6 + window.innerHeight * 0.6),
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="lookbook"
      className="relative overflow-hidden bg-transparent"
    >
      <div
        className={
          enhanced
            ? "flex h-[100svh] items-center"
            : "flex items-center py-16"
        }
      >
        <div
          ref={track}
          className={
            enhanced
              ? "flex flex-nowrap items-center gap-6 pl-6 will-change-transform sm:pl-10 lg:gap-10 lg:pl-16"
              : "flex flex-nowrap items-center gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:gap-6 sm:px-10 [&::-webkit-scrollbar]:hidden"
          }
        >
          {/* Nur die Felgen – vollständig sichtbar (object-contain auf Schwarz),
              ohne jede Beschriftung. Bild ist klickbar → Projekt-Detailseite. */}
          {lookbookProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/lookbook/${p.slug}`}
              aria-label={p.title}
              className="group relative aspect-square w-[86vw] shrink-0 self-center overflow-hidden rounded-3xl bg-black sm:w-[440px] lg:h-[74vh] lg:w-[74vh]"
            >
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                sizes="(max-width:640px) 86vw, (max-width:1024px) 440px, 74vh"
                className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              {/* dezenter Licht-Sweep beim Hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          ))}
          <div className="w-2 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}
