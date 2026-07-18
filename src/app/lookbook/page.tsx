import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LookbookCard } from "@/components/cards/LookbookCard";
import { lookbookProjects } from "@/data/lookbook";

export const metadata: Metadata = {
  title: "Lookbook · Ergebnisse",
  description:
    "Vorher-/Nachher-Ergebnisse der Hochglanzverdichtung von Chromwerk Köln – ausgewählte Projekte aus unserer Werkstatt.",
};

/**
 * Lookbook – alle Projekte als einfaches Raster, bewusst ohne Filter.
 * Neue Projekte in src/data/lookbook.ts erscheinen automatisch.
 */
export default function LookbookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ergebnisse"
        title="Lookbook"
        description="Ausgewählte Projekte aus unserer Werkstatt – öffne ein Projekt für Details und den Vorher/Nachher-Vergleich."
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lookbookProjects.map((project, i) => (
              <Reveal key={project.slug} index={i % 3}>
                <LookbookCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
