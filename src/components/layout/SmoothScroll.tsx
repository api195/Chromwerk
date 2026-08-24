"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll – weiches Scrollen (Lenis) auf Desktop.
 * ------------------------------------------------------------------
 * Performance-Entscheidungen:
 *
 * 1. Auf Touch-Geräten (Handy/Tablet) wird Lenis NICHT gestartet. Mobile
 *    Browser scrollen nativ auf dem Compositor-Thread – das ist immer
 *    flüssiger als eine JS-Simulation und spart eine dauerhafte
 *    requestAnimationFrame-Schleife (= Akku + Hauptthread).
 * 2. Kein GSAP/ScrollTrigger mehr: die Bibliothek wurde nur benutzt, um
 *    Lenis mit einem Ticker zu versorgen. Ein schlankes rAF reicht dafür
 *    und spart ~70 kB JavaScript im Haupt-Bundle.
 * 3. Die rAF-Schleife pausiert, sobald der Tab im Hintergrund ist.
 * 4. "prefers-reduced-motion" wird respektiert (natives Scrollen).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    // Handy/Tablet oder reduzierte Bewegung → natives Scrollen, kein Lenis.
    if (prefersReduced || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch bleibt nativ, falls das Gerät beides kann (z. B. Touch-Laptop)
      syncTouch: false,
    });

    // Debug-Hook (nur mit ?debug) für präzises Scrollen in Tests
    if (window.location.search.includes("debug")) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // Im Hintergrund-Tab läuft die Schleife nicht weiter
    const onVisibility = () => {
      if (document.hidden) {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      } else if (!frame) {
        frame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
