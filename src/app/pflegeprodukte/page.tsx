import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Pflegeprodukte – Coming Soon",
  description:
    "Die Chromwerk Pflegeprodukte für Chrom- und hochglanzverdichtete Felgen erscheinen in Kürze.",
  robots: { index: false, follow: true },
};

/**
 * Pflegeprodukte – Coming Soon.
 * Der Shop startet in Kürze. Zum Launch: diese Seite wieder durch den
 * Produkt-Grid ersetzen (ProductCard + products aus @/data/products).
 */
export default function PflegeproduktePage() {
  return (
    <ComingSoon
      eyebrow="Chromwerk Private Label"
      title="Pflegeprodukte"
      description="Unsere eigenen Pflegeprodukte – entwickelt für Chrom- und hochglanzverdichtete Oberflächen – erscheinen in Kürze. Bis dahin beraten wir dich gerne persönlich zur richtigen Pflege."
    />
  );
}
