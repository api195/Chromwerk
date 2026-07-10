"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CinematicStatement – bildschirmfüllender Statement-Beat.
 * ------------------------------------------------------------------
 * Inspiriert von cinematischen Produkt-Landingpages: ein einziger, großer,
 * glühender Chrom-Satz mit technischem "Reticle"-Rahmen und Blur-Reveal.
 * Im Chromwerk-Stil: Schwarz, Chrom-Silber, dezenter Crimson-Schein.
 *
 * Wiederverwendbar – Text, Akzent und Untertitel per Props steuern.
 */
const reveal: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CinematicStatement({
  eyebrow,
  line1,
  line2,
  sub,
  accent = "crimson",
  hint,
  className,
}: {
  eyebrow?: string;
  line1: string;
  line2?: string;
  sub?: string;
  /** Akzent der zweiten Zeile */
  accent?: "crimson" | "iridescent" | "chrome";
  /** kleiner Hinweis unten, z. B. "Weiter scrollen" */
  hint?: string;
  className?: string;
}) {
  const line2Class =
    accent === "iridescent"
      ? "text-iridescent"
      : accent === "chrome"
      ? "text-chrome-animate"
      : "text-crimson";

  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-950/50 px-6 py-24 backdrop-blur-sm",
        className
      )}
    >
      {/* Lichtschein-Hintergrund */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,42,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(180,190,205,0.08),transparent_50%)]" />

      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="relative mx-auto w-full max-w-5xl text-center"
      >
        {/* Technischer Reticle-Rahmen */}
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-10 sm:-inset-x-12 sm:-inset-y-16">
          <div className="absolute inset-0 rounded-[2px] border border-dashed border-white/10" />
          {/* Eck-Winkel */}
          {[
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "left-0 bottom-0 border-l-2 border-b-2",
            "right-0 bottom-0 border-r-2 border-b-2",
          ].map((pos) => (
            <span
              key={pos}
              className={cn("absolute h-5 w-5 border-crimson/70", pos)}
            />
          ))}
        </div>

        {eyebrow && (
          <motion.p
            variants={item}
            className="mb-6 text-[11px] font-medium uppercase tracking-widest2 text-chrome-400"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h2
          variants={item}
          className="glow-crimson font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-chrome-animate">{line1}</span>
          {line2 && (
            <>
              <br />
              <span className={cn("italic", line2Class)}>{line2}</span>
            </>
          )}
        </motion.h2>

        {sub && (
          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-chrome-300 sm:text-base"
          >
            {sub}
          </motion.p>
        )}

        {hint && (
          <motion.p
            variants={item}
            className="mt-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest2 text-chrome-500"
          >
            <span className="h-3 w-3 rounded-full border border-chrome-500/60" />
            {hint}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
