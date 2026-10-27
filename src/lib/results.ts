/**
 * Patient testimonials.
 *
 * `testimonials` holds REAL testimonials only: each must come from an actual Lumayo patient
 * who agreed to have it published. Each entry is a video, an image, or a written review;
 * `name` and `quote` are optional so a video can be published without inventing text.
 */

export type Testimonial = {
  name?: string;
  /** What the patient said, quoted as they wrote it. */
  quote?: string;
  treatment?: string;
  /** 1–5, only if the patient gave a rating. */
  rating?: number;
  /** Where the review was originally published, e.g. "Google" or "Facebook". */
  source?: string;
  /** Vertical (9:16) cover image: a path under /public, e.g. "/testimonios/maria.webp". */
  image?: string;
  /** Vertical (9:16) video, e.g. "/testimonios/maria.mp4". When set, the card shows a play button. */
  video?: string;
};

/** A testimonial with an author and text: the only kind valid as a schema.org Review. */
export type ReviewTestimonial = Testimonial & { name: string; quote: string };

export const testimonials: Testimonial[] = [{ video: "/testimonios/video.mp4", image: "/testimonios/video-poster.webp" }];

/** Testimonials that can be published as Review JSON-LD. */
export const reviewTestimonials = testimonials.filter((t): t is ReviewTestimonial => Boolean(t.name && t.quote));

export function getDisplayedTestimonials(): Testimonial[] {
  return testimonials;
}
