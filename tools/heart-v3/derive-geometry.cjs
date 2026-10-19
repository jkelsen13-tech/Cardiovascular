/* Reproducible HRA geometry registration/inventory; never changes source payload. */
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'heart-study-v3/assets');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'ecg-study/assets/model-data.js'),'utf8'),sandbox);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'ecg-study/assets/model-manifest.json')));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),sub=(a,b)=>a.map((v,i)=>v-b[i]),mul=(a,s)=>a.map(v=>v*s),add=(a,b)=>a.map((v,i)=>v+b[i]);
const norm=a=>mul(a,1/Math.hypot(...a)),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const identity=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
const matmul=(a,b)=>{let r=Array(16).fill(0);for(let c=0;c<4;c++)for(let i=0;i<4;i++)for(let k=0;k<4;k++)r[c*4+i]+=a[k*4+i]*b[c*4+k];return r;};
function nodeMatrix(n){if(n.matrix)return n.matrix;const [x,y,z,w]=n.rotation||[0,0,0,1],[sx,sy,sz]=n.scale||[1,1,1],t=n.translation||[0,0,0];return [(1-2*y*y-2*z*z)*sx,(2*x*y+2*w*z)*sx,(2*x*z-2*w*y)*sx,0,(2*x*y-2*w*z)*sy,(1-2*x*x-2*z*z)*sy,(2*y*z+2*w*x)*sy,0,(2*x*z+2*w*y)*sz,(2*y*z-2*w*x)*sz,(1-2*x*x-2*y*y)*sz,0,...t,1];}
const transform=(p,m)=>[0,1,2].map(i=>m[i]*p[0]+m[4+i]*p[1]+m[8+i]*p[2]+m[12+i]);
const meshes=[],sources=[];
for(const model of manifest.models){
 const b=Buffer.from(sandbox.window.EcgHeartModelData[model.id],'base64'),sha256=crypto.createHash('sha256').update(b).digest('hex');if(sha256!==model.sha256)throw Error('Source hash mismatch');
 const jsonLength=b.readUInt32LE(12),g=JSON.parse(b.toString('utf8',20,20+jsonLength)),bin=b.subarray(28+jsonLength);
 function accessor(id){const a=g.accessors[id],v=g.bufferViews[a.bufferView],size={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type],bytes={5121:1,5123:2,5125:4,5126:4}[a.componentType],read={5121:'readUInt8',5123:'readUInt16LE',5125:'readUInt32LE',5126:'readFloatLE'}[a.componentType],result=[];for(let i=0;i<a.count;i++)for(let j=0;j<size;j++)result.push(bin[read]((v.byteOffset||0)+(a.byteOffset||0)+i*(v.byteStride||size*bytes)+j*bytes));return result;}
 function walk(id,parent){const n=g.nodes[id],matrix=matmul(parent,nodeMatrix(n));if(n.mesh!==undefined){for(const p of g.meshes[n.mesh].primitives){const raw=accessor(p.attributes.POSITION),positions=[];for(let i=0;i<raw.length;i+=3)positions.push(...transform(raw.slice(i,i+3),matrix));meshes.push({source:model.id,name:n.name,positions,indices:p.indices===undefined?Array.from({length:raw.length/3},(_,i)=>i):accessor(p.indices)});}}(n.children||[]).forEach(id=>walk(id,matrix));}
 (g.scenes[g.scene||0].nodes||[]).forEach(id=>walk(id,identity()));sources.push({id:model.id,sha256,bytes:b.length,url:model.url});
}
const bounds=m=>{const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<m.positions.length;i+=3)for(let k=0;k<3;k++){min[k]=Math.min(min[k],m.positions[i+k]);max[k]=Math.max(max[k],m.positions[i+k]);}return {min,max,center:mul(add(min,max),.5),size:sub(max,min)};};
const center=part=>bounds(meshes.find(m=>m.name.includes(part))).center;
const y=norm(sub(center('superior_vena_cava'),center('inferior_vena_cava_a'))),dx=sub(center('left_cardiac_atrium'),center('right_cardiac_atrium')),x=norm(sub(dx,mul(y,dot(dx,y)))),z=norm(cross(x,y));
meshes.forEach(m=>{for(let i=0;i<m.positions.length;i+=3){const p=m.positions.slice(i,i+3);m.positions.splice(i,3,dot(p,x),dot(p,y),dot(p,z));}});
const hb=meshes.filter(m=>m.source==='heart').map(bounds),min=[0,1,2].map(k=>Math.min(...hb.map(b=>b.min[k]))),max=[0,1,2].map(k=>Math.max(...hb.map(b=>b.max[k]))),mid=mul(add(min,max),.5),scale=3.8/Math.max(max[0]-min[0],max[1]-min[1]);
meshes.forEach(m=>{m.positions=m.positions.map((v,i)=>+(scale*(v-mid[i%3])).toFixed(6));});
const inventory=meshes.map(m=>{
 const weld=new Map(),ids=[];for(let i=0;i<m.positions.length;i+=3){const key=m.positions.slice(i,i+3).map(x=>x.toFixed(5)).join(',');if(!weld.has(key))weld.set(key,weld.size);ids.push(weld.get(key));}
 const edges=new Map(),orientations=new Map();let signedVolume=0;for(let i=0;i<m.indices.length;i+=3){const tri=m.indices.slice(i,i+3);for(let k=0;k<3;k++){const a=ids[tri[k]],b=ids[tri[(k+1)%3]],key=a<b?a+','+b:b+','+a;edges.set(key,(edges.get(key)||0)+1);orientations.set(key,(orientations.get(key)||0)+(a<b?1:-1));}const a=m.positions.slice(tri[0]*3,tri[0]*3+3),b=m.positions.slice(tri[1]*3,tri[1]*3+3),c=m.positions.slice(tri[2]*3,tri[2]*3+3);signedVolume+=dot(a,cross(b,c))/6;}
 const boundaryEdges=[...edges.values()].filter(v=>v===1).length,nonManifoldEdges=[...edges.values()].filter(v=>v>2).length,inconsistentWindingEdges=[...edges.entries()].filter(([key,count])=>count===2&&orientations.get(key)!==0).length;
 return {name:m.name,source:m.source,vertices:m.positions.length/3,triangles:m.indices.length/3,bounds:bounds(m),boundaryEdges,nonManifoldEdges,inconsistentWindingEdges,watertight:boundaryEdges===0&&nonManifoldEdges===0&&inconsistentWindingEdges===0,absoluteSignedVolume:Math.abs(signedVolume),qualification:/valve/.test(m.name)?'Static source surface; no leaflet rig or annulus insertion metadata':/atrium|ventricle/.test(m.name)?'Segmented tissue/reference surface; source does not identify a closed blood cavity':'Reference surface; no dynamic attachments supplied'};
});
fs.mkdirSync(out,{recursive:true});
const report={schema:'heart-v3-anatomy-1',created:'2026-10-18',sources,sourceCount:meshes.length,sourceTriangles:inventory.reduce((n,m)=>n+m.triangles,0),registration:{x,y,z,mid,scale,basis:'Patient left: RA to LA orthogonal to IVC-to-SVC superior; anterior cross product is an inferred orthogonal basis, not independent anatomical registration',units:'Display units; source physical units not established'},meshes:inventory};
fs.writeFileSync(path.join(out,'source-inventory.json'),JSON.stringify(report,null,2)+'\n');
// Source exterior/vessels are reused without decimation; remove unseen distant vessel triangles only at runtime clipping.
fs.writeFileSync(path.join(out,'source-geometry.js'),'/* CC BY 4.0 HRA derivative: registration and 1e-6 display-unit quantization. See ATTRIBUTION.md. */\nwindow.HeartV3SourceGeometry='+JSON.stringify({registration:report.registration,meshes})+';\n');
console.log(JSON.stringify({meshes:meshes.length,triangles:report.sourceTriangles,closed:inventory.filter(m=>m.watertight).length,bytes:fs.statSync(path.join(out,'source-geometry.js')).size,chambers:inventory.filter(m=>/atrium|ventricle|valve/.test(m.name)).map(m=>({name:m.name,bounds:m.bounds,boundaryEdges:m.boundaryEdges,nonManifoldEdges:m.nonManifoldEdges}))},null,2));
