import type { Service } from "@/types";

/**
 * Leistungen von Chromwerk.
 * Neue Leistung? Einfach ein weiteres Objekt hinzufügen.
 * `icon` bestimmt das Inline-SVG in der ServiceCard.
 */
export const services: Service[] = [
  {
    slug: "hochglanzverdichtung",
    title: "Hochglanzverdichtung von Kundenfelgen",
    short: "Spiegelglatte Chrom-Optik durch mechanische Verdichtung.",
    description:
      "Wir verdichten die Oberfläche deiner Felgen in mehreren Stufen bis zur spiegelnden Hochglanz-Optik. Das Ergebnis ist eine tiefe, chromähnliche Reflexion mit maximaler Widerstandsfähigkeit.",
    icon: "gloss",
    highlights: [
      "Mehrstufiger Verdichtungsprozess",
      "Spiegelnde Chrom-Optik",
      "Für Alu- und Schmiedefelgen",
    ],
  },
  {
    slug: "aufbereitung",
    title: "Aufbereitung gebrauchter Felgen",
    short: "Kratzer, Bordsteinschäden und Korrosion fachgerecht entfernt.",
    description:
      "Bordsteinschäden, Kratzer und Korrosion werden professionell entfernt. Deine Felgen erhalten ihren Neuzustand zurück – Basis für jede Veredelung.",
    icon: "refresh",
    highlights: [
      "Bordsteinschaden-Reparatur",
      "Korrosionsentfernung",
      "Grundlage für Hochglanz",
    ],
  },
  {
    slug: "ankauf",
    title: "Ankauf gebrauchter Felgen",
    short: "Faire Bewertung und Sofort-Ankauf deiner Felgensätze.",
    description:
      "Du möchtest deine gebrauchten Felgen verkaufen? Wir bewerten Zustand, Marke und Modell und machen dir ein faires Angebot – unkompliziert und schnell.",
    icon: "buy",
    highlights: ["Faire Bewertung", "Sofort-Angebot", "Alle Marken"],
  },
  {
    slug: "verkauf",
    title: "Verkauf hochglanzverdichteter Felgen",
    short: "Sofort verfügbare, veredelte Felgensätze im Chromwerk-Shop.",
    description:
      "In unserem Shop findest du bereits hochglanzverdichtete Felgensätze in Premium-Qualität – geprüft, veredelt und bereit für die Montage.",
    icon: "sell",
    highlights: ["Sofort verfügbar", "Geprüfte Qualität", "Premium-Finish"],
  },
  {
    slug: "pflegeberatung",
    title: "Pflegeberatung für Chromfelgen",
    short: "Individuelle Beratung für langanhaltenden Glanz.",
    description:
      "Damit deine hochglanzverdichteten und verchromten Felgen dauerhaft strahlen, beraten wir dich individuell zur richtigen Pflege und den passenden Produkten.",
    icon: "care",
    highlights: ["Individuelle Beratung", "Langzeit-Schutz", "Passende Produkte"],
  },
  {
    slug: "pflegeprodukte",
    title: "Eigene Chromwerk-Reinigungsprodukte",
    short: "Private-Label-Pflege, abgestimmt auf veredelte Oberflächen.",
    description:
      "Unsere eigenen Chromwerk-Pflegeprodukte sind exakt auf Chrom- und hochglanzverdichtete Oberflächen abgestimmt – schonend, effektiv und mit Langzeitschutz.",
    icon: "bottle",
    highlights: ["Private Label", "Für Chromoptik entwickelt", "Langzeitschutz"],
  },
];
