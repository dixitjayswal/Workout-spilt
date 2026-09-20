import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL, SITE_URL, SITE_NAME, AUTHOR, exerciseSlugs, hasPhoto,
  exerciseTitle, exerciseDescription, usedIn
} from "@/lib/site";
import AdSlot from "@/components/AdSlot";
import { AD_SLOT_ARTICLE } from "@/lib/ads";

export function generateStaticParams() {
  return exerciseSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = ALL[slug];
  if (!e) return {};
  const url = `${SITE_URL}/exercise/${slug}`;
  const title = exerciseTitle(slug);
  const description = exerciseDescription(slug);
  const image = hasPhoto(slug) ? `${SITE_URL}/img/${slug}-0.jpg` : `${SITE_URL}/icon.svg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: SITE_NAME, type: "article",
      images: [{ url: image, width: 850, height: 567, alt: `${e.n} — starting position` }]
    },
    twitter: { card: "summary_large_image", title, description, images: [image] }
  };
}

export default async function ExercisePage({ params }) {
  const { slug } = await params;
  const e = ALL[slug];
  if (!e) notFound();

  const photo = hasPhoto(slug);
  const places = usedIn(slug);
  const url = `${SITE_URL}/exercise/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Exercises", item: `${SITE_URL}/exercise` },
          { "@type": "ListItem", position: 3, name: e.n, item: url }
        ]
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: exerciseTitle(slug),
        description: exerciseDescription(slug),
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
        ...(photo && {
          primaryImageOfPage: {
            "@type": "ImageObject",
            contentUrl: `${SITE_URL}/img/${slug}-0.jpg`,
            caption: `${e.n} — starting position`
          }
        })
      }
    ]
  };

  return (
    <div className="wrap article">
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Six-Day PPL</Link>
        <span aria-hidden="true">/</span>
        <Link href="/exercise">Exercises</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{e.n}</span>
      </nav>

      <header className="art-head">
        <p className="hero-eyebrow">Exercise guide</p>
        <h1>How to do {e.n.toLowerCase()}</h1>
        <p className="focus">{e.t}</p>
      </header>

      {photo && (
        <div className="frames">
          <figure className="frame">
            <img src={`/img/${slug}-0.jpg`} width="850" height="567"
              alt={`${e.n} starting position — correct set-up before the first rep`} />
            <figcaption>Start</figcaption>
          </figure>
          <figure className="frame">
            <img src={`/img/${slug}-1.jpg`} width="850" height="567"
              alt={`${e.n} finished position — the end of one repetition`} />
            <figcaption>End of rep</figcaption>
          </figure>
        </div>
      )}

      <section className="art-sec">
        <h2>Step by step</h2>
        <ol className="steps">{e.s.map((t, i) => <li key={i}>{t}</li>)}</ol>
      </section>

      <AdSlot slot={AD_SLOT_ARTICLE} format="fluid"
        layout="in-article" height={280} className="ad-article" />

      <section className="art-sec">
        <h2>The cue that matters</h2>
        <div className="notes">
          {e.c && <div className="note cue"><span className="k">Cue</span><span>{e.c}</span></div>}
          {e.m && <div className="note miss"><span className="k">Avoid</span><span>{e.m}</span></div>}
        </div>
      </section>

      {places.length > 0 && (
        <section className="art-sec">
          <h2>Where this sits in the split</h2>
          <ul className="used-list">
            {places.map((p, i) => (
              <li key={i}>
                {p.kind === "core" ? (
                  <Link href="/">Core menu</Link>
                ) : (
                  <Link href={`/day/${p.id}`}>{p.label}</Link>
                )}
                <span className="m">
                  {p.kind === "warm" ? " — warm-up"
                    : p.kind === "cool" ? " — cool-down"
                    : p.slot ? ` — exercise ${p.n}, ${p.slot.sets} × ${p.slot.reps}`
                    : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="art-cta">
        <Link href="/" className="cta-link">Open the full 6-day programme →</Link>
      </p>
    </div>
  );
}
