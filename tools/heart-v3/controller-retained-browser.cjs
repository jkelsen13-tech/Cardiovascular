/* Real browser metadata/readout retention, semantics and served-source proof. */
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require('playwright');
const repo=path.resolve(__dirname,'../..'),out=process.env.CONTROLLER_BROWSER_OUT||path.join(repo,'review-heart-v3/controller-retained');
const base=process.env.CARDIO_BASE_URL||'http://127.0.0.1:8890/';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:1000}}),errors=[],served={};page.on('pageerror',e=>errors.push(e.message));
  page.on('response',async response=>{const u=new URL(response.url()),m=u.pathname.match(/\/(heart-study-v3\/(?:module|renderer|sourced-anatomy)\.js)$/);if(m)served[m[1]]=hash(await response.body());});
  await page.addInitScript(()=>{
   Object.defineProperty(window,'HeartV3Renderer',{configurable:true,set(api){
    const mount=api.mount;api.mount=function(...args){const renderer=mount.apply(this,args),calls={inspect:0,presentationInfo:0};for(const name of Object.keys(calls)){const original=renderer[name];if(original)renderer[name]=function(...a){calls[name]++;return original.apply(this,a);};}window.__retainedController={renderer,calls};return renderer;};
    Object.defineProperty(window,'HeartV3Renderer',{value:api,writable:true,configurable:true});
   }});
  });
  await page.goto(base);await page.click('#heartV3Launch');await page.waitForFunction(()=>HeartV3Study.inspect().renderer?.sourceReady);await page.locator('[data-h3-mode="four-chamber"]').evaluate(e=>e.click());await page.evaluate(()=>{HeartV3Study.pause();HeartV3Study.seek(.36);});
  await page.locator('[data-h3-render-host]').scrollIntoViewIfNeeded();await page.waitForFunction(()=>{const r=HeartV3Study.inspect().renderer;return r?.viewportVisible&&r.renderCount>0&&r.memory.geometries>0;});
  // Both frozen and current renderers lazily upload eight existing geometries
  // on the first filling phase. Warm that phase before the stable-cache check.
  await page.evaluate(()=>{HeartV3Study.seek(0);HeartV3Study.seek(.36);});
  const initial=await page.evaluate(()=>{
   const p=__retainedController,full=p.renderer.inspect(),info=p.renderer.presentationInfo();for(const key of ['inspectionValve','isolationRepresentation','selectedSourceMesh','supplementary'])if(JSON.stringify(info[key])!==JSON.stringify(full[key]))throw Error('Metadata differs: '+key);
   window.__retainedNodes={metrics:[...document.querySelector('[data-h3-metrics]').querySelectorAll('*')],clock:[...document.querySelector('[data-h3-clock]').querySelectorAll('*')],readout:[...document.querySelector('[data-h3-chamber-readout]').querySelectorAll('*')]};
   const watched=['[data-h3-metrics]','[data-h3-clock]','[data-h3-chamber-readout]','[data-h3-orientation]','[data-h3-selected-context]','[data-h3-pocket-selected]','[data-h3-representation-status]','[data-h3-representation]'];
   window.__retainedMutations=[];window.__retainedObserver=new MutationObserver(records=>__retainedMutations.push(...records.map(r=>({type:r.type,target:r.target.nodeName}))));for(const s of watched)__retainedObserver.observe(document.querySelector(s),{attributes:true,childList:true,subtree:true,characterData:true});
   p.calls.inspect=p.calls.presentationInfo=0;const sourceGeometry=[];p.renderer.getContext().heartGroup.traverse(o=>{if(o.isMesh&&o.userData.source)sourceGeometry.push({name:o.name,uuid:o.geometry.uuid,vertices:o.geometry.attributes.position.count,indices:o.geometry.index?.count||0});});return {camera:p.renderer.snapshot(),geometry:full.memory.geometries,sourceGeometry,storage:{...localStorage}};
  });
  await page.evaluate(()=>{for(let i=0;i<12;i++)HeartV3Study.seek(.36);});
  const unchanged=await page.evaluate(()=>({calls:{...__retainedController.calls},mutations:__retainedMutations.slice()}));A.equal(unchanged.calls.inspect,0,'Clock sync must not request full diagnostic inspection');A.equal(unchanged.calls.presentationInfo,12);A.deepEqual(unchanged.mutations,[],'Unchanged monitored readouts/captions must not rewrite DOM');
  const samples=await page.evaluate(()=>{
   const result=[],model=HeartV3Study.getModel();for(const t of [0,.04,.075,.113,.14,.25,.33,.36,.492,.65,.79]){
    HeartV3Study.seek(t);const sample=HeartV3Study.getState().sample,metric=document.querySelector('[data-h3-metrics]');
    for(const id of ['lv','rv']){const c=sample.chambers[id],expected=id.toUpperCase()+' '+c.volume.toFixed(1)+' mL · '+c.pressure.toFixed(1)+' mmHg';if(metric.querySelector('[data-h3-metric="'+id+'"]').textContent!==expected)throw Error('Metric not current: '+id);}
    const same=(key,selector)=>{const now=[...document.querySelector(selector).querySelectorAll('*')],saved=__retainedNodes[key];return now.length===saved.length&&now.every((n,i)=>n===saved[i]);};if(!same('metrics','[data-h3-metrics]')||!same('clock','[data-h3-clock]'))throw Error('Metric/clock scaffold replaced');
    result.push({time:t,left:sample.leftPhase,right:sample.rightPhase,lv:sample.chambers.lv.volume,rv:sample.chambers.rv.volume});
   }return result;
  });
  A.equal(await page.evaluate(()=>__retainedController.calls.inspect),0);
  const chambers=[];
  for(const id of ['la','rv','ra','lv']){
   await page.locator('[data-h3-action="chamber"][data-h3-chamber="'+id+'"]').evaluate(e=>e.click());await page.evaluate(()=>HeartV3Study.seek(.113));
   const record=await page.evaluate(id=>{
    const sample=HeartV3Study.getState().sample,ch=HeartV3Flow.chamber(sample,id),readout=document.querySelector('[data-h3-chamber-readout]'),original=__retainedNodes.readout.filter(n=>!n.hasAttribute('data-h3-venous-reversal')),now=[...readout.querySelectorAll('*')].filter(n=>!n.hasAttribute('data-h3-venous-reversal'));
    if(now.length!==original.length||!now.every((n,i)=>n===original[i]))throw Error('Focused chamber scaffold replaced');
    if(readout.querySelector('[data-h3-readout-values]').textContent!==ch.volume.toFixed(1)+' mL · '+ch.pressure.toFixed(1)+' mmHg')throw Error('Focused values stale');
    if(!!readout.querySelector('[data-h3-venous-reversal]')!==(id==='la'&&ch.inflow<0))throw Error('Reversal note does not match signed inflow');return {id,volume:ch.volume,pressure:ch.pressure,inflow:ch.inflow,reversal:!!readout.querySelector('[data-h3-venous-reversal]')};
   },id);chambers.push(record);
  }
  await page.locator('[data-h3-render-host]').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'retained-current-readouts.png'),fullPage:true});
  const final=await page.evaluate(()=>{__retainedObserver.disconnect();const p=__retainedController,sourceGeometry=[];p.renderer.getContext().heartGroup.traverse(o=>{if(o.isMesh&&o.userData.source)sourceGeometry.push({name:o.name,uuid:o.geometry.uuid,vertices:o.geometry.attributes.position.count,indices:o.geometry.index?.count||0});});return {camera:p.renderer.snapshot(),geometry:p.renderer.inspect().memory.geometries,sourceGeometry,storage:{...localStorage},calls:p.calls};});
  for(const key of ['yaw','pitch','distance','target'])A.deepEqual(final.camera[key],initial.camera[key]);A.equal(final.geometry,initial.geometry);A.equal(initial.sourceGeometry.length,51);A.deepEqual(final.sourceGeometry,initial.sourceGeometry);A.deepEqual(final.storage,initial.storage);A.deepEqual(errors,[]);
  for(const file of ['heart-study-v3/module.js','heart-study-v3/renderer.js','heart-study-v3/sourced-anatomy.js'])A.equal(served[file],hash(fs.readFileSync(path.join(repo,file))),'Actual HTTP bytes: '+file);
  const receipt={passed:true,createdUTC:new Date().toISOString(),browser:browser.version(),served,unchanged,samples,chambers,cameraPreserved:true,geometriesPreserved:true,originalSourceMeshes:initial.sourceGeometry.length,uploadedGeometriesAfterWarmup:{before:initial.geometry,after:final.geometry},storagePreserved:true,errors,limits:'Cloud Chromium real DOM/source evidence. Monitored unchanged readout/caption writes are zero; unrelated DOM writes remain outside this claim. No FPS, physical display, speaker, iPad/Safari or clinical validation.'};
  fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
