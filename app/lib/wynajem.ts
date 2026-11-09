/* Shared by the booking form and the email it sends, so both use one wording. */

export const POTRZEBY_OPTIONS = ["Wynajem studia", "Wynajem sprzętu"];

export const DOSTARCZAMY_OPTIONS = [
  { label: "Obsługa fotograficzna/operatorska rezerwacji", value: "nagrywka" },
  { label: "Scenografia pod zamówienie", value: "scenografia" },
  { label: "Przeszkolony oświetleniowiec", value: "gafer" },
];

export type WynajemPayload = {
  imie: string;
  email: string;
  telefon: string;
  zgodaTelefon: boolean;
  potrzeba: string;
  dostarczamy: string[];
  termin: string;
  wiadomosc: string;
};

/*
 * A phone number is either 9 digits (Polish, no prefix) or "+", a country
 * code and the number: 8–15 digits in total, the international (E.164) limit.
 * Spaces are allowed after the first character, for readability.
 */
export const PHONE_ERROR =
  "Podaj 9-cyfrowy numer lub numer z kierunkowym kraju zaczynający się od +.";

/* Strips anything a phone number can't contain, as the visitor types. */
export function sanitizePhoneInput(value: string) {
  const trimmed = value.trimStart();
  const plus = trimmed.startsWith("+") ? "+" : "";
  return (plus + trimmed.replace(/[^\d ]/g, ""))
    .replace(/^(\+?) +/, "$1")
    .replace(/ {2,}/g, " ");
}

export function isValidPhone(value: string) {
  const phone = value.trim();
  if (!/^\+?\d[\d ]*$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return phone.startsWith("+")
    ? digits.length >= 8 && digits.length <= 15 && !digits.startsWith("0")
    : digits.length === 9;
}
