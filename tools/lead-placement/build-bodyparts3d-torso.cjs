#!/usr/bin/env node
"use strict";

/*
 * Build a registered upper-thorax GLB from an official BodyParts3D OBJ subset.
 * Every structure receives the same source-to-glTF transform. No per-mesh
 * recentering, fitting, or visual alignment is performed.
 */
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const sourceDir = path.resolve(process.argv[2] || "");
const outputGlb = path.resolve(process.argv[3] || "lead-placement/assets/registered-thorax.glb");
const outputManifest = path.resolve(process.argv[4] || "lead-placement/assets/registered-thorax-manifest.json");
assert(fs.existsSync(sourceDir), "Usage: node build-bodyparts3d-torso.cjs <official-obj-dir> [output.glb] [manifest.json]");

const SKIN = new Set(["FJ2810"]);
const MUSCLES = new Set(["FJ1446", "FJ1446M", "FJ1447", "FJ1447M", "FJ1464", "FJ1464M"]);
const CARTILAGE = new Set(["FJ3333", "FJ3335", "FJ3337", "FJ3339", "FJ3341", "FJ3343", "FJ3345", "FJ3239", "FJ3242", "FJ3245", "FJ3248", "FJ3251", "FJ3254", "FJ3255"]);
const EXPECTED = new Set([
  "FJ2810", "FJ3290", "FJ3178", "FJ3153", "FJ3362", "FJ3237",
  "FJ3334", "FJ3336", "FJ3338", "FJ3340", "FJ3342", "FJ3344", "FJ3346", "FJ3347", "FJ3348", "FJ3330", "FJ3331", "FJ3332",
  "FJ3228", "FJ3229", "FJ3230", "FJ3231", "FJ3232", "FJ3233", "FJ3234", "FJ3235", "FJ3236", "FJ3225", "FJ3226", "FJ3227",
  ...CARTILAGE, ...MUSCLES,
]);

// BodyParts3D: x = patient left/right (right negative), y = posterior/anterior
// (anterior negative), z = inferior/superior. glTF: metres, +Y up, front +Z.
const SOURCE_TO_GLTF = {
  description: "x'=x/1000; y'=(z-1175)/1000; z'=-y/1000",
  scale: 0.001,
  sourceOriginMm: [0, 0, 1175],
  matrixColumnMajor: [0.001,0,0,0, 0,0,-0.001,0, 0,0.001,0,0, 0,-1.175,0,1],
};
const tx = ([x,y,z]) => [x / 1000, (z - 1175) / 1000, -y / 1000];

const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const bounds = (positions) => {
  const min=[Infinity,Infinity,Infinity], max=[-Infinity,-Infinity,-Infinity];
  for(const p of positions) for(let i=0;i<3;i++){min[i]=Math.min(min[i],p[i]);max[i]=Math.max(max[i],p[i]);}
  return {min,max};
};

function parseObj(file) {
  const bytes=fs.readFileSync(file);
  const positions=[], faces=[];
  for(const line of bytes.toString("utf8").split(/\r?\n/)) {
    if(line.startsWith("v ")) {
      const p=line.trim().split(/\s+/);
      positions.push([Number(p[1]),Number(p[2]),Number(p[3])]);
    } else if(line.startsWith("f ")) {
      const raw=line.trim().split(/\s+/).slice(1).map((token)=>{
        let i=Number(token.split("/")[0]);
        if(i<0)i=positions.length+i; else i--;
        return i;
      });
      for(let i=1;i<raw.length-1;i++)faces.push([raw[0],raw[i],raw[i+1]]);
    }
  }
  return {bytes,positions,faces};
}

function cropSkin(mesh) {
  const faces=mesh.faces.filter((f)=>f.every((i)=>mesh.positions[i][2]>=850 && mesh.positions[i][2]<=1500));
  return {positions:mesh.positions,faces};
}

// Vertex clustering is deterministic, preserves the atlas frame and never
// moves geometry between structures. The conservative cells are below the
// scale of the landmark relationships being taught.
function cluster(mesh, cellMm) {
  const map=new Map(), sums=[], counts=[], oldToCluster=new Uint32Array(mesh.positions.length);
  for(let i=0;i<mesh.positions.length;i++) {
    const p=mesh.positions[i];
    const key=`${Math.round(p[0]/cellMm)},${Math.round(p[1]/cellMm)},${Math.round(p[2]/cellMm)}`;
    let ci=map.get(key);
    if(ci===undefined){ci=sums.length;map.set(key,ci);sums.push([0,0,0]);counts.push(0);}
    oldToCluster[i]=ci;counts[ci]++;sums[ci][0]+=p[0];sums[ci][1]+=p[1];sums[ci][2]+=p[2];
  }
  const clustered=sums.map((p,i)=>p.map((v)=>v/counts[i]));
  const seen=new Set(), kept=[];
  for(const f of mesh.faces) {
    const a=oldToCluster[f[0]],b=oldToCluster[f[1]],c=oldToCluster[f[2]];
    if(a===b||b===c||a===c)continue;
    const sorted=[a,b,c].sort((x,y)=>x-y), key=sorted.join(",");
    if(seen.has(key))continue;seen.add(key);kept.push([a,b,c]);
  }
  const used=new Set(kept.flat()), remap=new Map(), positions=[];
  [...used].sort((a,b)=>a-b).forEach((old,i)=>{remap.set(old,i);positions.push(clustered[old]);});
  return {positions,faces:kept.map((f)=>f.map((i)=>remap.get(i)))};
}

function buildNormals(positions, faces) {
  const n=positions.map(()=>[0,0,0]);
  for(const [ia,ib,ic] of faces) {
    const a=positions[ia],b=positions[ib],c=positions[ic];
    const ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]], ac=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
    const q=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
    for(const i of [ia,ib,ic]){n[i][0]+=q[0];n[i][1]+=q[1];n[i][2]+=q[2];}
  }
  return n.map((q)=>{const l=Math.hypot(...q)||1;return q.map((v)=>v/l);});
}

function sliceMedianZ(mesh, x, maxDx=18, maxY=-105) {
  let pts=mesh.positions.filter((p)=>Math.abs(p[0]-x)<=maxDx && p[1]<=maxY);
  if(pts.length<4)pts=mesh.positions.slice().sort((a,b)=>Math.abs(a[0]-x)-Math.abs(b[0]-x)).slice(0,20);
  const z=pts.map((p)=>p[2]).sort((a,b)=>a-b);
  return z[Math.floor(z.length/2)];
}
function sliceX(mesh,z,tol=6) {
  let pts=mesh.positions.filter((p)=>Math.abs(p[2]-z)<=tol);
  if(!pts.length)pts=mesh.positions.slice().sort((a,b)=>Math.abs(a[2]-z)-Math.abs(b[2]-z)).slice(0,20);
  return [Math.min(...pts.map((p)=>p[0])),Math.max(...pts.map((p)=>p[0]))];
}
function frontSurface(skin,x,z) {
  let best=null;
  for(const f of skin.faces) {
    const a=skin.positions[f[0]],b=skin.positions[f[1]],c=skin.positions[f[2]];
    const den=(b[2]-c[2])*(a[0]-c[0])+(c[0]-b[0])*(a[2]-c[2]);
    if(Math.abs(den)<1e-8)continue;
    const u=((b[2]-c[2])*(x-c[0])+(c[0]-b[0])*(z-c[2]))/den;
    const v=((c[2]-a[2])*(x-c[0])+(a[0]-c[0])*(z-c[2]))/den;
    const w=1-u-v;
    if(u>=-1e-5&&v>=-1e-5&&w>=-1e-5){const y=u*a[1]+v*b[1]+w*c[1];if(best===null||y<best)best=y;}
  }
  if(best!==null)return [x,best-3,z];
  const p=skin.positions.slice().sort((a,b)=>(a[0]-x)**2+(a[2]-z)**2-(b[0]-x)**2-(b[2]-z)**2)[0];
  return [p[0],p[1]-3,p[2]];
}
function lateralSurface(skin,z) {
  let pts=skin.positions.filter((p)=>Math.abs(p[2]-z)<=2.5 && p[0]>0 && p[1]<10);
  if(!pts.length)pts=skin.positions.filter((p)=>Math.abs(p[2]-z)<=6 && p[0]>0);
  const p=pts.reduce((a,b)=>b[0]>a[0]?b:a);
  return [p[0]+3,p[1],z];
}

const files=fs.readdirSync(sourceDir).filter((f)=>/\.obj$/i.test(f));
const parsed=[];
for(const file of files) {
  const match=file.match(/^(FJ\d+M?)_(BP\d+)_(FMA\d+)_([^.]*)\.obj$/i);
  if(!match||!EXPECTED.has(match[1]))continue;
  const source=parseObj(path.join(sourceDir,file));
  parsed.push({fj:match[1],bp:match[2],fma:match[3],name:match[4].replaceAll("_"," "),file,source,sourceHash:sha256(source.bytes)});
}
assert.equal(parsed.length,EXPECTED.size,`Expected ${EXPECTED.size} objects, found ${parsed.length}`);
const byFj=Object.fromEntries(parsed.map((p)=>[p.fj,p]));

// Derive instructional anchors from named atlas geometry before optimization.
const skin=cropSkin(byFj.FJ2810.source);
const sternum={positions:[...byFj.FJ3290.source.positions,...byFj.FJ3178.source.positions,...byFj.FJ3153.source.positions]};
const mclX=(Math.min(...byFj.FJ3237.source.positions.map((p)=>p[0]))+Math.max(...byFj.FJ3237.source.positions.map((p)=>p[0])))/2;
const ribCenter=(ids,x)=>ids.reduce((sum,id)=>sum+sliceMedianZ(byFj[id].source,x),0)/ids.length;
const ics4Z=(ribCenter(["FJ3231","FJ3248"],35)+ribCenter(["FJ3232","FJ3251"],35))/2;
const ics5Z=(ribCenter(["FJ3232","FJ3251"],mclX)+ribCenter(["FJ3233","FJ3254"],mclX))/2;
const sternalX=sliceX(sternum,ics4Z,8);
const v1=frontSurface(skin,sternalX[0]-3,ics4Z), v2=frontSurface(skin,sternalX[1]+3,ics4Z);
const v4=frontSurface(skin,mclX,ics5Z);
const v3=frontSurface(skin,(v2[0]+v4[0])/2,(v2[2]+v4[2])/2);
const leftPec=["FJ1446M","FJ1447M","FJ1464M"].flatMap((id)=>byFj[id].source.positions);
// The anterior axillary line descends from the anterior axillary fold. Derive
// its x from the lateral pectoralis-major insertion/fold, then carry that
// vertical line down to the V4 level (rather than taking a lower pec slice,
// which incorrectly follows the muscle's medial taper).
let axillaryFold=leftPec.filter((p)=>p[2]>=1230);
if(!axillaryFold.length)axillaryFold=leftPec;
const aalX=Math.max(...axillaryFold.map((p)=>p[0]));
const v5=frontSurface(skin,aalX,ics5Z), v6=lateralSurface(skin,ics5Z);
const sourceAnchors={v1,v2,v3,v4,v5,v6};
const anchors=Object.fromEntries(Object.entries(sourceAnchors).map(([id,p])=>[id,{sourceMm:p,gltfMeters:tx(p)}]));
assert(v1[0]<0&&v2[0]>0&&v4[0]>0&&v4[0]<v5[0]&&v5[0]<v6[0],"Lead lateral order/orientation failed");
assert(Math.abs(v4[2]-v5[2])<1e-9&&Math.abs(v5[2]-v6[2])<1e-9,"V4/V5/V6 horizontal level failed");

for(const item of parsed) {
  const layer=SKIN.has(item.fj)?"body":MUSCLES.has(item.fj)?"muscle":CARTILAGE.has(item.fj)?"cartilage":"skeleton";
  const cropped=layer==="body"?cropSkin(item.source):{positions:item.source.positions,faces:item.source.faces};
  const cell=layer==="body"?2.5:layer==="muscle"?1.5:layer==="cartilage"?1.2:1.5;
  const reduced=cluster(cropped,cell);
  item.layer=layer;item.cellMm=cell;item.original={vertices:item.source.positions.length,triangles:item.source.faces.length,boundsMm:bounds(item.source.positions)};
  item.croppedTriangles=cropped.faces.length;
  item.positions=reduced.positions.map(tx);item.faces=reduced.faces;item.normals=buildNormals(item.positions,item.faces);
  item.optimized={vertices:item.positions.length,triangles:item.faces.length,boundsMeters:bounds(item.positions)};
}

const materials=[
  {name:"Body",pbrMetallicRoughness:{baseColorFactor:[0.72,0.42,0.35,0.34],metallicFactor:0,roughnessFactor:0.88},alphaMode:"BLEND",doubleSided:true},
  {name:"Bone",pbrMetallicRoughness:{baseColorFactor:[0.94,0.89,0.76,1],metallicFactor:0,roughnessFactor:0.82}},
  {name:"Cartilage",pbrMetallicRoughness:{baseColorFactor:[0.58,0.78,0.83,1],metallicFactor:0,roughnessFactor:0.75}},
  {name:"Muscle",pbrMetallicRoughness:{baseColorFactor:[0.62,0.16,0.18,0.72],metallicFactor:0,roughnessFactor:0.86},alphaMode:"BLEND",doubleSided:true},
];
const materialIndex={body:0,skeleton:1,cartilage:2,muscle:3};
const chunks=[],bufferViews=[],accessors=[],meshes=[],nodes=[];let offset=0;
const align=()=>{while(offset%4){chunks.push(Buffer.from([0]));offset++;}};
function addBuffer(buf,target){align();const i=bufferViews.length;bufferViews.push({buffer:0,byteOffset:offset,byteLength:buf.length,target});chunks.push(buf);offset+=buf.length;return i;}
function addAccessor(view,componentType,count,type,min,max){const a={bufferView:view,componentType,count,type};if(min)a.min=min;if(max)a.max=max;accessors.push(a);return accessors.length-1;}
for(const item of parsed.sort((a,b)=>a.fj.localeCompare(b.fj,undefined,{numeric:true}))) {
  const flat=item.positions.flat(), normal=item.normals.flat(), idx=item.faces.flat();
  const pb=Buffer.alloc(flat.length*4);flat.forEach((v,i)=>pb.writeFloatLE(v,i*4));
  const nb=Buffer.alloc(normal.length*4);normal.forEach((v,i)=>nb.writeFloatLE(v,i*4));
  const use16=item.positions.length<65536, ib=Buffer.alloc(idx.length*(use16?2:4));idx.forEach((v,i)=>use16?ib.writeUInt16LE(v,i*2):ib.writeUInt32LE(v,i*4));
  const b=item.optimized.boundsMeters;
  const pa=addAccessor(addBuffer(pb,34962),5126,item.positions.length,"VEC3",b.min,b.max);
  const na=addAccessor(addBuffer(nb,34962),5126,item.normals.length,"VEC3");
  const ia=addAccessor(addBuffer(ib,34963),use16?5123:5125,idx.length,"SCALAR");
  const mesh=meshes.length;meshes.push({name:item.name,primitives:[{attributes:{POSITION:pa,NORMAL:na},indices:ia,material:materialIndex[item.layer]}],extras:{fj:item.fj,bp:item.bp,fma:item.fma,layer:item.layer}});
  nodes.push({name:`${item.fj} ${item.name}`,mesh,extras:{fj:item.fj,bp:item.bp,fma:item.fma,layer:item.layer}});
}
align();const bin=Buffer.concat(chunks);
const gltf={asset:{version:"2.0",generator:"Cardiovascular BodyParts3D registered-thorax builder",extras:{source:"BodyParts3D 4.x shared coordinate frame",sourceToGltf:SOURCE_TO_GLTF,anchors}},scene:0,scenes:[{name:"Registered thorax",nodes:nodes.map((_,i)=>i),extras:{anchors,sourceToGltf:SOURCE_TO_GLTF}}],nodes,meshes,materials,buffers:[{byteLength:bin.length}],bufferViews,accessors};
let json=Buffer.from(JSON.stringify(gltf));while(json.length%4)json=Buffer.concat([json,Buffer.from(" ")]);
const total=12+8+json.length+8+bin.length, glb=Buffer.alloc(total);let at=0;
glb.write("glTF",at);at+=4;glb.writeUInt32LE(2,at);at+=4;glb.writeUInt32LE(total,at);at+=4;
glb.writeUInt32LE(json.length,at);at+=4;glb.writeUInt32LE(0x4E4F534A,at);at+=4;json.copy(glb,at);at+=json.length;
glb.writeUInt32LE(bin.length,at);at+=4;glb.writeUInt32LE(0x004E4942,at);at+=4;bin.copy(glb,at);
fs.mkdirSync(path.dirname(outputGlb),{recursive:true});fs.writeFileSync(outputGlb,glb);

const totals=(field)=>parsed.reduce((a,p)=>{a.vertices+=p[field].vertices;a.triangles+=p[field].triangles;return a;},{vertices:0,triangles:0});
const manifest={
  source:{organization:"Database Center for Life Science (DBCLS)",dataset:"BodyParts3D / Anatomography 4.x shared coordinate frame",downloadEndpoint:"https://lifesciencedb.jp/bp3d/download.cgi",license:"CC BY 4.0 (current designated LSDB license page; historical distribution notices said CC BY-SA 2.1 Japan)",licenseUrl:"https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html",selectedObjects:parsed.length,uncompressedObjBytes:parsed.reduce((n,p)=>n+p.source.bytes.length,0),vertices:totals("original").vertices,triangles:totals("original").triangles},
  processing:{skinCropSourceZMm:[850,1500],sourceToGltf:SOURCE_TO_GLTF,simplification:"deterministic vertex clustering per named structure",cellsMm:{body:2.5,skeleton:1.5,cartilage:1.2,muscle:1.5},registration:"No individual transform or recentering; one identical affine transform for every structure."},
  optimized:{path:path.relative(path.dirname(outputManifest),outputGlb).replaceAll("\\","/"),bytes:glb.length,sha256:sha256(glb),vertices:totals("optimized").vertices,triangles:totals("optimized").triangles,structures:parsed.length},
  anchors:{method:"Derived from named rib, costal-cartilage, sternum, clavicle, pectoralis-major and skin geometry before optimization; surface points use model-space ray projection.",values:anchors,checks:{patientRightNegativeX:true,v4V5V6SameSourceZ:true}},
  structures:parsed.map((p)=>({fj:p.fj,bp:p.bp,fma:p.fma,name:p.name,layer:p.layer,sourceFile:p.file,sourceSha256:p.sourceHash,sourceBytes:p.source.bytes.length,original:p.original,croppedTriangles:p.croppedTriangles,clusterCellMm:p.cellMm,optimized:p.optimized})),
};
fs.writeFileSync(outputManifest,JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify({glb:outputGlb,manifest:outputManifest,bytes:glb.length,sha256:sha256(glb),original:totals("original"),optimized:totals("optimized"),anchors},null,2));
