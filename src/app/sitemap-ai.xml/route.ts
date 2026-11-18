import { sitemapAiXml } from "@/lib/ai-resources/sitemap-ai";

/**
 * Build date (YYYY-MM-DD, Lima time) used as <lastmod>. Cached, so it is captured once at build time.
 * Cache Components rejects a bare `new Date()` while prerendering, so the call lives in a cached helper.
 */
async function buildDate(): Promise<string> {
  "use cache";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima" }).format(new Date());
}

/** /sitemap-ai.xml: lists the AI resources (home, llms.txt, llms-full.txt, feed.xml). */
export async function GET() {
  const lastmod = await buildDate();
  return new Response(sitemapAiXml({ lastmod }), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
