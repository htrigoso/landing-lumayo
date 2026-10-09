import { SectionHeading } from "@/components/brand/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesCarousel } from "@/components/services/ServicesCarousel";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          number="01"
          label="Servicios"
          id="servicios-title"
          title={
            <>
              Todo lo que tu sonrisa <strong>necesita, en un solo lugar</strong>
            </>
          }
          description="Desliza para conocer cada tratamiento y consúltanos directamente por WhatsApp."
        />

        <Reveal delay={0.1} className="mt-14">
          <ServicesCarousel />
        </Reveal>
      </div>
    </section>
  );
}
