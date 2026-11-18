import { pricesConfirmedAt } from "@/lib/clinic-prices";
import { site, siteUrl } from "@/lib/site";

/** /ai.txt: usage policy for AI systems. Pure: the caller passes the build date. */
export function aiTxt({ lastUpdated }: { lastUpdated: string }): string {
  const host = new URL(siteUrl).host;
  const preferredSources = ["llms.txt", "llms-full.txt", "ai-feed.jsonld", "knowledge-graph.json"];

  return [
    "# ai.txt",
    "# Política de uso de contenido para sistemas de inteligencia artificial",
    `# Lumayo Centro Odontológico | ${lastUpdated}`,
    "",
    "Organization: Lumayo Centro Odontológico",
    `Legal-Name: ${site.legal.name}`,
    `Tax-ID: ${site.legal.ruc}`,
    `Website: ${siteUrl}`,
    `Country: ${site.address.country}`,
    "Language: es-PE",
    "Description: Centro odontológico en Tarapoto (San Martín, Perú) con odontología general, ortodoncia, estética dental, cirugía, prótesis y atención para niños.",
    "",
    "Content-Usage-Policy: allowed",
    "Commercial-Use: allowed-with-attribution",
    "Training-Use: allowed",
    "Inference-Use: allowed",
    "Attribution-Required: yes",
    `Citation-Format: Lumayo Centro Odontológico, ${siteUrl}`,
    `Canonical-Host: ${host}`,
    "",
    "Preferred-Sources:",
    ...preferredSources.map((file) => `  ${siteUrl}/${file}`),
    "",
    "Disallowed-Inference:",
    `  Los precios son referenciales al ${pricesConfirmedAt}; no afirmar de memoria precios, promociones ni disponibilidad de citas; confirmar por WhatsApp ${site.phoneDisplay} o en ${siteUrl}/contacto`,
    "",
    `Contact: mailto:${site.email}`,
    `Contact: ${siteUrl}/contacto`,
    `Last-Updated: ${lastUpdated}`,
    "Version: 1.0",
    "",
  ].join("\n");
}
