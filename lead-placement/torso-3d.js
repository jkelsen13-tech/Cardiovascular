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
    const supplied=[...(window.LEAD_PLACEMENT?.leads||[]),...(window.LEAD_PLACEMENT?.landmarks||[])].find((item)=>item.id===id)?.anchor?.model;
    return V(...(Array.isArray(supplied)?supplied:VERIFIED_ANCHORS[id]));
  }

  async function mount(host,options={}) {
    let disposed=false,visible=true,touchEnabled=false,yaw=0,pitch=0,distance=1.42,pointerMoved=false;
    let active=options.active||"v1",labelActive=options.activeLabel||active,labelMode=options.labelMode||"all",showAllLabels=options.showAllLabels??labelMode!=="guided",polarity=options.polarity||{},lessonMode=options.lesson||"",electrodeColors=options.electrodeColors||{ra:"#f8fafc",la:"#111827",rl:"#22c55e",ll:"#ef4444"},electrodeLabels=options.electrodeLabels||{ra:"RA — WHITE",la:"LA — BLACK",rl:"RL — GREEN",ll:"LL — RED"},layers={body:true,skeleton:true,muscle:false,landmarks:true,leads:true};
    let bodySurface="translucent",resizeObserver,intersectionObserver,highlighted=new Set();
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
    const landmarkGroup=new T.Group(),lessonGroup=new T.Group(),leadGroup=new T.Group(),feedbackGroup=new T.Group();root.add(landmarkGroup,lessonGroup,leadGroup,feedbackGroup);
    const bodyMeshes=[],skeletonMeshes=[],muscleMeshes=[],structureMeshes=[],markerItems=[],landmarkItems=[],lessonVisuals=[],lessonLabels=[],materials=[];
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
    tube("mcl",[V(.076,-.19,.165),leadAnchor("v4"),V(.076,.165,.16)],cyan,.0024);tube("aal",[V(.194,-.19,.11),leadAnchor("v5"),V(.194,.13,.13)],cyan,.0024);tube("mal",[V(.247,-.19,.03),leadAnchor("v6"),V(.247,.12,.055)],cyan,.0024);
    tube("v4-level",[leadAnchor("v4"),leadAnchor("v5"),leadAnchor("v6")],0xffffff,.0018,.72);


    /* Lesson geometry is derived at runtime from the registered named atlas meshes. */
    function selectorsFor(id){return window.LEAD_PLACEMENT?.landmarks?.find((item)=>item.id===id)?.structureIds||STRUCTURES[id]||[];}
    function meshesFor(id){const ids=selectorsFor(id);return structureMeshes.filter((mesh)=>ids.includes(nodeFj(mesh)));}
    function vertexPoints(mesh){const attr=mesh.geometry?.attributes?.position,points=[];if(!attr)return points;for(let i=0;i<attr.count;i++)points.push(V(attr.getX(i),attr.getY(i),attr.getZ(i)).applyMatrix4(mesh.matrix));return points;}
    function medialPoint(id,side){const sign=side==="left"?1:-1,meshes=meshesFor(id).filter((mesh)=>String(mesh.name||"").toLowerCase().includes("cartilage")),points=meshes.flatMap(vertexPoints).filter((point)=>Math.sign(point.x||sign)===sign);if(!points.length)return leadAnchor(id);points.sort((a,b)=>Math.abs(a.x)-Math.abs(b.x)||b.z-a.z);const sample=points.slice(0,Math.min(32,points.length)),sum=sample.reduce((out,p)=>out.add(p),V());return sum.multiplyScalar(1/sample.length);}
    function closestJunction(aId,bId){const a=meshesFor(aId).flatMap(vertexPoints),b=meshesFor(bId).flatMap(vertexPoints);let best=Infinity,pa=a[0]||leadAnchor("sternal-angle"),pb=b[0]||pa;const stepA=Math.max(1,Math.floor(a.length/900)),stepB=Math.max(1,Math.floor(b.length/900));for(let i=0;i<a.length;i+=stepA)for(let j=0;j<b.length;j+=stepB){const d=a[i].distanceToSquared(b[j]);if(d<best){best=d;pa=a[i];pb=b[j];}}return pa.clone().add(pb).multiplyScalar(.5);}
    function gapPath(number){const upper="rib"+number,lower="rib"+(number+1),right=medialPoint(upper,"right").add(medialPoint(lower,"right")).multiplyScalar(.5),left=medialPoint(upper,"left").add(medialPoint(lower,"left")).multiplyScalar(.5),middle=right.clone().add(left).multiplyScalar(.5);middle.z=Math.max(right.z,left.z)+.006;if(number===4)return [right,leadAnchor("v1"),leadAnchor("v2"),left];if(number===5)return [right,middle,leadAnchor("v4"),left];return [right,middle,left];}
    function derivedBand(id,number,group=lessonGroup){const points=gapPath(number),curve=new T.CatmullRomCurve3(points),mesh=new T.Mesh(new T.TubeGeometry(curve,32,.0044,8,false),basic(0x55e7ff,.96,true));mesh.userData={id,structure:id,kind:"derived-intercostal-space",derivedFrom:["rib"+number,"rib"+(number+1)]};mesh.renderOrder=10;group.add(mesh);landmarkItems.push(mesh);return {mesh,point:points[Math.floor(points.length/2)].clone()};}
    function addLessonVisual(mesh,modes){mesh.userData.lessonModes=modes;mesh.visible=false;lessonVisuals.push(mesh);return mesh;}
    function addLessonLabel(id,text,point,modes,side="right"){const label=document.createElement("span");label.className="lead-3d-anatomy-label";label.dataset.lessonLabel=id;label.dataset.side=side;label.textContent=text;label.hidden=true;labelLayer.append(label);lessonLabels.push({id,label,point:point.clone(),modes});}
    const anglePoint=closestJunction("sternal-angle","sternum"),angleDot=new T.Mesh(new T.SphereGeometry(.010,18,12),basic(0xffe15b,1,true));angleDot.position.copy(anglePoint);angleDot.renderOrder=12;addLessonVisual(angleDot,["sternal-angle","rib2"]);lessonGroup.add(angleDot);
    const rib2Point=medialPoint("rib2","left"),angleConnector=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([anglePoint,rib2Point]),18,.0024,7,false),basic(0xffe15b,.96,true));angleConnector.renderOrder=11;addLessonVisual(angleConnector,["rib2"]);lessonGroup.add(angleConnector);
    const space2=derivedBand("ics2",2),space3=derivedBand("ics3",3),space4=derivedBand("ics4",4,landmarkGroup),space5=derivedBand("ics5",5,landmarkGroup);
    addLessonVisual(space2.mesh,["ics2","count-ics"]);addLessonVisual(space3.mesh,["count-ics"]);
    addLessonLabel("sternal-angle","STERNAL ANGLE · ANGLE OF LOUIS",anglePoint,["sternal-angle","rib2"],"right");
    addLessonLabel("rib2","RIB 2",leadAnchor("rib2"),["rib2","ics2","count-ics"],"left");
    addLessonLabel("ics2","2nd INTERCOSTAL SPACE",space2.point,["ics2","count-ics"],"right");
    [["rib3","RIB 3","left"],["ics3","3rd ICS","right"],["rib4","RIB 4","left"],["ics4","4th ICS","right"],["rib5","RIB 5","left"],["ics5","5th ICS","right"]].forEach(([id,text,side])=>addLessonLabel(id,text,leadAnchor(id),["count-ics"],side));
    addLessonLabel("ics4-pair","4th ICS · V1 + V2",leadAnchor("ics4"),["v1v2-ics4"],"right");
    addLessonLabel("ics4-level","4th ICS · V1 / V2",leadAnchor("ics4"),["v4-ics5"],"left");
    addLessonLabel("ics5-v4","5th ICS · V4",leadAnchor("ics5"),["v4-ics5"],"right");
    addLessonLabel("same-height","V4 ─── V5 ─── V6 · SAME HEIGHT",leadAnchor("v5"),["v4-v6-level"],"left");
    addLessonLabel("aal-v5","ANTERIOR AXILLARY · V5",leadAnchor("aal"),["v5-axillary"],"left");
    addLessonLabel("mal-v6","MIDAXILLARY · V6",leadAnchor("mal"),["v6-axillary"],"left");
    host.dataset.sternalAngleSource="FJ3290+FJ3178";host.dataset.intercostalDerivation="adjacent-registered-rib-cartilage-meshes";

    function makeLeader(){const line=document.createElement("span");line.className="lead-3d-marker-line";line.setAttribute("aria-hidden","true");labelLayer.append(line);return line;}
    function addMarker(id,label,point,family="chest"){
      const group=new T.Group();group.position.copy(point);group.userData={id,family,structure:id};const color=family==="chest"?0xffd84d:(electrodeColors[id]||0x72e4ff);
      if(family==="limb"){const rim=new T.Mesh(new T.SphereGeometry(.011,16,10),basic(0xffffff,.94,true));rim.scale.z=.42;rim.renderOrder=11;rim.userData={id,structure:id};group.add(rim);}
      const halo=new T.Mesh(new T.SphereGeometry(family==="chest"?.012:.009,16,10),basic(color,.96,true));halo.scale.z=.42;halo.renderOrder=12;halo.userData={id,structure:id};group.add(halo);
      const dot=new T.Mesh(new T.SphereGeometry(family==="chest"?.0045:.0035,12,8),basic(0x0d1623,1,true));dot.position.z=.004;dot.scale.z=.55;dot.renderOrder=13;group.add(dot);leadGroup.add(group);
      const tag=family==="chest"?document.createElement("span"):null;if(tag){tag.className="lead-3d-dot-label";tag.dataset.marker=id;tag.textContent=label;tag.setAttribute("aria-hidden","true");labelLayer.append(tag);}
      const button=document.createElement("button");button.type="button";button.className=`lead-3d-marker-button ${family}`;button.dataset.marker=id;button.textContent=label;button.setAttribute("aria-label",family==="limb"?`${label} external limb-electrode teaching label`:`${label} placement callout`);if(family==="limb")button.style.setProperty("--node-color",String(color));button.addEventListener("click",()=>onSelect(id,{modelPoint:point.toArray()}));
      const leader=makeLeader();labelLayer.append(button);markerItems.push({id,label,point:point.clone(),group,button,leader,tag,family});
    }
    CHEST_IDS.forEach((id)=>addMarker(id,id.toUpperCase(),leadAnchor(id)));addMarker("ra",electrodeLabels.ra,leadAnchor("ra"),"limb");addMarker("la",electrodeLabels.la,leadAnchor("la"),"limb");addMarker("rl",electrodeLabels.rl,leadAnchor("rl"),"limb");addMarker("ll",electrodeLabels.ll,leadAnchor("ll"),"limb");

    function cameraPose(){camera.position.set(Math.sin(yaw)*distance,.015+Math.sin(pitch)*distance*.45,Math.cos(yaw)*distance);camera.lookAt(0,0,.08);}
    function worldPoint(local){const p=local.clone();root.localToWorld(p);return p;}
    function occluded(point){if(bodySurface!=="opaque")return false;return worldPoint(point).z<-.015;}
    function candidatePositions(base,id,family,width,height,boxWidth,boxHeight){const direction={v1:[-1,-1],v2:[1,-1],v3:[1,1],v4:[1,1],v5:[1,-1],v6:[1,1],ra:[-1,-1],la:[1,-1],rl:[-1,1],ll:[1,1]}[id]||[1,-1],[sx,sy]=direction,gapX=boxWidth/2+16,gapY=boxHeight/2+12,offsets=[[sx*gapX,sy*gapY],[sx*gapX,-sy*gapY],[-sx*gapX,sy*gapY],[0,-(boxHeight/2+18)],[0,boxHeight/2+18]],halfW=boxWidth/2+4,halfH=boxHeight/2+4;return offsets.map(([x,y])=>({x:clamp(base.x+x,halfW,width-halfW),y:clamp(base.y+y,halfH,height-halfH),width:boxWidth,height:boxHeight})).filter((pos)=>Math.hypot(pos.x-base.x,pos.y-base.y)<=76);}
    // Compare the rendered button boxes, not nominal centers: system fonts can
    // make a label wider in one browser than another.
    function overlap(a,b){return Math.abs(a.x-b.x)<(a.width+b.width)/2+6&&Math.abs(a.y-b.y)<(a.height+b.height)/2+6;}
    function placeLeader(item,base,pos){const dx=pos.x-base.x,dy=pos.y-base.y,len=Math.hypot(dx,dy),angle=Math.atan2(dy,dx)*180/Math.PI;item.leader.style.left=base.x+"px";item.leader.style.top=base.y+"px";item.leader.style.width=Math.max(0,len-10)+"px";item.leader.style.transform=`rotate(${angle}deg)`;}
    function crosses(a,b){const side=(p,q,r)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);return side(a.a,a.b,b.a)*side(a.a,a.b,b.b)<0&&side(b.a,b.b,a.a)*side(b.a,b.b,a.b)<0;}
    function projectLessonLabels(){const rect=viewport.getBoundingClientRect();lessonLabels.forEach((item)=>{const show=layers.landmarks&&item.modes.includes(lessonMode);item.label.hidden=!show;if(!show)return;const p=worldPoint(item.point);p.project(camera);if(p.z>1||p.z< -1){item.label.hidden=true;return;}const x=(p.x*.5+.5)*rect.width,y=(-p.y*.5+.5)*rect.height,offset=item.label.dataset.side==="left"?-10:10;item.label.style.left=x+offset+"px";item.label.style.top=y+"px";item.label.dataset.collision=item.label.dataset.side;});}
    function projectLabels(){const rect=viewport.getBoundingClientRect(),placed=[],segments=[],tagOffsets={v1:[-19,-17],v2:[7,-17],v3:[7,-17],v4:[7,-17],v5:[7,-17],v6:[7,-17]},projected=markerItems.map((item)=>{const p=worldPoint(item.point);p.project(camera);const base={x:(p.x*.5+.5)*rect.width,y:(-p.y*.5+.5)*rect.height},hidden=!layers.leads||p.z>1||p.z< -1||Math.abs(p.x)>1.08||Math.abs(p.y)>1.08||occluded(item.point);item.button.hidden=true;item.leader.hidden=true;if(item.tag){item.tag.hidden=hidden;if(!hidden){const [tx,ty]=tagOffsets[item.id]||[7,-17];item.tag.style.left=base.x+tx+"px";item.tag.style.top=base.y+ty+"px";}}return {item,base,hidden};});projected.filter(({item,hidden})=>!hidden&&(labelMode!=="guided"||showAllLabels||item.id===labelActive||item.family==="limb"&&Object.hasOwn(polarity,item.id))).sort((a,b)=>Number(b.item.id===labelActive)-Number(a.item.id===labelActive)).forEach(({item,base})=>{item.button.hidden=false;item.button.style.visibility="hidden";const boxWidth=Math.max(44,item.button.offsetWidth),boxHeight=Math.max(44,item.button.offsetHeight),candidates=candidatePositions(base,item.id,item.family,rect.width,rect.height,boxWidth,boxHeight),pos=candidates.find((next)=>!placed.some((other)=>overlap(next,other))&&!segments.some((segment)=>crosses({a:base,b:next},segment)));if(!pos){item.button.hidden=true;item.leader.hidden=true;return;}item.button.style.visibility="";item.leader.hidden=false;placed.push(pos);segments.push({a:base,b:pos});item.button.style.left=pos.x+"px";item.button.style.top=pos.y+"px";placeLeader(item,base,pos);});}
    function draw(){if(disposed||document.hidden||!visible)return;cameraPose();renderer.render(scene,camera);projectLabels();projectLessonLabels();}
    function resize(){if(disposed)return;const width=Math.max(280,viewport.clientWidth),height=Math.max(360,Math.min(560,width*1.08));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();draw();}
    function applyLayers(next=layers){layers={...layers,...next};bodyMeshes.forEach((o)=>o.visible=layers.body&&bodySurface!=="hidden");skeletonMeshes.forEach((o)=>o.visible=layers.skeleton);muscleMeshes.forEach((o)=>o.visible=layers.muscle);landmarkGroup.visible=layers.landmarks;lessonGroup.visible=layers.landmarks;leadGroup.visible=layers.leads;host.dataset.layers=Object.entries(layers).filter(([,value])=>value).map(([key])=>key).join(",");draw();}
    function setBodyOpacity(value){bodySurface=["opaque","translucent","hidden"].includes(value)?value:"translucent";bodyMeshes.forEach((o)=>{o.visible=layers.body&&bodySurface!=="hidden";o.material.opacity=bodySurface==="opaque"?.94:.14;o.material.transparent=bodySurface!=="opaque";o.material.depthWrite=bodySurface==="opaque";});host.dataset.bodySurface=bodySurface;draw();}
    function matchesStructure(mesh,id){const fj=nodeFj(mesh),name=String(mesh.name||"").toLowerCase(),selectors=selectorsFor(id);return selectors.some((selector)=>selector.startsWith("FJ")?fj===selector:name.includes(selector.trim()));}
    function highlight(ids){const selected=new Set(Array.isArray(ids)?ids:[ids]);highlighted=selected;active=[...selected][0]||"";host.dataset.highlight=[...selected].join(",");markerItems.forEach((item)=>{const on=selected.has(item.id),primary=item.id===labelActive,relevant=primary||Object.hasOwn(polarity,item.id);item.group.scale.setScalar(on?1.38:.82);item.group.children.forEach((o)=>{if(o.material)o.material.opacity=on?1:.45;});item.button.dataset.active=String(primary);item.button.dataset.dimmed=String(!relevant);item.button.setAttribute("aria-current",primary?"true":"false");});landmarkItems.forEach((item)=>{const on=selected.has(item.userData.id);item.material.opacity=on?1:.2;item.scale.setScalar(on?1.6:1);});structureMeshes.forEach((mesh)=>{const on=[...selected].some((id)=>matchesStructure(mesh,id)||mesh.userData.structure===id);mesh.material.emissive.setHex(on?0xffa600:0x000000);mesh.material.emissiveIntensity=on?.58:0;});draw();}
    function setLesson(next=""){lessonMode=next||"";lessonVisuals.forEach((mesh)=>mesh.visible=layers.landmarks&&mesh.userData.lessonModes.includes(lessonMode));host.dataset.lesson=lessonMode;draw();}
    function setLabels(next={}){if(next.mode)labelMode=next.mode;if("all" in next)showAllLabels=!!next.all;if("active" in next)labelActive=next.active||"";if("polarity" in next)polarity=next.polarity||{};markerItems.forEach((item)=>{const primary=item.id===labelActive,relevant=primary||Object.hasOwn(polarity,item.id),value=polarity[item.id];item.button.textContent=item.label+(value?` ${value}`:"");item.button.dataset.active=String(primary);item.button.dataset.dimmed=String(!relevant);item.button.setAttribute("aria-current",primary?"true":"false");item.button.setAttribute("aria-label",item.family==="limb"?`${item.label} ${value||"electrode"}; external limb-electrode teaching label`:`${item.label} placement callout`);});host.dataset.labelMode=labelMode;host.dataset.allLabels=String(showAllLabels);host.dataset.activeLabel=labelActive;host.dataset.polarity=Object.entries(polarity).map(([id,value])=>`${id}:${value}`).join(",");draw();}
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
    applyLayers();setBodyOpacity("translucent");highlight(options.highlights||[active]);setLabels({mode:labelMode,all:showAllLabels,active:labelActive,polarity});resize();setLesson(lessonMode);host.dataset.ready="true";host.dataset.triangles="194563";host.dataset.structures="50";host.dataset.bodyMeshes=String(bodyMeshes.length);host.dataset.skeletonMeshes=String(skeletonMeshes.length);host.dataset.muscleMeshes=String(muscleMeshes.length);host.dataset.markers=String(markerItems.length);host.dataset.frontRightLeft="true";host.dataset.registeredAnatomy="true";host.dataset.source="BodyParts3D";
    function dispose(){if(disposed)return;disposed=true;resizeObserver?.disconnect();intersectionObserver?.disconnect();document.removeEventListener("visibilitychange",visibilityChange);canvas.removeEventListener("webglcontextlost",contextLost);scene.traverse((o)=>o.geometry?.dispose());materials.forEach((m)=>m.dispose());renderer.dispose();renderer.forceContextLoss();host.replaceChildren();}
    function setView(preset){if(preset==="left-oblique")oblique("left");else if(preset==="right-oblique")oblique("right");else front();}
    return {dispose,draw,front,reset:front,oblique,setView,zoom,setTouch,setLayers:applyLayers,setBodyOpacity,highlight,setLabels,setLesson,showQuizResult,select:(id)=>onSelect(id)};
  }
  return {mount};
})();
