import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Chromwerk, Köln – Angaben gemäß § 5 DDG.",
};

/**
 * Impressum – Rechtstext (vom Betreiber geliefert).
 * Inhaltliche Änderungen bitte nur nach rechtlicher Prüfung.
 */
export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="space-y-8 text-base leading-relaxed text-chrome-300">
            <div>
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                Angaben gemäß § 5 DDG
              </h2>
              <p className="mt-4">
                Chromwerk
                <br />
                betrieben von Abdulhamid Sucu
              </p>
              <p className="mt-4">
                Reutlinger Str. 37
                <br />
                50739 Köln
                <br />
                Deutschland
              </p>
              <p className="mt-4">
                Telefon: 01792693001
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:info@chromwerk.org"
                  className="text-chrome-100 underline underline-offset-4 transition hover:text-white"
                >
                  info@chromwerk.org
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="mt-4">
                Abdulhamid Sucu
                <br />
                Reutlinger Str. 37
                <br />
                50739 Köln
                <br />
                Deutschland
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
