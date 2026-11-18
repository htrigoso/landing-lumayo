import { buildDate } from "@/lib/ai-resources/build-date";
import { securityExpires, securityTxt } from "@/lib/ai-resources/security-txt";

/** /.well-known/security.txt: canonical location of the security contact (RFC 9116). Same text as /security.txt. */
export async function GET() {
  const expires = securityExpires(await buildDate());
  return new Response(securityTxt({ expires }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
