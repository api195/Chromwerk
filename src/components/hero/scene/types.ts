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
  /** Nutzer bevorzugt reduzierte Bewegung */
  reduced: boolean;
};
