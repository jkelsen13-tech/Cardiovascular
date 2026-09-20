/* Registered BodyParts3D thorax viewer. Source geometry and derived anchors are documented in assets/. */
"use strict";
window.LeadTorso3D = (() => {
  const T = window.EcgThree;
  const V = (x=0,y=0,z=0) => new T.Vector3(x,y,z);
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  const CHEST_IDS = ["v1","v2","v3","v4","v5","v6"];
  const VERIFIED_ANCHORS = {
    v1:[-.0239735,.0585575,.217840942], v2:[.0241852,.0585575,.218298008],
    v3:[.050172783,.02416625,.228197954], v4:[.076160365,-.010225,.218989514],
    v5:[.194262,-.010225,.118718248], v6:[.247363,-.010225,.0639755],
    ra:[-.245,.145,.07], la:[.245,.145,.07], rl:[-.15,-.29,.04], ll:[.15,-.29,.04]
  };
  const STRUCTURES = {
    sternum:["FJ3153","FJ3178","FJ3290"], clavicles:["FJ3237","FJ3362"],
    ribs:[" rib"], ics4:["FJ3231","FJ3232","FJ3248","FJ3251","FJ3339","FJ3340","FJ3341","FJ3342"],
    ics5:["FJ3232","FJ3233","FJ3251","FJ3254","FJ3341","FJ3342","FJ3343","FJ3344"]
  };

  function decode(source) {
    const binary=atob(source),bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    return bytes.buffer;
  }
  function load(source) {
    return new Promise((resolve,reject)=>new T.GLTFLoader().parse(decode(source),"",(gltf)=>resolve(gltf.scene),reject));
  }
  function nodeFj(node){return String(node.userData?.fj||node.name||"").split(/[ _]/)[0];}
  function leadAnchor(id){
    const supplied=window.LEAD_PLACEMENT?.leads?.find((item)=>item.id===id)?.anchor?.model;
    return V(...(Array.isArray(supplied)?supplied:VERIFIED_ANCHORS[id]));
  }

  async function mount(host,options={}) {
    let disposed=false,visible=true,touchEnabled=false,yaw=0,pitch=0,distance=1.42,pointerMoved=false;
    let active=options.active||"v1",layers={body:true,skeleton:true,muscle:false,landmarks:true,leads:true};
    let bodySurface="translucent",resizeObserver,intersectionObserver;
    const onSelect=typeof options.onSelect==="function"?options.onSelect:()=>{};
    const onSurfaceTap=typeof options.onSurfaceTap==="function"?options.onSurfaceTap:()=>{};
    const source=window.LeadTorsoModelData?.registered||window.LeadTorsoModelData?.thorax||window.LeadTorsoModelData?.skin;
    if(!T||!source)throw new Error("Registered thorax payload is unavailable");

    const scene=new T.Scene(),camera=new T.PerspectiveCamera(31,1,.01,20);
    const renderer=new T.WebGLRenderer({antialias:false,alpha:true,powerPreference:"low-power"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setClearColor(0x0d1623,1);
    const canvas=renderer.domElement;canvas.className="lead-3d-canvas";canvas.tabIndex=0;canvas.setAttribute("role","application");
    canvas.setAttribute("aria-label","Registered anatomical thorax. Arrow keys rotate, plus and minus zoom, and Home returns to the front. Lead markers and named anatomy can be selected.");
    host.replaceChildren();
    const viewport=document.createElement("div");viewport.className="lead-3d-viewport";
    const labelLayer=document.createElement("div");labelLayer.className="lead-3d-labels";labelLayer.setAttribute("aria-label","Lead positions");
    const left=document.createElement("div");left.className="lead-3d-side lead-3d-side-left";left.innerHTML="<strong>PATIENT RIGHT</strong><span>viewer left</span>";
    const right=document.createElement("div");right.className="lead-3d-side lead-3d-side-right";right.innerHTML="<strong>PATIENT LEFT</strong><span>viewer right</span>";
    viewport.append(canvas,labelLayer,left,right);host.append(viewport);

    scene.add(new T.HemisphereLight(0xf8fbff,0x26374d,1.35));
    const key=new T.DirectionalLight(0xfff7ed,1.75);key.position.set(-1.5,2.5,3);scene.add(key);
    const fill=new T.DirectionalLight(0x8ccfff,.62);fill.position.set(2,0,2);scene.add(fill);
    const root=new T.Group();scene.add(root);
    const landmarkGroup=new T.Group(),leadGroup=new T.Group(),feedbackGroup=new T.Group();root.add(landmarkGroup,leadGroup,feedbackGroup);
    const bodyMeshes=[],skeletonMeshes=[],muscleMeshes=[],structureMeshes=[],markerItems=[],landmarkItems=[],materials=[];
    let modelScene;

    function material(opts){const m=new T.MeshStandardMaterial(opts);materials.push(m);return m;}
    const palette={
      body:material({color:0xb9655b,roughness:.88,metalness:0,transparent:true,opacity:.14,depthWrite:false,side:T.DoubleSide}),
      bone:material({color:0xe0c58f,roughness:.8,metalness:0}),cartilage:material({color:0x79a7bd,roughness:.74,metalness:0}),
      muscle:material({color:0xa83f4c,roughness:.82,metalness:0,transparent:true,opacity:.72,side:T.DoubleSide})
    };
    function cloneMaterial(base){const m=base.clone();materials.push(m);return m;}
    function classify(mesh){
      const declared=mesh.userData?.layer;if(["body","skeleton","cartilage","muscle"].includes(declared))return declared;
      const fj=nodeFj(mesh);if(fj==="FJ2810")return "body";if(/^FJ14(?:46|47|64)M?$/.test(fj))return "muscle";
      if(["FJ3239","FJ3242","FJ3245","FJ3248","FJ3251","FJ3254","FJ3255","FJ3333","FJ3335","FJ3337","FJ3339","FJ3341","FJ3343","FJ3345"].includes(fj))return "cartilage";
      return "skeleton";
    }
    function structureId(mesh){const fj=nodeFj(mesh),name=String(mesh.name||"").toLowerCase();if(STRUCTURES.sternum.includes(fj))return "sternum";if(STRUCTURES.clavicles.includes(fj))return "clavicles";if(name.includes("rib"))return "ribs";if(name.includes("pectoralis"))return "muscle";return "skeleton";}

    modelScene=await load(source);
    if(disposed){modelScene.traverse((o)=>{o.geometry?.dispose();o.material?.dispose();});return {dispose(){}};}
    modelScene.traverse((o)=>{if(!o.isMesh)return;const kind=classify(o),base=kind==="body"?palette.body:kind==="muscle"?palette.muscle:kind==="cartilage"?palette.cartilage:palette.bone;o.material=cloneMaterial(base);o.userData.kind=kind;o.userData.structure=structureId(o);o.frustumCulled=true;if(kind==="body")bodyMeshes.push(o);else if(kind==="muscle")muscleMeshes.push(o);else{skeletonMeshes.push(o);structureMeshes.push(o);}});
    root.add(modelScene);

    function basic(color,opacity=1,depthTest=true){const m=new T.MeshBasicMaterial({color,transparent:opacity<1,opacity,depthTest,depthWrite:false});materials.push(m);return m;}
    function tube(id,points,color=0x7ce2ff,r=.0025,opacity=.92){const curve=new T.CatmullRomCurve3(points),mesh=new T.Mesh(new T.TubeGeometry(curve,24,r,7,false),basic(color,opacity,true));mesh.userData={id,structure:id,kind:"landmark"};mesh.renderOrder=8;landmarkGroup.add(mesh);landmarkItems.push(mesh);return mesh;}
    const gold=0xffda61,cyan=0x72e4ff;
    tube("right-sternal-border",[V(-.024,-.055,.219),V(-.024,.145,.202)],gold,.0023);tube("left-sternal-border",[V(.024,-.055,.219),V(.024,.145,.202)],gold,.0023);
    tube("ics4",[V(-.115,.050,.166),leadAnchor("v1"),leadAnchor("v2"),V(.115,.050,.177)],gold,.0032);tube("ics5",[V(-.02,-.012,.212),leadAnchor("v4"),V(.12,-.010,.194)],gold,.0032);
    tube("mcl",[V(.076,-.19,.165),leadAnchor("v4"),V(.076,.165,.16)],cyan,.0024);tube("aal",[V(.194,-.19,.11),leadAnchor("v5"),V(.194,.13,.13)],cyan,.0024);tube("mal",[V(.247,-.19,.03),leadAnchor("v6"),V(.247,.12,.055)],cyan,.0024);
    tube("v4-level",[leadAnchor("v4"),leadAnchor("v5"),leadAnchor("v6")],0xffffff,.0018,.72);

    function makeLeader(){const line=document.createElement("span");line.className="lead-3d-marker-line";line.setAttribute("aria-hidden","true");labelLayer.append(line);return line;}
    function addMarker(id,label,point,family="chest"){
      const group=new T.Group();group.position.copy(point);group.userData={id,family,structure:id};const color=family==="chest"?0xffd84d:0x72e4ff;
      const halo=new T.Mesh(new T.SphereGeometry(family==="chest"?.012:.009,16,10),basic(color,.96,true));halo.scale.z=.42;halo.renderOrder=12;halo.userData={id,structure:id};group.add(halo);
      const dot=new T.Mesh(new T.SphereGeometry(family==="chest"?.0045:.0035,12,8),basic(0x0d1623,1,true));dot.position.z=.004;dot.scale.z=.55;dot.renderOrder=13;group.add(dot);leadGroup.add(group);
      const button=document.createElement("button");button.type="button";button.className=`lead-3d-marker-button ${family}`;button.dataset.marker=id;button.textContent=label;button.setAttribute("aria-label",family==="limb"?`${label} external limb-electrode teaching label`:`${label} placement marker`);button.addEventListener("click",()=>onSelect(id,{modelPoint:point.toArray()}));
      const leader=makeLeader();labelLayer.append(button);markerItems.push({id,label,point:point.clone(),group,button,leader,family});
    }
    CHEST_IDS.forEach((id)=>addMarker(id,id.toUpperCase(),leadAnchor(id)));addMarker("ra","RA",leadAnchor("ra"),"limb");addMarker("la","LA",leadAnchor("la"),"limb");addMarker("rl","RL ↓",leadAnchor("rl"),"limb");addMarker("ll","LL ↓",leadAnchor("ll"),"limb");

    function cameraPose(){camera.position.set(Math.sin(yaw)*distance,.015+Math.sin(pitch)*distance*.45,Math.cos(yaw)*distance);camera.lookAt(0,0,.08);}
    function worldPoint(local){const p=local.clone();root.localToWorld(p);return p;}
    function occluded(point){if(bodySurface!=="opaque")return false;return worldPoint(point).z<-.015;}
    function candidatePositions(base,id,family,width,height,boxWidth,boxHeight){const preferred={v1:[-30,-25],v2:[30,-27],v3:[34,-9],v4:[30,15],v5:[34,-20],v6:[36,16],ra:[-32,-8],la:[32,-8],rl:[-28,18],ll:[28,18]}[id]||[0,-28],extra=family==="limb"?54:48;const [dx,dy]=preferred,offsets=[[dx,dy],[dx,dy-extra],[dx,dy+extra],[dx,dy-extra*2],[dx,dy+extra*2],[dx-extra,dy],[dx+extra,dy],[dx-extra,dy-extra],[dx+extra,dy+extra],[0,-extra],[0,extra],[0,-extra*2],[0,extra*2]],halfW=boxWidth/2+4,halfH=boxHeight/2+4;return offsets.map(([x,y])=>({x:clamp(base.x+x,halfW,width-halfW),y:clamp(base.y+y,halfH,height-halfH),width:boxWidth,height:boxHeight}));}
    // Compare the rendered button boxes, not nominal centers: system fonts can
    // make a label wider in one browser than another.
    function overlap(a,b){return Math.abs(a.x-b.x)<(a.width+b.width)/2+6&&Math.abs(a.y-b.y)<(a.height+b.height)/2+6;}
    function placeLeader(item,base,pos){const dx=pos.x-base.x,dy=pos.y-base.y,len=Math.hypot(dx,dy),angle=Math.atan2(dy,dx)*180/Math.PI;item.leader.style.left=base.x+"px";item.leader.style.top=base.y+"px";item.leader.style.width=Math.max(0,len-12)+"px";item.leader.style.transform=`rotate(${angle}deg)`;}
    function projectLabels(){const rect=viewport.getBoundingClientRect(),placed=[];markerItems.forEach((item)=>{const p=worldPoint(item.point);p.project(camera);const base={x:(p.x*.5+.5)*rect.width,y:(-p.y*.5+.5)*rect.height},hidden=!layers.leads||p.z>1||p.z< -1||Math.abs(p.x)>1.08||Math.abs(p.y)>1.08||occluded(item.point);item.button.hidden=hidden;item.leader.hidden=hidden;if(hidden)return;const boxWidth=Math.max(44,item.button.offsetWidth),boxHeight=Math.max(44,item.button.offsetHeight),candidates=candidatePositions(base,item.id,item.family,rect.width,rect.height,boxWidth,boxHeight),pos=candidates.find((next)=>!placed.some((other)=>overlap(next,other)))||candidates[0];placed.push(pos);item.button.style.left=pos.x+"px";item.button.style.top=pos.y+"px";placeLeader(item,base,pos);});}
    function draw(){if(disposed||document.hidden||!visible)return;cameraPose();renderer.render(scene,camera);projectLabels();}
    function resize(){if(disposed)return;const width=Math.max(280,viewport.clientWidth),height=Math.max(360,Math.min(560,width*1.08));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();draw();}
    function applyLayers(next=layers){layers={...layers,...next};bodyMeshes.forEach((o)=>o.visible=layers.body&&bodySurface!=="hidden");skeletonMeshes.forEach((o)=>o.visible=layers.skeleton);muscleMeshes.forEach((o)=>o.visible=layers.muscle);landmarkGroup.visible=layers.landmarks;leadGroup.visible=layers.leads;host.dataset.layers=Object.entries(layers).filter(([,value])=>value).map(([key])=>key).join(",");draw();}
    function setBodyOpacity(value){bodySurface=["opaque","translucent","hidden"].includes(value)?value:"translucent";bodyMeshes.forEach((o)=>{o.visible=layers.body&&bodySurface!=="hidden";o.material.opacity=bodySurface==="opaque"?.94:.14;o.material.transparent=bodySurface!=="opaque";o.material.depthWrite=bodySurface==="opaque";});host.dataset.bodySurface=bodySurface;draw();}
    function matchesStructure(mesh,id){const fj=nodeFj(mesh),name=String(mesh.name||"").toLowerCase(),selectors=STRUCTURES[id]||[];return selectors.some((selector)=>selector.startsWith("FJ")?fj===selector:name.includes(selector.trim()));}
    function highlight(ids){const selected=new Set(Array.isArray(ids)?ids:[ids]);active=[...selected][0]||"";host.dataset.highlight=[...selected].join(",");markerItems.forEach((item)=>{const on=selected.has(item.id);item.group.scale.setScalar(on?1.38:.82);item.group.children.forEach((o)=>{if(o.material)o.material.opacity=on?1:.45;});item.button.dataset.active=String(on);item.button.dataset.dimmed=String(!on);item.button.setAttribute("aria-current",on?"true":"false");});landmarkItems.forEach((item)=>{const on=selected.has(item.userData.id);item.material.opacity=on?1:.2;item.scale.setScalar(on?1.6:1);});structureMeshes.forEach((mesh)=>{const on=[...selected].some((id)=>matchesStructure(mesh,id)||mesh.userData.structure===id);mesh.material.emissive.setHex(on?0xffa600:0x000000);mesh.material.emissiveIntensity=on?.58:0;});draw();}
    function setPose(nextYaw,nextPitch=0,nextDistance=1.42){yaw=clamp(nextYaw,-1.05,1.05);pitch=clamp(nextPitch,-.32,.32);distance=clamp(nextDistance,1.05,2.2);draw();}
    function front(){setPose(0,0,1.42);}function oblique(side){setPose(side==="left"?.72:-.72,-.02,1.45);}function zoom(delta){setPose(yaw,pitch,distance+delta);}
    function showQuizResult(result={}){while(feedbackGroup.children.length){const child=feedbackGroup.children.pop();child.geometry?.dispose();child.material?.dispose();}if(Array.isArray(result.point)){const dot=new T.Mesh(new T.SphereGeometry(.009,14,8),basic(0xff655f,1,true));dot.position.fromArray(result.point);feedbackGroup.add(dot);}if(result.correctId){const correct=new T.Mesh(new T.SphereGeometry(.016,16,10),basic(0x66f0a8,.82,true));correct.scale.z=.35;correct.position.copy(leadAnchor(result.correctId));feedbackGroup.add(correct);}draw();}

    const pointers=new Map();let pinch=0,startPoint=null;
    function canvasPoint(e){const rect=canvas.getBoundingClientRect();return {x:(e.clientX-rect.left)/rect.width*2-1,y:-(e.clientY-rect.top)/rect.height*2+1,pixelX:e.clientX-rect.left,pixelY:e.clientY-rect.top,rect};}
    function screenPoint(local,rect){const p=worldPoint(local);p.project(camera);return {x:(p.x*.5+.5)*rect.width,y:(-p.y*.5+.5)*rect.height};}
    function closestPointOnViewRay(normalized,target){const origin=camera.position.clone(),through=V(normalized.x,normalized.y,.5).unproject(camera),direction=through.sub(origin).normalize();root.worldToLocal(origin);root.worldToLocal(through.copy(camera.position).add(direction));direction.copy(through).sub(origin).normalize();const t=Math.max(0,target.clone().sub(origin).dot(direction));return origin.add(direction.multiplyScalar(t));}
    function selectAt(e){const n=canvasPoint(e),candidates=markerItems.map((item)=>({id:item.id,point:item.point})).concat([
      {id:"sternum",point:V(0,.08,.205)},{id:"clavicles",point:V(0,.16,.17)},{id:"ribs",point:V(-.105,.025,.14)},
      {id:"ics4",point:V(0,.052,.218)},{id:"ics5",point:V(.06,-.01,.211)},{id:"mcl",point:V(.076,.09,.18)},
      {id:"aal",point:V(.194,.06,.12)},{id:"mal",point:V(.247,.05,.064)}
    ]),nearestScreen=candidates.map((item)=>{const projected=screenPoint(item.point,n.rect);return {...item,distance:Math.hypot(projected.x-n.pixelX,projected.y-n.pixelY)};}).sort((a,b)=>a.distance-b.distance)[0];
      if(nearestScreen&&nearestScreen.distance<=24){onSelect(nearestScreen.id,{modelPoint:nearestScreen.point.toArray()});return;}
      let nearest=null,distanceToNearest=Infinity,pickedPoint=null;CHEST_IDS.forEach((id)=>{const anchor=leadAnchor(id),point=closestPointOnViewRay(n,anchor),distance=point.distanceTo(anchor);if(distance<distanceToNearest){nearest=id;distanceToNearest=distance;pickedPoint=point;}});onSurfaceTap({point:pickedPoint?.toArray()||null,nearest,distance:distanceToNearest});}
    canvas.addEventListener("pointerdown",(e)=>{if(e.pointerType==="touch"&&!touchEnabled)return;canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);startPoint=[e.clientX,e.clientY];pointerMoved=false;});
    canvas.addEventListener("pointermove",(e)=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);if(Math.hypot(e.clientX-startPoint[0],e.clientY-startPoint[1])>5)pointerMoved=true;if(pointers.size===1){yaw=clamp(yaw-(e.clientX-old[0])*.006,-1.05,1.05);pitch=clamp(pitch+(e.clientY-old[1])*.005,-.32,.32);}else{const a=[...pointers.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(pinch)distance=clamp(distance*pinch/d,1.05,2.2);pinch=d;}draw();});
    ["pointerup","pointercancel"].forEach((name)=>canvas.addEventListener(name,(e)=>{const shouldSelect=name==="pointerup"&&!pointerMoved&&!(e.pointerType==="touch"&&!touchEnabled);pointers.delete(e.pointerId);pinch=0;if(shouldSelect)selectAt(e);}));
    canvas.addEventListener("wheel",(e)=>{e.preventDefault();zoom(Math.sign(e.deltaY)*.12);},{passive:false});
    canvas.addEventListener("keydown",(e)=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","Home"].includes(e.key))return;e.preventDefault();e.stopPropagation();if(e.key==="ArrowLeft")yaw=clamp(yaw-.12,-1.05,1.05);if(e.key==="ArrowRight")yaw=clamp(yaw+.12,-1.05,1.05);if(e.key==="ArrowUp")pitch=clamp(pitch+.08,-.32,.32);if(e.key==="ArrowDown")pitch=clamp(pitch-.08,-.32,.32);if(e.key==="+"||e.key==="=")zoom(-.12);else if(e.key==="-")zoom(.12);else if(e.key==="Home")front();else draw();});
    function contextLost(e){e.preventDefault();if(!disposed)options.onFailure?.("3D graphics became unavailable. The 2D placement diagram remains active.");dispose();}canvas.addEventListener("webglcontextlost",contextLost);
    function setTouch(enabled){touchEnabled=!!enabled;pointers.clear();canvas.style.touchAction=touchEnabled?"none":"pan-y";host.dataset.touch=String(touchEnabled);}function visibilityChange(){if(!document.hidden)draw();}
    document.addEventListener("visibilitychange",visibilityChange);resizeObserver=new ResizeObserver(resize);resizeObserver.observe(viewport);intersectionObserver=new IntersectionObserver((entries)=>{visible=entries[0]?.isIntersecting!==false;if(visible)draw();},{threshold:.01});intersectionObserver.observe(viewport);
    applyLayers();setBodyOpacity("translucent");highlight(options.highlights||[active]);resize();host.dataset.ready="true";host.dataset.triangles="194563";host.dataset.structures="50";host.dataset.bodyMeshes=String(bodyMeshes.length);host.dataset.skeletonMeshes=String(skeletonMeshes.length);host.dataset.muscleMeshes=String(muscleMeshes.length);host.dataset.markers=String(markerItems.length);host.dataset.frontRightLeft="true";host.dataset.registeredAnatomy="true";host.dataset.source="BodyParts3D";
    function dispose(){if(disposed)return;disposed=true;resizeObserver?.disconnect();intersectionObserver?.disconnect();document.removeEventListener("visibilitychange",visibilityChange);canvas.removeEventListener("webglcontextlost",contextLost);scene.traverse((o)=>o.geometry?.dispose());materials.forEach((m)=>m.dispose());renderer.dispose();renderer.forceContextLoss();host.replaceChildren();}
    function setView(preset){if(preset==="left-oblique")oblique("left");else if(preset==="right-oblique")oblique("right");else front();}
    return {dispose,draw,front,reset:front,oblique,setView,zoom,setTouch,setLayers:applyLayers,setBodyOpacity,highlight,showQuizResult,select:(id)=>onSelect(id)};
  }
  return {mount};
})();
