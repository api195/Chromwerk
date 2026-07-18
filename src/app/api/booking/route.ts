import { NextResponse } from "next/server";
import { sendMail, fieldsToHtml, type MailAttachment } from "@/lib/mail";

/**
 * Terminanfrage-Endpoint.
 * Nimmt die Anfrage als multipart/form-data entgegen (inkl. Felgen-Bilder)
 * und sendet sie per E-Mail (Resend) an den Betreiber – die Bilder als
 * echte E-Mail-Anhänge. Ohne konfigurierten RESEND_API_KEY wird die
 * Anfrage nur geloggt (lokale Entwicklung).
 */

// Limits für den Bild-Upload (Resend erlaubt bis ~40 MB pro Mail)
const MAX_FILES = 6;
const MAX_FILE_MB = 8;
const MAX_TOTAL_MB = 20;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const get = (key: string) => {
      const v = form.get(key);
      return typeof v === "string" ? v.trim() : "";
    };

    // Spamschutz (Honeypot): Das versteckte Feld füllen nur Bots aus.
    // In dem Fall tun wir so, als wäre alles ok – ohne etwas zu versenden.
    if (get("website")) {
      return NextResponse.json({ ok: true, message: "Anfrage erhalten." });
    }

    const name = get("name");
    const email = get("email");
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name und E-Mail sind erforderlich." },
        { status: 400 }
      );
    }

    // Bilder einsammeln und als E-Mail-Anhänge aufbereiten
    const files = form
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { ok: false, error: `Bitte maximal ${MAX_FILES} Bilder hochladen.` },
        { status: 400 }
      );
    }

    let totalBytes = 0;
    const attachments: MailAttachment[] = [];
    for (const [i, file] of files.entries()) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, error: `Ein Bild ist zu groß (max. ${MAX_FILE_MB} MB pro Bild).` },
          { status: 400 }
        );
      }
      totalBytes += file.size;
      if (totalBytes > MAX_TOTAL_MB * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, error: `Bilder insgesamt zu groß (max. ${MAX_TOTAL_MB} MB).` },
          { status: 400 }
        );
      }
      const buf = Buffer.from(await file.arrayBuffer());
      const ext = (file.name.match(/\.\w{2,5}$/)?.[0] ?? ".jpg").toLowerCase();
      attachments.push({
        filename: `felge-${i + 1}${ext}`,
        content: buf.toString("base64"),
      });
    }

    const result = await sendMail({
      subject: `Neue Terminanfrage von ${name}`,
      replyTo: email,
      attachments,
      html: fieldsToHtml([
        ["Name", name],
        ["E-Mail", email],
        ["Telefon", get("phone")],
        ["Fahrzeugmodell", get("vehicle")],
        ["Felgengröße", get("size")],
        ["Anzahl der Felgen", get("count")],
        ["Zustand der Felgen", get("condition")],
        ["Gewünschte Leistung", get("service")],
        ["Wunschtermin", get("date")],
        ["Nachricht", get("message")],
        ["Bilder", files.length > 0 ? `${files.length} im Anhang` : "Keine"],
      ]),
    });

    if (result === "skipped") {
      console.info(
        "[Chromwerk] Terminanfrage (nur geloggt):",
        name,
        email,
        `${files.length} Bild(er)`
      );
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
