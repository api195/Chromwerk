"use client";

import { useEffect, useState } from "react";

/**
 * Bewegungs-Profil des Geräts
 * ------------------------------------------------------------------
 * Legt fest, wie „teuer" Animationen sein dürfen. Teure Effekte sind vor
 * allem `filter: blur()`-Animationen, `backdrop-filter`, 3D-Transforms und
 * Hover-Effekte, die pro Mausbewegung Layout lesen.
 *
 * Wichtig für die Hydration: Auf dem Server und beim ersten Client-Render
 * wird IMMER das sparsame Profil geliefert. Erst nach dem Mount (useEffect)
 * schaltet ein leistungsfähiges Gerät auf die volle Version hoch. Dadurch
 * stimmen Server- und Client-Markup überein, und schwache Geräte bekommen
 * die teuren Effekte gar nicht erst zu sehen.
 */
export type MotionPrefs = {
  /** Nutzer bevorzugt reduzierte Bewegung */
  reduced: boolean;
  /** Maus/Trackpad vorhanden → Hover-Effekte lohnen sich */
  fine: boolean;
  /** Gerät verkraftet teure Effekte (Blur-Animationen, Tilt, Bloom) */
  rich: boolean;
};

const LEAN: MotionPrefs = { reduced: false, fine: false, rich: false };

let cached: MotionPrefs | null = null;

function detect(): MotionPrefs {
  if (typeof window === "undefined") return LEAN;
  if (cached) return cached;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const cores =
    typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
      ? navigator.hardwareConcurrency || 8
      : 8;
  // @ts-expect-error – deviceMemory ist experimentell und nicht überall da
  const memory: number = navigator?.deviceMemory ?? 8;

  cached = {
    reduced,
    fine,
    rich: !reduced && fine && window.innerWidth >= 1024 && cores > 4 && memory > 4,
  };
  return cached;
}

export function useMotionPrefs(): MotionPrefs {
  const [prefs, setPrefs] = useState<MotionPrefs>(LEAN);

  useEffect(() => {
    const next = detect();
    // Nur setzen, wenn sich wirklich etwas ändert (spart einen Re-Render)
    if (
      next.reduced !== prefs.reduced ||
      next.fine !== prefs.fine ||
      next.rich !== prefs.rich
    ) {
      setPrefs(next);
    }
    // Absicht: nur einmal beim Mount auswerten
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return prefs;
}

/** Direkte (nicht-reaktive) Abfrage – nur im Browser aufrufen. */
export function readMotionPrefs(): MotionPrefs {
  return detect();
}
