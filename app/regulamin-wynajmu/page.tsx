import LegalPageLayout from "../components/LegalPageLayout";

const SECTIONS = [
  {
    heading: "Rezerwacje",
    body: [
      "Rezerwacji terminu dokonuje się poprzez formularz kontaktowy lub bezpośrednio telefonicznie. Rezerwacja jest potwierdzona po otrzymaniu zadatku.",
      "Minimalny czas najmu wynosi 1 godzinę. Szczegółowy cennik znajduje się w zakładce Cennik.",
    ],
  },
  {
    heading: "Płatności",
    body: [
      "Płatność za najem odbywa się przed rozpoczęciem sesji lub bezpośrednio po jej zakończeniu, zgodnie z ustaleniami.",
      "Akceptujemy płatności przelewem oraz kartą na miejscu.",
    ],
  },
  {
    heading: "Odwołania",
    body: [
      "Bezpłatne odwołanie rezerwacji możliwe jest do 24 godzin przed planowanym terminem.",
      "Odwołania w terminie krótszym mogą wiązać się z częściową opłatą — szczegóły ustalane są indywidualnie.",
    ],
  },
  {
    heading: "Kaucja",
    body: [
      "W przypadku wynajmu dodatkowego sprzętu studio może pobrać kaucję zwrotną.",
      "Wysokość kaucji ustalana jest w zależności od zakresu wynajmowanego wyposażenia.",
    ],
  },
  {
    heading: "Odpowiedzialność",
    body: [
      "Najemca odpowiada za powierzone mienie oraz sprzęt studyjny na czas trwania rezerwacji.",
      "Wszelkie usterki i uszkodzenia należy zgłaszać niezwłocznie obsłudze studia.",
    ],
  },
  {
    heading: "Nadgodziny",
    body: [
      "Przedłużenie sesji poza zarezerwowany czas możliwe jest wyłącznie za zgodą obsługi studia i wiąże się z dodatkową opłatą naliczaną wg stawki godzinowej.",
    ],
  },
];

export default function RegulaminWynajmuPage() {
  return (
    <LegalPageLayout
      eyebrow="Regulamin"
      title="Regulamin wynajmu studia"
      sections={SECTIONS}
    />
  );
}
