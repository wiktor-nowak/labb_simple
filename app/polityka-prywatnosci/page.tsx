import type { Metadata } from "next";
import LegalPageLayout from "../components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Jakie dane zbiera LABB Studio i w jakim celu je przetwarza.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "Jakie dane zbieramy",
    body: [
      "Za pośrednictwem formularza kontaktowego zbieramy imię, numer telefonu oraz adres e-mail, a także treść wiadomości.",
      "Nie zbieramy danych, które nie są niezbędne do obsługi zapytania lub rezerwacji.",
    ],
  },
  {
    heading: "Cel przetwarzania danych",
    body: [
      "Dane wykorzystywane są wyłącznie w celu obsługi zapytań, przygotowania oferty oraz realizacji rezerwacji studia.",
    ],
  },
  {
    heading: "Podstawa prawna",
    body: [
      "Przetwarzanie danych odbywa się na podstawie zgody wyrażonej podczas wysyłania formularza, zgodnie z obowiązującymi przepisami o ochronie danych osobowych.",
    ],
  },
  {
    heading: "Okres przechowywania",
    body: [
      "Dane przechowywane są przez okres niezbędny do realizacji zapytania lub rezerwacji, a następnie usuwane lub anonimizowane.",
    ],
  },
  {
    heading: "Kontakt w sprawie danych",
    body: [
      "W sprawie dostępu, poprawy lub usunięcia swoich danych osobowych prosimy o kontakt poprzez formularz dostępny w zakładce Kontakt.",
    ],
  },
];

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalPageLayout
      eyebrow="Prywatność"
      title="Polityka prywatności"
      sections={SECTIONS}
    />
  );
}
