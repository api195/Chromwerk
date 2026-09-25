import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/data/site";

/**
 * HeroWheel – transparenter Hero über dem tumbelnden 3D-Felgen-Hintergrund.
 * Zeigt nur Marke + CTAs; die Felge (WheelBackground) bleibt sichtbar.
 *
 * Performance: Das Intro ist eine reine CSS-Animation (`.hero-in` in
 * globals.css). Sie startet mit dem ersten Bild – ohne auf das JavaScript
 * zu warten. Früher war der Hero unsichtbar, bis React geladen war; auf
 * langsamen Android-Handys bedeutete das mehrere Sekunden leeren Bildschirm.
 * Die Unschärfe im Intro gibt es nur auf Desktop-Bildschirmen mit Maus.
 */
function delay(i: number) {
  return { "--i": i } as React.CSSProperties;
}

export function HeroWheel() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      {/* dezenter Scrim nur hinter dem Text (Lesbarkeit, Felge bleibt sichtbar) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,7,0.55)_0%,transparent_60%)]" />

      <div className="relative flex flex-col items-center">
        <p
          style={delay(0)}
          className="hero-in mb-6 text-[11px] font-medium uppercase tracking-widest2 text-chrome-300"
        >
          {site.tagline} · {site.city}
        </p>

        {/* Wrapper animiert, damit sich die Intro-Unschärfe nicht mit dem
            drop-shadow der Überschrift (ebenfalls ein CSS-Filter) beißt. */}
        <div style={delay(1)} className="hero-in">
          <h1 className="font-display text-6xl font-bold uppercase leading-[0.85] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="bg-chrome-text bg-clip-text text-transparent">Chrom</span>
            <span className="italic text-crimson">werk</span>
          </h1>
        </div>

        <div style={delay(2)} className="hero-in">
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-chrome-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-base">
            Präzisions-Felgenveredelung aus Köln. Wir verwandeln Felgen in
            spiegelnde Kunstwerke – durch Hochglanzverdichtung auf höchstem Niveau.
          </p>
        </div>

        <div
          style={delay(3)}
          className="hero-in mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="/termin" variant="primary" size="lg">
            Termin buchen
          </MagneticButton>
          <MagneticButton href="/lookbook" variant="chrome" size="lg">
            Ergebnisse ansehen
          </MagneticButton>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest2 text-chrome-400">
          Scrollen · die Felge dreht mit
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/20">
          {/* Reine CSS-Animation: läuft ohne JavaScript-Schleife. */}
          <span className="mt-2 h-2 w-1 animate-scroll-hint rounded-full bg-chrome-200" />
        </span>
      </div>
    </section>
  );
}
