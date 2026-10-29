import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/logo/Logo";
import { navigation, site } from "@/data/site";

/** Social-Media-Inline-Icons (Platzhalter-Links via site.socials). */
function SocialIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.13A6.67 6.67 0 1 0 18.67 12 6.67 6.67 0 0 0 12 5.33Zm0 11A4.33 4.33 0 1 1 16.33 12 4.33 4.33 0 0 1 12 16.33Zm6.94-11.4a1.56 1.56 0 1 1-1.56-1.55 1.56 1.56 0 0 1 1.56 1.55Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.4c-1.2.1-2.4-.2-3.5-.8v5.9c0 3.5-2.6 5.9-5.8 5.9A5.6 5.6 0 0 1 5 14.9c0-3.2 2.8-5.6 6.1-5.2v2.5a3 3 0 0 0-1.2-.2 3 3 0 0 0-.2 6 3 3 0 0 0 3.1-3V3h3.7Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-950">
      {/* Chrom-Trennlinie */}
      <div className="h-px w-full bg-chrome-line" />
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marke */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-chrome-400">
              Präzisions-Felgenveredelung aus Köln. Hochglanzverdichtung,
              Aufbereitung und eigene Pflegeprodukte – für kompromisslosen Glanz.
            </p>
            <div className="mt-6 flex gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full border border-white/10 p-2.5 text-chrome-300 transition hover:border-crimson/50 hover:text-white"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-chrome-200">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-chrome-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-chrome-200">
              Kontakt
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-chrome-400">
              <li>
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s|\(|\)/g, "")}`} className="transition hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-chrome-200">
              Öffnungszeiten
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-chrome-400">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-chrome-300">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-chrome-500 sm:flex-row">
          <p>
            © {year} {site.name} {site.city}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="transition hover:text-chrome-200">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition hover:text-chrome-200">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
