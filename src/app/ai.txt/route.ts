import { aiTxt } from "@/lib/ai-resources/ai-txt";
import { buildDate } from "@/lib/ai-resources/build-date";

/** /ai.txt: usage policy for AI systems. Last-Updated is the build date. */
export async function GET() {
  const lastUpdated = await buildDate();
  return new Response(aiTxt({ lastUpdated }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
