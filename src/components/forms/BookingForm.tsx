"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Field, Input, Select, Textarea } from "./FormControls";
import { ExpressOption } from "./ExpressOption";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

/**
 * BookingForm – Terminanfrage für Hochglanzverdichtung.
 * ------------------------------------------------------------------
 * Sendet die Daten als multipart/form-data an /api/booking – inklusive
 * der Felgen-Bilder, die dort als E-Mail-Anhang mitgeschickt werden.
 * Bilder werden vor dem Upload clientseitig verkleinert (max. 1600 px,
 * JPEG), damit auch Handyfotos schnell und zuverlässig durchgehen.
 */
const MAX_FILES = 6;

/** Bild clientseitig verkleinern; bei Fehlern (z. B. HEIC) Original senden. */
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const max = 1600;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.82)
    );
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [files, setFiles] = useState<File[]>([]);
  // Express-Bearbeitung (Aufpreis) – wird als Formularfeld mitgesendet
  const [express, setExpress] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const data = new FormData(form);
      // Original-Dateien durch verkleinerte Versionen ersetzen
      data.delete("images");
      const compressed = await Promise.all(files.map(compressImage));
      for (const f of compressed) data.append("images", f);

      const res = await fetch("/api/booking", { method: "POST", body: data });
      if (!res.ok) throw new Error("Fehler");
      setStatus("success");
      form.reset();
      setFiles([]);
      setExpress(false);
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
      {/* Honeypot-Spamschutz: für Menschen unsichtbar, Bots füllen es aus */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="b-website">Website</label>
        <input id="b-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
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
          {/* Bilder werden mit der Anfrage als E-Mail-Anhang übermittelt */}
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-ink-900 px-4 py-3 text-sm text-chrome-400 transition hover:border-crimson/50 hover:text-chrome-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {files.length > 0
              ? `${files.length} Bild${files.length > 1 ? "er" : ""} ausgewählt`
              : "Bilder auswählen"}
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) =>
              setFiles(Array.from(e.target.files ?? []).slice(0, MAX_FILES))
            }
          />
          <p className="mt-1.5 text-[11px] text-chrome-600">
            Max. {MAX_FILES} Bilder – werden mit der Anfrage übermittelt.
          </p>
        </Field>
        <Field label="Nachricht" htmlFor="message" className="sm:col-span-2">
          <Textarea id="message" name="message" placeholder="Beschreibe kurz dein Anliegen …" />
        </Field>

        {/* Express-Bearbeitung: Felgen gehen sofort in Produktion */}
        <div className="sm:col-span-2">
          <ExpressOption checked={express} onChange={setExpress} />
        </div>
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
