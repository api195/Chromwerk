"use client";

/**
 * Zentrale Scroll-Quelle
 * ------------------------------------------------------------------
 * Statt dass jede Komponente einen eigenen `scroll`-Listener registriert
 * (und dabei jedes Mal `scrollHeight`/`innerHeight` liest – was das Layout
 * erzwingt und Ruckler verursacht), gibt es genau EINEN passiven Listener.
 *
 * - Die Seitenhöhe wird gecached und nur bei Resize / Layout-Änderungen
 *   neu gemessen (ResizeObserver), nicht bei jedem Scroll-Frame.
 * - Alle Abonnenten werden gebündelt in einem requestAnimationFrame
 *   benachrichtigt – also maximal einmal pro Bild, nie mehrfach.
 */
export type ScrollListener = (y: number, progress: number) => void;

const listeners = new Set<ScrollListener>();

let maxScroll = 0;
let frame = 0;
let attached = false;
let resizeObserver: ResizeObserver | null = null;

function measure() {
  maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
}

function flush() {
  frame = 0;
  const y = window.scrollY;
  const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
  listeners.forEach((listener) => listener(y, progress));
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

function onResize() {
  measure();
  schedule();
}

function attach() {
  if (attached) return;
  attached = true;
  measure();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  // Layout-Änderungen (Bilder laden, Akkordeon öffnet, Font-Swap …)
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.documentElement);
  }
}

function detach() {
  if (!attached) return;
  attached = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", onResize);
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/**
 * Abonniert die globale Scroll-Position.
 * Gibt eine Aufräum-Funktion zurück (in useEffect zurückgeben).
 */
export function subscribeScroll(listener: ScrollListener): () => void {
  if (typeof window === "undefined") return () => {};
  attach();
  listeners.add(listener);
  // Direkt einmal mit dem aktuellen Stand aufrufen
  const y = window.scrollY;
  listener(y, maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) detach();
  };
}

/** Erzwingt eine Neumessung der Seitenhöhe (z. B. nach Routenwechsel). */
export function remeasureScroll() {
  if (typeof window === "undefined" || !attached) return;
  onResize();
}
