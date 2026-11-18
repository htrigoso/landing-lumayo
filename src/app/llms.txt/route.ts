import { llmsTxt } from "@/lib/ai-resources/llms-txt";

/**
 * /llms.txt: a plain-text guide to the site for AI assistants (https://llmstxt.org).
 * The text is built by src/lib/ai/llms-txt.ts from the same data the pages render. No request or runtime data
 * is read, so the handler is prerendered at build time.
 */
export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
