"use client";

import { Image as IKImage } from "@imagekit/next";
import { useCallback, useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";
import PricingDialog from "./PricingDialog";

const AUTOPLAY_MS = 5000;

/* Placeholder "photo" tones — used only if no ImageKit images are available. */
const FALLBACK_COLORS = [
  "#6B5B63",
  "#4B5A50",
  "#3A4750",
  "#5C4A3F",
  "#2B2B2E",
];

type Slide = { id: string; url?: string; color?: string };

type HeroProps = {
  images?: string[];
  urlEndpoint?: string;
};

export default function Hero({ images = [], urlEndpoint }: HeroProps) {
  const slides: Slide[] =
    images.length > 0
      ? images.map((url) => ({ id: url, url }))
      : FALLBACK_COLORS.map((color, index) => ({
          id: `placeholder-${index}`,
          color,
        }));

  const [active, setActive] = useState(0);
  const [pricingOpen, setPricingOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [slides.length]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const goTo = (index: number) => {
    setActive(index);
    startAutoplay();
  };

  const goDelta = (delta: number) => {
    goTo((active + delta + slides.length) % slides.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* background carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== active}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: index === active ? 1 : 0 }}
          >
            <div
              key={`${slide.id}-${active}`}
              className="hero-pan relative h-full w-full"
              style={{
                backgroundColor: slide.color,
                animationDuration: `${AUTOPLAY_MS}ms`,
              }}
            >
              {slide.url && (
                <IKImage
                  src={slide.url}
                  urlEndpoint={urlEndpoint}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                  transformation={[{ width: 1920, quality: 70 }]}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* flat scrim for text legibility over the colour "photos" */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" />

      {/* content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col items-center justify-center px-6 tablet:px-10 desktop:grid desktop:grid-cols-2">
        <div aria-hidden className="hidden desktop:block" />

        <div className="relative flex max-w-lg flex-col items-start gap-4 rounded-2xl border border-line bg-ink/55 px-5 pb-5 pt-24 backdrop-blur-sm tablet:pt-28">
          <BrandMark
            size="medium"
            pixels={256}
            className="absolute left-1/2 top-0 h-42 w-42 -translate-x-1/2 -translate-y-1/2 tablet:h-48 tablet:w-48"
          />

          <h1 className="font-sans text-4xl leading-[1.1] tracking-[-0.01em] text-paper tablet:text-5xl desktop:text-6xl">
            LABB studio fotograficzne + filmowe
            <br />
            Bielsko-Biała
          </h1>

          <div className="flex w-full justify-center">
            <button
              type="button"
              onClick={() => setPricingOpen(true)}
              className="inline-flex w-3/4 items-center justify-center rounded-[7px] bg-signal px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90 cursor-pointer"
            >
              Sprawdź ceny
            </button>
          </div>
        </div>
      </div>

      {/* prev / next arrows */}
      <button
        type="button"
        onClick={() => goDelta(-1)}
        aria-label="Poprzednie zdjęcie"
        className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5 tablet:left-6 tablet:flex"
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
        onClick={() => goDelta(1)}
        aria-label="Następne zdjęcie"
        className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5 tablet:right-6 tablet:flex"
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

      {/* carousel dot navigation */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-2.5 tablet:bottom-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Przejdź do zdjęcia ${index + 1}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === active
                ? "w-8 bg-signal"
                : "w-1.5 bg-line-strong hover:bg-muted"
            }`}
          />
        ))}
      </div>

      <PricingDialog open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
}
