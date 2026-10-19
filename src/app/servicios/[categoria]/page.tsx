import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { serviceCategoryJsonLd } from "@/lib/seo/jsonld";
import { categoryPath, getCategoryBySlug, serviceCategories } from "@/lib/site";

type PageProps = { params: Promise<{ categoria: string }> };

// Blocking route: unknown slugs must answer 404, which streaming cannot do after the shell is sent.
export const instant = false;

/** Pre-renders one page per category; `dynamicParams` is unavailable with cacheComponents. */
export function generateStaticParams() {
  return serviceCategories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) {
    return { title: "Categoría no encontrada · Lumayo Centro Odontológico" };
  }
  const path = categoryPath(category);
  const title = `${category.seo.title} · Lumayo Centro Odontológico`;
  return {
    title,
    description: category.seo.description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description: category.seo.description, url: path },
  };
}

export default function ServiceCategoryPage({ params }: PageProps) {
  return <CategoryContent params={params} />;
}

async function CategoryContent({ params }: PageProps) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  return (
    <>
      <JsonLd data={serviceCategoryJsonLd(category)} />
      <ServicesPageView
        title={category.seo.h1}
        emphasis=""
        description={category.seo.intro}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: category.label }]}
        activeCategory={category.id}
      />
    </>
  );
}
