import type { ResultGroupKey } from "@/lib/search/groups";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export type SearchEvent =
  | { event: "search"; search_term: string }
  | { event: "search_no_results"; search_term: string }
  | { event: "search_result_click"; search_term: string; result_id: string; group: ResultGroupKey; position: number }
  | { event: "search_whatsapp_click"; search_term: string }
  | { event: "search_intent_click"; intent: string }
  | { event: "search_recent_click"; search_term: string }
  | { event: "search_category_click"; category_id: string };

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
