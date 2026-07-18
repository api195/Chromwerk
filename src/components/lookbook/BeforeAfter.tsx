"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

/**
 * BeforeAfter – interaktiver Vorher-/Nachher-Vergleich mit Schieberegler.
 * Ziehe den Griff (oder klicke) um die beiden Bilder zu vergleichen.
 *
 * Das „Vorher"-Bild liegt in einem beschnittenen Container; sein innerer
 * Rahmen muss exakt die volle Container-Breite haben, damit beide Bilder
 * deckungsgleich sind. Die Breite wird gemessen (ResizeObserver), damit es
 * schon beim ersten Rendern und bei jeder Größenänderung stimmt.
 */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Container-Breite messen (initial synchron + bei Resize)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // Sicherheit: beim Loslassen außerhalb des Elements Drag beenden
  useEffect(() => {
    const stop = () => (dragging.current = false);
    window.addEventListener("pointerup", stop);
    return () => window.removeEventListener("pointerup", stop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto aspect-square w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/10 bg-black",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      {/* Nachher (Hintergrund) */}
      <Image src={after} alt="Nachher" fill priority className="object-contain" sizes="(max-width:768px) 100vw, 576px" />
      <span className="absolute right-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur">
        Nachher
      </span>

      {/* Vorher (beschnitten) – innerer Rahmen = volle Container-Breite */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: width || "100%" }}>
          <Image src={before} alt="Vorher" fill className="object-contain" sizes="(max-width:768px) 100vw, 576px" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-300 backdrop-blur">
          Vorher
        </span>
      </div>

      {/* Griff */}
      <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/80" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-ink-950/80 backdrop-blur">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-white">
            <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
