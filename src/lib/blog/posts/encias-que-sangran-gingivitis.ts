import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  slug: "encias-que-sangran-gingivitis",
  title: "¿Te sangran las encías? Gingivitis y periodontitis",
  excerpt:
    "Las encías que sangran al cepillarte no son algo normal, aunque sea frecuente. Te explicamos sus causas, la diferencia entre gingivitis y periodontitis y cuándo conviene consultar.",
  category: "Prevención",
  readingMinutes: 5,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "El sangrado de encías suele indicar inflamación causada por la placa bacteriana que se acumula en los dientes.",
    "La gingivitis suele revertir con una buena higiene y una limpieza profesional; la periodontitis puede destruir el hueso que sostiene los dientes.",
    "La enfermedad de las encías puede no doler, por eso una revisión periódica es la mejor forma de detectarla a tiempo.",
  ],
  sections: [
    {
      id: "por-que-sangran",
      title: "Por qué sangran las encías",
      blocks: [
        {
          type: "p",
          text: "Las encías sangran cuando están inflamadas. La causa más común es la placa bacteriana, una capa pegajosa de bacterias que se forma sobre los dientes a diario. Si no se retira con el cepillado y el hilo dental, se endurece y se convierte en sarro, que solo puede eliminar un profesional.",
        },
        {
          type: "p",
          text: "Hay factores que aumentan el riesgo de que la inflamación aparezca o empeore. Entre ellos están fumar, tener diabetes sin controlar, los cambios hormonales del embarazo o de la menopausia, los antecedentes familiares de enfermedad de las encías, los dientes apiñados que dificultan la limpieza y la boca seca.",
        },
      ],
    },
    {
      id: "gingivitis-y-periodontitis",
      title: "Gingivitis y periodontitis: no es lo mismo",
      blocks: [
        {
          type: "p",
          text: "La gingivitis es la inflamación de la encía sin daño al hueso que sostiene el diente. Suele ser reversible: con una higiene constante y una limpieza profesional, la encía recupera su aspecto sano.",
        },
        {
          type: "p",
          text: "La periodontitis aparece cuando la inflamación avanza hacia las estructuras de soporte. Se forman bolsas entre la encía y el diente que se llenan de bacterias, y el hueso puede perderse de forma permanente. Lo delicado es que puede progresar sin dolor, así que muchas personas la descubren tarde, cuando el diente ya se mueve.",
        },
      ],
    },
    {
      id: "senales-de-alerta",
      title: "Señales que no debes ignorar",
      blocks: [
        {
          type: "p",
          text: "Las señales más habituales son el sangrado al cepillarte o al pasar el hilo dental, el mal aliento que no se va, la encía más roja o brillante de lo normal y la retracción, cuando los dientes parecen más largos.",
        },
        {
          type: "list",
          items: [
            "Sangrado frecuente al cepillar o usar hilo dental.",
            "Mal aliento persistente o mal sabor de boca.",
            "Encías que se separan de los dientes o se ven retraídas.",
            "Sensibilidad en la base de los dientes ante el frío o el calor.",
          ],
        },
        {
          type: "callout",
          tone: "alert",
          title: "Consulta pronto si notas",
          text: "Encías muy inflamadas o dolorosas, dientes que se aflojan o cambian de posición, pus o hinchazón alrededor de un diente, o llagas y bultos en la boca que no desaparecen por sí solos.",
        },
      ],
    },
    {
      id: "que-hace-el-dentista",
      title: "Qué hace el odontólogo",
      blocks: [
        {
          type: "p",
          text: "El odontólogo comienza revisando encías, dientes y mordida. Puede pedir radiografías para observar el hueso y medir la profundidad de los espacios entre la encía y el diente, lo que ayuda a saber si la inflamación es leve o avanzada.",
        },
        {
          type: "p",
          text: "En una gingivitis, la limpieza profesional retira el sarro y, junto con una mejor rutina en casa, suele ser suficiente. Si la enfermedad está más avanzada, el caso puede requerir un tratamiento más profundo o una derivación a otro especialista. En algunos casos, y solo si el dentista lo indica, se añade un enjuague bucal o un antibiótico.",
        },
      ],
    },
    {
      id: "cuidado-en-casa",
      title: "Cuidado en casa",
      blocks: [
        {
          type: "list",
          items: [
            "Cepíllate con un cepillo suave y dedica tiempo a cada zona, incluida la línea de la encía.",
            "Usa hilo dental o cepillos interdentales a diario para limpiar los espacios que el cepillo no alcanza.",
            "Revisa tu técnica con el odontólogo: cepillar con fuerza no limpia mejor y puede dañar la encía.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Un hábito que ayuda",
          text: "Después de cepillarte, escupe el exceso de pasta sin enjuagar de inmediato, para que el flúor siga actuando sobre el esmalte. Y no dejes de cepillarte solo porque la encía sangra: la inflamación suele mejorar con una limpieza constante.",
        },
      ],
    },
    {
      id: "prevencion",
      title: "Prevenir es más fácil que tratar",
      blocks: [
        {
          type: "p",
          text: "La mejor prevención combina higiene diaria, controles periódicos y una limpieza profesional cuando el odontólogo la recomiende. Si tomas algún medicamento que reseca la boca, coméntalo en consulta, porque la saliva protege las encías y conviene vigilar su efecto.",
        },
        {
          type: "p",
          text: "Si notas sangrado, no lo des por normal ni esperes a que desaparezca solo. Una revisión a tiempo suele ser más sencilla que tratar una periodontitis avanzada.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿Es normal que las encías sangren al cepillarme?",
      a: "No es lo habitual. El sangrado suele indicar inflamación causada por placa acumulada. Conviene una revisión para confirmarlo y mejorar la higiene.",
    },
    {
      q: "¿La gingivitis se puede curar?",
      a: "En la mayoría de los casos sí, porque la inflamación de la encía es reversible con una higiene adecuada y una limpieza profesional. La periodontitis, en cambio, requiere control continuo para frenar la pérdida de hueso.",
    },
    {
      q: "¿Dejo de cepillarme si me sangran las encías?",
      a: "No. Dejar de cepillar permite que la placa siga acumulándose. Cepíllate con suavidad y consulta con tu odontólogo si el sangrado no mejora.",
    },
  ],
  related: [
    { label: "Limpieza dental", href: "/servicios/limpieza" },
    { label: "Curaciones", href: "/servicios/curaciones" },
    { label: "Prótesis removibles", href: "/servicios/protesis" },
  ],
  coverServiceId: "limpieza",
  sources: [
    { label: "NHS: Gum disease", url: "https://www.nhs.uk/conditions/gum-disease/" },
    {
      label: "Cleveland Clinic: Gingivitis and periodontal disease",
      url: "https://my.clevelandclinic.org/health/diseases/10950-gingivitis-and-periodontal-disease-gum-disease",
    },
  ],
  todo: [
    "Confirmar si la clínica realiza raspado y alisado o deriva a un especialista en periodoncia.",
    "Confirmar que los enjuagues y antibióticos se mencionan solo a criterio del dentista.",
    "Confirmar la frecuencia de controles que recomienda la clínica.",
    "Confirmar la lista de medicamentos que resecan la boca; el texto la deja genérica.",
  ],
};
