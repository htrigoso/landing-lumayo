import Image from "next/image";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { promo } from "@/lib/promo";
import { PromoLink } from "./PromoLink";

const steps = [
  {
    title: "Escríbenos por WhatsApp",
    text: "Menciona la promoción de diciembre en tu mensaje para que sepamos que quieres usar el descuento.",
  },
  {
    title: "Agenda tu evaluación",
    text: "Coordinamos tu cita en el centro. En tratamientos largos, revisamos tu caso antes de empezar.",
  },
  {
    title: `Aplica el ${promo.percent}%`,
    text: "El descuento se aplica al servicio o, en tratamientos largos, al precio total según las condiciones.",
  },
];

/** Three steps from first message to discount, with the photo of the clinic. */
export function PromoSteps() {
  return (
    <section aria-labelledby="pasos-title" className="relative isolate overflow-hidden bg-surface py-16 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            number="03"
            label="Cómo acceder"
            id="pasos-title"
            layout="stack"
            title={
              <>
                Tres pasos para <strong>usar tu descuento</strong>
              </>
            }
          />
          <ol className="mt-10 space-y-6">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.08} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-bold text-text-inverse tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-heading">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-text">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <PromoLink cta="steps" className="btn btn-wa mt-10 text-base">
            Escríbenos por WhatsApp
          </PromoLink>
        </div>

        <Reveal className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl bg-surface-soft">
          <Image src="/promociones/steps.webp" alt="Atención en el consultorio de Lumayo" fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
        </Reveal>
      </div>
    </section>
  );
}
