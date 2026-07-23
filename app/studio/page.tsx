import Footer from "../components/Footer";
import Header from "../components/Header";
import SpecTable from "../components/SpecTable";
import StudioActions from "../components/StudioActions";
import TechnicalDrawings from "../components/TechnicalDrawings";
import { BASE_EQUIPMENT } from "../lib/equipment";

const SPEC_ROWS = [
  { label: "Pełna powierzchnia wynajmowanego studia", value: "~125 m²" },
  { label: "Światło dzienne", value: "Duże okna (skierowane na południe)" },
  { label: "Zaciemnienie studia", value: "Pełen blackout z wykorzystaniem profesjonalnych zasłon" },
  { label: "Oświetlenie studyjne", value: "Pakiet oświetlenia ciągłego" },
  { label: "Podłoga", value: "Beton pokryty farbą kompozytową" },
];

const DIMENSION_ROWS = [
  { label: "Strefa zdjęciowa", value: "~100 m²" },
  { label: "Wymiary (A) x (B)", value: "~10 m x ~10 m" },
  { label: "Szerokość teł", value: "2,72 m" },
  { label: "Wysokość studia min (X)", value: "3,6 m" },
  { label: "Wysokość studia max (W)", value: "4,2 m" },
  { label: "Do konstrukcji min (Y)", value: "2,9 m" },
  { label: "Do konstrukcji max (Z)", value: "3,4 m" },
];

export default function StudioPage() {
  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 py-16 tablet:px-10 tablet:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          Studio
        </p>
        <h1 className="mt-3 max-w-2xl font-sans text-4xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-5xl">
          Specyfikacja
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Wszystko, co warto wiedzieć, planując u nas sesję zdjęciową lub
          nagranie.
        </p>

        <SpecTable rows={SPEC_ROWS} className="mt-10" />

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Plan studia
        </p>
        <div className="mt-6 grid grid-cols-1 gap-8 desktop:grid-cols-[1fr_320px]">
          <TechnicalDrawings />
          <SpecTable rows={DIMENSION_ROWS} />
        </div>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Wyposażenie w cenie wynajmu
        </p>
        <div className="mt-6 max-w-xl rounded-2xl border border-line bg-surface p-6 tablet:p-8">
          {BASE_EQUIPMENT.map((item, index) => (
            <div
              key={item}
              className={`flex items-center gap-3 py-3 ${
                index < BASE_EQUIPMENT.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
              />
              <span className="font-sans text-paper">{item}</span>
            </div>
          ))}
        </div>

        <StudioActions />
      </main>

      <Footer />
    </div>
  );
}
