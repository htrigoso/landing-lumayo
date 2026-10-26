import type { Metadata } from "next";

const fallbackImage = { url: "/images/hero.webp", width: 980, height: 580 };

/** Open Graph image: the page's own photo, or the home hero when the page has none. */
export type SocialImage = { url: string; alt: string };

type PageSocialInput = {
  title: string;
  description: string;
  /** Route of the page, e.g. "/membresia". Resolved against metadataBase. */
  path: string;
  image?: SocialImage;
  type?: "website" | "article";
  /** Article-only fields, forwarded to Open Graph. */
  article?: { published?: string; modified?: string; section?: string };
};

/**
 * Builds the Open Graph and Twitter fields for one page. Next.js replaces the whole openGraph
 * object per page, so every page must pass its own title, description, url and image here.
 */
export function pageSocial({ title, description, path, image, type = "website", article }: PageSocialInput): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [
    image
      ? { url: image.url, width: 1200, height: 900, alt: image.alt }
      : { ...fallbackImage, alt: "Lumayo Centro Odontológico en Tarapoto" },
  ];

  return {
    openGraph: {
      type,
      url: path,
      siteName: "Lumayo Centro Odontológico",
      locale: "es_PE",
      title,
      description,
      images,
      ...(type === "article" && article
        ? {
            publishedTime: article.published,
            modifiedTime: article.modified,
            section: article.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}
