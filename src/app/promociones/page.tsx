import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo/metadata";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PromoClosing } from "@/components/promo/PromoClosing";
import { PromoConditions } from "@/components/promo/PromoConditions";
import { PromoHero } from "@/components/promo/PromoHero";
import { PromoServices } from "@/components/promo/PromoServices";
import { PromoSteps } from "@/components/promo/PromoSteps";
import { faqJsonLd, promoJsonLd } from "@/lib/seo/jsonld";
import { promo, promoFaqs } from "@/lib/promo";
import { programPaths } from "@/lib/site";

const title = "Promoción 30% de descuento en diciembre 2026 · Lumayo";
const description =
  "30% de descuento en todos los servicios de Lumayo del 1 al 31 de diciembre de 2026, en Tarapoto. Consulta por WhatsApp al 986 382 607.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: programPaths.promociones },
  ...pageSocial({
    title,
    description,
    path: programPaths.promociones,
    image: { url: "/promociones/og.jpg", width: 1200, height: 630, alt: `Promoción ${promo.percent}% de descuento en todos los servicios de Lumayo en diciembre 2026` },
  }),
};

export default function PromocionesPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={promoJsonLd()} />
      <JsonLd data={faqJsonLd([...promoFaqs])} />
      <main id="main">
        <PromoHero />
        <PromoServices />
        <PromoSteps />
        <PromoConditions />
        <PromoClosing />
        <WaveDivider from="bg-bg" to="var(--color-surface-accent)" />
        <BookingSection number="05" tone="aqua" />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
