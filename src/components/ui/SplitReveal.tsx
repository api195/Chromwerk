"use client";

import { Fragment, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

/**
 * SplitReveal – enthüllt Text Wort für Wort beim Scrollen.
 * Jedes Wort trägt den Chrom-Verlauf selbst (background-clip). Das ist wichtig,
 * weil ein Filter/Transform auf Kind-Elementen den background-clip:text eines
 * Eltern-Elements sonst brechen würde (Wörter würden unsichtbar).
 * Echte Leerzeichen bleiben erhalten (Screenreader/SEO/Copy-Paste).
 *
 * Performance
 * ------------------------------------------------------------------
 * Diese Komponente steckt in jeder Sektions-Überschrift, es sind also viele
 * gleichzeitig animierte Elemente. Zwei Dinge waren teuer:
 *
 *  1. `filter: blur()` pro Wort – jedes Wort wird pro Bild neu weichgezeichnet.
 *     Läuft jetzt nur noch auf leistungsfähigen Desktop-Geräten.
 *  2. Ein dauerhaftes `will-change: transform` pro Wort – das erzeugt für
 *     JEDES Wort dauerhaft eine eigene GPU-Ebene (Speicher + Compositing-Last),
 *     auch lange nachdem die Animation vorbei ist. framer-motion setzt
 *     `will-change` während der Animation ohnehin selbst.
 */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
};

const wordRich: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Günstige Variante: nur Opacity + Transform (beides GPU-beschleunigt). */
const wordLean: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitReveal({ text }: { text: string }) {
  const { rich } = useMotionPrefs();
  const words = useMemo(() => text.split(" "), [text]);
  const word = rich ? wordRich : wordLean;

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ display: "inline" }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            // data-reveal: siehe "prefers-reduced-motion"-Regel in globals.css
            data-reveal
            variants={word}
            className="bg-chrome-text bg-clip-text text-transparent"
            style={{ display: "inline-block" }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}
