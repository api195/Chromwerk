"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll – weiches Scrollen (Lenis) + Synchronisation mit GSAP
 * ScrollTrigger, damit gepinnte, scroll-gescrubbte Animationen sauber laufen.
 * Respektiert "prefers-reduced-motion".
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Lenis-Scroll an ScrollTrigger weiterreichen
    lenis.on("scroll", ScrollTrigger.update);

    // Debug-Hook (nur mit ?debug) für präzises Scrollen in Tests
    if (window.location.search.includes("debug")) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // GSAP-Ticker treibt Lenis (ein RAF-Loop für beide)
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Nach dem ersten Layout Trigger neu berechnen
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
