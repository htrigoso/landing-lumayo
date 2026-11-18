import { whatsappUrl } from "@/lib/site";

/**
 * December 2026 promotion: 30% off every service. Single source for the /promociones page,
 * its JSON-LD Offer, llms.txt, the search index and the header link.
 */
export const promo = {
  slug: "promociones",
  percent: 30,
  /** Lima time (UTC-5, no daylight saving). Inclusive: the whole of 1 December counts. */
  startsAt: "2026-12-01T00:00:00-05:00",
  /** Inclusive: the promotion is still active during the last second of 31 December. */
  endsAt: "2026-12-31T23:59:59-05:00",
  appliesTo: "all",
  /** Set to false in January to hide the header link without touching the rest of the page. */
  showInNav: false,
} as const;

export type PromoStatus = "upcoming" | "active" | "ended";

/** Where the promotion stands at `now`. Boundaries: before startsAt is upcoming, after endsAt is ended. */
export function promoStatus(now: Date): PromoStatus {
  const time = now.getTime();
  if (time < Date.parse(promo.startsAt)) return "upcoming";
  if (time > Date.parse(promo.endsAt)) return "ended";
  return "active";
}

/** Prefilled WhatsApp message. With a service name it names that service. */
export function promoWhatsappMessage(serviceName?: string): string {
  return serviceName
    ? `Hola Lumayo, quiero usar la promoción ${promo.percent}% de diciembre para ${serviceName}.`
    : `Hola Lumayo, quiero usar la promoción ${promo.percent}% de diciembre.`;
}

export function promoWhatsappUrl(serviceName?: string): string {
  return whatsappUrl(promoWhatsappMessage(serviceName));
}

/** Questions answered on /promociones. Shared with the FAQ JSON-LD, so the structured data matches the page. */
export const promoFaqs: readonly { q: string; a: string }[] = [
  {
    q: "¿A qué servicios aplica?",
    a: "A todos los servicios del centro, incluidos los que aparecen en esta página.",
  },
  {
    q: "¿Qué pasa con los tratamientos largos?",
    a: "En tratamientos como ortodoncia o diseño de sonrisa, el 30% se aplica sobre el precio total si el tratamiento se inicia o se contrata entre el 1 y el 31 de diciembre de 2026.",
  },
  {
    q: "¿Hasta cuándo es válida?",
    a: "Hasta el 31 de diciembre de 2026, a las 23:59 (hora de Lima).",
  },
  {
    q: "¿Cómo accedo a la promoción?",
    a: "Escríbenos por WhatsApp al 986 382 607 mencionando la promoción y coordinamos tu cita.",
  },
];

/** Discounted price in PEN, rounded to the cent. 350 at 30% off → 245. */
export function discountedAmount(amount: number): number {
  return Math.round(amount * (100 - promo.percent)) / 100;
}
