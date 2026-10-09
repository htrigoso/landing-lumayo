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
  | "implant"
  | "denture"
  | "root"
  | "child";

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: ServiceIcon;
  /** Vertical cover photo for the services carousel. */
  image: string;
  featured?: boolean;
};

/**
 * Stock photo from Unsplash (Unsplash License: free for commercial use) cropped for the
 * vertical service cards. Replace with the clinic's own photos when available.
 */
const servicePhoto = (id: string) => `https://images.unsplash.com/${id}?w=640&h=520&fit=crop&crop=entropy&q=75&auto=format`;

export const services: Service[] = [
  {
    id: "ortodoncia",
    name: "Ortodoncia con brackets",
    description:
      "Alinea tus dientes y mejora tu mordida con un plan de tratamiento hecho a tu medida.",
    icon: "braces",
    image: servicePhoto("photo-1584434081454-2a898b8e33d5"),
    featured: true,
  },
  {
    id: "blanqueamiento",
    name: "Blanqueamiento dental",
    description:
      "Aclara el tono de tus dientes de forma segura y luce una sonrisa más luminosa.",
    icon: "sparkle",
    image: servicePhoto("photo-1654373535457-383a0a4d00f9"),
  },
  {
    id: "implantes",
    name: "Implantes dentales",
    description:
      "Reemplaza piezas perdidas con una solución fija, firme y de aspecto natural.",
    icon: "implant",
    image: servicePhoto("photo-1771442873035-474765b40ac6"),
  },
  {
    id: "protesis",
    name: "Prótesis removibles",
    description:
      "Recupera la función y la estética de tu sonrisa con prótesis cómodas y bien ajustadas.",
    icon: "denture",
    image: servicePhoto("photo-1612736777093-461fb48101d7"),
  },
  {
    id: "endodoncia",
    name: "Endodoncia",
    description:
      "Tratamiento de conducto para aliviar el dolor y conservar tu diente natural.",
    icon: "root",
    image: servicePhoto("photo-1657470179447-0f5aa16daa91"),
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    description:
      "Atención amable y paciente para que los más pequeños vivan una visita tranquila.",
    icon: "child",
    image: servicePhoto("photo-1733817336090-04082ff6ab4f"),
  },
];

export const bookingServiceOptions = [
  "Ortodoncia con brackets",
  "Evaluación general",
  "Blanqueamiento dental",
  "Implantes dentales",
  "Prótesis removibles",
  "Endodoncia",
  "Odontopediatría",
  "Otro / no estoy seguro",
] as const;
