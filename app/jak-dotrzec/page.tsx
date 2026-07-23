import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LocationMap from "../components/LocationMap";
import SpecTable from "../components/SpecTable";
import { STUDIO_ADDRESS } from "../lib/contact";

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
          Studio znajduje się w centrum Bielska-Białej. Poniżej trasa dojazdu
          oraz mapa z dokładną lokalizacją.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 tablet:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 tablet:p-8">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src="/schemes/way_to_studio_labb.png"
                alt="Trasa dojazdu do studia"
                fill
                className="object-cover"
              />
            </div>
            <SpecTable rows={[{ label: "Adres studia", value: STUDIO_ADDRESS }]} />
          </div>

          <LocationMap address={STUDIO_ADDRESS} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
