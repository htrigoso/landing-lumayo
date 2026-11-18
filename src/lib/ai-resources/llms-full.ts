import { blogCategoryOf, posts, postPath } from "@/lib/blog";
import { clinicPricesFor } from "@/lib/clinic-prices";
import { absoluteUrl } from "@/lib/seo/jsonld";
import {
  categoryPath,
  lumayoCard,
  lumayoKids,
  lumayoNovias,
  programPaths,
  serviceCategories,
  servicePath,
  servicesInCategory,
  site,
  siteUrl,
} from "@/lib/site";
import { hoursText, pricesNote, priceText } from "./text";

/**
 * /llms-full.txt: the long-form companion to /llms.txt, in Markdown. Every fact, URL and FAQ comes from the
 * data the pages render (src/lib/site.ts, src/lib/clinic-prices.ts, src/lib/blog). Pure: no request or runtime data.
 */

type Faq = { q: string; a: string };

function faqLines(faqs: readonly Faq[]): string[] {
  return faqs.map((faq) => `  - **${faq.q}** ${faq.a}`);
}

function servicesSection(): string[] {
  const lines: string[] = ["## Servicios", "", pricesNote()];

  for (const category of serviceCategories) {
    lines.push(
      "",
      `### ${category.label}`,
      "",
      `Descripción: ${category.seo.description}`,
      `Página de la categoría: [${category.seo.title}](${absoluteUrl(categoryPath(category))})`,
    );
    for (const service of servicesInCategory(category)) {
      lines.push("", `#### ${service.name}`, "", `- URL: ${absoluteUrl(servicePath(service))}`, `- Descripción: ${service.description}`);
      const prices = clinicPricesFor(service.id);
      if (prices) lines.push(`- Precio confirmado por la clínica: ${prices.map(priceText).join("; ")}`);
    }
  }

  return lines;
}

function programsSection(): string[] {
  const { classic, gold } = lumayoCard.plans;

  return [
    "## Programas",
    "",
    "### Membresía Lumayo",
    "",
    `- URL: ${absoluteUrl(programPaths.card)}`,
    `- Descripción: ${lumayoCard.description}`,
    `- Plan ${classic.label}: cuota anual ${classic.annualFee}, reafiliación ${classic.reaffiliationFee}, hasta ${classic.maxAdditional} adicionales.`,
    `- Plan ${gold.label}: cuota anual ${gold.annualFee}, reafiliación ${gold.reaffiliationFee}, hasta ${gold.maxAdditional} adicionales.`,
    "- Preguntas frecuentes:",
    ...faqLines(lumayoCard.faqs),
    "",
    "### Lumayo Kids",
    "",
    `- URL: ${absoluteUrl(programPaths.kids)}`,
    `- Descripción: ${lumayoKids.subheadline}`,
    "- Preguntas frecuentes:",
    ...faqLines(lumayoKids.faqs),
    "",
    "### Lumayo Novias",
    "",
    `- URL: ${absoluteUrl(programPaths.novias)}`,
    `- Descripción: ${lumayoNovias.subheadline}`,
    "- Preguntas frecuentes:",
    ...faqLines(lumayoNovias.faqs),
  ];
}

function blogSection(): string[] {
  const lines: string[] = ["## Blog", "", "Artículos publicados, del más reciente al más antiguo."];

  for (const post of posts) {
    lines.push(
      "",
      `### ${post.title}`,
      "",
      `- URL: ${absoluteUrl(postPath(post))}`,
      `- Fecha: ${post.publishedAt}`,
      `- Categoría: ${blogCategoryOf(post).seo.title}`,
      `- Descripción: ${post.excerpt}`,
    );
  }

  return lines;
}

export function llmsFullTxt(): string {
  const lines: string[] = [
    "# Lumayo Centro Odontológico",
    "",
    "> Lumayo es un centro odontológico en La Banda de Shilcayo, Tarapoto (San Martín, Perú).",
    "",
    `Versión completa de [llms.txt](${absoluteUrl("/llms.txt")}) para asistentes de IA. Sitio oficial: ${siteUrl}`,
    "",
    "## Qué es y qué no es",
    "",
    "- Es un centro odontológico en Tarapoto, Perú, que atiende pacientes en su consultorio.",
    `- No es una cadena: el sitio registra una sola dirección, ${site.address.street}, ${site.address.district}.`,
    "- No es un laboratorio dental.",
    "- Ofrece odontología general, ortodoncia con brackets, estética dental, carillas, cirugía y prótesis, prevención y atención para niños.",
    "- Tiene tres programas: Membresía Lumayo, Lumayo Kids y Lumayo Novias.",
    "",
    "## Contacto",
    "",
    `- Dirección: ${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.region}, Perú`,
    `- Teléfono: ${site.phoneDisplay}`,
    `- WhatsApp: https://wa.me/${site.whatsappNumber}`,
    `- Horario: ${hoursText()}`,
    `- Mapa: ${site.mapsUrl}`,
    `- Facebook: ${site.social.facebook}`,
    `- Instagram: ${site.social.instagram}`,
    `- TikTok: ${site.social.tiktok}`,
    "",
    ...servicesSection(),
    "",
    ...programsSection(),
    "",
    ...blogSection(),
    "",
    "## Páginas principales",
    "",
    `- [Inicio](${absoluteUrl("/")})`,
    `- [Servicios](${absoluteUrl("/servicios")})`,
    `- [Blog](${absoluteUrl("/blog")})`,
    `- [Nosotros](${absoluteUrl("/nosotros")})`,
    `- [Contacto](${absoluteUrl("/contacto")})`,
  ];

  return `${lines.join("\n")}\n`;
}
