"use client";

import { motion, type Variants } from "motion/react";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { ArrowRightIcon, WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/site";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/**
 * Brand statement, set like the brandbook's type pages: a white field in Azul profundo type,
 * the Titular (400 + 800) on the left, Subtítulo + Texto + actions on the right, and the
 * isotype cropped large in the corner as on the letterhead.
 */
export function BrandStatement() {
  return (
    <section aria-labelledby="statement-title" className="relative isolate overflow-hidden bg-white py-24 text-navy-700 lg:py-32">
      <SectionBackdrop lines="tl" glow="bl" />
      <IsotypeWatermark className="-bottom-24 -right-20 -z-10 w-[26rem] !opacity-[0.05] sm:w-[34rem] lg:-bottom-32 lg:-right-16 lg:w-[44rem]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12"
      >
        <div>
          {/* Brandbook "Etiqueta": Medium, uppercase, +12% */}
          <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-[0.12em] text-navy-500 sm:text-sm">
            Centro odontológico · Tarapoto
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="statement-title"
            className="mt-5 font-display text-[2.75rem] font-normal leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Aquí comienza
            <strong className="block font-extrabold">tu nueva sonrisa</strong>
          </motion.h2>
        </div>

        <div className="lg:pb-2">
          {/* Brandbook "Subtítulo" (Medium) over "Texto" (Regular 26/40) */}
          <motion.p variants={fadeUp} className="text-pretty text-xl font-medium leading-snug sm:text-2xl">
            Tu sonrisa nos inspira a dar el primer paso.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 max-w-md text-pretty leading-[1.54] text-ink-600">
            Agenda tu evaluación y descubre el tratamiento ideal para ti, con un equipo que te explica cada paso.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
            <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa shrink-0 whitespace-nowrap px-7 text-base sm:min-h-14">
              <WhatsappIcon />
              Escríbenos por WhatsApp
            </a>
            <a
              href="#reservar"
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold text-navy-700 underline decoration-navy-700/30 decoration-2 underline-offset-[6px] transition-colors hover:decoration-navy-700"
            >
              Reservar cita
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
