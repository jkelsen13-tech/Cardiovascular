/* Package a verified, already-optimized GLB for offline file:// loading. */
const assert=require("node:assert/strict");
const crypto=require("node:crypto");
const fs=require("node:fs");
const path=require("node:path");
const input=process.argv[2];
assert(input,"Usage: node tools/lead-placement/package-torso-asset.cjs optimized.glb");
const bytes=fs.readFileSync(input);
assert.equal(bytes.toString("ascii",0,4),"glTF");
assert.equal(bytes.readUInt32LE(4),2);
assert.equal(bytes.length,3529136);
assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"),"465222925f5f63a47cd4e204ffb74a5852f157e6e27e48390fe671caf22d4f78");
const json=JSON.parse(bytes.toString("utf8",20,20+bytes.readUInt32LE(12)));
let triangles=0,vertices=0;
for(const mesh of json.meshes)for(const primitive of mesh.primitives){
  vertices+=json.accessors[primitive.attributes.POSITION].count;
  triangles+=(primitive.indices===undefined?json.accessors[primitive.attributes.POSITION].count:json.accessors[primitive.indices].count)/3;
}
assert.equal(json.meshes.length,50);assert.equal(vertices,96542);assert.equal(triangles,194563);assert.equal((json.images||[]).length,0);assert.equal((json.extensionsUsed||[]).length,0);
fs.mkdirSync(path.resolve("lead-placement/assets"),{recursive:true});
fs.writeFileSync(path.resolve("lead-placement/assets/torso-model-data.js"),"/* BodyParts3D/DBCLS CC BY 4.0 registered thorax GLB encoded for offline file:// use. See ATTRIBUTION.md. */\nwindow.LeadTorsoModelData={skin:\""+bytes.toString("base64")+"\"};\n");
console.log(JSON.stringify({bytes:bytes.length,vertices,triangles,sha256:crypto.createHash("sha256").update(bytes).digest("hex")},null,2));
