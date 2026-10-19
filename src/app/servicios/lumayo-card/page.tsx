import type { Metadata } from "next";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { LumayoCard } from "@/components/sections/LumayoCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, lumayoCardHowToJsonLd, lumayoCardJsonLd } from "@/lib/seo/jsonld";
import { lumayoCard } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lumayo Card · Lumayo Centro Odontológico",
  description:
    "Tarjeta de protección odontológica de Lumayo con descuentos preferenciales para el titular y sus adicionales (hasta 3 en la Clásica y 6 en la Dorada). Consulta por WhatsApp al 946 788 123.",
};

export default function LumayoCardPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={lumayoCardJsonLd()} />
      <JsonLd data={lumayoCardHowToJsonLd()} />
      <JsonLd data={faqJsonLd(lumayoCard.faqs)} />
      <main id="main">
        <PageHeader
          title="Lumayo"
          emphasis="Card"
          description="Protección odontológica con descuentos preferenciales para toda tu familia."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: "Lumayo Card" }]}
        />
        <LumayoCard />
        <WaveDivider from="bg-sky-50" to="var(--color-navy-500)" />
        <BookingSection number="01" />
        <WaveDivider from="bg-navy-500" to="var(--color-navy-900)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
