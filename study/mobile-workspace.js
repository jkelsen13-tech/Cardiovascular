/* Mobile presentation only. Existing controls, clocks, renderers and audio own
   their behavior. Moving a control never calls a simulator or media method. */
(function () {
  'use strict';
  const media=matchMedia('(max-width:850px)'),sessions=new Map(),observers=[];
  let scheduled=false,organObserver=null,observedOrgan=null,structureRevision=0;
  function session(key,anchor){
    const prior=sessions.get(key);if(prior?.anchor===anchor&&anchor.isConnected)return null;
    const state={anchor,moves:[],created:[],classes:[]};sessions.set(key,state);return state;
  }
  function move(s,node,parent,before=null){if(!node||!parent)return;const marker=document.createComment('mobile original location');node.before(marker);s.moves.push([node,marker]);parent.insertBefore(node,before);structureRevision++;}
  function disclosure(s,parent,label){
    const d=document.createElement('details');d.className='ml-options';const summary=document.createElement('summary');summary.textContent=label;
    // Preserve native summary keys rather than letting the heart's background
    // Space/arrow shortcuts start playback or step a phase while opening options.
    d.addEventListener('keydown',e=>{if(e.target===summary&&['Space','ArrowLeft','ArrowRight'].includes(e.code))e.stopPropagation();});
    d.append(summary);parent.append(d);s.created.push(d);return d;
  }
  function mark(s,node,name){node.classList.add(name);s.classes.push([node,name]);}
  function restore(active){
    let focusTarget=active;
    for(const s of [...sessions.values()].reverse()){
      if(s.created.some(n=>active?.parentElement===n))focusTarget=[...active.parentElement.querySelectorAll('button,select,input,a[href],summary')].find(n=>n!==active&&!n.disabled&&!(n.tagName==='SUMMARY'&&s.created.includes(n.parentElement)))||s.anchor;
      for(const [node,marker]of s.moves.slice().reverse())if(marker.isConnected)marker.replaceWith(node);
      s.created.forEach(n=>n.remove());s.classes.forEach(([n,c])=>n.classList.remove(c));
    }
    sessions.clear();
    return focusTarget;
  }
  function retainFocus(target){
    if(!target?.isConnected||target===document.body)return;
    for(let node=target.parentElement;node;node=node.parentElement)if(node.matches('details:not([open])')&&!node.querySelector(':scope > summary')?.contains(target))node.open=true;
    if(!target.matches('button,input,select,textarea,a[href],[tabindex]')){target.tabIndex=-1;target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});}
    if(target.getClientRects().length&&document.activeElement!==target)target.focus({preventScroll:true});
  }
  function heart(root){
    const shell=root?.querySelector('.h3-teaching-shell'),grid=root?.querySelector('.h3-teaching-grid');if(!shell||!grid)return;
    const s=session('heart',shell);if(!s)return;mark(s,root,'ml-heart');
    const organ=root.querySelector('.h3-organ-column'),stage=root.querySelector('[data-h3-stage]'),transport=root.querySelector('.h3-transport');
    const options=disclosure(s,shell,'View and anatomy');
    move(s,root.querySelector('.h3-viewbar'),options);move(s,root.querySelector('.h3-chamber-legend'),options);
    const phases=disclosure(s,shell,'Choose a physiological phase');
    move(s,root.querySelector('.h3-phase-tools'),phases);move(s,root.querySelector('.h3-cycle-groups'),phases);
    for(const label of [...transport.querySelectorAll('label')])if(label.querySelector('[data-h3-speed],[data-h3-rotation]'))move(s,label,options);
    move(s,grid,shell,shell.firstChild);move(s,root.querySelector('[data-h3-scale-context]'),organ,organ.firstChild);
    const clock=root.querySelector('[data-h3-clock]');move(s,clock,organ,stage);mark(s,clock,'ml-current-phase');
    move(s,transport,organ,stage.nextSibling);
    const live=root.querySelector('.h3-live-panel');move(s,root.querySelector('.h3-live-trace'),live,root.querySelector('.h3-live-valves'));
    move(s,root.querySelector('.h3-analysis'),shell,grid.nextSibling);
    const notes=root.querySelector('.h3-course-notes');move(s,notes,shell);
  }
  function respiratory(root){
    const grid=root?.dataset.system==='respiratory'&&root.querySelector('.sim-grid');if(!grid)return;
    const s=session('respiratory',grid);if(s){
      mark(s,root,'ml-respiratory');const first=grid.children[0],second=grid.children[1];
      const anatomyOptions=disclosure(s,first,'Anatomy display and loading options');
      const loading=root.querySelector('[data-load-breathing]')?.closest('.sim-controls');move(s,loading,anatomyOptions);move(s,root.querySelector('[data-load-status]'),anatomyOptions);
      // Keep mechanics outside the replaceable 3D host: unload/retry rebuilds it.
      const mechanics=[...root.querySelectorAll('.sim-card')].find(e=>e.querySelector(':scope > h3')?.textContent==='Breathing cycle');
      const host=root.querySelector('[data-organ-host]');move(s,mechanics,first,host.nextSibling);
      const fallback=root.querySelector('[data-fallback]'),fallbackDetails=disclosure(s,first,'2D diagram and airway explanation');fallbackDetails.dataset.mobileFallback='';fallbackDetails.open=true;move(s,fallback,fallbackDetails);
      const fallbackRoute=fallback.querySelector('[data-explorer-fallback]');if(fallbackRoute){const route=disclosure(s,fallback,'Airway route and learning checks');move(s,fallbackRoute,route);}
      const structures=disclosure(s,grid,'Search structures and anatomy reference');move(s,second,structures);
      const nav=disclosure(s,root,'Other simulator sections');move(s,root.querySelector('.sim-tabs'),nav);
      for(const title of ['Breathing and linked capnography','Idealized ventilation arithmetic']){
        const card=[...root.querySelectorAll('.sim-card')].find(e=>e.querySelector(':scope > h3')?.textContent===title);
        if(card){const d=disclosure(s,root,title==='Breathing and linked capnography'?'Capnography comparison':'Ventilation arithmetic');move(s,card,d);}
      }
    }
    const host=root.querySelector('[data-organ-host]'),viewport=host?.querySelector('.sim-breath-viewport');
    const fallbackDetails=root.querySelector('[data-mobile-fallback]'),hostState=String(!!host?.hidden);
    if(fallbackDetails&&fallbackDetails.dataset.hostState!==hostState){
      fallbackDetails.dataset.hostState=hostState;fallbackDetails.open=!!host?.hidden||fallbackDetails.contains(document.activeElement);
      const mechanics=root.querySelector('[data-mechanics-values]')?.closest('.sim-card');
      if(mechanics)mechanics.parentElement.insertBefore(fallbackDetails,host?.hidden?mechanics:mechanics.nextSibling);
    }
    if(!viewport)return;
    const v=session('breathing',viewport);if(!v)return;
    const options=disclosure(v,host,'Camera, anatomy and airway routes');
    const camera=disclosure(v,options,'View and anatomy');
    for(const child of [...host.children])if(child.matches('.sim-controls,[data-breath-gross-orientation],.sim-badge'))move(v,child,camera);
    const route=disclosure(v,options,'Connected airway route and learning checks');move(v,host.querySelector('[data-explorer-host]'),route);
    move(v,host.querySelector('[data-breath-status]'),options);
  }
  function provenance(){
    const note=document.querySelector('#home > .src-note');if(!note)return;
    const s=session('provenance',note);if(!s)return;const d=disclosure(s,document.getElementById('home'),'About these study materials');move(s,note,d);
  }
  function refresh(){
    scheduled=false;const active=document.activeElement,version=structureRevision;if(!media.matches){if(sessions.size)retainFocus(restore(active));return;}
    heart(document.getElementById('heartV3Study'));respiratory(document.getElementById('cardiorespiratoryStudy'));provenance();
    if(version!==structureRevision)retainFocus(active);
    const host=document.querySelector('#cardiorespiratoryStudy [data-organ-host]');
    if(host!==observedOrgan){organObserver?.disconnect();observedOrgan=host;if(host){organObserver=new MutationObserver(schedule);organObserver.observe(host,{childList:true,attributes:true,attributeFilter:['hidden']});}}
  }
  function schedule(){if(!scheduled){scheduled=true;queueMicrotask(refresh);}}
  for(const id of ['heartV3Study','cardiorespiratoryStudy']){const root=document.getElementById(id);if(root){const observer=new MutationObserver(schedule);observer.observe(root,{childList:true});observers.push(observer);}}
  media.addEventListener('change',refresh);refresh();
  window.MobileLearningWorkspace={refresh};
}());
