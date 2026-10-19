import type { Metadata } from "next";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { LumayoKids } from "@/components/sections/LumayoKids";
import { PageHeader } from "@/components/sections/PageHeader";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, lumayoKidsHowToJsonLd, lumayoKidsJsonLd } from "@/lib/seo/jsonld";
import { lumayoKids } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lumayo Kids · Lumayo Centro Odontológico",
  description:
    "Odontopediatría en Tarapoto: primera visita tranquila, prevención y consejos para papás según la edad de tu hijo. Consulta por WhatsApp al 946 788 123.",
};

export default function LumayoKidsPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={lumayoKidsJsonLd()} />
      <JsonLd data={lumayoKidsHowToJsonLd()} />
      <JsonLd data={faqJsonLd(lumayoKids.faqs)} />
      <main id="main">
        <PageHeader
          title="Lumayo"
          emphasis="Kids"
          description="Sonrisas sanas desde la primera visita."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: "Lumayo Kids" }]}
        />
        <LumayoKids />
        <WhyChooseUs flatBottom />
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
