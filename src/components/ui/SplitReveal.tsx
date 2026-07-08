"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";

/**
 * SplitReveal – enthüllt Text Wort für Wort (Blur + Aufwärts) beim Scrollen.
 * Jedes Wort trägt den Chrom-Verlauf selbst (background-clip). Das ist wichtig,
 * weil ein Filter/Transform auf Kind-Elementen den background-clip:text eines
 * Eltern-Elements sonst brechen würde (Wörter würden unsichtbar).
 * Echte Leerzeichen bleiben erhalten (Screenreader/SEO/Copy-Paste).
 */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitReveal({ text }: { text: string }) {
  const words = text.split(" ");
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
            variants={word}
            className="bg-chrome-text bg-clip-text text-transparent"
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}
