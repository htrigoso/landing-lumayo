"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import {
  BracesIcon,
  CalendarIcon,
  ChildIcon,
  ChipIcon,
  HeartIcon,
  ShieldIcon,
  WhatsappIcon,
} from "@/components/icons";
import { Ribbons } from "@/components/decor/Ribbons";
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
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-sky-50">
      {/* Background photo: top banner on mobile, right-side full-bleed on desktop */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-x-0 top-0 -z-20 h-[24rem] sm:h-[30rem] lg:inset-y-0 lg:-right-[18%] lg:h-auto"
      >
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease }}
          className="relative size-full"
        >
          <Image
            src="/images/hero.png"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[74%_40%] lg:object-[100%_35%]"
          />
        </motion.div>
      </motion.div>

      {/* Brand wash that blends the photo into the page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(243_250_253/0)_0%,rgb(243_250_253/0)_9rem,var(--color-sky-50)_23rem)] sm:bg-[linear-gradient(180deg,rgb(243_250_253/0)_0%,rgb(243_250_253/0)_13rem,var(--color-sky-50)_29rem)] lg:bg-[linear-gradient(90deg,var(--color-sky-50)_0%,rgb(243_250_253/0.92)_30%,rgb(243_250_253/0.6)_44%,rgb(243_250_253/0)_58%)]"
      />
      <Ribbons side="left" delay={0.3} className="absolute -left-4 -top-10 -z-10 hidden h-[125%] w-[38rem] lg:block" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-56 bg-gradient-to-t from-white via-white/70 to-transparent lg:block"
      />

      <div className="container-page relative pb-10 pt-[15rem] sm:pt-[19rem] lg:flex lg:items-center lg:pb-32 lg:pt-16">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl lg:max-w-[34rem]">
          <motion.p variants={item} className="pill bg-white/90 shadow-soft backdrop-blur">
            <BracesIcon />
            Ortodoncia en Tarapoto
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-title"
            className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy-700 sm:text-6xl lg:text-[4.25rem]"
          >
            Alinea tu sonrisa
            <span className="relative mt-1 block w-fit text-cyan-600">
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

          <motion.p variants={item} className="mt-7 text-lg leading-relaxed text-ink-600">
            Tecnología, confianza y atención cercana para tu sonrisa. Agenda tu evaluación y descubre
            el tratamiento ideal para ti.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:flex-row">
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

        {/* Floating accent over the photo (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 1.25 }}
          className="absolute bottom-40 right-[6%] hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lift backdrop-blur-md lg:flex"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-sky-100 text-cyan-700">
            <ShieldIcon className="size-5" />
          </span>
          <span className="text-sm leading-tight text-ink-600">
            <strong className="block font-semibold text-navy-700">Evaluación personalizada</strong>
            Plan claro antes de empezar
          </span>
        </motion.div>
      </div>

      {/* Trust strip overlapping the hero's lower edge */}
      <div className="relative bg-white pb-4 lg:-mt-16 lg:bg-transparent">
        <div className="container-page">
        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          aria-label="Lo que nos distingue"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-sky-100 bg-sky-100 shadow-[0_12px_32px_-18px_rgb(7_42_76/0.28)] lg:grid-cols-4"
        >
          {trust.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 bg-white/95 p-4 backdrop-blur sm:p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-100 text-cyan-700">
                <Icon className="size-[1.35rem]" />
              </span>
              <span className="leading-tight">
                <strong className="block text-sm font-semibold text-navy-700 sm:text-base">{title}</strong>
                <span className="text-xs text-ink-600 sm:text-sm">{text}</span>
              </span>
            </li>
          ))}
        </motion.ul>
        </div>
      </div>
    </section>
  );
}
