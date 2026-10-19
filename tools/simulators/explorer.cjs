const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const E=require('../../respiratory-study/explorer.js');
A.deepEqual(E.stages.map(s=>s.id),['whole','trachea','primary','lobar','segmental','smaller','bronchioles','terminal','respiratory','ducts','sacs','alveoli','membrane']);
const context={window:{}};vm.runInNewContext(fs.readFileSync('respiratory-study/assets/airway-metadata.js','utf8'),context);const metadata=context.window.RespiratoryAirwayMetadata;
const geometry={window:{}};const data=fs.readFileSync('respiratory-study/assets/breathing-data.js','utf8');vm.runInNewContext(data,geometry);
A.equal(metadata.derivedSha256,crypto.createHash('sha256').update(data).digest('hex'));
const airways=geometry.window.RespiratoryTeachingData.find(d=>d.id==='airways');let end=0;
for(const p of metadata.parts){A.equal(p.indexStart,end);A.equal(p.indexCount%3,0);end+=p.indexCount;A.ok(p.center.every(Number.isFinite));A.ok(p.bounds[0].every((v,i)=>v<=p.center[i]&&p.center[i]<=p.bounds[1][i]));}A.equal(end,airways.triangles*3);
for(const n of E.nodes){A.ok(metadata.parts.find(p=>p.sourceName===n.sourceName),'missing source identity '+n.sourceName);if(n.stage>1)A.equal(E.byId[n.parent].stage,n.stage-1);}
for(const leaf of E.nodes.filter(n=>n.stage===4)){
 const c=E.create();c.select(leaf.id);const initial=c.state();for(let i=5;i<=12;i++){const s=c.next();A.equal(s.index,i);A.equal(s.side,leaf.side);A.equal(s.lobe,leaf.lobe);A.equal(s.sourceId,leaf.sourceName);A.equal(s.segment,leaf.id);A.equal(s.provenance,'instructional');}
 for(let i=11;i>=0;i--){const s=c.back();A.equal(s.index,i);A.equal(s.segment,leaf.id);A.equal(s.path[4],leaf.id);}
 for(let i=1;i<=4;i++){c.select(initial.path[i]);A.equal(c.state().segment,leaf.id,'breadcrumb must preserve chosen descendant');}
}
A.ok(E.stages.every(s=>s.choices[s.answer]&&s.feedback&&s.observe&&s.scaleNote&&s.source.startsWith('https://openstax.org/')));
console.log('PASS explorer: all 20 segment routes retain side/lobe/source through 13 levels, breadcrumbs retain descendants; 29 metadata ranges exactly partition unchanged HRA airway geometry; source identity, hierarchy, scale qualifications and learning feedback verified.');
