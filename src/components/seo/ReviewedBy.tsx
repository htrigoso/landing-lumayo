import type { TeamMember } from "@/lib/team";

/**
 * "Revisado por" badge: name, specialty and COP, each part only when it exists.
 * Renders nothing without a member, so pages show no placeholder while the team list is empty.
 */
export function ReviewedBy({ member }: { member: TeamMember | undefined }) {
  if (!member) return null;

  const parts = [member.specialty, member.cop ? `COP ${member.cop}` : undefined].filter(Boolean);

  return (
    <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border bg-surface-soft px-3 py-1 text-xs text-text">
      <span>
        Revisado por <strong className="font-semibold text-heading">{member.name}</strong>
      </span>
      {parts.map((part) => (
        <span key={part} className="text-text-muted">
          · {part}
        </span>
      ))}
    </p>
  );
}
