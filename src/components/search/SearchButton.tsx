"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { SearchIcon } from "@/components/icons";
import type { SearchPanelProps } from "@/components/search/SearchPanel";

type PanelComponent = ComponentType<SearchPanelProps>;

// The panel and its search code load in their own chunk on first use (or first hover/focus).
let panelModule: Promise<PanelComponent> | null = null;
function loadPanel(): Promise<PanelComponent> {
  panelModule ??= import("@/components/search/SearchPanel").then((mod) => mod.SearchPanel);
  return panelModule;
}

/**
 * Header search trigger. A pill with "Buscar" on desktop, an icon button below lg. Ctrl/Cmd+K opens
 * the same panel. The element focused before opening receives focus again when the panel closes.
 */
export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [Panel, setPanel] = useState<PanelComponent | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openPanel = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);
  const closePanel = useCallback(() => setOpen(false), []);
  const prefetch = useCallback(() => {
    void loadPanel();
  }, []);

  useEffect(() => {
    if (!open) return;
    let active = true;
    loadPanel().then((component) => {
      if (active) setPanel(() => component);
    });
    return () => {
      active = false;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!open) openPanel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openPanel]);

  const triggerProps = {
    type: "button" as const,
    onClick: openPanel,
    onPointerEnter: prefetch,
    onFocus: prefetch,
    "aria-haspopup": "dialog" as const,
    "aria-expanded": open,
  };

  return (
    <>
      <button
        {...triggerProps}
        className="hidden h-11 cursor-pointer items-center gap-2 rounded-full bg-surface px-4 text-sm font-semibold text-primary transition hover:bg-surface-soft lg:inline-flex"
      >
        <SearchIcon className="size-4" />
        Buscar
      </button>
      <button
        {...triggerProps}
        aria-label="Buscar servicios"
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-primary hover:bg-surface lg:hidden"
      >
        <SearchIcon className="size-5" />
      </button>
      {open && Panel && <Panel onClose={closePanel} returnFocusTo={returnFocusRef} />}
    </>
  );
}
