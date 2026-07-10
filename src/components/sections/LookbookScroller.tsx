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
              ? "flex flex-nowrap items-stretch gap-8 pl-6 will-change-transform sm:pl-10 lg:pl-16"
              : "flex flex-nowrap items-stretch gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
          }
        >
          {/* Intro-Panel */}
          <div className="flex w-[80vw] shrink-0 flex-col justify-center sm:w-[420px] lg:w-[30vw]">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-crimson">
              <span className="h-px w-6 bg-crimson/70" />
              Lookbook
            </span>
            <h2 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-transparent bg-chrome-text bg-clip-text lg:text-7xl">
              Editorial
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-chrome-400">
              Ausgewählte Arbeiten wie in einem Magazin.{" "}
              {enhanced ? "Scroll weiter – die Galerie fährt mit." : "Wisch zur Seite."}
            </p>
            <Link
              href="/lookbook"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-chrome-200 transition hover:text-white"
            >
              Alle Projekte
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* Projektkarten */}
          {lookbookProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/lookbook/${p.slug}`}
              className="group relative aspect-[3/4] w-[80vw] shrink-0 self-center overflow-hidden rounded-3xl border border-white/10 bg-ink-900 sm:w-[360px] lg:h-[70vh] lg:w-[26vw]"
            >
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                sizes="(max-width:1024px) 80vw, 26vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="absolute left-5 top-5 font-display text-sm font-semibold tracking-widest text-chrome-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-5 top-5 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-200 backdrop-blur">
                {p.size}″
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] uppercase tracking-widest2 text-crimson">
                  {p.vehicle} · {p.brand}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none tracking-tight text-transparent bg-chrome-text bg-clip-text">
                  {p.model}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-chrome-200 transition-colors group-hover:text-white">
                  Ansehen
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
          <div className="w-6 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}
