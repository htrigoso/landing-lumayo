import type { Metadata } from "next";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { LumayoNovias } from "@/components/sections/LumayoNovias";
import { PageHeader } from "@/components/sections/PageHeader";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, lumayoNoviasHowToJsonLd, lumayoNoviasJsonLd } from "@/lib/seo/jsonld";
import { lumayoNovias } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lumayo Novias · Lumayo Centro Odontológico",
  description:
    "Plan de sonrisa para novias y novios en Tarapoto: blanqueamiento, carillas, ortodoncia y diseño de sonrisa. Evaluación y presupuesto a tu medida. Consulta por WhatsApp al 946 788 123.",
};

export default function LumayoNoviasPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-azul-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={lumayoNoviasJsonLd()} />
      <JsonLd data={lumayoNoviasHowToJsonLd()} />
      <JsonLd data={faqJsonLd(lumayoNovias.faqs)} />
      <main id="main">
        <PageHeader
          title="Lumayo"
          emphasis="Novias"
          description="Tu sonrisa, lista para el día más importante."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: "Lumayo Novias" }]}
        />
        <LumayoNovias />
        <WhyChooseUs flatBottom />
        <WaveDivider from="bg-azul-50" to="var(--color-surface-inverse)" />
        <BookingSection number="01" />
        <WaveDivider from="bg-surface-inverse" to="var(--color-surface-deep)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
