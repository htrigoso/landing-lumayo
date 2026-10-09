import { ArrowRightIcon, CalendarIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { fullAddress, site } from "@/lib/site";

export function Location({ number }: { number: string }) {
  return (
    <section id="ubicacion" aria-labelledby="ubicacion-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium tabular-nums text-navy-700">
            {number}
            <span aria-hidden="true" className="h-px w-8 bg-navy-700/40" />
            Ubicación
          </p>
          <h2 id="ubicacion-title" className="section-title mt-4">
            Visítanos <strong>en Tarapoto</strong>
          </h2>

          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-100 text-cyan-700">
                <PinIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-700">Dirección</h3>
                <p className="mt-0.5 text-ink-600">{fullAddress}</p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-cyan-700 hover:text-navy-700"
                >
                  Cómo llegar <ArrowRightIcon className="size-4" />
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-100 text-cyan-700">
                <WhatsappIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-700">WhatsApp y llamadas</h3>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="mt-0.5 inline-flex min-h-11 items-center text-lg font-semibold text-ink-900 hover:text-cyan-700"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-100 text-cyan-700">
                <CalendarIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-700">Horario de atención</h3>
                <p className="mt-0.5 text-ink-600">Escríbenos y te indicamos los horarios disponibles de la semana.</p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] rounded-tr-[5rem] border border-line shadow-soft">
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
