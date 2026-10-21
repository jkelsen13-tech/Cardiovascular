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
 closest(selector){const ids=selector.split(',').map(s=>s.trim().slice(1));for(let n=this;n;n=n.parentNode)if(ids.includes(n.id))return n;return null;}
 addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
 removeEventListener(type,fn){this.listeners[type]=(this.listeners[type]||[]).filter(f=>f!==fn);}
 removeAttribute(k){delete this.attributes[k];if(k==='src')this.src='';}
}
class Audio extends Element{
 constructor(doc){super('audio',doc);this.currentTime=0;this.paused=true;this.ended=false;this.readyState=1;this.loads=0;this.plays=0;this.src='';}
 load(){this.loads++;this.currentTime=0;this.ended=false;}
 pause(){this.paused=true;}
 play(){A(this.ownerDocument.gesture,'play() ran after the user gesture ended');this.plays++;this.paused=false;return Promise.resolve();}
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
function setup(shared){
 const doc=new Document(),home=doc.createElement('div'),menu=doc.createElement('div'),heart=doc.createElement('section'),resp=doc.createElement('section'),canvas=doc.createElement('canvas');home.id='home';menu.id='homeMenu';heart.id='heartV3Study';resp.id='cardiorespiratoryStudy';doc.appendChild(home);home.appendChild(menu);home.appendChild(heart);home.appendChild(resp);heart.appendChild(canvas);
 const frames=new Map(),storage=shared||new Map([['course.mock','sentinel']]),calls=[],presentation={organ:null,selected:null,time:null};let frameId=0;
 const host={document:doc,GuidedStudySession:core,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},requestAnimationFrame:fn=>{frames.set(++frameId,fn);return frameId;},cancelAnimationFrame:id=>frames.delete(id)};
 const adapter=organ=>({async prepare(scene,ctx){if(ctx.isCurrent())calls.push(['prepare',organ]);},async apply(scene,t,ctx){if(ctx.isCurrent()){calls.push(['apply',organ,t]);Object.assign(presentation,{organ,selected:scene.selected,time:t});}},capture:()=>clone(presentation),async restore(s,ctx){if(ctx.isCurrent())Object.assign(presentation,clone(s));},pause(){calls.push(['pause',organ]);}});
 const player=factory(host).mount({lessons,adapters:{heart:adapter('heart'),respiratory:adapter('respiratory')}});
 function event(el,type,extra){const e={type,target:el,isTrusted:true,...extra};doc.gesture=!!e.isTrusted;for(const fn of doc.listeners[type]||[])fn(e);for(const fn of el.listeners[type]||[])fn(e);doc.gesture=false;}
 async function settle(){for(let i=0;i<16;i++)await Promise.resolve();}
 async function click(action){event(control(player,action),'click');await settle();}
 async function frame(){A.equal(frames.size,1);const [id,fn]=frames.entries().next().value;frames.delete(id);await fn();await settle();}
 return{doc,home,menu,canvas,frames,storage,calls,presentation,player,event,settle,click,frame};
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
 await x.click('play');A.equal(x.frames.size,1);p.dispose();A.equal(x.frames.size,0);A.equal(p.audio.paused,true);A.equal(x.home.children.includes(p.element),false);A.equal((x.doc.listeners.pointerdown||[]).length,0);A.equal(p.inspect().disposed,true);A.equal(x.home.children.includes(x.menu),true,'existing modes remain in place');
 const css=fs.readFileSync(path.resolve(__dirname,'../../guided-study/player.css'),'utf8');A.match(css,/min-height:44px/);A.doesNotMatch(css,/position\s*:\s*(fixed|sticky)/,'player cannot cover the anatomical HUD');
 const report={passed:true,checks:['normal-flow mount without autoplay or organ opening','synchronous gesture-owned audio.play','one awaited RAF chain and unchanged-clock deduplication','trusted simulator capture-phase Explore release','player/programmatic/focus events excluded','paused Guided restore with independent Explore snapshot','manual seek/back/next/replay and text-only cues','current cue representation qualification updates as literal text and hides without stale metadata','pause on visibility loss and audio errors; explicit recovery','real audio end handling','saved position displayed without opening anatomy','isolated persistence and full disposal','44px targets and no fixed anatomical overlay'],limits:'CPU DOM/event harness only; actual browser layout, trusted input, HTMLAudioElement playback and live organ adapters require root integration verification.'};
 if(process.env.GUIDED_PLAYER_EVIDENCE)fs.writeFileSync(process.env.GUIDED_PLAYER_EVIDENCE,JSON.stringify(report,null,2)+'\n');console.log('PASS guided player UI: '+report.checks.length+' CPU DOM/event behavior groups.');
})().catch(e=>{console.error(e);process.exitCode=1;});
