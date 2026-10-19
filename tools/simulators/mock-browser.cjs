const {chromium}=require('playwright'),A=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium'}),p=await b.newPage({viewport:{width:1024,height:768}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const order=()=>p.locator('[data-mock-answer]').evaluateAll(bs=>bs.map(b=>[b.dataset.mockAnswer,b.textContent]));
 try{
  await p.goto(process.env.CARDIO_BASE_URL||'http://127.0.0.1:8765/');await p.evaluate(()=>{localStorage.setItem('older-study-key','preserved');});
  await p.click('#asptMockLaunch');await p.click('[data-mock-start]');const first=await order();
  await p.click('[data-mock-hint]');A.deepEqual(await order(),first);await p.locator('[data-mock-answer]').first().click();A.deepEqual(await order(),first);
  await p.click('[data-mock-text]');A.deepEqual(await order(),first);await p.click('[data-mock-next]');await p.click('[data-mock-previous]');A.deepEqual(await order(),first);
  const state=await p.evaluate(()=>AsptMock.getState());await p.reload();await p.click('#asptMockLaunch');A.deepEqual(await p.evaluate(()=>AsptMock.getState()),state);A.deepEqual(await order(),first);
  // Interact with all 100 questions. Answer alternating items correctly/wrong, using original indexes.
  for(let i=0;i<100;i++){
   await p.selectOption('[data-mock-jump]',String(i));const q=await p.evaluate(()=>{const s=AsptMock.getState().session;return AsptMockBank.find(q=>q.id===s.order[s.position]);});
   await p.click(`[data-mock-answer="${i%2?(q.answer+1)%q.options.length:q.answer}"]`);
  }
  A.equal(await p.locator('[data-mock-explanation]').count(),0);
  await p.click('[data-mock-submit]');A.match(await p.locator('[data-mock-score]').textContent(),/50 \/ 100 correct.*49 independently correct.*1 guided/);
  const final=await p.evaluate(()=>AsptMock.getState());await p.reload();await p.click('#asptMockLaunch');A.deepEqual(await p.evaluate(()=>AsptMock.getState()),final);A.equal((await p.evaluate(()=>AsptMock.getState())).history.length,1);
  await p.locator('summary').filter({hasText:'Progress export'}).click();await p.click('[data-mock-export]');const raw=await p.locator('[data-mock-json]').inputValue();
  const bad=JSON.parse(raw);bad.session.permutations[bad.session.order[0]]=[0,0,1,2];await p.locator('[data-mock-json]').fill(JSON.stringify(bad));await p.click('[data-mock-import]');A.match(await p.locator('[data-mock-import-result]').textContent(),/rejected/);A.deepEqual(await p.evaluate(()=>AsptMock.getState()),final);
  await p.locator('[data-mock-json]').fill(raw);await p.click('[data-mock-import]');A.match(await p.locator('[data-mock-import-result]').textContent(),/Validated/);
  await p.click('[data-mock-lesson]');A.equal(await p.locator('#asptMock').evaluate(e=>e.classList.contains('hidden')),true);
  A.equal(await p.evaluate(()=>localStorage.getItem('older-study-key')),'preserved');
  await p.evaluate(()=>localStorage.setItem('cmt.aspt.mock.v1','{broken'));await p.reload();await p.click('#asptMockLaunch');A.match(await p.locator('[data-mock-error]').textContent(),/preserved/);await p.click('[data-mock-start]');A.equal(await p.evaluate(()=>localStorage.getItem('cmt.aspt.mock.v1')),'{broken');
  A.deepEqual(errors,[]);
  console.log('PASS 100-item mock: UI original-index scoring 50/100, guided distinction, concealed feedback, stable permutations/navigation/reload, one history record, validated import/rejection/export, lesson route and unrelated progress.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
