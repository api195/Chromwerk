import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Einheitlicher Seitenkopf für Unterseiten (mit Eyebrow + Chrom-Titel).
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 pt-36 pb-16">
      {/* Dekorativer Hintergrund */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(225,29,42,0.10),transparent_60%)]" />
      <Container className="relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-crimson">
            <span className="h-px w-6 bg-crimson/70" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal index={1}>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal index={2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-chrome-300">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </header>
  );
}
