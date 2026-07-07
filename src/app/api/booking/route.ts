import { NextResponse } from "next/server";

/**
 * Terminanfrage-Endpoint (Platzhalter).
 * ------------------------------------------------------------------
 * Aktuell werden die Daten nur validiert und geloggt. Hier später
 * anbinden, was du brauchst:
 *   • E-Mail-Versand (z. B. Resend, Nodemailer, Postmark)
 *   • Datenbank (z. B. Supabase, Prisma)
 *   • Kalender (z. B. Google Calendar, Cal.com)
 *   • Datei-Upload für Bilder (z. B. Supabase Storage, S3, UploadThing)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Minimale Validierung der Pflichtfelder
    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { ok: false, error: "Name und E-Mail sind erforderlich." },
        { status: 400 }
      );
    }

    // TODO: Hier E-Mail/DB/Kalender-Integration ergänzen.
    console.info("[Chromwerk] Neue Terminanfrage:", body);

    return NextResponse.json({ ok: true, message: "Anfrage erhalten." });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
