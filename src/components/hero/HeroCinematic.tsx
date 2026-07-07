"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { KoelnSkyline } from "./KoelnSkyline";
import { site } from "@/data/site";
import { useDeviceTier, isWebGLAvailable } from "@/lib/useDeviceTier";
import type { HeroDrivers } from "./scene/types";

// 3D-Szene nur im Browser laden (kein SSR)
const HeroCanvas = dynamic(
  () => import("./scene/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const contentVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroCinematic() {
  const device = useDeviceTier();

  // Geteilte Treiber-Refs (kein Re-Render pro Frame)
  const drivers = useRef<HeroDrivers>({
    intro: { current: 0 },
    scroll: { current: 0 },
    pointer: { current: { x: 0, y: 0 } },
    reduced: device.reduced,
  });

  const trackRef = useRef<HTMLElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"intro" | "ready">("intro");
  const [webgl, setWebgl] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [disableFx, setDisableFx] = useState(false);

  // Scroll-Fortschritt über die Hero-Strecke
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    drivers.current.scroll.current = v;
  });
  // Inhalt beim Scrollen elegant ausblenden
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.32], [0, -60]);

  useEffect(() => {
    setMounted(true);
    const hasWebGL = isWebGLAvailable();
    setWebgl(hasWebGL);

    // URL-Parameter (für Screenshots/Debug): ?still=1 überspringt das Intro
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();
    const still = params.get("still") === "1";
    setDisableFx(params.get("nofx") === "1");

    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("chromwerk_intro_seen") === "1";

    const skip = device.reduced || still || seen || !hasWebGL;

    const finish = () => {
      drivers.current.intro.current = 1;
      setPhase("ready");
      try {
        sessionStorage.setItem("chromwerk_intro_seen", "1");
      } catch {
        /* ignore */
      }
      // Navigation darf jetzt erscheinen
      window.dispatchEvent(new Event("chromwerk:hero-ready"));
    };

    if (skip) {
      if (blackRef.current) blackRef.current.style.opacity = "0";
      finish();
      return;
    }

    // Cinematisches Intro: schwarz → Reflexion → Enthüllung → Inhalt
    const proxy = { p: 0 };
    const tl = gsap.timeline();
    tl.to(blackRef.current, { opacity: 0, duration: 1.4, ease: "power2.out" }, 0.3)
      .to(
        proxy,
        {
          p: 1,
          duration: 3.6,
          ease: "power2.inOut",
          onUpdate: () => {
            drivers.current.intro.current = proxy.p;
          },
        },
        0.6
      )
      .add(finish, ">-0.2");

    return () => {
      tl.kill();
    };
  }, [device.reduced]);

  // Maus-Parallax (nur high-Tier, keine Touch-Geräte)
  useEffect(() => {
    if (device.tier === "low" || device.reduced) return;
    const onMove = (e: MouseEvent) => {
      drivers.current.pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      drivers.current.pointer.current.y =
        (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [device.tier, device.reduced]);

  return (
    <section ref={trackRef} className="relative h-[200vh] w-full bg-ink-950">
      {/* Gepinnter Viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Statischer Premium-Fallback (Poster) hinter der Szene */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#15151a_0%,#050506_58%)]" />
          <KoelnSkyline className="absolute bottom-16 left-1/2 h-auto w-[130%] -translate-x-1/2 text-chrome-600/[0.07]" />
        </div>

        {/* 3D-Szene: mobil oben, Desktop rechte Bildhälfte */}
        {mounted && webgl && (
          <div className="absolute inset-x-0 top-0 z-10 h-[58%] lg:inset-y-0 lg:left-[36%] lg:right-0 lg:h-full">
            <HeroCanvas
              drivers={drivers.current}
              device={device}
              disableFx={disableFx}
            />
          </div>
        )}

        {/* Schwarze Intro-Blende */}
        <div
          ref={blackRef}
          className="pointer-events-none absolute inset-0 z-30 bg-ink-950"
          style={{ opacity: phase === "ready" ? 0 : 1 }}
        />

        {/* Scrim für Textlesbarkeit: mobil von unten, Desktop von links */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/70 lg:to-transparent" />

        {/* Inhalt (erscheint nach dem Intro, blendet beim Scrollen aus) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-40 flex items-end justify-center px-6 pb-20 sm:pb-24 lg:items-center lg:justify-start lg:px-14 lg:pb-0 xl:px-20"
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={phase === "ready" ? "show" : "hidden"}
            className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest2 text-chrome-400"
            >
              <span className="hidden h-px w-8 bg-crimson/70 lg:inline-block" />
              {site.tagline} · {site.city}
            </motion.p>

            {/* Wortmarke (Logo im Fokus) */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-6xl font-bold uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              <span className="bg-chrome-text bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.85)]">
                Chrom
              </span>
              <span className="italic text-crimson">werk</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md text-sm leading-relaxed text-chrome-300 sm:text-base lg:mt-7"
            >
              Präzisions-Felgenveredelung aus Köln. Wir verwandeln Felgen in
              spiegelnde Kunstwerke – durch Hochglanzverdichtung auf höchstem
              Niveau.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Button href="/termin" variant="primary" size="lg">
                Termin buchen
              </Button>
              <Button href="/lookbook" variant="chrome" size="lg">
                Ergebnisse ansehen
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll-Indikator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
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
