import { useSyncExternalStore } from "react";
import { promoStatus, type PromoStatus } from "@/lib/promo";

/** The clock is read in 15-second steps, so the snapshot is a stable number and React never loops on it. */
const STEP_MS = 15_000;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, STEP_MS);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return Math.floor(Date.now() / STEP_MS);
}

/**
 * The visitor's current date, or null while rendering on the server and during hydration.
 * Date-dependent copy is written only after mount, so prerendered HTML never shows the wrong state.
 */
export function usePromoNow(): Date | null {
  const step = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return step === null ? null : new Date(step * STEP_MS);
}

/** Promo status for this visitor, or null before mount. */
export function usePromoStatus(): PromoStatus | null {
  const now = usePromoNow();
  return now ? promoStatus(now) : null;
}
