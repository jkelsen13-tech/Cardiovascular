/* Original-source review attempts. Self-check is not automatic clinical grading. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.SequentialReview=factory();})(typeof window==='object'?window:globalThis,function(){
 'use strict';
 function queue(lesson,practice,strips){
  const out=[];
  for(let page=lesson.pages[0];page<=lesson.pages[1];page++){
   const entry=practice.entries[page],strip=strips?.entries[page];
   if(entry&&['question-text','question-visual','question-choice','recall-prompt'].includes(entry.kind)&&entry.questions?.length)out.push({page,kind:entry.kind,prompts:entry.questions.length,scoring:entry.kind==='question-choice'&&entry.choices?.includes(entry.sourceMarkedAnswer)?'source-choice':entry.answerReveal&&entry.kind!=='recall-prompt'?'self-check':'none'});
   else if(strip)out.push({page,kind:'ecg',prompts:6,scoring:'none'});
  }return out;
 }
 function empty(attempt=1){return {version:1,attempt,finished:false,items:{},history:[]};}
 function item(attempt,page){return attempt.items[page]||(attempt.items[page]={answers:[],ratings:[],selectedOption:null,submittedOption:null,responses:{},attempts:0});}
 function summary(queue,attempt,practice){
  const s={questionPages:queue.length,totalPrompts:0,sourceChoice:{correct:0,total:0,answered:0},selfCheck:{correct:0,total:0,checked:0,answered:0},unscored:{total:0,answered:0},blank:0};
  for(const q of queue){const a=attempt.items[q.page]||{},answered=q.kind==='ecg'?Object.values(a.responses||{}).filter(v=>v.trim()).length:q.kind==='question-choice'?(Number.isInteger(a.selectedOption)?1:0):(a.answers||[]).slice(0,q.prompts).filter(v=>v.trim()).length;
   s.totalPrompts+=q.prompts;s.blank+=q.prompts-answered;
   if(q.scoring==='source-choice'){s.sourceChoice.total++;s.sourceChoice.answered+=answered;if(Number.isInteger(a.submittedOption)&&practice.entries[q.page].choices[a.submittedOption]===practice.entries[q.page].sourceMarkedAnswer)s.sourceChoice.correct++;}
   else if(q.scoring==='self-check'){s.selfCheck.total+=q.prompts;s.selfCheck.answered+=answered;for(let i=0;i<q.prompts;i++)if(a.answers?.[i]?.trim()&&['correct','incorrect'].includes(a.ratings?.[i])){s.selfCheck.checked++;if(a.ratings[i]==='correct')s.selfCheck.correct++;}}
   else{s.unscored.total+=q.prompts;s.unscored.answered+=answered;}
  }return s;
 }
 function validate(a){
  if(!a||a.version!==1||!Number.isSafeInteger(a.attempt)||a.attempt<1||typeof a.finished!=='boolean'||!a.items||typeof a.items!=='object'||Array.isArray(a.items)||Object.keys(a.items).length>911||!Array.isArray(a.history)||a.history.length>20)throw Error('Invalid review attempt');
  for(const [page,i]of Object.entries(a.items))if(!/^\d+$/.test(page)||+page<1||+page>911||!i||!Array.isArray(i.answers)||i.answers.length>30||i.answers.some(x=>typeof x!=='string'||x.length>6000)||!Array.isArray(i.ratings)||i.ratings.length>30||i.ratings.some(x=>x!==null&&!['correct','incorrect'].includes(x))||![i.selectedOption,i.submittedOption].every(x=>x===null||Number.isInteger(x)&&x>=0&&x<4)||!i.responses||typeof i.responses!=='object'||Array.isArray(i.responses)||Object.entries(i.responses).some(([k,v])=>!['regularity','rate','pWaves','pr','qrs','interpretation'].includes(k)||typeof v!=='string'||v.length>1000)||!Number.isSafeInteger(i.attempts)||i.attempts<0)throw Error('Invalid review response');
  return a;
 }
 return {queue,empty,item,summary,validate};
});
