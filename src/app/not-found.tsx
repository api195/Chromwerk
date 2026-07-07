import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pt-20">
      <Container className="text-center">
        <p className="font-display text-8xl font-bold text-transparent bg-chrome-text bg-clip-text sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-chrome-100">
          Seite nicht gefunden
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-chrome-400">
          Diese Seite existiert nicht oder wurde verschoben. Zurück zum Glanz:
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" variant="chrome" size="lg">
            Zur Startseite
          </Button>
          <Link
            href="/lookbook"
            className="inline-flex items-center text-sm font-medium uppercase tracking-widest text-chrome-300 transition hover:text-white"
          >
            Lookbook ansehen
          </Link>
        </div>
      </Container>
    </section>
  );
}
