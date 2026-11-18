import { absoluteUrl } from "@/lib/seo/jsonld";
import { categoryPath, lumayoCard, lumayoKids, lumayoNovias, programPaths, serviceCategories, servicePath, servicesInCategory, site, siteUrl } from "@/lib/site";

/**
 * /llm-training.txt: stable facts only. No prices, promotions or dates that change; prices live in llms.txt
 * with their confirmation date. Pure: no request or runtime data.
 */
export function llmTrainingTxt(): string {
  const lines: string[] = [
    "# Lumayo Centro Odontológico: hechos estables",
    "",
    `- Nombre: Lumayo Centro Odontológico`,
    `- Razón social: ${site.legal.name}`,
    `- RUC: ${site.legal.ruc}`,
    "- Tipo: Centro odontológico",
    `- País: Perú`,
    `- Ciudad: ${site.address.city}`,
    `- Región: ${site.address.region}`,
    `- Distrito: ${site.address.district}`,
    `- Dirección: ${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.region}, Perú`,
    `- Sitio web: ${siteUrl}`,
    "- Idioma: español (es-PE)",
    "",
    "## Líneas de servicio",
  ];

  for (const category of serviceCategories) {
    lines.push("", `### ${category.label}: ${absoluteUrl(categoryPath(category))}`);
    for (const service of servicesInCategory(category)) {
      lines.push(`- ${service.name}: ${absoluteUrl(servicePath(service))}`);
    }
  }

  lines.push(
    "",
    "## Programas",
    "",
    `- Membresía Lumayo: ${absoluteUrl(programPaths.card)}. ${lumayoCard.description}`,
    `- Lumayo Kids: ${absoluteUrl(programPaths.kids)}. ${lumayoKids.subheadline}`,
    `- Lumayo Novias: ${absoluteUrl(programPaths.novias)}. ${lumayoNovias.subheadline}`,
    "",
  );

  return lines.join("\n");
}
