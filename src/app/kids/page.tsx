import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo/metadata";
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
import { lumayoKids, programPaths } from "@/lib/site";

const title = "Lumayo Kids · Lumayo Centro Odontológico";
const description =
  "Odontopediatría en Tarapoto: primera visita tranquila, prevención y consejos para papás según la edad de tu hijo. Consulta por WhatsApp al 946 788 123.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: programPaths.kids },
  ...pageSocial({ title, description, path: programPaths.kids }),
};

export default function LumayoKidsPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
          accent
          description="Sonrisas sanas desde la primera visita."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Kids" }]}
        />
        <LumayoKids />
        <WhyChooseUs flatBottom />
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
