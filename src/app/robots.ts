import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Set NEXT_PUBLIC_ALLOW_INDEXING=false in staging environments to block all crawlers.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

// Search bots (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot, ChatGPT-User)
// fetch pages to answer live queries. Training bots (GPTBot, ClaudeBot, CCBot, Google-Extended)
// collect content for model training. Both groups are allowed on purpose: for a local clinic,
// being known by AI models has no real cost and helps the brand get mentioned.
const searchAndTrainingBots = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Claude-SearchBot",
  "ClaudeBot",
  "CCBot",
  "Google-Extended",
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
      { userAgent: searchAndTrainingBots, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
