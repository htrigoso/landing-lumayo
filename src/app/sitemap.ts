import type { MetadataRoute } from "next";
import { blogCategories, blogCategoryPath, postPath, posts } from "@/lib/blog";
import { categoryPath, programPaths, serviceCategories, services, servicePath, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/servicios",
    "/nosotros",
    "/contacto",
    "/blog",
    ...Object.values(programPaths),
  ];

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}` })),
    ...serviceCategories.map((c) => ({ url: `${siteUrl}${categoryPath(c)}` })),
    ...services.map((s) => ({ url: `${siteUrl}${servicePath(s)}` })),
    ...blogCategories.map((c) => ({ url: `${siteUrl}${blogCategoryPath(c)}` })),
    ...posts.map((post) => ({ url: `${siteUrl}${postPath(post)}`, lastModified: post.updatedAt })),
  ];
}
