"use client";

import Image from "next/image";
import { useState } from "react";

const DRAWINGS = [
  { src: "/schemes/schemat_gora.png", name: "Rzut poziomy studia" },
  { src: "/schemes/schemat_przekroj.png", name: "Przekrój - wysokość studia" },
];

export default function TechnicalDrawings() {
  const [index, setIndex] = useState(0);

  const goDelta = (delta: number) => {
    setIndex((current) => (current + delta + DRAWINGS.length) % DRAWINGS.length);
  };

  return (
    <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-white tablet:aspect-video overflow-hidden">
      <button
        type="button"
        onClick={() => goDelta(-1)}
        aria-label="Poprzedni rysunek"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[7px] border border-line text-ink transition-colors hover:bg-ink/5"
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

      <div className="relative h-full w-full p-10 tablet:p-14">
        <Image
          src={DRAWINGS[index].src}
          alt={DRAWINGS[index].name}
          fill
          sizes="(max-width: 820px) 100vw, 60vw"
          className="object-contain"
        />
      </div>

      <div className="absolute bottom-4 right-4 text-right">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
          Rysunek techniczny {index + 1} / {DRAWINGS.length}
        </p>
        <p className="mt-2 font-sans text-lg text-ink">{DRAWINGS[index].name}</p>
      </div>

      <button
        type="button"
        onClick={() => goDelta(1)}
        aria-label="Następny rysunek"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[7px] border border-line text-ink transition-colors hover:bg-ink/5"
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
