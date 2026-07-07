"use client";

import { useMemo } from "react";

/**
 * Geräte-Einstufung für adaptive 3D-Qualität.
 * ------------------------------------------------------------------
 * Bestimmt, ob die volle (Desktop-)Version oder eine vereinfachte
 * (Mobil-/Low-Power-)Version der Hero-Animation geladen wird, und ob
 * der Nutzer reduzierte Bewegung bevorzugt.
 *
 * Wird nur clientseitig ausgewertet (die 3D-Szene wird ohnehin per
 * dynamic import ohne SSR geladen).
 */
export type DeviceTier = {
  /** "high" = volle Effekte, "low" = reduziert (mobil / schwache GPU) */
  tier: "high" | "low";
  /** Nutzer bevorzugt reduzierte Bewegung */
  reduced: boolean;
  /** Empfohlene Device-Pixel-Ratio-Obergrenze */
  maxDpr: number;
};

function detect(): DeviceTier {
  if (typeof window === "undefined") {
    return { tier: "high", reduced: false, maxDpr: 2 };
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 820;
  const cores =
    typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
      ? navigator.hardwareConcurrency
      : 8;
  // @ts-expect-error – deviceMemory ist experimentell
  const memory: number = navigator?.deviceMemory ?? 8;

  const low = coarse || narrow || cores <= 4 || memory <= 4;

  return {
    tier: low ? "low" : "high",
    reduced,
    maxDpr: low ? 1.5 : 2,
  };
}

export function useDeviceTier(): DeviceTier {
  // Einmalig beim Mount bestimmen (stabil über die Session)
  return useMemo(detect, []);
}

/** Prüft, ob WebGL überhaupt verfügbar ist (für Fallback-Poster). */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}
