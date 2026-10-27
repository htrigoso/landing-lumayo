import { WaveDivider } from "@/components/decor/WaveDivider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { About } from "@/components/sections/About";
import { BookingSection } from "@/components/sections/BookingSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Testimonials } from "@/components/sections/Testimonials";
import { Services } from "@/components/sections/Services";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDisplayedTestimonials, testimonials } from "@/lib/results";
import { reviewJsonLd } from "@/lib/seo/jsonld";
import { heroPosterSrc } from "@/lib/hero-media";
import { preload } from "react-dom";

export default function Home() {
  // Server-side hint so the LCP poster is in <head> from the first byte, not after hydration
  preload(heroPosterSrc, { as: "image", fetchPriority: "high" });
  // Section numbers follow the manual's "01 — Label" style and must stay consecutive in DOM order.
  // Services is 01 and About is 02 (hardcoded). Testimonials is 03 when shown; when hidden
  // (no real reviews yet) it renders nothing, so Location and BookingSection shift down by one.
  const hasTestimonials = getDisplayedTestimonials().length > 0;
  const n = (i: number) => String(hasTestimonials ? i : i - 1).padStart(2, "0");

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-text-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <WhyChooseUs />
        <SocialProofStrip />
        <BrandStatement />
        <About />
        <Testimonials number="03" />
        <Location number={n(4)} />
        <WaveDivider from="bg-bg" to="var(--color-surface-inverse)" />
        <BookingSection number={n(5)} />
        <WaveDivider
          from="bg-surface-inverse"
          to="var(--color-surface-deep)"
          flip
        />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
      {/* Real testimonials only; renders nothing while src/lib/results.ts `testimonials` is empty. */}
      {testimonials.map((testimonial, index) => (
        <JsonLd
          key={`${testimonial.name}-${index}`}
          data={reviewJsonLd(testimonial)}
        />
      ))}
    </>
  );
}
