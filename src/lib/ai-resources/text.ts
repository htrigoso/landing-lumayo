import { type ClinicPrice, formatAmount, pricesConfirmedAt } from "@/lib/clinic-prices";
import { site } from "@/lib/site";

/** Shared text helpers for the AI-facing documents (llms.txt, llms-full.txt). Pure: no request or runtime data. */

/** "08:00" → "8:00 a. m.", "13:00" → "1:00 p. m.", as the site writes it. */
export function formatTime(hhmm: string): string {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const suffix = hours < 12 ? "a. m." : "p. m.";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Opening hours as one line, e.g. "lunes a viernes de 8:00 a. m. a 1:00 p. m. y de 3:00 p. m. a 8:00 p. m. Sábados y domingos cerrado." */
export function hoursText(): string {
  const shifts = site.hours.shifts.map((shift) => `${formatTime(shift.opens)} a ${formatTime(shift.closes)}`).join(" y de ");
  return `${site.hours.days.toLowerCase()} de ${shifts} Sábados y domingos cerrado.`;
}

/** One confirmed price as text. The unit comes from the label ("Precio por pieza" → "por pieza"). */
export function priceText(item: ClinicPrice): string {
  if ("price" in item && item.price === 0) return "consulta gratis";
  const amount =
    "price" in item
      ? `S/ ${formatAmount(item.price)}`
      : `S/ ${formatAmount(item.minPrice)} – ${formatAmount(item.maxPrice)}`;
  const unit = /^Precio por (.+)$/.exec(item.label);
  return unit ? `${amount} por ${unit[1]}` : `${item.label}: ${amount}`;
}

/** The visible caveat shown next to every confirmed price in the AI documents. */
export function pricesNote(): string {
  return `Precios referenciales confirmados al ${pricesConfirmedAt}; confirmar por WhatsApp antes de agendar.`;
}
