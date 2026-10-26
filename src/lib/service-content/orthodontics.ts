import { orthoPriceAnswer, orthoPriceQuestion } from "@/lib/ortho-prices";
import type { ServiceContent } from "@/lib/service-content/types";

const MOUTHHEALTHY_BRACES = "https://www.mouthhealthy.org/all-topics-a-z/braces";
const NHS_ORTHODONTICS = "https://www.nhs.uk/conditions/orthodontics/";

/** Market price FAQ, generated from the type's range so the copy and the detail card never diverge. */
const priceFaq = (id: string) => ({ q: orthoPriceQuestion(id), a: orthoPriceAnswer(id) });

export const orthodonticsContent: Record<string, ServiceContent> = {
  // TODO(SEO): review copy
  "brackets-convencionales": {
    related: ["brackets-autoligables", "brackets-ceramicos", "invisalign"],
    program: "novias",
    whenItHelps: [
      "Dientes apiñados o con separaciones que se quieren corregir",
      "Problemas de mordida, como sobremordida, mordida cruzada o mordida invertida",
      "Alineación previa a otros tratamientos estéticos",
    ],
    howItWorks: [
      "Evaluación inicial con fotografías, radiografías y, si aplica, escaneo digital.",
      "Plan de tratamiento y elección del sistema de brackets que mejor se adapte al caso.",
      "Colocación de los brackets metálicos unidos al diente, con un arco que se ajusta de forma periódica.",
      "Controles y ajustes periódicos para guiar el movimiento de los dientes.",
      "Retiro de los brackets y colocación de retenedores para sostener el resultado.",
    ],
    benefits: [
      "Mejora la alineación y la relación entre las piezas dentales",
      "Puede mejorar la función masticatoria cuando hay problemas de mordida",
      "Sirve para distintos tipos de corrección, según la evaluación del dentista",
    ],
    consider: [
      "Requiere citas periódicas y constancia en la higiene diaria",
      "Los brackets retienen placa alrededor de las piezas y exigen una limpieza cuidadosa",
      "La duración suele variar según cada caso, y casi siempre se necesita una fase de retención posterior",
    ],
    aftercare: [
      "Usar los retenedores según la indicación del dentista para mantener el resultado",
      "Reforzar la higiene alrededor de los brackets con cepillo interdental",
      "Evitar alimentos duros o pegajosos que puedan despegar los brackets",
      "Acudir a los controles programados y seguir las indicaciones del dentista",
    ],
    faqs: [
      {
        q: "¿Los brackets metálicos duelen?",
        a: "Es habitual sentir molestia o presión durante los primeros días después de cada ajuste. Suele disminuir con el tiempo, y el dentista puede indicar medidas para aliviarla.",
      },
      {
        q: "¿Se necesita retenedor después del tratamiento?",
        a: "En general sí. El retenedor ayuda a mantener la posición de los dientes una vez retirados los brackets.",
      },
      {
        q: "¿Existen opciones más discretas?",
        a: "Sí, como los brackets cerámicos, de porcelana o de zafiro, y los alineadores transparentes. Cada opción tiene diferencias en resistencia y mantenimiento, y el dentista puede explicarlas.",
      },
      priceFaq("brackets-convencionales"),
    ],
    todo: [
      "Sistemas de brackets metálicos que ofrece la clínica",
      "Si la clínica utiliza escaneo digital o trabaja principalmente con radiografías y fotografías",
      "Protocolo de controles y frecuencia de ajustes",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },

  // TODO(SEO): review copy
  "brackets-ceramicos": {
    related: ["brackets-porcelana", "brackets-autoligables", "brackets-convencionales"],
    whenItHelps: [
      "Casos de corrección de mordida o apiñamiento en los que se prefiere un bracket de color parecido al diente",
      "Personas que quieren un tratamiento más discreto que el metálico",
      "Cuando el dentista considera que el material es adecuado para la fuerza y el tipo de movimiento que requiere el caso",
    ],
    howItWorks: [
      "Evaluación del caso y revisión del color de los dientes.",
      "Elección del bracket cerámico según el plan de tratamiento.",
      "Colocación de los brackets unidos al diente, con el arco correspondiente.",
      "Controles y ajustes periódicos para guiar el movimiento de los dientes.",
      "Retención con retenedores al finalizar el tratamiento.",
    ],
    benefits: [
      "Color parecido al diente, por lo que se notan menos durante el tratamiento",
      "Mantienen la misma función de corrección que los brackets metálicos en los casos indicados",
      "Son una alternativa cuando el paciente no desea brackets metálicos visibles",
    ],
    consider: [
      "Son más frágiles que los metálicos y pueden fracturarse si se somete el bracket a golpes o a alimentos duros",
      "Pueden manchar con el tiempo si no se mantiene una buena higiene y se consumen alimentos que manchan",
      "No todos los casos son adecuados para este material; lo decide el dentista",
    ],
    aftercare: [
      "Evitar morder alimentos duros, como hielo, caramelos o frutos secos enteros",
      "Limitar bebidas y alimentos que manchan, como café, té o vino tinto",
      "Reforzar la higiene alrededor de los brackets con cepillo interdental",
      "Acudir a los controles programados y avisar si un bracket se despega",
    ],
    faqs: [
      {
        q: "¿Los brackets cerámicos se notan?",
        a: "Se notan menos que los metálicos, porque su color se parece al del diente. Aun así, pueden verse con cierta diferencia de tono según la luz y la coloración de cada persona.",
      },
      {
        q: "¿Son más resistentes que los metálicos?",
        a: "No necesariamente. Suelen ser más frágiles, por lo que requieren cuidados adicionales durante el tratamiento.",
      },
      {
        q: "¿Cuál es la diferencia con los de porcelana?",
        a: "Ambos son de color parecido al diente. Los cerámicos suelen describirse como de cerámica policristalina, mientras que los de porcelana se describen como más translúcidos y resistentes a las manchas. El dentista confirma el material exacto antes de elegir.",
      },
      priceFaq("brackets-ceramicos"),
    ],
    todo: [
      "Material exacto que utiliza la clínica para los brackets cerámicos",
      "Diferencia que la clínica explica entre brackets cerámicos y de porcelana, y cómo se comunica al paciente",
      "Protocolo de reparación si un bracket cerámico se fractura",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },

  // TODO(SEO): review copy
  "brackets-autoligables": {
    related: ["brackets-convencionales", "brackets-ceramicos", "brackets-zafiro"],
    whenItHelps: [
      "Personas que prefieren un sistema con menos ligaduras elásticas",
      "Casos de apiñamiento o separación en los que el dentista considera que este sistema es adecuado",
      "Cuando se quiere un sistema con mecanismo integrado en el bracket",
    ],
    howItWorks: [
      "Evaluación del caso con fotografías, radiografías y, si aplica, escaneo digital.",
      "Elección del sistema autoligable según el plan de tratamiento.",
      "Colocación de los brackets autoligables y del arco inicial.",
      "Controles periódicos para cambiar de arco y guiar el movimiento de los dientes.",
      "Retención con retenedores al finalizar el tratamiento.",
    ],
    benefits: [
      "Sujetan el arco con un mecanismo integrado, sin necesidad de ligaduras elásticas en todos los casos",
      "Pueden simplificar algunos controles, según el plan del caso",
      "Ofrecen una alternativa cuando el paciente busca un sistema diferente al convencional",
    ],
    consider: [
      "No todos los casos se resuelven igual con un sistema autoligable; la indicación depende de la evaluación",
      "Su mecanismo requiere limpieza cuidadosa alrededor del clip",
      "El costo y la duración varían según cada caso, y el dentista debe explicarlos en la evaluación",
    ],
    aftercare: [
      "Reforzar la higiene alrededor de los brackets con cepillo interdental",
      "Evitar alimentos duros o pegajosos que puedan dañar el mecanismo",
      "Acudir a los controles programados para los cambios de arco",
      "Usar los retenedores según la indicación del dentista al terminar",
    ],
    faqs: [
      {
        q: "¿Los autoligables son mejores que los convencionales?",
        a: "No hay una opción mejor en todos los casos. Cada sistema tiene ventajas, y la elección depende de la evaluación del dentista.",
      },
      {
        q: "¿Necesitan ligaduras elásticas?",
        a: "Su mecanismo sujeta el arco sin ligaduras elásticas, aunque en algunos casos el dentista puede combinarlos con otros elementos según el plan.",
      },
      {
        q: "¿Duelen más o menos que los convencionales?",
        a: "Es habitual sentir molestia después de cada ajuste en cualquier sistema. El dentista puede indicar medidas para aliviarla.",
      },
      priceFaq("brackets-autoligables"),
    ],
    todo: [
      "Marca y tipo de brackets autoligables que utiliza la clínica",
      "Protocolo de controles y cambios de arco que ofrece la clínica",
      "Criterios de la clínica para indicar autoligables frente a convencionales",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },

  // TODO(SEO): review copy
  "brackets-zafiro": {
    related: ["brackets-porcelana", "brackets-ceramicos", "brackets-autoligables"],
    whenItHelps: [
      "Cuando se busca un bracket casi imperceptible en la sonrisa",
      "Casos de corrección de mordida en los que el paciente prefiere un material transparente",
      "Personas que quieren un acabado estético durante todo el tratamiento",
    ],
    howItWorks: [
      "Evaluación del caso y revisión del color y la forma de los dientes.",
      "Elección del bracket de zafiro según el plan de tratamiento.",
      "Colocación de los brackets transparentes unidos al diente, con el arco correspondiente.",
      "Controles y ajustes periódicos para guiar el movimiento de los dientes.",
      "Retención con retenedores al finalizar el tratamiento.",
    ],
    benefits: [
      "Transparencia que se integra con el color natural del diente",
      "Acabado estético durante todo el tratamiento",
      "Mantiene la función de corrección en los casos indicados",
    ],
    consider: [
      "Requieren un manejo cuidadoso durante la colocación y los ajustes",
      "Pueden ser más costosos que los metálicos; el dentista debe explicar el costo en la evaluación",
      "No son adecuados para todos los casos; la indicación depende del dentista",
    ],
    aftercare: [
      "Evitar morder alimentos duros, como hielo o caramelos",
      "Limitar bebidas y alimentos que manchan, y enjuagar la boca después de consumirlos",
      "Reforzar la higiene alrededor de los brackets con cepillo interdental",
      "Acudir a los controles programados y avisar si un bracket se despega",
    ],
    faqs: [
      {
        q: "¿Los brackets de zafiro se ven?",
        a: "Son muy transparentes, por lo que se integran con el color del diente. Aun así, pueden notarse un poco según la luz y el caso.",
      },
      {
        q: "¿Son lo mismo que los cerámicos?",
        a: "No. Son materiales distintos, aunque ambos buscan un aspecto discreto. El dentista explicará las diferencias y cuál se adapta mejor a tu caso.",
      },
      {
        q: "¿Se manchan?",
        a: "Son más resistentes a las manchas que muchos materiales, pero la higiene y la alimentación siguen siendo importantes para conservar su aspecto.",
      },
      priceFaq("brackets-zafiro"),
    ],
    todo: [
      "Material y proveedor concretos de los brackets de zafiro que utiliza la clínica",
      "Diferencia de costo que la clínica explica respecto a los metálicos",
      "Protocolo de reparación si un bracket se fractura o despega",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },

  // TODO(SEO): review copy
  "brackets-porcelana": {
    related: ["brackets-ceramicos", "brackets-zafiro", "invisalign"],
    whenItHelps: [
      "Cuando se busca un bracket de color natural y acabado liso",
      "Personas que quieren un tratamiento discreto y con buena resistencia a las manchas",
      "Casos de corrección de mordida en los que el dentista considera que el material es adecuado",
    ],
    howItWorks: [
      "Evaluación del caso y revisión del color de los dientes.",
      "Elección del bracket de porcelana según el plan de tratamiento.",
      "Colocación de los brackets unidos al diente, con el arco correspondiente.",
      "Controles y ajustes periódicos para guiar el movimiento de los dientes.",
      "Retención con retenedores al finalizar el tratamiento.",
    ],
    benefits: [
      "Color natural y acabado liso",
      "Buena resistencia a las manchas en comparación con otros materiales de color parecido al diente",
      "Opción discreta para quienes no quieren brackets metálicos visibles",
    ],
    consider: [
      "Puede ser más frágil ante golpes o alimentos duros",
      "La higiene alrededor del bracket sigue siendo clave para conservar el resultado",
      "No todos los casos son adecuados para este material; lo decide el dentista",
    ],
    aftercare: [
      "Evitar morder alimentos duros o pegajosos",
      "Reforzar la higiene con cepillo interdental y enjuague si el dentista lo indica",
      "Acudir a los controles programados y avisar si un bracket se despega",
      "Seguir las indicaciones del dentista sobre alimentos y hábitos",
    ],
    faqs: [
      {
        q: "¿Los brackets de porcelana son los mismos que los cerámicos?",
        a: "Son materiales parecidos y a veces se confunden. La porcelana suele describirse como más translúcida y resistente a las manchas. El dentista confirma el material exacto antes de elegir.",
      },
      {
        q: "¿Se manchan?",
        a: "Resisten mejor las manchas que otros materiales de color parecido al diente, aunque la higiene y la alimentación siguen siendo importantes.",
      },
      {
        q: "¿Cuánto tiempo duran?",
        a: "La duración del tratamiento depende del caso y no del material del bracket. El dentista te dará un tiempo estimado en la evaluación.",
      },
      priceFaq("brackets-porcelana"),
    ],
    todo: [
      "Material exacto de los brackets de porcelana que utiliza la clínica",
      "Diferencia con los brackets cerámicos que la clínica explica al paciente",
      "Protocolo de reparación si un bracket se fractura",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },

  // TODO(SEO): review copy
  "ortodoncia-lingual": {
    related: ["brackets-convencionales", "brackets-autoligables", "invisalign"],
    whenItHelps: [
      "Personas que quieren corregir su mordida sin que el tratamiento sea visible",
      "Casos en los que el dentista considera que la cara interna de los dientes es una opción viable",
      "Pacientes que pueden adaptarse a una higiene y a una fonética distintas durante un periodo",
    ],
    howItWorks: [
      "Evaluación del caso con registros digitales o modelos de los dientes.",
      "Planificación individual del tratamiento, con piezas fabricadas a medida cuando el caso lo requiere.",
      "Colocación de los brackets en la cara interna de los dientes.",
      "Controles y ajustes periódicos, que suelen requerir más tiempo de adaptación.",
      "Retención con retenedores al finalizar el tratamiento.",
    ],
    benefits: [
      "Los brackets no son visibles desde el exterior al sonreír",
      "Permite corregir la mordida con un resultado discreto",
      "Puede ser una opción para quienes no desean brackets visibles",
    ],
    consider: [
      "Requiere una planificación más compleja y puede necesitar piezas fabricadas a medida",
      "La limpieza de la cara interna de los dientes es más difícil y exige más constancia",
      "Al inicio puede afectar temporalmente la forma de hablar; la adaptación suele tomar unas semanas",
      "No es adecuada para todos los casos y no siempre es posible; lo decide el especialista",
    ],
    aftercare: [
      "Reforzar la higiene con cepillo interdental y enjuague si el dentista lo indica",
      "Evitar alimentos duros o pegajosos que puedan despegar los brackets",
      "Acudir a los controles programados con regularidad",
      "Usar los retenedores según la indicación del dentista al terminar",
    ],
    faqs: [
      {
        q: "¿Se ven los brackets linguales?",
        a: "No son visibles desde el exterior al sonreír, porque están en la cara interna de los dientes.",
      },
      {
        q: "¿Afecta la forma de hablar?",
        a: "Al inicio puede notarse un cambio temporal en la pronunciación. Por lo general la adaptación toma unas semanas.",
      },
      {
        q: "¿Cualquier persona puede hacerse ortodoncia lingual?",
        a: "No. Depende de la forma de los dientes y del caso clínico. El especialista lo evaluará antes de recomendarla.",
      },
      priceFaq("ortodoncia-lingual"),
    ],
    todo: [
      "Si la clínica ofrece ortodoncia lingual o la deriva a un especialista",
      "Sistema lingual que utiliza la clínica y si fabrica piezas a medida",
      "Tiempo de adaptación y protocolo de controles que la clínica informa al paciente",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },

  // TODO(SEO): review copy
  // TODO(SEO): confirm Lumayo is a certified Invisalign provider; otherwise rename to "Alineadores invisibles"
  invisalign: {
    related: ["brackets-convencionales", "brackets-autoligables", "ortodoncia-lingual"],
    whenItHelps: [
      "Personas que buscan un tratamiento discreto y removible",
      "Casos leves o moderados en los que el dentista considera que los alineadores son una opción adecuada",
      "Pacientes que pueden mantener la disciplina de uso que requiere el tratamiento",
    ],
    howItWorks: [
      "Evaluación digital del caso, con fotografías y escaneo de los dientes.",
      "Diseño del plan de movimiento dental y de la secuencia de alineadores.",
      "Entrega de los alineadores y del calendario de cambio.",
      "Controles periódicos para verificar el avance y, si aplica, ajustar el plan.",
      "Uso de retenedores al finalizar el tratamiento.",
    ],
    benefits: [
      "Son transparentes y removibles, por lo que son poco visibles",
      "Se retiran para comer, cepillarse y en ocasiones especiales",
      "Permiten planificar el movimiento de los dientes de forma digital",
    ],
    consider: [
      "Requieren usarse la mayor parte del día y disciplina para cumplir el calendario",
      "Solo funcionan bien en casos que el plan digital puede resolver; no todos los casos son adecuados",
      "Pueden necesitar pequeños accesorios adheridos al diente para ayudar al movimiento",
      "Perder o no usar los alineadores retrasa el tratamiento",
    ],
    aftercare: [
      "Usar los alineadores la cantidad de horas indicada por el dentista",
      "Retirarlos para comer y limpiarlos antes de volver a colocarlos",
      "Cepillar los dientes antes de colocar los alineadores",
      "Acudir a los controles programados y usar los retenedores al terminar",
    ],
    faqs: [
      {
        q: "¿Los alineadores se notan?",
        a: "Son transparentes y poco visibles, aunque pueden notarse un poco según la luz y el caso.",
      },
      {
        q: "¿Se pueden retirar?",
        a: "Sí. Son removibles, pero deben usarse la mayor parte del día para que el tratamiento funcione según el plan.",
      },
      {
        q: "¿Cualquier persona puede usar Invisalign?",
        a: "No. Depende del caso clínico y de la evaluación digital. El dentista te indicará si es una opción adecuada.",
      },
      priceFaq("invisalign"),
    ],
    todo: [
      "Confirmar si la clínica es proveedor certificado de Invisalign o si debe usarse otra denominación",
      "Casos que la clínica indica para alineadores y los que deriva a otro tratamiento",
      "Protocolo de controles, cambios de alineadores y uso de accesorios que ofrece la clínica",
    ],
    sources: [
      { label: "MouthHealthy: brackets (en inglés)", url: MOUTHHEALTHY_BRACES },
      { label: "NHS: ortodoncia (en inglés)", url: NHS_ORTHODONTICS },
    ],
  },
};
