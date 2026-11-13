/**
 * Folds text for matching: lowercase, no accents ("Extracción" → "extraccion", "niño" → "nino"),
 * punctuation removed, single spaces. Pure, so the same rules apply to the index and to the query.
 */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
