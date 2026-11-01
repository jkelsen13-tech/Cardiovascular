'use strict';
// Real-browser regression for slideshow ownership and explicitly selected tours.
const {chromium}=require('playwright'),A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.CARDIO_BASE_URL||'http://127.0.0.1:8765/';
const output=process.env.COURSE_FIX_EVIDENCE||'course-presentation-evidence';fs.mkdirSync(output,{recursive:true});
const result={checks:[],errors:[],lessons:[],passed:false,physicalIPad:false,fullListeningReview:false};
const check=(v,name)=>{A.ok(v,name);result.checks.push(name);};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,chromiumSandbox:true,channel:process.env.PLAYWRIGHT_CHANNEL||undefined});
 const context=await browser.newContext({viewport:{width:1024,height:768}}),p=await context.newPage();p.setDefaultTimeout(60000);
 p.on('pageerror',e=>result.errors.push(e.message));
 const state=()=>p.evaluate(()=>GuidedCourse.inspect());
 const ready=()=>p.waitForFunction(()=>window.GuidedCourse&&!GuidedCourse.inspect().loading&&!GuidedCourse.inspect().busy&&!GuidedCourse.inspect().preparing);
 const choose=async id=>{await p.evaluate(id=>GuidedCourse.select(id),id);await p.evaluate(()=>GuidedCourse.begin());await ready();check(!(await state()).error,'Prepare '+id);};
 const seek=async t=>{await p.evaluate(t=>GuidedCourse.seek(t),t);await ready();};
 try{
  await p.goto(base);await ready();check(!(await state()).playing,'Initial page is silent');
  await p.evaluate(()=>{localStorage.setItem('course-presentation-sentinel','keep');window.webglCalls=0;const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(/webgl/i.test(type))webglCalls++;return original.call(this,type,...args);};});
  const lessons=await p.evaluate(()=>GuidedCourse.sequence().map(l=>({id:l.id,pages:l.pages})));
  for(const l of lessons){
   await choose(l.id);let s=await state();
   check(s.presentation==='slides'&&s.applied?.organ==='source','Source-only entry '+l.id);
   check(s.sourcePage>=l.pages[0]&&s.sourcePage<=l.pages[1]&&!s.playing,'Bounded silent source '+l.id);
   const times=await p.evaluate(()=>GuidedCourse.presentationCues().map(c=>c.at));
   for(const t of [times[Math.floor(times.length/2)],times.at(-1)]){await seek(t+.01);s=await state();check(s.applied?.organ==='source'&&!s.error,'Source-only seek '+l.id+' @ '+t);}
   result.lessons.push(l.id);
  }
  check(result.lessons.length===84,'Every source lesson entered and sought in a real browser');
  check(await p.evaluate(()=>webglCalls)===0,'No slideshow lesson creates a WebGL renderer');
  // The exact owner-reported switch at 4.01s is now a source-image cue.
  await choose('source.lesson.p0024');await seek(3.8);await p.click('[data-seq-play]');
  await p.waitForFunction(()=>GuidedCourse.audio.currentTime>5&&GuidedCourse.inspect().sourcePage===27);
  check((await state()).playing&&(await state()).applied.organ==='source','Native playback crosses 4.01s without opening lungs');
  await p.evaluate(()=>{window.slideMutations=[];window.slideObserver=new MutationObserver(rows=>slideMutations.push(...rows.map(r=>r.attributeName)));slideObserver.observe(document.querySelector('[data-seq-source-image]'),{attributes:true,attributeFilter:['src','hidden','width','height']});});
  await p.waitForFunction(()=>GuidedCourse.audio.currentTime>6.2);
  check(await p.evaluate(()=>slideMutations.length)===0,'Same-page playback does not blank/reassign the source image');
  await p.evaluate(()=>GuidedCourse.pause());await ready();
  await p.locator('[data-seq-source-image]').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(output,'lesson3-directions.png')});
  await p.evaluate(()=>document.querySelector('[data-seq-source-details]').open=true);await p.selectOption('[data-seq-page]','25');await seek(12);
  check((await state()).sourcePage===25&&!(await state()).sourceFollow,'Manual slide selection survives narration seek');
  await p.click('[data-seq-follow]');await ready();check((await state()).sourcePage===27,'Follow narration restores directional diagram');
  await seek(20.4);check((await state()).sourcePage===28,'Body-plane explanation automatically shows page28');
  await p.locator('[data-seq-source-image]').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(output,'lesson3-planes.png')});
  await p.evaluate(()=>document.querySelector('[data-seq-source-details]').open=true);await p.selectOption('[data-seq-page]','25');const before=await state();
  await p.evaluate(()=>GuidedCourse.enterExplore());await p.evaluate(()=>GuidedCourse.resume());await ready();
  check((await state()).sourcePage===25&&!(await state()).sourceFollow&&Math.abs((await state()).time-before.time)<.03&&!(await state()).playing,'Explore returns exact slide/audio silently');
  // Enrichment is an explicit different lesson type, not an automatic fallback.
  await p.evaluate(()=>GuidedCourse.select('M02.01'));await ready();
  const heartTime=await p.evaluate(()=>GuidedStudyLessons.find(c=>c.id==='M02.01').cues.find(c=>c.scene.organ==='heart').at);await seek(heartTime+.04);
  check((await state()).presentation==='simulation'&&(await state()).applied.organ==='heart','Explicit simulation still drives the real heart view');
  check(await p.evaluate(()=>webglCalls)>0,'The explicit simulation actually creates a renderer');
  await p.evaluate(()=>GuidedCourse.returnDetour());await ready();
  check((await state()).sourceLessonId===before.sourceLessonId&&(await state()).sourcePage===25&&Math.abs((await state()).time-before.time)<.03&&!(await state()).playing,'Simulation tour returns to the source course without lost position');
  await p.reload();await p.click('#continueFullCourse');await ready();
  check((await state()).sourcePage===25&&!(await state()).sourceFollow&&Math.abs((await state()).time-before.time)<.03&&!(await state()).playing,'Reload resumes the exact held slide silently');
  check(await p.evaluate(()=>localStorage.getItem('course-presentation-sentinel'))==='keep','Unrelated saved progress remains unchanged');
  await choose('source.lesson.p0030');await seek(10);
  check((await state()).sourcePage===31&&(await state()).applied.organ==='source','Lesson4 no longer opens heart at9.70s');
  // One native consecutive-clip transition, with the same shared audio element.
  await choose('source.lesson.p0024');await seek(29.6);await p.click('[data-seq-play]');
  await p.waitForFunction(()=>GuidedCourse.inspect().clipId==='M01.05'&&GuidedCourse.inspect().playing);await ready();
  await p.waitForFunction(()=>GuidedCourse.audio.currentTime>2.3&&GuidedCourse.inspect().sourcePage===27);
  check((await state()).applied.organ==='source','Consecutive real clip uses proximal/distal body diagram');
  await p.evaluate(()=>GuidedCourse.pause());await ready();
  check(await p.evaluate(()=>GuidedCourse.audio===ContextualAudio.audio),'One existing shared audio player');
  for(const size of [{width:390,height:844},{width:768,height:1024},{width:1024,height:768}]){
   await p.setViewportSize(size);await p.evaluate(()=>document.documentElement.style.fontSize='200%');
   check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'200% reflow '+size.width);
   await p.locator('[data-seq-source-image]').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(output,'source-'+size.width+'-200percent.png')});
   await p.evaluate(()=>document.documentElement.style.fontSize='');
  }
  // Question source images must remain gated, even in source-follow mode.
  await choose('G02');await seek(26.3);
  check(await p.locator('[data-seq-source-image]').isHidden()&&await p.locator('[data-seq-reveal]').isVisible(),'Question answer image is not auto-revealed');
  // Slow obsolete diagram preparation must not win a later selection.
  const lateContext=await browser.newContext(),late=await lateContext.newPage();const held=[];
  await late.route('**/private-course/page/27.png',r=>held.push(r));await late.goto(base);
  await late.evaluate(()=>{GuidedCourse.select('source.lesson.p0024').then(()=>GuidedCourse.begin());});
  for(let i=0;i<100&&!held.length;i++)await late.waitForTimeout(100);check(held.length>0,'Slow future source image was held');
  await late.evaluate(()=>{GuidedCourse.select('source.lesson.p0030').then(()=>GuidedCourse.begin());});
  await late.waitForFunction(()=>GuidedCourse.inspect().sourceLessonId==='source.lesson.p0030'&&!GuidedCourse.inspect().loading&&!GuidedCourse.inspect().busy,{},{timeout:15000});
  for(const r of held)await r.continue();await late.waitForTimeout(100);
  check(await late.evaluate(()=>GuidedCourse.inspect().sourcePage===31&&GuidedCourse.inspect().applied.organ==='source'&&!GuidedCourse.inspect().playing),'Obsolete image cannot replace the new lesson or autoplay');
  await lateContext.close();
  const failedContext=await browser.newContext(),failed=await failedContext.newPage();
  await failed.route('**/private-course/page/24.png',r=>r.fulfill({status:404,body:'Missing test image'}));await failed.goto(base);
  await failed.evaluate(()=>GuidedCourse.select('source.lesson.p0024'));await failed.evaluate(()=>GuidedCourse.begin());
  check(await failed.evaluate(()=>!!GuidedCourse.inspect().error&&!GuidedCourse.inspect().playing&&GuidedCourse.inspect().presentation==='slides'),'Image failure pauses safely without a simulator fallback');
  check((await failed.locator('[data-seq-source-text]').textContent()).includes('anatomic'),'Original text remains available when its image fails');
  await failedContext.close();check(result.errors.length===0,'No page script errors');result.passed=true;
 }catch(e){result.failure=String(e.stack||e);try{await p.screenshot({path:path.join(output,'failure.png')});}catch(_){}throw e;}
 finally{fs.writeFileSync(path.join(output,'result.json'),JSON.stringify(result,null,2));await browser.close();console.log(JSON.stringify({passed:result.passed,checks:result.checks.length,sourceLessons:result.lessons.length,scope:'Desktop Chromium with native audio; viewport emulation is not physical iPad testing'}));}
})().catch(e=>{console.error(e);process.exitCode=1;});
