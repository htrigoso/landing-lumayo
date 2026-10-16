import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  slug: "implantes-o-protesis-removible",
  title: "Implantes o prótesis removible: ¿qué te conviene?",
  excerpt:
    "Reemplazar un diente perdido puede hacerse con un implante o con una prótesis removible. Compara cómo funcionan, sus cuidados y qué factores evalúa el odontólogo.",
  category: "Tratamientos",
  readingMinutes: 8,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "Reemplazar un diente perdido ayuda a masticar, a hablar y a mantener el hueso de la mandíbula.",
    "Los implantes requieren hueso suficiente y un proceso de integración; las prótesis removibles son una opción no quirúrgica.",
    "La mejor opción depende de tu salud bucal, tu presupuesto y tus objetivos, y la define tu odontólogo tras una evaluación.",
  ],
  sections: [
    {
      id: "por-que-reemplazar",
      title: "Por qué conviene reemplazar un diente",
      blocks: [
        {
          type: "p",
          text: "Un diente perdido afecta más que la estética. Al faltar, la masticación se vuelve menos eficiente y la pronunciación puede cambiar. Además, el hueso de esa zona tiende a reducirse con el tiempo, y los dientes vecinos pueden desplazarse.",
        },
        {
          type: "p",
          text: "Por eso conviene reemplazarlo lo antes posible, con la opción que mejor se adapte a tu caso.",
        },
      ],
    },
    {
      id: "implantes",
      title: "Implantes dentales",
      blocks: [
        {
          type: "p",
          text: "Un implante es un tornillo que sustituye la raíz del diente. Sobre él se coloca una corona, un puente o una prótesis. Para colocarlo se necesita suficiente hueso; si no lo hay, a veces se requiere un injerto antes del procedimiento.",
        },
        {
          type: "p",
          text: "Tras la colocación, el hueso se une al implante en un proceso que puede tardar y varía de una persona a otra. Durante ese tiempo el odontólogo controla la evolución. Colocar un implante no obliga a tallar los dientes vecinos.",
        },
      ],
    },
    {
      id: "quien-es-candidato",
      title: "Quién puede ser candidato",
      blocks: [
        {
          type: "p",
          text: "Los implantes suelen considerarse en adultos que ya terminaron de crecer, con encías sanas y buena higiene oral. Algunos factores pueden afectar la cicatrización, como fumar, una diabetes no controlada o una enfermedad de las encías activa.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Evaluación previa",
          text: "El odontólogo revisa tu historia clínica, tus encías, el hueso disponible y tus hábitos antes de recomendar una opción. Ninguna evaluación es una garantía de resultado.",
        },
      ],
    },
    {
      id: "protesis-removibles",
      title: "Prótesis removibles",
      blocks: [
        {
          type: "list",
          items: [
            "Parcial: se apoya en la encía y se sujeta a los dientes restantes mediante ganchos.",
            "Total: cubre toda la arcada, cuando no quedan dientes en ella.",
            "No requiere cirugía, por lo que es una opción no invasiva.",
          ],
        },
        {
          type: "p",
          text: "Al principio puede moverse al hablar o al comer. Se necesita un periodo de adaptación, con ajustes en las citas de control, para que resulte cómoda.",
        },
      ],
    },
    {
      id: "cuidados",
      title: "Cuidados de cada opción",
      blocks: [
        {
          type: "list",
          items: [
            "Prótesis: retírala cada día para limpiarla, cepíllala con cuidado y guárdala húmeda durante la noche.",
            "Prótesis: el odontólogo puede recomendar reacondicionarla cuando la encía cambie.",
            "Implantes: cepíllalos y usa hilo dental a diario, y acude a los controles periódicos.",
          ],
        },
        {
          type: "callout",
          tone: "alert",
          title: "Señales para consultar",
          text: "Si notas dolor, movilidad, sangrado persistente o malestar al morder en una prótesis o en un implante, comunícate con la clínica sin esperar.",
        },
      ],
    },
    {
      id: "opcion-intermedia",
      title: "Una opción intermedia",
      blocks: [
        {
          type: "p",
          text: "Algunas prótesis se sujetan a uno o más implantes, lo que mejora su estabilidad sin necesidad de reemplazar todos los dientes con implantes. Si la clínica ofrece esta alternativa, el odontólogo te explicará si es adecuada para tu caso.",
        },
      ],
    },
    {
      id: "como-decidir",
      title: "Cómo decidir",
      blocks: [
        {
          type: "p",
          text: "No existe una opción única para todos. Los implantes ofrecen una sensación más cercana a la de un diente natural, pero requieren hueso y un procedimiento quirúrgico. Las prótesis removibles son menos invasivas, aunque necesitan adaptación y mantenimiento. La duración de cualquiera de las dos opciones depende de tu higiene, de tus controles y de tu salud general, y no está garantizada.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Puedo ponerme un implante si tengo poco hueso?",
      a: "A veces sí, con un injerto previo. El odontólogo lo evalúa con radiografías y explora las alternativas disponibles.",
    },
    {
      q: "¿Una prótesis removible se siente natural?",
      a: "Al principio puede resultar extraña y moverse al hablar o comer. Con la adaptación y los ajustes, la mayoría se acostumbra.",
    },
    {
      q: "¿Los implantes necesitan cuidados especiales?",
      a: "Requieren higiene diaria con cepillo e hilo dental, además de controles periódicos con el odontólogo.",
    },
  ],
  related: [
    { label: "Implantes dentales", href: "/servicios/implantes" },
    { label: "Prótesis removibles", href: "/servicios/protesis" },
    { label: "Extracciones", href: "/servicios/extracciones" },
  ],
  coverServiceId: "implantes",
  sources: [
    {
      label: "Cleveland Clinic: Dental implants",
      url: "https://my.clevelandclinic.org/health/treatments/10903-dental-implants",
    },
    {
      label: "Cleveland Clinic: Dentures",
      url: "https://my.clevelandclinic.org/health/treatments/10900-dentures",
    },
  ],
  todo: [
    "Confirmar las marcas y sistemas de implantes que utiliza la clínica.",
    "Confirmar si la clínica realiza injertos y elevaciones de seno o si los deriva.",
    "Confirmar los tiempos habituales del proceso en la clínica.",
  ],
};
