import { cn } from "@/lib/utils";

/**
 * Chromwerk Wortmarke (Logo).
 * ------------------------------------------------------------------
 * STANDARD: CSS-Chrom-Wortmarke – komplett selbsttragend, kein Bild nötig.
 *
 * DEIN ECHTES LOGO EINBINDEN:
 * 1. Lege deine Logo-Datei ab, z. B. /public/images/brand/chromwerk-logo.png
 * 2. Kommentiere den <span>-Block unten aus und nutze stattdessen:
 *
 *    import Image from "next/image";
 *    <Image src="/images/brand/chromwerk-logo.png" alt="Chromwerk Köln"
 *      width={220} height={64} priority className={className} />
 */
export function Logo({
  className,
  withCity = true,
}: {
  className?: string;
  withCity?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col leading-none select-none",
        className
      )}
      aria-label="Chromwerk Köln"
    >
      <span className="font-display text-2xl font-bold uppercase tracking-tight">
        <span className="bg-chrome-text bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]">
          Chrom
        </span>
        <span className="italic text-crimson">Werk</span>
      </span>
      {withCity && (
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest2 text-chrome-400">
          Köln
        </span>
      )}
    </span>
  );
}
