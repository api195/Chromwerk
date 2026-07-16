import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

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
    "Hochglanzverdichtung",
    "Felgen polieren",
    "Chromfelgen",
    "Felgenaufbereitung",
    "Köln",
    site.name,
  ],
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
    <html lang="de" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        {/* Frühzeitiger Preload des 3D-Felgenmodells (nur Desktop-Geräte,
            auf denen der 3D-Hintergrund tatsächlich rendert). Startet den
            Download bereits beim HTML-Parsen statt erst nach der Hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(matchMedia('(min-width:1024px) and (pointer:fine)').matches&&(navigator.hardwareConcurrency||8)>4){var l=document.createElement('link');l.rel='preload';l.as='fetch';l.href='/chrom_felge.glb';l.crossOrigin='anonymous';document.head.appendChild(l);}}catch(e){}`,
          }}
        />
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScroll>
          {/* CartDrawer ausgeblendet, bis der Shop startet (Coming Soon) */}
        </CartProvider>
      </body>
    </html>
  );
}
