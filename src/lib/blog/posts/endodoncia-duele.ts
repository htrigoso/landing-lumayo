import type { BlogPost } from "@/lib/blog/types";
import { serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "endodoncia-duele",
  title: "¿La endodoncia duele? Todo sobre el tratamiento de conducto",
  excerpt:
    "La endodoncia, o tratamiento de conducto, busca conservar un diente con la pulpa inflamada o infectada. Conoce qué esperar durante el procedimiento y después.",
  category: "Tratamientos",
  readingMinutes: 6,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "La endodoncia retira la pulpa inflamada o infectada, limpia los conductos y los sella para conservar el diente natural.",
    "Se realiza con anestesia local, y lo habitual es sentir una molestia parecida a la de un empaste, con algo de sensibilidad después.",
    "Tras el tratamiento, el diente suele necesitar una restauración final, como un empaste o una corona.",
  ],
  sections: [
    {
      id: "que-es",
      title: "Qué es la endodoncia",
      blocks: [
        {
          type: "p",
          text: "Dentro de cada diente existe una pulpa con nervios y vasos sanguíneos. Cuando la pulpa se inflama o se infecta, por una caries profunda, una fractura o un golpe, aparece dolor y se forma riesgo de absceso. La endodoncia consiste en retirar ese tejido enfermo, limpiar y desinfectar los conductos de la raíz y sellarlos.",
        },
        {
          type: "p",
          text: "El objetivo principal es conservar el diente natural. Un diente tratado puede seguir cumpliendo su función al masticar y mantiene el espacio y la posición que protegen a los dientes vecinos.",
        },
      ],
    },
    {
      id: "senales-que-pueden-indicarla",
      title: "Señales que pueden indicarla",
      blocks: [
        {
          type: "list",
          items: [
            "Dolor intenso al masticar o al apoyar el diente.",
            "Sensibilidad al frío o al calor que se prolonga después de retirar el estímulo.",
            "Un pequeño bulto en la encía, similar a un grano, que puede drenar.",
            "Encía hinchada o enrojecida alrededor del diente.",
            "Un diente que se oscurece o una fractura visible.",
          ],
        },
        {
          type: "callout",
          tone: "alert",
          title: "Cuándo acudir sin demora",
          text: "Si el dolor es fuerte, hay hinchazón de la cara o fiebre, consulta al odontólogo lo antes posible. Si hay dificultad para respirar o tragar, ve a emergencias.",
        },
      ],
    },
    {
      id: "duele-el-procedimiento",
      title: "¿Duele el procedimiento?",
      blocks: [
        {
          type: "p",
          text: "La endodoncia se realiza con anestesia local, de modo que la zona queda adormecida durante el tratamiento. Muchas personas describen la experiencia como similar a la de un empaste. No es un procedimiento sin molestias: después es habitual sentir una sensibilidad leve o cierta presión en el diente durante algunos días.",
        },
        {
          type: "p",
          text: "Si el diente estaba muy doloroso antes de empezar, el alivio suele notarse una vez retirada la pulpa inflamada. El odontólogo te indicará qué hacer si la molestia no disminuye como se espera.",
        },
      ],
    },
    {
      id: "recuperacion",
      title: "Recuperación y cuidados",
      blocks: [
        {
          type: "p",
          text: "La mayoría de las personas puede volver a sus actividades habituales el mismo día. Conviene esperar a que la anestesia desaparezca antes de comer, para no morderte la mejilla o la lengua sin notarlo.",
        },
        {
          type: "list",
          items: [
            "Usa el medicamento para la molestia solo según la indicación del odontólogo o la etiqueta del producto.",
            "Evita masticar con el diente tratado hasta que tenga la restauración final.",
            "Mantén una higiene cuidadosa y acude a las citas de control que te indique la clínica.",
          ],
        },
      ],
    },
    {
      id: "restauracion-final",
      title: "La restauración final",
      blocks: [
        {
          type: "p",
          text: "Después de la endodoncia, el diente suele quedar más frágil porque pierde parte de su estructura. Por eso, en la mayoría de los casos necesita una restauración final, que puede ser un empaste o una corona. Es importante hacerla pronto, porque protege el diente de nuevas fracturas y filtraciones.",
        },
      ],
    },
    {
      id: "por-que-conservar",
      title: "Por qué conservar el diente",
      blocks: [
        {
          type: "p",
          text: "Extraer un diente parece una solución más sencilla, pero deja un espacio que puede hacer que los dientes vecinos se muevan y que la masticación se vuelva menos eficiente. Además, reemplazarlo suele requerir otros tratamientos. Conservar el diente natural, cuando es posible, evita esas consecuencias.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿La endodoncia duele más que un empaste?",
      a: "Con anestesia local, la sensación durante el procedimiento suele parecerse a la de un empaste. Después puede haber algo de sensibilidad durante unos días.",
    },
    {
      q: "¿Puedo volver a trabajar después de una endodoncia?",
      a: "Sí, en la mayoría de los casos puedes retomar tus actividades habituales el mismo día. Espera a que la anestesia pase antes de comer.",
    },
    {
      q: "¿Todo diente tratado necesita corona?",
      a: "No siempre. El odontólogo decide entre un empaste o una corona según la cantidad de estructura dental que quede.",
    },
  ],
  related: [
    { label: "Endodoncia", href: serviceHref("endodoncia") },
    { label: "Operatoria", href: serviceHref("operatoria") },
    { label: "Curaciones dentales", href: serviceHref("curaciones") },
  ],
  coverServiceId: "endodoncia",
  sources: [
    {
      label: "American Association of Endodontists: What is a root canal?",
      url: "https://www.aae.org/patients/root-canal-treatment/what-is-a-root-canal/",
    },
  ],
  todo: [
    "Confirmar el número habitual de visitas en la clínica.",
    "Confirmar en qué casos se indica corona en lugar de empaste.",
    "Confirmar si los molares se tratan en la clínica o se derivan.",
  ],
};
