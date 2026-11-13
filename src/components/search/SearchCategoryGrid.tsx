"use client";

import Link from "next/link";
import { serviceIcons } from "@/components/icons";
import { categoryPath, serviceCategories, servicesInCategory } from "@/lib/site";

/** The seven service categories as tiles. The icon is the category's first service icon, as in the mega menu. */
export function SearchCategoryGrid({ onSelect }: { onSelect: (categoryId: string) => void }) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {serviceCategories.map((category) => {
        const lead = servicesInCategory(category)[0];
        const Icon = lead ? serviceIcons[lead.icon] : undefined;
        return (
          <li key={category.id}>
            <Link
              href={categoryPath(category)}
              onClick={() => onSelect(category.id)}
              className="flex min-h-16 items-center gap-3 rounded-2xl bg-bg p-3 ring-1 ring-border transition hover:bg-surface-soft"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-primary">
                {Icon && <Icon className="size-5" />}
              </span>
              <span className="min-w-0 font-semibold leading-snug text-heading">{category.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
