import { Reveal } from "@/components/motion/Reveal";
import { ServicesCarousel } from "@/components/services/ServicesCarousel";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-sky-50" />
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill">Nuestros servicios</p>
          <h2 id="servicios-title" className="section-title mt-4">
            Todo lo que tu sonrisa necesita, en un solo lugar
          </h2>
          <p className="section-sub mt-4">Desliza para conocerlos y consúltanos directamente por WhatsApp.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ServicesCarousel />
        </Reveal>
      </div>
    </section>
  );
}
