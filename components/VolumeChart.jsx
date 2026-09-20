"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weeklyVolume, TARGET } from "@/lib/volume";

const MAX = 30;                 // axis top — every bar and both band edges fit
const TICKS = [0, 10, 20, 30];
const pc = n => `${(n / MAX) * 100}%`;

export default function VolumeChart() {
  const [table, setTable] = useState(false);
  const reduce = useReducedMotion();
  const rows = useMemo(() => weeklyVolume(), []);

  return (
    <div className="chart">
      <div className="chart-head">
        <span className="chart-title">Direct sets per muscle, per week</span>
        <span className="chart-sub">
          Shaded band = {TARGET.lo}–{TARGET.hi} sets, the range most hypertrophy research lands on
        </span>
      </div>

      <div role="img" aria-label={
        "Weekly direct working sets per muscle group. " +
        rows.map(r => `${r.muscle} ${r.sets}`).join(", ") +
        `. Target band ${TARGET.lo} to ${TARGET.hi} sets.`
      }>
        {rows.map((r, i) => (
          <div className="vrow" key={r.muscle}>
            <span className="vname">{r.muscle}</span>

            <div className="vtrack">
              <span
                className="vband"
                style={{ left: pc(TARGET.lo), width: pc(TARGET.hi - TARGET.lo) }}
              />
              <motion.span
                className="vbar"
                data-block={r.block}
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: pc(r.sets) }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1]
                }}
              />
            </div>

            <span className="vval">
              {r.sets}
              {r.status !== "in" && (
                <span className={`flag ${r.status}`}>
                  {r.status === "under" ? "under" : "over"}
                </span>
              )}
            </span>
          </div>
        ))}

        <div className="chart-axis">
          <span />
          <div className="ticks">
            {TICKS.map(t => (
              <span className="tick-l" key={t} style={{ left: pc(t) }}>{t}</span>
            ))}
          </div>
          <span />
        </div>
      </div>

      <div className="chart-legend">
        <span><i style={{ background: "var(--m-push)" }} />Push muscles</span>
        <span><i style={{ background: "var(--m-pull)" }} />Pull muscles</span>
        <span><i style={{ background: "var(--m-legs)" }} />Leg muscles</span>
      </div>

      <div className="callout">
        Back and shoulders run above the band by design — back is the split&rsquo;s stated
        priority, and the shoulder total spreads across three delt heads, so it trains
        lighter than the number reads. <b>Calves, glutes and traps sit under it.</b> If
        those are a priority, add a set or two rather than a whole exercise.
      </div>

      <button type="button" className="disclose" onClick={() => setTable(t => !t)}>
        {table ? "Hide" : "Show"} the numbers
      </button>

      {table && (
        <motion.table
          className="vtable"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <thead>
            <tr><th>Muscle</th><th>Sets / week</th><th>Vs. target</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.muscle}>
                <td>{r.muscle}</td>
                <td className="n">{r.sets}</td>
                <td className="n">
                  {r.status === "in" ? "in range"
                    : r.status === "under" ? `${TARGET.lo - r.sets} under`
                    : `${r.sets - TARGET.hi} over`}
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
}
