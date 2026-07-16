# Briefing für Rechtsanwalt/Rechtsanwältin

**Auftrag:** Erstellung von **Impressum** und **Datenschutzerklärung** für die
Website der Firma Chromwerk (Felgenveredelung / Hochglanzverdichtung, Köln).

**Website:** https://chromwerk.store (aktuell Vorabversion unter
https://chromwerk.vercel.app)

Dieses Dokument beschreibt (A) die Angaben zum Unternehmen, (B) die
technische Funktionsweise der Website und die dabei anfallenden Daten sowie
(C) geplante Erweiterungen. Es wurde vom Website-Entwickler erstellt und
gibt den tatsächlichen technischen Stand wieder.

---

## A) Angaben zum Unternehmen (vom Betreiber auszufüllen)

Für das Impressum benötigte Angaben – bitte vom Mandanten ergänzen lassen:

| Angabe | Wert |
| --- | --- |
| Firmierung / Name | Chromwerk ____________ (Rechtsform?) |
| Inhaber / vertretungsberechtigte Person(en) | ____________ |
| Ladungsfähige Anschrift | ____________, ____ Köln |
| Telefon | ____________ |
| E-Mail | ____________ |
| Rechtsform (Einzelunternehmen / GbR / GmbH …) | ____________ |
| Handelsregister + Registergericht (falls eingetragen) | ____________ |
| Umsatzsteuer-ID nach § 27a UStG (falls vorhanden) | ____________ |
| Wirtschafts-ID / Steuernummer (falls relevant) | ____________ |
| Berufshaftpflicht (falls relevant) | ____________ |
| Inhaltlich Verantwortlicher (§ 18 Abs. 2 MStV) | ____________ |

Zusätzlich zu prüfen/aufzunehmen (Einschätzung bitte durch Sie als
Rechtsanwalt/Rechtsanwältin):

- Hinweis zur Verbraucherstreitbeilegung (§§ 36, 37 VSBG) –
  Teilnahmebereitschaft klären.
- Da ein Handwerks-/Kfz-nahes Gewerbe vorliegt: ggf. zuständige
  Handwerkskammer / Aufsichtsbehörde und gesetzliche Berufsbezeichnung.
- Die Website richtet sich an Verbraucher (B2C) in Deutschland, Sprache
  ausschließlich Deutsch.

---

## B) Technischer Ist-Zustand der Website (Stand: Juli 2026)

### 1. Hosting / Infrastruktur

- Die Website ist eine statisch generierte Next.js-Anwendung, gehostet bei
  **Vercel Inc.** (340 S Lemon Ave #4133, Walnut, CA 91789, USA).
- Beim Aufruf verarbeitet Vercel technisch bedingt **IP-Adressen und
  Server-Logdaten** (Zeitpunkt, aufgerufene URL, User-Agent, Referrer).
- Mit Vercel sollte ein **Auftragsverarbeitungsvertrag (DPA)** geschlossen
  werden (Vercel stellt diesen standardmäßig online bereit);
  **Drittlandübermittlung USA** bitte in der Datenschutzerklärung abdecken
  (Vercel ist nach unserem Kenntnisstand unter dem EU-U.S. Data Privacy
  Framework zertifiziert – bitte prüfen).
- Es besteht die Option, die Serverless-Funktionen auf eine EU-Region
  (Frankfurt) zu legen – falls rechtlich gewünscht, bitte mitteilen, das
  setzt der Entwickler um.

### 2. Cookies, Tracking, Einwilligung

- Die Website setzt **keine Cookies** ein.
- Es gibt **kein Tracking, keine Analytics, keine Werbe- oder
  Social-Media-Pixel**, keine eingebetteten Drittinhalte (keine iFrames,
  keine externen Videos, keine Karten).
- **Schriftarten sind lokal gehostet** (next/font, Self-Hosting). Es
  erfolgt **kein Abruf von Google-Fonts-Servern** oder anderen externen
  CDNs zur Laufzeit.
- Ein Cookie-/Consent-Banner ist nach unserem Verständnis derzeit nicht
  erforderlich – bitte bestätigen.
- Technischer Hinweis: Der Browser-Speicher (localStorage) wird im
  aktuellen Live-Umfang **nicht** genutzt. (Im Code existiert eine derzeit
  deaktivierte Warenkorb-Funktion, die localStorage nutzen würde – relevant
  erst mit Shop-Start, siehe Abschnitt C.)

### 3. Formulare (personenbezogene Daten)

Es gibt zwei Formulare. Zweck: Bearbeitung von Kundenanfragen
(vorvertragliche Maßnahmen, Art. 6 Abs. 1 lit. b DSGVO – bitte prüfen).

**a) Terminanfrage** (/termin) – Felder:
Name*, E-Mail*, Telefonnummer, Fahrzeugmodell, Felgengröße, Anzahl der
Felgen, Zustand der Felgen, gewünschte Leistung, Wunschtermin, Nachricht.
Zusätzlich ist ein **Bild-Upload** (Fotos der Felgen) vorgesehen; dieser
ist aktuell noch nicht aktiv (Bilder werden derzeit nicht übertragen).

**b) Kontaktformular** (/kontakt) – Felder:
Name*, E-Mail*, Betreff, Nachricht.

Verarbeitung: Die Formulardaten werden an den Server übermittelt und
sollen zum Launch per E-Mail an den Betreiber zugestellt werden.
Vorgesehen ist der Versanddienst **Resend** (Resend, Inc., USA) als
Auftragsverarbeiter – bitte in der Datenschutzerklärung berücksichtigen
(alternativ nennt der Betreiber einen anderen Dienst, falls Sie einen
EU-Anbieter empfehlen). Eine Speicherung in einer Datenbank erfolgt
derzeit **nicht**; Aufbewahrung erfolgt im E-Mail-Postfach des Betreibers.

Bitte außerdem beraten zu: Speicher-/Löschfristen für Anfragen und
hochgeladene Fotos, Pflichtfeld-Kennzeichnung, ggf. Ergänzung eines
Datenschutzhinweises direkt am Formular.

### 4. Ausgehende Links

- Footer/Kontaktseite verlinken auf **Instagram, TikTok, YouTube**
  (reine Verlinkung, **keine** eingebetteten Plugins oder Feeds).

### 5. Server-seitige Verarbeitung

- Außer den beiden Formular-Endpunkten gibt es keine serverseitige
  Datenverarbeitung; alle Bilder/3D-Modelle werden von der eigenen Domain
  ausgeliefert.

---

## C) Geplante Erweiterungen (zur Vorbereitung, noch nicht aktiv)

1. **Onlineshop** für veredelte Felgen und eigene Pflegeprodukte
   (Chromwerk Private Label). Aktuell zeigen die Kategorien nur
   „Coming Soon". Mit Shop-Start werden zusätzlich relevant:
   - AGB, Widerrufsbelehrung, Zahlungs-/Versandbedingungen,
     Preisangaben (PAngV), Batteriegesetz/Verpackungsgesetz je nach
     Produkten (Pflegechemie: CLP-Kennzeichnung?),
   - Zahlungsdienstleister (voraussichtlich **Stripe**) und Warenkorb
     (localStorage) in der Datenschutzerklärung,
   - ggf. Cookie-/Consent-Management.
   → Wunsch des Betreibers: Impressum/Datenschutz jetzt so erstellen, dass
   der Shop später ergänzt werden kann (gern als vorbereiteter Baustein).
2. **Bild-Upload** im Terminformular (Kundenfotos der Felgen) mit
   Speicherung bei einem Cloud-Storage-Anbieter – Anbieter steht noch
   nicht fest; wird nachgereicht.
3. Ggf. später **Google Maps**-Einbindung auf der Kontaktseite (derzeit
   nur statischer Platzhalter ohne Drittanbieter-Verbindung).
4. Ggf. später **Web-Analytics** (falls ja: bevorzugt cookielos, z. B.
   Vercel Analytics/Plausible – würde vorab mit Ihnen abgestimmt).

---

## D) Umsetzung durch den Entwickler

- Die fertigen Texte werden als eigene Seiten **/impressum** und
  **/datenschutz** eingebunden und im Footer verlinkt (technisch
  vorbereitet).
- Änderungen an der Website, die datenschutzrechtlich relevant sind,
  werden vor Aktivierung mitgeteilt (siehe Abschnitt C).

*Hinweis: Dieses Briefing beschreibt den technischen Sachstand und ersetzt
keine Rechtsberatung; die rechtliche Bewertung obliegt der beauftragten
Kanzlei.*
