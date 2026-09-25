import { Fragment } from "react";

/**
 * SplitReveal – enthüllt Text Wort für Wort beim Scrollen.
 * Jedes Wort trägt den Chrom-Verlauf selbst (background-clip). Das ist wichtig,
 * weil ein Filter/Transform auf Kind-Elementen den background-clip:text eines
 * Eltern-Elements sonst brechen würde (Wörter würden unsichtbar).
 * Echte Leerzeichen bleiben erhalten (Screenreader/SEO/Copy-Paste).
 *
 * Performance
 * ------------------------------------------------------------------
 * Diese Komponente steckt in jeder Sektions-Überschrift. Statt einer
 * framer-motion-Animation pro Wort gibt es jetzt nur noch CSS-Transitions
 * (Opacity + Transform, GPU-beschleunigt), gestaffelt über `--w`. Ausgelöst
 * wird sie vom gemeinsamen Reveal-Observer (lib/revealScript.ts), der das
 * `data-shown`-Attribut am Wrapper setzt – ohne auf React zu warten.
 * Die Unschärfe pro Wort gibt es nur auf leistungsfähigen Geräten.
 */
export function SplitReveal({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <span data-reveal="words" suppressHydrationWarning style={{ display: "inline" }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className="rv-word bg-chrome-text bg-clip-text text-transparent"
            style={{ "--w": i } as React.CSSProperties}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
