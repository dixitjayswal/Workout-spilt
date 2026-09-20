"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Chevron, Collapse, listItem } from "./ui";
import { ex, hasPhoto, img, Frames } from "./ExerciseCard";

function initials(name) {
  return name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean)
    .slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export default function MiniRow({ id }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const e = ex(id);

  return (
    <motion.div variants={listItem} layout={reduce ? false : "position"}>
      <button
        type="button" className="mini" aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={open ? { borderRadius: "var(--r-md) var(--r-md) 0 0" } : undefined}
      >
        <span className="mthumb">
          {hasPhoto(id)
            ? <img src={img(id, 0)} alt="" loading="lazy" decoding="async" />
            : <span className="glyph">{initials(e.n)}</span>}
        </span>
        <span className="mname">{e.n}</span>
        {e.d && <span className="mdose">{e.d}</span>}
        <motion.span className="ex-chev" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <Chevron />
        </motion.span>
      </button>

      <Collapse open={open}>
        <div className="mini-detail-inner">
          <Frames id={id} />
          <ol className="steps">{e.s.map((t, n) => <li key={n}>{t}</li>)}</ol>
          {e.c && (
            <div className="notes">
              <div className="note cue"><span className="k">Why</span><span>{e.c}</span></div>
            </div>
          )}
        </div>
      </Collapse>
    </motion.div>
  );
}
