"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LIB, NO_PHOTO } from "@/lib/program";
import { Chevron, ArrowRight, DrawnCheck, Collapse, listItem } from "./ui";

export const ex = id => LIB[id] || NO_PHOTO[id];
export const hasPhoto = id => !!LIB[id];
export const img = (id, n) => `/img/${id}-${n}.jpg`;

/* Lifts ship a start and an end frame; warm-up and stretch entries ship one. */
export const SINGLE_FRAME = new Set([
  "band-pull-apart", "arm-circles", "cat-cow", "bodyweight-squat", "scapular-pullup",
  "glute-bridge", "bodyweight-lunge", "chest-stretch", "lat-stretch", "quad-stretch",
  "hamstring-stretch", "hip-flexor-stretch", "glute-stretch", "triceps-stretch",
  "calf-stretch", "childs-pose"
]);

export function Frames({ id }) {
  if (!hasPhoto(id)) return null;
  const single = SINGLE_FRAME.has(id);
  const e = ex(id);

  const Frame = ({ n, cap, delay }) => (
    <motion.figure
      className="frame"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={img(id, n)} alt={`${e.n} — ${cap.toLowerCase()}`} loading="lazy" decoding="async" />
      <figcaption>{cap}</figcaption>
    </motion.figure>
  );

  if (single) {
    return <div className="frames single"><Frame n={0} cap="The position" delay={0} /></div>;
  }

  return (
    <div className="frames">
      <Frame n={0} cap="Start" delay={0} />
      <Frame n={1} cap="End of rep" delay={0.07} />
      <motion.span
        className="travel" aria-hidden="true"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18, type: "spring", stiffness: 380, damping: 22 }}
      >
        <ArrowRight />
      </motion.span>
    </div>
  );
}

function Detail({ dayId, i, slot, vi, onVariant }) {
  const id = slot.v[vi];
  const e = ex(id);

  return (
    <div className="detail-inner">
      {slot.v.length > 1 && (
        <div className="variants" role="group" aria-label="Movement choice">
          {slot.v.map((vid, n) => (
            <button
              key={vid}
              type="button"
              aria-pressed={n === vi}
              onClick={() => onVariant(n)}
            >
              {n === vi && (
                <motion.span
                  layoutId={`vfill-${dayId}-${i}`}
                  className="variant-fill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {ex(vid).n}
            </button>
          ))}
        </div>
      )}

      <Frames id={id} />

      <motion.ol
        className="steps"
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
      >
        {e.s.map((t, n) => (
          <motion.li key={n} variants={listItem}>{t}</motion.li>
        ))}
      </motion.ol>

      <div className="notes">
        {e.c && <Note k="Cue" cls="cue" delay={0.28}>{e.c}</Note>}
        {e.m && <Note k="Avoid" cls="miss" delay={0.33}>{e.m}</Note>}
        {slot.note && <Note k="Today" cls="prog" delay={0.38}>{slot.note}</Note>}
      </div>
    </div>
  );
}

function Note({ k, cls, delay, children }) {
  return (
    <motion.div
      className={`note ${cls}`}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <span className="k">{k}</span>
      <span>{children}</span>
    </motion.div>
  );
}

export default function ExerciseCard({ dayId, i, slot, vi, done, onToggle, onVariant }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = slot.v[vi];
  const e = ex(id);
  const other = slot.v.length > 1 ? ex(slot.v[1 - vi]).n : null;

  return (
    <motion.article
      className={`ex${open ? " open" : ""}${done ? " done" : ""}`}
      variants={listItem}
      layout={reduce ? false : "position"}
      transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="ex-row">
        <button
          type="button" className="tick" aria-pressed={done}
          aria-label={`Mark ${e.n} complete`}
          onClick={onToggle}
        >
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.span
                key="check"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 26 }}
                style={{ display: "grid", placeItems: "center" }}
              >
                <DrawnCheck />
              </motion.span>
            ) : (
              <motion.span
                key="idx" className="idx"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {i + 1}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          type="button" className="ex-main" aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <motion.span className="thumb" whileHover={reduce ? undefined : { scale: 1.06 }}
            transition={{ type: "spring", stiffness: 380, damping: 25 }}>
            <img src={img(id, 0)} alt="" loading="lazy" decoding="async" />
          </motion.span>

          <span className="ex-text">
            <span className="ex-name">
              <span className="strike">{e.n}</span>
              {other && <span className="alt"> / {other}</span>}
            </span>
            <span className="ex-target">{e.t}</span>
          </span>

          <span className="prescription">
            <span className="sr">{slot.sets} × {slot.reps}</span>
            <span className="lbl">sets × reps</span>
          </span>

          <motion.span
            className="ex-chev"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <Chevron />
          </motion.span>
        </button>
      </div>

      <Collapse open={open}>
        <Detail dayId={dayId} i={i} slot={slot} vi={vi} onVariant={onVariant} />
      </Collapse>
    </motion.article>
  );
}
