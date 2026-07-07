import type { Product } from "@/types";

/**
 * Chromwerk Pflegeprodukte – Private-Label Dummy-Daten.
 * ------------------------------------------------------------------
 * Ersetze `image` durch echte Produktfotos in /public/images/products/.
 */
export const products: Product[] = [
  {
    id: "p-001",
    name: "Chromwerk Felgenreiniger",
    tagline: "Säurefreie Tiefenreinigung",
    description:
      "pH-neutraler Hochleistungsreiniger, der Bremsstaub und Straßenschmutz löst, ohne veredelte Oberflächen anzugreifen. Der Farbindikator zeigt die Wirkung.",
    usage:
      "Auf die kalte, trockene Felge sprühen, kurz einwirken lassen, mit weichem Schwamm reinigen und gründlich abspülen.",
    price: 16.9,
    size: "500 ml",
    image: "/images/products/product-placeholder.svg",
    badge: "Bestseller",
  },
  {
    id: "p-002",
    name: "Chromwerk Glanzversiegelung",
    tagline: "Langzeit-Schutz mit Spiegeleffekt",
    description:
      "Keramikbasierte Versiegelung, die einen tiefen Glanz erzeugt und die Oberfläche bis zu 12 Monate vor Bremsstaub und Wasserflecken schützt.",
    usage:
      "Auf die saubere, trockene Felge dünn auftragen, 5 Minuten ablüften lassen und mit Mikrofasertuch auspolieren.",
    price: 29.9,
    size: "250 ml",
    image: "/images/products/product-placeholder.svg",
    badge: "Premium",
  },
  {
    id: "p-003",
    name: "Chromwerk Mikrofasertuch",
    tagline: "Kratzfrei & fusselarm",
    description:
      "Extra weiches Premium-Mikrofasertuch mit 400 g/m² für streifenfreies Auspolieren von Chrom- und Hochglanzflächen.",
    usage:
      "Für Versiegelung, Politur und Trocknung. Bei 40 °C ohne Weichspüler waschen.",
    price: 9.9,
    size: "40 × 40 cm",
    image: "/images/products/product-placeholder.svg",
  },
  {
    id: "p-004",
    name: "Chromwerk Pflege-Set",
    tagline: "Komplettpflege im Set",
    description:
      "Das Rundum-Set: Felgenreiniger, Glanzversiegelung und zwei Mikrofasertücher – perfekt aufeinander abgestimmt für dauerhaften Chromglanz.",
    usage:
      "Reinigen, versiegeln, polieren – die komplette Chromwerk-Pflegeroutine in einer Box.",
    price: 49.9,
    size: "Set",
    image: "/images/products/product-placeholder.svg",
    badge: "Spar-Set",
  },
];
