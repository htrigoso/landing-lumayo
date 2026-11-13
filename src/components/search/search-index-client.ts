import type { SearchEntry, SearchIndex } from "@/lib/search/types";

/** Fetched once per page view; a failed fetch is retried the next time the panel opens. */
let entries: SearchEntry[] | null = null;
let pending: Promise<SearchEntry[]> | null = null;

export function getCachedSearchEntries(): SearchEntry[] | null {
  return entries;
}

export function loadSearchEntries(): Promise<SearchEntry[]> {
  if (entries) return Promise.resolve(entries);
  pending ??= fetch("/search-index.json")
    .then(async (response) => {
      if (!response.ok) throw new Error(`Search index request failed: ${response.status}`);
      const index = (await response.json()) as SearchIndex;
      entries = index.entries;
      return index.entries;
    })
    .catch((error: unknown) => {
      pending = null;
      throw error;
    });
  return pending;
}
