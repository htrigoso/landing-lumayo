export type TeamMember = {
  name: string;
  role: string;
  /** Portrait in public/images/about (team-1.jpg … team-4.jpg are ready to assign). */
  photo: string;
};

/**
 * Lumayo's team. Leave empty until the clinic confirms real names and specialties:
 * the team section on /nosotros only renders when this list has entries.
 *
 * Example:
 * { name: "Dra. Nombre Apellido", role: "Ortodoncista", photo: "/images/about/team-1.jpg" }
 */
export const team: TeamMember[] = [];
