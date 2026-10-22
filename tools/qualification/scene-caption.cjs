#!/usr/bin/env node
'use strict';

// Exercise the actual UI function without a WebGL/browser lane. A historical
// source ref can be supplied as a negative control; no source pin is replaced.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const rootDir = path.resolve(__dirname, '../..');
const sourcePath = 'heart-study-v3/module.js';
const sourceRef = process.env.CAPTION_SOURCE_REF || null;
const source = sourceRef
  ? execFileSync('git', ['show', `${sourceRef}:${sourcePath}`], { cwd: rootDir, encoding: 'utf8' })
  : fs.readFileSync(path.join(rootDir, sourcePath), 'utf8');
const start = source.indexOf('  function updateSceneCaption() {');
const end = source.indexOf('  function beginTrace()', start);
assert(start >= 0 && end > start, 'The production caption function must be found');
const implementation = source.slice(start, end);
const outputs = [];
const failures = [];

function captionCase(name, overrides, camera, inspect = {}) {
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {
      textContent: '', hidden: false, disabled: false, attributes: {},
      setAttribute(key, value) { this.attributes[key] = value; }
    });
    return nodes.get(selector);
  }
  const presetButtons = [node('opening-button'), node('attachments-button')];
  const state = { mode: 'whole', route: null, selected: 'lv', labels: true, ...overrides };
  const context = {
    state,
    names: { lv: 'Left ventricle', aortic: 'Aortic valve' },
    savedCamera: { yaw: 0, pitch: 0 },
    renderer: { snapshot: () => camera, inspect: () => inspect },
    root: { querySelector: node, querySelectorAll: () => presetButtons }
  };
  vm.runInNewContext(`${implementation}\nupdateSceneCaption();`, context, { timeout: 1000 });
  const result = {
    name, mode: state.mode, route: state.route, camera,
    orientation: node('[data-h3-orientation]').textContent,
    selected: node('[data-h3-selected-context]').textContent,
    selectedPocketHidden: node('[data-h3-pocket-selected]').hidden,
    selectedPocketAria: node('[data-h3-pocket-selected]').attributes['aria-label'],
    presetButtonsDisabled: presetButtons.map(button => button.disabled),
    representationStatus: node('[data-h3-representation-status]').textContent,
    representation: node('[data-h3-representation]').textContent
  };
  outputs.push(result);
  return result;
}

function check(name, run) {
  try { run(); } catch (error) { failures.push({ name, message: error.message }); }
}

check('Four-chamber identity survives camera pitch and rotation', () => {
  for (const camera of [{ yaw: 0, pitch: .9 }, { yaw: Math.PI, pitch: -.9 }, { yaw: 1.1, pitch: .2 }]) {
    const result = captionCase('four-chamber section', { mode: 'four-chamber' }, camera);
    assert.match(result.orientation, /four.chamber section/i);
    assert.doesNotMatch(result.orientation, /oblique opening|anterior reference|posterior reference/i);
    assert.match(result.representationStatus, /blood occupancy/i);
  }
});
check('Outflow identity survives camera pitch and rotation', () => {
  for (const camera of [{ yaw: 0, pitch: .9 }, { yaw: 1.1, pitch: .2 }]) {
    const result = captionCase('outflow section', { mode: 'outflow' }, camera);
    assert.match(result.orientation, /outflow section/i);
    assert.doesNotMatch(result.orientation, /oblique opening|anterior reference/i);
  }
});
check('Whole-heart captions retain camera orientation', () => {
  assert.match(captionCase('whole anterior', {}, { yaw: 0, pitch: 0 }).orientation, /anterior reference/i);
  assert.match(captionCase('whole posterior', {}, { yaw: Math.PI, pitch: 0 }).orientation, /posterior reference/i);
  assert.match(captionCase('whole oblique', {}, { yaw: .8, pitch: .9 }).orientation, /oblique opening/i);
  assert.match(captionCase('whole rotated', {}, { yaw: .8, pitch: .2 }).orientation, /rotated view/i);
  assert.match(captionCase('exterior anterior', { mode: 'exterior' }, { yaw: 0, pitch: 0 }).orientation, /anterior reference/i);
});
check('Local route keeps its own axes and retained origin', () => {
  const result = captionCase('route over a stored section', { route: 'routeB', mode: 'four-chamber' }, { yaw: 0, pitch: .9 });
  assert.match(result.orientation, /local mechanism axes/i);
  assert.doesNotMatch(result.orientation, /four.chamber section/i);
  assert.match(result.selected, /retained origin: left ventricle/i);
  assert.match(result.representationStatus, /microanatomy/i);
  assert(result.presetButtonsDisabled.every(Boolean));
});
check('Selected valve controls and hidden labels retain their behavior', () => {
  const valve = captionCase('valve inspection', { selected: 'aortic' }, { yaw: 0, pitch: 0 }, { inspectionValve: 'aortic' });
  assert(valve.presetButtonsDisabled.every(disabled => !disabled));
  assert.match(valve.representation, /aortic valve.*illustrative leaflet opening/i);
  const hidden = captionCase('labels hidden', { labels: false }, { yaw: 0, pitch: 0 });
  assert.equal(hidden.selected, 'Structure name hidden');
  assert.equal(hidden.selectedPocketHidden, true);
  assert.equal(hidden.selectedPocketAria, 'Selected: Left ventricle');
});

const receipt = {
  kind: 'Production scene-caption CPU contract',
  createdUtc: new Date().toISOString(),
  sourcePath,
  sourceRef,
  sourceSha256: crypto.createHash('sha256').update(source).digest('hex'),
  functionSha256: crypto.createHash('sha256').update(implementation).digest('hex'),
  passed: failures.length === 0,
  checks: 5,
  scenarios: outputs,
  failures,
  limits: 'Executes the production caption function with DOM/renderer stubs. Does not verify rendered geometry, browser layout or audiovisual continuity.'
};
if (process.env.CAPTION_OUTPUT) fs.writeFileSync(process.env.CAPTION_OUTPUT, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
process.exitCode = receipt.passed ? 0 : 1;
