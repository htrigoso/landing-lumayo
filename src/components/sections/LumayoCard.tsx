import Image from "next/image";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { FamilyOrbit } from "@/components/lumayo-card/FamilyOrbit";
import { CardQr } from "@/components/lumayo-card/CardQr";
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

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-4 text-white/90 sm:size-5" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.4c2.3.1 4 1.6 4.5 4.1" />
    </svg>
  );
}

function RenewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-4 text-white/90 sm:size-5" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 14-5.2M20 12a8 8 0 0 1-14 5.2" />
      <path d="M18.5 3.5v4h-4M5.5 20.5v-4h4" />
    </svg>
  );
}

function CardFront() {
  return (
    <div
      role="img"
      aria-label="Lumayo Card: membresía anual de protección odontológica, sin datos personales y con código QR único por cliente (ilustrativo)"
      className="group relative aspect-[1.586] w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy-950 via-navy-700 to-teal-600 p-6 text-white shadow-[0_40px_80px_-30px_rgb(1_42_72/0.7)] transition-transform duration-500 ease-out [transform-style:preserve-3d] hover:[transform:rotateX(4deg)_rotateY(-6deg)] motion-reduce:transition-none motion-reduce:hover:[transform:none] sm:p-9"
    >
      <IsotypeWatermark tone="dark" className="-bottom-16 -right-14 w-72 !opacity-[0.1]" />
      <svg viewBox="0 0 400 240" className="pointer-events-none absolute inset-0 size-full text-white/10" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
        <circle cx="400" cy="120" r="90" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="120" r="140" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="120" r="190" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full motion-reduce:hidden" aria-hidden="true" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <Image src="/brand/lumayo-logo-white.svg" alt="" width={534} height={180} unoptimized className="h-6 w-auto sm:h-7" />
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-sky-100/90 backdrop-blur-sm sm:text-[0.6rem]">
            <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_1px_rgb(42_200_225/0.8)]" aria-hidden="true" />
            Activa
          </span>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-sky-100/80 sm:text-xs">Membresía familiar · Anual</p>
            <p className="mt-1 text-[clamp(1rem,4.6vw,1.6rem)] font-extrabold uppercase tracking-[0.14em] text-white [text-shadow:0_2px_12px_rgb(1_42_72/0.5)]">
              LUMAYO CARD
            </p>
            <span className="mt-3 inline-block max-w-full truncate rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-[0.5rem] font-medium uppercase tracking-[0.2em] text-sky-100/90 sm:text-[0.65rem]">
              Tu sonrisa, cuidada todo el año
            </span>
          </div>
          <div className="aspect-square w-[28%] shrink-0 rounded-2xl bg-white p-[0.4rem] text-navy-900 shadow-[0_10px_24px_-10px_rgb(1_42_72/0.6)]">
            <CardQr className="size-full" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-white/15 pt-3 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-sky-100/85 sm:text-xs">
          <span className="flex items-center gap-2">
            <PeopleIcon />
            1 titular + 6 beneficiarios
          </span>
          <span className="flex items-center gap-2">
            <RenewIcon />
            Vigencia 12 meses
          </span>
        </div>
      </div>
    </div>
  );
}

function CardStack() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-xl pb-6 pt-4 [perspective:1400px]">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-0 aspect-[1.586] rotate-[-7deg] rounded-[1.75rem] bg-gradient-to-br from-navy-900 to-navy-500 opacity-70 shadow-[0_30px_60px_-30px_rgb(1_42_72/0.6)] sm:inset-x-10"
      />
      <CardFront />
    </div>
  );
}

/** Lumayo Card section, adapted from the Multident Card reference layout. */
export function LumayoCard() {
  return (
    <>
      <section aria-labelledby="lumayo-card-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere lines="bl" glow="tr" washTop="mist" isotype="br" />

        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <CardStack />
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

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_12px_30px_-20px_rgb(7_42_76/0.35)]">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-600">Costo único anual</dt>
                <dd className="mt-2 font-display text-3xl font-extrabold text-navy-700">{lumayoCard.annualFee}</dd>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_12px_30px_-20px_rgb(7_42_76/0.35)]">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-600">Re-afiliación</dt>
                <dd className="mt-2 font-display text-3xl font-extrabold text-navy-700">{lumayoCard.reaffiliationFee}</dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-3">
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
                <SectionHeading
                  number="04"
                  label="Para toda la familia"
                  id="familia-title"
                  layout="stack"
                  title={<>Titular y <strong>6 adicionales</strong></>}
                  description="Una sola tarjeta para tu familia: protege a quienes más quieres con un solo plan."
                />
                <p className="mt-8 font-display text-6xl font-extrabold leading-none text-navy-700">{lumayoCard.family.countLabel}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">{lumayoCard.family.countCaption}</p>
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
              <FamilyOrbit />
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
    </>
  );
}
