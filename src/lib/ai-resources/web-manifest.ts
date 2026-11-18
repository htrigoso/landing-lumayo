import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Web app manifest for /manifest.webmanifest (src/app/manifest.ts). Pure. */
export function webManifest(): MetadataRoute.Manifest {
  return {
    name: "Lumayo Centro Odontológico",
    short_name: "Lumayo",
    description: `Brackets, blanqueamiento dental, implantes, endodoncia, prótesis y odontopediatría en Tarapoto. Agenda tu cita por WhatsApp al ${site.phoneDisplay}.`,
    start_url: "/",
    display: "standalone",
    theme_color: "#2364C2",
    background_color: "#FFFFFF",
    lang: "es-PE",
    icons: [
      { src: "/images/lumayo-isotipo-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Servicios", url: "/servicios" },
      { name: "Contacto", url: "/contacto" },
    ],
  };
}
