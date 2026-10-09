export const site = {
  name: "Lumayo",
  tagline: "Centro Odontológico",
  phoneDisplay: "946 788 123",
  phoneE164: "+51946788123",
  whatsappNumber: "51946788123",
  address: {
    street: "Jr. Miraflores 230",
    district: "La Banda de Shilcayo",
    city: "Tarapoto",
    region: "San Martín",
    country: "PE",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jr.+Miraflores+230+La+Banda+de+Shilcayo+Tarapoto",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Jr.+Miraflores+230,+La+Banda+de+Shilcayo,+Tarapoto,+Per%C3%BA&output=embed",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city}`;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hola Lumayo, quisiera agendar una cita.";
export const bracesWhatsappMessage =
  "Hola Lumayo, quisiera información sobre ortodoncia con brackets.";

export type ServiceIcon =
  | "braces"
  | "sparkle"
  | "veneer"
  | "smile"
  | "clean"
  | "drop"
  | "tray"
  | "shield"
  | "tooth"
  | "filling"
  | "root"
  | "extract"
  | "wisdom"
  | "implant"
  | "denture"
  | "child";

export const serviceCategories = [
  { id: "estetica", label: "Ortodoncia y estética" },
  { id: "carillas", label: "Carillas" },
  { id: "prevencion", label: "Prevención" },
  { id: "restauracion", label: "Restauración" },
  { id: "cirugia", label: "Cirugía y prótesis" },
  { id: "ninos", label: "Niños" },
] as const;

export type ServiceCategoryId = (typeof serviceCategories)[number]["id"];

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: ServiceIcon;
  category: ServiceCategoryId;
  /** Cover photo for the service card. */
  image: string;
  featured?: boolean;
  /** Button label on the featured card. */
  cta?: string;
  /** Extended copy for the service's detail dialog. */
  details: {
    summary: string;
    idealFor: string;
    includes: string[];
  };
};

/**
 * Stock photo from Unsplash (Unsplash License: free for commercial use).
 * Replace with the clinic's own photos when available.
 */
const servicePhoto = (id: string) => `https://images.unsplash.com/${id}?w=1200&h=900&fit=crop&crop=entropy&q=80&auto=format`;

export const services: Service[] = [
  {
    id: "ortodoncia",
    name: "Ortodoncia con brackets",
    description:
      "Alinea tus dientes y mejora tu mordida con un plan de tratamiento hecho a tu medida.",
    icon: "braces",
    category: "estetica",
    image: servicePhoto("photo-1584434081454-2a898b8e33d5"),
    details: {
      summary:
        "Los brackets corrigen la posición de los dientes y la mordida de forma gradual. Antes de empezar evaluamos tu caso y te explicamos el plan, la duración estimada y los controles que necesitarás.",
      idealFor: "Adolescentes, jóvenes y adultos con dientes apiñados, separados o con problemas de mordida.",
      includes: [
        "Evaluación y diagnóstico de tu caso",
        "Plan de tratamiento personalizado",
        "Instalación de brackets",
        "Controles periódicos de ajuste",
      ],
    },
    featured: true,
    cta: "Quiero mis brackets",
  },
  {
    id: "diseno-de-sonrisa",
    name: "Diseño de sonrisa",
    description: "Planificamos la forma, el color y la proporción de tus dientes para una sonrisa en armonía con tu rostro.",
    icon: "smile",
    category: "estetica",
    featured: true,
    cta: "Quiero mi diseño de sonrisa",
    image: servicePhoto("photo-1677026010083-78ec7f1b84ed"),
    details: {
      summary:
        "Analizamos tu rostro, tus labios y tus dientes para proponerte una sonrisa armónica. Combinamos tratamientos como carillas, blanqueamiento o resinas según lo que necesites.",
      idealFor: "Personas que quieren mejorar el color, la forma o la proporción de sus dientes.",
      includes: [
        "Análisis estético de tu sonrisa",
        "Propuesta de tratamiento a tu medida",
        "Combinación de tratamientos estéticos",
        "Seguimiento del resultado",
      ],
    },
  },
  {
    id: "carillas-resina",
    name: "Carillas de resina",
    description: "Una opción rápida y accesible para mejorar el color y la forma de tus dientes en pocas sesiones.",
    icon: "veneer",
    category: "carillas",
    image: servicePhoto("photo-1663182234283-28941e7612da"),
    details: {
      summary:
        "Se moldean directamente sobre el diente con resina del color de tu esmalte. Permiten corregir manchas, pequeñas fracturas o espacios en poco tiempo.",
      idealFor: "Quienes buscan un cambio estético rápido y con una inversión menor.",
      includes: [
        "Evaluación de tus dientes",
        "Selección del tono de resina",
        "Modelado y pulido de cada carilla",
        "Indicaciones de cuidado",
      ],
    },
  },
  {
    id: "carillas-porcelana",
    name: "Carillas de porcelana",
    description: "Resistentes y de brillo natural, mantienen su color con el paso de los años.",
    icon: "veneer",
    category: "carillas",
    image: servicePhoto("photo-1769559893692-c6d0623bf8e4"),
    details: {
      summary:
        "Son láminas de porcelana elaboradas a medida que se adhieren a la cara visible del diente. Ofrecen un acabado muy natural y conservan su color con el tiempo.",
      idealFor: "Personas que buscan un resultado estético duradero y con brillo natural.",
      includes: [
        "Evaluación y planificación",
        "Toma de medidas",
        "Elaboración a medida",
        "Cementado y controles",
      ],
    },
  },
  {
    id: "carillas-zirconio",
    name: "Carillas de zirconio",
    description: "Gran resistencia para cubrir dientes oscuros, manchados o con desgaste.",
    icon: "veneer",
    category: "carillas",
    image: servicePhoto("photo-1670250492416-570b5b7343b1"),
    details: {
      summary:
        "El zirconio es un material de alta resistencia que permite cubrir dientes oscuros o con desgaste, manteniendo una apariencia estética.",
      idealFor: "Casos con dientes manchados u oscuros, o que necesitan mayor resistencia.",
      includes: [
        "Evaluación y planificación",
        "Toma de medidas",
        "Elaboración a medida",
        "Cementado y controles",
      ],
    },
  },
  {
    id: "carillas-disilicato",
    name: "Carillas de disilicato de litio",
    description: "Estética y translucidez muy parecidas al esmalte natural, con excelente durabilidad.",
    icon: "veneer",
    category: "carillas",
    image: servicePhoto("photo-1661438818937-437f1aeaf08e"),
    details: {
      summary:
        "El disilicato de litio es una cerámica con gran translucidez, muy parecida al esmalte natural, que combina estética y buena resistencia.",
      idealFor: "Quienes priorizan un resultado natural y una carilla resistente.",
      includes: [
        "Evaluación y planificación",
        "Toma de medidas",
        "Elaboración a medida",
        "Cementado y controles",
      ],
    },
  },
  {
    id: "carillas-ultrafinas",
    name: "Carillas ultrafinas sin tallado",
    description: "Láminas finas como lentes de contacto que se colocan sin desgastar tus dientes.",
    icon: "veneer",
    category: "carillas",
    image: servicePhoto("photo-1660300110427-c4a6efdf18b5"),
    details: {
      summary:
        "Son láminas muy delgadas, como lentes de contacto, que se colocan sobre el diente sin desgastarlo o con un desgaste mínimo. En la evaluación confirmamos si eres candidato.",
      idealFor: "Personas con dientes bien posicionados que quieren mejorar el color o la forma conservando su esmalte.",
      includes: [
        "Evaluación para confirmar si eres candidato",
        "Diseño de las láminas",
        "Colocación sin tallado o con tallado mínimo",
        "Indicaciones de cuidado",
      ],
    },
  },
  {
    id: "blanqueamiento",
    name: "Blanqueamiento dental",
    description: "Aclara el tono de tus dientes de forma segura y luce una sonrisa más luminosa.",
    icon: "sparkle",
    category: "estetica",
    image: servicePhoto("photo-1654373535457-383a0a4d00f9"),
    details: {
      summary:
        "Aclaramos el tono de tus dientes con productos profesionales y bajo control del odontólogo, cuidando la sensibilidad y la salud de tus encías.",
      idealFor: "Personas con dientes amarillentos o manchados por café, té, vino o tabaco.",
      includes: [
        "Evaluación previa",
        "Registro del tono inicial",
        "Aplicación del gel blanqueador",
        "Recomendaciones para mantener el resultado",
      ],
    },
  },
  {
    id: "limpieza",
    name: "Limpieza dental",
    description: "Retiramos el sarro y las manchas para mantener tus encías sanas y tu boca fresca.",
    icon: "clean",
    category: "prevencion",
    image: servicePhoto("photo-1766338390573-ec092d69cdcb"),
    details: {
      summary:
        "Retiramos la placa bacteriana y el sarro que el cepillado no elimina, y pulimos tus dientes. Es la base para prevenir la caries y las enfermedades de las encías.",
      idealFor: "Todas las personas. Se recomienda hacerla de forma periódica.",
      includes: [
        "Revisión de dientes y encías",
        "Retiro de sarro y placa",
        "Pulido dental",
        "Consejos de higiene en casa",
      ],
    },
  },
  {
    id: "fluor-barniz",
    name: "Flúor barniz",
    description: "Una capa protectora que fortalece el esmalte y ayuda a prevenir la caries.",
    icon: "drop",
    category: "prevencion",
    image: servicePhoto("photo-1758205307836-0829c799890b"),
    details: {
      summary:
        "Aplicamos una fina capa de barniz con flúor sobre los dientes. Es rápida, indolora y ayuda a fortalecer el esmalte frente a la caries.",
      idealFor: "Niños y adultos con riesgo de caries.",
      includes: [
        "Limpieza y secado de los dientes",
        "Aplicación del barniz",
        "Indicaciones posteriores",
      ],
    },
  },
  {
    id: "fluor-gel",
    name: "Flúor en gel",
    description: "Aplicación con cubetas que refuerza el esmalte de niños y adultos.",
    icon: "tray",
    category: "prevencion",
    image: servicePhoto("photo-1758205308172-fc864545dcf7"),
    details: {
      summary:
        "Colocamos gel con flúor en cubetas que se ajustan a tus dientes durante unos minutos para reforzar el esmalte.",
      idealFor: "Niños y adultos que necesitan reforzar su protección contra la caries.",
      includes: [
        "Revisión previa",
        "Aplicación con cubetas",
        "Indicaciones posteriores",
      ],
    },
  },
  {
    id: "sellantes",
    name: "Sellantes de fosas y fisuras",
    description: "Protegen las muelas sellando los surcos donde suele empezar la caries.",
    icon: "shield",
    category: "prevencion",
    image: servicePhoto("photo-1653508310895-62141575a3a9"),
    details: {
      summary:
        "Las muelas tienen surcos donde se acumulan restos de comida. El sellante es un material fluido que los cubre y deja una superficie lisa y fácil de limpiar.",
      idealFor: "Sobre todo niños con muelas permanentes recién salidas.",
      includes: [
        "Revisión de las muelas",
        "Limpieza de los surcos",
        "Aplicación y endurecimiento del sellante",
      ],
    },
  },
  {
    id: "operatoria",
    name: "Operatoria dental",
    description: "Restauramos dientes con caries, desgaste o fracturas con resinas del color natural.",
    icon: "tooth",
    category: "restauracion",
    image: servicePhoto("photo-1606811971618-4486d14f3f99"),
    details: {
      summary:
        "Es la especialidad que repara los dientes afectados por caries, fracturas o desgaste, y les devuelve su forma y su función con materiales del color natural.",
      idealFor: "Personas con caries, dientes rotos o desgastados, o restauraciones antiguas en mal estado.",
      includes: [
        "Diagnóstico del diente afectado",
        "Retiro del tejido dañado",
        "Restauración con resina",
        "Ajuste de la mordida y pulido",
      ],
    },
  },
  {
    id: "curaciones",
    name: "Curaciones",
    description: "Detenemos la caries a tiempo y devolvemos al diente su forma y su función.",
    icon: "filling",
    category: "restauracion",
    image: servicePhoto("photo-1777793389944-f7165259a05c"),
    details: {
      summary:
        "Cuando la caries se detecta a tiempo, basta con limpiar la zona afectada y rellenarla. Así evitamos que avance y requiera tratamientos más complejos.",
      idealFor: "Personas con caries pequeñas o medianas, o con sensibilidad al frío o al dulce.",
      includes: [
        "Revisión y diagnóstico",
        "Anestesia local si es necesaria",
        "Limpieza de la caries",
        "Relleno con resina del color del diente",
      ],
    },
  },
  {
    id: "endodoncia",
    name: "Endodoncia",
    description: "Tratamiento de conducto para aliviar el dolor y conservar tu diente natural.",
    icon: "root",
    category: "restauracion",
    image: servicePhoto("photo-1657470179447-0f5aa16daa91"),
    details: {
      summary:
        "Cuando la infección llega al nervio del diente, limpiamos y sellamos sus conductos internos. Así eliminamos el dolor y conservamos tu diente natural.",
      idealFor: "Personas con dolor intenso, infección o un diente muy dañado que aún puede conservarse.",
      includes: [
        "Diagnóstico con radiografía",
        "Anestesia local",
        "Limpieza y sellado de conductos",
        "Indicaciones para la restauración final",
      ],
    },
  },
  {
    id: "extracciones",
    name: "Extracciones simples",
    description: "Retiramos piezas dañadas de forma segura, con anestesia y cuidado en todo momento.",
    icon: "extract",
    category: "cirugia",
    image: servicePhoto("photo-1588776814546-daab30f310ce"),
    details: {
      summary:
        "Retiramos los dientes que ya no pueden recuperarse, con anestesia local y técnicas que cuidan tu comodidad y una buena cicatrización.",
      idealFor: "Dientes muy dañados, con movilidad o restos de raíces.",
      includes: [
        "Evaluación previa",
        "Anestesia local",
        "Extracción cuidadosa",
        "Indicaciones de cuidado posterior",
      ],
    },
  },
  {
    id: "muelas-del-juicio",
    name: "Extracción de muelas del juicio",
    description: "Evaluamos y retiramos las muelas del juicio que causan dolor o molestias.",
    icon: "wisdom",
    category: "cirugia",
    image: servicePhoto("photo-1777445374290-eedda5be8e5b"),
    details: {
      summary:
        "A veces las muelas del juicio no tienen espacio para salir y causan dolor, inflamación o desplazan otros dientes. Evaluamos su posición y te indicamos si conviene retirarlas.",
      idealFor: "Personas con dolor, inflamación o muelas del juicio mal posicionadas.",
      includes: [
        "Evaluación con radiografía",
        "Plan según la posición de la muela",
        "Extracción con anestesia local",
        "Controles de cicatrización",
      ],
    },
  },
  {
    id: "implantes",
    name: "Implantes dentales",
    description: "Reemplaza piezas perdidas con una solución fija, firme y de aspecto natural.",
    icon: "implant",
    category: "cirugia",
    image: servicePhoto("photo-1771442873035-474765b40ac6"),
    details: {
      summary:
        "Un implante reemplaza la raíz de un diente perdido y sobre él se coloca una corona. Es una solución fija que se ve y se siente natural.",
      idealFor: "Personas que perdieron uno o varios dientes y buscan una solución fija.",
      includes: [
        "Evaluación y estudios previos",
        "Plan de tratamiento",
        "Colocación del implante",
        "Corona definitiva y controles",
      ],
    },
  },
  {
    id: "protesis",
    name: "Prótesis removibles",
    description: "Recupera la función y la estética de tu sonrisa con prótesis cómodas y bien ajustadas.",
    icon: "denture",
    category: "cirugia",
    image: servicePhoto("photo-1612736777093-461fb48101d7"),
    details: {
      summary:
        "Las prótesis removibles reemplazan varios dientes perdidos y puedes retirarlas para limpiarlas. Las elaboramos a tu medida para que sean cómodas y estables.",
      idealFor: "Personas que perdieron varios o todos sus dientes.",
      includes: [
        "Evaluación y toma de medidas",
        "Prueba y ajustes",
        "Entrega de la prótesis",
        "Controles de adaptación",
      ],
    },
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    description: "Atención amable y paciente para que los más pequeños vivan una visita tranquila.",
    icon: "child",
    category: "ninos",
    image: servicePhoto("photo-1733817336090-04082ff6ab4f"),
    details: {
      summary:
        "Atendemos a los más pequeños con paciencia y en un ambiente amable, para que su visita al dentista sea una experiencia positiva desde el inicio.",
      idealFor: "Bebés, niños y adolescentes.",
      includes: [
        "Revisión y prevención",
        "Flúor y sellantes",
        "Curaciones en dientes de leche",
        "Consejos para padres",
      ],
    },
  },
];

export const bookingServiceOptions = [
  "Ortodoncia con brackets",
  "Evaluación general",
  "Limpieza dental",
  "Carillas",
  "Diseño de sonrisa",
  "Blanqueamiento dental",
  "Curaciones / operatoria dental",
  "Endodoncia",
  "Extracciones",
  "Implantes dentales",
  "Prótesis removibles",
  "Flúor y sellantes",
  "Odontopediatría",
  "Otro / no estoy seguro",
] as const;
