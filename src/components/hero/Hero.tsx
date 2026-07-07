"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { KoelnSkyline } from "./KoelnSkyline";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

// 3D-Szene nur im Browser laden (kein SSR für React Three Fiber)
const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-40 w-40 animate-spin-slow rounded-full border border-white/10 border-t-white/40" />
      </div>
    ),
  }
);

/**
 * Hero – 3D-Parallax-Bühne.
 * ------------------------------------------------------------------
 * • Chromfelge (3D) im Zentrum, dreht sich beim Scrollen.
 * • Köln-Skyline als Stadtansicht mit Maus-Parallax (liest sich wie eine
 *   Reflexion auf dem Chrom).
 * • Zentrale Chromwerk-Wortmarke im Fokus.
 *
 * LOGO/TEXTE: Wortmarke = <Logo>-Komponente bzw. Headline unten anpassen.
 */
export function Hero() {
  // Scroll-Fortschritt (0..1) für die Felgen-Rotation
  const scrollRef = useRef(0);

  // Maus-Parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const skylineX = useSpring(px, { stiffness: 60, damping: 20 });
  const skylineY = useSpring(py, { stiffness: 60, damping: 20 });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const onScroll = () => {
      const progress = Math.min(
        window.scrollY / (window.innerHeight * 1.2),
        1
      );
      scrollRef.current = progress;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      px.set(x * 24);
      py.set(y * 16);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [px, py]);

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink-950">
      {/* Hintergrund-Verläufe */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(225,29,42,0.12),transparent_45%)]" />

      {/* Köln-Skyline mit Parallax */}
      <motion.div
        style={{ x: skylineX, y: skylineY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2"
      >
        <KoelnSkyline className="absolute bottom-24 left-1/2 h-auto w-[140%] -translate-x-1/2 text-chrome-600/25" />
      </motion.div>

      {/* 3D-Felge */}
      <div className="absolute inset-0 z-10">{ready && <HeroScene scrollRef={scrollRef} />}</div>

      {/* Dunkler Scrim für Textlesbarkeit */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,6,0.75)_100%)]" />

      {/* Inhalt */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-5 text-xs font-medium uppercase tracking-widest2 text-chrome-300"
        >
          {site.tagline} · {site.city}
        </motion.p>

        {/* Zentrale Wortmarke (Logo im Fokus) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="bg-chrome-text bg-clip-text text-transparent drop-shadow-[0_2px_1px_rgba(0,0,0,0.7)]">
            Chrom
          </span>
          <span className="italic text-crimson">werk</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-chrome-300 sm:text-lg"
        >
          Präzisions-Felgenveredelung aus Köln. Wir verwandeln Felgen in
          spiegelnde Kunstwerke – durch Hochglanzverdichtung auf höchstem Niveau.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/termin" variant="primary" size="lg">
            Termin buchen
          </Button>
          <Button href="/lookbook" variant="chrome" size="lg">
            Ergebnisse ansehen
          </Button>
        </motion.div>
      </div>

      {/* Scroll-Indikator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-chrome-500">
          Scrollen
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/15">
          <motion.span
            className="mt-2 h-2 w-1 rounded-full bg-chrome-200"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
