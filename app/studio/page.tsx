import Footer from "../components/Footer";
import Header from "../components/Header";
import SpecTable from "../components/SpecTable";
import StudioActions from "../components/StudioActions";
import TechnicalDrawings from "../components/TechnicalDrawings";

const SPEC_ROWS = [
  { label: "Powierzchnia", value: "115 m²" },
  { label: "Wysokość", value: "3,2 m" },
  { label: "Krata sufitowa", value: "Truss — podwieszenie na całej powierzchni" },
  { label: "Podłoga", value: "Beton" },
  { label: "Światło dzienne", value: "Duże okna (południe) + pełny blackout" },
];

const DIMENSION_ROWS = [
  { label: "Strefa zdjęciowa", value: "~80 m²" },
  { label: "Wysokość trussu", value: "3,2 m" },
  { label: "Szerokość tła", value: "5 m" },
  { label: "Głębokość tła", value: "4 m" },
];

export default function StudioPage() {
  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          Studio
        </p>
        <h1 className="mt-3 max-w-2xl font-sans text-4xl leading-[1.05] tracking-[-0.01em] text-paper sm:text-5xl">
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
        <div className="mt-6 grid grid-cols-1 gap-8 tablet:grid-cols-[1fr_320px]">
          <TechnicalDrawings />
          <SpecTable rows={DIMENSION_ROWS} />
        </div>

        <StudioActions />
      </main>

      <Footer />
    </div>
  );
}
