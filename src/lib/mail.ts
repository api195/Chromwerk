import { site } from "@/data/site";

/**
 * E-Mail-Versand über Resend (https://resend.com).
 * ------------------------------------------------------------------
 * Konfiguration über Umgebungsvariablen (in Vercel setzen):
 *   RESEND_API_KEY  – Pflicht für den Versand (ohne Key wird nur geloggt)
 *   MAIL_TO         – Empfänger (Standard: site.email = info@chromwerk.org)
 *   MAIL_FROM       – Absender (muss zur in Resend verifizierten Domain
 *                     gehören; Standard: website@chromwerk.org)
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** HTML-Sonderzeichen in Nutzereingaben entschärfen. */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Formularfelder als übersichtliche HTML-Tabelle rendern. */
export function fieldsToHtml(fields: Array<[label: string, value: unknown]>) {
  const rows = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([label, v]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#111;">${escapeHtml(String(v)).replaceAll("\n", "<br/>")}</td>
        </tr>`
    )
    .join("");
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.5;">
      <table style="border-collapse:collapse;">${rows}</table>
      <p style="margin-top:24px;color:#999;font-size:12px;">
        Diese Nachricht wurde über das Formular auf ${escapeHtml(site.url)} gesendet.
      </p>
    </div>`;
}

/**
 * Sendet eine E-Mail an den Betreiber.
 * Rückgabe: "sent" (versendet) oder "skipped" (kein API-Key konfiguriert –
 * z. B. lokale Entwicklung; die Anfrage wird dann nur geloggt).
 * Wirft bei einem echten Versandfehler, damit die Route 500 liefert und
 * der Nutzer im Formular eine Fehlermeldung sieht.
 */
export async function sendMail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Chromwerk] RESEND_API_KEY fehlt – E-Mail wird NICHT versendet:",
      subject
    );
    return "skipped";
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "Chromwerk Website <website@chromwerk.org>",
      to: process.env.MAIL_TO ?? site.email,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend-Fehler ${res.status}: ${body.slice(0, 300)}`);
  }
  return "sent";
}
