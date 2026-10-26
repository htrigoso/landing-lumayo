export type BlogCategory =
  | "Prevención"
  | "Niños"
  | "Estética"
  | "Ortodoncia"
  | "Urgencias"
  | "Tratamientos"
  | "Consejos";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; tone: "tip" | "alert"; title: string; text: string };

export type BlogSection = {
  /** Anchor id, unique within the post. */
  id: string;
  title: string;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  /** 1-2 sentences, also used as meta description. */
  excerpt: string;
  category: BlogCategory;
  readingMinutes: number;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD). */
  updatedAt: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  /** Internal links to service pages or programs. */
  related: { label: string; href: string }[];
  /** Id from `services` in `src/lib/site.ts`; its photo is the post cover. */
  coverServiceId: string;
  /** Id of a `team` member in `src/lib/team.ts` who reviewed the post. Falls back to `defaultReviewerId`. */
  reviewer?: string;
  sources: { label: string; url: string }[];
  /** Claims the clinic's dentist must confirm before publishing. Not shown on the page. */
  todo: string[];
};
