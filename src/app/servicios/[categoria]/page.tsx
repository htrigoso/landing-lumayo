import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { OrthoComparison } from "@/components/services/OrthoComparison";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { serviceCategoryJsonLd } from "@/lib/seo/jsonld";
import { pageSocial } from "@/lib/seo/metadata";
import { categoryPath, getCategoryBySlug, serviceCategories, servicesInCategory } from "@/lib/site";

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
  // Cover: the category's featured service photo, falling back to its first service.
  const inCategory = servicesInCategory(category);
  const cover = inCategory.find((s) => s.featured) ?? inCategory[0];
  return {
    title,
    description: category.seo.description,
    alternates: { canonical: path },
    ...pageSocial({
      title,
      description: category.seo.description,
      path,
      image: cover ? { url: cover.image, alt: category.label } : undefined,
    }),
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
        afterGrid={category.id === "ortodoncia" ? <OrthoComparison /> : undefined}
      />
    </>
  );
}
