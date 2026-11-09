"use client";

import { useState, type FormEvent } from "react";
import {
  DOSTARCZAMY_OPTIONS,
  isValidPhone,
  PHONE_ERROR,
  POTRZEBY_OPTIONS,
  sanitizePhoneInput,
  type WynajemPayload,
} from "../lib/wynajem";

type FormState = WynajemPayload;

const INITIAL_STATE: FormState = {
  imie: "",
  email: "",
  telefon: "",
  zgodaTelefon: true,
  potrzeba: "Wynajem studia",
  dostarczamy: [],
  termin: "",
  wiadomosc: "",
};

const PHONE_TOOLTIP =
  "W przypadku braku zgody na kontakt telefoniczny, będziemy kontaktować się przy użyciu WhatsApp.";

const fieldClass =
  "w-full rounded-[7px] border border-line bg-[#0F0F0F] px-4 py-3 text-paper placeholder:text-faint focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30";
const labelClass = "font-mono text-xs uppercase tracking-[0.2em] text-faint";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function WynajemForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const toggleDostarczamy = (value: string) => {
    setForm((previous) => ({
      ...previous,
      dostarczamy: previous.dostarczamy.includes(value)
        ? previous.dostarczamy.filter((item) => item !== value)
        : [...previous.dostarczamy, value],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/wynajem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Wysyłka nie powiodła się.");

      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (error) {
      console.error("Błąd wysyłki formularza wynajmu:", error);
      setStatus("error");
    }
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
        <label htmlFor="telefon" className={labelClass}>
          Telefon
        </label>
        <input
          id="telefon"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          maxLength={24}
          value={form.telefon}
          onChange={(event) => {
            const value = sanitizePhoneInput(event.target.value);
            update("telefon", value);
            event.target.setCustomValidity(
              value && !isValidPhone(value) ? PHONE_ERROR : "",
            );
          }}
          onInvalid={(event) => {
            if (event.currentTarget.validity.valueMissing) {
              event.currentTarget.setCustomValidity("Podaj numer telefonu.");
            }
          }}
          className={fieldClass}
        />
        <div className="flex items-center gap-2">
          <label
            htmlFor="zgodaTelefon"
            className="flex cursor-pointer items-center gap-3 text-sm text-paper"
          >
            <input
              id="zgodaTelefon"
              type="checkbox"
              checked={form.zgodaTelefon}
              onChange={(event) => update("zgodaTelefon", event.target.checked)}
              className="h-4 w-4 cursor-pointer accent-signal"
            />
            Zezwalam na kontakt telefoniczny
          </label>
          {/* Hover on desktop, tap (focus) on touch screens. */}
          <span className="group relative inline-flex">
            <button
              type="button"
              aria-label="Więcej informacji"
              aria-describedby="zgodaTelefon-tooltip"
              className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full text-faint transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline-none"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5" strokeLinecap="round" />
                <circle cx="12" cy="8" r="0.6" fill="currentColor" />
              </svg>
            </button>
            <span
              id="zgodaTelefon-tooltip"
              role="tooltip"
              className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-[7px] border border-line-strong bg-surface px-3 py-2 text-xs leading-relaxed text-muted opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              {PHONE_TOOLTIP}
            </span>
          </span>
        </div>
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
        <span className={labelClass}>Co dostarczamy?</span>
        <div className="flex flex-col gap-2">
          {DOSTARCZAMY_OPTIONS.map((option) => (
            <label
              key={option.value}
              htmlFor={`dostarczamy-${option.value}`}
              className="flex cursor-pointer items-center gap-3 rounded-[7px] border border-line bg-[#0F0F0F] px-4 py-3 text-paper"
            >
              <input
                id={`dostarczamy-${option.value}`}
                type="checkbox"
                checked={form.dostarczamy.includes(option.value)}
                onChange={() => toggleDostarczamy(option.value)}
                className="h-4 w-4 cursor-pointer accent-signal"
              />
              <span className="font-sans">{option.label}</span>
            </label>
          ))}
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
        disabled={status === "sending"}
        className="mt-2 inline-flex cursor-pointer self-start items-center justify-center rounded-[7px] bg-signal px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Wysyłanie…" : "Wyślij zapytanie"}
      </button>

      {status === "success" && (
        <p className="text-sm text-signal">
          Dziękujemy! Zapytanie zostało wysłane — odezwiemy się wkrótce.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-muted">
          Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na
          labbspace@gmail.com.
        </p>
      )}
    </form>
  );
}
