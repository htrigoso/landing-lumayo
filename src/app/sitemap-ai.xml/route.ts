import { buildDate } from "@/lib/ai-resources/build-date";
import { sitemapAiXml } from "@/lib/ai-resources/sitemap-ai";

/** /sitemap-ai.xml: lists the AI resources (see aiResourcePaths). `lastmod` is the build date. */
export async function GET() {
  const lastmod = await buildDate();
  return new Response(sitemapAiXml({ lastmod }), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
