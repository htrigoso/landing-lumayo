import type { Metadata } from "next";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { PageHeader } from "@/components/sections/PageHeader";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { getDisplayedTestimonials } from "@/lib/results";

export const metadata: Metadata = {
  title: "Servicios · Lumayo Centro Odontológico",
  description:
    "Ortodoncia con brackets, carillas, diseño de sonrisa, limpieza, curaciones, endodoncia, extracciones, implantes y odontopediatría en Tarapoto. Consulta por WhatsApp al 946 788 123.",
};

/** Services page, structured like the reference: page header, full services grid, why us, testimonials, booking. */
export default function ServiciosPage() {
  // Consecutive section numbers even when the testimonials block is hidden (no real reviews yet)
  const hasTestimonials = getDisplayedTestimonials().length > 0;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <PageHeader
          title="Nuestros"
          emphasis="servicios"
          description="Tratamientos para toda la familia en Tarapoto, con un plan claro desde la primera consulta."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
        />

        <section id="servicios" aria-label="Lista de servicios" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
          <SectionBackdrop lines="bl" glow="tr" />
          <div className="container-page">
            <ServicesGrid />
          </div>
        </section>

        <WhyChooseUs />
        <BrandStatement />
        <Testimonials number="01" />
        <WaveDivider from={hasTestimonials ? "bg-sky-50" : "bg-white"} to="var(--color-navy-500)" />
        <BookingSection number={hasTestimonials ? "02" : "01"} />
        <WaveDivider from="bg-navy-500" to="var(--color-navy-900)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
