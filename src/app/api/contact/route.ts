import { NextResponse } from "next/server";

/**
 * Kontakt-Endpoint (Platzhalter).
 * Hier später E-Mail-Versand oder Datenbank anbinden (siehe /api/booking).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Name, E-Mail und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    // TODO: E-Mail-/DB-Integration ergänzen.
    console.info("[Chromwerk] Neue Kontaktnachricht:", body);

    return NextResponse.json({ ok: true, message: "Nachricht erhalten." });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
