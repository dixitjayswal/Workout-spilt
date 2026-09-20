import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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
  title: "Six-Day PPL",
  description:
    "A 6-day push/pull/legs hypertrophy split with photographed execution steps, coaching cues, weekly volume analysis and a rest timer.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: "Six-Day PPL", statusBarStyle: "black-translucent" },
  openGraph: {
    title: "Six-Day PPL",
    description: "Push/pull/legs ×2 — every lift photographed, with execution steps, cues and a rest timer.",
    type: "website"
  }
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
          before React hydrates, which React otherwise reports as a mismatch.
          This suppresses the diff for this element's attributes only. */}
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
