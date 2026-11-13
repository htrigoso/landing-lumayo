import type { SearchEntry } from "./types";

/** "intent" is the curated list shown after a "¿Qué necesitas?" chip; the others come from a typed query. */
export type ResultGroupKey = "services" | "programs" | "posts" | "similar" | "intent";

export type ResultSection = {
  key: ResultGroupKey;
  title: string;
  entries: SearchEntry[];
};

/** One keyboard-navigable row. `index` is its position across all sections, `position` within its section (1-based). */
export type SearchRow = {
  index: number;
  entry: SearchEntry;
  group: ResultGroupKey;
  position: number;
};

const LABELS: Record<Exclude<ResultGroupKey, "similar" | "intent">, string> = {
  services: "Tratamientos",
  programs: "Programas",
  posts: "Artículos",
};

/**
 * Splits ranked results into the sections shown in order: treatments, programs, articles, then
 * similar treatments. Empty sections are left out. Counts appear in the titles, except for similar.
 */
export function groupResults(results: readonly SearchEntry[], similar: readonly SearchEntry[]): ResultSection[] {
  const byKind = {
    services: results.filter((entry) => entry.kind === "service"),
    programs: results.filter((entry) => entry.kind === "program"),
    posts: results.filter((entry) => entry.kind === "post"),
  };
  const sections: ResultSection[] = (["services", "programs", "posts"] as const)
    .map((key) => ({
      key,
      title: `${LABELS[key]} (${byKind[key].length})`,
      entries: byKind[key],
    }))
    .filter((section) => section.entries.length > 0);
  // Similar treatments already shown above are not repeated; the group is dropped when nothing is left.
  const shown = new Set(results.map((entry) => entry.id));
  const extra = similar.filter((entry) => !shown.has(entry.id));
  if (extra.length > 0) {
    sections.push({ key: "similar", title: "Servicios similares", entries: extra });
  }
  return sections;
}

/** Every row in display order, numbered so the keyboard and the DOM ids can point at it. */
export function flattenRows(sections: readonly ResultSection[]): SearchRow[] {
  const rows: SearchRow[] = [];
  for (const section of sections) {
    section.entries.forEach((entry, position) => {
      rows.push({ index: rows.length, entry, group: section.key, position: position + 1 });
    });
  }
  return rows;
}
