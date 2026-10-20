import Image from "next/image";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";

const reasons = [
  "Te explicamos tu diagnóstico y tus opciones antes de empezar.",
  "Equipos modernos para tratamientos más precisos y cómodos.",
  "Instrumental esterilizado y protocolos estrictos de bioseguridad.",
  "Atención para toda la familia, desde los más pequeños.",
];

/**
 * Overlapping Azul profundo and white blocks, modeled on the manual's business card:
 * the photo sits on the blue block, the copy on a white card that overlaps it.
 */
export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="relative isolate overflow-hidden bg-bg pb-16 lg:pb-20">
      <SectionBackdrop glow="br" />
      <div className="container-page relative lg:flex lg:min-h-[36rem] lg:items-center lg:justify-end">
        {/* Blue block with the photo */}
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary p-3 sm:p-4 lg:absolute lg:inset-y-0 lg:left-6 lg:w-[58%]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
            {/* High-resolution photo (Unsplash License), served as-is without Next image optimization */}
            <Image
              src="https://images.unsplash.com/photo-1663755489920-5e09f66d011a?w=2400&q=90&fm=jpg"
              alt="Odontóloga atendiendo a un paciente sonriente"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>
          <p className="pill pill-solid absolute left-7 top-7 sm:left-8 sm:top-8 lg:bottom-8 lg:top-auto">Atención cercana</p>
        </Reveal>

        {/* White card overlapping the blue block */}
        <Reveal
          delay={0.12}
          className="relative z-10 -mt-12 overflow-hidden rounded-2xl bg-bg p-6 shadow-lift sm:mx-6 sm:p-10 lg:mx-0 lg:mt-0 lg:w-[50%]"
        >
          <IsotypeWatermark className="-bottom-12 -left-14 w-64" />
          <p className="relative flex items-center gap-3 text-sm font-medium tabular-nums text-primary">
            03
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            Por qué Lumayo
          </p>
          <h2 id="nosotros-title" className="section-title relative mt-4">
            Cuidamos tu sonrisa <strong>con experiencia y calidez</strong>
          </h2>
          <p className="relative mt-4 text-pretty leading-relaxed text-text sm:text-lg">
            Sabemos que ir al dentista puede dar nervios. Por eso te atendemos sin apuros, te explicamos
            cada paso y cuidamos cada detalle de tu visita.
          </p>
          <ul className="relative mt-6 divide-y divide-border border-y border-border">
            {reasons.map((r) => (
              <li key={r} className="flex gap-3 py-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-surface-deep">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="leading-relaxed text-heading">{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
