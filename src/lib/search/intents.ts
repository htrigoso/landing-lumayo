import type { SearchEntry } from "./types";

/**
 * "¿Qué necesitas?" chips: a patient's own words mapped to fixed index ids. The ids must exist in the
 * built index (see intents.test.ts), so a renamed service fails the tests instead of showing nothing.
 */
export type SearchIntent = {
  id: string;
  label: string;
  entryIds: readonly string[];
};

export const searchIntents: readonly SearchIntent[] = [
  {
    id: "muela",
    label: "Me duele una muela",
    entryIds: ["endodoncia", "curaciones", "post-dolor-de-muela-que-hacer"],
  },
  {
    id: "dientes-blancos",
    label: "Quiero dientes más blancos",
    entryIds: ["blanqueamiento", "carillas-resina"],
  },
  {
    id: "dientes-chuecos",
    label: "Tengo los dientes chuecos",
    entryIds: ["brackets-convencionales", "brackets-autoligables", "brackets-ceramicos", "brackets-zafiro", "brackets-porcelana", "invisalign"],
  },
  {
    id: "diente-faltante",
    label: "Me falta un diente",
    entryIds: ["implantes", "protesis"],
  },
  {
    id: "para-mi-hijo",
    label: "Es para mi hijo",
    entryIds: ["odontopediatria", "sellantes", "fluor-barniz", "program-kids"],
  },
  {
    id: "me-caso",
    label: "Me caso pronto",
    entryIds: ["program-novias", "diseno-de-sonrisa", "blanqueamiento"],
  },
];

/** The index entries behind an intent, in the order the intent lists them. Unknown ids are skipped. */
export function entriesForIntent(entries: readonly SearchEntry[], intent: SearchIntent): SearchEntry[] {
  return intent.entryIds
    .map((id) => entries.find((entry) => entry.id === id))
    .filter((entry): entry is SearchEntry => entry !== undefined);
}
