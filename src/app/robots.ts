import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Set NEXT_PUBLIC_ALLOW_INDEXING=false in staging environments to block all crawlers.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

// Bots named explicitly and allowed on purpose. Search and answer bots (Googlebot, Bingbot, OAI-SearchBot,
// PerplexityBot, Claude-SearchBot, ChatGPT-User, Claude-User, Perplexity-User, Applebot, DuckAssistBot, ...)
// fetch pages to answer live queries. Training and dataset bots (GPTBot, ClaudeBot, CCBot, Google-Extended,
// Applebot-Extended, meta-externalagent, Amazonbot, ...) collect content for model training. All of them are
// allowed on purpose: for a local clinic, being known by AI models has no real cost and helps the brand get mentioned.
const namedBots = [
  "Googlebot",
  "Bingbot",
  "msnbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "CCBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "FacebookBot",
  "meta-externalagent",
  "meta-externalfetcher",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: namedBots, allow: "/" },
    ],
    // Both sitemaps: the general one for pages, and the one listing the resources written for AI assistants.
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/sitemap-ai.xml`],
  };
}
