import { PROGRAM } from "./program";

/* Direct working sets only. A set counts toward the muscle the movement is
   chosen to train — bench press is chest, not chest plus triceps plus delts.
   Indirect volume is real but it is not what you program against. */

export const MUSCLE_BLOCK = {
  Chest: "push", Shoulders: "push", Triceps: "push",
  Back: "pull", Biceps: "pull", Traps: "pull",
  Quads: "legs", Hamstrings: "legs", Glutes: "legs", Calves: "legs"
};

const PRIMARY = {
  "bench-press": "Chest", "incline-db-press": "Chest", "incline-barbell-press": "Chest",
  "cable-fly": "Chest", "pec-deck": "Chest",

  "seated-shoulder-press": "Shoulders", "db-shoulder-press": "Shoulders",
  "overhead-press": "Shoulders", "lateral-raise": "Shoulders",
  "rear-delt-fly": "Shoulders", "face-pull": "Shoulders",

  "close-grip-bench": "Triceps", "dips": "Triceps", "overhead-triceps-ext": "Triceps",
  "rope-pushdown": "Triceps", "triceps-pushdown": "Triceps",

  "pullup": "Back", "lat-pulldown": "Back", "barbell-row": "Back", "t-bar-row": "Back",
  "chest-supported-row": "Back", "seated-cable-row": "Back", "close-grip-pulldown": "Back",
  "one-arm-db-row": "Back", "straight-arm-pulldown": "Back", "deadlift": "Back",

  "shrug": "Traps",

  "barbell-curl": "Biceps", "hammer-curl": "Biceps", "preacher-curl": "Biceps",
  "incline-db-curl": "Biceps", "cable-curl": "Biceps",

  "back-squat": "Quads", "leg-press": "Quads", "walking-lunge": "Quads",
  "bulgarian-split-squat": "Quads", "leg-extension": "Quads",

  "seated-leg-curl": "Hamstrings", "lying-leg-curl": "Hamstrings", "rdl": "Hamstrings",
  "hip-thrust": "Glutes",
  "standing-calf-raise": "Calves", "seated-calf-raise": "Calves"
};

/* The evidence-based weekly range for hypertrophy per muscle. */
export const TARGET = { lo: 10, hi: 20 };

export function weeklyVolume(includeOptionalDay = true) {
  const totals = {};
  Object.keys(MUSCLE_BLOCK).forEach(m => { totals[m] = 0; });

  PROGRAM.forEach(day => {
    if (day.optional && !includeOptionalDay) return;
    day.slots.forEach(slot => {
      // A slot may override the target — Legs B leg press runs a high foot
      // placement, which puts the work in the glutes rather than the quads.
      const muscle = slot.mg || PRIMARY[slot.v[0]];
      if (muscle && muscle in totals) totals[muscle] += slot.sets;
    });
  });

  return Object.entries(totals)
    .map(([muscle, sets]) => ({
      muscle,
      sets,
      block: MUSCLE_BLOCK[muscle],
      status: sets < TARGET.lo ? "under" : sets > TARGET.hi ? "over" : "in"
    }))
    .sort((a, b) => b.sets - a.sets);
}
