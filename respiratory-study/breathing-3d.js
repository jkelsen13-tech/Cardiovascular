/* Dynamic teaching scene derived from pinned HRA lungs; schematic chest and microscopy. */
window.RespiratoryBreathing3D={
  async mount(host,onFailure,onSelect,controls={}){
    const current=()=>!controls.current||controls.current();if(!current())return {dispose(){}};
    const T=EcgThree,M=RespiratoryMechanics;
    const ownScript=[...document.scripts].find(e=>/respiratory-study\/breathing-3d\.js(?:$|\?)/.test(e.src));
    const base=new URL('.',ownScript?.src||new URL('respiratory-study/breathing-3d.js',document.baseURI));
    async function load(name,ready){if(ready())return;await new Promise((resolve,reject)=>{const e=document.createElement('script');e.src=new URL(name,base);e.onload=resolve;e.onerror=()=>reject(Error('Unable to load '+name));document.head.append(e);});}
    await load('explorer.js',()=>window.RespiratoryExplorer);await load('assets/airway-metadata.js',()=>window.RespiratoryAirwayMetadata);if(!current())return {dispose(){}};
    if(!document.querySelector('[data-explorer-css]')){const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('explorer.css',base);link.dataset.explorerCss='true';document.head.append(link);}
    const E=RespiratoryExplorer,metadata=RespiratoryAirwayMetadata,parts=Object.fromEntries(metadata.parts.map(p=>[p.sourceName,p]));
    let target=[0,-.4,0],originalSelection='rightlung',initialSync=true,detail=null,detailPromise=null,journey=null,focusAnimation=0,transitionToken=0,lastExplorerIndex=0,originalLocked=false,insetRendered=false;
    const originalCamera={yaw:0,pitch:0,distance:9.5,target:[0,-.4,0]};
    let disposed=false,suspended=false,cleanupError=null,yaw=0,pitch=0,distance=9.5,touch=false,selected='rightlung',isolate=false,mode='whole',lastState=null,opacity='solid',drawBatchDepth=0,drawPending=false;
    const renderer=new T.WebGLRenderer({antialias:false,alpha:false,powerPreference:'low-power'});
    renderer.setPixelRatio(1);renderer.setClearColor(0x102033);
    const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.01,100),gross=new T.Group(),micro=new T.Group();
    scene.add(gross,micro);micro.visible=false;const detailGroup=new T.Group();scene.add(detailGroup);detailGroup.visible=false;const insetCamera=new T.PerspectiveCamera(38,1,.01,100);insetCamera.position.set(0,-.4,9.5);insetCamera.lookAt(0,-.4,0);insetCamera.updateMatrixWorld();
    scene.add(new T.HemisphereLight(0xe5f6ff,0x38405b,2.4));const sun=new T.DirectionalLight(0xffffff,2.5);sun.position.set(3,4,6);scene.add(sun);
    const owner={};host.__respiratorySceneOwner=owner;
    host.innerHTML=`<p class="sim-badge">Moving HRA lung derivative + authored chest context · illustrative deformation</p><div class="sim-controls"><button data-breath-view="front">Front</button><button data-breath-view="side">Side</button><button data-breath-view="back">Back</button><button data-breath-view="oblique">Oblique</button><button data-breath-reset>Reset rotation / zoom</button><button data-breath-touch aria-pressed="false">Enable touch rotation / pinch</button><button data-breath-zoom="-0.6">Zoom +</button><button data-breath-zoom="0.6">Zoom −</button><button data-breath-fullscreen>Fullscreen scene</button></div><div class="sim-controls"><label>3D view <select data-breath-mode><option value="whole">Breathing anatomy</option><option value="alveolar">Magnified alveolar exchange</option></select></label><label>Select structure <select data-breath-select><option value="rightlung">Patient right lung</option><option value="leftlung">Patient left lung</option><option value="right-upper">Right upper lobe</option><option value="right-middle">Right middle lobe</option><option value="right-lower">Right lower lobe</option><option value="left-upper">Left upper lobe</option><option value="left-lower">Left lower lobe</option><option value="airways">Trachea / named bronchi</option><option value="diaphragm">Diaphragm schematic</option><option value="ribs">Rib context schematic</option><optgroup label="Named source bronchi">${E.nodes.map(n=>`<option value="${n.sourceName}">${n.label}</option>`).join('')}</optgroup></select></label><button data-breath-isolate>Isolate selected</button><button data-breath-restore>Restore layers</button><label>Context <select data-breath-context><option value="solid">Solid lungs / rib outlines</option><option value="ghost">Ghost lungs</option><option value="cutaway">Illustrative cutaway</option></select></label><label>Leader width <input data-breath-leader type="range" min="1" max="6" step=".5" value="2.5"></label></div><p data-breath-gross-orientation>Gross HRA coordinates: patient RIGHT is −X; patient LEFT is +X. Front (+Z) surface orientation awaits educator review. Chest outlines are schematic, fitted to the shared HRA frame.</p><div class="sim-breath-viewport"><div class="sim-breath-canvas"></div><svg class="sim-breath-overlay" aria-hidden="true"><line data-breath-line stroke="#ffe4a3" stroke-width="3.5"/><circle data-breath-dot r="5" fill="#ffe4a3"/></svg><button data-exit-breath-fullscreen hidden style="position:absolute;right:8px;top:8px;z-index:3">Exit fullscreen</button><div class="sim-breath-label" data-breath-label></div><div class="sim-breath-side" aria-hidden="true">Patient RIGHT ← · → Patient LEFT (front)</div><p data-explorer-inset-label class="sim-breath-origin-caption" hidden></p><div class="sim-breath-journey-toolbar sim-controls"><button data-explorer-quick-back>← Parent</button><strong data-explorer-quick-stage>Whole lungs · HRA source</strong><button data-explorer-quick-next>Follow airway →</button></div><div class="sim-breath-transport"><div class="sim-controls"><button data-breath-play>Play simulation</button><label>Rate /min <input data-breath-rate type="number" min="6" max="30" value="12"></label><label>Depth L <input data-breath-depth type="number" min=".2" max="1" step=".1" value=".5"></label></div><label>Scrub physiological time <input data-breath-scrub type="range" min="0" max="5" step=".01" value="0"></label><p data-breath-time></p></div></div><p data-breath-status role="status"></p><div data-explorer-host></div><div class="sim-controls" data-breath-layers><label><input data-layer3d="lungs" type="checkbox" checked>Lung surfaces</label><label><input data-layer3d="airways" type="checkbox" checked>Airways</label><label><input data-layer3d="diaphragm" type="checkbox" checked>Diaphragm</label><label><input data-layer3d="ribs" type="checkbox" checked>Chest / ribs</label><label><input data-layer3d="labels" type="checkbox" checked>Selected label</label><label><input data-layer3d="flow" type="checkbox" checked>Airflow cue</label></div>`;
    const box=host.querySelector('.sim-breath-canvas'),viewport=host.querySelector('.sim-breath-viewport'),canvas=renderer.domElement;
    box.append(canvas);canvas.tabIndex=0;canvas.style.touchAction='pan-y';canvas.setAttribute('aria-label','Interactive breathing anatomy. Arrow keys rotate; plus/minus zoom; Home resets. Enable touch before rotating or pinching.');
    const prototype=new T.SphereGeometry(1,3,2),Attribute=prototype.attributes.position.constructor;prototype.dispose();
    const Geometry=Object.getPrototypeOf(T.SphereGeometry.prototype).constructor;
    function geometry(pos,idx){const g=new Geometry();g.setAttribute('position',new Attribute(new Float32Array(pos),3));g.setIndex(Array.from(idx));g.computeVertexNormals();g.computeBoundingSphere();return g;}
    const decode=(s,Type)=>new Type(Uint8Array.from(atob(s),c=>c.charCodeAt(0)).buffer);
    const colors={'right-upper':0xe5a2a2,'right-middle':0xb77eaa,'right-lower':0xac728f,'left-upper':0xd692b5,'left-lower':0xb982bd,airways:0xf3dbab};
    const dynamic=[],pickable=[],anchors={};
    for(const d of RespiratoryTeachingData){
      const rest=decode(d.positions,Float32Array),g=geometry(rest,decode(d.indices,Uint32Array));
      const mesh=new T.Mesh(g,new T.MeshStandardMaterial({color:colors[d.id],roughness:.85,side:T.DoubleSide}));mesh.name=d.id;mesh.userData.layer=d.id==='airways'?'airways':'lungs';gross.add(mesh);dynamic.push({mesh,rest});pickable.push(mesh);
      const v=[0,0,0];for(let i=0;i<rest.length;i++)v[i%3]+=rest[i]/(rest.length/3);anchors[d.id]=v;
    }
    anchors.rightlung=anchors['right-middle'];anchors.leftlung=anchors['left-upper'];
    function tube(points,radius,color,name,layer,parent=gross){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const g=new T.TubeGeometry(curve,40,radius,6,false),mesh=new T.Mesh(g,new T.MeshStandardMaterial({color,roughness:.8,side:T.DoubleSide}));mesh.name=name;mesh.userData.layer=layer;parent.add(mesh);return mesh;}
    // Outer schematic rib arcs surround lung bounds at every allowed motion amplitude.
    const ribs=[];
    for(let i=0;i<9;i++){
      const y=1.48-i*.37,points=[];
      for(let j=0;j<=40;j++){const a=2*Math.PI*j/40;points.push([2.4*Math.cos(a),y+.09*Math.sin(a),1.65*Math.sin(a)]);}
      const mesh=tube(points,.022,0xc7c6b1,'ribs','ribs');ribs.push(mesh);dynamic.push({mesh,rest:mesh.geometry.attributes.position.array.slice(),rib:true});
    }
    const dpos=[],didx=[];const nr=12,nt=48;
    for(let r=0;r<=nr;r++)for(let a=0;a<=nt;a++){const f=r/nr,theta=a/nt*2*Math.PI;dpos.push(1.86*f*Math.cos(theta),-2.25+.51*(1-f*f),1.18*f*Math.sin(theta));}
    for(let r=0;r<nr;r++)for(let a=0;a<nt;a++){const x=r*(nt+1)+a;didx.push(x,x+1,x+nt+1,x+1,x+nt+2,x+nt+1);}
    const diaphragm=new T.Mesh(geometry(dpos,didx),new T.MeshStandardMaterial({color:0xe7b764,side:T.DoubleSide,roughness:.9}));diaphragm.name='diaphragm';diaphragm.userData.layer='diaphragm';gross.add(diaphragm);dynamic.push({mesh:diaphragm,rest:new Float32Array(dpos),diaphragm:true});pickable.push(diaphragm);
    anchors.diaphragm=[0,-1.74,0];anchors.ribs=[-2.4,0,0];
    const airflow=tube([[0,2.2,.05],[0,1.7,.05],[0,1.2,.05]],.035,0x82edeb,'airflow','flow');
    const flowTip=new T.Mesh(new T.ConeGeometry(.12,.25,10),new T.MeshBasicMaterial({color:0x82edeb}));flowTip.position.set(0,1.3,.05);gross.add(flowTip);flowTip.userData.layer='flow';
    // Separate magnified, rotatable 3D teaching scale; authored geometry, not a gross mesh.
    const redcells=[],gases=[],alveolarBulk=[];let microReady=false;
    function ensureMicro(){if(microReady)return;microReady=true;
    const airspace=new T.Mesh(new T.SphereGeometry(.9,28,20),new T.MeshStandardMaterial({color:0x8cc6cf,transparent:true,opacity:.32,side:T.DoubleSide,roughness:.8}));micro.add(airspace);
    const cap=tube([[-1.3,-.6,.1],[-.8,-.88,.1],[0,-1,.1],[.8,-.88,.1],[1.3,-.6,.1]],.17,0xa44c6b,'capillary','blood',micro);cap.material.transparent=true;cap.material.opacity=.5;
    for(let i=0;i<4;i++){const cell=new T.Mesh(new T.SphereGeometry(.13,12,8),new T.MeshStandardMaterial({color:0xc34452,roughness:.8}));cell.scale.y=.4;micro.add(cell);redcells.push(cell);}
    for(const [label,color,sign]of [['O₂',0x80ecf0,1],['CO₂',0xffd276,-1]])for(let i=0;i<5;i++){const gas=new T.Mesh(new T.SphereGeometry(.055,8,6),new T.MeshBasicMaterial({color}));gas.userData={label,sign,index:i};micro.add(gas);gases.push(gas);}
    tube([[-.5,-.76,.04],[0,-.9,.04],[.5,-.76,.04]],.018,0xf4d99b,'exaggerated-membrane','barrier',micro);
    tube([[0,1.65,0],[0,1.1,0],[0,.65,0]],.12,0xf0d2a1,'alveolar-air-entry','flow',micro);
    for(let i=0;i<4;i++){const p=new T.Mesh(new T.SphereGeometry(.045,6,4),new T.MeshBasicMaterial({color:0x7beded}));p.userData.index=i;micro.add(p);alveolarBulk.push(p);}
    }
    const layers={lungs:true,airways:true,diaphragm:true,ribs:true,labels:true,flow:true};
    const airwayMesh=dynamic.find(d=>d.mesh.name==='airways').mesh;
    const highlightGeometry=new Geometry();highlightGeometry.setAttribute('position',airwayMesh.geometry.attributes.position);highlightGeometry.setAttribute('normal',airwayMesh.geometry.attributes.normal);
    const sourceHighlight=new T.Mesh(highlightGeometry,new T.MeshStandardMaterial({color:0xffb34e,emissive:0x7a3b08,roughness:.65,side:T.DoubleSide}));sourceHighlight.name='airway-source-highlight';sourceHighlight.userData.layer='airways';sourceHighlight.visible=false;gross.add(sourceHighlight);
    function highlight(sourceName){const p=parts[sourceName];if(p){if(sourceHighlight.userData.sourceName!==sourceName)highlightGeometry.setIndex(Array.from(airwayMesh.geometry.index.array.slice(p.indexStart,p.indexStart+p.indexCount)));anchors[sourceName]=p.center;sourceHighlight.userData.sourceName=sourceName;sourceHighlight.visible=true;}else{sourceHighlight.userData.sourceName=null;sourceHighlight.visible=false;}}
    function selectedMesh(mesh){if(mesh.name==='airway-source-highlight')return true;return mesh.name===selected||(selected==='rightlung'&&mesh.name.startsWith('right-'))||(selected==='leftlung'&&mesh.name.startsWith('left-'));}
    function visibility(){
      for(const o of gross.children){const active=selectedMesh(o);o.visible=layers[o.userData.layer]!==false&&(!isolate||active);if(o.material){o.material.emissive?.set(active?0x59391b:0);const lung=o.userData.layer==='lungs';o.material.transparent=lung&&opacity==='ghost';o.material.opacity=lung&&opacity==='ghost'?.22:1;}}
      if(opacity==='cutaway')for(const o of gross.children)if(o.userData.layer==='lungs'&&o.name.startsWith('left-'))o.visible=false;
      const source=mode==='whole'?selected:journey.state().origin.sourceName;highlight(source);sourceHighlight.visible=!!parts[source]&&(mode!=='whole'||layers.airways);detail?.setIsolated(isolate);if(microReady)micro.children.forEach(o=>{o.visible=!isolate||['capillary','exaggerated-membrane'].includes(o.name)||gases.includes(o)||redcells.includes(o);});draw();
    }
    const fullChange=()=>{host.querySelector('[data-exit-breath-fullscreen]').hidden=!document.fullscreenElement;resize();};
    document.addEventListener('fullscreenchange',fullChange);host.querySelector('[data-exit-breath-fullscreen]').onclick=()=>document.exitFullscreen?.();
    const label=host.querySelector('[data-breath-label]'),line=host.querySelector('[data-breath-line]'),dot=host.querySelector('[data-breath-dot]');
    function layout(){
      const w=box.clientWidth,h=box.clientHeight;const overlay=host.querySelector('.sim-breath-overlay');overlay.setAttribute('viewBox',`0 0 ${w} ${h}`);overlay.style.height=h+'px';host.querySelector('.sim-breath-side').style.top=Math.max(0,h-26)+'px';host.querySelector('.sim-breath-side').hidden=mode!=='whole';host.querySelector('[data-breath-gross-orientation]').hidden=mode!=='whole';
      let point=anchors[selected]||anchors.rightlung;
      if(lastState){point=selected==='diaphragm'?M.diaphragmDeform(point,lastState.excursion):selected==='ribs'?M.ribDeform(point,lastState.excursion):M.deform(point,lastState.excursion);}
      if(mode==='alveolar')point=[0,-.88,.1];if(mode==='detail')point=[0,-.1,0];
      const p=new T.Vector3(...point).project(camera),x=(p.x+1)*w/2,y=(1-p.y)*h/2;
      const text=mode==='alveolar'?'Magnified alveolar–capillary barrier':mode==='detail'?journey.state().stage.label:E.bySource[selected]?.label||selected.replaceAll('-',' ');
      label.textContent=text;label.style.left='12px';label.style.top='12px';label.style.maxWidth=Math.max(80,w-(insetRendered?Math.min(142,Math.floor(w*.3))+30:24))+'px';
      const visible=layers.labels&&p.z<1;label.hidden=!visible;line.style.display=dot.style.display=visible?'':'none';
      line.setAttribute('x1',Math.min(w-12,12+label.offsetWidth/2));line.setAttribute('y1',12+label.offsetHeight);line.setAttribute('x2',x);line.setAttribute('y2',y);dot.setAttribute('cx',x);dot.setAttribute('cy',y);
      host.dataset.anchor=JSON.stringify(point);host.dataset.projectedAnchor=JSON.stringify([x,y]);
    }
    // Only synchronous work is batched. A returned promise keeps no lease;
    // its later continuations draw normally, including cancellation/errors.
    function batchDraw(work){
      let value,error,failed=false;drawBatchDepth++;try{value=work();}catch(e){failed=true;error=e;}
      finally{drawBatchDepth--;if(!drawBatchDepth&&drawPending){
        drawPending=false;try{draw();}catch(e){if(!failed){failed=true;error=e;}}
      }}
      if(failed)throw error;return value;
    }
    function draw(){if(disposed||suspended)return;if(drawBatchDepth){drawPending=true;return;}const aim=mode==='whole'&&journey?.state().index>0&&lastState?M.deform(target,lastState.excursion):target;camera.position.set(aim[0]+Math.sin(yaw)*Math.cos(pitch)*distance,aim[1]+Math.sin(pitch)*distance,aim[2]+Math.cos(yaw)*Math.cos(pitch)*distance);camera.lookAt(...aim);camera.updateMatrixWorld();renderer.render(scene,camera);let triangles=renderer.info.render.triangles,calls=renderer.info.render.calls;
      const local=mode!=='whole',textSize=parseFloat(getComputedStyle(label).fontSize),inset=local&&!isolate&&box.clientWidth>=560&&textSize<25;insetRendered=inset;host.querySelector('[data-explorer-quick-stage]').textContent=(journey?.state().node?.label||journey?.state().stage.label||'Whole lungs')+' · '+(mode!=='whole'?'Instructional':'HRA source');host.querySelector('[data-explorer-quick-back]').disabled=journey?.state().index===0;host.querySelector('[data-explorer-quick-next]').disabled=journey?.state().index===12;const originCaption=host.querySelector('[data-explorer-inset-label]');originCaption.hidden=!local;if(local)originCaption.textContent='Local instructional view · source origin retained: '+journey.state().origin.label+' · '+journey.state().lobe.replace('-', ' ')+' lobe'+(isolate?' · local view isolated':inset?' · HRA source location shown in inset':' · source inset collapsed for readable labels');
      if(inset){const lungMaterials=gross.children.filter(o=>o.userData.layer==='lungs').map(o=>[o.material,o.material.transparent,o.material.opacity]);for(const [material]of lungMaterials){material.transparent=true;material.opacity=.18;}const w=canvas.width,h=canvas.height,size=Math.min(142,Math.floor(w*.3));gross.visible=true;micro.visible=detailGroup.visible=false;renderer.setScissorTest(true);renderer.setScissor(w-size-6,h-size-35,size,size);renderer.setViewport(w-size-6,h-size-35,size,size);renderer.render(scene,insetCamera);for(const [material,transparent,alpha]of lungMaterials){material.transparent=transparent;material.opacity=alpha;}triangles+=renderer.info.render.triangles;calls+=renderer.info.render.calls;renderer.setScissorTest(false);renderer.setViewport(0,0,w,h);gross.visible=false;micro.visible=mode==='alveolar';detailGroup.visible=mode==='detail';}
      layout();host.dataset.cameraDistance=String(distance);host.dataset.triangles=String(triangles);host.dataset.drawCalls=String(calls);host.dataset.explorerDetailLoaded=String(!!detail);}
    function focusTo(point,range,animate=true,ctx=null){cancelAnimationFrame(focusAnimation);focusAnimation=0;if(disposed||suspended||(ctx&&!ctx.isCurrent()))return;const from=target.slice(),startDistance=distance,start=performance.now();if(!animate){target=point.slice();distance=range;draw();return;}function tick(now){focusAnimation=0;if(disposed||suspended||(ctx&&!ctx.isCurrent()))return;const f=Math.min(1,(now-start)/350),u=f*f*(3-2*f);target=from.map((x,i)=>x+(point[i]-x)*u);distance=startDistance+(range-startDistance)*u;draw();if(f<1)focusAnimation=requestAnimationFrame(tick);}focusAnimation=requestAnimationFrame(tick);}
    function resize(){if(disposed||suspended)return;const w=box.clientWidth;if(!w)return;const h=Math.min(550,Math.max(360,w*.72));renderer.setSize(w,h,false);box.style.height=h+'px';camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
    function sync(s){
      if(disposed||suspended)return;if(initialSync){originalSelection=selected;initialSync=false;}lastState=s;const a=s.excursion/.5;
      for(const d of dynamic){const pos=d.mesh.geometry.attributes.position.array;
        for(let i=0;i<pos.length;i+=3){let v;
          if(d.diaphragm)v=M.diaphragmDeform([d.rest[i],d.rest[i+1],d.rest[i+2]],s.excursion);
          else if(d.rib)v=M.ribDeform([d.rest[i],d.rest[i+1],d.rest[i+2]],s.excursion);
          else v=M.deform([d.rest[i],d.rest[i+1],d.rest[i+2]],s.excursion);
          pos[i]=v[0];pos[i+1]=v[1];pos[i+2]=v[2];
        }
        d.mesh.geometry.attributes.position.needsUpdate=true;d.mesh.geometry.computeVertexNormals();d.mesh.geometry.computeBoundingSphere();
      }
      flowTip.rotation.z=s.flow>=0?Math.PI:0;flowTip.position.y=1.45+(s.inspiration?-.12:.12);flowTip.visible=airflow.visible=layers.flow&&!isolate&&Math.abs(s.flow)>.001;
      redcells.forEach((cell,i)=>{const u=((s.seconds*.16+i/4)%1);cell.position.set(-1.2+2.4*u,-.93+.22*Math.pow(2*u-1,2),.1);});
      gases.forEach(g=>{const u=(s.seconds*.7+g.userData.index/5)%1;g.position.set(g.userData.sign*.16,-.65+(g.userData.sign===1?-u:u-1)*.38,.12);});
      detail?.sync(s);alveolarBulk.forEach(p=>{const u=(s.seconds*.38+p.userData.index/4)%1;p.position.set(0,s.flow>=0?1.6-u*1.25:.35+u*1.25,0);p.visible=layers.flow&&!isolate&&Math.abs(s.flow)>.001;});
      host.dataset.excursion=String(s.excursion);host.dataset.motionTime=String(s.seconds);host.querySelector('[data-breath-status]').textContent=mode==='alveolar'?'Magnified instructional 3D: cyan O₂ diffuses air → blood; gold CO₂ blood → air, each down its own partial-pressure gradient. Red cells move through the capillary independently. The translucent shell marks the exaggerated barrier; bulk air reaches the airspace but does not cross the wall; no microscopic or gas-transport solver. Pulmonary artery → capillaries → pulmonary veins. Red/blue elsewhere is a diagram convention; blood is always shades of red.':mode==='detail'?`${journey.state().stage.label} · magnified instructional reconstruction in the selected ${journey.state().lobe.replace('-', ' ')} lobe. Cyan bulk-air cues travel within the lumen toward the alveolar region on inspiration and reverse on expiration; gas diffusion is shown separately only at the alveolar barrier. Same mechanics clock: ${s.seconds.toFixed(2)} s.`:`${s.phase}: delivered tidal excursion ${s.delivered.toFixed(3)} L. Lung bases move more than the apices; airway roots share the same smooth deformation. Diaphragm ${s.parameters.ventilation==='positive'?'passively displaced in this comparison':s.inspiration?'contracts downward':'relaxes upward with recoil'}. Mesh displacement is illustrative, not a measured volume calibration.`;
      const scrub=host.querySelector('[data-breath-scrub]');scrub.max=s.period;scrub.value=s.seconds;
      for(const [selector,value]of [['[data-breath-rate]',s.parameters.rate],['[data-breath-depth]',s.parameters.target]]){const e=host.querySelector(selector);if(document.activeElement!==e)e.value=value;}
      host.querySelector('[data-breath-time]').textContent=`${s.seconds.toFixed(2)} / ${s.period.toFixed(2)} s · ${s.phase} · delivered ${s.delivered.toFixed(3)} L`;
      host.querySelector('[data-breath-play]').textContent=controls.playing?.()?'Pause simulation':'Play simulation';
      draw();
    }
    function selectStructure(id){if(E.bySource[id]){journey.go(E.bySource[id].id);return;}const mapping={trachea:'airways',rightbronchus:'airways',leftbronchus:'airways',lobar:'airways'};selected=mapping[id]||id;if(!anchors[selected])selected='rightlung';host.querySelector('[data-breath-select]').value=selected;visibility();}
    async function setMode(value){
      if(value==='alveolar'){journey?.go('membrane');return;}journey?.go('whole');
    }
    let journeyContext=null;
    function journeyGo(id,ctx){const prior=journeyContext;journeyContext=ctx;try{return journey.go(id);}finally{journeyContext=prior;}}
    async function applyJourney(s,ctx){
      if(disposed||suspended||(ctx&&!ctx.isCurrent()))return;
      if(s.index>0&&lastExplorerIndex===0&&!originalLocked){Object.assign(originalCamera,{yaw,pitch,distance,target:target.slice()});originalSelection=selected;originalLocked=true;}lastExplorerIndex=s.index;const token=++transitionToken;host.dataset.explorerStage=s.stage.id;host.dataset.explorerSource=s.sourceId||'';host.dataset.explorerSide=s.side;host.dataset.explorerLobe=s.lobe;
      if(s.index<=4){mode='whole';gross.visible=true;micro.visible=detailGroup.visible=false;selected=s.sourceId||originalSelection;if(s.index>0){opacity='ghost';host.querySelector('[data-breath-context]').value='ghost';}highlight(selected);host.querySelector('[data-breath-select]').value=selected;host.querySelector('[data-breath-mode]').value='whole';host.querySelector('[data-breath-layers]').hidden=false;
        if(s.index===0){yaw=originalCamera.yaw;pitch=originalCamera.pitch;selected=originalSelection;highlight(null);focusTo(originalCamera.target,originalCamera.distance,false,ctx);}
        else{const p=parts[s.sourceId],size=p?Math.max(...p.bounds[1].map((v,i)=>v-p.bounds[0][i])):1;focusTo(p?.center||[0,0,0],Math.max(.65,size*2.25),true,ctx);}
        visibility();return;
      }
      selected=s.origin.sourceName;highlight(selected);host.querySelector('[data-breath-layers]').hidden=true;
      if(s.index>=11){mode='alveolar';ensureMicro();gross.visible=detailGroup.visible=false;micro.visible=true;host.querySelector('[data-breath-mode]').value='alveolar';focusTo(s.index===12?[0,-.78,.1]:[0,0,0],s.index===12?2.4:4.6,true,ctx);}
      else{
        if(!detailPromise)detailPromise=load('explorer-detail.js',()=>window.RespiratoryExplorerDetail);
        try{await detailPromise;}catch(e){if(!disposed){host.querySelector('[data-breath-status]').textContent='Magnified 3D detail unavailable. The complete connected text route remains available below.';}return;}
        if(disposed||suspended||token!==transitionToken||(ctx&&!ctx.isCurrent()))return;if(!detail)detail=RespiratoryExplorerDetail.create(T,detailGroup);mode='detail';detail.build(s.stage.id);detail.setIsolated(isolate);gross.visible=micro.visible=false;detailGroup.visible=true;focusTo([0,0,0],4.6,true,ctx);
      }
      if(lastState)sync(lastState);else draw();
    }
    journey=E.mount(host.querySelector('[data-explorer-host]'),{onChange:s=>applyJourney(s,journeyContext),onReset:()=>resetOriginal()});host.querySelector('[data-explorer-quick-back]').onclick=()=>host.querySelector('[data-explorer-back]').click();host.querySelector('[data-explorer-quick-next]').onclick=()=>host.querySelector('[data-explorer-next]').click();
    function resetOriginal(){++transitionToken;lastExplorerIndex=0;originalLocked=false;cancelAnimationFrame(focusAnimation);yaw=originalCamera.yaw;pitch=originalCamera.pitch;target=originalCamera.target.slice();distance=originalCamera.distance;selected=originalSelection;mode='whole';gross.visible=true;micro.visible=detailGroup.visible=false;isolate=false;opacity='solid';for(const k in layers)layers[k]=true;host.querySelectorAll('[data-layer3d]').forEach(e=>e.checked=true);host.querySelector('[data-breath-mode]').value='whole';host.querySelector('[data-breath-select]').value=selected;host.querySelector('[data-breath-context]').value='solid';host.querySelector('[data-breath-layers]').hidden=false;highlight(null);visibility();if(lastState)sync(lastState);}
    host.querySelector('[data-breath-mode]').onchange=e=>setMode(e.target.value);
    host.querySelector('[data-breath-select]').onchange=e=>{selectStructure(e.target.value);if(E.bySource[e.target.value])return;onSelect?.(selected.includes('lung')?selected:selected.startsWith('right')?'rightlung':selected.startsWith('left')?'leftlung':selected==='airways'?'trachea':selected);};
    host.querySelector('[data-breath-isolate]').onclick=()=>{isolate=true;visibility();};host.querySelector('[data-breath-restore]').onclick=()=>{isolate=false;opacity='solid';host.querySelector('[data-breath-context]').value='solid';for(const k in layers)layers[k]=true;host.querySelectorAll('[data-layer3d]').forEach(e=>e.checked=true);visibility();};
    host.querySelector('[data-breath-context]').onchange=e=>{opacity=e.target.value;visibility();};
    host.querySelectorAll('[data-layer3d]').forEach(e=>e.onchange=()=>{layers[e.dataset.layer3d]=e.checked;visibility();});
    host.querySelector('[data-breath-leader]').oninput=e=>{line.setAttribute('stroke-width',+e.target.value+1);draw();};
    host.querySelectorAll('[data-breath-view]').forEach(b=>b.onclick=()=>{yaw={front:0,side:Math.PI/2,back:Math.PI,oblique:Math.PI/4}[b.dataset.breathView];pitch=0;draw();});
    function reset(){if(journey.state().index===0){yaw=pitch=0;target=originalCamera.target.slice();distance=9.5;draw();}else{yaw=pitch=0;applyJourney(journey.state());}}host.querySelector('[data-breath-reset]').onclick=reset;
    host.querySelectorAll('[data-breath-zoom]').forEach(b=>b.onclick=()=>{distance=Math.max(.3,Math.min(14,distance+ +b.dataset.breathZoom*(distance<2?.2:1)));draw();});
    host.querySelector('[data-breath-fullscreen]').onclick=async()=>{if(document.fullscreenElement)await document.exitFullscreen();else if(viewport.requestFullscreen)await viewport.requestFullscreen();else host.querySelector('[data-breath-status]').textContent='Fullscreen unavailable in this browser. Use landscape and zoom controls.';};
    host.querySelector('[data-breath-play]').onclick=()=>{controls.toggle?.();host.querySelector('[data-breath-play]').textContent=controls.playing?.()?'Pause simulation':'Play simulation';};
    host.querySelector('[data-breath-scrub]').oninput=e=>controls.scrub?.(+e.target.value);
    for(const [selector,key]of [['[data-breath-rate]','rate'],['[data-breath-depth]','target']])host.querySelector(selector).onchange=e=>{if(e.target.value!==''&&e.target.checkValidity())controls.parameter?.(key,+e.target.value);else if(lastState)e.target.value=lastState.parameters[key];};
    const pointers=new Map();let pinch=null,down=null;
    host.querySelector('[data-breath-touch]').onclick=e=>{touch=!touch;pointers.clear();pinch=null;canvas.style.touchAction=touch?'none':'pan-y';e.target.textContent=touch?'Unlock page scrolling':'Enable touch rotation / pinch';e.target.setAttribute('aria-pressed',touch);};
    canvas.onpointerdown=e=>{if(e.pointerType==='touch'&&!touch)return;pointers.set(e.pointerId,[e.clientX,e.clientY]);down=[e.clientX,e.clientY];pinch=null;canvas.setPointerCapture(e.pointerId);};
    canvas.onpointermove=e=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===1){yaw-=(e.clientX-old[0])*.008;pitch=Math.max(-1,Math.min(1,pitch+(e.clientY-old[1])*.008));}else{const [a,b]=[...pointers.values()],n=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch&&n>0)distance=Math.max(.3,Math.min(14,distance*pinch/n));pinch=n;}draw();};
    canvas.onpointerup=e=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<5&&mode==='whole'){
      // Screen-space picking uses actual deformed triangles, with frontmost depth.
      const rect=canvas.getBoundingClientRect(),px=(e.clientX-rect.left)/rect.width*2-1,py=1-(e.clientY-rect.top)/rect.height*2;let nearest=null,depth=Infinity;
      for(const mesh of pickable){if(!mesh.visible)continue;const pos=mesh.geometry.attributes.position,idx=mesh.geometry.index.array;
        for(let k=0;k<idx.length;k+=3){const p=[idx[k],idx[k+1],idx[k+2]].map(i=>new T.Vector3(pos.getX(i),pos.getY(i),pos.getZ(i)).project(camera));const area=(p[1].y-p[2].y)*(p[0].x-p[2].x)+(p[2].x-p[1].x)*(p[0].y-p[2].y);if(Math.abs(area)<1e-12)continue;const u=((p[1].y-p[2].y)*(px-p[2].x)+(p[2].x-p[1].x)*(py-p[2].y))/area,v=((p[2].y-p[0].y)*(px-p[2].x)+(p[0].x-p[2].x)*(py-p[2].y))/area,z=u*p[0].z+v*p[1].z+(1-u-v)*p[2].z;if(u>=0&&v>=0&&u+v<=1&&z<depth){nearest=mesh.name==='airways'?(metadata.parts.find(p=>k>=p.indexStart&&k<p.indexStart+p.indexCount)?.sourceName||mesh.name):mesh.name;depth=z;}}
      }if(nearest){if(E.bySource[nearest]){journey.go(E.bySource[nearest].id);}else selectStructure(nearest);onSelect?.(E.bySource[nearest]?E.bySource[nearest].side==='left'?'leftbronchus':E.bySource[nearest].side==='right'?'rightbronchus':'trachea':nearest.startsWith('right')?'rightlung':nearest.startsWith('left')?'leftlung':nearest==='airways'?'trachea':nearest);}
    }pointers.delete(e.pointerId);pinch=null;down=null;};
    canvas.onpointercancel=canvas.onlostpointercapture=e=>{pointers.delete(e.pointerId);pinch=null;down=null;};
    canvas.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home')return reset();if(e.key==='ArrowLeft')yaw-=.12;if(e.key==='ArrowRight')yaw+=.12;if(e.key==='ArrowUp')pitch=Math.min(1,pitch+.1);if(e.key==='ArrowDown')pitch=Math.max(-1,pitch-.1);if(e.key==='+')distance=Math.max(.3,distance*.9);if(e.key==='-')distance=Math.min(14,distance*1.1);draw();};
    const observer=new ResizeObserver(resize);observer.observe(box);
    function suspend(){if(disposed)return false;if(suspended)return true;suspended=true;++transitionToken;cancelAnimationFrame(focusAnimation);focusAnimation=0;observer.disconnect();return true;}
    function resume(){if(disposed)return false;if(!suspended)return true;suspended=false;observer.observe(box);resize();return true;}
    function dispose(){if(disposed)return;disposed=true;suspended=false;++transitionToken;cancelAnimationFrame(focusAnimation);focusAnimation=0;let error;const clean=fn=>{try{fn();}catch(e){error=error||e;}};clean(()=>detail?.dispose());clean(()=>journey?.dispose());clean(()=>observer.disconnect());clean(()=>document.removeEventListener('fullscreenchange',fullChange));scene.traverse(o=>{clean(()=>o.geometry?.dispose());clean(()=>o.material?.dispose());});clean(()=>renderer.dispose());clean(()=>renderer.forceContextLoss());if(host.__respiratorySceneOwner===owner){delete host.__respiratorySceneOwner;clean(()=>host.replaceChildren());}if(error){cleanupError=error.message||String(error);throw error;}}
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();if(disposed)return;try{dispose();}catch(e){cleanupError=e.message||String(e);}const message='Moving graphics became unavailable; use complete 2D/text fallback.'+(cleanupError?' Resource cleanup: '+cleanupError:'');try{onFailure(message);}catch(e){cleanupError=cleanupError||e.message||String(e);host.dataset.cleanupError=cleanupError;}});
    host.dataset.ready='true';host.dataset.dynamic='true';visibility();resize();
    function snapshot(){return {version:1,camera:{yaw,pitch,distance,target:target.slice()},selected,mode,isolate,opacity,layers:{...layers},journey:{id:journey.state().id,segment:journey.state().segment},originalCamera:{...originalCamera,target:originalCamera.target.slice()},originalSelection,originalLocked,lastExplorerIndex};}
    async function restoreSnapshot(saved,ctx){
      if(!saved||disposed||suspended||(ctx&&!ctx.isCurrent()))return;
      if(saved.journey?.segment)journeyGo(saved.journey.segment,ctx);
      if(saved.journey?.id)journeyGo(saved.journey.id,ctx);
      await applyJourney(journey.state(),ctx);if(disposed||suspended||(ctx&&!ctx.isCurrent()))return;
      ++transitionToken;cancelAnimationFrame(focusAnimation);
      const c=saved.camera;if(c&&[c.yaw,c.pitch,c.distance,...(c.target||[])].every(Number.isFinite)&&c.target?.length===3){yaw=c.yaw;pitch=c.pitch;distance=Math.max(.3,Math.min(14,c.distance));target=c.target.slice();}
      if(saved.originalCamera?.target?.length===3)Object.assign(originalCamera,saved.originalCamera,{target:saved.originalCamera.target.slice()});
      if(saved.originalSelection)originalSelection=saved.originalSelection;
      if(typeof saved.originalLocked==='boolean')originalLocked=saved.originalLocked;
      lastExplorerIndex=journey.state().index;
      if(saved.selected&&anchors[saved.selected])selected=saved.selected;
      isolate=!!saved.isolate;opacity=['solid','ghost','cutaway'].includes(saved.opacity)?saved.opacity:'solid';
      if(saved.layers)for(const k in layers)if(typeof saved.layers[k]==='boolean')layers[k]=saved.layers[k];
      host.querySelectorAll('[data-layer3d]').forEach(e=>e.checked=layers[e.dataset.layer3d]);
      host.querySelector('[data-breath-context]').value=opacity;host.querySelector('[data-breath-select]').value=selected;
      visibility();if(lastState)sync(lastState);
    }
    async function applyGuidedScene(spec,ctx){
      const current=()=>!disposed&&!suspended&&(!ctx||ctx.isCurrent());if(!current())return false;
      let preparation;batchDraw(()=>{
        if(spec.segment){if(!E.bySource[spec.segment]&&!E.nodes.some(n=>n.id===spec.segment))throw Error('Unknown guided airway source.');journeyGo(spec.segment,ctx);}
        if(spec.stage){if(!E.stages.some(s=>s.id===spec.stage))throw Error('Unknown guided airway stage.');journeyGo(spec.stage,ctx);}
        preparation=applyJourney(journey.state(),ctx);
      });
      await preparation;if(!current())return false;
      return batchDraw(()=>{
      ++transitionToken;cancelAnimationFrame(focusAnimation);const s=journey.state(),part=parts[s.sourceId];
      // These are the existing stage framing rules, applied without a competing
      // camera animation. The source coordinates and microscopic scale stay put.
      yaw=spec.preset==='oblique'?.45:spec.preset==='back'?Math.PI:0;pitch=0;
      if(s.index===0){target=[0,-.4,0];distance=9.5;Object.assign(originalCamera,{yaw:0,pitch:0,distance:9.5,target:target.slice()});}
      else if(s.index<=4){target=part?.center?.slice()||[0,0,0];distance=Math.max(.65,part?Math.max(...part.bounds[1].map((v,i)=>v-part.bounds[0][i]))*2.25:2.25);}
      else{target=s.index===12?[0,-.78,.1]:[0,0,0];distance=s.index===12?2.4:4.6;}
      if(spec.camera?.target?.length===3){const c=spec.camera;if([c.yaw,c.pitch,c.distance,...c.target].every(Number.isFinite)){yaw=c.yaw;pitch=c.pitch;distance=Math.max(.3,Math.min(14,c.distance));target=c.target.slice();}}
      isolate=false;opacity=s.index>0&&s.index<=4?'ghost':'solid';for(const k in layers)layers[k]=true;host.querySelectorAll('[data-layer3d]').forEach(e=>e.checked=true);host.querySelector('[data-breath-context]').value=opacity;
      if(spec.selected)selectStructure(spec.selected);visibility();if(lastState)sync(lastState);return true;
      });
    }
    return {applyGuidedScene,batchDraw,sync,dispose,suspend,resume,isUsable:()=>!disposed&&host.__respiratorySceneOwner===owner&&canvas.isConnected&&!renderer.getContext().isContextLost(),selectStructure,refreshLayout:resize,setMode,snapshot,restoreSnapshot,goExplorer:id=>journey.go(id),inspect:()=>({selected,mode,lifecycle:{disposed,suspended,cleanupError,focusAnimationPending:!!focusAnimation},explorer:{...journey.state(),stage:journey.state().stage.id,route:journey.state().path,parentAnchor:parts[journey.state().origin.sourceName]?.center,sourceBoundary:journey.state().provenance,detailLoaded:!!detail,detailBudget:detail?.inspect(),sourceHighlight:{sourceName:sourceHighlight.userData.sourceName,visible:sourceHighlight.visible,indexCount:highlightGeometry.index?.count||0,rendered:sourceHighlight.visible&&(mode==='whole'?gross.visible:insetRendered)},insetRendered,isolate,originalCamera:{...originalCamera,selected:originalSelection}},excursion:lastState?.excursion,vertices:dynamic.map(d=>{const ids=[0];let low=0,high=0;for(let i=0;i<d.rest.length;i+=3){if(d.rest[i+1]<d.rest[low+1])low=i;if(d.rest[i+1]>d.rest[high+1])high=i;}ids.push(low,high,Math.floor(d.rest.length/6)*3);return {name:d.mesh.name,rest:ids.flatMap(i=>Array.from(d.rest.slice(i,i+3))),current:ids.flatMap(i=>Array.from(d.mesh.geometry.attributes.position.array.slice(i,i+3)))};}),anchors,camera:{yaw,pitch,distance,target:target.slice()}})};
  }
};
