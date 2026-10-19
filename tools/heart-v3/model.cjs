'use strict';
// Numerical acceptance checks. Expected analytic values below do not call model
// equations. UI/geometry checks belong to the separate runtime suites.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const Model = require('../../heart-study-v3/model.js');
let checks = 0;
function ok(condition, message) { checks++; assert.ok(condition, message); }
function near(actual, expected, tolerance, message) {
  checks++; assert.ok(Math.abs(actual - expected) <= tolerance, `${message}: ${actual} vs ${expected}, tolerance ${tolerance}`);
}
function maxDifference(a, b) { return Math.max(...a.map((v, i) => Math.abs(v - b[i]))); }
function independentEndpointQuadrature(model) {
  // Deliberately uses returned instantaneous samples, not model.validation or
  // its midpoint ledger. Trapezoids have a separate declared resolution error.
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]];
  const volumes = s => [s.chambers.la.volume, s.chambers.lv.volume, s.arteries.systemic.volume, s.veins.systemic.volume,
    s.chambers.ra.volume, s.chambers.rv.volume, s.arteries.pulmonary.volume, s.veins.pulmonary.volume];
  const flows = s => [s.valves.mitral.flow, s.valves.aortic.flow, s.vascularFlows.systemic, s.vascularFlows.systemicReturn,
    s.valves.tricuspid.flow, s.valves.pulmonary.flow, s.vascularFlows.pulmonary, s.vascularFlows.pulmonaryReturn];
  const integral = Array(8).fill(0), initial = volumes(model.samples[0]);
  let maximumBalanceError = 0;
  for (let i = 1; i < model.samples.length; i++) {
    const before = model.samples[i - 1], after = model.samples[i], f0 = flows(before), f1 = flows(after), current = volumes(after);
    const dt = after.cycleTime - before.cycleTime;
    for (let e = 0; e < 8; e++) integral[e] += (f0[e] + f1[e]) * .5 * dt;
    for (let pool = 0; pool < 8; pool++) {
      let predictedChange = 0;
      for (let e = 0; e < 8; e++) {
        if (links[e][0] === pool) predictedChange -= integral[e];
        if (links[e][1] === pool) predictedChange += integral[e];
      }
      maximumBalanceError = Math.max(maximumBalanceError, Math.abs(current[pool] - initial[pool] - predictedChange));
    }
  }
  return { maximumBalanceError, leftStrokeIntegralError: Math.abs(integral[1] - model.metrics.strokeVolume), rightStrokeIntegralError: Math.abs(integral[5] - model.metrics.right.strokeVolume) };
}

// Independent Ohm-law cases with hand-computed dimensions and reverse blocking.
near(Model.physics.valveFlow(12, 0.006), 2000, 1e-10, '12 mmHg / .006 mmHg·s/mL = 2000 mL/s');
near(Model.physics.valveFlow(-12, 0.006), 0, 0, 'ideal valve excludes reverse flow');
near(Model.physics.valveFlow(0, 0.008), 0, 0, 'zero gradient has zero flow');
const quiescent = [70, 100, 800, 3200, 70, 100, 175, 450];
const handPressure = [7, 5.4, 100, 5, 5, 3.15, 15, 10];
Model.physics.pressures(quiescent, 0.7).forEach((value, i) => near(value, handPressure[i], 1e-12, `independent passive pressure compartment ${i}`));

// Exact constant-coefficient 8-compartment solution during quiescent diastole.
// The power series is the matrix exponential of the separately written ODE.
// AV valves stay open, semilunar valves stay closed throughout this test.
function independentQuiescentDerivative(v, linearOnly = false) {
  const zero = linearOnly ? [0, 0, 0, 0, 0, 0, 0, 0] : [20, 10, 650, 2700, 20, 10, 100, 250];
  const el = [.14, .06, 1 / 1.5, 1 / 100, .10, .035, 1 / 5, 1 / 20];
  const p = v.map((value, i) => (value - zero[i]) * el[i]);
  const qm = (p[0] - p[1]) / .008, qa = 0;
  const qs = (p[2] - p[3]) / 1.05, qv = (p[3] - p[4]) / .045;
  const qt = (p[4] - p[5]) / .008, qp = 0;
  const qb = (p[6] - p[7]) / .12, qr = (p[7] - p[0]) / .025;
  return [qr - qm, qm - qa, qa - qs, qs - qv, qv - qt, qt - qp, qp - qb, qb - qr];
}
function exactQuiescent(t) {
  const result = quiescent.slice();
  let term = independentQuiescentDerivative(quiescent).map(v => v * t);
  for (let order = 1; order < 30; order++) {
    result.forEach((_, i) => { result[i] += term[i]; });
    term = independentQuiescentDerivative(term, true).map(v => v * t / (order + 1));
  }
  return result;
}
const exact = exactQuiescent(.02);
const analyticErrors = [];
for (const h of [.002, .001, .0005]) {
  let numeric = quiescent.slice();
  for (let i = 0; i < Math.round(.02 / h); i++) numeric = Model.physics.advance(numeric, .7 + i * h, h);
  const error = maxDifference(numeric, exact);
  analyticErrors.push({ timeStep: h, maximumVolumeError: error });
  ok(error < .02, 'coupled quiescent circulation agrees with independent matrix exponential');
  near(numeric.reduce((a, b) => a + b, 0), quiescent.reduce((a, b) => a + b, 0), 1e-9, 'analytic-case blood conservation');
}
ok(analyticErrors[1].maximumVolumeError < analyticErrors[0].maximumVolumeError * .30, 'RK2 analytic error reduces approximately fourfold');
ok(analyticErrors[2].maximumVolumeError < analyticErrors[1].maximumVolumeError * .30, 'RK2 refinement continues second-order convergence');

const start = performance.now();
const baseline = Model.build();
const buildMilliseconds = performance.now() - start;
near(baseline.period, .8, 1e-15, '75 bpm is .8 second, independent of render speed');
// R12 textbook ranges are plausibility checks, not exact calibration/validation.
ok(baseline.metrics.strokeVolume >= 55 && baseline.metrics.strokeVolume <= 100, 'default SV in cited resting example range');
ok(baseline.metrics.cardiacOutput >= 4 && baseline.metrics.cardiacOutput <= 8, 'default CO in cited resting example range');
ok(baseline.metrics.ejectionFraction >= 55 && baseline.metrics.ejectionFraction <= 70, 'default EF in cited illustrative range');

function checkCycle(model, name) {
  near(model.period * model.parameters.heartRate, 60, 1e-12, `${name}: beat-period relation`);
  ok(model.validation.periodicResidual < .000005, `${name}: stable periodic initialization`);
  ok(model.validation.totalBloodVolumeError < 1e-7, `${name}: closed total volume`);
  ok(model.validation.flowVolumeBalanceError < 1e-7, `${name}: all eight compartment balances`);
  const states = model.samples;
  const quadrature = independentEndpointQuadrature(model);
  ok(quadrature.maximumBalanceError < .3, `${name}: independent endpoint-flow quadrature vs volume within .3mL`);
  ok(quadrature.leftStrokeIntegralError < .3 && quadrature.rightStrokeIntegralError < .3, `${name}: independent endpoint outflow integral vs SV within .3mL`);
  for (const side of ['left', 'right']) {
    const chamber = side === 'left' ? 'lv' : 'rv';
    const inlet = side === 'left' ? 'mitral' : 'tricuspid';
    const outlet = side === 'left' ? 'aortic' : 'pulmonary';
    const metric = model.metrics[side];
    near(metric.strokeVolume, metric.edv - metric.esv, 1e-12, `${name}: ${side} SV definition`);
    near(metric.outflowIntegral, metric.strokeVolume, .0001, `${name}: ${side} forward integral vs cavity emptying`);
    near(metric.cardiacOutput, metric.outflowIntegral / model.period * .06, 1e-12, `${name}: ${side} CO integral`);
    near(metric.ejectionFraction, 100 * metric.strokeVolume / metric.edv, 1e-12, `${name}: ${side} EF uses EDV denominator`);
    for (const ph of ['isovolumetric-contraction', 'isovolumetric-relaxation']) {
      const iso = states.filter(s => s[side + 'Phase'] === ph);
      ok(iso.length > 5, `${name}: ${side} ${ph} resolved`);
      near(Math.max(...iso.map(s => s.chambers[chamber].volume)), Math.min(...iso.map(s => s.chambers[chamber].volume)), .00001, `${name}: ${side} ${ph} volume stays constant`);
      const pressureChange = iso.at(-1).chambers[chamber].pressure - iso[0].chambers[chamber].pressure;
      ok(ph === 'isovolumetric-contraction' ? pressureChange > 1 : pressureChange < -1, `${name}: ${side} ${ph} correct pressure direction`);
      ok(iso.every(s => !s.valves[inlet].open && !s.valves[outlet].open && s.valves[inlet].flow === 0 && s.valves[outlet].flow === 0), `${name}: ${side} ${ph} all relevant valves shut/no flow`);
    }
    ok(states.every(s => !(s.valves[inlet].open && s.valves[outlet].open)), `${name}: ${side} no simultaneous inlet/outlet opening`);
  }
  near(model.metrics.left.outflowIntegral, model.metrics.right.outflowIntegral, .0001, `${name}: serial pumps match settled forward volume`);
  ok(states.every(s => Object.values(s.chambers).every(c => Number.isFinite(c.pressure) && c.volume > 0)), `${name}: finite positive chamber volumes`);
  ok(states.every(s => Object.values(s.valves).every(v => v.flow >= 0 && v.open === (v.gradient > 0))), `${name}: every ideal valve obeys its own pressure gradient`);
  ok(Math.max(...states.map(s => s.chambers.lv.pressure)) > 2 * Math.max(...states.map(s => s.chambers.rv.pressure)), `${name}: distinct left/right pressures`);
  for (const ph of ['passive-filling', 'atrial-contraction', 'isovolumetric-contraction', 'ejection', 'isovolumetric-relaxation']) ok(states.some(s => s.leftPhase === ph), `${name}: required phase ${ph}`);
  return quadrature;
}
const baselineQuadrature = checkCycle(baseline, 'default');
const cornerEvidence = [];
for (const heartRate of [55, 110]) for (const bloodVolume of [4600, 5400]) for (const systemicResistance of [.8, 1.4]) for (const contractility of [.8, 1.25]) {
  const model = Model.build({ heartRate, bloodVolume, systemicResistance, contractility });
  const endpointQuadrature = checkCycle(model, JSON.stringify(model.parameters));
  cornerEvidence.push({ parameters: model.parameters, metrics: model.metrics.left, validation: model.validation, endpointQuadrature });
}

// Independent causality directions under one changed input, all others fixed.
const lowVolume = Model.build({ bloodVolume: 4600 }), highVolume = Model.build({ bloodVolume: 5400 });
ok(highVolume.metrics.edv > lowVolume.metrics.edv && highVolume.metrics.strokeVolume > lowVolume.metrics.strokeVolume, 'increased blood volume raises filling and stroke volume without forced EDV');
const lowR = Model.build({ systemicResistance: .8 }), highR = Model.build({ systemicResistance: 1.4 });
ok(highR.metrics.esv > lowR.metrics.esv && highR.metrics.strokeVolume < lowR.metrics.strokeVolume, 'greater systemic resistance increases residual volume and lowers SV');
const lowInotropy = Model.build({ contractility: .8 }), highInotropy = Model.build({ contractility: 1.25 });
ok(highInotropy.metrics.esv < lowInotropy.metrics.esv && highInotropy.metrics.strokeVolume > lowInotropy.metrics.strokeVolume, 'higher contractility empties further and increases SV');
const openTime = m => m.events.find(e => e.type === 'valve-open' && e.valve === 'aortic').cycleTime;
ok(openTime(highR) > openTime(lowR), 'aortic opening emerges later at greater afterload');

// Resolution check against successively refined cycles; convergence by itself is
// distinct from the independent analytic check above.
const refinements = [.002, .001, .0005, .00025, .000125].map(timeStep => {
  const m = timeStep === .001 ? baseline : Model.build({}, { timeStep });
  return { timeStep: m.validation.timeStep, edv: m.metrics.edv, esv: m.metrics.esv, strokeVolume: m.metrics.strokeVolume, aorticOpen: openTime(m) };
});
const finest = refinements.at(-1);
for (const row of refinements.slice(0, -1)) {
  near(row.edv, finest.edv, .02, 'EDV converges within .02mL');
  near(row.esv, finest.esv, .02, 'ESV converges within .02mL');
  // Coarsest 2ms case crosses a nonsmooth ideal-valve boundary; .005mL is
  // 1/20 of the UI's .1mL display increment. Default 1ms is checked tighter.
  near(row.strokeVolume, finest.strokeVolume, .005, 'SV converges within .005mL');
  near(row.aorticOpen, finest.aorticOpen, .0001, 'valve event converges within .1ms');
}
near(refinements[1].strokeVolume, finest.strokeVolume, .001, 'runtime 1ms SV converges within .001mL');
ok(Math.abs(refinements[3].strokeVolume - finest.strokeVolume) < Math.abs(refinements[0].strokeVolume - finest.strokeVolume), 'finest SV approaches common limit');

// Time access has no hidden integration, event emission or mutable beat counter.
const t = .312345, initial = baseline.sample(t);
for (const jump of [300.4, -8, 0, 20000.3, .5, 12.9]) baseline.sample(jump);
assert.deepEqual(baseline.sample(t), initial); checks++;
near(baseline.sample(t + baseline.period * 10000).chambers.lv.volume, initial.chambers.lv.volume, 1e-7, 'long skip yields same physiological state');
near(baseline.sample(-baseline.period + t).chambers.lv.volume, initial.chambers.lv.volume, 1e-9, 'negative seeking is deterministic');
near(baseline.sample(baseline.period).cycleTime, 0, 1e-12, 'exact beat boundary wraps once');
ok(baseline.events.every((e, i, all) => e.cycleTime >= 0 && e.cycleTime < baseline.period && (!i || e.cycleTime >= all[i - 1].cycleTime)), 'events are an ordered immutable cycle catalogue');
ok(baseline.events.filter(e => e.type === 'valve-close').length === 4, 'one closure per normal valve per beat');
near(baseline.timing.ventricularStart - baseline.timing.qrsStart, .04, 1e-15, 'LV mechanics starts 40ms after electrical onset');
near(baseline.timing.atrialStart - baseline.timing.pStart, .04, 1e-15, 'atrial mechanics starts 40ms after P onset');
near(initial.electrical.prInterval, .160, 1e-15, 'PR interval includes P and PR segment');
near(initial.electrical.prSegment, .080, 1e-15, 'PR segment is separately defined');
ok(baseline.sample(baseline.timing.qrsStart + .01).valves.aortic.flow === 0, 'QRS onset does not imply ejection');
for (const key of Object.keys(Model.limits)) {
  for (const value of [NaN, Infinity, -Infinity, '75', null, Model.limits[key][0] - .001, Model.limits[key][1] + .001]) {
    checks++; assert.throws(() => Model.build({ [key]: value }), RangeError, `invalid ${key}`);
  }
}
for (const value of [NaN, Infinity, null, '0']) { checks++; assert.throws(() => baseline.sample(value), RangeError); }
for (const timeStep of [0, .003, NaN, .00001]) { checks++; assert.throws(() => Model.build({}, { timeStep }), RangeError); }

const evidence = { result: 'PASS', checks, buildMilliseconds, baseline: { parameters: baseline.parameters, metrics: baseline.metrics, validation: baseline.validation, events: baseline.events, endpointQuadrature: baselineQuadrature }, analyticErrors, refinements, cornerEvidence,
  scope: 'H3-03/05/06/07(model portion)/08(timing portion)/12; no geometry, UI, iPad or clinical qualification' };
const destination = process.env.HEART_V3_MODEL_EVIDENCE;
if (destination) { fs.mkdirSync(path.dirname(destination), { recursive: true }); fs.writeFileSync(destination, JSON.stringify(evidence, null, 2) + '\n'); }
console.log(`PASS Heart v3 numerical model: ${checks} checks, 16 parameter corners, independent coupled analytical solution, conservative balances, isovolumetric phases, timestep convergence and deterministic seeking. Default build ${buildMilliseconds.toFixed(1)}ms (Node, not iPad).`);
console.log(JSON.stringify({ baseline: baseline.metrics.left, validation: baseline.validation, analyticErrors, refinements }, null, 2));
