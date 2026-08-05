import { site } from "@/data/site";

/**
 * LocalBusinessSchema – strukturierte Daten (JSON-LD) für lokales SEO.
 * ------------------------------------------------------------------
 * Für Besucher unsichtbar. Sagt Google eindeutig, WER wir sind, WO wir
 * sitzen, WANN offen ist und WAS wir anbieten – die Basis dafür, bei
 * lokalen Suchen ("Felgen veredeln Köln") und in Google Maps zu erscheinen.
 *
 * Öffnungszeiten hier gespiegelt aus site.hours (aktuell Mo–So 10–22 Uhr).
 * Wenn sich die Zeiten in src/data/site.ts ändern, hier ebenfalls anpassen.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    image: `${site.url}/opengraph-image.jpg`,
    logo: `${site.url}/icon.png`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "DE",
    },
    areaServed: { "@type": "City", name: site.city },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    sameAs: site.socials.map((s) => s.href),
    knowsAbout: [
      "Hochglanzverdichtung",
      "Felgenaufbereitung",
      "Felgen veredeln",
      "Chromfelgen",
      "Keramikversiegelung",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hochglanzverdichtung von Felgen (Satz, inkl. Keramikversiegelung)",
        },
        priceCurrency: "EUR",
        price: "600",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Aufbereitung gebrauchter Felgen",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Ankauf gebrauchter Felgen" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Für Suchmaschinen; kein sichtbarer Inhalt für Nutzer.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
