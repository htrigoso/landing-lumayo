import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { BlogList } from "@/components/blog/BlogList";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogCategories, blogCategoryPath, getBlogCategoryBySlug, posts, postsInCategory } from "@/lib/blog";
import { blogCategoryJsonLd } from "@/lib/seo/jsonld";
import { pageSocial } from "@/lib/seo/metadata";
import { services } from "@/lib/site";

type PageProps = { params: Promise<{ categoria: string }> };

// Blocking route: unknown slugs must answer 404, which streaming cannot do after the shell is sent.
export const instant = false;

/** Pre-renders one page per category that has at least one article; `dynamicParams` is unavailable with cacheComponents. */
export function generateStaticParams() {
  return blogCategories
    .filter((category) => postsInCategory(category).length > 0)
    .map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const category = getBlogCategoryBySlug(categoria);
  if (!category) {
    return { title: "Categoría no encontrada · Lumayo Centro Odontológico" };
  }
  const path = blogCategoryPath(category);
  const title = `${category.seo.title} · Lumayo Centro Odontológico`;
  // Cover of the category's newest post, the same photo its card shows first.
  const firstPost = postsInCategory(category)[0];
  const cover = firstPost && services.find((s) => s.id === firstPost.coverServiceId)?.image;
  return {
    title,
    description: category.seo.description,
    alternates: { canonical: path },
    ...pageSocial({
      title,
      description: category.seo.description,
      path,
      image: cover ? { url: cover, alt: category.label } : undefined,
    }),
  };
}

export default function BlogCategoryPage({ params }: PageProps) {
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
        <CategoryContent params={params} />

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

async function CategoryContent({ params }: PageProps) {
  const { categoria } = await params;
  const category = getBlogCategoryBySlug(categoria);
  if (!category) notFound();

  return (
    <>
      <JsonLd data={blogCategoryJsonLd(category)} />
      <PageHeader
        title={category.seo.h1}
        emphasis=""
        description={category.seo.intro}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.label }]}
      />

      <section aria-labelledby="articulos-title" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <SectionAtmosphere tone="white" lines="tr" washBottom="mist" />

        <div className="container-page min-w-0">
          <h2 id="articulos-title" className="sr-only">
            Artículos de {category.label}
          </h2>
          <BlogList posts={posts} featuredSlugs={[]} activeCategory={category} />
        </div>
      </section>
    </>
  );
}
