type TocItem = { id: string; title: string };

/** Section links for an article, shown as a wrapping row of numbered chips. */
export function TableOfContents({ sections }: { sections: TocItem[] }) {
  return (
    <nav aria-label="Índice del artículo" className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-heading">En este artículo</p>
      <ol className="mt-3 flex flex-wrap gap-2">
        {sections.map((section, index) => (
          <li key={section.id} className="min-w-0">
            <a
              href={`#${section.id}`}
              className="group inline-flex min-h-11 max-w-full items-center gap-2 break-words relative rounded-full border border-border bg-bg px-4 py-2 text-left text-sm font-medium text-text transition-colors before:absolute before:left-1.5 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-accent before:opacity-0 before:content-[''] hover:border-primary hover:bg-primary hover:text-text-inverse hover:before:opacity-100 focus-visible:before:opacity-100 motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="font-display text-xs font-extrabold text-accent-text group-hover:text-text-inverse">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
