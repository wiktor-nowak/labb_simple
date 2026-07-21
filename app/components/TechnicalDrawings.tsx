"use client";

import { useState } from "react";

/* Placeholder labels — swapped for real technical drawings later. */
const DRAWINGS = [
  "Rzut poziomy studia",
  "Przekrój — wysokość trussu",
  "Układ blackout i okien",
];

export default function TechnicalDrawings() {
  const [index, setIndex] = useState(0);

  const goDelta = (delta: number) => {
    setIndex((current) => (current + delta + DRAWINGS.length) % DRAWINGS.length);
  };

  return (
    <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface/40 sm:aspect-video">
      <button
        type="button"
        onClick={() => goDelta(-1)}
        aria-label="Poprzedni rysunek"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="px-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Rysunek techniczny {index + 1} / {DRAWINGS.length}
        </p>
        <p className="mt-2 font-sans text-lg text-muted">{DRAWINGS[index]}</p>
      </div>

      <button
        type="button"
        onClick={() => goDelta(1)}
        aria-label="Następny rysunek"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
