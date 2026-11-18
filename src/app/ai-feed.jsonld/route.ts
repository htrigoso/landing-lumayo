import { aiGraphJson } from "@/lib/ai-resources/graph";

/** /ai-feed.jsonld: the brand graph (clinic, website, FAQs) as one JSON-LD file. Prerendered at build time. */
export function GET() {
  return new Response(aiGraphJson(), {
    headers: { "Content-Type": "application/ld+json; charset=utf-8" },
  });
}
