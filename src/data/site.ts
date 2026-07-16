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
  // TODO: Echte Kontaktdaten eintragen
  phone: "+49 (0) 221 000 000",
  email: "kontakt@chromwerk.de",
  address: {
    street: "Musterstraße 1",
    zip: "50667",
    city: "Köln",
    country: "Deutschland",
  },
  hours: [
    { day: "Mo – Fr", time: "09:00 – 18:00" },
    { day: "Samstag", time: "10:00 – 15:00" },
    { day: "Sonntag", time: "Geschlossen" },
  ],
  // TODO: Echte Social-Media-URLs eintragen
  socials: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "TikTok", href: "https://tiktok.com/", icon: "tiktok" },
    { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  ] as const,
  // Für SEO / Metadaten – später auf echte Domain setzen
  url: "https://chromwerk.de",

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
