import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiere Chromwerk Köln – per Formular, Telefon oder E-Mail. Standort Köln. Wir freuen uns auf deine Nachricht.",
};

/** Inline-Icons für die Kontaktkacheln. */
function Icon({ name }: { name: "pin" | "phone" | "mail" | "clock" }) {
  const p = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "pin":
      return (
        <svg {...p}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 6 10 7 10-7" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Sprich mit uns"
        description="Fragen zur Hochglanzverdichtung, zu Felgen oder Pflegeprodukten? Schreib uns – wir sind für dich in Köln erreichbar."
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            {/* Kontaktinfos */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
                <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-ink-950/60 p-2.5 text-crimson">
                  <Icon name="pin" />
                </div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-chrome-200">
                  Standort
                </h3>
                <p className="mt-2 text-sm text-chrome-400">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                  <br />
                  {site.address.country}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
                  <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-ink-950/60 p-2.5 text-crimson">
                    <Icon name="phone" />
                  </div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-chrome-200">
                    Telefon
                  </h3>
                  <a href={`tel:${site.phone.replace(/\s|\(|\)/g, "")}`} className="mt-2 block text-sm text-chrome-400 transition hover:text-white">
                    {site.phone}
                  </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
                  <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-ink-950/60 p-2.5 text-crimson">
                    <Icon name="mail" />
                  </div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-chrome-200">
                    E-Mail
                  </h3>
                  <a href={`mailto:${site.email}`} className="mt-2 block text-sm text-chrome-400 transition hover:text-white">
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
                <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-ink-950/60 p-2.5 text-crimson">
                  <Icon name="clock" />
                </div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-chrome-200">
                  Öffnungszeiten
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-chrome-400">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-chrome-300">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-white/10 bg-ink-800/50 py-3 text-center text-xs uppercase tracking-widest text-chrome-300 transition hover:border-crimson/40 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Formular + Anfahrt */}
            <div className="space-y-8">
              <ContactForm />
              {/* Anfahrt: bewusst kein Karten-Embed (Datenschutz – siehe
                  Datenschutzerklärung), stattdessen Link zu Google Maps */}
              <div className="relative flex aspect-[16/7] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,42,0.1),transparent_60%)]" />
                <p className="relative font-display text-2xl font-bold uppercase text-chrome-200">
                  So findest du uns
                </p>
                <p className="relative mt-2 text-sm text-chrome-400">
                  {site.address.street} · {site.address.zip} {site.address.city}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${site.address.street}, ${site.address.zip} ${site.address.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-crimson px-7 py-3.5 font-display text-sm font-medium uppercase tracking-widest text-white shadow-glow transition hover:bg-crimson-bright"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Route planen
                </a>
                <p className="relative mt-3 text-[11px] text-chrome-600">
                  Öffnet Google Maps in einem neuen Tab.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
