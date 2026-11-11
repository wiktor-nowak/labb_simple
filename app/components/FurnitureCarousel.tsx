"use client";

import { Image as IKImage } from "@imagekit/next";
import { useEffect, useRef, useState, type ReactNode } from "react";

type FurnitureCarouselProps = {
  heading: ReactNode;
  photos: string[];
  urlEndpoint?: string;
};

/* Same look as the equipment carousel's arrows; hidden at either end. */
const arrowClass =
  "absolute top-1/2 z-10 flex h-11 w-11 cursor-pointer -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong bg-ink/55 text-paper backdrop-blur-sm transition-[background-color,opacity] hover:bg-ink/80 disabled:pointer-events-none disabled:opacity-0";

/* A native scroll-snap row: arrows step one card, touch and trackpads scroll
   freely. Mobile shows one full-width card; tablet up shows 3. */
export default function FurnitureCarousel({
  heading,
  photos,
  urlEndpoint,
}: FurnitureCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  };

  /* Arrow state depends on how many cards fit, so it is rechecked on resize. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div className="mb-6">{heading}</div>

      <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted">
        Studio to nie tylko światło i tło. Do Twojej dyspozycji mamy także meble
        i rekwizyty. Dzięki nim, łatwo zbudujesz scenę zgodnie z planem,
        zaczynając od minimalistycznego portretu aż po pełną aranżację z
        charakterem. Przejrzyj zdjęcia i zobacz, co możesz wykorzystać podczas
        swojej sesji. Całe wyposażenie jest dostępne w ramach wynajmu.
      </p>

      {/* Arrows sit on the photos' edges, where the eye already is. */}
      <div className="relative">
        <ul
          ref={trackRef}
          onScroll={updateArrows}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((url, index) => (
            <li
              key={url}
              className="w-full shrink-0 snap-start tablet:w-[calc((100%-2rem)/3)]"
            >
              <div className="relative aspect-2/3 overflow-hidden rounded-[14px] border border-line bg-surface">
                <IKImage
                  src={url}
                  urlEndpoint={urlEndpoint}
                  alt={`Meble i akcesoria studia — zdjęcie ${index + 1} z ${photos.length}`}
                  fill
                  sizes="(max-width: 719px) 100vw, 33vw"
                  className="object-cover"
                  transformation={[{ width: 800, quality: 80 }]}
                />
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => step(-1)}
          disabled={!canPrev}
          aria-label="Poprzednie zdjęcie"
          className={`${arrowClass} left-2`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M15 6l-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={!canNext}
          aria-label="Następne zdjęcie"
          className={`${arrowClass} right-2`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M9 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
