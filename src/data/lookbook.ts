import type { LookbookProject } from "@/types";

/**
 * Lookbook / Ergebnisse – echte Vorher-/Nachher-Projekte.
 * ------------------------------------------------------------------
 * Neues Projekt einpflegen: Objekt kopieren, `slug` eindeutig vergeben
 * und Bilder (vorher/nachher) in /public/images/lookbook/ ablegen.
 * Die Detailseite /lookbook/[slug] wird automatisch generiert.
 *
 * Hinweis: Marken-, Größen- und Fahrzeugangaben sind sinnvoll vorbelegt –
 * bitte bei Bedarf an die echten Daten anpassen.
 */
export const lookbookProjects: LookbookProject[] = [
  {
    slug: "yido-mehrteilig-chrom",
    title: "Yido Performance – Mehrteilig in Chrom",
    brand: "Yido Performance",
    model: "Forged Mehrteilig",
    size: 21,
    wheelType: "Mehrspeiche",
    vehicle: "Universal",
    condition: "Aufbereitet",
    finish: "Chrom-Hochglanz",
    summary:
      "Mattschwarze Schmiedefelge, verwandelt in tiefen Chrom-Hochglanz.",
    description:
      "Eine mehrteilige, geschmiedete Yido-Performance-Felge kam in mattem Schwarz zu uns. Nach mehrstufiger Hochglanzverdichtung spiegelt die Oberfläche ihre Umgebung in voller Chromtiefe.",
    beforeImages: ["/images/lookbook/yido-mehrteilig-vorher.webp"],
    afterImages: ["/images/lookbook/yido-mehrteilig-nachher.webp"],
    coverImage: "/images/lookbook/yido-mehrteilig-nachher.webp",
    steps: [
      { title: "Zustandsanalyse", text: "Vermessung der Oberfläche und Glanzgradbestimmung." },
      { title: "Feinschliff", text: "Speichen und Bett stufenweise in Handarbeit vorbereitet." },
      { title: "Verdichtung", text: "Mehrstufige mechanische Hochglanzverdichtung bis zur Chromtiefe." },
      { title: "Versiegelung", text: "Keramische Schutzschicht für dauerhaften Glanz." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "21 Zoll" },
      { label: "Bauart", value: "Geschmiedet, mehrteilig" },
      { label: "Finish", value: "Chrom-Hochglanz" },
      { label: "Ausgangszustand", value: "Mattschwarz" },
    ],
    durationDays: 5,
  },
  {
    slug: "yido-forged-chrom",
    title: "Yido Performance – Forged in Chrom",
    brand: "Yido Performance",
    model: "Forged",
    size: 20,
    wheelType: "Y-Speiche",
    vehicle: "Universal",
    condition: "Aufbereitet",
    finish: "Chrom-Hochglanz",
    summary: "Dunkle Schmiedefelge, veredelt zu spiegelndem Chromglanz.",
    description:
      "Diese geschmiedete Yido-Performance-Felge erhielt eine vollständige Hochglanzverdichtung. Aus dem matten Ausgangszustand wurde eine tiefe, spiegelnde Chromoberfläche.",
    beforeImages: ["/images/lookbook/yido-forged-vorher.webp"],
    afterImages: ["/images/lookbook/yido-forged-nachher.webp"],
    coverImage: "/images/lookbook/yido-forged-nachher.webp",
    steps: [
      { title: "Analyse", text: "Oberflächenprüfung und Dokumentation." },
      { title: "Schliff", text: "Speichen und Stern in Handarbeit vorbereitet." },
      { title: "Hochglanz", text: "Mehrstufige Verdichtung bis zur Chromtiefe." },
      { title: "Schutz", text: "Keramische Versiegelung gegen Bremsstaub." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "20 Zoll" },
      { label: "Bauart", value: "Geschmiedet (Forged)" },
      { label: "Finish", value: "Chrom-Hochglanz" },
      { label: "Ausgangszustand", value: "Dunkel matt" },
    ],
    durationDays: 4,
  },
  {
    slug: "bmw-m-chrom",
    title: "BMW M – Sternspeiche in Chrom",
    brand: "BMW M",
    model: "Sternspeiche",
    size: 20,
    wheelType: "Mehrspeiche",
    vehicle: "BMW",
    condition: "Aufbereitet",
    finish: "Chrom-Hochglanz",
    summary: "Mattschwarze BMW-M-Felge, veredelt zu vollem Chromglanz.",
    description:
      "Eine originale BMW-M-Felge in Mattschwarz wurde bei uns hochglanzverdichtet. Die filigranen Speichen erhielten dabei besondere Aufmerksamkeit für ein makelloses Spiegelbild.",
    beforeImages: ["/images/lookbook/bmw-m-vorher.webp"],
    afterImages: ["/images/lookbook/bmw-m-nachher.webp"],
    coverImage: "/images/lookbook/bmw-m-nachher.webp",
    steps: [
      { title: "Zustandsanalyse", text: "Vermessung und Dokumentation der Oberfläche." },
      { title: "Feinschliff", text: "Speichen und Stern in Handarbeit bearbeitet." },
      { title: "Verdichtung", text: "Mehrstufige Hochglanzverdichtung bis zur Chromtiefe." },
      { title: "Versiegelung", text: "Keramische Schutzschicht für Langzeitglanz." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "20 Zoll" },
      { label: "Fahrzeug", value: "BMW M" },
      { label: "Finish", value: "Chrom-Hochglanz" },
      { label: "Ausgangszustand", value: "Mattschwarz" },
    ],
    durationDays: 5,
  },
  {
    slug: "yido-y-speiche-chrom",
    title: "Yido Performance – Y-Speiche in Chrom",
    brand: "Yido Performance",
    model: "Y-Speiche",
    size: 20,
    wheelType: "Y-Speiche",
    vehicle: "Universal",
    condition: "Aufbereitet",
    finish: "Chrom-Hochglanz",
    summary: "Sportliche Y-Speiche, verdichtet zu tiefem Spiegelglanz.",
    description:
      "Eine Yido-Performance-Felge im Y-Speichen-Design wurde vom matten Ausgangszustand in tiefen Chrom-Hochglanz verwandelt. Licht und Umgebung spiegeln sich vollständig in der Oberfläche.",
    beforeImages: ["/images/lookbook/yido-yspeiche-vorher.webp"],
    afterImages: ["/images/lookbook/yido-yspeiche-nachher.webp"],
    coverImage: "/images/lookbook/yido-yspeiche-nachher.webp",
    steps: [
      { title: "Analyse", text: "Oberflächenprüfung und Glanzgradmessung." },
      { title: "Schliff", text: "Y-Speichen stufenweise in Handarbeit bearbeitet." },
      { title: "Hochglanz", text: "Mehrstufige Verdichtung für den Spiegeleffekt." },
      { title: "Schutz", text: "Keramische Versiegelung für dauerhaften Glanz." },
    ],
    wheelData: [
      { label: "Zollgröße", value: "20 Zoll" },
      { label: "Design", value: "Y-Speiche" },
      { label: "Finish", value: "Chrom-Hochglanz" },
      { label: "Ausgangszustand", value: "Dunkel matt" },
    ],
    durationDays: 4,
  },
];
