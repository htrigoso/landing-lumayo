import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo/metadata";
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
import { lumayoCard, programPaths } from "@/lib/site";

const title = "Membresía Lumayo · Lumayo Centro Odontológico";
const description =
  "Membresía de protección odontológica de Lumayo con descuentos preferenciales para el titular y sus adicionales (hasta 3 en la Clásica y 6 en la Dorada). Consulta por WhatsApp al 986 382 607.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: programPaths.card },
  ...pageSocial({ title, description, path: programPaths.card }),
};

export default function LumayoCardPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={lumayoCardJsonLd()} />
      <JsonLd data={lumayoCardHowToJsonLd()} />
      <JsonLd data={faqJsonLd(lumayoCard.faqs)} />
      <main id="main">
        <PageHeader
          title="Membresía"
          emphasis="Lumayo"
          accent
          description="Protección odontológica con descuentos preferenciales para toda tu familia."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Membresía" }]}
        />
        <LumayoCard />
        <WaveDivider from="bg-surface" to="var(--color-surface-inverse)" />
        <BookingSection number="01" />
        <WaveDivider from="bg-surface-inverse" to="var(--color-surface-deep)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
