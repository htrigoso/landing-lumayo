import type {
  AboutPage,
  BlogPosting,
  BreadcrumbList,
  CollectionPage,
  ContactPage,
  Dentist,
  FAQPage,
  HowTo,
  ImageObject,
  Offer,
  Person,
  Review,
  Service,
  WebSite,
  WithContext,
} from "schema-dts";
import type { BlogPost } from "@/lib/blog/types";
import { blogCategoryPath, postPath, posts, postsInCategory, type BlogCategoryInfo } from "@/lib/blog";
import {
  categoryOf,
  categoryPath,
  lumayoCard,
  lumayoKids,
  lumayoNovias,
  programPaths,
  serviceCategories,
  servicePath,
  services,
  servicesInCategory,
  site,
  socialProof,
  siteUrl,
  type Service as SiteService,
  type ServiceCategory,
} from "@/lib/site";
import { defaultReviewerId, getTeamMember, type TeamMember } from "@/lib/team";
import type { Testimonial } from "@/lib/results";

/**
 * schema.org builders for the site. Pure functions: they read the same data the pages render, so the
 * structured data cannot drift from the visible copy. All URLs are absolute.
 */

const CONTEXT = "https://schema.org" as const;

/** The clinic is declared once (in the root layout) and referenced everywhere else by @id. */
const clinicId = `${siteUrl}/#clinic`;
const websiteId = `${siteUrl}/#website`;
const clinicRef = { "@id": clinicId } as const;
const websiteRef = { "@id": websiteId } as const;

const serviceArea = { "@type": "City", name: site.address.city } as const;

/** Absolute URL for an internal path, e.g. absoluteUrl("/servicios") → https://<domain>/servicios. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

/** Root layout: the clinic as a local business. Rendered once per page. */
export function clinicJsonLd(): WithContext<Dentist> {
  return {
    "@context": CONTEXT,
    "@type": "Dentist",
    "@id": clinicId,
    name: "Lumayo Centro Odontológico",
    url: absoluteUrl("/"),
    // TODO: add a square PNG logo (112 px or more); Google does not use SVG logos for this field.
    logo: absoluteUrl("/images/lumayo-logo.svg"),
    image: absoluteUrl("/images/hero.webp"),
    telephone: site.phoneE164,
    medicalSpecialty: "Dentistry",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.district}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.4900813,
      longitude: -76.3540512,
    },
    hasMap: site.mapsUrl,
    areaServed: serviceArea,
    knowsLanguage: "es",
    // One catalog per service category, with the same services the /servicios pages list.
    availableService: services.map((service) => ({ "@type": "Service", name: service.name })),
    hasOfferCatalog: serviceCategories.map((category) => ({
      "@type": "OfferCatalog",
      name: category.label,
      itemListElement: servicesInCategory(category).map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: absoluteUrl(servicePath(service)),
        },
      })),
    })),
    openingHoursSpecification: site.hours.shifts.map((shift) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: shift.opens,
      closes: shift.closes,
    })),
    // Only with real Google Business Profile data: both the rating and the review count must exist.
    ...(socialProof.googleRating !== undefined && socialProof.googleReviewsCount !== undefined
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: socialProof.googleRating,
            reviewCount: socialProof.googleReviewsCount,
          },
        }
      : {}),
    // TODO: add sameAs (Facebook, Instagram, TikTok) once the clinic provides the profile URLs.
    // TODO: add priceRange once the clinic confirms it.
    // availableService is not in schema-dts' Dentist type (its range is MedicalProcedure, MedicalTest or MedicalTherapy),
    // so the whole object is asserted; the names still come from the same services list.
  } as WithContext<Dentist>;
}

/** Root layout: the website entity. No SearchAction because the site has no search. */
export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": websiteId,
    name: "Lumayo",
    url: absoluteUrl("/"),
    inLanguage: "es-PE",
    publisher: clinicRef,
  } as WithContext<WebSite>;
}

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail from the same `crumbs` the visible breadcrumb renders. The last item is the current page. */
export function breadcrumbJsonLd(crumbs: readonly Crumb[]): WithContext<BreadcrumbList> {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => {
      const isLast = index === crumbs.length - 1;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        ...(!isLast && crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
      };
    }),
  };
}

/** FAQPage from the same Q&A arrays the accordion renders, so the text matches the visible copy. */
export function faqJsonLd(faqs: readonly { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

const UNSPLASH_PREFIX = "https://images.unsplash.com/";

/**
 * ImageObject for a photo shown on the page. `name` is the alt text the page renders.
 * Unsplash photos get the credit and license documented in public/images/CREDITS.md; other images get none.
 */
export function imageJsonLd({ src, name, caption }: { src: string; name: string; caption?: string }): ImageObject {
  const isUnsplash = src.startsWith(UNSPLASH_PREFIX);
  return {
    "@type": "ImageObject",
    contentUrl: absoluteUrl(src),
    name,
    ...(caption ? { caption } : {}),
    ...(isUnsplash ? { creditText: "Unsplash", license: "https://unsplash.com/license" } : {}),
  };
}

type HowToStepInput = { name: string; text: string };

/**
 * HowTo from a list of steps. Callers pass the strings or titles the page renders, so the steps match the visible copy.
 */
function howToJsonLd(name: string, steps: readonly HowToStepInput[]): WithContext<HowTo> {
  return {
    "@context": CONTEXT,
    "@type": "HowTo",
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  } as WithContext<HowTo>;
}

/** Service detail: the "Cómo funciona" steps (plain strings on the page, so each text is also the step name). */
export function serviceHowToJsonLd(service: SiteService, howItWorks: readonly string[]): WithContext<HowTo> {
  return howToJsonLd(
    `Cómo funciona: ${service.name}`,
    howItWorks.map((text) => ({ name: text, text })),
  );
}

/** Lumayo Card: the "Cómo obtener tu Lumayo Card" steps. */
export function lumayoCardHowToJsonLd(): WithContext<HowTo> {
  return howToJsonLd(
    "Cómo obtener tu Membresía Lumayo",
    lumayoCard.steps.map((step) => ({ name: step.title, text: step.description })),
  );
}

/** Lumayo Kids: the first-visit timeline the page shows as numbered steps. */
export function lumayoKidsHowToJsonLd(): WithContext<HowTo> {
  return howToJsonLd(
    lumayoKids.firstVisit.title,
    lumayoKids.firstVisit.steps.map((step) => ({ name: step.title, text: step.description })),
  );
}

/** Lumayo Novias: the "Así trabajamos" process steps. */
export function lumayoNoviasHowToJsonLd(): WithContext<HowTo> {
  return howToJsonLd(
    "Así trabajamos en Lumayo Novias",
    lumayoNovias.process.map((step) => ({ name: step.title, text: step.description })),
  );
}

type ServiceInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  category?: string;
  image?: ImageObject;
  offers?: Offer[];
};

function serviceJsonLd(input: ServiceInput): WithContext<Service> {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType,
    ...(input.category ? { category: input.category } : {}),
    ...(input.image ? { image: input.image } : {}),
    provider: clinicRef,
    areaServed: serviceArea,
    ...(input.offers ? { offers: input.offers } : {}),
  } as WithContext<Service>;
}

/** Detail page of a single service (the category and service come from src/lib/site.ts). */
export function serviceDetailJsonLd(service: SiteService): WithContext<Service> {
  // Offer only for the clinic's own confirmed price. Market reference ranges never become an Offer.
  const priceFrom = service.ortho?.priceFrom;
  const offers: Offer[] | undefined =
    priceFrom === undefined
      ? undefined
      : [{ "@type": "Offer", name: service.name, price: priceFrom, priceCurrency: "PEN", url: absoluteUrl(servicePath(service)) }];

  return serviceJsonLd({
    name: service.name,
    description: service.details.summary,
    path: servicePath(service),
    serviceType: service.name,
    category: categoryOf(service).label,
    image: imageJsonLd({ src: service.image, name: service.name }),
    offers,
  });
}

/** Lumayo Card: one Service with a PEN Offer per plan (annual fee). */
export function lumayoCardJsonLd(): WithContext<Service> {
  const offers: Offer[] = Object.values(lumayoCard.plans).map((plan) => ({
    "@type": "Offer",
    name: `Membresía Lumayo ${plan.label}`,
    description: "Cuota anual de afiliación",
    price: plan.annualFeeAmount,
    priceCurrency: "PEN",
    url: absoluteUrl(programPaths.card),
  }));

  return serviceJsonLd({
    name: "Membresía Lumayo",
    description: lumayoCard.description,
    path: programPaths.card,
    serviceType: "Protección odontológica",
    offers,
  });
}

/** Lumayo Kids program page. */
export function lumayoKidsJsonLd(): WithContext<Service> {
  return serviceJsonLd({
    name: "Lumayo Kids",
    description: lumayoKids.subheadline,
    path: programPaths.kids,
    serviceType: "Odontopediatría",
  });
}

/** Lumayo Novias program page. */
export function lumayoNoviasJsonLd(): WithContext<Service> {
  return serviceJsonLd({
    name: "Lumayo Novias",
    description: lumayoNovias.subheadline,
    path: programPaths.novias,
    serviceType: "Plan de sonrisa para bodas",
  });
}

type CollectionInput = {
  name: string;
  path: string;
  items: { name: string; path: string }[];
};

/** Listing page (services or blog, whole list or one category) with an ItemList of its entries. */
function collectionJsonLd({ name, path, items }: CollectionInput): WithContext<CollectionPage> {
  return {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    name,
    url: absoluteUrl(path),
    isPartOf: websiteRef,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  } as WithContext<CollectionPage>;
}

/** /servicios. */
export function servicesIndexJsonLd(): WithContext<CollectionPage> {
  return collectionJsonLd({
    name: "Servicios",
    path: "/servicios",
    items: services.map((service) => ({ name: service.name, path: servicePath(service) })),
  });
}

/** /servicios/<categoria>. */
export function serviceCategoryJsonLd(category: ServiceCategory): WithContext<CollectionPage> {
  return collectionJsonLd({
    name: category.seo.h1,
    path: categoryPath(category),
    items: servicesInCategory(category).map((service) => ({ name: service.name, path: servicePath(service) })),
  });
}

/** /blog. */
export function blogIndexJsonLd(): WithContext<CollectionPage> {
  return collectionJsonLd({
    name: "Blog",
    path: "/blog",
    items: posts.map((post) => ({ name: post.title, path: postPath(post) })),
  });
}

/** /blog/<categoria>. */
export function blogCategoryJsonLd(category: BlogCategoryInfo): WithContext<CollectionPage> {
  return collectionJsonLd({
    name: category.seo.h1,
    path: blogCategoryPath(category),
    items: postsInCategory(category).map((post) => ({ name: post.title, path: postPath(post) })),
  });
}

/** /blog/<categoria>/<slug>. The image is the cover photo the page shows (the post's cover service photo). */
export function blogPostJsonLd(post: BlogPost): WithContext<BlogPosting> {
  const url = absoluteUrl(postPath(post));
  const cover = services.find((service) => service.id === post.coverServiceId);
  const reviewer = getTeamMember(post.reviewer ?? defaultReviewerId);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    inLanguage: "es-PE",
    ...(cover ? { image: imageJsonLd({ src: cover.image, name: cover.name }) } : {}),
    citation: post.sources.map((source) => ({
      "@type": "CreativeWork",
      name: source.label,
      url: source.url,
    })),
    about: { "@type": "Thing", name: post.category },
    // Author is the reviewing dentist when one is set; otherwise the clinic.
    author: reviewer ? memberPerson(reviewer) : clinicRef,
    ...(reviewer ? { reviewedBy: memberPerson(reviewer) } : {}),
    publisher: clinicRef,
  } as WithContext<BlogPosting>;
}

/** A step of the care process shown on /nosotros: the photo, its title and its text. */
export type ProcessPhoto = { src: string; title: string; text: string };

/**
 * /nosotros. `processPhotos` are the care-process cards the page renders; each photo is an ImageObject whose
 * name and caption are the card's visible title and text. They are not Unsplash, so they carry no credit.
 */
export function aboutPageJsonLd(processPhotos: readonly ProcessPhoto[]): WithContext<AboutPage> {
  return {
    "@context": CONTEXT,
    "@type": "AboutPage",
    name: "Nosotros",
    url: absoluteUrl("/nosotros"),
    isPartOf: websiteRef,
    about: clinicRef,
    image: processPhotos.map((photo) => imageJsonLd({ src: photo.src, name: photo.title, caption: photo.text })),
  } as WithContext<AboutPage>;
}

/** Person without @context, for nesting (author, reviewedBy). Specialty is the jobTitle; COP goes in identifier. */
function memberPerson(member: TeamMember): Record<string, unknown> {
  return {
    "@type": "Person",
    name: member.name,
    jobTitle: member.specialty ?? member.role,
    ...(member.photo ? { image: absoluteUrl(member.photo) } : {}),
    worksFor: clinicRef,
    ...(member.cop ? { identifier: `COP ${member.cop}` } : {}),
  };
}

/**
 * Person for one member of the team. Only rendered when src/lib/team.ts has entries (the page maps over the list).
 */
export function personJsonLd(member: TeamMember): WithContext<Person> {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    ...memberPerson(member),
  } as WithContext<Person>;
}

/**
 * Review of the clinic from one real testimonial. `reviewRating` is set only when the patient gave a rating.
 * Only rendered for entries in `testimonials` (never the development samples).
 */
export function reviewJsonLd(testimonial: Testimonial): WithContext<Review> {
  return {
    "@context": CONTEXT,
    "@type": "Review",
    itemReviewed: clinicRef,
    author: { "@type": "Person", name: testimonial.name },
    reviewBody: testimonial.quote,
    ...(testimonial.rating
      ? { reviewRating: { "@type": "Rating", ratingValue: testimonial.rating, bestRating: 5, worstRating: 1 } }
      : {}),
  } as WithContext<Review>;
}

/** /contacto. */
export function contactPageJsonLd(): WithContext<ContactPage> {
  return {
    "@context": CONTEXT,
    "@type": "ContactPage",
    name: "Contacto",
    url: absoluteUrl("/contacto"),
    isPartOf: websiteRef,
    about: clinicRef,
  } as WithContext<ContactPage>;
}
