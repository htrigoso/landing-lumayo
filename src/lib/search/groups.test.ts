import { describe, expect, it } from "vitest";
import { flattenRows, groupResults } from "./groups";
import type { SearchEntry } from "./types";

const make = (id: string, kind: SearchEntry["kind"]): SearchEntry => ({
  id,
  kind,
  title: id,
  subtitle: "",
  description: "",
  href: `/${id}`,
  keywords: [],
});

const service = make("brackets-a", "service");
const otherService = make("brackets-b", "service");
const program = make("program-kids", "program");
const post = make("post-x", "post");

describe("groupResults", () => {
  it("orders treatments, programs, articles and then similar, with counts in the titles", () => {
    const sections = groupResults([service, otherService, program, post], [make("similar-1", "service")]);
    expect(sections.map((section) => section.title)).toEqual([
      "Tratamientos (2)",
      "Programas (1)",
      "Artículos (1)",
      "Servicios similares",
    ]);
    expect(sections.map((section) => section.key)).toEqual(["services", "programs", "posts", "similar"]);
  });

  it("leaves out empty groups", () => {
    const sections = groupResults([post], []);
    expect(sections.map((section) => section.key)).toEqual(["posts"]);
  });

  it("does not repeat results already shown in the similar group, and drops it when empty", () => {
    const sections = groupResults([service, otherService], [service, make("similar-1", "service")]);
    const similarSection = sections.find((section) => section.key === "similar");
    expect(similarSection?.entries.map((entry) => entry.id)).toEqual(["similar-1"]);
    expect(groupResults([service], [service]).map((section) => section.key)).toEqual(["services"]);
  });

  it("returns no sections for no results", () => {
    expect(groupResults([], [])).toEqual([]);
  });
});

describe("flattenRows", () => {
  it("numbers rows across sections and counts the position inside each section", () => {
    const rows = flattenRows(groupResults([service, otherService, program], []));
    expect(rows.map((row) => [row.entry.id, row.index, row.group, row.position])).toEqual([
      ["brackets-a", 0, "services", 1],
      ["brackets-b", 1, "services", 2],
      ["program-kids", 2, "programs", 1],
    ]);
  });
});
