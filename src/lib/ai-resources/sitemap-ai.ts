import { absoluteUrl } from "@/lib/seo/jsonld";
import { escapeXml } from "./xml";

/** The AI resources listed in sitemap-ai.xml. Paths only; every URL goes through absoluteUrl. */
export const aiResourcePaths = ["/", "/llms.txt", "/llms-full.txt", "/feed.xml"] as const;

/** sitemap-ai.xml: complements sitemap.xml with the files written for AI assistants. `lastmod` is YYYY-MM-DD. */
export function sitemapAiXml({ lastmod }: { lastmod: string }): string {
  const urls = aiResourcePaths.map(
    (path) => `  <url><loc>${escapeXml(absoluteUrl(path))}</loc><lastmod>${lastmod}</lastmod></url>`,
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<!-- AI resources sitemap. Complements sitemap.xml. -->",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}
