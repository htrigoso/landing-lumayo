"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SearchIcon, WhatsappIcon, ArrowRightIcon } from "@/components/icons";
import { pushSearchEvent } from "@/components/search/analytics";
import { getCachedSearchEntries, loadSearchEntries } from "@/components/search/search-index-client";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { normalize } from "@/lib/search/normalize";
import { search, similar, suggest } from "@/lib/search/search";
import { popularSearches } from "@/lib/search/synonyms";
import type { SearchEntry } from "@/lib/search/types";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/site";

export type SearchPanelProps = {
  /** Must be a stable callback: the panel's setup effect depends on it. */
  onClose: () => void;
  /** Focused when the panel closes, normally the element that opened it. */
  returnFocusTo: RefObject<HTMLElement | null>;
};

const DEBOUNCE_MS = 150;
/** A search counts once the visitor pauses this long, so partial words are not sent. */
const SEARCH_EVENT_DELAY_MS = 1000;
const ease = [0.22, 1, 0.36, 1] as const;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function resultsLabel(count: number): string {
  return `${count} ${count === 1 ? "resultado" : "resultados"}`;
}

/** Full-screen search over the prebuilt index. Mounted only after the visitor opens it. */
export function SearchPanel({ onClose, returnFocusTo }: SearchPanelProps) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const openedPath = useRef(pathname);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Set when a result is opened, so focus does not jump back to the trigger during navigation.
  const navigatingRef = useRef(false);
  const sentTerms = useRef(new Set<string>());

  const [query, setQuery] = useState("");
  // The query applied to results, lagging behind typing by DEBOUNCE_MS.
  const [term, setTerm] = useState("");
  const [entries, setEntries] = useState<SearchEntry[] | null>(() => getCachedSearchEntries());
  const [loadFailed, setLoadFailed] = useState(false);

  const trimmed = query.trim();
  const appliedTerm = term.trim();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Lock the page scroll, handle Escape and keep Tab inside the dialog. Restore focus on close.
  useEffect(() => {
    // The opener is recorded before the panel mounts, so reading it now is the value to restore.
    const opener = returnFocusTo.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const outside = !active || !dialogRef.current.contains(active);
      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      if (!navigatingRef.current) opener?.focus();
    };
  }, [onClose, returnFocusTo]);

  // Browser back or forward while open: close instead of leaving the panel over the wrong page.
  useEffect(() => {
    if (pathname !== openedPath.current) onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const timer = window.setTimeout(() => setTerm(query), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    let active = true;
    loadSearchEntries()
      .then((loaded) => {
        if (active) setEntries(loaded);
      })
      .catch(() => {
        if (active) setLoadFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  // "search" and "search_no_results" fire once per distinct term, after the visitor pauses typing.
  useEffect(() => {
    const key = normalize(query);
    if (!key || !entries) return;
    const timer = window.setTimeout(() => {
      if (sentTerms.current.has(key)) return;
      sentTerms.current.add(key);
      const searchTerm = query.trim();
      pushSearchEvent({ event: "search", search_term: searchTerm });
      if (search(entries, searchTerm).length === 0) {
        pushSearchEvent({ event: "search_no_results", search_term: searchTerm });
      }
    }, SEARCH_EVENT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [query, entries]);

  const results = useMemo(() => (entries && appliedTerm ? search(entries, appliedTerm) : []), [entries, appliedTerm]);
  const suggestion = useMemo(
    () => (entries && appliedTerm && results.length === 0 ? suggest(entries, appliedTerm) : null),
    [entries, appliedTerm, results.length],
  );
  const featured = useMemo(() => entries?.filter((entry) => entry.kind === "service" && entry.featured) ?? [], [entries]);
  const topResult = results[0];
  const similarServices = useMemo(
    () => (entries && topResult?.kind === "service" ? similar(entries, topResult) : []),
    [entries, topResult],
  );
  const serviceResults = results.filter((entry) => entry.kind !== "post");
  const postResults = results.filter((entry) => entry.kind === "post");

  const whatsappMessage = trimmed ? `Hola Lumayo, busco información sobre: ${trimmed}` : defaultWhatsappMessage;

  const handleSelect = (entry: SearchEntry) => {
    navigatingRef.current = true;
    pushSearchEvent({ event: "search_result_click", search_term: trimmed, result_id: entry.id });
    onClose();
  };

  const trackWhatsapp = () => pushSearchEvent({ event: "search_whatsapp_click", search_term: trimmed });

  const applyQuery = (next: string) => {
    setQuery(next);
    inputRef.current?.focus();
  };

  let status = "";
  if (appliedTerm) {
    if (loadFailed) status = "No pudimos cargar el buscador. Escríbenos por WhatsApp.";
    else if (!entries) status = "Buscando…";
    else status = results.length > 0 ? resultsLabel(results.length) : "Sin resultados";
  }

  const sectionTitle = "font-display text-sm font-bold tracking-[0.12em] text-text-muted";
  const gridClass = "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Buscador de servicios"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
      className="fixed inset-0 z-[90] flex flex-col bg-bg"
    >
      <div className="border-b border-border">
        <div className="container-page flex items-center gap-3 py-3 sm:py-4">
          <form role="search" onSubmit={(event) => event.preventDefault()} className="relative flex-1">
            <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="¿Qué tratamiento buscas?"
              aria-label="Buscar servicios"
              autoComplete="off"
              enterKeyHint="search"
              className="h-12 w-full rounded-full border border-border-input bg-surface pl-12 pr-12 text-base text-heading placeholder:text-text-muted [&::-webkit-search-cancel-button]:appearance-none sm:h-14 sm:text-lg"
            />
            {query && (
              <button
                type="button"
                onClick={() => applyQuery("")}
                aria-label="Borrar búsqueda"
                className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-primary transition hover:bg-surface-soft"
              >
                <CloseIcon className="size-4" />
              </button>
            )}
          </form>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-full px-3 py-2 text-sm font-semibold text-primary transition hover:bg-surface sm:text-base"
          >
            Cancelar
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="container-page pb-10 pt-5 sm:pt-6">
          <p role="status" aria-live="polite" className="min-h-5 text-sm text-text-muted">
            {status}
          </p>

          {!appliedTerm && (
            <>
              <h2 className={sectionTitle}>BÚSQUEDAS FRECUENTES</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularSearches.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => applyQuery(label)}
                    className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border-input bg-bg px-4 text-sm font-semibold text-primary transition hover:bg-surface"
                  >
                    {label}
                  </button>
                ))}
              </div>
              {featured.length > 0 && (
                <section className="mt-10">
                  <h2 className={sectionTitle}>SERVICIOS DESTACADOS</h2>
                  <div className={gridClass}>
                    {featured.map((entry) => (
                      <SearchResultCard key={entry.id} entry={entry} onSelect={handleSelect} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {appliedTerm && entries && results.length > 0 && (
            <>
              {serviceResults.length > 0 && (
                <section className="mt-2">
                  <h2 className={sectionTitle}>SERVICIOS</h2>
                  <div className={gridClass}>
                    {serviceResults.map((entry) => (
                      <SearchResultCard key={entry.id} entry={entry} onSelect={handleSelect} />
                    ))}
                  </div>
                </section>
              )}

              {similarServices.length > 0 && (
                <section className="mt-10">
                  <h2 className={sectionTitle}>SERVICIOS SIMILARES</h2>
                  <div className={gridClass}>
                    {similarServices.map((entry) => (
                      <SearchResultCard key={entry.id} entry={entry} onSelect={handleSelect} />
                    ))}
                  </div>
                </section>
              )}

              {postResults.length > 0 && (
                <section className="mt-10">
                  <h2 className={sectionTitle}>ARTÍCULOS DEL BLOG</h2>
                  <ul className="mt-2 divide-y divide-border">
                    {postResults.map((entry) => (
                      <li key={entry.id}>
                        <Link
                          href={entry.href}
                          onClick={() => handleSelect(entry)}
                          className="group flex items-center justify-between gap-4 py-4 transition hover:text-primary"
                        >
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold uppercase tracking-wide text-accent-text">{entry.subtitle}</span>
                            <span className="mt-1 block font-semibold leading-snug text-heading">{entry.title}</span>
                          </span>
                          <ArrowRightIcon className="size-4 shrink-0 text-accent-text transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}

          {appliedTerm && entries && results.length === 0 && (
            <section className="mt-2">
              <p className="font-display text-xl font-bold text-heading">No encontramos «{appliedTerm}».</p>
              {suggestion && (
                <p className="mt-2 text-text">
                  ¿Quisiste decir{" "}
                  <button
                    type="button"
                    onClick={() => applyQuery(suggestion)}
                    className="cursor-pointer font-bold text-primary underline decoration-accent-strong underline-offset-4 hover:text-primary-hover"
                  >
                    {suggestion}
                  </button>
                  ?
                </p>
              )}
              <a
                href={whatsappUrl(whatsappMessage)}
                target="_blank"
                rel="noopener"
                onClick={trackWhatsapp}
                className="btn btn-wa mt-5 w-full sm:w-fit"
              >
                <WhatsappIcon />
                Pregúntanos por WhatsApp
              </a>
              {featured.length > 0 && (
                <div className="mt-10">
                  <h2 className={sectionTitle}>TE PUEDE INTERESAR</h2>
                  <div className={gridClass}>
                    {featured.map((entry) => (
                      <SearchResultCard key={entry.id} entry={entry} onSelect={handleSelect} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <section className="mt-10 flex flex-col gap-4 rounded-3xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-xl font-bold text-heading">¿No encuentras lo que buscas?</h2>
              <p className="mt-1 text-text">Escríbenos y te orientamos.</p>
            </div>
            <a
              href={whatsappUrl(whatsappMessage)}
              target="_blank"
              rel="noopener"
              onClick={trackWhatsapp}
              className="btn btn-wa w-full sm:w-auto"
            >
              <WhatsappIcon />
              Escribir por WhatsApp
            </a>
          </section>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
