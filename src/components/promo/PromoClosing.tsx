import { WhatsappIcon, PhoneIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { PromoLink } from "./PromoLink";

/** Closing call to action before the booking band: WhatsApp first, phone second. */
export function PromoClosing() {
  return (
    <section aria-labelledby="cierre-title" className="bg-bg pb-4 pt-4 lg:pb-8">
      <Reveal className="container-page flex flex-col items-start gap-6 rounded-3xl bg-surface px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="cierre-title" className="section-title">
            Aprovecha el <strong>30% en diciembre</strong>
          </h2>
          <p className="mt-3 max-w-md text-pretty leading-relaxed text-text">Escríbenos y coordinamos tu cita. Atendemos de lunes a viernes.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <PromoLink cta="closing" className="btn btn-wa text-base">
            <WhatsappIcon />
            Reserva por WhatsApp
          </PromoLink>
          <PromoLink cta="closing_phone" href={`tel:${site.phoneE164}`} className="btn btn-outline text-base">
            <PhoneIcon />
            Llamar al {site.phoneDisplay}
          </PromoLink>
        </div>
      </Reveal>
    </section>
  );
}
