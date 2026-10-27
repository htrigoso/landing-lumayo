"use client";

import "plyr/dist/plyr.css";
import { useEffect, useRef, type CSSProperties } from "react";
import type Plyr from "plyr";

type BrandVideoProps = {
  src: string;
  poster?: string;
  /** Accessible name for the video element, read by screen readers. */
  title: string;
};

/**
 * Testimonial player: Plyr with Lumayo colours and Spanish labels. Plyr is imported only when a
 * video opens, so the library stays out of the page's first load.
 */
export function BrandVideo({ src, poster, title }: BrandVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Created here, not by React: Plyr moves the <video> into its own wrapper, and React must not
    // try to remove a node that has left its tree. Each open gets a fresh element.
    const element = document.createElement("video");
    element.src = src;
    if (poster) element.poster = poster;
    element.playsInline = true;
    element.preload = "metadata";
    element.setAttribute("aria-label", title);
    element.className = "size-full object-cover";
    container.append(element);

    let player: Plyr | undefined;
    let cancelled = false;

    import("plyr").then(({ default: PlyrPlayer }) => {
      if (cancelled) return;
      player = new PlyrPlayer(element, {
        // No control bar: a single large play button, and a click on the video toggles playback.
        controls: ["play-large"],
        clickToPlay: true,
        resetOnEnd: true,
        keyboard: { focused: true, global: false },
        i18n: {
          play: "Reproducir",
          pause: "Pausar",
          restart: "Reiniciar",
        },
      });

      // Opened by a click, so the browser allows sound. If it still refuses, the play button stays visible.
      player.once("ready", () => {
        void player?.play()?.catch(() => undefined);
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
      element.remove();
    };
  }, [src, poster, title]);

  return (
    <div
      ref={containerRef}
      className="size-full"
      style={{ "--plyr-color-main": "var(--color-primary)" } as CSSProperties}
    />
  );
}
