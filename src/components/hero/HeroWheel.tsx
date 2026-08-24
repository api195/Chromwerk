"use client";

import { motion, type Variants } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { site } from "@/data/site";

/**
 * HeroWheel – transparenter Hero über dem tumbelnden 3D-Felgen-Hintergrund.
 * Zeigt nur Marke + CTAs; die Felge (WheelBackground) bleibt sichtbar.
 *
 * Performance: Das Intro läuft direkt beim Seitenstart – also genau dann,
 * wenn der Browser ohnehin am meisten zu tun hat (Hydration, Fonts, Bilder).
 * Die Blur-Animation gibt es deshalb nur auf leistungsfähigen Geräten; sonst
 * blenden die Elemente nur ein und verschieben sich leicht.
 */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};
const itemRich: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};
const itemLean: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroWheel() {
  const { rich } = useMotionPrefs();
  const item = rich ? itemRich : itemLean;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      {/* dezenter Scrim nur hinter dem Text (Lesbarkeit, Felge bleibt sichtbar) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,7,0.55)_0%,transparent_60%)]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center"
      >
        <motion.p
          data-reveal
          variants={item}
          className="mb-6 text-[11px] font-medium uppercase tracking-widest2 text-chrome-300"
        >
          {site.tagline} · {site.city}
        </motion.p>

        <motion.h1
          data-reveal
          variants={item}
          className="font-display text-6xl font-bold uppercase leading-[0.85] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] sm:text-7xl lg:text-8xl xl:text-9xl"
        >
          <span className="bg-chrome-text bg-clip-text text-transparent">Chrom</span>
          <span className="italic text-crimson">werk</span>
        </motion.h1>

        <motion.p
          data-reveal
          variants={item}
          className="mt-6 max-w-xl text-sm leading-relaxed text-chrome-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-base"
        >
          Präzisions-Felgenveredelung aus Köln. Wir verwandeln Felgen in
          spiegelnde Kunstwerke – durch Hochglanzverdichtung auf höchstem Niveau.
        </motion.p>

        <motion.div
          data-reveal
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="/termin" variant="primary" size="lg">
            Termin buchen
          </MagneticButton>
          <MagneticButton href="/lookbook" variant="chrome" size="lg">
            Ergebnisse ansehen
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll-Indikator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-chrome-400">
          Scrollen · die Felge dreht mit
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/20">
          {/* Reine CSS-Animation: läuft ohne JavaScript-Schleife und wird vom
              Browser pausiert, sobald der Hero aus dem Blick scrollt. */}
          <span className="mt-2 h-2 w-1 animate-scroll-hint rounded-full bg-chrome-200" />
        </span>
      </motion.div>
    </section>
  );
}
