/**
 * Express-Bearbeitung – Vorrang-Service gegen Aufpreis.
 * ------------------------------------------------------------------
 * Zentrale Stelle für Preis und Texte. Preis ändern? Nur `price` hier
 * anpassen – Formular, Terminseite, Leistungsseite und die E-Mail an
 * Chromwerk übernehmen den Wert automatisch.
 */
export const express = {
  /** Aufpreis in Euro */
  price: 100,
  title: "Express-Bearbeitung",
  /** Kurzform für Badges und Aufzählungen */
  short: "Deine Felgen kommen sofort in die Bearbeitung – ohne Wartezeit.",
  description:
    "Mit der Express-Bearbeitung rücken deine Felgen an die erste Stelle: Sie gehen direkt nach der Annahme in Produktion, statt in der regulären Reihenfolge zu warten. Ideal, wenn es schnell gehen muss – für Saisonwechsel, Verkauf oder das nächste Event.",
  benefits: [
    "Sofortiger Start – deine Felgen gehen vor",
    "Bevorzugte Terminvergabe bei der Annahme",
    "Gleiche Qualität, gleicher mehrstufiger Prozess",
  ],
  /** Ehrlicher Hinweis: der Aufpreis wird bei der Bestätigung berechnet */
  note: "Der Aufpreis gilt pro Auftrag und wird dir mit der Terminbestätigung verbindlich bestätigt.",
} as const;

/** Formatierter Aufpreis, z. B. "+100 €" */
export const expressPriceLabel = `+${express.price} €`;
