import Image from "next/image";
import Link from "next/link";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { ArrowRightIcon, CalendarIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import {
  categoryPath,
  defaultWhatsappMessage,
  fullAddress,
  serviceCategories,
  serviceHref,
  serviceName,
  site,
  whatsappUrl,
} from "@/lib/site";

const orthodonticsCategory = serviceCategories.find((c) => c.id === "ortodoncia");

/** Main services linked from the footer, ordered by search volume. */
const footerServices = [
  { label: "Brackets", href: orthodonticsCategory ? categoryPath(orthodonticsCategory) : "/servicios" },
  { label: serviceName("endodoncia"), href: serviceHref("endodoncia") },
  { label: serviceName("protesis"), href: serviceHref("protesis") },
  { label: serviceName("blanqueamiento"), href: serviceHref("blanqueamiento") },
  { label: serviceName("implantes"), href: serviceHref("implantes") },
  { label: serviceName("limpieza"), href: serviceHref("limpieza") },
  { label: serviceName("diseno-de-sonrisa"), href: serviceHref("diseno-de-sonrisa") },
  { label: serviceName("odontopediatria"), href: serviceHref("odontopediatria") },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-surface-deep pb-28 pt-10 text-text-inverse-muted lg:pb-12">
      <IsotypeWatermark tone="dark" className="-bottom-24 -right-16 -z-10 w-[26rem]" />
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/lumayo-logo-descriptor-white.svg" alt="Lumayo Centro Odontológico" width={534} height={180} unoptimized className="h-16 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-inverse-muted/80">
            Tecnología, confianza y atención cercana para tu sonrisa.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-text-inverse">Servicios</h2>
          <ul className="mt-3 text-sm text-text-inverse-muted/80">
            {footerServices.map((service) => (
              <li key={service.label}>
                <Link href={service.href} className="inline-flex min-h-9 items-center gap-2 hover:text-text-inverse">
                  {service.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/servicios" className="inline-flex min-h-9 items-center gap-2 hover:text-text-inverse">
                Ver todos los servicios
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-text-inverse">Contacto</h2>
          <ul className="mt-3 space-y-1 text-sm text-text-inverse-muted/80">
            <li>
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2 hover:text-text-inverse"
              >
                <WhatsappIcon className="size-4 text-accent" />
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 hover:text-text-inverse">
                Llamar al {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href="/contacto" className="inline-flex min-h-11 items-center gap-2 hover:text-text-inverse">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-text-inverse">Visítanos</h2>
          <div className="mt-3 space-y-4">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="flex gap-2 text-sm leading-relaxed text-text-inverse-muted/80 hover:text-text-inverse"
            >
              <PinIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              {fullAddress}
            </a>
            <p className="flex gap-2 text-sm leading-relaxed text-text-inverse-muted/80">
              <CalendarIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                <span className="block">{site.hours.days}</span>
                {site.hoursShiftLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-text-inverse-muted/60">
        © Lumayo Centro Odontológico · Tarapoto, Perú
      </div>
    </footer>
  );
}
