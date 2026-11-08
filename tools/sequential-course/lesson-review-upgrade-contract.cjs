'use strict';
// Genuine baseline-UI export retained unchanged from the independent browser review.
// Executes production reveal/choice handlers without pretending this is browser qualification.
const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),R=require('../../guided-study/sequential-review'),P=require('../../guided-study/sequential-progress'),M=require('../../guided-study/sequential-map'),Q=require('../../guided-study/sequential-practice'),I=require('../../guided-study/source-strip-inventory');
const source=fs.readFileSync(require.resolve('../../guided-study/sequential-player'),'utf8'),input=require('./fixtures/legacy-source-choice-baseline-export.json'),data=P.validate(input),lesson=M.lessons.find(l=>l.id===data.position.lessonId),attempt=R.empty(),legacy=data.lessons[lesson.id].questions[659];
let checks=0;const check=(v,n)=>{A.ok(v,n);checks++};check(legacy.selectedOption===2&&!data.lessons[lesson.id].review,'unchanged old UI export has source choice but no review');
const line=source.split('\n').find(x=>x.includes("listen(q('reveal'),'click'")),prefix="listen(q('reveal'),'click',",handler=line.slice(line.indexOf(prefix)+prefix.length,line.lastIndexOf(');'));
let active=false;const context={stopAudio(){},sourceRevealed:false,practiceEntries:Q.entries,data:{position:{sourcePage:659}},reviewActive:()=>active,reviewItem:page=>R.item(attempt,page),questionRecord:()=>legacy,showSource(){},save(){},render(){}};vm.createContext(context);const reveal=()=>vm.runInContext('('+handler+')()',context);
reveal();check(!attempt.items[659],'source-only Reveal does not create a review submission');check(legacy.reveals===1,'source Reveal retains legacy source ledger');
let summary=R.summary(R.queue(lesson,Q,I),attempt,Q);check(summary.sourceChoice.correct===0&&summary.sourceChoice.answered===0&&summary.blank===1,'genuine baseline export cannot score a blank review');
active=true;context.sourceRevealed=false;reveal();check(R.item(attempt,659).submittedOption===null,'blank in-review reveal also earns no submission');
const item=R.item(attempt,659);item.selectedOption=2;context.sourceRevealed=false;reveal();check(R.summary(R.queue(lesson,Q,I),attempt,Q).sourceChoice.correct===1,'current in-review selected source option scores');
item.selectedOption=null;check(R.summary(R.queue(lesson,Q,I),attempt,Q).sourceChoice.correct===0,'nonblank selection required even before validation');R.validate(attempt);check(item.submittedOption===null,'import clears stale incompatible submission');
item.selectedOption=1;item.submittedOption=2;R.validate(attempt);check(item.submittedOption===null,'import clears mismatched old selection');
const unsafe={...input,lessons:JSON.parse(JSON.stringify(input.lessons))};unsafe.lessons[lesson.id].questions[659].answers=Array(31).fill('x');A.throws(()=>P.validate(unsafe));checks++;
console.log(JSON.stringify({passed:true,checks,input:'unmodified public-baseline UI export',baseline:'9ea7c53d21baef394b0b2ca5bce9459819683459',browserQualification:'separate gate'}));
