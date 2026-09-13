/* Shared image viewer. Source pixels are never modified; one uniform scale preserves geometry. */
const ImageViewer=(()=>{
 let active;
 function open(src,alt,options={}){
  if(active)active.close();
  const opener=document.activeElement,dialog=document.createElement('dialog');
  dialog.id=options.id||'study-image-dialog';dialog.className='image-viewer '+(options.className||'');
  dialog.setAttribute('aria-label','Enlarged image');
  dialog.innerHTML='<div class="iv-controls"><button type="button" data-iv="close">Close image</button><button type="button" data-iv="out" aria-label="Zoom out">−</button><output aria-live="polite">Loading…</output><button type="button" data-iv="in" aria-label="Zoom in">+</button><button type="button" data-iv="fit">Fit to screen</button><button type="button" data-iv="actual">100%</button></div><p class="iv-hint">Pinch to zoom · drag to move · use + / − or Fit to screen</p><div class="iv-stage study-image-viewport" tabindex="0" aria-label="Image: pinch to zoom or drag to move"><img draggable="false"></div><p class="iv-error" hidden>Image could not load. <button type="button" data-iv="retry">Retry image</button></p>';
  document.body.appendChild(dialog);
  const stage=dialog.querySelector('.iv-stage'),im=stage.querySelector('img'),out=dialog.querySelector('output'),points=new Map();
  im.alt=alt||'Course illustration';
  let scale=1,x=0,y=0,fitted=true,ready=false,previous=null;
  const fitScale=()=>Math.min(stage.clientWidth/im.naturalWidth,stage.clientHeight/im.naturalHeight,1);
  const bounds=()=>{const w=im.naturalWidth*scale,h=im.naturalHeight*scale;x=w<=stage.clientWidth?(stage.clientWidth-w)/2:Math.min(0,Math.max(stage.clientWidth-w,x));y=h<=stage.clientHeight?(stage.clientHeight-h)/2:Math.min(0,Math.max(stage.clientHeight-h,y));};
  function paint(){if(!ready)return;bounds();im.style.transform='translate('+x+'px,'+y+'px) scale('+scale+')';out.textContent=Math.round(scale*100)+'%';dialog.dataset.scale=String(scale);dialog.dataset.fit=String(fitted);}
  function fit(){if(!ready)return;fitted=true;scale=fitScale();x=0;y=0;paint();}
  function zoom(next,cx=stage.clientWidth/2,cy=stage.clientHeight/2){if(!ready)return;fitted=false;next=Math.max(Math.min(fitScale(),.1),Math.min(8,next));x=cx-(cx-x)*next/scale;y=cy-(cy-y)*next/scale;scale=next;paint();}
  function gesture(){const ps=[...points.values()];if(!ps.length)return null;return ps.length===1?{x:ps[0].x,y:ps[0].y,d:0}:{x:(ps[0].x+ps[1].x)/2,y:(ps[0].y+ps[1].y)/2,d:Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y)};}
  function local(e){const r=stage.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
  stage.addEventListener('pointerdown',e=>{if(!ready||e.button>0)return;e.preventDefault();stage.setPointerCapture(e.pointerId);points.set(e.pointerId,local(e));previous=gesture();});
  stage.addEventListener('pointermove',e=>{if(!points.has(e.pointerId))return;e.preventDefault();points.set(e.pointerId,local(e));const g=gesture();if(previous){if(g.d&&previous.d){const next=Math.max(Math.min(fitScale(),.1),Math.min(8,scale*g.d/previous.d));x=g.x-(previous.x-x)*next/scale;y=g.y-(previous.y-y)*next/scale;scale=next;fitted=false;}else{x+=g.x-previous.x;y+=g.y-previous.y;}paint();}previous=g;});
  const end=e=>{points.delete(e.pointerId);previous=gesture();};
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>stage.addEventListener(event,end));
  stage.addEventListener('wheel',e=>{e.preventDefault();const p=local(e);zoom(scale*Math.exp(-e.deltaY*.002),p.x,p.y);},{passive:false});
  stage.addEventListener('dblclick',e=>{const p=local(e);if(fitted)zoom(Math.max(1,scale*2),p.x,p.y);else fit();});
  stage.addEventListener('keydown',e=>{if(['+','=','-','0','f','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='+'||e.key==='=')zoom(scale*1.25);else if(e.key==='-')zoom(scale/1.25);else if(e.key==='0'||e.key==='f')fit();else{x+=e.key==='ArrowLeft'?40:e.key==='ArrowRight'?-40:0;y+=e.key==='ArrowUp'?40:e.key==='ArrowDown'?-40:0;paint();}}});
  dialog.addEventListener('click',e=>{const action=e.target.closest('[data-iv]')?.dataset.iv;if(action==='close')dialog.close();if(action==='in')zoom(scale*1.25);if(action==='out')zoom(scale/1.25);if(action==='fit')fit();if(action==='actual')zoom(1);if(action==='retry'){dialog.querySelector('.iv-error').hidden=true;const retryURL=new URL(src,document.baseURI);retryURL.searchParams.set('imageRetry',String(Date.now()));im.src=retryURL.href;}});
  im.onload=()=>{ready=true;im.style.width=im.naturalWidth+'px';im.style.height=im.naturalHeight+'px';dialog.querySelector('.iv-error').hidden=true;fit();};
  im.onerror=()=>{ready=false;out.textContent='Unavailable';dialog.querySelector('.iv-error').hidden=false;};
  const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  const ro=new ResizeObserver(()=>{if(fitted)fit();else paint();});
  dialog.addEventListener('close',()=>{ro.disconnect();points.clear();document.body.style.overflow=oldOverflow;dialog.remove();if(active===dialog)active=null;if(opener?.isConnected)opener.focus();},{once:true});
  active=dialog;dialog.showModal();ro.observe(stage);im.src=src;dialog.querySelector('button').focus();
  return dialog;
 }
 return {open};
})();