const A=require('node:assert/strict'),M=require('../../respiratory-study/mechanics.js');
const near=(x,y,t,msg)=>A.ok(Math.abs(x-y)<=t,`${msg}: ${x} vs ${y}`);
// Independent closed-form constant pressure solution, not two calls to model.at.
for(const R of [1,5,20])for(const C of [.04,.1,.2]){
  const tau=R*C,V0=.17,D=6;
  near(M.constantStep(V0,D,tau,R,C),C*D+(V0-C*D)/Math.E,1e-12,'analytical RC time constant');
  let v=V0;for(let i=0;i<1000;i++)v=M.constantStep(v,D,.001,R,C);
  near(v,C*D+(V0-C*D)*Math.exp(-1/tau),1e-12,'semigroup and constant solution');
}
for(const rate of [6,12,30])for(const resistance of [1,5,20])for(const compliance of [.04,.1,.2])for(const mode of ['effort','target']){
  const p={rate,resistance,compliance,mode,target:.5},m=M.build(p),fine=M.build(p,1/480),coarse=M.build(p,1/120);
  near(m.period,60/rate,1e-12,'rate period');
  A.ok(m.at(m.Ti*.1).flow>0&&m.at(m.Ti*.9).flow>0&&m.at(m.Ti+.1).flow<0,'phase agrees with actual flow');
  near(m.at(0).volume,m.at(m.period).volume,1e-9,'periodic no drift');
  const error=Math.abs(m.at(m.Ti*.6).volume-fine.at(m.Ti*.6).volume),coarseError=Math.abs(coarse.at(m.Ti*.6).volume-fine.at(m.Ti*.6).volume);
  A.ok(error<3e-5&&error<=coarseError+1e-8,'timestep convergence');
  if(mode==='target')near(m.at(m.Ti).delivered,.5,1e-10,'target excursion');
  // Integrate actual instantaneous flow on each side of drive discontinuity.
  for(const [a,b] of [[0,m.Ti],[m.Ti,m.period]]){
    const n=16000,dt=(b-a)/n;let integral=0;
    for(let i=0;i<n;i++)integral+=m.at(a+(i+.5)*dt).flow*dt;
    near(integral,m.at(b).volume-m.at(a).volume,5e-5,'flow integral = volume change');
  }
  for(const t of [.2*m.Ti,.8*m.Ti,m.Ti+.2*(m.period-m.Ti)]){
    const s=m.at(t);near(s.flow,(s.airway-s.alveolar)/resistance,1e-12,'flow pressure units');
    near(s.transpulmonary,s.alveolar-s.pleural,1e-12,'transpulmonary definition');
    near(s.volume,m.at(t+m.period*100).volume,1e-9,'long clock deterministic');
  }
}
const fixed=M.build({mode:'effort',resistance:2}),obstructed=M.build({mode:'effort',resistance:20});
near(fixed.amplitude,obstructed.amplitude,1e-12,'held effort');A.ok(obstructed.maximum-obstructed.minimum<fixed.maximum-fixed.minimum);
const stiff=M.build({mode:'effort',compliance:.04});A.ok(stiff.maximum-stiff.minimum<fixed.maximum-fixed.minimum);
A.ok(M.build({mode:'target',resistance:20}).amplitude>M.build({mode:'target',resistance:2}).amplitude);
// Nonuniform deformation: spatial distances have different relative changes; root pinned.
const a=[.8,1.4,.2],b=[.8,0,.2],c=[.8,-1.4,.2],length=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const da=M.deform(a,.5),db=M.deform(b,.5),dc=M.deform(c,.5);
A.ok(Math.abs(length(da,db)/length(a,b)-length(db,dc)/length(b,c))>.02);
A.deepEqual(M.deform([0,.65,0],.5),[0,.65,0]);A.ok(dc[1]<c[1]&&dc[0]>c[0]);
for(const p of [{rate:0},{resistance:0},{target:NaN},{compliance:1}])A.throws(()=>M.build(p));
console.log('PASS mechanics: independent analytical RC solutions; 54 parameter/mode combinations; periodicity, timestep convergence, flow-volume conservation, pressure definitions, fixed effort/target behavior and nonuniform cage/root pin.');
