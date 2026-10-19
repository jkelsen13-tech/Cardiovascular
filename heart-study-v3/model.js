/* Heart v3: independently authored educational lumped circulation.
 * Units: mL, seconds, mmHg; ECG is an illustrative mV trace.
 * No DOM, renderer, storage, wall-clock or external dependency.
 * Equations, source boundary and validation: docs/HEART-V3-NUMERICAL-MODEL.md.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.HeartV3Model = api;
}(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  var NAMES = ['la', 'lv', 'systemicArtery', 'systemicVein', 'ra', 'rv', 'pulmonaryArtery', 'pulmonaryVein'];
  var DEFAULTS = Object.freeze({ heartRate: 75, bloodVolume: 5000, systemicResistance: 1.05, contractility: 1 });
  var LIMITS = Object.freeze({ heartRate: Object.freeze([55, 110]), bloodVolume: Object.freeze([4600, 5400]), systemicResistance: Object.freeze([0.8, 1.4]), contractility: Object.freeze([0.8, 1.25]) });
  var V0 = [20, 10, 650, 2700, 20, 10, 100, 250];
  var C = [0, 0, 1.5, 100, 0, 0, 5, 20];
  var EDGES = [
    { id: 'mitral', from: 0, to: 1, resistance: 0.008, valve: true, side: 'left' },
    { id: 'aortic', from: 1, to: 2, resistance: 0.006, valve: true, side: 'left' },
    { id: 'systemic', from: 2, to: 3, resistance: 1.05 },
    { id: 'systemicReturn', from: 3, to: 4, resistance: 0.045 },
    { id: 'tricuspid', from: 4, to: 5, resistance: 0.008, valve: true, side: 'right' },
    { id: 'pulmonary', from: 5, to: 6, resistance: 0.006, valve: true, side: 'right' },
    { id: 'pulmonaryBed', from: 6, to: 7, resistance: 0.12 },
    { id: 'pulmonaryReturn', from: 7, to: 0, resistance: 0.025 }
  ];
  function mod(t, period) { return ((t % period) + period) % period; }
  function parameters(input) {
    var result = {};
    Object.keys(DEFAULTS).forEach(function (key) {
      var value = input && input[key] !== undefined ? input[key] : DEFAULTS[key];
      if (typeof value !== 'number' || !Number.isFinite(value) || value < LIMITS[key][0] || value > LIMITS[key][1]) {
        throw new RangeError(key + ' must be finite and within ' + LIMITS[key].join('–'));
      }
      result[key] = value;
    });
    return Object.freeze(result);
  }
  function timing(p) {
    var period = 60 / p.heartRate;
    // Systole shortens less than the beat period. This is an authored normal-range preset.
    var rateScale = Math.sqrt(period / 0.8);
    return { period: period, pStart: 0.035, pEnd: 0.115, qrsStart: 0.195, qrsEnd: 0.275,
      tStart: 0.195 + 0.205 * rateScale, tEnd: 0.195 + 0.325 * rateScale,
      atrialStart: 0.075, atrialRise: 0.055, atrialHold: 0.105, atrialFall: 0.025,
      ventricularStart: 0.235, ventricularRise: 0.115 * rateScale, ventricularHold: 0.09 * rateScale, ventricularFall: 0.115 * rateScale,
      rightDelay: 0.012, electromechanicalDelay: 0.040 };
  }
  function activation(t, clock) {
    function envelope(start, rise, hold, fall) {
      var dt = t - start;
      if (dt <= 0 || dt >= rise + hold + fall) return 0;
      if (dt < rise) return 0.5 * (1 - Math.cos(Math.PI * dt / rise));
      if (dt < rise + hold) return 1;
      return 0.5 * (1 + Math.cos(Math.PI * (dt - rise - hold) / fall));
    }
    return [envelope(clock.atrialStart, clock.atrialRise, clock.atrialHold, clock.atrialFall),
      envelope(clock.ventricularStart, clock.ventricularRise, clock.ventricularHold, clock.ventricularFall),
      envelope(clock.atrialStart + 0.006, clock.atrialRise, clock.atrialHold, clock.atrialFall),
      envelope(clock.ventricularStart + clock.rightDelay, clock.ventricularRise, clock.ventricularHold, clock.ventricularFall)];
  }
  function pressures(y, t, p, clock, out) {
    var a = activation(t, clock);
    out[0] = (0.14 + 0.20 * a[0]) * (y[0] - V0[0]);
    out[1] = (0.06 + (2.8 * p.contractility - 0.06) * a[1]) * (y[1] - V0[1]);
    out[2] = (y[2] - V0[2]) / C[2];
    out[3] = (y[3] - V0[3]) / C[3];
    out[4] = (0.10 + 0.15 * a[2]) * (y[4] - V0[4]);
    out[5] = (0.035 + (0.65 * p.contractility - 0.035) * a[3]) * (y[5] - V0[5]);
    out[6] = (y[6] - V0[6]) / C[6];
    out[7] = (y[7] - V0[7]) / C[7];
    return out;
  }
  function valveFlow(gradient, resistance) { return Math.max(gradient / resistance, 0); }
  function flows(press, p, out) {
    for (var j = 0; j < EDGES.length; j++) {
      var edge = EDGES[j];
      var gradient = press[edge.from] - press[edge.to];
      var resistance = j === 2 ? p.systemicResistance : edge.resistance;
      out[j] = edge.valve ? valveFlow(gradient, resistance) : gradient / resistance;
    }
    return out;
  }
  function derivative(flow, out) {
    out.fill(0);
    for (var j = 0; j < EDGES.length; j++) {
      out[EDGES[j].from] -= flow[j];
      out[EDGES[j].to] += flow[j];
    }
    return out;
  }
  function workspace() {
    return { pressure: new Float64Array(8), flow: new Float64Array(8), d: new Float64Array(8), mid: new Float64Array(8) };
  }
  function advance(y, t, h, p, clock, work, ledger) {
    pressures(y, t, p, clock, work.pressure);
    derivative(flows(work.pressure, p, work.flow), work.d);
    for (var j = 0; j < 8; j++) work.mid[j] = y[j] + 0.5 * h * work.d[j];
    pressures(work.mid, t + 0.5 * h, p, clock, work.pressure);
    derivative(flows(work.pressure, p, work.flow), work.d);
    for (var k = 0; k < 8; k++) y[k] += h * work.d[k];
    if (ledger) for (var e = 0; e < 8; e++) ledger[e] += h * work.flow[e];
    return y;
  }
  function phase(inlet, outlet, a, t, clock, side) {
    if (outlet.open) return 'ejection';
    if (inlet.open) return a > 0.015 ? 'atrial-contraction' : 'passive-filling';
    var onset = clock.ventricularStart + (side === 'right' ? clock.rightDelay : 0);
    if (t < onset) return 'diastasis';
    var peak = clock.ventricularStart + clock.ventricularRise + (side === 'right' ? clock.rightDelay : 0);
    return t < peak ? 'isovolumetric-contraction' : 'isovolumetric-relaxation';
  }
  function electrical(t, clock) {
    var part = 'TP';
    if (t >= clock.pStart && t < clock.pEnd) part = 'P';
    else if (t >= clock.pEnd && t < clock.qrsStart) part = 'PR';
    else if (t >= clock.qrsStart && t < clock.qrsEnd) part = 'QRS';
    else if (t >= clock.qrsEnd && t < clock.tStart) part = 'ST';
    else if (t >= clock.tStart && t < clock.tEnd) part = 'T';
    var gaussian = function (center, width, height) { return height * Math.exp(-0.5 * Math.pow((t - center) / width, 2)); };
    var voltage = gaussian(0.077, 0.018, 0.14) + gaussian(0.211, 0.006, -0.13) + gaussian(0.230, 0.008, 1.05)
      + gaussian(0.251, 0.009, -0.25) + gaussian((clock.tStart + clock.tEnd) / 2, (clock.tEnd - clock.tStart) / 4, 0.28);
    var stage = t < clock.pStart ? 'SA-node' : t < clock.pEnd ? 'atrial-propagation' : t < clock.qrsStart - 0.02 ? 'AV-delay'
      : t < clock.qrsStart ? 'His-bundle' : t < clock.qrsStart + 0.025 ? 'bundle-branches'
      : t < clock.qrsEnd ? 'Purkinje-myocardium' : t < clock.tStart ? 'ventricular-plateau'
      : t < clock.tEnd ? 'ventricular-repolarization' : 'diastolic-recovery';
    return { ecg: { voltage: voltage, part: part, representation: 'illustrative surface ECG', unit: 'mV' },
      electrical: { stage: stage, atrial: t >= clock.pStart && t < clock.pEnd ? (t - clock.pStart) / (clock.pEnd - clock.pStart) : 0,
        ventricular: t >= clock.qrsStart && t < clock.tEnd ? (t - clock.qrsStart) / (clock.tEnd - clock.qrsStart) : 0,
        prInterval: clock.qrsStart - clock.pStart, prSegment: clock.qrsStart - clock.pEnd,
        qrsDuration: clock.qrsEnd - clock.qrsStart, electromechanicalDelay: clock.electromechanicalDelay,
        pStart: clock.pStart, pEnd: clock.pEnd, qrsStart: clock.qrsStart, qrsEnd: clock.qrsEnd, tStart: clock.tStart, tEnd: clock.tEnd } };
  }
  function state(y, seconds, cycleTime, p, clock, metrics) {
    var press = pressures(y, cycleTime, p, clock, new Float64Array(8));
    var flow = flows(press, p, new Float64Array(8));
    var a = activation(cycleTime, clock);
    var e = electrical(cycleTime, clock);
    var chambers = {};
    [0, 1, 4, 5].forEach(function (index, j) {
      chambers[NAMES[index]] = { volume: y[index], pressure: press[index], activation: a[j], electricalActivation: j % 2 === 0 ? e.electrical.atrial : e.electrical.ventricular };
    });
    var valves = {};
    EDGES.forEach(function (edge, index) {
      if (edge.valve) valves[edge.id] = { open: flow[index] > 0, flow: flow[index], gradient: press[edge.from] - press[edge.to] };
    });
    var leftPhase = phase(valves.mitral, valves.aortic, a[0], cycleTime, clock, 'left');
    var rightPhase = phase(valves.tricuspid, valves.pulmonary, a[2], cycleTime, clock, 'right');
    return { seconds: seconds, cycleTime: cycleTime, cycleFraction: cycleTime / clock.period, phase: leftPhase, leftPhase: leftPhase, rightPhase: rightPhase,
      chambers: chambers, valves: valves, arteries: { systemic: { volume: y[2], pressure: press[2] }, pulmonary: { volume: y[6], pressure: press[6] } },
      veins: { systemic: { volume: y[3], pressure: press[3] }, pulmonary: { volume: y[7], pressure: press[7] } },
      vascularFlows: { systemic: flow[2], systemicReturn: flow[3], pulmonary: flow[6], pulmonaryReturn: flow[7] },
      totalBloodVolume: y.reduce(function (sum, value) { return sum + value; }, 0), ecg: e.ecg, electrical: e.electrical, metrics: metrics };
  }
  function build(input, options) {
    var p = parameters(input);
    var clock = timing(p);
    options = options || {};
    var targetStep = options.timeStep === undefined ? 0.001 : options.timeStep;
    if (!Number.isFinite(targetStep) || targetStep < 0.000125 || targetStep > 0.002) throw new RangeError('timeStep must be 0.000125–0.002 seconds');
    var count = Math.ceil(clock.period / targetStep);
    var h = clock.period / count;
    var y = new Float64Array([55, 120, 790, 3200, 60, 130, 180, 465]);
    y[3] += p.bloodVolume - y.reduce(function (sum, value) { return sum + value; }, 0);
    var work = workspace();
    var delta = Infinity;
    var beats = 0;
    // Independent startup settling; no EDV/ESV reset, pressure clamp or concealed exchange.
    while (beats < 240 && delta > 0.000005) {
      var old = y.slice();
      for (var i = 0; i < count; i++) advance(y, i * h, h, p, clock, work);
      delta = 0;
      for (var j = 0; j < 8; j++) delta = Math.max(delta, Math.abs(y[j] - old[j]));
      beats++;
    }
    if (delta > 0.000005) throw new Error('Periodic initialization did not converge: ' + delta + ' mL');
    var raw = [y.slice()];
    var ledger = new Float64Array(8);
    var ledgers = [ledger.slice()];
    var start = y.slice();
    for (var n = 0; n < count; n++) {
      advance(y, n * h, h, p, clock, work, ledger);
      raw.push(y.slice());
      ledgers.push(ledger.slice());
    }
    var metrics = {};
    var samples = raw.map(function (values, index) { return state(values, index * h, index * h, p, clock, metrics); });
    function sideMetrics(name, inlet, outlet) {
      var values = samples.map(function (s) { return s.chambers[name].volume; });
      var edv = Math.max.apply(null, values), esv = Math.min.apply(null, values);
      var strokeVolume = edv - esv;
      return { edv: edv, esv: esv, strokeVolume: strokeVolume, cardiacOutput: ledger[outlet] / clock.period * 60 / 1000,
        ejectionFraction: 100 * strokeVolume / edv, outflowIntegral: ledger[outlet], inflowIntegral: ledger[inlet] };
    }
    metrics.left = sideMetrics('lv', 0, 1);
    metrics.right = sideMetrics('rv', 4, 5);
    Object.keys(metrics.left).forEach(function (key) { metrics[key] = metrics.left[key]; });
    metrics.heartRate = p.heartRate;
    metrics.definition = 'settled periodic cycle; forward valve flow integral; EF = 100 × (EDV − ESV) / EDV';
    Object.freeze(metrics.left);
    Object.freeze(metrics.right);
    Object.freeze(metrics);
    var events = [];
    for (var s = 1; s < samples.length; s++) {
      var before = samples[s - 1], after = samples[s];
      ['mitral', 'aortic', 'tricuspid', 'pulmonary'].forEach(function (name) {
        if (before.valves[name].open !== after.valves[name].open) {
          var g0 = before.valves[name].gradient, g1 = after.valves[name].gradient;
          var fraction = g0 / (g0 - g1);
          events.push({ type: after.valves[name].open ? 'valve-open' : 'valve-close', valve: name,
            side: name === 'mitral' || name === 'aortic' ? 'left' : 'right', cycleTime: (s - 1 + fraction) * h });
        }
      });
      ['left', 'right'].forEach(function (side) {
        if (before[side + 'Phase'] !== after[side + 'Phase']) events.push({ type: 'phase', side: side, phase: after[side + 'Phase'], cycleTime: s * h });
      });
    }
    events.sort(function (a, b) { return a.cycleTime - b.cycleTime; });
    events.forEach(Object.freeze);
    Object.freeze(events);
    var maxTotalError = 0, maxBalanceError = 0;
    for (var q = 0; q < raw.length; q++) {
      var sum = 0;
      for (var c = 0; c < 8; c++) {
        sum += raw[q][c];
        var expectedChange = 0;
        for (var f = 0; f < EDGES.length; f++) {
          if (EDGES[f].to === c) expectedChange += ledgers[q][f];
          if (EDGES[f].from === c) expectedChange -= ledgers[q][f];
        }
        maxBalanceError = Math.max(maxBalanceError, Math.abs(raw[q][c] - start[c] - expectedChange));
      }
      maxTotalError = Math.max(maxTotalError, Math.abs(sum - p.bloodVolume));
    }
    var validation = Object.freeze({ timeStep: h, stepsPerCycle: count, initializationBeats: beats,
      periodicResidual: delta, totalBloodVolumeError: maxTotalError, flowVolumeBalanceError: maxBalanceError,
      totalBloodVolume: p.bloodVolume, solver: 'fixed-step explicit midpoint (RK2), conservative edge transfers',
      representation: 'educational lumped hemodynamics; illustrative activation and ECG; no oxygen, disease or molecular solver' });
    function sample(seconds) {
      if (typeof seconds !== 'number' || !Number.isFinite(seconds)) throw new RangeError('seconds must be finite');
      var t = mod(seconds, clock.period);
      var index = Math.min(count - 1, Math.floor(t / h));
      var f = (t - index * h) / h;
      var values = new Float64Array(8);
      for (var j = 0; j < 8; j++) values[j] = raw[index][j] + f * (raw[index + 1][j] - raw[index][j]);
      return state(values, seconds, t, p, clock, metrics);
    }
    return { parameters: p, period: clock.period, sample: sample, samples: samples, metrics: metrics, events: events, validation: validation,
      timing: Object.freeze(clock), flowIntegrals: Object.fromEntries(EDGES.map(function (edge, index) { return [edge.id, ledger[index]]; })) };
  }
  // Pure equation access for independently specified checks; build is the renderer API.
  var physics = Object.freeze({ valveFlow: valveFlow, pressures: function (volumes, seconds, input) {
    var p = parameters(input); return Array.from(pressures(volumes, mod(seconds, 60 / p.heartRate), p, timing(p), new Float64Array(8)));
  }, advance: function (volumes, seconds, step, input) {
    var p = parameters(input), values = new Float64Array(volumes);
    return Array.from(advance(values, seconds, step, p, timing(p), workspace()));
  }, compartments: Object.freeze(NAMES.slice()), unstressedVolumes: Object.freeze(V0.slice()), edges: Object.freeze(EDGES.map(function (e) { return Object.freeze(Object.assign({}, e)); })) });
  return Object.freeze({ build: build, defaults: DEFAULTS, limits: LIMITS, physics: physics, version: 'heart-v3-conservative-1' });
}));
