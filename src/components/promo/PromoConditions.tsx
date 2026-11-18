import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { promo, promoFaqs } from "@/lib/promo";

const facts = [
  { term: "Vigencia", value: "Del 1 al 31 de diciembre de 2026 (hora de Lima)" },
  { term: "Aplica a", value: "Todos los servicios del centro" },
  {
    term: "Tratamientos largos",
    value: "En ortodoncia, diseño de sonrisa y otros tratamientos largos, el 30% se aplica sobre el precio total si el tratamiento se inicia o se contrata entre el 1 y el 31 de diciembre.",
  },
];

/** Terms of the promotion, then the questions patients ask most. */
export function PromoConditions() {
  return (
    <section id="condiciones" aria-labelledby="condiciones-title" className="relative isolate overflow-hidden bg-bg py-16 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SectionHeading number="04" label="Condiciones" id="condiciones-title" layout="stack" title={<>Lo que <strong>debes saber</strong></>} />
          <dl className="mt-8 divide-y divide-line rounded-2xl border border-border bg-surface">
            {facts.map((fact) => (
              <div key={fact.term} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="font-semibold text-heading">{fact.term}</dt>
                <dd className="leading-relaxed text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-text">La promoción de {promo.percent}% se rige por las condiciones de esta página.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-heading">Preguntas frecuentes</h3>
          <FaqAccordion items={[...promoFaqs]} />
        </div>
      </div>
    </section>
  );
}
