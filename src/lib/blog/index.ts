import { post as primeraVisitaDentistaNinos } from "@/lib/blog/posts/primera-visita-dentista-ninos";
import { post as sellantesYFluorPrevenirCaries } from "@/lib/blog/posts/sellantes-y-fluor-prevenir-caries";
import { post as primeraConsultaDentalQueEsperar } from "@/lib/blog/posts/primera-consulta-dental-que-esperar";
import { post as ortodonciaBracketsEdadYCuidados } from "@/lib/blog/posts/ortodoncia-brackets-edad-y-cuidados";
import { post as tiposDeCarillasDentales } from "@/lib/blog/posts/tipos-de-carillas-dentales";
import { post as sonrisaPerfectaParaTuBoda } from "@/lib/blog/posts/sonrisa-perfecta-para-tu-boda";
import { post as dolorDeMuelaQueHacer } from "@/lib/blog/posts/dolor-de-muela-que-hacer";
import { post as endodonciaDuele } from "@/lib/blog/posts/endodoncia-duele";
import { post as muelasDelJuicioCuandoExtraer } from "@/lib/blog/posts/muelas-del-juicio-cuando-extraer";
import { post as implantesOProtesisRemovible } from "@/lib/blog/posts/implantes-o-protesis-removible";
import { post as enciasQueSangranGingivitis } from "@/lib/blog/posts/encias-que-sangran-gingivitis";
import { post as sensibilidadDentalCausasYQueHacer } from "@/lib/blog/posts/sensibilidad-dental-causas-y-que-hacer";
import { blogCategories, type BlogCategoryInfo } from "@/lib/blog/categories";
import type { BlogPost } from "@/lib/blog/types";

export { blogCategories, getBlogCategoryBySlug, type BlogCategoryInfo } from "@/lib/blog/categories";

const allPosts: BlogPost[] = [
  primeraVisitaDentistaNinos,
  sellantesYFluorPrevenirCaries,
  primeraConsultaDentalQueEsperar,
  ortodonciaBracketsEdadYCuidados,
  tiposDeCarillasDentales,
  sonrisaPerfectaParaTuBoda,
  dolorDeMuelaQueHacer,
  endodonciaDuele,
  muelasDelJuicioCuandoExtraer,
  implantesOProtesisRemovible,
  enciasQueSangranGingivitis,
  sensibilidadDentalCausasYQueHacer,
];

/** Newest first; posts published the same day are ordered by title. */
export const posts: BlogPost[] = [...allPosts].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title, "es"),
);

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}

/** Same-category posts first, then the most recent others. Never includes the current post. */
export function getRelatedPosts(slug: string, count: number): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = posts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const otherCategories = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...otherCategories].slice(0, count);
}

/** Single source of truth for blog URLs. Use these helpers instead of building paths by hand. */
export function blogCategoryOf(post: BlogPost): BlogCategoryInfo {
  const category = blogCategories.find((c) => c.label === post.category);
  if (!category) throw new Error(`Unknown blog category: ${post.category}`);
  return category;
}

export const blogCategoryPath = (category: BlogCategoryInfo) => `/blog/${category.slug}`;

export const postPath = (post: BlogPost) => `/blog/${blogCategoryOf(post).slug}/${post.slug}`;

/** Posts in a category, newest first (same order as `posts`). */
export function postsInCategory(category: BlogCategoryInfo): BlogPost[] {
  return posts.filter((post) => post.category === category.label);
}
