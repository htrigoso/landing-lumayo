import type { BlogPost } from "@/lib/blog/types";
import { serviceHref } from "@/lib/site";

export const post: BlogPost = {
  slug: "dolor-de-muela-que-hacer",
  title: "Dolor de muela: qué hacer y cuándo es una urgencia",
  excerpt:
    "Un dolor de muela tiene muchas causas posibles. Aquí te explicamos qué puedes hacer mientras llegas a consulta y cuándo debes buscar atención urgente.",
  category: "Urgencias",
  readingMinutes: 6,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "Un dolor de muela suele tener una causa dental que conviene revisar pronto, aunque el dolor parezca leve.",
    "Si hay hinchazón en la cara o el cuello, o dificultad para respirar, tragar o hablar, acude a emergencias de inmediato.",
    "Mientras esperas tu cita, el alivio del dolor debe seguir la etiqueta del producto o la indicación de un farmacéutico.",
  ],
  sections: [
    {
      id: "causas-comunes",
      title: "Causas más comunes",
      blocks: [
        {
          type: "p",
          text: "El dolor de muela puede originarse en varios problemas distintos. Algunos de los más frecuentes son la caries, una infección que se forma en la base del diente (absceso), una fisura en el esmalte, un empaste o una corona que se ha aflojado o roto, y una muela del juicio inflamada. También pueden contribuir la enfermedad de las encías y el rechinar de dientes, además de una sensibilidad dental marcada.",
        },
        {
          type: "p",
          text: "Solo un examen clínico y, en muchos casos, una radiografía permiten saber qué está ocurriendo. Por eso, aunque puedas aliviar el malestar en casa, el diagnóstico corresponde al odontólogo. Guardar una nota con cuándo empezó el dolor, qué lo provoca y si hubo algún golpe reciente ayudará a la consulta.",
        },
      ],
    },
    {
      id: "mientras-esperas-tu-cita",
      title: "Mientras esperas tu cita",
      blocks: [
        {
          type: "list",
          items: [
            "Para aliviar el dolor, usa un medicamento de venta libre siguiendo la etiqueta del producto o el consejo de un farmacéutico.",
            "Come alimentos blandos y mastica por el lado contrario a la muela afectada.",
            "Evita comidas y bebidas muy frías, muy calientes o muy dulces.",
            "No fumes, porque puede retrasar la recuperación y empeorar la irritación.",
          ],
        },
        {
          type: "callout",
          tone: "alert",
          title: "Lo que no debes hacer",
          text: "No coloques aspirina directamente sobre la encía ni sobre la muela, porque puede quemar el tejido. En niños, no hagas enjuagues de agua salada sin la indicación del odontólogo.",
        },
      ],
    },
    {
      id: "cuando-pedir-cita-pronto",
      title: "Cuándo pedir cita pronto",
      blocks: [
        {
          type: "p",
          text: "Pide una cita dental cuanto antes si el dolor persiste o no responde al alivio del dolor. También conviene consultar si notas fiebre, dolor al morder, encía enrojecida, mal sabor de boca o pus.",
        },
        {
          type: "p",
          text: "Si notas hinchazón de la mejilla o de la mandíbula, no esperes a que el dolor se pase por sí solo. Comunícate con la clínica y explica tus síntomas.",
        },
      ],
    },
    {
      id: "signos-de-urgencia-medica",
      title: "Signos de urgencia médica",
      blocks: [
        {
          type: "callout",
          tone: "alert",
          title: "Acude a emergencias de inmediato",
          text: "Si tienes hinchazón cerca del ojo o del cuello, o dificultad para respirar, tragar o hablar, ve a un servicio de emergencias sin demora. No te quedes esperando una cita dental.",
        },
      ],
    },
    {
      id: "diente-permanente-caido",
      title: "Si se te cae un diente permanente",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Sujeta el diente por la corona, nunca por la raíz.",
            "Si está sucio, enjuágalo solo con agua y sin frotarlo.",
            "Intenta volver a colocarlo en su alvéolo con cuidado. Si no es posible, guárdalo en leche o dentro de la mejilla.",
            "Acude al odontólogo lo antes posible; en este caso el tiempo es decisivo.",
          ],
        },
        {
          type: "p",
          text: "En los dientes de leche que se caen no se suele intentar la recolocación. Es el odontólogo quien decide qué hacer en cada caso.",
        },
      ],
    },
    {
      id: "que-puede-seguir",
      title: "Qué puede seguir a la consulta",
      blocks: [
        {
          type: "p",
          text: "El tratamiento depende del diagnóstico. Puede tratarse de una restauración sencilla, de una endodoncia para conservar el diente o, en algunos casos, de una extracción. El odontólogo te explicará las opciones y sus alternativas antes de decidir.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Puedo esperar a que el dolor de muela se quite solo?",
      a: "Puede disminuir temporalmente, pero la causa suele seguir activa. Conviene una revisión para evitar que el problema avance.",
    },
    {
      q: "¿Qué hago si se me cae un diente permanente?",
      a: "Sujétalo por la corona, enjuágalo solo con agua si está sucio y procura reinsertarlo o guardarlo en leche. Acude al odontólogo cuanto antes.",
    },
    {
      q: "¿Cuándo debo ir a urgencias por una muela?",
      a: "Si hay hinchazón en la cara o el cuello, o dificultad para respirar, tragar o hablar, acude a un servicio de emergencias de inmediato.",
    },
  ],
  related: [
    { label: "Curaciones dentales", href: serviceHref("curaciones") },
    { label: "Endodoncia", href: serviceHref("endodoncia") },
    { label: "Extracción dental", href: serviceHref("extracciones") },
  ],
  coverServiceId: "curaciones",
  sources: [
    { label: "NHS: Toothache", url: "https://www.nhs.uk/conditions/toothache/" },
    {
      label: "American Association of Endodontists: Knocked-out teeth",
      url: "https://www.aae.org/patients/dental-symptoms/knocked-out-teeth/",
    },
  ],
  todo: [
    "Confirmar la guía de medicamentos de venta libre aplicable en Perú.",
    "Confirmar el canal de contacto de emergencias de la clínica.",
    "Confirmar el protocolo de atención para dientes permanentes caídos.",
  ],
};
