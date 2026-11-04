/**
 * One service page as written by the SEO lead (docs/Estructura de contenido - Lumayo.pdf).
 * Headings, order and wording come from the document; the page renders them as they are.
 */
export type DocBlock =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "prices"; items: ({ label: string; value: string } | { label: string; pending: true })[] }
  | { type: "sources"; text: string }
  | { type: "note"; text: string }
  | {
      type: "gallery";
      placeholder: boolean;
      /** Temporary AI-generated photos: the page labels them as such until real cases replace them. */
      aiGenerated?: boolean;
      /** Each case: before, optional treatment stage ("during"), after. */
      cases: { before: string; during?: string; after: string }[];
    };

export type DocSubsection = { title: string; blocks: DocBlock[] };

export type DocSection = {
  /** H2 title, exactly as in the document. */
  title: string;
  blocks: DocBlock[];
  /** H3 blocks under this H2, in document order. */
  subsections: DocSubsection[];
};

export type ServiceDoc = {
  /** H1, exactly as in the document. */
  h1: string;
  lead: string;
  idealFor: string;
  sections: DocSection[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  /** Closing paragraph without a heading. */
  closing: string;
};
