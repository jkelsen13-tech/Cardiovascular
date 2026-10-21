/* Root-run native regression only. This authoring task does not launch it.
 * CARDIO_REPO=/workspace/Cardiovascular-guided-pilot-20261021 PORT=8859
 * GUIDED_ADVANCED_MODULES=M10,M11,M12,M13,M14 node advanced-data-browser.cjs
 * Requested modules must exist locally and be registered by the served entrypoint.
 */
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('/workspace/cloud-setup/tools/node_modules/playwright');
const repo=path.resolve(process.env.CARDIO_REPO||'/workspace/Cardiovascular-guided-pilot-20261021');
const out=path.resolve(process.env.GUIDED_ADVANCED_OUT||'/workspace/scratch/heart-guided-audio-20261021/advanced-data-browser');
const modules=(process.env.GUIDED_ADVANCED_MODULES||'M10,M11,M12,M13,M14').split(',').map(x=>x.trim());
A(modules.length&&modules.every(x=>/^M1[0-4]$/.test(x)),'Select explicit advanced modules M10–M14');
const base=process.env.CARDIO_BASE_URL||`http://127.0.0.1:${process.env.PORT||8859}/`,origin=new URL(base).origin;
const stepMs=Number(process.env.GUIDED_ADVANCED_STEP_MS||90000),totalMs=Number(process.env.GUIDED_ADVANCED_TOTAL_MS||1200000);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=f=>fs.readFileSync(path.join(repo,f));
const expected=modules.flatMap(m=>require(path.join(repo,`guided-study/lessons-${m.toLowerCase()}.js`))).map(l=>({id:l.id,module:l.module,audio:l.audio,cues:l.cues}));
const expectedIds=expected.map(l=>l.id);A.equal(new Set(expectedIds).size,expected.length);
for(const l of expected)A.equal(sha(read(l.audio.src)),l.audio.sha256,'Local expected approved MP3 identity');
const protectedFiles=['ecg-study/module.js','ecg-study/content.js','ecg/trainer.js','ecg/source-audit.json','tools/heart-v3/preservation-baseline.json'];
const sourceBefore=Object.fromEntries(protectedFiles.map(f=>[f,sha(read(f))]));
fs.mkdirSync(out,{recursive:true});
const records=[],errors=[],externalRequests=[],reviewRequests=[],screenshots=new Set();let browser,page,timer,current='start';
const write=(name,obj)=>fs.writeFileSync(path.join(out,name),JSON.stringify(obj,null,2)+'\n');
const receipt=()=>({current,modules,expectedLessons:expected.length,expectedCues:expected.reduce((n,l)=>n+l.cues.length,0),records,errors,externalRequests,reviewRequests,sourceBefore});
async function frames(){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
async function idle(){await page.waitForFunction(()=>!GuidedStudy.session.inspect().busy);const s=await page.evaluate(()=>GuidedStudy.session.inspect());A.equal(s.error,null,current);return s;}
async function blobHash(kind){return page.evaluate(async kind=>{const el=kind==='audio'?GuidedStudy.audio:document.querySelector('#guidedExplanationStudy img');const src=el.currentSrc||el.src;const response=await fetch(src);if(!response.ok)throw Error('Visible asset could not be fetched for hash');const buffer=await response.arrayBuffer();const digest=await crypto.subtle.digest('SHA-256',buffer);return {sha256:Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join(''),bytes:buffer.byteLength};},kind);}
async function inspect(){return page.evaluate(()=>{const h=HeartV3Study.inspect(),sample=h.state?.sample;h.signal=sample&&window.HeartV3Explorer?HeartV3Explorer.cellSignals({...sample,period:h.period}):null;h.event=sample&&window.HeartV3Explorer?HeartV3Explorer.cellularEvent({...sample,period:h.period},h.state.routeContext||{}):null;h.phaseWindow=h.active?HeartV3Study.guided.capture().phaseWindow:null;const r=CardiorespiratoryStudy.inspectBreathing();return {session:GuidedStudy.session.inspect(),audio:{time:GuidedStudy.audio.currentTime,paused:GuidedStudy.audio.paused,muted:GuidedStudy.audio.muted,duration:GuidedStudy.audio.duration,readyState:GuidedStudy.audio.readyState},
 heart:h,respiratory:{visible:!document.getElementById('cardiorespiratoryStudy').classList.contains('hidden'),state:CardiorespiratoryStudy.getState(),render:r,mechanics:CardiorespiratoryStudy.getMechanics(),window:r?CardiorespiratoryStudy.guided.capture().window:null},
 leadVisible:!document.getElementById('leadPlacementHome').classList.contains('hidden'),card:GuidedExplanation.inspect(),
 trainer:{session:JSON.stringify(typeof ecgSession==='undefined'?null:ecgSession),pending:!!(typeof ecgPendingReview!=='undefined'&&ecgPendingReview),calls:window.__advancedTrainerCalls}};});}
function media(x,c){A.equal(x.session.error,null);A.equal(x.session.cueId,c.id);A.equal(x.session.mode,'guided');A.equal(x.audio.paused,true);A.equal(x.session.playing,false);A(Math.abs(x.audio.time-c.at)<.02,'Actual MP3 cue seek '+c.id);}
function heart(x,s){const h=x.heart;A(h.active);A.equal(h.state.selected,s.selected);A.equal(h.state.mode,s.mode);A.equal(h.state.route,s.route||null);A.equal(h.state.playing,false);A.equal(h.rafRunning,false);A.equal(h.renderer.sourceMeshes,51);A.equal(h.renderer.sourceTopologyRetained,true);A.equal(h.state.bloodView,s.bloodView);if(s.route){A(h.detail);A.equal(h.detail.stage,s.route+'.'+s.stage);A.equal(h.state.stage,s.route+'.'+s.stage);A.equal(h.renderer.detail,true);A.equal(h.detail.animationLoopAllocated,false);A.equal(h.detail.rendererAllocated,false);A.equal(h.renderer.lastRenderedDetailStage,s.route+'.'+s.stage);A(h.renderer.renderedDetailObjectNames.length>0);A.equal(h.explorer.independent,false);A.equal(h.explorer.practice.hidden,false);A.equal(h.explorer.practice.prediction,null);}else A.equal(h.state.conductionView,s.conductionView);A.equal(h.renderer.activeRendererCount,1);A.equal(h.renderer.ownsAnimationLoop,false);A.deepEqual(h.state.parameters,s.parameters);cellular(h,s.simulation);if(s.simulation?.kind==='electrical')A.equal(h.state.sample.electrical.stage,s.simulation.stage);if(s.simulation?.kind==='phase')A.equal(h.state.sample[(s.simulation.side||'left')+'Phase'],s.simulation.phase);}
function respiratory(x,s){const r=x.respiratory;A(r.visible);A.equal(r.state.playing,false);A.equal(r.state.ventilation,'spontaneous');A.deepEqual(r.state.breathing,s.breathing);A(r.render);A.equal(r.render.explorer.stage,s.stage);A.equal(r.render.explorer.segment,s.segment);if(s.selected)A.equal(r.render.selected,s.selected);A.equal(r.render.explorer.isolate,false);A.equal(r.render.explorer.sourceBoundary,s.stage==='whole'?'hra':'instructional');if(s.stage==='membrane')A.equal(r.render.explorer.insetRendered,true);A.equal(r.mechanics.parameters.ventilation,'spontaneous');A(r.mechanics.inspiration);A(r.mechanics.flow>=-1e-9);A(r.mechanics.alveolar<=1e-9);}
async function cardReadability(c){
 const result=await page.evaluate(()=>{
  const panel=document.querySelector('#guidedExplanationStudy'),vw=document.documentElement.clientWidth;
  const rgb=s=>{const a=s.match(/[\d.]+/g)?.map(Number)||[];return [a[0]||0,a[1]||0,a[2]||0,a.length>3?a[3]:1];};
  const blend=(f,b)=>[...f.slice(0,3).map((v,i)=>v*f[3]+b[i]*(1-f[3])),1];
  const background=e=>{const chain=[];for(let p=e;p;p=p.parentElement)chain.unshift(p);return chain.reduce((b,p)=>blend(rgb(getComputedStyle(p).backgroundColor),b),[255,255,255,1]);};
  const luminance=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
  const text=[],overflow=[];
  for(const el of [panel,...panel.querySelectorAll('*')]){
   const r=el.getBoundingClientRect(),style=getComputedStyle(el);if(!r.width||!r.height||style.display==='none'||style.visibility==='hidden')continue;
   if(r.left<-.5||r.right>vw+.5||el.scrollWidth>el.clientWidth+1||((style.overflowY==='hidden'||style.overflowY==='clip')&&el.scrollHeight>el.clientHeight+1))overflow.push({tag:el.tagName,left:r.left,right:r.right,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth});
   if(![...el.childNodes].some(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim()))continue;
   const bg=background(el),fg=blend(rgb(style.color),bg),a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   text.push({tag:el.tagName,text:el.textContent.slice(0,100),color:style.color,background:bg.slice(0,3),contrast:ratio,heading:/^H[1-6]$/.test(el.tagName)});
  }
  const r=panel.querySelector('button').getBoundingClientRect();return {text,overflow,back:{width:r.width,height:r.height},documentWidth:document.documentElement.scrollWidth,viewportWidth:vw};
 });
 A(result.text.length>0,'Visible card text '+c.id);A(result.text.some(x=>x.heading),'Visible heading '+c.id);
 for(const t of result.text)A(t.contrast>=4.5,`${c.id} ${t.tag} contrast ${t.contrast.toFixed(2)} < 4.5: ${t.text}`);
 A(result.back.width>=44&&result.back.height>=44,'44px card back control '+c.id);A.deepEqual(result.overflow,[],'No horizontal overflow/clipped text '+c.id);A(result.documentWidth<=result.viewportWidth+1,'No page horizontal overflow '+c.id);
 return {minimumTextContrast:Math.min(...result.text.map(t=>t.contrast)),minimumHeadingContrast:Math.min(...result.text.filter(t=>t.heading).map(t=>t.contrast)),back:result.back,noOverflow:true};
}
function cellular(h,sim){
 if(sim?.kind!=='cellular')return;A(h.event&&h.signal);A.equal(h.event.phase,sim.stage==='removal-visible'?'removal':sim.stage);
 if(sim.stage==='removal-visible')A(h.signal.calcium<.65,'Visible calcium-removal transport threshold');
 if(h.detail.stage==='routeB.cell'){
  A(h.detail.invariants.cardiacECC);
  if(sim.stage==='removal-visible')for(const n of ['SERCA reuptake cue','NCX extrusion cue'])A(h.detail.objects.some(o=>o.name.startsWith(n)&&o.visible),'Rendered moving transport: '+n);
  if(sim.stage==='release'&&h.signal.calcium>.1)A(h.detail.objects.some(o=>o.name.startsWith('SR Ca release cue')&&o.visible));
 }
 if(h.detail.stage==='routeB.sarcomere'){const f=h.detail.invariants.filamentState;A(f);A.equal(f.thinFilamentLength,2.25);A.equal(f.thickFilamentLength,3.3);A.equal(f.scaledFilaments,false);}
}
function windowPosition(x,s){
 const w=s.organ==='heart'?x.heart.phaseWindow:x.respiratory.window;A(w,'Actual audio-owned phase window');A.equal(w.audioStart,s.simulation.anchorAudio);A.equal(w.audioEnd,s.simulation.endAudio);
 const expectedTime=w.start+(w.end-w.start)*Math.max(0,Math.min(1,(x.audio.time-w.audioStart)/(w.audioEnd-w.audioStart)));
 A(Math.abs((s.organ==='heart'?x.heart.state.time:x.respiratory.state.time)-expectedTime)<1e-7,'Actual model cursor follows measured audio window');return w;
}
async function checkSweeps(l,trainerBefore){
 for(const c of l.cues.filter(c=>c.scene.simulation?.sweep)){
  const s=c.scene,sim=s.simulation,rows=[];
  for(const f of [0,.5,.999]){
   current=c.id+' sweep '+f;const t=sim.anchorAudio+(sim.endAudio-sim.anchorAudio)*f;A(await page.evaluate(t=>GuidedStudy.session.seek(t),t));await idle();await frames();const x=await inspect();
   A.equal(x.session.cueId,c.id);A.equal(x.audio.paused,true);A.equal(x.trainer.session,trainerBefore.session);A.equal(x.trainer.pending,trainerBefore.pending);A(Object.values(x.trainer.calls).every(n=>n===0));windowPosition(x,s);
   if(s.organ==='heart'){heart(x,s);cellular(x.heart,sim);}else respiratory(x,s);
   rows.push({audio:x.audio.time,time:s.organ==='heart'?x.heart.state.time:x.respiratory.state.time,event:x.heart.active?x.heart.event?.phase:null,calcium:x.heart.active?x.heart.signal?.calcium:null,mechanics:s.organ==='respiratory'?x.respiratory.mechanics:null});
  }
  A(rows[2].time>rows[0].time,'Actual model interval advances');if(s.organ==='respiratory')A(rows[2].mechanics.volume>rows[0].mechanics.volume,'Existing inspiration increases model volume');
  records.push({kind:'measured-model-sweep',cue:c.id,organ:s.organ,stage:s.stage,rows});
 }
}
async function microReturns(trainerBefore){
 const items=expected.flatMap(l=>l.cues.filter(c=>c.scene.organ==='heart'&&c.scene.route).map(c=>({l,c}))),seen=new Set();
 for(const {l,c} of items){const key=c.scene.route+'.'+c.scene.stage;if(seen.has(key))continue;seen.add(key);
  A(await page.evaluate(id=>GuidedStudy.load(id),l.id));await checkCue(c,trainerBefore);
  const saved=await page.evaluate(()=>HeartV3Study.guided.capture());A(saved.routeSnapshot);
  const control=page.locator('[data-h3-near-return]');A(await control.isVisible());const size=await control.boundingBox();A(size.width>=44&&size.height>=44,'44px near-scene return control');await control.click();await idle();await frames();let x=await inspect();
  A.equal(x.session.mode,'explore');A.equal(x.audio.paused,true);A.equal(x.heart.state.route,null);A.equal(x.heart.renderer.detail,false);A.equal(x.heart.state.selected,saved.routeSnapshot.selected);A.equal(x.heart.state.mode,saved.routeSnapshot.mode);A.deepEqual(x.heart.camera,saved.routeSnapshot.renderer,'Original source camera restored by actual return control');
  A(await page.evaluate(()=>GuidedStudy.session.returnGuided()));await idle();await page.waitForFunction(key=>HeartV3Study.inspect().renderer?.lastRenderedDetailStage===key,key);x=await inspect();media(x,c);heart(x,c.scene);cellular(x.heart,c.scene.simulation);
  const restored=await page.evaluate(()=>HeartV3Study.guided.capture());A.equal(restored.state.time,saved.state.time);A.deepEqual(restored.camera,saved.camera);A.deepEqual(restored.phaseWindow,saved.phaseWindow);A.equal(restored.signature,saved.signature);
  records.push({kind:'actual-micro-return-and-guided-restore',cue:c.id,stage:key,sourceReturnCameraRestored:true,measuredWindowRestored:true});
 }
}

async function checkCue(c,trainerBefore){
 current=c.id;A(await page.evaluate(id=>GuidedStudy.session.seekCue(id),c.id));await idle();await frames();
 if(c.scene.organ==='heart'&&c.scene.route)await page.waitForFunction(key=>HeartV3Study.inspect().renderer?.lastRenderedDetailStage===key,c.scene.route+'.'+c.scene.stage);
 const x=await inspect();let readability=null;media(x,c);A.equal(x.trainer.session,trainerBefore.session);A.equal(x.trainer.pending,trainerBefore.pending);A(Object.values(x.trainer.calls).every(n=>n===0),'No trainer entry/review/scoring calls');
 if(c.scene.organ==='explanation'){
  A(x.card.visible);A.deepEqual(x.card.scene,c.scene);A.equal(x.heart.active,false);A.equal(x.respiratory.visible,false);A.equal(x.leadVisible,false);
  A.equal(await page.locator('#guidedExplanationStudy h2').textContent(),c.scene.title);
  A((await page.locator('#guidedExplanationStudy').textContent()).includes(c.scene.qualification));
  const figure=page.locator('#guidedExplanationStudy figure'),img=page.locator('#guidedExplanationStudy img'),caption=page.locator('#guidedExplanationStudy figcaption');
  if(c.scene.illustration){
   A(await figure.isVisible());await page.waitForFunction(()=>{const i=document.querySelector('#guidedExplanationStudy img');return i.complete&&i.naturalWidth>0;});
   A.equal(await img.getAttribute('src'),c.scene.illustration.src);A.equal(await img.getAttribute('alt'),c.scene.illustration.alt);
   const text=await caption.textContent();A(text.includes(c.scene.illustration.source));A(text.includes(c.scene.illustration.qualification));
   const actual=await blobHash('image');A.equal(actual.sha256,c.scene.illustration.sha256,'Actual displayed source bytes');
   if(!screenshots.has(c.scene.illustration.src)){await figure.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,path.basename(c.scene.illustration.src,'.png')+'-qualified-native.png')});screenshots.add(c.scene.illustration.src);}
  }else{A.equal(await figure.getAttribute('hidden'),'');A.equal(await img.getAttribute('src'),null,'No phantom previous/unsupported strip');A.equal(await caption.textContent(),'');}readability=await cardReadability(c);
 }else if(c.scene.organ==='heart'){A.equal(x.card.visible,false);A.equal(x.respiratory.visible,false);heart(x,c.scene);}
 else if(c.scene.organ==='respiratory'){A.equal(x.card.visible,false);A.equal(x.heart.active,false);respiratory(x,c.scene);}
 else throw Error('Unimplemented advanced test scene type '+c.scene.organ);
 if(c.scene.simulation?.sweep)windowPosition(x,c.scene);
 records.push({lesson:x.session.lessonId,cue:c.id,audio:x.audio.time,organ:c.scene.organ,route:c.scene.route||null,stage:c.scene.stage||null,illustration:c.scene.illustration?.src||null,exactSceneAndSourceBytes:true,readability});if(c.scene.organ==='explanation'&&!c.scene.illustration&&!screenshots.has(x.session.lessonId.split('.')[0]+'-plain')){await page.locator('#guidedExplanationStudy').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,x.session.lessonId.split('.')[0]+'-plain-card-native.png')});screenshots.add(x.session.lessonId.split('.')[0]+'-plain');}return x;
}
(async()=>{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  page=await browser.newPage({viewport:{width:1024,height:1366}});page.setDefaultTimeout(stepMs);page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{const u=route.request().url();if(/^https?:/.test(u)&&new URL(u).origin!==origin){externalRequests.push(u);return route.abort();}return route.continue();});
  page.on('request',r=>{if(/\/ecg\/reviews\//.test(r.url()))reviewRequests.push(r.url());});
  timer=setTimeout(()=>{console.error('Advanced browser deadline at '+current);void browser.close();},totalMs);
  await page.goto(base);await page.waitForFunction(()=>window.GuidedStudy&&window.GuidedExplanation);
  const registered=await page.evaluate(ids=>GuidedStudyLessons.filter(l=>ids.includes(l.id)).map(l=>({id:l.id,module:l.module,audio:l.audio,cues:l.cues})),expectedIds);
  A.deepEqual(registered.sort((a,b)=>a.id.localeCompare(b.id)),expected.slice().sort((a,b)=>a.id.localeCompare(b.id)),'Every requested module must actually be registered with exact shipped data');
  await page.evaluate(()=>{localStorage.setItem('advanced-qualified-cards-sentinel','unchanged');window.__advancedTrainerCalls={};for(const name of ['ecgBegin','ecgBeginTest','ecgLoadReview','ecgCheck','ecgScore']){const original=window[name];if(typeof original==='function'){window.__advancedTrainerCalls[name]=0;window[name]=function(){window.__advancedTrainerCalls[name]++;return original.apply(this,arguments);};}}});
  const storageBefore=await page.evaluate(()=>({...localStorage}));const trainerBefore=(await inspect()).trainer;
  for(const l of expected){
   current='load '+l.id;A(await page.evaluate(id=>GuidedStudy.load(id),l.id));await idle();
   const audio=await blobHash('audio');A.equal(audio.sha256,l.audio.sha256,'Actual media-element source bytes '+l.id);
   A(Math.abs(await page.evaluate(()=>GuidedStudy.audio.duration)-l.audio.duration)<.08);
   for(const c of l.cues)await checkCue(c,trainerBefore);await checkSweeps(l,trainerBefore);
   write('partial.json',{...receipt(),completedLesson:l.id});console.log('Checked '+l.id);
  }
  // Actual media progression comes from a real Play click, without autoplay overrides.
  for(const module of modules){const l=expected.find(l=>l.module===module);A(await page.evaluate(id=>GuidedStudy.load(id),l.id));await idle();await page.locator('[data-guided-action="play"]').click();await page.waitForFunction(()=>GuidedStudy.audio.currentTime>.25);A(await page.evaluate(()=>GuidedStudy.session.pause()));const x=await inspect();A(x.audio.time>.25);A.equal(x.audio.muted,false);A.equal(x.audio.paused,true);records.push({kind:'actual-gesture-owned-audio',module,time:x.audio.time,muted:x.audio.muted});}
  // Round-trip one source illustration and one explicit no-strip card.
  const illustrated=expected.flatMap(l=>l.cues.map(c=>({l,c}))).find(x=>x.c.scene.illustration),plain=expected.flatMap(l=>l.cues.map(c=>({l,c}))).find(x=>x.c.scene.organ==='explanation'&&!x.c.scene.illustration);
  for(const item of [illustrated,plain].filter(Boolean)){A(await page.evaluate(id=>GuidedStudy.load(id),item.l.id));const before=await checkCue(item.c,trainerBefore);A(await page.evaluate(()=>GuidedStudy.session.enterExplore()));A.equal(await page.evaluate(()=>GuidedStudy.audio.paused),true);A(await page.evaluate(()=>GuidedStudy.session.returnGuided()));const after=await inspect();A.equal(after.session.cueId,item.c.id);A(Math.abs(after.audio.time-before.audio.time)<.02);A.deepEqual(after.card.scene,item.c.scene);records.push({kind:'guided-explore-return',cue:item.c.id,illustration:item.c.scene.illustration?.src||null});}
  await microReturns(trainerBefore);
  const storageAfter=await page.evaluate(()=>({...localStorage}));delete storageBefore['cmt.guided-lesson.v1'];delete storageAfter['cmt.guided-lesson.v1'];A.deepEqual(storageAfter,storageBefore);
  A.deepEqual(Object.fromEntries(protectedFiles.map(f=>[f,sha(read(f))])),sourceBefore);A.deepEqual(errors,[]);A.deepEqual(externalRequests,[]);A.deepEqual(reviewRequests,[]);
  write('result.json',{...receipt(),passed:true,lessons:expected.length,cues:expected.reduce((n,l)=>n+l.cues.length,0),protectedStoragePreserved:true,trainerEntryReviewAndScoringNeverInvoked:true,allCardTextAndHeadingsContrastAtLeast4_5:true,allCardBackButtons44px:true,allCardOverflowChecksPassed:true,measuredModelSweepsChecked:true,actualMicroReturnsChecked:true,
   qualification:'Actual local MP3/blob hashes, currentTime seeks, explicit cards and exact retained-image bytes/captions on native cloud Chromium; qualified existing model bindings checked when present. No new strip/classification/caliper/clinical engine, calibrated physiology, listening, physical iPad or independent clinical/Cursor acceptance claim. Default trainer state was preserved; no nonempty trainer-session fixture was created.'});console.log('PASS selected advanced native bindings');
 }finally{clearTimeout(timer);await browser.close();}
})().catch(e=>{write('failure.json',{...receipt(),message:e.message,stack:e.stack});console.error(e);process.exitCode=1;});
