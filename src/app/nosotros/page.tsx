import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo/metadata";
import { AboutIntro } from "@/components/about/AboutIntro";
import { CareProcess } from "@/components/about/CareProcess";
import { HowWeWork } from "@/components/about/HowWeWork";
import { TeamSection } from "@/components/about/TeamSection";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { careProcessSteps } from "@/components/about/CareProcess";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDisplayedTestimonials, reviewTestimonials } from "@/lib/results";
import { aboutPageJsonLd, personJsonLd, reviewJsonLd } from "@/lib/seo/jsonld";
import { team } from "@/lib/team";

const title = "Nosotros · Lumayo Centro Odontológico";
const description =
  "Conoce Lumayo, centro odontológico en Tarapoto: atención cercana, tecnología actual y un proceso claro desde la primera consulta.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSocial({ title, description, path: "/nosotros" }),
};

/** About page, structured like the reference: intro collage, how we work, care process, why us, team, testimonials, booking. */
export default function NosotrosPage() {
  const hasTestimonials = getDisplayedTestimonials().length > 0;
  const hasTeam = team.length > 0;
  // Keep backgrounds alternating: testimonials go white when they follow "Why us" (mist) directly
  const testimonialsSurface = hasTeam ? "mist" : "white";
  // The wave into the booking band takes the colour of whichever section ends up above it
  const lastBg = hasTestimonials ? (testimonialsSurface === "mist" ? "bg-surface" : "bg-white") : hasTeam ? "bg-white" : "bg-surface";

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd
        data={aboutPageJsonLd(careProcessSteps.map((step) => ({ src: step.img, title: step.title, text: step.text })))}
      />
      {/* Team and reviews render only when their lists have entries (both are empty today). */}
      {team.map((member) => (
        <JsonLd key={member.name} data={personJsonLd(member)} />
      ))}
      {reviewTestimonials.map((testimonial) => (
        <JsonLd key={testimonial.name} data={reviewJsonLd(testimonial)} />
      ))}
      <main id="main">
        <PageHeader
          title="Sobre"
          emphasis="nosotros"
          description="Un centro odontológico en Tarapoto donde te explicamos cada paso y te atendemos sin apuros."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
        />
        <AboutIntro />
        <HowWeWork />
        <CareProcess />
        <WhyChooseUs />
        <SocialProofStrip />
        <TeamSection />
        <Testimonials surface={testimonialsSurface} flatBottom />
        <WaveDivider from={lastBg} to="var(--color-surface-inverse)" />
        <BookingSection number="01" />
        <WaveDivider from="bg-surface-inverse" to="var(--color-surface-deep)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
