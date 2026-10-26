import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo/metadata";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { PageHeader } from "@/components/sections/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPageJsonLd } from "@/lib/seo/jsonld";
import { fullAddress, site } from "@/lib/site";

const title = "Contacto · Lumayo Centro Odontológico";
const description = `Escríbenos por WhatsApp o llámanos al ${site.phoneDisplay}. Estamos en ${fullAddress}.`;

export const metadata: Metadata = {
  title,
  description,
  ...pageSocial({ title, description, path: "/contacto" }),
};

/** Contact page, structured like the reference: page header, contact details with map, photo + form. */
export default function ContactoPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={contactPageJsonLd()} />
      <main id="main">
        <PageHeader
          title="Estamos para"
          emphasis="ayudarte"
          description="Agenda tu cita o resuelve tus dudas: te respondemos por WhatsApp."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        />
        <ContactInfo />
        <ContactFormSection />
        <WaveDivider from="bg-surface" to="var(--color-surface-deep)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
