"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PRESETS = [
  { s: 60, label: "60" },
  { s: 90, label: "90" },
  { s: 120, label: "2m" },
  { s: 180, label: "3m" }
];

const R = 19;
const C = 2 * Math.PI * R;

export default function RestTimer() {
  const [preset, setPreset] = useState(null);
  const [left, setLeft] = useState(0);
  const [flash, setFlash] = useState(false);
  const tick = useRef(null);
  const reduce = useReducedMotion();

  const stop = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
    setPreset(null);
    setLeft(0);
  }, []);

  const start = useCallback(sec => {
    if (tick.current) clearInterval(tick.current);
    // Count against a wall-clock deadline so a backgrounded tab stays accurate.
    const end = Date.now() + sec * 1000;
    setPreset(sec);
    setLeft(sec);
    tick.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((end - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining <= 0) {
        clearInterval(tick.current);
        tick.current = null;
        setPreset(null);
        setFlash(true);
        setTimeout(() => setFlash(false), 2400);
        try { navigator.vibrate?.([120, 90, 120]); } catch (e) { /* unsupported */ }
      }
    }, 200);
  }, []);

  useEffect(() => () => { if (tick.current) clearInterval(tick.current); }, []);

  const running = preset !== null;
  const progress = running ? left / preset : 0;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");
  const urgent = running && left <= 10;

  return (
    <motion.div
      className={`timer${running ? " running" : ""}`}
      role="group"
      aria-label="Rest timer"
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: flash ? "var(--done)" : undefined
      }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 26 }}
    >
      <motion.div
        className="timer-face"
        animate={urgent && !reduce ? { scale: [1, 1.09, 1] } : { scale: 1 }}
        transition={urgent ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      >
        <svg viewBox="0 0 44 44" aria-hidden="true">
          <circle className="track" cx="22" cy="22" r={R} />
          <motion.circle
            className="sweep"
            cx="22" cy="22" r={R}
            strokeDasharray={C}
            animate={{ strokeDashoffset: C * (1 - progress) }}
            transition={{ duration: reduce ? 0 : 0.25, ease: "linear" }}
            style={{ opacity: running ? 1 : 0 }}
          />
        </svg>
        <span className="clock" aria-live="off">
          {running ? `${mm}:${ss}` : flash ? "Go" : "Rest"}
        </span>
      </motion.div>

      <div className="timer-presets">
        {PRESETS.map(p => (
          <button
            key={p.s}
            type="button"
            aria-pressed={running && preset === p.s}
            title={`${p.s} second rest`}
            onClick={() => (running && preset === p.s ? stop() : start(p.s))}
          >
            {running && preset === p.s && (
              <motion.span
                layoutId="presetFill"
                className="preset-fill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {p.label}
          </button>
        ))}
      </div>

      {running && (
        <button type="button" className="timer-stop" onClick={stop}>Stop</button>
      )}
    </motion.div>
  );
}
