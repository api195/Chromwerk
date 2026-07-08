"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reveal – animiert Inhalte sanft ein, sobald sie in den Viewport scrollen.
 * Varianten: "up" (Standard), "fade", "blur", "scale".
 */
type RevealVariant = "up" | "fade" | "blur" | "scale";

const hiddenByVariant: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 0, y: 28 },
  fade: { opacity: 0 },
  blur: { opacity: 0, y: 20, filter: "blur(12px)" },
  scale: { opacity: 0, scale: 0.92 },
};

function makeVariants(variant: RevealVariant): Variants {
  return {
    hidden: hiddenByVariant[variant],
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };
}

export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li" | "section" | "article";
  variant?: RevealVariant;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={makeVariants(variant)}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
