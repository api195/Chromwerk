import type { Service } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

/** Inline-Icons für Leistungen (kein externes Icon-Paket nötig). */
function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  const p = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "gloss":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <path d="M8 8l1.5 1.5" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...p}>
          <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      );
    case "buy":
      return (
        <svg {...p}>
          <path d="M3 6h18l-1.5 9a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7L3 6Z" />
          <path d="M8 10v0M16 10v0M9 3l3 3 3-3" />
        </svg>
      );
    case "sell":
      return (
        <svg {...p}>
          <path d="M20.6 13.4 12 22l-9-9 8.6-8.6a2 2 0 0 1 1.4-.6H20a2 2 0 0 1 2 2v6a2 2 0 0 1-.4 1.2Z" />
          <circle cx="17" cy="7" r="1.3" />
        </svg>
      );
    case "care":
      return (
        <svg {...p}>
          <path d="M12 3s7 4 7 10a7 7 0 0 1-14 0c0-6 7-10 7-10Z" />
          <path d="M9 13a3 3 0 0 0 3 3" />
        </svg>
      );
    case "bottle":
      return (
        <svg {...p}>
          <path d="M10 2h4v2l1 2v3H9V6l1-2V2Z" />
          <rect x="9" y="9" width="6" height="13" rx="2" />
          <path d="M9 13h6" />
        </svg>
      );
    default:
      return null;
  }
}

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Reveal index={index} as="article">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-7 transition-all duration-500 hover:border-chrome-400/40 hover:bg-ink-700/60">
        {/* Glanz-Sweep beim Hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <div className="mb-6 inline-flex rounded-xl border border-white/10 bg-ink-950/60 p-3 text-chrome-100 transition-colors group-hover:text-crimson">
          <ServiceIcon icon={service.icon} />
        </div>

        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-chrome-100">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-chrome-400">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-chrome-300">
              <span className="h-1 w-1 rounded-full bg-crimson" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
