import Link from "next/link";
import { SITE_URL, AUTHOR } from "@/lib/site";
import { ADSENSE_CLIENT } from "@/lib/ads";

export const metadata = {
  title: "Privacy policy",
  description: "What this site stores, what it does not, and how advertising cookies are handled.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true }
};

export default function Privacy() {
  return (
    <div className="wrap article">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Six-Day PPL</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Privacy</span>
      </nav>

      <header className="art-head">
        <p className="hero-eyebrow">Legal</p>
        <h1>Privacy policy</h1>
        <p className="focus">Last updated 20 September 2026</p>
      </header>

      <section className="art-sec">
        <h2>What this site stores about you</h2>
        <p className="lede">
          Nothing on a server. This site has no accounts, no database and no backend. The
          exercises you tick off, the movement variants you pick and your light/dark preference
          are saved in your own browser&rsquo;s <code>localStorage</code>. That data never
          leaves your device, is not readable by me, and disappears when you clear your browser
          data for this site.
        </p>
      </section>

      <section className="art-sec">
        <h2>Analytics</h2>
        <p className="lede">
          This site is hosted on Vercel, which records standard request logs (IP address,
          user agent, requested page) for delivery and abuse prevention. See the{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
            Vercel privacy policy
          </a>.
        </p>
      </section>

      <section className="art-sec">
        <h2>Advertising</h2>
        {ADSENSE_CLIENT ? (
          <>
            <p className="lede">
              This site shows ads served by Google AdSense. Google and its partners use cookies
              and similar technologies to serve ads based on your prior visits to this and other
              websites. Google&rsquo;s use of advertising cookies enables it and its partners to
              serve ads to you based on your visit to this site and/or other sites on the
              internet.
            </p>
            <p className="lede" style={{ marginTop: 12 }}>
              You can opt out of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
                Google Ads Settings
              </a>. You can also opt out of third-party vendor cookies at{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">
                aboutads.info/choices
              </a>. For more on how Google uses data from sites that use its services, see{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
                Google&rsquo;s partner-sites notice
              </a>.
            </p>
          </>
        ) : (
          <p className="lede">
            This site currently shows no advertising and sets no advertising cookies.
          </p>
        )}
      </section>

      <section className="art-sec">
        <h2>Health disclaimer</h2>
        <p className="lede">
          This is a training plan written from personal experience, not medical advice. Consult
          a qualified professional before starting any exercise programme. If a movement causes
          pain in a joint rather than fatigue in a muscle, stop the set.
        </p>
      </section>

      <section className="art-sec">
        <h2>Contact</h2>
        <p className="lede">
          Questions about this policy: <a href={AUTHOR.url} target="_blank" rel="noreferrer">
            {AUTHOR.name} on GitHub
          </a>.
        </p>
      </section>

      <p className="art-cta">
        <Link href="/" className="cta-link">Back to the programme →</Link>
      </p>
    </div>
  );
}
