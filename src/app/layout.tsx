import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { Analytics } from "@vercel/analytics/next";
import { revealScript } from "@/lib/revealScript";

/**
 * Schriften (self-hosted via next/font, kein externer Runtime-Request).
 * Display: Oswald (technisch, automotive). Fließtext: Inter.
 * Andere Schrift gewünscht? Hier importieren und Variablen tauschen.
 */
const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// SEO-Grundlagen (Titel-Template, OpenGraph, Twitter)
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.city} – ${site.tagline}`,
    template: `%s · ${site.name} ${site.city}`,
  },
  description: site.description,
  keywords: [
    "Hochglanzverdichtung Köln",
    "Felgen veredeln Köln",
    "Felgenaufbereitung Köln",
    "Felgen polieren Köln",
    "Chromfelgen Köln",
    "Felgen verchromen",
    "Felgenveredelung",
    "Keramikversiegelung Felgen",
    "Felgen Ankauf Köln",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} ${site.city} – ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} ${site.city}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  // Geo-Angaben für lokale Suche (Region Nordrhein-Westfalen / Köln)
  other: {
    "geo.region": "DE-NW",
    "geo.placename": "Köln",
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: Das Reveal-Skript unten setzt `data-js` auf
    // <html>, bevor React startet (gleiches Muster wie bei Theme-Skripten).
    <html
      lang="de"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        {/* Scroll-Reveals ohne Warten auf React (siehe lib/revealScript.ts).
            Muss vor dem Inhalt stehen, damit versteckte Startzustände schon
            beim ersten Zeichnen gelten. */}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        {/* Strukturierte Daten für lokales SEO (Google) */}
        <LocalBusinessSchema />
        {/* Das 3D-Felgenmodell wird nicht mehr pauschal vorgeladen: Ob es
            gebraucht wird, hängt von der Grafikkarte ab. WheelBackground
            startet den Download, sobald das feststeht. */}
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScroll>
          <WhatsAppButton />
          {/* CartDrawer ausgeblendet, bis der Shop startet (Coming Soon) */}
        </CartProvider>
        {/* Vercel Web Analytics – cookielose Besucherstatistik.
            Aktivierung im Vercel-Dashboard unter „Analytics". */}
        <Analytics />
      </body>
    </html>
  );
}
