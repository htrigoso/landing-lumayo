"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

type Reason = { icon: string; title: string; text: string };

const left: Reason[] = [
  {
    icon: "/images/icon/icon-why-us-1.svg",
    title: "Equipo con experiencia",
    text: "Te explicamos tu diagnóstico y tus opciones antes de empezar.",
  },
  {
    icon: "/images/icon/icon-why-us-2.svg",
    title: "Atención personalizada",
    text: "Un plan pensado para tu caso, tu tiempo y tus objetivos.",
  },
  {
    icon: "/images/icon/icon-why-us-3.svg",
    title: "Presupuesto claro",
    text: "Conoces el costo de tu tratamiento desde la evaluación, sin sorpresas.",
  },
];

const right: Reason[] = [
  {
    icon: "/images/icon/icon-why-us-4.svg",
    title: "Respuesta rápida",
    text: "Escríbenos por WhatsApp y te ayudamos a agendar lo antes posible.",
  },
  {
    icon: "/images/icon/icon-why-us-5.svg",
    title: "Trato cercano",
    text: "Te atendemos sin apuros y cuidamos cada detalle de tu visita.",
  },
  {
    icon: "/images/icon/icon-why-us-6.svg",
    title: "Tecnología moderna",
    text: "Equipos actuales para tratamientos más precisos y cómodos.",
  },
];

/** One reason. On large screens the left column mirrors (text right-aligned, icon on the inside edge). */
function ReasonItem({ reason, side }: { reason: Reason; side: "left" | "right" }) {
  const mirrored = side === "left";
  return (
    <li className={`flex items-start gap-4 ${mirrored ? "lg:flex-row-reverse lg:text-right" : ""}`}>
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white shadow-soft">
        {/* eslint-disable-next-line @next/next/no-img-element -- small decorative SVG icon */}
        <img src={reason.icon} alt="" aria-hidden="true" width={30} height={30} className="size-[1.875rem]" />
      </span>
      <div>
        <h3 className="font-display text-lg font-bold leading-snug text-navy-700">{reason.title}</h3>
        <p className="mt-1 text-pretty leading-relaxed text-ink-600">{reason.text}</p>
      </div>
    </li>
  );
}

/** "Why choose us": six reasons around a floating tooth, as in the clinic's reference design. */
export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="por-que-elegirnos" aria-labelledby="por-que-title" className="relative overflow-hidden bg-sky-50 py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill mx-auto bg-white shadow-soft">Por qué elegirnos</p>
          <h2 id="por-que-title" className="section-title mt-5">
            Tu salud dental, <strong>en buenas manos</strong>
          </h2>
          <p className="section-sub mt-4">Lo que hace diferente tu visita a Lumayo, desde la primera consulta.</p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* Tooth: first on phones, centered between the columns on desktop */}
          <Reveal className="order-first mx-auto w-64 sm:w-72 lg:order-none lg:w-80">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/why-choose-us-img.png"
                alt="Diente sano, símbolo del cuidado dental de Lumayo"
                width={439}
                height={429}
                unoptimized
                className="h-auto w-full"
              />
            </motion.div>
          </Reveal>

          <Reveal delay={0.1} className="lg:order-first">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
              {left.map((r) => (
                <ReasonItem key={r.title} reason={r} side="left" />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
              {right.map((r) => (
                <ReasonItem key={r.title} reason={r} side="right" />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
