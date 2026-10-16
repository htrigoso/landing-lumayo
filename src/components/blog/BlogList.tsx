"use client";

import { useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { blogCategories } from "@/lib/blog";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";

type Filter = BlogCategory | "todos";

/**
 * Keeps the chosen chip visible in the sideways-scrolling filter row on phones. It scrolls only
 * that row, and only when it actually overflows, so the page itself never shifts sideways.
 */
function centerChip(chip: HTMLElement, behavior: ScrollBehavior) {
  const row = chip.closest<HTMLElement>("[data-chip-row]");
  if (!row || row.scrollWidth <= row.clientWidth) return;
  const offset = chip.getBoundingClientRect().left - row.getBoundingClientRect().left;
  row.scrollTo({ left: row.scrollLeft + offset - (row.clientWidth - chip.offsetWidth) / 2, behavior });
}

/**
 * Category filter and grid of article cards. Posts shown in the featured grid are left out of
 * "Todos" but still appear under their category. Only categories that have posts get a chip.
 */
export function BlogList({ posts, featuredSlugs }: { posts: BlogPost[]; featuredSlugs: string[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const featured = new Set(featuredSlugs);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "todos", label: "Todos", count: posts.filter((post) => !featured.has(post.slug)).length },
    ...blogCategories.flatMap((category) => {
      const count = posts.filter((post) => post.category === category).length;
      return count > 0 ? [{ id: category, label: category, count }] : [];
    }),
  ];

  const visible =
    filter === "todos" ? posts.filter((post) => !featured.has(post.slug)) : posts.filter((post) => post.category === filter);
  const countLabel = visible.length === 1 ? "1 artículo" : `${visible.length} artículos`;

  return (
    <div>
      {/* Category filters: scroll sideways on small screens */}
      <div data-chip-row className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="group" aria-label="Filtrar artículos por categoría" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={(e) => {
                  setFilter(f.id);
                  centerChip(e.currentTarget, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
                }}
                className={`flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                  active ? "border-navy-700 bg-navy-700 text-white" : "border-sky-200 bg-white text-navy-700 hover:border-cyan-500"
                }`}
              >
                {f.label}
                <span className={`text-xs tabular-nums ${active ? "text-sky-100/80" : "text-ink-400"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>
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
