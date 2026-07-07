/**
 * Zentrale Typdefinitionen für Chromwerk.
 * Diese Typen beschreiben die Datenstruktur von Leistungen, Felgen,
 * Pflegeprodukten und Lookbook-Projekten. Wenn du später eine echte
 * Datenbank oder ein CMS anbindest, bleibt die UI kompatibel, solange
 * die Daten diesen Typen entsprechen.
 */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  /** Lucide-ähnlicher Icon-Key – gerendert als Inline-SVG in ServiceCard */
  icon:
    | "gloss"
    | "refresh"
    | "buy"
    | "sell"
    | "care"
    | "bottle";
  highlights: string[];
};

export type WheelCondition = "Neu" | "Wie neu" | "Aufbereitet" | "Gebraucht";
export type Availability = "Verfügbar" | "Reserviert" | "Auf Anfrage";

export type Wheel = {
  id: string;
  brand: string;
  model: string;
  /** Zollgröße, z. B. 19 */
  size: number;
  /** Lochkreis, z. B. "5x112" */
  boltPattern: string;
  finish: string;
  condition: WheelCondition;
  price: number;
  /** Preis pro Satz (4 Stück) oder Einzelfelge */
  unit: "Satz (4 Stk.)" | "Einzelfelge";
  availability: Availability;
  /** Platzhalter-Bildpfad – hier später echte Produktfotos eintragen */
  image: string;
  tags: string[];
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  usage: string;
  price: number;
  /** z. B. "500 ml" */
  size: string;
  image: string;
  badge?: string;
};

export type LookbookProject = {
  slug: string;
  title: string;
  brand: string;
  model: string;
  /** Zollgröße */
  size: number;
  /** Felgentyp, z. B. "Mehrspeichen", "Y-Speiche" */
  wheelType: string;
  vehicle: string;
  condition: WheelCondition;
  finish: string;
  summary: string;
  description: string;
  /** Platzhalter-Bilder */
  beforeImages: string[];
  afterImages: string[];
  coverImage: string;
  /** Bearbeitungsschritte */
  steps: { title: string; text: string }[];
  wheelData: { label: string; value: string }[];
  clientNote?: string;
  durationDays: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  meta: string;
  type: "wheel" | "product";
  quantity: number;
};
