"use client";

import { promo } from "@/lib/promo";
import { usePromoNow, usePromoStatus } from "./usePromoNow";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

/** Date-dependent line under the hero. Renders nothing until mounted, so the server HTML carries no date claim. */
export function PromoStatusLine() {
  const status = usePromoStatus();
  const now = usePromoNow();

  if (status === "upcoming") {
    return <p className="text-lg font-semibold text-text-inverse">Desde el 1 de diciembre</p>;
  }
  if (status === "ended") {
    return <p className="text-lg font-semibold text-text-inverse">Promoción finalizada</p>;
  }
  if (status === "active" && now) {
    const left = Date.parse(promo.endsAt) - now.getTime();
    const days = Math.floor(left / DAY_MS);
    const hours = Math.floor((left % DAY_MS) / HOUR_MS);
    return (
      <p className="text-lg font-semibold text-text-inverse" aria-live="off">
        Quedan {days} {days === 1 ? "día" : "días"} y {hours} {hours === 1 ? "hora" : "horas"} · vence el 31 de diciembre
      </p>
    );
  }
  return null;
}
