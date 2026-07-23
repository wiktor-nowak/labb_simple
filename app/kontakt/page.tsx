import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LocationMap from "../components/LocationMap";
import SpecTable from "../components/SpecTable";
import {
  CONTACT_EMAIL,
  STUDIO_ADDRESS,
  STUDIO_NIP,
  STUDIO_PHONE,
  STUDIO_REGON,
} from "../lib/contact";

export default function KontaktPage() {
  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 py-16 tablet:px-10 tablet:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          Kontakt
        </p>
        <h1 className="mt-3 max-w-2xl font-sans text-4xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-5xl">
          Napisz albo wpadnij
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Dane kontaktowe i rejestrowe studia.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 tablet:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 tablet:p-8">
            <SpecTable
              rows={[
                { label: "Adres", value: STUDIO_ADDRESS },
                { label: "Telefon", value: STUDIO_PHONE },
                { label: "E-mail", value: CONTACT_EMAIL },
              ]}
              showEdges={false}
            />

            <div className="flex items-center justify-center gap-2 py-1">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint mr-2">
                Wynajem powered by
              </span>
              <Image
                src="/images/filmbeast-yellow.webp"
                alt="Filmbeast"
                width={500}
                height={180}
                className="h-8 w-auto object-contain"
              />
            </div>

            <SpecTable
              rows={[
                { label: "NIP", value: STUDIO_NIP },
                { label: "REGON", value: STUDIO_REGON },
              ]}
              showEdges={false}
            />
          </div>

          <LocationMap address={STUDIO_ADDRESS} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
