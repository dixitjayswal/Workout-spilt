import { LIB, NO_PHOTO, PROGRAM, CORE } from "./program";

/* Set NEXT_PUBLIC_SITE_URL once you have a domain. On Vercel the production
   URL is injected automatically, so previews and prod both resolve correctly. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Six-Day PPL";
export const AUTHOR = { name: "Dixit Jayswal", url: "https://github.com/dixitjayswal" };

export const ALL = { ...LIB, ...NO_PHOTO };

export const exerciseSlugs = () => Object.keys(ALL);
export const hasPhoto = slug => !!LIB[slug];

/* Every day (and the core menu) that programmes a given movement, so each
   exercise page links back into the plan instead of being a dead end. */
export function usedIn(slug) {
  const out = [];
  PROGRAM.forEach(day => {
    day.slots.forEach((slot, i) => {
      if (slot.v.includes(slug)) {
        out.push({ kind: "day", id: day.id, label: day.day, block: day.block, slot: slot, n: i + 1 });
      }
    });
    if (day.warm.includes(slug)) out.push({ kind: "warm", id: day.id, label: day.day, block: day.block });
    if (day.cool.includes(slug)) out.push({ kind: "cool", id: day.id, label: day.day, block: day.block });
  });
  CORE.forEach((slot, i) => {
    if (slot.v.includes(slug)) out.push({ kind: "core", id: "core", label: "Core menu", block: "", slot, n: i + 1 });
  });
  return out;
}

/* Titles carry the search intent people actually type — "how to", plus the
   two things this page has that a stock exercise listing does not. */
export function exerciseTitle(slug) {
  const e = ALL[slug];
  return `How to do ${withArticle(e.n)} — form, cues and common mistakes`;
}

export function exerciseDescription(slug) {
  const e = ALL[slug];
  const steps = e.s.length;
  const base = `${steps}-step guide to the ${e.n.toLowerCase()} with start and finish photos. Muscles worked: ${e.t}.`;
  return e.m ? `${base} ${e.m}`.slice(0, 300) : base;
}

function withArticle(name) {
  const lower = name.toLowerCase();
  if (/^(pull-ups|dips|walking lunges|glute bridges|arm circles|band pull-aparts|leg swings|hip circles|scapular pulls|bodyweight squats|shoulder dislocates|scapular push-ups)/.test(lower)) {
    return lower;
  }
  return `${/^[aeiou]/.test(lower) ? "an" : "a"} ${lower}`;
}

export const dayTitle = day =>
  `${day.day} — ${day.focus} | 6-day push pull legs split`;

export const dayDescription = day =>
  `${day.day} of a 6-day push/pull/legs split: ${day.slots.length} exercises, ` +
  `${day.slots.reduce((n, s) => n + s.sets, 0)} working sets, with photos, execution steps and coaching cues for every movement.`;
