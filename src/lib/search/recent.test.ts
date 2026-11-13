import { describe, expect, it } from "vitest";
import { addRecent, MAX_RECENT_SEARCHES, parseRecent, readRecentSearches } from "./recent";

describe("addRecent", () => {
  it("puts the newest term first", () => {
    expect(addRecent(["brackets"], "implantes")).toEqual(["implantes", "brackets"]);
  });

  it("keeps one entry per normalized term and the newest spelling", () => {
    expect(addRecent(["Brackets", "limpieza"], "brácketS")).toEqual(["brácketS", "limpieza"]);
  });

  it("collapses spaces and trims before comparing", () => {
    expect(addRecent(["carillas  resina"], "  carillas resina ")).toEqual(["carillas resina"]);
  });

  it("ignores blank terms", () => {
    expect(addRecent(["brackets"], "   ")).toEqual(["brackets"]);
    expect(addRecent([], "")).toEqual([]);
  });

  it("keeps at most five terms, dropping the oldest", () => {
    let list: string[] = [];
    for (const term of ["a1", "b2", "c3", "d4", "e5", "f6"]) list = addRecent(list, term);
    expect(list).toHaveLength(MAX_RECENT_SEARCHES);
    expect(list).toEqual(["f6", "e5", "d4", "c3", "b2"]);
  });

  it("does not mutate the list it receives", () => {
    const original = ["brackets"];
    addRecent(original, "implantes");
    expect(original).toEqual(["brackets"]);
  });
});

describe("parseRecent", () => {
  it("drops anything that is not a text term", () => {
    expect(parseRecent(["brackets", 3, null, { term: "x" }, "  "])).toEqual(["brackets"]);
  });

  it("returns nothing for values that are not a list", () => {
    expect(parseRecent("brackets")).toEqual([]);
    expect(parseRecent(null)).toEqual([]);
    expect(parseRecent({ 0: "brackets" })).toEqual([]);
  });

  it("removes duplicates and caps the length", () => {
    expect(parseRecent(["Brackets", "brackets", "a", "b", "c", "d", "e"])).toEqual(["Brackets", "a", "b", "c", "d"]);
  });
});

describe("readRecentSearches", () => {
  it("returns an empty list when storage is unavailable (no window in tests)", () => {
    expect(readRecentSearches()).toEqual([]);
  });
});
