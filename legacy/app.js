/* ═══════════════════════════════════════════════════════════
   Six-Day PPL — view layer.
   All persisted state is a per-viewer convenience (which day you
   were on, which sets you ticked off, theme). Never required.
   ═══════════════════════════════════════════════════════════ */

const KEY = "ppl6.v1";

const state = {
  view: "train",
  day: PROGRAM[0].id,
  done: {},      // { dayId: [slotIndex, ...] }
  variant: {},   // { "dayId:slotIndex": variantIndex }
  open: null,    // currently expanded card key
  theme: null
};

/* ── storage ──────────────────────────────────────────── */

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.day && (PROGRAM.some(d => d.id === s.day) || s.day === "core")) state.day = s.day;
    if (s.view) state.view = s.view;
    if (s.done && typeof s.done === "object") state.done = s.done;
    if (s.variant && typeof s.variant === "object") state.variant = s.variant;
    if (s.theme === "light" || s.theme === "dark") state.theme = s.theme;
  } catch (e) { /* private window, blocked storage — carry on */ }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      day: state.day, view: state.view, done: state.done,
      variant: state.variant, theme: state.theme
    }));
  } catch (e) { /* nothing to do — the page works without it */ }
}

/* ── helpers ──────────────────────────────────────────── */

const $ = (sel, root) => (root || document).querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

function ex(id) { return LIB[id] || NO_PHOTO[id]; }
function hasPhoto(id) { return !!LIB[id]; }
function img(id, n) { return "img/" + id + "-" + n + ".jpg"; }

/* Two photos exist for every lift; warm-up and stretch entries ship one. */
const SINGLE_FRAME = new Set(["band-pull-apart", "arm-circles", "cat-cow", "bodyweight-squat",
  "scapular-pullup", "glute-bridge", "bodyweight-lunge", "chest-stretch", "lat-stretch",
  "quad-stretch", "hamstring-stretch", "hip-flexor-stretch", "glute-stretch",
  "triceps-stretch", "calf-stretch", "childs-pose"]);

function doneSet(dayId) {
  if (!Array.isArray(state.done[dayId])) state.done[dayId] = [];
  return state.done[dayId];
}
function isDone(dayId, i) { return doneSet(dayId).indexOf(i) !== -1; }
function toggleDone(dayId, i) {
  const arr = doneSet(dayId);
  const at = arr.indexOf(i);
  if (at === -1) arr.push(i); else arr.splice(at, 1);
  save();
}

function variantOf(dayId, i, slot) {
  const v = state.variant[dayId + ":" + i];
  return (typeof v === "number" && slot.v[v]) ? v : 0;
}

/* Rough clock: heavy compounds sit near 3 min of rest, isolation near 90 s.
   Plus 10 min of warm-up and 5 of stretching. */
function estimateMinutes(day) {
  let m = 15;
  day.slots.forEach((s, i) => { m += s.sets * (i < 2 ? 3.4 : 2.1); });
  return Math.round(m / 5) * 5;
}
function totalSets(slots) { return slots.reduce((n, s) => n + s.sets, 0); }

/* ── frames + detail body ─────────────────────────────── */

function framesHTML(id) {
  if (!hasPhoto(id)) return "";
  const single = SINGLE_FRAME.has(id);
  const one = '<figure class="frame"><img loading="lazy" decoding="async" src="' + img(id, 0) +
    '" alt="' + esc(ex(id).n) + ' — starting position"><figcaption>' +
    (single ? "The position" : "Start") + "</figcaption></figure>";
  if (single) return '<div class="frames single">' + one + "</div>";
  return '<div class="frames">' + one +
    '<figure class="frame"><img loading="lazy" decoding="async" src="' + img(id, 1) +
    '" alt="' + esc(ex(id).n) + ' — finished position"><figcaption>End of rep</figcaption></figure></div>';
}

function detailHTML(dayId, i, slot) {
  const vi = variantOf(dayId, i, slot);
  const id = slot.v[vi];
  const e = ex(id);
  let h = "";

  if (slot.v.length > 1) {
    h += '<div class="variants" role="group" aria-label="Movement choice">' +
      slot.v.map((vid, n) =>
        '<button type="button" data-variant="' + n + '" aria-pressed="' + (n === vi) + '">' +
        esc(ex(vid).n) + "</button>").join("") + "</div>";
  }

  h += framesHTML(id);
  h += '<ol class="steps">' + e.s.map(t => "<li>" + esc(t) + "</li>").join("") + "</ol>";

  h += '<div class="notes">';
  if (e.c) h += '<div class="note cue"><span class="k">Cue</span><span>' + esc(e.c) + "</span></div>";
  if (e.m) h += '<div class="note miss"><span class="k">Avoid</span><span>' + esc(e.m) + "</span></div>";
  if (slot.note) h += '<div class="note prog"><span class="k">Today</span><span>' + esc(slot.note) + "</span></div>";
  h += "</div>";
  return h;
}

/* ── exercise card ────────────────────────────────────── */

/* A slot with two movements shows the chosen one first, the swap after the slash. */
function nameHTML(slot, vi) {
  const main = esc(ex(slot.v[vi]).n);
  if (slot.v.length < 2) return main;
  return main + ' <span class="alt">/ ' + esc(ex(slot.v[1 - vi]).n) + "</span>";
}

function exerciseHTML(dayId, i, slot) {
  const vi = variantOf(dayId, i, slot);
  const id = slot.v[vi];
  const e = ex(id);
  const done = isDone(dayId, i);

  return '<article class="ex' + (done ? " done" : "") + '" data-i="' + i + '">' +
    '<div class="ex-row">' +
      '<button type="button" class="tick" data-tick="' + i + '" aria-pressed="' + done +
        '" aria-label="Mark ' + esc(e.n) + ' complete">' +
        '<span class="idx">' + (i + 1) + '</span><span class="check">' + CHECK + "</span>" +
      "</button>" +
      '<button type="button" class="ex-main" data-open="' + i + '" aria-expanded="false">' +
        '<span class="thumb"><img loading="lazy" decoding="async" src="' + img(id, 0) + '" alt=""></span>' +
        '<span class="ex-text">' +
          '<span class="ex-name">' + nameHTML(slot, vi) + "</span>" +
          '<span class="ex-target">' + esc(e.t) + "</span>" +
        "</span>" +
        '<span class="prescription"><span class="sr">' + slot.sets + " × " + esc(slot.reps) + "</span>" +
        '<span class="lbl">sets × reps</span></span>' +
        '<span class="ex-chev">' + CHEV + "</span>" +
      "</button>" +
    "</div>" +
    '<div class="detail" hidden></div></article>';
}

/* ── warm-up / cooldown row ───────────────────────────── */

function initials(name) {
  return name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean)
    .slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function miniHTML(id, key) {
  const e = ex(id);
  const thumb = hasPhoto(id)
    ? '<span class="mthumb"><img loading="lazy" decoding="async" src="' + img(id, 0) + '" alt=""></span>'
    : '<span class="mthumb"><span class="glyph">' + initials(e.n) + "</span></span>";
  return '<button type="button" class="mini" data-mini="' + key + '" data-ex="' + id + '" aria-expanded="false">' +
    thumb +
    '<span class="mname">' + esc(e.n) + "</span>" +
    (e.d ? '<span class="mdose">' + esc(e.d) + "</span>" : "") +
    '<span class="ex-chev">' + CHEV + "</span></button>" +
    '<div class="mini-detail" id="md-' + key + '" hidden></div>';
}

function miniDetailHTML(id) {
  const e = ex(id);
  return framesHTML(id) +
    '<ol class="steps">' + e.s.map(t => "<li>" + esc(t) + "</li>").join("") + "</ol>" +
    (e.c ? '<div class="notes"><div class="note cue"><span class="k">Why</span><span>' + esc(e.c) + "</span></div></div>" : "");
}

/* ── views ────────────────────────────────────────────── */

function trainView() {
  const day = PROGRAM.find(d => d.id === state.day) || PROGRAM[0];
  const sets = totalSets(day.slots);
  const doneCount = doneSet(day.id).length;
  const pct = day.slots.length ? Math.round((doneCount / day.slots.length) * 100) : 0;

  return '<section class="hero">' +
      '<p class="hero-eyebrow">Day ' + day.n + " — " + day.block + (day.optional ? " — optional on a 5-day week" : "") + "</p>" +
      "<h1>" + esc(day.day) + "</h1>" +
      '<p class="focus">' + esc(day.focus) + "</p>" +
      '<div class="stats">' +
        '<span class="stat"><b>' + day.slots.length + "</b><span>Exercises</span></span>" +
        '<span class="stat"><b>' + sets + "</b><span>Working sets</span></span>" +
        '<span class="stat"><b>' + estimateMinutes(day) + "</b><span>Min, incl. rest</span></span>" +
      "</div>" +
      '<div class="bar-row">' +
        '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
        '<span class="pct">' + doneCount + " / " + day.slots.length + " done</span>" +
        '<button type="button" class="reset-btn" data-reset="' + day.id + '">Reset</button>' +
      "</div>" +
    "</section>" +

    '<section class="sec">' +
      '<button type="button" class="sec-head" data-sec="warm" aria-expanded="false">' +
        "<h2>Warm-up</h2><span class=\"tag\">8–10 min</span><span class=\"chev\">" + CHEV + "</span></button>" +
      '<div class="mini-list" id="sec-warm" hidden>' +
        day.warm.map((id, n) => miniHTML(id, "w" + n)).join("") +
        '<div class="callout">Then <b>1–2 light ramp sets</b> on your first big lift. Never static stretch cold.</div>' +
      "</div>" +
    "</section>" +

    '<section class="sec">' +
      '<div class="sec-head" style="cursor:default"><h2>The work</h2>' +
        '<span class="tag">' + sets + " sets</span></div>" +
      '<div class="ex-list">' + day.slots.map((s, i) => exerciseHTML(day.id, i, s)).join("") + "</div>" +
    "</section>" +

    '<section class="sec">' +
      '<button type="button" class="sec-head" data-sec="cool" aria-expanded="false">' +
        "<h2>Cool-down</h2><span class=\"tag\">30 s holds</span><span class=\"chev\">" + CHEV + "</span></button>" +
      '<div class="mini-list" id="sec-cool" hidden>' +
        day.cool.map((id, n) => miniHTML(id, "c" + n)).join("") +
      "</div>" +
    "</section>";
}

function coreView() {
  return '<section class="hero">' +
      '<p class="hero-eyebrow">Bolt-on</p><h1>Core &amp; cardio</h1>' +
      '<p class="focus">Pick three on any 3 non-consecutive days</p>' +
    "</section>" +

    '<section class="sec">' +
      '<div class="sec-head" style="cursor:default"><h2>Core menu</h2><span class="tag">Pick 3</span></div>' +
      '<div class="ex-list">' + CORE.map((s, i) => exerciseHTML("core", i, s)).join("") + "</div>" +
      '<div class="callout">Abs are a muscle like any other. <b>Load them and add weight over time</b> — three sets of unweighted crunches forever will not change anything.</div>' +
    "</section>" +

    '<section class="sec">' +
      '<div class="sec-head" style="cursor:default"><h2>Cardio for definition</h2></div>' +
      '<div class="cardio-grid">' +
        '<div class="cardio"><div class="big">8–10k</div><div class="cap">Steps, daily</div>' +
          "<p>Non-negotiable at a desk job. This does more for definition than any cardio session you will add.</p></div>" +
        '<div class="cardio"><div class="big">20–30</div><div class="cap">Min zone 2</div>' +
          "<p>Incline treadmill or bike, after 2–3 lifting sessions or on a rest day. Conversational pace throughout.</p></div>" +
        '<div class="cardio"><div class="big">Skip</div><div class="cap">Long HIIT</div>' +
          "<p>While you are in a deficit it eats the recovery your legs and lower back need for the next session.</p></div>" +
      "</div>" +
    "</section>";
}

function guideView() {
  const rules = [
    ["Tempo", "<b>2 seconds down</b>, controlled back up. The lowering phase is where most of the growth stimulus lives — never drop the weight."],
    ["Rest", "<b>60–90 s</b> on isolation work, <b>2–3 min</b> on compounds. Cutting rest short on heavy sets costs you reps, and reps are the thing you are trying to add."],
    ["Intensity", "Last two reps should be genuinely hard — stop <b>1–2 reps from failure</b>. Only the final set of an isolation movement is worth taking all the way."],
    ["Overload", "Add <b>reps or weight every week</b>. Hit the top of the range on every set, then add the smallest increment and start again at the bottom."],
    ["Warm-up sets", "<b>1–2 light sets</b> before the first exercise of each muscle. These are never counted in the set totals on the day pages."]
  ];

  const rows = PROGRAM.map(d =>
    '<tr><td><span class="pip" style="background:var(--' + d.block + ')"></span>' +
    '<span class="dayname">' + esc(d.day) + "</span></td>" +
    "<td>" + esc(d.focus) + (d.optional ? ' <span class="m">— drop for 5 days</span>' : "") + "</td>" +
    '<td class="m">' + totalSets(d.slots) + " sets</td></tr>").join("");

  return '<section class="hero">' +
      '<p class="hero-eyebrow">How to run it</p><h1>The rules</h1>' +
      '<p class="lede" style="margin-top:8px">Six days of push, pull and legs, each hit twice a week. ' +
      'Frequency is the reason this split works — every muscle gets two growth stimuli every seven days ' +
      'instead of one.</p>' +
    "</section>" +

    '<section class="sec"><div class="sec-head" style="cursor:default"><h2>Non-negotiables</h2></div>' +
      '<div class="prose-card"><dl class="rule-grid">' +
        rules.map(r => '<div class="rule"><dt>' + r[0] + "</dt><dd>" + r[1] + "</dd></div>").join("") +
      "</dl></div></section>" +

    '<section class="sec"><div class="sec-head" style="cursor:default"><h2>The week</h2>' +
      '<span class="tag">6 days</span></div>' +
      '<div class="prose-card"><div style="overflow-x:auto"><table class="split-table">' +
        "<thead><tr><th>Session</th><th>Focus</th><th>Volume</th></tr></thead><tbody>" + rows + "</tbody>" +
      "</table></div>" +
      '<div class="callout">Running five days instead? <b>Drop Legs B</b> and rotate the remaining five ' +
      "so the day you miss changes each week. Everything still gets hit.</div></div></section>" +

    '<section class="sec"><div class="sec-head" style="cursor:default"><h2>Reading the photos</h2></div>' +
      '<div class="prose-card"><p class="lede">Tap any exercise to open it. The left frame is the <b>start</b> ' +
      'of the rep, the right frame is the <b>end</b> — the two positions you are travelling between. ' +
      'Where a slot lists two movements, the buttons at the top of the panel swap between them; ' +
      'both are equally valid, so take whichever is free.</p></div></section>';
}

/* ── render ───────────────────────────────────────────── */

function renderRail() {
  const rail = $("#rail");
  rail.innerHTML = PROGRAM.map(d => {
    const complete = doneSet(d.id).length === d.slots.length && d.slots.length > 0;
    return '<button type="button" class="day-chip" role="tab" data-day="' + d.id +
      '" data-block="' + d.block + '" aria-selected="' + (state.view === "train" && state.day === d.id) + '">' +
      '<span class="dc-n">Day ' + d.n + (d.optional ? " · opt" : "") + "</span>" +
      '<span class="dc-name">' + esc(d.day) + "</span>" +
      '<span class="dc-ring"' + (complete ? "" : " hidden") + "></span></button>";
  }).join("");
}

function render() {
  const day = PROGRAM.find(d => d.id === state.day) || PROGRAM[0];
  document.body.setAttribute("data-block", state.view === "train" ? day.block : "");

  $("#railScroll").hidden = state.view !== "train";
  document.querySelectorAll(".view-tab").forEach(t => {
    t.setAttribute("aria-selected", String(t.dataset.view === state.view));
  });

  const main = $("#main");
  main.innerHTML = state.view === "train" ? trainView()
    : state.view === "core" ? coreView()
    : guideView();

  renderRail();
  state.open = null;
}

/* ── interactions ─────────────────────────────────────── */

function currentDayId() { return state.view === "core" ? "core" : state.day; }
function slotsFor(dayId) {
  if (dayId === "core") return CORE;
  const d = PROGRAM.find(x => x.id === dayId);
  return d ? d.slots : [];
}

document.addEventListener("click", e => {
  const t = e.target;

  const tab = t.closest(".view-tab");
  if (tab) { state.view = tab.dataset.view; save(); render(); return; }

  const chip = t.closest(".day-chip");
  if (chip) {
    state.day = chip.dataset.day;
    if (state.view !== "train") state.view = "train";
    save(); render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const themeBtn = t.closest("#themeBtn");
  if (themeBtn) { cycleTheme(); return; }

  const reset = t.closest("[data-reset]");
  if (reset) { state.done[reset.dataset.reset] = []; save(); render(); return; }

  const tick = t.closest("[data-tick]");
  if (tick) {
    const i = +tick.dataset.tick;
    const dayId = currentDayId();
    toggleDone(dayId, i);
    const card = tick.closest(".ex");
    const on = isDone(dayId, i);
    card.classList.toggle("done", on);
    tick.setAttribute("aria-pressed", String(on));
    refreshProgress();
    return;
  }

  const secHead = t.closest("[data-sec]");
  if (secHead) {
    const panel = $("#sec-" + secHead.dataset.sec);
    const open = secHead.getAttribute("aria-expanded") === "true";
    secHead.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
    return;
  }

  const mini = t.closest("[data-mini]");
  if (mini) {
    const panel = $("#md-" + mini.dataset.mini);
    const open = mini.getAttribute("aria-expanded") === "true";
    mini.setAttribute("aria-expanded", String(!open));
    mini.classList.toggle("open", !open);
    if (!open && !panel.innerHTML) panel.innerHTML = miniDetailHTML(mini.dataset.ex);
    panel.hidden = open;
    return;
  }

  const variant = t.closest("[data-variant]");
  if (variant) {
    const card = variant.closest(".ex");
    const i = +card.dataset.i;
    const dayId = currentDayId();
    state.variant[dayId + ":" + i] = +variant.dataset.variant;
    save();
    const slot = slotsFor(dayId)[i];
    const vi = variantOf(dayId, i, slot);
    $(".detail", card).innerHTML = detailHTML(dayId, i, slot);
    $(".thumb img", card).src = img(slot.v[vi], 0);
    $(".ex-name", card).innerHTML = nameHTML(slot, vi);
    $(".ex-target", card).textContent = ex(slot.v[vi]).t;
    return;
  }

  const opener = t.closest("[data-open]");
  if (opener) {
    const card = opener.closest(".ex");
    const i = +card.dataset.i;
    const dayId = currentDayId();
    const panel = $(".detail", card);
    const open = opener.getAttribute("aria-expanded") === "true";
    opener.setAttribute("aria-expanded", String(!open));
    card.classList.toggle("open", !open);
    if (!open) panel.innerHTML = detailHTML(dayId, i, slotsFor(dayId)[i]);
    panel.hidden = open;
    return;
  }
});

function refreshProgress() {
  const day = PROGRAM.find(d => d.id === state.day);
  if (!day || state.view !== "train") return;
  const n = doneSet(day.id).length;
  const pct = day.slots.length ? Math.round((n / day.slots.length) * 100) : 0;
  const fill = $(".bar i"); if (fill) fill.style.width = pct + "%";
  const label = $(".bar-row .pct"); if (label) label.textContent = n + " / " + day.slots.length + " done";
  const ring = document.querySelector('.day-chip[data-day="' + day.id + '"] .dc-ring');
  if (ring) ring.hidden = !(n === day.slots.length && day.slots.length > 0);
}

/* ── theme ────────────────────────────────────────────── */

function applyTheme() {
  if (state.theme) document.documentElement.setAttribute("data-theme", state.theme);
  else document.documentElement.removeAttribute("data-theme");
  const btn = $("#themeBtn");
  if (btn) btn.title = "Theme: " + (state.theme || "system");
}
function cycleTheme() {
  state.theme = state.theme === null ? "dark" : state.theme === "dark" ? "light" : null;
  applyTheme(); save();
}

/* ── rest timer ───────────────────────────────────────── */

const timer = { id: null, left: 0, preset: null };

function paintTimer() {
  const m = Math.floor(timer.left / 60), s = timer.left % 60;
  $("#clock").textContent = m + ":" + String(s).padStart(2, "0");
  $("#timer").classList.toggle("running", timer.id !== null);
  $("#timerStop").hidden = timer.id === null;
  document.querySelectorAll("[data-preset]").forEach(b => {
    b.setAttribute("aria-pressed", String(timer.id !== null && +b.dataset.preset === timer.preset));
  });
}

function stopTimer() {
  if (timer.id) clearInterval(timer.id);
  timer.id = null; timer.left = 0; timer.preset = null;
  paintTimer();
}

function startTimer(sec) {
  if (timer.id) clearInterval(timer.id);
  timer.preset = sec; timer.left = sec;
  timer.id = setInterval(() => {
    timer.left--;
    if (timer.left <= 0) {
      clearInterval(timer.id); timer.id = null; timer.left = 0; timer.preset = null;
      const el = $("#timer");
      el.classList.add("done-flash");
      setTimeout(() => el.classList.remove("done-flash"), 2600);
      try { if (navigator.vibrate) navigator.vibrate([120, 90, 120]); } catch (err) {}
    }
    paintTimer();
  }, 1000);
  paintTimer();
}

document.addEventListener("click", e => {
  const p = e.target.closest("[data-preset]");
  if (p) {
    const sec = +p.dataset.preset;
    if (timer.id && timer.preset === sec) stopTimer(); else startTimer(sec);
    return;
  }
  if (e.target.closest("#timerStop")) stopTimer();
});

/* ── boot ─────────────────────────────────────────────── */

load();
applyTheme();
render();
paintTimer();
