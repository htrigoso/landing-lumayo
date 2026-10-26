import { ArrowRightIcon, CalendarIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { fullAddress, site } from "@/lib/site";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";

export function Location({ number }: { number: string }) {
  return (
    <section id="ubicacion" aria-labelledby="ubicacion-title" className="relative isolate overflow-hidden bg-bg pb-16 lg:pb-20">
      <SectionBackdrop lines="bl" glow="tr" />
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium tabular-nums text-primary">
            {number}
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            Ubicación
          </p>
          <h2 id="ubicacion-title" className="section-title mt-4">
            Visítanos <strong>en Tarapoto</strong>
          </h2>

          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-text-inverse">
                <PinIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-heading">Dirección</h3>
                <p className="mt-0.5 text-text">{fullAddress}</p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-text hover:text-primary"
                >
                  Cómo llegar <ArrowRightIcon className="size-4" />
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-text-inverse">
                <WhatsappIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-heading">WhatsApp y llamadas</h3>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="mt-0.5 inline-flex min-h-11 items-center text-lg font-semibold text-heading hover:text-accent-text"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-text-inverse">
                <CalendarIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-heading">Horario de atención</h3>
                <p className="mt-0.5 text-text">{site.hours.days}</p>
                {site.hoursShiftLines.map((line) => (
                  <p key={line} className="whitespace-nowrap text-text">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title={`Mapa de Lumayo: ${fullAddress}`}
            src={site.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full lg:aspect-[5/4]"
          />
        </Reveal>
      </div>
    </section>
  );
}
