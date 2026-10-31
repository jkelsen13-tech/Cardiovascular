/* Deterministic, allowlisted Heart v3 preview preparation. Never publishes. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const http = require('node:http');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');

const REPO = path.resolve(__dirname, '../..');
const TEMPLATE = path.join(__dirname, 'public-template');
const SCHEMA = 'heart-v3-public-preview-1';
const PREVIEW_KEY = 'cmt.heart.preview.progress.v1';
const DEFAULT_OUTPUT = '/workspace/scratch/heart-v3-public-candidate/heart-v3-preview';
const RUNTIME = [
  'heart-study-v3/module.js', 'heart-study-v3/module.css',
  'heart-study-v3/model.js', 'heart-study-v3/flow.js', 'heart-study-v3/anatomy.js',
  'heart-study-v3/renderer.js', 'heart-study-v3/content.js', 'heart-study-v3/course.js', 'heart-study-v3/vendor/shape-utils.min.js', 'heart-study-v3/vendor/THREE-LICENSE.txt', 'heart-study-v3/vendor/EARCUT-LICENSE.txt', 'heart-study-v3/vendor/BUILD.md', 'heart-study-v3/tissue-sections.js', 'heart-study-v3/sourced-anatomy.js',
  'heart-study-v3/explorer.js', 'heart-study-v3/explorer.css',
  'heart-study-v3/detail.js', 'heart-study-v3/assets/source-geometry.js',
  'heart-study-v3/assets/source-inventory.json',
  'heart-study-v3/assets/model-manifest.json',
  'heart-study-v3/assets/ATTRIBUTION.md',
  'heart-study-v3/assets/CC-BY-4.0.txt',
  'ecg-study/vendor/three-gltf.min.js', 'ecg-study/vendor/THREE-LICENSE.txt'
];
const TEMPLATES = [
  'index.html', 'preview.css', 'preview.js', 'START-HERE.md', 'COPYRIGHT.md',
  'docs/HEART-V3-NUMERICAL-MODEL.md', 'docs/HEART-V3-ANATOMY.md',
  'docs/HEART-V3-INTERFACE.md'
];
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function json(value) { return Buffer.from(JSON.stringify(value, null, 2) + '\n'); }
function exact(text, from, to, label) {
  const count = text.split(from).length - 1;
  assert.equal(count, 1, 'Source contract changed: ' + label + ' (expected one match, found ' + count + ')');
  return text.replace(from, to);
}
function git(args) {
  try { return execFileSync('git', ['-C', REPO, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch (_) { return null; }
}
function listFiles(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(item => {
    assert.ok(!item.isSymbolicLink(), 'Symlink excluded: ' + item.name);
    const relative = prefix + item.name;
    return item.isDirectory() ? listFiles(path.join(dir, item.name), relative + '/') : [relative];
  }).sort();
}
function localDependencies(source) {
  return [...new Set(Array.from(source.matchAll(/\b(?:script|stylesheet)\(\s*(['"])([^'"]+)\1\s*\)/g), match => match[2]))].sort();
}
function readInputs() {
  return [
    ...RUNTIME.map(relative => ({ source: relative, output: relative, absolute: path.join(REPO, relative), kind: 'runtime' })),
    ...TEMPLATES.map(relative => ({ source: 'tools/heart-v3/public-template/' + relative, output: relative, absolute: path.join(TEMPLATE, relative), kind: 'template' })),
    { source: 'tools/heart-v3/package-public.cjs', output: null, absolute: __filename, kind: 'build-tool' }
  ].map(input => {
    assert.ok(fs.statSync(input.absolute).isFile(), 'Missing allowlisted input: ' + input.source);
    const bytes = fs.readFileSync(input.absolute);
    return { ...input, bytes, sha256: sha(bytes) };
  });
}
function adapt(inputs) {
  const outputs = new Map();
  for (const input of inputs) if (input.output) outputs.set(input.output, { bytes: input.bytes, source: input.source, adaptations: [] });
  function textFile(relative, transform, adaptations) {
    const file = outputs.get(relative);
    file.bytes = Buffer.from(transform(file.bytes.toString('utf8')));
    file.adaptations = adaptations;
  }
  textFile('heart-study-v3/module.js', source => {
    source = exact(source, "const KEY = 'cmt.heart.v3.progress.v1';", "const KEY = '" + PREVIEW_KEY + "';", 'preview storage namespace');
    source = exact(source, "${window.CardiorespiratoryStudy?button('Heart v2 · lessons & 30 questions','legacy')+button('Lungs · resume location','lungs'):''}", '', 'remove legacy launch controls');
    source = exact(source, "else if(a==='legacy'){close();window.CardiorespiratoryStudy?.open('heart');}else if(a==='lungs'){close();window.CardiorespiratoryStudy?.open('respiratory',{resume:true});}", '', 'remove legacy handlers');
    source = exact(source, "button('All study modes','home')", "button('Preview menu','home')", 'preview home label');
    return exact(source,
      'ASPT outline and supplied course clarification remain in the preserved Heart v2 lessons. The new microscopic routes are labeled deeper mechanism, with sources at each stage. This educational model has no diagnostic or patient-specific claim.',
      'The four connected routes use independently authored teaching reconstructions, with public scientific citations at each stage. This heart-only educational model has no diagnostic or patient-specific claim.',
      'preview source summary');
  }, ['storage-key-only-in-copy', 'remove-legacy-navigation', 'preview-menu-label', 'public-source-summary']);
  textFile('heart-study-v3/content.js', source => {
    for (const id of ['h3-aspt', 'h3-course']) {
      const pattern = new RegExp("^  '" + id + "':[^\\n]*\\n", 'gm');
      assert.equal((source.match(pattern) || []).length, 1, 'Private descriptor contract changed: ' + id);
      source = source.replace(pattern, '');
    }
    return source;
  }, ['remove-unused-private-source-descriptors']);
  textFile('heart-study-v3/explorer.js', source => {
    source = exact(source, 'Deep-study checks do not change your course or ASPT mock history.', 'Deep-study checks stay in this preview’s separate history.', 'preview practice scope');
    return exact(source, 'New microdetail: Deeper mechanism. ASPT outline and Course clarification are recorded separately in coverage; no new official exam weighting is claimed. Original authored copy and geometry; no textbook figures embedded.', 'Representative microdetail: deeper mechanism. Public scientific references support the explanations; no textbook figures are embedded. Original authored copy and geometry.', 'public route evidence summary');
  }, ['preview-practice-scope', 'public-route-source-summary']);
  textFile('heart-study-v3/assets/ATTRIBUTION.md', source => {
    source = exact(source, 'Original GLB bytes in `../../ecg-study/assets/model-data.js` remain unchanged.', 'Original source GLB identities and public upstream URLs are recorded in `source-inventory.json`; the complete private source archive is not included in this preview.', 'source archive boundary');
    return exact(source, 'reproducible processing is `../../tools/heart-v3/derive-geometry.cjs`.', 'the source project records reproducible processing as `node tools/heart-v3/derive-geometry.cjs` (not a runtime dependency or file shipped here).', 'derivation script boundary');
  }, ['source-archive-boundary', 'derivation-script-boundary']);
  const anatomy = JSON.parse(outputs.get('heart-study-v3/assets/model-manifest.json').bytes);
  delete anatomy.sourceBytesUnchangedAt;
  anatomy.previewScope = 'Heart-only derivative; original source archives and project tooling are not included.';
  anatomy.sourceArchiveIncluded = false;
  anatomy.sourceFiles = anatomy.files;
  anatomy.files = anatomy.files.map(file => {
    const output = outputs.get(file.file);
    assert.ok(output, 'Anatomy manifest refers to a non-allowlisted runtime file: ' + file.file);
    return { file: file.file, bytes: output.bytes.length, sha256: sha(output.bytes) };
  });
  outputs.set('heart-study-v3/assets/model-manifest.json', {
    ...outputs.get('heart-study-v3/assets/model-manifest.json'), bytes: json(anatomy),
    adaptations: ['public-anatomy-manifest-scope', 'refresh-adapted-file-hashes', 'preserve-original-source-file-hashes']
  });
  return outputs;
}
function staticCheck(directory) {
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'PUBLIC-MANIFEST.json'), 'utf8'));
  assert.equal(manifest.schema, SCHEMA);
  assert.equal(manifest.progressKey, PREVIEW_KEY);
  const expected = [...manifest.files.map(file => file.file), 'PUBLIC-MANIFEST.json', 'SHA256SUMS.txt'].sort();
  assert.deepEqual(listFiles(directory), expected, 'Package has non-allowlisted or missing files');
  for (const file of manifest.files) {
    const bytes = fs.readFileSync(path.join(directory, file.file));
    assert.equal(bytes.length, file.bytes, 'Byte length: ' + file.file);
    assert.equal(sha(bytes), file.sha256, 'Output hash: ' + file.file);
    if (file.file.endsWith('.js')) new vm.Script(bytes.toString('utf8'), { filename: file.file });
    assert.ok(!/\.(?:pdf|docx?|pptx?|jpe?g|png|mp4|webm|zip|bundle)$/i.test(file.file), 'Restricted/media extension: ' + file.file);
  }
  for (const line of fs.readFileSync(path.join(directory, 'SHA256SUMS.txt'), 'utf8').trim().split('\n')) {
    const match = /^([0-9a-f]{64})  (.+)$/.exec(line);
    assert.ok(match, 'Malformed checksum entry');
    assert.equal(sha(fs.readFileSync(path.join(directory, match[2]))), match[1], 'Checksum file: ' + match[2]);
  }
  const moduleText = fs.readFileSync(path.join(directory, 'heart-study-v3/module.js'), 'utf8');
  const dependencies = localDependencies(moduleText);
  assert.ok(RUNTIME.includes('heart-study-v3/flow.js'), 'Flow annotation must remain explicitly allowlisted');
  assert.ok(dependencies.includes('heart-study-v3/flow.js'), 'Controller must load its flow annotation dependency');
  for (const dependency of dependencies) {
    assert.ok(RUNTIME.includes(dependency), 'Controller dependency is not explicitly allowlisted: ' + dependency);
    assert.ok(manifest.files.some(file => file.file === dependency), 'Controller dependency omitted from package: ' + dependency);
    assert.ok(fs.existsSync(path.join(directory, dependency)), 'Missing controller dependency: ' + dependency);
  }
  const flowSandbox = { module: { exports: {} } };
  vm.runInNewContext(fs.readFileSync(path.join(directory, 'heart-study-v3/flow.js'), 'utf8'), flowSandbox);
  assert.equal(flowSandbox.module.exports.itinerary.length, 17, 'Complete blood itinerary annotation');
  assert.deepEqual(Array.from(flowSandbox.module.exports.itinerary.filter(stop => stop.kind !== 'heart'), stop => stop.kind), ['lung', 'body']);
  assert.ok(moduleText.includes("const KEY = '" + PREVIEW_KEY + "';"));
  assert.ok(!moduleText.includes('cmt.heart.v3.progress.v1'));
  assert.ok(!moduleText.includes('CardiorespiratoryStudy'));
  assert.ok(!moduleText.includes('Heart v2'));
  const sandbox = { module: { exports: {} } };
  vm.runInNewContext(fs.readFileSync(path.join(directory, 'heart-study-v3/content.js'), 'utf8'), sandbox);
  const content = sandbox.module.exports;
  assert.deepEqual(Array.from(content.routes, route => route.id), ['routeA', 'routeB', 'routeC', 'routeD']);
  assert.equal(content.routes.reduce((sum, route) => sum + route.stages.length, 0), 26);
  assert.ok(!content.sources['h3-aspt'] && !content.sources['h3-course']);
  for (const stage of content.routes.flatMap(route => Array.from(route.stages))) for (const ref of stage.sourceRefs) assert.match(content.sources[ref]?.url || '', /^https:\/\//, 'Public source for ' + stage.id);
  const attribution = fs.readFileSync(path.join(directory, 'heart-study-v3/assets/ATTRIBUTION.md'), 'utf8');
  assert.match(attribution, /Kristen Browne and Heidi Schlehlein/);
  assert.match(attribution, /Creative Commons Attribution 4\.0/);
  assert.match(fs.readFileSync(path.join(directory, 'ecg-study/vendor/THREE-LICENSE.txt'), 'utf8'), /Copyright © 2010-2025 three\.js authors/);
  assert.match(fs.readFileSync(path.join(directory, 'ecg-study/vendor/THREE-LICENSE.txt'), 'utf8'), /permission notice shall be included/);
  const anatomy = JSON.parse(fs.readFileSync(path.join(directory, 'heart-study-v3/assets/model-manifest.json'), 'utf8'));
  assert.equal(anatomy.sourceArchiveIncluded, false);
  for (const file of anatomy.files) assert.equal(sha(fs.readFileSync(path.join(directory, file.file))), file.sha256, 'Anatomy package hash: ' + file.file);
  for (const file of manifest.files.filter(file => /\.(?:html|md)$/.test(file.file))) {
    const text = fs.readFileSync(path.join(directory, file.file), 'utf8');
    const links = file.file.endsWith('.html') ? Array.from(text.matchAll(/(?:href|src)="([^"]+)"/g), match => match[1]) : Array.from(text.matchAll(/\]\(([^)]+)\)/g), match => match[1]);
    for (const link of links) if (!/^(?:https?:|#|mailto:)/.test(link)) {
      assert.ok(!link.startsWith('/'), 'Root-relative link: ' + link);
      const target = path.resolve(path.dirname(path.join(directory, file.file)), link.split('#')[0]);
      assert.ok(target.startsWith(directory + path.sep), 'Link escapes preview: ' + link);
      assert.ok(fs.existsSync(target), 'Missing local link: ' + file.file + ' → ' + link);
    }
  }
  return { passed: true, sourceSnapshot: manifest.sourceSnapshot, files: manifest.files.length, bytes: manifest.files.reduce((sum, file) => sum + file.bytes, 0), progressKey: PREVIEW_KEY, restrictedMedia: 0, publicStages: 26, bloodItineraryStops: 17, localDependencies: dependencies };
}
function build(output) {
  assert.equal(path.basename(output), 'heart-v3-preview', 'Output must be the heart-v3-preview subdirectory');
  assert.ok(output !== REPO && !REPO.startsWith(output + path.sep), 'Output cannot replace source project');
  assert.ok(!fs.existsSync(output), 'Use a fresh output directory; prepared or historical previews are never overwritten: ' + output);
  const inputs = readInputs();
  const sourceSnapshot = sha(Buffer.from(inputs.map(input => input.source + '\0' + input.sha256).sort().join('\n')));
  const outputs = adapt(inputs);
  const manifest = {
    schema: SCHEMA, scope: 'Prepared heart-only public preview; no publication performed', subpath: '/heart-v3-preview/',
    progressKey: PREVIEW_KEY, sourceSnapshot,
    sourceIdentity: { commit: git(['rev-parse', 'HEAD']), tree: git(['rev-parse', 'HEAD^{tree}']), workingTreeDirty: !!git(['status', '--porcelain']), authority: 'Exact input/output hashes control this candidate; HEAD alone may predate working files.' },
    excluded: ['private course/media', 'university/reference recordings', 'old quiz/question banks', 'respiratory runtime', 'legacy study navigation', 'private progress migration', 'repository history', 'tool dependencies'],
    inputs: inputs.map(input => ({ source: input.source, kind: input.kind, bytes: input.bytes.length, sha256: input.sha256 })),
    files: [...outputs].sort(([a], [b]) => a.localeCompare(b)).map(([file, outputFile]) => ({ file, source: outputFile.source, adaptations: outputFile.adaptations, bytes: outputFile.bytes.length, sha256: sha(outputFile.bytes) }))
  };
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const stage = fs.mkdtempSync(path.join(path.dirname(output), '.heart-v3-preview-build-'));
  try {
    for (const [relative, file] of outputs) { const target = path.join(stage, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, file.bytes); }
    fs.writeFileSync(path.join(stage, 'PUBLIC-MANIFEST.json'), json(manifest));
    const sums = [...outputs.keys(), 'PUBLIC-MANIFEST.json'].sort().map(relative => sha(fs.readFileSync(path.join(stage, relative))) + '  ' + relative).join('\n') + '\n';
    fs.writeFileSync(path.join(stage, 'SHA256SUMS.txt'), sums);
    for (const input of inputs) assert.equal(sha(fs.readFileSync(input.absolute)), input.sha256, 'Source changed during build; rerun: ' + input.source);
    staticCheck(stage);
    assert.ok(!fs.existsSync(output), 'Output appeared during preparation; existing artifacts were preserved: ' + output);
    fs.renameSync(stage, output);
    return staticCheck(output);
  } finally { if (fs.existsSync(stage)) fs.rmSync(stage, { recursive: true }); }
}
async function browserCheck(directory) {
  const { chromium } = require('playwright');
  const parent = path.dirname(directory), requests = [], errors = [], failures = [], responses = [];
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.md': 'text/plain', '.txt': 'text/plain' };
  const server = http.createServer((req, res) => {
    let target;
    try { target = path.resolve(parent, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname)); } catch (_) { res.writeHead(400).end(); return; }
    if (!target.startsWith(directory + path.sep) && target !== directory) { res.writeHead(404).end(); return; }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' }); fs.createReadStream(target).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port, base = origin + '/heart-v3-preview/';
  let browser;
  const evidence = path.join(parent, 'verification'); fs.mkdirSync(evidence, { recursive: true });
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
    const page = await browser.newPage({ viewport: { width: 1024, height: 900 }, reducedMotion: 'reduce' });
    const sentinels = { 'cmt.heart.v3.progress.v1': 'private-heart-sentinel', 'cmt.aspt.mock.v1': 'mock-sentinel', 'cmt.simulators.progress.v1': 'simulator-lung-sentinel', 'cmt.respiratory.preview.progress.v1': 'respiratory-preview-sentinel', 'cmt.progress.v1': 'live-study-sentinel' };
    await page.addInitScript(values => { for (const [key, value] of Object.entries(values)) if (localStorage.getItem(key) === null) localStorage.setItem(key, value); }, sentinels);
    page.on('request', request => requests.push(request.url()));
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => failures.push({ url: request.url(), error: request.failure()?.errorText }));
    page.on('response', response => { if (response.status() >= 400) responses.push({ url: response.url(), status: response.status() }); });
    await page.goto(base, { waitUntil: 'load' });
    assert.equal(await page.locator('#heartV3Launch').count(), 1);
    await page.locator('#heartV3Launch').click();
    await page.waitForFunction(() => !!window.HeartV3Study?.inspect().renderer, null, { timeout: 45000 });
    assert.equal(await page.evaluate(() => HeartV3Study.inspect().progressKey), PREVIEW_KEY);
    assert.equal(await page.locator('[data-h3-action="legacy"],[data-h3-action="lungs"]').count(), 0);
    await page.locator('[data-h3-inspector]').evaluate(e => e.open = true);
    await page.selectOption('[data-h3-select]', 'rv');
    await page.locator('[data-h3-preset="right"]').click();
    await page.locator('[data-h3-scrub]').evaluate(input => { input.value = '.36'; input.dispatchEvent(new Event('input', { bubbles: true })); });
    const retained = await page.evaluate(() => ({ camera: HeartV3Study.inspect().camera, time: HeartV3Study.getState().time }));
    const host = page.locator('[data-h3-explorer-host]'), journeys = [];
    for (const route of ['routeA', 'routeB', 'routeC', 'routeD']) {
      await page.locator('[data-h3-action="route"][data-h3-route="' + route + '"]').click();
      await page.waitForFunction(route => HeartV3Study.inspect().detail?.stage?.startsWith(route + '.'), route);
      const stages = await page.evaluate(route => HeartV3Content.routes.find(item => item.id === route).stages.map(stage => stage.key), route);
      for (let index = 0; index < stages.length; index++) {
        if (index) await host.locator('[data-h3-next]').click();
        await page.waitForFunction(stage => HeartV3Study.inspect().detail?.stage === stage, stages[index]);
        await page.locator('.h3-stage').scrollIntoViewIfNeeded();
        await page.waitForFunction(stage => HeartV3Study.inspect().renderer?.lastRenderedDetailStage === stage, stages[index]);
        const current = await page.evaluate(() => HeartV3Study.inspect());
        assert.equal(current.explorer.source.selected, 'rv'); assert.equal(current.state.time, retained.time);
        assert.equal(current.renderer.activeRendererCount, 1); assert.equal(current.detail.rendererAllocated, false);
        journeys.push({ stage: stages[index], paintedStage: current.renderer.lastRenderedDetailStage, source: current.explorer.source.selected, pausedTime: current.state.time });
      }
      await host.locator('[data-h3-return]').click();
      assert.deepEqual(await page.evaluate(() => HeartV3Study.inspect().camera), retained.camera);
      assert.equal(await page.evaluate(() => HeartV3Study.getState().time), retained.time);
    }
    await page.locator('[data-h3-action="independent"]').click();
    const previewRaw = await page.evaluate(key => localStorage.getItem(key), PREVIEW_KEY);
    assert.equal(JSON.parse(previewRaw).attempts.length, 1);
    assert.deepEqual(await page.evaluate(keys => Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)])), Object.keys(sentinels)), sentinels);
    await page.locator('[data-h3-action="play"]').click(); await page.waitForTimeout(200);
    await page.locator('[data-h3-action="home"]').click();
    const closed = await page.evaluate(() => ({ inspection: HeartV3Study.inspect(), canvases: document.querySelectorAll('#heartV3Study canvas').length, menuHidden: document.getElementById('homeMenu').classList.contains('hidden') }));
    assert.equal(closed.inspection.active, false); assert.equal(closed.inspection.rafRunning, false); assert.equal(closed.canvases, 0); assert.equal(closed.menuHidden, false);
    await page.reload(); await page.locator('#heartV3Launch').click(); await page.waitForFunction(() => !!HeartV3Study.inspect().renderer);
    assert.equal(await page.evaluate(() => HeartV3Study.inspect().progress.attempts.length), 1);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), PREVIEW_KEY), previewRaw);
    assert.deepEqual(await page.evaluate(keys => Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)])), Object.keys(sentinels)), sentinels);
    await page.locator('[data-h3-action="home"]').click();
    await page.screenshot({ path: path.join(evidence, 'preview-menu.png') });
    assert.equal(await page.locator('a[href="COPYRIGHT.md"]').count(), 1);
    for (const relative of ['COPYRIGHT.md', 'docs/HEART-V3-NUMERICAL-MODEL.md', 'docs/HEART-V3-ANATOMY.md', 'docs/HEART-V3-INTERFACE.md', 'heart-study-v3/assets/ATTRIBUTION.md', 'heart-study-v3/assets/CC-BY-4.0.txt', 'ecg-study/vendor/THREE-LICENSE.txt']) assert.equal((await page.request.get(base + relative)).status(), 200, 'Published-scope local notice: ' + relative);
    assert.ok(requests.every(url => url.startsWith(base) || url.startsWith('data:') || url.startsWith('blob:')), 'Request outside isolated subpath');
    assert.deepEqual(errors, []); assert.deepEqual(failures, []); assert.deepEqual(responses, []);
    const receipt = { passed: true, base, subpath: '/heart-v3-preview/', date: new Date().toISOString(), manifestSha256: sha(fs.readFileSync(path.join(directory, 'PUBLIC-MANIFEST.json'))), sourceSnapshot: staticCheck(directory).sourceSnapshot, browser: browser.version(), environment: 'Cloud Chromium / software WebGL; no physical iPad Safari claim', journeys, exactReturn: retained, progressKey: PREVIEW_KEY, sentinelKeys: Object.keys(sentinels), sentinelsPreserved: true, previewReloadPreserved: true, disposal: { active: closed.inspection.active, rafRunning: closed.inspection.rafRunning, canvases: closed.canvases, menuVisible: !closed.menuHidden }, requests, restrictedRequests: [], errors, failures, responses, publicationPerformed: false };
    fs.writeFileSync(path.join(evidence, 'public-preview-browser.json'), json(receipt));
    return receipt;
  } finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
}
async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) { console.log('node tools/heart-v3/package-public.cjs [--output /parent/heart-v3-preview] [--check-only] [--verify-browser]'); return; }
  const outputFlag = args.indexOf('--output');
  const output = path.resolve(outputFlag < 0 ? DEFAULT_OUTPUT : args[outputFlag + 1]);
  const allowed = new Set(['--output', '--check-only', '--verify-browser']);
  for (let index = 0; index < args.length; index++) { assert.ok(allowed.has(args[index]), 'Unknown option: ' + args[index]); if (args[index] === '--output') { assert.ok(args[index + 1], 'Output path required'); index++; } }
  const receipt = args.includes('--check-only') ? staticCheck(output) : build(output);
  console.log(JSON.stringify({ action: args.includes('--check-only') ? 'verified-existing-package' : 'prepared-local-package', output, ...receipt, published: false }, null, 2));
  if (args.includes('--verify-browser')) { const result = await browserCheck(output); console.log('PASS public preview browser: ' + result.journeys.length + ' UI stages; isolated subpath/network/storage, exact returns and disposal; ' + result.sourceSnapshot); }
}
if (require.main === module) main().catch(error => { console.error(error.stack); process.exitCode = 1; });
module.exports = { build, staticCheck, browserCheck, RUNTIME, TEMPLATES, PREVIEW_KEY, localDependencies };
