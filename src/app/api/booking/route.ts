import { NextResponse } from "next/server";
import { sendMail, fieldsToHtml } from "@/lib/mail";

/**
 * Terminanfrage-Endpoint.
 * Validiert die Anfrage und sendet sie per E-Mail (Resend) an den Betreiber.
 * Ohne konfigurierten RESEND_API_KEY wird die Anfrage nur geloggt
 * (lokale Entwicklung).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { ok: false, error: "Name und E-Mail sind erforderlich." },
        { status: 400 }
      );
    }

    const result = await sendMail({
      subject: `Neue Terminanfrage von ${body.name}`,
      replyTo: body.email,
      html: fieldsToHtml([
        ["Name", body.name],
        ["E-Mail", body.email],
        ["Telefon", body.phone],
        ["Fahrzeugmodell", body.vehicle],
        ["Felgengröße", body.size],
        ["Anzahl der Felgen", body.count],
        ["Zustand der Felgen", body.condition],
        ["Gewünschte Leistung", body.service],
        ["Wunschtermin", body.date],
        ["Nachricht", body.message],
        ["Hochgeladene Bilder", body.fileCount ? `${body.fileCount} (Upload folgt später)` : ""],
      ]),
    });

    if (result === "skipped") {
      console.info("[Chromwerk] Terminanfrage (nur geloggt):", body);
    }

    return NextResponse.json({ ok: true, message: "Anfrage erhalten." });
  } catch (err) {
    console.error("[Chromwerk] Terminanfrage fehlgeschlagen:", err);
    return NextResponse.json(
      { ok: false, error: "Anfrage konnte nicht übermittelt werden." },
      { status: 500 }
    );
  }
}
