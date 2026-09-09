const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const http = require('node:http');
const { chromium } = require('playwright');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const trainer=read('ecg/trainer.js');
const ctx={};vm.createContext(ctx);vm.runInContext(trainer,ctx);
const cases=ctx.ECG_CASES;
assert.equal(cases.length,13);
assert.equal(read('index.html'),read('cmt-quiz.html'));
assert(!read('index.html').includes('ecgBuildSinus'));
assert(!trainer.includes('"answer":'));
assert(!trainer.includes('"source":'));
const reviews={};let negativeChecks=0;
for(const c of cases){
 assert.match(c.id,/^[a-z0-9]{6}$/);
 assert.equal(c.src,'ecg/images/'+c.id+'.png');
 let r;vm.runInNewContext(read('ecg/reviews/'+c.id+'.js'),{window:{ecgReceiveReview:(id,x)=>{assert.equal(id,c.id);r=x;}}});
 reviews[c.id]=r;
 const bytes=fs.readFileSync(path.join(root,c.src));
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),r.source.assetSha256);
 assert.equal(bytes.readUInt32BE(16),c.width);assert.equal(bytes.readUInt32BE(20),c.height);
 assert(r.source.pixelIdentityChecked);
 const answers=Object.fromEntries(c.fields.map(f=>[f,r.fields[f].answer]));
 assert.equal(ctx.ecgScore(c,r,answers).correct,c.fields.length);
 for(const field of c.fields){
  const ids=ctx.ECG_OPTIONS[field].map(x=>x[0]);assert.equal(new Set(ids).size,ids.length);
  for(const [id] of ctx.ECG_OPTIONS[field]){
   assert(r.fields[field].feedback[id].includes(r.fields[field].evidence));
   if(id!==answers[field]){
    const score=ctx.ecgScore(c,r,{...answers,[field]:id});
    assert.equal(score.correct,c.fields.length-1);negativeChecks++;
   }
  }
 }
 assert.throws(()=>ctx.ecgScore(c,r,{}));
}
console.log('Data checks: 13 images, 79 field keys, '+negativeChecks+' individually wrong choices, source hashes and synchronized entry points.');
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(req.url.split('?')[0]);
 const target=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',target.endsWith('.js')?'text/javascript':target.endsWith('.css')?'text/css':target.endsWith('.png')?'image/png':'text/html');res.end(data);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const c of cases){
  const requests=[];const listener=req=>requests.push(req.url());page.on('request',listener);
  await page.goto(url+'/index.html');
  await page.evaluate(id=>ecgBegin('practice',id,false),c.id);
  await page.waitForFunction(()=>ecgSession.imageReady);
  assert.equal(await page.locator('#ecgProgress').innerText(),'Practice strip');
  assert.equal(await page.locator('#ecgStrip img').getAttribute('alt'),'ECG strip for interpretation');
  assert.equal(await page.locator('#ecgReview').isVisible(),false);
  assert.equal(await page.locator('#ecgRetryImage').isVisible(),false);
  assert.equal(await page.locator('[data-field="rhythm"]').isVisible(),false);
  assert.equal(await page.locator('#ecgCheckBtn').isDisabled(),true);
  assert.equal(requests.filter(x=>x.includes('/reviews/')).length,0);
  const r=reviews[c.id];
  for(const f of c.fields.filter(f=>f!=='rhythm')){
    await page.locator('[data-field="'+f+'"] input[value="'+r.fields[f].answer+'"]').check();
  }
  assert.equal(await page.locator('[data-field="rhythm"]').isVisible(),true);
  assert.equal(requests.filter(x=>x.includes('/reviews/')).length,0);
  await page.locator('[data-field="rhythm"] input[value="'+r.fields.rhythm.answer+'"]').check();
  await page.locator('#ecgCheckBtn').click();
  await page.waitForFunction(()=>ecgSession.done);
  assert.equal(await page.locator('#ecgVerdict').innerText(),c.fields.length+' / '+c.fields.length+' fields correct');
  assert.equal(requests.filter(x=>x.includes('/reviews/')).length,1);
  assert.equal(await page.locator('#ecgReview h3').textContent(),r.classification);
  await page.evaluate(()=>ecgCheck());assert.equal(await page.evaluate(()=>ecgSession.results.length),1);
  page.off('request',listener);
 }
 console.log('Browser: every strip rendered, observations gated rhythm, no early review requests, all correct selections scored once.');
 await page.goto(url);
 await page.evaluate(()=>ecgBeginTest());
 const queue=await page.evaluate(()=>ecgSession.queue.map(c=>c.id));
 assert.equal(new Set(queue).size,queue.length);
 let expectedCorrect=0,expectedTotal=0;
 for(const id of queue){
  await page.waitForFunction(()=>ecgSession.imageReady);
  const c=cases.find(c=>c.id===id),r=reviews[id];
  for(const f of c.fields.filter(f=>f!=='rhythm')){
   const pick=f==='reg'?ctx.ECG_OPTIONS[f].find(o=>o[0]!==r.fields[f].answer)[0]:r.fields[f].answer;
   await page.locator('[data-field="'+f+'"] input[value="'+pick+'"]').check();
  }
  await page.locator('[data-field="rhythm"] input[value="'+r.fields.rhythm.answer+'"]').check();
  await page.locator('#ecgCheckBtn').click();await page.waitForFunction(()=>ecgSession.done);
  assert((await page.locator('[data-field="reg"] .ecg-feedback').innerText()).includes(r.fields.reg.evidence));
  expectedCorrect+=c.fields.length-1;expectedTotal+=c.fields.length;
  await page.locator('#ecgNextBtn').click();
 }
 assert.equal(await page.locator('#ecgScoreRaw').innerText(),expectedCorrect+' / '+expectedTotal+' fields');
 assert((await page.locator('#ecgMissed').innerText()).includes('Ventricular regularity: 5 missed'));
 console.log('Browser: wrong-answer evidence, partial credit, unique test queue and results totals passed.');
 // Review-load failure must preserve choices and never record a score.
 await page.goto(url);await page.route('**/ecg/reviews/**',route=>route.abort());
 await page.evaluate(()=>ecgBegin('practice',ECG_CASES[0].id,false));await page.waitForFunction(()=>ecgSession.imageReady);
 const first=cases[0],r=reviews[first.id];
 for(const f of first.fields){await page.locator('[data-field="'+f+'"] input[value="'+r.fields[f].answer+'"]').check();}
 await page.locator('#ecgCheckBtn').click();
 await page.waitForFunction(()=>!ecgSession.loading);
 assert((await page.locator('#ecgVerdict').innerText()).includes('No score'));
 assert.equal(await page.evaluate(()=>ecgSession.results.length),0);
 await page.unroute('**/ecg/reviews/**');
 await page.locator('#ecgCheckBtn').click();await page.waitForFunction(()=>ecgSession.done);
 assert.equal(await page.evaluate(()=>ecgSession.results.length),1);
 // An unavailable waveform must not permit scoring.
 await page.goto(url);await page.route('**/ecg/images/**',route=>route.abort());
 await page.evaluate(()=>ecgBegin('practice',ECG_CASES[0].id,false));
 await page.locator('#ecgRetryImage').waitFor({state:'visible'});
 assert.equal(await page.locator('#ecgCheckBtn').isDisabled(),true);
 await page.unroute('**/ecg/images/**');await page.locator('#ecgRetryImage').click();await page.waitForFunction(()=>ecgSession.imageReady);
 console.log('Browser: missing-image and missing-review recovery passed.');
 for(const width of [390,768,1280]){
  await page.setViewportSize({width,height:900});await page.goto(url+'/cmt-quiz.html');
  await page.evaluate(()=>ecgBegin('practice',ECG_CASES[0].id,false));await page.waitForFunction(()=>ecgSession.imageReady);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const ratios=await page.locator('#ecgStrip img').evaluate(im=>({shown:im.getBoundingClientRect().width/im.getBoundingClientRect().height,native:im.naturalWidth/im.naturalHeight}));
  assert(Math.abs(ratios.shown-ratios.native)<0.02);
  await page.locator('#ecgZoom').click();
  assert.equal(await page.locator('#ecgZoom').getAttribute('aria-pressed'),'true');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert(await page.locator('#ecgStrip').evaluate(el=>el.scrollWidth>el.clientWidth));
  await page.locator('#ecgZoom').click();
  const radio=page.locator('[data-field="reg"] input').first();await radio.focus();await page.keyboard.press('Space');assert(await radio.isChecked());
  // Emit a compact screenshot into cloud logs for no-local-file visual review.
  const screenshot=await page.screenshot({type:'jpeg',quality:45,fullPage:false});
  console.log('ECG_SCREENSHOT_'+width+'='+screenshot.toString('base64'));
 }
 // The static review loader must also work with a local file URL on the cloud runner.
 await page.goto(require('node:url').pathToFileURL(path.join(root,'index.html')).href);
 await page.evaluate(()=>ecgBegin('practice',ECG_CASES[0].id,false));await page.waitForFunction(()=>ecgSession.imageReady);
 for(const f of first.fields){await page.locator('[data-field="'+f+'"] input[value="'+r.fields[f].answer+'"]').check();}
 await page.locator('#ecgCheckBtn').click();await page.waitForFunction(()=>ecgSession.done);
 assert.equal(await page.evaluate(()=>ecgSession.results[0].correct),first.fields.length);
 console.log('Browser: file:// image and delayed review loading passed.');
 // Existing bank and navigation still initialize on both entry points.
 for(const entry of ['index.html','cmt-quiz.html']){
  await page.goto(url+'/'+entry);assert(await page.evaluate(()=>BANK.length>400));
  await page.evaluate(()=>showEcg());assert(await page.locator('#ecgHome').isVisible());
  await page.evaluate(()=>goHome());assert(await page.locator('#home').isVisible());
  await page.evaluate(()=>showKahoot());assert(await page.locator('#kahootHome').isVisible());
  assert(await page.locator('#kahootUnits button').count()>0);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: ECG browser checks, responsive geometry, keyboard controls, error recovery and existing-mode smoke checks.');
 } finally {await browser.close();}
})().then(()=>server.close()).catch(err=>{console.error(err);server.close();process.exitCode=1;});
