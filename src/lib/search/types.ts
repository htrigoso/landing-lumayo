export type SearchKind = "service" | "program" | "post";

/** One searchable item. Built once on the server (see build-index.ts) and shipped as JSON. */
export type SearchEntry = {
  /** Stable id: service id, "program-<name>" or "post-<slug>". Used for analytics. */
  id: string;
  kind: SearchKind;
  title: string;
  /** Category label for services and posts; "Programa" for programs. */
  subtitle: string;
  description: string;
  href: string;
  image?: string;
  /** Confirmed clinic price only, e.g. "Desde S/ 350" or "Consulta gratis". */
  priceLabel?: string;
  /** Service category id, services only. */
  categoryId?: string;
  featured?: boolean;
  /** Extra terms matched like a title (normalized at match time). */
  keywords: string[];
};

export type SearchIndex = {
  entries: SearchEntry[];
};
