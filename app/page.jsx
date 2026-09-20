"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, useScroll, useSpring, useReducedMotion
} from "framer-motion";

import { PROGRAM, CORE } from "@/lib/program";
import { useStore, doneOf, variantOf } from "@/lib/store";
import { Chevron, Sun, CountUp, Collapse, listStagger, listItem } from "@/components/ui";
import ExerciseCard from "@/components/ExerciseCard";
import MiniRow from "@/components/MiniRow";
import RestTimer from "@/components/RestTimer";
import VolumeChart from "@/components/VolumeChart";

const VIEWS = [
  { id: "train", label: "Train" },
  { id: "core", label: "Core & cardio" },
  { id: "guide", label: "Guide" }
];

const totalSets = slots => slots.reduce((n, s) => n + s.sets, 0);

/* Heavy compounds carry ~3 min of rest, isolation ~90 s, plus warm-up and stretching. */
function estimateMinutes(day) {
  let m = 15;
  day.slots.forEach((s, i) => { m += s.sets * (i < 2 ? 3.4 : 2.1); });
  return Math.round(m / 5) * 5;
}

export default function Page() {
  const { s, hydrated, setDay, setView, toggleDone, resetDay, setVariant, cycleTheme } = useStore();
  const reduce = useReducedMotion();
  const day = PROGRAM.find(d => d.id === s.day) || PROGRAM[0];
  const block = s.view === "train" ? day.block : "";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 });

  /* Left/right arrows move between days — quicker than reaching for the rail mid-set. */
  useEffect(() => {
    if (s.view !== "train") return;
    const onKey = e => {
      if (e.target.closest("input, textarea")) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const at = PROGRAM.findIndex(d => d.id === s.day);
      const next = (at + (e.key === "ArrowRight" ? 1 : -1) + PROGRAM.length) % PROGRAM.length;
      setDay(PROGRAM[next].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [s.view, s.day, setDay]);

  return (
    <div data-block={block}>
      <motion.div className="scroll-line" style={{ scaleX }} aria-hidden="true" />

      <Masthead
        view={s.view} day={s.day} store={s}
        onView={setView} onDay={setDay} onTheme={cycleTheme}
      />

      <main className="wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.view === "train" ? `train-${s.day}` : s.view}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {s.view === "train" && (
              <TrainView
                day={day} store={s} hydrated={hydrated}
                onToggle={toggleDone} onReset={resetDay} onVariant={setVariant}
              />
            )}
            {s.view === "core" && (
              <CoreView store={s} onToggle={toggleDone} onVariant={setVariant} />
            )}
            {s.view === "guide" && <GuideView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="wrap">
        <footer className="foot">
          <div className="legend">
            <span><i style={{ background: "var(--push)" }} />Push</span>
            <span><i style={{ background: "var(--pull)" }} />Pull</span>
            <span><i style={{ background: "var(--legs)" }} />Legs</span>
            <span><i style={{ background: "var(--done)" }} />Logged</span>
          </div>
          Ticks and movement choices are saved in this browser only. Exercise photographs from
          the open-source{" "}
          <a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noreferrer">
            free-exercise-db
          </a>. Arrow keys move between days. This is a training plan, not medical advice — if
          something hurts in a joint rather than a muscle, stop the set.
        </footer>
      </div>

      <RestTimer />
    </div>
  );
}

/* ── masthead ─────────────────────────────────────────── */

function Masthead({ view, day, store, onView, onDay, onTheme }) {
  const railRef = useRef(null);

  useEffect(() => {
    const el = railRef.current?.querySelector('[aria-selected="true"]');
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [day, view]);

  return (
    <header className="masthead">
      <div className="wrap">
        <div className="mast-row">
          <motion.div
            className="brand"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="mark">Six-Day PPL</span>
            <span className="sub">Push · Pull · Legs ×2</span>
          </motion.div>
          <div className="mast-actions">
            <button
              type="button" className="icon-btn" onClick={onTheme}
              title={`Theme: ${store.theme || "system"}`} aria-label="Switch theme"
            >
              <Sun />
            </button>
          </div>
        </div>

        <div className="views" role="tablist" aria-label="Sections">
          {VIEWS.map(v => (
            <button
              key={v.id} type="button" role="tab" className="view-tab"
              aria-selected={view === v.id} onClick={() => onView(v.id)}
            >
              {view === v.id && (
                <motion.span
                  layoutId="tabPill" className="tab-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {v.label}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {view === "train" && (
            <motion.div
              className="rail-scroll" ref={railRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rail" role="tablist" aria-label="Training day">
                {PROGRAM.map(d => {
                  const n = doneOf(store, d.id).length;
                  const complete = n === d.slots.length && d.slots.length > 0;
                  return (
                    <button
                      key={d.id} type="button" role="tab" className="day-chip"
                      data-block={d.block} aria-selected={day === d.id}
                      onClick={() => onDay(d.id)}
                    >
                      {day === d.id && (
                        <motion.span
                          layoutId="chipGlow" className="chip-glow"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="dc-n">Day {d.n}{d.optional ? " · opt" : ""}</span>
                      <span className="dc-name">{d.day}</span>
                      <AnimatePresence>
                        {complete && (
                          <motion.span
                            className="dc-ring"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 22 }}
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ── train ────────────────────────────────────────────── */

function Section({ title, tag, children, defaultOpen = false, collapsible = true }) {
  const [open, setOpen] = useState(defaultOpen);
  if (!collapsible) {
    return (
      <section className="sec">
        <div className="sec-head" style={{ cursor: "default" }}>
          <h2>{title}</h2>{tag && <span className="tag">{tag}</span>}
        </div>
        {children}
      </section>
    );
  }
  return (
    <section className="sec">
      <button type="button" className="sec-head" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <h2>{title}</h2>
        {tag && <span className="tag">{tag}</span>}
        <motion.span className="chev" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <Chevron />
        </motion.span>
      </button>
      <Collapse open={open}>{children}</Collapse>
    </section>
  );
}

function TrainView({ day, store, hydrated, onToggle, onReset, onVariant }) {
  const done = doneOf(store, day.id);
  const sets = totalSets(day.slots);
  const pct = day.slots.length ? done.length / day.slots.length : 0;

  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">
          Day {day.n} — {day.block}{day.optional ? " — optional on a 5-day week" : ""}
        </p>
        <h1>{day.day}</h1>
        <p className="focus">{day.focus}</p>

        <div className="stats">
          <span className="stat"><CountUp value={day.slots.length} /><span>Exercises</span></span>
          <span className="stat"><CountUp value={sets} /><span>Working sets</span></span>
          <span className="stat"><CountUp value={estimateMinutes(day)} /><span>Min, incl. rest</span></span>
        </div>

        <div className="bar-row">
          <div className="bar">
            <motion.i
              animate={{ width: `${pct * 100}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
            />
          </div>
          <span className="pct" suppressHydrationWarning>
            {hydrated ? `${done.length} / ${day.slots.length} done` : `0 / ${day.slots.length} done`}
          </span>
          <button type="button" className="reset-btn" onClick={() => onReset(day.id)}>Reset</button>
        </div>
      </section>

      <Section title="Warm-up" tag="8–10 min">
        <motion.div className="mini-list" variants={listStagger} initial="hidden" animate="show">
          {day.warm.map(id => <MiniRow key={id} id={id} />)}
          <div className="callout">
            Then <b>1–2 light ramp sets</b> on your first big lift. Never static stretch cold.
          </div>
        </motion.div>
      </Section>

      <Section title="The work" tag={`${sets} sets`} collapsible={false}>
        <motion.div className="ex-list" variants={listStagger} initial="hidden" animate="show">
          {day.slots.map((slot, i) => (
            <ExerciseCard
              key={`${day.id}-${i}`}
              dayId={day.id} i={i} slot={slot}
              vi={variantOf(store, day.id, i, slot)}
              done={done.includes(i)}
              onToggle={() => onToggle(day.id, i)}
              onVariant={v => onVariant(day.id, i, v)}
            />
          ))}
        </motion.div>
      </Section>

      <Section title="Cool-down" tag="30 s holds">
        <motion.div className="mini-list" variants={listStagger} initial="hidden" animate="show">
          {day.cool.map(id => <MiniRow key={id} id={id} />)}
        </motion.div>
      </Section>
    </>
  );
}

/* ── core & cardio ────────────────────────────────────── */

function CoreView({ store, onToggle, onVariant }) {
  const done = doneOf(store, "core");

  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">Bolt-on</p>
        <h1>Core &amp; cardio</h1>
        <p className="focus">Pick three on any 3 non-consecutive days</p>
      </section>

      <Section title="Core menu" tag="Pick 3" collapsible={false}>
        <motion.div className="ex-list" variants={listStagger} initial="hidden" animate="show">
          {CORE.map((slot, i) => (
            <ExerciseCard
              key={`core-${i}`}
              dayId="core" i={i} slot={slot}
              vi={variantOf(store, "core", i, slot)}
              done={done.includes(i)}
              onToggle={() => onToggle("core", i)}
              onVariant={v => onVariant("core", i, v)}
            />
          ))}
        </motion.div>
        <div className="callout">
          Abs are a muscle like any other. <b>Load them and add weight over time</b> — three sets
          of unweighted crunches forever will not change anything.
        </div>
      </Section>

      <Section title="Cardio for definition" collapsible={false}>
        <motion.div className="cardio-grid" variants={listStagger} initial="hidden" animate="show">
          <motion.div className="cardio" variants={listItem}>
            <div className="big">8–10k</div>
            <div className="cap">Steps, daily</div>
            <p>Non-negotiable at a desk job. This does more for definition than any cardio
              session you will add on top.</p>
          </motion.div>
          <motion.div className="cardio" variants={listItem}>
            <div className="big">20–30</div>
            <div className="cap">Min zone 2</div>
            <p>Incline treadmill or bike, after 2–3 lifting sessions or on a rest day.
              Conversational pace throughout.</p>
          </motion.div>
          <motion.div className="cardio" variants={listItem}>
            <div className="big">Skip</div>
            <div className="cap">Long HIIT</div>
            <p>While you are in a deficit it eats the recovery your legs and lower back need
              for the next session.</p>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}

/* ── guide ────────────────────────────────────────────── */

const RULES = [
  ["Tempo", <><b>2 seconds down</b>, controlled back up. The lowering phase is where most of the growth stimulus lives — never drop the weight.</>],
  ["Rest", <><b>60–90 s</b> on isolation work, <b>2–3 min</b> on compounds. Cutting rest short on heavy sets costs you reps, and reps are the thing you are trying to add.</>],
  ["Intensity", <>Last two reps should be genuinely hard — stop <b>1–2 reps from failure</b>. Only the final set of an isolation movement is worth taking all the way.</>],
  ["Overload", <>Add <b>reps or weight every week</b>. Hit the top of the range on every set, then add the smallest increment and start again at the bottom.</>],
  ["Warm-up sets", <><b>1–2 light sets</b> before the first exercise of each muscle. These are never counted in the set totals on the day pages.</>]
];

function GuideView() {
  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">How to run it</p>
        <h1>The rules</h1>
        <p className="lede" style={{ marginTop: 9 }}>
          Six days of push, pull and legs, each hit twice a week. Frequency is the reason this
          split works — every muscle gets two growth stimuli every seven days instead of one.
        </p>
      </section>

      <Section title="Non-negotiables" collapsible={false}>
        <div className="prose-card">
          <dl style={{ margin: 0 }}>
            {RULES.map(([k, v], i) => (
              <motion.div
                className="rule" key={k}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <dt>{k}</dt><dd>{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="Weekly volume" tag="Direct sets" collapsible={false}>
        <div className="prose-card"><VolumeChart /></div>
      </Section>

      <Section title="The week" tag="6 days" collapsible={false}>
        <div className="prose-card">
          <div style={{ overflowX: "auto" }}>
            <table className="split-table">
              <thead>
                <tr><th>Session</th><th>Focus</th><th>Volume</th></tr>
              </thead>
              <tbody>
                {PROGRAM.map(d => (
                  <tr key={d.id}>
                    <td>
                      <span className="pip" style={{ background: `var(--${d.block})` }} />
                      <span className="dayname">{d.day}</span>
                    </td>
                    <td>
                      {d.focus}
                      {d.optional && <span className="m"> — drop for 5 days</span>}
                    </td>
                    <td className="m">{totalSets(d.slots)} sets</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="callout">
            Running five days instead? <b>Drop Legs B</b> and rotate the remaining five so the
            day you miss changes each week. Everything still gets hit.
          </div>
        </div>
      </Section>

      <Section title="Reading the photos" collapsible={false}>
        <div className="prose-card">
          <p className="lede">
            Tap any exercise to open it. The left frame is the <b>start</b> of the rep, the right
            frame is the <b>end</b> — the two positions you are travelling between. Where a slot
            lists two movements, the buttons at the top of the panel swap between them; both are
            equally valid, so take whichever is free.
          </p>
        </div>
      </Section>
    </>
  );
}
