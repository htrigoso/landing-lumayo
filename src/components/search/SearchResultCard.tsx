"use client";

import Image from "next/image";
import Link from "next/link";
import type { SearchEntry } from "@/lib/search/types";

const CARD_SIZES = "(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw";

type SearchResultCardProps = {
  entry: SearchEntry;
  onSelect: (entry: SearchEntry) => void;
};

/** A whole-card link to a service or program. Programs have no photo, so they get a solid panel with their name. */
export function SearchResultCard({ entry, onSelect }: SearchResultCardProps) {
  return (
    <Link
      href={entry.href}
      onClick={() => onSelect(entry)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-bg ring-1 ring-border transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        {entry.image ? (
          <Image
            src={entry.image}
            alt=""
            fill
            sizes={CARD_SIZES}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="grid h-full place-items-center bg-primary p-6 text-center font-display text-xl font-bold text-text-inverse">
            {entry.title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-text">{entry.subtitle}</p>
        <h3 className="font-display text-lg font-bold leading-tight text-heading">{entry.title}</h3>
        {entry.priceLabel && <p className="mt-auto pt-2 text-sm font-semibold text-primary">{entry.priceLabel}</p>}
      </div>
    </Link>
  );
}
