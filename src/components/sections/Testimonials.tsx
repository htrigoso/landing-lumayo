import { SectionHeading } from "@/components/brand/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsMarquee } from "@/components/testimonials/TestimonialsMarquee";
import { getDisplayedTestimonials } from "@/lib/results";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";

/**
 * `surface` lets a page keep backgrounds alternating when the section above shares its colour.
 * `flatBottom` keeps the sky bottom edge when a wave divider that paints sky follows directly.
 */
export function Testimonials({ number = "04", surface = "mist", flatBottom = false }: { number?: string; surface?: "mist" | "white"; flatBottom?: boolean }) {
  const items = getDisplayedTestimonials();
  if (items.length === 0) return null;

  const skyBackground = flatBottom
    ? "bg-[linear-gradient(to_bottom,var(--color-bg)_0%,var(--color-surface)_16%,var(--color-surface)_100%)]"
    : "bg-[linear-gradient(to_bottom,var(--color-bg)_0%,var(--color-surface)_16%,var(--color-surface)_84%,var(--color-bg)_100%)]";

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className={`relative isolate overflow-hidden pb-16 lg:pb-20 ${surface === "mist" ? skyBackground : "bg-bg"}`}>
      <SectionBackdrop lines="tr" surface={surface === "mist" ? "mist" : "white"} />
      <div>
        <div className="container-page">
          <SectionHeading
            number={number}
            label="Testimonios"
            id="testimonios-title"
            title={
              <>
                Lo que dicen <strong>nuestros pacientes</strong>
              </>
            }
            description="Opiniones de quienes ya confiaron su sonrisa a Lumayo."
          />
        </div>

        <Reveal delay={0.1} className="mt-12">
          <TestimonialsMarquee items={items} />
        </Reveal>
      </div>
    </section>
  );
}
