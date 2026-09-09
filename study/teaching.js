/* Shared teaching feedback for the existing quiz and game engines. */
const StudyTeaching = (() => {
  const visuals = {
  "v001": {
    "src": "study/images/v001.jpg",
    "chapter": 1,
    "page": 16,
    "title": "History and Topographic Anatomy",
    "cue": "Compare the instrument with the tracing it produces. The photograph links Einthoven’s string galvanometer to an actual historical recording.",
    "width": 1440,
    "height": 810
  },
  "v002": {
    "src": "study/images/v002.jpg",
    "chapter": 1,
    "page": 27,
    "title": "History and Topographic Anatomy",
    "cue": "Use the person’s own right and left. Trace the arrows toward the head, midline, trunk or extremity before choosing the directional term.",
    "width": 1440,
    "height": 810
  },
  "v003": {
    "src": "study/images/v003.jpg",
    "chapter": 1,
    "page": 28,
    "title": "History and Topographic Anatomy",
    "cue": "Picture the cut: frontal separates front/back, transverse top/bottom, sagittal left/right. Limb and chest leads use different planes.",
    "width": 1440,
    "height": 810
  },
  "v004": {
    "src": "study/images/v004.jpg",
    "chapter": 1,
    "page": 32,
    "title": "History and Topographic Anatomy",
    "cue": "Find the sternal angle, then count ribs and the spaces below them. Keep a bone, its border and an intercostal space distinct.",
    "width": 1440,
    "height": 810
  },
  "v005": {
    "src": "study/images/v005.jpg",
    "chapter": 1,
    "page": 30,
    "title": "History and Topographic Anatomy",
    "cue": "Trace each vertical line back to its named landmark: sternum, middle of clavicle, or front/middle/back of the axilla.",
    "width": 1440,
    "height": 810
  },
  "v006": {
    "src": "study/images/v006.jpg",
    "chapter": 2,
    "page": 10,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Follow the air passage behind the nose and mouth toward the larynx. The nasal cavity and nasopharynx are adjacent, distinct structures.",
    "width": 1440,
    "height": 810
  },
  "v007": {
    "src": "study/images/v007.jpg",
    "chapter": 2,
    "page": 13,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Follow the airway from trachea through branching bronchi toward the alveoli. Conducting air and exchanging gas are different jobs.",
    "width": 1440,
    "height": 810
  },
  "v008": {
    "src": "study/images/v008.jpg",
    "chapter": 2,
    "page": 17,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Find the two lung surfaces and the pleural space. The lining reduces friction; alveoli exchange gas; the diaphragm changes chest volume.",
    "width": 1440,
    "height": 810
  },
  "v009": {
    "src": "study/images/v009.jpg",
    "chapter": 2,
    "page": 27,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Compare diaphragm position and chest volume during inspiration and expiration. Air follows a pressure gradient.",
    "width": 1440,
    "height": 810
  },
  "v010": {
    "src": "study/images/v010.jpg",
    "chapter": 2,
    "page": 33,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Follow particles from higher to lower concentration. Diffusion exchanges gases; ventilation moves bulk air.",
    "width": 1440,
    "height": 810
  },
  "v011": {
    "src": "study/images/v011.jpg",
    "chapter": 2,
    "page": 45,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Find the emitter and detector on opposite sides of the finger. SpO2 estimates oxygen saturation; it does not measure ventilation or CO2.",
    "width": 1440,
    "height": 810
  },
  "v012": {
    "src": "study/images/v012.jpg",
    "chapter": 2,
    "page": 49,
    "title": "Respiratory Anatomy and Physiology",
    "cue": "Follow exhalation up to the plateau. End-tidal CO2 is read near the end of expiration before the next inspiration.",
    "width": 1440,
    "height": 810
  },
  "v013": {
    "src": "study/images/v013.jpg",
    "chapter": 3,
    "page": 9,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Work from the chamber outward: endocardium, thick myocardium, epicardium, then the pericardial space and sac. This is an anatomy illustration, not a conduction-system map.",
    "width": 749,
    "height": 559
  },
  "v014": {
    "src": "study/images/v014.jpg",
    "chapter": 3,
    "page": 28,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Locate the valves between atria and ventricles, then those at the ventricular exits. Name the two chambers or vessels a valve separates.",
    "width": 1440,
    "height": 810
  },
  "v016": {
    "src": "study/images/v016.jpg",
    "chapter": 3,
    "page": 47,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Compare lumen size in the three cross-sections: constriction narrows the opening and dilation widens it.",
    "width": 1440,
    "height": 810
  },
  "v017": {
    "src": "study/images/v017.jpg",
    "chapter": 3,
    "page": 51,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Locate the deposit projecting into the vessel lumen. Plaque narrows an artery; a traveling embolus and an in-place thrombus describe different events.",
    "width": 1440,
    "height": 810
  },
  "v018": {
    "src": "study/images/v018.jpg",
    "chapter": 3,
    "page": 66,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Trace right heart → lungs → left heart → body. Name vessels by flow direction relative to the heart, not oxygen content alone.",
    "width": 1440,
    "height": 810
  },
  "v019": {
    "src": "study/images/v019.jpg",
    "chapter": 3,
    "page": 105,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Follow the pathway from SA node through AV node, His bundle, branches and Purkinje fibers. Location, impulse generation and muscle contraction are different concepts.",
    "width": 1440,
    "height": 810
  },
  "v020": {
    "src": "study/images/v020.jpg",
    "chapter": 3,
    "page": 115,
    "title": "Cardiovascular System Anatomy and Physiology",
    "cue": "Compare the sympathetic accelerator with the parasympathetic vagal influence at the SA and AV nodes.",
    "width": 1440,
    "height": 810
  },
  "v021": {
    "src": "study/images/v021.jpg",
    "chapter": 4,
    "page": 26,
    "title": "Electrophysiology — Leads, Waves and Measurements",
    "cue": "Follow each arrow from its negative electrode to its positive electrode. Lead II runs from right arm to left leg.",
    "width": 1440,
    "height": 810
  },
  "v022": {
    "src": "study/images/v022.jpg",
    "chapter": 4,
    "page": 40,
    "title": "Electrophysiology — Leads, Waves and Measurements",
    "cue": "Separate physical electrodes from the electrical views called leads. Limb views use the frontal plane; V1–V6 use the transverse plane.",
    "width": 1440,
    "height": 810
  },
  "v023": {
    "src": "study/images/v023.jpg",
    "chapter": 4,
    "page": 46,
    "title": "Electrophysiology — Leads, Waves and Measurements",
    "cue": "Follow one cycle from P through QRS to T. Identify each waveform boundary before naming the event or interval. This is a labeled teaching diagram, not a patient rhythm strip.",
    "width": 1440,
    "height": 810
  },
  "v024": {
    "src": "study/images/v024.jpg",
    "chapter": 4,
    "page": 51,
    "title": "Electrophysiology — Leads, Waves and Measurements",
    "cue": "Find the start of P and the start of QRS. Those are the PR endpoints; ending at the end of P would measure P duration instead.",
    "width": 706,
    "height": 575
  },
  "v025": {
    "src": "study/images/v025.jpg",
    "chapter": 4,
    "page": 58,
    "title": "Electrophysiology — Leads, Waves and Measurements",
    "cue": "Find QRS onset and the end of T. Those delimit QT; rate correction produces QTc. This schematic supplies landmarks, not a measurable patient QT.",
    "width": 706,
    "height": 575
  },
  "v026": {
    "src": "study/images/v026.jpg",
    "chapter": 10,
    "page": 6,
    "title": "Pacemakers",
    "cue": "Identify the generator and connected leads. A device component and the chamber being paced answer different questions.",
    "width": 1440,
    "height": 810
  },
  "v027": {
    "src": "study/images/v027.jpg",
    "chapter": 10,
    "page": 11,
    "title": "Pacemakers",
    "cue": "Compare one atrial lead, one ventricular lead and coordinated chamber arrangements. Lead position determines where an impulse is delivered.",
    "width": 1440,
    "height": 810
  },
  "v028": {
    "src": "study/images/v028.jpg",
    "chapter": 11,
    "page": 4,
    "title": "Circulation in the Heart — ACS and 12-Lead ECG",
    "cue": "Follow the coronary branches from the aortic root onto the heart’s surface. Coronary vessels supply the myocardium itself.",
    "width": 1440,
    "height": 810
  },
  "v029": {
    "src": "study/images/v029.jpg",
    "chapter": 11,
    "page": 35,
    "title": "Circulation in the Heart — ACS and 12-Lead ECG",
    "cue": "Match the lateral views: I/aVL in the frontal plane and V5/V6 in the transverse plane. A territory is a view, not proof of a unique culprit artery.",
    "width": 1440,
    "height": 810
  },
  "v030": {
    "src": "study/images/v030.jpg",
    "chapter": 11,
    "page": 51,
    "title": "Circulation in the Heart — ACS and 12-Lead ECG",
    "cue": "Keep V7–V9 on the same horizontal level as V6; move around the posterior chest from the posterior axillary line toward the spine.",
    "width": 1440,
    "height": 810
  }
};
  function reason(q, picked) {
    const option = q.o ? q.o.indexOf(picked) : -1;
    return (option >= 0 && option !== q.a && q.wrong && q.wrong[option]
      ? q.wrong[option] + ' ' : '') + q.e;
  }
  function text(parent, tag, value, cls) {
    const n=document.createElement(tag); n.textContent=value;
    if(cls)n.className=cls; parent.appendChild(n); return n;
  }
  function media(parent,q) {
    const v=visuals[q.studyRef];
    const src=v?v.src:q.studyLegacy;
    if(!src)return;
    const detail=document.createElement('details'); detail.className='study-media';
    text(detail,'summary',v?'Study the slide · Chapter '+v.chapter+' · page '+v.page:'Study the existing course illustration');
    const figure=document.createElement('figure'); detail.appendChild(figure);
    const status=text(figure,'p','Open the illustration to study it.','study-image-status');
    const im=document.createElement('img'); im.alt=v?v.cue:'Course reference illustration for this explanation'; im.decoding='async';
    if(v){im.width=v.width;im.height=v.height;}
    figure.appendChild(im);
    const zoom=text(figure,'button','Enlarge image','study-zoom');zoom.type='button';zoom.hidden=true;
    let loaded=false;
    const getImage=()=>{status.textContent='Loading illustration…';im.hidden=false;im.src=src;};
    im.onload=()=>{loaded=true;status.hidden=true;zoom.hidden=false;};
    im.onerror=()=>{loaded=false;im.hidden=true;zoom.hidden=true;status.hidden=false;status.textContent='The illustration could not load. Your explanation and score are still available.';retry.hidden=false;};
    const retry=text(figure,'button','Retry image','study-zoom');retry.type='button';retry.hidden=true;
    retry.onclick=()=>{retry.hidden=true;getImage();};
    detail.addEventListener('toggle',()=>{if(detail.open&&!im.getAttribute('src'))getImage();});
    if(v){text(figure,'figcaption',v.title+' — supplied chapter PDF, page '+v.page+'.');text(detail,'p',v.cue,'study-cue');}
    else text(figure,'figcaption','Existing project reference; exact source page has not been reverified in this update.');
    zoom.onclick=()=>{if(!loaded)return;openImage(src,im.alt);};
    parent.appendChild(detail);
  }
  function openImage(src,alt) {
    let dialog=document.getElementById('study-image-dialog');
    if(!dialog){dialog=document.createElement('dialog');dialog.id='study-image-dialog';document.body.appendChild(dialog);}
    dialog.innerHTML='';
    dialog.setAttribute('aria-label','Enlarged course illustration');
    const close=text(dialog,'button','Close image','study-zoom');close.type='button';close.onclick=()=>dialog.close();
    const hint=text(dialog,'p','Scroll within the image to inspect the original proportions.');
    const viewport=document.createElement('div');viewport.className='study-image-viewport';viewport.tabIndex=0;viewport.setAttribute('aria-label','Scrollable enlarged illustration');
    const im=document.createElement('img');im.src=src;im.alt=alt;viewport.appendChild(im);dialog.appendChild(viewport);
    dialog.showModal();close.focus();
  }
  const references={"51":{"title":"Gas exchange and conducting airways","url":"https://www.ncbi.nlm.nih.gov/books/NBK594996/"},"52":{"title":"Gas exchange and conducting airways","url":"https://www.ncbi.nlm.nih.gov/books/NBK594996/"},"58":{"title":"Gas exchange and conducting airways","url":"https://www.ncbi.nlm.nih.gov/books/NBK594996/"},"61":{"title":"FDA: Pulse Oximeter Basics","url":"https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics"},"83":{"title":"FDA: Pulse Oximeter Basics","url":"https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics"},"121":{"title":"Heart anatomy and subendocardial conduction","url":"https://www.ncbi.nlm.nih.gov/books/NBK482452/"},"163":{"title":"Physiology of the sinoatrial node","url":"https://www.ncbi.nlm.nih.gov/books/NBK459238/"},"299":{"title":"Myocardial viability and ischemic injury","url":"https://www.ncbi.nlm.nih.gov/books/NBK592410/"},"373":{"title":"Electrical axis interpretation","url":"https://www.ncbi.nlm.nih.gov/books/NBK470532/"},"374":{"title":"Electrical axis interpretation","url":"https://www.ncbi.nlm.nih.gov/books/NBK470532/"},"375":{"title":"Electrical axis interpretation","url":"https://www.ncbi.nlm.nih.gov/books/NBK470532/"},"376":{"title":"Electrical axis interpretation","url":"https://www.ncbi.nlm.nih.gov/books/NBK470532/"},"555":{"title":"AHA 2025 Adult Advanced Life Support","url":"https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support"}};
  function feedback(parent,q,picked) {
    parent.querySelectorAll('.study-extra').forEach(n=>n.remove());
    const box=document.createElement('div');box.className='study-extra';
    if(q.o && picked!==undefined && picked!==q.o[q.a]){
      text(box,'p','You chose: '+picked,'study-picked');
      text(box,'p','Correct answer: '+q.o[q.a],'study-correct');
    }
    if(q.slotNotes){
      const detail=document.createElement('details');detail.className='study-slot-review';
      text(detail,'summary','Understand each '+(q.qtype==='label'?'structure':'step'));
      const list=document.createElement('ol');detail.appendChild(list);
      q.slotNotes.forEach((note,i)=>text(list,'li',(q.markers?q.markers[i][0]+': ':'')+note));
      box.appendChild(detail);
    }
    media(box,q);
    const ref=references[q._id];
    if(ref){const p=text(box,'p','Reference: ','study-source');const a=text(p,'a',ref.title);a.href=ref.url;a.target='_blank';a.rel='noopener noreferrer';}
    parent.appendChild(box);
  }
  return {reason,media,feedback,visuals};
})();
