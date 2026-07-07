import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { BookingForm } from "@/components/forms/BookingForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Termin buchen",
  description:
    "Termin für die Hochglanzverdichtung deiner Felgen anfragen. Formular mit Bild-Upload und Wunschtermin – Chromwerk Köln meldet sich zeitnah.",
};

const perks = [
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
                </div>
              </div>
            </div>

            {/* Formular */}
            <BookingForm />
          </div>
        </Container>
      </section>
    </>
  );
}
