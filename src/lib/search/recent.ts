import { normalize } from "./normalize";

export const RECENT_SEARCHES_KEY = "lumayo:recent-searches";
export const MAX_RECENT_SEARCHES = 5;

function cleanTerm(term: string): string {
  return term.replace(/\s+/g, " ").trim();
}

/**
 * The recent list with `term` first. Terms that normalize to the same text are one entry, and the
 * newest spelling wins. Blank terms change nothing. The list keeps at most MAX_RECENT_SEARCHES items.
 */
export function addRecent(recent: readonly string[], term: string): string[] {
  const clean = cleanTerm(term);
  const key = normalize(clean);
  if (!key) return [...recent];
  const rest = recent.filter((item) => normalize(item) !== key);
  return [clean, ...rest].slice(0, MAX_RECENT_SEARCHES);
}

/** Reads a stored value defensively: anything that is not a list of text terms is dropped. */
export function parseRecent(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const kept: string[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const clean = cleanTerm(item);
    const key = normalize(clean);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    kept.push(clean);
  }
  return kept.slice(0, MAX_RECENT_SEARCHES);
}

/** Storage can be blocked or missing (private windows, server render). Every failure reads as "no history". */
export function readRecentSearches(): string[] {
  try {
    return parseRecent(JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY) ?? "null"));
  } catch {
    return [];
  }
}

export function writeRecentSearches(recent: readonly string[]): void {
  try {
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
  } catch {
    // The search works without history, so a failed write is ignored.
  }
}

export function clearRecentSearches(): void {
  try {
    window.localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}
