import { cn } from "@/lib/utils";

/**
 * KoelnSkyline – stilisierte Silhouette der Kölner Skyline
 * (Kölner Dom, Colonius-Fernsehturm, Hohenzollernbrücke).
 * Reines Inline-SVG, frei skalierbar. Wird im Hero als "Stadtansicht"
 * genutzt, die sich als Reflexion auf dem Chrom lesen lässt.
 *
 * Farbe/Deckkraft über `className` (currentColor) steuerbar.
 */
export function KoelnSkyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax meet"
      fill="currentColor"
      className={cn("w-full", className)}
      aria-hidden="true"
    >
      {/* Bodenlinie / Brücke (Hohenzollernbrücke) */}
      <g opacity="0.9">
        <rect x="0" y="250" width="1200" height="50" />
        {/* Brückenbögen */}
        <path d="M60 250 q60 -70 120 0 z" />
        <path d="M200 250 q60 -70 120 0 z" />
        <path d="M340 250 q60 -70 120 0 z" />
      </g>

      {/* Kölner Dom – zwei gotische Türme */}
      <g transform="translate(560,10)">
        {/* linker Turm */}
        <path d="M20 240 L20 120 L30 120 L30 70 L40 40 L50 70 L50 120 L60 120 L60 240 Z" />
        <path d="M40 40 L35 20 L40 8 L45 20 Z" />
        {/* rechter Turm */}
        <path d="M80 240 L80 120 L90 120 L90 70 L100 40 L110 70 L110 120 L120 120 L120 240 Z" />
        <path d="M100 40 L95 20 L100 8 L105 20 Z" />
        {/* Mittelschiff */}
        <path d="M55 240 L55 150 L70 130 L85 150 L85 240 Z" />
        <path d="M70 130 L70 110 L74 118 L70 100 L66 118 Z" />
      </g>

      {/* Colonius Fernsehturm */}
      <g transform="translate(880,0)">
        <path d="M40 250 L46 90 L54 90 L60 250 Z" />
        <ellipse cx="50" cy="90" rx="22" ry="12" />
        <rect x="47" y="20" width="6" height="70" />
        <circle cx="50" cy="16" r="4" />
      </g>

      {/* Umliegende Gebäude */}
      <g opacity="0.85">
        <rect x="120" y="180" width="70" height="70" />
        <rect x="210" y="150" width="55" height="100" />
        <rect x="290" y="200" width="60" height="50" />
        <rect x="380" y="170" width="45" height="80" />
        <rect x="450" y="205" width="70" height="45" />
        <rect x="720" y="185" width="55" height="65" />
        <rect x="790" y="210" width="60" height="40" />
        <rect x="990" y="195" width="70" height="55" />
        <rect x="1080" y="165" width="55" height="85" />
      </g>
    </svg>
  );
}
