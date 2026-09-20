import Link from "next/link";
import { notFound } from "next/navigation";
import { PROGRAM } from "@/lib/program";
import { ALL, SITE_URL, SITE_NAME, AUTHOR, dayTitle, dayDescription, hasPhoto } from "@/lib/site";
import AdSlot from "@/components/AdSlot";
import { AD_SLOT_ARTICLE } from "@/lib/ads";

export function generateStaticParams() {
  return PROGRAM.map(d => ({ id: d.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const day = PROGRAM.find(d => d.id === id);
  if (!day) return {};
  const url = `${SITE_URL}/day/${id}`;
  const title = dayTitle(day);
  const description = dayDescription(day);
  const first = day.slots[0].v[0];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: SITE_NAME, type: "article",
      images: [{ url: `${SITE_URL}/img/${first}-0.jpg`, width: 850, height: 567, alt: day.day }]
    },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default async function DayPage({ params }) {
  const { id } = await params;
  const day = PROGRAM.find(d => d.id === id);
  if (!day) notFound();

  const url = `${SITE_URL}/day/${id}`;
  const sets = day.slots.reduce((n, s) => n + s.sets, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: day.day, item: url }
        ]
      },
      {
        "@type": "ExercisePlan",
        name: `${day.day} — ${day.focus}`,
        description: dayDescription(day),
        url,
        activityDuration: "PT75M",
        repetitions: sets,
        exerciseType: day.block,
        author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url }
      }
    ]
  };

  return (
    <div className="wrap article" data-block={day.block}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Six-Day PPL</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{day.day}</span>
      </nav>

      <header className="art-head">
        <p className="hero-eyebrow">Day {day.n} — {day.block}</p>
        <h1>{day.day}: {day.focus}</h1>
        <p className="lede" style={{ marginTop: 9 }}>
          {day.slots.length} exercises, {sets} working sets. Every movement below links to a
          full form guide with start and finish photos.
        </p>
      </header>

      <section className="art-sec">
        <h2>The workout</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="split-table">
            <thead>
              <tr><th>#</th><th>Exercise</th><th>Sets</th><th>Reps</th></tr>
            </thead>
            <tbody>
              {day.slots.map((slot, i) => (
                <tr key={i}>
                  <td className="m">{i + 1}</td>
                  <td>
                    <Link href={`/exercise/${slot.v[0]}`} className="dayname">
                      {ALL[slot.v[0]].n}
                    </Link>
                    {slot.v[1] && (
                      <>
                        {" "}<span className="m">or</span>{" "}
                        <Link href={`/exercise/${slot.v[1]}`}>{ALL[slot.v[1]].n}</Link>
                      </>
                    )}
                  </td>
                  <td className="m">{slot.sets}</td>
                  <td className="m">{slot.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdSlot slot={AD_SLOT_ARTICLE} format="fluid"
        layout="in-article" height={280} className="ad-article" />

      <section className="art-sec">
        <h2>Warm-up</h2>
        <ul className="used-list">
          {day.warm.map(s => (
            <li key={s}>
              {hasPhoto(s) ? <Link href={`/exercise/${s}`}>{ALL[s].n}</Link> : <span>{ALL[s].n}</span>}
              {ALL[s].d && <span className="m"> — {ALL[s].d}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="art-sec">
        <h2>Cool-down</h2>
        <ul className="used-list">
          {day.cool.map(s => (
            <li key={s}><Link href={`/exercise/${s}`}>{ALL[s].n}</Link> <span className="m">— 30 s hold</span></li>
          ))}
        </ul>
      </section>

      <section className="art-sec">
        <h2>The rest of the week</h2>
        <ul className="used-list">
          {PROGRAM.filter(d => d.id !== day.id).map(d => (
            <li key={d.id}>
              <Link href={`/day/${d.id}`}>{d.day}</Link>
              <span className="m"> — {d.focus}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="art-cta">
        <Link href="/" className="cta-link">Open this day in the tracker →</Link>
      </p>
    </div>
  );
}
