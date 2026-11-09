import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  DOSTARCZAMY_OPTIONS,
  isValidPhone,
  type WynajemPayload,
} from "../../lib/wynajem";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<WynajemPayload>;
  const { imie, email, potrzeba, dostarczamy, termin, wiadomosc } = body;
  const telefon = body.telefon?.trim();
  const zgodaTelefon = body.zgodaTelefon === true;

  if (!imie || !email || !telefon || !isValidPhone(telefon)) {
    return NextResponse.json(
      { error: "Brak wymaganych danych." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD nie są ustawione w .env");
    return NextResponse.json(
      { error: "Wysyłka e-mail nie jest skonfigurowana." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  /* Every option is listed, so it is clear what was and wasn't requested. */
  const dostarczamyLines = DOSTARCZAMY_OPTIONS.map(
    ({ label, value }) =>
      `  [${dostarczamy?.includes(value) ? "x" : " "}] ${label}`,
  );

  try {
    await transporter.sendMail({
      from: `"LABB Studio — formularz wynajmu" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `Nowe zapytanie wynajmu — ${imie}`,
      text: [
        "KONTAKT",
        `Imię: ${imie}`,
        `E-mail: ${email}`,
        `Telefon: ${telefon}`,
        `Kontakt telefoniczny: ${
          zgodaTelefon
            ? "TAK — klient zgadza się na telefon"
            : "NIE — kontaktuj się przez WhatsApp"
        }`,
        "",
        "ZAPYTANIE",
        `Czego potrzebuje: ${potrzeba ?? "—"}`,
        `Preferowany termin: ${termin || "—"}`,
        "",
        "DODATKOWE POTRZEBY (Co dostarczamy?)",
        ...dostarczamyLines,
        "",
        "WIADOMOŚĆ",
        wiadomosc || "—",
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd wysyłki e-maila zapytania o wynajem:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać zapytania." },
      { status: 500 }
    );
  }
}
