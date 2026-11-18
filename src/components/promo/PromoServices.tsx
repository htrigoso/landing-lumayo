import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { clinicPricesFor, formatAmount, type ClinicPrice } from "@/lib/clinic-prices";
import { discountedAmount, promo } from "@/lib/promo";
import { serviceCategories, servicesInCategory, type Service } from "@/lib/site";
import { PromoLink } from "./PromoLink";

const unitOf = (label: string) => /^Precio por (.+)$/.exec(label)?.[1];

/**
 * "Desde S/ 350 por pieza → S/ 245 con 30%", from the lowest confirmed paid price. Services without a
 * confirmed paid price (none, or only the free consultation) return null and show just the badge.
 */
function priceLine(items: readonly ClinicPrice[] | undefined): string | null {
  if (!items) return null;
  const lowest = items
    .map((item) => ({ amount: "price" in item ? item.price : item.minPrice, label: item.label }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => a.amount - b.amount)[0];
  if (!lowest) return null;
  const unit = unitOf(lowest.label);
  return `Desde S/ ${formatAmount(lowest.amount)}${unit ? ` por ${unit}` : ""} → S/ ${formatAmount(discountedAmount(lowest.amount))} con ${promo.percent}%`;
}

function ServiceCard({ service }: { service: Service }) {
  const price = priceLine(clinicPricesFor(service.id));
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_18px_40px_-30px_color-mix(in_srgb,var(--color-azul-950)_40%,transparent)]">
      <div className="relative aspect-[4/3] bg-surface">
        <Image src={service.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-surface-accent px-3 py-1 text-sm font-extrabold text-on-accent">
          -{promo.percent}%
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-heading">{service.name}</h3>
        <p className="text-sm leading-relaxed text-text">{service.description}</p>
        {price && <p className="text-sm font-semibold text-primary">{price}</p>}
        <PromoLink cta="service" service={service.name} className="btn btn-wa mt-auto w-full text-base">
          Pedir por WhatsApp
        </PromoLink>
      </div>
    </li>
  );
}

/** Every service of the clinic, grouped by the same categories as /servicios. */
export function PromoServices() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative isolate overflow-hidden bg-bg py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading
          number="02"
          label="Servicios incluidos"
          id="servicios-title"
          title={
            <>
              Todos con <strong>{promo.percent}% menos</strong>
            </>
          }
          description="La promoción cubre cada servicio de la lista. Donde la clínica tiene un precio confirmado, lo mostramos con el descuento aplicado."
        />

        <nav aria-label="Categorías de servicios" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <li key={category.id}>
                <a href={`#servicios-${category.id}`} className="pill min-h-11 text-sm">
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {serviceCategories.map((category) => (
          <Reveal key={category.id} className="mt-12">
            <div id={`servicios-${category.id}`} className="scroll-mt-24">
              <h3 className="text-xl font-bold text-heading">{category.label}</h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {servicesInCategory(category).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
