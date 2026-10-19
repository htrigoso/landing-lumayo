import type { MetadataRoute } from "next";
import { blogCategories, blogCategoryPath, postPath, posts } from "@/lib/blog";
import { categoryPath, serviceCategories, services, servicePath, siteUrl } from "@/lib/site";

const lumayoPrograms = ["/servicios/lumayo-card", "/servicios/lumayo-kids", "/servicios/lumayo-novias"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/servicios", "/nosotros", "/contacto", "/blog", ...lumayoPrograms];

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}` })),
    ...serviceCategories.map((c) => ({ url: `${siteUrl}${categoryPath(c)}` })),
    ...services.map((s) => ({ url: `${siteUrl}${servicePath(s)}` })),
    ...blogCategories.map((c) => ({ url: `${siteUrl}${blogCategoryPath(c)}` })),
    ...posts.map((post) => ({ url: `${siteUrl}${postPath(post)}`, lastModified: post.updatedAt })),
  ];
}
