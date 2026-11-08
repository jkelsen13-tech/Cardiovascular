'use strict';
const {chromium}=require('playwright'),A=require('node:assert/strict'),fs=require('node:fs');
const I=require('../../ecg/source-strip-inventory.json'),M=require('../../guided-study/sequential-map.js');
const base=process.env.CARDIO_BASE_URL||'http://127.0.0.1:8765/';
(async()=>{const b=await chromium.launch({chromiumSandbox:true,executablePath:process.env.CHROMIUM_PATH||undefined}),p=await b.newPage({viewport:{width:1024,height:768}});let checks=0;const errors=[],external=[],requests=[];const check=(v,n)=>{A.ok(v,n);checks++};
try{
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));
 await p.route('**/*',r=>r.request().url().startsWith(base)||/^(blob:|data:)/.test(r.request().url())?r.continue():(external.push(r.request().url()),r.abort()));
 const ready=()=>p.waitForFunction(()=>window.GuidedCourse&&!GuidedCourse.inspect().loading&&!GuidedCourse.inspect().busy&&!GuidedCourse.inspect().preparing);
 await p.goto(base);await ready();A.deepEqual(await p.evaluate(()=>SourceStripInventory),I);checks++;
 for(const e of Object.values(I.entries)){
  const l=M.lessons.find(l=>e.page>=l.pages[0]&&e.page<=l.pages[1]);
  const count=requests.filter(u=>u.includes('/ecg/source-reviews/')).length;
  await p.evaluate(id=>GuidedCourse.select(id),l.id);await ready();await p.locator('[data-seq-page]').selectOption(String(e.page));
  await p.waitForFunction(n=>GuidedCourse.inspect().sourceStrip?.displayPage===n,e.page);
  check(!await p.evaluate(()=>GuidedCourse.inspect().sourceStrip.revealed),'Answer hidden '+e.page);
  check(requests.filter(u=>u.includes('/ecg/source-reviews/')).length===count,'No early review fetch '+e.page);
  check(await p.locator('[data-strip-field]').count()===6,'Six unscored response fields '+e.page);
  const ledger=JSON.stringify(await p.evaluate(()=>GuidedCourse.inspect().progress));
  await p.locator(e.revealOwner==='source'?'[data-seq-reveal]':'[data-strip-review]').click();
  await p.waitForFunction(()=>GuidedCourse.inspect().sourceStrip.revealed);
  const r=JSON.parse(fs.readFileSync(e.reviewPath)),text=await p.locator('#source-strip-review').innerText();
  for(const field of r.fields)check(text.replace(/\s+/g,' ').includes(field.value.replace(/\s+/g,' ').trim()),'Exact review content '+e.page+'/'+field.id);
  if(r.authority==='derived-unvalidated')check(text.includes('unvalidated')&&text.includes('unscored'),'Visible provisional authority '+e.page);
  check(JSON.stringify(await p.evaluate(()=>GuidedCourse.inspect().progress))===ledger&&await p.evaluate(()=>GuidedCourse.inspect().sourceStrip.scoring==='none'),'Reveal does not score or complete '+e.page);
 }
 check(!errors.length,'No script errors');check(!external.length,'No external runtime requests');
 console.log(JSON.stringify({passed:true,checks,pages:Object.keys(I.entries).length,physicalIPad:false,qualifiedEducatorReview:false}));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
