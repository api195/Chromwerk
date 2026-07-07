"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

/**
 * Stats – animierte Kennzahlen.
 * Nutzt GSAP, um die Zahlen hochzuzählen, sobald die Sektion sichtbar wird
 * (IntersectionObserver + GSAP-Tween). SSR-sicher (nur im useEffect).
 */
const stats = [
  { value: 1200, suffix: "+", label: "Veredelte Felgen" },
  { value: 8, suffix: " Jahre", label: "Erfahrung" },
  { value: 100, suffix: "%", label: "Handarbeit aus Köln" },
  { value: 48, suffix: "h", label: "Ø Bearbeitungszeit" },
];

export function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const numbers = root.querySelectorAll<HTMLElement>("[data-value]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const end = Number(el.dataset.value);
          const obj = { n: 0 };
          gsap.to(obj, {
            n: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.n).toLocaleString("de-DE");
            },
          });
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    numbers.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-y border-white/10 bg-ink-900/60 py-16" ref={rootRef}>
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-transparent bg-chrome-text bg-clip-text sm:text-5xl">
                <span data-value={s.value}>0</span>
                {s.suffix}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-chrome-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
