import type { MutableRefObject } from "react";

/**
 * Geteilte, veränderliche Referenzen zwischen dem DOM-Wrapper (HeroCinematic)
 * und der 3D-Szene. Bewusst als Refs (kein React-State), damit die Animation
 * pro Frame ohne Re-Render läuft.
 */
export type HeroDrivers = {
  /** Intro-Fortschritt 0→1 (per GSAP animiert) */
  intro: MutableRefObject<number>;
  /** Scroll-Fortschritt 0→1 über die Hero-Strecke */
  scroll: MutableRefObject<number>;
  /** Normalisierte Mausposition (-1..1) */
  pointer: MutableRefObject<{ x: number; y: number }>;
  /** Material-Zustand der Felge: 0 = matt/oxidiert, 1 = Hochglanz-Chrom */
  morph: MutableRefObject<number>;
  /** Fortschritt des Licht-Sweeps über die Oberfläche (0→1), Szene "Politur" */
  sweep: MutableRefObject<number>;
  /** Nutzer bevorzugt reduzierte Bewegung */
  reduced: boolean;
};
