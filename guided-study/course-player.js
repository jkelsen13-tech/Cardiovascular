/* Explicit source-ordered course. The shared original audio element owns time.
   Explore remains independent. Scene preparation never pauses narration. */
(function(host){
 'use strict';
 const doc=host.document,map=host.GuidedCourseMap,contextual=host.ContextualAudio,home=doc.getElementById('home'),menu=doc.getElementById('homeMenu');
 if(!map||!contextual||!home||!menu)return;
 const byId=new Map(host.GuidedStudyLessons.filter(l=>l.audio).map(l=>[l.id,l]));
 const sequence=map.units.flatMap((u,i)=>u.lessons.map(id=>({id,unit:i}))),KEY='cmt.guided-course.source-order.v1';
 const adapters={heart:host.HeartV3Study.guided,respiratory:host.CardiorespiratoryStudy.guided,lead:LeadPlacementLab.guided,explanation:host.GuidedCourseExplanation};
 const audio=contextual.audio,copy=v=>v==null?null:JSON.parse(JSON.stringify(v));
 let mode='explore',active=false,index=0,time=0,completed=false,loading=false,playing=false,error='',storageError='',storageBlocked=false,needsGesture=false;
 let revision=0,sceneEpoch=0,loadController=null,jobController=null,clipUrl=null,preparedOrgan=null,applied=null,pending=null,running=false,frame=0,lastTick=-1,lastSaved=-1,saved=null,sceneSnapshot=null;
 const listeners=[];
 const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
 const lesson=()=>byId.get(sequence[index].id),unit=()=>map.units[sequence[index].unit];
 const cueAt=t=>{let n=0;lesson().cues.forEach((c,i)=>{if(c.at<=t)n=i;});return n;};
 const clock=t=>Math.floor(Math.max(0,t||0)/60)+':'+String(Math.floor(Math.max(0,t||0)%60)).padStart(2,'0');
 const card=doc.createElement('section');card.id='guidedCourse';card.hidden=true;card.setAttribute('aria-label','Guided Course controls');
 card.innerHTML='<header><strong data-course-unit></strong><button type="button" data-course-close aria-label="Close Guided Course">✕</button></header><p data-course-lesson></p><div class="gc-controls"><button type="button" data-course-play>Play</button><button type="button" data-course-previous>Previous</button><button type="button" data-course-next>Next</button><button type="button" data-course-mode>Explore</button></div><label class="gc-seek">Narration<input type="range" data-course-seek min="0" step="0.01" value="0"><output data-course-time></output></label><p class="gc-status" data-course-status role="status" aria-live="polite"></p><p class="gc-error" data-course-error role="alert" hidden></p><details><summary>Course outline, coverage and transcript</summary><label>Course part<select data-course-part aria-label="Guided course part"></select></label><label>Recording<select data-course-recording aria-label="Guided course recording"></select></label><p>11 parts follow the verified PDF sections. Recordings are grouped by topic within each part; they are not a reading of every slide. Audio module numbers are retained as recording IDs.</p><p data-course-coverage></p><p data-course-source></p><details><summary>Original transcript</summary><div data-course-transcript></div></details></details>';
 home.insertBefore(card,home.firstChild);
 const dock=doc.createElement('aside');dock.id='guidedCourseDock';dock.hidden=true;dock.setAttribute('aria-label','Floating Guided Course controls');
 dock.innerHTML='<button type="button" data-course-show><span data-course-dock-title></span><small data-course-dock-state></small></button><button type="button" class="gc-circle" data-course-dock-play aria-label="Play Guided Course">▶</button>';
 doc.body.append(dock);
 const launch=doc.createElement('button');launch.id='guidedCourseLaunch';launch.className='btn secondary';launch.innerHTML='Start Guided Course<small>Follow all 11 verified slideshow sections with existing audio and matching views</small>';menu.prepend(launch);
 const q=n=>card.querySelector('[data-course-'+n+']'),dq=n=>dock.querySelector('[data-course-'+n+']');
 for(const [i,u]of map.units.entries()){const o=doc.createElement('option');o.value=i;o.textContent=(i+1)+'. '+u.title+' · PDF '+u.pages.join('–');q('part').append(o);}
 function inspect(){return {active,mode,lessonId:lesson().id,index,unitIndex:sequence[index].unit,unitId:unit().id,time:mode==='guided'&&!loading?(audio.currentTime||0):time,cueIndex:applied?.index??-1,cueId:applied?.cueId||null,playing:mode==='guided'&&!audio.paused&&!audio.ended,loading,busy:running||!!pending,completed,error,storageError,needsGesture,preparedOrgan,applied:copy(applied)};}
 function readSaved(){
  try{const raw=localStorage.getItem(KEY);if(!raw)return;const p=JSON.parse(raw),i=sequence.findIndex(x=>x.id===p.lessonId),l=byId.get(p.lessonId);
   if(p.version!==1||p.mapVersion!==map.version||i<0||!Number.isFinite(p.time)||p.time<0||p.time>l.audio.duration+.1||typeof p.completed!=='boolean'||(p.scene&&(!adapters[p.scene.organ]||!p.scene.snapshot)))throw Error('Unknown course version or position');
   saved=p;index=i;time=p.time;completed=p.completed;sceneSnapshot=p.scene||null;
  }catch(e){storageBlocked=true;storageError='Saved course place could not be read and has been preserved. You can study without replacing it.';}
 }
 function save(force=false){
  if(!active||storageBlocked)return;if(mode==='guided'&&!loading)time=Math.min(lesson().audio.duration,Math.max(0,audio.currentTime||0));
  if(!force&&Math.abs(time-lastSaved)<1)return;
  saved={version:1,mapVersion:map.version,lessonId:lesson().id,time,completed,scene:sceneSnapshot};
  try{localStorage.setItem(KEY,JSON.stringify(saved));lastSaved=time;}catch(e){storageError='Course place could not be saved on this device.';}
 }
 function render(){
  const s=inspect(),l=lesson(),u=unit();card.hidden=!active;dock.hidden=!active||mode!=='guided';doc.body.classList.toggle('guided-course-active',active&&mode==='guided');
  launch.firstChild.textContent=saved?(completed?'Review Guided Course':'Resume Guided Course'):'Start Guided Course';
  q('unit').textContent='Part '+(s.unitIndex+1)+' / '+map.units.length+' · '+u.title;
  q('lesson').textContent=(index+1)+' / '+sequence.length+' · '+l.id+' · '+l.title;
  q('play').textContent=s.playing?'Pause':'Play';q('play').disabled=mode!=='guided'||loading;dq('dock-play').textContent=s.playing?'Ⅱ':'▶';
  dq('dock-play').disabled=q('play').disabled;dq('dock-play').setAttribute('aria-label',(s.playing?'Pause':'Play')+' Guided Course · '+l.title);dq('dock-play').setAttribute('aria-pressed',String(s.playing));
  dq('dock-title').textContent=l.title;dq('dock-state').textContent='Part '+(s.unitIndex+1)+' · '+(s.playing?'Playing':loading?'Loading':'Paused');
  q('previous').disabled=loading||mode!=='guided'||index===0;q('next').disabled=loading||mode!=='guided'||index===sequence.length-1;
  q('mode').textContent=mode==='guided'?'Explore':'Resume Guided Course';q('mode').disabled=loading;
  q('seek').max=l.audio.duration;q('seek').value=s.time;q('seek').disabled=loading||mode!=='guided';q('seek').setAttribute('aria-valuetext',clock(s.time)+' of '+clock(l.audio.duration));q('time').textContent=clock(s.time)+' / '+clock(l.audio.duration);
  const status=error?'Playback is paused.':loading?'Loading recording and view…':mode==='explore'?'Exploring · your course place is saved. Resume returns here paused.':completed?'Audio route finished. Review the listed slide coverage gaps; not every slide is narrated.':needsGesture?'Tap Play to continue this recording.':s.playing?'Guided · views follow narration. Touch a simulator control to pause and Explore.':'Guided · paused. Press Play to begin or continue.';
  q('status').textContent=status;q('error').hidden=!(error||storageError);q('error').textContent=[error,storageError].filter(Boolean).join(' ');
  q('coverage').textContent=u.coverage;q('source').textContent='Supplied course PDF pp'+u.pages.join('–')+' · selected original recordings; no exam-pass guarantee.';
  q('part').value=s.unitIndex;
  if(q('recording').dataset.unit!==u.id){q('recording').replaceChildren();for(const id of u.lessons){const o=doc.createElement('option');o.value=id;o.textContent=id+' · '+byId.get(id).title;q('recording').append(o);}q('recording').dataset.unit=u.id;}
  q('recording').value=l.id;q('part').disabled=q('recording').disabled=loading||mode!=='guided';q('transcript').textContent=l.transcript;
 }
 function pauseAdapters(){for(const a of Object.values(adapters))try{a.pause();}catch(e){/* Only the current view can own resources. */}}
 function cancelScene(){sceneEpoch++;jobController?.abort();jobController=null;if(pending){pending.resolve(false);pending=null;}preparedOrgan=null;}
 function capture(){if(!preparedOrgan||!applied||applied.lessonId!==lesson().id)return null;try{return {organ:preparedOrgan,snapshot:copy(adapters[preparedOrgan].capture())};}catch(e){return null;}}
 function sceneWork(t,restore=null){
  if(!active||mode!=='guided')return Promise.resolve(false);const epoch=sceneEpoch,rev=revision,l=lesson(),i=cueAt(t),cue=l.cues[i];
  return new Promise(resolve=>{if(pending)pending.resolve(false);pending={t,restore,epoch,rev,l,i,cue,resolve};drain();});
 }
 async function drain(){
  if(running)return;running=true;
  try{while(pending){const job=pending;pending=null;const own=new AbortController();jobController=own;
   const ctx={signal:own.signal,lessonId:job.l.id,isCurrent:()=>active&&mode==='guided'&&revision===job.rev&&sceneEpoch===job.epoch&&!own.signal.aborted};
   try{if(!ctx.isCurrent()){job.resolve(false);continue;}const scene=job.cue.scene,a=adapters[scene.organ],focus=doc.activeElement,keepFocus=card.contains(focus)||dock.contains(focus);
    if(!a)throw Error('Unsupported course view: '+scene.organ);
    if(preparedOrgan!==scene.organ){pauseAdapters();if(await a.prepare(copy(scene),ctx)===false&&ctx.isCurrent())throw Error('Course view could not be prepared');if(!ctx.isCurrent()){job.resolve(false);continue;}preparedOrgan=scene.organ;}
    if(job.restore?.organ===scene.organ){if(await a.restore(copy(job.restore.snapshot),ctx)===false&&ctx.isCurrent())throw Error('Saved view could not be restored');}
    const ok=await a.apply(copy(scene),job.t,ctx);if(!ctx.isCurrent()){job.resolve(false);continue;}if(ok===false)throw Error('Course view did not accept '+job.cue.id);
    if(keepFocus&&focus.isConnected)focus.focus({preventScroll:true});
    applied={lessonId:job.l.id,index:job.i,cueId:job.cue.id,organ:scene.organ,time:job.t};job.resolve(true);
   }catch(e){job.resolve(false);if(ctx.isCurrent())fail('View unavailable: '+e.message);}
  }}finally{running=false;jobController=null;render();}
 }
 function fail(message){playing=false;audio.pause();error=message;pauseAdapters();save(true);render();}
 function metadata(signal){if(audio.readyState>=1)return Promise.resolve();return new Promise((resolve,reject)=>{const timer=setTimeout(()=>finish(Error('Audio metadata did not load')),30000);function finish(e){clearTimeout(timer);audio.removeEventListener('loadedmetadata',ready);audio.removeEventListener('error',bad);signal.removeEventListener('abort',abort);e?reject(e):resolve();}const ready=()=>finish(),bad=()=>finish(Error('Audio could not load')),abort=()=>finish(Error('Cancelled'));audio.addEventListener('loadedmetadata',ready,{once:true});audio.addEventListener('error',bad,{once:true});signal.addEventListener('abort',abort,{once:true});});}
 async function loadClip(next,{at=0,autoplay=false,restore=null}={}){
  if(next<0||next>=sequence.length)return false;
  playing=false;audio.pause();loadController?.abort();cancelScene();const rev=++revision,controller=new AbortController();loadController=controller;
  active=true;mode='guided';index=next;time=at;completed=false;loading=true;needsGesture=false;error='';applied=null;sceneSnapshot=null;lastTick=-1;lastSaved=-1;
  contextual.takeForCourse();pauseAdapters();if(clipUrl){host.URL.revokeObjectURL(clipUrl);clipUrl=null;}render();
  try{const l=lesson(),url=new URL(l.audio.src,doc.baseURI);if(url.origin!==host.location.origin)throw Error('Recording must come from this site');
   const response=await fetch(url,{signal:controller.signal,credentials:'same-origin',mode:'same-origin'});if(!response.ok||response.status===206)throw Error('Recording returned HTTP '+response.status);const blob=await response.blob();
   if(rev!==revision||mode!=='guided')return false;if(!blob.size)throw Error('Recording is empty');clipUrl=URL.createObjectURL(blob);audio.src=clipUrl;audio.load();await metadata(controller.signal);
   if(rev!==revision||mode!=='guided')return false;audio.currentTime=Math.min(l.audio.duration,Math.max(0,at));time=audio.currentTime;
   const sceneReady=await sceneWork(time,restore);if(rev!==revision||mode!=='guided')return false;loading=false;if(!sceneReady){render();return false;}sceneSnapshot=capture();save(true);render();
   if(autoplay)await play();return true;
  }catch(e){if(rev!==revision||controller.signal.aborted)return false;loading=false;fail('Could not open this recording. '+e.message);return false;}
 }
 function loop(){frame=0;if(!active||mode!=='guided'||audio.paused||doc.hidden)return;
  const t=audio.currentTime;if(Math.abs(t-lastTick)>=.1){lastTick=t;sceneWork(t);save();render();}
  frame=host.requestAnimationFrame(loop);
 }
 function wake(){if(!frame&&active&&mode==='guided'&&!audio.paused&&!doc.hidden)frame=host.requestAnimationFrame(loop);}
 function play(){
  if(!active||mode!=='guided'||loading)return Promise.resolve(false);needsGesture=false;error='';if(completed){return loadClip(0,{autoplay:false});}
  let result;try{result=audio.play();}catch(e){result=Promise.reject(e);}const rev=revision;
  return Promise.resolve(result).then(()=>{if(rev!==revision||mode!=='guided'){audio.pause();return false;}playing=true;wake();render();return true;},e=>{if(rev===revision){playing=false;needsGesture=true;error='Tap Play to allow this recording to continue. '+e.message;render();}return false;});
 }
 async function pause(){if(mode!=='guided')return false;playing=false;audio.pause();time=audio.currentTime;cancelScene();if(await sceneWork(time)){sceneSnapshot=capture();save(true);}render();return true;}
 async function seek(t){if(mode!=='guided'||loading||!Number.isFinite(t))return false;playing=false;audio.pause();cancelScene();completed=false;audio.currentTime=Math.max(0,Math.min(lesson().audio.duration,t));time=audio.currentTime;const ok=await sceneWork(time);if(ok){sceneSnapshot=capture();save(true);}render();return ok;}
 function enterExplore(){
  if(!active||mode==='explore')return Promise.resolve(true);time=audio.currentTime||time;playing=false;audio.pause();sceneSnapshot=capture();save(true);mode='explore';revision++;loadController?.abort();cancelScene();pauseAdapters();loading=false;
  adapters.respiratory.releaseGuidedResources?.();contextual.releaseFromCourse();if(clipUrl){URL.revokeObjectURL(clipUrl);clipUrl=null;}render();return Promise.resolve(true);
 }
 function resume(){return loadClip(index,{at:time,restore:sceneSnapshot});}
 function open(){const p=saved;if(p&&!p.completed){const i=sequence.findIndex(x=>x.id===p.lessonId);return loadClip(i,{at:p.time,restore:p.scene});}return loadClip(0);}
 function close(){enterExplore();active=false;render();}
 function toggle(){inspect().playing?pause():play();}
 listen(launch,'click',open);listen(q('play'),'click',toggle);listen(dq('dock-play'),'click',toggle);
 listen(q('previous'),'click',()=>loadClip(index-1));listen(q('next'),'click',()=>loadClip(index+1));listen(q('mode'),'click',()=>mode==='guided'?enterExplore():resume());listen(q('close'),'click',close);
 listen(q('seek'),'input',()=>seek(Number(q('seek').value)));listen(q('part'),'change',()=>loadClip(sequence.findIndex(x=>x.unit===Number(q('part').value))));listen(q('recording'),'change',()=>loadClip(sequence.findIndex(x=>x.id===q('recording').value)));
 listen(dq('show'),'click',()=>{card.scrollIntoView({block:'start',behavior:'auto'});q('play').focus({preventScroll:true});});
 listen(audio,'timeupdate',()=>{if(active&&mode==='guided'&&!loading){time=audio.currentTime;if(!audio.paused&&Math.abs(time-lastTick)>=.1){lastTick=time;sceneWork(time);}save();render();wake();}});
 listen(audio,'ended',()=>{if(!active||mode!=='guided'||loading||!playing)return;playing=false;time=lesson().audio.duration;if(index===sequence.length-1){completed=true;sceneSnapshot=capture();save(true);pauseAdapters();render();}else loadClip(index+1,{autoplay:true});});
 listen(audio,'error',()=>{if(active&&mode==='guided'&&!loading&&audio.error)fail('Recording could not play. Reopen this recording or Explore.');});
 function manual(e){if(!e.isTrusted||!active||mode!=='guided'||card.contains(e.target)||dock.contains(e.target))return;
  if(e.type==='keydown'&&['Tab','Escape','Shift','Control','Alt','Meta'].includes(e.key))return;
  const target=e.target.closest?.('button,select,input,textarea,a[href],canvas,[role=button],[role=application]');
  if((target&&target.closest('#home,header,#quiz,#results'))||(e.type==='keydown'&&e.target.closest?.('#heartV3Study,#cardiorespiratoryStudy,#leadPlacementHome')))enterExplore();
 }
 for(const type of ['pointerdown','keydown','change'])listen(doc,type,manual,true);
 listen(doc,'visibilitychange',()=>{if(doc.hidden&&active&&mode==='guided')pause();});listen(host,'pagehide',()=>{if(active&&mode==='guided'){audio.pause();sceneSnapshot=capture();save(true);}});
 readSaved();render();
 host.GuidedCourse={open,play,pause,seek,select:id=>loadClip(sequence.findIndex(x=>x.id===id)),enterExplore,resume,close,inspect,sequence:()=>copy(sequence),key:KEY,audio};
})(window);
