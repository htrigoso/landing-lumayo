import { site, siteUrl } from "@/lib/site";

/**
 * security.txt (RFC 9116), served at /.well-known/security.txt and /security.txt from the same text.
 * Expires is one year after the build date, as an ISO 8601 UTC timestamp.
 */
export function securityExpires(buildDate: string): string {
  const expires = new Date(`${buildDate}T00:00:00.000Z`);
  expires.setUTCFullYear(expires.getUTCFullYear() + 1);
  return expires.toISOString();
}

export function securityTxt({ expires }: { expires: string }): string {
  return [
    "# security.txt (RFC 9116) | Lumayo Centro Odontológico",
    `Contact: mailto:${site.email}`,
    `Contact: ${siteUrl}/contacto`,
    `Expires: ${expires}`,
    "Preferred-Languages: es, en",
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    `Canonical: ${siteUrl}/security.txt`,
    "",
  ].join("\n");
}
