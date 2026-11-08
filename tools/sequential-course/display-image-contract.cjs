'use strict';
// Exercise the actual production display-image owner with a deterministic DOM
// double. These are unit controls, not substituted for rendered browser tests.
const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('guided-study/sequential-player.js','utf8');
const begin=source.indexOf(' function sourceDisplayImageReady('),end=source.indexOf('\n async function sourceReady(',begin);
A.ok(begin>=0&&end>begin,'production display-image helper exists');
let checks=1;const check=(value,label)=>{A.ok(value,label);checks++;};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function fixture({cached=false,decode=true,current=true}={}){
 let active=current,release,rejectDecode,timer,decodeCalls=0,settled=false,value;
 const handlers=new Map(),controller=new AbortController();
 const image={complete:cached,naturalWidth:cached?900:0,_src:'',
  getAttribute(name){return name==='src'?this._src:null;},set src(value){this._src=value;},
  addEventListener(name,fn){if(!handlers.has(name))handlers.set(name,new Set());handlers.get(name).add(fn);},
  removeEventListener(name,fn){handlers.get(name)?.delete(fn);},
  fire(name){for(const fn of [...handlers.get(name)||[]])fn();}};
 if(decode)image.decode=()=>{decodeCalls++;return new Promise((resolve,reject)=>{release=resolve;rejectDecode=reject;});};
 const load=vm.runInNewContext('('+source.slice(begin,end).trim()+')',{q:()=>image,setTimeout:fn=>(timer=fn,1),clearTimeout:()=>{timer=null;},Promise,Error});
 const promise=load({imageRoute:'private-course/page/24.png'},{signal:controller.signal,isCurrent:()=>active});
 promise.then(x=>{settled=true;value=x;},()=>{settled=true;});
 return {image,promise,controller,get settled(){return settled;},get value(){return value;},get decodeCalls(){return decodeCalls;},get listeners(){return [...handlers.values()].reduce((n,s)=>n+s.size,0);},get timer(){return timer;},stale(){active=false;},release(){release?.();},reject(){rejectDecode?.(Error('injected decode failure'));},load(){image.complete=true;image.naturalWidth=900;image.fire('load');}};
}
(async()=>{
 const delayed=fixture();await tick();check(!delayed.settled,'display load keeps owner pending');delayed.load();await tick();check(!delayed.settled&&delayed.decodeCalls===1,'display decode keeps owner pending');delayed.release();check(await delayed.promise,'display resolves only after decode');check(delayed.listeners===0&&!delayed.timer,'successful display cleans listeners and timer');
 const cached=fixture({cached:true});await tick();check(!cached.settled&&cached.decodeCalls===1,'cached display still awaits its decode');cached.release();check(await cached.promise,'cached element decodes');
 const stale=fixture();stale.load();stale.stale();stale.release();check(await stale.promise===false,'late decode cannot commit a stale page');check(stale.listeners===0&&!stale.timer,'stale page cleans resources');
 const aborted=fixture();aborted.controller.abort();check(await aborted.promise===false,'aborted preparation returns false');check(aborted.listeners===0&&!aborted.timer,'abort cleans resources');
 const lateAbort=fixture();lateAbort.load();lateAbort.controller.abort();check(await lateAbort.promise===false,'abort during decode returns promptly');lateAbort.release();await tick();check(lateAbort.value===false,'late decode cannot reverse cancellation');
 const failed=fixture();failed.image.fire('error');await A.rejects(failed.promise,/failed to load/);checks++;check(failed.listeners===0&&!failed.timer,'load failure cleans resources');
 const badDecode=fixture();badDecode.load();badDecode.reject();await A.rejects(badDecode.promise,/failed to decode/);checks++;
 const timed=fixture();timed.timer();await A.rejects(timed.promise,/timed out/);checks++;check(timed.listeners===0&&!timed.timer,'timeout cleans resources');
 const legacy=fixture({decode:false});legacy.load();check(await legacy.promise,'load-complete fallback when decode is absent');
 const superseded=fixture({current:false});check(await superseded.promise===false&&superseded.image._src==='','stale entry never sets src');
 check(source.includes("if(!held){await sourceImageReady(page,ctx);if(!current())return false;if(!await sourceDisplayImageReady(page,ctx)||!current())return false;sourceFrame.hidden=false"),'only authorized non-held page can display after exact decode');
 const warmBegin=source.indexOf(' function sourceWarm('),warmEnd=source.indexOf('\n // Preloading',warmBegin),warmContext={sourcePages:[{page:1,imageRoute:'private-course/page/1.png'},{page:2,imageRoute:'private-course/page/2.png'}],q:()=>warmImage,followsSource:()=>true,sourceIsHeld:()=>false,sourceSceneKey:'lesson|clip|1',lesson:()=>({id:'lesson'}),clip:()=>({id:'clip'}),sourceFrame:{hidden:false}};
 const warmImage={hidden:false,complete:true,naturalWidth:900,getAttribute:()=> 'private-course/page/1.png'},warm=vm.runInNewContext('('+source.slice(warmBegin,warmEnd).trim()+')',warmContext);
 check(warm({page:1}),'same decoded displayed page stays warm');check(!warm({page:2}),'new page is cold despite any offscreen preload');warmImage.complete=false;check(!warm({page:1}),'incomplete displayed image cannot authorize warm playback');warmImage.complete=true;warmContext.sourceFrame.hidden=true;check(!warm({page:1}),'concealed frame cannot authorize warm playback');
 console.log(JSON.stringify({passed:true,checks,scope:'deterministic production-helper unit controls; browser qualification separate'}));
})().catch(error=>{console.error(error);process.exitCode=1;});
