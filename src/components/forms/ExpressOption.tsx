"use client";

import { express, expressPriceLabel } from "@/data/express";
import { cn } from "@/lib/utils";

/**
 * ExpressOption – auswählbare Express-Bearbeitung im Terminformular.
 * ------------------------------------------------------------------
 * Umgesetzt als echtes Checkbox-Feld (name="express"), damit der Wert
 * automatisch mit dem FormData des Formulars übermittelt wird. Ist die
 * Box gesetzt, geht die Anfrage als Express-Auftrag bei Chromwerk ein.
 *
 * Der ganze Block ist das Label – man kann also überall darauf tippen,
 * nicht nur exakt auf das kleine Kästchen (wichtig auf dem Handy).
 */
export function ExpressOption({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label
      htmlFor="express"
      className={cn(
        "group relative flex cursor-pointer gap-4 rounded-2xl border p-5 transition-colors duration-300",
        checked
          ? "border-crimson/60 bg-crimson/10"
          : "border-white/10 bg-ink-900/60 hover:border-crimson/40"
      )}
    >
      <input
        id="express"
        name="express"
        type="checkbox"
        value={`Ja (${expressPriceLabel})`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />

      {/* Kästchen */}
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-300",
          checked
            ? "border-crimson bg-crimson text-white"
            : "border-white/25 text-transparent"
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m5 13 4 4L19 7" />
        </svg>
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-2 font-display text-base font-semibold uppercase tracking-wide text-chrome-100">
            {/* Blitz-Symbol */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="text-crimson">
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
            </svg>
            {express.title}
          </span>
          <span className="rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-crimson">
            {expressPriceLabel}
          </span>
        </span>

        <span className="mt-2 block text-sm leading-relaxed text-chrome-400">
          {express.short}
        </span>

        <span className="mt-3 flex flex-col gap-1.5">
          {express.benefits.map((b) => (
            <span key={b} className="flex items-center gap-2 text-xs text-chrome-300">
              <span className="h-1 w-1 shrink-0 rounded-full bg-crimson" />
              {b}
            </span>
          ))}
        </span>

        <span className="mt-3 block text-[11px] leading-relaxed text-chrome-600">
          {express.note}
        </span>
      </span>
    </label>
  );
}
