"use client";

import { useEffect } from "react";

type PricingDialogProps = {
  open: boolean;
  onClose: () => void;
};

const HOURLY_RATES = [
  { label: "1 h", price: "240 zł" },
  { label: "2 h", price: "300 zł" },
  { label: "3 h", price: "420 zł" },
  { label: "4 h", price: "540 zł" },
  { label: "5 h", price: "660 zł" },
  { label: "6 h", price: "780 zł" },
  { label: "7 h", price: "900 zł" },
  { label: "8 - 12h", price: "1000 zł" },
];

const LIGHTING_EQUIPMENT = [
  "Nanlite Forza 500",
  "Nanlite Forza 300",
  "Mata LED Falcon Eyes RGB x2",
  "Miecz LED Newell RGB Kathi II x2",
  "Softbox 105cm + grid x2",
  "C-stand x2",
  "Statyw Manfrotto lekki x2",
];

export default function PricingDialog({ open, onClose }: PricingDialogProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricing-dialog-title"
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl border border-line bg-surface p-6 sm:h-[88vh] sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5 sm:right-6 sm:top-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          Cennik
        </p>
        <h2
          id="pricing-dialog-title"
          className="mt-2 max-w-2xl font-sans text-3xl leading-[1.1] tracking-[-0.01em] text-paper sm:text-4xl"
        >
          Cennik wynajmu studia
        </h2>

        <div className="mt-10 grid flex-1 grid-cols-1 gap-10 tablet:grid-cols-2 tablet:gap-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Stawki godzinowe
            </p>
            <div className="mt-4 border-t border-line">
              {HOURLY_RATES.map((rate) => (
                <div
                  key={rate.label}
                  className="flex items-center justify-between border-b border-line py-3"
                >
                  <span className="font-sans text-paper">{rate.label}</span>
                  <span className="font-mono text-paper">{rate.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Od drugiej godziny każda kolejna + 120 zł.
              <br/>
              8 h i więcej to stawka całodniowa - 1000 zł.
              <br/>
              (taniej niż liczone po godzinie)
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Oświetlenie w cenie wynajmu
            </p>
            <div className="mt-4 border-t border-line">
              {LIGHTING_EQUIPMENT.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-line py-3"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                  />
                  <span className="font-sans text-paper">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Warunki rezerwacji
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Minimalna rezerwacja: 1 h
              <br/>
              Bezpłatne odwołanie do 24 h przed terminem.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            className="inline-flex items-center rounded-[7px] bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90 cursor-pointer"
            onClick={() => {
              console.log("xxx");
            }}
          >
            Zarezerwuj
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-[7px] border border-line-strong px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-white/5 cursor-pointer"
            onClick={() => {
              window.location.href = "https://filmbeast.pl/index.php/uslugi/#naszarsenal";
            }}
          >
            Zobacz pełną listę sprzętu
          </button>
        </div>
      </div>
    </div>
  );
}
