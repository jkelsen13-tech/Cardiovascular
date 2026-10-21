/* Geometric regressions for representative fibers and inferred nodal regions.
 * Verify actual transformed vertices, rather than diagnostic flags alone. */
'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),R=path.resolve(__dirname,'../..'),s={console,AbortController,TextDecoder,TextEncoder,URL};s.window=s;vm.createContext(s);
for(const f of ['ecg-study/vendor/three-gltf.min.js','heart-study-v3/content.js','heart-study-v3/explorer.js','heart-study-v3/detail.js','heart-study-v3/assets/source-geometry.js','heart-study-v3/sourced-anatomy.js'])vm.runInContext(fs.readFileSync(path.join(R,f),'utf8'),s);
const T=s.EcgThree,d=s.HeartV3Detail.create(T,new T.Group()),context={source:{side:'left'},signalMode:'all'},world=o=>{d.group.updateMatrixWorld(true);return o.getWorldPosition(new T.Vector3());},near=(a,b,e=1e-6)=>A(Math.abs(a-b)<e,`${a} != ${b}`);
const find=n=>{let obj;d.group.traverse(o=>{if(o.name===n)obj=o;});A(obj,n);return obj;};
const samples=[0,.2,.6,1,.6,.2,0];
d.setRoute('routeB.tissue',context);const allocation=d.inspect().allocations;
for(const activation of samples){d.sync({chambers:{lv:{activation}}});const k=1-.1*activation;
 for(const [a,b,pa,pb]of [['branching cardiomyocyte A','branching cardiomyocyte B',[1.8,0,0],[-1.8,0,0]],['branching cardiomyocyte A','branching cardiomyocyte C',[1.8,1.25,0],[-1.8,0,0]],['branching cardiomyocyte B','branching cardiomyocyte D',[-1.8,-1.25,0],[1.8,0,0]]]){const first=find(a),second=find(b);d.group.updateMatrixWorld(true);const p=first.localToWorld(new T.Vector3(...pa)),q=second.localToWorld(new T.Vector3(...pb));near(p.distanceTo(q),0);near(p.x,0);}
 near(world(find('branching cardiomyocyte A')).x,-1.8*k);A.equal(d.inspect().allocations,allocation);
}
A.equal(d.inspect().objects.filter(x=>/central nucleus/.test(x.name)).length,4);A(d.inspect().meshes<25,'Connected tissue should need fewer draw objects than old50');
d.setRoute('routeB.myofibril',context);const units=d.group.children.filter(o=>o.type==='Group'),fixed=[];A.equal(units.length,3);
for(const activation of samples){d.sync({chambers:{lv:{activation}}});d.group.updateMatrixWorld(true);const boundaries=units.map(g=>g.children.filter(o=>o.type==='Group').map(side=>world(side.children[0]).x));near(boundaries[0][1],boundaries[1][0]);near(boundaries[1][1],boundaries[2][0]);
 const widths=[];d.group.traverse(o=>{if(o.isMesh&&/^(actin thin|myosin thick)/.test(o.name))widths.push(new T.Box3().setFromObject(o).getSize(new T.Vector3()).x);});if(!fixed.length)fixed.push(...widths);else widths.forEach((w,i)=>near(w,fixed[i]));
 for(const o of d.group.children.filter(o=>/^parallel striated/.test(o.name))){const p=o.geometry.attributes.position;near(p.getX(7*11),-1.25);near(p.getX(17*11),1.25);}
}
// Single-cell voltage lessons remain independent from working-muscle material.
d.setRoute('routeC.ventricular',context);d.sync({cycleTime:.25,chambers:{lv:{activation:1}}});d.setRoute('routeB.tissue',context);d.group.traverse(o=>{if(o.isMesh)A.equal(o.material.emissive?.getHex()||0,0,'Resting tissue must not inherit electrical glow');});
// The owner-deleted gross conduction diagram has no detail/fallback constructor.
for(const id of ['pathway','sa','atrial','av','his','purkinje'])A.throws(()=>d.setRoute('routeC.'+id,context));
const anatomy=s.HeartV3SourcedAnatomy.qualify(s.HeartV3SourceGeometry),ra=anatomy.named.ra;for(const id of ['sa','avnode']){const n=anatomy.nodalLandmarks[id];A.equal(n.sourceMesh,ra.name);A.equal(n.validatedNodeLocalization,false);A.deepEqual(Array.from(anatomy.anchors[id]),Array.from(ra.positions.slice(n.sourceVertex*3,n.sourceVertex*3+3)));}A(anatomy.anchors.sa[1]>anatomy.anchors.avnode[1]);A(Math.hypot(...anatomy.anchors.avnode.map((x,i)=>x-anatomy.anchors.tricuspid[i]))>.1,'AV region must not coincide with tricuspid centre');
for(const route of ['routeB.wall','routeB.tissue','routeB.myofibril','routeC.nodal','routeC.ventricular']){d.setRoute(route,context);d.sync({chambers:{lv:{activation:.5}}});const svg=d.diagram();A(!/NaN|Infinity|undefined/.test(svg));if(route==='routeB.tissue'){A.equal((svg.match(/data-muscle-limb/g)||[]).length,6);A((svg.match(/data-striation/g)||[]).length>20);}d.group.traverse(o=>{if(o.isMesh)A(Array.from(o.geometry.attributes.position.array).every(Number.isFinite));});}
d.dispose();A.equal(d.inspect().allocations,d.inspect().disposals);
console.log('PASS connected cell junctions across7shortening/relaxation states; fewer than25tissue objects; continuous serial Z boundaries; fixed actual filament/A-band vertices; retained single-cell voltage lessons; removed diagram rejected; inferred SA/AV anchors on exact RA vertices; finite fallback/geometry and disposal.');
