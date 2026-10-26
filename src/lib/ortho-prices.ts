import { services, type PriceSourceId } from "@/lib/site";

type MarketRange = {
  min: number;
  max: number;
  sourceId: PriceSourceId;
  note?: string;
};

/** Question and answer opening for each orthodontics type; the grammar depends on the name. */
const priceCopyById: Record<string, { question: string; answerStart: string }> = {
  "brackets-convencionales": {
    question: "¿Cuánto cuestan los brackets convencionales en Perú?",
    answerStart: "los brackets convencionales suelen costar",
  },
  "brackets-ceramicos": {
    question: "¿Cuánto cuestan los brackets cerámicos en Perú?",
    answerStart: "los brackets cerámicos suelen costar",
  },
  "brackets-autoligables": {
    question: "¿Cuánto cuestan los brackets autoligables en Perú?",
    answerStart: "los brackets autoligables suelen costar",
  },
  "brackets-zafiro": {
    question: "¿Cuánto cuestan los brackets de zafiro en Perú?",
    answerStart: "los brackets de zafiro suelen costar",
  },
  "brackets-porcelana": {
    question: "¿Cuánto cuestan los brackets de porcelana en Perú?",
    answerStart: "los brackets de porcelana suelen costar",
  },
  "ortodoncia-lingual": {
    question: "¿Cuánto cuesta la ortodoncia lingual en Perú?",
    answerStart: "la ortodoncia lingual suele costar",
  },
  invisalign: {
    question: "¿Cuánto cuesta Invisalign en Perú?",
    answerStart: "Invisalign suele costar",
  },
};

/** Thousands separated by a comma: 2500 -> "2,500". */
export function formatAmount(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Soles with prefix: 2500 -> "S/ 2,500". */
export function formatSoles(amount: number): string {
  return `S/ ${formatAmount(amount)}`;
}

/** Market range as shown in tables: "S/ 2,500 – 4,000". */
export function formatMarketRange(range: Pick<MarketRange, "min" | "max">): string {
  return `${formatSoles(range.min)} – ${formatAmount(range.max)}`;
}

function marketRangeOf(id: string): MarketRange {
  const service = services.find((s) => s.id === id);
  if (!service?.ortho) throw new Error(`Missing orthodontics price data for "${id}"`);
  return service.ortho.marketRange;
}

/** Combined range of several types, from the lowest min to the highest max. */
function combinedRange(ids: string[]): Pick<MarketRange, "min" | "max"> {
  const ranges = ids.map(marketRangeOf);
  return {
    min: Math.min(...ranges.map((r) => r.min)),
    max: Math.max(...ranges.map((r) => r.max)),
  };
}

function rangeSuffix(range: MarketRange): string {
  return range.note ? ` ${range.note}` : "";
}

const PRICE_INCLUDES =
  "El precio suele incluir los controles periódicos; los retenedores y las radiografías pueden cobrarse aparte. En Lumayo te damos el presupuesto exacto tras tu evaluación.";

/** Question shown on the type's detail page and in its FAQ. */
export function orthoPriceQuestion(id: string): string {
  const copy = priceCopyById[id];
  if (!copy) throw new Error(`Missing price question for "${id}"`);
  return copy.question;
}

/** FAQ answer for one type, built from its market range. */
export function orthoPriceAnswer(id: string): string {
  const copy = priceCopyById[id];
  if (!copy) throw new Error(`Missing price answer for "${id}"`);
  const range = marketRangeOf(id);
  return `En Perú, ${copy.answerStart} entre ${formatSoles(range.min)} y ${formatSoles(range.max)}${rangeSuffix(range)}. ${PRICE_INCLUDES}`;
}

/** Category FAQ "¿Cuánto cuestan los brackets en Tarapoto?", built from all the market ranges. */
export function categoryPriceAnswer(): string {
  const metal = marketRangeOf("brackets-convencionales");
  const esthetic = combinedRange(["brackets-ceramicos", "brackets-porcelana", "brackets-zafiro"]);
  const selfLigating = marketRangeOf("brackets-autoligables");
  const premium = combinedRange(["ortodoncia-lingual", "invisalign"]);

  return `En Perú, los brackets metálicos suelen costar entre ${formatSoles(metal.min)} y ${formatSoles(metal.max)}${rangeSuffix(metal)}; los estéticos (cerámicos, de porcelana o de zafiro) entre ${formatSoles(esthetic.min)} y ${formatSoles(esthetic.max)}; los autoligables entre ${formatSoles(selfLigating.min)} y ${formatSoles(selfLigating.max)}; la ortodoncia lingual y los alineadores tipo Invisalign, entre ${formatSoles(premium.min)} y ${formatSoles(premium.max)}. El precio suele incluir los controles mensuales; los retenedores y las radiografías pueden cobrarse aparte. En Lumayo te damos el presupuesto exacto tras tu evaluación.`;
}
