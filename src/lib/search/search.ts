import { normalize } from "./normalize";
import { synonyms } from "./synonyms";
import type { SearchEntry } from "./types";

const MAX_RESULTS = 12;
const SIMILAR_COUNT = 4;
/** Synonym matches count less than a typed word, so an exact word always outranks an expansion. */
const SYNONYM_WEIGHT = 0.8;
/** Bonus when every typed word matched, so "brackets convencionales" ranks above partial matches. */
const ALL_TOKENS_BONUS = 5;
/** Bonus when the whole query is the entry title. */
const EXACT_TITLE_BONUS = 15;

const STOP_WORDS = new Set([
  "a", "al", "con", "de", "del", "el", "en", "es", "hay", "la", "las", "lo", "los", "me", "mi", "no", "o", "para", "por", "que", "se", "su", "sus", "tu", "tus", "un", "una", "y",
]);

/** Field weights: [exact word or phrase, word prefix]. */
const WEIGHTS = {
  title: [10, 7],
  keywords: [6, 4],
  subtitle: [3, 2],
  description: [1, 0.5],
} as const;

type Fields = {
  title: string;
  keywords: string[];
  subtitle: string;
  description: string;
};

const normalizedSynonyms = Object.entries(synonyms).map(([key, targets]) => ({
  key: normalize(key),
  targets: targets.map(normalize),
}));

function containsPhrase(haystack: string, phrase: string): boolean {
  return ` ${haystack} `.includes(` ${phrase} `);
}

function fieldsOf(entry: SearchEntry): Fields {
  return {
    title: normalize(entry.title),
    keywords: entry.keywords.map(normalize),
    subtitle: normalize(entry.subtitle),
    description: normalize(entry.description),
  };
}

function fieldWeight(term: string, text: string, [exact, prefix]: readonly [number, number]): number {
  if (!text) return 0;
  if (containsPhrase(text, term)) return exact;
  // Prefix matching only for single words of 3+ letters, so "ca" does not match everything.
  if (!term.includes(" ") && term.length >= 3 && text.split(" ").some((word) => word.startsWith(term))) return prefix;
  return 0;
}

function termScore(term: string, fields: Fields): number {
  return Math.max(
    fieldWeight(term, fields.title, WEIGHTS.title),
    ...fields.keywords.map((keyword) => fieldWeight(term, keyword, WEIGHTS.keywords)),
    fieldWeight(term, fields.subtitle, WEIGHTS.subtitle),
    fieldWeight(term, fields.description, WEIGHTS.description),
  );
}

/**
 * Typed words (2+ letters, no stop words) and the synonym targets triggered by the query.
 * A matched multi-word phrase ("me duele la muela") is one intent, so its words stop scoring alone:
 * otherwise "muela" would pull in the wisdom-tooth service ahead of the endodontics that the phrase means.
 */
function queryTerms(normalizedQuery: string): { tokens: string[]; expansions: string[] } {
  const matched = normalizedSynonyms.filter(({ key }) => containsPhrase(normalizedQuery, key));
  const consumed = new Set(matched.filter(({ key }) => key.includes(" ")).flatMap(({ key }) => key.split(" ")));
  const tokens = normalizedQuery
    .split(" ")
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token) && !consumed.has(token));
  const expansions = matched.flatMap(({ targets }) => targets);
  return { tokens, expansions: [...new Set(expansions)] };
}

function scoreEntry(entry: SearchEntry, normalizedQuery: string, tokens: string[], expansions: string[]): number {
  const fields = fieldsOf(entry);
  let score = 0;
  let matchedTokens = 0;
  for (const token of tokens) {
    const value = termScore(token, fields);
    if (value > 0) {
      matchedTokens += 1;
      score += value;
    }
  }
  for (const target of expansions) {
    score += termScore(target, fields) * SYNONYM_WEIGHT;
  }
  if (tokens.length > 1 && matchedTokens === tokens.length) score += ALL_TOKENS_BONUS;
  if (fields.title === normalizedQuery) score += EXACT_TITLE_BONUS;
  return score;
}

/**
 * Ranked results for a query. Services and programs come before blog posts; within each group
 * the higher score comes first. Returns [] for an empty query or when nothing matches.
 */
export function search(entries: readonly SearchEntry[], query: string): SearchEntry[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  const { tokens, expansions } = queryTerms(normalizedQuery);
  if (tokens.length === 0 && expansions.length === 0) return [];

  const scored = entries
    .map((entry) => ({ entry, score: scoreEntry(entry, normalizedQuery, tokens, expansions) }))
    .filter(({ score }) => score > 0);

  scored.sort((a, b) => {
    const group = Number(a.entry.kind === "post") - Number(b.entry.kind === "post");
    return group || b.score - a.score || a.entry.title.localeCompare(b.entry.title, "es");
  });

  return scored.slice(0, MAX_RESULTS).map(({ entry }) => entry);
}

/** Optimal string alignment distance: insertions, deletions, substitutions and adjacent swaps. */
export function editDistance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

/** Largest edit distance still treated as a typo, relative to the word length. */
function maxTypoDistance(length: number): number {
  if (length <= 4) return 1;
  if (length <= 7) return 2;
  return 3;
}

/**
 * Words the index knows, keyed by their normalized form and mapped to a display form that keeps
 * accents ("diseño", not "diseno"). Descriptions are left out so suggestions stay on topic.
 */
function vocabularyOf(entries: readonly SearchEntry[]): Map<string, string> {
  const vocabulary = new Map<string, string>();
  const add = (text: string) => {
    for (const raw of text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/)) {
      const key = normalize(raw);
      if (key.length < 3 || STOP_WORDS.has(key) || vocabulary.has(key)) continue;
      vocabulary.set(key, raw);
    }
  };
  for (const entry of entries) {
    add(entry.title);
    add(entry.subtitle);
    entry.keywords.forEach(add);
  }
  Object.keys(synonyms).forEach(add);
  return vocabulary;
}

/**
 * "Did you mean": corrects each unknown typed word to its closest known word and returns the
 * corrected query, but only when that query has results. Returns null when nothing is close.
 */
export function suggest(entries: readonly SearchEntry[], query: string): string | null {
  const words = normalize(query).split(" ").filter(Boolean);
  if (words.length === 0 || search(entries, query).length > 0) return null;

  const vocabulary = vocabularyOf(entries);
  let changed = false;
  const corrected = words.map((word) => {
    if (word.length < 3 || STOP_WORDS.has(word) || vocabulary.has(word)) return word;
    const limit = maxTypoDistance(word.length);
    let best: { key: string; distance: number } | null = null;
    for (const key of vocabulary.keys()) {
      const distance = editDistance(word, key);
      if (distance > limit) continue;
      if (!best || distance < best.distance || (distance === best.distance && key < best.key)) {
        best = { key, distance };
      }
    }
    if (!best) return word;
    changed = true;
    return best.key;
  });
  if (!changed) return null;

  const normalizedCandidate = corrected.join(" ");
  if (search(entries, normalizedCandidate).length === 0) return null;
  return corrected.map((word) => vocabulary.get(word) ?? word).join(" ");
}

/** Other services in the same category (the top result's), or the featured services when it has none. */
export function similar(entries: readonly SearchEntry[], entry: SearchEntry, count = SIMILAR_COUNT): SearchEntry[] {
  const services = entries.filter((candidate) => candidate.kind === "service" && candidate.id !== entry.id);
  const sameCategory = services.filter((candidate) => candidate.categoryId === entry.categoryId);
  const pool = sameCategory.length > 0 ? sameCategory : services.filter((candidate) => candidate.featured);
  return pool.slice(0, count);
}
