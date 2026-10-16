import { aestheticsContent } from "@/lib/service-content/aesthetics";
import { careContent } from "@/lib/service-content/care";
import { surgeryContent } from "@/lib/service-content/surgery";
import type { ServiceContent } from "@/lib/service-content/types";

export type { ServiceContent } from "@/lib/service-content/types";

/** Detail content keyed by service id. Every id in `services` must have an entry. */
export const serviceContent: Record<string, ServiceContent> = {
  ...aestheticsContent,
  ...careContent,
  ...surgeryContent,
};

export function getServiceContent(id: string): ServiceContent | undefined {
  return serviceContent[id];
}
