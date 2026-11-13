import { posts, postPath } from "@/lib/blog";
import { clinicPricesFor, formatAmount } from "@/lib/clinic-prices";
import { categoryOf, lumayoCard, lumayoKids, lumayoNovias, programPaths, services, servicePath, type Service } from "@/lib/site";
import type { SearchEntry, SearchIndex } from "./types";

/**
 * Builds the search index from the site's data. Runs on the server only: the static route at
 * /search-index.json serializes it at build time. Posts contribute their title, excerpt and category
 * only, never their article bodies.
 */

/** Lowest confirmed price as shown on the card. Free items read "Consulta gratis". */
function priceLabelFor(serviceId: string): string | undefined {
  const items = clinicPricesFor(serviceId);
  if (!items || items.length === 0) return undefined;
  const lowest = Math.min(...items.map((item) => ("price" in item ? item.price : item.minPrice)));
  return lowest === 0 ? "Consulta gratis" : `Desde S/ ${formatAmount(lowest)}`;
}

function serviceEntry(service: Service): SearchEntry {
  const category = categoryOf(service);
  return {
    id: service.id,
    kind: "service",
    title: service.name,
    subtitle: category.label,
    description: service.description,
    href: servicePath(service),
    image: service.image,
    priceLabel: priceLabelFor(service.id),
    categoryId: service.category,
    featured: service.featured ?? false,
    keywords: [service.seo?.keyword, category.label].filter((keyword): keyword is string => Boolean(keyword)),
  };
}

const programEntries: SearchEntry[] = [
  {
    id: "program-membresia",
    kind: "program",
    title: lumayoCard.title,
    subtitle: "Programa",
    description: lumayoCard.description,
    href: programPaths.card,
    keywords: ["membresia", "descuento", "descuentos", "tarjeta", "afiliacion"],
  },
  {
    id: "program-kids",
    kind: "program",
    title: "Lumayo Kids",
    subtitle: "Programa",
    description: lumayoKids.subheadline,
    href: programPaths.kids,
    keywords: ["ninos", "bebes", "hijos", "infantil", "odontopediatria"],
  },
  {
    id: "program-novias",
    kind: "program",
    title: "Lumayo Novias",
    subtitle: "Programa",
    description: lumayoNovias.subheadline,
    href: programPaths.novias,
    keywords: ["boda", "novia", "novio", "matrimonio"],
  },
];

function postEntry(post: (typeof posts)[number]): SearchEntry {
  return {
    id: `post-${post.slug}`,
    kind: "post",
    title: post.title,
    subtitle: post.category,
    description: post.excerpt,
    href: postPath(post),
    keywords: [],
  };
}

export function buildSearchIndex(): SearchIndex {
  return {
    entries: [...services.map(serviceEntry), ...programEntries, ...posts.map(postEntry)],
  };
}
