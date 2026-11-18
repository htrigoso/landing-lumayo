import { buildDate } from "@/lib/ai-resources/build-date";
import { humansTxt } from "@/lib/ai-resources/humans-txt";

/** /humans.txt: organization, location, contact and site information. Last update is the build date. */
export async function GET() {
  const lastUpdated = await buildDate();
  return new Response(humansTxt({ lastUpdated }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
