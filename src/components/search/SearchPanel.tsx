"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import { ClockIcon, CloseIcon, SearchIcon, WhatsappIcon } from "@/components/icons";
import { pushSearchEvent } from "@/components/search/analytics";
import { SearchCategoryGrid } from "@/components/search/SearchCategoryGrid";
import { SearchPreview } from "@/components/search/SearchPreview";
import { SearchResultRow } from "@/components/search/SearchResultRow";
import { getCachedSearchEntries, loadSearchEntries } from "@/components/search/search-index-client";
import { flattenRows, groupResults, type ResultSection, type SearchRow } from "@/lib/search/groups";
import { entriesForIntent, searchIntents, type SearchIntent } from "@/lib/search/intents";
import { normalize } from "@/lib/search/normalize";
import { addRecent, clearRecentSearches, readRecentSearches, writeRecentSearches } from "@/lib/search/recent";
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
// Options are reached with the arrow keys, so they are skipped by Tab (tabindex -1).
const FOCUSABLE = 'a[href]:not([tabindex="-1"]), button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function resultsLabel(count: number): string {
  return `${count} ${count === 1 ? "resultado" : "resultados"}`;
}

const sectionTitle = "font-display text-base font-bold text-heading";

/** Full-screen search over the prebuilt index. Mounted only after the visitor opens it. */
export function SearchPanel({ onClose, returnFocusTo }: SearchPanelProps) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
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
  // A "¿Qué necesitas?" chip whose curated list is shown while the input is empty.
  const [intentId, setIntentId] = useState<string | null>(null);
  // Keyboard position across all result rows. -1 means nothing is active yet.
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recent, setRecent] = useState<string[]>(() => readRecentSearches());

  const trimmed = query.trim();
  const appliedTerm = term.trim();
  const intent: SearchIntent | null = searchIntents.find((candidate) => candidate.id === intentId) ?? null;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Lock the page scroll, handle Escape and keep Tab inside the dialog. Restore focus on close.
  useEffect(() => {
    // The opener is recorded before the panel mounts, so reading it now is the value to restore.
    const opener = returnFocusTo.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: globalThis.KeyboardEvent) => {
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
    const timer = window.setTimeout(() => {
      setTerm(query);
      setActiveIndex(-1);
    }, DEBOUNCE_MS);
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
  const topResult = results[0];
  const similarServices = useMemo(
    () => (entries && topResult?.kind === "service" ? similar(entries, topResult) : []),
    [entries, topResult],
  );
  const intentEntries = useMemo(() => (entries && intent ? entriesForIntent(entries, intent) : []), [entries, intent]);

  // What the list shows: the grouped query results, or the curated list of the chosen intent.
  const sections = useMemo<ResultSection[]>(() => {
    if (appliedTerm) return groupResults(results, similarServices);
    if (intent) return [{ key: "intent", title: intent.label, entries: intentEntries }];
    return [];
  }, [appliedTerm, results, similarServices, intent, intentEntries]);
  const rows = useMemo(() => flattenRows(sections), [sections]);
  const safeActive = activeIndex < rows.length ? activeIndex : -1;
  const activeRow = safeActive >= 0 ? rows[safeActive] : undefined;
  // The desktop preview follows the active row, or the first one when nothing is active.
  const previewRow: SearchRow | null = activeRow ?? rows[0] ?? null;

  const whatsappMessage = trimmed ? `Hola Lumayo, busco información sobre: ${trimmed}` : defaultWhatsappMessage;

  const optionId = (index: number) => `${baseId}-option-${index}`;

  const selectRow = useCallback(
    (row: SearchRow) => {
      navigatingRef.current = true;
      if (appliedTerm) {
        const next = addRecent(recent, appliedTerm);
        setRecent(next);
        writeRecentSearches(next);
      }
      pushSearchEvent({
        event: "search_result_click",
        search_term: appliedTerm,
        result_id: row.entry.id,
        group: row.group,
        position: row.position,
      });
      onClose();
    },
    [appliedTerm, recent, onClose],
  );

  const moveActive = (next: number) => {
    setActiveIndex(next);
    document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (rows.length === 0) return;
      event.preventDefault();
      const last = rows.length - 1;
      if (event.key === "ArrowDown") moveActive(safeActive < 0 || safeActive >= last ? 0 : safeActive + 1);
      else moveActive(safeActive <= 0 ? last : safeActive - 1);
      return;
    }
    if (event.key === "Enter") {
      const row = activeRow ?? rows[0];
      if (!row) return;
      event.preventDefault();
      selectRow(row);
      router.push(row.entry.href);
    }
  };

  const trackWhatsapp = () => pushSearchEvent({ event: "search_whatsapp_click", search_term: trimmed });

  const applyQuery = (next: string) => {
    setQuery(next);
    setIntentId(null);
    inputRef.current?.focus();
  };

  const chooseIntent = (next: SearchIntent) => {
    setQuery("");
    setIntentId(next.id);
    setActiveIndex(-1);
    pushSearchEvent({ event: "search_intent_click", intent: next.id });
  };

  const clearIntent = () => {
    setIntentId(null);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const applyRecent = (value: string) => {
    pushSearchEvent({ event: "search_recent_click", search_term: value });
    applyQuery(value);
  };

  const forgetRecent = () => {
    clearRecentSearches();
    setRecent([]);
  };

  const openCategory = (categoryId: string) => {
    navigatingRef.current = true;
    pushSearchEvent({ event: "search_category_click", category_id: categoryId });
    onClose();
  };

  let status = "";
  if (appliedTerm) {
    if (loadFailed) status = "No pudimos cargar el buscador. Escríbenos por WhatsApp.";
    else if (!entries) status = "Buscando…";
    else status = results.length > 0 ? resultsLabel(results.length) : "Sin resultados";
  } else if (intent && entries) {
    status = resultsLabel(intentEntries.length);
  }

  const renderResultList = () => (
    <div role="listbox" id={listboxId} aria-label="Resultados" className="mt-3 flex flex-col gap-6">
      {sections.map((section) => (
        <div key={section.key} role="group" aria-label={section.title}>
          {section.key !== "intent" && <h3 className={sectionTitle}>{section.title}</h3>}
          <div className="mt-1 flex flex-col gap-1">
            {rows
              .filter((row) => row.group === section.key)
              .map((row) => (
                <SearchResultRow
                  key={`${row.group}-${row.entry.id}`}
                  id={optionId(row.index)}
                  entry={row.entry}
                  query={appliedTerm}
                  active={safeActive === row.index}
                  onHover={() => setActiveIndex(row.index)}
                  onOpen={() => selectRow(row)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );

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
        <div className="container-page flex items-center gap-2 py-3 sm:gap-3 sm:py-4">
          <form role="search" onSubmit={(event) => event.preventDefault()} className="relative flex-1">
            <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-primary sm:left-4" />
            <input
              ref={inputRef}
              type="search"
              role="combobox"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIntentId(null);
              }}
              onKeyDown={onInputKeyDown}
              aria-expanded={rows.length > 0}
              aria-controls={rows.length > 0 ? listboxId : undefined}
              aria-autocomplete="list"
              aria-activedescendant={safeActive >= 0 ? optionId(safeActive) : undefined}
              placeholder="Buscar tratamiento"
              aria-label="Buscar servicios"
              autoComplete="off"
              enterKeyHint="search"
              className="h-12 w-full rounded-full border border-border-input bg-surface pl-10 pr-10 text-base sm:pl-12 sm:pr-12 text-heading placeholder:text-text-muted [&::-webkit-search-cancel-button]:appearance-none sm:h-14 sm:text-lg"
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
            className="shrink-0 cursor-pointer rounded-full px-2 py-2 text-sm font-semibold text-primary transition hover:bg-surface sm:px-3 sm:text-base"
          >
            Cancelar
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="container-page pb-8 pt-5 sm:pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10 lg:pt-8">
          <div className="min-w-0">
            <p role="status" aria-live="polite" className="min-h-5 text-sm text-text-muted">
              {status}
            </p>

            {!appliedTerm && (
              <section className="mt-3">
                <h2 className={sectionTitle}>¿Qué necesitas?</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {searchIntents.map((candidate) => {
                    const selected = intent?.id === candidate.id;
                    return (
                      <button
                        key={candidate.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => chooseIntent(candidate)}
                        className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-left text-sm font-semibold transition ${
                          selected ? "border-primary bg-primary text-text-inverse" : "border-aqua-300 bg-surface-accent-soft text-aqua-800 hover:bg-aqua-100"
                        }`}
                      >
                        {candidate.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {!appliedTerm && intent && (
              <section className="mt-8">
                <div className="flex items-center justify-between gap-3">
                  <h2 className={sectionTitle}>{intent.label}</h2>
                  <button
                    type="button"
                    onClick={clearIntent}
                    className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-surface"
                  >
                    Limpiar
                  </button>
                </div>
                {rows.length > 0 && renderResultList()}
              </section>
            )}

            {!appliedTerm && !intent && (
              <>
                {recent.length > 0 && (
                  <section className="mt-8">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className={sectionTitle}>Búsquedas recientes</h2>
                      <button
                        type="button"
                        onClick={forgetRecent}
                        className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-surface"
                      >
                        Borrar
                      </button>
                    </div>
                    <ul className="mt-2 flex flex-col">
                      {recent.map((value) => (
                        <li key={value}>
                          <button
                            type="button"
                            onClick={() => applyRecent(value)}
                            className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left text-text transition hover:bg-surface-soft hover:text-primary"
                          >
                            <ClockIcon aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
                            <span className="truncate">{value}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="mt-8">
                  <h2 className={sectionTitle}>Búsquedas frecuentes</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularSearches.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => applyQuery(label)}
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-aqua-300 bg-surface-accent-soft px-4 text-sm font-semibold text-aqua-800 transition hover:bg-aqua-100"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="mt-8">
                  <h2 className={sectionTitle}>Busca por categoría</h2>
                  <SearchCategoryGrid onSelect={openCategory} />
                </section>
              </>
            )}

            {appliedTerm && entries && results.length > 0 && renderResultList()}

            {appliedTerm && entries && results.length === 0 && (
              <section className="mt-3">
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
                <h2 className={`${sectionTitle} mt-8`}>Busca por categoría</h2>
                <SearchCategoryGrid onSelect={openCategory} />
                <a
                  href={whatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener"
                  onClick={trackWhatsapp}
                  className="btn btn-wa mt-6 w-full sm:w-fit"
                >
                  <WhatsappIcon />
                  Pregúntanos por WhatsApp
                </a>
              </section>
            )}

            <section className="mt-10 hidden gap-4 rounded-3xl bg-surface p-6 lg:flex lg:items-center lg:justify-between lg:p-8">
              <div>
                <h2 className="font-display text-xl font-bold text-heading">¿No encuentras lo que buscas?</h2>
                <p className="mt-1 text-text">Escríbenos y te orientamos.</p>
              </div>
              <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener" onClick={trackWhatsapp} className="btn btn-wa w-auto">
                <WhatsappIcon />
                Escribir por WhatsApp
              </a>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <SearchPreview row={previewRow} onOpen={selectRow} onWhatsapp={trackWhatsapp} />
            </div>
          </aside>
        </div>
      </div>

      <div className="border-t border-border bg-bg px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 lg:hidden">
        <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener" onClick={trackWhatsapp} className="btn btn-wa w-full">
          <WhatsappIcon />
          Escribir por WhatsApp
        </a>
      </div>
    </motion.div>,
    document.body,
  );
}
