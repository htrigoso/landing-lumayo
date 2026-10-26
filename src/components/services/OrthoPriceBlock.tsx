import { formatMarketRange, orthoPriceQuestion } from "@/lib/ortho-prices";
import { priceSources, type Service } from "@/lib/site";

/** Disclaimer and public sources for the market price ranges. Shared by the table and the type pages. */
export function PriceSourceNote({ className = "" }: { className?: string }) {
  const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";
  return (
    <p className={`text-sm text-text ${className}`}>
      Rangos referenciales del mercado peruano (2026), no son precios de Lumayo. El precio final depende de tu evaluación. Fuentes:{" "}
      <a href={priceSources.cuantomecuesta.url} target="_blank" rel="noopener" className={linkClass}>
        {priceSources.cuantomecuesta.label}
      </a>
      ,{" "}
      <a href={priceSources.odontologiaperu.url} target="_blank" rel="noopener" className={linkClass}>
        {priceSources.odontologiaperu.label}
      </a>
      .
    </p>
  );
}

/** Compact price summary for an orthodontics type page. The full Q&A lives in the page FAQ. */
export function OrthoPriceBlock({ service }: { service: Service }) {
  if (!service.ortho) return null;
  const { marketRange, typicalMonths } = service.ortho;
  const titleId = `${service.id}-price-title`;

  return (
    <section aria-labelledby={titleId} className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
      <div className="container-page">
        <div className="rounded-3xl border border-border bg-surface-soft p-6 sm:p-10">
          <h2 id={titleId} className="font-display text-xl font-bold text-heading sm:text-2xl">
            {orthoPriceQuestion(service.id)}
          </h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-text">Rango de referencia en Perú</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-heading">
                {formatMarketRange(marketRange)}
                {marketRange.note && <span className="ml-2 text-base font-normal text-text">{marketRange.note}</span>}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-text">Duración típica</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-heading">{typicalMonths}</dd>
            </div>
          </dl>
          <PriceSourceNote className="mt-6" />
        </div>
      </div>
    </section>
  );
}
