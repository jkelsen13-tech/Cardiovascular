/* Numerical geometry checks are separate from circulation-model validation. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'../..'),A=require(path.join(base,'heart-study-v3/anatomy.js')),M=require(path.join(base,'heart-study-v3/model.js'));
// Independent tetrahedron volume, with a non-origin translation to exercise the signed formula.
assert(Math.abs(A.signedVolume([2,3,4,3,3,4,2,4,4,2,3,5],[0,2,1,0,1,3,0,3,2,1,2,3])-1/6)<1e-12);
const sandbox={console,AbortController,TextEncoder,TextDecoder,Headers,Request,Response,URL,performance,Float32Array,Uint32Array,Uint16Array};vm.runInNewContext(fs.readFileSync(path.join(base,'ecg-study/vendor/three-gltf.min.js'),'utf8'),sandbox);const T=sandbox.EcgThree;
const templates=Object.fromEntries(Object.keys(A.chamberSpec).map(id=>[id,A.cavityTemplate(id)]));
for(const template of Object.values(templates)){
 const edges=new Map();for(let i=0;i<template.indices.length;i+=3)for(let k=0;k<3;k++){const a=template.indices[i+k],b=template.indices[i+(k+1)%3],key=a<b?a+','+b:b+','+a,sign=a<b?1:-1;const e=edges.get(key)||{count:0,sign:0};e.count++;e.sign+=sign;edges.set(key,e);}
 assert([...edges.values()].every(e=>e.count===2&&e.sign===0),'Closed and consistently oriented cavity topology');
}
let maxRelativeVolumeError=0,maxTissueError=0,maxPapillaryAttachmentError=0,minLeftRightSeparation=Infinity,checkedStates=0,isoPressureRange=0;
const anatomy=A.create(T),cases=[];
for(const heartRate of [55,110])for(const bloodVolume of [4600,5400])for(const systemicResistance of [.8,1.4])for(const contractility of [.8,1.25])cases.push({heartRate,bloodVolume,systemicResistance,contractility});
cases.push({heartRate:75,bloodVolume:5000,systemicResistance:1.05,contractility:1});
for(const parameters of cases){const model=M.build(parameters);let isoFirst=null,isoLast=null;
 for(let i=0;i<36;i++){const sample=model.sample(model.period*i/36);anatomy.sync(sample);const report=anatomy.inspect();checkedStates++;
  for(const [id,c]of Object.entries(report.cavities)){assert(Number.isFinite(c.geometricVolume)&&c.geometricVolume>0);maxRelativeVolumeError=Math.max(maxRelativeVolumeError,c.relativeError);const tissueError=Math.abs(c.wallTissueVolume-c.wallTissueTarget)/c.wallTissueTarget;maxTissueError=Math.max(maxTissueError,tissueError);assert(tissueError<1e-5,'Tissue and blood cavity are distinct volumes');
   const template=templates[id],d=A.deformCavity(template,id,sample),portRing=A.chamberSpec[id].kind==='atrial'?0:template.rings;for(let k=0;k<template.segments;k++){const offset=(portRing*template.segments+k)*3;for(let j=0;j<3;j++)assert(Math.abs(d.positions[offset+j]-template.positions[offset+j])<1e-6,'Valve port remains fixed');}
  }
  for(const support of report.supports){maxPapillaryAttachmentError=Math.max(maxPapillaryAttachmentError,support.attachmentError);assert(support.attachmentError<1e-6,'Papillary base attached to deformed endocardial vertex');const side=support.chamber==='lv'?1:-1;for(const endpoint of [support.base,support.tip,...support.ends])assert(side*endpoint[0]>.05,'Support must not cross the ventricular septum');}
  for(const [id,valve]of Object.entries(report.valves)){assert.equal(valve.open,sample.valves[id].open);if(!valve.open)assert.equal(valve.flow,0);assert.equal(valve.leaflets,id==='mitral'?2:3);}
  for(const [right,left]of [['ra','la'],['rv','lv']]){const rd=A.deformCavity(templates[right],right,sample).positions,ld=A.deformCavity(templates[left],left,sample).positions;let rmax=-Infinity,lmin=Infinity;for(let i=0;i<rd.length;i+=3)rmax=Math.max(rmax,rd[i]);for(let i=0;i<ld.length;i+=3)lmin=Math.min(lmin,ld[i]);minLeftRightSeparation=Math.min(minLeftRightSeparation,lmin-rmax);assert(lmin-rmax>.05,'No normal left/right cavity intersection');}
  if(sample.leftPhase==='isovolumetric-contraction'){if(!isoFirst)isoFirst={p:sample.chambers.lv.pressure,v:report.cavities.lv.geometricVolume};isoLast={p:sample.chambers.lv.pressure,v:report.cavities.lv.geometricVolume};}
 }
 if(isoFirst&&isoLast){assert(Math.abs(isoLast.v-isoFirst.v)/isoFirst.v<1e-5);isoPressureRange=Math.max(isoPressureRange,Math.abs(isoLast.p-isoFirst.p));}
}
assert(maxRelativeVolumeError<1e-6);assert(isoPressureRange>5,'Isovolumetric pressure changes without visible cavity emptying');
const defaultModel=M.build({}),early=defaultModel.sample(.16),late=defaultModel.sample(.36),d0=A.deformCavity(templates.lv,'lv',early),d1=A.deformCavity(templates.lv,'lv',late);
const port=templates.lv.rings*templates.lv.segments*3,apex=0;assert(Math.hypot(d1.positions[apex]-d0.positions[apex],d1.positions[apex+1]-d0.positions[apex+1],d1.positions[apex+2]-d0.positions[apex+2])>.01);assert.deepEqual(Array.from(d0.positions.slice(port,port+3)),Array.from(d1.positions.slice(port,port+3)),'Fixed port with moving apex excludes rigid/global uniform scaling');
anatomy.dispose();
const report={result:'PASS',testIds:['H3-01','H3-02','H3-03','H3-04'],parameterCases:cases.length,checkedStates,maxRelativeVolumeError,maxTissueError,maxPapillaryAttachmentError,minLeftRightSeparation,isoPressureRange,scope:'Teaching cavities, supports and valve-state mapping. Source mesh topology separately inventoried. Not a proof of detailed tissue accuracy or physical-device rendering.'};
fs.mkdirSync(path.join(base,'review-heart-v3'),{recursive:true});fs.writeFileSync(path.join(base,'review-heart-v3/geometry.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
