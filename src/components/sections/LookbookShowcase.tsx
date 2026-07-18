import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { lookbookProjects } from "@/data/lookbook";

/**
 * LookbookShowcase – ruhige, statische Felgen-Galerie auf der Startseite
 * (kein Scroll-Effekt). Zeigt die Felgen vollständig (object-contain auf
 * Schwarz), zentriert und ohne Beschriftung auf dem Bild. Jede Felge ist
 * klickbar und führt zur Projekt-Detailseite.
 */
export function LookbookShowcase() {
  return (
    <section id="lookbook" className="py-24">
      <Container>
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Ergebnisse"
            title="Lookbook"
            description="Ausgewählte Arbeiten aus unserer Kölner Werkstatt – für kompromisslosen Spiegelglanz."
          />
          <Reveal variant="fade">
            <Button href="/lookbook" variant="outline" size="md">
              Alle Projekte
            </Button>
          </Reveal>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {lookbookProjects.map((p, i) => (
            <Reveal key={p.slug} index={i % 3} className="w-full max-w-[420px] sm:w-[340px] lg:w-[380px]">
              <Link
                href={`/lookbook/${p.slug}`}
                aria-label={p.title}
                className="group relative block aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black transition-colors duration-500 hover:border-chrome-400/40"
              >
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="(max-width:640px) 90vw, 380px"
                  className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                {/* dezenter Licht-Sweep beim Hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
