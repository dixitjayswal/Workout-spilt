"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROGRAM } from "./program";

const KEY = "ppl6.v2";

const EMPTY = { day: PROGRAM[0].id, view: "train", done: {}, variant: {}, theme: null };

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const s = JSON.parse(raw);
    return {
      day: PROGRAM.some(d => d.id === s.day) ? s.day : EMPTY.day,
      view: ["train", "core", "guide"].includes(s.view) ? s.view : "train",
      done: s.done && typeof s.done === "object" ? s.done : {},
      variant: s.variant && typeof s.variant === "object" ? s.variant : {},
      theme: s.theme === "dark" || s.theme === "light" ? s.theme : null
    };
  } catch (e) {
    return EMPTY;
  }
}

/* Server render and first client render both use EMPTY, so the markup matches.
   Saved state is swapped in right after mount. */
export function useStore() {
  const [s, setS] = useState(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    setS(read());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* blocked storage */ }
  }, [s]);

  useEffect(() => {
    if (!hydrated) return;
    const el = document.documentElement;
    if (s.theme) el.setAttribute("data-theme", s.theme);
    else el.removeAttribute("data-theme");
  }, [s.theme, hydrated]);

  const setDay = useCallback(day => setS(p => ({ ...p, day, view: "train" })), []);
  const setView = useCallback(view => setS(p => ({ ...p, view })), []);

  const toggleDone = useCallback((dayId, i) => setS(p => {
    const arr = p.done[dayId] || [];
    const next = arr.includes(i) ? arr.filter(x => x !== i) : [...arr, i];
    return { ...p, done: { ...p.done, [dayId]: next } };
  }), []);

  const resetDay = useCallback(dayId => setS(p => ({ ...p, done: { ...p.done, [dayId]: [] } })), []);

  const setVariant = useCallback((dayId, i, v) => setS(p => ({
    ...p, variant: { ...p.variant, [`${dayId}:${i}`]: v }
  })), []);

  const cycleTheme = useCallback(() => setS(p => ({
    ...p, theme: p.theme === null ? "dark" : p.theme === "dark" ? "light" : null
  })), []);

  return { s, hydrated, setDay, setView, toggleDone, resetDay, setVariant, cycleTheme };
}

export function doneOf(s, dayId) { return s.done[dayId] || []; }
export function variantOf(s, dayId, i, slot) {
  const v = s.variant[`${dayId}:${i}`];
  return typeof v === "number" && slot.v[v] ? v : 0;
}
