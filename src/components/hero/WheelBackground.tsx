"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDeviceTier, isWebGLAvailable } from "@/lib/useDeviceTier";

/**
 * WheelBackground – fixierter 3D-Hintergrund (tumbelnde Chromfelge).
 * Lädt die schwere R3F-Szene nur im Browser und nur auf leistungsfähigen
 * Geräten mit WebGL. Auf Mobil/Low-Power/ohne WebGL bleibt ein stimmiger,
 * statischer dunkler Studio-Hintergrund (Performance).
 */
const ChromeRimScroll = dynamic(() => import("./ChromeRimScroll"), {
  ssr: false,
});

export function WheelBackground() {
  const device = useDeviceTier();
  const [render3D, setRender3D] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const force = params.get("wheel"); // "1" erzwingen, "0" abschalten (Debug/Escape)
    if (force === "0") return setRender3D(false);
    if (force === "1") return setRender3D(isWebGLAvailable());
    setRender3D(device.tier === "high" && isWebGLAvailable());
  }, [device.tier]);

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
      {render3D && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <ChromeRimScroll />
        </div>
      )}
    </>
  );
}
