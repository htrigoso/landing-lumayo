"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowRightIcon, ChildIcon, HeartIcon, SparkleIcon } from "@/components/icons";
import { highlight } from "@/lib/search/highlight";
import type { SearchEntry } from "@/lib/search/types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Programs have no photo: each gets a brand tile with its own icon. */
const programIcons: Record<string, IconComponent> = {
  "program-membresia": SparkleIcon,
  "program-kids": ChildIcon,
  "program-novias": HeartIcon,
};

type SearchResultRowProps = {
  id: string;
  entry: SearchEntry;
  /** The applied query, used to bold the matched part of the title. Empty for curated lists. */
  query: string;
  active: boolean;
  onHover: () => void;
  onOpen: () => void;
};

/** Thumbnail for a row or the preview: the photo when there is one, otherwise a brand tile. */
export function EntryThumb({ entry, size }: { entry: SearchEntry; size: "row" | "preview" }) {
  const isRow = size === "row";
  if (entry.image) {
    return (
      <span className={`relative shrink-0 overflow-hidden bg-surface-soft ${isRow ? "size-14 rounded-xl" : "block aspect-[4/3] w-full rounded-2xl"}`}>
        <Image
          src={entry.image}
          alt=""
          fill
          sizes={isRow ? "56px" : "(min-width: 1024px) 24rem, 100vw"}
          className="object-cover"
        />
      </span>
    );
  }
  const Icon = programIcons[entry.id];
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center bg-primary font-display font-bold text-text-inverse ${
        isRow ? "size-14 rounded-xl text-xl" : "aspect-[4/3] w-full rounded-2xl text-4xl"
      }`}
    >
      {Icon ? <Icon className={isRow ? "size-6" : "size-12"} /> : entry.title.charAt(0)}
    </span>
  );
}

/** One result as a compact, full-width link: thumbnail, highlighted title, meta line and chevron. */
export function SearchResultRow({ id, entry, query, active, onHover, onOpen }: SearchResultRowProps) {
  return (
    <Link
      id={id}
      href={entry.href}
      role="option"
      aria-selected={active}
      tabIndex={-1}
      onClick={onOpen}
      onMouseEnter={onHover}
      className={`flex min-h-16 items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-surface-soft ${
        active ? "bg-surface-soft" : ""
      }`}
    >
      <EntryThumb entry={entry} size="row" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-base leading-snug text-heading">
          {highlight(entry.title, query).map((segment, index) =>
            segment.match ? (
              <mark key={index} className="bg-transparent font-bold text-primary">
                {segment.text}
              </mark>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </span>
        <span className="mt-0.5 block truncate text-sm text-text-muted">
          {entry.subtitle}
          {entry.subtitle && entry.priceLabel && " · "}
          {entry.priceLabel && <span className="font-semibold text-aqua-700">{entry.priceLabel}</span>}
        </span>
      </span>
      <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0 text-accent-text" />
    </Link>
  );
}
