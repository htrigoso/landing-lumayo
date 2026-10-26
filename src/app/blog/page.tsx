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
import { JsonLd } from "@/components/seo/JsonLd";
import { posts } from "@/lib/blog";
import { blogIndexJsonLd } from "@/lib/seo/jsonld";
import { pageSocial } from "@/lib/seo/metadata";
import { services } from "@/lib/site";

const title = "Blog · Lumayo Centro Odontológico";
const description = "Artículos sobre salud dental, prevención, estética y tratamientos, escritos para pacientes en Tarapoto.";

// Cover of the newest post, the same photo its featured card shows first.
const firstPost = posts[0];
const cover = firstPost && services.find((s) => s.id === firstPost.coverServiceId)?.image;

export const metadata: Metadata = {
  title,
  description,
  ...pageSocial({
    title,
    description,
    path: "/blog",
    image: cover ? { url: cover, alt: firstPost.title } : undefined,
  }),
};

export default function BlogPage() {
  const featured = posts.slice(0, 3);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-text-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <JsonLd data={blogIndexJsonLd()} />
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
