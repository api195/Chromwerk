"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

/**
 * BeforeAfter – interaktiver Vorher-/Nachher-Vergleich mit Schieberegler.
 * Ziehe den Griff (oder klicke) um die beiden Bilder zu vergleichen.
 *
 * Das „Vorher"-Bild liegt in einem beschnittenen Container; sein innerer
 * Rahmen muss exakt die volle Container-Breite haben, damit beide Bilder
 * deckungsgleich sind.
 *
 * Performance
 * ------------------------------------------------------------------
 * Früher löste jede Zeigerbewegung ein React-Update aus (setState) – bei
 * schnellem Ziehen also dutzende Re-Renders pro Sekunde, jeweils mit
 * Reconciliation der beiden next/image-Bilder. Jetzt werden die Styles
 * direkt am DOM gesetzt und pro Bild (requestAnimationFrame) gebündelt;
 * React rendert dabei kein einziges Mal neu. Das Ziehen fühlt sich dadurch
 * auch auf dem Handy direkt an.
 */
const START_POS = 50;

export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const dragging = useRef(false);
  const rect = useRef<DOMRect | null>(null);
  const pending = useRef<number | null>(null);
  const frame = useRef(0);

  /** Schreibt die Position direkt ins DOM (kein React-Render). */
  const paint = useCallback((pos: number) => {
    if (clipRef.current) clipRef.current.style.width = `${pos}%`;
    if (handleRef.current) handleRef.current.style.left = `${pos}%`;
  }, []);

  /** Innerer Rahmen muss exakt Container-Breite haben (Deckungsgleichheit). */
  const syncWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el || !innerRef.current) return;
    rect.current = el.getBoundingClientRect();
    innerRef.current.style.width = `${el.clientWidth}px`;
  }, []);

  useLayoutEffect(() => {
    syncWidth();
    paint(START_POS);
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(syncWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncWidth, paint]);

  const update = useCallback(
    (clientX: number) => {
      const r = rect.current;
      if (!r || r.width === 0) return;
      const p = ((clientX - r.left) / r.width) * 100;
      pending.current = Math.max(0, Math.min(100, p));
      // Höchstens ein Update pro Bild – mehr kann der Bildschirm nicht zeigen.
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (pending.current !== null) paint(pending.current);
      });
    },
    [paint]
  );

  // Sicherheit: beim Loslassen außerhalb des Elements Drag beenden
  useEffect(() => {
    const stop = () => (dragging.current = false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        // touch-pan-y: vertikales Scrollen bleibt möglich, das horizontale
        // Ziehen übernehmen wir – so blockiert der Regler das Scrollen nicht.
        "relative mx-auto aspect-square w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-black",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        // Maße einmal pro Geste holen, nicht bei jeder Bewegung.
        rect.current = e.currentTarget.getBoundingClientRect();
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
    >
      {/* Nachher (Hintergrund) */}
      <Image
        src={after}
        alt="Nachher"
        fill
        priority
        className="object-contain"
        sizes="(max-width:768px) 100vw, 576px"
      />
      <span className="absolute right-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur">
        Nachher
      </span>

      {/* Vorher (beschnitten) – innerer Rahmen = volle Container-Breite */}
      <div
        ref={clipRef}
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${START_POS}%` }}
      >
        <div ref={innerRef} className="relative h-full w-full">
          <Image
            src={before}
            alt="Vorher"
            fill
            className="object-contain"
            sizes="(max-width:768px) 100vw, 576px"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-300 backdrop-blur">
          Vorher
        </span>
      </div>

      {/* Griff */}
      <div
        ref={handleRef}
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/80"
        style={{ left: `${START_POS}%` }}
      >
        <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-ink-950/80 backdrop-blur">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-white">
            <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
