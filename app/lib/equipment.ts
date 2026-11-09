export type EquipmentParameter = { label: string; value: string };

export type EquipmentItem = {
  /* File name of the item's Cutout in the ImageKit equipment folder. */
  cutoutFile: string;
  brand: string;
  model: string;
  /* Short name used in the /studio list and the pricing dialog. */
  listName: string;
  type: string;
  quantity: number;
  description: string;
  /* Differs per item; leave out anything not confirmed for the studio's unit. */
  parameters: EquipmentParameter[];
};

export const EQUIPMENT_CUTOUTS_FOLDER = "LABB/labb_equipment";
export const FURNITURE_PHOTOS_FOLDER = "LABB/labb_furniture";
export const FULL_EQUIPMENT_LIST_URL =
  "https://filmbeast.pl/index.php/uslugi/#naszarsenal";

/* Source of truth for Included Equipment. Carousel order follows this list. */
export const INCLUDED_EQUIPMENT: EquipmentItem[] = [
  {
    cutoutFile: "forza_500.png",
    brand: "Nanlite",
    model: "Forza 500",
    listName: "Nanlite Forza 500",
    type: "Lampa LED światła ciągłego",
    quantity: 1,
    description:
      "Najmocniejsza lampa w standardowym pakiecie. Wystarczająca jako światło główne w kreowaniu podstawowych scen.",
    parameters: [
      { label: "Moc", value: "500 W" },
      { label: "Temperatura barwowa", value: "5600 K" },
      { label: "CRI", value: "98" },
      { label: "TLCI", value: "95" },
      { label: "Regulacja mocy", value: "0,1%" },
      { label: "Mocowanie", value: "Bowens" },
    ],
  },
  {
    cutoutFile: "forza_300.png",
    brand: "Nanlite",
    model: "Forza 300",
    listName: "Nanlite Forza 300",
    type: "Lampa LED światła ciągłego",
    quantity: 1,
    description:
      "Druga lampa ciągła w zestawie. Sprawdza się jako światło główne lub wypełniające, także z softboxem.",
    parameters: [
      { label: "Moc", value: "300 W" },
      { label: "Temperatura barwowa", value: "5600 K" },
      { label: "CRI", value: "98" },
      { label: "TLCI", value: "95" },
      { label: "Regulacja mocy", value: "1%" },
      { label: "Mocowanie", value: "Bowens" },
    ],
  },
  {
    cutoutFile: "softbox.png",
    brand: "Phottix",
    model: "Raja 105",
    listName: "Softbox 105cm + grid",
    type: "Softbox",
    quantity: 2,
    description:
      "Szybko rozkładany softbox zmiękczający światło. Grid w zestawie z modyfikatorem.",
    parameters: [
      { label: "Średnica", value: "105 cm" },
      { label: "Mocowanie", value: "Bowens" },
      { label: "W zestawie", value: "Grid, dyfuzor" },
    ],
  },
  {
    cutoutFile: "falcon.png",
    brand: "Falcon Eyes",
    model: "RX-18TDX III-K1",
    listName: "Mata LED Falcon Eyes",
    type: "Elastyczna mata LED bi-color",
    quantity: 1,
    description:
      "Elastyczny panel LED z regulacją temperatury barwowej. Na statywie z wysięgnikiem.",
    parameters: [
      { label: "Moc", value: "130 W" },
      { label: "Temperatura barwowa", value: "3000–5600 K" },
      { label: "CRI", value: "95+" },
      { label: "Wymiary", value: "62 × 47 cm" },
      { label: "Regulacja mocy", value: "Płynna" },
      { label: "W zestawie", value: "Softbox, grid" },
    ],
  },
  {
    cutoutFile: "kathi.png",
    brand: "Newell",
    model: "RGB Kathi II",
    listName: "Miecz LED Newell RGB Kathi II",
    type: "Miecz LED RGB",
    quantity: 2,
    description:
      "Para mieczy LED przydatna przy uzyskiwaniu kolorowych akcentów na tle.",
    parameters: [
      { label: "Moc", value: "8 W" },
      { label: "Kolor", value: "RGB" },
      { label: "Temperatura barwowa", value: "2500–9000 K" },
      { label: "Zasilanie", value: "Wbudowany akumulator" },
    ],
  },
  {
    cutoutFile: "c-stand.png",
    brand: "Manfrotto",
    model: "C-stand",
    listName: "C-stand",
    type: "Statyw studyjny",
    quantity: 2,
    description:
      "Stabilny statyw do cięższych lamp i dużych modyfikatorów.",
    parameters: [
      { label: "Waga", value: "7,2 kg" },
      { label: "Udźwig", value: "10 kg" },
      { label: "Wysokość maks.", value: "300cm" },
      { label: "Liczba sekcji", value: "3" },
    ],
  },
  {
    cutoutFile: "manfrotto.png",
    brand: "Manfrotto",
    model: "1004BAC",
    listName: "Statyw Manfrotto lekki",
    type: "Statyw oświetleniowy",
    quantity: 3,
    description:
      "Zestaw trzech lekkich statywów z amortyzacją powietrzną, łatwy do przestawiania po planie.",
    parameters: [
      { label: "Wysokość maks.", value: "366 cm" },
      { label: "Udźwig", value: "7 kg" },
      { label: "Liczba sekcji", value: "4" },
    ],
  },
];

export const INCLUDED_EQUIPMENT_LABELS = INCLUDED_EQUIPMENT.map(
  ({ listName, quantity }) =>
    quantity > 1 ? `${listName} x${quantity}` : listName,
);
