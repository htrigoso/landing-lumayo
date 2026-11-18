import { buildDate } from "@/lib/ai-resources/build-date";
import { securityExpires, securityTxt } from "@/lib/ai-resources/security-txt";

/** /security.txt: the same file as /.well-known/security.txt (RFC 9116). Expires one year after the build date. */
export async function GET() {
  const expires = securityExpires(await buildDate());
  return new Response(securityTxt({ expires }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
