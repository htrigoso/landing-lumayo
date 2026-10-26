import Link from "next/link";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { PriceSourceNote } from "@/components/services/OrthoPriceBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryPriceAnswer, formatMarketRange, formatSoles } from "@/lib/ortho-prices";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { services, servicePath, whatsappUrl, type Service } from "@/lib/site";

type OrthoService = Service & { ortho: NonNullable<Service["ortho"]> };

const orthoServices: OrthoService[] = services.flatMap((s) =>
  s.category === "ortodoncia" && s.ortho ? [{ ...s, ortho: s.ortho }] : [],
);

/** Column appears only once the clinic has confirmed at least one price. */
const showLumayoColumn = orthoServices.some((s) => s.ortho.priceFrom !== undefined);

/** Lumayo's own price cell: "Desde S/ N" once the clinic has confirmed it, otherwise "Consultar". */
function lumayoPriceLabel(priceFrom: number | undefined): string {
  return priceFrom === undefined ? "Consultar" : `Desde ${formatSoles(priceFrom)}`;
}

const lumayoPrices = orthoServices.flatMap((s) =>
  s.ortho.priceFrom === undefined ? [] : [`${s.name} desde ${formatSoles(s.ortho.priceFrom)}`],
);

const priceAnswer =
  lumayoPrices.length > 0 ? `${categoryPriceAnswer()} Precio de Lumayo: ${lumayoPrices.join(", ")}.` : categoryPriceAnswer();

// TODO(SEO): confirm the general duration ranges with the dentist
const durationAnswer =
  "En general, el tratamiento con brackets dura entre 12 y 24 meses. Los brackets linguales pueden tardar más. El tiempo exacto depende de tu caso y se define en la evaluación.";

const faqs = [
  { q: "¿Cuánto cuestan los brackets en Tarapoto?", a: priceAnswer },
  { q: "¿Cuánto dura un tratamiento con brackets?", a: durationAnswer },
];

/** Orthodontics comparison on /servicios/ortodoncia: accessible table of bracket types, plus its FAQ. */
export function OrthoComparison() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section aria-labelledby="ortho-prices-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <div className="container-page">
          <h2 id="ortho-prices-title" className="section-title">
            Tipos de brackets y precios en Tarapoto
          </h2>
          <p className="section-sub mt-3 max-w-2xl text-pretty">
            Compara visibilidad, duración típica y el rango de precio en el mercado peruano. El precio final se confirma tras la evaluación de tu caso.
          </p>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-white">
            <table aria-labelledby="ortho-prices-title" className="w-full min-w-[36rem] border-collapse text-left text-base">
              <thead className="bg-surface-soft text-heading">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Tipo
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Visibilidad
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Duración típica
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Precio de referencia en Perú
                  </th>
                  {showLumayoColumn && (
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Lumayo
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-text">
                {orthoServices.map((service) => (
                  <tr key={service.id}>
                    <th scope="row" className="px-5 py-4 text-left font-semibold text-heading">
                      <Link href={servicePath(service)} className="rounded-sm underline-offset-4 hover:text-primary hover:underline">
                        {service.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4">{service.ortho.visibility}</td>
                    <td className="px-5 py-4">{service.ortho.typicalMonths}</td>
                    <td className="px-5 py-4">
                      {formatMarketRange(service.ortho.marketRange)}
                      {service.ortho.marketRange.note && (
                        <span className="block text-sm text-text">{service.ortho.marketRange.note}</span>
                      )}
                    </td>
                    {showLumayoColumn && <td className="px-5 py-4">{lumayoPriceLabel(service.ortho.priceFrom)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PriceSourceNote className="mt-4" />

          <p className="mt-4 text-sm text-text">
            ¿Dudas sobre tu caso?{" "}
            <a href={whatsappUrl("Hola Lumayo, quisiera un presupuesto de brackets.")} target="_blank" rel="noopener" className="font-semibold text-primary underline-offset-4 hover:underline">
              Escríbenos por WhatsApp
            </a>
            .
          </p>

          <div className="mt-14 max-w-3xl">
            <h2 className="section-title text-2xl sm:text-3xl">Preguntas sobre brackets y precios</h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
