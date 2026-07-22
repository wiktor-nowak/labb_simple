"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  imie: string;
  email: string;
  potrzeba: string;
  termin: string;
  wiadomosc: string;
};

const INITIAL_STATE: FormState = {
  imie: "",
  email: "",
  potrzeba: "Wynajem studia",
  termin: "",
  wiadomosc: "",
};

const POTRZEBY_OPTIONS = [
  "Wynajem studia",
  "Wynajem sprzętu",
  "Realizacja wideo",
  "Inne",
];

const fieldClass =
  "w-full rounded-[7px] border border-line bg-[#0F0F0F] px-4 py-3 text-paper placeholder:text-faint focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30";
const labelClass = "font-mono text-xs uppercase tracking-[0.2em] text-faint";

export default function WynajemForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Gathered here for now; will POST to the email-sending API route later.
    console.log("Zapytanie wynajmu:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="imie" className={labelClass}>
          Imię
        </label>
        <input
          id="imie"
          type="text"
          required
          value={form.imie}
          onChange={(event) => update("imie", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClass}>
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="potrzeba" className={labelClass}>
          Czego potrzebujesz?
        </label>
        <div className="relative">
          <select
            id="potrzeba"
            value={form.potrzeba}
            onChange={(event) => update("potrzeba", event.target.value)}
            className={`${fieldClass} appearance-none pr-10`}
          >
            {POTRZEBY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="termin" className={labelClass}>
          Preferowany termin
        </label>
        <input
          id="termin"
          type="date"
          value={form.termin}
          onChange={(event) => update("termin", event.target.value)}
          className={`${fieldClass} scheme-dark`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="wiadomosc" className={labelClass}>
          Wiadomość
        </label>
        <textarea
          id="wiadomosc"
          rows={5}
          value={form.wiadomosc}
          onChange={(event) => update("wiadomosc", event.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex self-start items-center justify-center rounded-[7px] bg-signal px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90"
      >
        Wyślij zapytanie
      </button>
    </form>
  );
}
