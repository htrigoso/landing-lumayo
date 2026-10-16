type TocItem = { id: string; title: string };

/** Section links for an article, shown as a wrapping row of numbered chips. */
export function TableOfContents({ sections }: { sections: TocItem[] }) {
  return (
    <nav aria-label="Índice del artículo" className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">En este artículo</p>
      <ol className="mt-3 flex flex-wrap gap-2">
        {sections.map((section, index) => (
          <li key={section.id} className="min-w-0">
            <a
              href={`#${section.id}`}
              className="inline-flex min-h-11 max-w-full items-center gap-2 break-words rounded-full border border-line bg-white px-4 py-2 text-left text-sm font-medium text-ink-600 transition-colors hover:border-navy-700/30 hover:bg-sky-50 hover:text-navy-700 motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="font-display text-xs font-extrabold text-cyan-700">
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
