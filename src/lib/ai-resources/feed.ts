import { postPath } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog/types";
import { absoluteUrl } from "@/lib/seo/jsonld";
import { escapeXml } from "./xml";

/**
 * RSS 2.0 feed for /feed.xml. Pure: the caller passes the posts (the route passes `posts` from src/lib/blog).
 * Output lists the newest post first.
 */

/** RFC 822 date. Noon in Lima (UTC-5) keeps the calendar day the same for readers in Peru. */
export function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00-05:00`).toUTCString();
}

export function feedXml(posts: readonly BlogPost[]): string {
  const newestFirst = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title, "es"));
  const lastBuildDate = newestFirst[0] ? `    <lastBuildDate>${rfc822(newestFirst[0].publishedAt)}</lastBuildDate>` : "";

  const items = newestFirst.map((post) => {
    const link = escapeXml(absoluteUrl(postPath(post)));
    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${rfc822(post.publishedAt)}</pubDate>`,
      `      <description>${escapeXml(post.excerpt)}</description>`,
      `      <category>${escapeXml(post.category)}</category>`,
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Lumayo Centro Odontológico: blog</title>",
    `    <link>${escapeXml(absoluteUrl("/blog"))}</link>`,
    "    <description>Artículos sobre salud dental, prevención, estética y tratamientos, escritos para pacientes en Tarapoto.</description>",
    "    <language>es-PE</language>",
    lastBuildDate,
    `    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}
