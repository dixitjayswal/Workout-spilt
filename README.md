# Six-Day PPL

Next.js app for the 6-day push/pull/legs split — every exercise with start/end photos,
numbered execution steps, the cue that matters, the mistake to avoid, a rest timer and a
weekly volume breakdown.

## Stack

- **Next.js 15** (App Router), statically prerendered — no server, no database
- **React 19**
- **framer-motion** for layout transitions, staggered reveals and the timer sweep
- Plain CSS with design tokens in `app/globals.css` (no Tailwind)
- `next/font/google` self-hosts Barlow Condensed, IBM Plex Sans and IBM Plex Mono

## Deploy to Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or import the repo at vercel.com — Vercel detects Next.js and needs no configuration.
`vercel.json` only adds a one-year immutable cache on `/img/*`, since the photos never change.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Layout

| Path | What it is |
| --- | --- |
| `app/layout.jsx` | Fonts, metadata, manifest, pre-paint theme script |
| `app/page.jsx` | The three views (Train / Core & cardio / Guide) and the masthead |
| `app/globals.css` | Tokens and every component style. Light and dark both defined |
| `components/ExerciseCard.jsx` | Expanding exercise card, photo frames, variant swap |
| `components/MiniRow.jsx` | Warm-up and cool-down rows |
| `components/RestTimer.jsx` | Circular countdown, wall-clock accurate |
| `components/VolumeChart.jsx` | Weekly sets per muscle against the target band |
| `components/ui.jsx` | Icons, `CountUp`, `Collapse`, stagger variants |
| `lib/program.js` | `LIB` (how-to for 65 movements), `PROGRAM` (6 days), `CORE` |
| `lib/volume.js` | Movement → muscle mapping and the weekly set totals |
| `lib/store.js` | State + `localStorage`, hydration-safe |
| `public/img/` | 114 photos, `<id>-0.jpg` = start, `<id>-1.jpg` = end |
| `legacy/` | The original vanilla-JS version. Superseded — safe to delete |

## Editing the program

Everything lives in `lib/program.js`. A day's `slots` array drives the page:

```js
{ v: ["bench-press"], sets: 4, reps: "6–8", note: "Optional line shown as TODAY" }
```

`v` holds movement ids. Give it two and the card renders a swap toggle
(`["pullup", "lat-pulldown"]`) — the first is the default. An optional `mg` overrides which
muscle the sets count toward in the volume chart.

To add a movement, add an entry to `LIB` with `n` (name), `t` (muscles), `s` (steps),
`c` (cue), `m` (mistake), drop `public/img/<id>-0.jpg` and `-1.jpg` alongside it, and add it
to `PRIMARY` in `lib/volume.js`. A movement with no photo goes in `NO_PHOTO` and renders with
a lettered tile.

## Notes

- Ticks, movement choices and theme persist in `localStorage`, per browser. No backend,
  nothing leaves the device.
- Arrow keys move between training days.
- Colour coding follows Olympic plate colours: red = push, blue = pull, yellow = legs,
  green = logged. Chart marks use separate tokens validated for colour-blind separation
  and contrast against both the light and dark surfaces.
- Volume chart counts **direct** sets only — bench press counts as chest, not chest plus
  triceps plus delts.
- Photos from [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (public domain).
- Add to Home Screen gets a standalone app window.
