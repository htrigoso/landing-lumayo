import { aiGraphJson } from "@/lib/ai-resources/graph";

/** /knowledge-graph.json: the same graph as /ai-feed.jsonld, served as plain JSON. Prerendered at build time. */
export function GET() {
  return new Response(aiGraphJson(), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
