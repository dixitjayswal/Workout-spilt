"use client";

import { useEffect, useRef } from "react";
import {
  AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion
} from "framer-motion";

/* ── icons ────────────────────────────────────────────── */

export const Chevron = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
);

export const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

export const Sun = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.4v2M12 19.6v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.4 12h2M19.6 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
  </svg>
);

/* The tick draws itself on, so completing a set reads as an action
   rather than a state flip. */
export function DrawnCheck() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <motion.polyline
        points="20 6 9 17 4 12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ── animated number ──────────────────────────────────── */

export function CountUp({ value, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => { mv.set(value); }, [value, mv]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = String(value);
      return;
    }
    return spring.on("change", v => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
  }, [spring, reduce, value]);

  return <b ref={ref} className={className}>{value}</b>;
}

/* ── height collapse ──────────────────────────────────── */

export function Collapse({ open, children }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="c"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? undefined : { height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 }
          }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── stagger presets ──────────────────────────────────── */

export const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.04 } }
};

export const listItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } }
};
