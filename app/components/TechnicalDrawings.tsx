"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DRAWINGS = [
  { src: "/schemes/schemat_gora.png", name: "Rzut poziomy studia" },
  { src: "/schemes/schemat_przekroj.png", name: "Przekrój - wysokość studia" },
];

export default function TechnicalDrawings() {
  const [index, setIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const goDelta = (delta: number) => {
    setIndex((current) => (current + delta + DRAWINGS.length) % DRAWINGS.length);
  };

  useEffect(() => {
    if (!previewOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewOpen]);

  return (
    <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-white tablet:aspect-video overflow-hidden">
      <button
        type="button"
        onClick={() => goDelta(-1)}
        aria-label="Poprzedni rysunek"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[7px] border border-line text-ink transition-colors hover:bg-ink/5"
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

      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        aria-label="Powiększ rysunek techniczny"
        className="group relative h-full w-full cursor-zoom-in p-10 tablet:p-14"
      >
        <Image
          src={DRAWINGS[index].src}
          alt={DRAWINGS[index].name}
          fill
          sizes="(max-width: 820px) 100vw, 60vw"
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5L21 21" strokeLinecap="round" />
              <path d="M10.5 8v5M8 10.5h5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </button>

      <div className="pointer-events-none absolute bottom-4 right-4 text-right">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
          Rysunek techniczny {index + 1} / {DRAWINGS.length}
        </p>
        <p className="mt-2 font-sans text-lg text-ink">{DRAWINGS[index].name}</p>
      </div>

      <button
        type="button"
        onClick={() => goDelta(1)}
        aria-label="Następny rysunek"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[7px] border border-line text-ink transition-colors hover:bg-ink/5"
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

      {previewOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm tablet:p-10"
            onClick={() => setPreviewOpen(false)}
          >
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              aria-label="Zamknij"
              className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5 tablet:right-6 tablet:top-6"
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

            <div
              className="relative h-[90vh] w-full max-w-6xl rounded-2xl border border-line bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={DRAWINGS[index].src}
                alt={DRAWINGS[index].name}
                fill
                sizes="95vw"
                className="object-contain p-6 tablet:p-10"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
