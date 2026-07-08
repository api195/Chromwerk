"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TiltCard – 3D-Tilt beim Hover (Karten kippen leicht zum Mauszeiger)
 * inkl. wanderndem Licht-Glanz (Chrome-Shine). Für Lookbook-, Felgen-
 * und Produktkarten. Auf Touch-Geräten passiert nichts Störendes.
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
  const ref = useRef<HTMLDivElement>(null);
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
  const glare = useTransform(
    [mx, my] as MotionValue<number>[],
    (latest) => {
      const [gx, gy] = latest as number[];
      return `radial-gradient(220px circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.14), transparent 60%)`;
    }
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={cn(
        "group/tilt relative [perspective:1000px] will-change-transform",
        className
      )}
    >
      {children}
      {/* Wandernder Licht-Glanz */}
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
