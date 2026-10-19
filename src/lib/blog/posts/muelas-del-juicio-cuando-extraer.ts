import type { BlogPost } from "@/lib/blog/types";
import { serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "muelas-del-juicio-cuando-extraer",
  title: "Muelas del juicio: ¿cuándo hay que extraerlas?",
  excerpt:
    "Las muelas del juicio no siempre necesitan extracción. Te explicamos cuándo se recomienda retirarlas, cómo es el procedimiento y qué señales requieren atención.",
  category: "Tratamientos",
  readingMinutes: 7,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "Las muelas del juicio no se extraen de forma automática: el odontólogo decide según su posición, su espacio y sus síntomas.",
    "Pueden causar dolor, inflamación de la encía, caries en el diente contiguo o la formación de quistes.",
    "Tras la extracción, el cuidado adecuado y las señales de alerta son clave para una buena recuperación.",
  ],
  sections: [
    {
      id: "que-son",
      title: "Qué son y cuándo aparecen",
      blocks: [
        {
          type: "p",
          text: "Las muelas del juicio son los últimos molares en salir. Suelen aparecer en la adolescencia tardía o en la adultez temprana, aunque en algunas personas no llegan a brotar o lo hacen de forma parcial.",
        },
        {
          type: "p",
          text: "Cuando hay espacio suficiente y la muela sale correctamente, puede integrarse sin problemas en la masticación y su limpieza es posible. El problema aparece cuando no hay lugar para ella o cuando queda atrapada.",
        },
      ],
    },
    {
      id: "cuando-se-recomienda-extraer",
      title: "Cuándo se recomienda extraerlas",
      blocks: [
        {
          type: "p",
          text: "No todas las muelas del juicio se extraen. Si no causan molestias, el odontólogo suele vigilarlas en los controles periódicos. La extracción se considera cuando no hay espacio para que salgan, cuando están impactadas o cuando la encía las cubre de forma que dificulta su higiene.",
        },
        {
          type: "p",
          text: "La decisión se toma tras una evaluación clínica y radiográfica, y debe explicarse de forma individual, con sus beneficios y sus riesgos. Un mismo hallazgo puede llevar a conclusiones distintas según la edad de la persona, su salud general y la posibilidad de una higiene adecuada en esa zona.",
        },
        {
          type: "p",
          text: "Pedir una segunda opinión es una decisión razonable si tienes dudas. Lo importante es que la recomendación esté respaldada por una revisión y que puedas hacer preguntas sobre cada alternativa.",
        },
      ],
    },
    {
      id: "problemas-que-pueden-causar",
      title: "Problemas que pueden causar",
      blocks: [
        {
          type: "list",
          items: [
            "Dolor e hinchazón en la zona posterior de la boca.",
            "Infección de la encía que rodea a la muela parcialmente salida.",
            "Acumulación de comida que es difícil de limpiar.",
            "Caries en la muela del juicio o en el diente que está delante de ella.",
            "Quistes o abscesos asociados a la muela impactada.",
          ],
        },
      ],
    },
    {
      id: "el-procedimiento",
      title: "Cómo es el procedimiento",
      blocks: [
        {
          type: "p",
          text: "La extracción se realiza con anestesia local. En casos complejos, el odontólogo puede valorar opciones de sedación, que se detallan antes del procedimiento. En algunas situaciones la muela se divide en partes para retirarla con menos trauma, y puede ser necesario colocar puntos.",
        },
        {
          type: "p",
          text: "La mayoría de las personas regresa a casa el mismo día del procedimiento. Antes de la cita, el odontólogo te indicará si debes acudir acompañado, si conviene evitar comer o beber durante un tiempo previo y qué medicamentos debes seguir o suspender. Es buena idea llevar una lista de tus medicamentos habituales y de cualquier alergia que tengas.",
        },
      ],
    },
    {
      id: "cuidados-despues",
      title: "Cuidados después de la extracción",
      blocks: [
        {
          type: "list",
          items: [
            "Come alimentos blandos y evita los duros durante los primeros días.",
            "Toma el medicamento para el dolor solo si el odontólogo lo indica, siguiendo sus instrucciones.",
            "Mantén una higiene cuidadosa, sin enjuagar con fuerza la zona operada.",
            "Si sangra, aplica presión suave con una gasa limpia.",
            "Evita fumar, consumir alcohol, beber líquidos muy calientes y masticar alimentos duros.",
          ],
        },
      ],
    },
    {
      id: "senales-de-alerta",
      title: "Señales de alerta",
      blocks: [
        {
          type: "callout",
          tone: "alert",
          title: "Contacta con el odontólogo si notas:",
          text: "Sangrado que no se detiene, dolor o hinchazón que empeoran con el tiempo, fiebre o mal sabor de boca. Estos signos pueden indicar alveolitis o infección. Si tienes dificultad para respirar o tragar, acude a emergencias.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Todas las muelas del juicio deben extraerse?",
      a: "No. Si no causan problemas y tienen espacio suficiente, el odontólogo puede optar por vigilarlas en los controles periódicos.",
    },
    {
      q: "¿La extracción de una muela del juicio se hace con anestesia?",
      a: "Sí, se realiza con anestesia local, y en casos complejos el odontólogo puede valorar sedación.",
    },
    {
      q: "¿Qué debo hacer si la herida sangra después de la extracción?",
      a: "Aplica presión suave con una gasa limpia. Si el sangrado no se detiene, comunícate con el odontólogo.",
    },
  ],
  related: [
    { label: "Muelas del juicio", href: serviceHref("muelas-del-juicio") },
    { label: "Extracción dental", href: serviceHref("extracciones") },
    { label: "Endodoncia", href: serviceHref("endodoncia") },
  ],
  coverServiceId: "muelas-del-juicio",
  sources: [
    {
      label: "NHS: Wisdom tooth removal",
      url: "https://www.nhs.uk/conditions/wisdom-tooth-removal/",
    },
  ],
  todo: [
    "Confirmar las opciones de sedación que ofrece la clínica.",
    "Confirmar el tiempo habitual de recuperación en la clínica.",
    "Confirmar qué medicamento para el dolor se recomienda tras la extracción.",
    "Confirmar cómo explicar el posible adormecimiento nervioso (parestesia) y su manejo.",
  ],
};
