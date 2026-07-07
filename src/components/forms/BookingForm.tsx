"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Field, Input, Select, Textarea } from "./FormControls";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

/**
 * BookingForm – Terminanfrage für Hochglanzverdichtung.
 * ------------------------------------------------------------------
 * Sendet die Daten an /api/booking (Platzhalter-Endpoint).
 * Dort später E-Mail-Versand, Datenbank oder Kalenderintegration ergänzen.
 * Der Bild-Upload wird aktuell nur clientseitig als Dateiliste erfasst.
 */
export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [files, setFiles] = useState<File[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fileCount: files.length }),
      });
      if (!res.ok) throw new Error("Fehler");
      setStatus("success");
      form.reset();
      setFiles([]);
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
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-chrome-100">
          Anfrage gesendet
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-chrome-400">
          Vielen Dank! Wir haben deine Terminanfrage erhalten und melden uns
          zeitnah bei dir. Prüfe auch deinen Spam-Ordner.
        </p>
        <Button
          variant="ghost"
          size="md"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Weitere Anfrage
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-ink-800/40 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <Input id="name" name="name" required placeholder="Max Mustermann" autoComplete="name" />
        </Field>
        <Field label="E-Mail" htmlFor="email" required>
          <Input id="email" name="email" type="email" required placeholder="max@beispiel.de" autoComplete="email" />
        </Field>
        <Field label="Telefonnummer" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" placeholder="+49 …" autoComplete="tel" />
        </Field>
        <Field label="Fahrzeugmodell" htmlFor="vehicle">
          <Input id="vehicle" name="vehicle" placeholder="z. B. Audi RS6" />
        </Field>
        <Field label="Felgengröße" htmlFor="size">
          <Input id="size" name="size" placeholder="z. B. 20 Zoll" />
        </Field>
        <Field label="Anzahl der Felgen" htmlFor="count">
          <Select id="count" name="count" defaultValue="4">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5 (inkl. Reserve)</option>
          </Select>
        </Field>
        <Field label="Zustand der Felgen" htmlFor="condition">
          <Select id="condition" name="condition" defaultValue="Gebraucht">
            <option>Neu</option>
            <option>Wie neu</option>
            <option>Gebraucht</option>
            <option>Beschädigt</option>
          </Select>
        </Field>
        <Field label="Gewünschte Leistung" htmlFor="service">
          <Select id="service" name="service" defaultValue={services[0].title}>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </Select>
        </Field>
        <Field label="Wunschtermin" htmlFor="date">
          <Input id="date" name="date" type="date" />
        </Field>
        <Field label="Bilder der Felgen" htmlFor="images" className="sm:col-span-1">
          {/* Upload: aktuell clientseitig erfasst – später an Storage anbinden */}
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-ink-900 px-4 py-3 text-sm text-chrome-400 transition hover:border-crimson/50 hover:text-chrome-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {files.length > 0 ? `${files.length} Datei(en)` : "Bilder auswählen"}
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
        </Field>
        <Field label="Nachricht" htmlFor="message" className="sm:col-span-2">
          <Textarea id="message" name="message" placeholder="Beschreibe kurz dein Anliegen …" />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-crimson">
          Etwas ist schiefgelaufen. Bitte versuche es erneut oder kontaktiere uns direkt.
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Senden …" : "Anfrage absenden"}
        </Button>
        <p className="text-xs text-chrome-600">* Pflichtfelder</p>
      </div>
    </form>
  );
}
