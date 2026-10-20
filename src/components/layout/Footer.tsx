import Image from "next/image";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { CalendarIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, fullAddress, site, whatsappUrl } from "@/lib/site";

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
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-text-inverse">Dirección</h2>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener"
            className="mt-3 flex gap-2 text-sm leading-relaxed text-text-inverse-muted/80 hover:text-text-inverse"
          >
            <PinIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            {fullAddress}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-bold text-text-inverse">Horario de atención</h2>
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-text-inverse-muted/80">
            <CalendarIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            Escríbenos y te indicamos los horarios disponibles.
          </p>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-text-inverse-muted/60">
        © Lumayo Centro Odontológico · Tarapoto, Perú
      </div>
    </footer>
  );
}
