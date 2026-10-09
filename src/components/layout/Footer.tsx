import Image from "next/image";
import { FlowLines } from "@/components/decor/FlowLines";
import { CalendarIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, fullAddress, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-900 pb-28 pt-10 text-sky-100 lg:pb-12">
      <FlowLines tone="dark" flip className="absolute inset-x-0 bottom-0 -z-10 h-10 w-full opacity-70 sm:h-14" />
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/lumayo-logo-small-white.svg" alt="Lumayo Centro Odontológico" width={1380} height={450} unoptimized className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sky-100/80">
            Tecnología, confianza y atención cercana para tu sonrisa.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Contacto</h2>
          <ul className="mt-3 space-y-1 text-sm text-sky-100/80">
            <li>
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2 hover:text-white"
              >
                <WhatsappIcon className="size-4 text-[#3ddc84]" />
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                Llamar al {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Dirección</h2>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener"
            className="mt-3 flex gap-2 text-sm leading-relaxed text-sky-100/80 hover:text-white"
          >
            <PinIcon className="mt-0.5 size-4 shrink-0 text-cyan-300" />
            {fullAddress}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Horario de atención</h2>
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-sky-100/80">
            <CalendarIcon className="mt-0.5 size-4 shrink-0 text-cyan-300" />
            Escríbenos y te indicamos los horarios disponibles.
          </p>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-sky-100/60">
        © Lumayo Centro Odontológico · Tarapoto, Perú
      </div>
    </footer>
  );
}
