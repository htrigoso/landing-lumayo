import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { CardBack, CardFront } from "@/components/lumayo-card/CardFaces";
import { CardPlanProvider } from "@/components/lumayo-card/CardPlanContext";
import { CardShowcase } from "@/components/lumayo-card/CardShowcase";
import { PlanFamilyCopy, PlanFamilyOrbit, PlanFees } from "@/components/lumayo-card/PlanDetails";
import { SavingsCalculator } from "@/components/lumayo-card/SavingsCalculator";
import {
  ChatIcon,
  CheckIcon,
  ImplantIcon,
  PinIcon,
  SmileIcon,
  SparkleIcon,
  ToothIcon,
  WhatsappIcon,
} from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { lumayoCard, lumayoCardWhatsappMessage, whatsappUrl } from "@/lib/site";

const tierIcons = [ToothIcon, SparkleIcon, ImplantIcon];
const stepIcons = [ChatIcon, PinIcon, SmileIcon];

/** Lumayo Card section, adapted from the Multident Card reference layout. */
export function LumayoCard() {
  return (
    <CardPlanProvider>
      <section aria-labelledby="lumayo-card-title" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <SectionAtmosphere lines="bl" glow="tr" washTop="mist" isotype="br" />

        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <CardShowcase
              classic={{ front: <CardFront />, back: <CardBack /> }}
              gold={{ front: <CardFront variant="gold" />, back: <CardBack variant="gold" /> }}
            />
          </Reveal>

          <Reveal>
            <p className="flex items-center gap-3 text-sm font-medium text-navy-700">
              <span aria-hidden="true" className="h-px w-8 bg-navy-700/40" />
              Protección odontológica
            </p>
            <h2 id="lumayo-card-title" className="section-title mt-4">
              Lumayo <strong>Card</strong>
            </h2>
            <p className="mt-5 inline-flex rounded-full bg-cyan-100/70 px-4 py-2 text-sm font-semibold text-navy-700 sm:text-base">
              {lumayoCard.heroHighlight}
            </p>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-600">{lumayoCard.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {lumayoCard.formats.map((f) => (
                <li key={f} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 sm:text-sm">
                  <CheckIcon className="size-4 text-cyan-700" />
                  {f}
                </li>
              ))}
            </ul>

            <PlanFees />

            <ul className="mt-3 flex flex-wrap gap-3">
              {lumayoCard.perks.map((perk) => (
                <li key={perk} className="inline-flex items-center gap-2 rounded-full bg-cyan-100/70 px-4 py-2 text-sm font-semibold text-navy-700">
                  <CheckIcon className="size-4 text-cyan-700" />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl(lumayoCardWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa text-base">
                <WhatsappIcon />
                Solicitar por WhatsApp
              </a>
              <a href="#beneficios" className="btn btn-outline text-base">
                Ver beneficios
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="beneficios" aria-labelledby="beneficios-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading number="01" label="Beneficios" id="beneficios-title" layout="stack" title={<>Descuentos <strong>por tratamiento</strong></>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {lumayoCard.tiers.map((tier, i) => {
              const Icon = tierIcons[i];
              const featured = i === 0;
              return (
                <Reveal key={tier.percent} className="h-full" delay={i * 0.08}>
                  <article
                    className={`relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-[0_18px_40px_-28px_rgb(7_42_76/0.4)] transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                      featured ? "border-2 border-cyan-500" : "border border-line"
                    }`}
                  >
                    {featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-cyan-100/70 px-3 py-1 text-xs font-semibold text-navy-700">
                        Mayor ahorro
                      </span>
                    )}
                    <div className="grid size-12 place-items-center rounded-2xl bg-sky-100 text-navy-700">
                      <Icon className="size-6" />
                    </div>
                    <p className="mt-6 font-display text-6xl font-extrabold leading-none tracking-[-0.04em] text-navy-700">
                      {tier.percent}
                      <span className="ml-2 align-middle text-base font-semibold uppercase tracking-[0.12em] text-cyan-700">de descuento</span>
                    </p>
                    <h3 className="mt-5 text-lg font-bold text-navy-700">{tier.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {tier.items.map((item) => (
                        <li key={item} className="flex gap-3 text-base leading-relaxed text-ink-600">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="calculadora-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" glow="bl" />

        <div className="container-page">
          <SectionHeading number="02" label="Calculadora" id="calculadora-title" layout="stack" title={<>¿Cuánto <strong>ahorras?</strong></>} description="Elige un monto y un nivel y mira cuánto ahorras con tu tarjeta." />
          <Reveal className="mt-10">
            <SavingsCalculator />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="como-obtenerla-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere lines="tl" />

        <div className="container-page">
          <SectionHeading
            number="03"
            label="Cómo obtenerla"
            id="como-obtenerla-title"
            layout="stack"
            title={<>Cómo obtener tu <strong>Lumayo Card</strong></>}
          />
          <ol className="relative mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-3 md:gap-8">
            <div aria-hidden="true" className="absolute left-[16.67%] right-[16.67%] top-6 hidden h-px bg-navy-700/25 md:block" />
            {lumayoCard.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-navy-700 font-display text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="md:mt-2">
                    <Icon className="size-6 text-cyan-700 md:mx-auto" />
                    <h3 className="mt-3 text-lg font-bold text-navy-700">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-600">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="familia-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" isotype="br" />

        <div className="container-page">
          <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_18px_40px_-28px_rgb(7_42_76/0.4)] sm:p-12">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <PlanFamilyCopy />
                <ul className="mt-6 space-y-3">
                  {lumayoCard.family.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-base leading-relaxed text-ink-600">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan-100/70">
                        <CheckIcon className="size-3.5 text-cyan-700" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl(lumayoCardWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa mt-8 text-base">
                  <WhatsappIcon />
                  {lumayoCard.family.cta}
                </a>
              </div>
              <PlanFamilyOrbit />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading number="05" label="Preguntas frecuentes" id="faq-title" layout="stack" title={<>Preguntas <strong>frecuentes</strong></>} />
          <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-10">
            <FaqAccordion items={[...lumayoCard.faqs]} />
          </div>
        </div>
      </section>

      <div className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" glow="tr" washBottom="mist" />

        <div className="container-page">
          <Reveal>
            <section aria-labelledby="cta-title" className="relative isolate overflow-hidden rounded-3xl bg-navy-900 p-8 text-white sm:p-12">
              <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
              <div className="relative max-w-2xl">
                <h2 id="cta-title" className="section-title !text-white">
                  Empieza a ahorrar desde tu <strong>primera visita</strong>
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-sky-100/85 sm:text-lg">
                  Escríbenos por WhatsApp y te explicamos cómo afiliarte a tu Lumayo Card.
                </p>
                <a href={whatsappUrl(lumayoCardWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa mt-8 text-base">
                  <WhatsappIcon />
                  Solicitar por WhatsApp
                </a>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </CardPlanProvider>
  );
}
