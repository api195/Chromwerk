import Link from "next/link";
import { WheelBackground } from "@/components/hero/WheelBackground";
import { HeroWheel } from "@/components/hero/HeroWheel";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { LookbookScroller } from "@/components/sections/LookbookScroller";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

export default function HomePage() {
  return (
    <>
      {/* Tumbelnde 3D-Chromfelge als fixierter Hintergrund über die ganze Seite */}
      <WheelBackground />

      {/* Inhalt scrollt über dem Hintergrund (z-10) */}
      <div className="relative z-10">
      <HeroWheel />

      {/* Lookbook – das Herzstück: gepinnte, horizontal scrollende Galerie */}
      <LookbookScroller />

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
      </div>
    </>
  );
}
