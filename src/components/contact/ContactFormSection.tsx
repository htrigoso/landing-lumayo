import Image from "next/image";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Photo + contact form, after the reference. Uses id="reservar" so every existing
 * "#reservar" link (mobile bar, drawer) lands on this form on the contact page.
 */
export function ContactFormSection() {
  return (
    <section id="reservar" aria-labelledby="contact-form-title" className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,var(--color-bg)_0%,var(--color-surface)_16%,var(--color-surface)_100%)] pb-16 lg:pb-20">
      <SectionBackdrop lines="tr" glow="bl" surface="mist" />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[635/642] overflow-hidden rounded-2xl">
            <Image
              src="/images/contact/contact-us-img.jpg"
              alt="Paciente sonriendo durante su atención dental"
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover"
            />
          </div>
          <IsotypeWatermark className="-bottom-14 -left-12 -z-10 w-60 !opacity-[0.08]" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="pill pill-solid">Contáctanos</p>
          <h2 id="contact-form-title" className="section-title mt-5">
            Envíanos <strong>tu consulta</strong>
          </h2>
          <p className="section-sub mt-4 max-w-lg text-pretty">
            Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar. Te respondemos lo antes posible.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
