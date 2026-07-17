"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/data/site";
import { Logo } from "@/components/logo/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Auf der Startseite erscheint die Navigation erst nach dem Hero-Intro.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sichtbarkeit steuern: außerhalb der Startseite sofort, sonst nach Intro
  useEffect(() => {
    if (pathname !== "/") {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const onReady = () => setRevealed(true);
    window.addEventListener("chromwerk:hero-ready", onReady);
    // Sicherheits-Fallback, falls das Event ausbleibt
    const fallback = window.setTimeout(() => setRevealed(true), 8000);
    return () => {
      window.removeEventListener("chromwerk:hero-ready", onReady);
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  // Menü bei Navigation schließen
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hintergrund-Scrollen sperren, solange das Mobile-Menü offen ist
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-700",
        scrolled
          ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
        revealed
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="Zur Startseite">
          <Logo />
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors",
                  active ? "text-white" : "text-chrome-400 hover:text-chrome-100"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-crimson"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Warenkorb ausgeblendet, bis der Shop startet (Coming Soon) */}
          <div className="hidden sm:block">
            <Button href="/termin" variant="primary" size="sm">
              Termin
            </Button>
          </div>

          {/* Mobile-Menü-Button */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
            className="rounded-full border border-white/10 p-2.5 text-chrome-200 transition hover:bg-white/10 xl:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile-Navigation – deckendes Vollbild-Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-ink-950 xl:hidden"
          >
            <Container className="flex min-h-full flex-col py-6">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-4 py-4 text-base font-medium uppercase tracking-widest transition",
                        active
                          ? "bg-white/5 text-white"
                          : "text-chrome-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Button href="/termin" variant="primary" size="lg" className="mt-6 w-full">
                Termin buchen
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
