import { hoursText } from "./text";
import { site, siteUrl, whatsappUrl, defaultWhatsappMessage } from "@/lib/site";

/** /humans.txt: organization, location, contact and site information. No team names. Pure. */
export function humansTxt({ lastUpdated }: { lastUpdated: string }): string {
  return [
    "# humans.txt",
    "# Lumayo Centro Odontológico",
    "",
    "/* ORGANIZACIÓN */",
    "    Nombre: Lumayo Centro Odontológico",
    `    Razón social: ${site.legal.name}`,
    `    RUC: ${site.legal.ruc}`,
    `    Sitio: ${siteUrl}`,
    "    País: Perú",
    "",
    "/* SEDE */",
    `    Dirección: ${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.region}, Perú`,
    `    Mapa: ${site.mapsUrl}`,
    "",
    "/* CONTACTO */",
    `    Correo: ${site.email}`,
    `    Teléfono: ${site.phoneDisplay}`,
    `    WhatsApp: ${whatsappUrl(defaultWhatsappMessage)}`,
    `    Formulario: ${siteUrl}/contacto`,
    `    Horario: ${hoursText()}`,
    "",
    "/* REDES */",
    `    Facebook: ${site.social.facebook}`,
    `    Instagram: ${site.social.instagram}`,
    `    TikTok: ${site.social.tiktok}`,
    "",
    "/* SITIO */",
    "    Idioma: es-PE",
    "    Componentes: Next.js, React, TypeScript, Tailwind CSS, MUI, schema-dts",
    `    Última actualización: ${lastUpdated}`,
    "",
  ].join("\n");
}
