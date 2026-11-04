import { aestheticsDocs } from "./aesthetics";
import { kidsDocs } from "./kids";
import { orthodonticsDocs } from "./orthodontics";
import { preventionDocs } from "./prevention";
import { restorationDocs } from "./restoration";
import { surgeryDocs } from "./surgery";
import { veneersDocs } from "./veneers";
import type { ServiceDoc } from "./types";

export type { DocBlock, DocSection, DocSubsection, ServiceDoc } from "./types";

const docs: Record<string, ServiceDoc> = {
  ...orthodonticsDocs,
  ...aestheticsDocs,
  ...veneersDocs,
  ...preventionDocs,
  ...restorationDocs,
  ...surgeryDocs,
  ...kidsDocs,
};

/** SEO-lead copy for a service id, or undefined when the service still uses the legacy content. */
export function getServiceDoc(id: string): ServiceDoc | undefined {
  return Object.hasOwn(docs, id) ? docs[id] : undefined;
}
