/* User-initiated explanations. Reads page context; never owns a simulator.
   No adapters, cue application, route changes or model clock. Focus stays within
   the user-opened audio disclosure and always prevents page scrolling. */
(function (host) {
  'use strict';
  const doc=host.document,home=doc.getElementById('home'),map=host.ContextualAudioContexts;
  if (!home || !map || doc.getElementById('contextualAudio')) return;
  const lessons=(host.GuidedStudyLessons||[]).filter(l=>l.audio),byId=new Map(lessons.map(l=>[l.id,l]));
  const card=doc.createElement('section');card.id='contextualAudio';card.hidden=true;
  card.setAttribute('aria-labelledby','contextualAudioTitle');
  card.innerHTML='<h2 id="contextualAudioTitle">Audio explanation</h2><p class="ca-context" data-context-audio-context></p><p class="ca-note">Listen while you use the page. You control the view and the simulation.</p><label>Related explanation<select data-context-audio-lesson aria-label="Related audio explanation"></select></label><p class="ca-note" data-context-audio-continuing hidden></p><div class="ca-controls"><button type="button" data-context-audio-action="play">Play explanation</button><button type="button" data-context-audio-action="replay">Replay</button></div><div class="ca-position"><label for="contextAudioSeek">Audio position</label><input id="contextAudioSeek" data-context-audio-seek type="range" min="0" max="0" step="0.1" value="0"><output data-context-audio-position>0:00 / 0:00</output></div><p class="ca-note" role="status" aria-live="polite" data-context-audio-status></p><p class="ca-note ca-warning" data-context-audio-warning hidden></p><p role="alert" data-context-audio-error hidden></p><details><summary>Transcript and source</summary><p class="ca-note" data-context-audio-source></p><div class="ca-transcript" data-context-audio-transcript></div></details>';
  // The media element remains outside this disclosure, in its original parent.
  // Expanding the mobile controls or crossing a breakpoint never moves audio.
  const inlineMedia=host.matchMedia('(max-width:850px)'),inline=doc.createElement('details');
  inline.className='ca-inline-disclosure';inline.open=!inlineMedia.matches;
  const inlineSummary=doc.createElement('summary');inlineSummary.textContent='Audio explanation · controls and transcript';
  const inlineBody=doc.createElement('div');inlineBody.className='ca-inline-body';
  while(card.firstChild)inlineBody.append(card.firstChild);
  inline.append(inlineSummary,inlineBody);card.append(inline);
  const audio=doc.createElement('audio');audio.preload='metadata';audio.hidden=true;audio.setAttribute('aria-label','Contextual explanation audio');card.append(audio);
  home.insertBefore(card,home.firstChild);
  const el=name=>card.querySelector('[data-context-audio-'+name+']');
  const select=el('lesson'),play=card.querySelector('[data-context-audio-action=play]'),replay=card.querySelector('[data-context-audio-action=replay]'),seek=el('seek');
  const dock=doc.createElement('aside');dock.id='contextualAudioDock';dock.hidden=true;dock.setAttribute('aria-label','Floating audio controls');
  dock.innerHTML='<div class="ca-float-bar"><button type="button" class="ca-float-toggle" data-audio-dock-toggle aria-expanded="false" aria-controls="contextAudioDockPanel" aria-label="Choose audio explanation"><span data-audio-dock-title></span><small data-audio-dock-state></small><span class="ca-float-chevron" aria-hidden="true">⌃</span></button><button type="button" class="ca-float-play" data-audio-dock-play aria-label="Play explanation"><span aria-hidden="true" data-audio-dock-icon>▶</span></button></div><section id="contextAudioDockPanel" class="ca-float-panel" hidden aria-labelledby="contextAudioDockHeading"><div class="ca-float-heading"><h2 id="contextAudioDockHeading">Audio explanations</h2><button type="button" data-audio-dock-close aria-label="Close audio lesson selector">✕</button></div><p data-audio-dock-context></p><label>Related explanation<select data-audio-dock-lesson aria-label="Floating audio lesson"></select></label><p class="ca-float-note">Choosing another explanation loads it paused. You control the page.</p><p data-audio-dock-position></p><p class="ca-float-warning" data-audio-dock-warning hidden></p><p role="alert" data-audio-dock-error hidden></p></section>';
  doc.body.append(dock);
  const floating=name=>dock.querySelector('[data-audio-dock-'+name+']');
  const floatToggle=floating('toggle'),floatPlay=floating('play'),floatSelect=floating('lesson'),floatPanel=doc.getElementById('contextAudioDockPanel');
  let context=null,current=null,ids=[],revision=0,pending=false,loading=false,error='',scheduled=false,disposed=false,manualPhase=null,priorHeartSelection='',clipUrl=null,controller=null;
  let courseOwned=false;
  const listeners=[],observers=[],sectionObservers=new Map();
  const listen=(target,event,handler,options)=>{target.addEventListener(event,handler,options);listeners.push(()=>target.removeEventListener(event,handler,options));};
  listen(inlineMedia,'change',()=>{inline.open=!inlineMedia.matches||inline.contains(doc.activeElement);});
  const text=(element,value)=>{if(element.textContent!==value)element.textContent=value;};
  const clock=value=>{const t=Math.max(0,Number(value)||0);return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');};
  function visible(id){let e=doc.getElementById(id);if(!e)return false;for(;e;e=e.parentElement)if(e.hidden||e.classList.contains('hidden'))return false;return true;}
  function readContext(){
    if(visible('heartV3Study')){
      const s=host.HeartV3Study.getState();
      if(s.selected!==priorHeartSelection){manualPhase=null;priorHeartSelection=s.selected;}
      const name=host.HeartV3Content?.byStage?.[s.stage]?.label||({ra:'Right atrium',rv:'Right ventricle',la:'Left atrium',lv:'Left ventricle',sa:'SA node',avnode:'AV node',his:'His bundle',purkinje:'Purkinje fibers',lca:'Coronary circulation',rca:'Coronary circulation',wall:'Heart wall'})[s.selected]||s.selected||'overview';
      return {page:'heart',key:'heart:'+JSON.stringify([s.selected,s.route,s.stage,s.flowTracing,manualPhase]),label:'Heart simulator · '+(manualPhase?manualPhase.replaceAll('-',' '):name),ids:map.heart(s,manualPhase)};
    }
    if(visible('cardiorespiratoryStudy')){
      const s=host.CardiorespiratoryStudy.getState();
      const breathing=s.system==='respiratory'?host.CardiorespiratoryStudy.inspectBreathing():null;
      const stage=breathing?.explorer?.stage,selected=breathing?.selected||s.selected;
      let related=s.system==='respiratory'?map.lungs({...s,selected},stage):map.heart(s,null);
      if(s.tab==='guided'){
        const title=doc.querySelector('#cardiorespiratoryStudy .sim-card h3')?.textContent||'';
        if(/conduction|electr/i.test(title))related=map.guide.conduction;
        else if(/pressure|pump|cycle/i.test(title))related=map.guide.pressure;
        else if(/blood|flow|circul/i.test(title))related=map.guide.circulation;
        else if(/gas|diffus|transport/i.test(title))related=['M05.08','M05.09','M05.10'];
      }
      return {page:'sim-'+s.system,key:JSON.stringify([s.system,s.tab,s.lesson,selected,s.view,stage]),label:(s.system==='respiratory'?'Respiratory simulator':'Heart simulator v2')+' · '+(stage||selected||s.tab).replaceAll('-',' '),ids:related};
    }
    if(visible('leadPlacementHome')&&typeof LeadPlacementLab!=='undefined'){
      const s=LeadPlacementLab.getState();return {page:'lead',key:JSON.stringify([s.tab,s.selected,s.step,s.showIntercostalSpaces]),label:'Lead Placement Lab · '+(s.selected||'landmarks'),ids:map.lead(s)};
    }
    if(visible('ecgStudyHome')&&typeof EcgStudy!=='undefined'){
      const s=EcgStudy.getState(),stage=EcgStudy.data.stages[s.stage]?.id;return {page:'ecg-study',key:JSON.stringify([s.tab,stage]),label:'ECG Waves & Intervals · '+(stage||s.tab),ids:map.ecg(stage)};
    }
    if(visible('asptHome')){
      const tab=doc.querySelector('#asptHome nav [aria-pressed="true"]')?.dataset.id||'path';
      const chosen=tab==='path'?doc.querySelector('#asptHome [data-action=lesson][aria-pressed=true]'):null;
      const term=tab==='terms'&&doc.getElementById('asptTermSearch')?.value.trim()?doc.querySelector('#asptTerms [data-action=lesson]'):null;
      const topic=chosen?.dataset.id||term?.dataset.id;
      return {page:'guide',key:'guide:'+tab+':'+(topic||''),label:'ASPT study guide · '+(chosen?.textContent.replace(/^\d+\.\s*/,'')||term?.textContent||tab),ids:map.guide[topic]||[]};
    }
    if(visible('ecgHome'))return {page:'rhythm-study',key:'rhythm-study',label:'ECG Rhythm Practice · interpretation method',ids:['M08.06','M08.07','M08.08','M08.09']};
    return null;
  }
  function sourceText(l){return (Array.isArray(l.sources)?l.sources:[l.source||l.sourceLabel]).filter(Boolean).map(s=>typeof s==='string'?s:s.label||s.title||s.url||'').join(' · ');}
  function render(){
    if(courseOwned)return;
    const playing=!audio.paused&&!audio.ended;
    play.textContent=playing?'Pause explanation':error?'Reload explanation':'Play explanation';play.disabled=!current||pending||loading;
    replay.disabled=!current||loading||!!error;seek.disabled=!current||audio.readyState<1;
    seek.max=String(Number.isFinite(audio.duration)?audio.duration:current?.audio.duration||0);seek.value=String(audio.currentTime||0);
    seek.setAttribute('aria-valuetext',clock(audio.currentTime)+' of '+clock(seek.max));
    text(el('position'),clock(audio.currentTime)+' / '+clock(seek.max));
    el('error').hidden=!error;text(el('error'),error);
    const unrelated=current&&!ids.includes(current.id);
    el('continuing').hidden=!unrelated;
    text(el('continuing'),unrelated?'Current recording: '+current.title+'. Related choices now follow this section. Choose another explanation when you want to change audio.':'');
    text(el('status'),!current?'Choose a study-path topic or simulator section for related audio.':error?'Audio unavailable. The page controls still work.':loading?'Loading explanation…':pending?'Starting explanation…':playing?'Playing · '+current.title:audio.ended?'Explanation finished. Nothing plays automatically.':'Ready · '+current.title+' · paused');
    const state=error?'Unavailable':loading?'Loading':pending?'Starting':playing?'Playing':audio.ended?'Finished':'Paused';
    text(floating('title'),current?.title||'Audio explanation');text(floating('state'),state+(current?' · '+current.id:''));
    floating('icon').textContent='';floating('icon').dataset.symbol=playing?'pause':error?'reload':'play';
    floatPlay.disabled=play.disabled;floatPlay.setAttribute('aria-label',play.textContent+(current?' · '+current.id+' · '+current.title:''));
    floatPlay.setAttribute('aria-pressed',String(playing));floatPlay.title=floatPlay.getAttribute('aria-label');
    text(floating('context'),context?.label||'');text(floating('position'),clock(audio.currentTime)+' / '+clock(seek.max));
    floating('warning').hidden=el('warning').hidden;text(floating('warning'),el('warning').textContent);
    floating('error').hidden=!error;text(floating('error'),error);
  }
  function options(){
    const list=current&&!ids.includes(current.id)?[current.id,...ids]:ids;
    for(const target of [select,floatSelect]){
      target.replaceChildren();
      if(!list.length){const o=doc.createElement('option');o.textContent='No matching recording for this section';o.value='';target.append(o);}
      for(const id of list){const l=byId.get(id);if(!l)continue;const o=doc.createElement('option');o.value=id;o.textContent=id+' · '+l.title+(ids.includes(id)?'':' · current recording');target.append(o);}
      target.disabled=!list.length;target.value=current?.id||'';
    }
  }
  function load(id){
    revision++;const token=revision;pending=false;loading=false;audio.pause();error='';current=byId.get(id)||null;
    controller?.abort();controller=null;audio.removeAttribute('src');audio.load();
    if(clipUrl){host.URL.revokeObjectURL(clipUrl);clipUrl=null;}
    if(current){
      const url=new URL(current.audio.src,doc.baseURI);
      if(url.origin!==host.location.origin){error='Explanation must use an audio file on this site.';audio.removeAttribute('src');}
      else{
        controller=new AbortController();loading=true;
        host.fetch(url.href,{signal:controller.signal,credentials:'same-origin',mode:'same-origin'}).then(response=>{
          if(!response.ok||response.status===206)throw Error('Audio download returned HTTP '+response.status+'.');
          return response.blob();
        }).then(blob=>{
          if(token!==revision||disposed)return;
          if(!blob.size)throw Error('Audio download was empty.');
          clipUrl=host.URL.createObjectURL(blob);audio.src=clipUrl;audio.load();loading=false;render();
        }).catch(e=>{if(token!==revision||disposed)return;loading=false;error='Could not load this explanation. Use Reload to try again. '+e.message;render();});
      }
      text(el('transcript'),current.transcript||current.narrationText||'Transcript unavailable.');
      text(el('source'),sourceText(current));
      const note=host.ContextualAudioCompatibility?.[current.id];el('warning').hidden=!note;text(el('warning'),note||'');
    }else{audio.removeAttribute('src');text(el('transcript'),'Choose a study-path topic or simulator section to read the related transcript.');text(el('source'),'');el('warning').hidden=true;}
    options();render();
  }
  function refresh(){
    scheduled=false;if(disposed||courseOwned)return;
    // These small structural panels change when a manual route finishes loading.
    // Neither contains the continuously updating model clock or this player.
    for(const selector of ['#heartV3Study [data-h3-scale-context]','#cardiorespiratoryStudy [data-explorer-context]']){
      const target=doc.querySelector(selector),prior=sectionObservers.get(selector);
      if(target===prior?.target)continue;
      prior?.observer.disconnect();sectionObservers.delete(selector);
      if(target){const observer=new MutationObserver(schedule);observer.observe(target,{childList:true,subtree:true});sectionObservers.set(selector,{target,observer});}
    }
    const next=readContext();
    if(next?.key===context?.key&&next?.page===context?.page)return;
    const changedPage=next?.page!==context?.page;context=next;ids=[...new Set((next?.ids||[]).filter(id=>byId.has(id)))];
    card.hidden=!next;dock.hidden=!next;doc.body.classList.toggle('contextual-audio-present',!!next);text(el('context'),next?.label||'');
    if(changedPage)setExpanded(false);
    if(changedPage){manualPhase=null;load(ids[0]);}
    else if(audio.paused&&!pending&&(!current||!ids.includes(current.id)))load(ids[0]);
    else{options();render();}
  }
  function schedule(){if(!scheduled&&!disposed){scheduled=true;host.queueMicrotask(refresh);}}
  function start(){
    if(courseOwned||!current||pending||loading)return;
    const token=revision;pending=true;error='';render();
    let promise;try{promise=audio.play();}catch(e){promise=Promise.reject(e);}
    Promise.resolve(promise).then(()=>{if(token!==revision||disposed)return;pending=false;render();},e=>{if(token!==revision||disposed)return;pending=false;error='Could not play this explanation. Tap Play to retry. '+e.message;render();});
  }
  function togglePlayback(){if(error){load(current?.id);return;}if(!audio.paused){pending=false;audio.pause();render();}else start();}
  function setExpanded(open,restoreFocus=false){
    floatPanel.hidden=!open;floatToggle.setAttribute('aria-expanded',String(open));
    if(open&&!floatSelect.disabled)floatSelect.focus({preventScroll:true});
    else if(restoreFocus)floatToggle.focus({preventScroll:true});
  }
  listen(play,'click',togglePlayback);listen(floatPlay,'click',togglePlayback);
  listen(floatToggle,'click',()=>setExpanded(floatPanel.hidden));
  listen(floating('close'),'click',()=>setExpanded(false,true));
  listen(dock,'keydown',event=>{if(event.key==='Escape'&&!floatPanel.hidden){event.preventDefault();event.stopPropagation();setExpanded(false,true);}});
  listen(doc,'pointerdown',event=>{if(!floatPanel.hidden&&!dock.contains(event.target))setExpanded(false);});
  listen(doc,'fullscreenchange',()=>{const target=doc.fullscreenElement||doc.body;target.append(dock);dock.classList.toggle('ca-in-fullscreen',!!doc.fullscreenElement);});
  listen(replay,'click',()=>{if(!current)return;try{audio.currentTime=0;}catch(e){error='Audio is still loading. Try Replay again.';render();return;}start();});
  for(const target of [select,floatSelect])listen(target,'change',()=>load(target.value));
  listen(seek,'input',()=>{if(!current||audio.readyState<1)return;try{audio.currentTime=Math.max(0,Math.min(Number(seek.value),audio.duration));error='';}catch(e){error='Could not seek this explanation.';}render();});
  for(const event of ['loadedmetadata','durationchange','timeupdate','play','playing','pause','ended','seeked'])listen(audio,event,render);
  listen(audio,'error',()=>{if(!courseOwned&&current&&audio.error&&!loading){pending=false;error='The explanation could not be loaded. Use Reload to try again.';render();}});
  function manualChange(event){
    if(card.contains(event.target)||dock.contains(event.target))return;
    if(event.type==='click'){
      const phase=event.target.closest('[data-h3-phase]');
      if(phase)manualPhase=phase.dataset.h3Phase;
      else if(event.target.closest('[data-h3-chamber],[data-h3-mode],[data-h3-inspect-valve],[data-h3-node-select],[data-h3-cycle-group]'))manualPhase=null;
    }
    schedule();
  }
  for(const event of ['click','change','input'])listen(doc,event,manualChange);
  for(const id of ['home','homeMenu','heartV3Study','cardiorespiratoryStudy','leadPlacementHome','ecgStudyHome','asptHome','ecgHome','quiz','ecgQuiz']){
    const target=doc.getElementById(id);if(!target)continue;
    const observer=new MutationObserver(records=>{if(records.some(r=>{const old=r.oldValue||'',now=target.getAttribute(r.attributeName)||'';return r.attributeName==='hidden'||old.split(/\s+/).includes('hidden')!==now.split(/\s+/).includes('hidden');}))schedule();});
    observer.observe(target,{attributes:true,attributeFilter:['class','hidden'],attributeOldValue:true});observers.push(observer);
  }
  refresh();
  function takeForCourse(){courseOwned=true;revision++;controller?.abort();controller=null;pending=false;loading=false;audio.pause();audio.removeAttribute('src');audio.load();if(clipUrl){host.URL.revokeObjectURL(clipUrl);clipUrl=null;}current=null;context=null;card.hidden=true;dock.hidden=true;doc.body.classList.remove('contextual-audio-present');return audio;}
  function releaseFromCourse(){if(!courseOwned)return;courseOwned=false;context=null;refresh();}
  host.ContextualAudio={audio,refresh,takeForCourse,releaseFromCourse,inspect:()=>({courseOwned,context:context&&{page:context.page,key:context.key,label:context.label},lessonId:current?.id||null,availableIds:ids.slice(),playing:!audio.paused&&!audio.ended,time:audio.currentTime,pending,loading,error}),dispose(){disposed=true;revision++;controller?.abort();audio.pause();listeners.forEach(fn=>fn());observers.forEach(o=>o.disconnect());sectionObservers.forEach(o=>o.observer.disconnect());sectionObservers.clear();audio.removeAttribute('src');audio.load();if(clipUrl)host.URL.revokeObjectURL(clipUrl);card.remove();dock.remove();doc.body.classList.remove('contextual-audio-present');}};
}(window));
