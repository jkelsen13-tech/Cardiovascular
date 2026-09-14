const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const {chromium} = require('playwright');

const root = path.resolve(__dirname, '../..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

assert.equal(read('index.html'), read('cmt-quiz.html'));
assert.match(read('index.html'), /ecg-study\/module\.css/);
assert.match(read('index.html'), /ecg-study\/content\.js/);
assert.match(read('index.html'), /ecg-study\/module\.js/);
assert.doesNotMatch(read('index.html'), /ecg-refs\/|01-p-wave\.png/);
assert.doesNotMatch(read('ecg-study/module.js'), /ecg-refs\/|\.png/);
assert.doesNotMatch(read('ecg-study/module.css') + read('ecg-study/content.js'), /0\.36\s*[–-]\s*0\.44|normal QT is 0\./i);

const ctx = {};
vm.runInNewContext(read('ecg-study/content.js') + ';this.data=ECG_STUDY;', ctx);
const D = ctx.data;
assert.equal(D.cards.length, 17);
assert.equal(D.stages.length, 6);
assert.deepEqual(D.stages.map((s) => s.id), ['p', 'pr', 'qrs', 'st', 't', 'tp']);
assert.equal(D.patient.viewerLeft, 'PATIENT RIGHT');
assert.equal(D.patient.viewerRight, 'PATIENT LEFT');
assert.match(D.normals.pr, /0\.12–0\.20/);
assert.match(D.normals.qrs, /<\s*0\.12/);
assert.doesNotMatch(JSON.stringify(D.landmarks), /0\.36|0\.44|400 ms|0\.40 s normal/i);
assert.equal(D.quiz.length, 17);
for (const q of D.quiz) {
  assert.equal(q.options.length, 4);
  assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
  assert(q.explain.length > 20);
}
assert.equal(new Set(D.cards.map((c) => c.id)).size, 17);
assert(D.stages[0].caption.includes('Signal spreads through the atria'));
assert(D.stages[1].caption.includes('pauses briefly at the AV node'));
assert(D.stages[2].heart.toLowerCase().includes('atrial repolarization'));
assert(D.stages[3].caption.includes('electrically active'));
assert(D.stages[4].caption.includes('electrically reset'));
assert(D.stages[5].caption.includes('baseline between beats'));
console.log('Data: 17 cards, 6 stages, 17 quiz items, orientation and normals locked.');

const server = http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split('?')[0]);
  const target = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(target, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    const type = target.endsWith('.js') ? 'text/javascript'
      : target.endsWith('.css') ? 'text/css'
      : target.endsWith('.png') ? 'image/png'
      : target.endsWith('.jpg') ? 'image/jpeg' : 'text/html';
    res.setHeader('Content-Type', type);
    res.end(data);
  });
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const url = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({headless: true});
  try {
    const page = await browser.newPage({viewport: {width: 1280, height: 900}});
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    for (const entry of ['index.html', 'cmt-quiz.html']) {
      await page.goto(url + '/' + entry);
      assert(await page.locator('#ecgStudyLaunch').isVisible());
      await page.locator('#ecgStudyLaunch').click();
      assert(await page.locator('#ecgStudyHome').isVisible());
      assert(!(await page.locator('#homeMenu').isVisible()));

      const rightBox = await page.locator('#ecgPatientRight').boundingBox();
      const leftBox = await page.locator('#ecgPatientLeft').boundingBox();
      assert(rightBox && leftBox);
      assert.equal((await page.locator('#ecgPatientRight').innerText()).toUpperCase().includes('PATIENT RIGHT'), true);
      assert.equal((await page.locator('#ecgPatientLeft').innerText()).toUpperCase().includes('PATIENT LEFT'), true);
      assert(rightBox.x < leftBox.x, 'viewer left must be PATIENT RIGHT');
      const sa = await page.locator('#ecgSaNode').boundingBox();
      const av = await page.locator('#ecgAvNode').boundingBox();
      assert(sa.x < av.x, 'SA node belongs in the right atrium (viewer left)');

      assert.equal(await page.locator('#ecgStageCaption').innerText(), D.stages[0].caption);
      for (let i = 0; i < D.stages.length; i++) {
        await page.locator('#ecgStageSlider').evaluate((el, n) => {
          el.value = String(n);
          el.dispatchEvent(new Event('input', {bubbles: true}));
          el.dispatchEvent(new Event('change', {bubbles: true}));
        }, i);
        assert.equal(await page.locator('#ecgStageCaption').innerText(), D.stages[i].caption);
        assert.equal(await page.locator('#ecgInstrument').getAttribute('data-stage'), D.stages[i].id);
        assert.equal(await page.locator('#ecgStageSlider').getAttribute('aria-valuetext'), D.stages[i].name);
      }
      await page.locator('#ecgStagePrev').click();
      assert.equal(await page.locator('#ecgInstrument').getAttribute('data-stage'), 't');
      await page.locator('#ecgStageNext').click();
      assert.equal(await page.locator('#ecgInstrument').getAttribute('data-stage'), 'tp');

      assert.equal(await page.locator('#ecgLandmarkBox').isVisible(), false);
      await page.locator('#ecgLandmarksToggle').check();
      assert(await page.locator('#ecgLandmarkBox').isVisible());
      const land = await page.locator('#ecgLandmarkBox').innerText();
      for (const needle of ['PR interval', 'QT interval', 'ST segment', 'J point', 'QRS duration', '0.12–0.20', '< 0.12']) {
        assert(land.includes(needle), 'missing ' + needle);
      }
      assert(!/normal QT is|0\.36–0\.44/i.test(land));
      assert((await page.locator('#ecgInstrument').innerHTML()).includes('QT (rate-dependent)'));

      await page.locator('#ecgTabCards').click();
      assert(await page.locator('#ecgFlashcard').isVisible());
      assert.match(await page.locator('#ecgCardProgress').innerText(), /Card 1 of 17/);
      const front = await page.locator('#ecgCardFront').innerText();
      await page.locator('#ecgReverseBtn').click();
      const reversedFront = await page.locator('#ecgCardFront').innerText();
      assert.notEqual(reversedFront, front);
      await page.locator('#ecgReverseBtn').click();
      await page.locator('#ecgCardFlip').click();
      assert(await page.locator('#ecgFlashcard').evaluate((el) => el.classList.contains('is-flipped')));
      await page.locator('#ecgCardNext').click();
      assert.match(await page.locator('#ecgCardProgress').innerText(), /Card 2 of 17/);
      await page.locator('#ecgCardShuffle').click();
      assert.match(await page.locator('#ecgCardProgress').innerText(), /Card 1 of 17/);
      await page.locator('#ecgAgainBtn').click();
      await page.locator('#ecgKnowBtn').click();
      await page.locator('#ecgReviewOnlyBtn').click();
      assert.match(await page.locator('#ecgCardProgress').innerText(), /Card 1 of /);

      await page.locator('#ecgTabQuiz').click();
      await page.locator('#ecgQuizStart').click();
      const prompt = await page.locator('#ecgQuizPrompt').innerText();
      const item = D.quiz.find((q) => q.prompt === prompt);
      assert(item);
      await page.locator('#ecgQuizOpts .opt[data-opt="' + ((item.answer + 1) % 4) + '"]').click();
      assert(await page.locator('#ecgQuizFeedback').isVisible());
      assert.match(await page.locator('#ecgQuizFeedback').innerText(), /Not quite/);
      assert.equal(await page.locator('#ecgQuizOpts .opt.wrong').count(), 1);
      assert.equal(await page.locator('#ecgQuizOpts .opt.correct').count(), 1);
      await page.locator('#ecgQuizNext').click();
      const prompt2 = await page.locator('#ecgQuizPrompt').innerText();
      const item2 = D.quiz.find((q) => q.prompt === prompt2);
      await page.locator('#ecgQuizOpts .opt[data-opt="' + item2.answer + '"]').click();
      assert.match(await page.locator('#ecgQuizFeedback').innerText(), /Correct/);

      await page.locator('#ecgStudyBack').click();
      assert(await page.locator('#homeMenu').isVisible());
      assert(!(await page.locator('#ecgStudyHome').isVisible()));
    }

    await page.goto(url);
    await page.locator('#ecgStudyLaunch').click();
    await page.locator('#ecgStageSlider').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#ecgInstrument').getAttribute('data-stage'), 'pr');
    await page.locator('#ecgTabCards').click();
    await page.locator('#ecgFlashcard').focus();
    await page.keyboard.press('Enter');
    assert(await page.locator('#ecgFlashcard').evaluate((el) => el.classList.contains('is-flipped')));

    for (const width of [390, 768, 1280]) {
      await page.setViewportSize({width, height: 900});
      await page.goto(url);
      await page.locator('#ecgStudyLaunch').click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'overflow ' + width);
      const rightBox = await page.locator('#ecgPatientRight').boundingBox();
      const leftBox = await page.locator('#ecgPatientLeft').boundingBox();
      assert(rightBox.x <= leftBox.x + 1, 'orientation at ' + width);
      await page.locator('#ecgTabCards').click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'cards overflow ' + width);
      await page.locator('#ecgTabQuiz').click();
      await page.locator('#ecgQuizStart').click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'quiz overflow ' + width);
    }

    await page.goto(url);
    assert(await page.evaluate(() => BANK.length > 400));
    await page.evaluate(() => showEcg());
    assert(await page.locator('#ecgHome').isVisible());
    await page.evaluate(() => goHome());
    assert(await page.locator('#homeMenu').isVisible());
    await page.evaluate(() => showKahoot());
    assert(await page.locator('#kahootHome').isVisible());
    await page.evaluate(() => goHome());
    await page.locator('#asptLaunch').click();
    assert(await page.locator('#asptHome').isVisible());
    await page.evaluate(() => goHome());
    assert(await page.locator('#homeMenu').isVisible());
    assert(!(await page.locator('#ecgStudyHome').isVisible()));

    await page.goto(require('node:url').pathToFileURL(path.join(root, 'index.html')).href);
    await page.locator('#ecgStudyLaunch').click();
    assert.equal(await page.locator('#ecgStageCaption').innerText(), D.stages[0].caption);

    assert.deepEqual(errors, []);
    console.log('PASS: ECG study module navigation, slider, orientation, landmarks, cards, quiz, keyboard, viewports, existing-mode smoke.');
  } finally {
    await browser.close();
  }
})().then(() => server.close()).catch((err) => {
  console.error(err);
  server.close();
  process.exitCode = 1;
});
