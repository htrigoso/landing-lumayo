"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";

export type TreatmentCarouselItem = {
  id: string;
  name: string;
  image: string;
  when: string;
  achieves: string;
  idealFor: string;
  badge?: string;
};

type TreatmentsCarouselProps = {
  items: TreatmentCarouselItem[];
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const END_THRESHOLD_PX = 4;

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches ? "auto" : "smooth";
}

/** Card start position in the track's scroll coordinate space. */
function getCardLeft(track: HTMLElement, card: Element): number {
  return card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
}

function getCards(track: HTMLElement): Element[] {
  return Array.from(track.children);
}

export function TreatmentsCarousel({ items }: TreatmentsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const lastIndex = items.length - 1;

  /** Derives active index and edge state from the current scroll position. Called only from event callbacks. */
  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - END_THRESHOLD_PX;

    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    getCards(track).forEach((card, index) => {
      const distance = Math.abs(getCardLeft(track, card) - track.scrollLeft);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });

    setActiveIndex(atEnd ? lastIndex : nearest);
    setCanPrev(track.scrollLeft > END_THRESHOLD_PX);
    setCanNext(!atEnd);
  }, [lastIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = getCards(track)[index];
    if (!card) return;
    track.scrollTo({ left: getCardLeft(track, card), behavior: getScrollBehavior() });
  }, []);

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const [firstCard] = getCards(track);
    if (!firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * distance, behavior: getScrollBehavior() });
  }, []);

  const handlePrev = useCallback(() => step(-1), [step]);
  const handleNext = useCallback(() => step(1), [step]);

  // Scroll listener throttled with rAF; the state update happens in the frame callback.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncFromScroll();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [syncFromScroll]);

  // ResizeObserver fires once after observe(), which initializes edge state without a sync setState in the effect body.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => syncFromScroll());
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncFromScroll]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        handlePrev();
        break;
      case "ArrowRight":
        event.preventDefault();
        handleNext();
        break;
      case "Home":
        event.preventDefault();
        scrollToIndex(0);
        break;
      case "End":
        event.preventDefault();
        scrollToIndex(lastIndex);
        break;
    }
  };

  const total = items.length;
  const current = items[activeIndex];

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold tabular-nums text-navy-700" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Tratamiento anterior"
            className="inline-flex size-12 items-center justify-center rounded-full border border-navy-700/20 bg-white text-navy-700 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
          >
            <ArrowRightIcon aria-hidden="true" className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Tratamiento siguiente"
            className="inline-flex size-12 items-center justify-center rounded-full border border-navy-700/20 bg-white text-navy-700 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
          >
            <ArrowRightIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Tratamientos para tu boda"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="flex snap-x snap-mandatory scroll-smooth gap-6 overflow-x-auto rounded-3xl pb-4 motion-reduce:scroll-auto [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group grid w-[min(88vw,40rem)] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-white shadow-[0_18px_40px_-28px_rgb(7_42_76/0.4)] md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sky-100 md:aspect-auto md:min-h-[22rem]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 18rem, 88vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                {item.badge ? (
                  <span className="absolute left-4 top-4 rounded-full bg-navy-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span aria-hidden="true" className="font-display text-5xl font-extrabold text-navy-700/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-navy-700">{item.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">{item.when}</p>
                <p className="mt-4 text-base leading-relaxed text-ink-600">
                  <span className="font-semibold text-navy-700">Qué logra:</span> {item.achieves}
                </p>
                <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-ink-600">
                  <span className="font-semibold text-navy-700">Ideal para:</span> {item.idealFor}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 md:block motion-reduce:transition-none ${canPrev ? "opacity-100" : "opacity-0"}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 md:block motion-reduce:transition-none ${canNext ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="mt-2 flex items-center gap-1">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir al tratamiento ${index + 1}: ${item.name}`}
              aria-current={isActive ? "true" : undefined}
              className="flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${isActive ? "w-8 bg-navy-700" : "w-2 bg-navy-700/25"}`}
              />
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {current ? `Tratamiento ${activeIndex + 1} de ${total}: ${current.name}` : ""}
      </p>
    </div>
  );
}
