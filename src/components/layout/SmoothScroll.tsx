"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LEAN_EVENT, readMotionPrefs } from "@/lib/useMotionPrefs";

/**
 * SmoothScroll – weiches Scrollen (Lenis) auf leistungsfähigen Desktops.
 * ------------------------------------------------------------------
 * Performance-Entscheidungen:
 *
 * 1. Lenis läuft nur mit vollem Geräteprofil (`rich`: Maus, genug CPU/RAM,
 *    keine schwache Grafikkarte). Lenis verlegt das Scrollen auf den
 *    Haupt-Thread: Ist der kurz beschäftigt (z. B. mit der 3D-Szene auf
 *    einer schwachen Laptop-Grafik), stockt dann das Scrollen selbst.
 *    Überall sonst scrollt der Browser nativ auf dem Compositor-Thread –
 *    das bleibt flüssig, egal wie viel die Seite gerade rechnet. (Chrome,
 *    Edge und Firefox glätten das Mausrad unter Windows ohnehin selbst.)
 * 2. Stellt sich zur Laufzeit heraus, dass das Gerät überfordert ist
 *    (3D-Szene misst zu niedrige Bildraten), wird Lenis wieder beendet.
 * 3. Kein GSAP/ScrollTrigger: ein schlankes rAF reicht als Ticker.
 * 4. Die rAF-Schleife pausiert, sobald der Tab im Hintergrund ist.
 * 5. "prefers-reduced-motion" wird respektiert (natives Scrollen).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Wertet auch das Geräteprofil aus und setzt `data-fx` auf <html>.
    const prefs = readMotionPrefs();
    if (!prefs.rich) return;

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
    let destroyed = false;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // Im Hintergrund-Tab läuft die Schleife nicht weiter
    const onVisibility = () => {
      if (destroyed) return;
      if (document.hidden) {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      } else if (!frame) {
        frame = requestAnimationFrame(loop);
      }
    };

    const teardown = () => {
      if (destroyed) return;
      destroyed = true;
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(LEAN_EVENT, teardown);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis.destroy();
    };

    document.addEventListener("visibilitychange", onVisibility);
    // Gerät zur Laufzeit als überfordert erkannt → zurück zu nativem Scrollen
    window.addEventListener(LEAN_EVENT, teardown);

    return teardown;
  }, []);

  return <>{children}</>;
}
