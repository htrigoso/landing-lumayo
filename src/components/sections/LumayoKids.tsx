import type { ReactNode } from "react";
import Image from "next/image";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { CheckIcon, WhatsappIcon } from "@/components/icons";
import { AgeStagesCarousel, type AgeStageCarouselItem } from "@/components/lumayo-kids/AgeStagesCarousel";
import { FirstVisitTimeline } from "@/components/lumayo-kids/FirstVisitTimeline";
import { HomeCarePanel } from "@/components/lumayo-kids/HomeCarePanel";
import { KidIllustration } from "@/components/lumayo-kids/KidIllustration";
import { Reveal } from "@/components/motion/Reveal";
import { kidsWhatsappMessage, lumayoKids, services, whatsappUrl } from "@/lib/site";

type KidTreatment = {
  id: string;
  name: string;
  description: string;
  image: string;
  idealFor: string;
};

/** Services listed for kids, resolved from `services`; unknown ids are skipped. */
const treatmentItems: KidTreatment[] = lumayoKids.treatmentIds.flatMap((id) => {
  const service = services.find((s) => s.id === id);
  if (!service) return [];
  return [
    {
      id: service.id,
      name: service.name,
      description: service.description,
      image: service.image,
      idealFor: service.details.idealFor,
    },
  ];
});

/** Age stages resolved to their service photo via `serviceId`; unknown ids are skipped. */
const stageItems: AgeStageCarouselItem[] = lumayoKids.stages.flatMap((stage) => {
  const service = services.find((s) => s.id === stage.serviceId);
  if (!service) return [];
  return [
    {
      id: stage.serviceId,
      age: stage.age,
      title: stage.title,
      tips: [...stage.tips],
      image: service.image,
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
    <a href={whatsappUrl(kidsWhatsappMessage)} target="_blank" rel="noopener" className={`btn btn-wa text-base ${className}`}>
      <WhatsappIcon />
      Reservar primera visita
    </a>
  );
}

/** Lumayo Kids landing content. The page renders WhyChooseUs after this section. */
export function LumayoKids() {
  return (
    <>
      <section aria-labelledby="kids-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere lines="bl" glow="tr" washTop="mist" isotype="br" />

        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="min-w-0">
            <p className="flex items-center gap-3 text-sm font-medium text-navy-700">
              <span aria-hidden="true" className="h-px w-8 bg-navy-700/40" />
              Para los más pequeños
            </p>
            <h2 id="kids-title" className="section-title mt-4">
              {emphasizeLast(lumayoKids.headline, 2)}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-600">{lumayoKids.subheadline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {lumayoKids.trustChips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-100/70 px-4 py-2 text-sm font-semibold text-navy-700"
                >
                  <CheckIcon className="size-4 text-cyan-700" />
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ReserveButton />
              <a href="#primera-visita" className="btn btn-outline text-base">
                Ver qué esperar
              </a>
            </div>
          </Reveal>

          <Reveal className="min-w-0">
            <KidIllustration />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="etapas-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere tone="mist" glow="bl" />

        <div className="container-page">
          <SectionHeading
            number="01"
            label="Etapas"
            id="etapas-title"
            layout="stack"
            title={<>Cuidados según <strong>la edad</strong></>}
          />
          <Reveal className="mt-12 min-w-0">
            <AgeStagesCarousel items={stageItems} />
          </Reveal>
        </div>
      </section>

      <WaveDivider from="bg-white" to="var(--color-navy-700)" />
      <section id="primera-visita" aria-labelledby="primera-title" className="relative isolate overflow-hidden bg-navy-700 py-16 text-white lg:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
          <SectionBackdrop lines="tr" glow="bl" surface="deep" />
        </div>

        <div className="container-page">
          <SectionHeading
            number="02"
            label="Primera visita"
            id="primera-title"
            tone="dark"
            layout="stack"
            title={<>Tu primera visita, <strong>paso a paso</strong></>}
          />
          <FirstVisitTimeline steps={lumayoKids.firstVisit.steps} />
          <Reveal className="mt-14 flex flex-col items-start gap-5 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-white">¿Listo para la primera visita?</p>
            <ReserveButton />
          </Reveal>
        </div>
      </section>
      <WaveDivider from="bg-navy-700" to="#ffffff" flip />

      <section aria-labelledby="comodidad-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere lines="tr" />

        <div className="container-page">
          <Reveal>
            <div className="rounded-[2rem] border border-navy-700/20 p-2">
              <div className="rounded-[1.5rem] border border-navy-700/10 bg-white p-6 sm:p-10">
                <h3 id="comodidad-title" className="font-display text-2xl font-extrabold text-navy-700">
                  {lumayoKids.comfort.title}
                </h3>
                <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                  {lumayoKids.comfort.points.map((point) => (
                    <li key={point} className="flex min-w-0 gap-3 text-base leading-relaxed text-ink-600">
                      <CheckIcon className="mt-1 size-5 shrink-0 text-cyan-700" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="casa-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere tone="mist" glow="tr" />

        <div className="container-page">
          <SectionHeading
            number="03"
            label="En casa"
            id="casa-title"
            layout="stack"
            title={<>Cuidados <strong>en casa</strong></>}
          />
          <div className="mt-12">
            <HomeCarePanel homeCare={lumayoKids.homeCare} />
          </div>
        </div>
      </section>

      <section aria-labelledby="tratamientos-kids-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading
            number="04"
            label="Tratamientos"
            id="tratamientos-kids-title"
            layout="stack"
            title={<>Tratamientos <strong>para niños</strong></>}
          />
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentItems.map((item, i) => (
              <Reveal key={item.id} className="h-full min-w-0" delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_18px_40px_-28px_rgb(7_42_76/0.4)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sky-100">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {item.id === "odontopediatria" ? (
                      <span className="absolute left-4 top-4 rounded-full bg-navy-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                        Empieza por aquí
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-navy-700">{item.name}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-600">{item.description}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-600">
                      <span className="font-semibold text-navy-700">Ideal para: </span>
                      {item.idealFor}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="inversion-kids-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading
            number="05"
            label="Inversión"
            id="inversion-kids-title"
            layout="stack"
            title={<>¿Cuánto <strong>cuesta?</strong></>}
          />
          <Reveal>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
              Primero revisamos a tu hijo y luego te entregamos un presupuesto a tu medida. Sin compromiso.
            </p>
            <ReserveButton className="mt-8" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="faq-kids-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere tone="mist" lines="tr" />

        <div className="container-page">
          <SectionHeading
            number="06"
            label="Preguntas"
            id="faq-kids-title"
            layout="stack"
            title={<>Preguntas <strong>frecuentes</strong></>}
          />
          <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-10">
            <FaqAccordion items={[...lumayoKids.faqs]} />
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-kids-title" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
        <SectionAtmosphere washBottom="mist" />

        <div className="container-page">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 p-8 text-white sm:p-12">
              <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
              <div className="relative max-w-2xl">
                <h2 id="cta-kids-title" className="section-title !text-white">
                  Tu sonrisa, para toda la vida, <strong>empieza hoy</strong>
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-sky-100/85 sm:text-lg">
                  Escríbenos por WhatsApp y coordinamos la primera visita de tu hijo.
                </p>
                <a href={whatsappUrl(kidsWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa mt-8 text-base">
                  <WhatsappIcon />
                  Reservar primera visita
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
