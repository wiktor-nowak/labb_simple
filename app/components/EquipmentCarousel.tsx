"use client";

import { Image as IKImage } from "@imagekit/next";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { flushSync } from "react-dom";
import type { EquipmentItem } from "../lib/equipment";
import SpecTable from "./SpecTable";

export type EquipmentSlide = {
  item: EquipmentItem;
  cutoutUrl: string;
};

type EquipmentCarouselProps = {
  slides: EquipmentSlide[];
  urlEndpoint?: string;
};

type Direction = 1 | -1;

const SLIDE_MS = 450;
const QUEUED_SLIDE_MS = 200;
const SWIPE_THRESHOLD_PX = 50;

const arrowClass =
  "absolute top-1/2 z-10 flex h-11 w-11 cursor-pointer -translate-y-1/2 items-center justify-center rounded-[7px] border border-line-strong bg-ink/55 text-paper backdrop-blur-sm transition-colors hover:bg-ink/80";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function EquipmentCarousel({
  slides,
  urlEndpoint,
}: EquipmentCarouselProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);

  const indexRef = useRef(0);
  const queueRef = useRef<Direction[]>([]);
  const playingRef = useRef(false);
  const cutoutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  /* Plays every queued step in order, so three clicks mean three changes.
     Once a backlog appears, the rest of the run uses the shorter duration. */
  const playQueue = useCallback(async () => {
    if (playingRef.current) return;
    playingRef.current = true;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let hurrying = false;

    while (queueRef.current.length > 0) {
      const direction = queueRef.current.shift() as Direction;
      const from = indexRef.current;
      const to = (from + direction + count) % count;
      indexRef.current = to;
      hurrying ||= queueRef.current.length > 0;

      if (reducedMotion) {
        setIndex(to);
        continue;
      }

      /* Commit now so the incoming Cutout is visible before it animates. */
      flushSync(() => {
        setIndex(to);
        setLeavingIndex(from);
      });

      const options = {
        duration: hurrying ? QUEUED_SLIDE_MS : SLIDE_MS,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      };
      const slideOut = cutoutRefs.current[from]?.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${-100 * direction}%)` },
        ],
        options,
      );
      const slideIn = cutoutRefs.current[to]?.animate(
        [
          { transform: `translateX(${100 * direction}%)` },
          { transform: "translateX(0)" },
        ],
        options,
      );
      await Promise.all([slideOut?.finished, slideIn?.finished]).catch(
        () => undefined,
      );

      flushSync(() => setLeavingIndex(null));
    }

    playingRef.current = false;
  }, [count]);

  const advance = useCallback(
    (direction: Direction) => {
      if (count < 2) return;
      queueRef.current.push(direction);
      void playQueue();
    },
    [count, playQueue],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      /* A held key counts as one press; Alt+Left is the browser's "back". */
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [role='dialog']")) return;
      advance(event.key === "ArrowRight" ? 1 : -1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advance]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD_PX ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }
    advance(deltaX < 0 ? 1 : -1);
  };

  const current = slides[index].item;

  return (
    <section
      aria-roledescription="karuzela"
      aria-label="Sprzęt studia"
      className="flex flex-col gap-8 tablet:flex-row tablet:items-start desktop:gap-14"
    >
      <p aria-live="polite" className="sr-only">
        {`Slajd ${index + 1} z ${count}: ${current.brand} ${current.model}`}
      </p>

      {/* The background stays put, only the Cutouts move. The 5:6 frame crops
          empty space from the 2:3 Cutouts; 65% centres the items in it. */}
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStartRef.current = null;
        }}
        className="relative mx-auto aspect-5/6 w-full max-w-[max(20rem,calc((100dvh-7rem)*2/3))] shrink-0 touch-pan-y overflow-hidden rounded-[14px] border border-line bg-[#DDDCDC] tablet:mx-0 tablet:w-1/2"
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.item.cutoutFile}
            ref={(element) => {
              cutoutRefs.current[slideIndex] = element;
            }}
            className={`absolute inset-0 ${
              slideIndex === index || slideIndex === leavingIndex
                ? ""
                : "invisible"
            }`}
          >
            {/* Eager so neighbouring Cutouts are ready before they slide in. */}
            <IKImage
              src={slide.cutoutUrl}
              urlEndpoint={urlEndpoint}
              alt={
                slideIndex === index
                  ? `${slide.item.brand} ${slide.item.model}`
                  : ""
              }
              fill
              loading="eager"
              sizes="(max-width: 719px) 100vw, 50vw"
              className="object-cover object-[50%_65%]"
              transformation={[{ width: 1000, quality: 80 }]}
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => advance(-1)}
              aria-label="Poprzedni sprzęt"
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
              onClick={() => advance(1)}
              aria-label="Następny sprzęt"
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
          </>
        )}
      </div>

      {/* Details share one grid cell, so the tallest sets the height and the
          page doesn't jump between slides. */}
      <div className="grid min-w-0 flex-1 tablet:max-w-[560px]">
        {slides.map(({ item }, slideIndex) => (
          <div
            key={item.cutoutFile}
            className={`[grid-area:1/1] transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
              slideIndex === index ? "opacity-100" : "invisible opacity-0"
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {pad(slideIndex + 1)} / {pad(count)} — {item.type}
            </p>
            <h2 className="mt-3 font-sans text-3xl leading-tight text-paper tablet:text-4xl">
              {item.brand} {item.model}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {item.description}
            </p>
            <SpecTable
              rows={[
                { label: "Ilość", value: `${item.quantity} szt.` },
                ...item.parameters,
              ]}
              className="mt-6"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
