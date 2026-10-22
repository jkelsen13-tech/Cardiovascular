'use strict';
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),A=require('assert/strict');
const URL=process.env.GUIDED_URL||'http://127.0.0.1:'+(process.env.PORT||8859)+'/';
const OUT=process.env.ROUTE_CONTINUATION_OUT||path.resolve(__dirname,'../../../qualification-playback/route-continuation');
fs.mkdirSync(OUT,{recursive:true});
const records=[],errors=[];let browser,page;
function save(name,value){fs.writeFileSync(path.join(OUT,name),JSON.stringify(value,null,2));}
async function capture(){return page.evaluate(()=>({session:GuidedStudy.session.inspect(),heart:HeartV3Study.guided.capture(),view:HeartV3Study.inspect(),storage:{...localStorage},probe:JSON.parse(JSON.stringify(__routeProbe))}));}
async function seek(id){A.equal(await page.evaluate(id=>GuidedStudy.session.seekCue(id),id),true);await page.locator('#heartV3Study .heart-v3-viewport').scrollIntoViewIfNeeded();return capture();}
(async()=>{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 page=await browser.newPage({viewport:{width:1440,height:1400},deviceScaleFactor:1});page.setDefaultTimeout(45000);page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.__routeProbe={details:[],draws:[]};});
 await page.route('**/heart-study-v3/detail.js',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:await r.text()+`\n;(()=>{const create=HeartV3Detail.create;HeartV3Detail.create=function(...args){const d=create.apply(this,args),id=__routeProbe.details.filter(x=>x.kind==='create').length+1;__routeProbe.details.push({kind:'create',id,wall:performance.now()});for(const key of ['setRoute','dispose']){const fn=d[key];d[key]=function(...a){const at=performance.now(),ret=fn.apply(this,a);__routeProbe.details.push({kind:key,id,wall:at,end:performance.now(),stage:a[0]});return ret;};}return d;};})();`});});
 await page.goto(URL);A.equal(await page.evaluate(()=>GuidedStudy.load('M04.09')),true);
 await page.evaluate(()=>document.querySelector('[data-h3-render-host]').addEventListener('heartv3render',e=>__routeProbe.draws.push({wall:performance.now(),...e.detail})));
 const before=await seek('M04.09.s06');
 const identities=await page.evaluate(()=>{const l=GuidedStudyLessons.find(x=>x.id==='M04.09');return ['M04.09.s06','M04.09.s07'].map(id=>l.cues.find(c=>c.id===id));});
 const identityKeys=['organ','selected','mode','preset','parameters','bloodView','conductionView','conductionDisplay','wallHighlight','flowStop','route'];
 for(const k of identityKeys)A.deepEqual(identities[0].scene[k],identities[1].scene[k],'same route identity '+k);
 const at=await page.evaluate(()=>performance.now());
 const after=await seek('M04.09.s07');
 const transition={identityKeys,before,after,draws:after.probe.draws.filter(x=>x.wall>=at),details:after.probe.details.filter(x=>x.wall>=at)};
 records.push({kind:'same-route-stage',...transition});save('stage-transition.json',transition);
 A.equal(after.view.detail.stage,'routeB.myofibril');A.equal(after.view.renderer.sourceMeshes,51);A.equal(after.view.renderer.sourceTriangles,before.view.renderer.sourceTriangles);A.equal(after.view.renderer.sourceTopologyRetained,true);
 A.equal(after.view.detail.invariants.fibers.serialUnits,3);A.equal(after.view.detail.invariants.fibers.filamentLengthsFixed,true);
 A.equal(after.heart.state.parameters.heartRate,75);A.equal(after.heart.state.selected,'lv');A.equal(after.heart.state.mode,'four-chamber');A.equal(after.heart.state.playing,false);A.equal(after.session.playing,false);
 {
  A.equal(transition.details.filter(x=>x.kind==='create').length,0,'same route reuses detail owner');
  A.equal(transition.details.filter(x=>x.kind==='dispose').length,0,'same route does not dispose detail/materials');
  A(transition.draws.length>0,'actual render required');A(transition.draws.every(x=>x.detailStage==='routeB.myofibril'),'no intermediate gross/old-stage submissions');
  A.deepEqual(after.heart.routeSnapshot,before.heart.routeSnapshot,'retained gross origin snapshot');
  A.deepEqual(after.heart.explorer.source,before.heart.explorer.source,'retained source identity/camera/playback');
 }
 // A repeated audio sample keeps the exact capture, including the return view.
 const repeated=await capture();A.equal(await page.evaluate(()=>{const c=GuidedStudyLessons.find(l=>l.id==='M04.09').cues.find(c=>c.id==='M04.09.s07');return HeartV3Study.guided.apply(c.scene,GuidedStudy.audio.currentTime,{isCurrent:()=>true});}),true);A.deepEqual((await capture()).heart,repeated.heart,'unchanged sample keeps exact capture');records.push({kind:'unchanged-sample',captureUnchanged:true});
 // A stale context must make no mutation. This covers direct adapter callers too.
 const held=await capture();const stale=await page.evaluate(()=>{const c=GuidedStudyLessons.find(l=>l.id==='M04.09').cues.find(c=>c.id==='M04.09.s06');return HeartV3Study.guided.apply(c.scene,c.at,{isCurrent:()=>false});});A.equal(stale,false);A.deepEqual((await capture()).heart,held.heart,'stale adapter cannot change capture');records.push({kind:'already-stale-context',unchanged:true});
 // Pause the active request after preparation. The subsequent seek supersedes it.
 const canceled=await page.evaluate(async()=>{
  const g=HeartV3Study.guided,prepare=g.prepare;let release,hit;const gate=new Promise(r=>release=r),entered=new Promise(r=>hit=r);let once=true;
  g.prepare=async function(...a){const ok=await prepare.apply(this,a);if(once){once=false;hit();await gate;}return ok;};
  const old=GuidedStudy.session.seekCue('M04.09.s06');await entered;const latest=GuidedStudy.session.seekCue('M04.09.s07');release();const results=await Promise.all([old,latest]);g.prepare=prepare;return {results,session:GuidedStudy.session.inspect()};
 });A.deepEqual(canceled.results,[false,true]);A.equal(canceled.session.cueId,'M04.09.s07');A.equal(canceled.session.error,null);const latest=await capture();A.equal(latest.view.detail.stage,'routeB.myofibril');A.deepEqual(latest.heart.routeSnapshot,after.heart.routeSnapshot);records.push({kind:'latest-seek-wins',...canceled});
 // Explore and return restore the committed Guided capture without moving audio.
 const saved=await capture();A.equal(await page.evaluate(()=>GuidedStudy.session.enterExplore()),true);
 await page.evaluate(()=>HeartV3Study.seek(.4));A.equal(await page.evaluate(()=>GuidedStudy.session.returnGuided()),true);
 const returned=await capture();for(const key of ['selected','mode','route','stage','time','parameters','bloodView','conductionView','conductionDisplay'])A.deepEqual(returned.heart.state[key],saved.heart.state[key],key+' restored');A.deepEqual(returned.heart.camera,saved.heart.camera);A.deepEqual(returned.heart.routeSnapshot,saved.heart.routeSnapshot);A.equal(returned.session.audioTime,saved.session.audioTime);records.push({kind:'explore-return',stateAndCameraRestored:true});
 const omit=x=>{const out={...x};delete out['cmt.guided-lesson.v1'];return out;};A.deepEqual(omit(returned.storage),omit(before.storage),'unrelated progress unchanged');
 // A valid public adapter scene can keep the selection but leave cellular
 // detail. It must retain the original gross configuration/reset path.
 const fallback=await page.evaluate(async()=>{const c=structuredClone(GuidedStudyLessons.find(l=>l.id==='M04.09').cues.find(c=>c.id==='M04.09.s07'));c.scene.stage='wall';const start=__routeProbe.details.length;const applied=await HeartV3Study.guided.apply(c.scene,c.at,{isCurrent:()=>true});return {applied,heart:HeartV3Study.guided.capture(),detail:HeartV3Study.inspect().detail,lifecycle:__routeProbe.details.slice(start)};});
 A.equal(fallback.applied,true);A.equal(fallback.detail.stage,'routeB.wall');A.equal(fallback.heart.state.selected,'lv');A.equal(fallback.heart.state.teachingTrace,'chamber-pressure','non-cellular target uses gross reset');A.equal(fallback.lifecycle.filter(x=>x.kind==='create').length,1);A.equal(fallback.lifecycle.filter(x=>x.kind==='dispose').length,1);records.push({kind:'same-selected-non-cellular-fallback',...fallback});A.deepEqual(errors,[]);
 save('result.json',{passed:true,url:URL,records,errors,qualification:'Native cloud Chromium behavioral regression. No physical presentation/listening or clinical validation.'});console.log('PASS route continuation, state/origin preservation, stale/latest-wins ownership, Explore return and progress isolation.');
})().catch(async e=>{save('failure.json',{message:e.message,stack:e.stack,records,errors});console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();});
