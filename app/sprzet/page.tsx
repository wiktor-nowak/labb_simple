import type { Metadata } from "next";
import EquipmentCarousel, {
  type EquipmentSlide,
} from "../components/EquipmentCarousel";
import Footer from "../components/Footer";
import FurnitureCarousel from "../components/FurnitureCarousel";
import Header from "../components/Header";
import StudioActions from "../components/StudioActions";
import {
  EQUIPMENT_CUTOUTS_FOLDER,
  FURNITURE_PHOTOS_FOLDER,
  FULL_EQUIPMENT_LIST_URL,
  INCLUDED_EQUIPMENT,
} from "../lib/equipment";
import { getFolderImages } from "../lib/imagekit";

export const metadata: Metadata = {
  title: "Sprzęt — oświetlenie i wyposażenie studia",
  description:
    "Lampy Nanlite Forza, mata LED, miecze RGB, softboxy i statywy — zobacz sprzęt dostępny w cenie wynajmu studia LABB.",
  alternates: { canonical: "/sprzet" },
};

/* "…/LABB/labb_equipment/forza_500.png?updatedAt=…" → "forza_500.png" */
function fileName(url: string) {
  return new URL(url).pathname.split("/").pop() ?? "";
}

export default async function SprzetPage() {
  const [images, furniturePhotos] = await Promise.all([
    getFolderImages(EQUIPMENT_CUTOUTS_FOLDER).catch((error) => {
      console.error("Failed to load ImageKit equipment images:", error);
      return [];
    }),
    getFolderImages(FURNITURE_PHOTOS_FOLDER)
      .then((urls) =>
        urls.sort((a, b) => fileName(a).localeCompare(fileName(b))),
      )
      .catch((error) => {
        console.error("Failed to load ImageKit furniture photos:", error);
        return [];
      }),
  ]);

  /* An item without an uploaded Cutout is skipped rather than shown empty. */
  const slides: EquipmentSlide[] = INCLUDED_EQUIPMENT.flatMap((item) => {
    const cutoutUrl = images.find((url) => fileName(url) === item.cutoutFile);
    return cutoutUrl ? [{ item, cutoutUrl }] : [];
  });

  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-300 px-6 py-16 tablet:px-10 tablet:py-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
            Sprzęt
          </p>
          <h1 className="mt-3 font-sans text-4xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-5xl">
            Wyposażenie studia
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Oddajemy do Waszej dyspozycji pakiet oświetleniowy w cenie wynajmu przestrzeni.
            Studio jest także wyposażone w meble, oraz ciekawe rekwizyty pozwalające na przygotowanie sceny dla różnorodnych realizacji.
          </p>
        </div>

        <h2 className="mt-5 font-sans text-2xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-3xl tablet:mt-10 mb-4">
          Oświetlenie
        </h2>
          <p className="mb-10 text-base leading-relaxed text-muted">
            W cenie wynajmu studia dostajesz podstawowy pakiet oświetlenia: poniżej przedstawione lampy wraz ze statywami i modyfikatorami. To zestaw, który wystarczy na większość sesji portretowych, produktowych i wizerunkowych, czy mniej wymagające nagrania. Nie musisz więc wozić ze sobą sprzętu ani martwić się, że czegoś zabraknie. Przychodzisz, rozstawiasz światło po swojemu i uruchamiasz kreatywność.
          </p>
        <div>
          {slides.length > 0 ? (
            <EquipmentCarousel
              slides={slides}
              urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}
            />
          ) : (
            <div className="halftone-quiet flex aspect-video max-w-xl items-center justify-center rounded-[14px] border border-line bg-surface">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Zdjęcia tego przedmiotu zaktualizujemy wkrótce
              </p>
            </div>
          )}
        </div>

        <h2 className="mt-8 font-sans text-2xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-3xl tablet:mt-16 mb-4">
          Potrzebujesz więcej? Mamy to na miejscu
        </h2>
        <div className="flex flex-col items-start gap-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="mt-4 text-base leading-relaxed text-muted">
            Jeśli Twój projekt wymaga bardziej rozbudowanego setupu, możesz za dodatkową opłatą wypożyczyć sprzęt z naszego magazynu. Jak to działa? Sprzęt najlepiej zarezerwować razem ze studiem, wtedy masz pewność, że wszystko będzie gotowe na Twój przyjazd. Jeśli w trakcie sesji okaże się, że potrzebujesz czegoś jeszcze, po prostu daj nam znać. Chętnie pomożemy!
          </p>
          <a
            href={FULL_EQUIPMENT_LIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-[7px] border border-line-strong px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-white/5"
          >
            Zobacz pełną listę sprzętu
          </a>
        </div>

        {furniturePhotos.length > 0 && (
          <section aria-labelledby="meble-i-akcesoria" className="mt-24">
            <FurnitureCarousel
              heading={
                <>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
                    Wyposażenie
                  </p>
                  <h2
                    id="meble-i-akcesoria"
                    className="mt-3 font-sans text-3xl leading-tight text-paper tablet:text-4xl"
                  >
                    Meble i akcesoria
                  </h2>
                </>
              }
              photos={furniturePhotos}
              urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}
            />
          </section>
        )}

        <StudioActions showEquipmentList={false} />
      </main>

      <Footer />
    </div>
  );
}
