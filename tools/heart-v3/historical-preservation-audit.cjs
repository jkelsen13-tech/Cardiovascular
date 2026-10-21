/* Separate historical-delta audit for the owner's frozen 743a0a8 candidate.
 * This does not replace or make teaching-clarity-preservation.cjs pass. The fixed
 * original contract remains FAIL for the three documented protected-file deltas
 * and the two BANK wording corrections. No baseline override is accepted here.
 * CPU/static only: no browser, renderer, timing benchmark, or external requests.
 * Run after the coordinator releases its exclusive profiling window:
 *   node tools/heart-v3/historical-preservation-audit.cjs
 * HEART_V3_SOURCE_ROOT may select an extracted runtime. Original expectations
 * always come from the hash-pinned preservation-baseline.json in this checkout.
 * HEART_V3_HISTORICAL_EVIDENCE controls receipts (default: system temp directory).
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const crypto = require('node:crypto');
const A = require('node:assert/strict');

const repo = path.resolve(__dirname, '../..');
const source = path.resolve(process.env.HEART_V3_SOURCE_ROOT || repo);
const output = path.resolve(process.env.HEART_V3_HISTORICAL_EVIDENCE || path.join(os.tmpdir(), 'heart-v3-historical-preservation-audit'));
const frozenCommit = '743a0a8169e38ab5bd18f3304b98a81635047d80';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const read = file => fs.readFileSync(path.join(source, file));
const baselineFile = 'tools/heart-v3/preservation-baseline.json';
const baselineSHA256 = '0d75899630ba0664bc9a045ccdcace4dfe8ab92067b3de8554b6287f2d469533';
const originalTestSHA256 = '1a05fa34ee0f75cce58179188c96c9657c3a2c165693a684df75dc4e6f97555a';
const ecgFile = 'ecg-study/module.js';
const attributionFile = 'heart-study-v3/assets/ATTRIBUTION.md';
const manifestFile = 'heart-study-v3/assets/model-manifest.json';
const historicalFiles = [ecgFile, manifestFile, attributionFile];

// Audited from the actual first-parent history, not generated from current files.
// ECG first diverges at 8d7f220, not at the later 22369d0 picking repair. The other
// protected files and BANK first diverge at 885df69. Full original hashes remain
// in preservation-baseline.json; these pins preserve the selected 743 candidate.
const frozenSHA256 = {
  'ecg-study/module.js': 'de3fba67b72ee181cc3a66daa78e1ff207af5f6caa9d7700e63f8afbb959c022',
  'ecg-study/heart-3d.js': '17c175cc340bbe2b5f6b33cab2204b304c61fb5965b50b2efec72f23fa9c9b1c',
  'ecg-study/wall-rims.js': '44e6cd4c2cc09a5497ebaef9a48020a8edfa2bc274315b4523e64c6a2ce421d7',
  'ecg-study/content.js': '2c30cf2461ce14213221be9ad742e97981be70cad6c49e3cc26bc853b82258a5',
  'ecg-study/module.css': 'ee443017bcacbb127eb2f9497ee2f2602704e358e8878cad169ed44f334da25a',
  'ecg-study/assets/model-data.js': 'd1bf8fe79e89aa96b83bad0af9802fa942913be0762d225dee46df64cf29ccab',
  'ecg-study/vendor/three-gltf.min.js': 'ed9ffbaecd4018ea8dc90fd74ae041543d03c6fd438c8abb5b833a1cc85a7dcd',
  'heart-study-v3/vendor/shape-utils.min.js': 'dd6ec23bc387980aa233d076040991427bb5ba9604640d14b987da465e0be81c',
  'heart-study-v3/assets/ATTRIBUTION.md': '26f27b44a8798b0a486aa700eb5287ac8b0bababaa4a92f326fc89b73403baa6'
};
const loadAdditions = [
  '      if (!window.HeartV3ShapeUtils) await scriptFile("../heart-study-v3/vendor/shape-utils.min.js");\n',
  '      if (!window.HeartV3TissueSections) await scriptFile("../heart-study-v3/tissue-sections.js");\n',
  '      if (!window.EcgWallRims) await scriptFile("wall-rims.js");\n'
];
const bankCorrections = [
  {index: 128, field: 'q',
    before: 'Why is the LEFT ventricle much larger/thicker than the right?',
    after: 'Why does the LEFT ventricle have a thicker muscular wall than the right?'},
  {index: 128, field: 'e',
    before: 'The left ventricle is much larger because it must pump blood through the systemic circuit to the entire body.',
    after: 'The left ventricle has a thicker muscular wall because it generates the higher pressure needed for the systemic circuit. This does not mean it normally pumps more forward blood than the right ventricle or must have a larger cavity. Course PDF p127 uses size shorthand; wall thickness is the intended distinction.'},
  {index: 582, field: 'o', option: 0,
    before: "Systole: ventricles contract, semilunar valves OPEN, body receives blood / Diastole: ventricles fill, semilunar valves CLOSED, blood circulates through the heart's own pathway",
    after: 'Ventricular systole: isovolumetric contraction then ejection through open semilunar valves / Diastole: relaxation then filling'},
  {index: 582, field: 'e',
    before: "Systole = pressure in the arteries as the ventricles contract; semilunar valves OPEN; blood takes the path of least resistance to the body. Diastole = pressure as the ventricles fill; semilunar valves CLOSED; when the valves close, blood is circulated through the heart's own coronary pathway.",
    after: 'Ventricular systole begins with isovolumetric contraction: both valve pairs are closed. Semilunar valves open for ejection when ventricular pressure exceeds arterial pressure. Diastole begins with isovolumetric relaxation, then AV valves open for filling. Left-coronary flow is greatest during diastole; it is not an on/off pathway created by valve closure. Course PDF p180 summarizes systole/diastole; these phase distinctions clarify that shorthand.'}
];
const manifestPaths = [
  'heart-study-v3/anatomy.js', 'heart-study-v3/renderer.js',
  'heart-study-v3/assets/source-geometry.js', 'heart-study-v3/assets/source-inventory.json',
  attributionFile, 'heart-study-v3/assets/CC-BY-4.0.txt',
  'heart-study-v3/vendor/shape-utils.min.js', 'heart-study-v3/vendor/THREE-LICENSE.txt',
  'heart-study-v3/vendor/EARCUT-LICENSE.txt', 'heart-study-v3/vendor/BUILD.md',
  'heart-study-v3/tissue-sections.js', 'heart-study-v3/sourced-anatomy.js', 'heart-study-v3/course.js'
];
const receipt = {
  schema: 'heart-v3-known-historical-delta-audit-1', startedAt: new Date().toISOString(),
  sourceRoot: source, testCheckout: repo, frozenCommit, baselineFile, baselineSHA256,
  assertions: [], originalContract: {aggregateExecution: 'NOT_RUN_BY_THIS_AUDIT', comparisonStatus: 'NOT_CHECKED'},
  dispositions: [
    {file: ecgFile, firstDivergence: '8d7f220b28cc97fe3ee7db561cc082a6d1dcbec7',
      disposition: 'Retain exactly three local lazy dependency loads for the historical wall-rim teaching overlay.'},
    {file: attributionFile, firstDivergence: '885df69c05c932d3b92559d1db93c9d6d9200988',
      disposition: 'Retain the frozen truthful source/reconstruction distinction and ShapeUtils/Earcut notices.'},
    {file: manifestFile, firstDivergence: '885df69c05c932d3b92559d1db93c9d6d9200988',
      disposition: 'Retain the frozen semantic metadata and exact file list; sizes/hashes must match final runtime, including formerly stale entries.'},
    {file: 'index.html / cmt-quiz.html BANK literal', firstDivergence: '885df69c05c932d3b92559d1db93c9d6d9200988',
      disposition: 'Retain only the two exact course-wording corrections at positions 128 and 582; preserve all 611 positions, answer keys and source-reference fields.'}
  ],
  limitations: [
    'A passing separate audit does not turn the original fixed preservation aggregate green.',
    'Static bytes, exact historical text deltas and manifest integrity only; current ECG/browser interactions require actual runtime tests.',
    'Historical source/course provenance is documented; this is not new educator, specialist, physical-device or clinical validation.'
  ]
};
function check(name, fn) {
  try { const value = fn(); receipt.assertions.push({name, pass: true, ...(value === undefined ? {} : {value})}); return value; }
  catch (error) { receipt.assertions.push({name, pass: false, error: error.message}); return undefined; }
}
function bankLiteral(file) {
  const value = read(file).toString().match(/const BANK = (\[[\s\S]*?\n\]);/)?.[1];
  A.ok(value, 'Expected the original BANK declaration in ' + file); return value;
}
const parseBank = literal => JSON.parse(JSON.stringify(vm.runInNewContext('(' + literal + ')', {}, {timeout: 3000})));

try {
  const baseline = check('Fixed original baseline is unchanged and no override is accepted', () => {
    A.equal(process.env.HEART_V3_PRESERVATION_BASE_COMMIT, undefined, 'Unset HEART_V3_PRESERVATION_BASE_COMMIT; this audit accepts no replacement original contract.');
    const bytes = fs.readFileSync(path.join(repo, baselineFile)); A.equal(sha(bytes), baselineSHA256);
    A.equal(sha(fs.readFileSync(path.join(repo, 'tools/heart-v3/teaching-clarity-preservation.cjs'))), originalTestSHA256);
    const data = JSON.parse(bytes); A.equal(Object.keys(data.protectedSHA256).length, 25); A.equal(data.expectedBankCount, 611); return data;
  });
  if (!baseline) throw Error('Cannot audit history without the unchanged original preservation contract.');

  receipt.protectedComparison = [];
  for (const [file, expected] of Object.entries(baseline.protectedSHA256)) {
    const item = check('Read protected original: ' + file, () => ({file, expected, actual: sha(read(file))}));
    if (item) receipt.protectedComparison.push(item);
    if (!historicalFiles.includes(file)) check('Untouched original protected bytes: ' + file, () => A.equal(item?.actual, expected));
  }
  check('Exactly the three documented protected-file deltas remain', () => {
    const actual = receipt.protectedComparison.filter(x => x.actual !== x.expected).map(x => x.file).sort();
    A.deepEqual(actual, historicalFiles.slice().sort()); return actual;
  });
  for (const [file, expected] of Object.entries(frozenSHA256)) {
    check('Frozen 743 ECG/source dependency retained: ' + file, () => A.equal(sha(read(file)), expected));
  }
  // This shared helper was not protected by the original fingerprint contract.
  // The successor may optimize it while retaining exact geometry output. Record
  // its byte delta explicitly; fresh geometry and actual ECG browser regression
  // receipts must qualify that change outside this static historical audit.
  receipt.sharedHelper = check('Record the shared ECG/heart tissue helper identity', () => {
    const file = 'heart-study-v3/tissue-sections.js', actualSHA256 = sha(read(file));
    const frozenSHA256 = 'bd54e734000a8bc1d67a21ea50da5614ac2e066522dfd7dca99d90c5de075ac8';
    return {file, frozenSHA256, actualSHA256, bytesDifferFrom743: actualSHA256 !== frozenSHA256,
      requiredExternalProof: 'Exact section/cavity geometry equivalence plus current full ECG viewer/rim/browser checks. This static audit does not certify runtime equivalence.'};
  });
  check('Entire ECG module differs from original by precisely three lazy-load lines', () => {
    let normalized = read(ecgFile).toString();
    for (const line of loadAdditions) { A.equal(normalized.split(line).length, 2, 'Expected exactly one occurrence of ' + line.trim()); normalized = normalized.replace(line, ''); }
    A.equal(sha(normalized), baseline.protectedSHA256[ecgFile]); return {addedLines: loadAdditions.map(x => x.trim()), normalizedSHA256: sha(normalized)};
  });

  receipt.bankLiteralComparison = [];
  for (const file of ['index.html', 'cmt-quiz.html']) check('Read original BANK literal fingerprint: ' + file, () => {
    const actual = sha(bankLiteral(file)); receipt.bankLiteralComparison.push({file, expected: baseline.bankLiteralSHA256, actual}); return actual;
  });
  check('BANK retains the frozen literal with exactly the two original-wording deltas', () => {
    const literal = bankLiteral('index.html'); A.equal(literal, bankLiteral('cmt-quiz.html'));
    A.equal(sha(literal), '462b8ec0be0627d4ee2ba2e596ae1766887d5c3d1776ef45b5a9d66585626d13');
    const current = parseBank(literal); A.equal(current.length, 611); let normalized = literal;
    for (const change of bankCorrections) {
      A.equal(change.option === undefined ? current[change.index][change.field] : current[change.index][change.field][change.option], change.after);
      const after = JSON.stringify(change.after); A.equal(normalized.split(after).length, 2, 'Expected exactly one known corrected string at position ' + change.index);
      normalized = normalized.replace(after, JSON.stringify(change.before));
    }
    A.equal(sha(normalized), baseline.bankLiteralSHA256, 'Reversing only the four known string changes must restore the entire original bank literal.');
    const original = parseBank(normalized), deltas = [];
    for (let i = 0; i < current.length; i++) {
      for (const field of ['a', 'id', 't', 'module', 'unit', 'studyRef']) A.deepEqual(current[i][field], original[i][field], 'Original position/key/reference retained at ' + i + ':' + field);
      if (JSON.stringify(current[i]) !== JSON.stringify(original[i])) deltas.push({index: i, changedFields: Object.keys(current[i]).filter(k => JSON.stringify(current[i][k]) !== JSON.stringify(original[i][k]))});
    }
    A.deepEqual(deltas, [{index: 128, changedFields: ['q', 'e']}, {index: 582, changedFields: ['o', 'e']}]);
    A.equal(current[128].a, 1); A.equal(current[582].a, 0);
    receipt.bank = {count: 611, originalSHA256: sha(normalized), frozenSHA256: sha(literal), deltas, hasExplicitIds: current.some(q => Object.hasOwn(q, 'id')), identity: 'Retained array position; BANK has no explicit item IDs.'};
    return receipt.bank;
  });

  const manifest = check('Read declared model manifest', () => JSON.parse(read(manifestFile)));
  if (manifest) check('Manifest semantic fields and file list retain the frozen historical representation', () => {
    const current = manifest, inventory = JSON.parse(read('heart-study-v3/assets/source-inventory.json'));
    const semantic = {...current, files: current.files.map(x => ({file: x.file}))};
    A.deepEqual(semantic, {
      schema: 'heart-v3-anatomy-manifest-1', sourceCommit: 'f1a3a63f110e27ff0736047d52d04dba5d3087f9',
      sourceMeshes: 51, sourceTriangles: 208978, sourceLicense: 'CC BY 4.0', sources: inventory.sources,
      sourceBytesUnchangedAt: 'ecg-study/assets/model-data.js',
      derivative: 'Shared registration and 1e-6 display-unit quantization; all source triangles retained',
      sourceUnits: 'Not established; display units are not millimeters',
      internalRepresentation: 'Original HRA gross surfaces with one shared transform and an in-place oblique teaching section; supplementary boundary-registered valve leaflets/chordae, not measured blood cavities',
      modelSeparation: 'Numerical blood volume drives a bounded shared illustrative deformation field on original tissue and matching vessels. These surfaces are not calibrated cavity-volume measurements. Molecular fields do not compute circulation.',
      processingCommand: 'node tools/heart-v3/derive-geometry.cjs',
      validationCommands: ['node tools/heart-v3/geometry.cjs', 'node tools/heart-v3/sourced-anatomy-browser.cjs', 'node tools/heart-v3/geometry-offscreen-browser.cjs', 'node tools/heart-v3/geometry-profile.cjs'],
      files: manifestPaths.map(file => ({file}))
    });
    for (const entry of current.files) A.deepEqual(Object.keys(entry).sort(), ['bytes', 'file', 'sha256']);
    return current;
  });
  receipt.manifestIntegrity = [];
  if (manifest && Array.isArray(manifest.files)) for (const declared of manifest.files) {
    check('Declared manifest bytes/hash match final source: ' + declared.file, () => {
      A.ok(manifestPaths.includes(declared.file), 'Unexpected manifest file; review its scope before extending the historical contract.');
      const bytes = read(declared.file), actual = {bytes: bytes.length, sha256: sha(bytes)};
      receipt.manifestIntegrity.push({file: declared.file, declared: {bytes: declared.bytes, sha256: declared.sha256}, actual});
      A.deepEqual(actual, {bytes: declared.bytes, sha256: declared.sha256}, 'Stale manifest entry. After code freeze run node tools/heart-v3/geometry-manifest.cjs, inspect the metadata-only diff, then rerun this separate audit.');
    });
  }
  const mismatches = receipt.protectedComparison.filter(x => x.expected !== x.actual);
  const bankLiteralMismatch = receipt.bankLiteralComparison.some(x => x.actual !== x.expected);
  receipt.originalContract = {comparisonStatus: mismatches.length || bankLiteralMismatch ? 'FAIL' : 'PASS', aggregateExecution: 'NOT_RUN_BY_THIS_AUDIT', protectedMismatches: mismatches, bankLiteralMismatch,
    explanation: 'The unchanged original aggregate still rejects these historical bytes. A separate historical audit PASS does not override its fixed reviewed fingerprints or claim its runtime suites executed.'};
  check('Original fixed contract remains explicitly FAIL', () => A.equal(receipt.originalContract.comparisonStatus, 'FAIL'));
} catch (error) { receipt.assertions.push({name: 'Audit can complete', pass: false, error: error.stack || error.message}); }
finally {
  receipt.status = receipt.assertions.some(x => !x.pass) ? 'HISTORICAL_DELTA_FAIL' : 'HISTORICAL_DELTA_PASS';
  receipt.endedAt = new Date().toISOString();
  const run = path.join(output, receipt.startedAt.replace(/[:.]/g, '-')); fs.mkdirSync(run, {recursive: true});
  const result = path.join(run, 'result.json'); fs.writeFileSync(result, JSON.stringify(receipt, null, 2) + '\n');
  fs.writeFileSync(path.join(output, 'latest.json'), JSON.stringify({status: receipt.status, result}, null, 2) + '\n');
  console.log(JSON.stringify({status: receipt.status, originalFixedContract: receipt.originalContract.comparisonStatus, assertions: receipt.assertions.length, failures: receipt.assertions.filter(x => !x.pass).map(x => ({name: x.name, error: x.error})), result}));
  if (receipt.status !== 'HISTORICAL_DELTA_PASS') process.exitCode = 1;
}
