/* Independently authored linear single-compartment teaching model; no patient predictions. */
(function(root){
  'use strict';
  const defaults={rate:12,target:0.5,resistance:2,compliance:0.1,mode:'target',ventilation:'spontaneous'};
  function parameters(p={}) {
    const x={...defaults,...p};
    for(const [k,min,max] of [['rate',6,30],['target',.2,1],['resistance',1,20],['compliance',.04,.2]])
      if(!Number.isFinite(x[k])||x[k]<min||x[k]>max)throw Error('Invalid '+k);
    if(!['target','effort'].includes(x.mode)||!['spontaneous','positive'].includes(x.ventilation))throw Error('Invalid mode');
    return x;
  }
  function constantStep(volume,drive,dt,R,C) {
    if(dt<0||R<=0||C<=0)throw Error('Invalid integration parameters');
    return C*drive+(volume-C*drive)*Math.exp(-dt/(R*C));
  }
  function build(input={},maxStep=1/240) {
    const p=parameters(input),period=60/p.rate,Ti=.4*period,R=p.resistance,C=p.compliance;
    if(!(maxStep>0&&maxStep<=.05))throw Error('Invalid timestep');
    // Separate uniform grids meet the drive-release boundary exactly.
    const ni=Math.ceil(Ti/maxStep),ne=Math.ceil((period-Ti)/maxStep);
    const times=Array.from({length:ni+1},(_,i)=>i*Ti/ni).concat(Array.from({length:ne},(_,i)=>Ti+(i+1)*(period-Ti)/ne));
    const drive=t=>t<Ti?1:0;
    let v=0;
    for(let i=1;i<times.length;i++)v=constantStep(v,drive((times[i-1]+times[i])/2),times[i]-times[i-1],R,C);
    const initial=v/(1-Math.exp(-period/(R*C))),unit=[initial];v=initial;
    for(let i=1;i<times.length;i++){v=constantStep(v,drive((times[i-1]+times[i])/2),times[i]-times[i-1],R,C);unit.push(v);}
    const low=Math.min(...unit),high=Math.max(...unit);
    // Fixed effort is set by depth only, never silently recalibrated after R/C changes.
    const amplitude=p.mode==='target'?p.target/(high-low):5*(p.target/.5);
    const volumes=unit.map(x=>x*amplitude),minimum=low*amplitude,maximum=high*amplitude;
    function at(seconds) {
      if(!Number.isFinite(seconds))throw Error('Invalid time');
      const t=seconds===period?period:((seconds%period)+period)%period;
      let lo=0,hi=times.length-1;
      while(hi-lo>1){const mid=(lo+hi)>>1;if(times[mid]<=t)lo=mid;else hi=mid;}
      const d=amplitude*drive(t),v=constantStep(volumes[lo],amplitude*drive((times[lo]+times[hi])/2),t-times[lo],R,C);
      const airway=p.ventilation==='positive'?d:0,pleural=-5-(p.ventilation==='spontaneous'?d:0),alveolar=pleural+5+v/C;
      const flow=(airway-alveolar)/R;
      return {seconds:t,period,inspiration:t<Ti,phase:t<Ti?'Inspiration':'Quiet expiration',volume:v,flow,drive:d,airway,pleural,alveolar,transpulmonary:alveolar-pleural,transrespiratory:airway,delivered:maximum-minimum,minimum,maximum,excursion:Math.max(0,v-minimum),amplitude,parameters:p};
    }
    return {parameters:p,period,Ti,times,volumes,minimum,maximum,amplitude,at};
  }
  // Shared continuous cage; the carina/root and upper trachea are pinned.
  function deform(point,excursion) {
    const [x,y,z]=point,a=Math.max(0,excursion/.5);
    const inferior=Math.max(0,Math.min(1,(1.6-y)/3.2));
    const radial=Math.min(1,Math.abs(x)/.9),rootPin=Math.min(1,Math.hypot(x,y-.65,z)/.75);
    const w=inferior*inferior*rootPin;
    return [x*(1+.13*a*w),y-.42*a*w,z*(1+.16*a*w)+.025*a*w*radial];
  }
  function ribDeform([x,y,z],excursion) {const a=Math.max(0,excursion/.5),f=Math.max(0,Math.min(1,(1.6-y)/3.2));return [x*(1+.14*a*f*f),y+.035*a*f,z*(1+.17*a*f*f)];}
  function diaphragmDeform([x,y,z],excursion) {const a=Math.max(0,excursion/.5),rad=Math.min(1,Math.hypot(x/1.86,z/1.18));return [x*(1+.14*a),y-.48*a*(1-.2*rad),z*(1+.17*a)];}
  const api={defaults,parameters,constantStep,build,deform,ribDeform,diaphragmDeform};
  root.RespiratoryMechanics=api;
  if(typeof module==='object')module.exports=api;
})(typeof window==='object'?window:globalThis);
