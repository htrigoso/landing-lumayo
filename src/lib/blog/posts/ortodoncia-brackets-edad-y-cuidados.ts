import type { BlogPost } from "@/lib/blog/types";
import { categoryPath, getCategoryBySlug, serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "ortodoncia-brackets-edad-y-cuidados",
  title: "Brackets: a qué edad empezar y cómo cuidarlos",
  excerpt:
    "Conoce cuándo conviene la primera revisión de ortodoncia, qué señales indican que hace falta tratamiento y cómo cuidar tus brackets día a día.",
  category: "Ortodoncia",
  readingMinutes: 7,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "Una primera revisión alrededor de los 7 años sirve para vigilar el desarrollo, aunque no implica empezar tratamiento.",
    "Los adultos también pueden usar brackets si sus dientes y encías están sanos.",
    "Durante el tratamiento, la alimentación y la higiene influyen directamente en el resultado.",
  ],
  sections: [
    {
      id: "primera-revision",
      title: "Cuándo acudir a la primera revisión",
      blocks: [
        {
          type: "p",
          text: "La Asociación Americana de Ortodoncistas sugiere que los niños tengan una primera revisión de ortodoncia alrededor de los 7 años. Esa visita no obliga a empezar un tratamiento de inmediato. Con frecuencia el especialista solo observa cómo crecen los maxilares y cómo salen los dientes, y decide cuándo conviene volver.",
        },
        {
          type: "p",
          text: "Existen señales que justifican pedir cita antes. Conviene consultar si se aprecian las siguientes situaciones:",
        },
        {
          type: "list",
          items: [
            "Apiñamiento o dientes que se superponen",
            "Arcadas dentales estrechas",
            "Mordida cruzada",
            "Dientes de leche que no se caen cuando deberían",
            "Dientes permanentes que no terminan de aparecer",
          ],
        },
      ],
    },
    {
      id: "edad-adultos",
      title: "No existe una edad límite fija",
      blocks: [
        {
          type: "p",
          text: "La ortodoncia no tiene una edad máxima establecida. Un adulto puede llevar brackets si sus dientes, sus huesos de soporte y sus encías están en buen estado. Antes de empezar, el dentista revisa si hay caries, problemas de encías o cambios que deban tratarse primero.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Antes de empezar",
          text: "Pide una valoración completa aunque no tengas molestias. Con ella se decide el orden de los tratamientos y se evita empezar sobre una boca que todavía necesita cuidados.",
        },
      ],
    },
    {
      id: "como-funciona",
      title: "Cómo funciona el tratamiento",
      blocks: [
        {
          type: "p",
          text: "Con brackets, el tratamiento avanza mediante revisiones periódicas en las que se ajustan los arcos. Cada ajuste aplica una fuerza suave para mover los dientes poco a poco. Es normal sentir molestias leves en los primeros días o después de un ajuste, y suelen disminuir sin necesidad de intervenir.",
        },
        {
          type: "p",
          text: "La duración total depende de cada caso: la posición de partida, la colaboración del paciente y la complejidad del movimiento necesario. Por eso no es posible ofrecer una cifra general. El especialista la estimará tras la evaluación inicial.",
        },
        {
          type: "callout",
          tone: "alert",
          title: "Cuándo avisar a la clínica",
          text: "Si un bracket se despega, si un alambre roza la mejilla de forma constante o si el dolor es intenso y no cede, comunícalo a tu clínica para revisarlo.",
        },
      ],
    },
    {
      id: "alimentacion",
      title: "Qué comer con brackets",
      blocks: [
        {
          type: "p",
          text: "Durante el tratamiento conviene evitar alimentos duros, pegajosos o que puedan partirse, porque pueden despegar un bracket o doblar el alambre. Lo más práctico es elegir comidas blandas y cortar los alimentos en trozos pequeños antes de llevarlos a la boca.",
        },
        {
          type: "list",
          items: [
            "Caramelos duros y chicles pegajosos",
            "Palomitas y frutos secos enteros",
            "Hielo y alimentos muy crujientes",
            "Fruta o verdura cruda que no se haya cortado en trozos",
            "Panes muy duros o costras crujientes",
          ],
        },
        {
          type: "p",
          text: "Las bebidas azucaradas y los snacks pegajosos favorecen la acumulación de placa alrededor de los brackets, así que conviene limitarlos.",
        },
      ],
    },
    {
      id: "higiene",
      title: "Higiene diaria con brackets",
      blocks: [
        {
          type: "p",
          text: "Los brackets crean zonas donde la placa se acumula con facilidad. Lo ideal es cepillarse después de cada comida. Si no es posible, enjuágate con agua para retirar los restos de comida antes de seguir con tu día.",
        },
        {
          type: "list",
          items: [
            "Cepillado cuidadoso alrededor de cada bracket y bajo el alambre",
            "Cepillos interdentales para los espacios entre el bracket y la encía",
            "Hilo dental con enhebrador para pasar por debajo del arco",
            "Irrigador de agua como complemento, nunca como sustituto del cepillo",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Un hábito útil",
          text: "Al terminar, revisa tus dientes frente al espejo. Si ves restos de comida alrededor de los brackets, repite el cepillado con calma.",
        },
      ],
    },
    {
      id: "despues-de-brackets",
      title: "Después de retirar los brackets",
      blocks: [
        {
          type: "p",
          text: "La retención forma parte del tratamiento. Tras retirar los brackets, el dentista suele indicar retenedores para mantener la nueva posición de los dientes, porque el hueso y los tejidos necesitan tiempo para estabilizarse.",
        },
        {
          type: "p",
          text: "Usar los retenedores según las indicaciones de tu especialista es lo que ayuda a conservar el resultado a largo plazo.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿A qué edad debo llevar a mi hijo al ortodoncista?",
      a: "Una primera revisión alrededor de los 7 años es una recomendación habitual. La decisión sobre empezar tratamiento depende de la evaluación.",
    },
    {
      q: "¿Un adulto puede ponerse brackets?",
      a: "Sí, si sus dientes y encías están sanos. El especialista revisará antes si hay problemas que deban tratarse primero.",
    },
    {
      q: "¿Puedo comer con normalidad si llevo brackets?",
      a: "Conviene evitar alimentos duros, pegajosos o muy crujientes, y cortar el resto en trozos pequeños para proteger los brackets.",
    },
  ],
  related: [
    { label: "Brackets", href: categoryPath(getCategoryBySlug("ortodoncia")!) },
    { label: "Brackets convencionales", href: serviceHref("brackets-convencionales") },
    { label: "Brackets autoligables", href: serviceHref("brackets-autoligables") },
    { label: "Odontopediatría", href: serviceHref("odontopediatria") },
    { label: "Limpieza dental", href: serviceHref("limpieza") },
  ],
  coverServiceId: "brackets-convencionales",
  sources: [
    {
      label: "AAO: cuándo debe acudir un niño al ortodoncista",
      url: "https://aaoinfo.org/whats-trending/when-should-my-child-see-an-orthodontist/",
    },
    {
      label: "AAO: qué puedo comer con brackets",
      url: "https://aaoinfo.org/blog/what-can-i-eat-with-braces",
    },
  ],
  todo: [
    "Confirmar la edad de primera revisión que la clínica recomienda a sus pacientes.",
    "Validar la lista de alimentos a evitar y la recomendación sobre irrigadores.",
    "Confirmar el protocolo de molestias tras un ajuste y el uso de retenedores tras el tratamiento.",
  ],
};
