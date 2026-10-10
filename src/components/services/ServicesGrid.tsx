"use client";

import Image, { getImageProps } from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, CalendarIcon, serviceIcons, WhatsappIcon } from "@/components/icons";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { ServiceDialog } from "@/components/services/ServiceDialog";
import {
  serviceCategories,
  services,
  whatsappUrl,
  type Service,
  type ServiceCategoryId,
} from "@/lib/site";

type Filter = ServiceCategoryId | "todos";

const ease = [0.22, 1, 0.36, 1] as const;
const categoryLabel = Object.fromEntries(serviceCategories.map((c) => [c.id, c.label])) as Record<ServiceCategoryId, string>;
const featured = services.filter((s) => s.featured);
const regular = services.filter((s) => !s.featured);

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "todos", label: "Todos", count: services.length },
  ...serviceCategories.map((c) => ({ id: c.id, label: c.label, count: services.filter((s) => s.category === c.id).length })),
];

/**
 * Keeps the chosen chip visible in the sideways-scrolling filter row on phones. It scrolls only
 * that row, and only when it actually overflows: scrollIntoView would also scroll overflow-hidden
 * ancestors (the section), shifting the whole page sideways on desktop.
 */
/** Must match the cards' `sizes`, so a preload fetches the exact file the card will request. */
const CARD_SIZES = "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw";
const preloaded = new Set<string>();

/**
 * Warms the browser cache with a category's photos while the visitor points at (or touches) its
 * filter, so the new cards don't flash an empty photo frame after the click.
 */
function preloadCategory(filter: Filter) {
  for (const s of services) {
    if ((filter !== "todos" && s.category !== filter) || preloaded.has(s.id)) continue;
    preloaded.add(s.id);
    const { props } = getImageProps({ src: s.image, alt: "", fill: true, sizes: CARD_SIZES });
    const img = new window.Image();
    img.sizes = props.sizes ?? CARD_SIZES;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
  }
}

function centerChip(chip: HTMLElement, behavior: ScrollBehavior) {
  const row = chip.closest<HTMLElement>("[data-chip-row]");
  if (!row || row.scrollWidth <= row.clientWidth) return;
  const offset = chip.getBoundingClientRect().left - row.getBoundingClientRect().left;
  row.scrollTo({ left: row.scrollLeft + offset - (row.clientWidth - chip.offsetWidth) / 2, behavior });
}

/**
 * All services at a glance: category filters, the featured treatments (braces, smile design) as wide
 * Azul profundo card, and a grid of compact cards that each open a WhatsApp inquiry.
 */
export function ServicesGrid() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [openId, setOpenId] = useState<string | null>(null);
  const openService = services.find((s) => s.id === openId) ?? null;
  const reduceMotion = useReducedMotion();

  const shownFeatured = featured.filter((s) => filter === "todos" || s.category === filter);
  const visible = regular.filter((s) => filter === "todos" || s.category === filter);
  // Featured cards take two cells, the rest one. The evaluation tile closes the last row.
  const cells = shownFeatured.length * 2 + visible.length;
  const ctaSpan = `${smSpan[(cells % 2 ? 1 : 2) as 1 | 2]} ${lgSpan[(3 - (cells % 3) || 3) as 1 | 2 | 3]}`;

  return (
    <div>
      {/* Category filters: scroll sideways on small screens */}
      <div data-chip-row className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="group" aria-label="Filtrar servicios por categoría" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onPointerEnter={() => preloadCategory(f.id)}
                onFocus={() => preloadCategory(f.id)}
                onTouchStart={() => preloadCategory(f.id)}
                onClick={(e) => {
                  setFilter(f.id);
                  centerChip(e.currentTarget, reduceMotion ? "auto" : "smooth");
                }}
                className={`relative flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors duration-300 ${
                  active ? "border-navy-700 text-white" : "border-sky-200 bg-white text-navy-700 hover:border-cyan-500"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="service-filter"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-navy-700"
                  />
                )}
                {f.label}
                <span className={`text-xs tabular-nums ${active ? "text-sky-100/80" : "text-ink-400"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout={!reduceMotion} className="mt-8 grid grid-flow-row-dense gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shownFeatured.map((s, i) => (
            <FeaturedCard key={s.id} service={s} flip={i % 2 === 1} index={i} onOpen={() => setOpenId(s.id)} reduceMotion={!!reduceMotion} />
          ))}
          {visible.map((s, i) => (
            <ServiceCard
              key={s.id}
              index={shownFeatured.length + i}
              service={s}
              showCategory={filter === "todos"}
              onOpen={() => setOpenId(s.id)}
              reduceMotion={!!reduceMotion}
            />
          ))}
          <EvaluationTile key="evaluacion" index={shownFeatured.length + visible.length} className={ctaSpan} reduceMotion={!!reduceMotion} />
        </AnimatePresence>
      </motion.div>

      <ServiceDialog service={openService} onClose={() => setOpenId(null)} />
    </div>
  );
}

// Static class maps so Tailwind can see every span the evaluation tile may need
const smSpan = { 1: "sm:col-span-1", 2: "sm:col-span-2" } as const;
const lgSpan = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" } as const;

const inquiryMessage = (s: Service) => `Hola Lumayo, quisiera información sobre ${s.name.toLowerCase()}.`;

/**
 * Filter transition: outgoing cards vanish fast instead of cross-fading with the new ones (the
 * overlap read as an empty, washed-out grid), and incoming cards cascade in by position.
 */
function cardMotion(reduceMotion: boolean, index = 0) {
  return reduceMotion
    ? {}
    : {
        layout: true,
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease, delay: Math.min(index, 6) * 0.04 } },
        exit: { opacity: 0, transition: { duration: 0.12, ease: "easeOut" as const } },
        transition: { layout: { duration: 0.35, ease } },
      };
}

type CardProps = { service: Service; onOpen: () => void; reduceMotion: boolean; index: number };

// Brandbook ID-badge colour blocks: featured cards alternate Azul profundo and Turquesa.
// Turquesa uses its 700 step: white body copy on the 600 base is only 4.2:1 (below AA).
const featuredSkins = [
  { block: "bg-navy-700", photoFade: "from-navy-700/60" },
  { block: "bg-teal-700", photoFade: "from-teal-700/60" },
];

function FeaturedCard({ service: s, flip, onOpen, reduceMotion, index }: CardProps & { flip: boolean }) {
  const skin = featuredSkins[flip ? 1 : 0];
  return (
    <motion.article
      {...cardMotion(reduceMotion, index)}
      // Zigzag on desktop: every second featured card sits on the right two columns
      className={`group relative isolate overflow-hidden rounded-2xl text-white sm:col-span-2 sm:grid sm:grid-cols-2 ${skin.block} ${
        flip ? "lg:col-start-2" : ""
      }`}
    >
      {/* Large cropped isotype, as on the brandbook's ID badges */}
      <IsotypeWatermark tone="dark" animated className="-bottom-16 -left-12 -z-10 w-80 !opacity-[0.14] group-hover:!opacity-[0.2]" />
      <div className="relative flex flex-col p-6 sm:p-8">
        <span className="pill pill-outline w-fit">Destacado</span>
        <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl">{s.name}</h3>
        <p className="mt-3 flex-1 text-pretty leading-relaxed text-white/85">{s.description}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a href={whatsappUrl(inquiryMessage(s))} target="_blank" rel="noopener" className="btn btn-light w-full sm:w-fit">
            <WhatsappIcon />
            {s.cta ?? "Consultar por WhatsApp"}
          </a>
          <button type="button" onClick={onOpen} aria-haspopup="dialog" className="btn btn-ghost-light w-full sm:w-fit">
            Ver más información
          </button>
        </div>
      </div>
      <div className={`relative h-56 overflow-hidden bg-white/10 sm:h-auto sm:min-h-72 ${flip ? "sm:order-first" : ""}`}>
        <Image
          src={s.image}
          alt={s.name}
          fill
          sizes={CARD_SIZES}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-t ${skin.photoFade} to-transparent ${flip ? "sm:bg-gradient-to-l" : "sm:bg-gradient-to-r"}`}
        />
      </div>
    </motion.article>
  );
}

function ServiceCard({ service: s, showCategory, onOpen, reduceMotion, index }: CardProps & { showCategory: boolean }) {
  const Icon = serviceIcons[s.icon];
  return (
    <motion.article
      {...cardMotion(reduceMotion, index)}
      className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white transition-colors duration-500 hover:border-navy-500/50"
    >
      {/* Isotype only appears on hover, so the grid stays light at rest */}
      <IsotypeWatermark animated className="-bottom-8 -right-10 -z-10 w-48 !opacity-0 group-hover:!opacity-[0.12]" />

      {/* Photo: zooms gently inside its frame while the card stays still */}
      <div className="relative h-44 shrink-0 overflow-hidden bg-sky-100">
        <Image
          src={s.image}
          alt=""
          fill
          sizes={CARD_SIZES}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Top and bottom shade so the outlined tag reads on any photo */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-950/35" />
        {showCategory && (
          <span className="pill pill-outline absolute left-4 top-4 !px-3 !py-1 text-[0.62rem]">{categoryLabel[s.category]}</span>
        )}
      </div>

      {/* Brandbook avatar: white icon in an Azul profundo circle, overlapping the photo edge */}
      <span aria-hidden="true" className="relative -mt-7 ml-5 grid size-14 place-items-center rounded-full bg-navy-700 text-white ring-4 ring-white">
        <Icon className="size-7" />
      </span>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <h3 className="font-display text-lg font-bold leading-snug text-navy-700 sm:text-xl">{s.name}</h3>
        <p className="mt-2 flex-1 text-pretty text-[0.93rem] leading-relaxed text-ink-600">{s.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {/* Stretched button: the whole card opens the detail dialog */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-cyan-700 after:absolute after:inset-0 after:content-['']"
          >
            Ver más información
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href={whatsappUrl(inquiryMessage(s))}
            target="_blank"
            rel="noopener"
            aria-label={`Consultar ${s.name.toLowerCase()} por WhatsApp`}
            className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-sky-100 text-navy-700 transition-colors duration-300 group-hover:bg-navy-700 group-hover:text-white"
          >
            <WhatsappIcon className="size-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/** Fallback for visitors who do not know which treatment they need; it fills the grid's last row. */
function EvaluationTile({ className, reduceMotion, index }: { className: string; reduceMotion: boolean; index: number }) {
  return (
    <motion.div
      {...cardMotion(reduceMotion, index)}
      className={`card-panel group relative isolate flex flex-col justify-between gap-6 overflow-hidden p-6 sm:p-8 ${className}`}
    >
      <IsotypeWatermark animated className="-bottom-10 -right-10 -z-10 w-56 !opacity-[0.1] group-hover:!opacity-[0.16]" />
      <div className="max-w-md">
        <span className="grid size-14 place-items-center rounded-full bg-teal-600 text-white">
          <CalendarIcon className="size-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold leading-snug text-navy-700 sm:text-2xl">¿No sabes qué tratamiento necesitas?</h3>
        <p className="mt-2 text-pretty leading-relaxed text-ink-600">
          Agenda una evaluación y te recomendamos el mejor camino para tu sonrisa.
        </p>
      </div>
      <a href="#reservar" className="btn btn-navy w-full sm:w-fit">
        <CalendarIcon />
        Agendar evaluación
      </a>
    </motion.div>
  );
}
