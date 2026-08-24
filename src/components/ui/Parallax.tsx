"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/utils";

/**
 * Parallax – verschiebt Inhalt scroll-abhängig vertikal (Tiefeneffekt).
 * `speed` > 0 bewegt sich langsamer/entgegen dem Scroll.
 *
 * Performance: Scroll-gekoppelte Bewegung heißt, dass bei jedem Scroll-Frame
 * ein Transform geschrieben wird. Auf Touch-Geräten (wo nativ auf dem
 * Compositor gescrollt wird) kostet das mehr, als der dezente Effekt bringt –
 * dort bleibt der Inhalt deshalb einfach stehen.
 */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { rich } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={rich ? { y } : undefined} className={cn(className)}>
      {children}
    </motion.div>
  );
}
