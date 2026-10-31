/* Related recordings for real simulator sections and ASPT study-path topics.
   This is content selection only: no scene bindings or simulator commands. */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ContextualAudioContexts = factory();
}(typeof window === 'object' ? window : globalThis, function () {
  'use strict';
  const range = (module, start, end) => Array.from({length:end-start+1}, (_, i) => module + '.' + String(start+i).padStart(2, '0'));
  const guide = {
    foundation: ['M01.01','M01.03','M01.04','M01.05','M01.06'],
    blood: ['M01.02','M02.09','M02.10','M05.09','M05.10','M14.03'],
    anatomy: ['M01.04',...range('M02',1,7)],
    muscle: ['M03.01','M03.02',...range('M04',6,11)],
    circulation: [...range('M02',2,8),'M02.11','M02.12'],
    disease: range('M14',1,8).filter(id => id !== 'M14.06'),
    pressure: range('M03',3,9),
    airway: range('M05',1,5),
    respiration: [...range('M05',6,12),...range('M06',1,5)],
    conduction: [...range('M04',1,5),'M04.12'],
    cycle: [...range('M03',3,6),...range('M04',6,10)],
    instrument: ['M07.01','M07.06','M14.06'],
    waves: [...range('M08',2,5),'M07.07'],
    measure: ['M08.01',...range('M08',5,9)],
    limb: ['M07.02','M07.03','M07.07','M07.08'],
    placement: ['M07.04','M07.05','M07.01','M07.03','M07.06'],
    prep: ['M07.06'],
    artifacts: ['M07.06'],
    rhythms: ['M08.06','M08.09',...range('M09',1,6),...range('M10',1,7),...range('M11',1,5),...range('M12',1,6),...range('M13',1,6),'M14.07']
  };
  const structures = {
    ra:['M02.01','M02.02','M02.03'], rv:['M02.03','M02.04','M02.01'],
    la:['M02.05','M02.06','M02.01'], lv:['M02.01','M02.06','M02.07'],
    tricuspid:['M02.03','M03.03','M03.04'], pulmonary:['M02.04','M03.05'],
    mitral:['M02.06','M03.03','M03.04'], aortic:['M02.07','M03.05','M03.06'],
    svc:['M02.02'],ivc:['M02.02'],pa:['M02.04'],vein:['M02.05'],aorta:['M02.07'],
    wall:['M03.01','M03.02'],sa:['M04.02','M04.07'],avnode:['M04.03'],his:['M04.04'],purkinje:['M04.04'],
    lca:['M02.11','M14.03'],rca:['M02.11','M14.03'],coronaryVessel:['M02.11','M14.03'],
    papillary:['M02.03','M02.06'],chordae:['M02.03','M02.06'],annuli:['M02.03','M02.06']
  };
  const phases = {
    'passive-filling':['M03.03','M03.06'], 'atrial-contraction':['M03.03'],
    'isovolumetric-contraction':['M03.04'], ejection:['M03.05'],
    'isovolumetric-relaxation':['M03.06'], diastasis:['M03.03']
  };
  function heart(s, manualPhase) {
    if (s.route) {
      const stage = s.stage || '';
      if (s.route === 'routeA') {
        const selected=s.routeContext?.valve||s.selected;
        const anatomy=structures[selected]||['M02.03','M02.06'];
        if (/tissue$/.test(stage)) return [...anatomy,'M03.01','M03.02'];
        return [...anatomy,'M03.03','M03.04','M03.05','M03.06'];
      }
      const stages={
        'routeB.wall':['M03.01','M03.02'],
        'routeB.pericardium':['M03.01'],
        'routeB.tissue':['M03.02','M04.08'],
        'routeB.cell':['M04.08','M04.06','M04.10'],
        'routeB.myofibril':['M04.09','M04.08'],
        'routeB.sarcomere':['M04.09','M04.10'],
        'routeB.filaments':['M04.09','M04.10'],
        'routeC.nodal':['M04.07','M04.02'],
        'routeC.ventricular':['M04.06','M04.08','M04.12'],
        'routeD.origin':['M02.11','M14.03'],
        'routeD.artery':['M02.11','M02.09'],
        'routeD.capillary':['M02.09','M02.10','M05.09'],
        'routeD.exchange':['M02.10','M05.09','M02.11'],
        'routeD.return':['M02.11','M02.02']
      };
      if(stages[stage])return stages[stage];
      if (/sarcomere|myofilament|filament/.test(stage)) return ['M04.09','M04.08','M04.10'];
      if (/tubule|calcium|coupling/.test(stage)) return ['M04.08','M04.10'];
      if (/nodal|pacemaker|\.sa$/.test(stage)) return ['M04.02','M04.07'];
      if (/conduction|purkinje|his|avnode/.test(stage) || s.route === 'routeC') return ['M04.01','M04.03','M04.04','M04.06'];
      if (/coronary|capillary/.test(stage) || s.route === 'routeD') return ['M02.11','M14.03'];
      return ['M03.01','M03.02','M04.06','M04.08','M04.09','M04.10','M04.11'];
    }
    if (manualPhase && phases[manualPhase]) return phases[manualPhase];
    if (s.flowTracing) return ['M02.08','M02.12',...(structures[s.selected] || [])];
    return structures[s.selected] || ['M02.01','M02.08','M03.01'];
  }
  function lungs(s, stage) {
    const stages={
      smaller:['M05.03','M05.04'],bronchioles:['M05.03','M05.04'],terminal:['M05.04','M05.03'],
      respiratory:['M05.04','M05.08'],ducts:['M05.08','M05.09'],sacs:['M05.08','M05.09']
    };
    if(stages[stage])return stages[stage];
    if (/membrane|alveol/.test(stage || s.view || '')) return ['M05.08','M05.09','M05.10'];
    if (/trachea|primary|lobar|segment|bronch/.test(stage || '')) return ['M05.02','M05.03','M05.04'];
    if (/diaphragm|ribs/.test(s.selected || '')) return ['M05.06','M05.07','M05.05'];
    if (/pleura/.test(s.selected || '')) return ['M05.05','M05.06'];
    if (/larynx|epiglottis|trachea/.test(s.selected || '')) return ['M05.02','M05.03'];
    if (/nose|mouth|pharynx/.test(s.selected || '')) return ['M05.01','M05.02'];
    return ['M05.06','M05.07','M05.03','M05.08','M06.01','M06.04'];
  }
  function lead(s) {
    if (s.showIntercostalSpaces || /rib|ics|stern|clavic|axill/.test(s.selected || '')) return ['M07.04','M07.05','M01.03'];
    if (/^v[1-6]$/i.test(s.selected || '') || s.tab === 'guided') return ['M07.05','M07.04','M07.03'];
    return ['M07.02','M07.03','M07.01','M07.06','M07.08'];
  }
  function ecg(stage) {
    return ({p:['M08.02'],pr:['M08.02'],qrs:['M08.03'],st:['M08.04'],t:['M08.04'],u:['M08.04'],tp:['M08.05','M08.06']})[String(stage).toLowerCase()] || ['M08.02','M08.03','M08.04','M08.05','M08.01'];
  }
  return {guide, structures, phases, heart, lungs, lead, ecg};
}));
