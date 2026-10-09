"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { useCoarsePointer } from "@/lib/useMediaQuery";

/** Hero media. Swap these to change the background; the poster is a frame of the clip. */
const media = {
  poster: "/images/hero-poster.jpg",
  video1080: "/video/hero-1080.mp4",
  video720: "/video/hero-720.mp4",
};

const noopSubscribe = () => () => {};
const getSaveData = () =>
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * Full-bleed hero background: the poster always renders (fast first paint), and a muted
 * looping clip fades in over it on desktop. Phones, reduced motion and Save-Data keep the
 * still, so no video is downloaded there.
 */
export function HeroBackdrop() {
  const coarse = useCoarsePointer();
  const reduceMotion = useReducedMotion();
  const saveData = useSyncExternalStore(noopSubscribe, getSaveData, () => true);
  const [playing, setPlaying] = useState(false);
  const showVideo = !coarse && !reduceMotion && !saveData;

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-navy-900">
      <Image src={media.poster} alt="" fill preload unoptimized sizes="100vw" className="object-cover object-[60%_center]" />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={media.poster}
          // The clip may already be buffered before React attaches listeners, so check on mount too
          ref={(el) => {
            if (el && el.readyState >= 3) setPlaying(true);
          }}
          onCanPlay={() => setPlaying(true)}
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover object-[60%_center] transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={media.video1080} type="video/mp4" media="(min-width: 1280px)" />
          <source src={media.video720} type="video/mp4" />
        </video>
      )}
      {/* Brand overlay (Azul profundo) keeps white copy at AA contrast over any frame */}
      <div className="absolute inset-0 bg-navy-900/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/30" />
    </div>
  );
}
