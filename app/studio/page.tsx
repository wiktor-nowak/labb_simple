import Footer from "../components/Footer";
import Header from "../components/Header";
import SpecTable from "../components/SpecTable";
import StudioActions from "../components/StudioActions";
import TechnicalDrawings from "../components/TechnicalDrawings";

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

        <StudioActions />
      </main>

      <Footer />
    </div>
  );
}
