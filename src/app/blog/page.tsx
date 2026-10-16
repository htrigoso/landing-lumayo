import type { Metadata } from "next";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { BlogList } from "@/components/blog/BlogList";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog · Lumayo Centro Odontológico",
  description:
    "Artículos sobre salud dental, prevención, estética y tratamientos, escritos para pacientes en Tarapoto.",
};

export default function BlogPage() {
  const featured = posts.slice(0, 3);

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
          title="Nuestro"
          emphasis="blog"
          description="Consejos claros sobre tu salud dental, escritos para pacientes."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
        />

        <section aria-labelledby="destacados-title" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
          <SectionAtmosphere tone="mist" glow="bl" />

          <div className="container-page min-w-0">
            <SectionHeading
              number="01"
              label="Destacados"
              id="destacados-title"
              layout="stack"
              title={
                <>
                  Artículos <strong>destacados</strong>
                </>
              }
            />
            <FeaturedPosts posts={featured} />
          </div>
        </section>

        <section aria-labelledby="articulos-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
          <SectionAtmosphere tone="white" lines="tr" washBottom="mist" />

          <div className="container-page min-w-0">
            <SectionHeading
              number="02"
              label="Biblioteca"
              id="articulos-title"
              layout="stack"
              title={
                <>
                  Todos los <strong>artículos</strong>
                </>
              }
            />
            <div className="mt-8 lg:mt-10">
              <BlogList posts={posts} featuredSlugs={featured.map((post) => post.slug)} />
            </div>
          </div>
        </section>

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
