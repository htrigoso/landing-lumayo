import { CheckIcon } from "@/components/icons";

/** Summary card shown before the article body. */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="key-takeaways-title" className="rounded-3xl bg-surface-inverse p-6 text-text-inverse sm:p-8">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <span className="pill pill-outline">Resumen</span>
      </div>
      <h2 id="key-takeaways-title" className="mt-4 font-display text-xl font-extrabold text-text-inverse">
        Puntos clave
      </h2>
      <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex min-w-0 gap-3 text-base leading-relaxed text-text-inverse-muted">
            <CheckIcon className="mt-1 size-5 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
