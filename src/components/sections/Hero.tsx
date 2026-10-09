"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { ArrowRightIcon, BracesIcon, ClockIcon, PhoneIcon, WhatsappIcon } from "@/components/icons";
import { bracesWhatsappMessage, site, whatsappUrl } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

// Copy enters after the title has spelled itself out
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const letters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025, delayChildren: 0.2 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const infoItems = [
  { icon: PhoneIcon, title: "¿Necesitas atención dental?", text: `Llámanos: ${site.phoneDisplay}`, href: `tel:${site.phoneE164}` },
  { icon: ClockIcon, title: "Horario de atención", text: site.hoursDisplay },
];

/**
 * Splits a phrase into animated letters. Each word stays in a no-wrap box so lines only
 * break between words; screen readers get the plain text from the heading's aria-label.
 */
function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, w) => (
    <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
      {[...word].map((char, c) => (
        <motion.span key={c} variants={letter} className="inline-block">
          {char}
        </motion.span>
      ))}
      {w < words.length - 1 && " "}
    </span>
  ));
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white">
      {/* Full-bleed video stage: with the info bar below, it fills the first screen under the header */}
      <div className="relative isolate flex min-h-[82svh] items-center py-20 sm:py-24 md:min-h-[calc(100svh-4.5rem-6rem)] lg:min-h-[max(44rem,calc(100svh-4.5rem-6rem))]">
        <HeroBackdrop />

        <div className="container-page text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="pill mx-auto !bg-white/10 !text-white ring-1 ring-white/25"
          >
            <BracesIcon />
            Ortodoncia en Tarapoto
          </motion.p>

          <motion.h1
            id="hero-title"
            aria-label="Tu sonrisa, tu mejor luz"
            variants={letters}
            initial={reduceMotion ? "show" : "hidden"}
            animate="show"
            className="mx-auto mt-6 max-w-4xl font-display text-[2.6rem] font-normal leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
          >
            <span className="block">
              <SplitText text="Tu sonrisa," />
            </span>
            <span className="relative mx-auto mt-1 block w-fit font-extrabold">
              <SplitText text="tu mejor luz" />
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
                  transition={{ duration: 0.9, ease, delay: 0.75 }}
                />
                {/* "Light" glint: a short white dash that travels along the drawn line every few seconds */}
                {!reduceMotion && (
                  <motion.path
                    d="M4 8 C 80 30, 220 30, 296 6"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="46 400"
                    initial={{ strokeDashoffset: 46, opacity: 0 }}
                    animate={{ strokeDashoffset: [46, -320], opacity: [0, 0.95, 0.95, 0] }}
                    transition={{
                      strokeDashoffset: { duration: 1.4, ease: [0.45, 0, 0.25, 1], repeat: Infinity, repeatDelay: 3.4, delay: 1.9 },
                      opacity: { duration: 1.4, times: [0, 0.15, 0.8, 1], repeat: Infinity, repeatDelay: 3.4, delay: 1.9 },
                    }}
                  />
                )}
              </svg>
            </span>
          </motion.h1>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-sky-100 sm:text-lg">
              Atención cercana, tecnología actual y un equipo que te explica cada paso del tratamiento. Agenda tu
              evaluación en Tarapoto.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex justify-center">
              <a
                href={whatsappUrl(bracesWhatsappMessage)}
                target="_blank"
                rel="noopener"
                className="btn btn-light btn-pulse w-full gap-3 !rounded-full !py-2 pl-6 pr-2 text-base sm:min-h-14 sm:w-auto"
              >
                <WhatsappIcon />
                Quiero mis brackets
                <span className="btn-arrow grid size-10 place-items-center rounded-full bg-navy-700 text-white">
                  <ArrowRightIcon className="size-4 -rotate-45" />
                </span>
              </a>
            </motion.div>

            <motion.p variants={item} className="mt-5 text-sm text-sky-100">
              <a href="#reservar" className="font-semibold text-white underline decoration-cyan-400 decoration-2 underline-offset-4">
                Reserva tu cita
              </a>
              <span aria-hidden="true" className="mx-2 text-white/40">
                ·
              </span>
              ¿Prefieres llamar?{" "}
              <a
                href={`tel:${site.phoneE164}`}
                className="font-semibold text-white underline decoration-cyan-400 decoration-2 underline-offset-4"
              >
                {site.phoneDisplay}
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Info bar under the stage, as in the reference: phone, opening hours and the booking CTA */}
      <div className="bg-navy-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.2 }}
          className="container-page flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <ul aria-label="Contacto" className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 md:flex md:gap-0">
            {infoItems.map(({ icon: Icon, title, text, href }, i) => (
              <li key={title} className={`flex items-center gap-3 ${i > 0 ? "md:ml-8 md:border-l md:border-white/15 md:pl-8" : ""}`}>
                <span className="grid size-11 shrink-0 place-items-center rounded-full text-cyan-400 ring-1 ring-cyan-400/40">
                  <Icon className="size-5" />
                </span>
                <span className="leading-tight">
                  <strong className="block text-[0.95rem] font-semibold">{title}</strong>
                  {href ? (
                    <a href={href} className="text-sm text-sky-100/80 underline-offset-4 hover:text-white hover:underline">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-sky-100/80">{text}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <a href="#reservar" className="btn btn-light w-full shrink-0 gap-3 !rounded-full !py-1.5 pl-5 pr-1.5 text-sm sm:w-fit sm:self-center md:self-auto">
            Reservar cita
            <span className="btn-arrow grid size-8 place-items-center rounded-full bg-navy-700 text-white">
              <ArrowRightIcon className="size-3.5 -rotate-45" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
