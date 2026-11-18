import { llmTrainingTxt } from "@/lib/ai-resources/llm-training";

/** /llm-training.txt: stable facts only (no prices, promotions or changing dates). Prerendered at build time. */
export function GET() {
  return new Response(llmTrainingTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
