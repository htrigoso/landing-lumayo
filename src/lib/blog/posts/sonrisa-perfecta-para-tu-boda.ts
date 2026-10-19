import type { BlogPost } from "@/lib/blog/types";
import { serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "sonrisa-perfecta-para-tu-boda",
  title: "Sonrisa para tu boda: plan de blanqueamiento y estética",
  excerpt:
    "Planificar la sonrisa con tiempo permite valorar, limpiar y ajustar cada tratamiento. Te contamos qué opciones existen y cuándo conviene pedir cita.",
  category: "Estética",
  readingMinutes: 6,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "Empezar con tiempo permite valorar, limpiar y ajustar los tratamientos sin prisas.",
    "El blanqueamiento aclara los dientes naturales, pero no cambia el color de coronas, prótesis ni implantes.",
    "Blanqueamiento y carillas deben planificarse con tu dentista, y el blanqueamiento va primero cuando se combinan.",
  ],
  sections: [
    {
      id: "empezar-con-tiempo",
      title: "Empezar con tiempo",
      blocks: [
        {
          type: "p",
          text: "Una sonrisa para una boda se prepara con antelación. El orden habitual es una primera valoración, después una limpieza profesional y, por último, los tratamientos estéticos. Así queda margen para hacer ajustes y para que cualquier sensibilidad temporal desaparezca antes del gran día.",
        },
        {
          type: "p",
          text: "El plazo exacto lo decide tu dentista según tu caso. Conviene pedir cita con suficiente antelación para no tener que acelerar ningún tratamiento.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Primer paso",
          text: "Pide una revisión general con limpieza. Con ella se ve el punto de partida real antes de decidir nada más.",
        },
      ],
    },
    {
      id: "que-hace-el-blanqueamiento",
      title: "Qué hace el blanqueamiento",
      blocks: [
        {
          type: "p",
          text: "El blanqueamiento aclara los dientes naturales que se han oscurecido por la edad, por las bebidas o por el tabaco. No actúa sobre coronas, prótesis ni implantes, que mantienen su color, así que conviene valorarlos antes de empezar.",
        },
        {
          type: "p",
          text: "Puede causar sensibilidad temporal o irritación de las encías. Además, el resultado no es permanente: los hábitos cotidianos vuelven a oscurecer el esmalte con el paso del tiempo.",
        },
        {
          type: "callout",
          tone: "alert",
          title: "Atención a la sensibilidad",
          text: "Si notas molestias intensas o encías irritadas durante el tratamiento, comunícalo a tu dentista antes de continuar.",
        },
      ],
    },
    {
      id: "por-que-con-dentista",
      title: "Por qué hacerlo con tu dentista",
      blocks: [
        {
          type: "p",
          text: "Los kits sin supervisión o los tratamientos de salón pueden dar peores resultados y, en algunos casos, dañar los dientes y las encías. Un dentista evalúa si el blanqueamiento es adecuado para ti y adapta el procedimiento a tu boca.",
        },
        {
          type: "p",
          text: "No suele estar indicado en menores, durante el embarazo ni en la lactancia. Si te encuentras en alguna de estas situaciones, consulta primero con tu dentista.",
        },
      ],
    },
    {
      id: "diseno-y-carillas",
      title: "Diseño de sonrisa y carillas",
      blocks: [
        {
          type: "p",
          text: "El diseño de sonrisa resulta útil cuando el color no es el único problema. La forma, el tamaño o los huecos entre los dientes también influyen en cómo se ve la sonrisa. En esos casos, las carillas pueden ser una opción a valorar.",
        },
        {
          type: "p",
          text: "Si se combinan ambos tratamientos, el blanqueamiento va antes que las carillas. Como las carillas no cambian de color, el tono final se elige una vez aclarados los dientes naturales.",
        },
      ],
    },
    {
      id: "semanas-antes",
      title: "Las semanas previas a la boda",
      blocks: [
        {
          type: "p",
          text: "En las semanas previas a la boda conviene evitar empezar tratamientos nuevos a última hora. Cualquier cambio necesita tiempo para asentarse y para revisarse.",
        },
        {
          type: "list",
          items: [
            "Limita las bebidas que manchan, como el café, el té o el vino tinto",
            "Mantén una higiene constante con cepillado, hilo dental y enjuague",
            "Evita estrenar tratamientos justo la semana de la boda",
            "Informa a tu dentista de la fecha para planificar las citas",
          ],
        },
        {
          type: "p",
          text: "Si buscas una propuesta pensada para parejas que se casan, Lumayo Novias es un plan diseñado para ese momento. Tu dentista puede explicarte cómo encaja en tu caso.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿El blanqueamiento sirve si tengo coronas?",
      a: "No aclara coronas, prótesis ni implantes, porque no responden igual que el esmalte natural. Tu dentista puede valorar si conviene incluirlas en el plan.",
    },
    {
      q: "¿El blanqueamiento es permanente?",
      a: "No, el resultado no es permanente y depende en gran medida de tus hábitos. Tu dentista te indicará cómo mantenerlo.",
    },
    {
      q: "¿Puedo blanquearme con un kit en casa?",
      a: "Pregúntalo a tu dentista, que te dirá si es adecuado para ti. Los productos sin supervisión pueden ser menos eficaces y llegar a dañar dientes o encías.",
    },
  ],
  related: [
    { label: "Lumayo Novias", href: "/servicios/lumayo-novias" },
    { label: "Blanqueamiento", href: serviceHref("blanqueamiento") },
    { label: "Diseño de sonrisa", href: serviceHref("diseno-de-sonrisa") },
  ],
  coverServiceId: "diseno-de-sonrisa",
  sources: [
    {
      label: "NHS: blanqueamiento dental",
      url: "https://www.nhs.uk/conditions/teeth-whitening/",
    },
    {
      label: "Cleveland Clinic: carillas dentales",
      url: "https://my.clevelandclinic.org/health/treatments/23522-dental-veneers",
    },
  ],
  todo: [
    "Confirmar el orden recomendado de tratamientos y la antelación con la que la clínica sugiere empezar.",
    "Validar la indicación de blanqueamiento en menores, embarazo y lactancia, y el manejo de la sensibilidad.",
    "Confirmar que el tono de las carillas se elige tras el blanqueamiento y cómo se tratan las coronas existentes.",
    "Confirmar la descripción de Lumayo Novias antes de publicar.",
  ],
};
