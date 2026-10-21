/* CPU DOM/event integration. Real audio/browser/organ rendering is verified separately. */
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const core=require('../../guided-study/session.js'),factory=require('../../guided-study/player.js');
const clone=x=>JSON.parse(JSON.stringify(x));
class Element{
 constructor(tag,doc){this.tagName=tag.toUpperCase();this.ownerDocument=doc;this.children=[];this.attributes={};this.listeners={};this.parentNode=null;this.textContent='';this.value='';this.disabled=false;this.hidden=false;}
 setAttribute(k,v){this.attributes[k]=String(v);if(k==='id')this.id=String(v);if(k==='hidden')this.hidden=true;if(k==='value')this.value=String(v);}
 appendChild(el){el.parentNode=this;this.children.push(el);return el;}
 insertBefore(el,before){const i=this.children.indexOf(before);el.parentNode=this;this.children.splice(i<0?0:i,0,el);return el;}
 get firstChild(){return this.children[0]||null;}
 replaceChildren(){this.children.forEach(c=>c.parentNode=null);this.children=[];}
 remove(){if(this.parentNode)this.parentNode.children.splice(this.parentNode.children.indexOf(this),1);this.parentNode=null;}
 contains(el){return el===this||this.children.some(c=>c.contains(el));}
 matches(selector){if(selector.startsWith('#'))return this.id===selector.slice(1);const match=selector.match(/^([a-z]+)?(?:\[([\w-]+)(?:="([^"]*)")?\])?$/);return !!match&&(!match[1]||this.tagName===match[1].toUpperCase())&&(!match[2]||Object.hasOwn(this.attributes,match[2])&&(match[3]===undefined||this.attributes[match[2]]===match[3]));}
 closest(selector){const parts=selector.split(',').map(s=>s.trim());for(let n=this;n;n=n.parentNode)if(parts.some(part=>n.matches(part)))return n;return null;}
 addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
 removeEventListener(type,fn){this.listeners[type]=(this.listeners[type]||[]).filter(f=>f!==fn);}
 removeAttribute(k){delete this.attributes[k];if(k==='src')this.src='';}
}
class Audio extends Element{
 constructor(doc){super('audio',doc);this.currentTime=0;this.paused=true;this.ended=false;this.readyState=1;this.loads=0;this.plays=0;this.src='';}
 load(){this.loads++;this.currentTime=0;this.ended=false;}
 pause(){this.paused=true;}
 play(){A(this.ownerDocument.gesture||this.gestureAuthorized,'Initial play() requires a user gesture');if(this.ownerDocument.gesture)this.gestureAuthorized=true;this.plays++;this.paused=false;return Promise.resolve();}
}
class Document extends Element{
 constructor(){super('document',null);this.ownerDocument=this;this.hidden=false;this.gesture=false;}
 createElement(tag){return tag==='audio'?new Audio(this):new Element(tag,this);}
 getElementById(id){return find(this,n=>n.id===id);}
}
function find(el,p){if(p(el))return el;for(const child of el.children){const result=find(child,p);if(result)return result;}return null;}
function control(player,action){return find(player.element,n=>n.attributes['data-guided-action']===action);}
function attr(player,name){return find(player.element,n=>Object.hasOwn(n.attributes,name));}
const lessons=[{id:'heart',title:'Heart lesson',audio:{src:'heart.mp3',duration:6},transcript:'Verified supplied transcript.',source:'Owner lesson source',audioStatus:'Pilot audio',cues:[{id:'h0',at:0,text:'Find the atrium.',scene:{organ:'heart',selected:'ra',simulation:{kind:'hold',seconds:.1}}},{id:'h2',at:2,text:'Now the ventricle.',scene:{organ:'heart',selected:'rv',simulation:{kind:'cycle',anchorAudio:2,speed:.5}}}]},{id:'text',title:'Manual lesson',audio:null,cues:[{id:'t0',at:0,title:'Airway',scene:{organ:'respiratory',selected:'trachea',simulation:{kind:'hold',seconds:0}}},{id:'t1',at:0,title:'Exchange',scene:{organ:'respiratory',selected:'alveolus',simulation:{kind:'hold',seconds:2}}}]}];
lessons[0].cues[0].scene.detail='Illustrative occupancy; external flow is a teaching map.';
lessons[0].cues[1].scene.detail='<img src=x onerror="bad()"> Scale is enlarged & inferred.';
function setup(shared,extra){
 extra=extra||{};
 const doc=new Document(),home=doc.createElement('div'),menu=doc.createElement('div'),heart=doc.createElement('section'),resp=doc.createElement('section'),canvas=doc.createElement('canvas');home.id='home';menu.id='homeMenu';heart.id='heartV3Study';resp.id='cardiorespiratoryStudy';doc.appendChild(home);home.appendChild(menu);home.appendChild(heart);home.appendChild(resp);heart.appendChild(canvas);
 if(extra.documentSetup)extra.documentSetup(doc);
 const frames=new Map(),storage=shared||new Map([['course.mock','sentinel']]),calls=[],presentation={organ:null,selected:null,time:null};let frameId=0;
 const host={document:doc,GuidedStudySession:core,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},requestAnimationFrame:fn=>{frames.set(++frameId,fn);return frameId;},cancelAnimationFrame:id=>frames.delete(id)};
 Object.assign(host,extra.host);
 const adapter=organ=>({async prepare(scene,ctx){if(ctx.isCurrent())calls.push(['prepare',organ]);},async apply(scene,t,ctx){if(ctx.isCurrent()){calls.push(['apply',organ,t]);Object.assign(presentation,{organ,selected:scene.selected,time:t});}},capture:()=>clone(presentation),async restore(s,ctx){if(ctx.isCurrent())Object.assign(presentation,clone(s));},pause(){calls.push(['pause',organ]);}});
 const player=factory(host).mount({catalog:extra.catalog,lessons:extra.lessons||lessons,adapters:{heart:adapter('heart'),respiratory:adapter('respiratory')}});
 function event(el,type,extra){const e={type,target:el,isTrusted:true,...extra};doc.gesture=!!e.isTrusted;for(const fn of doc.listeners[type]||[])fn(e);for(let n=el;n&&n!==doc;n=n.parentNode)for(const fn of n.listeners[type]||[])fn(e);doc.gesture=false;}
 async function settle(){for(let i=0;i<16;i++)await Promise.resolve();}
 async function click(action){event(control(player,action),'click');await settle();}
 async function frame(){A.equal(frames.size,1);const [id,fn]=frames.entries().next().value;frames.delete(id);await fn();await settle();}
 return{doc,home,menu,canvas,frames,storage,calls,presentation,player,event,settle,click,frame};
}
function mediaHost(){
 const requests=[],created=[],revoked=[],live=new Set();let nextGate=null,createHook=null,failNext=false,status=200,size=20;
 class MediaURL extends URL{static createObjectURL(blob){const url='blob:owned-'+(created.length+1);created.push({url,blob});live.add(url);if(createHook){const fn=createHook;createHook=null;fn(url);}return url;}static revokeObjectURL(url){A(live.has(url),'only a live URL owned by this player may be revoked');live.delete(url);revoked.push(url);}}
 const host={URL:MediaURL,location:{href:'http://guided.test/index.html',origin:'http://guided.test'},async fetch(url,options){requests.push({url,options});if(failNext){failNext=false;throw Error('media network unavailable');}return{ok:status>=200&&status<300,status,async blob(){if(nextGate){const g=nextGate;nextGate=null;g.enter();await g.promise;}return{size,source:url};}};}};
 return{host,requests,created,revoked,live,fail(){failNext=true;},status(v){status=v;},size(v){size=v;},onCreate(fn){createHook=fn;},gate(){let release,enter;const promise=new Promise(r=>release=r),entered=new Promise(r=>enter=r);nextGate={promise,enter};return{entered,release};}};
}
(async()=>{
 const x=setup(),p=x.player;await p.ready;A.equal(x.home.children[0],p.element,'player precedes existing home menu');A.equal(x.home.children[1],x.menu);A.equal(p.audio.tagName,'AUDIO');A.equal(p.audio.loads,0,'mount does not open a lesson');A.equal(p.audio.plays,0);A.equal(x.calls.length,0);A.equal(control(p,'play').disabled,true);A.equal(x.frames.size,0);
 const picker=attr(p,'data-guided-lesson');picker.value='heart';x.event(picker,'change');await x.settle();A.equal(x.presentation.selected,'ra');A.equal(p.inspect().playing,false);A.equal(p.audio.plays,0);A.equal(control(p,'play').disabled,false);A.equal(attr(p,'data-guided-transcript').textContent,'Verified supplied transcript.');A.equal(attr(p,'data-guided-source').textContent,'Owner lesson source');
 const representation=attr(p,'data-guided-representation');A.equal(representation.hidden,false);A.equal(representation.textContent,'Representation: '+lessons[0].cues[0].scene.detail);Object.defineProperty(representation,'innerHTML',{set(){A.fail('representation metadata must be rendered as plain text');}});
 x.event(control(p,'play'),'click');A.equal(p.audio.plays,1,'play invoked synchronously before settling');await x.settle();A.equal(p.inspect().playing,true);A.equal(x.frames.size,1);p.audio.currentTime=2.75;await x.frame();A.equal(x.presentation.selected,'rv');A.equal(x.presentation.time,2.75);A.equal(x.frames.size,1,'exactly one awaited RAF chain');A.equal(attr(p,'data-guided-current').textContent,'Now the ventricle.');const renders=x.calls.filter(c=>c[0]==='apply').length;await x.frame();A.equal(x.calls.filter(c=>c[0]==='apply').length,renders,'unchanged audio clock does not replay a cue');
 A.equal(representation.textContent,'Representation: '+lessons[0].cues[1].scene.detail,'cue changes replace the representation qualification');A.equal(representation.children.length,0,'HTML-shaped metadata remains literal text');
 x.event(x.canvas,'pointerdown',{isTrusted:false});A.equal(p.inspect().mode,'guided','synthetic input cannot seize mode ownership');x.event(x.canvas,'keydown',{key:'Tab'});A.equal(p.inspect().mode,'guided','focus navigation does not seize ownership');x.event(control(p,'play'),'pointerdown');A.equal(p.inspect().mode,'guided','player interactions are excluded');x.event(x.canvas,'pointerdown');A.equal(p.inspect().mode,'explore','capture handler releases ownership before the camera gesture');A.equal(p.audio.paused,true);A.equal(x.frames.size,0);x.presentation.selected='manual camera';await p.session.tick();A.equal(x.presentation.selected,'manual camera');await x.click('guided');A.equal(p.inspect().mode,'guided');A.equal(p.inspect().playing,false);A.equal(p.audio.currentTime,2.75);A.equal(x.presentation.selected,'rv');A.equal(p.inspect().explore.heart.selected,'manual camera');
 await x.click('back');A.equal(x.presentation.selected,'ra');A.equal(p.audio.currentTime,0);await x.click('next');A.equal(x.presentation.selected,'rv');p.audio.currentTime=3.5;await p.session.pause();await x.click('replay');A.equal(p.audio.currentTime,2);const seek=attr(p,'data-guided-seek');seek.value='1.25';x.event(seek,'input');await x.settle();A.equal(p.audio.currentTime,1.25);A.equal(x.presentation.selected,'ra');A.equal(p.audio.paused,true);
 await x.click('play');x.doc.hidden=true;x.event(x.doc,'visibilitychange',{isTrusted:false});await x.settle();A.equal(p.inspect().playing,false);A.equal(p.audio.paused,true);A.equal(x.frames.size,0);x.doc.hidden=false;
 await p.load('text');A.equal(control(p,'play').disabled,true);A.equal(seek.disabled,true);A.match(attr(p,'data-guided-flags').textContent,/Text only/);const before=p.audio.plays;await x.click('next');A.equal(x.presentation.organ,'respiratory');A.equal(x.presentation.selected,'alveolus');A.equal(p.audio.plays,before);A.equal(p.inspect().audioTime,0);A.equal(control(p,'next').disabled,true);await x.click('back');A.equal(x.presentation.selected,'trachea');
 A.equal(representation.textContent,'','cues without details clear stale qualifications');A.equal(representation.hidden,true,'empty representation paragraph is hidden');
 await p.load('heart');await x.click('play');x.event(p.audio,'error',{isTrusted:false});await x.settle();A.equal(p.audio.paused,true);A.equal(p.inspect().mode,'explore');A.equal(x.frames.size,0);A.match(attr(p,'data-guided-error').textContent,/could not load/);A.equal(control(p,'play').disabled,true);await p.load('heart');A.equal(control(p,'play').disabled,false,'a new explicit load recovers the player');
 await x.click('play');p.audio.currentTime=6;p.audio.ended=true;x.event(p.audio,'ended',{isTrusted:false});await x.settle();A.equal(p.inspect().playing,false);A.equal(p.inspect().audioTime,6);A.equal(x.frames.size,0);
 const saved=setup(x.storage);A.equal(saved.player.inspect().audioTime,6);A.equal(saved.player.audio.loads,0,'saved position is displayed without automatically opening anatomy');A.equal(control(saved.player,'play').disabled,true);await saved.click('guided');A.equal(saved.player.audio.currentTime,6);A.equal(saved.presentation.selected,'rv');A.equal(saved.player.inspect().playing,false);saved.player.dispose();A.equal(x.storage.get('course.mock'),'sentinel');A([...x.storage.keys()].every(k=>k==='course.mock'||k===core.STORAGE_KEY));
 const loading=setup(),opening=loading.player.load('heart');loading.event(loading.canvas,'pointerdown');A.equal(loading.player.inspect().mode,'explore','even initial pending preparation yields immediately to manual input');A.equal(await opening,false);A.equal(loading.presentation.selected,null,'cancelled first load never overwrites the manual scene');loading.player.dispose();
 // Header Home, main-menu module launches and quiz/result navigation are
 // outside both organ roots but must release ownership before their handlers.
 const nav=setup(),paragraph=nav.doc.createElement('p'),header=nav.doc.createElement('header'),quiz=nav.doc.createElement('section'),results=nav.doc.createElement('section');quiz.id='quiz';results.id='results';nav.home.appendChild(paragraph);nav.doc.appendChild(header);nav.doc.appendChild(quiz);nav.doc.appendChild(results);
 for(const [parent,tag,type,key] of [[header,'button','pointerdown'],[nav.menu,'button','keydown','Enter'],[quiz,'select','change'],[results,'a','pointerdown']]){
  await nav.player.load('heart');await nav.click('play');nav.player.audio.currentTime=1.4;await nav.player.session.tick();nav.event(paragraph,'pointerdown');A.equal(nav.player.inspect().mode,'guided','ordinary outside text does not switch modes');nav.event(paragraph,'keydown',{key:'ArrowDown'});A.equal(nav.player.inspect().mode,'guided','reading/scrolling keys on content do not switch modes');
  const button=nav.doc.createElement(tag),child=nav.doc.createElement('span');if(tag==='a')button.setAttribute('href','#home');if(parent===nav.menu)button.id='leadPlacementLaunch';parent.appendChild(button);button.appendChild(child);nav.event(child,type,{key,isTrusted:false});A.equal(nav.player.inspect().mode,'guided','synthetic global navigation does not seize ownership');let handled=false;button.addEventListener(type,()=>{handled=true;A.equal(nav.player.inspect().mode,'explore','global control sees ownership already released');A.equal(nav.player.audio.paused,true);nav.presentation.selected='other app mode';});nav.event(child,type,{key});A.equal(handled,true);A.equal(nav.player.inspect().mode,'explore');A.equal(nav.player.inspect().audioTime,1.4);A.equal(nav.player.inspect().error,null);A.equal(nav.frames.size,0);await nav.player.session.tick();A.equal(nav.presentation.selected,'other app mode','future Guided ticks cannot reopen the organ after navigation');
 }
 nav.player.dispose();
 // Full same-origin bytes become one cached Blob URL, so later seeks do not
 // depend on static-server Range support or reload/download on every tick.
 const mediaLessons=clone(lessons);mediaLessons.push({...clone(lessons[0]),id:'second',audio:{src:'second.mp3',duration:6}});mediaLessons.push({...clone(lessons[0]),id:'foreign',audio:{src:'https://other.test/foreign.mp3',duration:6}});
 const mh=mediaHost(),media=setup(null,{host:mh.host,lessons:mediaLessons});A.equal(mh.requests.length,0);await media.player.load('heart');const firstURL=media.player.audio.src;A.equal(firstURL,'blob:owned-1');A.equal(mh.requests[0].url,'http://guided.test/heart.mp3');A.equal(mh.requests[0].options.mode,'same-origin');A.equal(mh.requests[0].options.credentials,'same-origin');A(mh.requests[0].options.signal instanceof AbortSignal);await media.player.session.seek(2.5);await media.click('play');media.player.audio.currentTime=2.8;await media.frame();await media.player.load('heart');A.equal(mh.requests.length,1,'active clip cache survives seeks/ticks/reload');A.equal(mh.live.size,1);await media.player.load('second');A.equal(media.player.audio.src,'blob:owned-2');A.deepEqual(mh.revoked,[firstURL]);A.equal(mh.live.size,1);await media.player.load('heart');A.equal(mh.requests.length,3,'returning to an evicted clip downloads it again rather than retaining a multi-clip cache');A.equal(mh.live.size,1);
 const oldURL=media.player.audio.src;mh.fail();A.equal(await media.player.load('second'),false);A.match(media.player.inspect().error,/audio preparation failed: media network unavailable/);A.equal(media.player.audio.paused,true);A(mh.live.has(oldURL),'failed replacement preserves the existing owned clip');A.equal(await media.player.load('second'),true,'explicit retry can recover media preparation');const beforeForeign=mh.requests.length;A.equal(await media.player.load('foreign'),false);A.equal(mh.requests.length,beforeForeign,'cross-origin media is rejected before fetch');A.match(media.player.inspect().error,/same-origin asset/);media.player.dispose();A.equal(mh.live.size,0);A.equal(media.player.audio.src,'');A.equal(mh.revoked.length,mh.created.length,'dispose releases the remaining clip exactly once');
 const ch=mediaHost(),cancel=setup(null,{host:ch.host,lessons:mediaLessons});await cancel.player.load('heart');const cachedURL=cancel.player.audio.src,bodyGate=ch.gate(),slowMedia=cancel.player.load('second');await bodyGate.entered;const newerClip=cancel.player.load('heart');A.equal(ch.requests.at(-1).options.signal.aborted,true);bodyGate.release();A.equal(await slowMedia,false);A.equal(await newerClip,true);A.equal(cancel.player.audio.src,cachedURL);A.equal(ch.created.length,1,'cancelled body completion cannot create or attach a late URL');A.equal(ch.revoked.length,0,'cancelled replacement cannot revoke the active prior clip');A.equal(cancel.player.inspect().error,null);
 ch.onCreate(()=>cancel.player.session.enterExplore());A.equal(await cancel.player.load('second'),false);A.equal(cancel.player.audio.src,cachedURL);A.equal(ch.created.length,2);A.deepEqual(ch.revoked,[ch.created[1].url],'cancellation after URL creation releases only its own candidate');A(ch.live.has(cachedURL));cancel.player.dispose();A.equal(ch.live.size,0);
 const dh=mediaHost(),disposing=setup(null,{host:dh.host,lessons:mediaLessons}),disposeGate=dh.gate(),pendingMedia=disposing.player.load('heart');await disposeGate.entered;disposing.player.dispose();disposeGate.release();A.equal(await pendingMedia,false);A.equal(dh.created.length,0,'disposal during download prevents late media creation');A.equal(disposing.player.audio.loads,0);
 const focusCalls=[];const following=setup(null,{documentSetup(doc){doc.querySelector=selector=>selector==='#heartV3Study .heart-v3-viewport'?{getBoundingClientRect:()=>({top:1000,bottom:1500,height:500}),scrollIntoView:options=>focusCalls.push(options)}:null;}});await following.player.load('heart');A.equal(focusCalls.length,1,'New guided view is brought into view after readiness');await following.click('play');following.player.audio.currentTime=2.3;await following.frame();A.equal(focusCalls.length,2,'Explicit Play follows once; audio ticks and same-view cue changes cannot fight scrolling');await following.player.session.enterExplore();await following.player.session.tick();A.equal(focusCalls.length,2);await following.player.session.returnGuided();A.equal(focusCalls.length,3,'Explicit Guided return follows once');await following.click('show-scene');A.equal(focusCalls.length,4);A(focusCalls.every(c=>c.behavior==='auto'&&c.block==='center'));following.player.dispose();
 const sectionLessons=[clone(lessons[0]),{...clone(lessons[0]),id:'second',title:'Second section',audio:{src:'second.mp3',duration:6}}],roll=setup(null,{lessons:sectionLessons,catalog:{declaredGapClips:87,segments:[{id:'heart',title:'First'},{id:'pending',title:'Unintegrated'},{id:'second',title:'Second'}]}});const pendingOption=find(roll.player.element,n=>n.tagName==='OPTION'&&n.value==='pending');A(pendingOption&&Object.hasOwn(pendingOption.attributes,'disabled'));A.match(attr(roll.player,'data-guided-rollout').textContent,/87 clips/);await roll.player.load('heart');await roll.click('next-section');A.equal(roll.player.inspect().lessonId,'second');A.equal(roll.player.audio.paused,true);A.equal(roll.player.audio.plays,0);await roll.click('previous-section');A.equal(roll.player.inspect().lessonId,'heart');roll.player.dispose();
 await x.click('play');A.equal(x.frames.size,1);p.dispose();A.equal(x.frames.size,0);A.equal(p.audio.paused,true);A.equal(x.home.children.includes(p.element),false);A.equal((x.doc.listeners.pointerdown||[]).length,0);A.equal(p.inspect().disposed,true);A.equal(x.home.children.includes(x.menu),true,'existing modes remain in place');
 const css=fs.readFileSync(path.resolve(__dirname,'../../guided-study/player.css'),'utf8');A.match(css,/min-height:44px/);A.doesNotMatch(css,/position\s*:\s*(fixed|sticky)/,'player cannot cover the anatomical HUD');
 await testMediaWakeup();
 const report={passed:true,checks:['normal-flow mount without autoplay or organ opening','synchronous gesture-owned audio.play','one awaited RAF chain and unchanged-clock deduplication','trusted simulator capture-phase Explore release','trusted header/menu/quiz/results navigation releases before handlers; ordinary outside content ignored','player/programmatic/focus events excluded','paused Guided restore with independent Explore snapshot','manual seek/back/next/replay and text-only cues','current cue representation qualification updates as literal text and hides without stale metadata','pause on visibility loss and audio errors; explicit recovery','real audio end handling','saved position displayed without opening anatomy','isolated persistence and full disposal','one same-origin full-Blob clip cache; no tick/seek refetch; replacement/disposal revocation and download retry','cancelled body/URL creation/disposal cannot attach late media or revoke the active prior clip','44px targets and no fixed anatomical overlay','unintegrated course sections disabled, explicit section navigation stays paused','ready guided views follow once, same-view ticks never scroll, Explore relinquishes focus, explicit Show scene restores view','stale real-media event wakes the same awaited pipeline; busy/ticking/Pause/Explore/hidden/dispose guards preserve single ownership'],limits:'CPU DOM/event harness only; actual browser layout, trusted input, HTMLAudioElement playback and live organ adapters require root integration verification.'};
 if(process.env.GUIDED_PLAYER_EVIDENCE)fs.writeFileSync(process.env.GUIDED_PLAYER_EVIDENCE,JSON.stringify(report,null,2)+'\n');console.log('PASS guided player UI: '+report.checks.length+' CPU DOM/event behavior groups.');
})().catch(e=>{console.error(e);process.exitCode=1;});

async function testMediaWakeup(){
 const subchecks=[];
 const applyCount=x=>x.calls.filter(c=>c[0]==='apply').length;
 const defer=()=>{let resolve;const promise=new Promise(r=>resolve=r);return{promise,resolve};};
 let tickCalls=0,tickGate=null,applyGate=null,maxConcurrent=0,concurrent=0;
 const injectedCore={create(options){
  const originalApply=options.adapters.heart.apply;
  options.adapters.heart.apply=async(scene,time,ctx)=>{
   if(applyGate){const g=applyGate;applyGate=null;g.entered.resolve();await g.release.promise;}
   return originalApply(scene,time,ctx);
  };
  const s=core.create(options),tick=s.tick;
  s.tick=async function(){tickCalls++;concurrent++;maxConcurrent=Math.max(maxConcurrent,concurrent);try{if(tickGate){const g=tickGate;tickGate=null;g.entered.resolve();await g.release.promise;}return await tick();}finally{concurrent--;}};
  return s;
 }};
 const x=setup(null,{host:{GuidedStudySession:injectedCore}}),p=x.player,a=p.audio;
 A.equal((a.listeners.timeupdate||[]).length,1,'Exactly one media-event listener is installed');
 await p.load('heart');await x.click('play');A.equal(x.frames.size,1);
 const oldFrame=[...x.frames.keys()][0],oldApplies=applyCount(x);
 a.currentTime=.75;x.event(a,'timeupdate',{isTrusted:false});await x.settle();await x.settle();
 A.equal(p.inspect().audioTime,.75);A.equal(x.presentation.time,.75,'Fallback uses actual media time');
 A.equal(tickCalls,1);A.equal(applyCount(x),oldApplies+1);A.equal(x.frames.size,1,'The same pipeline restores one RAF');A(!x.frames.has(oldFrame),'Fallback cancels prior pending RAF');
 subchecks.push('lagging media event cancels pending RAF, applies actual audio time, then leaves exactly one RAF');

 const healthyApplies=applyCount(x),healthyTick=tickCalls,healthyFrame=[...x.frames.keys()][0];
 a.currentTime=.8;x.event(a,'timeupdate',{isTrusted:false});await x.settle();
 A.equal(tickCalls,healthyTick);A.equal(applyCount(x),healthyApplies);A.equal([...x.frames.keys()][0],healthyFrame);
 x.event(a,'timeupdate',{isTrusted:false});await x.settle();A.equal(tickCalls,healthyTick);
 subchecks.push('healthy recent updates below 100 ms and repeated events add no apply or RAF');

 const tg={entered:defer(),release:defer()};tickGate=tg;a.currentTime=1.2;
 x.event(a,'timeupdate',{isTrusted:false});await tg.entered.promise;
 A.equal(p.inspect().busy,false,'Test isolates player ticking from session busy');A.equal(a.paused,false);A.equal(x.frames.size,0);
 const activeTick=tickCalls;a.currentTime=1.6;
 for(let n=0;n<4;n++)x.event(a,'timeupdate',{isTrusted:false});await x.settle();
 A.equal(tickCalls,activeTick,'No competing tick while advance awaits');A.equal(x.frames.size,0);
 tg.release.resolve();await x.settle();await x.settle();
 A.equal(p.inspect().audioTime,1.6);A.equal(x.presentation.time,1.6);A.equal(x.frames.size,1);A.equal(maxConcurrent,1);
 subchecks.push('ticking guard suppresses repeated media wakes during deferred awaited advance');

 const ag={entered:defer(),release:defer()};applyGate=ag;a.currentTime=1.8;
 const external=p.session.tick();await ag.entered.promise;
 A.equal(p.inspect().busy,true);A.equal(a.paused,false,'Warm preparation has not paused narration');
 const busyTick=tickCalls;a.currentTime=1.99;x.event(a,'timeupdate',{isTrusted:false});await x.settle();
 A.equal(tickCalls,busyTick,'Busy adapter scheduled outside player advance is not superseded by fallback');
 ag.release.resolve();A.equal(await external,true);await x.settle();
 A.equal(p.inspect().audioTime,1.8,'In-flight operation retains its requested sample');A.equal(x.frames.size,1);A.equal(maxConcurrent,1);
 subchecks.push('busy guard preserves an independently scheduled real session operation');

 a.currentTime=2.3;x.event(a,'timeupdate',{isTrusted:false});await x.settle();await x.settle();
 A.equal(p.inspect().audioTime,2.3);A.equal(x.presentation.selected,'rv');A.equal(x.presentation.time,2.3);A.equal(a.paused,false);A.equal(x.frames.size,1);A.equal(maxConcurrent,1);
 subchecks.push('fallback crossing a cue uses the same cold preparation/hold/continuation path');

 await p.session.pause();await x.settle();const pausedCount=tickCalls,pausedApply=applyCount(x);
 A.equal(a.paused,true);A.equal(x.frames.size,0);a.currentTime=3.5;x.event(a,'timeupdate',{isTrusted:false});await x.settle();
 A.equal(tickCalls,pausedCount);A.equal(applyCount(x),pausedApply);A.equal(x.frames.size,0);A.equal(p.inspect().playing,false);
 subchecks.push('Pause rejects media wakes without scheduling, applying or resuming audio');

 await x.click('play');await p.session.enterExplore();Object.assign(x.presentation,{selected:'learner camera',time:99});
 const exploredTick=tickCalls,exploredApply=applyCount(x);a.currentTime=5;x.event(a,'timeupdate',{isTrusted:false});await x.settle();
 A.equal(p.inspect().mode,'explore');A.equal(x.presentation.selected,'learner camera');A.equal(x.presentation.time,99);A.equal(tickCalls,exploredTick);A.equal(applyCount(x),exploredApply);A.equal(x.frames.size,0);A.equal(a.paused,true);
 subchecks.push('Explore retains learner state and has no media-driven clock/RAF ownership');

 await p.session.returnGuided();await x.click('play');x.doc.hidden=true;
 const hiddenTicks=tickCalls,hiddenApplies=applyCount(x);a.currentTime=5.5;x.event(a,'timeupdate',{isTrusted:false});await x.settle();
 A.equal(tickCalls,hiddenTicks);A.equal(applyCount(x),hiddenApplies);
 x.event(x.doc,'visibilitychange',{isTrusted:false});await x.settle();A.equal(a.paused,true);A.equal(x.frames.size,0);x.doc.hidden=false;
 subchecks.push('hidden document ignores fallback and existing visibility-loss path pauses/cancels');

 await x.click('play');a.paused=true;const mediaPausedTicks=tickCalls;a.currentTime=5.9;x.event(a,'timeupdate',{isTrusted:false});await x.settle();A.equal(tickCalls,mediaPausedTicks,'Paused media cannot wake the pipeline even if session still reports playing');
 subchecks.push('actual media paused flag suppresses stale playing state');

 p.dispose();const disposedTicks=tickCalls,disposedApplies=applyCount(x);A.equal((a.listeners.timeupdate||[]).length,0);
 a.currentTime=6;x.event(a,'timeupdate',{isTrusted:false});await x.settle();A.equal(tickCalls,disposedTicks);A.equal(applyCount(x),disposedApplies);A.equal(x.frames.size,0);
 subchecks.push('Dispose removes its listener and forbids late media events/RAF work');

 const crypto=require('node:crypto'),rootPath=path.resolve(__dirname,'../..'),hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
 const result={passed:true,group:19,name:'media timeupdate wakes the same awaited pipeline only when actual audio is at least 100 ms ahead',subchecks,maxConcurrentTick:maxConcurrent,sourceHashes:{session:hash(rootPath+'/guided-study/session.js'),player:hash(rootPath+'/guided-study/player.js'),originalHarness:hash(rootPath+'/tools/guided-study/player-ui.cjs')},limits:'Actual player/session with original CPU DOM/event harness and deliberate gates; no browser, GPU presentation, real media event cadence, synchronization/performance improvement, listening or Cursor claim.'};
 if(process.env.GUIDED_TIMEUPDATE_EVIDENCE)fs.writeFileSync(process.env.GUIDED_TIMEUPDATE_EVIDENCE,JSON.stringify(result,null,2)+'\n');return result;

}
