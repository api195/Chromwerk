import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Chromwerk Logo (Bildmarke).
 * ------------------------------------------------------------------
 * Nutzt das echte Logo aus /public/images/brand/chromwerk-logo.png
 * (freigestellt, transparenter Hintergrund – funktioniert auf allen
 * dunklen Flächen). Neues Logo einsetzen: Datei ersetzen und ggf.
 * width/height an das Seitenverhältnis anpassen.
 *
 * Die frühere CSS-Wortmarke bleibt unten auskommentiert als Fallback.
 */
export function Logo({
  className,
}: {
  className?: string;
  /** Ehemalige Option der CSS-Wortmarke – im Bildlogo bereits enthalten. */
  withCity?: boolean;
}) {
  return (
    <Image
      src="/images/brand/chromwerk-logo.png"
      alt="Chromwerk Köln – Hochglanzverdichtung von Felgen"
      width={720}
      height={366}
      priority
      className={cn("h-12 w-auto select-none sm:h-14", className)}
    />
  );
}

/* CSS-Wortmarke (Fallback ohne Bilddatei):
  <span className="inline-flex flex-col leading-none select-none" aria-label="Chromwerk Köln">
    <span className="font-display text-2xl font-bold uppercase tracking-tight">
      <span className="bg-chrome-text bg-clip-text text-transparent">Chrom</span>
      <span className="italic text-crimson">Werk</span>
    </span>
    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest2 text-chrome-400">Köln</span>
  </span>
*/
