"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { blogCategories, blogCategoryPath, postsInCategory, type BlogCategoryInfo } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog/types";

/**
 * Keeps the active chip visible in the sideways-scrolling filter row on phones. It scrolls only
 * that row, and only when it actually overflows, so the page itself never shifts sideways.
 */
function centerChip(chip: HTMLElement, behavior: ScrollBehavior) {
  const row = chip.closest<HTMLElement>("[data-chip-row]");
  if (!row || row.scrollWidth <= row.clientWidth) return;
  const offset = chip.getBoundingClientRect().left - row.getBoundingClientRect().left;
  row.scrollTo({ left: row.scrollLeft + offset - (row.clientWidth - chip.offsetWidth) / 2, behavior });
}

/**
 * Category links and grid of article cards. `activeCategory` picks the category page's list; without
 * it (/blog) the list is "Todos", which leaves out the featured posts but they still appear under their
 * category. Only categories that have posts get a chip.
 */
export function BlogList({
  posts,
  featuredSlugs,
  activeCategory,
}: {
  posts: BlogPost[];
  featuredSlugs: string[];
  activeCategory?: BlogCategoryInfo;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const featured = new Set(featuredSlugs);
  const everyday = posts.filter((post) => !featured.has(post.slug));

  const filters: { key: string; label: string; count: number; href: string; active: boolean }[] = [
    {
      key: "todos",
      label: "Todos",
      count: everyday.length,
      href: "/blog",
      active: !activeCategory,
    },
    ...blogCategories.flatMap((category) => {
      const count = posts.filter((post) => post.category === category.label).length;
      return count > 0
        ? [
            {
              key: category.slug,
              label: category.label,
              count,
              href: blogCategoryPath(category),
              active: activeCategory?.slug === category.slug,
            },
          ]
        : [];
    }),
  ];

  const visible = activeCategory ? postsInCategory(activeCategory) : everyday;
  const countLabel = visible.length === 1 ? "1 artículo" : `${visible.length} artículos`;

  useEffect(() => {
    const active = rowRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (active) centerChip(active, "auto");
  }, []);

  return (
    <div>
      {/* Category links: scroll sideways on small screens */}
      <div ref={rowRef} data-chip-row className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <nav aria-label="Filtrar artículos por categoría" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={f.href}
              aria-current={f.active ? "page" : undefined}
              className={`flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                f.active ? "border-primary bg-primary text-text-inverse" : "border-border bg-white text-primary hover:border-accent-strong"
              }`}
            >
              {f.label}
              <span className={`text-xs tabular-nums ${f.active ? "text-text-inverse-muted" : "text-text-muted"}`}>{f.count}</span>
            </Link>
          ))}
        </nav>
      </div>

      <p className="sr-only" aria-live="polite">
        {countLabel}
      </p>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
