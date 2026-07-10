import { cn } from "@/lib/utils";

/**
 * Marquee – endloser, horizontal laufender Text-Streifen (ständige Bewegung).
 * Zwei identische Spuren nebeneinander erzeugen den nahtlosen Loop.
 */
export function Marquee({
  items,
  direction = "left",
  duration = 32,
  className,
  accent = false,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  accent?: boolean;
}) {
  const row = (
    <div
      className={cn(
        "marquee-track items-center gap-8 pr-8",
        direction === "left" ? "marquee-left" : "marquee-right"
      )}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center gap-8">
          <span
            className={cn(
              "font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl",
              accent
                ? "text-transparent bg-chrome-text bg-clip-text"
                : "text-chrome-700"
            )}
          >
            {t}
          </span>
          <span className="text-crimson">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-white/10 bg-ink-950/70 py-6 backdrop-blur-sm",
        className
      )}
    >
      {/* eine Spur mit verdoppeltem Inhalt (translateX -50 % = nahtloser Loop) */}
      {row}
      {/* weiche Kanten */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
