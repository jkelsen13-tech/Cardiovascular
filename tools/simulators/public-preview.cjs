/* Exercise the prepared artifact rather than silently testing the private source tree. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const base=process.env.PUBLIC_BASE_URL||'http://127.0.0.1:8780/respiratory-v2-preview/';
(async()=>{
 const manifest=await (await fetch(new URL('PREVIEW-MANIFEST.json',base))).json();
 assert.equal(manifest.preparedOnly,true);assert.equal(manifest.proposedPublicPath,'/respiratory-v2-preview/');
 const files=Object.keys(manifest.dependencies);
 assert.ok(files.includes('respiratory-study/explorer.js'));assert.ok(files.includes('respiratory-study/explorer-detail.js'));
 for(const f of files) assert.ok(!/^(images|study|aspt|lead-placement|ecg\/images)\/|\.pdf$/i.test(f),f);
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:768,height:1024},hasTouch:true});
 const errors=[],bad=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)bad.push([r.status(),r.url()]);});
 try{
  await page.addInitScript(()=>{localStorage.setItem('cmt.simulators.progress.v1','private-progress-sentinel');localStorage.setItem('cmt.aspt.mock.v1','private-mock-sentinel');});
  await page.goto(base);await page.waitForSelector('[data-dynamic=true]');
  assert.equal(await page.locator('canvas').count(),1);
  assert.equal(await page.locator('#heartSimulatorLaunch').count(),0);assert.equal(await page.locator('#homeMenu button').count(),1);
  await page.click('[data-tab="sources"]');
  const links=await page.locator('#cardiorespiratoryStudy a[href]').evaluateAll(es=>es.map(e=>e.href));
  for(const url of links.filter(u=>u.startsWith(base)))assert.equal((await page.request.get(url)).status(),200,url);
  assert.match(await page.locator('#cardiorespiratoryStudy').innerText(),/preview\.progress/);
  await page.click('[data-tab="guided"]');await page.waitForSelector('[data-dynamic=true]');
  await page.click('[data-tab="practice"]');await page.click('[data-session="5"]');
  const answer=await page.evaluate(()=>{const s=CardiorespiratoryStudy.getState();return CardioSimContent.questions.find(q=>q.id===s.order[s.question]).answer;});
  await page.click(`[data-answer="${answer}"]`);
  const storage=await page.evaluate(()=>({private:localStorage.getItem('cmt.simulators.progress.v1'),mock:localStorage.getItem('cmt.aspt.mock.v1'),preview:JSON.parse(localStorage.getItem('cmt.respiratory.preview.progress.v1'))}));
  assert.equal(storage.private,'private-progress-sentinel');assert.equal(storage.mock,'private-mock-sentinel');assert.equal(storage.preview.attempts.length,1);
  await page.click('[data-tab="explore"]');await page.waitForSelector('[data-dynamic=true]');
  await page.click('[data-unload-anatomy]');await page.waitForSelector('[data-explorer="text"]:visible');
  await page.locator('[data-explorer="text"] [data-explorer-source]').selectOption('left-lower-bronchus');
  await page.locator('[data-explorer="text"] [data-explorer-step="12"]').click();
  assert.equal(await page.locator('[data-explorer="text"]').getAttribute('data-explorer-stage'),'membrane');
  await page.click('[data-text-size]');await page.setViewportSize({width:1024,height:768});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.ok(requests.every(u=>!u.startsWith(base)||!/(?:\/images\/|\/aspt\/|\/study\/|\.pdf(?:\?|$))/.test(u)));
  assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);
  console.log(JSON.stringify({result:'PASS',files:files.length,scope:'prepared respiratory-only artifact',checks:['one renderer','all local Sources links resolve','guided/practice routes','isolated progress write preserves private namespaces','complete text path to membrane','200% landscape overflow','no excluded-media requests'],published:false}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
