import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ExpressHighlight } from "@/components/sections/ExpressHighlight";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Leistungen – Hochglanzverdichtung & Felgenaufbereitung Köln",
  description:
    "Hochglanzverdichtung, Aufbereitung sowie An- und Verkauf von Felgen in Köln. Chromwerk veredelt deine Felgen zu spiegelndem Chrom-Hochglanz – inkl. Keramikversiegelung.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Was wir tun"
        title="Leistungen"
        description="Von der Aufbereitung bis zur Hochglanzverdichtung: Wir veredeln Felgen mit Präzision, Handwerk und Leidenschaft für die perfekte Chrom-Optik."
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i % 3} />
            ))}
          </div>

          {/* Express-Bearbeitung gegen Aufpreis */}
          <ExpressHighlight variant="banner" className="mt-20" />

          <Reveal>
            <div className="mt-20 rounded-3xl border border-white/10 bg-ink-900/40 p-10 text-center sm:p-14">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-chrome-100 sm:text-3xl">
                Individuelle Anfrage?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-chrome-400">
                Nicht sicher, welche Leistung du brauchst? Schick uns Bilder
                deiner Felgen – wir beraten dich persönlich.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/termin" variant="primary" size="lg">
                  Termin anfragen
                </Button>
                <Button href="/kontakt" variant="ghost" size="lg">
                  Kontakt
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
