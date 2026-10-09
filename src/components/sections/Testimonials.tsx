import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsMarquee } from "@/components/testimonials/TestimonialsMarquee";
import { getDisplayedTestimonials } from "@/lib/results";

export function Testimonials() {
  const items = getDisplayedTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-sky-100/70 to-white py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill">Testimonios</p>
          <h2 id="testimonios-title" className="section-title mt-4">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="section-sub mt-4">Opiniones de quienes ya confiaron su sonrisa a Lumayo.</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <TestimonialsMarquee items={items} />
      </Reveal>
    </section>
  );
}
