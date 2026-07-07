import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { LookbookGallery } from "@/components/lookbook/LookbookGallery";

export const metadata: Metadata = {
  title: "Lookbook · Ergebnisse",
  description:
    "Vorher-/Nachher-Ergebnisse der Hochglanzverdichtung von Chromwerk Köln. Gefiltert nach Marke, Zollgröße, Zustand und Finish.",
};

export default function LookbookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ergebnisse"
        title="Lookbook"
        description="Ausgewählte Projekte aus unserer Werkstatt. Filtere nach Fahrzeug, Felgentyp, Größe, Zustand und Finish – und öffne jedes Projekt für Details."
      />
      <section className="py-20">
        <Container>
          <LookbookGallery />
        </Container>
      </section>
    </>
  );
}
