/* Four-chamber teaching annotations of the existing eight-pool model.
 * No solver, clock, RAF, storage, clinical calibration or additional blood pool.
 * Caval branches illustrate the ONE systemicReturn edge; their Q is not summed. */
(function(root){'use strict';
 const chambers={
  ra:{name:'Right atrium',side:'right',kind:'atrial',arrivesFrom:'SVC and IVC (systemic venous return)',inflowEdge:'systemicReturn',outflowEdge:'tricuspid',nextValve:'tricuspid',next:'Right ventricle',nextPool:'rv',oxygenation:'deoxygenated'},
  rv:{name:'Right ventricle',side:'right',kind:'ventricular',arrivesFrom:'Right atrium through tricuspid valve',inflowEdge:'tricuspid',outflowEdge:'pulmonary',nextValve:'pulmonary',next:'Pulmonary trunk / arteries',nextPool:'pulmonaryArtery',oxygenation:'deoxygenated'},
  la:{name:'Left atrium',side:'left',kind:'atrial',arrivesFrom:'Pulmonary veins from lungs',inflowEdge:'pulmonaryReturn',outflowEdge:'mitral',nextValve:'mitral',next:'Left ventricle',nextPool:'lv',oxygenation:'oxygenated'},
  lv:{name:'Left ventricle',side:'left',kind:'ventricular',arrivesFrom:'Left atrium through mitral valve',inflowEdge:'mitral',outflowEdge:'aortic',nextValve:'aortic',next:'Aorta / systemic arteries',nextPool:'systemicArtery',oxygenation:'oxygenated'}
 };
 const itinerary=[
  {id:'systemic-veins',label:'Systemic veins',structure:'svc',structures:['svc','ivc'],edgeId:'systemicReturn',from:'Systemic tissues',to:'SVC / IVC',kind:'heart',oxygenation:'deoxygenated'},
  {id:'caval-return',label:'SVC and IVC',structure:'svc',structures:['svc','ivc'],edgeId:'systemicReturn',from:'Systemic veins',to:'Right atrium',kind:'heart',oxygenation:'deoxygenated'},
  {id:'ra',label:'Right atrium',structure:'ra',edgeId:'tricuspid',from:'SVC / IVC',to:'Tricuspid valve',kind:'heart',oxygenation:'deoxygenated'},
  {id:'tricuspid',label:'Tricuspid valve',structure:'tricuspid',edgeId:'tricuspid',from:'Right atrium',to:'Right ventricle',kind:'heart',oxygenation:'deoxygenated'},
  {id:'rv',label:'Right ventricle',structure:'rv',edgeId:'pulmonary',from:'Tricuspid valve',to:'Pulmonary valve',kind:'heart',oxygenation:'deoxygenated'},
  {id:'pulmonary',label:'Pulmonary / pulmonic valve',structure:'pulmonary',edgeId:'pulmonary',from:'Right ventricle',to:'Pulmonary trunk / arteries',kind:'heart',oxygenation:'deoxygenated'},
  {id:'pulmonary-arteries',label:'Pulmonary trunk / arteries',structure:'pa',edgeId:'pulmonaryBed',from:'Pulmonary valve',to:'Lung pulmonary capillary bed',kind:'heart',oxygenation:'deoxygenated'},
  {id:'lung-bed',label:'Lung pulmonary capillary bed',structure:'pa',edgeId:'pulmonaryBed',from:'Pulmonary arteries',to:'Pulmonary veins',kind:'lung',oxygenation:'exchange'},
  {id:'pulmonary-veins',label:'Pulmonary veins',structure:'vein',edgeId:'pulmonaryReturn',from:'Lung capillary bed',to:'Left atrium',kind:'heart',oxygenation:'oxygenated'},
  {id:'la',label:'Left atrium',structure:'la',edgeId:'mitral',from:'Pulmonary veins',to:'Mitral valve',kind:'heart',oxygenation:'oxygenated'},
  {id:'mitral',label:'Mitral / bicuspid valve',structure:'mitral',edgeId:'mitral',from:'Left atrium',to:'Left ventricle',kind:'heart',oxygenation:'oxygenated'},
  {id:'lv',label:'Left ventricle',structure:'lv',edgeId:'aortic',from:'Mitral valve',to:'Aortic valve',kind:'heart',oxygenation:'oxygenated'},
  {id:'aortic',label:'Aortic valve',structure:'aortic',edgeId:'aortic',from:'Left ventricle',to:'Aorta / systemic arteries',kind:'heart',oxygenation:'oxygenated'},
  {id:'systemic-arteries',label:'Aorta / systemic arteries',structure:'aorta',edgeId:'systemic',from:'Aortic valve',to:'Systemic capillary bed',kind:'heart',oxygenation:'oxygenated'},
  {id:'systemic-bed',label:'Systemic microcirculation',structure:'aorta',edgeId:'systemic',from:'Systemic arteries',to:'Systemic veins',kind:'body',oxygenation:'exchange'},
  {id:'venous-return',label:'Systemic venous return',structure:'ivc',structures:['svc','ivc'],edgeId:'systemicReturn',from:'Systemic capillary bed',to:'Right atrium through SVC / IVC',kind:'heart',oxygenation:'deoxygenated'},
  {id:'ra-return',label:'Return to right atrium',structure:'ra',edgeId:'systemicReturn',from:'Systemic veins through SVC / IVC',to:'Next tricuspid passage when open',kind:'heart',oxygenation:'deoxygenated'}
 ];
 function flow(s,id){if(s.valves?.[id])return s.valves[id].flow||0;return Number(s.vascularFlows?.[{systemic:'systemic',systemicReturn:'systemicReturn',pulmonaryBed:'pulmonary',pulmonaryReturn:'pulmonaryReturn'}[id]])||0;}
 function chamber(s,id){const info=chambers[id];if(!info||!s.chambers?.[id])return null;const c=s.chambers[id],v=s.valves[info.nextValve],inflow=flow(s,info.inflowEdge),outflow=flow(s,info.outflowEdge),atrial=id==='ra'?'ra':'la',sidePhase=s[info.side+'Phase'];let role;
  if(info.kind==='atrial'){if(c.activation>.015)role=v.open?'Atrial contraction supplements ventricular filling':'Atrial contraction; AV valve currently closed';else if(!v.open)role=inflow>0?'Receiving venous return while AV valve is closed':inflow<0?'AV valve closed; current model venous flow is reversed':'AV valve closed; no current venous inflow';else role=outflow>inflow?'Emptying through AV valve while receiving venous return':'Receiving and passing blood through open AV valve';}
  else if(v.open)role='Ejecting into '+info.next;else if(s.valves[info.inflowEdge].open)role=s.chambers[atrial].activation>.015?'Filling, supplemented by atrial contraction':'Passive ventricular filling';else role=sidePhase==='isovolumetric-relaxation'?'Isovolumetric relaxation: both valves closed':sidePhase==='isovolumetric-contraction'?'Isovolumetric contraction: both valves closed':'Both ventricular valves closed';
  const destination=info.nextPool==='systemicArtery'?s.arteries.systemic.pressure:info.nextPool==='pulmonaryArtery'?s.arteries.pulmonary.pressure:s.chambers[info.nextPool].pressure;
  return {...info,id,volume:c.volume,pressure:c.pressure,activation:c.activation,inflow,outflow,netFlow:inflow-outflow,nextValveOpen:v.open,nextValveGradient:v.gradient,nextPressure:destination,role,why:info.nextValve+' '+(v.open?'open: upstream pressure is higher; forward passage':'closed: upstream pressure does not exceed downstream pressure; no valve passage'),units:{pressure:'mmHg',volume:'mL',flow:'mL/s',activation:'normalized 0–1'},representation:'Model-calculated volume and pressure; authored cavity geometry is not measured patient anatomy'};
 }
 function step(index){return itinerary[Math.max(0,Math.min(itinerary.length-1,index|0))];}
 const api={chambers,itinerary,flow,chamber,step,ledgerBoundary:'SVC and IVC are two authored paths for the one aggregate systemicReturn model edge; no separate branch flow measurements. Pulmonary and systemic capillary beds are existing lumped vascular compartments, not added blood pools.'};root.HeartV3Flow=api;if(typeof module==='object')module.exports=api;
})(typeof window==='object'?window:globalThis);
