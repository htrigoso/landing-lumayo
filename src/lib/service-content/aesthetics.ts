import type { ServiceContent } from "@/lib/service-content/types";

const MOUTHHEALTHY_VENEERS = "https://www.mouthhealthy.org/all-topics-a-z/veneers";
const DOAJ_CERAMICS = "https://doaj.org/article/430e90bc98564c6daace2fe187877d73";

export const aestheticsContent: Record<string, ServiceContent> = {
  "ortodoncia": {
    related: ["diseno-de-sonrisa", "blanqueamiento", "limpieza"],
    program: "novias",
    whenItHelps: [
      "Dientes apiñados o con separaciones que se quieren corregir",
      "Problemas de mordida, como sobremordida, mordida cruzada o mordida invertida",
      "Alineación previa a otros tratamientos estéticos",
    ],
    howItWorks: [
      "Evaluación inicial con fotografías, radiografías y, si aplica, escaneo digital.",
      "Plan de tratamiento y elección del tipo de brackets, metálicos o estéticos.",
      "Colocación de los brackets unidos al diente, con un arco que se ajusta de forma periódica.",
      "Controles y ajustes periódicos para guiar el movimiento de los dientes.",
      "Retiro de los brackets y colocación de retenedores para sostener el resultado.",
    ],
    benefits: [
      "Mejora la alineación y la relación entre las piezas dentales",
      "Puede mejorar la función masticatoria cuando hay problemas de mordida",
      "Sirve de base para otros tratamientos estéticos o restauradores",
    ],
    consider: [
      "Requiere citas periódicas y constancia en la higiene diaria",
      "Los brackets retienen placa alrededor de las piezas y exigen una limpieza cuidadosa",
      "La duración suele variar según cada caso, y casi siempre se necesita una fase de retención posterior",
    ],
    aftercare: [
      "Usar los retenedores según la indicación del dentista para mantener el resultado",
      "Reforzar la higiene alrededor de los brackets",
      "Evitar alimentos duros o pegajosos que puedan despegar los brackets",
      "Acudir a los controles programados y seguir las indicaciones del dentista",
    ],
    faqs: [
      {
        q: "¿Los brackets duelen?",
        a: "Es habitual sentir molestia o presión durante los primeros días después de cada ajuste. Suele disminuir con el tiempo, y el dentista puede indicar medidas para aliviarla.",
      },
      {
        q: "¿Se necesita retenedor después del tratamiento?",
        a: "En general sí. El retenedor ayuda a mantener la posición de los dientes una vez retirados los brackets.",
      },
      {
        q: "¿Existen opciones más discretas?",
        a: "Existen brackets estéticos fabricados con otros materiales. Cada tipo tiene diferencias en resistencia y mantenimiento, y el dentista puede explicarlas.",
      },
    ],
    todo: [
      "Tipos de bracket que ofrece la clínica (metálicos, estéticos, de otros materiales)",
      "Si la clínica utiliza escaneo digital o trabaja principalmente con radiografías y fotografías",
      "Protocolo de controles y frecuencia de ajustes",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: "https://www.mouthhealthy.org/all-topics-a-z/braces" },
      { label: "NHS: ortodoncia (en inglés)", url: "https://www.nhs.uk/conditions/orthodontics/" },
    ],
  },

  "diseno-de-sonrisa": {
    related: ["carillas-porcelana", "ortodoncia", "blanqueamiento"],
    program: "novias",
    whenItHelps: [
      "Cuando se quiere planificar un cambio estético antes de decidir qué tratamiento hacer",
      "Para visualizar una propuesta de sonrisa antes de comenzar",
      "Cuando un caso combina varios procedimientos, como carillas y ortodoncia",
    ],
    howItWorks: [
      "Análisis del rostro, los labios, las encías y los dientes.",
      "Toma de fotografías, escaneos o registros digitales.",
      "Simulación digital o prueba provisional (mock-up) como guía visual.",
      "Ajustes del plan junto con la persona paciente.",
      "Definición de los tratamientos necesarios para ejecutarlo.",
    ],
    benefits: [
      "Permite revisar una propuesta antes de comprometerse con un tratamiento",
      "Ayuda a coordinar varios procedimientos dentro de un mismo plan",
      "Facilita comunicar expectativas entre paciente y dentista",
    ],
    consider: [
      "La simulación es una guía y el resultado final puede diferir",
      "Por sí solo no modifica la posición ni la forma de los dientes; se ejecuta con otros procedimientos",
      "Es un proceso de planificación que puede requerir varias citas",
    ],
    aftercare: [
      "Seguir las indicaciones del dentista para los tratamientos que se realicen después",
      "Revisar el plan y resolver las dudas antes de iniciar cualquier procedimiento",
      "Mantener los controles habituales de salud bucal",
    ],
    faqs: [
      {
        q: "¿El diseño de sonrisa es un tratamiento?",
        a: "No, es una planificación. Sirve para definir qué procedimientos podrían ayudar a alcanzar el resultado deseado.",
      },
      {
        q: "¿La simulación muestra el resultado exacto?",
        a: "No necesariamente. Es una guía visual, y el resultado final depende de factores clínicos y del trabajo de laboratorio.",
      },
      {
        q: "¿Cuántas citas requiere?",
        a: "La cantidad de citas suele variar según el caso y según los tratamientos que se elijan después.",
      },
    ],
    todo: [
      "Si el diseño de sonrisa se ofrece como servicio independiente o siempre dentro de otro tratamiento",
      "Herramientas que usa la clínica (fotografía, escáner, simulación digital o mock-up)",
      "Cómo presenta la clínica la simulación a la persona paciente",
    ],
    sources: [
      { label: "Diseño digital de sonrisa (TopDoctors, en inglés)", url: "https://topdoctors.co.uk/medical-articles/digital-smile-design-how-to-perfect-your-smile" },
    ],
  },

  "carillas-resina": {
    related: ["diseno-de-sonrisa", "blanqueamiento", "carillas-porcelana"],
    whenItHelps: [
      "Dientes con pequeñas fracturas, desgastes o separaciones leves",
      "Cuando se busca un cambio estético en una sola cita",
      "Cuando se prefiere un material que pueda repararse con más facilidad",
    ],
    howItWorks: [
      "Evaluación del color, la forma y el estado de los dientes.",
      "Preparación ligera de la superficie del diente, según el caso.",
      "Aplicación de capas de resina compuesta unidas directamente al diente.",
      "Modelado, pulido y ajuste de la mordida en la misma sesión.",
    ],
    benefits: [
      "Suele realizarse en una sola visita",
      "Es más sencilla de reparar si se daña",
      "Puede requerir menos intervención sobre el diente en algunos casos",
    ],
    consider: [
      "Tiende a mancharse más con el tiempo que la porcelana",
      "Se desgasta antes y puede necesitar retoques o reemplazo",
      "El resultado depende en gran medida de la habilidad del profesional",
    ],
    aftercare: [
      "Evitar hábitos como morder objetos duros o abrir envases con los dientes",
      "Limitar bebidas y alimentos que manchan, como café, té o vino tinto, y enjuagar después de consumirlos",
      "Mantener la higiene diaria y las revisiones periódicas",
      "Consultar al dentista ante cualquier desprendimiento o desgaste",
    ],
    faqs: [
      {
        q: "¿Las carillas de resina duran lo mismo que las de porcelana?",
        a: "En general se considera que la resina se desgasta antes y puede necesitar retoques con más frecuencia. La duración suele variar según cada caso.",
      },
      {
        q: "¿Se pueden reparar?",
        a: "En muchos casos sí, de forma más sencilla que las de porcelana. El dentista evaluará si la reparación es adecuada.",
      },
      {
        q: "¿El procedimiento es doloroso?",
        a: "Según el caso, el dentista puede indicar anestesia local, sobre todo si hay preparación del diente. Lo decide el profesional en cada situación.",
      },
    ],
    todo: [
      "Tipo de resina compuesta que utiliza la clínica",
      "Si la preparación del diente es mínima o requiere desgaste en cada caso",
      "Protocolo de pulido y mantenimiento que ofrece la clínica",
    ],
    sources: [
      { label: "MouthHealthy: carillas (en inglés)", url: MOUTHHEALTHY_VENEERS },
    ],
  },

  "carillas-porcelana": {
    related: ["diseno-de-sonrisa", "blanqueamiento", "carillas-disilicato"],
    program: "novias",
    whenItHelps: [
      "Dientes con color o forma que no mejoran con blanqueamiento",
      "Cuando se busca un resultado estético con buena resistencia a las manchas",
      "Pequeños espacios o desalineaciones leves en el sector estético",
    ],
    howItWorks: [
      "Evaluación clínica, con fotografías y radiografías si son necesarias.",
      "Preparación del diente, que incluye retirar una capa fina de esmalte.",
      "Toma de impresiones o escaneo para que el laboratorio fabrique las carillas.",
      "Colocación de provisionales mientras se fabrican las definitivas.",
      "Adhesión de las carillas definitivas y ajuste de la mordida.",
    ],
    benefits: [
      "Buena resistencia a las manchas en comparación con la resina",
      "Apariencia natural gracias a su translucidez",
      "Permite ajustar la forma y el color con detalle de laboratorio",
    ],
    consider: [
      "La preparación es irreversible, porque se retira una capa fina de esmalte",
      "Puede astillarse o despegarse, sobre todo si hay una mordida fuerte",
      "Requiere al menos dos visitas por la fabricación en laboratorio",
      "No es adecuada si hay caries sin tratar, enfermedad de encías o bruxismo intenso sin control",
    ],
    aftercare: [
      "Evitar morder objetos duros y usar protector nocturno si el dentista lo indica",
      "Mantener la higiene diaria con cepillado y uso de hilo dental",
      "Acudir a las revisiones periódicas para controlar las carillas y las encías",
      "Seguir las indicaciones del dentista sobre alimentos y hábitos",
    ],
    faqs: [
      {
        q: "¿Las carillas de porcelana son reversibles?",
        a: "No del todo. La preparación retira una capa fina de esmalte, por lo que el diente no recupera su estado original.",
      },
      {
        q: "¿Cuánto tardan en estar listas?",
        a: "El proceso incluye la fabricación en laboratorio y requiere varias citas. El tiempo total suele variar según el caso.",
      },
      {
        q: "¿Se manchan?",
        a: "Resisten mejor las manchas que la resina, aunque la adhesión y la higiene siguen siendo importantes para conservar el resultado.",
      },
    ],
    todo: [
      "Tipo de porcelana y laboratorio que utiliza la clínica",
      "Protocolo de provisionales y número habitual de citas",
      "Política de reparación en caso de astillado o desprendimiento que ofrece la clínica",
    ],
    sources: [
      { label: "MouthHealthy: carillas (en inglés)", url: MOUTHHEALTHY_VENEERS },
    ],
  },

  "carillas-zirconio": {
    related: ["diseno-de-sonrisa", "blanqueamiento", "carillas-porcelana"],
    whenItHelps: [
      "Cuando se quiere enmascarar un diente oscurecido o un color de fondo oscuro",
      "Cuando se busca un material con un núcleo de alta resistencia",
      "Cuando el dentista considera que su opacidad es adecuada para el caso",
    ],
    howItWorks: [
      "Evaluación del color de fondo, la forma y la mordida.",
      "Preparación del diente según el diseño de la carilla.",
      "Toma de impresiones o escaneo para la fabricación en laboratorio.",
      "Fabricación de la carilla en cerámica de óxido de circonio.",
      "Adhesión y ajustes finales.",
    ],
    benefits: [
      "Núcleo de alta resistencia mecánica",
      "Mayor capacidad para enmascarar fondos oscuros que los cerámicos más translúcidos",
      "Puede ser una opción en casos que exigen más resistencia",
    ],
    consider: [
      "Es menos translúcida, por lo que puede verse más opaca que otras cerámicas",
      "La evidencia clínica específica en carillas es limitada; buena parte proviene de estudios de laboratorio",
      "Requiere preparación del diente y trabajo de laboratorio, como otras carillas cerámicas",
      "No es automáticamente mejor que otras opciones; depende del caso",
    ],
    aftercare: [
      "Mantener la higiene diaria con cepillado y uso de hilo dental",
      "Evitar morder objetos duros y hábitos que sobrecarguen los dientes",
      "Acudir a las revisiones periódicas",
      "Seguir las indicaciones del dentista para el cuidado de las carillas",
    ],
    faqs: [
      {
        q: "¿Es mejor que la porcelana?",
        a: "No necesariamente. Cada material tiene ventajas distintas, y la elección depende del caso clínico y del resultado estético buscado.",
      },
      {
        q: "¿Por qué se elige para dientes oscuros?",
        a: "Su opacidad ayuda a cubrir colores de fondo oscuros, algo que los cerámicos más translúcidos cubren peor.",
      },
      {
        q: "¿Hace falta tallar el diente?",
        a: "Por lo general sí, aunque la cantidad de preparación depende del grosor y del diseño de la carilla. El dentista lo evaluará.",
      },
    ],
    todo: [
      "Si la clínica ofrece carillas de óxido de circonio y en qué casos las recomienda",
      "Evidencia clínica propia de la clínica sobre este material, si existe",
      "Protocolo de preparación y laboratorio asociado",
    ],
    sources: [
      { label: "Estudio sobre cerámicas dentales (DOAJ, en inglés)", url: DOAJ_CERAMICS },
    ],
  },

  "carillas-disilicato": {
    related: ["diseno-de-sonrisa", "blanqueamiento", "carillas-porcelana"],
    whenItHelps: [
      "Cuando se busca translucidez y un aspecto natural",
      "Para carillas finas en sectores estéticos visibles",
      "Cuando el color de fondo del diente no es muy oscuro",
    ],
    howItWorks: [
      "Evaluación del color, la forma, la mordida y el estado de las encías.",
      "Preparación del diente, que puede ser mínima según el caso.",
      "Toma de impresiones o escaneo y fabricación en laboratorio con disilicato de litio.",
      "Prueba y ajuste de color y forma.",
      "Adhesión con cemento adhesivo y pulido final.",
    ],
    benefits: [
      "Apariencia natural gracias a su translucidez",
      "Resistencia suficiente para carillas finas",
      "Buena integración con el color del diente cuando el fondo es claro o medio",
    ],
    consider: [
      "Su núcleo es menos resistente que el del óxido de circonio",
      "Enmascara peor los fondos muy oscuros",
      "La adhesión es un paso clave para la duración del resultado",
      "Parte de la evidencia proviene de estudios de laboratorio sobre translucidez",
    ],
    aftercare: [
      "Mantener la higiene diaria con cepillado y uso de hilo dental",
      "Evitar morder objetos duros y usar protector nocturno si el dentista lo indica",
      "Acudir a las revisiones periódicas para controlar las carillas y las encías",
      "Seguir las indicaciones del dentista sobre alimentos y hábitos",
    ],
    faqs: [
      {
        q: "¿Es igual de resistente que la porcelana?",
        a: "Son materiales distintos. El disilicato de litio ofrece resistencia suficiente para carillas finas, aunque su núcleo es menos resistente que el del óxido de circonio.",
      },
      {
        q: "¿Se ve natural?",
        a: "Su translucidez suele favorecer un aspecto natural, aunque el resultado depende del color del diente de base y del trabajo del laboratorio.",
      },
      {
        q: "¿Sirve para dientes muy oscuros?",
        a: "Puede ser menos adecuado, porque cubre peor los fondos oscuros. El dentista puede valorar otras opciones.",
      },
    ],
    todo: [
      "Material y laboratorio concretos que utiliza la clínica para el disilicato de litio",
      "Protocolo de adhesión y controles que ofrece la clínica",
      "Alternativas que propone la clínica cuando el fondo del diente es muy oscuro",
    ],
    sources: [
      { label: "Estudio sobre cerámicas dentales (DOAJ, en inglés)", url: DOAJ_CERAMICS },
      { label: "Estudio sobre translucidez de cerámicas (en inglés)", url: "https://acikerisim.comu.edu.tr/items/af55bb39-3a4d-452a-a9b0-4b8ed9bff22b" },
    ],
  },

  "carillas-ultrafinas": {
    related: ["diseno-de-sonrisa", "blanqueamiento", "carillas-porcelana"],
    whenItHelps: [
      "Casos estéticos leves o moderados, con poca diferencia de forma o color",
      "Cuando se quiere reducir al máximo el desgaste del diente",
      "Cuando la persona paciente prefiere una opción menos invasiva, previa evaluación",
    ],
    howItWorks: [
      "Evaluación para confirmar si el caso es apto para carillas muy finas.",
      "Registro de color, forma y mordida, con fotografías o escaneo.",
      "Preparación mínima o nula del esmalte, según el caso.",
      "Fabricación de carillas cerámicas muy delgadas en laboratorio.",
      "Adhesión y revisión de la mordida y de la estética.",
    ],
    benefits: [
      "En muchos casos requiere poca o ninguna eliminación de esmalte",
      "Puede no necesitar anestesia, según el caso",
      "Es un proceso menos invasivo que las carillas convencionales en algunas situaciones",
    ],
    consider: [
      "No es adecuada para todos los casos; suele indicarse en alteraciones leves o moderadas",
      "Puede verse más voluminosa en dientes muy prominentes",
      "Varias fuentes reportan una durabilidad menor que la de las carillas convencionales",
      "La reversibilidad no está clara y el dentista debe confirmarla",
    ],
    aftercare: [
      "Evitar morder objetos duros y hábitos que sobrecarguen los dientes",
      "Mantener la higiene diaria con cepillado y uso de hilo dental",
      "Acudir a las revisiones periódicas",
      "Seguir las indicaciones del dentista sobre alimentos y cuidados",
    ],
    faqs: [
      {
        q: "¿Son reversibles?",
        a: "No está claro. Depende de cuánto esmalte se conserve, y el dentista debe confirmarlo en cada caso.",
      },
      {
        q: "¿Duelen?",
        a: "Al no requerir siempre desgaste, puede que no sea necesaria la anestesia. El dentista indicará lo que corresponda.",
      },
      {
        q: "¿Duran lo mismo que las carillas tradicionales?",
        a: "Varias fuentes indican que su durabilidad puede ser menor. La duración suele variar según el caso y los hábitos de cada persona.",
      },
    ],
    todo: [
      "Grosor mínimo de carilla que fabrica la clínica",
      "Si la clínica realiza preparación mínima o sin tallado, y en qué casos",
      "Casos que la clínica descarta por no ser aptos para carillas ultrafinas",
      "Criterios de reversibilidad que el dentista puede explicar",
    ],
    sources: [
      { label: "Comparativa de carillas ultrafinas", url: "https://www.healthline.com/health/veneers-vs-lumineers" },
    ],
  },
};
