/**
 * Build date (YYYY-MM-DD, Lima time) used by the AI files for lastmod, Last-Updated and the security.txt expiry.
 * Cached, so it is captured once at build time. Cache Components rejects a bare `new Date()` while prerendering,
 * so the call lives in this cached helper.
 */
export async function buildDate(): Promise<string> {
  "use cache";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima" }).format(new Date());
}
