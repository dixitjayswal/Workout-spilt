import { ADSENSE_CLIENT } from "@/lib/ads";

/* Google requires an ads.txt at the domain root declaring who may sell your
   inventory. Without it AdSense flags the site as "Earnings at risk".
   The publisher ID is written WITHOUT the leading "ca-".
   f08c47fec0942fa0 is Google's own fixed certification-authority ID. */

export const dynamic = "force-static";

export function GET() {
  if (!ADSENSE_CLIENT) {
    return new Response("# No AdSense publisher configured.\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const pub = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
