/**
 * Zentrale Seitenkonfiguration.
 * ------------------------------------------------------------------
 * Hier änderst du Firmenname, Kontaktdaten, Social-Links und die
 * Navigation an EINER Stelle. Alle Platzhalter (TODO) durch echte
 * Daten ersetzen.
 */

export const site = {
  name: "Chromwerk",
  city: "Köln",
  tagline: "Hochglanzverdichtung von Felgen",
  claim: "Präzisions-Felgenveredelung aus Köln",
  description:
    "Chromwerk aus Köln ist spezialisiert auf Hochglanzverdichtung, Aufbereitung und Veredelung von Felgen. Premium-Portfolio, Felgen-Shop, eigene Pflegeprodukte und Online-Terminbuchung.",
  phone: "0179 2693001",
  email: "info@chromwerk.org",
  address: {
    street: "Reutlinger Str. 37",
    zip: "50739",
    city: "Köln",
    country: "Deutschland",
  },
  hours: [
    { day: "Mo – Fr", time: "10:00 – 22:00" },
    { day: "Samstag", time: "10:00 – 22:00" },
    { day: "Sonntag", time: "10:00 – 22:00" },
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/chromwerk.koeln",
      icon: "instagram",
    },
    { label: "TikTok", href: "https://www.tiktok.com/@chromwerk", icon: "tiktok" },
  ] as const,
  // Für SEO / Metadaten – später auf echte Domain setzen
  url: "https://chromwerk.store",

  /**
   * Hero-Felge (Startseite, Foto-Hero) – echtes Chromwerk-Felgenfoto.
   * Austauschen: neue Datei unter public/images/wheels/ ablegen und den
   * Pfad hier anpassen.
   */
  heroImage: "/images/wheels/chromwerk-hero.png",
};

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Pflegeprodukte", href: "/pflegeprodukte" },
  { label: "Termin buchen", href: "/termin" },
  { label: "Über uns", href: "/ueber" },
  { label: "Kontakt", href: "/kontakt" },
];
