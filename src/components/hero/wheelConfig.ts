/**
 * Gemeinsame Konstanten der 3D-Hintergrundfelge.
 * Liegt bewusst in einer eigenen, winzigen Datei: WheelBackground darf
 * ChromeRimScroll nicht direkt importieren, sonst landet three.js im
 * Haupt-Bundle jeder Seite.
 */
export const MODEL_URL = "/chrom_felge.glb";

export type WheelQuality = "high" | "lite";
