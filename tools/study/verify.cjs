const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
assert.equal(read('index.html'),read('cmt-quiz.html'));
const audit=JSON.parse(read('study/source-audit.json'));
for(const v of audit.visuals){
 const bytes=fs.readFileSync(path.join(root,v.src));
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),v.sha256);
}
const server=http.createServer((req,res)=>{
 const target=path.resolve(root,'.'+(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
 if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',target.endsWith('.js')?'text/javascript':target.endsWith('.css')?'text/css':target.endsWith('.jpg')?'image/jpeg':target.endsWith('.png')?'image/png':'text/html');res.end(data);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);
 const totals=await page.evaluate(()=>{
  const check=(v,msg)=>{if(!v)throw new Error(msg);};
  let mc=0,choices=0,slots=0;
  check(BANK.length===611,'bank count');
  for(const q of BANK){
   check(q.e&&q.e.length>30,'missing explanation '+q._id);
   check(!q.img?.startsWith('images/slides/')&&!q.dimg?.startsWith('images/slides/'),'early labeled reference '+q._id);
   if(q.qtype){
    check(q.slotNotes.length===(q.order||q.markers).length,'missing slot teaching '+q._id);
    for(const mode of ['all','none','partial']){
     launch([q],'Slots');const cur=session.questions[0],key=slotKey(cur);
     const controls=Array.from(document.querySelectorAll('.slot-sel'));
     controls.forEach((sel,k)=>{sel.value=mode==='all'||(mode==='partial'&&k===0)?key[k]:'';});
     gradeSlots();let expected=mode==='all'?1:mode==='partial'?1/key.length:0;
     check(Math.abs(session.score-expected)<1e-9,'slot score '+q._id);
     gradeSlots();check(Math.abs(session.score-expected)<1e-9,'duplicate slots');
     check(document.querySelector('#qexplain').textContent.includes(q.e),'slot explanation');
     check(document.querySelectorAll('#qfeedback .study-slot-review li').length===key.length,'slot notes');
     showResults();
    }slots++;continue;
   }
   check(q.o.length===4&&new Set(q.o).size===4,'invalid options '+q._id);
   check(Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length,'bad key');
   for(let pick=0;pick<q.o.length;pick++){
    launch([q],'All-choice regression');
    check(!document.querySelector('#qfeedback .study-extra'),'stale feedback');
    const cur=session.questions[0],idx=cur.opts.findIndex(o=>o.text===q.o[pick]);
    chooseAnswer(idx);
    const expected=pick===q.a?1:0;
    check(session.score===expected,'MC score '+q._id);
    chooseAnswer(idx);check(session.score===expected,'duplicate MC');
    check(document.querySelector('#qexplain').textContent.includes(q.e),'missing why '+q._id);
    if(!expected)check(document.querySelector('#qfeedback .study-correct').textContent.includes(q.o[q.a]),'correct contrast');
    const opts=khOptions(q);check(opts.length===4&&q.o.every(o=>opts.includes(o)),'foreign distractors '+q._id);
    khSession={m:q.module,u:q.unit,queue:[q],idx:0,score:0,missed:[]};khRender();
    const k=khSession.currentOpts.indexOf(q.o[pick]);khPick(k,document.querySelector('#khGrid').children[k]);
    check(khSession.score===expected,'game score '+q._id);
    khPick(k,document.querySelector('#khGrid').children[k]);check(khSession.score===expected,'duplicate game');
    check(document.querySelector('#khBanner').textContent.includes(q.e),'game why');
    if(!expected){check(khSession.missed.length===1,'missed count');khResults();check(document.querySelector('#khMissed').textContent.includes(q.o[pick]),'game chosen answer');}
    choices++;
   }mc++;
  }
  goHome();showKahoot();
  khBegin(1,2);check(khSession.queue.every(q=>!q.qtype),'slots leaked into game');
  return {mc,choices,slots};
 });
 assert.deepEqual(totals,{mc:606,choices:2424,slots:5});
 console.log('PASS all 611 questions: 2,424 selections per mode, authored distractors, duplicate scoring, all slot keys and partial credit.');
 // Mixed score and missed-review explanations/images.
 await page.evaluate(()=>{launch([BANK[12],BANK[51]],'Mixed');chooseAnswer(session.questions[0].answer);session.idx=1;renderQuestion();chooseAnswer((session.questions[1].answer+1)%4);showResults();});
 assert.equal(await page.locator('#scorePct').textContent(),'50%');
 assert.equal(await page.locator('#missedList .missed').count(),1);
 assert.equal(await page.locator('#missedList .study-media').count(),1);
 // Every new source image loads only after answering and opening its review.
 for(const v of audit.visuals){
  await page.goto(url);let seen=[];const listener=r=>seen.push(r.url());page.on('request',listener);
  await page.evaluate(id=>{const q=BANK.find(q=>q.studyRef===id);if(!q)throw Error('unmapped '+id);launch([q],'Image');},v.id);
  assert.equal(await page.locator('#qfeedback .study-media').count(),0);
  assert.equal(seen.filter(s=>s.includes('/study/images/')).length,0);
  await page.evaluate(()=>{const c=session.questions[0];if(c.kind==='mc')chooseAnswer(c.answer);else gradeSlots();});
  assert.equal(seen.filter(s=>s.includes('/study/images/')).length,0);
  await page.locator('#qfeedback .study-media summary').click();
  await page.waitForFunction(()=>{const im=document.querySelector('#qfeedback .study-media img');return im&&im.complete&&im.naturalWidth>0;});
  const size=await page.locator('#qfeedback .study-media img').evaluate(im=>[im.naturalWidth,im.naturalHeight]);
  assert.deepEqual(size,[v.width,v.height]);assert.equal(seen.filter(s=>s.includes('/study/images/')).length,1);
  page.off('request',listener);
 }
 console.log('PASS 29 source images: hashes, dimensions, delayed requests, valid question associations.');
 for(const width of [390,768,1280]){
  await page.setViewportSize({width,height:900});await page.goto(url+'/cmt-quiz.html');
  await page.evaluate(()=>{launch([BANK[12]],'Study');chooseAnswer((session.questions[0].answer+1)%4);});
  await page.locator('#qfeedback .study-media summary').click();
  await page.waitForFunction(()=>document.querySelector('#qfeedback .study-media img').naturalWidth>0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator('#qfeedback').scrollIntoViewIfNeeded();
  console.log('STUDY_SCREENSHOT_'+width+'='+(await page.screenshot({type:'jpeg',quality:50})).toString('base64'));
  await page.locator('#qfeedback .study-zoom').first().click();
  assert(await page.locator('#study-image-dialog').isVisible());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#study-image-dialog').isVisible(),false);
  await page.evaluate(()=>{khSession={m:1,u:1,queue:[BANK[51]],idx:0,score:0,missed:[]};khHideAll();hide('homeMenu');hide('quiz');show('home');show('kahootPlay');khRender();const i=khSession.currentOpts.findIndex(x=>x!==BANK[51].o[BANK[51].a]);khPick(i,el('khGrid').children[i]);});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 }
 // Image failure does not remove feedback or alter an earned score; retry works.
 await page.goto(url);await page.route('**/study/images/**',r=>r.abort());
 await page.evaluate(()=>{launch([BANK[12]],'Failure');chooseAnswer(session.questions[0].answer);});
 await page.locator('#qfeedback .study-media summary').click();
 await page.getByRole('button',{name:'Retry image',exact:true}).waitFor({state:'visible'});
 assert.equal(await page.evaluate(()=>session.score),1);
 assert((await page.locator('#qexplain').textContent()).includes('Why:'));
 await page.unroute('**/study/images/**');await page.getByRole('button',{name:'Retry image',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('#qfeedback .study-media img').naturalWidth>0);
 // Keyboard and both entry points.
 for(const entry of ['index.html','cmt-quiz.html']){
  await page.goto(url+'/'+entry);await page.evaluate(()=>launch([BANK[0]],'Keyboard'));
  await page.locator('#qoptions .opt').first().focus();await page.keyboard.press('Enter');
  assert(await page.locator('#nextBtn').isEnabled());
 }
 assert.deepEqual(errors,[]);
 console.log('PASS responsive review, enlargement/Escape, image failure/retry, mixed results, keyboard and both entry points.');
 }finally{await browser.close();}
})().then(()=>server.close()).catch(e=>{console.error(e);server.close();process.exitCode=1;});
