import { clinicJsonLd, faqJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { allFaqs } from "./faqs";

/**
 * The brand graph shared by /ai-feed.jsonld and /knowledge-graph.json: the clinic, the website and every FAQ,
 * reusing the same builders as the pages. Each node loses its own @context; the graph carries one.
 */

function withoutContext<T extends { "@context": unknown }>(node: T): Omit<T, "@context"> {
  const rest: Partial<T> = { ...node };
  delete rest["@context"];
  return rest as Omit<T, "@context">;
}

export function aiGraph(): { "@context": "https://schema.org"; "@graph": object[] } {
  return {
    "@context": "https://schema.org",
    "@graph": [withoutContext(clinicJsonLd()), withoutContext(websiteJsonLd()), withoutContext(faqJsonLd(allFaqs()))],
  };
}

/** Serialized graph, used verbatim by both routes so the two files are identical. */
export function aiGraphJson(): string {
  return `${JSON.stringify(aiGraph(), null, 2)}\n`;
}
