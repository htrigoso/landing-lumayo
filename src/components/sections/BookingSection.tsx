import { BookingForm } from "@/components/booking/BookingForm";
import { Ribbons } from "@/components/decor/Ribbons";
import { WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { defaultWhatsappMessage, site, whatsappUrl } from "@/lib/site";

export function BookingSection() {
  return (
    <section id="reservar" aria-labelledby="reservar-title" className="bg-gradient-to-b from-white to-sky-50 py-16 lg:py-20">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-sky-200 p-6 sm:p-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12 lg:p-12">
          <div aria-hidden="true" className="absolute -left-20 -top-20 size-64 rounded-full bg-white/40" />
          <Ribbons side="right" className="absolute -right-40 -top-16 h-[140%] w-[26rem] opacity-60" />

          <div className="relative">
            <p className="font-hand text-2xl text-cyan-700">¿Empezamos hoy?</p>
            <h2 id="reservar-title" className="section-title mt-1">
              Agenda tu visita hoy
            </h2>
            <p className="section-sub mt-3 !text-navy-700/80">
              Déjanos tus datos y te confirmamos el horario por WhatsApp. Sin registros ni contraseñas.
            </p>
            <a
              href={whatsappUrl(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-700 underline decoration-cyan-500 decoration-2 underline-offset-4 hover:text-cyan-700"
            >
              <WhatsappIcon className="size-5 text-wa-600" />
              O escríbenos directo al {site.phoneDisplay}
            </a>
          </div>

          <BookingForm layout="split" headingId="reservar-title" className="relative mt-8 lg:mt-0" />
        </Reveal>
      </div>
    </section>
  );
}
