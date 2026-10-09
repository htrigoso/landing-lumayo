import { SectionHeading } from "@/components/brand/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsMarquee } from "@/components/testimonials/TestimonialsMarquee";
import { getDisplayedTestimonials } from "@/lib/results";

export function Testimonials() {
  const items = getDisplayedTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="overflow-hidden bg-sky-50 py-20 lg:py-24">
      <div>
        <div className="container-page">
          <SectionHeading
            number="04"
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
