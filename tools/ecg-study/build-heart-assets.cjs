// Run only on the GitHub-hosted runner. No runtime downloads.
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const assert = require('node:assert/strict');
const {build} = require('esbuild');
const base = 'https://raw.githubusercontent.com/hubmapconsortium/ccf-3d-reference-object-library/f1a3a63f110e27ff0736047d52d04dba5d3087f9/';
const sources = [
 ['heart', 'VH_Female/v1.2/VH_F_Heart.glb', '7e4709ac174f4f43bedb80ed488fdcb62d02aac3', 1745284],
 ['vessels', 'VH_Female/v1.2/VH_F_Blood_Vasculature_Heart.glb', 'd2758268f1811f5fb259ee0433199c74c6dff268', 2512720]
];
(async () => {
 fs.mkdirSync('ecg-study/assets', {recursive:true});
 fs.mkdirSync('ecg-study/vendor', {recursive:true});
 const report={sourceCommit:'f1a3a63f110e27ff0736047d52d04dba5d3087f9',license:'CC BY 4.0',runtime:'three@0.180.0',models:[]};
 const embedded={};
 for(const [id,file,sha,size] of sources) {
  const response=await fetch(base+file); assert(response.ok);
  const bytes=Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.length,size);
  assert.equal(crypto.createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex'),sha);
  assert.equal(bytes.toString('ascii',0,4),'glTF');assert.equal(bytes.readUInt32LE(4),2);
  const json=JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
  const names=json.nodes.map(n=>n.name||'');
  for(const required of id==='heart'?['right_cardiac_atrium','left_cardiac_atrium','right_ventricle','left_ventricle','tricuspid_valve','mitral_valve','aortic_valve','pulmonary_valve']:['superior_vena_cava','inferior_vena_cava','pulmonary_trunk','ascending_aorta','pulmonary_vein']) assert(names.some(n=>n.includes(required)),required);
  assert(!(json.images||[]).length,'No unexpected textures');
  assert((json.buffers||[]).every(b=>!b.uri),'No external buffers');
  let triangles=0,vertices=0;
  for(const m of json.meshes) for(const p of m.primitives) {
   assert(p.mode===undefined||p.mode===4,'Triangle topology required');
   vertices+=json.accessors[p.attributes.POSITION].count;
   triangles+=(p.indices===undefined?json.accessors[p.attributes.POSITION].count:json.accessors[p.indices].count)/3;
  }
  const model={id,url:base+file,gitBlobSha:sha,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,triangles,vertices,meshes:json.meshes.length,nodes:json.nodes.map(n=>({name:n.name,mesh:n.mesh})),textures:0};
  report.models.push(model);
  embedded[id]=bytes.toString('base64');
 }
 fs.writeFileSync('ecg-study/assets/model-data.js','/* Original CC BY 4.0 GLBs encoded for offline file:// compatibility. See ATTRIBUTION.md. */\nwindow.EcgHeartModelData='+JSON.stringify(embedded)+';\n');
 await build({entryPoints:['tools/ecg-study/three-entry.js'],bundle:true,format:'iife',globalName:'EcgThree',minify:true,outfile:'ecg-study/vendor/three-gltf.min.js',legalComments:'eof'});
 fs.copyFileSync('node_modules/three/LICENSE','ecg-study/vendor/THREE-LICENSE.txt');
 const lic=await fetch(base+'LICENSE');assert(lic.ok);
 fs.writeFileSync('ecg-study/assets/CC-BY-4.0.txt',await lic.text());
 report.runtimeBytes=fs.statSync('ecg-study/vendor/three-gltf.min.js').size;
 report.offlineCompanionBytes=fs.statSync('ecg-study/assets/model-data.js').size;
 fs.writeFileSync('ecg-study/assets/model-manifest.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
