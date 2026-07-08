"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { KoelnSkyline } from "./KoelnSkyline";
import { site } from "@/data/site";

/**
 * HeroPhoto – cinematische Foto-Hero mit echter Felge.
 * ------------------------------------------------------------------
 * • Intro: schwarz → Bild blendet auf.
 * • Maus-Parallax + langsamer Scroll-Zoom (Ken-Burns).
 * • Vorher/Nachher: dieselbe Felge morpht per CSS-Wipe von matt/oxidiert
 *   zu vollem Hochglanz-Chrom, ein Licht-Sweep fährt über die Kante.
 * • Szenen-Untertitel blenden weich über.
 *
 * BILD: site.heroImage (src/data/site.ts) – dort dein echtes Foto eintragen.
 */

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

function Caption({
  opacity,
  y,
  title,
  sub,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-[14%] z-30 flex flex-col items-center px-6 text-center"
    >
      <p className="font-display text-2xl font-semibold uppercase tracking-wide text-transparent bg-chrome-text bg-clip-text sm:text-3xl lg:text-4xl">
        {title}
      </p>
      {sub && (
        <p className="mt-3 max-w-md text-xs leading-relaxed text-chrome-400 sm:text-sm">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

export function HeroPhoto() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"intro" | "ready">("intro");

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Scroll-gesteuerte Werte
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.16]);
  const driftY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  // Vorher/Nachher-Wipe: Anteil der freigelegten Chromfläche (0..100 %)
  // Chrom → kurz matt → poliert (Wipe L→R) → Chrom
  const wipe = useTransform(
    scrollYProgress,
    [0, 0.28, 0.36, 0.74, 1],
    [100, 100, 0, 100, 100]
  );
  const clip = useTransform(wipe, (v) => `inset(0 0 0 ${v}%)`);
  const sweepLeft = useTransform(wipe, (v) => `${v}%`);
  const sweepOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.4, 0.72, 0.76],
    [0, 1, 1, 0]
  );

  // Captions
  const capBefore = useTransform(scrollYProgress, [0.28, 0.32, 0.36, 0.42], [0, 1, 1, 0]);
  const capBeforeY = useTransform(scrollYProgress, [0.28, 0.42], [24, -10]);
  const capPolish = useTransform(scrollYProgress, [0.44, 0.52, 0.7, 0.78], [0, 1, 1, 0]);
  const capPolishY = useTransform(scrollYProgress, [0.44, 0.78], [24, -14]);

  // Maus-Parallax
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 20 });

  // Intro
  useEffect(() => {
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();
    const still = params.get("still") === "1";
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("chromwerk_intro_seen") === "1";

    const skip = reduced || still || seen;
    const t = setTimeout(() => {
      setPhase("ready");
      try {
        sessionStorage.setItem("chromwerk_intro_seen", "1");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event("chromwerk:hero-ready"));
    }, skip ? 10 : 900);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mxRaw.set((e.clientX / window.innerWidth - 0.5) * 2);
      myRaw.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mxRaw, myRaw]);

  const parX = useTransform(mx, [-1, 1], [reduced ? 0 : -18, reduced ? 0 : 18]);
  const parY = useTransform(my, [-1, 1], [reduced ? 0 : -14, reduced ? 0 : 14]);

  return (
    <section ref={trackRef} className="relative h-[260vh] w-full bg-ink-950">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Poster-Hintergrund */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#141419_0%,#050506_60%)]" />
          <KoelnSkyline className="absolute bottom-16 left-1/2 h-auto w-[130%] -translate-x-1/2 text-chrome-600/[0.06]" />
        </div>

        {/* Bildbühne: mobil oben, Desktop rechte Bildhälfte */}
        <div className="absolute inset-x-0 top-0 z-10 h-[58%] lg:inset-y-0 lg:left-[32%] lg:right-0 lg:h-full">
          <motion.div style={{ scale: zoom, y: driftY }} className="relative h-full w-full">
            <motion.div style={{ x: parX, y: parY }} className="relative h-full w-full">
              {/* Nachher (voller Hochglanz) */}
              <Image
                src={site.heroImage}
                alt="Hochglanzverdichtete Chromfelge von Chromwerk"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 66vw"
                className="object-cover object-center"
              />
              {/* Vorher (matt/oxidiert), per Wipe abgetragen */}
              <motion.div style={{ clipPath: clip }} className="absolute inset-0">
                <Image
                  src={site.heroImage}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 100vw, 66vw"
                  className="object-cover object-center [filter:grayscale(0.8)_brightness(0.5)_contrast(1.05)]"
                />
              </motion.div>
              {/* Licht-Sweep an der Wipe-Kante */}
              <motion.div
                style={{ left: sweepLeft, opacity: sweepOpacity }}
                className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_40px_12px_rgba(255,255,255,0.6)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Intro-Blende */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "ready" ? 0 : 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-40 bg-ink-950"
        />

        {/* Scrim für Textlesbarkeit */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/70 lg:to-transparent" />

        {/* Szene 1 – Wortmarke + CTAs */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-30 flex items-end justify-center px-6 pb-20 sm:pb-24 lg:items-center lg:justify-start lg:px-14 lg:pb-0 xl:px-20"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={phase === "ready" ? "show" : "hidden"}
            className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.p
              variants={item}
              className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest2 text-chrome-400"
            >
              <span className="hidden h-px w-8 bg-crimson/70 lg:inline-block" />
              {site.tagline} · {site.city}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-6xl font-bold uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              <span className="bg-chrome-text bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.85)]">
                Chrom
              </span>
              <span className="italic text-crimson">werk</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-sm leading-relaxed text-chrome-300 sm:text-base lg:mt-7"
            >
              Präzisions-Felgenveredelung aus Köln. Wir verwandeln Felgen in
              spiegelnde Kunstwerke – durch Hochglanzverdichtung auf höchstem
              Niveau.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <MagneticButton href="/termin" variant="primary" size="lg">
                Termin buchen
              </MagneticButton>
              <MagneticButton href="/lookbook" variant="chrome" size="lg">
                Ergebnisse ansehen
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Szenen-Untertitel */}
        <Caption
          opacity={capBefore}
          y={capBeforeY}
          title="Vorher"
          sub="Matt, oxidiert, verkratzt – so kommen viele Felgen zu uns."
        />
        <Caption
          opacity={capPolish}
          y={capPolishY}
          title="Hochglanzverdichtung"
          sub="Ein Lichtstrich fährt über die Oberfläche – und dieselbe Felge wird zum Spiegel."
        />

        {/* Scroll-Indikator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
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
      </div>
    </section>
  );
}
