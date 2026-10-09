/**
 * Patient testimonials.
 *
 * `testimonials` holds REAL reviews only: each must come from an actual Lumayo patient
 * who agreed to have it published (e.g. copied from Google or Facebook with permission).
 *
 * `sampleTestimonials` are placeholders to preview the design (stock portraits from
 * Unsplash, invented quotes). They are shown only in development and are never rendered
 * in a production build. Delete them once real testimonials are added.
 */

export type Testimonial = {
  name: string;
  /** What the patient said, quoted as they wrote it. */
  quote: string;
  treatment?: string;
  /** 1–5, only if the patient gave a rating. */
  rating?: number;
  /** Where the review was originally published, e.g. "Google" or "Facebook". */
  source?: string;
  /** Vertical (9:16) cover image: a path under /public, e.g. "/images/testimonios/maria.webp". */
  image?: string;
  /** Vertical (9:16) video, e.g. "/videos/testimonios/maria.mp4". When set, the card shows a play button. */
  video?: string;
};

/** Unsplash portrait cropped to 9:16 for the sample cards (development only). */
const sampleImage = (id: string) => `https://images.unsplash.com/${id}?w=540&h=960&fit=crop&crop=faces&q=75&auto=format`;

export const testimonials: Testimonial[] = [];

export const sampleTestimonials: Testimonial[] = [
  {
    name: "Carla M.",
    image: sampleImage("photo-1660160628977-3ad376b8b73b"),
    treatment: "Ortodoncia con brackets",
    rating: 5,
    quote: "Llevo seis meses con mis brackets y ya noto el cambio. En cada control me explican qué ajustan y siempre me atienden puntual.",
  },
  {
    name: "Jorge R.",
    image: sampleImage("photo-1692197393247-c76e1bd8f29e"),
    treatment: "Implantes dentales",
    rating: 5,
    quote: "Tenía miedo de ponerme un implante, pero el doctor me explicó todo con paciencia. Hoy como y sonrío sin problemas.",
  },
  {
    name: "Lucía V.",
    image: sampleImage("photo-1623717217554-72ca676de535"),
    treatment: "Odontopediatría",
    rating: 5,
    quote: "Mi hijo salió feliz de su primera consulta. Lo trataron con mucho cariño y ahora hasta quiere volver.",
  },
  {
    name: "Andrea T.",
    image: sampleImage("photo-1662850886700-4ec19bd30d11"),
    treatment: "Blanqueamiento dental",
    rating: 5,
    quote: "El blanqueamiento quedó natural, justo como quería. El consultorio es muy limpio y la atención, súper amable.",
  },
  {
    name: "Miguel S.",
    image: sampleImage("photo-1583264277168-58ceba4b84e7"),
    treatment: "Endodoncia",
    rating: 5,
    quote: "Llegué con un dolor fuerte y me atendieron el mismo día. El tratamiento fue rápido y casi no sentí molestias.",
  },
  {
    name: "Rosa P.",
    image: sampleImage("photo-1734764627105-b5ff03f02b2d"),
    treatment: "Prótesis removibles",
    rating: 5,
    quote: "Mi prótesis quedó muy bien ajustada. Me enseñaron a cuidarla y ahora me siento segura al hablar y sonreír.",
  },
  {
    name: "Diego A.",
    image: sampleImage("photo-1611695434369-a8f5d76ceb7b"),
    treatment: "Ortodoncia con brackets",
    rating: 5,
    quote: "Reservé por WhatsApp y me respondieron enseguida. Te hacen sentir en confianza desde la primera visita.",
  },
];

/** Real reviews when there are any; otherwise the samples, but only in development. */
export function getDisplayedTestimonials(): Testimonial[] {
  if (testimonials.length > 0) return testimonials;
  return process.env.NODE_ENV === "development" ? sampleTestimonials : [];
}
