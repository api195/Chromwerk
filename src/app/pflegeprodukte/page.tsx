import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Pflegeprodukte",
  description:
    "Chromwerk Private-Label Pflegeprodukte für Chrom- und hochglanzverdichtete Felgen: Felgenreiniger, Glanzversiegelung, Mikrofasertuch und Pflege-Set.",
};

export default function PflegeproduktePage() {
  return (
    <>
      <PageHeader
        eyebrow="Pflegeprodukte"
        title="Chromwerk Private Label"
        description="Unsere eigenen Pflegeprodukte – exakt abgestimmt auf Chrom- und hochglanzverdichtete Oberflächen. Für langanhaltenden Spiegelglanz."
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Anwendungshinweis */}
          <Reveal>
            <div className="mt-20 grid gap-8 rounded-3xl border border-white/10 bg-ink-900/40 p-10 sm:p-14 lg:grid-cols-3">
              {[
                { title: "Reinigen", text: "Felgenreiniger säurefrei auftragen und Bremsstaub schonend lösen." },
                { title: "Versiegeln", text: "Glanzversiegelung dünn auftragen für Spiegeleffekt und Langzeitschutz." },
                { title: "Polieren", text: "Mit dem Mikrofasertuch streifenfrei auspolieren – fertig." },
              ].map((step, i) => (
                <div key={step.title}>
                  <span className="font-display text-4xl font-bold text-crimson/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-chrome-400">{step.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
