export type TeamMember = {
  /** Stable id, referenced by `BlogPost.reviewer` and `defaultReviewerId`. */
  id: string;
  name: string;
  role: string;
  /** Clinical specialty, e.g. "Ortodoncia". Shown under the name when present. */
  specialty?: string;
  /** Peruvian dentist license number (COP). Shown and sent to JSON-LD only when present. */
  cop?: string;
  /** Portrait in public/images/about (team-1.jpg … team-4.jpg are ready to assign). Omit until a real portrait exists; the card shows initials instead. */
  photo?: string;
};

/**
 * Lumayo's team. Leave empty until the clinic confirms real names, specialties and COP numbers:
 * the team section on /nosotros only renders when this list has entries.
 *
 * Example (placeholder data, not real):
 * { id: "dra-nombre", name: "Dra. Nombre Apellido", role: "Ortodoncista", specialty: "Ortodoncia", cop: "00000", photo: "/images/about/team-1.jpg" }
 */
export const team: TeamMember[] = [
  {
    id: "dra-silkiens-urbina",
    name: "Dra. Silkiens Diana Urbina Rivera",
    role: "Cirujana dentista",
    // The business card reads "CCD: 55878"; confirm the register code before publishing.
    cop: "55878",
    // TEMPORARY stock photo (Unsplash, Vitaly Gariev). Not her; replace with her real portrait.
    photo: "https://images.unsplash.com/photo-1758691462651-611d730c5272?w=900&h=924&fit=crop&crop=faces&q=80&auto=format",
  },
];

// TODO(SEO): set when the clinic confirms who reviews content
export const defaultReviewerId: string | undefined = undefined;

/** Team member with this id, or undefined when the id is missing or unknown. */
export function getTeamMember(id?: string): TeamMember | undefined {
  if (!id) return undefined;
  return team.find((member) => member.id === id);
}
