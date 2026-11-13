import { describe, expect, it } from "vitest";
import { buildSearchIndex } from "./build-index";
import { normalize } from "./normalize";
import { search, similar, suggest } from "./search";
import type { SearchEntry } from "./types";

const { entries } = buildSearchIndex();
const byId = (id: string) => {
  const entry = entries.find((candidate) => candidate.id === id);
  if (!entry) throw new Error(`Missing fixture entry ${id}`);
  return entry;
};
const titles = (results: SearchEntry[]) => results.map((entry) => entry.title);

/** Small hand-written index so ranking rules can be checked without depending on copy changes. */
const fixture: SearchEntry[] = [
  { id: "f-resina", kind: "service", title: "Carillas de resina", subtitle: "Carillas", description: "Carillas de resina compuesta.", href: "/a", categoryId: "carillas", keywords: ["carillas de resina"] },
  { id: "f-porcelana", kind: "service", title: "Carillas de porcelana", subtitle: "Carillas", description: "Carillas de porcelana.", href: "/b", categoryId: "carillas", keywords: [] },
  { id: "f-zirconio", kind: "service", title: "Carillas de zirconio", subtitle: "Carillas", description: "Carillas de zirconio.", href: "/c", categoryId: "carillas", keywords: [] },
  { id: "f-limpieza", kind: "service", title: "Limpieza dental", subtitle: "Prevención dental", description: "Limpieza y profilaxis.", href: "/d", categoryId: "prevencion", keywords: [] },
  { id: "f-post", kind: "post", title: "Carillas dentales: tipos", subtitle: "Estética", description: "Guía sobre carillas.", href: "/blog/x", keywords: [] },
];

describe("normalize", () => {
  it("lowercases, strips accents and punctuation, and collapses spaces", () => {
    expect(normalize("  Extracción   DENTAL!! ")).toBe("extraccion dental");
    expect(normalize("¿Niño?")).toBe("nino");
    expect(normalize("Flúor · barniz")).toBe("fluor barniz");
  });
});

describe("search", () => {
  it("finds accented titles without the accent (extraccion → Extracción dental)", () => {
    expect(titles(search(entries, "extraccion"))).toContain("Extracción dental");
  });

  it("ignores case", () => {
    expect(titles(search(entries, "BRACKETS"))).toContain("Brackets convencionales");
  });

  it("maps a patient phrasing to the brackets services (frenillos)", () => {
    const results = search(entries, "frenillos").filter((entry) => entry.kind === "service");
    const brackets = results.filter((entry) => entry.title.startsWith("Brackets"));
    expect(brackets.length).toBeGreaterThanOrEqual(4);
  });

  it("maps 'me duele la muela' to endodoncia or curaciones and the urgencias article", () => {
    const results = search(entries, "me duele la muela");
    const ids = results.map((entry) => entry.id);
    expect(ids.some((id) => id === "endodoncia" || id === "curaciones")).toBe(true);
    expect(ids).toContain("post-dolor-de-muela-que-hacer");
  });

  it("returns nothing for an empty or one-letter query", () => {
    expect(search(entries, "")).toEqual([]);
    expect(search(entries, "   ")).toEqual([]);
    expect(search(entries, "a")).toEqual([]);
  });

  it("returns nothing for garbage input", () => {
    expect(search(entries, "xyzqw")).toEqual([]);
  });

  it("ranks services and programs above blog posts", () => {
    const results = search(entries, "brackets");
    const firstPost = results.findIndex((entry) => entry.kind === "post");
    const lastNonPost = results.map((entry) => entry.kind).lastIndexOf("service");
    expect(firstPost).toBeGreaterThan(-1);
    expect(lastNonPost).toBeLessThan(firstPost);
    expect(results[0].title.startsWith("Brackets")).toBe(true);
  });

  it("puts an exact title match first in the fixture", () => {
    expect(search(fixture, "limpieza dental")[0].id).toBe("f-limpieza");
  });

  it("ranks services ahead of a post that matches the same words", () => {
    const ids = search(fixture, "carillas dentales").map((entry) => entry.id);
    expect(ids[ids.length - 1]).toBe("f-post");
  });

  it("matches a single word prefix (carill → the carillas services)", () => {
    expect(search(fixture, "carill").map((entry) => entry.id)).toEqual(expect.arrayContaining(["f-resina", "f-porcelana", "f-zirconio"]));
  });

  it("finds children's services for 'niños'", () => {
    const titlesFound = titles(search(entries, "niños"));
    expect(titlesFound).toEqual(expect.arrayContaining(["Odontopediatría", "Lumayo Kids"]));
  });

  it("finds Lumayo Novias for a wedding query", () => {
    expect(titles(search(entries, "boda"))).toContain("Lumayo Novias");
  });

  it("finds implants or dentures for a missing tooth", () => {
    const ids = search(entries, "me falta un diente").map((entry) => entry.id);
    expect(ids.some((id) => id === "implantes" || id === "protesis")).toBe(true);
  });

  it("caps the number of results", () => {
    expect(search(entries, "dental").length).toBeLessThanOrEqual(12);
  });
});

describe("suggest", () => {
  it("corrects a typo to the closest known word (blankeamiento → blanqueamiento)", () => {
    expect(suggest(entries, "blankeamiento")).toBe("blanqueamiento");
  });

  it("returns null for garbage with nothing close", () => {
    expect(suggest(entries, "xyzqw")).toBeNull();
  });

  it("returns null when the query has no typo to correct", () => {
    expect(suggest(entries, "brackets")).toBeNull();
  });

  it("returns null when the query already has results, even if a word is close to another", () => {
    expect(suggest(entries, "carill")).toBeNull();
  });

  it("keeps accents in the suggested word", () => {
    expect(suggest(entries, "odontopediatra")).toBe("odontopediatría");
  });
});

describe("similar", () => {
  it("returns other services in the same category, excluding the entry itself", () => {
    const resina = byId("carillas-resina");
    const results = similar(entries, resina);
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(4);
    for (const entry of results) {
      expect(entry.kind).toBe("service");
      expect(entry.categoryId).toBe(resina.categoryId);
      expect(entry.id).not.toBe(resina.id);
    }
  });

  it("falls back to featured services when the category has no other service", () => {
    const lonely: SearchEntry = { ...fixture[3], id: "solo", categoryId: "nada" };
    const featuredService: SearchEntry = { ...fixture[3], id: "destacado", categoryId: "otra", featured: true };
    expect(similar([...fixture, lonely, featuredService], lonely).map((entry) => entry.id)).toEqual(["destacado"]);
  });
});

describe("buildSearchIndex", () => {
  it("contains 26 services, 3 programs and 12 posts with lean fields only", () => {
    expect(entries.filter((entry) => entry.kind === "service")).toHaveLength(26);
    expect(entries.filter((entry) => entry.kind === "program")).toHaveLength(3);
    expect(entries.filter((entry) => entry.kind === "post")).toHaveLength(12);
    for (const post of entries.filter((entry) => entry.kind === "post")) {
      expect(Object.keys(post).sort()).toEqual(["description", "href", "id", "keywords", "kind", "subtitle", "title"]);
    }
  });

  it("shows confirmed prices only, formatted for the card", () => {
    expect(byId("carillas-resina").priceLabel).toBe("Desde S/ 350");
    expect(byId("odontopediatria").priceLabel).toBe("Consulta gratis");
    expect(byId("blanqueamiento").priceLabel).toBeUndefined();
  });
});
