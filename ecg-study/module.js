/* Interactive ECG Waves & Intervals study module. Injected like ASPT; does not alter quiz scoring or the source-strip trainer. */
"use strict";
const EcgStudy = (() => {
  const D = typeof ECG_STUDY !== "undefined" ? ECG_STUDY : null;
  if (!D || !document.getElementById("home") || !document.getElementById("homeMenu")) {
    console.warn("ECG study module did not initialize.");
    return null;
  }

  const root = document.createElement("section");
  root.id = "ecgStudyHome";
  root.className = "hidden ecg-study";
  root.setAttribute("aria-labelledby", "ecgStudyTitle");
  document.getElementById("home").appendChild(root);

  const escape = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const shuffle = (items) => {
    const a = items.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const v = a[i]; a[i] = a[j]; a[j] = v;
    }
    return a;
  };
  const prefersDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const state = {
    tab: "slider",
    stage: 0,
    landmarks: false,
    playing: false,
    theme: prefersDark() ? "dark" : "light",
    order: D.cards.map((_, i) => i),
    card: 0,
    flipped: false,
    reverse: false,
    known: {},
    review: {},
    reviewOnly: false,
    quizOrder: [],
    quiz: 0,
    quizScore: 0,
    quizPicked: null,
    quizDone: false
  };
  let playTimer = null;

  const oldHome = goHome;
  goHome = function () {
    stopPlay();
    root.classList.add("hidden");
    document.getElementById("home").classList.remove("ecg-study-active");
    oldHome();
  };

  const launch = document.createElement("button");
  launch.className = "btn secondary";
  launch.type = "button";
  launch.id = "ecgStudyLaunch";
  launch.appendChild(document.createTextNode("⚡ ECG Waves & Intervals"));
  const sm = document.createElement("small");
  sm.textContent = "Flip flashcards, scrub the conduction cycle, landmarks, and a short quiz";
  launch.appendChild(sm);
  launch.onclick = open;
  const menu = document.getElementById("homeMenu");
  const ecgBtn = Array.from(menu.querySelectorAll("button")).find((b) => /ECG Rhythm Practice/.test(b.textContent || ""));
  menu.insertBefore(launch, ecgBtn || null);

  function open() {
    goHome();
    if (typeof khHideAll === "function") khHideAll();
    hide("homeMenu");
    show("home");
    show("ecgStudyHome");
    document.getElementById("home").classList.add("ecg-study-active");
    applyTheme();
    renderAll();
    window.scrollTo(0, 0);
    const title = document.getElementById("ecgStudyTitle");
    if (title) title.focus();
  }

  function applyTheme() {
    root.dataset.theme = state.theme;
  }

  function stopPlay() {
    state.playing = false;
    if (playTimer) { clearInterval(playTimer); playTimer = null; }
    const btn = root.querySelector("#ecgPlayBtn");
    if (btn) {
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "Play cycle";
    }
  }
  function togglePlay() {
    if (state.playing) { stopPlay(); return; }
    state.playing = true;
    const btn = root.querySelector("#ecgPlayBtn");
    if (btn) {
      btn.setAttribute("aria-pressed", "true");
      btn.textContent = "Pause";
    }
    playTimer = setInterval(() => {
      setStage((state.stage + 1) % D.stages.length);
    }, 2200);
  }

  /* ---- SVG: ECG tracing (native, not screenshots) ---- */
  const ECG = {
    p0: 48, p1: 108, q0: 168, j: 218, t0: 298, t1: 398, end: 622, y: 86
  };
  const SEG = {
    p: `M${ECG.p0},${ECG.y} C58,86 66,56 78,56 C90,56 98,86 ${ECG.p1},${ECG.y}`,
    pr: `M${ECG.p1},${ECG.y} L${ECG.q0},${ECG.y}`,
    qrs: `M${ECG.q0},${ECG.y} L176,100 L188,20 L204,118 L${ECG.j},${ECG.y}`,
    st: `M${ECG.j},${ECG.y} L${ECG.t0},${ECG.y}`,
    t: `M${ECG.t0},${ECG.y} C318,86 332,50 348,50 C368,50 384,86 ${ECG.t1},${ECG.y}`,
    tp: `M${ECG.t1},${ECG.y} L${ECG.end},${ECG.y}`
  };
  const CURSOR = { p: 78, pr: 138, qrs: 188, st: 258, t: 348, tp: 510 };
  const FULL = `M20,${ECG.y} L${ECG.p0},${ECG.y} C58,86 66,56 78,56 C90,56 98,86 ${ECG.p1},${ECG.y} L${ECG.q0},${ECG.y} L176,100 L188,20 L204,118 L${ECG.j},${ECG.y} L${ECG.t0},${ECG.y} C318,86 332,50 348,50 C368,50 384,86 ${ECG.t1},${ECG.y} L${ECG.end},${ECG.y}`;

  function ecgSvg(stageId, landmarks) {
    const ids = D.stages.map((s) => s.id);
    const active = SEG[stageId];
    const cx = CURSOR[stageId];
    const on = (id) => ids.indexOf(stageId) === ids.indexOf(id) ? " is-on" : "";
    const land = landmarks ? `
      <g class="ecg-landmarks" aria-hidden="true">
        <path d="M${ECG.p0},128 L${ECG.q0},128" stroke="#4ade80" stroke-width="2"/>
        <path d="M${ECG.p0},124 L${ECG.p0},132 M${ECG.q0},124 L${ECG.q0},132" stroke="#4ade80" stroke-width="2"/>
        <text x="${(ECG.p0 + ECG.q0) / 2}" y="142" text-anchor="middle" fill="#86efac" font-size="10" font-weight="700">PR 0.12–0.20 s</text>
        <path d="M${ECG.q0},114 L${ECG.j},114" stroke="#38bdf8" stroke-width="2"/>
        <path d="M${ECG.q0},110 L${ECG.q0},118 M${ECG.j},110 L${ECG.j},118" stroke="#38bdf8" stroke-width="2"/>
        <text x="${(ECG.q0 + ECG.j) / 2 + 24}" y="110" text-anchor="middle" fill="#7dd3fc" font-size="10" font-weight="700">QRS &lt; 0.12 s</text>
        <circle cx="${ECG.j}" cy="${ECG.y}" r="4" fill="#fbbf24" stroke="#fff" stroke-width="1"/>
        <text x="${ECG.j + 12}" y="74" text-anchor="start" fill="#fcd34d" font-size="10" font-weight="700">J point</text>
        <path d="M${ECG.j},152 L${ECG.t0},152" stroke="#f59e0b" stroke-width="2"/>
        <path d="M${ECG.j},148 L${ECG.j},156 M${ECG.t0},148 L${ECG.t0},156" stroke="#f59e0b" stroke-width="2"/>
        <text x="${(ECG.j + ECG.t0) / 2}" y="166" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="700">ST</text>
        <path d="M${ECG.q0},176 L${ECG.t1},176" stroke="#a78bfa" stroke-width="2"/>
        <path d="M${ECG.q0},172 L${ECG.q0},180 M${ECG.t1},172 L${ECG.t1},180" stroke="#a78bfa" stroke-width="2"/>
        <text x="${(ECG.q0 + ECG.t1) / 2}" y="190" text-anchor="middle" fill="#ddd6fe" font-size="10" font-weight="700">QT (rate-dependent)</text>
      </g>` : "";
    const vbH = landmarks ? 200 : 150;
    return `<svg class="ecg-ecg-svg" viewBox="0 0 640 ${vbH}" role="img" aria-hidden="true">
      <title>Simplified ECG waveform</title>
      <line x1="20" y1="${ECG.y}" x2="${ECG.end}" y2="${ECG.y}" stroke="#2a3140" stroke-width="1"/>
      <path class="ecg-wave-dim" d="${FULL}"/>
      <path class="ecg-wave-active" d="${active}"/>
      <line class="ecg-cursor" x1="${cx}" y1="18" x2="${cx}" y2="118"/>
      <circle cx="${cx}" cy="${ECG.y}" r="4.5" fill="#c4b5fd" stroke="#f5f3ff" stroke-width="1.2"/>
      <text class="ecg-label${on("p")}" x="78" y="44" text-anchor="middle">P</text>
      <text class="ecg-label${on("qrs")}" x="188" y="14" text-anchor="middle">QRS</text>
      <text class="ecg-label${on("t")}" x="348" y="38" text-anchor="middle">T</text>
      ${land}
    </svg>`;
  }

  function heartSvg() {
    return `<svg class="ecg-heart-svg" viewBox="0 0 280 220" role="img" aria-hidden="true">
      <title>Front-facing heart and conduction system</title>
      <path class="ecg-chamber ecg-atria" d="M140,40 C140,18 110,8 90,30 C66,56 74,92 102,104 L140,96 L178,104 C206,92 214,56 190,30 C170,8 140,18 140,40 Z"/>
      <path class="ecg-chamber ecg-ventricles" d="M102,104 C74,128 84,172 140,196 C196,172 206,128 178,104 L140,116 Z"/>
      <path class="ecg-heart-outline" d="M140,40 C140,18 110,8 90,30 C62,58 70,112 140,196 C210,112 218,58 190,30 C170,8 140,18 140,40 Z"/>
      <path class="ecg-path ecg-path-atrial ecg-path-to-av" d="M108,72 Q126,88 140,114"/>
      <path class="ecg-path ecg-path-vent" d="M140,118 L140,140"/>
      <path class="ecg-path ecg-path-vent" d="M140,140 Q116,154 104,178"/>
      <path class="ecg-path ecg-path-vent" d="M140,140 Q164,154 176,178"/>
      <path class="ecg-path ecg-path-vent" d="M104,178 q-8,10 -16,14 M104,178 q4,12 0,18 M176,178 q8,10 16,14 M176,178 q-4,12 0,18"/>
      <path class="ecg-repol" d="M112,150 Q124,166 136,176"/>
      <path class="ecg-repol" d="M168,150 Q156,166 144,176"/>
      <circle class="ecg-node-sa" id="ecgSaNode" cx="108" cy="72" r="8" data-chamber="right-atrium"/>
      <circle class="ecg-node-av" id="ecgAvNode" cx="140" cy="116" r="7" data-chamber="av-junction"/>
    </svg>`;
  }

  function dotsHtml(stage) {
    return D.stages.map((s, i) => `<i class="${i === stage ? "is-on" : ""}" data-i="${i}"></i>`).join("");
  }

  function landmarkDl() {
    return `<dl>${D.landmarks.map((l) =>
      `<div><dt>${escape(l.name)}</dt><dd>${escape(l.span)}${l.normal ? " · " + escape(l.normal) : ""}</dd></div>`
    ).join("")}</dl>
    <p class="hint" id="ecgNormalNote">PR normal ${escape(D.normals.pr)}. QRS normal ${escape(D.normals.qrs)}. ${escape(D.normals.qt)}</p>`;
  }

  function sliderPanel() {
    const st = D.stages[state.stage];
    return `<div id="ecgSliderPanel">
      <div class="ecg-instrument" id="ecgInstrument" data-stage="${st.id}">
        ${ecgSvg(st.id, state.landmarks)}
        <div class="ecg-heart-frame">
          <div class="ecg-side-label" id="ecgPatientRight"><span>${escape(D.patient.viewerLeft)}</span><small>viewer’s left</small></div>
          ${heartSvg()}
          <div class="ecg-side-label" id="ecgPatientLeft"><span>${escape(D.patient.viewerRight)}</span><small>viewer’s right</small></div>
        </div>
        <div class="ecg-legend">
          <span><i class="ecg-swatch" aria-hidden="true"></i> SA node</span>
          <span><i class="ecg-swatch ring" aria-hidden="true"></i> AV node</span>
        </div>
        <p class="ecg-caption" id="ecgStageCaption">${escape(st.caption)}</p>
        <div class="ecg-assoc">
          <div><strong>Electrical event</strong> ${escape(st.event)}</div>
          <div><strong>Heart location</strong> ${escape(st.location)}</div>
        </div>
        <p class="hint" style="color:#9b97b0;text-align:center;margin:0 8px 8px">${escape(st.heart)}</p>
        <div class="ecg-slider-row">
          <label for="ecgStageSlider">ECG part</label>
          <div class="ecg-slider-dots" aria-hidden="true">${dotsHtml(state.stage)}</div>
          <input type="range" id="ecgStageSlider" min="0" max="${D.stages.length - 1}" step="1" value="${state.stage}"
            aria-valuemin="0" aria-valuemax="${D.stages.length - 1}" aria-valuenow="${state.stage}"
            aria-valuetext="${escape(st.name)}" aria-label="ECG cycle stage">
          <div class="ecg-stage-btns">
            <button type="button" class="btn secondary" id="ecgStagePrev">Previous stage</button>
            <button type="button" class="btn secondary" id="ecgPlayBtn" aria-pressed="false">Play cycle</button>
            <button type="button" class="btn secondary" id="ecgStageNext">Next stage</button>
          </div>
        </div>
        <p class="ecg-sr-only" id="ecgStageLive" role="status" aria-live="polite">${escape(st.aria)}</p>
      </div>
      <p class="ecg-orient-note">${escape(D.patient.note)}</p>
      <div class="ecg-controls">
        <label class="ecg-toggle"><input type="checkbox" id="ecgLandmarksToggle" ${state.landmarks ? "checked" : ""}> Show intervals &amp; landmarks (PR, QRS, ST, J point, QT)</label>
      </div>
      <div class="ecg-landmark-list" id="ecgLandmarkBox" ${state.landmarks ? "" : "hidden"}>
        <h3>Intervals &amp; landmarks</h3>
        ${landmarkDl()}
      </div>
    </div>`;
  }

  function visibleCardIds() {
    if (!state.reviewOnly) return state.order;
    const flagged = state.order.filter((i) => state.review[D.cards[i].id]);
    return flagged.length ? flagged : state.order;
  }
  function currentCard() {
    const vis = visibleCardIds();
    if (!vis.length) return D.cards[0];
    if (state.card >= vis.length) state.card = 0;
    return D.cards[vis[state.card]];
  }

  function cardsPanel() {
    const vis = visibleCardIds();
    const card = currentCard();
    const front = state.reverse ? card.definition : card.term;
    const back = state.reverse ? card.term : card.definition;
    const n = vis.length;
    const knownN = D.cards.filter((c) => state.known[c.id]).length;
    return `<div id="ecgCardsPanel">
      <p class="ecg-progress" id="ecgCardProgress">Card ${state.card + 1} of ${n} · Known ${knownN} / ${D.cards.length}</p>
      <div class="ecg-chip-row">
        <button type="button" class="ecg-chip" id="ecgReverseBtn" aria-pressed="${state.reverse}">Reverse (definition ↔ term)</button>
        <button type="button" class="ecg-chip" id="ecgReviewOnlyBtn" aria-pressed="${state.reviewOnly}">Study-again pile</button>
      </div>
      <div class="ecg-card-scene">
        <div class="ecg-card${state.flipped ? " is-flipped" : ""}" id="ecgFlashcard" tabindex="0" role="button"
          aria-pressed="${state.flipped}" aria-label="Flashcard. ${state.flipped ? "Showing back" : "Showing front"}. Activate to flip.">
          <div class="ecg-card-face ecg-card-front">
            <div class="ecg-card-kicker">${state.reverse ? "Definition" : "Term"}</div>
            <div class="ecg-card-text" id="ecgCardFront">${escape(front)}</div>
          </div>
          <div class="ecg-card-face ecg-card-back">
            <div class="ecg-card-kicker">${state.reverse ? "Term" : "Definition"}</div>
            <div class="ecg-card-text" id="ecgCardBack">${escape(back)}</div>
          </div>
        </div>
      </div>
      <div class="ecg-controls">
        <button type="button" class="btn secondary" id="ecgCardPrev">Previous</button>
        <button type="button" class="btn" id="ecgCardFlip">Flip</button>
        <button type="button" class="btn secondary" id="ecgCardNext">Next</button>
      </div>
      <div class="ecg-controls">
        <button type="button" class="btn ghost" id="ecgCardShuffle">Shuffle</button>
        <button type="button" class="btn ghost" id="ecgKnowBtn">Know this</button>
        <button type="button" class="btn ghost" id="ecgAgainBtn">Study again</button>
      </div>
      <p class="hint">Tap the card or press Flip. Reverse mode swaps term and definition without duplicating the deck. Shuffle randomizes order. Know this / Study again flag cards for this session only.</p>
    </div>`;
  }

  function quizPanel() {
    if (!state.quizOrder.length) {
      return `<div id="ecgQuizPanel">
        <p>Short practice covering waves, Q/R/S, intervals, the J point, normals, and patient-right orientation. Feedback appears immediately after each answer.</p>
        <button type="button" class="btn" id="ecgQuizStart">Start quiz (${D.quiz.length} questions)</button>
      </div>`;
    }
    if (state.quizDone) {
      const tot = state.quizOrder.length;
      const pct = Math.round((state.quizScore / tot) * 100);
      const pass = pct >= 80;
      return `<div id="ecgQuizPanel">
        <h3>Quiz results</h3>
        <div class="score-circle ${pass ? "pass" : "fail"}" style="margin-top:10px">
          <span class="pct" id="ecgQuizPct">${pct}%</span>
          <span class="lbl" id="ecgQuizRaw">${state.quizScore} / ${tot}</span>
        </div>
        <p class="verdict-big ${pass ? "pass" : "fail"}">${pass ? "Nice work" : "Keep drilling"}</p>
        <button type="button" class="btn" id="ecgQuizStart">Retake quiz</button>
      </div>`;
    }
    const q = D.quiz[state.quizOrder[state.quiz]];
    const opts = state.quizOpts || q.options.map((_, i) => i);
    const answered = state.quizPicked !== null;
    const buttons = opts.map((oi) => {
      const text = q.options[oi];
      let cls = "opt";
      if (answered) {
        if (oi === q.answer) cls += " correct";
        else if (oi === state.quizPicked) cls += " wrong";
      }
      return `<button type="button" class="${cls}" data-opt="${oi}" ${answered ? "disabled" : ""}><span class="ltr">${String.fromCharCode(65 + opts.indexOf(oi))}</span>${escape(text)}</button>`;
    }).join("");
    const fb = answered
        ? `<div class="feedback show ${state.quizPicked === q.answer ? "ok" : "no"}" id="ecgQuizFeedback" tabindex="-1">
          <div class="verdict">${state.quizPicked === q.answer ? "Correct" : "Not quite"}</div>
          <div>${escape(q.explain)}</div>
        </div>
        <button type="button" class="btn" id="ecgQuizNext">${state.quiz === state.quizOrder.length - 1 ? "See results" : "Next question"}</button>`
      : `<div class="feedback" id="ecgQuizFeedback"></div>`;
    return `<div id="ecgQuizPanel">
      <p class="ecg-progress">Question ${state.quiz + 1} of ${state.quizOrder.length}</p>
      <p class="ecg-quiz-prompt" id="ecgQuizPrompt">${escape(q.prompt)}</p>
      <div id="ecgQuizOpts">${buttons}</div>
      ${fb}
    </div>`;
  }

  function shell() {
    return `<div class="card">
      <div class="ecg-study-head">
        <div>
          <h2 id="ecgStudyTitle" tabindex="-1">${escape(D.title)}</h2>
          <p class="hint" style="margin:4px 0 0">Match each ECG shape with its name, electrical event, and heart location. Diagrams are schematic, not to anatomical scale.</p>
        </div>
        <div class="ecg-study-tools">
          <button type="button" class="btn ghost" id="ecgThemeBtn">${state.theme === "dark" ? "Light theme" : "Dark theme"}</button>
          <button type="button" class="btn ghost" id="ecgStudyBack">← All study modes</button>
        </div>
      </div>
      <div class="ecg-study-tabs" role="tablist" aria-label="ECG study sections">
        <button type="button" class="ecg-study-tab" role="tab" id="ecgTabSlider" aria-controls="ecgStudyMain" aria-selected="${state.tab === "slider"}">Interactive slider</button>
        <button type="button" class="ecg-study-tab" role="tab" id="ecgTabCards" aria-controls="ecgStudyMain" aria-selected="${state.tab === "cards"}">ECG Flashcards</button>
        <button type="button" class="ecg-study-tab" role="tab" id="ecgTabQuiz" aria-controls="ecgStudyMain" aria-selected="${state.tab === "quiz"}">Quiz</button>
      </div>
      <div id="ecgStudyMain" role="tabpanel">
        ${state.tab === "slider" ? sliderPanel() : ""}
        ${state.tab === "cards" ? cardsPanel() : ""}
        ${state.tab === "quiz" ? quizPanel() : ""}
      </div>
    </div>`;
  }

  function renderAll() {
    root.innerHTML = shell();
    bind();
    if (state.playing && state.tab === "slider") {
      const btn = root.querySelector("#ecgPlayBtn");
      if (btn) { btn.setAttribute("aria-pressed", "true"); btn.textContent = "Pause"; }
    } else if (state.tab !== "slider") stopPlay();
  }

  function setStage(i, fromUser) {
    const n = D.stages.length;
    state.stage = ((i % n) + n) % n;
    if (fromUser) stopPlay();
    if (state.tab !== "slider") return;
    const st = D.stages[state.stage];
    const inst = document.getElementById("ecgInstrument");
    if (!inst) { renderAll(); return; }
    inst.dataset.stage = st.id;
    inst.querySelector(".ecg-ecg-svg")?.replaceWith(
      Object.assign(document.createElement("div"), { innerHTML: ecgSvg(st.id, state.landmarks) }).firstElementChild
    );
    const cap = document.getElementById("ecgStageCaption");
    if (cap) cap.textContent = st.caption;
    const live = document.getElementById("ecgStageLive");
    if (live) live.textContent = st.aria;
    const assoc = inst.querySelectorAll(".ecg-assoc div");
    if (assoc[0]) assoc[0].innerHTML = "<strong>Electrical event</strong> " + escape(st.event);
    if (assoc[1]) assoc[1].innerHTML = "<strong>Heart location</strong> " + escape(st.location);
    const hint = inst.querySelector(".ecg-slider-row")?.previousElementSibling;
    if (hint && hint.classList.contains("hint")) hint.textContent = st.heart;
    const slider = document.getElementById("ecgStageSlider");
    if (slider) {
      slider.value = String(state.stage);
      slider.setAttribute("aria-valuenow", String(state.stage));
      slider.setAttribute("aria-valuetext", st.name);
    }
    const dots = inst.querySelector(".ecg-slider-dots");
    if (dots) dots.innerHTML = dotsHtml(state.stage);
  }

  function bind() {
    root.querySelector("#ecgStudyBack")?.addEventListener("click", () => goHome());
    root.querySelector("#ecgThemeBtn")?.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
      renderAll();
    });
    root.querySelector("#ecgTabSlider")?.addEventListener("click", () => { state.tab = "slider"; renderAll(); });
    root.querySelector("#ecgTabCards")?.addEventListener("click", () => { state.tab = "cards"; stopPlay(); renderAll(); });
    root.querySelector("#ecgTabQuiz")?.addEventListener("click", () => { state.tab = "quiz"; stopPlay(); renderAll(); });

    const slider = root.querySelector("#ecgStageSlider");
    if (slider) {
      slider.addEventListener("input", () => setStage(parseInt(slider.value, 10), true));
      slider.addEventListener("change", () => setStage(parseInt(slider.value, 10), true));
    }
    root.querySelector("#ecgStagePrev")?.addEventListener("click", () => setStage(state.stage - 1, true));
    root.querySelector("#ecgStageNext")?.addEventListener("click", () => setStage(state.stage + 1, true));
    root.querySelector("#ecgPlayBtn")?.addEventListener("click", togglePlay);
    root.querySelector("#ecgLandmarksToggle")?.addEventListener("change", (e) => {
      state.landmarks = e.target.checked;
      renderAll();
    });

    root.querySelector("#ecgFlashcard")?.addEventListener("click", flipCard);
    root.querySelector("#ecgFlashcard")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(); }
    });
    root.querySelector("#ecgCardFlip")?.addEventListener("click", flipCard);
    root.querySelector("#ecgCardPrev")?.addEventListener("click", () => moveCard(-1));
    root.querySelector("#ecgCardNext")?.addEventListener("click", () => moveCard(1));
    root.querySelector("#ecgCardShuffle")?.addEventListener("click", () => {
      state.order = shuffle(D.cards.map((_, i) => i));
      state.card = 0;
      state.flipped = false;
      state.reviewOnly = false;
      renderAll();
    });
    root.querySelector("#ecgReverseBtn")?.addEventListener("click", () => {
      state.reverse = !state.reverse;
      state.flipped = false;
      renderAll();
    });
    root.querySelector("#ecgReviewOnlyBtn")?.addEventListener("click", () => {
      state.reviewOnly = !state.reviewOnly;
      state.card = 0;
      state.flipped = false;
      if (state.reviewOnly) state.order = shuffle(state.order);
      renderAll();
    });
    root.querySelector("#ecgKnowBtn")?.addEventListener("click", () => {
      const c = currentCard();
      state.known[c.id] = true;
      delete state.review[c.id];
      moveCard(1);
    });
    root.querySelector("#ecgAgainBtn")?.addEventListener("click", () => {
      const c = currentCard();
      state.review[c.id] = true;
      delete state.known[c.id];
      moveCard(1);
    });

    root.querySelector("#ecgQuizStart")?.addEventListener("click", startQuiz);
    root.querySelectorAll("#ecgQuizOpts .opt").forEach((btn) => {
      btn.addEventListener("click", () => pickQuiz(parseInt(btn.getAttribute("data-opt"), 10)));
    });
    root.querySelector("#ecgQuizNext")?.addEventListener("click", nextQuiz);
  }

  function flipCard() {
    state.flipped = !state.flipped;
    const el = document.getElementById("ecgFlashcard");
    if (!el) return;
    el.classList.toggle("is-flipped", state.flipped);
    el.setAttribute("aria-pressed", String(state.flipped));
    el.setAttribute("aria-label", `Flashcard. ${state.flipped ? "Showing back" : "Showing front"}. Activate to flip.`);
  }
  function moveCard(dir) {
    const vis = visibleCardIds();
    state.card = (state.card + dir + vis.length) % vis.length;
    state.flipped = false;
    renderAll();
  }

  function startQuiz() {
    state.quizOrder = shuffle(D.quiz.map((_, i) => i));
    state.quiz = 0;
    state.quizScore = 0;
    state.quizPicked = null;
    state.quizDone = false;
    const q = D.quiz[state.quizOrder[0]];
    state.quizOpts = shuffle(q.options.map((_, i) => i));
    renderAll();
  }
  function pickQuiz(oi) {
    if (state.quizPicked !== null) return;
    const q = D.quiz[state.quizOrder[state.quiz]];
    state.quizPicked = oi;
    if (oi === q.answer) state.quizScore += 1;
    renderAll();
    document.getElementById("ecgQuizFeedback")?.focus?.();
  }
  function nextQuiz() {
    if (state.quiz >= state.quizOrder.length - 1) {
      state.quizDone = true;
    } else {
      state.quiz += 1;
      state.quizPicked = null;
      const q = D.quiz[state.quizOrder[state.quiz]];
      state.quizOpts = shuffle(q.options.map((_, i) => i));
    }
    renderAll();
  }

  root.addEventListener("keydown", (e) => {
    if (root.classList.contains("hidden")) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT")) return;
    if (state.tab === "slider") {
      if (e.key === "ArrowRight") { e.preventDefault(); setStage(state.stage + 1, true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setStage(state.stage - 1, true); }
    }
    if (state.tab === "cards") {
      if (e.key === "ArrowRight") { e.preventDefault(); moveCard(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); moveCard(-1); }
    }
  });

  return {
    open,
    data: D,
    getState: () => state,
    setStage,
    startQuiz,
    pickQuiz
  };
})();
