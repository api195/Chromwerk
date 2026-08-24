"use client";

import { motion, type Variants } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/utils";

/**
 * Reveal – animiert Inhalte sanft ein, sobald sie in den Viewport scrollen.
 * Varianten: "up" (Standard), "fade", "blur", "scale".
 *
 * Performance: `filter: blur()` zu animieren ist der teuerste Effekt hier –
 * der Browser muss die Fläche für jedes Bild neu weichzeichnen. Auf
 * schwächeren Geräten (und auf dem Handy) wird die Blur-Variante deshalb
 * automatisch durch die günstige "up"-Variante ersetzt. Optisch ist der
 * Unterschied minimal, beim Scrollen aber deutlich spürbar.
 */
type RevealVariant = "up" | "fade" | "blur" | "scale";

/* Varianten einmalig auf Modulebene bauen – nicht bei jedem Render neu,
   sonst erkennt framer-motion sie als „geändert" und rechnet unnötig. */
const VARIANTS: Record<RevealVariant, Variants> = {
  up: makeVariants({ opacity: 0, y: 28 }),
  fade: makeVariants({ opacity: 0 }),
  blur: makeVariants({ opacity: 0, y: 20, filter: "blur(12px)" }),
  scale: makeVariants({ opacity: 0, scale: 0.92 }),
};

function makeVariants(hidden: Record<string, number | string>): Variants {
  const visible: Record<string, number | string> = { opacity: 1 };
  // Nur die Eigenschaften zurückfahren, die auch versteckt wurden.
  if ("y" in hidden) visible.y = 0;
  if ("scale" in hidden) visible.scale = 1;
  if ("filter" in hidden) visible.filter = "blur(0px)";

  return {
    hidden,
    visible: (i: number) => ({
      ...visible,
      transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
  };
}

export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li" | "section" | "article";
  variant?: RevealVariant;
}) {
  const { rich } = useMotionPrefs();
  const MotionTag = motion[as];

  // Teure Blur-Animation nur auf leistungsfähigen Geräten
  const effective: RevealVariant = variant === "blur" && !rich ? "up" : variant;

  return (
    <MotionTag
      // data-reveal: Haken für die "prefers-reduced-motion"-Regel in
      // globals.css, die den Endzustand erzwingt (siehe Kommentar dort).
      data-reveal
      className={cn(className)}
      variants={VARIANTS[effective]}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
