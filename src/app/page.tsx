import Link from "next/link";
import { HeroPhoto } from "@/components/hero/HeroPhoto";
import { Stats } from "@/components/sections/Stats";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { CinematicStatement } from "@/components/sections/CinematicStatement";
import { LookbookScroller } from "@/components/sections/LookbookScroller";
import { Marquee } from "@/components/sections/Marquee";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { services } from "@/data/services";
import { products } from "@/data/products";

const marqueeWords = [
  "Hochglanzverdichtung",
  "Chrom",
  "Köln",
  "Präzision",
  "Spiegelglanz",
  "Handwerk",
];

export default function HomePage() {
  return (
    <>
      <HeroPhoto />

      {/* Lauftext – ständige Bewegung */}
      <Marquee items={marqueeWords} direction="left" duration={34} accent />

      <Stats />

      {/* Cinematic Statement (Beat) */}
      <CinematicStatement
        eyebrow="Hochglanzverdichtung · Köln"
        line1="Mehr als eine Felge."
        line2="Ein Spiegel."
        accent="iridescent"
        sub="Wir verdichten Oberflächen bis sie ihre Umgebung reflektieren – tief, brillant, dauerhaft."
        hint="Weiter scrollen"
      />

      {/* Leistungen */}
      <section className="py-24">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Leistungen"
              title="Veredelung auf Meisterniveau"
              description="Von der Aufbereitung bis zur Hochglanzverdichtung – alles aus einer Hand in Köln."
            />
            <Reveal variant="fade">
              <Button href="/leistungen" variant="outline" size="md">
                Alle Leistungen
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i % 3} variant="blur" />
            ))}
          </div>
        </Container>
      </section>

      {/* Prozess – Sticky Scroll-Storytelling */}
      <ProcessStory />

      {/* Lookbook – gepinnte, horizontal scrollende Galerie */}
      <LookbookScroller />

      {/* Lauftext (Gegenrichtung) */}
      <Marquee items={marqueeWords} direction="right" duration={38} />

      {/* Pflegeprodukte */}
      <section className="border-y border-white/10 bg-ink-900/40 py-24">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Pflegeprodukte"
              title="Chromwerk Private Label"
              description="Eigene Pflegeprodukte, entwickelt für Chrom- und hochglanzverdichtete Oberflächen."
            />
            <Reveal variant="fade">
              <Button href="/pflegeprodukte" variant="outline" size="md">
                Zum Shop
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} index={i} variant="scale">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Cinematic Statement (Beat) */}
      <CinematicStatement
        eyebrow="Handwerk aus Köln"
        line1="Präzision, die man"
        line2="sehen kann."
        accent="chrome"
        sub="Jede Felge durchläuft denselben kompromisslosen Prozess – bis zum perfekten Spiegel."
      />

      {/* CTA */}
      <section className="py-24">
        <Container>
          <Reveal variant="scale">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,42,0.14),transparent_60%)]" />
              <Parallax speed={30} className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-chrome-line" />
              </Parallax>
              <div className="relative">
                <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-4xl lg:text-6xl">
                  <SplitReveal text="Bereit für echten Spiegelglanz?" />
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base text-chrome-300">
                  Sichere dir deinen Termin für die Hochglanzverdichtung deiner
                  Felgen – oder lass uns deine gebrauchten Felgen bewerten.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <MagneticButton href="/termin" variant="primary" size="lg">
                    Termin buchen
                  </MagneticButton>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-chrome-200 transition hover:text-white"
                  >
                    Kontakt aufnehmen
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
