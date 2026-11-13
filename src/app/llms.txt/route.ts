import { blogCategories, blogCategoryPath, postPath, postsInCategory } from "@/lib/blog";
import type { BlogCategory } from "@/lib/blog/types";
import { clinicPricesFor, formatAmount, type ClinicPrice } from "@/lib/clinic-prices";
import { absoluteUrl } from "@/lib/seo/jsonld";
import {
  categoryPath,
  lumayoCard,
  programPaths,
  serviceCategories,
  servicePath,
  servicesInCategory,
  site,
  type ServiceCategory,
} from "@/lib/site";

/**
 * /llms.txt: a plain-text guide to the site for AI assistants (https://llmstxt.org).
 * Every URL and fact comes from the same data the pages render. Nothing here reads request or runtime data,
 * so the handler is prerendered at build time.
 */

/** Short description after each service category link. Keyed by category id; the link text is the category's seo.title. */
const categoryDescriptions: Record<ServiceCategory["id"], string> = {
  ortodoncia: "brackets convencionales, cerámicos, autoligables, de zafiro, de porcelana, lingual e Invisalign",
  estetica: "diseño de sonrisa y blanqueamiento",
  carillas: "color, forma y alineación",
  prevencion: "revisiones, limpieza y protección del esmalte",
  restauracion: "operatoria, curaciones y endodoncia",
  cirugia: "con evaluación previa",
  ninos: "atención amable para bebés, niños y adolescentes",
};

/** Short description after each blog category link. Keyed by the category label; the link text is the category's seo.title. */
const blogDescriptions: Record<BlogCategory, string> = {
  Prevención: "hábitos y revisiones para mantener la boca sana",
  Niños: "guías para la primera visita y los cuidados diarios de los niños",
  Estética: "carillas, diseño de sonrisa y otros tratamientos estéticos",
  Ortodoncia: "brackets, edad para iniciar y cuidados durante el tratamiento",
  Urgencias: "qué hacer ante una molestia dental urgente",
  Tratamientos: "cómo funciona cada tratamiento y qué esperar",
  Consejos: "recomendaciones cotidianas para cuidar la sonrisa",
};

/** "08:00" → "8:00 a. m.", "13:00" → "1:00 p. m.", as the site writes it. */
function formatTime(hhmm: string): string {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const suffix = hours < 12 ? "a. m." : "p. m.";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** One confirmed price as text. The unit comes from the label ("Precio por pieza" → "por pieza"). */
function priceText(item: ClinicPrice): string {
  if ("price" in item && item.price === 0) return "consulta gratis";
  const amount =
    "price" in item
      ? `S/ ${formatAmount(item.price)}`
      : `S/ ${formatAmount(item.minPrice)} – ${formatAmount(item.maxPrice)}`;
  const unit = /^Precio por (.+)$/.exec(item.label);
  return unit ? `${amount} por ${unit[1]}` : `${item.label}: ${amount}`;
}

function llmsTxt(): string {
  const { classic, gold } = lumayoCard.plans;
  const shifts = site.hours.shifts.map((shift) => `${formatTime(shift.opens)} a ${formatTime(shift.closes)}`).join(" y de ");

  const lines: string[] = [
    "# Lumayo Centro Odontológico",
    "",
    "> Lumayo es un centro odontológico en La Banda de Shilcayo, Tarapoto (San Martín, Perú). Ofrece odontología general, ortodoncia con brackets, estética dental, carillas, cirugía y prótesis, y atención para niños. Tiene tres programas: Membresía Lumayo (protección odontológica con descuentos), Lumayo Kids (odontopediatría) y Lumayo Novias (plan dental para bodas). Citas por WhatsApp o en el centro.",
    "",
    "## Datos de contacto",
    "",
    "- Nombre: Lumayo Centro Odontológico",
    `- Dirección: ${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.region}, Perú`,
    `- Teléfono: ${site.phoneDisplay}`,
    `- WhatsApp: https://wa.me/${site.whatsappNumber}`,
    `- Redes sociales: Facebook ${site.social.facebook} · Instagram ${site.social.instagram} · TikTok ${site.social.tiktok}`,
    `- Horario: ${site.hours.days.toLowerCase()} de ${shifts} Sábados y domingos cerrado.`,
    `- Mapa: ${site.mapsUrl}`,
    "",
    "## Servicios",
  ];

  for (const category of serviceCategories) {
    lines.push(
      "",
      `### ${category.label}`,
      "",
      `- [${category.seo.title}](${absoluteUrl(categoryPath(category))}): ${categoryDescriptions[category.id]}`,
    );
    for (const service of servicesInCategory(category)) {
      const prices = clinicPricesFor(service.id);
      const suffix = prices ? `: ${prices.map(priceText).join("; ")}` : "";
      lines.push(`  - [${service.name}](${absoluteUrl(servicePath(service))})${suffix}`);
    }
  }

  lines.push(
    "",
    "## Programas",
    "",
    `- [Membresía Lumayo](${absoluteUrl(programPaths.card)}): membresía de protección odontológica con descuentos para el titular y sus adicionales. Plan ${classic.label}: cuota anual ${classic.annualFee}, reafiliación ${classic.reaffiliationFee}, hasta ${classic.maxAdditional} adicionales. Plan ${gold.label}: cuota anual ${gold.annualFee}, reafiliación ${gold.reaffiliationFee}, hasta ${gold.maxAdditional} adicionales.`,
    `- [Lumayo Kids](${absoluteUrl(programPaths.kids)}): primera visita y cuidado dental para niños, desde bebés hasta adolescentes.`,
    `- [Lumayo Novias](${absoluteUrl(programPaths.novias)}): plan dental por etapas para llegar a la boda con una sonrisa cuidada.`,
    "",
    "## Blog",
  );

  for (const category of blogCategories) {
    lines.push(
      "",
      `- [${category.seo.title}](${absoluteUrl(blogCategoryPath(category))}): ${blogDescriptions[category.label]}`,
    );
    for (const post of postsInCategory(category)) {
      lines.push(`  - [${post.title}](${absoluteUrl(postPath(post))})`);
    }
  }

  lines.push(
    "",
    "## Más información",
    "",
    `- [Inicio](${absoluteUrl("/")}): página principal con servicios, programas y datos para agendar tu cita`,
    `- [Servicios](${absoluteUrl("/servicios")}): listado completo de servicios`,
    `- [Blog](${absoluteUrl("/blog")}): artículos sobre salud dental, prevención, estética y tratamientos, escritos para pacientes en Tarapoto`,
    `- [Nosotros](${absoluteUrl("/nosotros")}): quiénes somos y nuestro equipo`,
    `- [Contacto](${absoluteUrl("/contacto")}): cómo llegar y cómo agendar una cita`,
  );

  return `${lines.join("\n")}\n`;
}

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
