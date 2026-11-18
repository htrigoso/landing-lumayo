"use client";

import type { ReactNode } from "react";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/site";
import { promoWhatsappUrl } from "@/lib/promo";
import { pushPromoEvent, type PromoCtaId } from "./analytics";
import { usePromoStatus } from "./usePromoNow";

type PromoLinkProps = {
  cta: PromoCtaId;
  /** Service name for a prefilled WhatsApp message. */
  service?: string;
  /** Explicit target (anchors, tel:). Without it the link opens WhatsApp: the promo, or normal booking once it has ended. */
  href?: string;
  /** Label shown once the promotion has ended. Defaults to the children. */
  endedLabel?: string;
  className?: string;
  children: ReactNode;
};

/** A CTA on the promo page: it chooses its WhatsApp target by date and reports each click to GTM. */
export function PromoLink({ cta, service, href, endedLabel, className, children }: PromoLinkProps) {
  const status = usePromoStatus();
  const ended = status === "ended";
  const target = href ?? (ended ? whatsappUrl(defaultWhatsappMessage) : promoWhatsappUrl(service));

  return (
    <a
      href={target}
      className={className}
      {...(href === undefined ? { target: "_blank", rel: "noopener" } : {})}
      onClick={() => pushPromoEvent(service ? { event: "promo_cta_click", cta, service } : { event: "promo_cta_click", cta })}
    >
      {ended && endedLabel ? endedLabel : children}
    </a>
  );
}
