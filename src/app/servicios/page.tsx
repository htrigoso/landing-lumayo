import type { Metadata } from "next";
import { ServicesPageView } from "@/components/services/ServicesPageView";

export const metadata: Metadata = {
  title: "Servicios · Lumayo Centro Odontológico",
  description:
    "Brackets, carillas, diseño de sonrisa, limpieza, curaciones dentales, endodoncia, extracción dental, implantes y odontopediatría en Tarapoto. Consulta por WhatsApp al 946 788 123.",
  alternates: { canonical: "/servicios" },
};

/** Full services list; each category has its own page under /servicios/<categoria>. */
export default function ServiciosPage() {
  return (
    <ServicesPageView
      title="Nuestros"
      emphasis="servicios"
      description="Tratamientos para toda la familia en Tarapoto, con un plan claro desde la primera consulta."
      crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
    />
  );
}
