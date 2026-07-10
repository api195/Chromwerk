"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * ProcessStory – Sticky Scroll-Storytelling durch den Chromwerk-Prozess.
 * Jeder Schritt füllt den Bildschirm; beim Scrollen wechselt der aktive
 * Schritt, Inhalte blenden weich über, eine Chrom-Fortschrittslinie füllt sich.
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

export function ProcessStory() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.floor(v * steps.length));
    if (i !== active) setActive(i);
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="prozess"
      className="relative bg-ink-950/65 backdrop-blur-sm"
      style={{ height: `${steps.length * 62}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Riesige Geister-Nummer im Hintergrund */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[8%]">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={active}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 0.06, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[42vw] font-bold leading-none text-white lg:text-[30vw]"
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
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
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-chrome-700"> / {String(steps.length).padStart(2, "0")}</span>
                </span>
              </div>

              <div className="relative mt-3 min-h-[9rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-5xl lg:text-6xl">
                      {steps[active].title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-chrome-300">
                      {steps[active].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Vertikaler Stepper mit Chrom-Fortschrittslinie */}
            <div className="relative hidden pl-8 lg:block">
              {/* Grundlinie */}
              <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10" />
              {/* Chrom-Füllung */}
              <motion.div
                style={{ height: fillHeight }}
                className="absolute left-[2px] top-2 w-0.5 bg-gradient-to-b from-white via-chrome-300 to-crimson"
              />
              <ul className="space-y-5">
                {steps.map((s, i) => {
                  const done = i < active;
                  const now = i === active;
                  return (
                    <li key={s.title} className="relative flex items-center gap-4">
                      <span
                        className={cn(
                          "relative -ml-8 flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-500",
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
