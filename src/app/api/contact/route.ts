import { NextResponse } from "next/server";
import { sendMail, fieldsToHtml } from "@/lib/mail";

/**
 * Kontakt-Endpoint.
 * Validiert die Nachricht und sendet sie per E-Mail (Resend) an den Betreiber.
 * Ohne konfigurierten RESEND_API_KEY wird die Nachricht nur geloggt
 * (lokale Entwicklung).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Spamschutz (Honeypot): verstecktes Feld ausgefüllt → Bot, still verwerfen
    if (body?.website) {
      return NextResponse.json({ ok: true, message: "Nachricht erhalten." });
    }

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Name, E-Mail und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    const result = await sendMail({
      subject: `Neue Kontaktanfrage von ${body.name}${body.subject ? ` – ${body.subject}` : ""}`,
      replyTo: body.email,
      html: fieldsToHtml([
        ["Name", body.name],
        ["E-Mail", body.email],
        ["Betreff", body.subject],
        ["Nachricht", body.message],
      ]),
    });

    if (result === "skipped") {
      console.info("[Chromwerk] Kontaktnachricht (nur geloggt):", body);
    }

    return NextResponse.json({ ok: true, message: "Nachricht erhalten." });
  } catch (err) {
    console.error("[Chromwerk] Kontaktnachricht fehlgeschlagen:", err);
    return NextResponse.json(
      { ok: false, error: "Nachricht konnte nicht übermittelt werden." },
      { status: 500 }
    );
  }
}
