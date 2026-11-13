import { normalize } from "./normalize";
import { STOP_WORDS } from "./search";

export type Segment = { text: string; match: boolean };

/**
 * Folds the text the same way normalize() does, one code point at a time, and records where each
 * folded UTF-16 unit came from in the original string. Matches found in the folded text can then
 * be mapped back to the original, so the output keeps its accents ("Extracción", not "Extraccion").
 */
function foldWithOffsets(text: string): { folded: string; starts: number[]; ends: number[] } {
  let folded = "";
  const starts: number[] = [];
  const ends: number[] = [];
  let index = 0;
  for (const char of text) {
    const end = index + char.length;
    const piece = char.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    for (let unit = 0; unit < piece.length; unit++) {
      starts.push(index);
      ends.push(end);
    }
    folded += piece;
    index = end;
  }
  return { folded, starts, ends };
}

/** Typed words that can be highlighted: 2+ letters, no stop words. */
function highlightTokens(query: string): string[] {
  return [...new Set(normalize(query).split(" ").filter((token) => token.length >= 2 && !STOP_WORDS.has(token)))];
}

/**
 * Splits `text` into plain and matched segments for the typed `query`. Matching ignores case and
 * accents. Synonym expansions never highlight, because they do not appear in the text.
 * Joining the segments' text always gives back the original string.
 */
export function highlight(text: string, query: string): Segment[] {
  if (!text) return [];
  const tokens = highlightTokens(query);
  if (tokens.length === 0) return [{ text, match: false }];

  const { folded, starts, ends } = foldWithOffsets(text);
  const ranges: [number, number][] = [];
  for (const token of tokens) {
    let from = 0;
    for (let at = folded.indexOf(token, from); at >= 0; at = folded.indexOf(token, from)) {
      ranges.push([starts[at], ends[at + token.length - 1]]);
      from = at + token.length;
    }
  }
  if (ranges.length === 0) return [{ text, match: false }];

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [start, end] of ranges) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }

  const segments: Segment[] = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false });
    segments.push({ text: text.slice(start, end), match: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });
  return segments;
}
