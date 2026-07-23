"use client";

import { Image as IKImage } from "@imagekit/next";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";
import PricingDialog from "./PricingDialog";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  WhatsAppIcon,
} from "./icons/SocialIcons";
import { CONTACT_EMAIL, WHATSAPP_HREF } from "../lib/contact";

const AUTOPLAY_MS = 5000;
const iconButtonClass =
  "flex h-16.5 w-16.5 items-center justify-center rounded-full border border-line-strong bg-ink/55 text-paper backdrop-blur-sm transition-colors";

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
  const [emailCopied, setEmailCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); nothing more we can do.
    }
    setEmailCopied(true);
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => setEmailCopied(false), 3000);
  };

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

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

        <div className="flex flex-col items-center gap-6">
          <div className="flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-line bg-ink/55 px-5 py-5 backdrop-blur-sm">
            <BrandMark
              size="medium"
              pixels={256}
              className="top-0 h-42 w-42 h-48 tablet:w-48"
            />

            <h1 className="flex flex-col items-center font-sans text-2xl leading-[1.1] tracking-[-0.01em] text-paper tablet:text-3xl desktop:text-4xl text-center tablet:pb-1 desktop:pb-4">
              <span className="text-4xl tablet:text-5xl desktop:text-6xl font-mono text-signal">LABB</span>
              <span className="font-mono text-paper tracking-[0.2em]">STUDIO</span>
            
              fotograficzne + filmowe
              <br />
              Bielsko-Biała
            </h1>

            <div className="flex w-full justify-center">
              <button
                type="button"
                onClick={() => setPricingOpen(true)}
                className="inline-flex w-1/2 items-center justify-center rounded-[7px] bg-signal px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90 cursor-pointer"
              >
                Sprawdź ceny
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={`${iconButtonClass} hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]`}
            >
              <WhatsAppIcon className="h-7.5 w-7.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Skopiuj adres e-mail"
              className={`${iconButtonClass} cursor-pointer hover:border-[#FACC15] hover:bg-[#FACC15]/10 hover:text-[#FACC15]`}
            >
              <MailIcon className="h-7.5 w-7.5" />
            </button>

            <a
              href="https://www.instagram.com/labbspace"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`${iconButtonClass} hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:text-[#E4405F]`}
            >
              <InstagramIcon className="h-7.5 w-7.5" />
            </a>

            <a
              href="https://www.facebook.com/labbspace"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`${iconButtonClass} hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2]`}
            >
              <FacebookIcon className="h-7.5 w-7.5" />
            </a>
          </div>
        </div>
      </div>

      {/* email-copied toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-6 z-50 transition-all duration-300 ${
          emailCopied ? "opacity-100 translate-y-0" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="rounded-[7px] border border-line-strong bg-surface px-4 py-3 font-sans text-sm text-paper">
          Adres email skopiowany do schowka.
        </div>
      </div>

      {/* prev / next arrows */}
      <button
        type="button"
        onClick={() => goDelta(-1)}
        aria-label="Poprzednie zdjęcie"
        className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 cursor-pointer -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5 tablet:left-6 tablet:flex"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
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
        className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 cursor-pointer -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong text-paper transition-colors hover:bg-white/5 tablet:right-6 tablet:flex"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
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
            className={`h-2.25 cursor-pointer rounded-full transition-all duration-500 ${
              index === active
                ? "w-12 bg-signal"
                : "w-2.25 bg-line-strong hover:bg-muted"
            }`}
          />
        ))}
      </div>

      <PricingDialog open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
}
