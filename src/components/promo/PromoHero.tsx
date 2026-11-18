import Image from "next/image";
import { WhatsappIcon } from "@/components/icons";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { promo } from "@/lib/promo";
import { PromoLink } from "./PromoLink";
import { PromoStatusLine } from "./PromoStatusLine";

/**
 * Hero of /promociones. "30%" is the first thing on a 390 px phone: it is HTML text, never part of the image.
 * The photo is /promociones/hero.webp (portrait); it sits below the copy on phones and beside it on desktop.
 */
export function PromoHero() {
  return (
    <section aria-labelledby="promo-title" className="relative isolate overflow-hidden bg-primary text-text-inverse pb-16 pt-10 lg:pb-24 lg:pt-16">
      <SectionBackdrop lines="tr" glow="bl" surface="deep" />
      <IsotypeWatermark tone="dark" className="-bottom-36 -left-10 -z-10 w-72 !opacity-[0.08] sm:w-96 lg:-bottom-44 lg:left-[4%] lg:w-[28rem]" />

      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-text-inverse">
            <span aria-hidden="true" className="h-px w-8 bg-text-inverse/60" />
            Promoción · Diciembre 2026
          </p>

          <h1 id="promo-title" className="mt-4 font-display leading-[0.9] tracking-[-0.04em]">
            <span className="block text-[clamp(7.5rem,40vw,13rem)] font-extrabold text-surface-accent">{promo.percent}%</span>
            <span className="mt-3 block text-2xl font-semibold leading-tight text-text-inverse sm:text-3xl">
              de descuento en todos nuestros servicios
            </span>
          </h1>

          <p className="mt-4 text-lg font-medium text-text-inverse">Todo diciembre 2026</p>
          <div className="mt-2 min-h-7">
            <PromoStatusLine />
          </div>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-text-inverse/85">
            Válido del 1 al 31 de diciembre de 2026.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PromoLink cta="hero" className="btn btn-light btn-pulse text-base" endedLabel="Reserva tu cita">
              <WhatsappIcon />
              Reserva por WhatsApp
            </PromoLink>
            <PromoLink cta="hero_services" href="#servicios" className="btn btn-ghost-light text-base">
              Ver servicios
            </PromoLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-azul-800 shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-azul-950)_60%,transparent)]">
            <Image src="/promociones/hero.webp" alt="" fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover" priority />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
