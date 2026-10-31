'use strict';
const fs=require('fs'),crypto=require('crypto'),vm=require('vm'),A=require('assert/strict');
const map=require('../../guided-study/sequential-map.js'),box={};box.window=box;vm.createContext(box);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');let checks=0;const check=(v,n)=>{A.ok(v,n);checks++;};
for(const n of ['lessons','lessons-m01','lessons-m03','lessons-m04','lessons-m05','lessons-m06','lessons-m08','lessons-m07','lessons-m09','lessons-m10','lessons-m11','lessons-m12','lessons-m13','lessons-m14','sequential-narrations'])vm.runInContext(fs.readFileSync('guided-study/'+n+'.js','utf8'),box);
const all=[...box.GuidedStudyLessons,...box.SequentialCourseNarrations].filter(x=>x.audio),inventory=JSON.parse(fs.readFileSync('guided-study/assets/audio-inventory.json')).recordings,source=JSON.parse(fs.readFileSync('private-course/pages.json')),images=JSON.parse(fs.readFileSync('private-course/source-manifest.json'));
check(map.lessons.length===84&&map.units.length===11&&new Set(map.lessons.map(x=>x.id)).size===84,'84stable lessons /11verified source sections');
check(map.lessons[0].id==='source.lesson.p0001'&&map.lessons.at(-1).id==='source.lesson.p0911','Actual first and final source lessons');
check(map.source.sha256==='1f27f49db5eea5dfbbb497c499308aed1bc1f6e24f0dd6f800b2acd2b72bf080'&&source.sourceSHA256===map.source.sha256,'Verified original source identity');
check(source.pages.length===911&&images.pages.length===911,'All911 original text/image page positions retained');
for(let i=0;i<911;i++){const p=source.pages[i],r=images.pages[i],bytes=fs.readFileSync(p.imageRoute);check(p.page===i+1&&r.page===p.page&&bytes.length===r.bytes&&sha(bytes)===r.sha256&&bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a','Exact static source PNG '+p.page);}
check(all.length===120&&new Set(all.map(x=>x.id)).size===120&&inventory.length===120,'111original and9new unique recordings');
for(const x of all){const r=inventory.find(r=>r.id===x.id);check(r&&sha(fs.readFileSync(x.audio.src))===x.audio.sha256&&r.audio.sha256===x.audio.sha256&&sha(Buffer.from(x.transcript||x.text))===r.transcriptSHA256,'Frozen MP3 and transcript '+x.id);}
check(map.lessons.filter(x=>x.closureReuse).length===16,'16approved reuse placements');
const timing=JSON.parse(fs.readFileSync('guided-study/assets/final-nine-page-timing.json'));let cueCount=0,changes=0,holds=0;
for(const x of box.SequentialCourseNarrations){const t=timing.clips.find(t=>t.id===x.id);check(t&&x.cues.length===t.bindings.length,'Measured binding '+x.id);for(let i=0;i<x.cues.length;i++){const c=x.cues[i],b=t.bindings[i];check(c.at===b.atNativeMP3Time&&c.scene.page===b.effectivePage&&c.scene.page>=x.sourcePages[0]&&c.scene.page<=x.sourcePages[1]&&(i===0?c.at===0:c.at>x.cues[i-1].at),'Measured bounded cue '+c.id);if(i&&c.scene.page!==x.cues[i-1].scene.page)changes++;if(b.holdCurrentPage)holds++;cueCount++;}}
check(cueCount===59&&changes===36&&holds===10,'59anchors,36page changes,10explicit holds');
check(timing.humanListeningReview===false&&timing.physicalDeviceReview===false,'Human/device limitations remain explicit');
check(fs.readFileSync('index.html').equals(fs.readFileSync('cmt-quiz.html')),'Both existing entry points preserved');
for(const f of ['guided-study/sequential-map.js','guided-study/sequential-narrations.js','guided-study/assets/audio-inventory.json','guided-study/assets/final-nine-page-timing.json'])check(!/libfile_|file_000000|\/workspace\/|actualCharge|generationClicks|gh[pousr]_[A-Za-z0-9]{20}/.test(fs.readFileSync(f,'utf8')),'No private operational identifiers/account receipts '+f);
console.log(JSON.stringify({passed:true,checks,lessons:84,recordings:120,sourceImages:911,anchors:cueCount,pageChanges:changes,holds,humanListening:'pending',physicalIPad:'pending'}));
