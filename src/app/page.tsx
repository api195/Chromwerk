import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Stats } from "@/components/sections/Stats";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { LookbookCard } from "@/components/cards/LookbookCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { services } from "@/data/services";
import { lookbookProjects } from "@/data/lookbook";
import { products } from "@/data/products";

// Der Chromwerk-Prozess (Startseite)
const processSteps = [
  { n: "01", title: "Analyse", text: "Zustandsprüfung, Vermessung und Beratung zum optimalen Finish." },
  { n: "02", title: "Aufbereitung", text: "Schäden entfernen, schleifen und die Oberfläche vorbereiten." },
  { n: "03", title: "Verdichtung", text: "Mehrstufige Hochglanzverdichtung bis zur spiegelnden Chromtiefe." },
  { n: "04", title: "Versiegelung", text: "Keramischer Langzeitschutz für dauerhaften Glanz." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />

      {/* Leistungen-Vorschau */}
      <section className="py-24">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Leistungen"
              title="Veredelung auf Meisterniveau"
              description="Von der Aufbereitung bis zur Hochglanzverdichtung – alles aus einer Hand in Köln."
            />
            <Reveal>
              <Button href="/leistungen" variant="outline" size="md">
                Alle Leistungen
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i % 3} />
            ))}
          </div>
        </Container>
      </section>

      {/* Prozess */}
      <section className="relative overflow-hidden border-y border-white/10 bg-ink-900/40 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(225,29,42,0.08),transparent_40%)]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Der Chromwerk-Prozess"
            title="In vier Schritten zum Spiegelglanz"
            align="center"
            className="mb-16"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-ink-800/50 p-7">
                  <span className="font-display text-5xl font-bold text-transparent bg-chrome-text bg-clip-text opacity-40">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-chrome-400">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Lookbook-Vorschau */}
      <section className="py-24">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Lookbook"
              title="Vorher / Nachher"
              description="Echte Ergebnisse aus unserer Werkstatt. Ziehe im Detail den Vergleichsregler."
            />
            <Reveal>
              <Button href="/lookbook" variant="outline" size="md">
                Zum Lookbook
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lookbookProjects.slice(0, 3).map((p) => (
              <LookbookCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Pflegeprodukte-Vorschau */}
      <section className="border-y border-white/10 bg-ink-900/40 py-24">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Pflegeprodukte"
              title="Chromwerk Private Label"
              description="Eigene Pflegeprodukte, entwickelt für Chrom- und hochglanzverdichtete Oberflächen."
            />
            <Reveal>
              <Button href="/pflegeprodukte" variant="outline" size="md">
                Zum Shop
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,42,0.14),transparent_60%)]" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-4xl lg:text-5xl">
                  Bereit für echten Spiegelglanz?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base text-chrome-300">
                  Sichere dir deinen Termin für die Hochglanzverdichtung deiner
                  Felgen – oder lass uns deine gebrauchten Felgen bewerten.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button href="/termin" variant="primary" size="lg">
                    Termin buchen
                  </Button>
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
