import { BookingForm } from "@/components/booking/BookingForm";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { defaultWhatsappMessage, site, whatsappUrl } from "@/lib/site";

/** Booking band on Azul clínico (one of the manual's official background combinations). */
export function BookingSection({ number }: { number: string }) {
  return (
    <section id="reservar" aria-labelledby="reservar-title" className="relative isolate overflow-hidden bg-navy-500 py-20 text-white lg:py-24">
      <SectionBackdrop lines="tr" glow="bl" surface="deep" />
      {/* Isotype as on the brandbook ID badges: the crown stays whole, only the roots run off the bottom edge */}
      <IsotypeWatermark tone="dark" className="-bottom-44 left-[4%] -z-10 w-[24rem] !opacity-[0.1] sm:w-[30rem] lg:-bottom-52 lg:left-[6%] lg:w-[34rem]" />
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-20">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium tabular-nums text-sky-100/85">
            {number}
            <span aria-hidden="true" className="h-px w-8 bg-sky-100/50" />
            Reserva
          </p>
          <h2 id="reservar-title" className="section-title mt-4 !text-white">
            Agenda tu <strong>visita hoy</strong>
          </h2>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-sky-100/90">
            Déjanos tus datos y te confirmamos el horario por WhatsApp. Sin registros ni contraseñas.
          </p>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-cyan-300 decoration-2 underline-offset-4 hover:text-cyan-300"
          >
            <WhatsappIcon className="size-5" />
            O escríbenos directo al {site.phoneDisplay}
          </a>
        </Reveal>

        {/* Narrow, tall booking card with its own brand header */}
        <Reveal delay={0.1} className="mx-auto w-full max-w-md lg:max-w-none">
          <BookingForm className="text-ink-900 shadow-[0_24px_60px_-28px_rgb(1_42_72/0.55)]" />
        </Reveal>
      </div>
    </section>
  );
}
