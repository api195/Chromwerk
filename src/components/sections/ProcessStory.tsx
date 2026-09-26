"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { subscribeScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * ProcessStory – Sticky Scroll-Storytelling durch den Chromwerk-Prozess.
 * Jeder Schritt füllt den Bildschirm; beim Scrollen wechselt der aktive
 * Schritt, Inhalte blenden weich über, eine Chrom-Fortschrittslinie füllt sich.
 *
 * Performance
 * ------------------------------------------------------------------
 * Diese Sektion ist mehrere Bildschirmhöhen hoch und liegt über dem
 * fixierten 3D-Hintergrund – sie ist die „scroll-lastigste" Stelle der Seite.
 *
 *  • Deckende Farbfläche statt `backdrop-blur` (das hätte bei JEDEM
 *    Scroll-Frame den kompletten Bildschirm inkl. WebGL-Canvas neu
 *    weichgezeichnet).
 *  • Überblendungen sind reine CSS-Transitions (Opacity + Transform, auf
 *    der GPU). Alle Schritte liegen übereinander im DOM; beim Wechsel
 *    ändert sich nur ein Attribut. Früher lief jeder Wechsel als
 *    JavaScript-Animation mit Ein- UND Ausblenden nacheinander
 *    (AnimatePresence mode="wait") – bei schnellem Scrollen hinkte der
 *    Text hinterher.
 *  • Die Fortschrittslinie wird per `transform: scaleY()` direkt im DOM
 *    gesetzt – früher wurde ihre Höhe animiert, was pro Scroll-Frame ein
 *    Layout erzwang, und jedes Update lief über React.
 *  • Position/Höhe der Sektion werden nur bei Größenänderungen gemessen,
 *    nicht beim Scrollen. React rendert nur, wenn der Schritt wechselt.
 *  • Unschärfe beim Überblenden nur mit vollem Geräteprofil (globals.css).
 */
const steps = [
  {
    title: "Felgenannahme",
    text: "Jede Felge wird einzeln erfasst, dokumentiert und für den Prozess vorbereitet.",
  },
  {
    title: "Prüfung",
    text: "Zustand, Risse und Schäden werden präzise vermessen und bewertet.",
  },
  {
    title: "Schleifen",
    text: "Bordsteinschäden und Unebenheiten werden in mehreren Stufen plan geschliffen.",
  },
  {
    title: "Polieren",
    text: "Die Oberfläche wird schrittweise verfeinert – bis sie samtig glatt ist.",
  },
  {
    title: "Hochglanzverdichtung",
    text: "Der Kern unserer Kunst: mechanische Verdichtung bis zur spiegelnden Chromtiefe.",
  },
  {
    title: "Qualitätskontrolle",
    text: "Glanzgrad, Ebenheit und Reflexion werden final geprüft und freigegeben.",
  },
  {
    title: "Fertiges Ergebnis",
    text: "Eine Felge, die ihre Umgebung spiegelt wie flüssiges Chrom.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Zustand eines Schritts relativ zum aktiven: vorbei / aktiv / kommt noch */
function phase(i: number, active: number) {
  return i < active ? "past" : i === active ? "active" : "next";
}

export function ProcessStory() {
  const ref = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    // Gecachte Geometrie – gemessen nur bei Größenänderungen.
    let top = 0;
    let range = 1;
    let lastY = window.scrollY;
    let current = -1;

    const apply = (y: number) => {
      lastY = y;
      const progress = Math.min(1, Math.max(0, (y - top) / range));
      const i = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      if (i !== current) {
        current = i;
        setActive(i);
      }
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
    };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      top = rect.top + window.scrollY;
      range = Math.max(1, section.offsetHeight - window.innerHeight);
      apply(lastY);
    };

    measure();
    // Eigene Größe UND Dokumenthöhe beobachten: Öffnet sich weiter oben z. B.
    // eine FAQ-Antwort, verschiebt sich die Sektion, ohne selbst größer zu
    // werden.
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(document.documentElement);
    window.addEventListener("resize", measure, { passive: true });
    const unsubscribe = subscribeScroll((y) => apply(y));

    return () => {
      unsubscribe();
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="prozess"
      // Deckende Fläche statt backdrop-blur (siehe Kommentar oben).
      // Höhe pro Schritt kommt aus --process-step (globals.css) und ist auf
      // schmalen Screens kürzer – weniger Scroll-Strecke, gleiche Wirkung.
      className="relative bg-ink-950/90"
      style={{ height: `calc(${steps.length} * var(--process-step, 62vh))` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Riesige Geister-Nummer im Hintergrund */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center lg:justify-end lg:justify-items-end lg:pr-[8%]"
        >
          {steps.map((s, i) => (
            <span
              key={s.title}
              data-phase={phase(i, active)}
              className="ps-ghost font-display text-[42vw] font-bold leading-none text-white [grid-area:1/1] lg:text-[30vw]"
            >
              {pad(i + 1)}
            </span>
          ))}
        </div>

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Aktiver Schritt */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-crimson">
                <span className="h-px w-6 bg-crimson/70" />
                Der Chromwerk-Prozess
              </span>

              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-2xl font-semibold text-chrome-500">
                  {pad(active + 1)}
                  <span className="text-chrome-700"> / {pad(steps.length)}</span>
                </span>
              </div>

              {/* Alle Schritte liegen übereinander (gleiche Grid-Zelle); die
                  Zelle ist so hoch wie der längste Text – kein Springen. */}
              <div className="relative mt-3 grid min-h-[9rem]">
                {steps.map((s, i) => {
                  const p = phase(i, active);
                  return (
                    <div
                      key={s.title}
                      data-phase={p}
                      aria-hidden={p !== "active"}
                      className="ps-step [grid-area:1/1]"
                    >
                      <h3 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-5xl lg:text-6xl">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-chrome-300">
                        {s.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vertikaler Stepper mit Chrom-Fortschrittslinie */}
            <div className="relative hidden pl-8 lg:block">
              {/* Grundlinie */}
              <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10" />
              {/* Chrom-Füllung (scaleY wird direkt beim Scrollen gesetzt) */}
              <div
                ref={fillRef}
                style={{ transform: "scaleY(0)" }}
                className="absolute left-[2px] top-2 bottom-2 w-0.5 origin-top bg-gradient-to-b from-white via-chrome-300 to-crimson"
              />
              <ul className="space-y-5">
                {steps.map((s, i) => {
                  const done = i < active;
                  const now = i === active;
                  return (
                    <li key={s.title} className="relative flex items-center gap-4">
                      <span
                        className={cn(
                          "relative -ml-8 flex h-2.5 w-2.5 items-center justify-center rounded-full transition-[transform,background-color,box-shadow] duration-500",
                          now
                            ? "scale-150 bg-crimson shadow-glow"
                            : done
                            ? "bg-chrome-200"
                            : "bg-white/20"
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-sm uppercase tracking-widest transition-colors duration-500",
                          now
                            ? "text-white"
                            : done
                            ? "text-chrome-300"
                            : "text-chrome-600"
                        )}
                      >
                        {s.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
