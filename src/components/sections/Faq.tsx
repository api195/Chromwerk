"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Faq – aufklappbare Fragen & Antworten (Akkordeon).
 * Inhalte unten in FAQ_ITEMS pflegen.
 */
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Was kostet die Hochglanzverdichtung?",
    a: "Ein kompletter Satz (4 Felgen) kostet circa 600 € – inklusive keramischer Versiegelung. Schick uns einfach Bilder deiner Felgen über das Formular oder per WhatsApp, dann bekommst du eine verbindliche Einschätzung.",
  },
  {
    q: "Wie lange dauert die Bearbeitung?",
    a: "Je nach Zustand der Felgen in der Regel wenige Werktage. Den genauen Zeitrahmen nennen wir dir mit der Terminbestätigung – verbindlich und ohne Überraschungen.",
  },
  {
    q: "Geht es auch schneller? (Express-Bearbeitung)",
    a: "Ja. Mit der Express-Bearbeitung für 100 € Aufpreis gehen deine Felgen direkt nach der Annahme in Produktion, statt in der regulären Reihenfolge zu warten. Die Qualität bleibt identisch – es ist derselbe mehrstufige Prozess, deine Felgen kommen nur sofort dran. Du kannst Express direkt im Terminformular auswählen.",
  },
  {
    q: "Wie lange hält der Spiegelglanz?",
    a: "Die keramische Versiegelung schützt die verdichtete Oberfläche dauerhaft im Alltag. Mit der richtigen Pflege – pH-neutrale Reiniger statt aggressiver Felgenreiniger – bleibt der Glanz langfristig erhalten.",
  },
  {
    q: "Für welche Felgen ist das geeignet?",
    a: "Für die meisten Alufelgen – ob neu, gebraucht oder mit Gebrauchsspuren. Auch Bordsteinschäden können vor der Verdichtung aufbereitet werden. Schick uns Bilder, wir sagen dir ehrlich, was möglich ist.",
  },
  {
    q: "Bearbeitet ihr auch beschädigte Felgen?",
    a: "Ja. Bordsteinschäden, Kratzer und Korrosion werden vor der Verdichtung professionell aufbereitet – so entsteht die Basis für ein makelloses Ergebnis. Schick uns Fotos der Schäden, dann sagen wir dir, was möglich ist.",
  },
  {
    q: "Wie bekomme ich ein Angebot?",
    a: "Am schnellsten über das Terminformular oder per WhatsApp: ein paar Fotos deiner Felgen genügen. Wir melden uns in der Regel innerhalb von 24 Stunden mit einer Einschätzung und einem passenden Termin.",
  },
  {
    q: "Kauft ihr auch gebrauchte Felgen an?",
    a: "Ja, wir bewerten und kaufen gebrauchte Felgen an – unkompliziert und fair. Schick uns Marke, Modell und Bilder, dann machen wir dir ein Angebot.",
  },
  {
    q: "Wie pflege ich die Felgen nach der Veredelung?",
    a: "Am besten mit pH-neutralen Reinigern und weichen Tüchern – keine aggressiven Felgenreiniger oder scharfen Bürsten. So bleibt der Spiegelglanz lange erhalten. Passende Pflegeprodukte bieten wir bald selbst an.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-chrome-100 sm:text-base">
          {q}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-chrome-300 transition-transform duration-300",
            open && "rotate-45 border-crimson/50 text-crimson"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-chrome-400">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
