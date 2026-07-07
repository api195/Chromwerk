import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Einheitliche Sektions-Überschrift mit Eyebrow-Label, Chrom-Titel
 * und optionalem Beschreibungstext.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-crimson">
            <span className="h-px w-6 bg-crimson/70" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-transparent bg-chrome-text bg-clip-text sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal index={2}>
          <p className="mt-5 text-base leading-relaxed text-chrome-300">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
