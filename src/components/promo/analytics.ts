type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/** Every call-to-action on /promociones, so GTM can tell the campaign's buttons apart. */
export type PromoCtaId = "hero" | "hero_services" | "service" | "steps" | "closing" | "closing_phone";

export type PromoEvent = { event: "promo_cta_click"; cta: PromoCtaId; service?: string };

/** Pushes a promo event to GTM's dataLayer. Analytics must never break a CTA, so failures are ignored. */
export function pushPromoEvent(payload: PromoEvent): void {
  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push(payload);
  } catch {
    // Blocked storage or a broken tag manager must not affect the visitor.
  }
}
