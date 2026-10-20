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
import type { ServiceCategoryId } from "@/lib/site";

type Crumb = { label: string; href?: string };

type ServicesPageViewProps = {
  title: string;
  emphasis: string;
  description: string;
  crumbs: Crumb[];
  /** Category landing pages pass their category; the full list leaves it undefined. */
  activeCategory?: ServiceCategoryId;
};

/**
 * Shared layout for /servicios and its category pages: page header, linked category chips and the
 * grid, why us, testimonials, booking.
 */
export function ServicesPageView({ title, emphasis, description, crumbs, activeCategory }: ServicesPageViewProps) {
  // Consecutive section numbers even when the testimonials block is hidden (no real reviews yet)
  const hasTestimonials = getDisplayedTestimonials().length > 0;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <PageHeader title={title} emphasis={emphasis} description={description} crumbs={crumbs} />

        <section id="servicios" aria-label="Lista de servicios" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
          <SectionBackdrop lines="bl" glow="tr" />
          <div className="container-page">
            <ServicesGrid linkMode activeCategory={activeCategory} />
          </div>
        </section>

        <WhyChooseUs />
        <BrandStatement />
        <Testimonials number="01" flatBottom />
        <WaveDivider from={hasTestimonials ? "bg-surface" : "bg-white"} to="var(--color-surface-inverse)" />
        <BookingSection number={hasTestimonials ? "02" : "01"} />
        <WaveDivider from="bg-surface-inverse" to="var(--color-surface-deep)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}
