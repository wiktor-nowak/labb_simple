import Footer from "../components/Footer";
import Header from "../components/Header";
import WynajemForm from "../components/WynajemForm";
import WynajemInfoPanel from "../components/WynajemInfoPanel";

export default function WynajemPage() {
  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 py-16 tablet:px-10 tablet:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          Wynajem
        </p>
        <h1 className="mt-3 max-w-full font-sans text-3xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-5xl">
          Napisz, co chcesz zrealizować
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Wynająć przestrzeń, dobrać sprzęt albo zlecić nam realizację wideo?
          Napisz — odpowiadamy w ciągu 24 godzin.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 desktop:grid-cols-[3fr_2fr]">
          <WynajemForm />
          <WynajemInfoPanel />
        </div>
      </main>

      <Footer />
    </div>
  );
}
