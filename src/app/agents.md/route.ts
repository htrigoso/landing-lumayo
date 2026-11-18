import { agentsMd } from "@/lib/ai-resources/agents-md";

/** /agents.md: instructions for AI agents. Prerendered at build time. */
export function GET() {
  return new Response(agentsMd(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
