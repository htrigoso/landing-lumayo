import type { Thing, WithContext } from "schema-dts";

/**
 * Renders one schema.org JSON-LD block. Escapes "<" so content such as "</script>" cannot break out
 * of the tag (see the Next.js JSON-LD guide).
 */
export function JsonLd({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
