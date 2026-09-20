import Script from "next/script";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/site";
import { ADSENSE_CLIENT } from "@/lib/ads";
import "./globals.css";

const cond = Barlow_Condensed({
  subsets: ["latin"], weight: ["600", "700"], display: "swap", variable: "--font-cond"
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-sans"
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"], weight: ["500", "600"], display: "swap", variable: "--font-mono"
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Six-Day PPL — push/pull/legs split with photos for every exercise",
    template: `%s | ${SITE_NAME}`
  },
  description:
    "A 6-day push/pull/legs hypertrophy split. Every exercise has start and finish photos, " +
    "numbered execution steps, the key coaching cue, the common mistake, plus a rest timer " +
    "and weekly volume breakdown.",
  keywords: [
    "push pull legs split", "6 day ppl", "ppl routine", "hypertrophy programme",
    "workout split with pictures", "how to do exercises correctly", "gym routine"
  ],
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
  alternates: { canonical: "/" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  },
  openGraph: {
    type: "website", siteName: SITE_NAME, url: SITE_URL,
    title: "Six-Day PPL — push/pull/legs split with photos for every exercise",
    description:
      "Push/pull/legs ×2 — every lift photographed, with execution steps, cues and a rest timer."
  },
  twitter: { card: "summary_large_image" },
  ...(ADSENSE_CLIENT && { other: { "google-adsense-account": ADSENSE_CLIENT } })
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E6EAEF" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1014" }
  ]
};

/* Applies the saved theme before first paint so the page never flashes the
   wrong ground colour on load. */
const themeScript = `
try {
  var s = JSON.parse(localStorage.getItem("ppl6.v2") || "{}");
  if (s.theme === "dark" || s.theme === "light") {
    document.documentElement.setAttribute("data-theme", s.theme);
  }
} catch (e) {}
`;

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url }
};

export default function RootLayout({ children }) {
  return (
    // themeScript stamps data-theme on <html> before paint, so the server markup
    // deliberately differs from the hydrated DOM here.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cond.variable} ${sans.variable} ${mono.variable}`}
    >
      {/* Extensions (Grammarly, password managers) inject attributes onto <body>
          before React hydrates, which React otherwise reports as a mismatch. */}
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        {children}

        {ADSENSE_CLIENT && (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
      </body>
    </html>
  );
}
