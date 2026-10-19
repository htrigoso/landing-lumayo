import type { BlogCategory } from "@/lib/blog/types";

export type BlogCategoryInfo = {
  /** Display label; matches `BlogPost.category`. */
  label: BlogCategory;
  /** URL segment: /blog/<slug>. */
  slug: string;
  seo: {
    title: string;
    description: string;
    h1: string;
    intro: string;
  };
};

// TODO(SEO): confirm title/description/intro
export const blogCategories: BlogCategoryInfo[] = [
  {
    label: "Prevención",
    slug: "prevencion",
    seo: {
      title: "Prevención dental",
      description: "Consejos para cuidar tus dientes y encías antes de que aparezcan los problemas en Tarapoto.",
      h1: "Prevención dental",
      intro: "Hábitos y revisiones sencillas para mantener tu boca sana durante todo el año.",
    },
  },
  {
    label: "Niños",
    slug: "ninos",
    seo: {
      title: "Salud dental infantil",
      description: "Artículos para padres sobre la salud dental de bebés, niños y adolescentes en Tarapoto.",
      h1: "Salud dental infantil",
      intro: "Guías para acompañar la primera visita y los cuidados diarios de tus hijos.",
    },
  },
  {
    label: "Estética",
    slug: "estetica",
    seo: {
      title: "Estética dental",
      description: "Información sobre carillas, diseño de sonrisa y otros tratamientos estéticos dentales en Tarapoto.",
      h1: "Estética dental",
      intro: "Opciones para mejorar tu sonrisa y qué esperar de cada una.",
    },
  },
  {
    label: "Ortodoncia",
    slug: "ortodoncia",
    seo: {
      title: "Ortodoncia",
      description: "Artículos sobre brackets, edad para iniciar tratamiento y cuidados durante la ortodoncia en Tarapoto.",
      h1: "Ortodoncia",
      intro: "Respuestas claras sobre tratamientos de brackets y su cuidado diario.",
    },
  },
  {
    label: "Urgencias",
    slug: "urgencias",
    seo: {
      title: "Urgencias dentales",
      description: "Qué hacer ante un dolor de muela, una fractura o una inflamación dental mientras llegas a consulta en Tarapoto.",
      h1: "Urgencias dentales",
      intro: "Pasos prácticos para aliviar una molestia dental urgente y saber cuándo acudir al dentista.",
    },
  },
  {
    label: "Tratamientos",
    slug: "tratamientos",
    seo: {
      title: "Tratamientos dentales",
      description: "Explicamos en qué consisten los tratamientos dentales, para qué sirven y qué esperar en Tarapoto.",
      h1: "Tratamientos dentales",
      intro: "Cómo funciona cada tratamiento, cuándo se recomienda y qué pasos incluye.",
    },
  },
  {
    label: "Consejos",
    slug: "consejos",
    seo: {
      title: "Consejos de salud dental",
      description: "Consejos prácticos de salud dental para pacientes de Lumayo en Tarapoto.",
      h1: "Consejos de salud dental",
      intro: "Recomendaciones cotidianas para cuidar tu sonrisa con información clara.",
    },
  },
];

export function getBlogCategoryBySlug(slug: string): BlogCategoryInfo | undefined {
  return blogCategories.find((category) => category.slug === slug);
}
