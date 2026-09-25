"use client";

/**
 * Grafikkarten-Einstufung
 * ------------------------------------------------------------------
 * Die Anzahl der CPU-Kerne sagt nichts über die Grafikleistung aus: Ein
 * typischer Windows-Laptop hat 8+ Threads, aber nur eine sparsame Intel-
 * Grafik. Genau dort ruckelte die Seite, weil die volle 3D-Szene (Bloom,
 * Kantenglättung, Clearcoat) aktiv war.
 *
 * Deshalb wird hier einmalig der Name der Grafikkarte über WebGL gelesen
 * und grob eingestuft:
 *
 *   "high" – Apple Silicon, dedizierte NVIDIA/AMD-Karten → volle 3D-Szene
 *   "mid"  – starke integrierte Grafik (Intel Iris Xe / Arc, AMD Ryzen APU)
 *            → leichte 3D-Szene
 *   "low"  – ältere Intel HD/UHD, Handy-GPUs, Software-Rendering
 *            → kein 3D, sparsame Effekte
 *   null   – unbekannt (Name verschleiert) → vorsichtige Mittelstufe
 *
 * Die Einstufung ist nur die erste Schätzung. Die 3D-Szene misst danach
 * zusätzlich die echte Bildrate und schaltet bei Bedarf weiter herunter
 * (siehe ChromeRimScroll.tsx).
 */
export type GpuTier = "high" | "mid" | "low";

export type GpuInfo = {
  /** WebGL steht überhaupt zur Verfügung */
  webgl: boolean;
  /** Name der Grafikkarte (leer, wenn nicht lesbar) */
  renderer: string;
  tier: GpuTier | null;
};

let cached: GpuInfo | null = null;

function readRenderer(): { webgl: boolean; renderer: string } {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return { webgl: false, renderer: "" };

    // Firefox liefert den echten Namen direkt über RENDERER (und warnt bei
    // der Debug-Erweiterung). Chrome/Safari liefern dort nur "WebKit WebGL".
    let renderer = String(gl.getParameter(gl.RENDERER) || "");
    if (!renderer || /^webkit webgl$/i.test(renderer)) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "");
    }

    // Test-Kontext sofort wieder freigeben (Browser begrenzen die Anzahl).
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return { webgl: true, renderer };
  } catch {
    return { webgl: false, renderer: "" };
  }
}

/** Ordnet einen Grafikkarten-Namen einer Leistungsstufe zu. */
export function classifyRenderer(name: string): GpuTier | null {
  const s = name.toLowerCase();
  if (!s) return null;

  // Software-Rendering (keine echte Grafikkarte im Einsatz)
  if (/swiftshader|llvmpipe|softpipe|software|basic render/.test(s)) return "low";

  // Apple Silicon (Chrome: "Apple M1 …", Safari: "Apple GPU")
  if (/apple (m\d|gpu)/.test(s)) return "high";

  // AMD-Prozessorgrafik (APU) – vor den dedizierten Radeon-Karten prüfen,
  // weil z. B. "Radeon RX Vega 10 Graphics" eine integrierte Grafik ist.
  if (/vega \d|radeon.*graphics|radeon(\(tm\))? \d{3}m/.test(s)) return "mid";

  // Einstiegs-Grafikkarten in Laptops (GeForce MX / GT)
  if (/geforce (mx|gt )|\bmx\s?\d{3}\b/.test(s)) return "mid";

  // Dedizierte Grafikkarten
  if (/nvidia|geforce|quadro|rtx|gtx|radeon|arc\(tm\) a\d|arc a\d/.test(s)) return "high";

  // Starke integrierte Intel-Grafik
  if (/iris\(r\) xe|iris xe|\barc\b/.test(s)) return "mid";

  // Ältere Intel-Grafik (HD / UHD / Iris Plus) und Handy-GPUs
  if (/intel|mali|adreno|powervr|vivante|videocore|tegra/.test(s)) return "low";

  return null;
}

/**
 * Liest die Grafikkarte einmalig aus (Ergebnis wird gecached).
 * Nur im Browser aufrufen – und möglichst nur auf Desktop-Geräten, auf
 * dem Handy wird die Information nicht gebraucht.
 */
export function getGpuInfo(): GpuInfo {
  if (cached) return cached;
  if (typeof window === "undefined") return { webgl: false, renderer: "", tier: null };
  const { webgl, renderer } = readRenderer();
  cached = { webgl, renderer, tier: webgl ? classifyRenderer(renderer) : "low" };
  return cached;
}
