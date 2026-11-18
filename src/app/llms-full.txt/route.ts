import { llmsFullTxt } from "@/lib/ai-resources/llms-full";

/**
 * /llms-full.txt: the long-form Markdown companion to /llms.txt. The text is built by src/lib/ai/llms-full.ts
 * from the same data the pages render. No request or runtime data is read, so the handler is prerendered at build time.
 */
export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
