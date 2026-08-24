"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { Button } from "./Button";

/**
 * MagneticButton – Button mit "magnetischem" Hover.
 * Der Button folgt dezent dem Mauszeiger und federt zurück.
 *
 * Performance: Die Maße werden beim Betreten einmal gemessen statt bei
 * jeder Mausbewegung (`getBoundingClientRect()` erzwingt sonst pro
 * mousemove ein Layout). Auf Touch-Geräten bleibt der Button komplett
 * statisch – dort gibt es keinen Hover, aber die Spring-Animation würde
 * trotzdem eine GPU-Ebene erzeugen.
 */
type ButtonProps = React.ComponentProps<typeof Button>;

export function MagneticButton(props: ButtonProps) {
  const { fine, reduced } = useMotionPrefs();
  const enabled = fine && !reduced;

  const ref = useRef<HTMLSpanElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onEnter() {
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  }

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    const r = rect.current;
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }

  function onLeave() {
    rect.current = null;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onMouseEnter={enabled ? onEnter : undefined}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={
        enabled
          ? { x: sx, y: sy, display: "inline-flex" }
          : { display: "inline-flex" }
      }
    >
      <Button {...props} />
    </motion.span>
  );
}
