"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { BracesIcon, CalendarIcon, ChildIcon, ChipIcon, HeartIcon, ShieldIcon, WhatsappIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { bracesWhatsappMessage, site, whatsappUrl } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const trust = [
  { icon: ShieldIcon, title: "Bioseguridad", text: "Protocolos estrictos" },
  { icon: ChipIcon, title: "Tecnología moderna", text: "Tratamientos precisos" },
  { icon: HeartIcon, title: "Trato cercano", text: "Te explicamos todo" },
  { icon: ChildIcon, title: "Toda la familia", text: "Niños y adultos" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-sky-50">
      <div className="container-page grid items-center gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20 lg:pt-16">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="pill bg-white shadow-soft">
            <BracesIcon />
            Ortodoncia en Tarapoto
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-title"
            className="mt-6 font-display text-[2.75rem] font-normal leading-[0.98] tracking-[-0.035em] text-navy-700 sm:text-6xl lg:text-[4.5rem]"
          >
            Alinea tu sonrisa
            <span className="relative mt-1 block w-fit font-extrabold">
              con brackets
              <svg
                aria-hidden="true"
                viewBox="0 0 300 30"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-4 w-full text-cyan-400 sm:-bottom-4 sm:h-5"
              >
                <motion.path
                  d="M4 8 C 80 30, 220 30, 296 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease, delay: 0.7 }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-ink-600">
            Atención cercana, tecnología actual y un equipo que te explica cada paso del tratamiento.
            Agenda tu evaluación en Tarapoto.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <a
                href={whatsappUrl(bracesWhatsappMessage)}
                target="_blank"
                rel="noopener"
                className="btn btn-wa btn-pulse w-full px-6 text-base sm:w-auto sm:min-h-14"
              >
                <WhatsappIcon />
                Quiero mis brackets
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href="#reservar" className="btn btn-outline w-full px-6 text-base sm:w-auto sm:min-h-14">
                <CalendarIcon />
                Reservar cita
              </a>
            </Magnetic>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-sm text-ink-600">
            ¿Prefieres llamar?{" "}
            <a
              href={`tel:${site.phoneE164}`}
              className="font-semibold text-navy-700 underline decoration-cyan-400 decoration-2 underline-offset-4"
            >
              {site.phoneDisplay}
            </a>
          </motion.p>
        </motion.div>

        {/* Photo in an arched frame over an Azul profundo block, like the manual's stationery */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: 24, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="absolute -bottom-5 -right-3 top-16 w-3/4 overflow-hidden rounded-[2rem] bg-navy-700 sm:-right-5"
          >
            <IsotypeWatermark tone="dark" className="-bottom-10 -right-12 w-72 !opacity-[0.12]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease }}
            className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[12rem] shadow-lift sm:rounded-t-[15rem]"
          >
            {/* 4:5 photo (1122×1402) provided by Lumayo, served as the original file (no compression or resizing) */}
            <Image
              src="/images/exec-9298b590-8370-4560-8d85-3d42dc6fb6fb.png"
              alt="Niña sonriendo con brackets"
              width={1122}
              height={1402}
              preload
              unoptimized
              className="absolute inset-0 size-full object-cover object-[50%_35%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 1 }}
            className="absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:-left-8"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-sky-100 text-navy-700">
              <ShieldIcon className="size-5" />
            </span>
            <span className="text-sm leading-tight text-ink-600">
              <strong className="block font-semibold text-navy-700">Evaluación personalizada</strong>
              Plan claro antes de empezar
            </span>
          </motion.div>
        </div>
      </div>

      {/* Trust row: hairline-divided, like the manual's index */}
      <div className="border-t border-navy-700/10 bg-white">
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          aria-label="Lo que nos distingue"
          className="container-page grid grid-cols-2 lg:grid-cols-4"
        >
          {trust.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={`flex items-center gap-3 py-5 sm:py-6 ${i % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${
                i % 2 === 0 ? "border-r border-navy-700/10 pr-4" : ""
              } ${i < 2 ? "border-b border-navy-700/10 lg:border-b-0" : ""} lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-navy-700">
                <Icon className="size-5" />
              </span>
              <span className="leading-tight">
                <strong className="block text-sm font-semibold text-navy-700 sm:text-base">{title}</strong>
                <span className="text-xs text-ink-600 sm:text-sm">{text}</span>
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
