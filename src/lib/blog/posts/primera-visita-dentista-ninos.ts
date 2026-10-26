import type { BlogPost } from "@/lib/blog/types";
import { programPaths, serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "primera-visita-dentista-ninos",
  title: "Primera visita al dentista: ¿a qué edad llevar a tu hijo?",
  excerpt:
    "Lleva a tu hijo al dentista cuando aparezca el primer diente y, como máximo, al primer cumpleaños. Prevenir es más sencillo que tratar.",
  category: "Niños",
  readingMinutes: 6,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "La primera visita conviene al aparecer el primer diente y, como máximo, al primer cumpleaños.",
    "Los dientes de leche ayudan a comer, a hablar y a guiar la salida de los permanentes.",
    "Limpiar desde los primeros días y cuidar los hábitos reduce el riesgo de caries.",
  ],
  sections: [
    {
      id: "cuando-llevar",
      title: "¿Cuándo es el momento?",
      blocks: [
        {
          type: "p",
          text: "La Academia Americana de Odontopediatría recomienda que el primer control se haga cuando aparece el primer diente, y no más tarde del primer cumpleaños del niño. Esta visita no tiene que responder a un problema: su objetivo es prevenir.",
        },
        {
          type: "p",
          text: "Muchas familias esperan a que haya dolor o una mancha oscura para pedir cita. Cuando eso ocurre, la caries puede estar más avanzada y el tratamiento suele ser más largo. Una visita temprana permite detectar riesgos a tiempo y explicar a los padres qué hacer en casa.",
        },
        {
          type: "p",
          text: "Además, la primera visita sirve para que el niño se acostumbre al entorno de la clínica. Cuando la experiencia es amable, las visitas siguientes suelen resultar más sencillas para toda la familia.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Idea clave",
          text: "No hace falta esperar a que el niño tenga molestias para ir a la consulta.",
        },
      ],
    },
    {
      id: "por-que-importan",
      title: "Por qué importan los dientes de leche",
      blocks: [
        {
          type: "p",
          text: "Los dientes de leche sirven para masticar, para pronunciar bien y para guiar a los permanentes hacia su lugar. También mantienen el espacio que luego ocupará cada diente adulto.",
        },
        {
          type: "p",
          text: "Si una pieza de leche se pierde antes de tiempo por caries, los dientes vecinos pueden desplazarse y dejar menos espacio. Por eso una caries infantil no debe considerarse algo sin importancia, ni por la pieza ni por la salud general del niño.",
        },
        {
          type: "list",
          items: [
            "Masticar alimentos variados sin molestias.",
            "Pronunciar bien los sonidos al hablar.",
            "Guiar la erupción de los dientes permanentes.",
            "Mantener el espacio correcto en la arcada.",
          ],
        },
      ],
    },
    {
      id: "que-pasa-en-la-visita",
      title: "Qué ocurre en la primera visita",
      blocks: [
        {
          type: "p",
          text: "La primera consulta suele ser breve y tranquila. El odontopediatra revisa dientes, encías y mordida, y observa hábitos como el uso del chupete o el biberón por la noche.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Revisión de dientes y encías.",
            "Observación de la mordida y del desarrollo.",
            "Valoración de hábitos: chupete, biberón y alimentación.",
            "Consejos a los padres sobre higiene y riesgo de caries.",
            "Aplicación de flúor barniz, si el dentista lo considera necesario.",
          ],
        },
        {
          type: "p",
          text: "Al final, el equipo explica el plan y resuelve dudas. Es buen momento para preguntar cómo limpiar la boca del niño y cuándo conviene volver.",
        },
      ],
    },
    {
      id: "cantidad-de-pasta",
      title: "Cuánta pasta usar según la edad",
      blocks: [
        {
          type: "p",
          text: "La cantidad de pasta cambia con la edad del niño. Estas son orientaciones generales que el odontopediatra debe confirmar en cada caso:",
        },
        {
          type: "list",
          items: [
            "Antes del primer diente: limpia encías y lengua con una gasa o un paño suave y agua.",
            "Con los primeros dientes: una capa fina de pasta con flúor sobre el cepillo.",
            "De 3 a 6 años: una cantidad del tamaño de un guisante, siempre con supervisión de un adulto.",
          ],
        },
        {
          type: "callout",
          tone: "alert",
          title: "Evita que trague la pasta",
          text: "Enseña al niño a escupir la pasta sin enjuagarse con mucha agua. Si traga pasta con frecuencia, conviene revisar la cantidad con el dentista.",
        },
      ],
    },
    {
      id: "como-preparar-al-nino",
      title: "Cómo preparar al niño",
      blocks: [
        {
          type: "p",
          text: "Los niños perciben el miedo de los adultos. Habla de la visita con palabras sencillas y positivas, como \"vamos a conocer al dentista\" o \"vamos a revisar tus dientes\".",
        },
        {
          type: "list",
          items: [
            "Evita frases como \"no te va a doler\", que pueden generar más miedo.",
            "Elige un horario en que el niño esté descansado y no tenga hambre.",
            "Lleva un juguete o un peluche que le dé confianza.",
            "Juega a ser dentista en casa con un espejo y su muñeco favorito.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Tu actitud cuenta",
          text: "Si tú estás tranquilo, es más probable que el niño también lo esté.",
        },
      ],
    },
    {
      id: "prevencion-continua",
      title: "Lumayo Kids: acompañamiento continuo",
      blocks: [
        {
          type: "p",
          text: "Después de la primera visita, la prevención se mantiene con revisiones periódicas y consejos adaptados a cada etapa. En Lumayo Kids acompañamos a las familias con un plan preventivo pensado para niños, con seguimiento de hábitos, higiene y alimentación.",
        },
        {
          type: "p",
          text: "Este programa organiza los controles preventivos, pero no sustituye la valoración clínica. Pregunta en la clínica qué incluye en tu caso y cómo se adapta a la edad de tu hijo.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Y si mi hijo todavía no tiene ningún diente?",
      a: "Puedes empezar con una limpieza suave de encías desde los primeros días. La visita al dentista se organiza al aparecer el primer diente o, como máximo, al primer cumpleaños.",
    },
    {
      q: "¿La primera visita duele?",
      a: "Una revisión básica suele ser poco molesta. Si se necesita algún tratamiento, el dentista lo explicará antes de empezar.",
    },
    {
      q: "¿El flúor es seguro para los niños?",
      a: "El flúor, usado en la cantidad adecuada, ayuda a fortalecer el esmalte y a prevenir caries. Por eso la cantidad de pasta y las aplicaciones profesionales se ajustan a la edad.",
    },
  ],
  related: [
    { label: "Odontopediatría", href: serviceHref("odontopediatria") },
    { label: "Lumayo Kids", href: programPaths.kids },
    { label: "Flúor barniz", href: serviceHref("fluor-barniz") },
  ],
  coverServiceId: "odontopediatria",
  sources: [
    {
      label: "Academia Americana de Odontopediatría: preguntas frecuentes para padres",
      url: "https://www.aapd.org/resources/parent/faq/",
    },
    {
      label: "CDC: información sobre el flúor",
      url: "https://www.cdc.gov/oral-health/prevention/about-fluoride.html",
    },
  ],
  todo: [
    "Cantidades de pasta por edad (antes del primer diente, con primeros dientes y de 3 a 6 años): confirmar con el odontopediatra.",
    "Criterio para aplicar flúor barniz en la primera visita: confirmar con el odontopediatra.",
    "Contenido y cobertura de Lumayo Kids como apoyo preventivo continuo: confirmar con la clínica.",
  ],
};
