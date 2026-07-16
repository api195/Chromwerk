import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * ComingSoon – edle Platzhalter-Seite für Kategorien, die bald starten.
 * Minimalistisch und professionell: Reticle-Rahmen, Chrom-Titel,
 * dezenter Crimson-Akzent, klare Weiterleitung zu Lookbook/Termin.
 */
export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-950 px-6 py-32">
      {/* Lichtschein-Hintergrund */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,42,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(180,190,205,0.07),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        {/* Technischer Reticle-Rahmen */}
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-12 sm:-inset-x-14 sm:-inset-y-16">
          <div className="absolute inset-0 rounded-[2px] border border-dashed border-white/10" />
          {[
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "left-0 bottom-0 border-l-2 border-b-2",
            "right-0 bottom-0 border-r-2 border-b-2",
          ].map((pos) => (
            <span key={pos} className={`absolute h-5 w-5 border-crimson/70 ${pos}`} />
          ))}
        </div>

        <Reveal variant="fade">
          <p className="text-[11px] font-medium uppercase tracking-widest2 text-chrome-400">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal variant="blur" index={1}>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-7xl">
            {title}
          </h1>
        </Reveal>

        <Reveal variant="fade" index={2}>
          <p className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-crimson/40 bg-crimson/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest2 text-crimson">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            Coming Soon
          </p>
        </Reveal>

        <Reveal variant="fade" index={3}>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-chrome-300 sm:text-base">
            {description}
          </p>
        </Reveal>

        <Reveal variant="fade" index={4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/lookbook" variant="chrome" size="lg">
              Lookbook ansehen
            </MagneticButton>
            <MagneticButton href="/termin" variant="ghost" size="lg">
              Termin buchen
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
