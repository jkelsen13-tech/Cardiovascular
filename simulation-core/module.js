/* Additive local teaching module. Existing routes and storage remain owned by their modules. */
(function () {
  "use strict";
  const C = window.CardioSimCore,
    D = window.CardioSimContent,
    P = window.CardioSimProgress;
  const menu = document.getElementById("homeMenu");
  if (!menu) return;
  const base = new URL("../", document.currentScript.src);
  const root = document.createElement("section");
  root.id = "cardiorespiratoryStudy";
  root.className = "hidden simulator";
  document.getElementById("home").append(root);
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  let storage;
  try {
    storage = localStorage;
  } catch (e) {
    storage = {
      getItem() {
        throw e;
      },
      setItem() {
        throw e;
      },
      removeItem() {
        throw e;
      },
    };
  }
  let loaded = P.load(storage),
    progress = loaded.data,
    saveError = loaded.error,
    corrupt = !!loaded.error;
  const state = {
    system: "heart",
    tab: "explore",
    view: "whole",
    lesson: 0,
    time: 0,
    playing: false,
    speed: 1,
    selected: "ra",
    route: 0,
    textScale: 1,
    reverse: false,
    prediction: null,
    question: 0,
    order: [],
    answerOrder: [],
    answerQuestionId: "",
    picked: null,
    hint: false,
    session: 5,
    ventilation: "spontaneous",
    breathing: {rate:12,target:.5,resistance:2,compliance:.1,mode:"target"},
  };
  let mechanics = window.RespiratoryMechanics.build();
  function respAt() {
    const teaching=C.respiratoryAt(state.time === mechanics.period ? 5 : state.time / mechanics.period * 5),m=mechanics.at(state.time);
    return {...teaching,inflation:Math.min(1,m.excursion/.5),airflow:Math.abs(m.flow)<1e-6?'Zero at boundary':m.flow>0?'Inward':'Outward',pressure:Math.abs(m.alveolar)<1e-6?'equal to ambient':m.alveolar>0?'above ambient':'below ambient',diaphragm:m.inspiration?'contracts downward':'relaxes upward'};
  }
  function rebuildMechanics() { mechanics = RespiratoryMechanics.build({...state.breathing,ventilation:state.ventilation}); state.time = Math.min(state.time,mechanics.period); }
  const runtimeMemory = new Map(), sceneSnapshots = new Map();
  let fallbackExplorer = null,sceneReady=Promise.resolve(),guidedRespSignature=null,guidedRespAnchor=0,guidedRespWindow=null,guidedRespOwner=null,guidedParked=null,guidedSuspendNavigation=null;
  let view = null,
    generation = 0,
    raf = 0,
    last = 0,
    lastRender = 0,
    atlasWanted = false;
  const scripts = new Map();
  function script(path) {
    if (scripts.has(path)) return scripts.get(path);
    const promise = new Promise((ok, no) => {
      const el = document.createElement("script");
      el.src = new URL(path, base);
      el.onload = ok;
      el.onerror = () => {
        scripts.delete(path);
        el.remove();
        no(Error("Local asset could not be loaded."));
      };
      document.head.append(el);
    });
    scripts.set(path, promise);
    return promise;
  }
  function release() {
    generation++;
    guidedParked=null;
    guidedRespOwner=null;
    guidedRespSignature=null;
    const owned=view;let error;const clean=fn=>{try{fn();}catch(e){error=error||e;}};
    clean(()=>{if(owned?.snapshot)sceneSnapshots.set(state.system,owned.snapshot());});
    clean(()=>{const explorer=owned?.inspect?.().explorer;if(explorer&&fallbackExplorer){fallbackExplorer.go(explorer.segment);fallbackExplorer.go(explorer.route?.[explorer.index]||explorer.stage);}});
    view=null;clean(()=>owned?.dispose());
    for(const selector of ['[data-explorer-fallback]','[data-explorer-breath-state]']){const el=root.querySelector(selector);if(el)el.hidden=false;}
    if(error)throw error;
  }
  function stop() {
    state.playing = false;
    last = 0;
    cancelAnimationFrame(raf);
    root.querySelector("[data-play]")?.setAttribute("aria-pressed", "false");
    const scenePlay = root.querySelector("[data-breath-play]");
    if (scenePlay) scenePlay.textContent = "Play simulation";
    if (root.querySelector("[data-play]"))
      root.querySelector("[data-play]").textContent = "Play";
  }
  function close() {
    if(!root.classList.contains('hidden'))runtimeMemory.set(state.system,{state:{...state,breathing:{...state.breathing}},atlasWanted});
    if(state.system==='respiratory'&&!view&&fallbackExplorer){const route=fallbackExplorer.state();sceneSnapshots.set('respiratory',{...sceneSnapshots.get('respiratory'),journey:{id:route.id,segment:route.segment}});}
    stop();
    try{release();}finally{root.classList.add("hidden");}
  }
  const oldHome = window.goHome;
  window.goHome = function () {
    let error;const clean=fn=>{try{fn();}catch(e){error=error||e;}};
    clean(()=>window.HeartV3Study?.close());
    const lease=guidedSuspendNavigation;
    clean(()=>{if(lease&&!lease.used&&lease.view===view&&lease.generation===generation&&guidedRespCurrent(lease.ctx)&&view?.isUsable?.()){
      lease.used=true;
      if(!root.classList.contains('hidden'))runtimeMemory.set(state.system,{state:{...state,breathing:{...state.breathing}},atlasWanted});
      stop();
      if(view.suspend()){guidedParked={view,generation,lessonId:lease.lessonId};root.classList.add('hidden');}
      else close();
    }else close();});
    clean(()=>oldHome());if(error)throw error;
  };
  function persist() {
    if (corrupt) return;
    try {
      P.save(storage, progress);
      saveError = "";
    } catch (e) {
      saveError =
        "Simulator progress could not be saved. Export it below; this session still works.";
    }
    const p = root.querySelector("[data-storage-status]");
    if (p) p.textContent = saveError;
  }
  function open(system, options = {}) {
    window.goHome();
    state.system = system;
    state.tab = "explore";
    state.order = [];
    resetAnswerOrder();
    state.question = 0;
    state.picked = null;
    state.hint = false;
    state.selected = system === "heart" ? "ra" : "trachea";
    state.lesson = progress.lessons[system] || 0;
    state.time = 0;
    atlasWanted = false;
    const remembered=options.resume&&runtimeMemory.get(system);
    if(remembered){Object.assign(state,remembered.state,{breathing:{...remembered.state.breathing}});atlasWanted=remembered.atlasWanted;rebuildMechanics();}
    else sceneSnapshots.delete(system);
    menu.classList.add("hidden");
    root.classList.remove("hidden");
    render(options.guidedContext);
    if(remembered?.state.playing&&!matchMedia('(prefers-reduced-motion: reduce)').matches)root.querySelector('[data-play]')?.click();
    root.querySelector("h2").focus();
  }
  for (const [system, label, description] of [
    [
      "heart",
      "Heart Simulator v2",
      "Explore anatomy, mechanical timing, circulation and untimed practice",
    ],
    [
      "respiratory",
      "Respiratory Simulator v2",
      "Breathing mechanics, gas exchange and linked capnography",
    ],
  ]) {
    const b = document.createElement("button");
    b.id = system + "SimulatorLaunch";
    b.type = "button";
    b.className = "btn secondary";
    b.textContent = label;
    const sm = document.createElement("small");
    sm.textContent = description;
    b.append(sm);
    b.onclick = () => open(system);
    menu.append(b);
  }
  const sourceLink = (id) => {
    const s = D.sources[id];
    return `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`;
  };
  const structures = () =>
    D.structures.filter((s) => s.system === state.system);
  function structureCard() {
    const s =
      structures().find((s) => s.id === state.selected) || structures()[0];
    return `<article class="sim-card" data-structure-detail><h3>${esc(s.displayName)}</h3><span class="sim-badge">${s.representationType === "reference_mesh" ? "Reference anatomy" : "Supplementary schematic / not to scale"}</span><p>${esc(s.text)}</p><p>${s.sourceRefs.map(sourceLink).join(" · ")}</p>${s.representationType !== "reference_mesh" ? inset(s.id) : ""}</article>`;
  }
  function inset(id) {
    if (id === "ias")
      return `<svg class="sim-diagram" viewBox="0 0 440 180" role="img" aria-label="Schematic atrial partition"><rect x="50" y="45" width="340" height="90" rx="35" fill="#795e83"/><path d="M220 45V135" stroke="#ffe19a" stroke-width="8"/><text x="75" y="95">Right atrium</text><text x="235" y="95">Left atrium</text><text x="100" y="165">Interatrial septum: partition</text></svg>`;
    if (id === "pleura")
      return '<svg class="sim-diagram" viewBox="0 0 440 180" role="img" aria-label="Magnified schematic pleural layers"><path d="M40 40H400" stroke="#ffd294" stroke-width="10"/><path d="M40 90H400" stroke="#9edfed" stroke-width="6"/><rect x="40" y="110" width="360" height="55" fill="#986b91"/><text x="50" y="25">Parietal pleura / chest wall</text><text x="50" y="72">Fluid-containing pleural space</text><text x="50" y="135">Visceral pleura on lung</text></svg>';
    if (["chordae", "papillary"].includes(id))
      return `<svg class="sim-diagram" viewBox="0 0 440 230" role="img" aria-label="Magnified schematic AV leaflet supports restrain prolapse"><path d="M80 45L180 80L220 55L260 80L360 45" fill="none" stroke="#ffc58f" stroke-width="8"/><path d="M180 80L170 165M220 55L170 165M220 55L280 165M260 80L280 165" stroke="#fff" stroke-width="3"/><path d="M150 190L170 150L190 190M260 190L280 150L300 190" fill="#c98487"/><text x="100" y="25">AV leaflets</text><text x="10" y="125">Chordae</text><text x="100" y="220">Papillary muscles: restraint</text></svg>`;
    return `<p>Use the labeled ${state.system === "heart" ? "wall and pericardial layer panel" : "airway or magnified exchange view"} below. This concept is not assigned to an unrelated atlas mesh.</p>`;
  }
  function anatomy() {
    return `<div class="sim-grid"><div><div class="sim-controls">${state.system === "respiratory" ? '<button data-load-breathing>Use moving 3D anatomy</button>' : ""}<button data-load-anatomy>Load ${state.system === "heart" ? "heart" : "optional lung"} reference anatomy</button><button data-unload-anatomy>Use 2D / text</button><button data-retry>Retry anatomy</button></div><p data-load-status role="status">Complete schematic lessons are available now. ${state.system === "respiratory" ? "Optional lung: 11.24 MB source, 378,963 triangles; device qualification pending." : ""}</p><div data-organ-host hidden></div><div data-fallback>${state.system === "heart" ? heartDiagram() : respiratoryDiagram() + '<div data-explorer-fallback></div><p data-explorer-breath-state role="status"></p>'}</div>${state.system === "respiratory" ? breathingControls() : ""}</div><div><label>Search structures <input type="search" data-search aria-label="Search simulator structures"></label><div class="sim-structure-list">${structures()
      .map(
        (s) =>
          `<button data-structure="${s.id}" aria-pressed="${s.id === state.selected}">${esc(s.displayName)}</button>`,
      )
      .join("")}</div>${structureCard()}</div></div>`;
  }
  function heartDiagram() {
    const phase = C.heartAt(state.time);
    return `<svg class="sim-diagram" viewBox="0 0 520 360" role="img" aria-label="Schematic four chamber heart. Patient right on screen left. Both ventricles are coordinated pumps."><text x="20" y="26">Patient RIGHT</text><text x="340" y="26">Patient LEFT</text><path d="M100 110Q100 60 190 70L250 140V280Q160 330 100 250Z" fill="#285b83"/><path d="M270 140L330 70Q420 60 420 110V250Q360 330 270 280Z" fill="#9b505d"/><path d="M110 175H240M280 175H410" stroke="#ffe19a" stroke-width="5"/><text x="140" y="130">Right atrium</text><text x="295" y="130">Left atrium</text><text x="125" y="230">Right ventricle</text><text x="285" y="230">Left ventricle</text><text x="80" y="345">Schematic motion and connections; not to scale</text><text x="105" y="165">Tricuspid</text><text x="300" y="165">Mitral</text></svg><p data-heart-fallback>${esc(phase.text)}</p>`;
  }
  function heartTiming() {
    return `<section class="sim-card"><h3>One clock, distinct electrical and mechanical events</h3><span class="sim-badge">Schematic timing preset · HR 75/min</span>${playback(800)}<div data-heart-clock></div><div class="sim-controls">${C.heartPhases.map((p, i) => `<button data-heart-phase="${i}">${p.name}</button>`).join("")}</div><div class="sim-controls">${["p", "pr", "qrs", "st", "t", "u", "tp"].map((id, i) => `<button data-electrical="${[0, 120, 205, 330, 450, 530, 650][i]}">${id.toUpperCase()}</button>`).join("")}</div><p>Electrical activation precedes shortening. Both all-valves-closed intervals can be inspected. The schematic sequence is source checked; exact milliseconds await educator review. U has no unique mechanical event. Conduction: SA → atria → AV delay → His → bundle branches → Purkinje.</p>${sourceLink("cycle")}</section>`;
  }
  function playback(max) {
    return `<div class="sim-controls"><button data-play aria-pressed="false">Play</button><button data-phase-step="-1">Previous phase</button><button data-phase-step="1">Next phase</button><button data-restart>Restart</button><label>Playback <select data-speed>${[0.25, 0.5, 1].map(speed => `<option value="${speed}"${speed === state.speed ? " selected" : ""}>${speed}×</option>`).join("")}</select></label></div><label>Teaching clock <input data-clock type="range" min="0" max="${max}" step="${max === 800 ? 1 : 0.01}" value="${state.time}" aria-label="Teaching clock"></label>`;
  }
  function routePanel() {
    return `<section class="sim-card"><h3>Trace the circulation</h3><p>Schematic journey across multiple beats. Color is a diagram convention. Both ventricles work during the same beat.</p><div data-route-body></div><div class="sim-controls"><button data-route-prev>Previous connection</button><button data-route-next>Next connection</button><button data-route-reverse aria-pressed="${state.reverse}">Reverse questioning</button><button data-coronary>Coronary return branch</button></div><label>Predict the next structure <select data-route-predict><option value="">Choose before revealing</option>${D.route
      .slice(0, -1)
      .map((n, i) => `<option value="${i}">${esc(n)}</option>`)
      .join(
        "",
      )}</select></label><button data-route-reveal>Check / reveal next stop</button><p data-route-feedback role="status"></p><p>${sourceLink("heart")}</p></section>`;
  }
  function heartLab() {
    const layers = structures().filter((s) =>
      [
        "fibrous",
        "parietal",
        "cavity",
        "epicardium",
        "myocardium",
        "endocardium",
      ].includes(s.id),
    );
    return `<section class="sim-card"><h3>Wall and pericardial cross-section</h3><span class="sim-badge">Magnified schematic · outside → inside</span>${layers.map((s) => `<label><input type="checkbox" data-layer="${s.id}" checked>Reveal ${s.displayName}</label><div class="sim-layer" data-layer-panel="${s.id}"><strong>${s.displayName}</strong> — ${s.text}</div>`).join("")}</section><section class="sim-card"><h3>AV support apparatus</h3><span class="sim-badge">Magnified schematic · no source rig</span>${inset("chordae")}<p>Chordae and papillary muscles resist prolapse; pressure gradients open the leaflets. These supports belong to AV valves, not semilunar valves.</p></section><section class="sim-card"><h3>Valve comparison</h3><label>Qualitative example <select data-valve-example><option>Normal</option><option>Stenosis</option><option>Regurgitation</option><option>Atresia</option></select></label><div data-valve-diagram></div><p>Tricuspid: three leaflets. Mitral/bicuspid: two leaflets. Aortic and pulmonary: three cusps each. These authored diagrams are not validated disease simulations.</p>${sourceLink("heart")}</section><section class="sim-card"><h3>Cardiac output lab</h3><p>No-regurgitation worked example: 120 − 50 = 70 mL/beat; 70 × 75 / 1000 = 5.25 L/min; 100 × 70 / 120 ≈ 58.3%.</p><form data-cardiac-form><div class="sim-controls"><label>EDV (mL) <input name="edv" type="number" value="120" step="any" required></label><label>ESV (mL) <input name="esv" type="number" value="50" step="any" required></label><label>HR (beats/min) <input name="hr" type="number" value="75" step="any" required></label><button>Calculate</button></div></form><p data-cardiac-result role="status"></p><p>Preload: filling/stretch before contraction. Afterload: opposing ejection load. Contractility: force at a given loading condition. Course reference ranges: SV 60–100 mL/beat, CO 4–8 L/min, EF 55–70% (supplied slide indicators 128, 130, 131; images not redistributed). These are study ranges, not diagnostic thresholds; preserved EF alone does not exclude heart failure.</p>${sourceLink("output")}</section>`;
  }
  function respiratoryDiagram() {
    return `<div class="sim-controls"><button data-resp-view="whole">Whole organ</button><button data-resp-view="airway">Airway map</button><button data-resp-view="exchange">Magnified exchange</button></div><div data-resp-diagram></div>`;
  }
  function capnography() {
    return `<section class="sim-card"><h3>Breathing and linked capnography</h3><span class="sim-badge">Synthetic waveform · rate follows breathing clock · EtCO₂ preset 40 mmHg, not model-derived</span><svg class="sim-diagram" viewBox="0 0 600 250" role="img" aria-label="Synthetic capnogram: inspiration, phase 1 dead space, phase 2 rise, phase 3 plateau, end-tidal point"><path d="M55 25V175H575" stroke="#9cafc9" fill="none"/><text x="5" y="25">CO₂ (mmHg)</text><text x="20" y="78">40</text><text x="25" y="175">0</text><text x="220" y="240">Time (seconds)</text>${[0, 1, 2, 3, 4, 5].map((n) => `<text data-cap-tick="${n}" x="${52 + n * 100}" y="195">${(n*mechanics.period/5).toFixed(1)}</text>`).join("")}<path d="M55 75L75 175H305L355 85L555 75" fill="none" stroke="#8fe5ef" stroke-width="4"/><circle data-cap-marker r="7" fill="#ffe19a"/><text x="95" y="120">Inspiration</text><text x="260" y="150">1</text><text x="320" y="120">2</text><text x="430" y="65">3</text><text x="480" y="35">EtCO₂</text>${[
      [0, 55, 250],
      [1, 255, 50],
      [2, 305, 50],
      [3, 355, 190],
      [4, 545, 25],
    ]
      .map(
        ([i, x, w]) =>
          `<rect data-cap-phase="${i}" x="${x}" y="45" width="${w}" height="130" fill="transparent"/>`,
      )
      .join(
        "",
      )}</svg><div class="sim-controls">${C.respiratoryPhases.map((p, i) => `<button data-resp-phase="${i}">${p.name}</button>`).join("")}</div><div data-resp-clock class="sim-status" role="status"></div><p>Sampling site: proximal airway / mouth. The source highlighted below and waveform marker share this breath clock. The inspiratory downstroke clears the final expired sample; early expired dead-space gas and inspired gas can both be low in CO₂.</p>${sourceLink("capno")}<div class="sim-controls"><label><input data-cue="air" type="checkbox" checked>Air movement cue</label><label><input data-cue="blood" type="checkbox" checked>Perfusion cue</label><label><input data-cue="diffusion" type="checkbox" checked>Diffusion cues</label></div><p>These independent display toggles hide instructional cues. They do not imply a physiological stop. Diffusion can continue during both inspiration and expiration.</p><label>Mechanics scenario <select data-ventilation><option value="spontaneous" ${state.ventilation === "spontaneous" ? "selected" : ""}>Quiet spontaneous breathing</option><option value="positive" ${state.ventilation === "positive" ? "selected" : ""}>Positive-pressure inspiration comparison</option></select></label></section>`;
  }
  function breathingControls() {
    const p=state.breathing;
    return `<section class="sim-card"><h3>Breathing mechanics</h3>${playback(mechanics.period)}<p>One physiological clock drives the moving anatomy, flow and curves. Volume is change above an idealized relaxed reference, not total lung volume. Quiet expiration does not empty the lungs.</p><div class="sim-controls"><label>Rate (breaths/min)<input data-mechanics="rate" type="number" min="6" max="30" step="1" value="${p.rate}"></label><label>Depth target (L)<input data-mechanics="target" type="number" min="0.2" max="1" step="0.1" value="${p.target}"></label></div><details><summary>Mechanics laboratory: resistance, compliance and drive</summary><p>Linear single-compartment model. R × C is the time constant in seconds. These parameters are teaching experiments, not diagnoses or ventilator prescriptions.</p><label>Experiment <select data-mechanics="mode"><option value="target" ${p.mode==='target'?'selected':''}>Target tidal excursion: calculate required drive</option><option value="effort" ${p.mode==='effort'?'selected':''}>Fixed effort: depth sets drive, R/C change delivery</option></select></label><label>Resistance (cmH₂O·s/L)<input data-mechanics="resistance" type="number" min="1" max="20" step="1" value="${p.resistance}"></label><label>Lung compliance (L/cmH₂O)<input data-mechanics="compliance" type="number" min="0.04" max="0.2" step="0.01" value="${p.compliance}"></label><p>Drive is an idealized constant inspiratory effort, released at expiration. Its step changes are not measured muscle kinetics; volume remains continuous and flow follows the pressure gradient. Periodic steady state is recomputed after changes, including backward scrubbing.</p></details><div data-mechanics-values role="status"></div><div data-mechanics-curves>${mechanicsCurves()}</div><p>All pressures use ambient = 0 cmH₂O. Airway opening Pao; alveolar Palv; pleural Ppl. Transpulmonary = Palv − Ppl. Trans-respiratory = Pao − body-surface pressure (body surface = 0). Baseline Ppl −5 cmH₂O is illustrative. Target mode adjusts drive; fixed effort never recalibrates it when R or C changes.</p><p><a href="https://www.imagwiki.nibib.nih.gov/physiome/jsim/models/webmodel/NSR/tidalhuman" target="_blank" rel="noopener">NSR Tidal_Human equation reference</a> · ${sourceLink('breathing')}</p></section>`;
  }
  function mechanicsCurves() {
    const samples=Array.from({length:121},(_,i)=>mechanics.at(i*mechanics.period/120));
    const rows=[['Volume above reference (L)','volume',0,Math.max(.6,mechanics.maximum*1.1)],['Flow (L/s), + inward','flow',-3,3],['Pressure (cmH₂O): alveolar','alveolar',-12,12],['Pressure (cmH₂O): pleural','pleural',-30,0]];
    return rows.map(([name,key,min,max],row)=>{min=Math.min(0,...samples.map(s=>s[key]));max=Math.max(0,...samples.map(s=>s[key]));const pad=Math.max(.02,(max-min)*.08);min-=pad;max+=pad;return `<svg class="sim-mechanics-curve" viewBox="0 0 600 110" role="img" aria-label="${name}, synchronized over one breath"><text x="8" y="20">${name}</text><text x="8" y="45">${max.toFixed(1)}</text><text x="8" y="95">${min.toFixed(1)}</text><path d="M60 30V95H585" stroke="#8099b1" fill="none"/><path d="${samples.map((s,i)=>`${i?'L':'M'}${60+i*4.3} ${95-(Math.min(max,Math.max(min,s[key]))-min)/(max-min)*60}`).join(' ')}" stroke="${['#88dfe4','#ffe1a4','#db9dcc','#b8c9ff'][row]}" stroke-width="2.5" fill="none"/><path data-mechanics-marker d="M60 30V95" stroke="#fff" stroke-width="2"/></svg>`;}).join('')+'<p>Horizontal axis: one breath, 0 to '+mechanics.period.toFixed(2)+' physiological seconds. Curve limits are graphical only; exact values are above.</p>';
  }
  function updateMechanics(s) {
    const el=root.querySelector('[data-mechanics-values]');if(!el)return;
    el.textContent=`${s.phase} · ${state.time.toFixed(2)} / ${s.period.toFixed(2)} s · volume above reference ${s.volume.toFixed(3)} L · delivered excursion ${s.delivered.toFixed(3)} L · flow ${s.flow.toFixed(3)} L/s · Pao ${s.airway.toFixed(2)}, Palv ${s.alveolar.toFixed(2)}, Ppl ${s.pleural.toFixed(2)}, transpulmonary ${s.transpulmonary.toFixed(2)}, trans-respiratory ${s.transrespiratory.toFixed(2)} cmH₂O · required/held drive amplitude ${s.amplitude.toFixed(2)} cmH₂O · R×C ${(state.breathing.resistance*state.breathing.compliance).toFixed(2)} s.`;
    root.querySelectorAll('[data-mechanics-marker]').forEach(m=>m.setAttribute('d',`M${60+516*state.time/s.period} 30V95`));
  }
  function ventilationLab() {
    return `<section class="sim-card"><h3>Idealized ventilation arithmetic</h3><form data-ventilation-form><div class="sim-controls"><label>RR (/min) <input name="rr" type="number" value="12" step="any" required></label><label>VT (mL) <input name="vt" type="number" value="500" step="any" required></label><label>Assumed VD (mL) <input name="vd" type="number" value="150" step="any" required></label><button>Calculate ventilation</button></div></form><p data-ventilation-result role="status">12 × 500 / 1000 = 6.0 L/min total; 12 × (500 − 150) / 1000 = 4.2 L/min estimated alveolar ventilation.</p><p>VD is assumed, not universal. These values do not predict PaCO₂ or SpO₂.</p>${sourceLink("breathing")}</section>`;
  }
  function guided() {
    const lessons = D.lessons[state.system],
      index = Math.min(state.lesson, lessons.length - 1),
      l = lessons[index];
    return `<section class="sim-card"><p>Lesson ${index + 1} of ${lessons.length} · resume saved locally</p><h3>${esc(l[0])}</h3><p>${esc(l[1])}</p><p>${sourceLink(l[2])}</p><div class="sim-controls"><button data-lesson="-1">Previous lesson</button><button data-lesson="1">Next lesson</button></div><details><summary>Inspect more without losing this step</summary><p>Use Explore below for the matching structures and phase controls. Returning here preserves this lesson. Practice uses original questions, hints and unlimited retries.</p></details></section>`;
  }
  function practice() {
    if (!state.order.length)
      return `<section class="sim-card"><h3>Untimed independent practice</h3><p>${state.system === "heart" ? 30 : 20} original source-linked questions. Unlimited penalty-free retries. Hinted and revealed answers count as guided practice; a later independent correct attempt demonstrates the item.</p><div class="sim-controls"><button data-session="5">Start five questions</button><button data-session="10">Start ten questions</button></div></section>`;
    const q = D.questions.find((q) => q.id === state.order[state.question]);
    if (!q)
      return `<section class="sim-card"><h3>Session complete</h3><p>Your evidence has been retained. There is no penalty for revisiting an item.</p><button data-new-session>Another practice session</button></section>`;
    if (state.answerQuestionId !== q.id || state.answerOrder.length !== q.options.length) {
      state.answerOrder = shuffle(q.options.map((_, i) => i));
      state.answerQuestionId = q.id;
    }
    return `<section class="sim-card"><p>Question ${state.question + 1} of ${state.order.length} · ${P.status(progress.attempts, q.id)}</p><h3>${esc(q.prompt)}</h3><div class="sim-controls">${state.answerOrder
      .map((i) => `<button data-answer="${i}">${esc(q.options[i])}</button>`)
      .join("")}</div><button data-hint>Hint / explanation</button>${state.hint ? `<p>${esc(q.explain)}</p>` : ""}${state.picked !== null ? `<div class="sim-feedback" role="status"><strong>${state.picked === q.answer ? "Correct" : "Not yet"}.</strong> You chose: ${esc(q.options[state.picked])}.<p>${esc(q.explain)}</p><p>${q.sourceRefs.map(sourceLink).join(" · ")}</p><button data-retry-question>Guided retry</button><button data-transfer-question>Try a related transfer question</button><button data-next-question>Next independent question</button></div>` : ""}</section>`;
  }
  function resetAnswerOrder() {
    state.answerOrder = [];
    state.answerQuestionId = "";
  }
  function shuffle(a) {
    return a
      .map((x) => ({ x, n: Math.random() }))
      .sort((a, b) => a.n - b.n)
      .map((o) => o.x);
  }
  function sources() {
    return `<section class="sim-card"><h3>Sources, representation and progress</h3><p>Source-checked educational prototype; educator and clinical review pending. Original teaching copy, diagrams and questions; no copied commercial meshes, textbook figures or course slide images.</p>${Object.entries(
      D.sources,
    )
      .map(
        ([id, s]) =>
          `<p>${sourceLink(id)} — ${esc(s.supports)}. ${esc(s.reviewState)}.</p>`,
      )
      .join(
        "",
      )}<p><a href="${new URL("ecg-study/assets/ATTRIBUTION.md", base)}">Heart attribution</a> · <a href="${new URL("respiratory-study/assets/ATTRIBUTION.md", base)}">Respiratory asset qualification</a> · <a href="${new URL("respiratory-study/assets/model-manifest.json", base)}">Full respiratory mesh inventory and transforms</a> · <a href="${new URL("docs/RESPIRATORY-EXPLORER.md", base)}">Connected airway hierarchy, scale and reconstruction limits</a></p><label>Simulator progress JSON <textarea data-progress-text aria-label="Simulator progress JSON"></textarea></label><div class="sim-controls"><button data-export>Export simulator progress</button><button data-import>Validate and import simulator progress</button><button data-raw>Recover stored text</button><button data-reset>Reset only simulator progress</button></div><p data-progress-result role="status"></p><p>Only cmt.simulators.progress.v1 is read or changed. Other quizzes and saved history are untouched. Import validates fully before replacing this namespace.</p></section>`;
  }
  function render(ctx) {
    stop();
    release();
    const learn = state.tab === "explore" || state.tab === "guided";
    fallbackExplorer?.dispose(); fallbackExplorer = null;
    root.innerHTML = `<header class="sim-head"><h2 tabindex="-1">${state.system === "heart" ? "Heart Simulator v2" : "Respiratory Simulator v2"}</h2><div class="sim-controls"><button data-text-size aria-pressed="${state.textScale === 2}">${state.textScale === 2 ? "Standard text" : "200% text"}</button>${state.system === "respiratory" && window.HeartV3Study ? '<button data-heart-v3-return>Resume Heart v3</button>' : ""}<button data-home>← All study modes</button></div></header><p class="sim-muted">Source-checked educational prototype · untimed study · ${state.system === "heart" ? "reference heart and supplementary schematics" : "integrated breathing anatomy, mechanics and magnified exchange; optional static reference"}</p><nav class="sim-tabs" aria-label="Simulator sections">${["explore", "guided", "practice", "sources"].map((t) => `<button data-tab="${t}" aria-pressed="${state.tab === t}">${{ explore: "Explore", guided: "Guided lesson", practice: "Practice", sources: "Sources and progress" }[t]}</button>`).join("")}</nav><p data-storage-status role="status">${esc(saveError)}</p>${state.tab === "sources" ? sources() : state.tab === "practice" ? practice() : `${state.tab === "guided" ? guided() : ""}${anatomy()}${state.system === "heart" ? heartTiming() + routePanel() + heartLab() : capnography() + ventilationLab()}`}`;
    root.dataset.system = state.system;
    root.dataset.textScale = String(state.textScale);
    root.style.setProperty("--sim-text-scale", state.textScale);
    root.style.setProperty("--anatomy-font", 15 * state.textScale + "px");
    bind();
    if (learn) {
      updateClock();
      updateRoute();
      updateValve("Normal");
      diagramEquivalents();
      if (atlasWanted) sceneReady=mountAnatomy();
      else if (state.system === "respiratory") sceneReady=mountBreathing(ctx);
    }
  }
  async function mountBreathing(ctx) {
    ctx=typeof ctx?.isCurrent==='function'?ctx:null;const current=()=>!ctx||ctx.isCurrent();if(!current())return;
    const host=root.querySelector('[data-organ-host]');if(!host)return;
    release();delete host.dataset.dynamic;delete host.dataset.ready;const gen=generation;let committed=null;host.hidden=false;
    const failure=message=>{if(committed?view!==committed:gen!==generation||!current())return;let cleanup;try{release();}catch(e){cleanup=e.message||String(e);}host.hidden=true;root.querySelector('[data-fallback]').hidden=false;root.querySelector('[data-load-status]').textContent=message+(cleanup?' Resource cleanup: '+cleanup:'');};
    try {
      if (!document.querySelector('[data-explorer-css]')) {
        const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('respiratory-study/explorer.css',base);css.dataset.explorerCss='';document.head.append(css);
      }
      if (!window.RespiratoryExplorer) await script('respiratory-study/explorer.js');
      if (gen!==generation||!current()) return;
      const fallback=root.querySelector('[data-explorer-fallback]');
      if (fallback && !fallbackExplorer) { fallbackExplorer=RespiratoryExplorer.mountFallback(fallback,{onChange:route=>{if(!view)sceneSnapshots.set('respiratory',{...sceneSnapshots.get('respiratory'),journey:{id:route.id,segment:route.segment}});}});const saved=sceneSnapshots.get('respiratory')?.journey;if(saved){fallbackExplorer.go(saved.segment);fallbackExplorer.go(saved.id);}updateClock(); }
      if(!window.EcgThree)await script('ecg-study/vendor/three-gltf.min.js');
      if(!window.RespiratoryTeachingData)await script('respiratory-study/assets/breathing-data.js');
      if(!window.RespiratoryBreathing3D)await script('respiratory-study/breathing-3d.js');
      if(gen!==generation||!current())return;
      const instance=await RespiratoryBreathing3D.mount(host,failure,id=>selectStructure(id,true),{
        toggle:()=>root.querySelector("[data-play]").click(),
        scrub:value=>{const e=root.querySelector("[data-clock]");e.value=value;e.dispatchEvent(new Event("input",{bubbles:true}));},
        parameter:(key,value)=>{const e=root.querySelector(`[data-mechanics="${key}"]`);e.value=value;e.dispatchEvent(new Event("change",{bubbles:true}));},
        playing:()=>state.playing,
        current:()=>gen===generation&&current()
      });
      if(gen!==generation||!current()){instance.dispose();return;}view=instance;committed=instance;view.selectStructure?.(state.selected);view.sync(mechanics.at(state.time));const savedScene=sceneSnapshots.get('respiratory');if(savedScene)await view.restoreSnapshot?.(savedScene,ctx);else{const textRoute=fallbackExplorer?.state();if(textRoute?.index>0){view.goExplorer?.(textRoute.segment);view.goExplorer?.(textRoute.id);}}if(gen!==generation||!current()){instance.dispose();return;}root.querySelector('[data-fallback]').hidden=false;root.querySelector('[data-explorer-fallback]').hidden=true;root.querySelector('[data-explorer-breath-state]').hidden=true;
      root.querySelector('[data-load-status]').textContent='Moving lung derivative loaded. The static atlas remains an optional reference; 2D/text remains available.';
    }catch(e){failure('Moving anatomy unavailable. Complete 2D/text fallback is active. '+e.message);}
  }
  async function mountAnatomy() {
    const host = root.querySelector("[data-organ-host]");
    if (!host) return;
    release();
    delete host.dataset.dynamic;delete host.dataset.ready;
    const gen = generation,
      system = state.system;
    const status = root.querySelector("[data-load-status]");
    status.textContent = "Loading local reference anatomy…";
    host.hidden = false;
    const failure = (message) => {
      if (gen !== generation) return;
      release();
      host.hidden = true;
      root.querySelector("[data-fallback]").hidden = false;
      status.textContent = message + " Use Retry anatomy to retry.";
    };
    try {
      if (!window.EcgThree) await script("ecg-study/vendor/three-gltf.min.js");
      if (system === "heart") {
        if (!window.EcgHeartModelData)
          await script("ecg-study/assets/model-data.js");
        if (!window.EcgHeart3D) await script("ecg-study/heart-3d.js");
      } else {
        if (!window.RespiratoryModelData)
          await script("respiratory-study/assets/model-data.js");
        if (!window.RespiratoryAtlas)
          await script("respiratory-study/respiratory-3d.js");
      }
      if (gen !== generation) return;
      const instance =
        system === "heart"
          ? await EcgHeart3D.mount(
              host,
              { ...heartState(), onSelect: (id) => selectStructure(id) },
              failure,
            )
          : await RespiratoryAtlas.mount(host, failure, (id) =>
              selectStructure(id),
            );
      if (gen !== generation) {
        instance.dispose();
        return;
      }
      view = instance;
      view.selectStructure?.(state.selected);
      root.querySelector("[data-fallback]").hidden = system === "heart";
      status.textContent =
        "Local reference anatomy loaded. Schematics remain explicitly separate.";
      atlasWanted = true;
      updateClock();
      if (system === "heart") updateRoute();
    } catch (e) {
      failure(
        "Reference anatomy unavailable. The complete 2D/text lesson remains active.",
      );
    }
  }
  function heartState() {
    const p = C.heartAt(state.time);
    return { stage: p.stage, playing: state.playing, mechanical: p };
  }
  function selectStructure(id, fromView = false) {
    const s = structures().find((s) => s.id === id);
    if (!s) return;
    const changed = state.selected !== id;
    state.selected = id;
    if (!fromView && (changed || state.system === "respiratory")) view?.selectStructure?.(id);
    root.querySelector("[data-structure-detail]").outerHTML = structureCard();
    root
      .querySelectorAll("[data-structure]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.structure === id)),
      );
    diagramEquivalents();
    const select = root.querySelector("[data-select-structure]");
    if (select) {
      const target = [...select.options].some((o) => o.value === id) ? id : "";
      if (select.value !== target) {
        select.value = target;
        select.dispatchEvent(new Event("change"));
      }
    }
  }
  function updateRoute() {
    const el = root.querySelector("[data-route-body]");
    if (!el) return;
    const routeTargets = [
      [],
      ["svc", "ivc"],
      ["ra"],
      ["tv"],
      ["rv"],
      ["pv"],
      ["pa"],
      [],
      ["vein"],
      ["la"],
      ["mv"],
      ["lv"],
      ["av"],
      ["aorta"],
      [],
    ];
    const targets = routeTargets[state.route];
    if (targets.length) selectStructure(targets[0]);
    view?.selectStructures?.(targets);
    const i = state.route,
      oxygen = i >= 8 && i < 14;
    el.innerHTML = `<p class="sim-route">${i + 1} / ${D.route.length}: ${esc(D.route[i])}</p><p>${i === 7 ? "Lung exchange: blood gains O₂ and releases CO₂." : i === 0 || i === 14 ? "Systemic tissue exchange: oxygen is delivered to tissues." : oxygen ? "Relatively oxygenated blood; diagram convention." : "Relatively deoxygenated blood; diagram convention."}</p>`;
  }
  function updateValve(example) {
    const el = root.querySelector("[data-valve-diagram]");
    if (!el) return;
    const data = {
      Normal: [
        "Forward flow → through an open valve; reverse flow resisted by closure.",
        "→",
      ],
      Stenosis: ["Restricted forward opening; qualitative obstruction.", "⇢"],
      Regurgitation: [
        "Backward leakage during incomplete closure; total SV is not effective forward output.",
        "←",
      ],
      Atresia: [
        "Static closed pathway. Normal flow is not animated through it; additional anatomy is needed to explain viable circulation.",
        "×",
      ],
    }[example];
    el.innerHTML = `<svg class="sim-diagram" viewBox="0 0 480 120" role="img" aria-label="${esc(example)} qualitative valve schematic"><path d="M50 40H430M50 90H430" stroke="#8ba8c2" stroke-width="4"/><path d="M220 40L${example === "Atresia" ? 220 : example === "Stenosis" ? 230 : 250} 65L220 90" fill="none" stroke="#ffd294" stroke-width="7"/><text x="110" y="80" style="font-size:36px">${data[1]}</text></svg><p>${data[0]}</p>`;
    diagramEquivalents();
  }
  function diagramEquivalents() {
    root
      .querySelectorAll("[data-diagram-equivalent]")
      .forEach((e) => e.remove());
    if (state.textScale !== 2) return;
    root.querySelectorAll("svg[aria-label]").forEach((svg) => {
      const p = document.createElement("p");
      p.dataset.diagramEquivalent = "";
      p.textContent =
        svg.getAttribute("aria-label") +
        ". " +
        [...svg.querySelectorAll("text")].map((t) => t.textContent).join(" · ");
      svg.after(p);
    });
  }
  function updateClock() {
    if (!root.querySelector("[data-clock]")) return;
    root.querySelector("[data-clock]").value = state.time;
    if (state.system === "heart") {
      const p = C.heartAt(state.time);
      root.querySelector("[data-heart-clock]").innerHTML =
        `<h4>${p.name}</h4><p>Clock ${Math.round(p.ms)} ms · electrical marker ${p.stage.toUpperCase()} · ventricular volume ${p.volume}</p><svg class="sim-diagram" viewBox="0 0 600 110" role="img" aria-label="Synthetic ECG and synchronized clock marker"><path d="M20 70H35Q45 42 55 70H150L160 80L170 15L180 90L190 70H290Q325 20 360 70H580" fill="none" stroke="#8fe5ef" stroke-width="3"/><path d="M${20 + (p.ms / 800) * 560} 10V95" stroke="#ffe19a" stroke-width="3"/><text x="32" y="105">P</text><text x="153" y="105">QRS</text><text x="315" y="105">T</text></svg><p>${p.text}</p><svg class="sim-diagram" viewBox="0 0 400 95" role="img" aria-label="Schematic ventricular fullness, 120 mL EDV and 50 mL ESV illustrative preset"><rect x="20" y="20" width="360" height="30" fill="#263f59"/><rect x="20" y="20" width="${(360 * p.schematicVolume) / 120}" height="30" fill="#99ddeb"/><text x="20" y="80">Preset fullness: ${p.schematicVolume.toFixed(0)} mL</text></svg><p>Separate schematic cue, not measured mesh volume; fixed EDV 120 / ESV 50 mL preset. The calculator is an independent exercise.</p><table><tr><th>Valve pair</th><th>State</th></tr><tr><td>Tricuspid and mitral (AV)</td><td>${p.av}</td></tr><tr><td>Pulmonary and aortic (semilunar)</td><td>${p.sl}</td></tr></table>`;
      view?.sync?.(heartState());
      root
        .querySelectorAll("[data-heart-phase]")
        .forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String(+b.dataset.heartPhase === p.index),
          ),
        );
    } else {
      const p = respAt();
      const breathing=mechanics.at(state.time);
      const fallbackStatus=root.querySelector('[data-explorer-breath-state]');
      if(fallbackStatus) fallbackStatus.textContent=`Shared breathing state: ${breathing.inspiration?'inspiration':'expiration'}, ${state.time.toFixed(2)} s; volume above reference ${breathing.volume.toFixed(3)} L; bulk airflow ${Math.abs(breathing.flow)<1e-6?'zero at boundary':breathing.flow>0?'inward':'outward'} (${breathing.flow.toFixed(3)} L/s). At the alveolar barrier, O₂ diffuses air → blood and CO₂ blood → air; diffusion is separate from bulk airflow and can continue in either phase.`;
      view?.sync?.(breathing);
      updateMechanics(breathing);
      root.querySelector("[data-resp-clock]").innerHTML =
        `<h4>${p.name}</h4><p>Sample source: <strong>${p.source}</strong> · CO₂ ${p.co2.toFixed(1)} mmHg · ${state.time.toFixed(2)} physiological seconds. Timeline synchronization only; CO₂ is not inferred from mechanics.</p><p>${state.ventilation === "positive" ? "This separate qualitative view shows the applied-pressure principle. The capnogram remains the same independent synthetic example." : p.text}</p><p>${state.ventilation === "positive" ? "Separate positive-pressure scenario: applied airway pressure above ambient drives inspiration; expiration follows release of inspiratory pressure and recoil. Schematic only." : `Quiet spontaneous breathing: diaphragm ${p.diaphragm}; alveolar pressure ${p.pressure}; airflow ${p.airflow.toLowerCase()}.`}</p>`;
      const marker = root.querySelector("[data-cap-marker]");
      marker.setAttribute("cx", 55 + p.seconds * 100);
      marker.setAttribute("cy", 175 - p.co2 * 2.5);
      root
        .querySelectorAll("[data-resp-phase]")
        .forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String(+b.dataset.respPhase === p.index),
          ),
        );
      updateRespDiagram(p);
    }
    diagramEquivalents();
  }
  function updateRespDiagram(p) {
    const el = root.querySelector("[data-resp-diagram]");
    if (!el) return;
    const cue = (id) =>
      root.querySelector(`[data-cue="${id}"]`)?.checked !== false;
    if (state.view === "exchange") {
      el.innerHTML = `<span class="sim-badge">Magnified alveolar-capillary schematic · not to scale</span><svg class="sim-diagram" viewBox="0 0 540 330" role="img" aria-label="Oxygen from alveolus to pulmonary blood; carbon dioxide from blood to alveolus"><ellipse cx="270" cy="100" rx="150" ry="75" fill="#507e9a"/><path d="M85 255Q270 140 455 255" stroke="#a8566a" stroke-width="35" fill="none"/><text x="220" y="100">Alveolar gas</text><text x="160" y="300">Pulmonary capillary blood</text>${cue("diffusion") ? '<text x="125" y="175">O₂ ↓ toward blood</text><text x="295" y="175">CO₂ ↑ toward gas</text>' : ""}${cue("blood") ? '<text x="140" y="253">Blood perfusion → → →</text>' : ""}${cue("air") ? `<text x="190" y="30">Airflow: ${p.airflow}</text>` : ""}</svg><p>Exchange is diffusion across an instructional barrier, distinct from bulk air movement and red-cell movement. It is not turned on only during expiration.</p>`;
      return;
    }
    if (state.view === "airway") {
      el.innerHTML = `<span class="sim-badge">Branching pathway schematic · not to scale</span><svg class="sim-diagram" viewBox="0 0 540 450" role="img" aria-label="Airway route from nasal cavity to alveoli"><path d="M270 45V200L140 290M270 200L400 290M140 290L90 365M140 290L190 365M400 290L350 365M400 290L450 365" stroke="#a9ddf3" stroke-width="8" fill="none"/><text x="290" y="40">Nasal cavity / mouth</text><text x="290" y="90">Pharynx</text><text x="290" y="130">Larynx</text><text x="290" y="175">Trachea</text><text x="170" y="230">Carina</text><text x="20" y="280">Right main bronchus</text><text x="290" y="280">Left main bronchus</text><text x="70" y="400">Lobar → segmental → bronchioles</text><text x="170" y="435">→ alveolar exchange</text></svg><p>The branching drawing is instructional. It does not assign invented segment names to decorative branches.</p>`;
      return;
    }
    const scale = 0.88 + 0.12 * p.inflation,
      dy = 25 * p.inflation;
    el.innerHTML = `<span class="sim-badge">Whole-organ mechanics schematic · not a measured rig</span><svg class="sim-diagram" viewBox="0 0 540 390" role="img" aria-label="Schematic diaphragm descent and lung expansion with inspiration"><text x="20" y="25">Patient RIGHT</text><text x="360" y="25">Patient LEFT</text><rect x="260" y="50" width="20" height="95" rx="8" fill="${p.index === 1 ? "#ffe19a" : "#b9dce7"}"/><circle cx="270" cy="46" r="6" fill="#ffe19a"/><text x="285" y="45">Sample site</text><g transform="translate(270 210) scale(${scale}) translate(-270 -210)"><path d="M245 120Q80 75 75 280L245 280Z" fill="${p.index >= 3 ? "#b78a6b" : "#8f6087"}"/><path d="M295 120Q460 75 465 280L295 280Z" fill="${p.index >= 3 ? "#b78a6b" : "#8f6087"}"/><path d="M80 195H245M80 240H245M295 210H460" stroke="#e2c1d9" stroke-width="3"/></g><path d="M65 ${330 + dy}Q270 ${260 + dy} 475 ${330 + dy}" fill="none" stroke="#ffd294" stroke-width="8"/><text x="165" y="380">Diaphragm</text>${cue("air") ? `<text x="300" y="78">Air: ${p.airflow === "Inward" ? "in" : p.airflow === "Outward" ? "out" : "zero"}</text>` : ""}<text x="115" y="168">Right: 3 lobes</text><text x="305" y="168">Left: 2 lobes</text></svg><p>${state.ventilation === "positive" ? "Positive-pressure volume cue; passive diaphragm displacement is schematic, with no active contraction implied." : "Diaphragm " + p.diaphragm + "."} Thoracic / lung volume cue: ${p.inflation > 0.5 ? "relatively expanded" : "relatively smaller"}. ${state.ventilation === "positive" ? "Separate positive-pressure comparison uses the same schematic expansion cue; airway pressure is applied above ambient." : "Alveolar pressure " + p.pressure + "."} Sample source: <strong>${p.source}</strong>.</p>`;
  }
  function tick(now) {
    if (!state.playing || document.hidden || root.classList.contains("hidden"))
      return;
    if (last) {
      state.time +=
        (state.system === "heart" ? Math.min(now - last, 100) : now - last) *
        state.speed *
        (state.system === "heart" ? 1 : 0.001);
      const max = state.system === "heart" ? 800 : mechanics.period;
      if (state.time > max) state.time %= max;
    }
    last = now;
    if (now - lastRender >= 1000 / 30) {
      updateClock();
      lastRender = now;
    }
    raf = requestAnimationFrame(tick);
  }
  function step(delta) {
    stop();
    if (state.system === "heart") {
      const p = C.heartAt(state.time);
      state.time = C.phaseTimes[(p.index + delta + 5) % 5];
    } else {
      const p = respAt();
      state.time = C.respiratoryPhases[(p.index + delta + 5) % 5].start * mechanics.period / 5;
    }
    updateClock();
  }
  function bind() {
    const on = (q, ev, fn) => root.querySelector(q)?.addEventListener(ev, fn);
    const all = (q, fn) => root.querySelectorAll(q).forEach(fn);
    on("[data-text-size]", "click", () => {
      state.textScale = state.textScale === 1 ? 2 : 1;
      root.dataset.textScale = String(state.textScale);
      root.style.setProperty("--sim-text-scale", state.textScale);
      root.style.setProperty("--anatomy-font", 15 * state.textScale + "px");
      const host = root.querySelector("[data-organ-host]");
      if (host?.querySelector("[data-large]"))
        host.style.setProperty(
          "--anatomy-font",
          (host.querySelector("[data-large]").checked ? 18 : 15) *
            state.textScale +
            "px",
        );
      const button = root.querySelector("[data-text-size]");
      button.textContent =
        state.textScale === 2 ? "Standard text" : "200% text";
      button.setAttribute("aria-pressed", state.textScale === 2);
      view?.refreshLayout?.();
      diagramEquivalents();
    });
    on("[data-home]", "click", () => window.goHome());
    all(
      "[data-tab]",
      (b) =>
        (b.onclick = () => {
          state.tab = b.dataset.tab;
          atlasWanted = false;
          render();
          root.querySelector(`[data-tab="${state.tab}"]`).focus();
        }),
    );
    on("[data-search]", "input", (e) =>
      all(
        "[data-structure]",
        (b) =>
          (b.hidden = !b.textContent
            .toLowerCase()
            .includes(e.target.value.toLowerCase())),
      ),
    );
    all(
      "[data-structure]",
      (b) => (b.onclick = () => selectStructure(b.dataset.structure)),
    );
    on('[data-load-breathing]','click',()=>{atlasWanted=false;mountBreathing();});
    all('[data-mechanics]',e=>e.onchange=()=>{
      if(e.dataset.mechanics!=='mode'&&e.value===''){e.value=state.breathing[e.dataset.mechanics];return;}
      if(!e.checkValidity()){e.reportValidity();return;}
      stop(); const key=e.dataset.mechanics;state.breathing[key]=key==='mode'?e.value:+e.value;rebuildMechanics();
      const clock=root.querySelector('[data-clock]');if(clock)clock.max=mechanics.period;
      root.querySelector('[data-mechanics-curves]').innerHTML=mechanicsCurves();updateClock();
      root.querySelectorAll('[data-cap-tick]').forEach(n=>n.textContent=(+n.dataset.capTick*mechanics.period/5).toFixed(1));
    });
    on("[data-heart-v3-return]", "click", ()=>window.HeartV3Study?.open());
    on("[data-load-anatomy]", "click", mountAnatomy);
    on("[data-retry]", "click", mountAnatomy);
    on("[data-unload-anatomy]", "click", () => {
      atlasWanted = false;
      release();
      root.querySelector("[data-organ-host]").hidden = true;
      root.querySelector("[data-fallback]").hidden = false;
    });
    on("[data-play]", "click", () => {
      if (state.playing) stop();
      else {
        state.playing = true;
        last = 0;
        root.querySelector("[data-play]").textContent = state.system === "heart" ? "Pause" : "Pause simulation";
        root.querySelector("[data-play]").setAttribute("aria-pressed", "true");
        const scenePlay = root.querySelector("[data-breath-play]");
        if (scenePlay) scenePlay.textContent = "Pause simulation";
        raf = requestAnimationFrame(tick);
      }
    });
    on("[data-speed]", "change", (e) => (state.speed = +e.target.value));
    on("[data-clock]", "input", (e) => {
      stop();
      state.time = +e.target.value;
      updateClock();
    });
    on("[data-restart]", "click", () => {
      stop();
      state.time = 0;
      updateClock();
    });
    all(
      "[data-phase-step]",
      (b) => (b.onclick = () => step(+b.dataset.phaseStep)),
    );
    all(
      "[data-heart-phase]",
      (b) =>
        (b.onclick = () => {
          stop();
          state.time = C.phaseTimes[+b.dataset.heartPhase];
          updateClock();
        }),
    );
    all(
      "[data-electrical]",
      (b) =>
        (b.onclick = () => {
          stop();
          state.time = +b.dataset.electrical;
          updateClock();
        }),
    );
    all(
      "[data-resp-phase],[data-cap-phase]",
      (b) =>
        (b.onclick = () => {
          stop();
          state.time =
            C.respiratoryPhases[
              +(b.dataset.respPhase ?? b.dataset.capPhase)
            ].start * mechanics.period / 5;
          updateClock();
        }),
    );
    all(
      "[data-resp-view]",
      (b) =>
        (b.onclick = () => {
          state.view = b.dataset.respView;
          view?.setMode?.(state.view === "exchange" ? "alveolar" : "whole");
          updateClock();
        }),
    );
    all("[data-cue]", (b) => (b.onchange = updateClock));
    on("[data-ventilation]", "change", (e) => {
      state.ventilation = e.target.value;
      rebuildMechanics();
      root.querySelector("[data-mechanics-curves]").innerHTML=mechanicsCurves();
      updateClock();
    });
    all(
      "[data-lesson]",
      (b) =>
        (b.onclick = () => {
          const n = D.lessons[state.system].length;
          state.lesson = (state.lesson + +b.dataset.lesson + n) % n;
          progress.lessons[state.system] = state.lesson;
          persist();
          render();
        }),
    );
    all(
      "[data-layer]",
      (b) =>
        (b.onchange = () =>
          (root.querySelector(
            `[data-layer-panel="${b.dataset.layer}"]`,
          ).hidden = !b.checked)),
    );
    on("[data-valve-example]", "change", (e) => updateValve(e.target.value));
    on("[data-cardiac-form]", "submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      try {
        const r = C.cardiacOutput(
          ...["edv", "esv", "hr"].map((k) => Number(f.get(k))),
        );
        root.querySelector("[data-cardiac-result]").textContent =
          `SV ${r.sv.toFixed(1)} mL/beat · CO ${r.co.toFixed(2)} L/min · EF ${r.ef.toFixed(1)}%. ${r.normalAnimation ? "No-regurgitation example only." : "Zero output: outside normal animation preset."}`;
      } catch (e) {
        root.querySelector("[data-cardiac-result]").textContent = e.message;
      }
    });
    on("[data-ventilation-form]", "submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      try {
        const r = C.ventilation(
          ...["rr", "vt", "vd"].map((k) => Number(f.get(k))),
        );
        root.querySelector("[data-ventilation-result]").textContent =
          `Total ${r.minute.toFixed(2)} L/min · estimated alveolar ${r.alveolar.toFixed(2)} L/min.`;
      } catch (e) {
        root.querySelector("[data-ventilation-result]").textContent = e.message;
      }
    });
    on("[data-route-next]", "click", () => {
      state.route = (state.route + 1) % D.route.length;
      updateRoute();
    });
    on("[data-route-prev]", "click", () => {
      state.route = (state.route + D.route.length - 1) % D.route.length;
      updateRoute();
    });
    on("[data-route-reverse]", "click", (e) => {
      state.reverse = !state.reverse;
      e.target.setAttribute("aria-pressed", state.reverse);
    });
    on("[data-coronary]", "click", () => {
      selectStructure("sinus");
      view?.selectStructures?.(["sinus"]);
      root.querySelector("[data-route-feedback]").textContent =
        "Coronary return branch: myocardial capillaries → cardiac veins → coronary sinus → right atrium. Coronary sinus reference mesh selected; this is separate from pulmonary veins.";
    });
    on("[data-route-reveal]", "click", () => {
      const next =
          (state.route + (state.reverse ? -1 : 1) + D.route.length) %
          D.route.length,
        value = root.querySelector("[data-route-predict]").value;
      const answer = D.route[next];
      root.querySelector("[data-route-feedback]").textContent =
        (value !== "" && D.route[+value] === answer
          ? "Correct. "
          : "Review this connection. ") +
        `Next in ${state.reverse ? "reverse" : "forward"} questioning: ${answer}. Unlimited retries.`;
    });
    all(
      "[data-session]",
      (b) =>
        (b.onclick = () => {
          state.order = shuffle(
            D.questions.filter((q) => q.system === state.system),
          )
            .slice(0, +b.dataset.session)
            .map((q) => q.id);
          resetAnswerOrder();
          state.question = 0;
          state.picked = null;
          state.hint = false;
          render();
        }),
    );
    all(
      "[data-answer]",
      (b) =>
        (b.onclick = () => {
          const q = D.questions.find(
            (q) => q.id === state.order[state.question],
          );
          if (state.picked !== null) return;
          state.picked = +b.dataset.answer;
          progress.attempts.push({
            id: q.id,
            correct: state.picked === q.answer,
            guided: state.hint,
            date: new Date().toISOString(),
          });
          persist();
          render();
        }),
    );
    on("[data-hint]", "click", () => {
      state.hint = true;
      render();
    });
    on("[data-retry-question]", "click", () => {
      state.picked = null;
      state.hint = true;
      render();
    });
    on("[data-transfer-question]", "click", () => {
      const current = D.questions.find(
        (q) => q.id === state.order[state.question],
      );
      const related = shuffle(
        D.questions.filter(
          (q) =>
            q.system === state.system &&
            q.category === current.category &&
            q.id !== current.id,
        ),
      )[0];
      if (!related) return;
      state.order.splice(state.question + 1, 0, related.id);
      resetAnswerOrder();
      state.question++;
      state.picked = null;
      state.hint = true;
      render();
    });
    on("[data-next-question]", "click", () => {
      resetAnswerOrder();
      state.question++;
      state.picked = null;
      state.hint = false;
      render();
    });
    on("[data-new-session]", "click", () => {
      state.order = [];
      resetAnswerOrder();
      render();
    });
    on("[data-export]", "click", () => {
      root.querySelector("[data-progress-text]").value = JSON.stringify(
        progress,
        null,
        2,
      );
      root.querySelector("[data-progress-result]").textContent =
        "Export ready to copy. Other study data is excluded.";
    });
    on("[data-raw]", "click", () => {
      try {
        root.querySelector("[data-progress-text]").value =
          storage.getItem(P.KEY) || "";
      } catch (e) {
        root.querySelector("[data-progress-result]").textContent =
          "Stored text is unavailable in this browser.";
      }
    });
    on("[data-import]", "click", () => {
      try {
        const text = root.querySelector("[data-progress-text]").value;
        const candidate = P.validate(JSON.parse(text));
        const known = new Set(D.questions.map((q) => q.id));
        if (candidate.attempts.some((a) => !known.has(a.id)))
          throw Error("Unknown practice item.");
        for (const [system, step] of Object.entries(candidate.lessons)) {
          if (step >= D.lessons[system].length)
            throw Error("Unknown lesson step.");
        }
        progress = P.importData(storage, text);
        corrupt = false;
        saveError = "";
        root.querySelector("[data-progress-result]").textContent =
          "Simulator progress imported.";
      } catch (e) {
        root.querySelector("[data-progress-result]").textContent =
          "Import rejected; saved progress unchanged. " + e.message;
      }
    });
    on("[data-reset]", "click", () => {
      try {
        storage.removeItem(P.KEY);
        progress = P.empty();
        corrupt = false;
        saveError = "";
        root.querySelector("[data-progress-result]").textContent =
          "Only simulator progress was reset.";
      } catch (e) {
        root.querySelector("[data-progress-result]").textContent =
          "Reset failed; storage unavailable.";
      }
    });
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.(
    "change",
    stop,
  );
  // Public, audio-neutral adapter around the existing respiratory scene.
  const guidedRespCurrent=ctx=>!ctx||ctx.isCurrent();
  function adoptGuidedRespOwner(ctx){if(ctx&&typeof ctx.lessonId==='string'&&ctx.isCurrent()&&view){if(guidedRespOwner?.view!==view||guidedRespOwner.lessonId!==ctx.lessonId)guidedRespOwner={view,lessonId:ctx.lessonId};}else guidedRespOwner=null;}
  function guidedRespSuspendForExplanation(ctx){
    if(!ctx||typeof ctx.isCurrent!=='function'||!ctx.isCurrent())return false;
    const owner=window.GuidedStudy?.session.inspect();
    if(owner?.mode!=='guided'||!owner.lessonId||ctx.lessonId!==owner.lessonId||guidedRespOwner?.view!==view||guidedRespOwner.lessonId!==owner.lessonId||state.system!=='respiratory'||atlasWanted||!['explore','guided'].includes(state.tab)||!view?.isUsable?.()||typeof view.suspend!=='function'||(root.classList.contains('hidden')&&!(guidedParked?.view===view&&guidedParked.generation===generation&&guidedParked.lessonId===owner.lessonId)))return false;
    const lease={ctx,view,generation,lessonId:owner.lessonId,used:false},prior=guidedSuspendNavigation;guidedSuspendNavigation=lease;
    try{window.goHome();if(!ctx.isCurrent()){if(guidedParked?.view===lease.view&&generation===lease.generation)close();return false;}return lease.used&&guidedParked?.view===lease.view;}
    catch(e){if(view===lease.view&&generation===lease.generation)try{close();}catch(_){}throw e;}
    finally{guidedSuspendNavigation=prior;}
  }
  function releaseGuidedResources(){if(guidedParked?.view===view)close();}
  async function guidedRespPrepare(scene,ctx){
    if(!guidedRespCurrent(ctx))return false;const cancel=()=>{generation++;};if(ctx)ctx.signal.addEventListener('abort',cancel,{once:true});
    try{
      const owner=window.GuidedStudy?.session.inspect(),parked=guidedParked;
      if(parked&&parked.view===view&&parked.generation===generation&&parked.lessonId===owner?.lessonId&&owner.mode==='guided'&&view?.isUsable?.()){
        if(!window.GuidedExplanation?.hide(ctx))return false;menu.classList.add('hidden');root.classList.remove('hidden');guidedParked=null;stop();
        try{if(!view.resume())throw Error('The suspended lung scene is unavailable.');}catch(e){close();throw e;}
        root.querySelector('h2')?.focus();
      }else if(state.system!=='respiratory'||root.classList.contains('hidden')||(view&&typeof view.isUsable==='function'&&!view.isUsable()))open('respiratory',{guidedContext:ctx});
      else if(!['explore','guided'].includes(state.tab)){state.tab='explore';render(ctx);}
      stop();await sceneReady;if(!guidedRespCurrent(ctx))return false;stop();return true;
    }finally{if(ctx)ctx.signal.removeEventListener('abort',cancel);}
  }
  function guidedRespCapture(){return JSON.parse(JSON.stringify({version:1,organ:'respiratory',state:{...state,playing:false},scene:view?.snapshot?.()||sceneSnapshots.get('respiratory')||null,fallbackJourney:fallbackExplorer?.state()?.id,signature:guidedRespSignature,anchor:guidedRespAnchor,window:guidedRespWindow}));}
  async function guidedRespRestore(saved,ctx){
    if(saved?.version!==1||saved.organ!=='respiratory'||saved.state?.system!=='respiratory')throw Error('Invalid respiratory lesson scene.');
    if(!await guidedRespPrepare(null,ctx)||!guidedRespCurrent(ctx))return false;Object.assign(state,JSON.parse(JSON.stringify(saved.state)),{playing:false});rebuildMechanics();render(ctx);await sceneReady;if(!guidedRespCurrent(ctx))return false;stop();
    if(saved.scene&&view?.restoreSnapshot){await view.restoreSnapshot(saved.scene,ctx);if(!guidedRespCurrent(ctx))return false;}else{if(saved.scene?.journey?.segment)fallbackExplorer?.go(saved.scene.journey.segment);if(saved.fallbackJourney||saved.scene?.journey?.id)fallbackExplorer?.go(saved.fallbackJourney||saved.scene.journey.id);}
    guidedRespSignature=saved.signature||null;guidedRespAnchor=Number(saved.anchor)||0;guidedRespWindow=saved.window||null;updateClock();adoptGuidedRespOwner(ctx);return true;
  }
  async function guidedRespApply(spec,audioTime,ctx){
    if(!guidedRespCurrent(ctx)||state.system!=='respiratory'||root.classList.contains('hidden'))return false;stop();const signature=JSON.stringify(spec);
    const changed=signature!==guidedRespSignature;
    if(changed){
      if(spec.monitoringView!=null&&spec.monitoringView!=='capnography')throw Error('Unsupported respiratory monitoring view.');
      root.querySelectorAll('[data-cue]').forEach(control=>{control.checked=true;});
      const breathing={rate:12,target:.5,resistance:2,compliance:.1,mode:'target',...(spec.breathing||{})},ventilation=spec.ventilation||'spontaneous';
      if(JSON.stringify(breathing)!==JSON.stringify(state.breathing)||ventilation!==state.ventilation){state.breathing=breathing;state.ventilation=ventilation;rebuildMechanics();root.querySelector('[data-mechanics-curves]').innerHTML=mechanicsCurves();}
      state.view=spec.stage==='membrane'||spec.stage==='alveoli'?'exchange':'whole';
      if(view?.applyGuidedScene){await view.applyGuidedScene(spec,ctx);if(!guidedRespCurrent(ctx))return false;}else{if(spec.segment)fallbackExplorer?.go(spec.segment);fallbackExplorer?.go(spec.stage||'whole');}
    }
    const finish=()=>{
      if(changed){
      if(spec.selected)selectStructure(spec.selected);
      const sim=spec.simulation||{kind:'hold',seconds:0};guidedRespWindow=null;if(sim.kind==='phase'){
        if(sim.phase==='expiration')guidedRespAnchor=mechanics.period*.7;
        else if(sim.phase==='inspiration')guidedRespAnchor=mechanics.period*.2;
        else{const i=C.respiratoryPhases.findIndex(x=>x.id===sim.phase);if(i<0)throw Error('Unsupported guided respiratory phase.');guidedRespAnchor=(C.respiratoryPhases[i].start+(C.respiratoryPhases[i+1]?.start??5))/2/5*mechanics.period;}
      }else guidedRespAnchor=Number(sim.seconds)||0;
      if(sim.sweep){if(sim.kind!=='phase'||!['inspiration','expiration'].includes(sim.phase)||!Number.isFinite(sim.anchorAudio)||!Number.isFinite(sim.endAudio)||sim.endAudio<=sim.anchorAudio)throw Error('Respiratory sweeps require a supported phase and measured positive audio bounds.');guidedRespWindow={start:sim.phase==='inspiration'?0:mechanics.Ti+.001,end:sim.phase==='inspiration'?mechanics.Ti-.001:mechanics.period-.001,audioStart:sim.anchorAudio,audioEnd:sim.endAudio};}
      guidedRespSignature=signature;
    }
    if(!guidedRespCurrent(ctx))return false;const sim=spec.simulation||{kind:'hold',seconds:0};state.time=guidedRespWindow?guidedRespWindow.start+(guidedRespWindow.end-guidedRespWindow.start)*Math.max(0,Math.min(1,(audioTime-guidedRespWindow.audioStart)/(guidedRespWindow.audioEnd-guidedRespWindow.audioStart))):sim.kind==='cycle'?(guidedRespAnchor+Math.max(0,audioTime-(sim.anchorAudio||0))*(sim.speed??1))%mechanics.period:Math.max(0,Math.min(mechanics.period,guidedRespAnchor));updateClock();adoptGuidedRespOwner(ctx);return true;
    };
    return view?.batchDraw?view.batchDraw(finish):finish();
  }
  window.CardiorespiratoryStudy = {
    guided:{prepare:guidedRespPrepare,apply:guidedRespApply,capture:guidedRespCapture,restore:guidedRespRestore,pause:stop,suspendForExplanation:guidedRespSuspendForExplanation,releaseGuidedResources},
    open,
    showLesson(system,index=0) { open(system);state.tab="guided";state.lesson=Math.max(0,Math.min(D.lessons[system].length-1,index));render(); },
    close,
    getState: () => ({ ...state }),
    getProgress: () => JSON.parse(JSON.stringify(progress)),
    getMechanics: () => mechanics.at(state.time),
    inspectBreathing: () => view?.inspect?.(),
  };
})();
