import type { ComponentType, ReactNode, SVGProps } from "react";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { ClockIcon, PhoneIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { defaultWhatsappMessage, fullAddress, site, whatsappUrl } from "@/lib/site";

type InfoCard = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: ReactNode;
};

const linkClass = "font-semibold text-navy-700 underline decoration-cyan-400 decoration-2 underline-offset-4 hover:text-navy-500";

const cards: InfoCard[] = [
  {
    icon: PinIcon,
    title: "Visítanos",
    body: (
      <>
        <span className="block">{fullAddress}</span>
        <a href={site.mapsUrl} target="_blank" rel="noopener" className={`mt-2 inline-block ${linkClass}`}>
          Cómo llegar
        </a>
      </>
    ),
  },
  {
    icon: PhoneIcon,
    title: "Llámanos",
    body: (
      <a href={`tel:${site.phoneE164}`} className={linkClass}>
        {site.phoneDisplay}
      </a>
    ),
  },
  {
    icon: ClockIcon,
    title: "Horario de atención",
    body: site.hoursDisplay,
  },
  {
    icon: WhatsappIcon,
    title: "WhatsApp",
    body: (
      <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener" className={linkClass}>
        Escríbenos ahora
      </a>
    ),
  },
];

/** Contact details (address, phone, hours, WhatsApp) and the embedded map, after the reference. */
export function ContactInfo() {
  return (
    <section aria-labelledby="contact-info-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <SectionBackdrop lines="bl" glow="tr" />
      <div className="container-page">
        <Reveal className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="pill pill-solid">Información de contacto</p>
            <h2 id="contact-info-title" className="section-title mt-5">
              Visítanos o <strong>escríbenos</strong>
            </h2>
          </div>
          <p className="section-sub text-pretty">
            Para agendar una cita o resolver tus dudas, escríbenos por WhatsApp, llámanos o acércate a nuestro consultorio en Tarapoto.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex flex-col gap-4 rounded-2xl border border-sky-200 bg-white p-6">
                <span className="grid size-12 place-items-center rounded-full bg-navy-700 text-white">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy-700">{title}</h3>
                  <div className="mt-1.5 text-pretty leading-relaxed text-ink-600">{body}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 overflow-hidden rounded-2xl border border-line">
          <iframe
            title={`Mapa de Lumayo: ${fullAddress}`}
            src={site.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full sm:aspect-[16/7]"
          />
        </Reveal>
      </div>
    </section>
  );
}
