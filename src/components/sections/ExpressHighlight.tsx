import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { express, expressPriceLabel } from "@/data/express";
import { cn } from "@/lib/utils";

/**
 * ExpressHighlight – bewirbt die Express-Bearbeitung (Aufpreis).
 *
 * `variant="card"`  – kompakt für die Seitenspalte (Terminseite)
 * `variant="banner"` – breiter Block mit CTA (Leistungsseite)
 */
export function ExpressHighlight({
  variant = "card",
  className,
}: {
  variant?: "card" | "banner";
  className?: string;
}) {
  const banner = variant === "banner";

  return (
    <Reveal className={className}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-crimson/30 bg-gradient-to-br from-crimson/12 to-ink-900/60",
          banner ? "rounded-3xl p-10 sm:p-14" : "p-6"
        )}
      >
        {/* Weicher Lichtschein hinter dem Blitz */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,42,0.18),transparent_60%)]" />

        <div className={cn("relative", banner && "mx-auto max-w-2xl text-center")}>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-crimson",
              banner && "mx-auto"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
            </svg>
            {expressPriceLabel} Aufpreis
          </span>

          <h3
            className={cn(
              "mt-4 font-display font-semibold uppercase tracking-wide text-chrome-100",
              banner ? "text-2xl sm:text-3xl" : "text-base"
            )}
          >
            {express.title}
          </h3>

          <p
            className={cn(
              "mt-3 leading-relaxed text-chrome-400",
              banner ? "text-sm sm:text-base" : "text-sm"
            )}
          >
            {banner ? express.description : express.short}
          </p>

          <ul
            className={cn(
              "mt-5 space-y-2",
              banner && "inline-flex flex-col items-start text-left"
            )}
          >
            {express.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-chrome-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="mt-0.5 shrink-0 text-crimson"
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[11px] leading-relaxed text-chrome-600">
            {express.note}
          </p>

          {banner && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/termin" variant="primary" size="lg">
                Express-Termin anfragen
              </Button>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
