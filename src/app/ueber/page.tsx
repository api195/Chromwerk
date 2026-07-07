import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { KoelnSkyline } from "@/components/hero/KoelnSkyline";

export const metadata: Metadata = {
  title: "Über Chromwerk",
  description:
    "Chromwerk aus Köln steht für Präzision, Handwerk und Leidenschaft in der Felgenveredelung. Erfahre mehr über unsere Philosophie und Chrom-Optik.",
};

const values = [
  { title: "Präzision", text: "Jeder Arbeitsschritt ist auf ein makelloses, spiegelndes Ergebnis ausgelegt." },
  { title: "Handwerk", text: "Echte Handarbeit statt Massenware – jede Felge wird individuell veredelt." },
  { title: "Chrom-Optik", text: "Unsere Hochglanzverdichtung erzeugt eine tiefe, chromähnliche Reflexion." },
  { title: "Köln", text: "Verwurzelt in Köln, mit Leidenschaft für Automotive-Kultur." },
];

export default function UeberPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Chromwerk Köln"
        description="Wir machen aus Felgen Spiegel. Chromwerk verbindet modernste Verdichtungstechnik mit echtem Handwerk – für kompromisslosen Glanz."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-chrome-300">
                <p>
                  <span className="text-chrome-100">Chromwerk</span> wurde aus einer
                  einfachen Überzeugung geboren: Eine Felge ist mehr als ein
                  Bauteil – sie ist der Charakter eines Fahrzeugs. Deshalb
                  behandeln wir jede Felge wie ein Einzelstück.
                </p>
                <p>
                  In unserer Kölner Werkstatt verwandeln wir stumpfe, beschädigte
                  oder gebrauchte Felgen durch mehrstufige Hochglanzverdichtung in
                  spiegelnde Kunstwerke. Das Ergebnis ist eine Tiefe und Brillanz,
                  die man sonst nur von echtem Chrom kennt – dauerhaft und
                  widerstandsfähig.
                </p>
                <p>
                  Präzision, Leidenschaft und ein kompromissloser Qualitätsanspruch
                  prägen alles, was wir tun. Willkommen bei Chromwerk.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/lookbook" variant="chrome" size="md">
                  Unsere Ergebnisse
                </Button>
                <Button href="/termin" variant="ghost" size="md">
                  Termin buchen
                </Button>
              </div>
            </Reveal>

            {/* Dekoratives Köln-Panel */}
            <Reveal index={1}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-950 p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(225,29,42,0.12),transparent_60%)]" />
                <p className="relative text-xs uppercase tracking-widest2 text-chrome-500">
                  Made in
                </p>
                <p className="relative font-display text-5xl font-bold uppercase text-transparent bg-chrome-text bg-clip-text">
                  Köln
                </p>
                <KoelnSkyline className="relative mt-10 text-chrome-500/40" />
              </div>
            </Reveal>
          </div>

          {/* Werte */}
          <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} index={i}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-800/50 p-7">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm text-chrome-400">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
