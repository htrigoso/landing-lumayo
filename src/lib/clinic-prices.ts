/**
 * The clinic's own confirmed prices (PEN), keyed by service id from `services` in src/lib/site.ts.
 *
 * Only these figures may become structured-data Offers or be listed as Lumayo prices (llms.txt).
 * Every other price on the site is a market reference range and must never be presented as the clinic's price.
 *
 * The "prices" blocks of the service pages (src/lib/service-doc/*.ts) show the same figures.
 * When a price changes, update this file and the matching service-doc block together.
 */

/** A single confirmed price (0 means free), or a range from `minPrice` to `maxPrice`. */
export type ClinicPrice =
  | { label: string; price: number }
  | { label: string; minPrice: number; maxPrice: number };

export const clinicPrices: Readonly<Record<string, readonly ClinicPrice[] | undefined>> = {
  "diseno-de-sonrisa": [{ label: "Tratamiento completo", minPrice: 8000, maxPrice: 12000 }],
  "carillas-resina": [{ label: "Precio por pieza", price: 350 }],
  "carillas-porcelana": [{ label: "Precio por pieza", minPrice: 350, maxPrice: 450 }],
  "carillas-zirconio": [{ label: "Precio por pieza", minPrice: 800, maxPrice: 900 }],
  "carillas-disilicato": [{ label: "Precio por pieza", minPrice: 1000, maxPrice: 1300 }],
  "carillas-ultrafinas": [{ label: "Precio por pieza", minPrice: 1500, maxPrice: 1700 }],
  "fluor-barniz": [{ label: "Precio por aplicación", minPrice: 60, maxPrice: 80 }],
  "fluor-gel": [{ label: "Precio por aplicación", minPrice: 60, maxPrice: 80 }],
  sellantes: [{ label: "Precio por pieza", minPrice: 100, maxPrice: 150 }],
  protesis: [
    { label: "Prótesis removible parcial o total", minPrice: 800, maxPrice: 1000 },
    { label: "Prótesis flexible", minPrice: 1000, maxPrice: 1200 },
  ],
  odontopediatria: [{ label: "Consulta de odontopediatría", price: 0 }],
};

/** Confirmed prices of one service, or undefined when the clinic has not confirmed any. */
export function clinicPricesFor(serviceId: string): readonly ClinicPrice[] | undefined {
  return clinicPrices[serviceId];
}

/** Thousands separator as on the site: 12000 → "12,000". */
export function formatAmount(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Lowest paid and highest amount across all confirmed prices, for schema.org priceRange. Free items are ignored. */
export function clinicPriceRange(): string {
  const amounts = Object.values(clinicPrices)
    .flatMap((items) => items ?? [])
    .flatMap((item) => ("price" in item ? [item.price] : [item.minPrice, item.maxPrice]));
  const paid = amounts.filter((amount) => amount > 0);
  return `S/ ${formatAmount(Math.min(...paid))} – S/ ${formatAmount(Math.max(...amounts))}`;
}
