"use client";

import { motion, useReducedMotion, type PanInfo } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, serviceIcons, WhatsappIcon } from "@/components/icons";
import { services, whatsappUrl } from "@/lib/site";

const AUTOPLAY_MS = 4500;
const STEP_DEG = 15; // angle between neighbouring cards on the arc
const VISIBLE = 2; // cards shown on each side of the active one
// The list is repeated so there are always hidden cards waiting off-stage on both sides.
// Wrap-around jumps then happen far from view, which makes the loop look endless.
const COPIES = 3;

/** Shortest signed distance from the active slide, so the wheel loops both ways. */
function offsetFrom(index: number, active: number, total: number) {
  let d = (((index - active) % total) + total) % total;
  if (d > total / 2) d -= total;
  return d;
}

function useRadius() {
  const [radius, setRadius] = useState(900);
  useEffect(() => {
    const update = () => setRadius(window.innerWidth < 640 ? 560 : window.innerWidth < 1024 ? 760 : 980);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return radius;
}

const slides = Array.from({ length: services.length * COPIES }, (_, v) => ({
  v,
  index: v % services.length,
  service: services[v % services.length],
}));

export function ServicesCarousel() {
  const total = services.length;
  const virtualTotal = slides.length;
  // Start in the middle copy so the first moves in either direction stay on-stage.
  const [active, setActive] = useState(total);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const radius = useRadius();
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  const go = useCallback((dir: number) => setActive((a) => (a + dir + virtualTotal) % virtualTotal), [virtualTotal]);
  const activeIndex = active % total;
  /** Jump to a service through the shortest path around the wheel. */
  const goToService = (index: number) => setActive((a) => (a + offsetFrom(index, a % total, total) + virtualTotal) % virtualTotal);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, go]);

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40 && Math.abs(info.velocity.x) < 300) return;
    go(info.offset.x < 0 ? 1 : -1);
  };

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
      {/* Stage */}
      <motion.div
        onPanStart={() => setPaused(true)}
        onPanEnd={onPanEnd}
        className="relative mx-auto h-[27.5rem] touch-pan-y select-none sm:h-[34rem]"
      >
        {slides.map(({ v, index: i, service: s }) => {
          const d = offsetFrom(v, active, virtualTotal);
          // Hidden cards park just past the visible edge instead of travelling around the arc.
          const slot = Math.max(-(VISIBLE + 1), Math.min(VISIBLE + 1, d));
          const angle = (slot * STEP_DEG * Math.PI) / 180;
          const isActive = d === 0;
          const hidden = Math.abs(d) > VISIBLE;
          const Icon = serviceIcons[s.icon];

          return (
            <motion.article
              key={`${s.id}-${v}`}
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}: ${s.name}`}
              aria-hidden={!isActive}
              initial={false}
              animate={{
                x: Math.sin(angle) * radius,
                y: (1 - Math.cos(angle)) * radius,
                rotate: slot * STEP_DEG,
                scale: isActive ? 1 : 0.86,
                opacity: hidden ? 0 : isActive ? 1 : 0.75,
              }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 24, mass: 0.8 }}
              style={{ zIndex: 10 - Math.abs(d), transformOrigin: "50% 100%" }}
              onClick={() => !isActive && setActive(v)}
              className={`absolute left-1/2 top-0 -ml-[8.75rem] h-[25rem] w-[17.5rem] sm:-ml-[9.5rem] sm:h-[27.5rem] sm:w-[19rem] ${
                isActive ? "" : "cursor-pointer"
              } ${hidden ? "pointer-events-none" : ""}`}
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

                {/* Photo */}
                <div className="relative h-40 shrink-0 overflow-hidden sm:h-44">
                  <motion.div
                    initial={false}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={s.image} alt={s.name} fill sizes="(min-width: 640px) 19rem, 17.5rem" className="object-cover" />
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
        })}
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
          {services.map((s, i) => (
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
                animate={{ width: i === activeIndex ? 28 : 8, backgroundColor: i === activeIndex ? "#0a7699" : "#c8e9f5" }}
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
      <p aria-live="polite" className="sr-only">{`Servicio ${active + 1} de ${total}: ${current.name}`}</p>
    </div>
  );
}
