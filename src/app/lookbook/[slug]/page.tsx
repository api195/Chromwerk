import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "@/components/lookbook/BeforeAfter";
import { lookbookProjects } from "@/data/lookbook";

// Statische Pfade für alle Projekte (SEO + Performance)
export function generateStaticParams() {
  return lookbookProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = lookbookProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Projekt nicht gefunden" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function LookbookDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = lookbookProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <article className="pt-28">
      <Container>
        {/* Zurück-Link */}
        <Link
          href="/lookbook"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-chrome-400 transition hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Zurück zum Lookbook
        </Link>

        {/* Kopf */}
        <div className="mt-8 flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-crimson">
              {project.vehicle} · {project.brand} {project.model}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-chrome-300">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[project.wheelType, `${project.size}″`, project.condition, project.finish].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-widest text-chrome-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </Container>

      {/* Vorher/Nachher-Vergleich – nur wenn ein echtes Vorher-Bild vorliegt.
          Fehlt es (z. B. nur Ergebnisfoto vorhanden), zeigen wir stattdessen
          das Ergebnis-Bild groß an. */}
      <section className="py-16">
        <Container>
          {project.beforeImages.length > 0 ? (
            <>
              <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-wide text-chrome-100">
                Vorher / Nachher
              </h2>
              <Reveal>
                <BeforeAfter
                  before={project.beforeImages[0]}
                  after={project.afterImages[0]}
                  className="mx-auto max-w-4xl"
                />
              </Reveal>
            </>
          ) : (
            <>
              <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-wide text-chrome-100">
                Ergebnis
              </h2>
              <Reveal>
                <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                  <Image
                    src={project.afterImages[0]}
                    alt={`${project.title} – Ergebnis`}
                    fill
                    sizes="(max-width:1024px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </>
          )}
        </Container>
      </section>

      {/* Details: Daten + Schritte */}
      <section className="pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Felgendaten */}
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-7">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                  Felgendaten
                </h3>
                <dl className="mt-5 space-y-3">
                  {project.wheelData.map((d) => (
                    <div key={d.label} className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <dt className="text-chrome-500">{d.label}</dt>
                      <dd className="text-chrome-200">{d.value}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between pb-1 text-sm">
                    <dt className="text-chrome-500">Bearbeitungszeit</dt>
                    <dd className="text-chrome-200">{project.durationDays} Tage</dd>
                  </div>
                </dl>
                {project.clientNote && (
                  <div className="mt-6 rounded-xl border border-crimson/20 bg-crimson/5 p-4">
                    <p className="text-[11px] uppercase tracking-widest text-crimson">
                      Kundenhinweis
                    </p>
                    <p className="mt-2 text-sm text-chrome-300">{project.clientNote}</p>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Bearbeitungsschritte */}
            <Reveal index={1}>
              <div className="lg:col-span-2">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
                  Bearbeitungsschritte
                </h3>
                <ol className="mt-5 space-y-4">
                  {project.steps.map((step, i) => (
                    <li
                      key={step.title}
                      className="flex gap-5 rounded-2xl border border-white/10 bg-ink-800/40 p-5"
                    >
                      <span className="font-display text-2xl font-bold text-crimson">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-display text-base font-semibold uppercase tracking-wide text-chrome-100">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-sm text-chrome-400">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Bildergalerie */}
      <section className="pb-20">
        <Container>
          <h3 className="mb-6 font-display text-lg font-semibold uppercase tracking-wide text-chrome-100">
            Galerie
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...project.afterImages, ...project.beforeImages].map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
              >
                <Image
                  src={img}
                  alt={`${project.title} – Bild ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-ink-900/40 p-10 text-center">
            <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-chrome-100">
              Dein Projekt als Nächstes?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-chrome-400">
              Lass deine Felgen von Chromwerk hochglanzverdichten – frag jetzt
              unverbindlich einen Termin an.
            </p>
            <Button href="/termin" variant="primary" size="lg" className="mt-7">
              Termin buchen
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
