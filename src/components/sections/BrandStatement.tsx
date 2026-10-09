"use client";

import { motion, type Variants } from "motion/react";
import type { ComponentType, SVGProps } from "react";
import { LiveLines } from "@/components/decor/LiveLines";
import { BracesIcon, CalendarIcon, ChildIcon, ImplantIcon, SparkleIcon, WhatsappIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };

/** Word sharpens out of a blur and rises into place. */
const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(12px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

type Chip = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Desktop placement around the headline. */
  position: string;
  float: number;
  delay: number;
};

const chips: Chip[] = [
  { label: "Brackets", icon: BracesIcon, position: "left-[9%] top-[22%]", float: 7, delay: 0.9 },
  { label: "Blanqueamiento", icon: SparkleIcon, position: "right-[8%] top-[28%]", float: 8.5, delay: 1.05 },
  { label: "Implantes", icon: ImplantIcon, position: "left-[13%] bottom-[20%]", float: 9, delay: 1.2 },
  { label: "Odontopediatría", icon: ChildIcon, position: "right-[12%] bottom-[18%]", float: 7.5, delay: 1.35 },
];

function FloatingChip({ chip }: { chip: Chip }) {
  const Icon = chip.icon;
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 180, damping: 18, delay: chip.delay }}
      className={`absolute hidden lg:block ${chip.position}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: chip.float, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 py-2 pl-2 pr-4 shadow-lift backdrop-blur-md"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-cyan-400 text-navy-900">
          <Icon className="size-5" />
        </span>
        <span className="text-sm font-semibold text-white">{chip.label}</span>
      </motion.div>
    </motion.div>
  );
}

export function BrandStatement() {
  return (
    <section aria-labelledby="statement-title" className="relative isolate overflow-hidden bg-navy-700 py-28 lg:py-36">
      <LiveLines tone="dark" className="-z-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_50%_at_50%_50%,rgb(2_68_116/0.92)_0%,rgb(2_68_116/0.55)_55%,transparent_82%)]"
      />

      {chips.map((c) => (
        <FloatingChip key={c.label} chip={c} />
      ))}

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container-page relative text-center"
      >
        <motion.p variants={fadeUp} className="pill mx-auto !bg-white/10 !text-white backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
          </span>
          Lumayo · Tarapoto
        </motion.p>

        <h2 id="statement-title" className="mt-6 font-display text-[2.5rem] leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.75rem]">
          <span className="block font-light">
            <motion.span variants={word} className="inline-block">Aquí</motion.span>{" "}
            <motion.span variants={word} className="inline-block">comienza</motion.span>
          </span>
          <span className="block">
            <motion.span variants={word} className="inline-block font-light">tu</motion.span>{" "}
            <motion.span variants={word} className="inline-block font-light">nueva</motion.span>{" "}
            <span className="relative inline-block">
              <motion.span variants={word} className="text-shimmer-light inline-block font-extrabold">
                sonrisa
              </motion.span>
              <svg aria-hidden="true" viewBox="0 0 300 30" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-4 w-full text-cyan-400 sm:h-5">
                <motion.path
                  d="M4 8 C 80 30, 220 30, 296 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease, delay: 0.25 } } }}
                />
              </svg>
            </span>
          </span>
        </h2>

        <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-lg text-balance text-lg leading-relaxed text-sky-100/85">
          Tu sonrisa nos inspira a dar el primer paso. Agenda tu evaluación y descubre el tratamiento ideal para ti.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-light btn-pulse px-7 text-base sm:min-h-14">
              <WhatsappIcon />
              Escríbenos por WhatsApp
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#reservar" className="btn btn-ghost-light px-7 text-base sm:min-h-14">
              <CalendarIcon />
              Reservar cita
            </a>
          </Magnetic>
        </motion.div>

        {/* On phones the service chips sit in a row under the CTAs instead of floating */}
        <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-2 lg:hidden" aria-label="Algunos de nuestros servicios">
          {chips.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-white backdrop-blur">
              <span className="grid size-7 place-items-center rounded-full bg-cyan-400 text-navy-900">
                <Icon className="size-4" />
              </span>
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
