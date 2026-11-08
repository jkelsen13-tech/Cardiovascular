/* Original strip responses and explicitly unscored source/measurement reviews.
   This owner never writes lesson completion, listening coverage or trainer keys. */
(function(root,factory){const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;else root.SourceStripPractice=api;})(typeof window==='object'?window:globalThis,function(host){
 'use strict';
 const KEY='cmt.source-strip-responses.v1';
 const fields=[['regularity','Regularity'],['rate','Rate (bpm)'],['pWaves','P waves'],['pr','PR interval / relationship'],['qrs','QRS duration'],['interpretation','Interpretation']];
 const ids=new Set(fields.map(x=>x[0]));
 function validateReview(review,entry,inventory){
  if(!review||review.version!==1||review.page!==entry.page||review.sourceSHA256!==inventory.sourceSHA256||review.sourceImageSHA256!==entry.sourceImageSHA256||review.scoring!=='none'||review.qualifiedEducatorReview!==false||!['source-marked-with-limits','derived-unvalidated'].includes(review.authority)||!Array.isArray(review.fields)||review.fields.length>6||typeof review.notice!=='string')throw Error('Review identity or qualification mismatch');
  const seen=new Set();for(const f of review.fields){if(!f||!ids.has(f.id)||seen.has(f.id)||typeof f.value!=='string'||typeof f.basis!=='string'||typeof f.reason!=='string')throw Error('Review fields are malformed');seen.add(f.id);}
  if(!Array.isArray(review.limitations)||review.limitations.some(x=>typeof x!=='string'))throw Error('Review limitations are missing');
  const allowed=inventory.sourceAnswerPairs.find(x=>x.questionPage===entry.page)?.answerPages||[];
  if(!Array.isArray(review.sourceAnswerPages)||review.sourceAnswerPages.some(x=>!allowed.includes(x.page)||x.imageRoute!=='private-course/page/'+x.page+'.png'||!/^\w{64}$/.test(x.sha256)))throw Error('Original answer-page identity mismatch');
  if(review.authority==='derived-unvalidated'&&review.sourceAnswerPages.length)throw Error('Derived review cannot impersonate an original source answer');
  return review;
 }
 function validateSaved(raw,inventory){
  if(!raw||raw.version!==1||raw.sourceSHA256!==inventory.sourceSHA256||!raw.entries||typeof raw.entries!=='object'||Array.isArray(raw.entries)||Object.keys(raw.entries).length>inventory.responsePageCount)throw Error('Saved strip-response identity differs or is malformed');
  for(const [page,r]of Object.entries(raw.entries)){
   if(!Object.hasOwn(inventory.entries,page)||!r||!Number.isSafeInteger(r.attempts)||r.attempts<0||!r.responses||typeof r.responses!=='object'||Array.isArray(r.responses)||Object.keys(r.responses).some(k=>!ids.has(k)||typeof r.responses[k]!=='string'||r.responses[k].length>1000))throw Error('Saved strip responses are malformed');
  }return raw;
 }
 function mount(parent,options={}){
  const inventory=host.SourceStripInventory,doc=host.document;if(!inventory||!doc||inventory.version!==1)return null;
  const section=doc.createElement('section');section.className='sc-strip-practice';section.hidden=true;section.setAttribute('aria-label','ECG source-strip practice');parent.append(section);
  const make=(tag,text)=>{const e=doc.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  const heading=make('h3','Your rhythm interpretation'),reference=make('p'),notice=make('p','Use the original waveform above. Record what you can support, including “not reliably measurable” when appropriate. Responses and review are unscored and do not complete a lesson.'),form=make('div'),actions=make('div'),status=make('p'),reviewBox=make('section');
  form.className='sc-strip-fields';actions.className='sc-strip-actions';status.setAttribute('role','status');reviewBox.id='source-strip-review';reviewBox.hidden=true;reviewBox.setAttribute('aria-label','Unscored ECG review');
  const inputs=new Map();for(const [id,label]of fields){const l=make('label',label),input=make('textarea');input.rows=2;input.maxLength=1000;input.dataset.stripField=id;input.setAttribute('aria-label',label+' response');l.append(input);form.append(l);inputs.set(id,input);}
  const attempt=make('button','Save practice attempt'),toggle=make('button','Review source answers'),trainer=make('button','Open existing ECG rhythm practice'),examples=make('details'),summary=make('summary','Original worked-answer examples');
  for(const b of [attempt,toggle,trainer])b.type='button';attempt.dataset.stripAttempt='';toggle.dataset.stripReview='';trainer.dataset.stripTrainer='';toggle.setAttribute('aria-controls',reviewBox.id);toggle.setAttribute('aria-expanded','false');
  actions.append(attempt,toggle,trainer);examples.append(summary,make('p','These original examples already have source-answer material. Their answers are source claims, not independent clinical validation. Opening an example preserves its original lesson and answer protections.'));
  for(const pair of inventory.sourceAnswerPairs){const b=make('button','PDF '+pair.questionPage+' → original answers '+pair.answerPages.join(', '));b.type='button';b.dataset.stripExample=String(pair.questionPage);b.addEventListener('click',()=>options.openSource?.(pair.questionPage));examples.append(b);}
  section.append(heading,reference,notice,form,actions,status,reviewBox,examples);
  let current=null,displayPage=null,generation=0,controller=null,revealed=false,loading=false,storageBlocked=false;
  let saved={version:1,sourceSHA256:inventory.sourceSHA256,entries:{}};
  try{const raw=host.localStorage.getItem(KEY);if(raw)saved=validateSaved(JSON.parse(raw),inventory);}catch(e){storageBlocked=true;status.textContent='Existing strip-response data could not be read. It has not been overwritten. Responses remain available only for this session.';}
  const record=()=>options.reviewRecord?.(current.page)||saved.entries[current.page]||(saved.entries[current.page]={responses:{},attempts:0});
  function persist(){if(current&&options.reviewRecord?.(current.page)){return options.persistReview?.()===true;}if(storageBlocked)return false;try{host.localStorage.setItem(KEY,JSON.stringify(saved));return true;}catch(e){storageBlocked=true;return false;}}
  function reset(){generation++;controller?.abort();controller=null;current=null;displayPage=null;revealed=false;loading=false;section.hidden=true;reviewBox.hidden=true;reviewBox.replaceChildren();toggle.disabled=false;toggle.setAttribute('aria-expanded','false');}
  function show(page,sourceRevealed=false){reset();const canonical=inventory.pageAliases?.[page]||page,entry=inventory.entries[canonical];if(!entry)return;current=entry;displayPage=page;section.hidden=false;reference.textContent='Original waveform PDF page '+canonical+(canonical!==page?' · answer source PDF '+page:'')+' · self-study response';
   for(const [id,input]of inputs)input.value=(options.reviewRecord?.(canonical)||saved.entries[canonical])?.responses?.[id]||'';
   toggle.hidden=!entry.reviewPath||entry.revealOwner==='source';toggle.textContent=entry.reviewStatus==='derived-unvalidated'?'Review provisional measurements':'Review source answers';
   status.textContent=storageBlocked?'Responses are session-only. Existing stored data has not been overwritten.':entry.reviewPath?(entry.revealOwner==='source'?'Your responses save on this browser. Use the existing Reveal Answer button above for the original source comparison.':'Your responses save on this browser. Review stays hidden until you request it.'):'No adjudicated answer key is available for this strip yet. You can save your own response or use the existing 13-strip trainer; no guessed answer or score is supplied.';
   if(entry.revealOwner==='source'&&sourceRevealed)reveal();
  }
  for(const [id,input]of inputs)input.addEventListener('input',()=>{if(!current)return;record().responses[id]=input.value;if(!persist())status.textContent='Response kept for this session only; browser storage is unavailable. No lesson progress changed.';});
  attempt.addEventListener('click',()=>{if(!current)return;const r=record();r.attempts++;const stored=persist();status.textContent='Practice attempt '+r.attempts+' recorded'+(stored?' on this browser':' for this session')+'. It is not scored, marked correct or counted as lesson completion.';});
  trainer.addEventListener('click',()=>options.openTrainer?.());
  async function reveal(){
   if(!current||!current.reviewPath||loading)return;
   if(revealed){revealed=false;reviewBox.hidden=true;reviewBox.replaceChildren();toggle.setAttribute('aria-expanded','false');toggle.textContent=current.reviewStatus==='derived-unvalidated'?'Review provisional measurements':'Review source answers';return;}
   options.pause?.();const entry=current,token=generation;controller=new AbortController();loading=true;toggle.disabled=true;status.textContent='Loading the exact review for this source strip…';
   try{
    const url=new URL(entry.reviewPath,doc.baseURI);if(url.origin!==host.location.origin||!/^ecg\/source-reviews\/p\d{4}\.json$/.test(entry.reviewPath))throw Error('Review route is not authorized');
    const response=await fetch(url,{credentials:'same-origin',mode:'same-origin',signal:controller.signal});if(!response.ok)throw Error('Review HTTP '+response.status);const bytes=await response.arrayBuffer();
    if(!host.crypto?.subtle||!entry.reviewSHA256)throw Error('Exact review integrity is unavailable');
    const digest=[...new Uint8Array(await host.crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');if(digest!==entry.reviewSHA256)throw Error('Review checksum mismatch');
    const review=validateReview(JSON.parse(new TextDecoder().decode(bytes)),entry,inventory);if(token!==generation||entry!==current)return;
    reviewBox.replaceChildren(make('h4',review.title||'Unscored review'),make('p',review.notice));
    const dl=make('dl');for(const [id,label]of fields){const f=review.fields.find(x=>x.id===id);dl.append(make('dt',label),make('dd',f?f.value+'\nBasis: '+f.basis+'\n'+f.reason:'Not reliably established for this strip. No answer is supplied or scored.'));}reviewBox.append(dl);
    for(const note of review.limitations)reviewBox.append(make('p',note));
    for(const source of review.sourceAnswerPages){const details=make('details'),caption=make('summary','Original answer slide · PDF '+source.page),img=make('img');img.alt='Original source answer slide, PDF page '+source.page;img.loading='lazy';img.src=source.imageRoute;img.addEventListener('error',()=>{img.hidden=true;details.append(make('p','Original answer image unavailable. The separately transcribed source fields above retain their page attribution.'));},{once:true});details.append(caption,img);reviewBox.append(details);}
    revealed=true;reviewBox.hidden=false;toggle.textContent='Hide review';toggle.setAttribute('aria-expanded','true');status.textContent=review.authority==='derived-unvalidated'?'Provisional derived measurements. No qualified ECG educator has validated this key. Nothing is scored.':'Original source answers and separately labeled retained review are shown. Nothing is scored.';
   }catch(e){if(token===generation&&entry===current){revealed=false;reviewBox.hidden=true;reviewBox.replaceChildren();status.textContent='Review unavailable: '+e.message+'. Your responses are preserved. No answer or score was substituted.';}}
   finally{if(token===generation){loading=false;toggle.disabled=false;}}
  }
  toggle.addEventListener('click',reveal);
  return {show,reset,inspect:()=>({page:current?.page||null,displayPage,revealed,loading,storageBlocked,scoring:'none'}),element:section};
 }
 return {KEY,fields,validateReview,validateSaved,mount};
});
