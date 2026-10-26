import type { TreatmentKey } from "@/lib/novias";

export const site = {
  name: "Lumayo",
  tagline: "Centro Odontológico",
  phoneDisplay: "946 788 123",
  phoneE164: "+51946788123",
  /** Opening hours (Mon–Fri, split shift). Single source for UI, JSON-LD and llms.txt. */
  hours: {
    days: "Lunes a viernes",
    daysShort: "Lun. a vie.",
    shifts: [
      { opens: "08:00", closes: "13:00" },
      { opens: "15:00", closes: "20:00" },
    ],
  },
  hoursDisplay: "Lun. a vie. 8:00 a. m. – 1:00 p. m. y 3:00 – 8:00 p. m.",
  /** One line per shift for footer and location. */
  hoursShiftLines: ["8:00 a. m. – 1:00 p. m.", "3:00 p. m. – 8:00 p. m."],
  whatsappNumber: "51946788123",
  address: {
    street: "Jr. Miraflores 230",
    district: "La Banda de Shilcayo",
    city: "Tarapoto",
    region: "San Martín",
    country: "PE",
  },
  mapsUrl:
    "https://www.google.com/maps/place/Lumayo+Centro+Odontol%C3%B3gico/@-6.4900813,-76.3540512,17z/data=!3m1!4b1!4m6!3m5!1s0x91ba0d8947d09025:0xa21f60bc22074614!8m2!3d-6.4900813!4d-76.3540512",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.249363660362!2d-76.3566261230975!3d-6.4900759634570155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ba0d8947d09025%3A0xa21f60bc22074614!2sLumayo%20Centro%20Odontol%C3%B3gico!5e0!3m2!1ses-419!2spe!4v1792375977932!5m2!1ses-419!2spe",
} as const;

/** Social proof figures. Leave a field undefined until the clinic provides real data; the strip hides missing ones. */
// TODO(SEO): fill with real data from the clinic / Google Business Profile
export const socialProof: {
  yearsOfExperience?: number;
  patientsServed?: number;
  googleRating?: number;
  googleReviewsCount?: number;
  googleReviewsUrl?: string;
} = {};

export const fullAddress =`${site.address.street}, ${site.address.district}, ${site.address.city}`;

/** Canonical origin for metadata, canonical URLs and the sitemap. */
// TODO(SEO): confirm production domain
export const siteUrl = "https://lumayo.pe";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hola Lumayo, quisiera agendar una cita.";
export const bracesWhatsappMessage =
  "Hola Lumayo, quisiera información sobre ortodoncia con brackets.";
export const lumayoCardWhatsappMessage =
  "Hola Lumayo, quisiera solicitar información sobre la Membresía Lumayo.";
export const noviasWhatsappMessage = "Hola Lumayo, quisiera información sobre el plan Lumayo Novias.";
export const kidsWhatsappMessage = "Hola Lumayo, quisiera reservar una primera visita para mi hijo o hija.";

/** Standalone program pages, outside /servicios. */
export const programPaths = { card: "/membresia", kids: "/kids", novias: "/novias" } as const;

/** Fees and limits per membership plan. `maxAdditional` counts additional members (titular not included). */
const plans = {
  classic: {
    label: "Clásica",
    annualFee: "S/ 125.00",
    /** Numeric form of `annualFee` for structured data (PEN). */
    annualFeeAmount: 125,
    reaffiliationFee: "S/ 100.00",
    maxAdditional: 3,
  },
  gold: {
    label: "Dorada",
    annualFee: "S/ 150.00",
    /** Numeric form of `annualFee` for structured data (PEN). */
    annualFeeAmount: 150,
    reaffiliationFee: "S/ 50.00",
    maxAdditional: 6,
  },
} as const;

export type CardPlanKey = keyof typeof plans;

// TODO: confirmar cifras, descuentos y beneficios con la clínica antes de publicar.
export const lumayoCard = {
  title: "Membresía Lumayo",
  description: `Es nuestra membresía de protección odontológica con descuentos preferenciales para el titular y sus adicionales: hasta ${plans.classic.maxAdditional} en la Clásica y ${plans.gold.maxAdditional} en la Dorada.`,
  // TODO: confirmar cobertura con la clínica
  heroHighlight: "Hasta 20% de descuento en tus tratamientos",
  plans,
  card: {
    whatsappDisplay: "975 225 531", // TODO: confirmar (difiere de site.phoneDisplay)
    domain: "lumayo.pe", // TODO: confirmar dominio
  },
  perks: [
    "Una consulta anual sin costo",
  ],
  formats: ["Tarjeta física en PVC", "Versión virtual", "Código QR único por cliente"],
  // TODO: confirmar que descuentos y beneficios sean iguales en ambos planes
  tiers: [
    {
      percent: "20%",
      title: "Cuidado esencial",
      items: ["Limpieza dental", "Blanqueamiento dental", "Curaciones simples"],
    },
    {
      percent: "15%",
      title: "Cirugía y especialidades",
      items: ["Cirugía de terceras molares", "Endodoncia", "Brackets (ortodoncia)", "Ortopedia"],
    },
    {
      percent: "10%",
      title: "Restauración y prótesis",
      items: [
        "Extracciones simples y complejas",
        "Carillas de resina",
        "Coronas",
        "Prótesis removibles",
        "Puente fijo",
      ],
    },
  ],
  steps: [
    {
      title: "Escríbenos o visítanos",
      description: "Consulta por WhatsApp o acércate a nuestro centro en Tarapoto.",
    },
    // TODO: confirmar proceso y documentos de afiliación
    // TODO: confirmar cómo se entrega la versión virtual (WhatsApp, correo u otro medio)
    {
      title: "Afíliate y recibe tu tarjeta",
      description: "Te registramos y recibes tu tarjeta de membresía en PVC o en versión virtual, con tu código QR único.",
    },
    {
      title: "Úsala desde el primer día",
      description: "Presenta tu tarjeta en cada visita y empieza a ahorrar.",
    },
  ],
  family: {
    // TODO: confirmar con la clínica (quiénes pueden ser adicionales, si comparten los mismos descuentos y cómo se registran)
    perks: [
      "Un solo costo anual para toda la familia",
      "Descuentos preferenciales para el titular y los adicionales",
      "Tú eliges a quiénes registrar",
    ],
    cta: "Registrar a mi familia",
  },
  faqs: [
    {
      q: "¿Quién puede usarla?",
      a: `El titular y los adicionales registrados en la misma membresía: hasta ${plans.classic.maxAdditional} en la Clásica y hasta ${plans.gold.maxAdditional} en la Dorada.`,
    },
    {
      q: "¿La tarjeta lleva mis datos y cómo funciona el código QR?",
      // TODO: confirmar para qué se usa el QR y cómo se entrega la versión virtual
      a: "No. La tarjeta no lleva datos personales impresos. Cada cliente recibe un código QR único, ya sea en su tarjeta física de PVC o en su versión virtual.",
    },
    {
      q: "¿Cuánto dura la membresía?",
      // TODO: confirmar vigencia exacta
      a: "Tiene vigencia anual desde su afiliación.",
    },
    {
      q: "¿Cómo la renuevo?",
      // TODO: confirmar condiciones de re-afiliación
      a: `Con la re-afiliación anual al vencer tu vigencia: ${plans.classic.reaffiliationFee} en la Clásica y ${plans.gold.reaffiliationFee} en la Dorada.`,
    },
    {
      q: "¿Se puede usar en todos los tratamientos?",
      // TODO: confirmar cobertura por tratamiento
      a: "Sí, con tres niveles de descuento: 20% en limpieza dental, blanqueamiento y curaciones simples; 15% en cirugía de terceras molares, endodoncia, brackets y ortopedia; y 10% en extracciones, carillas de resina, coronas, prótesis removibles y puentes fijos.",
    },
    {
      q: "¿Cómo la solicito?",
      a: `Escríbenos por WhatsApp al ${site.phoneDisplay} o visítanos en ${site.address.street}, ${site.address.district}.`,
    },
  ],
} as const;

// TODO: confirmar tratamientos, tiempos y condiciones del plan con la clínica antes de publicar.
export const lumayoNovias = {
  /** Must match ids in `services`. */
  treatmentIds: ["limpieza", "blanqueamiento", "carillas-porcelana", "brackets-convencionales", "diseno-de-sonrisa"],
  headline: "Sonríe sin pensar en la cámara",
  subheadline:
    "Un plan por etapas, hecho a tu medida, para que llegues a tu boda con la sonrisa que imaginaste.",
  // TODO: confirmar evaluación de cortesía vigente
  trustChips: ["Evaluación de cortesía para parejas", "Plan por etapas", "Atención en Tarapoto"],
  moments: [
    { title: "Ceremonia", description: "Sonríe con calma al decir el sí." },
    { title: "Fotos", description: "Una sonrisa que luce en cada retrato." },
    { title: "Brindis", description: "Celebra sin esconder la sonrisa." },
    { title: "Primer baile", description: "Disfruta cada instante con confianza." },
  ],
  personas: [
    {
      id: "novia",
      title: "Para la novia",
      description: "Un plan para llegar radiante a las fotos.",
      treatments: ["limpieza", "blanqueamiento", "diseno"] satisfies readonly TreatmentKey[],
    },
    {
      id: "novio",
      title: "Para el novio",
      description: "Una sonrisa sana y natural, sin complicaciones.",
      treatments: ["limpieza", "blanqueamiento", "ortodoncia"] satisfies readonly TreatmentKey[],
    },
    {
      id: "pareja",
      title: "Para la pareja",
      description: "Se evalúan juntos y se coordinan los tiempos.",
      treatments: ["limpieza", "blanqueamiento", "carillas"] satisfies readonly TreatmentKey[],
    },
  ],
  treatmentMeta: {
    blanqueamiento: {
      when: "Empieza 2 a 4 semanas antes",
      achieves: "Un tono más luminoso y parejo.",
    },
    "carillas-porcelana": {
      when: "Empieza 2 a 3 meses antes",
      achieves: "Forma, color y alineación en pocas citas.",
    },
    "brackets-convencionales": {
      when: "Empieza 6 a 12 meses antes o más",
      achieves: "Dientes alineados y una mordida estable.",
    },
    "diseno-de-sonrisa": {
      when: "Empieza 2 a 3 meses antes",
      achieves: "Una sonrisa en armonía con tu rostro.",
    },
    limpieza: {
      when: "Empieza 1 a 2 meses antes",
      achieves: "Encías sanas y dientes libres de sarro.",
    },
  },
  // TODO: confirmar tiempos con la clínica
  whiteningNote: "Si el blanqueamiento no alcanza el tono que buscas, las carillas son la alternativa.",
  // TODO: confirmar proceso con la clínica
  process: [
    {
      title: "Evaluación de cortesía",
      description: "Revisamos tu sonrisa y escuchamos lo que imaginas.",
    },
    {
      title: "Diagnóstico y presupuesto",
      description: "El especialista te entrega un plan y un presupuesto a tu medida.",
    },
    {
      title: "Tratamiento por etapas",
      description: "Avanzamos según tu cronograma, sin apuros.",
    },
    {
      title: "Retoque final",
      description: "Afinamos los detalles antes de tu boda.",
    },
  ],
  weekBefore: {
    title: "La semana antes de tu boda",
    // TODO: validar con el odontólogo
    tips: [
      "Evita alimentos y bebidas que manchan, como café, vino tinto y salsas oscuras, si te hiciste un blanqueamiento.",
      "Mantén un cepillado suave y constante, y usa hilo dental.",
      "Hidrata tus labios para sonreír con comodidad.",
      "Pregunta si conviene un retoque unos 3 o 4 días antes.",
    ],
  },
  // TODO: confirmar respuestas con la clínica
  faqs: [
    {
      q: "¿Cuánto cuestan los tratamientos?",
      a: "Primero hacemos un diagnóstico y luego el especialista te entrega un presupuesto a tu medida. Pregunta por la evaluación de cortesía para parejas.",
    },
    {
      q: "¿Con cuánta anticipación debo empezar?",
      a: "Lo ideal es consultar entre 6 y 12 meses antes, sobre todo si necesitas ortodoncia. Para blanqueamiento y limpieza bastan unas semanas.",
    },
    {
      q: "¿Con cuánto tiempo antes de la boda debo hacerme el blanqueamiento?",
      // TODO: confirmar tiempos con el odontólogo
      a: "El momento depende de tu tono de partida, del tratamiento que elijas y de tu agenda. Tu dentista lo define en la evaluación, con margen para retocar si hace falta. No podemos prometer un resultado concreto sin revisar tu caso.",
    },
    {
      q: "¿El blanqueamiento causa sensibilidad?",
      a: "Puede haber sensibilidad pasajera. Lo realizamos con productos profesionales y bajo control del odontólogo.",
    },
    {
      q: "¿El plan también es para novios?",
      a: "Sí. Puedes venir solo, sola o en pareja; armamos el plan según lo que necesite cada uno.",
    },
    {
      q: "¿Qué pasa si el blanqueamiento no alcanza el tono que busco?",
      a: "Si el tono que buscas no se logra con blanqueamiento, evaluamos carillas como alternativa.",
    },
    {
      q: "¿En qué orden se hacen los tratamientos?",
      a: "Primero la salud de las encías y la limpieza, luego ortodoncia, carillas y, al final, el blanqueamiento. En la evaluación ajustamos el orden a tu caso.",
    },
    {
      q: "¿Cómo reservo mi evaluación?",
      a: `Escríbenos por WhatsApp al ${site.phoneDisplay} o visítanos en ${fullAddress}.`,
    },
  ],
} as const;

// TODO: confirmar contenido de Lumayo Kids con la clínica y el odontopediatra antes de publicar.
export const lumayoKids = {
  /** Must match ids in `services`. */
  treatmentIds: ["odontopediatria", "sellantes", "fluor-barniz", "limpieza", "brackets-convencionales"],
  headline: "Sonrisas que empiezan bien",
  subheadline:
    "Una visita tranquila, con paciencia y juego, para que tu hijo o hija aprenda a cuidar su sonrisa desde bebé hasta la adolescencia.",
  // TODO: confirmar con la clínica
  trustChips: ["Primera visita sin apuros", "Atención con paciencia", "Papás acompañan la consulta"],
  // TODO: validar con el odontopediatra
  stages: [
    {
      age: "0 a 2 años",
      serviceId: "odontopediatria",
      title: "Primer diente y primera visita",
      tips: [
        "Limpia las encías con una gasa húmeda antes de que salga el primer diente.",
        "Cepilla el primer diente con una cantidad de pasta del tamaño de un grano de arroz.",
        "Agenda la primera visita cuando salga el primer diente o, a más tardar, al año de edad.",
      ],
    },
    {
      age: "3 a 5 años",
      serviceId: "fluor-barniz",
      title: "Dientes de leche y hábitos",
      tips: [
        "Supervisa el cepillado y ayuda a tu hijo a usar hilo dental cuando los dientes se tocan.",
        "Ofrece agua en lugar de jugos y bebidas azucaradas.",
        "Observa si chupa el dedo o el chupón y comenta el tema con el dentista.",
      ],
    },
    {
      age: "6 a 12 años",
      serviceId: "sellantes",
      title: "Muelas permanentes y sellantes",
      tips: [
        "Revisa la salida de las muelas permanentes, que suelen aparecer hacia los 6 años.",
        "Pregunta por sellantes para proteger los surcos de las muelas.",
        "Mantén las visitas periódicas para detectar caries a tiempo.",
      ],
    },
    {
      age: "13 a 17 años",
      serviceId: "brackets-convencionales",
      title: "Ortodoncia y cuidado en adolescentes",
      tips: [
        "Evalúa con el dentista si conviene iniciar ortodoncia.",
        "Cuida la higiene con brackets o alineadores, usando cepillo interdental.",
        "Mantén hábitos saludables frente a snacks y bebidas azucaradas.",
      ],
    },
  ],
  // TODO: confirmar proceso de la primera visita con la clínica
  firstVisit: {
    title: "Tu primera visita, paso a paso",
    steps: [
      {
        title: "Bienvenida y juego",
        description: "Conocemos a tu hijo con calma y le presentamos el consultorio de forma divertida.",
        icon: "smile" as const,
      },
      {
        title: "Revisión",
        description: "Miramos sus dientes y encías, y te explicamos lo que observamos.",
        icon: "tooth" as const,
      },
      {
        title: "Limpieza y flúor",
        description: "Limpiamos sus dientes y, si corresponde, aplicamos flúor para protegerlos.",
        icon: "clean" as const,
      },
      {
        title: "Consejos a los padres",
        description: "Te damos pautas sencillas de higiene y alimentación para hacer en casa.",
        icon: "chat" as const,
        forParents: true,
      },
    ],
  },
  // TODO: validar con el odontopediatra
  comfort: {
    title: "Una consulta sin miedo",
    points: [
      "Usamos el método decir-mostrar-hacer: explicamos, mostramos el instrumento y luego lo usamos.",
      "Elegimos palabras positivas en lugar de \"duele\" o \"inyección\".",
      "Los papás pueden acompañar a su hijo durante la consulta.",
      "El ritmo lo marca el niño: avanzamos cuando se siente listo.",
    ],
  },
  // TODO: validar con el odontopediatra
  homeCare: {
    title: "Cuidados en casa",
    // Neutral supporting line for parents. No figures.
    intro: "Pequeños hábitos de cada día protegen su sonrisa entre visitas.",
    tips: [
      { title: "Cepillado diario", text: "Cepilla los dientes dos veces al día, con supervisión en los más pequeños.", icon: "brush" },
      { title: "Hilo dental", text: "Usa hilo dental desde que dos dientes se tocan.", icon: "floss" },
      { title: "Menos azúcar", text: "Limita los dulces, snacks y bebidas azucaradas entre comidas.", icon: "sugar" },
      { title: "Biberón y descanso", text: "Evita dormir al niño con un biberón de leche o de jugo.", icon: "bottle" },
    ] as const,
  },
  // TODO: confirmar respuestas con la clínica
  faqs: [
    {
      q: "¿Cuándo debe ir mi hijo por primera vez al dentista?",
      a: "Lo recomendable es la primera visita cuando sale el primer diente, y a más tardar al año de edad.",
    },
    {
      q: "¿Qué pasa en la primera visita?",
      a: "Es una consulta tranquila: conocemos a tu hijo, revisamos sus dientes y encías, hacemos una limpieza y te damos consejos para casa.",
    },
    {
      q: "¿Puedo quedarme con mi hijo durante la consulta?",
      a: "Sí. Los papás pueden acompañar a sus hijos, según lo que el niño necesite en cada momento.",
    },
    {
      q: "Mi hijo tiene miedo al dentista, ¿qué hago?",
      a: "Cuéntanos antes de la visita. Trabajamos con paciencia, explicamos cada paso con palabras sencillas y dejamos que el niño marque el ritmo.",
    },
    {
      q: "¿Qué son los sellantes y el flúor?",
      a: "El flúor fortalece el esmalte y ayuda a prevenir la caries. Los sellantes cubren los surcos de las muelas, donde suele empezar la caries.",
    },
    {
      q: "¿Es normal que se caigan los dientes de leche antes de tiempo?",
      a: "No siempre es motivo de preocupación, pero si un diente de leche se cae antes de lo esperado, consulta con el dentista para revisarlo.",
    },
    {
      q: "¿Cómo reservo la primera visita?",
      a: `Escríbenos por WhatsApp al ${site.phoneDisplay} o visítanos en ${fullAddress}.`,
    },
  ],
} as const;

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

/** Category landing pages live at /servicios/<slug>. */
export const serviceCategories = [
  {
    id: "ortodoncia",
    slug: "ortodoncia",
    label: "Ortodoncia",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Brackets en Tarapoto: tipos y precios",
      description: "Brackets convencionales, cerámicos, autoligables, de zafiro, de porcelana, lingual e Invisalign en Tarapoto. Consulta por WhatsApp.",
      h1: "Ortodoncia y brackets en Tarapoto",
      intro: "Compara los tipos de brackets e Invisalign y elige el que mejor se adapte a tu caso, tras una evaluación previa.",
    },
  },
  {
    id: "estetica",
    slug: "estetica-dental",
    label: "Estética dental",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Diseño de sonrisa y blanqueamiento dental en Tarapoto",
      description: "Diseño de sonrisa y blanqueamiento dental en Tarapoto para mejorar el color y la armonía de tus dientes. Consulta por WhatsApp.",
      h1: "Diseño de sonrisa y blanqueamiento dental",
      intro: "Planifica una sonrisa en armonía con tu rostro y aclara el tono de tus dientes con tratamientos seguros.",
    },
  },
  {
    id: "carillas",
    slug: "carillas",
    label: "Carillas",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Carillas dentales: precio y tipos en Tarapoto",
      description: "Carillas dentales de resina, porcelana y zirconio en Tarapoto. Conoce el precio de cada tipo y consulta por WhatsApp.",
      h1: "Carillas dentales",
      intro: "Mejora el color, la forma y la alineación de tus dientes con carillas adaptadas a tu sonrisa.",
    },
  },
  {
    id: "prevencion",
    slug: "prevencion-dental",
    label: "Prevención dental",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Limpieza dental y profilaxis en Tarapoto",
      description: "Limpieza dental, profilaxis, destartraje y flúor dental en Tarapoto para cuidar tus dientes y prevenir caries.",
      h1: "Limpieza dental y prevención",
      intro: "Revisiones, limpieza y protección del esmalte para mantener tu boca sana durante todo el año.",
    },
  },
  {
    id: "restauracion",
    slug: "restauracion",
    label: "Restauración",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Endodoncia y curaciones dentales en Tarapoto",
      description: "Endodoncia, curaciones dentales y operatoria dental en Tarapoto para recuperar dientes dañados por caries o fracturas.",
      h1: "Endodoncia y curaciones dentales",
      intro: "Recupera la función y la forma de tus dientes con tratamientos de operatoria, curaciones y endodoncia.",
    },
  },
  {
    id: "cirugia",
    slug: "cirugia-y-protesis",
    label: "Cirugía y prótesis",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Extracción dental, implantes y prótesis dental en Tarapoto",
      description: "Extracción dental, implantes dentales y prótesis dental en Tarapoto, con evaluación previa. Consulta por WhatsApp.",
      h1: "Extracción dental, implantes y prótesis",
      intro: "Extracciones, implantes y prótesis removibles para reemplazar o retirar piezas dentales con seguridad.",
    },
  },
  {
    id: "ninos",
    slug: "ninos",
    label: "Niños",
    // TODO(SEO): confirm title/description/intro
    seo: {
      title: "Odontopediatras en Tarapoto",
      description: "Odontopediatras en Tarapoto: atención amable para bebés, niños y adolescentes en un ambiente tranquilo.",
      h1: "Odontopediatras en Tarapoto",
      intro: "Atención paciente y en un ambiente amable para que los más pequeños vivan una visita tranquila.",
    },
  },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];
export type ServiceCategoryId = ServiceCategory["id"];

/** Public sources behind the market price ranges shown on the orthodontics pages. */
export const priceSources = {
  cuantomecuesta: {
    label: "CuántoMeCuesta (abril 2026)",
    url: "https://cuantomecuesta.com/pe/ortodoncia-brackets/",
  },
  odontologiaperu: {
    label: "OdontologíaPerú (2026)",
    url: "https://odontologiaperu.com/en/blog/brackets-in-peru-2026-updated-prices-and-comparison/",
  },
} as const;

export type PriceSourceId = keyof typeof priceSources;

export type Service = {
  id: string;
  /** Kebab-case URL segment, unique within its category. */
  slug: string;
  name: string;
  description: string;
  icon: ServiceIcon;
  category: ServiceCategoryId;
  /** Cover photo for the service card. */
  image: string;
  featured?: boolean;
  /** Button label on the featured card. */
  cta?: string;
  /** Orthodontics comparison data, shown on /servicios/ortodoncia. Only set on bracket and aligner services. */
  ortho?: {
    visibility: "Visible" | "Discreto" | "Casi invisible" | "Invisible";
    /** General range, e.g. "12 a 24 meses"; the actual duration depends on the case. */
    typicalMonths: string;
    /** Starting price in PEN. Leave undefined until the clinic confirms it; never invent one. */
    priceFrom?: number;
    /** Market reference range in PEN for Peru (not Lumayo's price), with its public source. */
    marketRange: {
      min: number;
      max: number;
      sourceId: PriceSourceId;
      /** Optional qualifier, e.g. "en provincia". */
      note?: string;
    };
  };
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
  // TODO(SEO): review copy
  {
    id: "brackets-convencionales",
    slug: "brackets-convencionales",
    name: "Brackets convencionales",
    description:
      "Alinea tus dientes y mejora tu mordida con un plan de tratamiento hecho a tu medida.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1584434081454-2a898b8e33d5"),
    ortho: {
      visibility: "Visible",
      typicalMonths: "12 a 24 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 2500, max: 4000, sourceId: "cuantomecuesta", note: "en provincia" },
    },
    details: {
      summary:
        "Los brackets metálicos convencionales corrigen la posición de los dientes y la mordida de forma gradual. Antes de empezar evaluamos tu caso y te explicamos el plan, la duración estimada y los controles que necesitarás.",
      idealFor: "Adolescentes, jóvenes y adultos con dientes apiñados, separados o con problemas de mordida.",
      includes: [
        "Evaluación y diagnóstico de tu caso",
        "Plan de tratamiento personalizado",
        "Instalación de brackets metálicos",
        "Controles periódicos de ajuste",
      ],
    },
    featured: true,
    cta: "Quiero mis brackets convencionales",
  },
  // TODO(SEO): review copy
  {
    id: "brackets-ceramicos",
    slug: "brackets-ceramicos",
    name: "Brackets cerámicos",
    description: "Brackets de color parecido al diente, una alternativa más discreta a los metálicos.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1606811841689-23dfddce3e95"),
    ortho: {
      visibility: "Discreto",
      typicalMonths: "12 a 24 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 3500, max: 6000, sourceId: "odontologiaperu" },
    },
    details: {
      summary:
        "Los brackets cerámicos están fabricados con un material de color parecido al del diente, por lo que se notan menos durante el tratamiento. Evaluamos tu caso para confirmar si son una buena opción para ti.",
      idealFor: "Personas que buscan una opción más discreta sin dejar de corregir su mordida.",
      includes: [
        "Evaluación y diagnóstico de tu caso",
        "Elección del bracket cerámico adecuado",
        "Instalación de brackets cerámicos",
        "Controles periódicos de ajuste",
      ],
    },
  },
  // TODO(SEO): review copy
  {
    id: "brackets-autoligables",
    slug: "brackets-autoligables",
    name: "Brackets autoligables",
    description: "Brackets con un clip integrado que sujeta el arco sin necesidad de ligaduras elásticas.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1609840114035-3c981b782dfe"),
    ortho: {
      visibility: "Visible",
      typicalMonths: "12 a 24 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 4500, max: 7000, sourceId: "odontologiaperu" },
    },
    details: {
      summary:
        "Los brackets autoligables sujetan el arco con un mecanismo integrado, en lugar de ligaduras elásticas o metálicas. Esto puede simplificar los controles, según el plan de cada caso.",
      idealFor: "Personas que prefieren un sistema con menos ligaduras y que se adapte a su plan de tratamiento.",
      includes: [
        "Evaluación y diagnóstico de tu caso",
        "Plan de tratamiento personalizado",
        "Instalación de brackets autoligables",
        "Controles periódicos de ajuste",
      ],
    },
  },
  // TODO(SEO): review copy
  {
    id: "brackets-zafiro",
    slug: "brackets-de-zafiro",
    name: "Brackets de zafiro",
    description: "Brackets transparentes de zafiro sintético, casi imperceptibles en tu sonrisa.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1629909613654-28e377c37b09"),
    ortho: {
      visibility: "Discreto",
      typicalMonths: "12 a 24 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 5500, max: 10000, sourceId: "cuantomecuesta" },
    },
    details: {
      summary:
        "Los brackets de zafiro están hechos de un material cristalino y transparente, por lo que se integran con el color natural del diente. Antes de elegirlos, revisamos tu caso y te explicamos sus ventajas y cuidados.",
      idealFor: "Personas que buscan un tratamiento discreto y con un acabado estético.",
      includes: [
        "Evaluación de tu caso y elección del material",
        "Plan de tratamiento personalizado",
        "Instalación de brackets de zafiro",
        "Controles periódicos y cuidados",
      ],
    },
  },
  // TODO(SEO): review copy
  {
    id: "brackets-porcelana",
    slug: "brackets-de-porcelana",
    name: "Brackets de porcelana",
    description: "Brackets de porcelana con acabado liso y color natural para un tratamiento discreto.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1581595220892-b0739db3ba8c"),
    ortho: {
      visibility: "Discreto",
      typicalMonths: "12 a 24 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 3500, max: 6000, sourceId: "odontologiaperu" },
    },
    details: {
      summary:
        "Los brackets de porcelana tienen un acabado liso y un color natural, y se usan en pacientes que buscan un aspecto estético durante el tratamiento. Los evaluamos en tu consulta para confirmar si son adecuados para tu caso.",
      idealFor: "Personas que buscan un acabado estético y discreto durante la ortodoncia.",
      includes: [
        "Evaluación y diagnóstico de tu caso",
        "Plan de tratamiento personalizado",
        "Instalación de brackets de porcelana",
        "Controles periódicos de ajuste",
      ],
    },
  },
  // TODO(SEO): review copy
  {
    id: "ortodoncia-lingual",
    slug: "ortodoncia-lingual",
    name: "Ortodoncia lingual",
    description: "Brackets colocados en la cara interna de los dientes, sin que se vean desde afuera.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1607613009820-a29f7bb81c04"),
    ortho: {
      visibility: "Invisible",
      typicalMonths: "18 a 30 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 8000, max: 12000, sourceId: "odontologiaperu" },
    },
    details: {
      summary:
        "La ortodoncia lingual coloca los brackets en la cara interna de los dientes, por lo que no son visibles al sonreír. Requiere una planificación individual y, en algunos casos, piezas fabricadas a medida.",
      idealFor: "Personas que quieren corregir su mordida sin que el tratamiento sea visible.",
      includes: [
        "Evaluación y planificación individual",
        "Toma de registros digitales o modelos",
        "Instalación de brackets en la cara interna",
        "Controles periódicos de ajuste",
      ],
    },
  },
  // TODO(SEO): review copy
  // TODO(SEO): confirm Lumayo is a certified Invisalign provider; otherwise rename to "Alineadores invisibles"
  {
    id: "invisalign",
    slug: "invisalign",
    name: "Invisalign",
    description: "Alineadores transparentes y removibles que mueven tus dientes de forma gradual.",
    icon: "braces",
    category: "ortodoncia",
    image: servicePhoto("photo-1677026010083-78ec7f1b84ed"),
    ortho: {
      visibility: "Casi invisible",
      typicalMonths: "12 a 18 meses", // TODO(SEO): confirm with the dentist
      priceFrom: undefined, // TODO(SEO): confirm price with the clinic
      // TODO(SEO): replace with Lumayo's price when the clinic confirms
      marketRange: { min: 8000, max: 15000, sourceId: "odontologiaperu" },
    },
    details: {
      summary:
        "Los alineadores transparentes son piezas removibles que se cambian cada cierto tiempo para mover los dientes de forma gradual. El plan y la duración se definen en la evaluación de cada caso.",
      idealFor: "Personas que buscan un tratamiento discreto y removible, con indicación previa.",
      includes: [
        "Evaluación digital de tu caso",
        "Plan de alineadores personalizado",
        "Entrega de alineadores y calendario de cambio",
        "Controles periódicos de seguimiento",
      ],
    },
  },
  {
    id: "blanqueamiento",
    slug: "blanqueamiento-dental",
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
    id: "diseno-de-sonrisa",
    slug: "diseno-de-sonrisa",
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
    slug: "carillas-de-resina",
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
    slug: "carillas-de-porcelana",
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
    slug: "carillas-de-zirconio",
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
    slug: "carillas-de-disilicato-de-litio",
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
    slug: "carillas-ultrafinas",
    name: "Carillas ultrafinas",
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
    id: "limpieza",
    slug: "limpieza-dental",
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
    slug: "fluor-barniz",
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
    slug: "fluor-en-gel",
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
    slug: "sellantes-de-fosas-y-fisuras",
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
    slug: "operatoria-dental",
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
    slug: "curaciones-dentales",
    name: "Curaciones dentales",
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
    slug: "endodoncia",
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
    slug: "extraccion-dental",
    name: "Extracción dental",
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
    slug: "extraccion-de-la-muela-del-juicio",
    name: "Extracción de la muela del juicio",
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
    slug: "implantes-dentales",
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
    slug: "protesis-dental",
    name: "Prótesis dental",
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
    slug: "odontopediatria",
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

/** Single source of truth for service URLs: /servicios/<category>/<service>. */
export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function categoryOf(service: Service): ServiceCategory {
  const category = serviceCategories.find((c) => c.id === service.category);
  if (!category) throw new Error(`Unknown service category: ${service.category}`);
  return category;
}

export function getServiceBySlugs(categoriaSlug: string, servicioSlug: string): Service | undefined {
  const category = getCategoryBySlug(categoriaSlug);
  if (!category) return undefined;
  return services.find((s) => s.category === category.id && s.slug === servicioSlug);
}

export function servicesInCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category.id);
}

export const categoryPath = (category: ServiceCategory) => `/servicios/${category.slug}`;

export const servicePath = (service: Service) => `/servicios/${categoryOf(service).slug}/${service.slug}`;

/** Path for a service known only by its internal id (used in static blog and content data). */
export function serviceHref(serviceId: string): string {
  const service = services.find((s) => s.id === serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);
  return servicePath(service);
}

/** Visible name for a service known only by its internal id (used in static copy and data). */
export function serviceName(serviceId: string): string {
  const service = services.find((s) => s.id === serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);
  return service.name;
}

export const bookingServiceOptions = [
  "Brackets",
  "Evaluación general",
  "Limpieza dental",
  "Carillas",
  "Diseño de sonrisa",
  "Blanqueamiento dental",
  "Curaciones / operatoria dental",
  "Endodoncia",
  "Extracción dental",
  "Implantes dentales",
  "Prótesis dental",
  "Flúor y sellantes",
  "Odontopediatría",
  "Otro / no estoy seguro",
] as const;
