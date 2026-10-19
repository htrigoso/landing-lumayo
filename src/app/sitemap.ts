import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { categoryPath, serviceCategories, services, servicePath, siteUrl } from "@/lib/site";

const lumayoPrograms = ["/servicios/lumayo-card", "/servicios/lumayo-kids", "/servicios/lumayo-novias"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/servicios", "/nosotros", "/contacto", "/blog", ...lumayoPrograms];

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}` })),
    ...serviceCategories.map((c) => ({ url: `${siteUrl}${categoryPath(c)}` })),
    ...services.map((s) => ({ url: `${siteUrl}${servicePath(s)}` })),
    ...posts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.updatedAt })),
  ];
}
