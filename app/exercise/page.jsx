import Link from "next/link";
import { ALL, SITE_URL, exerciseSlugs, hasPhoto } from "@/lib/site";

export const metadata = {
  title: "All exercises — form guides with photos",
  description:
    "Every movement in the 6-day push/pull/legs split, each with start and finish photos, " +
    "numbered execution steps, the key coaching cue and the most common mistake.",
  alternates: { canonical: `${SITE_URL}/exercise` }
};

/* Grouped so the index reads as a structure rather than an alphabetical dump —
   and so each group heading is its own crawlable block of related links. */
const GROUPS = [
  { name: "Chest", match: ["bench-press", "incline-db-press", "incline-barbell-press", "cable-fly", "pec-deck"] },
  { name: "Back", match: ["pullup", "lat-pulldown", "barbell-row", "t-bar-row", "chest-supported-row", "seated-cable-row", "close-grip-pulldown", "one-arm-db-row", "straight-arm-pulldown", "deadlift", "shrug"] },
  { name: "Shoulders", match: ["overhead-press", "seated-shoulder-press", "db-shoulder-press", "lateral-raise", "rear-delt-fly", "face-pull"] },
  { name: "Arms", match: ["close-grip-bench", "dips", "overhead-triceps-ext", "rope-pushdown", "triceps-pushdown", "barbell-curl", "hammer-curl", "preacher-curl", "incline-db-curl", "cable-curl"] },
  { name: "Legs", match: ["back-squat", "leg-press", "walking-lunge", "bulgarian-split-squat", "leg-extension", "seated-leg-curl", "lying-leg-curl", "rdl", "hip-thrust", "standing-calf-raise", "seated-calf-raise"] },
  { name: "Core", match: ["hanging-leg-raise", "cable-crunch", "ab-roller", "plank", "russian-twist", "woodchop"] }
];

export default function ExerciseIndex() {
  const grouped = new Set(GROUPS.flatMap(g => g.match));
  const rest = exerciseSlugs().filter(s => !grouped.has(s));
  const groups = [...GROUPS, { name: "Warm-up & mobility", match: rest }];

  return (
    <div className="wrap article">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Six-Day PPL</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Exercises</span>
      </nav>

      <header className="art-head">
        <p className="hero-eyebrow">Index</p>
        <h1>Every exercise in the split</h1>
        <p className="lede" style={{ marginTop: 9 }}>
          {exerciseSlugs().length} movements, each with start and finish photos, numbered
          execution steps, the one cue worth remembering and the mistake that wastes the set.
        </p>
      </header>

      {groups.map(g => (
        <section className="art-sec" key={g.name}>
          <h2>{g.name}</h2>
          <ul className="ex-index">
            {g.match.filter(s => ALL[s]).map(slug => (
              <li key={slug}>
                <Link href={`/exercise/${slug}`}>
                  {hasPhoto(slug) && (
                    <img src={`/img/${slug}-0.jpg`} alt="" width="56" height="44" loading="lazy" />
                  )}
                  <span>
                    <b>{ALL[slug].n}</b>
                    <em>{ALL[slug].t}</em>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="art-cta">
        <Link href="/" className="cta-link">Open the full 6-day programme →</Link>
      </p>
    </div>
  );
}
