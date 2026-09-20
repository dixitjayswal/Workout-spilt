# Six-Day PPL

By **Dixit Jayswal** · [github.com/dixitjayswal](https://github.com/dixitjayswal)

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

## Routes

| Route | Count | Purpose |
| --- | --- | --- |
| `/` | 1 | The tracker app |
| `/exercise` | 1 | Index of every movement, grouped by body part |
| `/exercise/[slug]` | 70 | Form guide per movement — the SEO landing pages |
| `/day/[id]` | 6 | One page per training day |
| `/privacy` | 1 | Required before AdSense will approve the site |
| `/sitemap.xml`, `/robots.txt` | 2 | Generated from the program data |

All 84 pages are prerendered at build time.

## Configuration

Copy `.env.example` to `.env.local`. Every value is optional — the site works with none set.

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_AD_SLOT_ARTICLE=xxxxxxxxxx
NEXT_PUBLIC_AD_SLOT_RAIL=xxxxxxxxxx
```

`NEXT_PUBLIC_SITE_URL` drives canonical tags, the sitemap and OpenGraph URLs. On Vercel it
falls back to the production URL automatically, so it is only needed for a custom domain.

With the AdSense variables unset, **no ad code is emitted at all** — no script request, no
empty boxes, and the privacy policy states that no ad cookies are set. Fill them in after
approval and the ads appear, the script loads, and the privacy policy switches to the full
Google cookie disclosure.

> Ad config must live in `lib/ads.js`, **not** in a `"use client"` module. Importing a value
> from a client module into a server component yields a client *reference*, which is always
> truthy — it silently defeats every `if (ADSENSE_CLIENT)` guard and injects a broken script
> tag on every page.

## Going live checklist

1. Set `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment Variables, then redeploy.
   Until you do, canonical tags point at `localhost`.
2. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.
3. Apply to AdSense. Approval needs original content, a privacy policy (`/privacy`) and a
   verified domain. A custom domain is approved far more readily than a `.vercel.app` subdomain.
4. After approval, create the ad units and set the three ad env vars.

## What the SEO work can and cannot do

The 70 exercise pages exist so each movement has its own indexable URL with a unique title,
description, H1, images and structured data. Before this, the whole site was one URL behind
client-side tabs and Google had nothing per-exercise to rank.

That makes long-tail queries winnable — *"6 day ppl split with pictures"*,
*"bulgarian split squat common mistakes"*, *"push pull legs twice a week"*.

It does **not** make head terms winnable. "Bench press" and "how to squat" belong to
Healthline, Men's Health and bodybuilding.com, which have millions of backlinks and 15+ years
of domain authority. Technical SEO does not close that gap; only time, links and reputation
do.

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

## Author

**Dixit Jayswal** — [@dixitjayswal](https://github.com/dixitjayswal)

Licensed MIT. Exercise photographs are from free-exercise-db and are public domain.
