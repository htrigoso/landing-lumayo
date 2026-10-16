/** Long-form content for one service detail page. Copy is Spanish; code is English. */
export type ServiceContent = {
  /** Ids from `services` in `src/lib/site.ts`. Shown as "Servicios relacionados". */
  related: string[];
  /** Shown as a "Parte de un programa" block when set. */
  program?: "kids" | "novias";
  whenItHelps: string[];
  howItWorks: string[];
  benefits: string[];
  /** Honest limitations, shown under "Lo que debes saber". */
  consider: string[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
  /** Claims the clinic's dentist must confirm before publishing. Rendered as TODO comments in code, not on the page. */
  todo: string[];
  /** Pages actually consulted during research. */
  sources: { label: string; url: string }[];
};
