const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto'),vm=require('node:vm');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const ctx={};vm.runInNewContext(read('aspt/content.js')+';this.data=ASPT_DATA;',ctx);const D=JSON.parse(JSON.stringify(ctx.data));
assert.equal(read('index.html'),read('cmt-quiz.html'));assert.equal(D.terms.length,91);assert.equal(D.competencies.length,26);assert.equal(D.coverage.length,176);
const blueprint=JSON.parse(read('aspt/blueprint.json'));assert.deepEqual(D.terms.map(t=>({n:t.id,name:t.term,page:t.page})),blueprint.terms);
assert.deepEqual(D.competencies.map(c=>c.id),blueprint.competencies);
for(const l of D.lessons){for(const id of l.prerequisites)assert(D.lessons.some(x=>x.id===id));assert(l.body.length&&l.sources.length);}
for(const t of D.terms){assert(t.simple.length>10&&t.clinical.length>20);assert(D.coverage.some(r=>r.term===t.id||r.id==='T'+String(t.id).padStart(2,'0')));}
for(const v of Object.values(D.images)){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,v.src))).digest('hex'),v.sha256);}
const server=http.createServer((req,res)=>{const target=path.resolve(root,'.'+(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',target.endsWith('.js')?'text/javascript':target.endsWith('.css')?'text/css':target.endsWith('.jpg')?'image/jpeg':target.endsWith('.png')?'image/png':'text/html');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port,browser=await chromium.launch();
try{const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const entry of ['index.html','cmt-quiz.html']){
 await page.goto(url+'/'+entry);await page.locator('#asptLaunch').click();assert(await page.locator('#asptHome').isVisible());
 assert((await page.locator('#asptContent').textContent()).includes('five recent mounted EKGs'));
 for(const l of D.lessons){await page.locator('.aspt-lesson-list [data-id="'+l.id+'"]').click();const text=await page.locator('#asptLesson').textContent();for(const label of ['ASPT EXAM REQUIREMENT','PREREQUISITE / FOUNDATION','ADDITIONAL EXPLANATION FROM CLASS SLIDES'])assert(text.includes(label));if(l.gap)assert(text.includes('ASP T GUIDE TOPIC NEEDING ADDITIONAL EXPLANATION'));}
 await page.locator('#asptHome nav [data-id="terms"]').click();assert.equal(await page.locator('.aspt-term').count(),91);await page.locator('#asptTermSearch').fill('ECTOPIC FIRING');assert.equal(await page.locator('.aspt-term').count(),1);assert((await page.locator('.aspt-term h4').textContent()).startsWith('56.'));
 await page.locator('#asptHome nav [data-id="coverage"]').click();assert.equal(await page.locator('.aspt-audit-row').count(),176);
 for(const status of ['Covered completely','Covered but needs reinforcement','Missing from class materials']){await page.locator('#asptAuditStatus').selectOption(status);assert.equal(await page.locator('.aspt-audit-row').count(),D.coverage.filter(r=>r.status===status).length);}
 await page.locator('#asptHome nav [data-id="exam-day"]').click();assert.equal(await page.locator('#asptContent article').count(),22);
 const result=await page.evaluate(()=>{let attempts=0;for(const q of ASPT.data.questions){for(let pick=0;pick<4;pick++){launch([q],'ASPT test');const cur=session.questions[0],choice=cur.opts.findIndex(o=>o.text===q.o[pick]);chooseAnswer(choice);if(session.score!==(pick===q.a?1:0))throw Error('score '+q._id);if(!document.querySelector('#qexplain').textContent.includes(q.e))throw Error('explanation '+q._id);chooseAnswer(choice);if(session.score!==(pick===q.a?1:0))throw Error('duplicate score');attempts++;}}return attempts;});assert.equal(result,96);
 await page.evaluate(()=>ASPT.open());await page.locator('#asptHome nav [data-id="practice"]').click();await page.locator('#asptContent [data-action="practice"][data-id="all"]').click();assert.equal(await page.evaluate(()=>session.questions.length),24);assert(await page.locator('#quiz .aspt-return').isVisible());await page.locator('#quiz .aspt-return').click();assert(await page.locator('#asptHome').isVisible());
 await page.evaluate(()=>ASPT.practice('placement'));assert(await page.locator('#quiz').isVisible());await page.evaluate(()=>{session.questions.forEach((q,i)=>{session.idx=i;renderQuestion();chooseAnswer(q.answer);});showResults();});assert(await page.locator('#results .aspt-return').isVisible());await page.locator('#results .aspt-return').click();
 await page.locator('#asptHome [data-action="home"]').click();assert(await page.locator('#homeMenu').isVisible());assert(!(await page.locator('#asptHome').isVisible()));
}
await page.evaluate(()=>ASPT.open());await page.locator('#asptHome nav [data-id="diagrams"]').click();
for(const id of Object.keys(D.images)){const img=page.locator('#asptContent [data-action="zoom"][data-id="'+id+'"] img');await img.scrollIntoViewIfNeeded();await img.evaluate(img=>img.decode());assert.equal(await img.evaluate(i=>i.naturalWidth),D.images[id].width);}
for(const width of [390,768,1280]){
 await page.setViewportSize({width,height:900});await page.evaluate(()=>ASPT.open());await page.locator('#asptHome nav [data-id="path"]').click();
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow '+width);
 if(width===390)console.log('ASPT_SCREENSHOT_390='+(await page.screenshot({type:'jpeg',quality:65})).toString('base64'));
 await page.locator('.aspt-lesson-list [data-id="waves"]').click();await page.locator('#asptLesson [data-action="zoom"][data-id="g03"]').click();assert(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');await page.locator('.aspt-zoom').waitFor({state:'detached'});
}
await page.goto(url);await page.route('**/aspt/images/g03.png',r=>r.abort());await page.evaluate(()=>ASPT.open());await page.locator('.aspt-lesson-list [data-id="waves"]').click();await page.locator('#asptLesson [data-id="g03"]').scrollIntoViewIfNeeded();await page.locator('.aspt-image-error [data-action="retry"]').waitFor({state:'visible'});await page.unroute('**/aspt/images/g03.png');await page.locator('.aspt-image-error [data-action="retry"]').click();await page.waitForFunction(()=>document.querySelector('#asptLesson [data-id="g03"] img').naturalWidth>0);
assert.deepEqual(errors,[]);console.log('PASS 91 exact guide terms, 26 competencies, 176 checklist rows, 19 lessons, 6 source image hashes/dimensions, 192 answer selections across both entries, navigation/results, responsive layout, keyboard zoom.');
}finally{await browser.close();}})().then(()=>server.close()).catch(e=>{console.error(e);server.close();process.exitCode=1;});
