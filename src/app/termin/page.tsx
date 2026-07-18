import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { BookingForm } from "@/components/forms/BookingForm";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Termin buchen",
  description:
    "Termin für die Hochglanzverdichtung deiner Felgen anfragen. Formular mit Bild-Upload und Wunschtermin – Chromwerk Köln meldet sich zeitnah.",
};

const perks = [
  {
    title: "Faire Preise",
    text: "Kompletter Satz (4 Felgen) inkl. Keramikversiegelung: ca. 500 €.",
  },
  { title: "Unverbindlich", text: "Deine Anfrage ist kostenlos und ohne Verpflichtung." },
  { title: "Persönliche Beratung", text: "Wir prüfen deine Bilder und beraten dich individuell." },
  { title: "Schnelle Rückmeldung", text: "Antwort in der Regel innerhalb von 24 Stunden." },
];

export default function TerminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terminanfrage"
        title="Termin buchen"
        description="Fülle das Formular aus und lade Bilder deiner Felgen hoch. Wir melden uns mit einem passenden Termin und einer Einschätzung zurück."
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            {/* Info-Spalte */}
            <div>
              <div className="space-y-6">
                {perks.map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-crimson/40 bg-crimson/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-crimson">
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-chrome-100">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-chrome-400">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-ink-800/40 p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-chrome-200">
                  Lieber direkt?
                </h3>
                <p className="mt-3 text-sm text-chrome-400">
                  Ruf uns an oder schreib uns – wir sind für dich da.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <a href={`tel:${site.phone.replace(/\s|\(|\)/g, "")}`} className="block text-chrome-200 transition hover:text-white">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="block text-chrome-200 transition hover:text-white">
                    {site.email}
                  </a>
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hallo Chromwerk! Ich interessiere mich für eine Hochglanzverdichtung meiner Felgen.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 px-4 py-2 font-medium text-[#4ce884] transition hover:bg-[#25D366]/25"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                    </svg>
                    WhatsApp schreiben
                  </a>
                </div>
              </div>
            </div>

            {/* Formular */}
            <BookingForm />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Gut zu wissen"
            title="Häufige Fragen"
            description="Die wichtigsten Antworten rund um Ablauf, Preis und Haltbarkeit."
            className="mb-10"
          />
          <Faq />
        </Container>
      </section>
    </>
  );
}
