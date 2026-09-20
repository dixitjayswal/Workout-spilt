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

export const GitHubMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
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
