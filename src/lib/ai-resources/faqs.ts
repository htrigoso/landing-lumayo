import { posts } from "@/lib/blog";
import { getServiceDoc } from "@/lib/service-doc";
import { serviceContent } from "@/lib/service-content";
import { lumayoCard, lumayoKids, lumayoNovias, services } from "@/lib/site";

/**
 * Every FAQ the site shows, in one list: programs, then service pages, then blog posts.
 * Promo FAQs (src/lib/promo.ts) are deliberately not read here: promotions never appear in AI files.
 */

export type Faq = { q: string; a: string };

/** Drops repeated questions (same text after trimming). The first occurrence wins. */
export function uniqueFaqs(faqs: readonly Faq[]): Faq[] {
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    const key = faq.q.trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** FAQs of the three programs (Membresía, Kids, Novias). */
export function programFaqs(): Faq[] {
  return [...lumayoCard.faqs, ...lumayoKids.faqs, ...lumayoNovias.faqs];
}

/** FAQs of each service detail page: the legacy content and the SEO-lead doc, when a service has them. */
export function serviceFaqs(): Faq[] {
  return services.flatMap((service) => [
    ...(serviceContent[service.id]?.faqs ?? []),
    ...(getServiceDoc(service.id)?.faqs ?? []),
  ]);
}

/** FAQs written inside each blog post. */
export function blogFaqs(): Faq[] {
  return posts.flatMap((post) => post.faqs);
}

/**
 * True when an answer quotes a soles amount. Service and blog answers that do are market ranges, not
 * Lumayo prices (see clinic-prices.ts), and an AI could repeat them as the clinic's price out of context.
 */
export function quotesAmount(faq: Faq): boolean {
  return /S\/\s?\d/.test(faq.a);
}

/**
 * All FAQs for AI files, deduped by question. Programs first (their amounts are the clinic's own
 * membership fees), then services and blog without answers that quote market prices.
 */
export function allFaqs(): Faq[] {
  const withoutMarketPrices = [...serviceFaqs(), ...blogFaqs()].filter((faq) => !quotesAmount(faq));
  return uniqueFaqs([...programFaqs(), ...withoutMarketPrices]);
}
