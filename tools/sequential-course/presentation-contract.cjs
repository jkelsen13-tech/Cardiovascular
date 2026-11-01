/* Offline policy tests. Run from a matching application root, or pass its path.
 * These are source/state checks, not browser, listening, or iPad tests. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||process.cwd());
const policy=require(path.join(root,'guided-study/sequential-player.js'));
const w={};w.window=w;w.globalThis=w;vm.createContext(w);
for(const name of ['sequential-map.js','lessons.js',...Array.from({length:14},(_,i)=>`lessons-m${String(i+1).padStart(2,'0')}.js`),'sequential-narrations.js']){
 const p=path.join(root,'guided-study',name);if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),w,{filename:name});
}
const map=w.SequentialCourseMap,clips=new Map([...w.GuidedStudyLessons,...w.SequentialCourseNarrations].map(c=>[c.id,c]));
let assertions=0,cues=0,sourceCues=0,replaced=0;const check=(x,message)=>{assert.ok(x,message);assertions++;};
check(map.lessons.length===84,'Expected all 84 original source lessons; re-review inventory if it changes.');
const before=JSON.stringify([...clips.values()]);
for(const l of map.lessons){
 for(const entry of l.audio){const c=clips.get(entry.clipId);check(!!c,'Missing '+entry.clipId);
  for(let i=0;i<c.cues.length;i++){
   const s=policy.scene(l,c,i,{presentation:'simulation'},null); // Stale/imported model state cannot bypass source type.
   check(s.organ==='source',l.id+' cannot dispatch a simulator');
   check(s.page>=l.pages[0]&&s.page<=l.pages[1],l.id+' page must be within declared range');
   if(c.cues[i].scene.organ==='source'){check(s.page===c.cues[i].scene.page,'Preserve approved G page cue');sourceCues++;}
   if(['heart','respiratory','lead'].includes(c.cues[i].scene.organ))replaced++;
   cues++;
  }
 }
}
const l3=map.lessons.find(l=>l.id==='source.lesson.p0024'),l4=map.lessons.find(l=>l.id==='source.lesson.p0030');
const at=(l,id,t)=>{const c=clips.get(id);let i=0;c.cues.forEach((q,n)=>{if(q.at<=t)i=n;});return policy.scene(l,c,i,{},null);};
check(clips.get('M01.03').cues[1].at===4.01,'Bug boundary still 4.01 s');
check(clips.get('M01.03').cues[1].scene.organ==='respiratory','Original symptom preserved as evidence');
check(at(l3,'M01.03',4).page===24,'Before right/left explanation, anatomical-position slide');
check(at(l3,'M01.03',4.01).page===27,'At former lung switch, show directional body diagram');
check(at(l3,'M01.03',12).page===27,'Superior/inferior diagram remains visible');
check(at(l3,'M01.03',21).page===28,'Planes explanation uses planes figure');
check(at(l3,'M01.05',3).page===27,'Proximal/distal uses body diagram');
check(at(l4,'M01.04',10).page===31,'Heart location uses source chest drawing, not model');
check(at(l4,'M07.04',30).organ==='source','Electrode landmarks cannot open lead lab automatically');
for(const c of clips.values()){
 if(policy.canSimulate(c)){
  for(let i=0;i<c.cues.length;i++)check(policy.scene(l3,c,i,{presentation:'simulation'},c.id)===c.cues[i].scene,'Explicit lab retains original model cue');
  check(policy.kind({},c.id,c)==='reading','Old optional bookmarks default to reading, not auto model');
 }
}
check(!policy.canSimulate(clips.get('M01.03')),'Wrong orientation binding is not offered as a simulation');
check(policy.kind({presentation:'simulation'},'M01.03',clips.get('M01.03'))==='reading','Rejected simulator selection remains reading');
check(JSON.stringify([...clips.values()])===before,'Original narration, cue timestamps, sources and models unmutated');
const invalid=JSON.parse(JSON.stringify(clips.get('M01.03')));invalid.cues.push({...invalid.cues[0]});
assert.throws(()=>policy.sourceScene(l3,invalid,0),/rechecking/);assertions++;
console.log(JSON.stringify({kind:'offline-policy-not-browser',passed:true,assertions,sourceLessons:map.lessons.length,mappedCueOccurrences:cues,existingSourcePageCuesPreserved:sourceCues,formerModelCueOccurrencesKeptOnSlides:replaced,separateSimulationClips:[...clips.values()].filter(policy.canSimulate).length},null,2));
