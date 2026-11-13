import { describe, expect, it } from "vitest";
import { buildSearchIndex } from "./build-index";
import { entriesForIntent, searchIntents } from "./intents";

const { entries } = buildSearchIndex();

describe("searchIntents", () => {
  it("references only ids that exist in the real index", () => {
    const ids = new Set(entries.map((entry) => entry.id));
    for (const intent of searchIntents) {
      for (const id of intent.entryIds) {
        expect(ids.has(id), `${intent.id} → ${id}`).toBe(true);
      }
    }
  });

  it("has unique ids and non-empty curated lists", () => {
    const ids = searchIntents.map((intent) => intent.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const intent of searchIntents) expect(intent.entryIds.length).toBeGreaterThan(0);
  });

  it("resolves each intent to its entries in the listed order", () => {
    const muela = searchIntents.find((intent) => intent.id === "muela");
    expect(muela).toBeDefined();
    expect(entriesForIntent(entries, muela!).map((entry) => entry.id)).toEqual(muela!.entryIds);
  });
});
