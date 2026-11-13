"use client";

import Link from "next/link";
import { WhatsappIcon } from "@/components/icons";
import { EntryThumb } from "@/components/search/SearchResultRow";
import type { SearchRow } from "@/lib/search/groups";
import { whatsappUrl } from "@/lib/site";

type SearchPreviewProps = {
  /** The active row, or the first one when nothing is active. Null when there is nothing to preview. */
  row: SearchRow | null;
  onOpen: (row: SearchRow) => void;
  onWhatsapp: () => void;
};

const linkLabel = { service: "Ver tratamiento", program: "Ver programa", post: "Leer artículo" } as const;

/** Desktop only: a large card for the active result, so the list can stay compact. */
export function SearchPreview({ row, onOpen, onWhatsapp }: SearchPreviewProps) {
  if (!row) {
    return (
      <div className="rounded-3xl bg-surface p-6">
        <p className="font-display text-xl font-bold text-heading">Elige un resultado para ver su detalle aquí.</p>
        <p className="mt-2 text-text">¿Prefieres hablar con alguien? Escríbenos y te orientamos.</p>
        <a
          href={whatsappUrl("Hola Lumayo, quisiera información sobre tratamientos.")}
          target="_blank"
          rel="noopener"
          onClick={onWhatsapp}
          className="btn btn-wa mt-5 w-full"
        >
          <WhatsappIcon />
          Consultar por WhatsApp
        </a>
      </div>
    );
  }

  const { entry } = row;
  const isPost = entry.kind === "post";
  return (
    <article className="rounded-3xl bg-bg p-5 ring-1 ring-border">
      <EntryThumb entry={entry} size="preview" />
      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-accent-text">{entry.subtitle}</p>
      <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-heading">{entry.title}</h2>
      <p className="mt-2 line-clamp-3 text-text">{entry.description}</p>
      {entry.priceLabel && <p className="mt-3 font-semibold text-aqua-700">{entry.priceLabel}</p>}
      <div className="mt-5 flex flex-col gap-3">
        <Link href={entry.href} onClick={() => onOpen(row)} className="btn btn-navy w-full">
          {linkLabel[entry.kind]}
        </Link>
        {!isPost && (
          <a
            href={whatsappUrl(`Hola Lumayo, quisiera información sobre: ${entry.title}`)}
            target="_blank"
            rel="noopener"
            onClick={onWhatsapp}
            className="btn btn-wa w-full"
          >
            <WhatsappIcon />
            Consultar por WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
