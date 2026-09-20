/* Plain module — no "use client". NEXT_PUBLIC_* values are inlined at build
   time into both the server and client bundles, so server components and
   client components can both read these safely.

   Importing a value out of a "use client" module into a server component does
   NOT give you the value — it gives you a client reference object, which is
   always truthy. That silently defeats every `if (CLIENT_ID)` guard. */

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const AD_SLOT_ARTICLE = process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE || "";
export const AD_SLOT_RAIL = process.env.NEXT_PUBLIC_AD_SLOT_RAIL || "";
export const ADS_ENABLED = Boolean(ADSENSE_CLIENT);
