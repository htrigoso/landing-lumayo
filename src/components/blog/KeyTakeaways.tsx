import { CheckIcon } from "@/components/icons";

/** Summary card shown before the article body. */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="key-takeaways-title" className="rounded-3xl bg-navy-900 p-6 text-white sm:p-8">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <span className="pill pill-outline">Resumen</span>
      </div>
      <h2 id="key-takeaways-title" className="mt-4 font-display text-xl font-extrabold text-white">
        Puntos clave
      </h2>
      <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex min-w-0 gap-3 text-base leading-relaxed text-sky-100/90">
            <CheckIcon className="mt-1 size-5 shrink-0 text-cyan-700" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
