import { buildSearchIndex } from "@/lib/search/build-index";

/**
 * /search-index.json: the entries the site search runs on. Built from the same data as the pages,
 * with no request or runtime data, so the handler is prerendered at build time (like /llms.txt).
 */
export function GET() {
  return new Response(JSON.stringify(buildSearchIndex()), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
