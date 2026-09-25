"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getGpuInfo } from "@/lib/gpu";
import { downgradeToLean, readMotionPrefs } from "@/lib/useMotionPrefs";
import { MODEL_URL, type WheelQuality } from "./wheelConfig";

/**
 * WheelBackground – fixierter 3D-Hintergrund (tumbelnde Chromfelge).
 *
 * Die schwere R3F-Szene wird nur im Browser geladen und nur dann, wenn
 * das Gerät sie flüssig darstellen kann:
 *
 *  1. Schätzung: Desktop mit Maus, genug CPU/RAM und eine Grafikkarte, die
 *     nicht als schwach bekannt ist (lib/gpu.ts). Starke Grafik → "high",
 *     integrierte Grafik → "lite". Handy/Tablet/schwache GPU → kein 3D.
 *  2. Messung: Die Szene prüft unsichtbar ihre echte Bildrate und schaltet
 *     bei Bedarf eine Stufe herunter (high → lite → aus).
 *
 * Darunter liegt immer ein statischer Studio-Verlauf – als Ladehintergrund
 * und als Rückfallebene.
 *
 * Debug: ?wheel=0 (aus), ?wheel=1 bzw. ?wheel=high (volle Stufe erzwingen),
 * ?wheel=lite (leichte Stufe erzwingen). Der Bildraten-Wächter bleibt aktiv.
 */
const ChromeRimScroll = dynamic(() => import("./ChromeRimScroll"), {
  ssr: false,
});

type Quality = WheelQuality | "off";

function pickQuality(): Quality {
  const force = new URLSearchParams(window.location.search).get("wheel");
  if (force === "0") return "off";
  if (force === "1" || force === "high") return getGpuInfo().webgl ? "high" : "off";
  if (force === "lite") return getGpuInfo().webgl ? "lite" : "off";

  // "rich" umfasst bereits: Maus, breiter Bildschirm, >4 Kerne, >4 GB RAM,
  // keine reduzierte Bewegung und keine als schwach bekannte Grafik.
  if (!readMotionPrefs().rich) return "off";
  const gpu = getGpuInfo();
  if (!gpu.webgl) return "off";
  // Unbekannte Grafik vorsichtig mit der leichten Stufe starten.
  return gpu.tier === "high" ? "high" : "lite";
}

/** Startet den Modell-Download parallel zum JavaScript der 3D-Szene. */
function preloadModel() {
  if (document.querySelector(`link[rel="preload"][href="${MODEL_URL}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "fetch";
  link.href = MODEL_URL;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

export function WheelBackground() {
  const [quality, setQuality] = useState<Quality>("off");
  const qualityRef = useRef<Quality>("off");
  qualityRef.current = quality;

  useEffect(() => {
    // Erst entscheiden, wenn der Browser nach dem Seitenstart Luft hat –
    // das Hero-Intro und die Hydration haben Vorrang vor dem 3D-Paket.
    const start = () => {
      const q = pickQuality();
      if (q !== "off") preloadModel();
      setQuality(q);
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback && w.cancelIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, []);

  // Bildraten-Wächter meldet Überlastung → eine Stufe herunter.
  const onTooSlow = useCallback(() => {
    if (qualityRef.current === "high") {
      setQuality("lite");
    } else if (qualityRef.current === "lite") {
      setQuality("off");
      // Selbst die leichte 3D-Szene ist zu viel: Das Gerät ist insgesamt
      // überfordert → auch Smooth-Scroll & Unschärfe-Effekte abschalten.
      downgradeToLean();
    }
  }, []);

  const onContextLost = useCallback(() => setQuality("off"), []);

  // Statischer Fallback-Hintergrund (immer vorhanden – auch als Ladehintergrund)
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #14151b 0%, #070709 55%, #030304 100%)",
        }}
      />
      {quality !== "off" && (
        <div className="pointer-events-none fixed inset-0 z-0">
          {/* key: Beim Stufenwechsel wird die Szene mit neuem WebGL-Kontext
              aufgebaut (Kantenglättung lässt sich nur beim Erzeugen setzen). */}
          <ChromeRimScroll
            key={quality}
            quality={quality}
            onTooSlow={onTooSlow}
            onContextLost={onContextLost}
          />
        </div>
      )}
    </>
  );
}
