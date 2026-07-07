"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BeforeAfter – interaktiver Vorher-/Nachher-Vergleich mit Schieberegler.
 * Ziehe den Griff (oder klicke) um die beiden Bilder zu vergleichen.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-ink-900",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* Nachher (Hintergrund) */}
      <Image src={after} alt="Nachher" fill className="object-cover" sizes="100vw" />
      <span className="absolute right-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur">
        Nachher
      </span>

      {/* Vorher (beschnitten) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div className="relative h-full" style={{ width: containerRef.current?.clientWidth ?? "100%" }}>
          <Image src={before} alt="Vorher" fill className="object-cover" sizes="100vw" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-300 backdrop-blur">
          Vorher
        </span>
      </div>

      {/* Griff */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/80"
        style={{ left: `${pos}%` }}
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
