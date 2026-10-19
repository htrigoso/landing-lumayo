import type { ReactNode } from "react";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { CheckIcon, WhatsappIcon } from "@/components/icons";
import { ArchPair } from "@/components/lumayo-novias/ArchPair";
import { PersonaCards } from "@/components/lumayo-novias/PersonaCards";
import { TreatmentsCarousel, type TreatmentCarouselItem } from "@/components/lumayo-novias/TreatmentsCarousel";
import { WeddingPlanner } from "@/components/lumayo-novias/WeddingPlanner";
import { Reveal } from "@/components/motion/Reveal";
import { lumayoNovias, noviasWhatsappMessage, services, whatsappUrl } from "@/lib/site";

const treatmentItems: TreatmentCarouselItem[] = lumayoNovias.treatmentIds.flatMap((id) => {
  const service = services.find((s) => s.id === id);
  if (!service) return [];
  const meta = lumayoNovias.treatmentMeta[id];
  return [
    {
      id: service.id,
      name: service.name,
      image: service.image,
      when: meta.when,
      achieves: meta.achieves,
      idealFor: service.details.idealFor,
      badge: service.id === "limpieza" ? "Empieza por aquí" : undefined,
    },
  ];
});

/** Wraps the last `count` words of a headline in <strong>. */
function emphasizeLast(text: string, count: number): ReactNode {
  const words = text.split(" ");
  const head = words.slice(0, -count).join(" ");
  const tail = words.slice(-count).join(" ");
  return (
    <>
      {`${head} `}
      <strong>{tail}</strong>
    </>
  );
}

function ReserveButton({ className = "" }: { className?: string }) {
  return (
    <a href={whatsappUrl(noviasWhatsappMessage)} target="_blank" rel="noopener" className={`btn btn-wa text-base ${className}`}>
      <WhatsappIcon />
      Reservar evaluación
    </a>
  );
}

/** Lumayo Novias landing content. The page renders WhyChooseUs after this section. */
export function LumayoNovias() {
  return (
    <>
      <section aria-labelledby="novias-title" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <SectionAtmosphere lines="bl" glow="tr" washTop="mist" isotype="br" />

        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-medium text-azul-700">
              <span aria-hidden="true" className="h-px w-8 bg-azul-700/40" />
              Tu día, tu sonrisa
            </p>
            <h2 id="novias-title" className="section-title mt-4">
              {emphasizeLast(lumayoNovias.headline, 3)}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-600">{lumayoNovias.subheadline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {lumayoNovias.trustChips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full bg-aqua-100 px-4 py-2 text-sm font-semibold text-azul-800"
                >
                  <CheckIcon className="size-4 text-aqua-600" />
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#cronograma" className="btn btn-wa text-base">
                Calcular mi cronograma
              </a>
              <a href={whatsappUrl(noviasWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-outline text-base">
                Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal>
            <ArchPair />
          </Reveal>
        </div>
      </section>


      <section aria-labelledby="momentos-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading
            number="01"
            label="Momentos"
            id="momentos-title"
            layout="stack"
            title={<>Tu sonrisa en <strong>cada momento</strong></>}
          />
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lumayoNovias.moments.map((moment, i) => (
              <Reveal key={moment.title} className="h-full" delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span aria-hidden="true" className="font-display text-5xl font-extrabold leading-none text-aqua-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-azul-700">{moment.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-600">{moment.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="persona-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" glow="bl" />

        <div className="container-page">
          <SectionHeading
            number="02"
            label="Para ti"
            id="persona-title"
            layout="stack"
            title={<>¿Para quién es <strong>tu plan?</strong></>}
          />
          <div className="mt-12">
            <PersonaCards personas={lumayoNovias.personas} />
          </div>
        </div>
      </section>

      <section id="tratamientos" aria-labelledby="tratamientos-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading
            number="03"
            label="Tratamientos"
            id="tratamientos-title"
            layout="stack"
            title={<>Cuándo empezar <strong>cada tratamiento</strong></>}
          />
          <Reveal className="mt-12">
            <TreatmentsCarousel items={treatmentItems} />
          </Reveal>
          <Reveal className="mt-10">
            <p className="rounded-3xl bg-azul-50 p-6 text-base leading-relaxed text-ink-600">{lumayoNovias.whiteningNote}</p>
          </Reveal>
        </div>
      </section>

      <section id="cronograma" aria-labelledby="cronograma-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" glow="tl" />

        <div className="container-page">
          <SectionHeading
            number="04"
            label="Cronograma"
            id="cronograma-title"
            layout="stack"
            title={<>Tu cronograma <strong>a medida</strong></>}
            description="Elige tu fecha de boda y tus tratamientos. Te mostramos cuándo empezar cada uno."
          />
          <Reveal className="mt-10">
            <WeddingPlanner />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="proceso-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere lines="tr" />

        <div className="container-page">
          <SectionHeading
            number="05"
            label="Proceso"
            id="proceso-title"
            layout="stack"
            title={<>Así <strong>trabajamos</strong></>}
          />
          <div className="relative mt-12">
            <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-azul-300 md:block" />
            <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-10 border-l border-azul-300 pl-6 md:grid-cols-4 md:gap-8 md:border-l-0 md:pl-0">
              {lumayoNovias.process.map((step, i) => (
                <li key={step.title}>
                  <span className="-ml-12 mb-4 grid size-12 place-items-center rounded-full bg-azul-700 font-display text-lg font-bold text-white md:relative md:z-10 md:mx-auto">
                    {i + 1}
                  </span>
                  <div className="md:text-center">
                    <h3 className="text-lg font-bold text-azul-700">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="preparacion-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" isotype="br" />

        <div className="container-page">
          <SectionHeading
            number="06"
            label="Preparación"
            id="preparacion-title"
            layout="stack"
            title={<>Cuida tu sonrisa <strong>antes del gran día</strong></>}
          />
          <Reveal className="mt-10">
            <div className="rounded-[2rem] border border-azul-200 p-2">
              <div className="rounded-[1.5rem] border border-azul-100 bg-white p-6 sm:p-10">
                <h3 className="font-display text-2xl font-extrabold text-azul-700">{lumayoNovias.weekBefore.title}</h3>
                <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                  {lumayoNovias.weekBefore.tips.map((tip) => (
                    <li key={tip} className="flex gap-3 text-base leading-relaxed text-ink-600">
                      <CheckIcon className="mt-1 size-5 shrink-0 text-aqua-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="inversion-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading
            number="07"
            label="Inversión"
            id="inversion-title"
            layout="stack"
            title={<>¿Cuánto <strong>cuesta?</strong></>}
          />
          <Reveal>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
              Cada sonrisa es distinta. Primero hacemos un diagnóstico y, con él, el especialista te entrega un presupuesto a tu medida.
              Sin compromiso.
            </p>
            <ReserveButton className="mt-8" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="faq-novias-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" lines="tr" />

        <div className="container-page">
          <SectionHeading
            number="08"
            label="Preguntas"
            id="faq-novias-title"
            layout="stack"
            title={<>Preguntas <strong>frecuentes</strong></>}
          />
          <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-10">
            <FaqAccordion items={[...lumayoNovias.faqs]} />
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-novias-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere washBottom="mist" />

        <div className="container-page">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-azul-700 p-8 text-white sm:p-12">
              <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
              <div className="relative max-w-2xl">
                <h2 id="cta-novias-title" className="section-title !text-white">
                  Tu sonrisa, <strong>lista para el gran día</strong>
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-azul-100 sm:text-lg">
                  Escríbenos por WhatsApp y te explicamos cómo empezar tu plan Lumayo Novias.
                </p>
                <a href={whatsappUrl(noviasWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-light mt-8 text-base">
                  <WhatsappIcon />
                  Reservar evaluación
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
