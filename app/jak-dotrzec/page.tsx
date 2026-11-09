import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LocationMap from "../components/LocationMap";
import RouteMedia from "../components/RouteMedia";
import SpecTable from "../components/SpecTable";
import { STUDIO_ADDRESS } from "../lib/contact";

export const metadata: Metadata = {
  title: "Jak dotrzeć",
  description:
    "Trasa dojazdu i mapa do LABB Studio, 1 Maja 24, 43-300 Bielsko-Biała.",
  alternates: { canonical: "/jak-dotrzec" },
};

export default function JakDotrzecPage() {
  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 py-16 tablet:px-10 tablet:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          Jak dotrzeć
        </p>
        <h1 className="mt-3 max-w-2xl font-sans text-4xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-5xl">
          Znajdź nas
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Studio znajduje się w centrum Bielska-Białej. Poniżej film z drogą do
          drzwi studia, trasa dojazdu oraz mapa z dokładną lokalizacją.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 tablet:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-2">
            <RouteMedia />
            <SpecTable
              rows={[{ label: "Adres studia", value: STUDIO_ADDRESS }]}
              className="mx-4 mb-4"
            />
          </div>

          <LocationMap address={STUDIO_ADDRESS} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
