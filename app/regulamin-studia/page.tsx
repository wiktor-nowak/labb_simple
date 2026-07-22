import LegalPageLayout from "../components/LegalPageLayout";

const SECTIONS = [
  {
    heading: "Zasady korzystania ze studia",
    body: [
      "Przestrzeń studyjna udostępniana jest wyłącznie w ramach potwierdzonej rezerwacji.",
      "Liczba osób obecnych podczas sesji powinna być zgodna z ustaleniami dokonanymi przy rezerwacji.",
    ],
  },
  {
    heading: "Sprzęt i wyposażenie",
    body: [
      "Sprzęt podstawowy dostępny jest w cenie wynajmu — szczegółowa lista znajduje się w zakładce Studio.",
      "Korzystanie z dodatkowego sprzętu wymaga wcześniejszego zgłoszenia i może wiązać się z dodatkową opłatą.",
    ],
  },
  {
    heading: "Bezpieczeństwo",
    body: [
      "Na terenie studia obowiązuje zakaz palenia oraz spożywania alkoholu bez wcześniejszej zgody obsługi.",
      "Wszelkie sytuacje zagrażające bezpieczeństwu należy zgłaszać obsłudze studia natychmiast.",
    ],
  },
  {
    heading: "Porządek i sprzątanie",
    body: [
      "Studio należy pozostawić w stanie, w jakim zostało zastane — dotyczy to również ustawienia sprzętu i scenografii.",
      "W przypadku większego nieporządku studio zastrzega sobie prawo do naliczenia dodatkowej opłaty porządkowej.",
    ],
  },
  {
    heading: "Zakazy",
    body: [
      "Zabronione jest wnoszenie substancji i materiałów mogących uszkodzić powierzchnie studia (np. otwarty ogień, konfetti, farby bez zabezpieczenia podłoża).",
      "Wszelkie odstępstwa wymagają wcześniejszej pisemnej zgody obsługi studia.",
    ],
  },
];

export default function RegulaminStudiaPage() {
  return (
    <LegalPageLayout
      eyebrow="Regulamin"
      title="Regulamin studia"
      sections={SECTIONS}
    />
  );
}
