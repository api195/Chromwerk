# Chromwerk Köln — Website

Premium-Website für **Chromwerk**, die Kölner Spezialisten für
**Hochglanzverdichtung von Felgen**. Portfolio (Lookbook), Felgen-Shop,
Pflegeprodukte-Shop und Online-Terminbuchung – als solide, ausbaubare Basis.

Dunkles Premium-Design mit Chrom-/Silber-Akzenten, 3D-Hero mit rotierender
Chromfelge, Köln-Skyline-Parallax und durchgängigen Scroll-Animationen.

---

## Tech-Stack

| Bereich      | Technologie                              |
| ------------ | ---------------------------------------- |
| Framework    | **Next.js 14** (App Router) + TypeScript |
| Styling      | **Tailwind CSS**                         |
| Animationen  | **Framer Motion** + **GSAP**             |
| 3D / Parallax| **Three.js** via **React Three Fiber** + drei |
| Smooth Scroll| **Lenis**                                |

---

## Schnellstart

```bash
npm install       # Abhängigkeiten installieren
npm run dev       # Entwicklungsserver: http://localhost:3000
npm run build     # Produktions-Build
npm run start     # Produktions-Server
npm run lint      # ESLint
npm run typecheck # TypeScript prüfen
```

---

## Projektstruktur

```
src/
├── app/                     # Seiten (App Router)
│   ├── page.tsx             # Startseite (3D-Hero, Prozess, Vorschauen)
│   ├── leistungen/          # Leistungen
│   ├── lookbook/            # Lookbook-Übersicht
│   │   └── [slug]/          # Lookbook-Detailseite (Vorher/Nachher)
│   ├── felgen/              # Felgen-Shop
│   ├── pflegeprodukte/      # Pflegeprodukte-Shop
│   ├── termin/              # Terminbuchung
│   ├── ueber/               # Über Chromwerk
│   ├── kontakt/             # Kontakt
│   ├── api/                 # Platzhalter-Endpoints (booking, contact)
│   ├── layout.tsx           # Root-Layout (Fonts, Navbar, Footer, Cart)
│   ├── sitemap.ts / robots.ts
│   └── globals.css
├── components/
│   ├── hero/                # 3D-Hero, ChromeWheel, HeroScene, KoelnSkyline
│   ├── layout/              # Navbar, Footer, SmoothScroll, PageHeader
│   ├── cards/               # ServiceCard, WheelCard, ProductCard, LookbookCard
│   ├── shop/                # WheelShop (Filter)
│   ├── lookbook/            # LookbookGallery (Filter), BeforeAfter-Slider
│   ├── forms/               # BookingForm, ContactForm, FormControls
│   ├── cart/                # CartProvider, CartDrawer (Warenkorb)
│   ├── sections/            # Stats (GSAP-Counter)
│   ├── ui/                  # Button, Container, SectionHeading, Reveal
│   └── logo/                # Logo (Wortmarke)
├── data/                    # Dummy-Daten (site, services, wheels, products, lookbook)
├── lib/                     # utils (cn, formatPrice)
└── types/                   # zentrale TypeScript-Typen
```

---

## Was wo anpassen? (Austausch-Guide)

Alle austauschbaren Stellen sind im Code mit Kommentaren markiert.

### 🔧 Firmen- & Kontaktdaten
`src/data/site.ts` — Name, Telefon, E-Mail, Adresse, Öffnungszeiten, Social-Links,
Navigation. **Alle `TODO` durch echte Werte ersetzen.**

### 🎨 Design / Farben / Fonts
- Farben & Schatten: `tailwind.config.ts`
- Schriftarten: `src/app/layout.tsx` (aktuell Oswald + Inter)
- Globale Styles: `src/app/globals.css`

### 🏷️ Logo
`src/components/logo/Logo.tsx` — Standard ist eine CSS-Wortmarke.
Anleitung im Datei-Kommentar zum Einbinden deiner echten Logo-Datei
(`/public/images/brand/...`).

### 🖼️ Bilder
Platzhalter liegen in `public/images/`:
- `wheels/` — Felgenfotos
- `products/` — Produktfotos
- `lookbook/` — Vorher-/Nachher-/Cover-Bilder

Einfach durch echte Dateien ersetzen und die Pfade in den `data/`-Dateien anpassen.

### 🛞 Cinematische 3D-Hero
Die Hero-Section liegt in `src/components/hero/`:

- `HeroCinematic.tsx` — Regie: schwarzes Intro → Reflexion → Enthüllung →
  Logo → Navigation/Text; Scroll-Kamerafahrt; Split-Layout (Text links,
  Felge rechts). Hier Überschrift, Buttons und Layout anpassen.
- `scene/ChromeRim.tsx` — prozedurale Chromfelge (PBR, roughness ~0.02).
  Eigenes GLB/GLTF-Modell (`/public/models/felge.glb`) per `useGLTF`
  einbinden – Kommentar zeigt wie; Neige-/Rotationslogik bleibt erhalten.
- `scene/StudioEnvironment.tsx` — kontraststarke Studio-Reflexionen inkl.
  Köln-Skyline. Für ECHTES HDRI: `<Environment files="/hdri/studio.hdr" />`.
- `scene/Effects.tsx` — Post-Processing (Bloom, AO, DoF, Vignette), adaptiv.
- `scene/HeroCanvas.tsx` / `CameraRig.tsx` — Bühne & Kameraführung.

**Performance:** Auf mobilen/schwächeren Geräten (`useDeviceTier`) wird
automatisch eine reduzierte Variante geladen (weniger Partikel, leichteres
Post-Processing). `prefers-reduced-motion` überspringt Intro & Animationen.
Debug-URL-Parameter: `?still=1` (Intro überspringen), `?nofx=1` (ohne Effekte).

Der Bild-Optimizer wird für SVG-Platzhalter automatisch umgangen
(`src/components/ui/SmartImage.tsx`); echte Fotos (JPG/PNG) werden wieder
optimiert.

### 📦 Produkte, Felgen, Projekte
- Felgen: `src/data/wheels.ts`
- Pflegeprodukte: `src/data/products.ts`
- Lookbook-Projekte: `src/data/lookbook.ts` (Filter aktualisieren sich automatisch)
- Leistungen: `src/data/services.ts`

Neues Objekt hinzufügen → erscheint automatisch inkl. Detailseite/Filter.

### ✉️ Formulare / Backend
`src/app/api/booking/route.ts` und `src/app/api/contact/route.ts` sind
Platzhalter. Hier später anbinden:
- **E-Mail:** Resend, Nodemailer, Postmark
- **Datenbank:** Supabase, Prisma
- **Kalender:** Google Calendar, Cal.com
- **Bild-Upload:** Supabase Storage, S3, UploadThing

### 🛒 Warenkorb / Shop
`src/components/cart/CartProvider.tsx` — clientseitiger Warenkorb mit
localStorage. Der „Zur Kasse"-Button ist ein Platzhalter; hier ein
Payment-Backend (z. B. Stripe Checkout) anbinden.

---

## Nächste Ausbaustufen (Empfehlung)

1. **Echtes CMS** für Lookbook/Produkte (z. B. Sanity, Supabase, Payload).
2. **Zahlungsabwicklung** (Stripe) für Felgen & Pflegeprodukte.
3. **E-Mail-Versand** für Termin- und Kontaktanfragen.
4. **Bild-Upload** bei der Terminbuchung an einen Storage anbinden.
5. **Rechtstexte** (Impressum, Datenschutz) ergänzen.

---

Hinweis: Reduzierte Bewegung (`prefers-reduced-motion`) wird respektiert –
Smooth-Scroll und aufwändige Animationen werden dann abgeschaltet.
