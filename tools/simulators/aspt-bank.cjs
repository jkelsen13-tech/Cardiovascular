/* Validate authored assessment identities, original keys and exact source-map contracts. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),sandbox={};
vm.runInNewContext(fs.readFileSync(path.join(root,'aspt/content.js'),'utf8')+';this.data=ASPT_DATA',sandbox);
vm.runInNewContext(fs.readFileSync(path.join(root,'aspt/mock-bank.js'),'utf8'),sandbox);
const bank=sandbox.AsptMockBank,D=sandbox.data,matrix=JSON.parse(fs.readFileSync(path.join(root,'aspt/v2-coverage.json'))),blueprint=JSON.parse(fs.readFileSync(path.join(root,'aspt/blueprint.json')));
assert.equal(bank.length,100);const ids=new Set(),concepts=new Set(),prompts=new Set(),lessons=new Set(D.lessons.map(l=>l.id));
const validRefs=new Set([...blueprint.terms.map(t=>'T'+t.n),...blueprint.competencies,...matrix.page8.filter(d=>d.id).map(d=>d.id)]);
for(const q of bank){assert(!ids.has(q.id),'duplicate ID');ids.add(q.id);assert(!concepts.has(q.concept),'duplicate concept');concepts.add(q.concept);assert(!prompts.has(q.prompt),'duplicate prompt');prompts.add(q.prompt);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);assert(q.explain.length>30);assert(q.guideRefs.length>0);for(const ref of q.guideRefs){assert(validRefs.has(ref),'unknown guide ref '+ref);assert.notEqual(ref,'2d','unresolved taxonomy must not be scored');}assert(q.sourceRefs.every(s=>/^https:\/\//.test(s)));assert.equal(q.lesson.system,'aspt');assert(lessons.has(q.lesson.index));}
for(const domain of ['heart','respiration','conduction','electrocardiograph'])assert.equal(bank.filter(q=>q.domain===domain).length,25);
assert.equal(matrix.terms.length,91);assert.equal(matrix.competencies.length,26);assert.equal(matrix.page8.length,29);assert.equal(matrix.page9.length,6);
for(const t of blueprint.terms){const term=matrix.terms.find(x=>x.number===t.n);assert.equal(term.sourceWording,t.name);assert.equal(term.guidePage,t.page);}
for(const row of [...matrix.terms,...matrix.competencies,...matrix.page8,...matrix.page9])for(const id of row.questionIds)assert(ids.has(id),'unknown question mapping '+id);
assert.equal(matrix.competencies.find(c=>c.id==='2d').questionIds.length,0);
assert.equal(D.examDate,'Not rescheduled');assert(D.ownerRetakeStatus.format.includes('100'));assert(!JSON.stringify(D.lessons).includes('three phases taught in class are'));
// Independent arithmetic anchors test declared correct keys, beyond content-count checks.
const keyed=concept=>{const q=bank.find(x=>x.concept===concept);return q.options[q.answer];};
assert.equal(keyed('minute-ventilation'),'6 L/min');assert.equal(keyed('pr-calculation'),'0.20 s');assert.equal(keyed('regular-rate'),'100/min');assert.equal(keyed('voltage-scale'),'0.5 mV');
assert.equal(keyed('conducting-zone'),'Terminal bronchiole');assert.equal(keyed('his-synonym'),'Two names for the same conducting bundle');
console.log('PASS:100 unique original MCQ,25/domain; original keys/options/source refs/lesson IDs;91 exact entries;26 competencies;29 diagram labels;6 waveform features; unresolved2d excluded; arithmetic and anatomy anchors.');
