"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, serviceIcons, WhatsappIcon } from "@/components/icons";
import { services, whatsappUrl, type Service } from "@/lib/site";

const AUTOPLAY_MS = 4500;
const STEP_DEG = 15; // angle between neighbouring cards on the arc
const STEP_RAD = (STEP_DEG * Math.PI) / 180;
const VISIBLE = 2; // cards shown on each side of the active one
// The list is repeated so there are always hidden cards waiting off-stage on both sides.
// Wrap-around jumps then happen far from view, which makes the loop look endless.
const COPIES = 3;

const slides = Array.from({ length: services.length * COPIES }, (_, v) => ({
  v,
  index: v % services.length,
  service: services[v % services.length],
}));
const VIRTUAL_TOTAL = slides.length;

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Shortest signed distance around a loop of `total` items (works with fractions). */
function wrapSigned(delta: number, total: number) {
  const d = mod(delta, total);
  return d > total / 2 ? d - total : d;
}

function useRadius() {
  const [radius, setRadius] = useState(980);
  useEffect(() => {
    const update = () => setRadius(window.innerWidth < 640 ? 560 : window.innerWidth < 1024 ? 760 : 980);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return radius;
}

type CardProps = {
  slide: (typeof slides)[number];
  position: MotionValue<number>;
  radius: MotionValue<number>;
  isActive: boolean;
  reduceMotion: boolean;
  onSelect: (v: number) => void;
};

/**
 * One card on the arc. Its place is derived every frame from the shared, continuous
 * carousel position, so it follows the pointer while dragging without React re-renders.
 */
function CarouselCard({ slide, position, radius, isActive, reduceMotion, onSelect }: CardProps) {
  const { v, index: i, service: s } = slide;
  const total = services.length;
  const Icon = serviceIcons[s.icon];
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  const dist = useTransform(position, (p) => wrapSigned(v - p, VIRTUAL_TOTAL));
  // Hidden cards park just past the visible edge instead of travelling around the arc.
  const slot = useTransform(dist, (d) => Math.max(-(VISIBLE + 1), Math.min(VISIBLE + 1, d)));
  const x = useTransform([slot, radius], ([d, r]: number[]) => Math.sin(d * STEP_RAD) * r);
  const y = useTransform([slot, radius], ([d, r]: number[]) => (1 - Math.cos(d * STEP_RAD)) * r);
  const rotate = useTransform(slot, (d) => d * STEP_DEG);
  const scale = useTransform(dist, (d) => 1 - Math.min(Math.abs(d), 1) * 0.14);
  const opacity = useTransform(dist, (d) => {
    const a = Math.abs(d);
    if (a <= 1) return 1 - a * 0.25;
    if (a <= VISIBLE) return 0.75;
    if (a <= VISIBLE + 1) return 0.75 * (VISIBLE + 1 - a);
    return 0;
  });
  const zIndex = useTransform(dist, (d) => 100 - Math.round(Math.abs(d) * 10));
  const pointerEvents = useTransform(dist, (d) => (Math.abs(d) > VISIBLE + 0.3 ? "none" : "auto"));

  return (
    <motion.article
      aria-roledescription="diapositiva"
      aria-label={`${i + 1} de ${total}: ${s.name}`}
      aria-hidden={!isActive}
      style={{ x, y, rotate, scale, opacity, zIndex, pointerEvents, transformOrigin: "50% 100%" }}
      onClick={() => !isActive && onSelect(v)}
      className={`absolute left-1/2 top-0 -ml-[8.75rem] h-[25rem] w-[17.5rem] will-change-transform sm:-ml-[9.5rem] sm:h-[27.5rem] sm:w-[19rem] ${
        isActive ? "" : "cursor-pointer"
      }`}
    >
      <div
        className={`relative flex size-full flex-col overflow-hidden rounded-[2rem] border border-sky-200 bg-white shadow-soft transition-colors duration-500 ease-out ${
          isActive ? "text-white" : "text-navy-700"
        }`}
      >
        {/* Active "skin": crossfades in over the light card instead of swapping classes */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={fade}
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-navy-700 to-navy-900 shadow-[0_30px_60px_-20px_rgb(7_42_76/0.55)]"
        />

        {/* Isotype watermark (as in the footer): soft blue on idle cards, white on the active one */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={isActive ? { x: 0, y: 0, rotate: -8, scale: 1 } : { x: 16, y: 16, rotate: 0, scale: 0.92 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -bottom-6 -right-8 w-48 sm:w-52"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative brand SVG */}
          <img
            src="/brand/lumayo-isotipo.svg"
            alt=""
            draggable={false}
            className={`w-full transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-[0.1]"}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative brand SVG */}
          <img
            src="/brand/lumayo-isotipo-white.svg"
            alt=""
            draggable={false}
            className={`absolute inset-0 w-full transition-opacity duration-500 ${isActive ? "opacity-[0.2]" : "opacity-0"}`}
          />
        </motion.div>

        {/* Photo */}
        <div className="relative h-40 shrink-0 overflow-hidden sm:h-44">
          <motion.div
            initial={false}
            animate={{ scale: isActive ? 1.06 : 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={s.image} alt={s.name} fill draggable={false} sizes="(min-width: 640px) 19rem, 17.5rem" className="object-cover" />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-display text-xs font-bold tabular-nums text-navy-700 backdrop-blur">
            {String(i + 1).padStart(2, "0")}
            <span className="opacity-50"> / {String(total).padStart(2, "0")}</span>
          </span>
          {s.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
              Destacado
            </span>
          )}
        </div>

        {/* Icon chip overlapping the photo edge */}
        <motion.span
          animate={isActive && !reduceMotion ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
          className={`relative -mt-7 ml-5 grid size-14 place-items-center rounded-2xl ring-4 transition-[background-color,color,box-shadow] duration-500 ease-out ${
            isActive ? "bg-cyan-400 text-navy-950 ring-navy-700" : "bg-white text-cyan-700 shadow-soft ring-white"
          }`}
        >
          <Icon className="size-7" />
        </motion.span>

        <div className="relative flex flex-1 flex-col px-5 pb-5 pt-3">
          <h3 className={`font-display text-lg font-bold leading-tight transition-colors duration-500 ease-out sm:text-xl ${isActive ? "text-white" : "text-navy-700"}`}>
            {s.name}
          </h3>
          <p className={`mt-2 line-clamp-3 flex-1 text-[0.93rem] leading-relaxed transition-colors duration-500 ease-out ${isActive ? "text-sky-100" : "text-ink-600"}`}>
            {s.description}
          </p>

          {/* WhatsApp button keeps its slot on every card and fades in on the active one */}
          <div className="relative mt-3 h-12">
            <motion.a
              href={whatsappUrl(`Hola Lumayo, quisiera información sobre ${s.name.toLowerCase()}.`)}
              target="_blank"
              rel="noopener"
              draggable={false}
              tabIndex={isActive ? 0 : -1}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10, scale: isActive ? 1 : 0.96 }}
              transition={{ ...fade, delay: isActive && !reduceMotion ? 0.12 : 0 }}
              className={`btn btn-wa absolute inset-0 w-full text-sm ${isActive ? "" : "pointer-events-none"}`}
            >
              <WhatsappIcon />
              Consultar por WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesCarousel() {
  const total = services.length;
  const reduceMotion = useReducedMotion() ?? false;
  const radiusPx = useRadius();
  const radius = useMotionValue(radiusPx);
  useEffect(() => radius.set(radiusPx), [radius, radiusPx]);

  // Continuous position along the wheel (in cards). Start in the middle copy.
  const position = useMotionValue(total);
  const [active, setActive] = useState(total);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef(0);
  const dragged = useRef(false);

  // Only re-render when the nearest card changes, not on every frame.
  useMotionValueEvent(position, "change", (p) => {
    const nearest = mod(Math.round(p), VIRTUAL_TOTAL);
    setActive((a) => (a === nearest ? a : nearest));
  });

  const moveTo = useCallback(
    (target: number) => {
      animate(position, target, reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 26, mass: 0.9 });
    },
    [position, reduceMotion],
  );

  const go = useCallback((dir: number) => moveTo(Math.round(position.get()) + dir), [moveTo, position]);

  const goToVirtual = (v: number) => {
    const base = Math.round(position.get());
    moveTo(base + wrapSigned(v - base, VIRTUAL_TOTAL));
  };

  const goToService = (index: number) => {
    const base = Math.round(position.get());
    moveTo(base + wrapSigned(index - mod(base, total), total));
  };

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, go]);

  /** Pixels of horizontal drag that move the wheel by one card. */
  const stepPx = () => Math.max(120, radiusPx * Math.sin(STEP_RAD));

  const onPanStart = () => {
    position.stop();
    dragStart.current = position.get();
    dragged.current = true;
    setPaused(true);
  };
  const onPan = (_: unknown, info: PanInfo) => {
    position.set(dragStart.current - info.offset.x / stepPx());
  };
  const onPanEnd = (_: unknown, info: PanInfo) => {
    // Project the flick a little forward, then settle on the nearest card.
    const projected = position.get() - (info.velocity.x / stepPx()) * 0.18;
    moveTo(Math.round(projected));
  };

  const activeIndex = active % total;
  const current = services[activeIndex];

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Servicios de Lumayo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Stage: drag horizontally to spin the wheel */}
      <motion.div
        onPointerDown={() => (dragged.current = false)}
        onClickCapture={(e) => {
          // A drag that ends over a card or link must not also count as a click.
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
        className="relative mx-auto h-[27.5rem] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[34rem]"
      >
        {slides.map((slide) => (
          <CarouselCard
            key={`${slide.service.id}-${slide.v}`}
            slide={slide}
            position={position}
            radius={radius}
            isActive={slide.v === active}
            reduceMotion={reduceMotion}
            onSelect={goToVirtual}
          />
        ))}
      </motion.div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Servicio anterior"
          className="grid size-12 cursor-pointer place-items-center rounded-full border border-sky-200 bg-white text-navy-700 shadow-soft transition hover:-translate-x-0.5 hover:border-cyan-500"
        >
          <ArrowRightIcon className="size-5 rotate-180" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Elegir servicio">
          {services.map((s: Service, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={s.name}
              onClick={() => goToService(i)}
              className="grid h-6 cursor-pointer place-items-center"
            >
              <motion.span
                animate={{ width: i === activeIndex ? 28 : 8, backgroundColor: i === activeIndex ? "#0e5ca4" : "#c3e6f6" }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="block h-2 rounded-full"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Servicio siguiente"
          className="grid size-12 cursor-pointer place-items-center rounded-full border border-sky-200 bg-white text-navy-700 shadow-soft transition hover:translate-x-0.5 hover:border-cyan-500"
        >
          <ArrowRightIcon className="size-5" />
        </button>
      </div>

      {/* Screen-reader announcement of the current slide */}
      <p aria-live="polite" className="sr-only">{`Servicio ${activeIndex + 1} de ${total}: ${current.name}`}</p>
    </div>
  );
}
