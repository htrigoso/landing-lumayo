type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export type SearchEvent =
  | { event: "search"; search_term: string }
  | { event: "search_no_results"; search_term: string }
  | { event: "search_result_click"; search_term: string; result_id: string }
  | { event: "search_whatsapp_click"; search_term: string };

/** Pushes a search event to GTM's dataLayer. Analytics must never break the search, so failures are ignored. */
export function pushSearchEvent(payload: SearchEvent): void {
  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push(payload);
  } catch {
    // Blocked storage or a broken tag manager must not affect the visitor.
  }
}
