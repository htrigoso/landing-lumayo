import { SectionHeading } from "@/components/brand/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsMarquee } from "@/components/testimonials/TestimonialsMarquee";
import { getDisplayedTestimonials } from "@/lib/results";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";

/** `surface` lets a page keep backgrounds alternating when the section above shares its colour. */
export function Testimonials({ number = "04", surface = "mist" }: { number?: string; surface?: "mist" | "white" }) {
  const items = getDisplayedTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className={`relative isolate overflow-hidden py-20 lg:py-24 ${surface === "mist" ? "bg-sky-50" : "bg-white"}`}>
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
