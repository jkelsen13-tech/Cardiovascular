/* Production controller metadata/readout contract. CPU evidence is not an FPS claim. */
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),cp=require('node:child_process');
const {Document}=require('../qualification/overview-dom-harness.cjs');
const M=require('../../heart-study-v3/model.js'),F=require('../../heart-study-v3/flow.js');
const repo=path.resolve(__dirname,'../..'),file='heart-study-v3/module.js',frozen='1c60012a8113c931dc2196258646fdd439bd2be0';
const historical=cp.execFileSync('git',['show',frozen+':'+file],{cwd:repo,encoding:'utf8'});
const sourceRef=process.env.CONTROLLER_SOURCE_REF||null;
const source=sourceRef?cp.execFileSync('git',['show',sourceRef+':'+file],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,file),'utf8');
const take=(s,name)=>{const a=s.indexOf('  function '+name+'('),b=s.indexOf('\n  function ',a+1);A(a>=0&&b>a,name);return s.slice(a,b);};
const line=(s,start,end)=>{const a=s.indexOf(start),b=s.indexOf(end,a);A(a>=0&&b>a,start);return s.slice(a,b);};
const legacy={
 metrics:'function updateMetrics(){'+line(historical,"root.querySelector('[data-h3-metrics]').innerHTML=",'\n')+'}',
 clock:'function updatePhaseClock(){'+line(historical,"root.querySelector('[data-h3-clock]').innerHTML=","root.querySelector('[data-h3-electrical-summary]')")+'}',
 chamber:'function updateChamberReadout(readout,ch){'+line(historical,"readout.innerHTML='<h3>'",'panel.dataset.h3ChamberFocus=ch.id;')+'}'
};
const implementation=s=>take(s,'updateSceneCaption')+'\n'+[['updateMetrics','metrics'],['updatePhaseClock','clock'],['updateChamberReadout','chamber']].map(([name,key])=>s.includes('  function '+name+'(')?take(s,name):legacy[key]).join('\n');
const phaseNames={'passive-filling':'Passive filling','atrial-contraction':'Atrial contraction','isovolumetric-contraction':'Isovolumetric contraction',ejection:'Ejection','isovolumetric-relaxation':'Isovolumetric relaxation',diastasis:'Diastasis'};
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const failures=[],checks=[];function check(name,fn){try{fn();checks.push({name,passed:true});}catch(e){failures.push({name,message:e.message});checks.push({name,passed:false});}}
function harness(s){
 const document=new Document(),nodes=new Map(),node=q=>{if(!nodes.has(q))nodes.set(q,document.createElement('div'));return nodes.get(q);},buttons=[document.createElement('button'),document.createElement('button')];buttons.forEach(b=>b.disabled=false);
 const counts={heavy:0,light:0},context={document,phaseNames,esc,state:{mode:'whole',selected:'lv',labels:true,route:null},names:{lv:'Left ventricle',rv:'Right ventricle',aortic:'Aortic semilunar valve',atrialSeptum:'Interatrial septum'},savedCamera:null,camera:{yaw:0,pitch:.08},info:{},model:null,sample:null,root:{querySelector:node,querySelectorAll:()=>buttons}};
 context.renderer={snapshot:()=>context.camera,presentationInfo:()=>{counts.light++;return context.info;},inspect:()=>{counts.heavy++;return context.info;}};
 vm.createContext(context);vm.runInContext(implementation(s),context);return {context,document,node,buttons,counts};
}
const current=harness(source),old=harness(historical),captionOutput=h=>({text:['orientation','selected-context','pocket-selected','representation-status','representation'].map(k=>h.node('[data-h3-'+k+']').textContent),hidden:h.node('[data-h3-pocket-selected]').hidden,aria:h.node('[data-h3-pocket-selected]').getAttribute('aria-label'),disabled:h.buttons.map(b=>b.disabled)});
let scenarios=0;
check('Caption text, labels, accessibility and view metadata equal the frozen production outputs',()=>{
 for(const mode of ['whole','exterior','four-chamber','outflow','cutaway'])for(const selected of ['lv','aortic','atrialSeptum'])for(const labels of [true,false])for(const route of [null,'routeB'])for(const camera of [{yaw:0,pitch:.08},{yaw:Math.PI,pitch:.9}])for(const info of [{},{inspectionValve:'aortic'},{isolationRepresentation:'Retained original source at its location',selectedSourceMesh:'VH_F_test_mesh'},{supplementary:'Representative septum diagram'}]){
  for(const h of [current,old]){Object.assign(h.context.state,{mode,selected,labels,route});h.context.camera=camera;h.context.info=info;h.context.updateSceneCaption();}A.deepEqual(captionOutput(current),captionOutput(old));scenarios++;
 }
});
check('Caption uses lightweight metadata and never full inspection on the normal renderer path',()=>{A.equal(current.counts.heavy,0);A.equal(current.counts.light,scenarios);});
check('An unchanged caption performs zero further text/attribute writes',()=>{const before=current.document.writes;for(let i=0;i<100;i++)current.context.updateSceneCaption();A.equal(current.document.writes,before);});
check('Diagnostic fallback remains compatible with a renderer lacking the new metadata API',()=>{const h=harness(source);delete h.context.renderer.presentationInfo;h.context.info={inspectionValve:'aortic'};h.context.updateSceneCaption();A.equal(h.counts.heavy,1);A(h.node('[data-h3-representation]').textContent.includes('illustrative leaflet opening'));});
check('Electrical captions describe registered inspection and separate cells without promising deleted routes',()=>{
 const h=harness(source);for(const selected of ['sa','avnode','his','purkinje']){
  h.context.state.selected=selected;h.context.info={supplementary:'Inferred electrical structure.'};h.context.updateSceneCaption();const text=h.node('[data-h3-representation]').textContent;
  A.equal(text,'Inferred electrical structure. Registered electrical structures are inspected on this anatomical heart. Cellular lessons show separate representative mechanisms.');A.doesNotMatch(text,/connected route/);
 }
});
const elements=n=>[n,...n.children.flatMap(elements)],sameElements=(a,b)=>a.length===b.length&&a.every((n,i)=>n===b[i]);let sampleChecks=0,raw={};
for(const heartRate of [55,75,110]){
 const model=M.build({heartRate}),beforeModel=JSON.stringify(model.samples),a=harness(source),b=harness(historical),readoutA=a.document.createElement('div'),readoutB=b.document.createElement('div');
 for(const h of [a,b])h.context.model=model;
 check('Live numeric/phase/chamber text equals frozen production at HR'+heartRate,()=>{
  for(let i=0;i<=80;i++){
   const sample=model.sample(model.period*i/80);a.context.sample=b.context.sample=sample;a.context.updateMetrics();b.context.updateMetrics();a.context.updatePhaseClock();b.context.updatePhaseClock();
   A.equal(a.node('[data-h3-metrics]').textContent,b.node('[data-h3-metrics]').textContent);A.equal(a.node('[data-h3-clock]').textContent,b.node('[data-h3-clock]').textContent);
   for(const id of ['ra','rv','la','lv']){const ch=F.chamber(sample,id);a.context.updateChamberReadout(readoutA,ch);b.context.updateChamberReadout(readoutB,ch);A.equal(readoutA.textContent,readoutB.textContent);sampleChecks++;}
  }
 });
 const metric=a.node('[data-h3-metrics]'),clock=a.node('[data-h3-clock]'),initialMetrics=elements(metric),initialClock=elements(clock),initialReadout=elements(readoutA);
 check('Unchanged samples retain all readout elements and cause zero subtree writes at HR'+heartRate,()=>{
  const before=a.document.writes,builds=[metric.innerHTMLWrites,clock.innerHTMLWrites,readoutA.innerHTMLWrites];
  for(let i=0;i<100;i++){a.context.updateMetrics();a.context.updatePhaseClock();a.context.updateChamberReadout(readoutA,F.chamber(a.context.sample,'lv'));}
  A.equal(a.document.writes,before);A(sameElements(elements(metric),initialMetrics),'Metric element identity retained');A(sameElements(elements(clock),initialClock),'Clock element identity retained');A(sameElements(elements(readoutA),initialReadout),'Focused readout identity retained');A.deepEqual([metric.innerHTMLWrites,clock.innerHTMLWrites,readoutA.innerHTMLWrites],builds);
 });
 check('Actual phase/value changes retain metric/clock/chamber scaffold at HR'+heartRate,()=>{
  const sample=model.sample(.14*model.period);a.context.sample=sample;a.context.updateMetrics();a.context.updatePhaseClock();a.context.updateChamberReadout(readoutA,F.chamber(sample,'rv'));
  A(sameElements(elements(metric),initialMetrics),'Metric element identity retained');A(sameElements(elements(clock),initialClock),'Clock element identity retained');A(sameElements(elements(readoutA).filter(n=>!n.hasAttribute('data-h3-venous-reversal')),initialReadout.filter(n=>!n.hasAttribute('data-h3-venous-reversal'))),'Focused scaffold identity retained across chamber/phase changes');
 });
 check('Rebuilds use the new model metrics without changing physiological samples at HR'+heartRate,()=>{
  a.context.model={...model,metrics:{left:{strokeVolume:51,cardiacOutput:4.1,ejectionFraction:58},right:{strokeVolume:49,cardiacOutput:3.9,ejectionFraction:55}}};a.context.updateMetrics();A(a.node('[data-h3-metrics]').textContent.includes('SV 51.0 mL · CO 4.10 L/min · EF 58.0%'));A.equal(JSON.stringify(model.samples),beforeModel);
 });
 raw[heartRate]={metricScaffoldWrites:metric.innerHTMLWrites,clockScaffoldWrites:clock.innerHTMLWrites,focusedReadoutScaffoldWrites:readoutA.innerHTMLWrites};
}
const result={passed:!failures.length,sourceRef,sourceSHA256:crypto.createHash('sha256').update(source).digest('hex'),frozenComparison:frozen,checks:checks.length,captionScenarios:scenarios,liveChamberComparisons:sampleChecks,captionCalls:current.counts,scaffoldWrites:raw,results:checks,failures,limits:'Actual production functions executed in retained CPU DOM harness; not rendered output, GPU/device timing, audio presentation or clinical validation.'};
if(process.env.CONTROLLER_RETAINED_OUT){fs.mkdirSync(process.env.CONTROLLER_RETAINED_OUT,{recursive:true});fs.writeFileSync(path.join(process.env.CONTROLLER_RETAINED_OUT,'result.json'),JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify(result,null,2));process.exitCode=result.passed?0:1;
