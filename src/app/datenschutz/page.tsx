import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Chromwerk, Köln – Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.",
};

/**
 * Datenschutzerklärung – Rechtstext (vom Betreiber geliefert).
 * Inhaltliche Änderungen bitte nur nach rechtlicher Prüfung.
 */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="space-y-10 text-base leading-relaxed text-chrome-300">
            <Section title="1. Verantwortlicher">
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <p>
                Chromwerk
                <br />
                betrieben von Abdulhamid Sucu
              </p>
              <p>
                Reutlinger Str. 37
                <br />
                50739 Köln
                <br />
                Deutschland
              </p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:info@chromwerk.org"
                  className="text-chrome-100 underline underline-offset-4 transition hover:text-white"
                >
                  info@chromwerk.org
                </a>
              </p>
            </Section>

            <Section title="2. Allgemeine Hinweise zur Datenverarbeitung">
              <p>
                Der Schutz Ihrer personenbezogenen Daten ist mir wichtig.
                Personenbezogene Daten werden auf dieser Website nur
                verarbeitet, soweit dies zur Bereitstellung der Website sowie
                zur Bearbeitung von Kontakt- und Terminanfragen erforderlich
                ist.
              </p>
            </Section>

            <Section title="3. Hosting">
              <p>
                Diese Website wird bei Vercel gehostet. Beim Aufruf der Website
                werden technisch erforderliche Server-Logdaten verarbeitet,
                insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
                aufgerufene Seite, Browserinformationen und Referrer.
              </p>
              <p>
                Die Verarbeitung erfolgt zum Zweck der sicheren und stabilen
                Bereitstellung der Website.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das
                berechtigte Interesse liegt in der technisch fehlerfreien und
                sicheren Bereitstellung der Website.
              </p>
            </Section>

            <Section title="4. Keine Cookies und kein Tracking">
              <p>
                Auf dieser Website werden derzeit keine Cookies zu Analyse-,
                Marketing- oder Trackingzwecken eingesetzt.
              </p>
              <p>
                Es findet derzeit insbesondere keine Nutzung von
                Web-Analytics, Werbe- oder Retargeting-Pixeln,
                Social-Media-Plugins, extern eingebetteten Karten oder extern
                eingebetteten Videos statt.
              </p>
              <p>
                Die verwendeten Schriftarten werden lokal gehostet. Ein Abruf
                externer Schriftarten-Server findet nicht statt.
              </p>
            </Section>

            <Section title="5. Kontaktformular">
              <p>
                Wenn Sie mich über das Kontaktformular kontaktieren, werden
                die von Ihnen eingegebenen Daten zur Bearbeitung Ihrer Anfrage
                verarbeitet.
              </p>
              <p>Verarbeitet werden dabei:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Betreff</li>
                <li>Nachricht</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur
                Kommunikation mit Ihnen.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre
                Anfrage auf vorvertragliche Maßnahmen gerichtet ist, im
                Übrigen Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </Section>

            <Section title="6. Terminanfrage">
              <p>
                Wenn Sie das Formular zur Terminanfrage nutzen, werden die von
                Ihnen eingegebenen Daten zur Bearbeitung Ihrer Anfrage und zur
                Terminabstimmung verarbeitet.
              </p>
              <p>Verarbeitet werden dabei:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Fahrzeugmodell</li>
                <li>Felgengröße</li>
                <li>Anzahl der Felgen</li>
                <li>Zustand der Felgen</li>
                <li>gewünschte Leistung</li>
                <li>Wunschtermin</li>
                <li>Nachricht</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur
                Vorbereitung eines möglichen Termins.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre
                Anfrage auf vorvertragliche Maßnahmen gerichtet ist, im
                Übrigen Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </Section>

            <Section title="7. Versand von Formularanfragen">
              <p>
                Die über die Formulare eingegebenen Daten werden serverseitig
                verarbeitet und per E-Mail an mich weitergeleitet.
              </p>
              <p>
                Für den technischen Versand der Formularanfragen wird der
                Dienst Resend genutzt. Anbieter ist Plus Five Five, Inc.,
                2261 Market Street #5039, San Francisco, CA 94114, USA.
              </p>
              <p>
                Dabei können die im jeweiligen Formular eingegebenen
                personenbezogenen Daten über die Systeme von Resend
                verarbeitet werden, soweit dies für die Zustellung der
                Nachricht erforderlich ist.
              </p>
              <p>
                Die Verarbeitung erfolgt zum Zweck der technischen
                Übermittlung und Zustellung der Formularanfragen.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die
                Anfrage auf vorvertragliche Maßnahmen gerichtet ist, im
                Übrigen Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p>
                Soweit Resend als Auftragsverarbeiter eingesetzt wird, erfolgt
                die Verarbeitung auf Grundlage eines Vertrags zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>
              <p>
                Da eine Verarbeitung in den USA nicht ausgeschlossen werden
                kann, kann es zu einer Übermittlung personenbezogener Daten in
                ein Drittland kommen. Eine solche Übermittlung erfolgt nur
                unter Beachtung der gesetzlichen Voraussetzungen der
                Art. 44 ff. DSGVO.
              </p>
            </Section>

            <Section title="8. Speicherdauer">
              <p>
                Personenbezogene Daten aus Kontakt- und Terminanfragen werden
                grundsätzlich nur so lange gespeichert, wie dies zur
                Bearbeitung der Anfrage erforderlich ist.
              </p>
              <p>
                Soweit keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen, werden Anfragen in der Regel nach spätestens
                6 Monaten gelöscht.
              </p>
            </Section>

            <Section title="9. Externe Links">
              <p>
                Auf dieser Website können sich Links zu externen Websites oder
                Social-Media-Profilen befinden. Beim bloßen Besuch dieser
                Website werden keine Daten automatisch an diese Anbieter
                übertragen. Erst durch Anklicken eines Links verlassen Sie
                diese Website.
              </p>
            </Section>

            <Section title="10. Ihre Rechte">
              <p>Sie haben nach Maßgabe der gesetzlichen Vorschriften das Recht:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>auf Auskunft über die verarbeiteten personenbezogenen Daten,</li>
                <li>auf Berichtigung unrichtiger Daten,</li>
                <li>auf Löschung Ihrer Daten,</li>
                <li>auf Einschränkung der Verarbeitung,</li>
                <li>auf Datenübertragbarkeit,</li>
                <li>auf Widerspruch gegen die Verarbeitung,</li>
                <li>
                  auf Beschwerde bei einer zuständigen
                  Datenschutzaufsichtsbehörde.
                </li>
              </ul>
            </Section>

            <Section title="11. Widerspruchsrecht">
              <p>
                Soweit die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht,
                haben Sie das Recht, aus Gründen, die sich aus Ihrer
                besonderen Situation ergeben, Widerspruch gegen die
                Verarbeitung einzulegen.
              </p>
            </Section>

            <Section title="12. Aktualität dieser Datenschutzerklärung">
              <p>
                Diese Datenschutzerklärung hat den aktuellen Stand der Website
                zum Zeitpunkt der Veröffentlichung. Sie wird angepasst, wenn
                sich die Website oder die Datenverarbeitung wesentlich ändert.
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </>
  );
}
