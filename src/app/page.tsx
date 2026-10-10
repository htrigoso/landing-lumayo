import { WaveDivider } from "@/components/decor/WaveDivider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { About } from "@/components/sections/About";
import { BookingSection } from "@/components/sections/BookingSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Orthodontics } from "@/components/sections/Orthodontics";
import { Testimonials } from "@/components/sections/Testimonials";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { getDisplayedTestimonials } from "@/lib/results";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Lumayo Centro Odontológico",
  telephone: site.phoneE164,
  image: "/images/hero.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: `${site.address.district}, ${site.address.city}`,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
};

export default function Home() {
  // Section numbers follow the manual's "01 — Label" style and must stay consecutive
  // even when the testimonials block is hidden (no real reviews yet).
  const hasTestimonials = getDisplayedTestimonials().length > 0;
  const n = (i: number) => String(hasTestimonials ? i : i - 1).padStart(2, "0");

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
        <Hero />
        <Services />
        <WhyChooseUs />
        <BrandStatement />
        <Orthodontics />
        <About />
        <Testimonials />
        <Location number={n(5)} />
        <WaveDivider from="bg-white" to="var(--color-navy-500)" />
        <BookingSection number={n(6)} />
        <WaveDivider from="bg-navy-500" to="var(--color-navy-900)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
