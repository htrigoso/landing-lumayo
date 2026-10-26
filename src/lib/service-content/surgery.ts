import type { ServiceContent } from "@/lib/service-content/types";

export const surgeryContent: Record<string, ServiceContent> = {
  "endodoncia": {
    related: ["curaciones", "carillas-zirconio", "operatoria"],
    whenItHelps: [
      "Cuando la pulpa del diente está inflamada o infectada y causa dolor persistente.",
      "Cuando una infección en la raíz se manifiesta como flemón o molestias al masticar.",
      "Cuando una caries profunda ha llegado al interior del diente.",
      "Cuando se quiere conservar un diente natural en lugar de extraerlo.",
    ],
    howItWorks: [
      "El dentista revisa el diente con radiografías y pruebas de sensibilidad para confirmar el diagnóstico.",
      "Se aplica anestesia local para que el procedimiento sea cómodo.",
      "Se retira la pulpa afectada y se limpian, dan forma y desinfectan los conductos de la raíz.",
      "Los conductos se rellenan con un material biocompatible llamado gutapercha y se sella la entrada.",
      "Se coloca una restauración definitiva; en muchos casos, una corona, según la estructura que quede del diente.",
    ],
    benefits: [
      "Permite conservar un diente natural y su función masticatoria.",
      "Alivia el dolor causado por la pulpa inflamada o infectada.",
      "Ayuda a detener la progresión de una infección en la raíz.",
    ],
    consider: [
      "Es común sentir algo de molestia o sensibilidad durante unos días tras el tratamiento.",
      "Según el caso puede requerir una o varias citas, y lo define el dentista.",
      "El diente tratado puede necesitar una restauración adicional para protegerlo.",
    ],
    aftercare: [
      "Sigue las indicaciones de tu dentista sobre el uso de analgésicos y la masticación.",
      "Evita morder con fuerza sobre el diente tratado hasta que esté restaurado.",
      "Mantén una higiene oral cuidadosa y acude a los controles programados.",
    ],
    faqs: [
      {
        q: "¿El tratamiento de conductos duele?",
        a: "Se realiza con anestesia local, por lo que el procedimiento en sí no debería doler. Es habitual notar algo de molestia en los días posteriores.",
      },
      {
        q: "¿Siempre necesito una corona después?",
        a: "No siempre. La decisión depende de cuánta estructura dental quede; el dentista te indicará la opción más adecuada para tu caso.",
      },
      {
        q: "¿Cuántas citas se necesitan?",
        a: "Depende de la complejidad del caso. Puede resolverse en una o varias visitas, y lo define el dentista tras la evaluación.",
      },
    ],
    todo: [
      "Confirmar los pasos del protocolo que aplica la clínica (anestesia, limpieza de conductos y tipo de sellado).",
      "Confirmar la política de restauración posterior (corona o empaste) y cuándo se recomienda cada una.",
      "Confirmar si la clínica trabaja con endodoncia de una o varias sesiones y el criterio para cada caso.",
    ],
    sources: [
      { label: "American Association of Endodontists: qué es un tratamiento de conductos", url: "https://www.aae.org/patients/root-canal-treatment/what-is-a-root-canal/" },
      { label: "NHS: tratamiento de conductos", url: "https://www.nhs.uk/conditions/root-canal-treatment/" },
    ],
  },
  "extracciones": {
    related: ["implantes", "protesis", "muelas-del-juicio"],
    whenItHelps: [
      "Cuando un diente está muy dañado por caries o fractura y no puede restaurarse.",
      "Cuando un diente está muy movilizado por problemas de encías o hueso.",
      "Cuando existe una infección que no responde a otros tratamientos.",
      "Cuando se necesita espacio, por ejemplo antes de un tratamiento de ortodoncia.",
    ],
    howItWorks: [
      "El dentista evalúa el diente con una exploración clínica y, si es necesario, radiografías.",
      "Se aplica anestesia local en la zona; en algunos casos se usa sedación adicional.",
      "Se separa el diente del hueso que lo rodea y se retira de su alveolo.",
      "Se limpia la zona y se coloca una gasa para favorecer la coagulación.",
      "Se explican los cuidados posteriores y, si procede, las opciones para reemplazar el diente.",
    ],
    benefits: [
      "Elimina un foco de dolor o infección.",
      "Permite preparar la boca para otros tratamientos, como ortodoncia o prótesis.",
      "El procedimiento suele ser rápido y se realiza con anestesia local.",
    ],
    consider: [
      "Tras perder un diente, los dientes vecinos pueden desplazarse con el tiempo.",
      "Es importante hablar con el dentista sobre opciones para reemplazar el diente perdido.",
      "Como toda cirugía, puede presentar complicaciones, como la alveolitis (alveolo seco), que el dentista te explicará.",
    ],
    aftercare: [
      "Sigue las indicaciones de tu dentista sobre la gasa, la higiene y la alimentación.",
      "Evita escupir con fuerza, fumar y usar pajitas durante los primeros días.",
      "Avisa a la clínica si el sangrado, el dolor o la inflamación aumentan con el tiempo.",
    ],
    faqs: [
      {
        q: "¿La extracción es dolorosa?",
        a: "Se realiza con anestesia local, por lo que la zona queda adormecida durante el procedimiento. Después es normal sentir molestias que se controlan con las indicaciones del dentista.",
      },
      {
        q: "¿Qué pasa con el diente de al lado?",
        a: "Al perder un diente, los vecinos pueden moverse con el tiempo. Por eso conviene hablar de opciones de reemplazo desde el principio.",
      },
      {
        q: "¿Siempre se necesita sedación?",
        a: "No. La sedación solo se utiliza en algunos casos, según la complejidad y las necesidades del paciente.",
      },
    ],
    todo: [
      "Confirmar si la clínica ofrece sedación y en qué casos la aplica.",
      "Confirmar el protocolo de cuidados posteriores que entrega la clínica al paciente.",
      "Confirmar qué extracciones se realizan en consulta y cuáles se derivan a especialista.",
    ],
    sources: [
      { label: "Cleveland Clinic: extracción dental", url: "https://my.clevelandclinic.org/health/treatments/22120-tooth-extraction" },
      { label: "Cleveland Clinic: alveolitis (alveolo seco)", url: "https://my.clevelandclinic.org/health/diseases/17731-dry-socket" },
    ],
  },
  "muelas-del-juicio": {
    related: ["extracciones", "limpieza", "operatoria"],
    whenItHelps: [
      "Cuando la muela del juicio causa dolor o inflamación recurrente en la encía.",
      "Cuando hay infecciones alrededor de una muela parcialmente salida.",
      "Cuando provoca caries en la muela vecina y no puede limpiarse bien.",
      "Cuando no hay espacio suficiente para que erupcione correctamente.",
    ],
    howItWorks: [
      "El dentista revisa la posición de la muela y pide radiografías para valorar su situación.",
      "Se decide si conviene extraerla o mantenerla bajo control, según el caso.",
      "Si se indica la extracción, se aplica anestesia local en la zona.",
      "Se retira la muela, en ocasiones dividiéndola si está parcial o totalmente incluida en el hueso.",
      "Se explican los cuidados posteriores y los signos que requieren avisar a la clínica.",
    ],
    benefits: [
      "Elimina el riesgo de infecciones o caries recurrentes en la zona.",
      "Evita molestias asociadas a una erupción incompleta o con poco espacio.",
      "Puede prevenir problemas en las muelas vecinas.",
    ],
    consider: [
      "No todas las muelas del juicio necesitan extracción; a veces se recomienda seguimiento.",
      "Tras la extracción es habitual tener inflamación, dolor o rigidez durante unos días.",
      "En casos de muelas muy incluidas puede ser necesario derivar a un especialista.",
    ],
    aftercare: [
      "Sigue las indicaciones de tu dentista sobre la gasa, la medicación y la alimentación.",
      "Evita actividades que puedan aumentar el sangrado durante los primeros días.",
      "Acude a los controles que te indique la clínica.",
    ],
    faqs: [
      {
        q: "¿Todas las muelas del juicio hay que quitarlas?",
        a: "No. Solo se recomienda extraerlas cuando causan problemas o existe un riesgo claro; en otros casos se controlan con revisiones periódicas.",
      },
      {
        q: "¿Qué síntomas indican que conviene revisarla?",
        a: "Dolor, inflamación de la encía, mal sabor o dificultad para abrir la boca pueden indicar que es necesaria una valoración.",
      },
      {
        q: "¿Qué puede ocurrir después de la extracción?",
        a: "Es habitual notar inflamación y molestias. Las complicaciones son poco frecuentes, y el dentista te explicará los signos de alerta.",
      },
    ],
    todo: [
      "Confirmar los criterios de la clínica para recomendar extracción o seguimiento.",
      "Confirmar si la clínica realiza extracciones de muelas incluidas o las deriva a especialista.",
      "Confirmar el protocolo de cuidados y medicación de apoyo que entrega la clínica.",
    ],
    sources: [
      { label: "Mouth Healthy (ADA): muelas del juicio", url: "https://www.mouthhealthy.org/all-topics-a-z/wisdom-teeth" },
      { label: "NHS: extracción de muelas del juicio", url: "https://www.nhs.uk/conditions/wisdom-tooth-removal/" },
    ],
  },
  "implantes": {
    related: ["protesis", "extracciones", "operatoria"],
    whenItHelps: [
      "Cuando falta uno o varios dientes y se quiere reemplazarlos de forma fija.",
      "Cuando no se desea tallar los dientes vecinos para colocar un puente.",
      "Cuando una prótesis removible no resulta cómoda o estable.",
      "Cuando se busca recuperar la función masticatoria y la estética.",
    ],
    howItWorks: [
      "El dentista evalúa el hueso y las encías mediante exploración y radiografías o tomografía.",
      "Se coloca un tornillo de titanio en el hueso, que actúa como raíz artificial.",
      "Durante un periodo de cicatrización, el hueso se integra con el implante.",
      "Después se coloca un pilar y, sobre él, una corona, un puente o una prótesis.",
      "Se realizan revisiones para comprobar la integración y el estado de la zona.",
    ],
    benefits: [
      "Sustituye la raíz del diente perdido y ayuda a preservar el hueso de la zona.",
      "No requiere tallar los dientes vecinos sanos.",
      "Puede ofrecer una sensación de estabilidad y comodidad similar a la de un diente natural.",
    ],
    consider: [
      "Es necesario tener suficiente hueso y encías sanas; en algunos casos se requiere injerto, lo que alarga el tratamiento.",
      "El tabaco y la diabetes no controlada pueden afectar la cicatrización.",
      "Existen riesgos como infección, daño a dientes vecinos, problemas en el seno o en el nervio, o pérdida del implante.",
    ],
    aftercare: [
      "Sigue las indicaciones de tu dentista sobre higiene, alimentación y medicación.",
      "Mantén una higiene constante alrededor del implante y acude a los controles.",
      "Avisa a la clínica si notas movilidad, dolor persistente o inflamación.",
    ],
    faqs: [
      {
        q: "¿El implante duele al colocarlo?",
        a: "La colocación se realiza con anestesia local. Es habitual sentir molestias en los días siguientes, que se controlan con las indicaciones del dentista.",
      },
      {
        q: "¿Todas las personas pueden ponerse implantes?",
        a: "No necesariamente. Depende del estado del hueso, de las encías y de la salud general; el dentista lo valorará en la evaluación.",
      },
      {
        q: "¿Cuánto tiempo dura el proceso?",
        a: "Varía según cada caso, sobre todo si se necesita injerto o si hay que esperar a la integración del hueso. Lo define el dentista.",
      },
    ],
    todo: [
      "Confirmar el tipo de implantes que utiliza la clínica y los pasos del protocolo.",
      "Confirmar si la clínica realiza injertos óseos o los deriva a un especialista.",
      "Confirmar los criterios de la clínica para valorar pacientes fumadores o con diabetes.",
    ],
    sources: [
      { label: "Mayo Clinic: cirugía de implante dental", url: "https://www.mayoclinic.org/tests-procedures/dental-implant-surgery/about/pac-20384622" },
      { label: "Cleveland Clinic: injerto óseo dental", url: "https://my.clevelandclinic.org/health/treatments/21727-dental-bone-graft" },
    ],
  },
  "protesis": {
    related: ["implantes", "extracciones", "limpieza"],
    whenItHelps: [
      "Cuando faltan varios dientes y se busca una solución removible.",
      "Cuando se necesita reemplazar todos los dientes de una arcada.",
      "Cuando no se puede o no se desea colocar implantes.",
      "Cuando se requiere una opción provisional mientras se planifica otro tratamiento.",
    ],
    howItWorks: [
      "El dentista toma impresiones y registros de la boca para diseñar la prótesis a medida.",
      "Se realizan pruebas para comprobar el ajuste, la forma y el color.",
      "Se entrega la prótesis y se revisa su adaptación en la boca.",
      "Se programan controles para hacer ajustes según la evolución de las encías y el hueso.",
    ],
    benefits: [
      "Permite reemplazar varios o todos los dientes sin intervención quirúrgica.",
      "Ayuda a recuperar la capacidad de masticar y la estética de la sonrisa.",
      "Puede adaptarse y ajustarse a lo largo del tiempo.",
    ],
    consider: [
      "Requiere un periodo de adaptación de algunas semanas, durante el cual puede haber molestias.",
      "Las encías y el hueso cambian con el tiempo, por lo que los ajustes o rebasados son frecuentes.",
      "Un mal ajuste puede provocar llagas; las prótesis inmediatas suelen necesitar ajustes durante la cicatrización.",
    ],
    aftercare: [
      "Sigue las indicaciones de tu dentista sobre el uso y la limpieza de la prótesis.",
      "Guarda la prótesis húmeda cuando no la uses, según te indique la clínica.",
      "Acude a los controles para revisar el ajuste y el estado de la boca.",
    ],
    faqs: [
      {
        q: "¿Cuánto tarda en acostumbrarse una prótesis removible?",
        a: "Suele necesitar un periodo de adaptación de algunas semanas. Es normal sentir cierta molestia al principio.",
      },
      {
        q: "¿Cómo se limpia una prótesis?",
        a: "Se limpia a diario con un cepillo suave y productos no abrasivos. También conviene cepillar encías, lengua y paladar.",
      },
      {
        q: "¿Por qué hay que ajustarla con el tiempo?",
        a: "Porque las encías y el hueso cambian. Los ajustes ayudan a mantener la comodidad y evitar llagas.",
      },
    ],
    todo: [
      "Confirmar los tipos de prótesis removible que ofrece la clínica (total, parcial o inmediata).",
      "Confirmar el protocolo de ajustes y rebasados incluidos en el tratamiento.",
      "Confirmar las recomendaciones de limpieza y mantenimiento que entrega la clínica.",
    ],
    sources: [
      { label: "NHS: prótesis dentales", url: "https://www.nhs.uk/conditions/dentures/" },
      { label: "Mouth Healthy (ADA): prótesis dentales", url: "https://www.mouthhealthy.org/all-topics-a-z/dentures" },
    ],
  },
  "odontopediatria": {
    related: ["sellantes", "fluor-barniz", "brackets-convencionales"],
    program: "kids",
    whenItHelps: [
      "Cuando el niño necesita una primera revisión dental.",
      "Cuando se quiere prevenir caries desde la aparición de los primeros dientes.",
      "Cuando el niño presenta miedo o dificultad para recibir atención dental.",
      "Cuando los padres quieren orientación sobre higiene y hábitos en casa.",
    ],
    howItWorks: [
      "La primera visita es una revisión sencilla para conocer al niño y valorar su desarrollo dental.",
      "El dentista explica a los padres los hábitos de higiene y alimentación adecuados para la edad.",
      "Se realizan revisiones periódicas para detectar problemas a tiempo y ajustar la prevención.",
      "Si hace falta, el tratamiento se adapta a la edad y al comportamiento del niño.",
    ],
    benefits: [
      "Permite detectar problemas a tiempo y prevenir caries.",
      "Ayuda a que el niño se acostumbre a la consulta dental de forma positiva.",
      "Orienta a los padres en higiene, alimentación y cuidado de los dientes de leche.",
    ],
    consider: [
      "Los dientes de leche son importantes para masticar, hablar y guardar espacio para los permanentes.",
      "La frecuencia de las revisiones depende del riesgo de cada niño, y la define el dentista.",
      "Algunos niños necesitan más tiempo para adaptarse; el ritmo de cada visita puede variar.",
    ],
    aftercare: [
      "Sigue las indicaciones de tu dentista sobre higiene, alimentación y uso de flúor.",
      "Cepilla los dientes del niño con pasta con flúor y supervisa hasta que pueda hacerlo bien.",
      "Evita bebidas azucaradas y el biberón al acostarse.",
    ],
    faqs: [
      {
        q: "¿Cuándo debe ir el niño por primera vez al dentista?",
        a: "Se recomienda la primera visita antes de cumplir un año o en los seis meses siguientes a la aparición del primer diente, lo que ocurra primero.",
      },
      {
        q: "¿Desde cuándo debo cepillar los dientes de mi hijo?",
        a: "Desde que salga el primer diente, con pasta con flúor en cantidad adecuada y bajo supervisión de un adulto.",
      },
      {
        q: "¿Por qué son importantes los dientes de leche?",
        a: "Ayudan a masticar y a hablar, y mantienen el espacio para que los dientes permanentes salgan en su posición.",
      },
    ],
    todo: [
      "Confirmar la edad recomendada para la primera visita según el protocolo de la clínica.",
      "Confirmar la frecuencia de revisiones que aplica la clínica y cómo se ajusta al riesgo de cada niño.",
      "Confirmar las técnicas de manejo de conducta que utiliza el equipo con niños.",
    ],
    sources: [
      { label: "AAPD: preguntas frecuentes para padres", url: "https://www.aapd.org/resources/parent/faq/" },
      { label: "HealthyChildren (AAP): higiene bucal desde el inicio", url: "https://www.healthychildren.org/English/healthy-living/oral-health/Pages/Brushing-Up-on-Oral-Health-Never-Too-Early-to-Start.aspx" },
      { label: "Mouth Healthy (ADA): primera visita dental del bebé", url: "https://www.mouthhealthy.org/life-stages/babies-and-kids/first-dental-visit-for-baby" },
    ],
  },
};
