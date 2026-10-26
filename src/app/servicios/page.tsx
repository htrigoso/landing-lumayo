import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { servicesIndexJsonLd } from "@/lib/seo/jsonld";
import { pageSocial } from "@/lib/seo/metadata";
import { services } from "@/lib/site";

const indexTitle = "Servicios · Lumayo Centro Odontológico";
const indexDescription =
  "Brackets, carillas, diseño de sonrisa, limpieza, curaciones dentales, endodoncia, extracción dental, implantes y odontopediatría en Tarapoto. Consulta por WhatsApp al 946 788 123.";
// Cover: the first featured service photo, falling back to the first service.
const indexCover = services.find((s) => s.featured) ?? services[0];

export const metadata: Metadata = {
  title: indexTitle,
  description: indexDescription,
  alternates: { canonical: "/servicios" },
  ...pageSocial({
    title: indexTitle,
    description: indexDescription,
    path: "/servicios",
    image: indexCover ? { url: indexCover.image, alt: indexCover.name } : undefined,
  }),
};

/** Full services list; each category has its own page under /servicios/<categoria>. */
export default function ServiciosPage() {
  return (
    <>
      <JsonLd data={servicesIndexJsonLd()} />
      <ServicesPageView
        title="Nuestros"
        emphasis="servicios"
        description="Tratamientos para toda la familia en Tarapoto, con un plan claro desde la primera consulta."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />
    </>
  );
}
