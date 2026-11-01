/* Presentation boundary: source-ordered lessons never inherit simulator-tour
   cues merely because they reuse the same narration. Explicit enrichment keeps
   the original scene bindings. This policy changes no audio or source wording. */
(function(root){
 'use strict';
 // Source figures inspected against original PDF pages 24-34. Times/IDs remain
 // the existing measured audio anchors; these arrays select pictures, not timing.
 const reviewed={
  'source.lesson.p0024':{
   'M01.03':[24,27,27,27,27,28,28,28],
   'M01.05':[26,27,27,26,27,27,26]
  },
  'source.lesson.p0030':{
   'M01.04':[31,31,31,31,31,30],
   'M07.04':[30,32,32,32,32,33,34,34,31]
  }
 };
 function sourceCue(lesson,recording,cue,index,optional=false){
  if(optional)return cue;
  const inRange=p=>Number.isInteger(p)&&p>=lesson.pages[0]&&p<=lesson.pages[1];
  const segment=lesson.audio.find(x=>x.clipId===recording.id);
  const reviewedPage=reviewed[lesson.id]?.[recording.id]?.[index];
  let page,qualification;
  if(inRange(reviewedPage)){page=reviewedPage;qualification='Reviewed source figure matched to the existing recorded phrase. Original narration is an adaptation, not a reading of every slide.';}
  else if(cue.scene?.organ==='source'&&inRange(cue.scene.page)){page=cue.scene.page;qualification='Existing measured source-page cue retained.';}
  else{
   page=inRange(segment?.primarySourcePage)?segment.primarySourcePage:lesson.pages[0];
   qualification='Verified lesson overview page held for this adapted recording. Exact phrase-to-slide mapping has not been established here; all lesson pages remain available manually.';
  }
  return {...cue,scene:{organ:'source',page},visualStatus:'source-slide',presentationNote:qualification};
 }
 function sourceCues(lesson,recording,optional=false){return recording.cues.map((c,i)=>sourceCue(lesson,recording,c,i,optional));}
 function kind(recording,optional=false){return !optional?'slideshow':recording?.cues.some(c=>['heart','respiratory','lead'].includes(c.scene?.organ))?'guided-simulation':'guided-explanation';}
 root.SequentialCoursePresentation=Object.freeze({sourceCue,sourceCues,kind});
})(typeof window==='object'?window:globalThis);

/* Source lessons, explicit learning boundaries and one shared media element.
   Original slide assets remain private; source wording and adaptation are distinct. */
(function(host){
 'use strict';
 if(!host.document)return; // Pure presentation policy is also exercised in Node.
 const presentation=host.SequentialCoursePresentation;
 const doc=host.document,map=host.SequentialCourseMap,P=host.SequentialProgress,C=host.ContextualAudio,home=doc.getElementById('home'),menu=doc.getElementById('homeMenu');
 if(!map||!P||!C||!home||!menu)return;
 const recordings=new Map([...host.GuidedStudyLessons,...(host.SequentialCourseNarrations||[])].filter(l=>l.audio).map(l=>[l.id,l]));
 const byLesson=new Map(map.lessons.map((l,i)=>[l.id,i]));
 const adapters={heart:host.HeartV3Study.guided,respiratory:host.CardiorespiratoryStudy.guided,lead:LeadPlacementLab.guided,explanation:host.GuidedCourseExplanation};
 const audio=C.audio,copy=P.clone,clock=t=>Math.floor(Math.max(0,t||0)/60)+':'+String(Math.floor(Math.max(0,t||0)%60)).padStart(2,'0');
 let data=P.empty(map,matchMedia('(prefers-reduced-motion:reduce)').matches),index=0,active=false,mode='explore',loading=false,error='',warning='',storageBlocked=false,hasSaved=false;
 let revision=0,epoch=0,loadController=null,sceneController=null,blobUrl=null,attachedClip=null,playingIntent=false,needsGesture=false,preparing=false,preparedOrgan=null,applied=null,pending=null,running=false,frame=0,lastTick=-1,lastSave=-Infinity,endedToken=null;
 let sourcePages=null,sourceFetch=null,sourceError='',sourceRevision=0,sourceRevealed=false,returnPoint=null,optionalClip=null,optionalReturn=null,refresherReturn=null;
 const listeners=[],lesson=()=>map.lessons[index],unit=()=>map.units.find(u=>u.id===lesson().unitId),clip=()=>recordings.get(optionalClip||lesson().audio[data.position.segment]?.clipId)||null;
 const duration=()=>clip()?.audio.duration||0,ledgerId=()=>optionalClip?'optional.audio.'+optionalClip:lesson().id;
 const isSlideshow=()=>!optionalClip,effectiveCue=(c,i)=>presentation.sourceCue(lesson(),c,c.cues[i],i,!!optionalClip),effectiveCues=c=>presentation.sourceCues(lesson(),c,!!optionalClip);
 function setText(el,value){const text=String(value);if(el.textContent!==text)el.textContent=text;}
 function setValue(el,value){const text=String(value);if(el.value!==text)el.value=text;}
 function listen(el,type,fn,options){el.addEventListener(type,fn,options);listeners.push(()=>el.removeEventListener(type,fn,options));}
 const card=doc.createElement('section');card.id='guidedCourse';card.hidden=true;card.setAttribute('aria-label','Full Course');
 card.innerHTML='<header><strong data-seq-unit></strong><button type="button" data-seq-close aria-label="Close course">✕</button></header><h2 data-seq-title></h2><p data-seq-position></p><p data-seq-next></p><p class="sc-presentation" data-seq-presentation></p><div class="sc-actions"><button type="button" data-seq-previous>Previous Lesson</button><button type="button" data-seq-next-lesson>Next Lesson</button><button type="button" data-seq-mode>Explore</button><button type="button" data-seq-return hidden>Return to saved lesson</button></div><div data-seq-guided><ol class="sc-stages" aria-label="Lesson flow"><li data-step=intro>Introduction</li><li data-step=explanation>Explanation</li><li data-step=activity>Inspect / practice</li><li data-step=recap>Recap</li></ol><section data-seq-stage></section><div class="sc-audio"><div><button type="button" data-seq-play>Play narration</button><button type="button" data-seq-replay>Replay</button><label>Audio speed<select data-seq-rate><option value=.75>0.75×</option><option value=1>1×</option><option value=1.25>1.25×</option><option value=1.5>1.5×</option><option value=2>2×</option></select></label></div><label class="sc-seek">Narration position<input type=range data-seq-seek min=0 step=.01 value=0><output data-seq-time></output></label><p data-seq-clip></p><p data-seq-cue></p><p data-seq-played></p></div><p data-seq-coverage></p><div class="sc-continue"><button type=button data-seq-continue>Begin lesson</button><button type=button data-seq-source-reviewed>Mark source reviewed</button><button type=button data-seq-practice>Record practice attempted</button><button type=button data-seq-revisit aria-pressed=false>Revisit later</button></div><details data-seq-source-details><summary>Original supplied source: text, diagrams and questions</summary><p>Original wording is preserved below. Adapted narration and scientific clarifications are labeled separately. Source examples are not personal diagnostic or treatment instructions.</p><div class="sc-source-nav"><button type=button data-seq-page-prev>Previous page</button><label>Source page<select data-seq-page></select></label><button type=button data-seq-page-next>Next page</button></div><p data-seq-source-status></p><button type=button data-seq-reveal hidden>Reveal original source page / answer</button><img data-seq-source-image alt="" loading=eager width=960 height=540><details class="sc-slide-text"><summary>Original slide text</summary><pre data-seq-source-text></pre></details><p data-seq-clarifications></p></details><details><summary>Approved adapted transcript</summary><p data-seq-transcript-note></p><div data-seq-transcript></div><button type=button data-seq-transcript-reviewed>Mark this transcript reviewed</button></details></div><p data-seq-status role=status aria-live=polite></p><p data-seq-error role=alert hidden></p><details><summary>Course outline, coverage and preferences</summary><label>Source section<select data-seq-unit-select></select></label><label>Source lesson<select data-seq-lesson-select></select></label><p>Section ordinals follow 11 verified PDF covers. Original01–13 file numbering is unverified. Each learning section groups contiguous original pages without dropping their topics.</p><label><input type=checkbox data-seq-continuous> Continuous listening</label><p>Default: learn at my pace, then Continue at the lesson recap. Continuous listening can advance narrated explanations; it stops visibly at sections without audio. It never reveals practice answers or marks mastery.</p><label><input type=checkbox data-seq-text-only> Text and diagrams only (reduced motion)</label><p>Audio speed changes narration timing, not physiological heart or breathing rate.</p><button type=button data-seq-refresher>Optional previous-source refresher</button><details><summary>Course progress backup</summary><button type=button data-seq-export>Export course progress</button><button type=button data-seq-import>Import course progress</button><textarea data-seq-progress rows=4 aria-label="Sequential course progress JSON"></textarea><p data-seq-import-status role=status></p></details><p data-seq-boundary-note></p></details>';
 const tours=doc.createElement('details');tours.className='sc-simulation-lessons';tours.dataset.seqTours='';
 tours.innerHTML='<summary>Guided simulation lessons and concept tours (optional)</summary><p>Separate from the slideshow course. These lessons can control the model, highlights, labels and flow paths using the existing narration. Selecting a tour pauses and saves your source lesson. Return to saved lesson restores it silently.</p><label>Choose a separate guided lesson<select data-seq-optional><option value="">Choose a guided lesson…</option></select></label>';
 card.querySelector('[data-seq-guided]').append(tours);
 home.insertBefore(card,home.firstChild);
 const dock=doc.createElement('aside');dock.id='guidedCourseDock';dock.hidden=true;dock.setAttribute('aria-label','Persistent course controls');dock.innerHTML='<button type=button data-seq-show><span data-seq-dock-title></span><small data-seq-dock-state></small></button><button type=button class=gc-circle data-seq-dock-play aria-label="Play narration">▶</button>';doc.body.append(dock);
 const start=doc.createElement('button');start.id='startFullCourse';start.className='btn secondary';start.innerHTML='Start Full Course<small>Learn the supplied curriculum in source order, from its foundations to its final section</small>';
 const resumeButton=doc.createElement('button');resumeButton.id='continueFullCourse';resumeButton.className='btn secondary';resumeButton.hidden=true;menu.prepend(resumeButton);menu.prepend(start);
 const q=n=>card.querySelector('[data-seq-'+n+']'),dq=n=>dock.querySelector('[data-seq-'+n+']');
 const followButton=doc.createElement('button');followButton.type='button';followButton.dataset.seqFollow='';followButton.textContent='Follow narration';q('page-next').after(followButton);
 const followNote=doc.createElement('p');followNote.dataset.seqFollowNote='';q('source-status').before(followNote);
 for(const [i,u]of map.units.entries()){const o=doc.createElement('option');o.value=i;o.textContent=(i+1)+'. '+u.title+' · pp'+u.pages.join('–');q('unit-select').append(o);}
 for(const l of host.GuidedStudyLessons.filter(l=>l.audio)){const o=doc.createElement('option');o.value=l.id;o.textContent=(presentation.kind(l,true)==='guided-simulation'?'Simulation · ':'Explanation · ')+l.id+' · '+l.title;q('optional').append(o);}
 function save(force=false){if(!active||storageBlocked)return;if(optionalReturn)data.detour={kind:'optional',returnPosition:copy(optionalReturn)};else if(refresherReturn)data.detour={kind:'refresher',returnPosition:copy(refresherReturn)};else delete data.detour;if(mode==='guided'&&!loading&&attachedClip===clip()?.id){data.position.time=audio.currentTime||0;if(preparedOrgan==='source')data.position.scene=captureScene();}recordPlayback();const now=performance.now();if(!force&&now-lastSave<900)return;try{data.manifestVersion=map.version;localStorage.setItem(P.KEY,JSON.stringify(data));lastSave=now;hasSaved=true;}catch(e){warning='Course progress could not be saved. Export a copy; other study data is unchanged.';}}
 function recordPlayback(){const l=clip();if(!l||attachedClip!==l.id)return;const ranges=[];try{for(let i=0;i<audio.played.length;i++)ranges.push([audio.played.start(i),audio.played.end(i)]);}catch(e){return;}if(ranges.length)P.addPlayback(data,ledgerId(),l.id,ranges,l.audio.duration);}
 function validatePosition(p){
  const i=byLesson.get(p.lessonId);if(!P.validPosition(p)||i==null)throw Error('The saved lesson is not in this manifest. Its record is preserved; no automatic reset or remapping.');
  const l=map.lessons[i];if(p.optionalClip&&!recordings.has(p.optionalClip))throw Error('Unknown optional recording in saved position');
  const c=recordings.get(p.optionalClip||l.audio[p.segment]?.clipId);
  if(p.sourcePage<l.pages[0]||p.sourcePage>l.pages[1]||p.segment>=Math.max(1,l.audio.length)||p.time>(c?.audio.duration||0)+.1)throw Error('Saved course position is outside its lesson.');
  if(p.sourceFollow!==undefined&&typeof p.sourceFollow!=='boolean')throw Error('Invalid saved source-follow state');
  if(p.checkpointNext!==undefined&&(!Number.isInteger(p.checkpointNext)||p.checkpointNext!==p.segment+1||p.checkpointNext>=l.audio.length||p.optionalClip))throw Error('Invalid checkpoint continuation');
 }
 function validLoadedProgress(raw){const next=P.validate(raw);validatePosition(next.position);if(next.sourceSHA256!==map.source.sha256)throw Error('The saved source identity differs. Preserve/export the old record before choosing a new route.');if(next.detour){if(!['optional','refresher'].includes(next.detour.kind))throw Error('Invalid saved detour');validatePosition(next.detour.returnPosition);}if(next.manifestVersion!==map.version)warning='Manifest changed; stable source lesson ID and original progress were retained.';return next;}

 try{const raw=localStorage.getItem(P.KEY);if(raw){data=validLoadedProgress(JSON.parse(raw));index=byLesson.get(data.position.lessonId);hasSaved=true;if(data.detour?.kind==='optional')optionalReturn=copy(data.detour.returnPosition);if(data.detour?.kind==='refresher')refresherReturn=copy(data.detour.returnPosition);}}catch(e){storageBlocked=true;warning=e.message;}
 function inspect(){return {active,mode,presentation:presentation.kind(clip(),!!optionalClip),lessonId:clip()?.id||null,clipId:clip()?.id||null,sourceLessonId:lesson().id,unitId:unit().id,unitIndex:map.units.indexOf(unit()),index,stage:data.position.stage,sourcePage:data.position.sourcePage,sourceFollow:data.position.sourceFollow!==false,time:mode==='guided'&&!loading&&attachedClip===clip()?.id?audio.currentTime:data.position.time,segment:data.position.segment,playing:mode==='guided'&&!audio.paused&&!audio.ended,loading,busy:running||!!pending,preparing,needsGesture,error,warning,optionalClip,completed:data.routeReachedEnd,applied:copy(applied),preferences:copy(data.preferences),progress:copy(P.record(data,lesson().id))};}
 let lastRenderKey='';
 function render(){
  const s=inspect(),l=lesson(),c=clip(),u=unit(),i=map.units.indexOf(u),next=map.lessons[index+1],r=P.record(data,l.id);
  const coverage=c?P.coverage(data,ledgerId(),c.id,c.audio.duration):null;
  setValue(q('seek'),s.time||0);setText(q('time'),clock(s.time)+' / '+clock(duration()));
  const positionText=clock(s.time)+' of '+clock(duration());if(q('seek').getAttribute('aria-valuetext')!==positionText)q('seek').setAttribute('aria-valuetext',positionText);
  const renderKey=JSON.stringify([active,mode,l.id,c?.id,s.stage,s.playing,loading,preparing,needsGesture,error,warning,hasSaved,attachedClip,data.routeReachedEnd,data.preferences,data.position.sourcePage,data.position.sourceFollow,data.position.checkpointNext,applied?.cueId,Math.round((coverage?.portion||0)*100),P.summary(data,l.id),r.transcripts[c?.id],!!optionalReturn,!!refresherReturn]);
  if(renderKey===lastRenderKey)return;lastRenderKey=renderKey;
  card.hidden=!active;dock.hidden=!active||mode!=='guided';doc.body.classList.toggle('guided-course-active',active&&mode==='guided');resumeButton.hidden=!hasSaved;setText(resumeButton,'Continue Course · '+l.label+' · next: '+(next?.label||'final source lesson'));
  setText(q('unit'),'Unit '+(i+1)+' / '+map.units.length+' · '+u.title);setText(q('title'),optionalClip?c.title:l.label);
  setText(q('presentation'),isSlideshow()?'Slideshow lesson · original source pages; simulations open only when you choose a separate activity.':(s.presentation==='guided-simulation'?'Guided simulation lesson':'Guided concept tour')+' · source course paused at '+l.label);
  q('source-details').hidden=!isSlideshow();tours.open=!!optionalClip||tours.open;setValue(q('optional'),optionalClip||'');
 setText(q('position'),'Source lesson '+(index+1)+' / '+map.lessons.length+' · PDF pp'+l.pages.join('–')+' · '+P.summary(data,l.id));setText(q('next'),'What comes next: '+(next?next.label:'final source recap and route summary'));
  q('guided').hidden=mode!=='guided';setText(q('mode'),mode==='guided'?'Explore':'Return to Course');q('return').hidden=!(optionalReturn||refresherReturn);q('previous').disabled=index===0;q('next-lesson').disabled=index===map.lessons.length-1;
  card.querySelectorAll('[data-step]').forEach(e=>e.setAttribute('aria-current',String(e.dataset.step===s.stage)));
  const intro='Study '+l.label+' in its original source position (PDF pp'+l.pages.join('–')+'). Read or hear the explanation, optionally inspect or practice, then recap and Continue at your pace.';
  const stageText=s.stage==='intro'?intro:s.stage==='explanation'?(optionalClip?'Optional adapted recording; original source order is paused.':c?'Hear the approved adapted explanation, inspect its matching material, or read the source/transcript.':'No approved narration is mapped here. Read the original source text and diagrams, then Continue; it will not count as audio playback.'):s.stage==='activity'?'Optional activity: inspect the related view or try the source questions. Answers remain hidden until you choose Reveal. You may continue without a quiz or timer.':'Recap: revisit '+l.recap.headings.slice(0,5).join(' · ')+'. '+l.recap.prompt;
  setText(q('stage'),stageText);setText(q('coverage'),l.coverageNote);
  setText(q('continue'),s.stage==='intro'?'Begin lesson':s.stage==='explanation'?'Continue to activity':s.stage==='activity'?'Continue to recap':index===map.lessons.length-1?'Mark complete & finish route':next?.unitId!==l.unitId?'Mark complete & Continue to next unit':'Mark complete & Continue');if(Number.isInteger(data.position.checkpointNext))setText(q('continue'),'Continue to next explanation (paused)');q('continue').disabled=loading;
  setText(q('practice'),r.practiceAttempted?'Practice attempted (recorded)':'Record practice attempted');setText(q('source-reviewed'),r.sourceReviewed?'Source reviewed (recorded)':'Mark source reviewed');q('revisit').setAttribute('aria-pressed',String(r.revisit));
  card.querySelector('.sc-audio').hidden=!c;setText(q('play'),s.playing?'Pause':needsGesture?'Resume narration':error?'Retry narration':!attachedClip?'Prepare narration':'Play narration');q('play').disabled=!c||mode!=='guided'||loading;q('replay').disabled=!c||mode!=='guided'||loading;q('rate').value=String(data.preferences.rate);
  q('seek').disabled=!c||loading||mode!=='guided';q('seek').max=duration();setValue(q('seek'),s.time||0);
  setText(q('clip'),c?(optionalClip?'Optional · ':('Recording '+(data.position.segment+1)+' / '+l.audio.length+' · '))+c.id+' · '+c.title:'Narration gap · source reading available');setText(q('cue'),c&&applied?.clipId===c.id?c.cues[applied.cueIndex]?.text||'':'');
  setText(q('played'),coverage?'Native media playback recorded: '+Math.round(coverage.portion*100)+'%. This is separate from transcript/source review and learner-marked completion.':'Reading is a valid alternative; no narration is counted as heard.');
  setText(q('transcript'),c?.transcript||'No approved audio transcript or recording exists for this source range. Read the original source text and diagrams below. New narration requires script approval; no listening progress is recorded.');setText(q('transcript-note'),'Approved adapted wording, separate from the original slides and any scientific clarifications.');q('transcript-reviewed').disabled=!c;
  q('continuous').checked=data.preferences.continuous;q('text-only').checked=data.preferences.textOnly;q('refresher').disabled=index===0||loading;
  setText(q('status'),mode==='guided'&&!c&&data.preferences.continuous&&s.stage==='explanation'?'Continuous listening stopped here: no approved recording is available. Read the original source text/diagrams below, then choose Continue. Nothing is marked listened.':mode==='explore'?'Exploring. Source lesson, activity, selected view and narration position are saved. Return to Course restores them silently.':data.routeReachedEnd?'You reached the final source lesson. Audio/source review, skips, practice and marked completion remain separate; narration gaps are still disclosed.':preparing?'Preparing the matching view; narration is held at the cue boundary.':loading?'Loading the recording and its first view…':needsGesture?'Playback was refused. Resume narration uses a fresh gesture and keeps the queued place.':s.playing?'Narration is playing. Inspecting a simulator manually pauses and releases the course.':'Learn at my pace · '+s.stage+' · no mandatory quiz, timer or pass threshold.');
  q('error').hidden=!(error||warning);setText(q('error'),[error,warning].filter(Boolean).join(' '));setText(q('boundary-note'),map.source.boundaryStatus);
  q('unit-select').value=i;
  if(q('lesson-select').dataset.unit!==u.id){q('lesson-select').replaceChildren();for(const id of u.lessonIds){const item=map.lessons[byLesson.get(id)],o=doc.createElement('option');o.value=id;o.textContent=item.label+' · pp'+item.pages.join('–');q('lesson-select').append(o);}q('lesson-select').dataset.unit=u.id;}
  q('lesson-select').value=l.id;
  if(q('page').dataset.lesson!==l.id){q('page').replaceChildren();for(let n=l.pages[0];n<=l.pages[1];n++){const o=doc.createElement('option');o.value=n;o.textContent='PDF page '+n;q('page').append(o);}q('page').dataset.lesson=l.id;}
  q('page').value=data.position.sourcePage;q('page-prev').disabled=data.position.sourcePage===l.pages[0];q('page-next').disabled=data.position.sourcePage===l.pages[1];
  followButton.hidden=!c||!isSlideshow()||s.sourceFollow;followButton.disabled=loading||mode!=='guided';followNote.hidden=!c||!isSlideshow();setText(followNote,s.sourceFollow?(c?effectiveCue(c,cueIndexAt(s.time)).presentationNote+' ':'')+'Browsing holds your chosen slide until Follow narration. Questions still require Reveal.':'Your selected page is held while narration continues. Follow narration returns to the current recorded explanation.');
  setText(dq('dock-title'),l.label);setText(dq('dock-state'),'Unit '+(i+1)+' · '+(s.playing?'Playing':s.stage));setText(dq('dock-play'),c?(s.playing?'Ⅱ':'▶'):'→');dq('dock-play').disabled=c?q('play').disabled:loading;dq('dock-play').setAttribute('aria-label',c?(s.playing?'Pause':'Play')+' narration · '+c.title:q('continue').textContent+' · '+l.label);dq('dock-play').setAttribute('aria-pressed',String(s.playing));
 }
 async function readSourcePages(){
  if(sourcePages)return sourcePages;
  if(!sourceFetch)sourceFetch=(async()=>{const response=await fetch('private-course/pages.json',{credentials:'same-origin'});if(!response.ok)throw Error('HTTP '+response.status);const parsed=await response.json();if(parsed.sourceSHA256!==map.source.sha256||!Array.isArray(parsed.pages))throw Error('Source identity mismatch');sourcePages=parsed.pages;sourceError='';return sourcePages;})();
  try{return await sourceFetch;}catch(e){sourceFetch=null;sourceError='The course source pages could not load. Reload or retry this lesson; narration stays paused until its matching source is available. '+e.message;throw e;}
 }
 async function showSource(){
  const rev=++sourceRevision,lessonId=lesson().id,pageNumber=data.position.sourcePage;
  const ctx={signal:new AbortController().signal,isCurrent:()=>rev===sourceRevision&&lesson().id===lessonId&&data.position.sourcePage===pageNumber};
  try{await readSourcePages();if(!ctx.isCurrent())return;
   const page=sourcePages[pageNumber-1];if(!page)throw Error('Original source page is unavailable');
   const hideAnswer=page.practice&&!sourceRevealed;
   if(!hideAnswer)await sourceImageReady(page,ctx);
   if(!ctx.isCurrent())return;
   const img=q('source-image');
   setText(q('source-status'),'Original PDF page '+page.page+' · '+page.title);
   setText(q('source-text'),hideAnswer?'Source practice is available on this page. Attempt it before choosing Reveal original source page / answer. Playback and Continue do not reveal answers.':page.text||'This original page is a diagram/image. Its source image is retained; no invented transcription is substituted.');
   q('reveal').hidden=!hideAnswer;
   if(hideAnswer){if(!img.hidden)img.hidden=true;}
   else{if(img.getAttribute('src')!==page.imageRoute)img.src=page.imageRoute;const alt='Original supplied PDF page '+page.page+' · '+page.title;if(img.alt!==alt)img.alt=alt;if(img.hidden)img.hidden=false;}
   setText(q('clarifications'),lesson().clarifications.length?'Separate clarification notes: '+lesson().clarifications.join(' '):'Original supplied wording is retained. Approved adapted narration remains separately labeled.');return true;
  }catch(e){if(!ctx.isCurrent())return;const page=sourcePages?.[pageNumber-1],hiddenAnswer=page?.practice&&!sourceRevealed;q('source-image').hidden=true;q('reveal').hidden=!hiddenAnswer;setText(q('source-status'),'Matching source image unavailable. '+e.message);setText(q('source-text'),hiddenAnswer?'Attempt this source question before choosing Reveal.':page?.text||sourceError||e.message);return false;}
 }
 // Source page cues follow measured recorded speech on the shared media clock.
 // Warm diagrams before playback. Manual browsing suspends page following,
 // without pausing narration or revealing answers; Follow narration rejoins.
 let sourceSceneKey=null;
 const sourceImages=new Map();
 const followsSource=()=>data.position.sourceFollow!==false;
 function sourceWait(promise,ctx){return new Promise((resolve,reject)=>{let done=false;const abort=()=>finish(null,false);function finish(error,value){if(done)return;done=true;ctx.signal.removeEventListener('abort',abort);error?reject(error):resolve(value&&ctx.isCurrent());}ctx.signal.addEventListener('abort',abort,{once:true});promise.then(value=>finish(null,value),error=>finish(error));if(ctx.signal.aborted)abort();});}
 function sourceImageReady(page,ctx){
  const cached=sourceImages.get(page.imageRoute);if(cached?.ready)return Promise.resolve(true);
  if(cached)return sourceWait(cached.promise,ctx);
  const entry={ready:false};sourceImages.set(page.imageRoute,entry);
  entry.promise=new Promise((resolve,reject)=>{const img=new Image();let done=false;const timer=setTimeout(()=>finish(Error('Source image preparation timed out')),30000);
   async function finish(e){if(done)return;done=true;clearTimeout(timer);img.onload=img.onerror=null;if(e){sourceImages.delete(page.imageRoute);reject(e);return;}try{if(img.decode)await img.decode();entry.ready=true;resolve(true);}catch(err){sourceImages.delete(page.imageRoute);reject(Error('Original source diagram failed to decode'));}}
   img.onload=()=>finish();img.onerror=()=>finish(Error('Original source diagram failed to load'));img.src=page.imageRoute;if(img.complete&&img.naturalWidth)finish();
  });return sourceWait(entry.promise,ctx);
 }
 function sourceWarm(scene){const page=sourcePages?.[scene.page-1];return !followsSource()||!!page&&(page.practice||sourceImages.get(page.imageRoute)?.ready);}
 async function sourceReady(ctx){
  const requestedPage=data.position.sourcePage,shown=await sourceWait(showSource(),ctx);if(!ctx.isCurrent())return false;
  if(requestedPage!==data.position.sourcePage)return sourceReady(ctx);
  if(shown===false)throw Error(sourceError||'The matching source image could not be displayed');
  if(sourceError)throw Error(sourceError);
  const page=sourcePages?.[data.position.sourcePage-1];if(!page)throw Error('Original source page is unavailable');
  if(!page.practice||sourceRevealed)await sourceImageReady(page,ctx);return ctx.isCurrent();
 }
 adapters.source={
  async prepare(scene,ctx){if(!ctx.isCurrent())return false;hideUnrelatedView();q('source-details').open=true;sourceSceneKey=null;await sourceReady(ctx);if(!ctx.isCurrent())return false;
   const pages=[...new Set(effectiveCues(clip()).filter(c=>c.scene.organ==='source').map(c=>c.scene.page))];await Promise.all(pages.map(n=>{const page=sourcePages?.[n-1];if(!page)throw Error('Original source cue page is unavailable');return page.practice?true:sourceImageReady(page,ctx);}));return ctx.isCurrent();},
  async apply(scene,time,ctx){if(!ctx.isCurrent())return false;if(!Number.isInteger(scene.page)||scene.page<lesson().pages[0]||scene.page>lesson().pages[1])throw Error('Source cue page is outside this lesson');
   const key=clip().id+'|'+scene.page;if(sourceSceneKey===key||!followsSource())return true;
   data.position.sourcePage=scene.page;sourceRevealed=false;q('source-details').open=true;const ok=await sourceReady(ctx);if(ok)sourceSceneKey=key;return ok;},
  capture:()=>({version:1,page:data.position.sourcePage,revealed:sourceRevealed,follow:followsSource()}),
  async restore(saved,ctx){if(saved?.version!==1||!Number.isInteger(saved.page)||saved.page<lesson().pages[0]||saved.page>lesson().pages[1])throw Error('Saved source view is unavailable');if(!ctx.isCurrent())return false;
   data.position.sourcePage=saved.page;data.position.sourceFollow=saved.follow!==false;sourceRevealed=saved.revealed===true;q('source-details').open=true;const ok=await sourceReady(ctx);if(ok)sourceSceneKey=clip().id+'|'+data.position.sourcePage;return ok;},
  pause(){}
 };
 function pauseAdapters(){for(const a of Object.values(adapters))try{a.pause();}catch(e){}}
 function invalidate(){epoch++;sceneController?.abort();sceneController=null;if(pending){pending.resolve(false);pending=null;}preparedOrgan=null;}
 function captureScene(){if(!preparedOrgan||!applied||applied.clipId!==clip()?.id)return null;try{return {organ:preparedOrgan,snapshot:copy(adapters[preparedOrgan].capture())};}catch(e){return null;}}
 function point(){recordPlayback();return {...copy(data.position),time:attachedClip===clip()?.id?audio.currentTime||0:data.position.time,scene:captureScene()||data.position.scene,optionalClip};}
 function stopAudio(){playingIntent=false;audio.pause();recordPlayback();if(frame)cancelAnimationFrame(frame);frame=0;}
 function clearClip(){sourceRevision++;stopAudio();loadController?.abort();revision++;invalidate();attachedClip=null;audio.removeAttribute('src');audio.load();if(blobUrl){URL.revokeObjectURL(blobUrl);blobUrl=null;}loading=false;preparing=false;applied=null;lastTick=-1;}
 function claim(){if(!C.inspect().courseOwned)C.takeForCourse();}
 function hideUnrelatedView(){host.goHome();menu.classList.add('hidden');}
 function cueIndexAt(t){const c=clip();if(!c)return -1;let i=0;c.cues.forEach((x,n)=>{if(x.at<=t)i=n;});return i;}
 const viewKey=s=>JSON.stringify([s.organ,s.mode,s.preset,s.route,s.stage,s.monitoringView,s.page]);
 function requestScene(t,restore=null){
  const c=clip();if(!c||!active||mode!=='guided')return Promise.resolve(false);const ci=cueIndexAt(t),cue=effectiveCue(c,ci),ownEpoch=epoch,rev=revision;
  if(data.preferences.textOnly&&cue.scene.organ!=='source'){applied={clipId:c.id,cueIndex:ci,cueId:cue.id,organ:'text',time:t,viewKey:'text'};data.position.cueId=cue.id;return Promise.resolve(true);}
  return new Promise(resolve=>{if(pending)pending.resolve(false);pending={c,ci,cue,t,restore,epoch:ownEpoch,rev,resolve};drain();});
 }
 async function drain(){if(running)return;running=true;
  try{while(pending){const job=pending;pending=null;const own=new AbortController();sceneController=own;const ctx={signal:own.signal,lessonId:job.c.id,isCurrent:()=>active&&mode==='guided'&&job.epoch===epoch&&job.rev===revision&&!own.signal.aborted};
   try{if(!ctx.isCurrent()){job.resolve(false);continue;}const s=job.cue.scene,a=adapters[s.organ],focus=doc.activeElement,retain=card.contains(focus)||dock.contains(focus);if(!a)throw Error('Unsupported scene organ');
    if(preparedOrgan!==s.organ){pauseAdapters();if(await a.prepare(copy(s),ctx)===false&&ctx.isCurrent())throw Error('View preparation did not complete');if(!ctx.isCurrent()){job.resolve(false);continue;}preparedOrgan=s.organ;}
    if(job.restore?.organ===s.organ&&await a.restore(copy(job.restore.snapshot),ctx)===false&&ctx.isCurrent())throw Error('Saved view did not restore');
    const ok=await a.apply(copy(s),job.t,ctx);if(!ctx.isCurrent()){job.resolve(false);continue;}if(ok===false)throw Error('Scene did not accept '+job.cue.id);
    applied={clipId:job.c.id,cueIndex:job.ci,cueId:job.cue.id,organ:s.organ,time:job.t,viewKey:viewKey(s)};data.position.cueId=job.cue.id;if(retain&&focus.isConnected&&doc.activeElement!==focus)focus.focus({preventScroll:true});job.resolve(true);
   }catch(e){job.resolve(false);if(ctx.isCurrent())fail('Matching view unavailable. '+e.message);}
  }}finally{running=false;sceneController=null;render();}
 }
 function fail(message){stopAudio();error=message;loading=false;preparing=false;pauseAdapters();save(true);render();}
 function metadata(signal){if(audio.readyState>=1)return Promise.resolve();return new Promise((resolve,reject)=>{const timer=setTimeout(()=>done(Error('Audio metadata timed out')),30000);const ready=()=>done(),bad=()=>done(Error('Audio could not load')),abort=()=>done(Error('Cancelled'));function done(e){clearTimeout(timer);audio.removeEventListener('loadedmetadata',ready);audio.removeEventListener('error',bad);signal.removeEventListener('abort',abort);e?reject(e):resolve();}audio.addEventListener('loadedmetadata',ready,{once:true});audio.addEventListener('error',bad,{once:true});signal.addEventListener('abort',abort,{once:true});if(signal.aborted)abort();});}
 async function loadRecording({at=data.position.time||0,autoplay=false,restore=null}={}){
  clearClip();claim();mode='guided';active=true;error='';needsGesture=false;endedToken=null;const c=clip();
  if(!c){data.position.time=0;hideUnrelatedView();render();save(true);return true;}
  if(data.preferences.textOnly){pauseAdapters();hideUnrelatedView();}loading=true;const rev=revision,controller=new AbortController();loadController=controller;render();
  try{const url=new URL(c.audio.src,doc.baseURI);if(url.origin!==location.origin)throw Error('Recording must be from this site');const response=await fetch(url,{signal:controller.signal,credentials:'same-origin',mode:'same-origin'});if(!response.ok||response.status===206)throw Error('Audio HTTP '+response.status);const blob=await response.blob();if(rev!==revision||mode!=='guided')return false;if(!blob.size)throw Error('Audio asset is empty');blobUrl=URL.createObjectURL(blob);audio.src=blobUrl;audio.playbackRate=data.preferences.rate;audio.load();await metadata(controller.signal);if(rev!==revision||mode!=='guided')return false;audio.playbackRate=data.preferences.rate;attachedClip=c.id;audio.currentTime=Math.max(0,Math.min(c.audio.duration,at));data.position.time=audio.currentTime;
   const sourceBookmark=(isSlideshow()&&restore?.organ!=='source'?null:restore)||(isSlideshow()?{organ:'source',snapshot:{version:1,page:data.position.sourcePage,revealed:false,follow:data.position.sourceFollow!==false}}:null);const ok=await requestScene(audio.currentTime,sourceBookmark);if(rev!==revision||mode!=='guided')return false;loading=false;if(!ok){render();return false;}data.position.scene=captureScene();save(true);render();if(autoplay)await play();return true;
  }catch(e){if(rev!==revision||controller.signal.aborted)return false;fail('Narration unavailable; source reading and Next remain usable. '+e.message);return false;}
 }
 async function openLesson(i,{position=null,autoplay=false}={}){
  if(i<0||i>=map.lessons.length)return false;clearClip();error='';needsGesture=false;index=i;optionalClip=position?.optionalClip||null;returnPoint=null;mode='guided';active=true;claim();P.begin(data,lesson().id);data.routeReachedEnd=false;data.position=position?copy(position):{lessonId:lesson().id,stage:'intro',sourcePage:lesson().pages[0],segment:0,time:0,cueId:null,scene:null};sourceRevealed=false;q('source-image').hidden=true;hideUnrelatedView();q('source-details').open=data.position.stage==='intro'||data.preferences.textOnly;render();showSource();save(true);
  if(clip()&&(data.position.stage==='explanation'||data.position.scene))return loadRecording({at:data.position.time,autoplay,restore:data.position.scene});return true;
 }
 async function beginExplanation(){data.position.stage='explanation';q('source-details').open=isSlideshow()||data.preferences.textOnly||!clip();render();save(true);if(clip())return loadRecording();return true;}
 async function advanceStage(){
  if(mode!=='guided'||loading)return false;
  if(Number.isInteger(data.position.checkpointNext)){data.position.segment=data.position.checkpointNext;delete data.position.checkpointNext;data.position.time=0;data.position.stage='explanation';render();return loadRecording({at:0,autoplay:false});}
  if(data.position.stage==='intro')return beginExplanation();
  if(data.position.stage==='explanation'){await pause();data.position.stage='activity';render();save(true);return true;}
  if(data.position.stage==='activity'){data.position.stage='recap';render();save(true);return true;}
  P.record(data,lesson().id).markedComplete=true;save(true);
  if(index===map.lessons.length-1){stopAudio();data.routeReachedEnd=true;render();save(true);return true;}
  return openLesson(index+1);
 }
 async function manualNext(offset){if(!active)return false;if(!P.record(data,lesson().id).markedComplete&&offset>0)P.record(data,lesson().id).skipped=true;save(true);return openLesson(index+offset);}
 function play(){
  if(mode!=='guided'||loading||!clip())return Promise.resolve(false);if(!attachedClip)return loadRecording();error='';needsGesture=false;playingIntent=true;const rev=revision;let p;try{p=audio.play();}catch(e){p=Promise.reject(e);}
  return Promise.resolve(p).then(()=>{if(rev!==revision||mode!=='guided'||!playingIntent){audio.pause();return false;}wake();render();return true;},e=>{if(rev===revision){playingIntent=false;needsGesture=true;error='Playback was refused. Resume narration keeps the same queued position. '+e.message;save(true);render();}return false;});
 }
 async function pause(){if(mode!=='guided')return false;const sourceView=preparedOrgan==='source'?captureScene():null;stopAudio();data.position.time=attachedClip===clip()?.id?audio.currentTime||0:data.position.time;invalidate();if(attachedClip){await requestScene(data.position.time,sourceView);data.position.scene=captureScene();}save(true);render();return true;}
 async function seek(seconds){if(mode!=='guided'||loading||!clip()||!Number.isFinite(seconds))return false;stopAudio();invalidate();audio.currentTime=Math.max(0,Math.min(duration(),seconds));data.position.time=audio.currentTime;endedToken=null;const ok=await requestScene(audio.currentTime);data.position.scene=captureScene();save(true);render();return ok;}
 async function tick(){
  if(!active||mode!=='guided'||loading||audio.paused||preparing||!clip())return;const t=audio.currentTime,c=clip(),ci=cueIndexAt(t),cue=effectiveCue(c,ci);if(Math.abs(t-lastTick)<.08)return;lastTick=t;
  const cold=applied&&applied.cueId!==cue.id&&applied.viewKey!==viewKey(cue.scene)&&(!data.preferences.textOnly||cue.scene.organ==='source')&&!(cue.scene.organ==='source'&&sourceWarm(cue.scene));
  if(cold){const rev=revision,intent=playingIntent;recordPlayback();audio.pause();audio.currentTime=cue.at;preparing=true;data.position.time=cue.at;render();const ok=await requestScene(cue.at);preparing=false;if(ok&&rev===revision&&mode==='guided'&&intent&&playingIntent)await play();render();}
  else await requestScene(t);
  recordPlayback();save();render();
 }
 function loop(){frame=0;if(!active||mode!=='guided'||audio.paused||doc.hidden)return;tick().finally(wake);}
 function wake(){if(!frame&&active&&mode==='guided'&&!audio.paused&&!doc.hidden)frame=requestAnimationFrame(loop);}
 async function ended(){
  if(!active||mode!=='guided'||loading||!playingIntent||!clip()||!audio.ended)return;const token=revision+'|'+attachedClip;if(endedToken===token)return;endedToken=token;recordPlayback();playingIntent=false;data.position.time=duration();const rev=revision;const ready=await requestScene(duration());if(!ready||rev!==revision||mode!=='guided')return;data.position.scene=captureScene();save(true);
  if(optionalClip){data.position.stage='explanation';render();return;}
  if(data.position.segment+1<lesson().audio.length){if(!data.preferences.continuous&&lesson().audio[data.position.segment].checkpointAfter){data.position.checkpointNext=data.position.segment+1;data.position.stage='activity';render();save(true);return;}data.position.segment++;data.position.time=0;await loadRecording({at:0,autoplay:true});return;}
  data.position.stage='activity';render();save(true);
  if(data.preferences.continuous&&index<map.lessons.length-1){const i=index+1;await openLesson(i);data.position.stage='explanation';render();if(clip())await loadRecording({at:0,autoplay:true});else{q('source-details').open=true;render();save(true);}}
 }
 function enterExplore(){
  if(!active||mode==='explore')return Promise.resolve(true);returnPoint=point();stopAudio();data.position=copy(returnPoint);save(true);mode='explore';sourceRevision++;revision++;loadController?.abort();invalidate();pauseAdapters();loading=false;preparing=false;adapters.respiratory.releaseGuidedResources?.();C.releaseFromCourse();if(blobUrl){URL.revokeObjectURL(blobUrl);blobUrl=null;}attachedClip=null;render();return Promise.resolve(true);
 }
 async function resume(){const p=returnPoint||data.position;optionalClip=p.optionalClip||null;data.position=copy(p);index=byLesson.get(p.lessonId);active=true;mode='guided';claim();render();showSource();if(clip()&&(data.position.stage==='explanation'||p.scene))return loadRecording({at:p.time,restore:p.scene});hideUnrelatedView();return true;}
 async function returnDetour(){const p=optionalReturn||refresherReturn;if(!p)return false;optionalReturn=refresherReturn=null;optionalClip=null;index=byLesson.get(p.lessonId);return openLesson(index,{position:p});}
 async function activity(){if(!active)return;data.position.stage='activity';await enterExplore();const dest=lesson().practice.destination;
  if(dest==='heart')await host.HeartV3Study.open();else if(dest==='respiratory')host.CardiorespiratoryStudy.open('respiratory');else if(dest==='lead')await LeadPlacementLab.open();else if(dest==='ecg')EcgStudy.open();else if(dest==='rhythm'&&typeof host.showEcg==='function')host.showEcg();render();
 }
 async function openOptional(id){if(!recordings.has(id))return false;optionalReturn=copy(optionalReturn||refresherReturn||point());refresherReturn=null;optionalClip=id;data.position.stage='explanation';data.position.segment=0;data.position.time=0;data.position.optionalClip=id;delete data.position.checkpointNext;mode='guided';active=true;claim();render();return loadRecording({at:0});}
 async function loadSaved(){if(!hasSaved)return openLesson(0);index=byLesson.get(data.position.lessonId);active=true;mode='guided';optionalClip=data.position.optionalClip||null;claim();render();showSource();if(clip()&&(data.position.stage==='explanation'||data.position.scene))return loadRecording({at:data.position.time,restore:data.position.scene});hideUnrelatedView();return true;}
 function close(){enterExplore();sourceRevision++;active=false;render();}
 function startCourse(){optionalReturn=refresherReturn=null;delete data.detour;return openLesson(0);}
 listen(start,'click',startCourse);listen(resumeButton,'click',loadSaved);listen(q('close'),'click',close);listen(q('mode'),'click',()=>mode==='guided'?enterExplore():resume());listen(q('return'),'click',returnDetour);
 listen(q('previous'),'click',()=>manualNext(-1));listen(q('next-lesson'),'click',()=>manualNext(1));listen(q('continue'),'click',advanceStage);
 listen(q('play'),'click',()=>inspect().playing?pause():error&&!needsGesture?loadRecording({at:data.position.time}):play());listen(dq('dock-play'),'click',()=>!clip()?advanceStage():inspect().playing?pause():error&&!needsGesture?loadRecording({at:data.position.time}):play());listen(q('replay'),'click',()=>seek(0));listen(q('seek'),'input',()=>seek(Number(q('seek').value)));
 listen(q('rate'),'change',()=>{data.preferences.rate=Number(q('rate').value);audio.playbackRate=data.preferences.rate;save(true);render();});listen(q('continuous'),'change',()=>{data.preferences.continuous=q('continuous').checked;save(true);render();});
 listen(q('text-only'),'change',async()=>{const enabled=q('text-only').checked;await pause();data.preferences.textOnly=enabled;if(data.preferences.textOnly)hideUnrelatedView();q('source-details').open=data.preferences.textOnly;save(true);render();});
 listen(q('source-reviewed'),'click',()=>{P.record(data,lesson().id).sourceReviewed=true;save(true);render();});listen(q('transcript-reviewed'),'click',()=>{if(clip())P.record(data,ledgerId()).transcripts[clip().id]=true;save(true);render();});listen(q('practice'),'click',()=>{P.record(data,lesson().id).practiceAttempted=true;save(true);render();});listen(q('revisit'),'click',()=>{const r=P.record(data,lesson().id);r.revisit=!r.revisit;save(true);render();});
 listen(q('unit-select'),'change',()=>openLesson(byLesson.get(map.units[Number(q('unit-select').value)].lessonIds[0])));listen(q('lesson-select'),'change',()=>openLesson(byLesson.get(q('lesson-select').value)));
 function changePage(n){data.position.sourcePage=Math.max(lesson().pages[0],Math.min(lesson().pages[1],n));if(clip()&&isSlideshow())data.position.sourceFollow=false;sourceRevealed=false;showSource();save(true);render();}
 listen(q('page'),'change',()=>changePage(Number(q('page').value)));listen(q('page-prev'),'click',()=>changePage(data.position.sourcePage-1));listen(q('page-next'),'click',()=>changePage(data.position.sourcePage+1));listen(q('reveal'),'click',()=>{sourceRevealed=true;showSource();save(true);});
 listen(followButton,'click',async()=>{data.position.sourceFollow=true;sourceSceneKey=null;if(attachedClip)await requestScene(audio.currentTime);save(true);render();});
 listen(q('refresher'),'click',()=>{refresherReturn=copy(optionalReturn||refresherReturn||point());optionalReturn=null;openLesson(Math.max(0,index-1));});listen(q('optional'),'change',()=>{if(q('optional').value)openOptional(q('optional').value);});
 listen(q('export'),'click',()=>{save(true);q('progress').value=JSON.stringify(data,null,2);q('import-status').textContent='Export includes only this sequential course namespace.';});listen(q('import'),'click',()=>{try{const next=validLoadedProgress(JSON.parse(q('progress').value));if(active)enterExplore();data=next;index=byLesson.get(data.position.lessonId);optionalClip=data.position.optionalClip||null;optionalReturn=data.detour?.kind==='optional'?copy(data.detour.returnPosition):null;refresherReturn=data.detour?.kind==='refresher'?copy(data.detour.returnPosition):null;returnPoint=null;storageBlocked=false;hasSaved=true;localStorage.setItem(P.KEY,JSON.stringify(data));q('import-status').textContent=active?'Course progress imported. Return to Course restores it silently.':'Course progress imported. Continue Course restores it silently.';render();}catch(e){q('import-status').textContent='Import rejected; saved progress unchanged. '+e.message;}});
 listen(dq('show'),'click',()=>{card.scrollIntoView({block:'start',behavior:'auto'});q('play').focus({preventScroll:true});});
 listen(audio,'timeupdate',()=>{if(active&&mode==='guided'&&!loading&&attachedClip===clip()?.id){data.position.time=audio.currentTime;recordPlayback();if(!audio.paused)tick();save();render();wake();}});listen(audio,'ended',ended);
 listen(audio,'error',()=>{if(active&&mode==='guided'&&!loading&&attachedClip&&audio.error)fail('Narration failed. Reading/Next remain available; this recording is not marked as listened to.');});
 function manual(e){if(!e.isTrusted||!active||mode!=='guided'||card.contains(e.target)||dock.contains(e.target))return;if(e.type==='keydown'&&['Tab','Escape','Shift','Control','Alt','Meta'].includes(e.key))return;const target=e.target.closest?.('button,select,input,textarea,a[href],canvas,[role=button],[role=application]');if((target&&target.closest('#home,header,#quiz,#results'))||(e.type==='keydown'&&e.target.closest?.('#heartV3Study,#cardiorespiratoryStudy,#leadPlacementHome')))enterExplore();}
 for(const t of ['pointerdown','keydown','change'])listen(doc,t,manual,true);listen(doc,'visibilitychange',()=>{if(doc.hidden&&active&&mode==='guided')pause();});listen(host,'pagehide',()=>{if(active&&mode==='guided'){stopAudio();data.position=point();save(true);}});
 render();
 function selectLesson(id){const bound=recordings.get(id)?.sourceLessonId;return byLesson.has(id)?openLesson(byLesson.get(id)):bound&&byLesson.has(bound)?openLesson(byLesson.get(bound)):openOptional(id);}
 host.GuidedCourse={open:loadSaved,start:startCourse,play,pause,seek,select:selectLesson,begin:beginExplanation,continue:advanceStage,next:()=>manualNext(1),previous:()=>manualNext(-1),enterExplore,resume,returnDetour,openActivity:activity,close,inspect,sequence:()=>copy(map.lessons),key:P.KEY,audio,presentationCues:()=>clip()?copy(effectiveCues(clip())):[],progress:()=>copy(data),sourceMap:()=>map};
 // Explicit activity entry is separate from the honest "attempted" self-report.
 const activityButton=doc.createElement('button');activityButton.type='button';activityButton.dataset.seqOpenActivity='';activityButton.textContent='Inspect / open practice (optional)';activityButton.addEventListener('click',activity);q('practice').before(activityButton);
})(window);
