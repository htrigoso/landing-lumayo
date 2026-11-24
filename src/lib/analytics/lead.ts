import type { BookingServiceCode } from "@/lib/site";

/** Shift labels as shown in the booking form. */
export type LeadShiftLabel = "Mañana" | "Tarde";

export type LeadEvent = {
  event: "generate_lead";
  event_id: string;
  form_id: "agenda_visita";
  form_destino: "whatsapp";
  form_servicio: BookingServiceCode;
  form_turno: "manana" | "tarde";
  form_fecha_elegida: "si" | "no";
};

/** How long GTM may take to run its tags before the callback fires anyway. */
export const LEAD_EVENT_TIMEOUT_MS = 2000;

/** Builds the fixed generate_lead payload. It carries no personal data: no name, phone or date. */
export function buildLeadEvent({
  serviceCode,
  shift,
  hasDate,
  eventId,
}: {
  serviceCode: BookingServiceCode;
  shift: LeadShiftLabel;
  hasDate: boolean;
  eventId: string;
}): LeadEvent {
  return {
    event: "generate_lead",
    event_id: eventId,
    form_id: "agenda_visita",
    form_destino: "whatsapp",
    form_servicio: serviceCode,
    form_turno: shift === "Mañana" ? "manana" : "tarde",
    form_fecha_elegida: hasDate ? "si" : "no",
  };
}

/** Unique id per submit. Falls back where crypto.randomUUID is unavailable (older browsers). */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/**
 * Pushes generate_lead to GTM's dataLayer. eventCallback lets the caller continue once GTM has
 * processed the event (or after LEAD_EVENT_TIMEOUT_MS). Analytics must never break the booking,
 * so failures are ignored; the caller's own fallback still runs.
 */
export function pushLeadEvent(event: LeadEvent, eventCallback: () => void): void {
  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ ...event, eventCallback, eventTimeout: LEAD_EVENT_TIMEOUT_MS });
  } catch {
    // Blocked storage or a broken tag manager must not affect the visitor.
  }
}
