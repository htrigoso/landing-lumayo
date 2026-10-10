import type { Metadata } from "next";
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
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { getDisplayedTestimonials } from "@/lib/results";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Nosotros · Lumayo Centro Odontológico",
  description:
    "Conoce Lumayo, centro odontológico en Tarapoto: atención cercana, tecnología actual y un proceso claro desde la primera consulta.",
};

/** About page, structured like the reference: intro collage, how we work, care process, why us, team, testimonials, booking. */
export default function NosotrosPage() {
  const hasTestimonials = getDisplayedTestimonials().length > 0;
  const hasTeam = team.length > 0;
  // Keep backgrounds alternating: testimonials go white when they follow "Why us" (mist) directly
  const testimonialsSurface = hasTeam ? "mist" : "white";
  // The wave into the booking band takes the colour of whichever section ends up above it
  const lastBg = hasTestimonials ? (testimonialsSurface === "mist" ? "bg-sky-50" : "bg-white") : hasTeam ? "bg-white" : "bg-sky-50";

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
          title="Sobre"
          emphasis="nosotros"
          description="Un centro odontológico en Tarapoto donde te explicamos cada paso y te atendemos sin apuros."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
        />
        <AboutIntro />
        <HowWeWork />
        <CareProcess />
        <WhyChooseUs />
        <TeamSection />
        <Testimonials number="01" surface={testimonialsSurface} />
        <WaveDivider from={lastBg} to="var(--color-navy-500)" />
        <BookingSection number={hasTestimonials ? "02" : "01"} />
        <WaveDivider from="bg-navy-500" to="var(--color-navy-900)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
