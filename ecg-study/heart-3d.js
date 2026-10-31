/* Anatomical GLB view; electrical and flow paths are explicitly schematic. */
"use strict";
window.EcgHeart3D = (() => {
 const T = window.EcgThree;
 const V = (x=0,y=0,z=0) => new T.Vector3(x,y,z);
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const decode=s=>{const b=atob(s),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a.buffer;};
 const load=s=>new Promise((resolve,reject)=>new T.GLTFLoader().parse(decode(s),"",g=>resolve(g.scene),reject));
 async function mount(host, initial, failed) {
  let disposed=false, raf=0, observer, inter, stage=initial.stage, playing=initial.playing;
  let touchEnabled=false, selected="", isolation=false, contextOpacity=1, mechanical=null;
  const hiddenStructures=new Set();
  let selectedTargets=[];
  const structureParts={ra:"right_cardiac_atrium",la:"left_cardiac_atrium",rv:"right_ventricle",lv:"left_ventricle",tv:"tricuspid_valve",mv:"mitral_valve",pv:"pulmonary_valve",av:"aortic_valve",svc:"superior_vena_cava",ivc:"inferior_vena_cava",pa:"pulmonary_",aorta:"aort",vein:"pulmonary_vein",septum:"interventricular_septum",papillary:"papillary_muscle",sinus:"coronary_sinus"};
  const structureNames={ra:"Right atrium",la:"Left atrium",rv:"Right ventricle",lv:"Left ventricle",tv:"Tricuspid valve",mv:"Mitral valve",pv:"Pulmonary valve",av:"Aortic valve",svc:"Superior vena cava",ivc:"Inferior vena cava",pa:"Pulmonary arteries",aorta:"Aorta",vein:"Pulmonary veins",septum:"Interventricular septum",papillary:"Papillary muscles",sinus:"Coronary sinus"};
  const matches=(m,id)=>id==="pa"?/pulmonary_(artery|trunk)/.test(m.name):m.name.includes(structureParts[id]||"__missing__");
  let visible=true, cutaway=false, conduction=true, blood=true, labels=true, showValves=false, labelMode="clean", yaw=0,pitch=0,distance=5.5;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const focusTarget=V();
  const scene=new T.Scene(), camera=new T.PerspectiveCamera(38,1,.01,100);
  const renderer=new T.WebGLRenderer({antialias:false,alpha:true,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
  renderer.localClippingEnabled=true;
  renderer.setClearColor(0x141a24,1);
  const canvas=renderer.domElement;canvas.className="ecg-3d-canvas";canvas.tabIndex=0;
  canvas.setAttribute("role","img");canvas.setAttribute("aria-label","Rotatable anatomical heart. Arrow keys rotate; plus and minus zoom. Front view restores patient orientation.");
  host.innerHTML='<div class="ecg-3d-toolbar"><button type="button" data-action="cut" aria-pressed="false">Cutaway</button><button type="button" data-action="front">Reset / front view</button><button type="button" data-action="in" aria-label="Zoom in">Zoom +</button><button type="button" data-action="out" aria-label="Zoom out">Zoom −</button><button type="button" data-action="touch" aria-pressed="false">Enable touch rotation</button></div><div class="ecg-3d-viewport"><div class="ecg-3d-labels" aria-hidden="true"></div></div><section class="ecg-3d-cycle-readout" aria-labelledby="ecgBloodJourneyTitle"><h4 id="ecgBloodJourneyTitle">Blood journey + ECG timing</h4><p class="ecg-3d-route ecg-3d-route-deoxy"><strong>DEOXYGENATED</strong> Body → SVC / IVC → right atrium → tricuspid valve → right ventricle → pulmonary valve → pulmonary artery → lungs.</p><p class="ecg-3d-oxygenation"><strong>OXYGENATION OCCURS IN THE LUNGS</strong>, outside this heart model—not inside a heart chamber.</p><p class="ecg-3d-route ecg-3d-route-oxy"><strong>OXYGENATED</strong> Lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → body.</p><p class="ecg-3d-flow-state"></p><p class="ecg-3d-valve-state"></p><p class="ecg-3d-node-state"></p></section><div class="ecg-3d-options"><label><input type="checkbox" data-option="conduction" checked>Conduction</label><label><input type="checkbox" data-option="blood" checked>Blood flow</label><label><input type="checkbox" data-option="labels" checked>Labels</label><label>Label mode <select data-option="label-mode" aria-label="Label mode"><option value="clean" selected>Clean</option><option value="conduction">Conduction</option><option value="blood">Blood flow</option><option value="anatomy">Anatomy</option></select></label><label><input type="checkbox" data-option="valves">Show valves</label><label><input type="checkbox" data-option="wall-highlight" checked>Highlight exposed wall rims</label></div><p class="ecg-3d-rim-legend">Gold = exposed vessel wall at a display cut. Hollow centers remain open lumens. Gold is a teaching color, not measured thickness or a closed valve.</p><p class="ecg-3d-help">Mouse drag rotates. Touch scrolls the page by default; enable touch rotation for orbit and pinch, then unlock page scrolling. Arrow keys rotate when the heart has focus. All callouts mark projected landmarks; targets may be internal or behind tissue. Use cutaway to inspect them. Bright paths and arrows are teaching overlays.</p><p class="ecg-3d-direction" role="status"></p><details class="ecg-3d-key"><summary>Structure and flow key</summary><p>RA: right atrium; LA: left atrium; RV: right ventricle; LV: left ventricle. SVC/IVC: superior/inferior vena cava; PA: pulmonary artery; PV: pulmonary veins. In cutaway: TV = tricuspid valve; MV = mitral valve; Pulm V = pulmonary valve; Aortic V = aortic valve.</p><p>Deoxygenated blood: SVC/IVC → RA → tricuspid valve → RV → pulmonary valve → PA. Oxygenated blood: PV → LA → mitral valve → LV → aortic valve → aorta.</p><p>SA → atria → AV → His → right/left bundle branches → Purkinje. Overlays and chamber motion are schematic, not a patient-specific electrophysiology or fluid simulation.</p></details>';
  const viewport=host.querySelector(".ecg-3d-viewport");viewport.prepend(canvas);
  const labelLayer=host.querySelector(".ecg-3d-labels"), direction=host.querySelector(".ecg-3d-direction");
  labelLayer.removeAttribute("aria-hidden");
  const flowState=host.querySelector(".ecg-3d-flow-state"),valveState=host.querySelector(".ecg-3d-valve-state"),nodeState=host.querySelector(".ecg-3d-node-state");
  const controls=document.createElement("div");controls.className="ecg-3d-selection";
  controls.innerHTML='<label>Find a structure <input type="search" aria-label="Find a heart structure"></label><label>Selected structure <select data-select-structure><option value="">Choose a structure</option>'+Object.entries(structureNames).map(([id,n])=>'<option value="'+id+'">'+n+'</option>').join('')+'</select></label><button type="button" data-select-action="focus">Focus</button><button type="button" data-select-action="isolate">Isolate</button><button type="button" data-select-action="hide">Hide selected</button><button type="button" data-select-action="restore">Restore all</button><label>Context <select data-context><option value="1">Opaque</option><option value="0.18">Ghost</option><option value="0">Hidden</option></select></label><label>Render detail <select data-render-detail><option value="1">Balanced (1× pixels)</option><option value="1.5" selected>Sharper (up to 1.5× pixels)</option></select></label><label>Teaching path width <input type="range" data-path-width min="3" max="8" step="1" value="4" aria-label="Teaching path width at reference view"></label><label>Leader width <input type="range" data-leader min="1.5" max="5" step="0.5" value="2.5" aria-label="Leader width in pixels"></label><label><input type="checkbox" data-large>Large labels</label><label>View <select data-view><option value="0">Anterior</option><option value="3.141592653589793">Posterior</option><option value="0.7853981633974483">Patient left oblique</option><option value="-0.7853981633974483">Patient right oblique</option></select></label><p data-selection-status role="status">Reference anatomy; motion and pathways are schematic. Select a structure to highlight it. In any rotated view, screen left is not necessarily patient right.</p>';
  viewport.after(controls);
  controls.querySelector('[type="search"]').addEventListener('input',e=>{const q=e.target.value.toLowerCase();controls.querySelectorAll('option').forEach(o=>{if(o.closest('[data-select-structure]'))o.hidden=!!o.value&&!o.textContent.toLowerCase().includes(q);});});
  controls.querySelector('[data-select-structure]').addEventListener('change',e=>selectStructure(e.target.value));
  controls.querySelector('[data-leader]').addEventListener('input',e=>{host.style.setProperty('--leader-width',e.target.value+'px');host.style.setProperty('--selected-leader-width',Math.min(5,+e.target.value+1)+'px');});
  controls.querySelector('[data-render-detail]').addEventListener('change',e=>{renderer.setPixelRatio(Math.min(devicePixelRatio||1,+e.target.value));resize();});
  controls.querySelector('[data-path-width]').addEventListener('input',e=>{const k=+e.target.value/4;paths.forEach(p=>{if(p.curve){p.object.geometry.dispose();p.object.geometry=new T.TubeGeometry(p.curve,24,p.radius*k,5,false);}});flows.forEach(f=>{f.tube.geometry.dispose();f.halo.geometry.dispose();f.tube.geometry=new T.TubeGeometry(f.curve,36,.018*k,6,false);f.halo.geometry=new T.TubeGeometry(f.curve,36,.032*k,6,false);});draw();});
  controls.querySelector('[data-large]').addEventListener('change',e=>{const scale=Number(host.closest('[data-text-scale]')?.dataset.textScale||1);host.style.setProperty('--anatomy-font',(e.target.checked?18:15)*scale+'px');draw();});
  controls.querySelector('[data-view]').addEventListener('change',e=>{yaw=+e.target.value;pitch=0;draw();});
  controls.querySelector('[data-context]').addEventListener('change',e=>{contextOpacity=+e.target.value;applySelection();});
  controls.querySelectorAll('[data-select-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.selectAction;if(a==='restore'){hiddenStructures.clear();isolation=false;contextOpacity=1;}else if(selected){if(a==='hide')hiddenStructures.add(selected);if(a==='isolate')isolation=true;if(a==='focus'){const target=meshes.find(m=>matches(m,selected));if(target)focusTarget.copy(new T.Box3().setFromObject(target).getCenter(V()));distance=3.3;}}applySelection();}));
  function selectStructure(id){if(!id)isolation=false;selectedTargets=id?[id]:[];selected=id;host.dataset.selectedStructures=selectedTargets.join(",");controls.querySelector('[data-select-structure]').value=id;controls.querySelector('[data-selection-status]').textContent=(structureNames[id]||'No structure selected')+' — Reference mesh. Internal targets may require cutaway; their callouts are marked as projected landmarks, not visible surface points.';initial.onSelect?.(id);applySelection();}
  function selectStructures(ids){const valid=ids.filter(id=>structureParts[id]);selectStructure(valid[0]||"");selectedTargets=valid;valid.forEach(id=>hiddenStructures.delete(id));isolation=false;host.dataset.selectedStructures=valid.join(",");applySelection();}
  function applySelection(){meshes.forEach(m=>{const chosen=selectedTargets.some(id=>matches(m,id));m.visible=![...hiddenStructures].some(id=>matches(m,id))&&(!isolation||chosen);m.material.transparent=!!selected&&!chosen&&contextOpacity<1;m.material.opacity=selected&&!chosen?contextOpacity:1;m.material.emissive.set(chosen?0xffd166:0);m.material.emissiveIntensity=chosen?.8:.25;});labelItems.forEach(i=>{i.el.dataset.selected=String(i.id===selected);i.line.dataset.selected=String(i.id===selected);});draw();}
  const model=new T.Group();scene.add(model);
  scene.add(new T.HemisphereLight(0xffffff,0x53647a,2.5));
  const key=new T.DirectionalLight(0xffffff,3);key.position.set(-3,5,6);scene.add(key);
  const fill=new T.DirectionalLight(0xb9d7ff,1.3);fill.position.set(4,-1,-3);scene.add(fill);
  const overlays=new T.Group();scene.add(overlays);
  const clipping=new T.Plane(V(0,0,-1),.12);
  const bounds=[new T.Plane(V(1,0,0),1.65),new T.Plane(V(-1,0,0),1.65),new T.Plane(V(0,1,0),1.65),new T.Plane(V(0,-1,0),1.65),new T.Plane(V(0,0,1),1.65),new T.Plane(V(0,0,-1),1.65)];
  const meshes=[],points={},labelItems=[],pivots=[],paths=[],flows=[],valveLabels={},valveMeshes={};
  let ready=false,wallRims=null,wallHighlight=true;
  function dispose(){
   wallRims?.dispose();
   if(disposed)return;disposed=true;cancelAnimationFrame(raf);
   observer?.disconnect();inter?.disconnect();document.removeEventListener("visibilitychange",visibility);
   reduced.removeEventListener?.("change",motion);
   scene.traverse(o=>{o.geometry?.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m?.dispose());});
   renderer.dispose();renderer.forceContextLoss();host.replaceChildren();
  }
  function visibility(){cancelAnimationFrame(raf);if(!document.hidden)draw();}
  function motion(){cancelAnimationFrame(raf);draw();}
  function resize(){if(disposed)return;const w=viewport.clientWidth;renderer.setSize(w,Math.max(300,Math.min(420,w*.95)),false);camera.aspect=canvas.width/canvas.height;camera.updateProjectionMatrix();draw();}
  function renderLabels(){
   const box=viewport.getBoundingClientRect(),sides=[[],[]];
   labelItems.forEach(item=>{
    const {el,line,point,kind,id}=item;
    const sets={clean:["ra","rv","la","lv","aorta","pa"],conduction:["ra","rv","la","lv","sa","avnode","his","rbb","lbb","purkinje"],blood:["svc","ivc","ra","rv","pa","vein","la","lv","aorta"],anatomy:["svc","ivc","ra","rv","pa","vein","la","lv","aorta","sa","avnode","his","rbb","lbb","purkinje"]};
    const inMode=id===selected||(kind==="valve"?showValves:sets[labelMode].includes(id));
    el.hidden=(!labels&&id!==selected)||!inMode||hiddenStructures.has(id)||(isolation&&id!==selected)||(kind==="conduction"&&!conduction);
    const anchor=item.mesh?item.mesh.localToWorld(item.local.clone()):point.clone();
    const p=anchor.project(camera);el.hidden=el.hidden||p.z>1||p.z< -1;
    line.hidden=el.hidden;if(el.hidden)return;
    item.px=(p.x*.5+.5)*box.width;item.py=(-p.y*.5+.5)*box.height;
    sides[p.x<0?0:1].push(item);
   });
   const candidates=sides.flat().sort((a,b)=>(b.id===selected)-(a.id===selected)||Number(showValves&&b.kind==="valve")-Number(showValves&&a.kind==="valve")||Number(labelMode==="conduction"&&b.kind==="conduction")-Number(labelMode==="conduction"&&a.kind==="conduction"));
   const keep=new Set(candidates.slice(0,parseFloat(getComputedStyle(host).getPropertyValue("--anatomy-font"))>=28?1:box.width<700?6:8));
   sides.forEach((items,side)=>{
    items.forEach(item=>{if(!keep.has(item)){item.el.hidden=item.line.hidden=true;}});
    items=items.filter(item=>keep.has(item));
    items.sort((a,b)=>a.py-b.py);
    const margin=8,gap=8;
    const needed=()=>items.reduce((n,item)=>n+item.el.offsetHeight,0)+Math.max(0,items.length-1)*gap;
    while(items.length>1&&needed()>box.height-margin*2){
     const removable=items.filter(item=>item.id!==selected).sort((a,b)=>candidates.indexOf(b)-candidates.indexOf(a));
     if(!removable.length)break;
     const drop=removable[0];drop.el.hidden=drop.line.hidden=true;items=items.filter(item=>item!==drop);
    }
    let cursor=margin;
    items.forEach((item,i)=>{
     const h=item.el.offsetHeight;
     const remaining=items.slice(i+1).reduce((n,item)=>n+item.el.offsetHeight+gap,0);
     const inset=Math.min(box.width/2,item.el.offsetWidth/2+margin),x=side?box.width-inset:inset;
     const y=clamp(item.py,cursor+h/2,box.height-margin-remaining-h/2);
     cursor=y+h/2+gap;item.el.style.left=x+"px";item.el.style.top=y+"px";
     const edgeX=x+(side?-1:1)*item.el.offsetWidth/2;
     const dx=edgeX-item.px,dy=y-item.py;
     item.line.style.left=item.px+"px";item.line.style.top=item.py+"px";
     item.line.style.width=Math.hypot(dx,dy)+"px";item.line.style.transform="rotate("+Math.atan2(dy,dx)+"rad)";
    });
   });
  }
  function draw(time=0){
   wallRims?.update(cutaway?[...bounds,clipping]:bounds,wallHighlight);
   if(disposed||!ready||document.hidden||!visible)return;
   cancelAnimationFrame(raf);
   camera.position.set(Math.sin(yaw)*Math.cos(pitch)*distance,Math.sin(pitch)*distance,Math.cos(yaw)*Math.cos(pitch)*distance);camera.position.add(focusTarget);camera.lookAt(focusTarget);
   const moving=false; // Directional reference overlays render only on state changes.
   const pulse=moving?.5+.5*Math.sin(time*.006):1;
   const atrial=currentMechanical().id==="atrial",vent=currentMechanical().id==="ejection";
   // Reference meshes remain static. The shared clock drives a separate fullness schematic.
   pivots.forEach(({pivot})=>pivot.scale.setScalar(1));
   flows.forEach(f=>{
    const phase=flowPhase();
    const active=f.phase===phase;
    f.group.visible=blood&&active;
    f.material.opacity=moving?.82+.18*pulse:1;f.haloMaterial.opacity=moving?.38+.14*pulse:.46;
    f.arrows.forEach((a,i)=>{const t=((moving?time*.00018:0)+i/f.arrows.length+.08)%1;const p=f.curve.getPoint(t);a.position.copy(p);a.quaternion.setFromUnitVectors(V(0,1,0),f.curve.getTangent(t).normalize());a.scale.setScalar(moving?.92+.18*pulse:1);});
   });
   renderer.render(scene,camera);host.dataset.triangles=String(renderer.info.render.triangles);host.dataset.drawCalls=String(renderer.info.render.calls);renderLabels();
   if(moving)raf=requestAnimationFrame(draw);
  }
  function currentMechanical(){return mechanical||CardioSimCore.heartPhases[CardioSimCore.legacyPhase[stage]];}
  function flowPhase(){return currentMechanical().flow;}
  function sync(next){
   stage=next.stage;playing=next.playing;mechanical=next.mechanical||null;host.dataset.stage=stage;host.dataset.flowPhase=flowPhase();
   const atrial=stage==="p",vent=stage==="qrs"||stage==="st",repol=stage==="t";
   meshes.forEach(m=>{const n=m.name;const active=/atrium/.test(n)?atrial:/ventricle|septum/.test(n)?vent:false;m.material.emissive.set(active?0x773219:repol&&/ventricle/.test(n)?0x423073:0);m.material.emissiveIntensity=active?.8:.4;});
   paths.forEach(p=>{p.object.visible=conduction;const active=p.phase==="atrial"?atrial:p.phase==="av"?stage==="pr":p.phase==="vent"?stage==="qrs":false;p.material.color.set(active?0xffe66b:0x8398a5);p.material.opacity=active?1:.32;});
   const activeLabels={p:["sa","ra","la"],pr:["avnode","ra","la","rv","lv"],qrs:["his","rbb","lbb","purkinje","rv","lv","pa","aorta"],st:["rv","lv","pa","aorta"],t:["rv","lv"],u:[],tp:["svc","ivc","vein","ra","la","rv","lv"]}[stage];
   const routeNames={svc:"SVC\nDEOXY IN",ivc:"IVC\nDEOXY IN",pa:"PA\nLUNGS",vein:"PV\nOXY IN",aorta:"AORTA\nBODY"};
   labelItems.forEach(item=>{item.el.dataset.active=String(activeLabels.includes(item.id));if(item.kind==="structure"){const route=labelMode==="blood"?routeNames[item.id]:null;item.el.textContent=route||item.baseText;item.el.dataset.route=route?"endpoint":"";}});
   host.dataset.bloodLabelDetail=labelMode==="blood"?"routes":"short";
   const phase=currentMechanical();
   const states={tv:phase.av,mv:phase.av,pv:phase.sl,av:phase.sl};
   host.dataset.mechanicalPhase=phase.id;
   for(const [id,value] of Object.entries(states)){const mesh=valveMeshes[id],item=valveLabels[id];if(mesh){const color=value==="OPEN"?0x36d399:value==="CLOSED"?0x7c8ca5:value==="TRANSITION"?0xb8a7d9:0xffc857;mesh.material.emissive.set(color);mesh.material.emissiveIntensity=value==="OPEN"?.9:value==="CLOSED"?.28:.75;}if(item){item.el.textContent=structureNames[id]+" "+value;item.el.dataset.state=value.toLowerCase();}}
   host.dataset.valves=Object.entries(states).map(([id,value])=>id+":"+value).join(",");
   flowState.textContent={p:"FLOW → SVC / IVC → right atrium → tricuspid → right ventricle; pulmonary veins → left atrium → mitral → left ventricle.",pr:"FLOW → Ventricular filling continues through the open tricuspid and mitral valves.",qrs:"FLOW → Ventricular ejection begins toward the pulmonary artery and aorta.",st:"FLOW → Right ventricle → pulmonary valve → pulmonary artery; left ventricle → aortic valve → aorta.",t:"FLOW → Ejection slows as the ventricles relax.",u:"FLOW → Transition toward filling; no separate U-wave mechanical event is assigned.",tp:"FLOW → Passive filling resumes through the tricuspid and mitral valves."}[stage];
   valveState.textContent={p:"VALVES • Tricuspid + mitral OPEN • Aortic + pulmonary CLOSED",pr:"VALVES • Tricuspid + mitral OPEN • Aortic + pulmonary CLOSED",qrs:"VALVES • Tricuspid + mitral CLOSING • Aortic + pulmonary OPENING",st:"VALVES • Tricuspid + mitral CLOSED • Aortic + pulmonary OPEN",t:"VALVES • Aortic + pulmonary CLOSING • Tricuspid + mitral CLOSED",u:"VALVES • Transition toward filling",tp:"VALVES • Tricuspid + mitral OPEN • Aortic + pulmonary CLOSED"}[stage];
   nodeState.textContent={p:"P WAVE + SA NODE • Atrial depolarization precedes atrial contraction, helping move blood RA → RV and LA → LV.",pr:"PR SEGMENT + AV NODE • The AV nodal delay allows the ventricles time to finish filling.",qrs:"QRS + HIS / RBB / LBB / PURKINJE • Ventricular depolarization precedes contraction: RV sends deoxygenated blood toward the lungs while LV sends oxygenated blood to the body.",st:"ST SEGMENT • Ventricles remain depolarized and ejection continues through the pulmonary and aortic valves.",t:"T WAVE • Ventricular repolarization precedes relaxation; pulmonary and aortic valves close as ejection ends.",u:"U WAVE • No separate blood-flow or valve event is assigned; possible late electrical recovery remains a textual note.",tp:"TP SEGMENT • Electrical baseline and passive filling: venous blood enters both atria before the next SA-node impulse."}[stage];
   direction.textContent={p:"Atria depolarize and contract; arrows show atrial flow into the ventricles.",pr:"AV nodal delay; ventricular filling continues.",qrs:"His–Purkinje activation depolarizes the ventricles; contraction and ejection follow.",st:"Ventricles remain depolarized; schematic ejection continues.",t:"Ventricular repolarization and relaxation; ejection arrows fade.",u:"U wave: possible late recovery. No separate mechanical event is assigned.",tp:"Electrical baseline; schematic passive filling."}[stage];
   flowState.textContent='MECHANICAL PHASE • '+phase.name+' — '+phase.text+' Ventricular volume '+phase.volume+'.';
   valveState.textContent='VALVES • Tricuspid and mitral '+phase.av+' • Aortic and pulmonary '+phase.sl;
   direction.textContent='Patient L/R follow anatomy, not fixed screen sides. View: '+controls.querySelector('[data-view]').selectedOptions[0].textContent+'. '+phase.text;
   if(selected)applySelection();else draw();
  }
  function label(text,point,kind="structure",id=""){
   const el=document.createElement("button");el.type="button";el.addEventListener("click",()=>selectStructure(id));el.className="ecg-3d-label";el.textContent=text;el.dataset.kind=kind;el.dataset.structure=id;const line=document.createElement("i");line.className="ecg-3d-leader";labelLayer.append(line,el);el.title="Projected anatomical landmark; may be internal or behind tissue";el.setAttribute("aria-label",(structureNames[id]||text)+", projected landmark");const item={el,line,point,kind,id,baseText:text};labelItems.push(item);return item;
  }
  function curveLine(coords,color,phase,r=.015){
   const curve=new T.CatmullRomCurve3(coords);
   const mat=new T.MeshBasicMaterial({color,transparent:true,opacity:1,depthTest:false});
   const obj=new T.Mesh(new T.TubeGeometry(curve,24,r,5,false),mat);obj.renderOrder=10;overlays.add(obj);paths.push({object:obj,material:mat,phase,curve,radius:r});return curve;
  }
  function flow(coords,phase,color){
   const curve=new T.CatmullRomCurve3(coords),group=new T.Group();overlays.add(group);
   const haloMaterial=new T.MeshBasicMaterial({color:0x07121d,transparent:true,opacity:.46,depthTest:false});
   const halo=new T.Mesh(new T.TubeGeometry(curve,36,.032,6,false),haloMaterial);halo.renderOrder=10;group.add(halo);
   const material=new T.MeshBasicMaterial({color,transparent:true,opacity:1,depthTest:false});
   const tube=new T.Mesh(new T.TubeGeometry(curve,36,.018,6,false),material);tube.renderOrder=11;group.add(tube);
   const arrows=[];
   for(let i=0;i<4;i++){const a=new T.Mesh(new T.ConeGeometry(.065,.18,9),material);a.renderOrder=12;group.add(a);arrows.push(a);}
   flows.push({group,curve,phase,arrows,material,haloMaterial,tube,halo});
  }
  const drag=new Map();let last,down=null;
  function pointerDown(e){down=[e.clientX,e.clientY];if(e.pointerType==="touch"&&!touchEnabled)return;canvas.setPointerCapture(e.pointerId);drag.set(e.pointerId,[e.clientX,e.clientY]);last=null;}
  function pointerMove(e){
   if(!drag.has(e.pointerId))return;
   const prior=drag.get(e.pointerId);drag.set(e.pointerId,[e.clientX,e.clientY]);
   if(drag.size===1){yaw-=(e.clientX-prior[0])*.008;pitch=clamp(pitch+(e.clientY-prior[1])*.008,-1.1,1.1);}
   else {const a=[...drag.values()];const d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(last)distance=clamp(distance*last/d,3.3,8);last=d;}
   draw();
  }
  canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;const direction=V((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2,.5).unproject(camera).sub(camera.position).normalize(),hit=wallRims?.pick(camera.position,direction),hits=hit?[hit]:[];if(hits[0]){const id=Object.keys(structureParts).find(id=>matches(hits[0].object,id));if(id)selectStructure(id);}});
  canvas.addEventListener("pointerdown",pointerDown);canvas.addEventListener("pointermove",pointerMove);
  ["pointerup","pointercancel"].forEach(ev=>canvas.addEventListener(ev,e=>{drag.delete(e.pointerId);last=null;}));
  canvas.addEventListener("wheel",e=>{if(!touchEnabled)return;e.preventDefault();distance=clamp(distance+Math.sign(e.deltaY)*.3,3.3,8);draw();},{passive:false});
  canvas.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","Home"].includes(e.key)){e.preventDefault();e.stopPropagation();if(e.key==="ArrowLeft")yaw-=.15;if(e.key==="ArrowRight")yaw+=.15;if(e.key==="ArrowUp")pitch=clamp(pitch+.15,-1.1,1.1);if(e.key==="ArrowDown")pitch=clamp(pitch-.15,-1.1,1.1);if(e.key==="+"||e.key==="=")distance=clamp(distance-.3,3.3,8);if(e.key==="-")distance=clamp(distance+.3,3.3,8);if(e.key==="Home"){yaw=pitch=0;distance=5.5;}draw();}});
  canvas.addEventListener("webglcontextlost",e=>{e.preventDefault();if(!disposed){dispose();failed("3D graphics became unavailable. The simplified view is still usable.");}});
  host.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>{
   const a=b.dataset.action;if(a==="touch"){touchEnabled=!touchEnabled;drag.clear();last=null;canvas.style.touchAction=touchEnabled?"none":"pan-y";b.setAttribute("aria-pressed",String(touchEnabled));b.textContent=touchEnabled?"Unlock page scrolling":"Enable touch rotation";}
   if(a==="front"){yaw=pitch=0;distance=5.5;focusTarget.set(0,0,0);controls.querySelector("[data-view]").value="0";}
   if(a==="in")distance=clamp(distance-.4,3.3,8);if(a==="out")distance=clamp(distance+.4,3.3,8);
   if(a==="cut"){cutaway=!cutaway;b.setAttribute("aria-pressed",String(cutaway));b.textContent=cutaway?"Exterior":"Cutaway";meshes.forEach(m=>m.material.clippingPlanes=cutaway?[...bounds,clipping]:bounds);}
   draw();
  }));
  host.querySelectorAll("[data-option]").forEach(el=>el.addEventListener("change",()=>{
   if(el.dataset.option==="wall-highlight")wallHighlight=el.checked;if(el.dataset.option==="conduction")conduction=el.checked;if(el.dataset.option==="blood")blood=el.checked;if(el.dataset.option==="labels")labels=el.checked;if(el.dataset.option==="valves")showValves=el.checked;if(el.dataset.option==="label-mode")labelMode=el.value;host.dataset.labelMode=labelMode;sync({stage,playing,mechanical});
  }));
  try {
   const [heart,vessels]=await Promise.all([load(window.EcgHeartModelData.heart),load(window.EcgHeartModelData.vessels)]);
   if(disposed){[heart,vessels].forEach(s=>s.traverse(o=>{o.geometry?.dispose();o.material?.dispose();}));return {dispose,sync,selectStructures,refreshLayout:resize,inspect:()=>wallRims?.inspect()||null};}
   model.add(heart,vessels);model.updateMatrixWorld(true);
   const find=part=>{let hit;model.traverse(o=>{if(o.isMesh&&o.name.toLowerCase().includes(part))hit=o;});if(!hit)throw Error("Missing anatomical mesh: "+part);return hit;};
   const center=part=>new T.Box3().setFromObject(find(part)).getCenter(V());
   const ra=center("right_cardiac_atrium"),la=center("left_cardiac_atrium"),rv=center("right_ventricle"),lv=center("left_ventricle");
   const y=center("superior_vena_cava").sub(center("inferior_vena_cava")).normalize();
   const x=la.clone().sub(ra);x.addScaledVector(y,-x.dot(y)).normalize();const z=x.clone().cross(y).normalize();
   model.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x,y,z).invert());
   model.updateMatrixWorld(true);let box=new T.Box3().setFromObject(heart),mid=box.getCenter(V()),size=box.getSize(V());const scale=2.4/Math.max(size.y,size.x);
   model.scale.setScalar(scale);model.position.copy(mid.multiplyScalar(-scale));model.updateMatrixWorld(true);
   for(const [id,n] of Object.entries({ra:"right_cardiac_atrium",la:"left_cardiac_atrium",rv:"right_ventricle",lv:"left_ventricle",tv:"tricuspid_valve",mv:"mitral_valve",pv:"pulmonary_valve",av:"aortic_valve",svc:"superior_vena_cava",ivc:"inferior_vena_cava",pa:"pulmonary_trunk",aorta:"ascending_aorta",vein:"pulmonary_vein",septum:"interventricular_septum",papillary:"papillary_muscle",sinus:"coronary_sinus"}))points[id]=center(n);
   model.traverse(o=>{if(!o.isMesh)return;meshes.push(o);o.material?.dispose();const name=o.name.toLowerCase();const blue=/vena_cava|right_cardiac_atrium|right_ventricle|pulmonary_(artery|trunk)/.test(name);o.material=new T.MeshStandardMaterial({color:blue?0x6a91b3:0xbf716a,roughness:.65,metalness:0,side:T.DoubleSide,clippingPlanes:bounds});});
   for(const [id,part] of Object.entries({tv:"tricuspid_valve",mv:"mitral_valve",pv:"pulmonary_valve",av:"aortic_valve"}))valveMeshes[id]=find(part);
   for(const m of meshes.filter(m=>/cardiac_atrium|(?:left|right)_ventricle/.test(m.name))){
    const pivot=new T.Group(),world=new T.Box3().setFromObject(m).getCenter(V());scene.add(pivot);pivot.position.copy(world);pivot.attach(m);pivots.push({pivot,type:/atrium/.test(m.name)?"atrial":"vent"}); // modest illustrative contraction around each chamber
   }
   points.ivc.copy(points.ra.clone().add(points.ivc.clone().sub(points.ra).clampLength(0,1.0)));
   const p=points,front=v=>v.clone().add(V(0,0,.12));
   const sa=front(p.ra).add(V(-.08,.17,0)),avn=front(p.tv).add(V(.03,.06,0)),his=front(p.septum).lerp(avn,.55),apex=front(p.lv).add(V(0,-.24,0));
   curveLine([sa,front(p.ra),avn],0xffe66b,"atrial");curveLine([sa,front(p.la),front(p.mv)],0xffe66b,"atrial");
   curveLine([avn,his],0xffe66b,"av",.025);
   const rb=front(p.rv).lerp(apex,.4),lb=front(p.lv).lerp(apex,.4);
   curveLine([his,rb,front(p.rv).add(V(-.1,-.18,0))],0xffe66b,"vent");
   curveLine([his,lb,apex],0xffe66b,"vent");
   [p.rv,p.lv].forEach(v=>[-1,1].forEach(sign=>curveLine([front(v).add(V(0,-.22,0)),front(v).add(V(sign*.16,-.08,.02)),front(v).add(V(sign*.18,.07,.02))],0xffe66b,"vent",.009)));
   for(const [name,point] of [["SA",sa],["AV",avn]]){const mat=new T.MeshBasicMaterial({color:0xfff29b,depthTest:false});const o=new T.Mesh(new T.SphereGeometry(.04,10,8),mat);o.position.copy(point);o.renderOrder=13;overlays.add(o);paths.push({object:o,material:mat,phase:name==="SA"?"atrial":"av"});label(name,point,"conduction",name==="SA"?"sa":"avnode");}
   label("His",his,"conduction","his");label("RBB",rb,"conduction","rbb");label("LBB",lb,"conduction","lbb");label("Purkinje",apex,"conduction","purkinje");
   flow([front(p.svc),front(p.ra),front(p.tv),front(p.rv)],"fill",0x78d8ff);
   flow([front(p.ivc),front(p.ra),front(p.tv),front(p.rv)],"fill",0x78d8ff);
   meshes.filter(m=>/pulmonary_vein_/.test(m.name)).forEach(m=>flow([front(new T.Box3().setFromObject(m).getCenter(V())),front(p.la),front(p.mv),front(p.lv)],"fill",0xffa79a));
   flow([front(p.rv),front(p.pv),front(p.pa).add(V(0,.12,0))],"eject",0x78d8ff);
   flow([front(p.lv),front(p.av),front(p.aorta).add(V(0,.15,0))],"eject",0xffa79a);
   for(const [name,id] of [["TV","tv"],["MV","mv"],["Pulm V","pv"],["Aortic V","av"]])valveLabels[id]=label(structureNames[id],p[id].clone(),"valve",id);
   for(const [name,id] of [["Septum","septum"],["Papillary muscles","papillary"],["Coronary sinus","sinus"],["RA","ra"],["LA","la"],["RV","rv"],["LV","lv"],["SVC","svc"],["IVC","ivc"],["PA","pa"],["Aorta","aorta"],["PV","vein"]])label(structureNames[id]||name,p[id].clone(),"structure",id);
   labelItems.forEach(item=>{const m=meshes.find(m=>matches(m,item.id));if(m){item.mesh=m;item.local=m.worldToLocal(item.point.clone());}});
   wallRims=window.EcgWallRims?.create(T,scene,meshes);
   host.dataset.ready="true";host.dataset.meshes=String(meshes.length);host.dataset.flowArrows=String(flows.reduce((n,f)=>n+f.arrows.length,0));host.dataset.labelMode=labelMode;
   host.dataset.frontRightLeft=String(p.ra.x<p.la.x);
   document.addEventListener("visibilitychange",visibility);reduced.addEventListener?.("change",motion);
   observer=new ResizeObserver(resize);observer.observe(viewport);
   inter=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;cancelAnimationFrame(raf);if(visible)draw();});inter.observe(viewport);
   ready=true;resize();sync(initial);
  }catch(e){dispose();throw e;}
  return {dispose,sync,selectStructures,refreshLayout:resize,inspect:()=>wallRims?.inspect()||null};
 }
 return {mount};
})();
