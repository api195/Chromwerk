import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { WheelShop } from "@/components/shop/WheelShop";

export const metadata: Metadata = {
  title: "Felgen kaufen",
  description:
    "Hochglanzverdichtete Felgensätze kaufen – geprüfte Premium-Qualität von Chromwerk Köln. Filtern nach Marke, Zollgröße und Zustand.",
};

export default function FelgenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Felgen-Shop"
        title="Hochglanzverdichtete Felgen"
        description="Sofort verfügbare, veredelte Felgensätze in Premium-Qualität. Geprüft, aufbereitet und bereit für die Montage. Kaufen oder unverbindlich anfragen."
      />
      <section className="py-20">
        <Container>
          <WheelShop />
        </Container>
      </section>
    </>
  );
}
