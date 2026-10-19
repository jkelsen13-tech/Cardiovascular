const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined), headless:true});
  const page = await browser.newPage({viewport:{width:768,height:1024}});
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  const order=()=>page.locator('[data-answer]').evaluateAll(bs=>bs.map(b=>({index:+b.dataset.answer,text:b.textContent})));
  const remember=()=>page.evaluate(()=>{window.testAnswerOrder=CardiorespiratoryStudy.getState().answerOrder;});
  const same=()=>page.evaluate(()=>window.testAnswerOrder===CardiorespiratoryStudy.getState().answerOrder);
  try {
    await page.goto(process.env.CARDIO_BASE_URL || 'http://127.0.0.1:8765/');
    await page.evaluate(()=>localStorage.setItem('existing-study-sentinel','retain'));
    for (const system of ['heart','respiratory']) {
      await page.evaluate(s=>CardiorespiratoryStudy.open(s),system);
      await page.click('[data-tab="practice"]');
      await page.click('[data-session="5"]');
      for(let item=0;item<5;item++) {
        const question=await page.evaluate(()=>{const s=CardiorespiratoryStudy.getState();return CardioSimContent.questions.find(q=>q.id===s.order[s.question]);});
        const initial=await order();
        assert.deepEqual(initial.map(o=>o.index).sort((a,b)=>a-b),question.options.map((_,i)=>i));
        initial.forEach(o=>assert.equal(o.text,question.options[o.index]));
        await remember();
        await page.click('[data-hint]');
        await page.click(`[data-answer="${(question.answer+1)%question.options.length}"]`);
        assert.match(await page.locator('.sim-feedback').textContent(),/Not yet/);
        assert.deepEqual(await order(),initial); assert.equal(await same(),true);
        await page.click('[data-retry-question]');
        assert.deepEqual(await order(),initial); assert.equal(await same(),true);
        await page.click(`[data-answer="${question.answer}"]`);
        assert.match(await page.locator('.sim-feedback').textContent(),/Correct/);
        await page.click('[data-text-size]');
        await page.setViewportSize({width:1024,height:768});
        await page.click('[data-tab="sources"]');
        await page.click('[data-tab="practice"]');
        assert.deepEqual(await order(),initial); assert.equal(await same(),true);
        const attempts=await page.evaluate(()=>CardiorespiratoryStudy.getProgress().attempts.slice(-2));
        assert.deepEqual(attempts.map(a=>[a.id,a.correct,a.guided]),[[question.id,false,true],[question.id,true,true]]);
        await page.click('[data-next-question]');
        assert.equal(await same(),false);
      }
      await page.click('[data-new-session]');
      await page.click('[data-session="5"]');
      await remember();
      const first=await page.locator('[data-answer]').first().getAttribute('data-answer');
      await page.click(`[data-answer="${first}"]`);
      await page.click('[data-transfer-question]');
      assert.equal(await same(),false);
      assert.ok((await order()).length>1);
    }
    await page.reload();
    assert.equal(await page.evaluate(()=>localStorage.getItem('existing-study-sentinel')),'retain');
    assert.equal(await page.evaluate(()=>CardiorespiratoryStudy.getProgress().attempts.length),22);
    assert.deepEqual(errors,[]);
    console.log('PASS: both organs, ten question permutations; original-index labels/scoring, stable hint/incorrect/correct/retry/text/resize/tab rerenders; fresh next/transfer/session permutations; 22 persisted attempts and unrelated storage preserved.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
