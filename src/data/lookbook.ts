import type { LookbookProject } from "@/types";

/**
 * Lookbook / Ergebnisse – Vorher-/Nachher-Projekte.
 * ------------------------------------------------------------------
 * Neues Projekt einpflegen: Objekt kopieren, `slug` eindeutig vergeben
 * und Bilder in /public/images/lookbook/ ablegen.
 * Die Detailseite /lookbook/[slug] wird automatisch generiert.
 */
export const lookbookProjects: LookbookProject[] = [
  {
    slug: "bbs-chr-audi-rs6",
    title: "BBS CH-R – Audi RS6",
    brand: "BBS",
    model: "CH-R",
    size: 21,
    wheelType: "Y-Speiche",
    vehicle: "Audi",
    condition: "Gebraucht",
    finish: "Hochglanzverdichtet Silber",
    summary:
      "Stark beanspruchter Satz mit Bordsteinschäden – zurück in spiegelnden Hochglanz verwandelt.",
    description:
      "Dieser BBS CH-R Satz eines Audi RS6 kam mit mehreren Bordsteinschäden und stumpfer Oberfläche zu uns. Nach vollständiger Aufbereitung und mehrstufiger Hochglanzverdichtung strahlen die Felgen in tiefem Chromglanz.",
    beforeImages: [
      "/images/lookbook/before-placeholder.svg",
      "/images/lookbook/before-placeholder.svg",
    ],
    afterImages: [
      "/images/lookbook/after-placeholder.svg",
      "/images/lookbook/after-placeholder.svg",
    ],
    coverImage: "/images/lookbook/cover-placeholder.svg",
    steps: [
      { title: "Zustandsanalyse", text: "Vermessung, Rissprüfung und Dokumentation aller Schäden." },
      { title: "Reparatur", text: "Bordsteinschäden aufgefüllt und plan geschliffen." },
      { title: "Verdichtung", text: "Mehrstufige mechanische Hochglanzverdichtung." },
      { title: "Versiegelung", text: "Keramische Schutzschicht für Langzeitglanz." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "21 Zoll" },
      { label: "Lochkreis", value: "5x112" },
      { label: "Finish", value: "Hochglanzverdichtet Silber" },
      { label: "Fahrzeug", value: "Audi RS6" },
    ],
    clientNote:
      "Kunde wünschte maximale Spiegelwirkung bei erhaltener Originaloptik.",
    durationDays: 5,
  },
  {
    slug: "oz-superturismo-bmw-m3",
    title: "OZ Superturismo – BMW M3",
    brand: "OZ Racing",
    model: "Superturismo",
    size: 19,
    wheelType: "Mehrspeiche",
    vehicle: "BMW",
    condition: "Aufbereitet",
    finish: "Chrom-Hochglanz",
    summary:
      "Klassischer Motorsport-Look, veredelt zu voller Chromtiefe.",
    description:
      "Der OZ Superturismo eines BMW M3 wurde behutsam aufbereitet und anschließend hochglanzverdichtet. Die feinen Speichen erhielten dabei besondere Aufmerksamkeit für ein makelloses Spiegelbild.",
    beforeImages: ["/images/lookbook/before-placeholder.svg"],
    afterImages: [
      "/images/lookbook/after-placeholder.svg",
      "/images/lookbook/after-placeholder.svg",
    ],
    coverImage: "/images/lookbook/cover-placeholder.svg",
    steps: [
      { title: "Demontage", text: "Reifen ab, Felgen einzeln vorbereitet." },
      { title: "Feinschliff", text: "Speichen und Stern in Handarbeit bearbeitet." },
      { title: "Verdichtung", text: "Hochglanzverdichtung bis zur Chromtiefe." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "19 Zoll" },
      { label: "Lochkreis", value: "5x120" },
      { label: "Finish", value: "Chrom-Hochglanz" },
      { label: "Fahrzeug", value: "BMW M3" },
    ],
    clientNote: "Originalfarbe erhalten, maximaler Glanz gewünscht.",
    durationDays: 4,
  },
  {
    slug: "vossen-hf5-porsche",
    title: "Vossen HF-5 – Porsche 911",
    brand: "Vossen",
    model: "HF-5",
    size: 21,
    wheelType: "Concave",
    vehicle: "Porsche",
    condition: "Wie neu",
    finish: "Poliert Chrom",
    summary: "Concave-Design mit maximaler Reflexionstiefe veredelt.",
    description:
      "Für diesen Porsche 911 verdichteten wir einen Satz Vossen HF-5. Das concave Design wurde so bearbeitet, dass Licht und Umgebung tief in der Oberfläche gespiegelt werden.",
    beforeImages: ["/images/lookbook/before-placeholder.svg"],
    afterImages: ["/images/lookbook/after-placeholder.svg"],
    coverImage: "/images/lookbook/cover-placeholder.svg",
    steps: [
      { title: "Analyse", text: "Oberflächenprüfung und Glanzgradmessung." },
      { title: "Politur", text: "Stufenweise Politur der Concave-Flächen." },
      { title: "Hochglanz", text: "Finale Verdichtung für Spiegeleffekt." },
      { title: "Schutz", text: "Versiegelung gegen Bremsstaub." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "21 Zoll" },
      { label: "Lochkreis", value: "5x130" },
      { label: "Finish", value: "Poliert Chrom" },
      { label: "Fahrzeug", value: "Porsche 911" },
    ],
    durationDays: 6,
  },
  {
    slug: "bbs-lm-e30",
    title: "BBS LM – BMW E30",
    brand: "BBS",
    model: "LM",
    size: 17,
    wheelType: "Mesh",
    vehicle: "BMW",
    condition: "Gebraucht",
    finish: "Chrom-Hochglanz",
    summary: "Youngtimer-Klassiker mit frischer Chromtiefe.",
    description:
      "Ein Satz BBS LM für einen BMW E30 – der Mesh-Klassiker schlechthin. Nach vollständiger Aufbereitung erhielten Stern und Bett eine tiefe Hochglanzverdichtung.",
    beforeImages: ["/images/lookbook/before-placeholder.svg"],
    afterImages: ["/images/lookbook/after-placeholder.svg"],
    coverImage: "/images/lookbook/cover-placeholder.svg",
    steps: [
      { title: "Zerlegung", text: "Mehrteilige Felge komplett zerlegt." },
      { title: "Bett-Politur", text: "Aluminiumbett hochglanzverdichtet." },
      { title: "Montage", text: "Neu verschraubt und abgedichtet." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "17 Zoll" },
      { label: "Lochkreis", value: "4x100" },
      { label: "Finish", value: "Chrom-Hochglanz" },
      { label: "Fahrzeug", value: "BMW E30" },
    ],
    clientNote: "Mehrteilige Felge, Bett in Hochglanz, Stern in Wagenfarbe.",
    durationDays: 7,
  },
];

export const lookbookVehicles = Array.from(
  new Set(lookbookProjects.map((p) => p.vehicle))
).sort();
export const lookbookWheelTypes = Array.from(
  new Set(lookbookProjects.map((p) => p.wheelType))
).sort();
export const lookbookSizes = Array.from(
  new Set(lookbookProjects.map((p) => p.size))
).sort((a, b) => a - b);
export const lookbookConditions = Array.from(
  new Set(lookbookProjects.map((p) => p.condition))
);
export const lookbookFinishes = Array.from(
  new Set(lookbookProjects.map((p) => p.finish))
).sort();
