"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/utils";

/**
 * TiltCard – 3D-Tilt beim Hover (Karten kippen leicht zum Mauszeiger)
 * inkl. wanderndem Licht-Glanz (Chrome-Shine).
 *
 * Performance
 * ------------------------------------------------------------------
 *  • Auf Touch-Geräten wird der Effekt gar nicht erst aufgebaut: kein
 *    `perspective`, kein `preserve-3d`, keine Spring-Animationen und
 *    kein Glanz-Overlay. Das spart pro Karte eine GPU-Ebene – bei einer
 *    Galerie mit vielen Karten ist das der Unterschied zwischen zähem
 *    und flüssigem Scrollen.
 *  • Die Kartenmaße werden beim Betreten EINMAL gemessen statt bei jeder
 *    Mausbewegung. `getBoundingClientRect()` erzwingt ein Layout – im
 *    mousemove-Handler ist das eine klassische Ruckelquelle.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  /** maximaler Kippwinkel in Grad */
  intensity?: number;
}) {
  const { fine, reduced } = useMotionPrefs();
  const enabled = fine && !reduced;

  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  });

  // Position des Glanz-Highlights folgt dem Zeiger
  const glare = useTransform([mx, my] as MotionValue<number>[], (latest) => {
    const [gx, gy] = latest as number[];
    return `radial-gradient(220px circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.14), transparent 60%)`;
  });

  function onEnter() {
    // Einmal pro Hover messen – nicht pro Mausbewegung.
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = rect.current;
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    rect.current = null;
    mx.set(0.5);
    my.set(0.5);
  }

  // Wichtig: Es wird immer dasselbe Element gerendert. Ein Wechsel des
  // Element-Typs würde die Karte (inkl. Bilder) neu mounten lassen.
  // Auf Touch-Geräten entfallen lediglich Handler, 3D-Kontext und Glanz.
  return (
    <motion.div
      ref={ref}
      onMouseEnter={enabled ? onEnter : undefined}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={
        enabled
          ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
          : undefined
      }
      className={cn(
        "group/tilt relative",
        enabled && "[perspective:1000px]",
        className
      )}
    >
      {children}
      {/* Wandernder Licht-Glanz (nur mit Maus/Trackpad) */}
      {enabled && (
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] group-hover/tilt:opacity-100"
        />
      )}
    </motion.div>
  );
}
