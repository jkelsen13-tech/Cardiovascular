/* HRA skin surface plus explicitly schematic lead-placement teaching overlays. */
"use strict";
window.LeadTorso3D = (() => {
  const T = window.EcgThree;
  const V = (x=0,y=0,z=0) => new T.Vector3(x,y,z);
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  const decode = (source) => {
    const binary = atob(source), bytes = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    return bytes.buffer;
  };
  const load = (source) => new Promise((resolve,reject) => {
    new T.GLTFLoader().parse(decode(source),"",(gltf)=>resolve(gltf.scene),reject);
  });

  async function mount(host, options={}) {
    let disposed=false, visible=true, touchEnabled=false, yaw=0, pitch=0, distance=4.0;
    let active=options.active||"v1", layers={body:true,skeleton:true,muscle:false,landmarks:true,leads:true};
    let bodyOpacity=0.34, resizeObserver, intersectionObserver;
    const onSelect=typeof options.onSelect==="function"?options.onSelect:()=>{};
    const scene=new T.Scene();
    const camera=new T.PerspectiveCamera(34,1,.01,50);
    const renderer=new T.WebGLRenderer({antialias:false,alpha:true,powerPreference:"low-power"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.setClearColor(0x101722,1);
    const canvas=renderer.domElement;
    canvas.className="lead-3d-canvas";
    canvas.tabIndex=0;
    canvas.setAttribute("role","img");
    canvas.setAttribute("aria-label","Interactive front-facing upper torso. Arrow keys rotate and plus or minus zoom. Marker buttons identify lead positions.");
    host.replaceChildren();
    const viewport=document.createElement("div");viewport.className="lead-3d-viewport";
    const labelLayer=document.createElement("div");labelLayer.className="lead-3d-labels";
    const left=document.createElement("div");left.className="lead-3d-side lead-3d-side-left";left.innerHTML="<strong>PATIENT RIGHT</strong><span>viewer left</span>";
    const right=document.createElement("div");right.className="lead-3d-side lead-3d-side-right";right.innerHTML="<strong>PATIENT LEFT</strong><span>viewer right</span>";
    viewport.append(canvas,labelLayer,left,right);host.append(viewport);

    scene.add(new T.HemisphereLight(0xf8fbff,0x32445d,2.5));
    const key=new T.DirectionalLight(0xffffff,3.2);key.position.set(-2,4,5);scene.add(key);
    const fill=new T.DirectionalLight(0x9bc7ff,1.2);fill.position.set(3,1,2);scene.add(fill);
    const anatomy=new T.Group();anatomy.scale.setScalar(2.5);anatomy.position.y=-.82;scene.add(anatomy);
    const bodyGroup=new T.Group(),skeletonGroup=new T.Group(),muscleGroup=new T.Group(),landmarkGroup=new T.Group(),leadGroup=new T.Group();
    anatomy.add(bodyGroup,skeletonGroup,muscleGroup,landmarkGroup,leadGroup);
    const markerItems=[];
    const materials=[];

    function mat(color,opacity=1,depthTest=true){const m=new T.MeshBasicMaterial({color,transparent:opacity<1,opacity,depthTest});materials.push(m);return m;}
    function lineMaterial(color,opacity=1){const m=new T.LineBasicMaterial({color,transparent:opacity<1,opacity,depthTest:false});materials.push(m);return m;}
    function tube(points,color,r=.006,opacity=1,group=landmarkGroup){const curve=new T.CatmullRomCurve3(points);const mesh=new T.Mesh(new T.TubeGeometry(curve,32,r,6,false),mat(color,opacity,false));mesh.renderOrder=7;group.add(mesh);return mesh;}
    function surfaceZ(x){return .151-Math.abs(x)*.115;}

    function addSkeleton(){
      const bone=0xf2e8cf;
      tube([V(0,.17,.115),V(0,.50,.115)],bone,.018,.9,skeletonGroup);
      tube([V(0,.53,.12),V(-.10,.535,.125),V(-.23,.505,.105)],bone,.012,.9,skeletonGroup);
      tube([V(0,.53,.12),V(.10,.535,.125),V(.23,.505,.105)],bone,.012,.9,skeletonGroup);
      for(let i=0;i<7;i++){
        const y=.47-i*.052,w=.15+i*.015,z=.105-i*.002,pts=[];
        for(let n=0;n<=24;n++){const t=Math.PI*n/24;pts.push(V(Math.cos(t)*w,y-Math.sin(t)*.025,z+Math.sin(t)*.025));}
        tube(pts,bone,.006,.76,skeletonGroup);
      }
      skeletonGroup.children.forEach((o)=>{o.userData.structure="skeleton";});
    }
    function addMuscle(){
      [-1,1].forEach((side)=>{const mesh=new T.Mesh(new T.SphereGeometry(1,20,12),mat(0xb94f59,.36,false));mesh.position.set(side*.13,.37,.142);mesh.scale.set(.12,.145,.018);mesh.renderOrder=5;muscleGroup.add(mesh);});
    }
    function addLandmarks(){
      const gold=0xf7d66d,cyan=0x7ce2ff;
      tube([V(-.035,.17,.154),V(-.035,.53,.143)],gold,.004,1,landmarkGroup).userData.id="right-sternal-border";
      tube([V(.035,.17,.154),V(.035,.53,.143)],gold,.004,1,landmarkGroup).userData.id="left-sternal-border";
      [["mcl",.14],["aal",.24],["mal",.31]].forEach(([id,x])=>{const o=tube([V(x,.08,surfaceZ(x)+.004),V(x,.52,surfaceZ(x)+.004)],cyan,.004,.9,landmarkGroup);o.userData.id=id;});
      [["ics4",.30],["ics5",.245]].forEach(([id,y])=>{const o=tube([V(-.12,y,.151),V(0,y,.157),V(.20,y,.135)],gold,.004,.92,landmarkGroup);o.userData.id=id;});
    }
    function addMarker(id,label,point,family="chest"){
      const color=family==="chest"?0xffd84d:0x7ce2ff;
      const group=new T.Group();group.position.copy(point);group.userData={id,family};
      const halo=new T.Mesh(new T.SphereGeometry(.026,16,10),mat(color,.92,false));halo.scale.z=.24;halo.renderOrder=12;group.add(halo);
      const dot=new T.Mesh(new T.SphereGeometry(.012,12,8),mat(0x101722,1,false));dot.position.z=.007;dot.scale.z=.35;dot.renderOrder=13;group.add(dot);
      leadGroup.add(group);
      const button=document.createElement("button");button.type="button";button.className="lead-3d-marker-button";button.dataset.marker=id;button.textContent=label;button.setAttribute("aria-label",`${label} marker`);button.addEventListener("click",()=>onSelect(id));labelLayer.append(button);
      markerItems.push({id,label,point:point.clone(),group,button,family});
    }
    function addLeadMarkers(){
      const chest={v1:V(-.048,.30,.158),v2:V(.048,.30,.158),v4:V(.14,.245,surfaceZ(.14)+.008),v3:V(.094,.273,surfaceZ(.094)+.008),v5:V(.24,.245,surfaceZ(.24)+.008),v6:V(.31,.245,surfaceZ(.31)+.008)};
      Object.entries(chest).forEach(([id,p])=>addMarker(id,id.toUpperCase(),p));
      addMarker("ra","RA",V(-.39,.49,.075),"limb");addMarker("la","LA",V(.39,.49,.075),"limb");
      addMarker("rl","RL ↓",V(-.28,.06,.105),"limb");addMarker("ll","LL ↓",V(.28,.06,.105),"limb");
    }
    addSkeleton();addMuscle();addLandmarks();addLeadMarkers();

    let bodyScene;
    try{
      bodyScene=await load(window.LeadTorsoModelData.skin);
      if(disposed){bodyScene.traverse((o)=>{o.geometry?.dispose();o.material?.dispose();});return {dispose(){}};}
      bodyScene.traverse((o)=>{if(!o.isMesh)return;o.material=new T.MeshStandardMaterial({color:0xd9907e,roughness:.82,metalness:0,transparent:true,opacity:bodyOpacity,depthWrite:false,side:T.DoubleSide});materials.push(o.material);o.renderOrder=1;});
      bodyGroup.add(bodyScene);
    }catch(error){dispose();throw error;}

    function cameraPose(){camera.position.set(Math.sin(yaw)*distance,.24+Math.sin(pitch)*distance*.6,Math.cos(yaw)*distance);camera.lookAt(0,.24,0);}
    function projectLabels(){
      const rect=viewport.getBoundingClientRect();
      markerItems.forEach((item)=>{
        const p=item.point.clone();anatomy.localToWorld(p);p.project(camera);
        const hidden=!layers.leads||p.z>1||p.z< -1||Math.abs(p.x)>1.05||Math.abs(p.y)>1.08;
        item.button.hidden=hidden;if(hidden)return;
        item.button.style.left=((p.x*.5+.5)*rect.width)+"px";item.button.style.top=((-p.y*.5+.5)*rect.height)+"px";
      });
    }
    function draw(){if(disposed||document.hidden||!visible)return;cameraPose();renderer.render(scene,camera);projectLabels();}
    function resize(){if(disposed)return;const width=Math.max(280,viewport.clientWidth);const height=Math.max(340,Math.min(520,width*1.12));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();draw();}
    function applyLayers(next=layers){layers={...layers,...next};bodyGroup.visible=layers.body;skeletonGroup.visible=layers.skeleton;muscleGroup.visible=layers.muscle;landmarkGroup.visible=layers.landmarks;leadGroup.visible=layers.leads;host.dataset.layers=Object.entries(layers).filter(([,v])=>v).map(([k])=>k).join(",");draw();}
    function setBodyOpacity(value){bodyOpacity=value==="opaque"?.82:.34;bodyGroup.traverse((o)=>{if(o.isMesh){o.material.opacity=bodyOpacity;o.material.transparent=bodyOpacity<1;o.material.depthWrite=bodyOpacity>.75;}});host.dataset.bodySurface=value;draw();}
    function highlight(ids){const selected=new Set(Array.isArray(ids)?ids:[ids]);active=[...selected][0]||"";host.dataset.highlight=[...selected].join(",");markerItems.forEach((item)=>{const on=selected.has(item.id);item.group.scale.setScalar(on?1.45:.82);item.group.children.forEach((o)=>{if(o.material)o.material.opacity=on?1:.38;});item.button.dataset.active=String(on);item.button.setAttribute("aria-current",on?"true":"false");});landmarkGroup.children.forEach((o)=>{const on=selected.has(o.userData.id);o.material.opacity=on?1:.25;});draw();}
    function front(){yaw=0;pitch=0;distance=4.0;draw();}
    function zoom(delta){distance=clamp(distance+delta,3.2,6.5);draw();}

    const pointers=new Map();let pinch=0;
    canvas.addEventListener("pointerdown",(e)=>{if(e.pointerType==="touch"&&!touchEnabled)return;canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);});
    canvas.addEventListener("pointermove",(e)=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===1){yaw-=(e.clientX-old[0])*.008;pitch=clamp(pitch+(e.clientY-old[1])*.006,-.45,.45);}else{const a=[...pointers.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(pinch)distance=clamp(distance*pinch/d,3.2,6.5);pinch=d;}draw();});
    ["pointerup","pointercancel"].forEach((name)=>canvas.addEventListener(name,(e)=>{pointers.delete(e.pointerId);pinch=0;}));
    canvas.addEventListener("wheel",(e)=>{e.preventDefault();zoom(Math.sign(e.deltaY)*.25);},{passive:false});
    canvas.addEventListener("keydown",(e)=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","Home"].includes(e.key))return;e.preventDefault();e.stopPropagation();if(e.key==="ArrowLeft")yaw-=.12;if(e.key==="ArrowRight")yaw+=.12;if(e.key==="ArrowUp")pitch=clamp(pitch+.1,-.45,.45);if(e.key==="ArrowDown")pitch=clamp(pitch-.1,-.45,.45);if(e.key==="+"||e.key==="=")zoom(-.25);else if(e.key==="-")zoom(.25);else if(e.key==="Home")front();else draw();});
    function contextLost(e){e.preventDefault();if(!disposed)options.onFailure?.("3D graphics became unavailable. The 2D placement diagram remains active.");dispose();}
    canvas.addEventListener("webglcontextlost",contextLost);
    function setTouch(enabled){touchEnabled=!!enabled;pointers.clear();canvas.style.touchAction=touchEnabled?"none":"pan-y";host.dataset.touch=String(touchEnabled);}
    function visibility(){if(!document.hidden)draw();}
    document.addEventListener("visibilitychange",visibility);
    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(viewport);
    intersectionObserver=new IntersectionObserver((entries)=>{visible=entries[0]?.isIntersecting!==false;if(visible)draw();},{threshold:.01});intersectionObserver.observe(viewport);
    applyLayers();setBodyOpacity("translucent");highlight(options.highlights||[active]);resize();
    host.dataset.ready="true";host.dataset.triangles="92656";host.dataset.markers=String(markerItems.length);host.dataset.frontRightLeft="true";

    function dispose(){if(disposed)return;disposed=true;resizeObserver?.disconnect();intersectionObserver?.disconnect();document.removeEventListener("visibilitychange",visibility);canvas.removeEventListener("webglcontextlost",contextLost);scene.traverse((o)=>o.geometry?.dispose());materials.forEach((m)=>m.dispose());renderer.dispose();renderer.forceContextLoss();host.replaceChildren();}
    return {dispose,draw,front,zoom,setTouch,setLayers:applyLayers,setBodyOpacity,highlight,select:(id)=>onSelect(id)};
  }
  return {mount};
})();
