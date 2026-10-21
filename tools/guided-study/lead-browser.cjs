/* Native, local-only M07 regression. Authoring does not execute this file.
 * PORT=8859 GUIDED_LEAD_OUT=/absolute/evidence node tools/guided-study/lead-browser.cjs
 * No autoplay override: every playback assertion starts with a real Play click.
 */
'use strict';
const A = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const { chromium } = require('/workspace/cloud-setup/tools/node_modules/playwright');
const repo = path.resolve(__dirname, '../..');
const out = path.resolve(process.env.GUIDED_LEAD_OUT || '/workspace/scratch/heart-guided-audio-20261021/lead-browser');
const url = process.env.CARDIO_BASE_URL || `http://127.0.0.1:${process.env.PORT || 8859}/`;
const origin = new URL(url).origin;
const operationMs = Number(process.env.GUIDED_LEAD_OPERATION_MS || 90000);
const totalMs = Number(process.env.GUIDED_LEAD_TIMEOUT_MS || 720000);
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const read = file => fs.readFileSync(path.join(repo, file));
const copy = value => JSON.parse(JSON.stringify(value));
fs.mkdirSync(out, { recursive: true });
const activityKeys = ['card', 'cardOrder', 'cardReverse', 'cardFlipped', 'quizOrder', 'quiz', 'quizPicked', 'quizTapCorrect', 'quizTapPoint', 'quizScore', 'quizDone'];
const activity = snapshot => Object.fromEntries(activityKeys.map(key => [key, copy(snapshot.state[key])]));
const protectedFiles = [
  'lead-placement/content.js', 'lead-placement/assets/torso-model-data.js',
  'lead-placement/assets/model-manifest.json', 'lead-placement/assets/registered-thorax-manifest.json',
  'ecg-study/content.js', 'ecg-study/module.js',
  'tools/lead-placement/verify.cjs', 'tools/heart-v3/preservation-baseline.json',
  'tools/heart-v3/preservation-audit.cjs'
].filter(file => fs.existsSync(path.join(repo, file)));
const sourceHashes = () => Object.fromEntries(protectedFiles.map(file => [file, sha(read(file))]));
const sourceBefore = sourceHashes();
const courseContext = {};
vm.runInNewContext(read('lead-placement/content.js').toString() + '\nthis.course = LEAD_PLACEMENT;', courseContext);
const course = copy(courseContext.course);
const modelContext = { window: {} };
vm.runInNewContext(read('lead-placement/assets/torso-model-data.js').toString(), modelContext);
const model = modelContext.window.LeadTorsoModelData;
const encoded = model.registered || model.thorax || model.skin;
const glb = Buffer.from(encoded, 'base64');
A.equal(glb.readUInt32LE(0), 0x46546c67, 'Actual source is a GLB');
const gltf = JSON.parse(glb.subarray(20, 20 + glb.readUInt32LE(12)).toString());
const manifest = JSON.parse(read('lead-placement/assets/registered-thorax-manifest.json'));
A.equal(sha(glb), manifest.optimized.sha256, 'Decoded source GLB matches its retained source manifest');
A.equal(sourceBefore['lead-placement/content.js'], '2f84b5b0c03161c2531988983ac5932c1615014bda8c00161f824e22fe70d62d', 'Original lead course data remains unchanged');
A.equal(sourceBefore['lead-placement/assets/registered-thorax-manifest.json'], '7562e9306d8365b3dc608eec575c0426bd3eb6f326ac3f5b1a63b821353d6cc0', 'Original registered source manifest remains unchanged');
const expectedSource = { encodedSha256: sha(encoded), encodedBytes: encoded.length, decodedSha256: sha(glb), sourceMeshes: gltf.meshes.length };
A.equal(expectedSource.sourceMeshes, 50, 'The retained source contains 50 actual meshes');
A.equal(course.guided.length, 24);
A.equal(course.cards.length, 22);
const pins = JSON.parse(read('tools/heart-v3/preservation-baseline.json')).protectedSHA256;
A.equal(pins['lead-placement/module.js'], '9c4ce6e2d7be6c4148b4f536fc96678f150cd44a4e096acb0e2c7cfc249e21ee');
A.equal(pins['lead-placement/torso-3d.js'], 'ff84ca8431989e39634173dc29c081194976a9d1a1caa4eaba28485a395b53a9');
const records = [], errors = [], externalRequests = [], audioRequests = [];
let browser, currentPage, phase = 'starting';
const evidence = () => ({ phase, records, errors, externalRequests, audioRequests, sourceBefore, expectedSource });
const checkpoint = value => {
  phase = value;
  fs.writeFileSync(path.join(out, 'progress.json'), JSON.stringify(evidence(), null, 2) + '\n');
  console.log(value);
};
function bounded(promise, label, ms = operationMs) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(Error(`${label} exceeded ${ms} ms`)), ms);
  })]).finally(() => clearTimeout(timer));
}
const evaluate = (page, fn, arg) => bounded(page.evaluate(fn, arg), 'page.evaluate');
async function setup(page) {
  currentPage = page;
  page.setDefaultTimeout(operationMs);
  page.setDefaultNavigationTimeout(45000);
  page.on('pageerror', e => errors.push({ page: page.url(), message: e.message }));
  page.on('request', request => {
    const href = request.url();
    if (/^https?:/.test(href) && new URL(href).origin !== origin) externalRequests.push(href);
    if (/\/M07_\d\d_adam_multilingual_v2\.mp3(?:\?|$)/.test(href)) audioRequests.push(href);
  });
  await page.goto(url);
  await page.waitForFunction(() => typeof GuidedStudy !== 'undefined' && typeof LeadPlacementLab !== 'undefined' && !!LeadPlacementLab?.guided);
  // Open only the player's real disclosure. Initial mount still opens no organ.
  const card = page.locator('#guidedStudyPlayer');
  if (!await card.evaluate(element => element.open)) await card.locator(':scope > summary').click();
}
async function idle(page) {
  await page.waitForFunction(() => !GuidedStudy.session.inspect().busy);
  const s = await evaluate(page, () => GuidedStudy.session.inspect());
  A.equal(s.error, null, `${phase}: ${s.error}`);
  return s;
}
async function snapshot(page) {
  return evaluate(page, () => ({
    session: GuidedStudy.session.inspect(), lead: LeadPlacementLab.guided.capture(),
    media: { time: GuidedStudy.audio.currentTime, paused: GuidedStudy.audio.paused, duration: GuidedStudy.audio.duration, src: GuidedStudy.audio.currentSrc },
    host: Object.assign({}, document.querySelector('#lead3DHost')?.dataset || {}),
    leadVisible: !!document.querySelector('#leadPlacementHome') && !document.querySelector('#leadPlacementHome').classList.contains('hidden'),
    labels: Array.from(document.querySelectorAll('#lead3DHost .lead-3d-marker-button')).filter(el => !el.hidden && getComputedStyle(el).visibility !== 'hidden').map(el => ({ id: el.dataset.marker, text: el.textContent, current: el.getAttribute('aria-current') })),
    representation: document.querySelector('[data-guided-representation]')?.textContent || ''
  }));
}
async function sourceReceipt(page) {
  return evaluate(page, async () => {
    const data = LeadTorsoModelData.registered || LeadTorsoModelData.thorax || LeadTorsoModelData.skin;
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    return { encodedSha256: Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, '0')).join(''), encodedBytes: data.length };
  });
}
async function nativePlay(page) {
  const start = await evaluate(page, () => GuidedStudy.audio.currentTime);
  await page.locator('[data-guided-action="play"]').click();
  await page.waitForFunction(startTime => GuidedStudy.session.inspect().playing && !GuidedStudy.audio.paused && GuidedStudy.audio.currentTime > startTime + .07, start, { timeout: 15000 });
  A.equal(await evaluate(page, () => GuidedStudy.session.inspect().error), null);
}
async function screenshot(page, name, focus = '#lead3DHost') {
  const target = page.locator(focus);
  if (await target.isVisible()) await target.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(out, name), animations: 'disabled' });
}
function assertLead(info, cue, originalActivity, rendering = '3d') {
  const scene = cue.scene, source = course.guided.find(step => step.id === scene.step);
  A(source, `Source step exists: ${cue.id}`);
  A.equal(info.session.mode, 'guided');
  A.equal(info.session.cueId, cue.id);
  A.equal(info.session.playing, false);
  A.equal(info.session.error, null);
  A.equal(info.media.paused, true);
  A.equal(info.media.time, info.session.audioTime, 'Session reports the actual MP3 clock');
  A(info.media.time >= cue.at && info.media.time - cue.at < .021, `Native boundary: ${cue.id} ${info.media.time}/${cue.at}`);
  A.equal(info.leadVisible, true);
  A.equal(info.lead.rendering, rendering);
  A.equal(info.lead.state.tab, 'guided');
  A.equal(info.lead.state.step, course.guided.indexOf(source));
  A.equal(info.lead.state.selected, scene.selected || source.target);
  if (originalActivity) A.deepEqual(activity(info.lead), originalActivity, 'Cue application never grades, reshuffles or resets working activity');
  const expectedLayers = { body: true, skeleton: true, muscle: false, landmarks: true, leads: true, ...scene.layers };
  const body = scene.bodySurface || (expectedLayers.body ? 'translucent' : 'hidden');
  expectedLayers.body = body !== 'hidden';
  A.deepEqual(info.lead.state.layers, expectedLayers);
  A.equal(info.lead.state.bodySurface, body);
  for (const [key, fallback] of Object.entries({ showIntercostalSpaces: false, showElectrodeColors: true, showLeadTypes: true, allLabels: false, touch: false })) A.equal(info.lead.state[key], scene[key] ?? fallback, `${cue.id} ${key}`);
  A.equal(info.representation, 'Representation: ' + scene.detail.trim(), 'Model qualifications are visible with the current cue');
  if (rendering === 'fallback') return;
  A.equal(info.host.ready, 'true');
  A.equal(info.host.structures, '50');
  A.equal(info.host.triangles, '194563');
  A.equal(info.host.registeredAnatomy, 'true');
  A.equal(info.host.source, 'BodyParts3D');
  A.equal(info.host.highlight, source.highlights.join(','));
  A.equal(info.host.polarity, Object.entries(source.polarity || {}).map(([id, value]) => id + ':' + value).join(','));
  A.equal(info.host.labelMode, 'guided');
  A.equal(info.host.allLabels, String(scene.allLabels ?? false));
  const active = source.activeElectrode || source.target;
  A.equal(info.host.activeLabel, course.leads.some(lead => lead.id === active) ? active : '');
  A.equal(info.host.bodySurface, body);
  A.deepEqual(info.host.layers.split(',').filter(Boolean).sort(), Object.keys(expectedLayers).filter(key => expectedLayers[key]).sort());
  A.equal(info.host.lesson, scene.showIntercostalSpaces ? 'count-ics' : source.lesson || '');
  const preset = scene.preset || source.camera || 'front';
  A.deepEqual(info.lead.camera.camera, preset === 'left-oblique' ? { yaw: .72, pitch: -.02, distance: 1.45 } : preset === 'right-oblique' ? { yaw: -.72, pitch: -.02, distance: 1.45 } : { yaw: 0, pitch: 0, distance: 1.42 });
  if (source.polarity) for (const [id, polarity] of Object.entries(source.polarity)) {
    const label = info.labels.find(item => item.id === id);
    A(label, `${cue.id}: actual ${id} polarity callout is visible`);
    A(label.text.endsWith(' ' + polarity), `${cue.id}: exact source polarity label`);
  }
}
async function answerCurrent(page) {
  const question = await evaluate(page, () => {
    const state = LeadPlacementLab.getState();
    return LeadPlacementLab.data.quiz[state.quizOrder[state.quiz]];
  });
  A(question, 'A real current quiz question exists');
  if (question.type === 'tap') {
    await page.waitForSelector('#lead3DHost[data-ready="true"], #lead2DFallback:not([hidden])');
    // The preserved public manual-answer API, also used by the original lead
    // regression, supplies the exact source model point; no state mutation.
    await evaluate(page, id => LeadPlacementLab.selectMarker(id, { modelPoint: LeadPlacementLab.getTapTarget(id).model }), question.target);
  } else await page.locator(`[data-quiz-opt="${question.answer}"]`).click();
  await page.waitForSelector('#leadQuizFeedback');
  A.match(await page.locator('#leadQuizFeedback').innerText(), /^Correct\b/);
  return question;
}
async function run() {
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const context = await browser.newContext({ viewport: { width: 1180, height: 1000 } });
  const page = await context.newPage();
  await setup(page);
  const lessons = await evaluate(page, () => GuidedStudyLessons.filter(lesson => /^M07\.\d\d$/.test(lesson.id)));
  A.deepEqual(lessons.map(l => l.id), Array.from({ length: 8 }, (_, i) => 'M07.' + String(i + 1).padStart(2, '0')));
  A.equal(lessons.reduce((sum, l) => sum + l.cues.length, 0), 58);
  A.equal(lessons.flatMap(l => l.cues).filter(cue => cue.scene.organ === 'lead').length, 47);
  for (const lesson of lessons) {
    A.equal(sha(read(lesson.audio.src)), lesson.audio.sha256, 'Actual delivered audio hash: ' + lesson.id);
    for (const cue of lesson.cues) {
      A.equal(cue.alignment.machineMeasured, true, 'Actual measured cue bounds: ' + cue.id);
      A(cue.at >= 0 && cue.at < lesson.audio.duration);
    }
  }
  const storedBefore = await evaluate(page, () => {
    localStorage.setItem('guided-lead-unrelated-sentinel', 'unchanged-byte-for-byte');
    return Object.fromEntries(Object.entries(localStorage).filter(([key]) => key !== 'cmt.guided-lesson.v1'));
  });
  // Establish an actual learner activity, rather than writing fabricated quiz state.
  await page.locator('#leadPlacementLaunch').click();
  await page.waitForSelector('#lead3DHost[data-ready="true"]');
  A.deepEqual(await sourceReceipt(page), { encodedSha256: expectedSource.encodedSha256, encodedBytes: expectedSource.encodedBytes });
  await page.locator('#lead-tab-cards').click();
  await page.locator('#leadCardShuffle').click();
  await page.locator('#leadCardReverse').click();
  await page.locator('#leadCardNext').click();
  await page.locator('#leadCardFlip').click();
  await page.locator('#lead-tab-quiz').click();
  await page.locator('#leadQuizStart').click();
  await answerCurrent(page);
  await page.locator('#leadQuizNext').click();
  const learnerBefore = await evaluate(page, () => LeadPlacementLab.guided.capture());
  const originalActivity = activity(learnerBefore);
  A.equal(originalActivity.quizScore, 1);
  A.equal(originalActivity.quizPicked, null);
  A.equal(originalActivity.card, 1);
  A.equal(originalActivity.cardReverse, true);
  A.equal(originalActivity.cardFlipped, true);
  checkpoint('Real learner cards and partially completed quiz established');
  for (const lesson of lessons) {
    A.equal(await evaluate(page, id => GuidedStudy.load(id), lesson.id), true, lesson.id + ' opens ready and paused');
    await idle(page);
    const loaded = await snapshot(page);
    A.equal(loaded.media.paused, true, 'No autoplay on lesson load');
    A(loaded.media.src.startsWith('blob:'), 'Actual MP3 uses a seekable Blob, including no-Range static hosts');
    A(Math.abs(loaded.media.duration - lesson.audio.duration) < .08, 'Native decoded duration matches delivered clip');
    await nativePlay(page);
    A.equal(await evaluate(page, () => GuidedStudy.session.pause()), true);
    const fetchCount = audioRequests.length;
    for (const cue of lesson.cues) {
      A.equal(await evaluate(page, id => GuidedStudy.session.seekCue(id), cue.id), true, cue.id);
      await evaluate(page, () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const info = await snapshot(page);
      A.equal(info.session.cueId, cue.id);
      A(info.media.time >= cue.at && info.media.time - cue.at < .021, 'Actual MP3 boundary for ' + cue.id);
      A.equal(info.media.time, info.session.audioTime);
      A.equal(info.media.paused, true);
      if (cue.scene.organ === 'lead') assertLead(info, cue, originalActivity);
      else {
        A.equal(cue.scene.organ, 'explanation');
        const card = await evaluate(page, () => GuidedExplanation.inspect());
        A.equal(card.visible, true);
        A.deepEqual(card.scene, cue.scene);
        A.equal(info.leadVisible, false, 'Unsupported concepts show the explicit explanation card, not a falsely related torso');
        A.deepEqual(activity(info.lead), originalActivity, 'Explanation transitions preserve the quiz and cards');
      }
      records.push({ lesson: lesson.id, cue: cue.id, at: cue.at, actualAudioTime: info.media.time, organ: cue.scene.organ, step: cue.scene.step || null, camera: info.lead.camera, polarity: info.host.polarity || null });
    }
    A.equal(audioRequests.length, fetchCount, 'Cue seeks/ticks reuse the one active clip rather than refetching audio');
    checkpoint('Checked every measured cue in ' + lesson.id);
  }
  // Real canvas input releases ownership before the viewport consumes the gesture.
  const chest = lessons.find(l => l.id === 'M07.05');
  const chestCue = chest.cues.find(c => c.scene.organ === 'lead' && c.scene.step === 'v6');
  A(chestCue);
  A.equal(await evaluate(page, id => GuidedStudy.load(id), chest.id), true);
  A.equal(await evaluate(page, id => GuidedStudy.session.seekCue(id), chestCue.id), true);
  const beforeDrag = await snapshot(page);
  await screenshot(page, '01-guided-v6-source.png');
  const canvas = page.locator('#lead3DHost .lead-3d-canvas');
  await canvas.scrollIntoViewIfNeeded();
  await nativePlay(page);
  await canvas.scrollIntoViewIfNeeded();
  await canvas.evaluate(element => element.addEventListener('pointerdown', () => {
    element.dataset.testOwnershipAtInput = GuidedStudy.session.inspect().mode;
    element.dataset.testAudioPausedAtInput = String(GuidedStudy.audio.paused);
  }, { once: true }));
  const box = await canvas.boundingBox();
  A(box && box.width > 200 && box.height > 200);
  await page.mouse.move(box.x + box.width * .56, box.y + box.height * .48);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .56 + 38, box.y + box.height * .48 + 14, { steps: 5 });
  await page.mouse.up();
  const explored = await snapshot(page);
  A.equal(explored.session.mode, 'explore');
  A.equal(explored.media.paused, true);
  A.equal(explored.session.playing, false);
  A.equal(await canvas.getAttribute('data-test-ownership-at-input'), 'explore', 'Ownership changes synchronously before the canvas handler');
  A.equal(await canvas.getAttribute('data-test-audio-paused-at-input'), 'true');
  A.notDeepEqual(explored.lead.camera, beforeDrag.lead.camera, 'The native pointer drag actually changes the camera');
  const frozenClock = explored.media.time;
  await evaluate(page, () => GuidedStudy.session.tick());
  A.equal((await snapshot(page)).media.time, frozenClock, 'Released audio clock does not advance on manual tick');
  A.deepEqual(activity(explored.lead), originalActivity);
  const guidedSaved = JSON.parse(await evaluate(page, () => GuidedStudy.session.export())).guided;
  A.equal(guidedSaved.scene.organ, 'lead');
  await page.locator('[data-guided-action="guided"]').click();
  await idle(page);
  const returned = await snapshot(page);
  A.equal(returned.media.paused, true);
  A(Math.abs(returned.media.time - frozenClock) < .021);
  A.equal(returned.session.cueId, guidedSaved.cueId);
  A.deepEqual(returned.lead.camera, guidedSaved.scene.snapshot.camera, 'Return restores the exact original camera');
  A.deepEqual(returned.lead.state, guidedSaved.scene.snapshot.state, 'Return restores full Guided presentation and every activity field');
  await page.locator('#leadReturnActivity').click();
  await page.waitForFunction(() => LeadPlacementLab.getState().tab === 'quiz' && !LeadPlacementLab.guided.capture().learner);
  const firstRestored = await snapshot(page);
  A.equal(firstRestored.session.mode, 'explore');
  A.equal(firstRestored.media.paused, true);
  A.deepEqual(firstRestored.lead.state, learnerBefore.state, 'Explicit activity return restores the original quiz and shuffled/reversed/flipped cards');
  A.deepEqual(firstRestored.lead.camera, learnerBefore.camera, 'Original activity camera is restored');
  await answerCurrent(page);
  const newer = await evaluate(page, () => LeadPlacementLab.guided.capture());
  A.equal(newer.state.quizScore, 2, 'Only the new explicit learner answer changes grading');
  await page.locator('[data-guided-action="guided"]').click();
  await idle(page);
  A.deepEqual(activity((await snapshot(page)).lead), activity(newer), 'An older Guided snapshot cannot overwrite a newer quiz attempt');
  await page.locator('#leadReturnActivity').click();
  await page.waitForFunction(() => LeadPlacementLab.getState().tab === 'quiz' && !LeadPlacementLab.guided.capture().learner);
  A.deepEqual(activity((await snapshot(page)).lead), activity(newer), 'Repeated explicit activity return preserves the newer answer');
  await screenshot(page, '02-newer-quiz-preserved.png', '#leadQuizPanel');
  await page.locator('[data-guided-action="guided"]').click();
  await idle(page);
  checkpoint('Native Play/drag handoff, exact camera and original/newer quiz/card restoration checked');
  // Leave using real module navigation; then return from both other original modules.
  for (const organ of ['heart', 'respiratory']) {
    const saved = await snapshot(page);
    await page.locator('#leadStudyBack').click();
    A.equal(await evaluate(page, () => GuidedStudy.session.inspect().mode), 'explore');
    A.equal(await evaluate(page, () => GuidedStudy.audio.paused), true);
    if (organ === 'heart') {
      await page.locator('#heartV3Launch').click();
      await page.waitForFunction(() => HeartV3Study.inspect().renderer?.sourceReady);
      A.equal(await page.locator('#heartV3Study').isVisible(), true);
    } else {
      await page.locator('#respiratorySimulatorLaunch').click();
      await page.waitForFunction(() => !!CardiorespiratoryStudy.inspectBreathing());
      A.equal(await page.locator('#cardiorespiratoryStudy').isVisible(), true);
    }
    await page.locator('[data-guided-action="guided"]').click();
    await idle(page);
    const back = await snapshot(page);
    A.equal(back.leadVisible, true);
    A.equal(back.media.paused, true);
    A(Math.abs(back.media.time - saved.media.time) < .021);
    A.deepEqual(back.lead.camera, saved.lead.camera);
    A.deepEqual(back.lead.state, saved.lead.state);
    records.push({ navigation: organ, restoredCue: back.session.cueId, restoredTime: back.media.time });
  }
  A.deepEqual(await sourceReceipt(page), { encodedSha256: expectedSource.encodedSha256, encodedBytes: expectedSource.encodedBytes });
  A.deepEqual(await evaluate(page, () => Object.fromEntries(Object.entries(localStorage).filter(([key]) => key !== 'cmt.guided-lesson.v1'))), storedBefore, 'All unrelated storage bytes remain unchanged');
  await screenshot(page, '03-guided-return-after-heart-and-lung.png');
  await context.close();
  checkpoint('Cross-organ navigation and unrelated storage/source payload preservation checked');
  // Fresh context: hold the actual source dependency, leave through a trusted
  // Modes gesture, then prove the late dependency cannot publish a stale scene.
  const coldContext = await browser.newContext({ viewport: { width: 1024, height: 1000 } });
  const cold = await coldContext.newPage();
  await setup(cold);
  let releaseGate, notifyHit;
  const gate = new Promise(resolve => { releaseGate = resolve; });
  const hit = new Promise(resolve => { notifyHit = resolve; });
  await cold.route('**/lead-placement/assets/torso-model-data.js', async route => { notifyHit(); await gate; await route.continue(); });
  try {
    await evaluate(cold, () => { globalThis.__leadColdLoad = GuidedStudy.load('M07.05'); });
    await bounded(hit, 'Actual torso source request', 45000);
    A.equal(await evaluate(cold, () => GuidedStudy.session.inspect().busy), true);
    A.equal(await evaluate(cold, () => GuidedStudy.audio.paused), true);
    await cold.locator('#leadStudyBack').click();
    A.equal(await evaluate(cold, () => GuidedStudy.session.inspect().mode), 'explore');
    releaseGate();
    A.equal(await evaluate(cold, () => __leadColdLoad), false, 'Obsolete source preparation cannot succeed');
    A.equal(await cold.locator('#leadPlacementHome').isVisible(), false);
    A.equal(await cold.locator('#lead3DHost .lead-3d-canvas').count(), 0);
    A.equal(await evaluate(cold, () => GuidedStudy.session.inspect().error), null, 'Cancellation is not reported as a current scene failure');
    await cold.unroute('**/lead-placement/assets/torso-model-data.js');
    A.equal(await evaluate(cold, () => GuidedStudy.load('M07.05')), true, 'Explicit retry becomes actually ready');
    await cold.waitForSelector('#lead3DHost[data-ready="true"]');
    A.equal(await cold.locator('#lead3DHost').getAttribute('data-structures'), '50');
    A.equal(await cold.locator('#lead3DHost .lead-3d-canvas').count(), 1, 'Only the current renderer exists');
    await screenshot(cold, '04-cold-source-cancel-and-retry.png');
  } finally { releaseGate(); await coldContext.close(); }
  checkpoint('Actual delayed source readiness, cancellation and explicit retry checked');
  // Existing native fallback, not a mocked adapter or a replacement picture.
  const fallbackContext = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  const fallback = await fallbackContext.newPage();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (/^webgl/.test(type)) return null;
      return original.call(this, type, ...args);
    };
  });
  await setup(fallback);
  await fallback.locator('#leadPlacementLaunch').click();
  await fallback.waitForFunction(() => document.querySelector('#lead3DStatus')?.textContent.includes('3D unavailable'));
  A.equal(await fallback.locator('#lead2DFallback').isVisible(), true);
  A.equal(await fallback.locator('#lead3DHost .lead-3d-canvas').count(), 0);
  A.equal(await fallback.locator('#lead2DFallback [data-map-marker]').count(), 10);
  A.equal(await fallback.locator('#lead2DFallback .lead-map-node').count(), 4);
  await fallback.locator('#lead-tab-cards').click();
  await fallback.locator('#leadCardNext').click();
  await fallback.locator('#leadCardFlip').click();
  const fallbackActivity = await evaluate(fallback, () => LeadPlacementLab.guided.capture());
  A.equal(await evaluate(fallback, () => GuidedStudy.load('M07.04')), true);
  for (const cue of lessons.find(l => l.id === 'M07.04').cues.filter(c => c.scene.organ === 'lead')) {
    A.equal(await evaluate(fallback, id => GuidedStudy.session.seekCue(id), cue.id), true);
    assertLead(await snapshot(fallback), cue, null, 'fallback');
    A.equal(await fallback.locator('#lead2DFallback').isVisible(), true);
  }
  await fallback.locator('#leadReturnActivity').click();
  await fallback.waitForFunction(() => LeadPlacementLab.getState().tab === 'cards' && !LeadPlacementLab.guided.capture().learner);
  A.equal(await evaluate(fallback, () => GuidedStudy.session.inspect().mode), 'explore');
  A.deepEqual(activity(await evaluate(fallback, () => LeadPlacementLab.guided.capture())), activity(fallbackActivity));
  await screenshot(fallback, '05-native-2d-fallback-activity-preserved.png', '#leadStudyMain');
  await fallbackContext.close();
  A.deepEqual(errors, [], 'No uncaught browser errors in actual source or native fallback');
  A.deepEqual(externalRequests, [], 'The regression and app make no external provider requests');
  A.deepEqual(sourceHashes(), sourceBefore, 'Original source data, ECG and preservation tests remain byte-identical');
  checkpoint('All authored native lead regression cases completed');
  fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify({
    passed: true, ...evidence(), sourceAfter: sourceHashes(),
    authorizedAdapterDelta: Object.fromEntries(['lead-placement/module.js', 'lead-placement/torso-3d.js'].map(file => [file, { original: pins[file], current: sha(read(file)) }])),
    qualification: 'Native local Chromium/SwiftShader, actual delivered MP3 clock and registered torso, all 58 measured M07 cues. The no-WebGL case uses the existing native fallback. Manual tap-answer API supplies exact source points; this does not validate physical electrode placement, iPad hardware or clinical calibration. Original lead verification remains separate and unmodified.'
  }, null, 2) + '\n');
  console.log('PASS M07: 8 native MP3s, 58 measured cues, actual 50-mesh torso, source polarity/cameras, trusted handoff, quiz/cards, cancellation, native fallback and storage preservation.');
}
let globalTimer;
Promise.race([run(), new Promise((_, reject) => { globalTimer = setTimeout(() => reject(Error(`Global native lead regression deadline exceeded ${totalMs} ms during ${phase}`)), totalMs); })])
  .catch(async error => {
    fs.writeFileSync(path.join(out, 'failure.json'), JSON.stringify({ message: error.message, stack: error.stack, ...evidence() }, null, 2) + '\n');
    if (currentPage && !currentPage.isClosed()) await currentPage.screenshot({ path: path.join(out, 'failure.png'), timeout: 10000 }).catch(() => {});
    console.error(error);
    process.exitCode = 1;
  }).finally(async () => {
    clearTimeout(globalTimer);
    if (browser) await bounded(browser.close(), 'browser.close', 15000).catch(() => {});
  });
