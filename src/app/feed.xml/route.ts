import { feedXml } from "@/lib/ai-resources/feed";
import { posts } from "@/lib/blog";

/**
 * /feed.xml: RSS 2.0 feed of the blog. The XML is built by src/lib/ai/feed.ts from the blog posts.
 * No request or runtime data is read, so the handler is prerendered at build time.
 */
export function GET() {
  return new Response(feedXml(posts), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
