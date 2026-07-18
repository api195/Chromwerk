"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Field, Input, Textarea } from "./FormControls";
import { Button } from "@/components/ui/Button";

/**
 * ContactForm – allgemeines Kontaktformular.
 * Sendet an /api/contact; von dort geht die Nachricht per E-Mail
 * (Resend) an den Betreiber.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-10 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-chrome-100">
          Nachricht gesendet
        </h3>
        <p className="mt-3 text-sm text-chrome-400">
          Danke für deine Nachricht – wir melden uns schnellstmöglich zurück.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-ink-800/40 p-6 sm:p-8"
    >
      {/* Honeypot-Spamschutz: für Menschen unsichtbar, Bots füllen es aus */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name" required>
          <Input id="c-name" name="name" required placeholder="Dein Name" autoComplete="name" />
        </Field>
        <Field label="E-Mail" htmlFor="c-email" required>
          <Input id="c-email" name="email" type="email" required placeholder="deine@mail.de" autoComplete="email" />
        </Field>
        <Field label="Betreff" htmlFor="c-subject" className="sm:col-span-2">
          <Input id="c-subject" name="subject" placeholder="Worum geht es?" />
        </Field>
        <Field label="Nachricht" htmlFor="c-message" required className="sm:col-span-2">
          <Textarea id="c-message" name="message" required placeholder="Deine Nachricht …" />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-crimson">
          Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.
        </p>
      )}

      <div className="mt-6">
        <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Senden …" : "Nachricht senden"}
        </Button>
      </div>
    </form>
  );
}
