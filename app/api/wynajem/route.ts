import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type WynajemPayload = {
  imie: string;
  email: string;
  potrzeba: string;
  dostarczamy: string[];
  termin: string;
  wiadomosc: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<WynajemPayload>;
  const { imie, email, potrzeba, dostarczamy, termin, wiadomosc } = body;

  if (!imie || !email) {
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

  const dostarczamyList =
    dostarczamy && dostarczamy.length > 0 ? dostarczamy.join(", ") : "—";

  try {
    await transporter.sendMail({
      from: `"LABB Studio — formularz wynajmu" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `Nowe zapytanie wynajmu — ${imie}`,
      text: [
        `Imię: ${imie}`,
        `E-mail: ${email}`,
        `Czego potrzebuje: ${potrzeba ?? "—"}`,
        `Co dostarczamy: ${dostarczamyList}`,
        `Preferowany termin: ${termin || "—"}`,
        `Wiadomość: ${wiadomosc || "—"}`,
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
