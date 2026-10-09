"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, CalendarIcon, serviceIcons, WhatsappIcon } from "@/components/icons";
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
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="group" aria-label="Filtrar servicios por categoría" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={(e) => {
                  setFilter(f.id);
                  // Keep the chosen chip fully visible in the sideways-scrolling row on phones
                  e.currentTarget.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
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
            <FeaturedCard key={s.id} service={s} flip={i % 2 === 1} onOpen={() => setOpenId(s.id)} reduceMotion={!!reduceMotion} />
          ))}
          {visible.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              showCategory={filter === "todos"}
              onOpen={() => setOpenId(s.id)}
              reduceMotion={!!reduceMotion}
            />
          ))}
          <EvaluationTile key="evaluacion" className={ctaSpan} reduceMotion={!!reduceMotion} />
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

function cardMotion(reduceMotion: boolean) {
  return reduceMotion
    ? {}
    : {
        layout: true,
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.4, ease },
      };
}

type CardProps = { service: Service; onOpen: () => void; reduceMotion: boolean };

function FeaturedCard({ service: s, flip, onOpen, reduceMotion }: CardProps & { flip: boolean }) {
  return (
    <motion.article
      {...cardMotion(reduceMotion)}
      // Zigzag on desktop: every second featured card sits on the right two columns
      className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-navy-700 text-white shadow-lift sm:col-span-2 sm:grid sm:grid-cols-2 ${
        flip ? "lg:col-start-2" : ""
      }`}
    >
      <Watermark tone="dark" className="-bottom-10 -left-10 w-64 opacity-[0.14] group-hover:opacity-[0.22]" />
      <div className="relative flex flex-col p-6 sm:p-8">
        <span className="pill w-fit bg-cyan-400 !text-navy-950">Destacado</span>
        <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl">{s.name}</h3>
        <p className="mt-3 flex-1 text-pretty leading-relaxed text-sky-100">{s.description}</p>
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
      <div className={`relative h-56 overflow-hidden sm:h-auto sm:min-h-72 ${flip ? "sm:order-first" : ""}`}>
        <Image
          src={s.image}
          alt={s.name}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-t from-navy-700/50 to-transparent ${flip ? "sm:bg-gradient-to-l" : "sm:bg-gradient-to-r"}`}
        />
      </div>
    </motion.article>
  );
}

function ServiceCard({ service: s, showCategory, onOpen, reduceMotion }: CardProps & { showCategory: boolean }) {
  const Icon = serviceIcons[s.icon];
  return (
    <motion.article
      {...cardMotion(reduceMotion)}
      className="group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] border border-sky-200 bg-white shadow-soft transition-[border-color,box-shadow] duration-500 hover:border-cyan-500 hover:shadow-lift"
    >
      <Watermark className="-bottom-8 -right-10 w-48 opacity-[0.09] group-hover:opacity-[0.16]" />

      {/* Photo: zooms gently inside its frame while the card stays still */}
      <div className="relative h-44 shrink-0 overflow-hidden">
        <Image
          src={s.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
        {showCategory && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-navy-700">
            {categoryLabel[s.category]}
          </span>
        )}
      </div>

      {/* Icon chip overlapping the photo edge */}
      <span aria-hidden="true" className="relative -mt-7 ml-5 grid size-14 place-items-center rounded-2xl bg-white text-navy-700 shadow-soft ring-4 ring-white">
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

/**
 * Lumayo isotype as a corner watermark; it turns and drifts slightly when the card is hovered.
 * Tailwind v4 rotate/translate utilities use the standalone `rotate` and `translate` properties,
 * so those (not `transform`) are the ones transitioned.
 */
function Watermark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative brand SVG
    <img
      src={tone === "dark" ? "/brand/lumayo-isotipo-white.svg" : "/brand/lumayo-isotipo.svg"}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute -z-10 select-none transition-[translate,rotate,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:-rotate-6 ${className}`}
    />
  );
}

/** Fallback for visitors who do not know which treatment they need; it fills the grid's last row. */
function EvaluationTile({ className, reduceMotion }: { className: string; reduceMotion: boolean }) {
  return (
    <motion.div
      {...cardMotion(reduceMotion)}
      className={`group relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] border border-sky-200 bg-sky-50 p-6 sm:p-8 ${className}`}
    >
      <Watermark className="-bottom-10 -right-10 w-56 opacity-[0.12] group-hover:opacity-[0.2]" />
      <div className="max-w-md">
        <span className="grid size-14 place-items-center rounded-2xl bg-white text-navy-700 shadow-soft">
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
