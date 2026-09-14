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
  let touchEnabled=false;
  let visible=true, cutaway=false, conduction=true, blood=true, labels=true, yaw=0,pitch=0,distance=5.5;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const scene=new T.Scene(), camera=new T.PerspectiveCamera(38,1,.01,100);
  const renderer=new T.WebGLRenderer({antialias:false,alpha:true,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
  renderer.localClippingEnabled=true;
  renderer.setClearColor(0x141a24,1);
  const canvas=renderer.domElement;canvas.className="ecg-3d-canvas";canvas.tabIndex=0;
  canvas.setAttribute("role","img");canvas.setAttribute("aria-label","Rotatable anatomical heart. Arrow keys rotate; plus and minus zoom. Front view restores patient orientation.");
  host.innerHTML='<div class="ecg-3d-toolbar"><button type="button" data-action="cut" aria-pressed="false">Cutaway</button><button type="button" data-action="front">Reset / front view</button><button type="button" data-action="in" aria-label="Zoom in">Zoom +</button><button type="button" data-action="out" aria-label="Zoom out">Zoom −</button><button type="button" data-action="touch" aria-pressed="false">Enable touch rotation</button></div><div class="ecg-3d-viewport"><div class="ecg-3d-labels" aria-hidden="true"></div></div><div class="ecg-3d-options"><label><input type="checkbox" data-option="conduction" checked>Conduction</label><label><input type="checkbox" data-option="blood" checked>Blood flow</label><label><input type="checkbox" data-option="labels" checked>Labels</label></div><p class="ecg-3d-help">Mouse drag rotates. Touch scrolls the page by default; enable touch rotation for orbit and pinch, then unlock page scrolling. Arrow keys rotate when the heart has focus. Labels show anatomical structures; bright paths and arrows are teaching overlays.</p><p class="ecg-3d-direction" role="status"></p><details class="ecg-3d-key"><summary>Structure and flow key</summary><p>RA: right atrium; LA: left atrium; RV: right ventricle; LV: left ventricle. SVC/IVC: superior/inferior vena cava; PA: pulmonary artery; PV: pulmonary veins. In cutaway: TV = tricuspid valve; MV = mitral valve; Pulm V = pulmonary valve; Aortic V = aortic valve.</p><p>Deoxygenated blood: SVC/IVC → RA → tricuspid valve → RV → pulmonary valve → PA. Oxygenated blood: PV → LA → mitral valve → LV → aortic valve → aorta.</p><p>SA → atria → AV → His → right/left bundle branches → Purkinje. Overlays and chamber motion are schematic, not a patient-specific electrophysiology or fluid simulation.</p></details>';
  const viewport=host.querySelector(".ecg-3d-viewport");viewport.prepend(canvas);
  const labelLayer=host.querySelector(".ecg-3d-labels"), direction=host.querySelector(".ecg-3d-direction");
  const model=new T.Group();scene.add(model);
  scene.add(new T.HemisphereLight(0xffffff,0x53647a,2.5));
  const key=new T.DirectionalLight(0xffffff,3);key.position.set(-3,5,6);scene.add(key);
  const fill=new T.DirectionalLight(0xb9d7ff,1.3);fill.position.set(4,-1,-3);scene.add(fill);
  const overlays=new T.Group();scene.add(overlays);
  const clipping=new T.Plane(V(0,0,-1),.12);
  const meshes=[],points={},labelItems=[],pivots=[],paths=[],flows=[];
  let ready=false;
  function dispose(){
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
   const box=viewport.getBoundingClientRect();
   labelItems.forEach(({el,point,kind})=>{el.hidden=!labels||(kind==="conduction"&&!conduction)||(kind==="valve"&&!cutaway);if(el.hidden)return;const p=point.clone().project(camera);el.style.left=(p.x*.5+.5)*box.width+"px";el.style.top=(-p.y*.5+.5)*box.height+"px";el.hidden=p.z>1||p.z< -1;});
  }
  function draw(time=0){
   if(disposed||!ready||document.hidden||!visible)return;
   cancelAnimationFrame(raf);
   camera.position.set(Math.sin(yaw)*Math.cos(pitch)*distance,Math.sin(pitch)*distance,Math.cos(yaw)*Math.cos(pitch)*distance);camera.lookAt(0,0,0);
   const moving=playing&&!reduced.matches;
   const pulse=moving?.5+.5*Math.sin(time*.006):1;
   const atrial=stage==="p",vent=stage==="qrs"||stage==="st";
   pivots.forEach(({pivot,type})=>{const active=type==="atrial"?atrial:vent;pivot.scale.setScalar(active?1-.035*pulse:1);});
   flows.forEach(f=>{
    const phase=(stage==="p"||stage==="pr"||stage==="tp")?"fill":(stage==="qrs"||stage==="st")?"eject":"none";
    const active=f.phase===phase;
    f.group.visible=blood&&active;
    f.arrows.forEach((a,i)=>{const t=((moving?time*.00014:0)+i/3+.12)%1;const p=f.curve.getPoint(t);a.position.copy(p);a.quaternion.setFromUnitVectors(V(0,1,0),f.curve.getTangent(t).normalize());});
   });
   renderer.render(scene,camera);renderLabels();
   if(moving)raf=requestAnimationFrame(draw);
  }
  function sync(next){
   stage=next.stage;playing=next.playing;host.dataset.stage=stage;
   const atrial=stage==="p",vent=stage==="qrs"||stage==="st",repol=stage==="t";
   meshes.forEach(m=>{const n=m.name;const active=/atrium/.test(n)?atrial:/ventricle|septum/.test(n)?vent:false;m.material.emissive.set(active?0x773219:repol&&/ventricle/.test(n)?0x423073:0);m.material.emissiveIntensity=active?.8:.4;});
   paths.forEach(p=>{p.object.visible=conduction;const active=p.phase==="atrial"?atrial:p.phase==="av"?stage==="pr":p.phase==="vent"?stage==="qrs":false;p.material.color.set(active?0xffe66b:0x8398a5);p.material.opacity=active?1:.32;});
   direction.textContent={p:"Atria depolarize and contract; arrows show atrial flow into the ventricles.",pr:"AV nodal delay; ventricular filling continues.",qrs:"His–Purkinje activation depolarizes the ventricles; contraction and ejection follow.",st:"Ventricles remain depolarized; schematic ejection continues.",t:"Ventricular repolarization and relaxation; ejection arrows fade.",u:"U wave: possible late recovery. No separate mechanical event is assigned.",tp:"Electrical baseline; schematic passive filling."}[stage];
   draw();
  }
  function label(text,point,kind="structure"){
   const el=document.createElement("span");el.className="ecg-3d-label";el.textContent=text;el.dataset.kind=kind;labelLayer.append(el);labelItems.push({el,point,kind});
  }
  function curveLine(coords,color,phase,r=.015){
   const curve=new T.CatmullRomCurve3(coords);
   const mat=new T.MeshBasicMaterial({color,transparent:true,opacity:1,depthTest:false});
   const obj=new T.Mesh(new T.TubeGeometry(curve,24,r,5,false),mat);obj.renderOrder=10;overlays.add(obj);paths.push({object:obj,material:mat,phase});return curve;
  }
  function flow(coords,phase,color){
   const curve=new T.CatmullRomCurve3(coords),group=new T.Group();overlays.add(group);
   const material=new T.MeshBasicMaterial({color,transparent:true,opacity:.8,depthTest:false});
   const tube=new T.Mesh(new T.TubeGeometry(curve,32,.009,4,false),material);tube.renderOrder=11;group.add(tube);
   const arrows=[];
   for(let i=0;i<3;i++){const a=new T.Mesh(new T.ConeGeometry(.045,.12,7),material);a.renderOrder=12;group.add(a);arrows.push(a);}
   flows.push({group,curve,phase,arrows});
  }
  const drag=new Map();let last;
  function pointerDown(e){if(e.pointerType==="touch"&&!touchEnabled)return;canvas.setPointerCapture(e.pointerId);drag.set(e.pointerId,[e.clientX,e.clientY]);last=null;}
  function pointerMove(e){
   if(!drag.has(e.pointerId))return;
   const prior=drag.get(e.pointerId);drag.set(e.pointerId,[e.clientX,e.clientY]);
   if(drag.size===1){yaw-=(e.clientX-prior[0])*.008;pitch=clamp(pitch+(e.clientY-prior[1])*.008,-1.1,1.1);}
   else {const a=[...drag.values()];const d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(last)distance=clamp(distance*last/d,3.3,8);last=d;}
   draw();
  }
  canvas.addEventListener("pointerdown",pointerDown);canvas.addEventListener("pointermove",pointerMove);
  ["pointerup","pointercancel"].forEach(ev=>canvas.addEventListener(ev,e=>{drag.delete(e.pointerId);last=null;}));
  canvas.addEventListener("wheel",e=>{e.preventDefault();distance=clamp(distance+Math.sign(e.deltaY)*.3,3.3,8);draw();},{passive:false});
  canvas.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","Home"].includes(e.key)){e.preventDefault();e.stopPropagation();if(e.key==="ArrowLeft")yaw-=.15;if(e.key==="ArrowRight")yaw+=.15;if(e.key==="ArrowUp")pitch=clamp(pitch+.15,-1.1,1.1);if(e.key==="ArrowDown")pitch=clamp(pitch-.15,-1.1,1.1);if(e.key==="+"||e.key==="=")distance=clamp(distance-.3,3.3,8);if(e.key==="-")distance=clamp(distance+.3,3.3,8);if(e.key==="Home"){yaw=pitch=0;distance=5.5;}draw();}});
  canvas.addEventListener("webglcontextlost",e=>{e.preventDefault();if(!disposed){dispose();failed("3D graphics became unavailable. The simplified view is still usable.");}});
  host.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>{
   const a=b.dataset.action;if(a==="touch"){touchEnabled=!touchEnabled;drag.clear();last=null;canvas.style.touchAction=touchEnabled?"none":"pan-y";b.setAttribute("aria-pressed",String(touchEnabled));b.textContent=touchEnabled?"Unlock page scrolling":"Enable touch rotation";}
   if(a==="front"){yaw=pitch=0;distance=5.5;}
   if(a==="in")distance=clamp(distance-.4,3.3,8);if(a==="out")distance=clamp(distance+.4,3.3,8);
   if(a==="cut"){cutaway=!cutaway;b.setAttribute("aria-pressed",String(cutaway));b.textContent=cutaway?"Exterior":"Cutaway";meshes.forEach(m=>m.material.clippingPlanes=cutaway?[clipping]:[]);}
   draw();
  }));
  host.querySelectorAll("[data-option]").forEach(el=>el.addEventListener("change",()=>{
   if(el.dataset.option==="conduction")conduction=el.checked;if(el.dataset.option==="blood")blood=el.checked;if(el.dataset.option==="labels")labels=el.checked;sync({stage,playing});
  }));
  try {
   const [heart,vessels]=await Promise.all([load(window.EcgHeartModelData.heart),load(window.EcgHeartModelData.vessels)]);
   if(disposed){[heart,vessels].forEach(s=>s.traverse(o=>{o.geometry?.dispose();o.material?.dispose();}));return {dispose,sync};}
   model.add(heart,vessels);model.updateMatrixWorld(true);
   const find=part=>{let hit;model.traverse(o=>{if(o.isMesh&&o.name.toLowerCase().includes(part))hit=o;});if(!hit)throw Error("Missing anatomical mesh: "+part);return hit;};
   const center=part=>new T.Box3().setFromObject(find(part)).getCenter(V());
   const ra=center("right_cardiac_atrium"),la=center("left_cardiac_atrium"),rv=center("right_ventricle"),lv=center("left_ventricle");
   const x=la.clone().sub(ra).normalize(),y=ra.clone().add(la).sub(rv).sub(lv).normalize();y.addScaledVector(x,-y.dot(x)).normalize();const z=x.clone().cross(y).normalize();
   model.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x,y,z).invert());
   model.updateMatrixWorld(true);let box=new T.Box3().setFromObject(model),mid=box.getCenter(V()),size=box.getSize(V());const scale=2.8/Math.max(size.y,size.x);
   model.scale.setScalar(scale);model.position.copy(mid.multiplyScalar(-scale));model.updateMatrixWorld(true);
   for(const [id,n] of Object.entries({ra:"right_cardiac_atrium",la:"left_cardiac_atrium",rv:"right_ventricle",lv:"left_ventricle",tv:"tricuspid_valve",mv:"mitral_valve",pv:"pulmonary_valve",av:"aortic_valve",svc:"superior_vena_cava",ivc:"inferior_vena_cava",pa:"pulmonary_trunk",aorta:"ascending_aorta",vein:"pulmonary_vein",septum:"interventricular_septum"}))points[id]=center(n);
   model.traverse(o=>{if(!o.isMesh)return;meshes.push(o);o.material?.dispose();const name=o.name.toLowerCase();const blue=/vena_cava|right_cardiac_atrium|right_ventricle|pulmonary_(artery|trunk)/.test(name);o.material=new T.MeshStandardMaterial({color:blue?0x6a91b3:0xbf716a,roughness:.65,metalness:0,side:T.DoubleSide});});
   for(const m of meshes.filter(m=>/cardiac_atrium|(?:left|right)_ventricle/.test(m.name))){
    const pivot=new T.Group(),world=new T.Box3().setFromObject(m).getCenter(V());scene.add(pivot);pivot.position.copy(world);pivot.attach(m);pivots.push({pivot,type:/atrium/.test(m.name)?"atrial":"vent"}); // modest illustrative contraction around each chamber
   }
   const p=points,front=v=>v.clone().add(V(0,0,.12));
   const sa=front(p.ra).add(V(-.08,.17,0)),avn=front(p.tv).add(V(.03,.06,0)),his=front(p.septum).lerp(avn,.55),apex=front(p.lv).add(V(0,-.24,0));
   curveLine([sa,front(p.ra),avn],0xffe66b,"atrial");curveLine([sa,front(p.la),front(p.mv)],0xffe66b,"atrial");
   curveLine([avn,his],0xffe66b,"av",.025);
   const rb=front(p.rv).lerp(apex,.4),lb=front(p.lv).lerp(apex,.4);
   curveLine([his,rb,front(p.rv).add(V(-.1,-.18,0))],0xffe66b,"vent");
   curveLine([his,lb,apex],0xffe66b,"vent");
   [p.rv,p.lv].forEach(v=>[-1,1].forEach(sign=>curveLine([front(v).add(V(0,-.22,0)),front(v).add(V(sign*.16,-.08,.02)),front(v).add(V(sign*.18,.07,.02))],0xffe66b,"vent",.009)));
   for(const [name,point] of [["SA",sa],["AV",avn]]){const mat=new T.MeshBasicMaterial({color:0xfff29b,depthTest:false});const o=new T.Mesh(new T.SphereGeometry(.04,10,8),mat);o.position.copy(point);o.renderOrder=13;overlays.add(o);paths.push({object:o,material:mat,phase:name==="SA"?"atrial":"av"});label(name,point,"conduction");}
   label("His",his,"conduction");label("RBB",rb,"conduction");label("LBB",lb,"conduction");label("Purkinje",apex,"conduction");
   flow([front(p.svc),front(p.ra),front(p.tv),front(p.rv)],"fill",0x78d8ff);
   flow([front(p.ivc),front(p.ra),front(p.tv),front(p.rv)],"fill",0x78d8ff);
   meshes.filter(m=>/pulmonary_vein_/.test(m.name)).forEach(m=>flow([front(new T.Box3().setFromObject(m).getCenter(V())),front(p.la),front(p.mv),front(p.lv)],"fill",0xffa79a));
   flow([front(p.rv),front(p.pv),front(p.pa).add(V(0,.12,0))],"eject",0x78d8ff);
   flow([front(p.lv),front(p.av),front(p.aorta).add(V(0,.15,0))],"eject",0xffa79a);
   for(const [name,id] of [["TV","tv"],["MV","mv"],["Pulm V","pv"],["Aortic V","av"]])label(name,front(p[id]),"valve");
   for(const [name,id] of [["RA","ra"],["LA","la"],["RV","rv"],["LV","lv"],["SVC","svc"],["IVC","ivc"],["PA","pa"],["Aorta","aorta"],["PV","vein"]])label(name,front(p[id]));
   host.dataset.ready="true";host.dataset.meshes=String(meshes.length);
   host.dataset.frontRightLeft=String(p.ra.x<p.la.x);
   document.addEventListener("visibilitychange",visibility);reduced.addEventListener?.("change",motion);
   observer=new ResizeObserver(resize);observer.observe(viewport);
   inter=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;cancelAnimationFrame(raf);if(visible)draw();});inter.observe(viewport);
   ready=true;resize();sync(initial);
  }catch(e){dispose();throw e;}
  return {dispose,sync};
 }
 return {mount};
})();
