import { describe, expect, it } from "vitest";
import { highlight } from "./highlight";

const matched = (text: string, query: string) =>
  highlight(text, query)
    .filter((segment) => segment.match)
    .map((segment) => segment.text);

describe("highlight", () => {
  it("keeps accents in the matched text when the query has none", () => {
    expect(highlight("Extracción dental", "extraccion")).toEqual([
      { text: "Extracción", match: true },
      { text: " dental", match: false },
    ]);
  });

  it("matches accented queries against plain text and back", () => {
    expect(matched("Diseño de sonrisa", "diseno")).toEqual(["Diseño"]);
    expect(matched("Diseno de sonrisa", "diseño")).toEqual(["Diseno"]);
  });

  it("highlights every typed word, in text order", () => {
    expect(highlight("Brackets autoligables", "auto brackets")).toEqual([
      { text: "Brackets", match: true },
      { text: " ", match: false },
      { text: "auto", match: true },
      { text: "ligables", match: false },
    ]);
  });

  it("ignores stop words and one-letter tokens", () => {
    expect(matched("Carillas de resina", "de a")).toEqual([]);
  });

  it("returns the whole text unhighlighted when nothing matches", () => {
    expect(highlight("Limpieza dental", "xyzqw")).toEqual([{ text: "Limpieza dental", match: false }]);
  });

  it("does not highlight synonym-only matches", () => {
    expect(matched("Endodoncia", "me duele la muela")).toEqual([]);
    expect(matched("Brackets convencionales", "frenillos")).toEqual([]);
  });

  it("returns no segments for empty text and plain text for an empty query", () => {
    expect(highlight("", "brackets")).toEqual([]);
    expect(highlight("Brackets", "")).toEqual([{ text: "Brackets", match: false }]);
  });

  it("maps matches across punctuation and the ñ without losing characters", () => {
    expect(matched("Odontopediatría (niños)", "ninos")).toEqual(["niños"]);
  });

  it("always joins back to the original text", () => {
    const text = "Carillas de porcelana: niños, diseño y más";
    for (const query of ["carillas", "porcelana diseno", "ninos", "xyz", ""]) {
      expect(highlight(text, query).map((segment) => segment.text).join("")).toBe(text);
    }
  });
});
