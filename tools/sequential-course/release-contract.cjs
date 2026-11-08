'use strict';
// Public runtime checks. Independent clinical/source adjudication stays separate.
const A=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const I=require('../../ecg/source-strip-inventory.json'),J=require('../../guided-study/source-strip-inventory.js'),P=require('../../guided-study/source-strip-practice.js'),S=require('../../private-course/source-manifest.json'),Q=require('../../private-course/practice-reveal.json'),C=require('./fixtures/47-page-dispositions.json');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
let checks=0;const check=(v,n)=>{A.ok(v,n);checks++};
A.deepEqual(I,J);checks++;
let derived=0,fields=0,complete=0;const fieldCounts={};
for(const e of Object.values(I.entries)){
 check(e.scoring==='none','Unscored source page '+e.page);
 check(sha(fs.readFileSync('private-course/page/'+e.page+'.png'))===e.sourceImageSHA256,'Exact source '+e.page);
 check(S.pages.find(p=>p.page===e.page).sha256===e.sourceImageSHA256,'Source manifest '+e.page);
 const bytes=fs.readFileSync(e.reviewPath),r=JSON.parse(bytes);
 check(sha(bytes)===e.reviewSHA256,'Review digest '+e.page);P.validateReview(r,e,I);checks++;
 for(const bad of [{...r,scoring:'validated'},{...r,qualifiedEducatorReview:true},{...r,sourceImageSHA256:'wrong'},{...r,page:e.page+1}]){A.throws(()=>P.validateReview(bad,e,I));checks++;}
 if(r.authority==='derived-unvalidated'){
  derived++;fields+=r.fields.length;if(r.fields.length===6)complete++;
  check(r.notice.includes('unvalidated')&&r.sourceAnswerPages.length===0,'No clinical/publisher authority '+e.page);
  for(const f of r.fields)fieldCounts[f.id]=(fieldCounts[f.id]||0)+1;
 }
 for(const s of r.sourceAnswerPages)check(sha(fs.readFileSync(s.imageRoute))===s.sha256,'Original answer source '+e.page);
}
check(derived===195&&fields===938&&complete===35,'Provisional coverage without implied validation');
A.deepEqual(fieldCounts,{regularity:181,rate:180,interpretation:195,pWaves:195,pr:43,qrs:144});checks++;
for(const row of C.records){const q=Q.entries[row.page];check(q.disposition===row.disposition&&q.review===row.recommendation,'Reviewed instructional purpose '+row.page);check(q.answerReveal===(row.page===659),'Answer interaction '+row.page);}
check(C.records.length===47&&Q.audioHolds.recordings.length===21,'Complete classifications and retained audio holds');
for(const r of Q.audioHolds.recordings)check(sha(fs.readFileSync(r.src))===r.sha256,'Frozen protected recording '+r.id);
const build=require('../../BUILD-IDENTITY.json');for(const [path,v] of Object.entries(build.runtimeFiles)){const b=fs.readFileSync(path);check(b.length===v.bytes&&sha(b)===v.sha256,'Release inventory '+path);}
console.log(JSON.stringify({passed:true,checks,derivedReviews:derived,provisionalFields:fields,completeProvisionalReviews:complete,newScoredFields:0,qualifiedEducatorReview:false,physicalIPad:false,humanListening:false}));
