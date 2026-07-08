import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { lookbookProjects } from "@/data/lookbook";

/**
 * LookbookMarquee – editoriale, horizontal scrollbare Galerie.
 * Große Magazin-Karten (Hochformat) mit Snap-Scrolling, Bild-Zoom und
 * Overlay-Typografie – wie ein hochwertiges Lookbook-Kapitel.
 */
export function LookbookMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-ink-950 py-24">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Lookbook"
            title="Editorial"
            description="Ausgewählte Arbeiten wie in einem Magazin – ziehe zur Seite und öffne jedes Projekt."
          />
          <Reveal>
            <Button href="/lookbook" variant="outline" size="md">
              Alle Projekte
            </Button>
          </Reveal>
        </div>
      </Container>

      {/* Horizontale, snap-basierte Galerie */}
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-2 sm:px-8 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {lookbookProjects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/lookbook/${p.slug}`}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-ink-900 sm:w-[52vw] lg:w-[30vw] xl:w-[24rem]"
          >
            <Image
              src={p.coverImage}
              alt={p.title}
              fill
              sizes="(max-width:640px) 78vw, (max-width:1024px) 52vw, 24rem"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            {/* Verlauf + Glanz-Sweep */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            {/* Index */}
            <span className="absolute left-5 top-5 font-display text-sm font-semibold tracking-widest text-chrome-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="absolute right-5 top-5 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-chrome-200 backdrop-blur">
              {p.size}″
            </span>

            {/* Overlay-Text */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] uppercase tracking-widest2 text-crimson">
                {p.vehicle} · {p.brand}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none tracking-tight text-transparent bg-chrome-text bg-clip-text">
                {p.model}
              </h3>
              <p className="mt-3 line-clamp-2 max-w-xs text-xs leading-relaxed text-chrome-400">
                {p.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-chrome-200 transition-colors group-hover:text-white">
                Ansehen
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
        {/* End-Spacer */}
        <div className="w-2 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
