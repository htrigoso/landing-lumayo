import Image from "next/image";
import { CheckIcon, ToothIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

const reasons = [
  "Te explicamos tu diagnóstico y tus opciones antes de empezar.",
  "Equipos modernos para tratamientos más precisos y cómodos.",
  "Instrumental esterilizado y protocolos estrictos de bioseguridad.",
  "Atención para toda la familia, desde los más pequeños.",
];

function Seal() {
  return (
    <div className="absolute -right-3 -top-5 size-24 sm:-right-5 sm:size-28" aria-hidden="true">
      <div className="relative size-full rounded-full bg-cyan-400 shadow-lift">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_24s_linear_infinite] text-navy-900">
          <defs>
            <path id="seal-circle" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
          </defs>
          <text fontSize="8" fontWeight="700" letterSpacing="1.4" fill="currentColor">
            <textPath href="#seal-circle">CENTRO ODONTOLÓGICO · TARAPOTO ·</textPath>
          </text>
        </svg>
        <ToothIcon className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-navy-900" />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="bg-sky-50 py-20 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/dentist.webp"
              alt="Odontólogo de Lumayo atendiendo a un paciente"
              fill
              sizes="(min-width: 1024px) 34rem, 92vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <Seal />
          <p
            aria-hidden="true"
            className="absolute -bottom-5 left-5 rotate-[-3deg] rounded-2xl bg-cream-50 px-4 py-2 font-hand text-2xl leading-none text-navy-700 shadow-soft"
          >
            Aquí te escuchamos
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="pill bg-white">Por qué Lumayo</p>
          <h2 id="nosotros-title" className="section-title mt-4">
            Cuidamos tu sonrisa con experiencia y calidez
          </h2>
          <p className="section-sub mt-4">
            Sabemos que ir al dentista puede dar nervios. Por eso te atendemos sin apuros, te explicamos
            cada paso y cuidamos cada detalle de tu visita.
          </p>
          <ul className="mt-7 space-y-3.5">
            {reasons.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan-500 text-white">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="leading-relaxed text-ink-900">{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
