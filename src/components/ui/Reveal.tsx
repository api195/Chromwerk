import { cn } from "@/lib/utils";

/**
 * Reveal – animiert Inhalte sanft ein, sobald sie in den Viewport scrollen.
 * Varianten: "up" (Standard), "fade", "blur", "scale".
 *
 * Performance
 * ------------------------------------------------------------------
 * Früher lief jede Einblendung über framer-motion: pro Element eine
 * JavaScript-Animation auf dem Haupt-Thread, und bis React geladen war,
 * blieb der Inhalt unsichtbar. Jetzt:
 *
 *  • Reine CSS-Transition (Opacity + Transform) – der Browser animiert sie
 *    auf der GPU, auch wenn der Haupt-Thread gerade beschäftigt ist.
 *  • Ausgelöst von EINEM gemeinsamen IntersectionObserver, der schon vor
 *    React läuft (lib/revealScript.ts). Keine Hydration nötig – das ist
 *    eine Server-Komponente ohne eigenes JavaScript.
 *  • Die Unschärfe der "blur"-Variante gibt es nur auf leistungsfähigen
 *    Geräten (`html[data-fx="rich"]`, siehe globals.css).
 *
 * `data-shown` wird vom Skript gesetzt, eventuell schon vor der Hydration –
 * daher suppressHydrationWarning.
 */
type RevealVariant = "up" | "fade" | "blur" | "scale";

export function Reveal({
  children,
  className,
  index = 0,
  as: Tag = "div",
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li" | "section" | "article";
  variant?: RevealVariant;
}) {
  return (
    <Tag
      data-reveal={variant}
      suppressHydrationWarning
      className={cn(className)}
      // Versatz für gestaffelte Einblendungen (70 ms pro Schritt)
      style={index ? ({ "--rv-i": index } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
