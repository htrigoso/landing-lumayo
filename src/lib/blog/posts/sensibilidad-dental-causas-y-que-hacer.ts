import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  slug: "sensibilidad-dental-causas-y-que-hacer",
  title: "Sensibilidad dental: por qué duele con el frío y qué hacer",
  excerpt:
    "Si un sorbo de agua fría o un bocado dulce te hace dar un respingo, puede tratarse de sensibilidad dental. Te explicamos sus causas, qué puedes hacer en casa y cuándo consultar.",
  category: "Consejos",
  readingMinutes: 4,
  publishedAt: "2026-10-16",
  updatedAt: "2026-10-16",
  keyTakeaways: [
    "La sensibilidad aparece cuando la dentina queda expuesta, porque el esmalte o la encía que la cubren se han desgastado o retraído.",
    "Las causas más comunes son el cepillado agresivo, los alimentos ácidos, la caries y las encías retraídas; el bruxismo también puede contribuir.",
    "Con una higiene suave, una pasta para dientes sensibles y una revisión dental, muchas personas notan mejoría. Un dolor intenso o persistente merece consulta.",
  ],
  sections: [
    {
      id: "por-que-duele",
      title: "Por qué duele con el frío",
      blocks: [
        {
          type: "p",
          text: "Debajo del esmalte, la capa que cubre la corona del diente, hay una zona llamada dentina. Está formada por pequeños canales, o túbulos, que conectan con el nervio. Cuando la dentina queda expuesta, un cambio brusco de temperatura, un alimento dulce o un cepillado fuerte pueden mover el líquido de esos canales y estimular el nervio.",
        },
        {
          type: "p",
          text: "Por eso el dolor suele ser breve y agudo, y desaparece al retirar el estímulo. En la raíz, que no tiene esmalte, la dentina se expone con más facilidad.",
        },
      ],
    },
    {
      id: "causas-frecuentes",
      title: "Causas más frecuentes",
      blocks: [
        {
          type: "list",
          items: [
            "Alimentos y bebidas ácidas, como los refrescos, los cítricos o el vinagre, que desgastan el esmalte.",
            "Cepillado con demasiada fuerza o con un cepillo duro, que puede desgastar la dentina y retraer la encía.",
            "Encías retraídas, que dejan al descubierto la raíz del diente.",
            "Caries, fracturas o rellenos gastados que permiten el paso de estímulos hacia el interior.",
            "Bruxismo, es decir, rechinar o apretar los dientes, que desgasta el esmalte con el tiempo.",
          ],
        },
        {
          type: "p",
          text: "También es normal sentir sensibilidad pasajera después de una limpieza, una restauración o un blanqueamiento. En esos casos suele mejorar por sí sola. Si persiste, conviene comentarlo con el odontólogo.",
        },
      ],
    },
    {
      id: "que-puede-hacer-el-dentista",
      title: "Qué puede hacer el odontólogo",
      blocks: [
        {
          type: "p",
          text: "Lo primero es descartar problemas que producen un dolor parecido, como una caries o una fisura. Una revisión clínica, y a veces una radiografía, permite ver si hay desgaste, fractura o un relleno en mal estado.",
        },
        {
          type: "p",
          text: "Según el caso, el dentista puede aplicar flúor en consulta, sellar la dentina expuesta o cubrir la raíz con resina. Cuando el dolor es intenso y persistente, puede valorarse una endodoncia, pero solo a criterio del odontólogo y tras confirmar la causa.",
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
            "Cambia a un cepillo de cerdas suaves y cepíllate con movimientos ligeros.",
            "Usa una pasta para dientes sensibles, pensada para reducir el paso del estímulo hacia el nervio.",
            "Ten paciencia: el efecto de estas pastas se nota tras varios usos, no de inmediato.",
            "Modera los ácidos y evita sorbos prolongados de bebidas ácidas.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Un truco sencillo",
          text: "Antes de dormir, aplica un poco de pasta para dientes sensibles con el dedo sobre las zonas afectadas. Así el producto tiene más contacto con el diente mientras descansas.",
        },
      ],
    },
    {
      id: "cuando-consultar",
      title: "Cuándo consultar",
      blocks: [
        {
          type: "p",
          text: "Una sensibilidad leve que va y viene puede esperar a la siguiente revisión. Sin embargo, algunos síntomas requieren una cita pronto.",
        },
        {
          type: "callout",
          tone: "alert",
          title: "Pide cita pronto si",
          text: "El dolor agudo no cede o empeora, notas un diente roto o con una grieta, la encía se ve inflamada o sangra, o el dolor aparece al morder. No intentes limar ni raspar el diente por tu cuenta.",
        },
      ],
    },
    {
      id: "prevencion",
      title: "Prevenir la sensibilidad",
      blocks: [
        {
          type: "list",
          items: [
            "Mantén una higiene suave pero constante, con cepillado y uso de hilo dental.",
            "Consume ácidos con moderación y enjuágate con agua después de comerlos.",
            "Si rechinas los dientes por la noche, pregunta por una férula de descarga; el odontólogo decidirá si la necesitas.",
            "Acude a tus controles periódicos para detectar caries o desgastes antes de que duelan.",
          ],
        },
        {
          type: "p",
          text: "Cuidar el esmalte y las encías desde el principio es la forma más eficaz de evitar que la dentina quede expuesta.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "¿La sensibilidad dental se quita sola?",
      a: "A veces sí, sobre todo si es pasajera después de una limpieza o un tratamiento. Si es recurrente, conviene revisar la causa, porque suele haber un desgaste o una caries que no se corrige sin tratamiento.",
    },
    {
      q: "¿Las pastas para dientes sensibles funcionan?",
      a: "Muchas personas notan mejoría con el uso constante, aunque el efecto no es inmediato. Si tras un tiempo de uso regular no notas cambios, consulta con el odontólogo para buscar la causa.",
    },
    {
      q: "¿Cuándo es urgente una consulta por sensibilidad?",
      a: "Cuando el dolor es agudo, no cede o empeora, o cuando hay un diente roto o una encía inflamada. En esos casos conviene pedir cita pronto.",
    },
  ],
  related: [
    { label: "Flúor barniz", href: "/servicios/fluor-barniz" },
    { label: "Curaciones", href: "/servicios/curaciones" },
    { label: "Endodoncia", href: "/servicios/endodoncia" },
  ],
  coverServiceId: "fluor-barniz",
  sources: [
    {
      label: "Cleveland Clinic: Teeth sensitivity",
      url: "https://my.clevelandclinic.org/health/symptoms/10954-teeth-sensitivity",
    },
    {
      label: "MouthHealthy: Sensitive teeth",
      url: "https://www.mouthhealthy.org/all-topics-a-z/sensitive-teeth",
    },
  ],
  todo: [
    "Confirmar las opciones de tratamiento que ofrece la clínica (flúor, sellado de dentina o resina en raíces) antes de publicar.",
    "Validar el consejo de aplicar la pasta para dientes sensibles con el dedo por la noche.",
    "Revisar el tono del texto sobre sensibilidad pasajera tras un blanqueamiento.",
  ],
};
