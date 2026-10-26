import type { BlogPost } from "@/lib/blog/types";
import { programPaths, serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "primera-consulta-dental-que-esperar",
  title: "Tu primera consulta dental: qué esperar y cada cuánto ir",
  excerpt:
    "Conoce qué pasa en la primera consulta dental, qué llevar y qué preguntar. La frecuencia de las revisiones la define tu dentista según tu caso.",
  category: "Consejos",
  readingMinutes: 5,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "La primera consulta combina una conversación sobre tu salud con una revisión de dientes y encías.",
    "No hay una frecuencia única: el dentista la ajusta a tu salud bucal y a tu nivel de riesgo.",
    "La limpieza profesional complementa el cepillado y el hilo dental, no los reemplaza.",
  ],
  sections: [
    {
      id: "que-pasa",
      title: "Qué pasa en la primera consulta",
      blocks: [
        {
          type: "p",
          text: "La primera cita suele empezar con una conversación. El dentista quiere conocer tu salud general, los medicamentos que tomas, tus alergias, si fumas, cuánto alcohol consumes, tu alimentación y tus hábitos de cepillado.",
        },
        {
          type: "p",
          text: "Después se revisan dientes, encías y mordida. Al final se explican los hallazgos, se acuerda un plan de tratamiento si hace falta y se fija la siguiente visita.",
        },
        {
          type: "p",
          text: "Si es tu primera vez en una clínica dental, es normal sentir nervios. Puedes decirlo al inicio; el equipo te explicará cada paso antes de hacerlo.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Historia clínica y preguntas sobre tu salud.",
            "Exploración de dientes, encías y mordida.",
            "Radiografías, si el dentista las considera necesarias.",
            "Explicación de los hallazgos y de las opciones.",
            "Plan de tratamiento y próxima visita.",
          ],
        },
      ],
    },
    {
      id: "cada-cuanto",
      title: "¿Cada cuánto debo ir?",
      blocks: [
        {
          type: "p",
          text: "No existe una regla única para todas las personas. La frecuencia depende de tu salud bucal y de tu nivel de riesgo, por ejemplo si tienes caries previas, encías inflamadas o hábitos que favorecen la placa.",
        },
        {
          type: "p",
          text: "Quienes tienen más riesgo necesitan un seguimiento más cercano. Tu dentista define el intervalo de revisión en cada caso y lo ajusta cuando cambian las circunstancias.",
        },
        {
          type: "p",
          text: "Si el dentista detecta cambios entre visitas, como una mancha nueva o una encía que sangra, puede pedirte volver antes de lo previsto. Avisar pronto de cualquier molestia también ayuda a ajustar el plan.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Pregunta directamente",
          text: "Al final de la consulta, pregunta: ¿cuándo debo volver y qué debo vigilar hasta entonces?",
        },
      ],
    },
    {
      id: "limpieza-profesional",
      title: "La limpieza profesional",
      blocks: [
        {
          type: "p",
          text: "La limpieza profesional retira el sarro que el cepillo y el hilo dental no logran eliminar. Ayuda a prevenir la enfermedad de las encías y el mal aliento.",
        },
        {
          type: "p",
          text: "Suele ser un procedimiento poco molesto. Si notas sensibilidad en las encías o en los dientes, coméntalo con el equipo para que pueda adaptar la técnica.",
        },
        {
          type: "p",
          text: "Después de la limpieza es habitual que el equipo te dé consejos sobre la técnica de cepillado y el uso del hilo dental, adaptados a tu boca y a tus hábitos.",
        },
      ],
    },
    {
      id: "elegir-clinica",
      title: "Cómo elegir una clínica",
      blocks: [
        {
          type: "p",
          text: "Elegir un dentista es una decisión de confianza. Estos criterios ayudan a comparar con calma:",
        },
        {
          type: "list",
          items: [
            "Diagnóstico claro, explicado con palabras sencillas.",
            "Explicación de las opciones de tratamiento y de sus consecuencias.",
            "Higiene y bioseguridad visibles en la consulta.",
            "Atención adaptada a toda la familia, incluidos los niños.",
          ],
        },
        {
          type: "callout",
          tone: "alert",
          title: "Desconfía de la presión",
          text: "Si sientes presión para decidir un tratamiento sin tiempo para pensarlo, pide más información o una segunda opinión antes de aceptar.",
        },
      ],
    },
    {
      id: "que-llevar-y-preguntar",
      title: "Qué llevar y qué preguntar",
      blocks: [
        {
          type: "p",
          text: "Para aprovechar la primera cita, lleva lo siguiente:",
        },
        {
          type: "list",
          items: [
            "Lista de los medicamentos que tomas.",
            "Alergias conocidas, incluidas las que tengas a anestésicos o materiales.",
            "Radiografías dentales previas, si las tienes.",
          ],
        },
        {
          type: "p",
          text: "Y estas preguntas te ayudarán a salir con un plan claro:",
        },
        {
          type: "p",
          text: "Si tienes dudas sobre lo que te proponen, no tienes que decidir en ese mismo momento. Puedes pedir la información por escrito y consultarla con tu familia antes de comenzar.",
        },
        {
          type: "list",
          items: [
            "¿Qué alternativas de tratamiento hay?",
            "¿Qué puedo hacer en casa para cuidar mis dientes?",
            "¿Qué riesgos tiene no tratar el problema ahora?",
          ],
        },
      ],
    },
    {
      id: "lumayo-card",
      title: "Cómo facilitar tus revisiones",
      blocks: [
        {
          type: "p",
          text: "Las revisiones regulares son más fáciles de mantener cuando cuentas con un plan de apoyo. La Membresía Lumayo es una forma de acompañar esos controles de manera continuada.",
        },
        {
          type: "p",
          text: "Pregunta en la clínica qué incluye, cómo funciona y cómo se combina con tu plan de revisiones.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Es necesario hacerse radiografías en la primera consulta?",
      a: "Depende de la valoración del dentista. Si las considera útiles, te explicará para qué sirven y qué información aportan.",
    },
    {
      q: "¿Qué pasa si no tengo molestias?",
      a: "Puede que no tengas dolor y, aun así, existan problemas incipientes. Las revisiones sirven para detectarlos a tiempo.",
    },
    {
      q: "¿La limpieza profesional sustituye el cepillado?",
      a: "No. La limpieza complementa el cepillado y el uso del hilo dental, que siguen siendo necesarios en casa.",
    },
  ],
  related: [
    { label: "Limpieza dental", href: serviceHref("limpieza") },
    { label: "Membresía Lumayo", href: programPaths.card },
    { label: "Operatoria", href: serviceHref("operatoria") },
  ],
  coverServiceId: "limpieza",
  sources: [
    {
      label: "NHS: revisiones dentales",
      url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-check-ups/",
    },
    {
      label: "NHS: dolor de muelas",
      url: "https://www.nhs.uk/conditions/toothache/",
    },
  ],
  todo: [
    "Criterios de frecuencia de revisión según nivel de riesgo: confirmar con el equipo clínico.",
    "Qué incluye la Membresía Lumayo y cómo se usa en las revisiones: confirmar con la clínica.",
    "Criterios de uso de radiografías en la primera consulta: confirmar con el dentista.",
  ],
};
