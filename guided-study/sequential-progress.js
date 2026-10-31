/* Additive course progress. Playback coverage, reading, skipping and completion
   are independent facts; native media.played ranges never imply mastery. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.SequentialProgress=factory();})(typeof window==='object'?window:globalThis,function(){
 'use strict';
 const KEY='cmt.sequential-course.progress.v1',stages=['intro','explanation','activity','recap'];
 const clone=x=>JSON.parse(JSON.stringify(x));
 function empty(manifest,reduced=false){return {version:1,manifestVersion:manifest.version,sourceSHA256:manifest.source.sha256,position:{lessonId:manifest.lessons[0].id,stage:'intro',sourcePage:manifest.lessons[0].pages[0],segment:0,time:0,cueId:null,scene:null},preferences:{continuous:false,rate:1,textOnly:!!reduced},lessons:{},routeReachedEnd:false};}
 function validPosition(p){return p&&typeof p.lessonId==='string'&&stages.includes(p.stage)&&Number.isInteger(p.sourcePage)&&p.sourcePage>=1&&p.sourcePage<=911&&Number.isInteger(p.segment)&&p.segment>=0&&Number.isFinite(p.time)&&p.time>=0&&p.time<86400&&(p.scene==null||typeof p.scene==='object');}
 function validate(raw){
  if(!raw||raw.version!==1||typeof raw.manifestVersion!=='string'||typeof raw.sourceSHA256!=='string'||!validPosition(raw.position)||!raw.preferences||typeof raw.preferences.continuous!=='boolean'||![.75,1,1.25,1.5,2].includes(raw.preferences.rate)||typeof raw.preferences.textOnly!=='boolean'||!raw.lessons||typeof raw.lessons!=='object'||Array.isArray(raw.lessons)||typeof raw.routeReachedEnd!=='boolean')throw Error('Invalid sequential course progress');
  if(Object.keys(raw.lessons).length>2000)throw Error('Course progress is too large');
  for(const [id,x]of Object.entries(raw.lessons)){
   if(typeof id!=='string'||!x||!['not_started','in_progress'].includes(x.status)||typeof x.sourceReviewed!=='boolean'||typeof x.skipped!=='boolean'||typeof x.markedComplete!=='boolean'||typeof x.practiceAttempted!=='boolean'||typeof x.revisit!=='boolean'||!x.transcripts||!x.audio||typeof x.audio!=='object')throw Error('Invalid lesson record');
   for(const ranges of Object.values(x.audio)){if(!Array.isArray(ranges)||ranges.length>2000||ranges.some(r=>!Array.isArray(r)||r.length!==2||!r.every(Number.isFinite)||r[0]<0||r[1]<r[0]||r[1]>86400))throw Error('Invalid playback ranges');}
  }
  return clone(raw);
 }
 function record(data,id){return data.lessons[id]||(data.lessons[id]={status:'not_started',sourceReviewed:false,transcripts:{},skipped:false,markedComplete:false,practiceAttempted:false,revisit:false,audio:{}});}
 function begin(data,id){record(data,id).status='in_progress';}
 function union(ranges,duration){const rows=ranges.map(r=>[Math.max(0,Math.min(duration,r[0])),Math.max(0,Math.min(duration,r[1]))]).filter(r=>r[1]>r[0]).sort((a,b)=>a[0]-b[0]),out=[];for(const r of rows){const prior=out[out.length-1];if(prior&&r[0]<=prior[1]+.02)prior[1]=Math.max(prior[1],r[1]);else out.push(r);}return out;}
 function addPlayback(data,id,clipId,ranges,duration){const x=record(data,id);x.audio[clipId]=union([...(x.audio[clipId]||[]),...ranges],duration);}
 function coverage(data,id,clipId,duration){const ranges=data.lessons[id]?.audio?.[clipId]||[],seconds=ranges.reduce((n,r)=>n+r[1]-r[0],0);return {seconds,portion:duration?Math.min(1,seconds/duration):0,full:duration>0&&seconds>=duration*.98&&ranges[0]?.[0]<=.2&&ranges.at(-1)?.[1]>=duration-.2};}
 function summary(data,id){const x=data.lessons[id];if(!x)return 'Not started';return [x.markedComplete?'Marked complete':x.status==='in_progress'?'In progress':'Not started',x.sourceReviewed?'source reviewed':null,Object.keys(x.transcripts).length?'transcript reviewed':null,x.skipped?'skipped':null,x.practiceAttempted?'practice attempted':null,x.revisit?'revisit':null].filter(Boolean).join(' · ');}
 return {KEY,empty,validate,record,begin,union,addPlayback,coverage,summary,validPosition,clone};
});
