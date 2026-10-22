/* Separate owner-authorized delta accounting. The original fixed gates remain FAIL.
 * CPU/static only. No original assertion, pin, application byte or Git ref is changed.
 * Run: node tools/qualification/authorized-preservation.cjs
 */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process'),A=require('node:assert/strict');
const repo=path.resolve(__dirname,'../..');
const out=path.resolve(process.env.PRESERVATION_ACCOUNTING_EVIDENCE||path.join(repo,'../qualification-preservation/accounting'));
const anchor='481319d3a351fa41827b75a1afda5485920f91ff',tree='a8dec4eab7028b021660429741bf43899f065305',frozen='743a0a8169e38ab5bd18f3304b98a81635047d80';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const blob=b=>crypto.createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const read=p=>fs.readFileSync(path.join(repo,p));
const git=args=>cp.execFileSync('git',args,{cwd:repo,maxBuffer:100*1024*1024});
const from=(ref,p)=>git(['show',ref+':'+p]);
const ledgerFile='tools/qualification/authorized-preservation-deltas.json';
const four=['simulation-core/module.js','respiratory-study/breathing-3d.js','lead-placement/module.js','lead-placement/torso-3d.js'];
const three=['ecg-study/module.js','heart-study-v3/assets/model-manifest.json','heart-study-v3/assets/ATTRIBUTION.md'];
const manifestFile=three[1];
const fixed={
 'tools/heart-v3/preservation-baseline.json':'0d75899630ba0664bc9a045ccdcace4dfe8ab92067b3de8554b6287f2d469533',
 'tools/heart-v3/teaching-clarity-preservation.cjs':'1a05fa34ee0f75cce58179188c96c9657c3a2c165693a684df75dc4e6f97555a',
 'tools/heart-v3/historical-preservation-audit.cjs':'93f0762e3c388deab031f599fde0effe7b3ebcbaa72b23881a225a8c5ffbe523'
};
const run=path.join(out,new Date().toISOString().replace(/[:.]/g,'-'));fs.mkdirSync(run,{recursive:true});
const receipt={schema:'cardiovascular-authorized-preservation-accounting-1',startedAt:new Date().toISOString(),sourceRoot:repo,anchor,anchorTree:tree,assertions:[],originalGates:{},behavioralCPU:[],negativeProbes:[],limits:[
 'This separate accounting does not make the unchanged strict preservation or historical audit pass.',
 'Exact source authorization/provenance and deterministic CPU behavior are not independent review, actual audiovisual presentation, physical iPad/Safari, listening, specialist or clinical validation.',
 'Unprotected application edits are listed for separate review; an accounting pass does not approve those edits.'
]};
function check(name,fn){try{const value=fn();receipt.assertions.push({name,pass:true,...(value===undefined?{}:{value})});return value;}catch(e){receipt.assertions.push({name,pass:false,error:e.message});return undefined;}}
function command(script,env,label){const r=cp.spawnSync(process.execPath,[script],{cwd:repo,env:{...process.env,...env},encoding:'utf8',maxBuffer:20*1024*1024,timeout:120000});const log=path.join(run,label+'.log');fs.writeFileSync(log,(r.stdout||'')+(r.stderr||''));return{script,exitCode:r.status,signal:r.signal,error:r.error?.message,log,stdout:r.stdout||''};}
function latest(dir){return JSON.parse(fs.readFileSync(JSON.parse(fs.readFileSync(path.join(dir,'latest.json'))).result));}
try{
 check('Supplied anchor resolves to its exact supplied tree',()=>A.equal(git(['rev-parse',anchor+'^{tree}']).toString().trim(),tree));
 check('Original fixed contracts and pins remain byte-for-byte unchanged',()=>{for(const[p,h]of Object.entries(fixed))A.equal(sha(read(p)),h,p);A.equal(process.env.HEART_V3_PRESERVATION_BASE_COMMIT,undefined);});
 const baseline=JSON.parse(read('tools/heart-v3/preservation-baseline.json'));
 const ledger=JSON.parse(read(ledgerFile));
 check('Ledger describes exactly the four supplied Guided bridge deltas',()=>{
  A.equal(ledger.schema,'cardiovascular-authorized-preservation-deltas-1');A.equal(ledger.approvedAnchor,anchor);A.equal(ledger.approvedAnchorTree,tree);A.equal(ledger.originalContractsRemainUnmodifiedAndFail,true);
  A.deepEqual(ledger.approvedProtectedChanges.map(x=>x.path).sort(),four.slice().sort());
  for(const d of ledger.approvedProtectedChanges){A.equal(d.fromRef,frozen);A.equal(d.toRef,anchor);A.equal(d.beforeSHA256,baseline.protectedSHA256[d.path]);A.equal(sha(from(frozen,d.path)),d.beforeSHA256);A.equal(sha(from(anchor,d.path)),d.afterSHA256);const p=read('tools/qualification/'+d.patch);A.equal(sha(p),d.patchSHA256);A.deepEqual(p,git(['diff','--binary',frozen,anchor,'--',d.path]));A.ok(d.authorization&&d.disposition&&d.provenanceCommits.length);}
  return ledger.approvedProtectedChanges.map(({path,beforeSHA256,afterSHA256,patch,provenanceCommits})=>({path,beforeSHA256,afterSHA256,patch,provenanceCommits}));
 });
 const entries=git(['ls-tree','-rz',anchor]).toString().split('\0').filter(Boolean).map(x=>{const [meta,p]=x.split('\t');const[mode,type,object]=meta.split(' ');return{path:p,mode,type,object};});
 const payloads=entries.filter(x=>x.type==='blob'&&(/(^|\/)(assets|vendor)\//.test(x.path)||/\.(?:mp3|glb|gltf|pdf|png|jpe?g|webp|woff2?)$/i.test(x.path))&&x.path!==manifestFile);
 const expected=new Map();
 for(const[p,h]of Object.entries(baseline.protectedSHA256))if(p!==manifestFile)expected.set(p,{sha256:four.includes(p)||three.includes(p)?sha(from(anchor,p)):h,reason:four.includes(p)?'exact supplied Guided bridge':three.includes(p)?'exact historical delta':'fixed original bytes'});
 for(const p of payloads)expected.set(p.path,{...expected.get(p.path),blob:p.object,mode:p.mode,reason:expected.get(p.path)?.reason||'supplied anatomical/narration/source payload'});
 const anchorManifest=JSON.parse(from(anchor,manifestFile));
 const semantic=m=>({...m,files:m.files.map(x=>({file:x.file}))});
 const snapshot=new Map();for(const p of new Set([...expected.keys(),manifestFile,...anchorManifest.files.map(x=>x.file),'index.html','cmt-quiz.html']))snapshot.set(p,read(p));
 const expectedBank='462b8ec0be0627d4ee2ba2e596ae1766887d5c3d1776ef45b5a9d66585626d13';
 // This exact validator is also used by in-memory destructive probes below.
 function validate(files){const failures=[];const fail=(p,reason)=>failures.push({path:p,reason});
  for(const[p,e]of expected){const b=files.get(p);if(!b){fail(p,'missing');continue;}if(e.sha256&&sha(b)!==e.sha256)fail(p,e.reason);if(e.blob&&blob(b)!==e.blob)fail(p,'supplied payload blob differs');}
  for(const p of ['index.html','cmt-quiz.html']){const literal=files.get(p)?.toString().match(/const BANK = (\[[\s\S]*?\n\]);/)?.[1];if(!literal||sha(literal)!==expectedBank)fail(p,'original 611 BANK literal or approved four wording strings changed');}
  try{const m=JSON.parse(files.get(manifestFile));if(JSON.stringify(semantic(m))!==JSON.stringify(semantic(anchorManifest)))fail(manifestFile,'manifest semantic fields or exact file list changed');for(const d of m.files){const b=files.get(d.file);if(!b||b.length!==d.bytes||sha(b)!==d.sha256||Object.keys(d).sort().join(',')!=='bytes,file,sha256')fail(manifestFile,'manifest bytes/hash/entry schema inconsistent for '+d.file);}}catch(e){fail(manifestFile,e.message);}
  return failures;
 }
 check('Every accounted protected byte, anatomical payload, recording, BANK literal and manifest entry matches its contract',()=>{const failures=validate(snapshot);A.deepEqual(failures,[]);return{protectedPaths:25,payloadPaths:payloads.length,recordings:payloads.filter(x=>/\.mp3$/i.test(x.path)).length,manifestEntries:anchorManifest.files.length};});
 check('Supplied payload executable modes remain unchanged',()=>{for(const p of payloads){const stat=fs.lstatSync(path.join(repo,p.path));A.ok(stat.isFile()&&!stat.isSymbolicLink(),'Expected ordinary payload file: '+p.path);const actual=(stat.mode&0o111)?'100755':'100644';A.equal(actual,p.mode,p.path);}});
 check('Protected mismatch scope is exactly the four Guided and three historical changes',()=>{const mismatches=Object.entries(baseline.protectedSHA256).filter(([p,h])=>sha(read(p))!==h).map(([p])=>p).sort();A.deepEqual(mismatches,[...four,...three].sort());return mismatches;});
 const mutate=(name,p,edit)=>{const files=new Map(snapshot);files.set(p,edit(Buffer.from(files.get(p))));const failures=validate(files);const ok=failures.some(x=>x.path===p);receipt.negativeProbes.push({name,path:p,rejected:ok,failures});A.ok(ok,name);};
 check('Negative mutation probes reject additional changes through the same validator',()=>{
  mutate('Untouched original controller change','simulation-core/controller.js',b=>Buffer.concat([b,Buffer.from('\n// unauthorized\n')]));
  mutate('Extra change in approved Guided bridge','simulation-core/module.js',b=>Buffer.concat([b,Buffer.from('\n// unauthorized\n')]));
  mutate('Original anatomical payload corruption','heart-study-v3/assets/source-geometry.js',b=>{b[0]^=1;return b;});
  mutate('Existing narration corruption',payloads.find(x=>/\.mp3$/i.test(x.path)).path,b=>{b[0]^=1;return b;});
  mutate('Fourth ECG dependency line','ecg-study/module.js',b=>Buffer.concat([b,Buffer.from('\n// unexpected fourth load\n')]));
  mutate('Original BANK answer key change','index.html',b=>{const s=b.toString(),match=s.match(/const BANK = (\[[\s\S]*?\n\]);/);A.ok(match);const literal=match[1].replace(/"a"\s*:\s*(\d+)/,(_,n)=>'"a":'+((+n+1)%4));A.notEqual(literal,match[1]);return Buffer.from(s.replace(match[1],literal));});
  mutate('Stale model manifest bytes',manifestFile,b=>{const m=JSON.parse(b);m.files[0].bytes++;return Buffer.from(JSON.stringify(m));});
  return{rejected:receipt.negativeProbes.filter(x=>x.rejected).length,total:receipt.negativeProbes.length,workingSourceWritten:false};
 });
 const strictDir=path.join(run,'original-strict'),historicalDir=path.join(run,'original-historical');
 const strict=command('tools/heart-v3/teaching-clarity-preservation.cjs',{HEART_V3_SOURCE_ROOT:repo,HEART_V3_PRESERVATION_EVIDENCE:strictDir},'original-strict');
 const sr=latest(strictDir);receipt.originalGates.strict={...strict,stdout:undefined,status:sr.status,assertions:sr.assertions.length,failures:sr.assertions.filter(x=>!x.pass),browser:sr.browser,result:JSON.parse(fs.readFileSync(path.join(strictDir,'latest.json'))).result};
 check('Original strict gate remains explicitly FAIL at its unchanged first Guided-byte contract',()=>{A.equal(strict.exitCode,1);A.equal(sr.status,'FAIL');A.equal(sr.assertions.length,39);A.deepEqual(sr.assertions.filter(x=>!x.pass).map(x=>x.name),['Audited protected bytes retained: simulation-core/module.js']);A.equal(sr.browser.executed,false);});
 const historical=command('tools/heart-v3/historical-preservation-audit.cjs',{HEART_V3_SOURCE_ROOT:repo,HEART_V3_HISTORICAL_EVIDENCE:historicalDir},'original-historical');
 const hr=latest(historicalDir);receipt.originalGates.historical={...historical,stdout:undefined,status:hr.status,assertions:hr.assertions.length,failures:hr.assertions.filter(x=>!x.pass),result:JSON.parse(fs.readFileSync(path.join(historicalDir,'latest.json'))).result};
 check('Original historical gate retains exactly five known failures; all remaining 74 assertions pass',()=>{A.equal(historical.exitCode,1);A.equal(hr.status,'HISTORICAL_DELTA_FAIL');A.equal(hr.assertions.length,79);A.deepEqual(hr.assertions.filter(x=>!x.pass).map(x=>x.name).sort(),[...four.map(p=>'Untouched original protected bytes: '+p),'Exactly the three documented protected-file deltas remain'].sort());A.equal(hr.originalContract.comparisonStatus,'FAIL');});
 for(const script of ['tools/guided-study/session.cjs','tools/guided-study/player-ui.cjs','tools/guided-study/lead-adapter.cjs','tools/simulators/verify.cjs']){
  check('Behavioral test itself retains supplied assertions: '+script,()=>A.deepEqual(read(script),from(anchor,script)));
  const result=command(script,{},path.basename(script,'.cjs'));receipt.behavioralCPU.push({...result,stdout:result.stdout.trim()});check('Fresh behavioral CPU run: '+script,()=>{A.equal(result.exitCode,0,result.stdout||result.error);A.equal(result.signal,null);});
 }
 receipt.changedSinceAnchor=git(['diff','--name-status',anchor,'--']).toString().trim().split('\n').filter(Boolean);
 receipt.untrackedFiles=git(['ls-files','--others','--exclude-standard']).toString().trim().split('\n').filter(Boolean);
 receipt.reviewNeeded=receipt.changedSinceAnchor.filter(x=>!expected.has(x.slice(x.indexOf('\t')+1)));
}catch(e){receipt.assertions.push({name:'Accounting completed',pass:false,error:e.stack||e.message});}
receipt.status=receipt.assertions.some(x=>!x.pass)?'UNACCOUNTED_CHANGE_FAIL':'AUTHORIZED_DELTAS_ACCOUNTED_ORIGINAL_GATES_FAIL';receipt.endedAt=new Date().toISOString();
const result=path.join(run,'result.json');fs.writeFileSync(result,JSON.stringify(receipt,null,2)+'\n');fs.writeFileSync(path.join(out,'latest.json'),JSON.stringify({status:receipt.status,result},null,2)+'\n');
console.log(JSON.stringify({status:receipt.status,originalStrict:receipt.originalGates.strict?.status,originalHistorical:receipt.originalGates.historical?.status,checks:receipt.assertions.length,failures:receipt.assertions.filter(x=>!x.pass),negativeProbes:receipt.negativeProbes.length,behavioralCPUSuites:receipt.behavioralCPU.length,result},null,2));
if(receipt.status==='UNACCOUNTED_CHANGE_FAIL')process.exitCode=1;
