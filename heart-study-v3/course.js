/* Original paraphrases checked against the owner's course PDF. No slide images
 * or source PDF bytes are redistributed. Pages are physical PDF pages, 1-based. */
(function(root){'use strict';
 const groups=[
  {id:'filling',label:'Filling',phase:'passive-filling',explanation:'Relaxed ventricles receive blood through the open AV valves; semilunar valves remain closed.'},
  {id:'atrial',label:'Atrial contraction',phase:'atrial-contraction',explanation:'Atrial contraction adds to ventricular filling through the AV valves.'},
  {id:'ventricular',label:'Ventricular contraction',phase:'isovolumetric-contraction',explanation:'Pressure first rises with all valves closed. Ejection starts only after ventricular pressure exceeds arterial pressure.'},
  {id:'relaxation',label:'Relaxation',phase:'isovolumetric-relaxation',explanation:'Semilunar valves close. Both valve pairs remain closed until falling ventricular pressure permits filling again.'}
 ];
 const groupFor=phase=>phase==='atrial-contraction'?'atrial':['isovolumetric-contraction','ejection'].includes(phase)?'ventricular':phase==='isovolumetric-relaxation'?'relaxation':'filling';
 const notes=[
  {pages:'112–114, 118',term:'Heart wall and pericardium',text:'Epicardium (visceral serous pericardium), myocardium and endocardium form the heart wall. The fibrous and parietal serous pericardium surround it; the fluid cavity is a space, not a muscle layer. The page118 review groups wall and sac together; this lesson distinguishes them.'},
  {pages:'116, 121, 352',term:'Excitability / irritability',text:'The course uses irritability as a synonym for excitability: response to a stimulus. In its ectopic-pacemaker discussion it also uses the word for increased impulse formation. That second context should not replace the definition of excitability. Automaticity initiates; conductivity transmits; contractility generates force and shortening.'},
  {pages:'123–127',term:'Receiving and discharging chambers',text:'The right atrium receives systemic venous return, and the left atrium receives pulmonary venous return. The right ventricle supplies the pulmonary circuit; the left ventricle supplies the systemic circuit. Page127’s size shorthand is clarified as a thicker muscular left-ventricular wall, without implying greater normal forward flow or necessarily greater cavity capacity.'},
  {pages:'128–131',term:'SV, CO and EF',text:'Course reference ranges are SV60–100mL/beat, CO4–8L/min and EF55–70%. These are study references, not diagnostic thresholds. SV=EDV−ESV; CO=SV×HR/1000 in L/min; EF=100×SV/EDV. A preserved EF does not exclude heart failure.'},
  {pages:'132–137',term:'Mitral / bicuspid; pulmonary / pulmonic',text:'Tricuspid and mitral/bicuspid are atrioventricular (AV) valves. Pulmonic/pulmonary and aortic are semilunar (SL) valves. Pressure differences operate them. RV→pulmonic→pulmonary trunk; LV→aortic→aorta. Chordae and papillary muscles support AV leaflets; semilunar cusps have no chordal apparatus.'},
  {pages:'138–140',term:'Stenosis, regurgitation and atresia',text:'Restricted opening, backward leakage and an absent or closed normal opening are different problems. Existing comparisons are instructional schematics; they are not validated disease simulations.'},
  {pages:'162, 167, 180',term:'Systole, diastole and the four teaching stages',text:'The screenshot’s four groups are shown above the detailed mechanical phases. Ventricular contraction includes all-valves-closed isovolumetric contraction before ejection. Relaxation begins with an all-valves-closed interval before AV opening. Page180’s open-sem­ilunar systole shorthand applies to ejection, not the entire systolic period. The detailed isovolumetric terms are supplementary physiology, not claimed exact course wording.'},
  {pages:'211–216, 231, 269',term:'Electrical activation before mechanics',text:'Sinoatrial (SA) initiation, atrial activation, AV delay and His–Purkinje activation precede their mechanical effects. QRS is not an ejection signal. At75beats/min a beat lasts0.8s; a complete blood-circulation journey takes many beats.'}
 ];
 const api={title:'All Slideshows Combined (01-13).pdf',pages:911,pageConvention:'1-based physical PDF pages',checked:'2026-10-21',groups,groupFor,notes};root.HeartV3Course=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='object'?window:globalThis);
