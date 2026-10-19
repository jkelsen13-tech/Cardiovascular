/* Regression challenges derived from independent review's full-range clearance findings. */
const A=require('node:assert/strict'),M=require('../../respiratory-study/mechanics.js');
global.window=global;require('../../respiratory-study/assets/breathing-data.js');
const lobes=RespiratoryTeachingData.filter(d=>d.id!=='airways').map(d=>{const b=Buffer.from(d.positions,'base64');return {id:d.id,positions:new Float32Array(b.buffer,b.byteOffset,b.length/4)};});
let minGap=Infinity,maxEnvelope=0;
for(let step=0;step<=20;step++){
 const excursion=step/10,a=excursion/.5;
 const center=M.diaphragmDeform([0,-1.74,0],excursion),rim=M.diaphragmDeform([1.86,-2.25,0],excursion);
 A.ok(center[1]-rim[1]>.12,'diaphragm flattens without dome inversion at full fixed-effort range');
 for(const lobe of lobes)for(let i=0;i<lobe.positions.length;i+=3){
  const [x,y,z]=M.deform(Array.from(lobe.positions.slice(i,i+3)),excursion);
  // Invert the actual diaphragm's radial expansion and evaluate its analytical dome surface.
  const rx=x/(1+.14*a),rz=z/(1+.17*a),radius=Math.hypot(rx/1.86,rz/1.18);
  if(radius<=1){const surface=M.diaphragmDeform([rx,-2.25+.51*(1-radius*radius),rz],excursion)[1];minGap=Math.min(minGap,y-surface);}
  // Conservative height-dependent outer rib envelope; every lung vertex stays inside it.
  let restY=y;for(let n=0;n<6;n++)restY=y-.035*a*Math.max(0,Math.min(1,(1.6-restY)/3.2));
  const f=Math.max(0,Math.min(1,(1.6-restY)/3.2));
  maxEnvelope=Math.max(maxEnvelope,(x/(2.4*(1+.14*a*f*f)))**2+(z/(1.65*(1+.17*a*f*f)))**2);
 }
}
A.ok(minGap>.3,`lung/diaphragm clearance ${minGap}`);A.ok(maxEnvelope<.8,`rib envelope margin ${maxEnvelope}`);
const extreme=M.build({rate:6,target:1,resistance:1,compliance:.2,mode:'effort'}).at(0).delivered;A.ok(extreme<=2&&extreme>1.99);
console.log(`PASS geometry: all selected lung vertices at 21 excursions through 2 L; diaphragm clearance ≥${minGap.toFixed(4)} scene units, no dome inversion, outer rib envelope ratio ≤${maxEnvelope.toFixed(4)}; full allowed fixed-effort delivery covered.`);
