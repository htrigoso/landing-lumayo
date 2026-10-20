import { CheckIcon } from "@/components/icons";
import type { BlogBlock, BlogSection } from "@/lib/blog/types";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[1.0625rem] leading-[1.75] text-text sm:text-lg">{block.text}</p>;

    case "list":
      if (block.ordered) {
        return (
          <ol className="list-decimal space-y-3 pl-6 text-[1.0625rem] leading-[1.75] text-text marker:font-bold marker:text-heading sm:text-lg">
            {block.items.map((item) => (
              <li key={item} className="min-w-0 pl-1">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="grid gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex min-w-0 gap-3 text-[1.0625rem] leading-[1.75] text-text sm:text-lg">
              <CheckIcon className="mt-1.5 size-5 shrink-0 text-accent-text" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div
          className={`rounded-2xl border border-l-4 p-5 sm:p-6 ${
            block.tone === "alert"
              ? "border-error/25 border-l-error bg-surface"
              : "border-primary/15 border-l-primary bg-surface-mint"
          }`}
        >
          <p className="font-display font-bold text-heading">{block.title}</p>
          <p className="mt-2 text-base leading-relaxed text-text">{block.text}</p>
        </div>
      );
  }
}

/** Article sections with anchor headings, used by the table of contents. */
export function PostBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="grid gap-12 lg:gap-16">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
          <span
            aria-hidden="true"
            className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent-text"
          >
            <span>Sección {String(index + 1).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-surface-soft" />
          </span>
          <h2
            id={`${section.id}-title`}
            className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-heading text-balance sm:text-[1.75rem]"
          >
            {section.title}
          </h2>
          <div className="mt-6 grid gap-5">
            {section.blocks.map((block, i) => (
              <Block key={`${section.id}-${i}`} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
