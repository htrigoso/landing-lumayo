import type { BlogPost } from "@/lib/blog/types";
import { serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "tipos-de-carillas-dentales",
  title: "Tipos de carillas dentales: resina, porcelana, zirconio y más",
  excerpt:
    "Las carillas corrigen manchas, pequeñas fracturas y huecos entre dientes. Te explicamos sus tipos, sus diferencias y qué esperar del proceso.",
  category: "Estética",
  readingMinutes: 8,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "Las carillas son láminas finas que mejoran la apariencia del diente, pero no lo refuerzan como lo haría una corona.",
    "La resina se construye en la propia consulta y es más fácil de reparar; la cerámica suele resistir mejor las manchas.",
    "Antes de colocar carillas conviene tratar las caries y los problemas de encía, y valorar si hace falta un blanqueamiento previo.",
  ],
  sections: [
    {
      id: "que-son-las-carillas",
      title: "Qué son y para qué sirven",
      blocks: [
        {
          type: "p",
          text: "Las carillas dentales son capas finas, de un color similar al del diente, que se adhieren a la cara visible de las piezas. Se utilizan para corregir manchas que no responden al blanqueamiento, pequeñas fracturas, separaciones entre dientes o piezas pequeñas e irregulares.",
        },
        {
          type: "p",
          text: "Su función principal es estética. A diferencia de una corona, que cubre todo el diente, la carilla no lo fortalece. Por eso el dentista evalúa siempre el estado previo de cada pieza antes de proponer este tratamiento.",
        },
      ],
    },
    {
      id: "resina-o-ceramica",
      title: "Resina frente a cerámica",
      blocks: [
        {
          type: "p",
          text: "La resina compuesta se modela directamente sobre el diente, en la misma consulta. Si se daña, suele poder repararse con relativa facilidad. Con el tiempo, sin embargo, tiende a absorber pigmentos y a desgastarse antes que la cerámica.",
        },
        {
          type: "p",
          text: "La cerámica se fabrica en laboratorio a partir de una impresión o de un escaneo digital. Suele mantener mejor el color y resistir mejor las manchas, aunque requiere más pasos y una planificación previa.",
        },
      ],
    },
    {
      id: "tipos-de-ceramica",
      title: "Porcelana, disilicato de litio, zirconio y ultrafinas",
      blocks: [
        {
          type: "p",
          text: "Dentro de la cerámica existen distintos materiales. Cada uno equilibra de forma diferente la estética, la resistencia y la cantidad de esmalte que hay que retirar. La elección depende del caso clínico y del criterio del dentista.",
        },
        {
          type: "list",
          items: [
            "Porcelana: buena apariencia natural, con un desgaste de la pieza que varía según el caso",
            "Disilicato de litio: translúcido y de aspecto natural, adecuado para carillas finas",
            "Zirconio: muy resistente y menos translúcido, lo que puede ayudar a disimular fondos oscuros",
            "Ultrafinas: conservan más esmalte, aunque no son adecuadas para todos los casos",
          ],
        },
        {
          type: "p",
          text: "Ninguno de estos materiales es el mejor en todas las situaciones. El dentista valorará el color de base, la mordida y tus hábitos antes de recomendar uno u otro.",
        },
      ],
    },
    {
      id: "candidatura-y-proceso",
      title: "Quién puede ponerse carillas y cómo es el proceso",
      blocks: [
        {
          type: "p",
          text: "La prioridad es tratar las caries, las infecciones y los problemas de encía antes de cualquier carilla. Si el color es el motivo principal, puede ser útil un blanqueamiento previo, porque las carillas no cambian de color con el blanqueamiento posterior.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Valoración y diseño de la sonrisa",
            "Preparación del diente, si el caso lo requiere",
            "Prueba y ajuste de la forma y el color",
            "Colocación definitiva y fijación",
          ],
        },
        {
          type: "p",
          text: "En general no hay tiempo de recuperación, así que puedes retomar tu rutina el mismo día.",
        },
      ],
    },
    {
      id: "cuidados",
      title: "Cuidados para conservar las carillas",
      blocks: [
        {
          type: "p",
          text: "Las carillas se limpian como cualquier diente: cepillado regular, hilo dental y revisiones periódicas. Su duración varía según el material y los hábitos de cada persona, por lo que no existe una cifra válida para todos los casos.",
        },
        {
          type: "list",
          items: [
            "Evita morder objetos duros, como hielo, bolígrafos o envases",
            "Limita el café, el té y el vino tinto, que pueden manchar",
            "Comenta a tu dentista si tienes hábitos como rechinar los dientes",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Revisión periódica",
          text: "Acude a tus revisiones para comprobar los bordes de cada carilla y el estado de la encía que las rodea.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Las carillas son permanentes?",
      a: "En muchos casos el diente se prepara antes de colocarlas, por lo que el proceso no siempre es reversible. Tu dentista te indicará cuándo puede ser necesario reemplazarlas.",
    },
    {
      q: "¿Las carillas pueden verse naturales?",
      a: "Sí, pueden lograr un aspecto muy natural cuando el color y la forma se diseñan con cuidado. El resultado depende del material, del laboratorio y del equipo que trabaja el caso.",
    },
    {
      q: "¿Colocar carillas duele?",
      a: "Lo habitual es que el procedimiento sea poco molesto, porque se puede trabajar con anestesia local si hace falta. Tu dentista evaluará cada caso antes de empezar.",
    },
  ],
  related: [
    { label: "Carillas de porcelana", href: serviceHref("carillas-porcelana") },
    { label: "Carillas de resina", href: serviceHref("carillas-resina") },
    { label: "Diseño de sonrisa", href: serviceHref("diseno-de-sonrisa") },
  ],
  coverServiceId: "carillas-porcelana",
  sources: [
    {
      label: "Cleveland Clinic: carillas dentales",
      url: "https://my.clevelandclinic.org/health/treatments/23522-dental-veneers",
    },
    {
      label: "Sanitas: carillas dentales",
      url: "https://www.sanitas.es/biblioteca-de-salud/salud-dental/estetica-dental/carillas-dentales",
    },
  ],
  todo: [
    "Confirmar las características clínicas de cada material (porcelana, disilicato de litio, zirconio y ultrafinas) que la clínica ofrece.",
    "Validar la descripción de la preparación del diente y el carácter no reversible del tratamiento.",
    "Confirmar el protocolo de anestesia y la ausencia de tiempo de recuperación en la clínica.",
    "Confirmar la recomendación de blanquear antes de colocar carillas y el manejo del rechinar de dientes.",
  ],
};
