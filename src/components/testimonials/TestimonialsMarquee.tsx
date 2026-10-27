"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";
import { BrandVideo } from "@/components/testimonials/BrandVideo";
import type { Testimonial } from "@/lib/results";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-3.5" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
        </svg>
      ))}
    </span>
  );
}

function PlayBadge() {
  return (
    // Brandbook: solid Azul clínico disc, white glyph, one Aqua accent ring; flat with no shadow
    <span className="grid size-16 place-items-center rounded-full bg-primary text-text-inverse ring-2 ring-accent transition duration-500 ease-out group-hover/card:scale-110 group-hover/card:bg-primary-hover motion-reduce:transition-none motion-reduce:group-hover/card:scale-100">
      {/* Glyph bounding box centred on x=12.5: a touch right of the disc centre, which reads as optically centred */}
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 6.5v11l8-5.5-8-5.5Z" />
      </svg>
    </span>
  );
}

const testimonialAlt = (t: Testimonial) => (t.name ? `Testimonio de ${t.name}` : "Testimonio de un paciente de Lumayo");

/** Vertical 9:16 card styled like a reel: cover image, quote and patient over a gradient. */
function ReelCard({ t, onPlay }: { t: Testimonial; onPlay: (t: Testimonial) => void }) {
  const content = (
    <>
      {t.image ? (
        <Image
          src={t.image}
          alt={testimonialAlt(t)}
          fill
          unoptimized
          sizes="(min-width: 640px) 17rem, 15rem"
          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-accent to-primary" />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-azul-950/95 via-surface-deep/35 to-transparent" />

      {t.treatment && (
        <span className="pill pill-outline absolute left-3 top-3 !px-3 !py-1 text-[0.62rem]">
          {t.treatment}
        </span>
      )}

      {t.video && (
        <span className="absolute inset-0 grid place-items-center">
          <PlayBadge />
        </span>
      )}

      {t.video && !t.quote && !t.name && (
        <span className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-text-inverse">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          Ver testimonio
        </span>
      )}

      {(t.quote || t.name) && (
        <div className="absolute inset-x-0 bottom-0 p-4 text-left">
          {t.rating ? <Stars rating={t.rating} /> : null}
          {t.quote && <blockquote className="mt-2 line-clamp-4 text-sm leading-relaxed text-text-inverse/95">“{t.quote}”</blockquote>}
          {t.name && (
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-text-inverse">
              <span aria-hidden="true" className="h-px w-5 bg-accent" />
              {t.name}
              {t.source && <span className="font-normal text-text-inverse/70">· Vía {t.source}</span>}
            </p>
          )}
        </div>
      )}
    </>
  );

  const shell =
    "group/card relative block aspect-[9/16] w-[15rem] shrink-0 overflow-hidden rounded-2xl bg-surface-deep sm:w-[17rem]";

  return t.video ? (
    <button type="button" onClick={() => onPlay(t)} aria-label={t.name ? `Ver el testimonio en video de ${t.name}` : "Ver el testimonio en video"} className={`${shell} cursor-pointer`}>
      {content}
    </button>
  ) : (
    <figure className={shell}>{content}</figure>
  );
}

const noopSubscribe = () => () => {};

/** Full-screen player for a vertical testimonial video. */
function VideoLightbox({ item, onClose }: { item: Testimonial | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!mounted) return null;

  // Portalled to <body>: transformed ancestors (the Reveal wrapper) would otherwise confine position:fixed.
  return createPortal(
    <AnimatePresence>
      {item?.video && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.name ? `Testimonio de ${item.name}` : "Testimonio en video"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] grid place-items-center bg-azul-950/85 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[9/16] w-[min(calc(min(85dvh,46rem)*9/16),calc(100vw-2rem))] overflow-hidden rounded-2xl bg-black shadow-lift"
          >
            <BrandVideo src={item.video} poster={item.image} title={item.name ? `Video de ${item.name}` : "Video del testimonio"} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar video"
              className="absolute right-3 top-3 grid size-11 cursor-pointer place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <CloseIcon className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Endless, slowly gliding row of vertical testimonial cards. It pauses on hover, focus,
 * touch, or with the pause button (WCAG 2.2.2). With reduced motion it becomes a swipeable list.
 */
export function TestimonialsMarquee({ items }: { items: Testimonial[] }) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState<Testimonial | null>(null);
  const close = useCallback(() => setPlaying(null), []);

  // A single testimonial is shown centred on its own: a marquee of one card would just scroll it past.
  if (items.length === 1) {
    return (
      <>
        <div className="flex justify-center px-4 sm:px-6">
          <ReelCard t={items[0]} onPlay={setPlaying} />
        </div>
        <VideoLightbox item={playing} onClose={close} />
      </>
    );
  }

  if (reduceMotion) {
    return (
      <>
        <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6" aria-label="Testimonios de pacientes">
          {items.map((t, i) => (
            <li key={i} className="snap-start">
              <ReelCard t={t} onPlay={setPlaying} />
            </li>
          ))}
        </ul>
        <VideoLightbox item={playing} onClose={close} />
      </>
    );
  }

  // Two identical halves: the track slides by exactly one half, so the loop is seamless.
  const loop = [...items, ...items];
  const isPaused = paused || playing !== null;

  return (
    <div className="relative">
      <div
        className="group/marquee relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
        onPointerDown={() => setPaused(true)}
      >
        <ul
          aria-label="Testimonios de pacientes"
          className={`flex w-max gap-5 animate-[marquee_55s_linear_infinite] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {loop.map((t, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex">
              <ReelCard t={t} onPlay={setPlaying} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-input bg-bg px-4 text-sm font-semibold text-primary transition hover:border-primary"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
          {paused ? "Reanudar testimonios" : "Pausar testimonios"}
        </button>
      </div>

      <VideoLightbox item={playing} onClose={close} />
    </div>
  );
}
