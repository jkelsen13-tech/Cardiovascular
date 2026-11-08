'use strict';
const A=require('assert/strict'),fs=require('fs'),crypto=require('crypto');
const p=require('../../private-course/pages.json'),m=require('../../private-course/practice-reveal.json'),runtime=require('../../guided-study/sequential-practice.js'),V=require('../../guided-study/sequential-visuals.js');
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');let checks=0;const check=(v,n)=>{A.ok(v,n);checks++};
A.deepEqual(runtime,m);check(m.sourceSHA256===p.sourceSHA256,'exact original source identity');check(p.pages.length===911,'911 pages preserved');check(p.pages.filter(p=>p.practice).length===212,'212 original flags preserved');
for(const page of p.pages.filter(x=>x.practice))check(!!m.entries[page.page],'flagged page covered '+page.page);
for(const e of Object.values(m.entries)){
 check(e.originalImageSHA256===hash(p.pages[e.page-1].imageRoute),'original pixels bound '+e.page);
 for(const q of e.questionSource?.kind==='reviewed-embedded-image'?[]:e.questions||[])check(p.pages[e.page-1].text.replace(/\s+/g,' ').includes(q.replace(/\s+/g,' ')),'source question exact '+e.page);
 if(e.safeImageRoute)check(hash(e.safeImageRoute)===e.safeImageSHA256,'safe asset hash '+e.page);
 if(e.safeImagePage)check(hash(p.pages[e.safeImagePage-1].imageRoute)===e.safeImageSourceSHA256,'counterpart source '+e.page);
}
check(m.entries[100].questions.join(' ').includes('normal range for oxygen saturation'),'p100 source question');check(!m.entries[100].questions.join(' ').includes('94'),'p100 answer absent');check(m.entries[101].questions.join(' ').includes('ventilation, metabolism and perfusion'),'p101 source question');check(!/capnog|carbon dioxide/i.test(m.entries[101].questions.join(' ')),'p101 answer absent');
for(const [n,count] of [[165,3],[167,2],[169,2]])check(m.entries[n].questions.length===count,'multiple questions '+n);
check(m.entries[72].safeImageRoute!==p.pages[71].imageRoute,'p72 excludes printed answer list');
for(let n=765;n<=805;n++)check(m.entries[n].kind==='safe-original','unflagged strip '+n);
for(let n=313;n<=330;n++)check(m.entries[n].kind==='worked-example'&&m.entries[n].answerReveal===false,'reviewed measurement example visible '+n);
for(let n=896;n<=910;n+=2)check(m.entries[n].safeImagePage===n-1,'explicit paired ECG '+n);
const src=fs.readFileSync('guided-study/sequential-player.js','utf8');check(!src.includes('sourceRevealed=saved.revealed===true'),'reload does not restore disclosure');check(src.includes('sourceRevealed=!sourceRevealed'),'Reveal/Hide uses same control');
for(const f of ['index.html','cmt-quiz.html'])check(fs.readFileSync(f,'utf8').includes('guided-study/sequential-practice.js'),'manifest load '+f);
const sm=require('../../private-course/source-manifest.json');console.log(JSON.stringify({passed:true,checks,entries:Object.keys(m.entries).length,flaggedPractice:212,questionPassages:Object.values(m.entries).reduce((n,e)=>n+(e.questions?.length||0),0),types:Object.values(m.entries).reduce((o,e)=>(o[e.kind]=(o[e.kind]||0)+1,o),{}),runtimeBrowser:'separate gate',physicalIPad:false}));
