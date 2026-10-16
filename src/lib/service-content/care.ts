import type { ServiceContent } from "@/lib/service-content/types";

export const careContent: Record<string, ServiceContent> = {
  blanqueamiento: {
    related: ["carillas-porcelana", "diseno-de-sonrisa", "limpieza"],
    program: "novias",
    whenItHelps: [
      "Cuando los dientes naturales han perdido tono por el café, el té, el tabaco o el paso del tiempo.",
      "Si quieres una sonrisa más clara sin modificar la forma ni el tamaño de tus dientes.",
      "Como paso previo a otros tratamientos estéticos, para elegir el tono de un trabajo futuro.",
    ],
    howItWorks: [
      "Primero se revisa la salud bucal y se descartan caries, encías inflamadas o restauraciones en mal estado.",
      "Después se elige la modalidad: aplicación en consulta o férulas personalizadas para usar en casa.",
      "Se aplica un agente a base de peróxido sobre la superficie del diente, siguiendo el protocolo que indique el dentista.",
      "Al terminar se valora el resultado y se dan indicaciones para mantenerlo.",
    ],
    benefits: [
      "Aclara el color de los dientes naturales de forma conservadora.",
      "No requiere desgastar el esmalte.",
      "Puede hacerse en consulta o con férulas, según lo que mejor encaje en tu caso.",
    ],
    consider: [
      "Es habitual notar sensibilidad dental durante el tratamiento, que suele ser temporal.",
      "Puede aparecer irritación de encías si el producto entra en contacto con ellas.",
      "El resultado no es permanente y depende de hábitos como fumar o consumir café y tinturas con frecuencia.",
      "No cambia el color de coronas, carillas, resinas ni prótesis; esos materiales no responden al blanqueamiento.",
      "No suele estar indicado en niños, durante el embarazo o la lactancia, ni cuando hay enfermedad activa en la boca.",
    ],
    aftercare: [
      "Sigue las indicaciones del dentista sobre el uso de las férulas o del producto.",
      "Consulta al dentista si la sensibilidad es intensa o persiste.",
      "Mantén una buena higiene diaria y reduce el consumo de productos que manchan.",
      "Acude a las revisiones periódicas para valorar el estado del color y de la salud bucal.",
    ],
    faqs: [
      {
        q: "¿El blanqueamiento es doloroso?",
        a: "Lo habitual es sentir sensibilidad temporal en los dientes, no dolor intenso. El dentista puede ajustar el protocolo para reducirla.",
      },
      {
        q: "¿Cuánto dura el resultado?",
        a: "No es permanente. La duración del color varía según tus hábitos de higiene y alimentación, y el dentista puede orientarte sobre el mantenimiento.",
      },
      {
        q: "¿Sirve para mis fundas o empastes?",
        a: "No. El blanqueamiento actúa sobre el diente natural, por lo que las coronas, carillas, resinas y prótesis mantienen su color.",
      },
    ],
    todo: [
      "Confirmar el protocolo y los productos que utiliza la clínica, sin mencionar marcas en la página.",
      "Confirmar las indicaciones y contraindicaciones que aplica la clínica en niños, embarazo y lactancia.",
      "Confirmar el enfoque que la clínica da al mantenimiento del color tras el tratamiento.",
    ],
    sources: [
      {
        label: "Información sobre blanqueamiento dental",
        url: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening",
      },
      {
        label: "Información sobre blanqueamiento dental (NHS)",
        url: "https://www.nhs.uk/conditions/teeth-whitening/",
      },
    ],
  },
  limpieza: {
    related: ["blanqueamiento", "fluor-barniz", "curaciones"],
    whenItHelps: [
      "Cuando hay sarro visible o acumulación de placa que el cepillado no logra eliminar.",
      "Si notas encías que sangran al cepillarte o un mal aliento persistente.",
      "Como revisión preventiva para mantener la salud de encías y dientes.",
    ],
    howItWorks: [
      "Se realiza una exploración para valorar el estado de las encías y los dientes.",
      "Se eliminan la placa y el sarro, incluidos los depósitos por debajo de la línea de la encía.",
      "Se pule la superficie dental para dejarla lisa y menos propensa a acumular placa.",
      "Se dan recomendaciones personalizadas de cepillado y uso de hilo dental.",
    ],
    benefits: [
      "Elimina el sarro y la placa que la higiene diaria no retira por completo.",
      "Ayuda a reducir la inflamación de las encías.",
      "Deja los dientes con una superficie más lisa y una sensación de limpieza duradera.",
    ],
    consider: [
      "Puede haber una molestia leve, sobre todo con instrumentos de ultrasonidos o si las encías están inflamadas.",
      "Si existe enfermedad de las encías, una limpieza simple no basta: puede hacer falta un raspado y alisado radicular en varias sesiones.",
      "No sustituye al cepillado diario ni al uso de hilo dental.",
    ],
    aftercare: [
      "Sigue las recomendaciones de higiene que te indique el dentista.",
      "Es normal que las encías estén algo sensibles durante unos días; consulta si la molestia persiste.",
      "Acude a las revisiones periódicas que te recomiende el dentista.",
    ],
    faqs: [
      {
        q: "¿La limpieza dental duele?",
        a: "Suele ser poco molesta. Si hay encías inflamadas o se usa instrumental de ultrasonidos, puede notarse una sensación leve que el equipo puede ajustar.",
      },
      {
        q: "¿Con qué frecuencia debo hacerme una limpieza?",
        a: "La frecuencia la define el dentista según el estado de tus encías y tu historial. No hay una pauta única para todas las personas.",
      },
      {
        q: "¿La limpieza blanquea los dientes?",
        a: "Puede eliminar manchas superficiales y dejar los dientes con mejor aspecto, pero no cambia el color natural del diente como lo hace un blanqueamiento.",
      },
    ],
    todo: [
      "Confirmar el tipo de instrumental que usa la clínica para la limpieza (manual y ultrasonidos).",
      "Confirmar cómo deriva la clínica los casos de enfermedad periodontal que requieren raspado y alisado radicular.",
      "Confirmar la pauta de revisiones que recomienda la clínica, sin publicar intervalos concretos.",
    ],
    sources: [
      {
        label: "Raspado y alisado radicular (artículo en inglés)",
        url: "https://colgate.com/en-in/oral-health/gum-disease/what-dentists-do-when-root-planing-and-scaling-teeth",
      },
      {
        label: "Caries dental: información de contexto (NHS)",
        url: "https://www.nhs.uk/conditions/tooth-decay/",
      },
    ],
  },
  "fluor-barniz": {
    related: ["fluor-gel", "sellantes", "odontopediatria"],
    program: "kids",
    whenItHelps: [
      "En niños pequeños, cuyo esmalte aún es vulnerable y que no siempre pueden hacer un enjuague con seguridad.",
      "Cuando una persona tiene un riesgo alto de caries por hábitos de alimentación, sequedad bucal u otros factores.",
      "Como refuerzo preventivo entre revisiones, según indique el dentista.",
    ],
    howItWorks: [
      "Se seca suavemente la superficie de los dientes para que el barniz se adhiera mejor.",
      "Se pinta una capa fina de barniz de flúor concentrado sobre los dientes que se van a tratar.",
      "El barniz se endurece en contacto con la saliva y permanece sobre el diente liberando flúor poco a poco.",
      "Se indica no comer ni beber durante un rato y evitar cepillarse en ese periodo, según la pauta del dentista.",
    ],
    benefits: [
      "Aplicación rápida y bien tolerada, incluso en niños.",
      "Libera flúor de forma prolongada sobre la superficie del diente.",
      "Es una medida preventiva sencilla de incorporar a las revisiones periódicas.",
    ],
    consider: [
      "No trata una caries que ya ha formado cavidad; en ese caso hace falta una restauración.",
      "Puede dejar una película amarillenta en los dientes, que desaparece con la higiene habitual.",
      "La frecuencia de aplicación depende del riesgo de cada persona y la define el dentista.",
    ],
    aftercare: [
      "Sigue las indicaciones sobre cuándo volver a comer y cepillarse tras la aplicación.",
      "Mantén una higiene diaria con pasta fluorada, en la cantidad adecuada para la edad.",
      "Consulta al dentista si notas molestias o si la película amarilla te preocupa.",
    ],
    faqs: [
      {
        q: "¿El barniz de flúor duele?",
        a: "No, es un tratamiento indoloro y no requiere anestesia. Puede notarse un sabor ligero tras la aplicación.",
      },
      {
        q: "¿Sirve para tratar una caries?",
        a: "No detiene una caries que ya tiene cavidad. Su función principal es prevenir y reforzar el esmalte frente a nuevas caries.",
      },
      {
        q: "¿Cada cuánto se aplica?",
        a: "La frecuencia la establece el dentista según el riesgo de caries de cada paciente.",
      },
    ],
    todo: [
      "Confirmar la frecuencia de aplicación que recomienda la clínica según el nivel de riesgo, sin publicar un número.",
      "Confirmar el protocolo de espera tras la aplicación (comer, beber y cepillarse) que sigue la clínica.",
      "Confirmar la edad a partir de la cual la clínica ofrece el barniz de flúor a niños.",
    ],
    sources: [
      {
        label: "Información sobre flúor",
        url: "https://www.mouthhealthy.org/all-topics-a-z/fluoride",
      },
      {
        label: "Caries dental: información de contexto (NHS)",
        url: "https://www.nhs.uk/conditions/tooth-decay/",
      },
    ],
  },
  "fluor-gel": {
    related: ["fluor-barniz", "sellantes", "limpieza"],
    program: "kids",
    whenItHelps: [
      "En niños mayores, adolescentes y adultos con riesgo de caries que el dentista quiera reforzar.",
      "Cuando el dentista recomienda un refuerzo de flúor profesional además de la higiene diaria.",
      "Como complemento a otros tratamientos preventivos, según la valoración clínica.",
    ],
    howItWorks: [
      "Se limpia la superficie de los dientes antes de la aplicación.",
      "Se coloca gel de flúor en una cubeta o férula ajustada a la dentadura.",
      "La cubeta permanece en la boca durante un tiempo breve, con aspiración para retirar el exceso de gel.",
      "Al final se retira la cubeta y se indica cuándo se puede comer o beber de nuevo.",
    ],
    benefits: [
      "Aporta flúor de forma controlada sobre toda la superficie de los dientes.",
      "Es un procedimiento no invasivo y sin anestesia.",
      "Puede indicarse como refuerzo cuando el dentista lo considera adecuado.",
    ],
    consider: [
      "Requiere más tiempo en el sillón que el barniz de flúor.",
      "Puede provocar náuseas en algunas personas, sobre todo si se traga el gel.",
      "Por el riesgo de ingestión, no suele usarse en niños pequeños; en esa edad se prefiere el barniz.",
    ],
    aftercare: [
      "Sigue las indicaciones del dentista sobre cuándo volver a comer y beber.",
      "Evita tragar el gel y comunica cualquier malestar al equipo.",
      "Mantén una higiene diaria con pasta fluorada, adaptada a tu edad.",
    ],
    faqs: [
      {
        q: "¿Cuál es la diferencia con el barniz de flúor?",
        a: "El gel se aplica con una cubeta durante un tiempo breve y requiere más tiempo de sillón. El barniz se pinta directamente sobre el diente y es más rápido.",
      },
      {
        q: "¿El gel de flúor es seguro?",
        a: "Es un tratamiento habitual cuando lo indica el dentista. Por el riesgo de tragar el producto, el equipo valora si es adecuado según la edad.",
      },
      {
        q: "¿Puede causar molestias?",
        a: "Algunas personas notan náuseas o sabor desagradable durante la aplicación. Avisa al equipo si te sientes mal para que pueda ayudarte.",
      },
    ],
    todo: [
      "Confirmar la edad mínima que aplica la clínica para el gel de flúor y el criterio para preferir el barniz en niños.",
      "Confirmar el tiempo de aplicación en cubeta que usa la clínica, sin publicar una duración concreta.",
      "Confirmar las instrucciones posteriores (comer, beber y cepillarse) que da la clínica tras el gel.",
    ],
    sources: [
      {
        label: "Información sobre flúor",
        url: "https://www.mouthhealthy.org/all-topics-a-z/fluoride",
      },
      {
        label: "Resumen sobre flúor profesional",
        url: "https://dimensionsofdentalhygiene.com/reduce-caries-professionally-applied-fluoride/",
      },
    ],
  },
  sellantes: {
    related: ["fluor-barniz", "odontopediatria", "operatoria"],
    program: "kids",
    whenItHelps: [
      "Cuando salen los primeros molares permanentes, habitualmente hacia los 6 y los 12 años.",
      "En dientes con surcos profundos en la superficie masticatoria, donde se acumula placa con facilidad.",
      "También puede valorarse en adultos con surcos profundos, según criterio del dentista.",
    ],
    howItWorks: [
      "Se limpia y se seca la superficie masticatoria del diente.",
      "Se aplica un grabado suave para que el material se adhiera al esmalte.",
      "Se coloca una resina fluida que cubre los surcos y se endurece con luz.",
      "Se revisa la mordida y el sellante, y se indican los cuidados posteriores.",
    ],
    benefits: [
      "Cubre los surcos y fisuras donde la higiene diaria es más difícil.",
      "El procedimiento es rápido y, en la mayoría de los casos, no duele.",
      "No suele requerir anestesia.",
    ],
    consider: [
      "Solo protege las superficies masticatorias del diente, no las caras laterales.",
      "Con el tiempo puede desgastarse o desprenderse, por lo que el dentista lo revisa y, si hace falta, lo repone.",
      "No sustituye a la higiene diaria ni a las revisiones periódicas.",
    ],
    aftercare: [
      "Evita morder objetos duros y comer alimentos muy pegajosos durante los primeros días.",
      "Mantén una higiene diaria completa, incluido el cepillado de las superficies masticatorias.",
      "Acude a las revisiones para que el dentista compruebe el estado del sellante.",
    ],
    faqs: [
      {
        q: "¿Duele la aplicación de sellantes?",
        a: "En la mayoría de los casos no. El procedimiento no suele requerir anestesia y es rápido.",
      },
      {
        q: "¿Solo sirve para niños?",
        a: "No. Se aplica habitualmente en los primeros molares permanentes, pero los adultos con surcos profundos también pueden beneficiarse.",
      },
      {
        q: "¿Los sellantes son permanentes?",
        a: "No necesariamente. Pueden desgastarse o desprenderse, por lo que el dentista los revisa y los repone si es necesario.",
      },
    ],
    todo: [
      "Confirmar la edad y el criterio que aplica la clínica para indicar sellantes en niños y en adultos.",
      "Confirmar el material y el protocolo de aplicación que utiliza la clínica, sin mencionar marcas.",
      "Confirmar la forma en que la clínica revisa y repone los sellantes.",
    ],
    sources: [
      {
        label: "Información sobre sellantes",
        url: "https://www.mouthhealthy.org/all-topics-a-z/sealants",
      },
      {
        label: "Información sobre caries",
        url: "https://www.mouthhealthy.org/all-topics-a-z/cavities",
      },
    ],
  },
  operatoria: {
    related: ["curaciones", "carillas-resina", "endodoncia"],
    whenItHelps: [
      "Cuando una caries ha formado una cavidad que necesita un material que sustituya el tejido perdido.",
      "Si un diente se ha fracturado parcialmente y necesita recuperar su forma.",
      "Cuando un empaste antiguo se ha deteriorado, se ha filtrado o se ha desgastado.",
    ],
    howItWorks: [
      "Se realiza una valoración del diente y se anestesia la zona si es necesario.",
      "Se retira el tejido dañado y se prepara la cavidad.",
      "Se coloca el material de restauración, normalmente resina compuesta, en capas y se endurece con luz.",
      "Se ajusta la mordida y se pule la restauración para que quede integrada con el diente.",
    ],
    benefits: [
      "Recupera la función y la forma del diente tras una caries o una fractura.",
      "Ayuda a evitar que el daño avance hacia capas más profundas.",
      "Puede realizarse con materiales que se ajustan al color natural del diente.",
    ],
    consider: [
      "Las restauraciones no son permanentes y pueden necesitar reparación o sustitución con el tiempo.",
      "Puede aparecer sensibilidad al frío o al dulce tras el tratamiento, que suele disminuir.",
      "Si el daño es muy extenso, puede ser necesaria una corona en lugar de una restauración simple.",
    ],
    aftercare: [
      "Evita morder con fuerza o masticar objetos duros durante los primeros días.",
      "Mantén una higiene diaria cuidadosa, con especial atención a los bordes de la restauración.",
      "Consulta al dentista si notas dolor, sensibilidad persistente o una mordida incómoda.",
    ],
    faqs: [
      {
        q: "¿Dolerá el tratamiento?",
        a: "Se utiliza anestesia local, por lo que el procedimiento no suele ser doloroso. Después puede quedar algo de sensibilidad temporal.",
      },
      {
        q: "¿Cuánto dura un empaste?",
        a: "Depende del tamaño de la restauración, de la mordida y de los hábitos. El dentista lo revisa en cada control y valora su mantenimiento.",
      },
      {
        q: "¿Qué diferencia hay con una curación?",
        a: "La operatoria restaura un diente dañado con un material definitivo. Las curaciones se centran en tratar la caries y proteger el diente, a veces de forma provisional.",
      },
    ],
    todo: [
      "Confirmar los materiales de restauración que usa la clínica (resina compuesta, ionómero de vidrio u otros), sin mencionar marcas.",
      "Confirmar el criterio de la clínica para indicar corona en lugar de restauración directa.",
      "Confirmar la frontera con el servicio de curaciones para los casos de caries y protección provisional.",
    ],
    sources: [
      {
        label: "Información sobre caries (NHS)",
        url: "https://www.nhs.uk/conditions/tooth-decay/",
      },
      {
        label: "Información sobre caries",
        url: "https://www.mouthhealthy.org/all-topics-a-z/cavities",
      },
    ],
  },
  curaciones: {
    related: ["operatoria", "endodoncia", "limpieza"],
    whenItHelps: [
      "Cuando hay una caries temprana que puede controlarse con flúor e higiene, antes de que avance.",
      "Si aparecen dolor o sensibilidad dental que requieren atención pronta.",
      "Como protección provisional de un diente antes de su tratamiento definitivo.",
    ],
    howItWorks: [
      "Se explora el diente y se valora la extensión de la caries.",
      "Se retira el tejido afectado y se limpia la zona.",
      "Se protege el diente con un material provisional o definitivo, según el caso.",
      "Se establece un plan de prevención y de seguimiento con el dentista.",
    ],
    benefits: [
      "Detiene o controla la progresión de la caries en sus fases iniciales.",
      "Alivia el dolor o la sensibilidad cuando se trata a tiempo.",
      "Protege el diente hasta que pueda recibir un tratamiento definitivo.",
    ],
    consider: [
      "Si la caries es profunda, puede ser necesario un tratamiento de conductos o, en casos graves, una extracción.",
      "Una cura provisional no es una solución permanente y necesita revisión.",
      "Si la caries se ha detectado tarde, el tratamiento puede ser más extenso.",
    ],
    aftercare: [
      "Sigue las indicaciones del dentista sobre la higiene y la alimentación.",
      "Acude a las revisiones para comprobar que la protección sigue en buen estado.",
      "Consulta al dentista si notas dolor, inflamación o una mordida incómoda.",
    ],
    faqs: [
      {
        q: "¿Una caries se puede tratar sin taladrar?",
        a: "En algunos casos iniciales, el dentista puede optar por medidas de control con flúor e higiene. La decisión depende de la valoración de cada diente.",
      },
      {
        q: "¿Qué pasa si no trato una caries?",
        a: "Puede avanzar hacia el nervio y causar dolor o infección, y los tratamientos posteriores suelen ser más complejos.",
      },
      {
        q: "¿Cuál es la diferencia con una operatoria?",
        a: "La curación controla la caries y protege el diente, a veces de forma provisional. La operatoria restaura el diente con un material de restauración más completo.",
      },
    ],
    todo: [
      "Confirmar la frontera entre curaciones y operatoria en esta clínica, para que la página no solape los dos servicios.",
      "Confirmar qué casos la clínica deriva a tratamiento de conductos o a extracción.",
      "Confirmar el enfoque preventivo y el plan de seguimiento que ofrece la clínica tras la curación.",
    ],
    sources: [
      {
        label: "Información sobre caries (NHS)",
        url: "https://www.nhs.uk/conditions/tooth-decay/",
      },
      {
        label: "Información sobre caries",
        url: "https://www.mouthhealthy.org/all-topics-a-z/cavities",
      },
    ],
  },
};
