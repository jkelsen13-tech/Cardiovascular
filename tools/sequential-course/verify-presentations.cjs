'use strict';
// Exact production policy, evaluated without a browser. This is not a UI pass.
const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const map=require('../../guided-study/sequential-map.js'),box={};box.window=box;vm.createContext(box);
for(const n of ['lessons','lessons-m01','lessons-m03','lessons-m04','lessons-m05','lessons-m06','lessons-m07','lessons-m08','lessons-m09','lessons-m10','lessons-m11','lessons-m12','lessons-m13','lessons-m14','sequential-narrations','sequential-visuals','sequential-player'])vm.runInContext(fs.readFileSync('guided-study/'+n+'.js','utf8'),box,{filename:n});
const policy=box.SequentialCoursePresentation,all=[...box.GuidedStudyLessons,...box.SequentialCourseNarrations],byId=new Map(all.map(c=>[c.id,c]));
let checks=0,placements=0,replaced=0,reviewed=0,existingSource=0,overview=0;const check=(x,s)=>{A.ok(x,s);checks++;};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),before=JSON.stringify(all);
check(map.lessons.length===84,'84 original source lessons');check(all.length===120,'120 unchanged recording definitions');
for(const lesson of map.lessons){
 check(policy.kind(null,false)==='slideshow','Main route explicitly slideshow '+lesson.id);
 for(const entry of lesson.audio){
  const clip=byId.get(entry.clipId);check(!!clip,'Recording exists '+entry.clipId);
  const out=policy.sourceCues(lesson,clip);
  check(out.length===clip.cues.length,'No dropped recorded cue '+clip.id);check(policy.sourceCues(lesson,clip,true).every((q,i)=>q===clip.cues[i]),'Legacy explicit optional sourceCues retains original objects '+clip.id);
  for(let i=0;i<out.length;i++){
   const old=clip.cues[i],cue=out[i];placements++;
   check(cue.scene.organ==='source','No simulator/explanation adapter in source course '+lesson.id+'/'+cue.id);
   check(cue.scene.page>=lesson.pages[0]&&cue.scene.page<=lesson.pages[1]&&Number.isInteger(cue.scene.page),'Page in original lesson range '+cue.id);
   check(cue.id===old.id&&cue.at===old.at&&cue.text===old.text,'Original timing and spoken words unchanged '+cue.id);
   check(policy.sourceCue(lesson,clip,old,i,true)===old,'Explicit guided tour retains original cue '+cue.id);
   if(old.scene.organ!=='source')replaced++;
   if(cue.presentationNote.startsWith('Reviewed'))reviewed++;
   else if(old.scene.organ==='source'){existingSource++;check(cue.scene.page===old.scene.page,'Existing G01-G09 page timing unchanged');}
   else{overview++;check(cue.scene.page===entry.primarySourcePage&&cue.presentationNote.includes('not been established'),'Overview fallback is source-mapped and disclosed');}
  }
 }
}
check(JSON.stringify(all)===before,'No shared tour/audio metadata mutated');
const l3=map.lessons.find(x=>x.id==='source.lesson.p0024'),l4=map.lessons.find(x=>x.id==='source.lesson.p0030');
const pages=(l,id)=>Array.from(policy.sourceCues(l,byId.get(id)),c=>c.scene.page);
A.deepEqual(pages(l3,'M01.03'),[24,27,27,27,27,28,28,28]);checks++;
A.deepEqual(pages(l3,'M01.05'),[27,27,27,26,27,27,27]);checks++;
A.deepEqual(pages(l4,'M01.04'),[31,31,31,31,31,30]);checks++;
A.deepEqual(pages(l4,'M07.04'),[30,32,32,32,32,33,34,34,31]);checks++;
const pulse=byId.get('M01.03').cues[1];check(pulse.at===4.01&&pulse.scene.organ==='respiratory','Baseline defect remains only in explicit adapted tour, not original source route');
check(policy.kind(byId.get('M02.01'),true)==='guided-simulation','Guided simulation is separately typed');
for(const c of all)check(sha(fs.readFileSync(c.audio.src))===c.audio.sha256,'Original MP3 bytes preserved '+c.id);
const P=require('../../guided-study/sequential-progress.js'),d=P.empty(map);P.begin(d,l3.id);d.position={lessonId:l3.id,stage:'explanation',sourcePage:25,sourceFollow:false,segment:0,time:5,cueId:pulse.id,scene:{organ:'respiratory',snapshot:{old:true}}};
d.preferences.rate=1.25;P.addPlayback(d,l3.id,'M01.03',[[0,5]],29.857938);const restored=P.validate(JSON.parse(JSON.stringify(d)));
check(restored.position.time===5&&restored.position.sourcePage===25&&!restored.position.sourceFollow,'Old progress and manual slide hold remain valid');
check(!restored.lessons[l3.id].markedComplete&&restored.preferences.rate===1.25,'No progress or listening falsely completed');
console.log(JSON.stringify({passed:true,scope:'Production presentation policy, source bounds, original audio bytes and progress contract; not browser or physical-device qualification',checks,lessons:map.lessons.length,recordings:all.length,cuePlacements:placements,isolatedTourCuePlacements:replaced,reviewedFigureCuePlacements:reviewed,existingSourceCuePlacements:existingSource,explicitOverviewPlacements:overview},null,2));
