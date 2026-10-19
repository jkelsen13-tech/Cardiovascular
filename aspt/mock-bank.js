/* Original ASPT practice bank. 25 per domain is a study design choice, not official weighting. */
(function(global){
  "use strict";
  global.AsptMockBank = [
  {
    "id": "aspt2-heart-01",
    "domain": "heart",
    "concept": "receiving-chambers",
    "guideRefs": [
      "T7",
      "1b",
      "H3"
    ],
    "prompt": "Which pair receives blood before it enters the ventricles?",
    "options": [
      "Right and left atria",
      "Aorta and pulmonary trunk",
      "Right and left ventricles",
      "Coronary arteries"
    ],
    "answer": 0,
    "explain": "Atria receive venous return; ventricles propel blood into the two circuits.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-02",
    "domain": "heart",
    "concept": "right-return",
    "guideRefs": [
      "T18",
      "T37",
      "H1",
      "H2",
      "1e"
    ],
    "prompt": "Which vessels return most systemic venous blood to the right atrium?",
    "options": [
      "Pulmonary veins",
      "Coronary arteries only",
      "Aorta and pulmonary trunk",
      "Superior and inferior venae cavae"
    ],
    "answer": 3,
    "explain": "The caval veins return upper- and lower-body blood; pulmonary veins enter the left atrium.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "circulation"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-03",
    "domain": "heart",
    "concept": "right-av",
    "guideRefs": [
      "T40",
      "H4",
      "1d"
    ],
    "prompt": "Blood leaving the right atrium normally passes through which valve next?",
    "options": [
      "Aortic",
      "Pulmonary",
      "Tricuspid",
      "Mitral"
    ],
    "answer": 2,
    "explain": "The right AV valve lies between the right atrium and right ventricle.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-04",
    "domain": "heart",
    "concept": "pulmonary-outlet",
    "guideRefs": [
      "T28",
      "T30",
      "H7",
      "H8",
      "1e",
      "H5"
    ],
    "prompt": "Which sequence correctly leaves the right ventricle?",
    "options": [
      "Tricuspid valve → vena cava",
      "Pulmonary valve → pulmonary trunk",
      "Aortic valve → pulmonary veins",
      "Mitral valve → aorta"
    ],
    "answer": 1,
    "explain": "The pulmonary semilunar valve opens toward the trunk and pulmonary arteries.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "circulation"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-05",
    "domain": "heart",
    "concept": "lung-return",
    "guideRefs": [
      "T31",
      "H10",
      "H11",
      "1e"
    ],
    "prompt": "Where does blood returning through pulmonary veins enter first?",
    "options": [
      "Left atrium",
      "Right atrium",
      "Right ventricle",
      "Aorta"
    ],
    "answer": 0,
    "explain": "Pulmonary venous blood returns from the lungs to the left atrium.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "circulation"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-06",
    "domain": "heart",
    "concept": "left-av",
    "guideRefs": [
      "T22",
      "H12",
      "1d"
    ],
    "prompt": "Which valve separates left atrium and left ventricle?",
    "options": [
      "Pulmonary",
      "Tricuspid",
      "Aortic",
      "Mitral"
    ],
    "answer": 3,
    "explain": "Mitral is the left AV valve; the aortic valve is the left ventricular outlet.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-07",
    "domain": "heart",
    "concept": "systemic-outlet",
    "guideRefs": [
      "T2",
      "T3",
      "H14",
      "H15",
      "H16",
      "1e",
      "H13"
    ],
    "prompt": "After the left ventricle, which forward route is normal?",
    "options": [
      "Pulmonary valve → vena cava",
      "Tricuspid valve → pulmonary veins",
      "Aortic valve → ascending aorta → aortic arch",
      "Mitral valve → pulmonary trunk"
    ],
    "answer": 2,
    "explain": "The aortic valve directs left ventricular output into the systemic arterial circuit.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "circulation"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-08",
    "domain": "heart",
    "concept": "ventricular-septum",
    "guideRefs": [
      "T35",
      "H18",
      "1d"
    ],
    "prompt": "Which wall separates the two ventricles?",
    "options": [
      "Mitral leaflet",
      "Interventricular septum",
      "Interatrial septum",
      "Pericardial sac"
    ],
    "answer": 1,
    "explain": "Interventricular denotes between ventricles; interatrial denotes between atria.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-09",
    "domain": "heart",
    "concept": "atrial-septum",
    "guideRefs": [
      "T35",
      "H17",
      "1d"
    ],
    "prompt": "A pointer lies between the right and left atria. What does it identify?",
    "options": [
      "Interatrial septum",
      "Interventricular septum",
      "Aortic arch",
      "Papillary muscle"
    ],
    "answer": 0,
    "explain": "The interatrial partition separates the receiving chambers.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-10",
    "domain": "heart",
    "concept": "chordae-papillary",
    "guideRefs": [
      "H19",
      "H20",
      "1d"
    ],
    "prompt": "Why do papillary muscles tension chordae during ventricular contraction?",
    "options": [
      "To pull semilunar valves open",
      "To carry the SA impulse across the septum",
      "To oxygenate ventricular blood",
      "To help prevent AV leaflets prolapsing into atria"
    ],
    "answer": 3,
    "explain": "Papillary muscles and chordae support AV valves; pressure differences open the valves.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-11",
    "domain": "heart",
    "concept": "rv-ridges-outflow",
    "guideRefs": [
      "H6",
      "H21",
      "1d"
    ],
    "prompt": "Which pairing correctly distinguishes two right-ventricular structures?",
    "options": [
      "Conus: pulmonary vein; trabeculae: coronary vessels",
      "Conus: atrial septum; trabeculae: pericardial layers",
      "Conus arteriosus: outflow region; trabeculae carneae: muscular ridges",
      "Conus: left atrium; trabeculae: valve cords"
    ],
    "answer": 2,
    "explain": "The conus leads toward the pulmonary valve; trabeculae are internal ventricular ridges.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-12",
    "domain": "heart",
    "concept": "apex-base",
    "guideRefs": [
      "T4",
      "T10",
      "1b"
    ],
    "prompt": "Which description correctly orients the heart?",
    "options": [
      "Apex and base are names for the same chamber",
      "Apex is the pointed inferior tip; base is the broad posterior/superior region",
      "Apex is the broad upper surface",
      "Base is the pointed lower tip"
    ],
    "answer": 1,
    "explain": "The apex points inferiorly and toward patient left; the broad base lies opposite it.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "anatomy"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-13",
    "domain": "heart",
    "concept": "myocardium",
    "guideRefs": [
      "T13",
      "T25",
      "1f",
      "1a"
    ],
    "prompt": "Which layer supplies most of the heart wall's pumping force?",
    "options": [
      "Myocardium",
      "Endocardium",
      "Fibrous pericardium",
      "Valve endothelium"
    ],
    "answer": 0,
    "explain": "The myocardium is the cardiac muscle layer; the lining and sac serve different roles.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-14",
    "domain": "heart",
    "concept": "inner-outer-layers",
    "guideRefs": [
      "T16",
      "T17",
      "T27",
      "1d"
    ],
    "prompt": "Which pairing correctly identifies a lining and an outer heart-wall layer?",
    "options": [
      "Endocardium: outer sac; epicardium: blood cavity",
      "Endocardium: septal artery; epicardium: valve cord",
      "Endocardium and epicardium: both ventricular chambers",
      "Endocardium: inner lining; epicardium: outer wall layer"
    ],
    "answer": 3,
    "explain": "The epicardium is also visceral serous pericardium; the endocardium faces blood.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-15",
    "domain": "heart",
    "concept": "coronary-supply",
    "guideRefs": [
      "T14",
      "1d"
    ],
    "prompt": "Which vessels supply the myocardium itself with arterial blood?",
    "options": [
      "Venae cavae",
      "Thoracic lymphatics",
      "Coronary arteries",
      "Pulmonary veins directly bathing its surface"
    ],
    "answer": 2,
    "explain": "Coronary arterial branches nourish the heart muscle; cavity blood is not its main nutrient supply.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "circulation"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-16",
    "domain": "heart",
    "concept": "ventricular-systole",
    "guideRefs": [
      "T39",
      "T44",
      "1c"
    ],
    "prompt": "When ventricular pressure rises above arterial pressure during systole, what can occur?",
    "options": [
      "All chambers stop moving for the entire phase",
      "Semilunar valves open and blood ejects",
      "AV valves must open simultaneously",
      "Blood flows from aorta into atria"
    ],
    "answer": 1,
    "explain": "Ventricular systole includes a closed-valve pressure-rise phase before ejection.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-3-cardiac-cycle"
    ],
    "lesson": {
      "system": "aspt",
      "index": "pressure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-17",
    "domain": "heart",
    "concept": "ventricular-diastole",
    "guideRefs": [
      "T15",
      "1c"
    ],
    "prompt": "What is a major role of ventricular diastole?",
    "options": [
      "Relaxation permitting ventricular filling",
      "Continuous ejection through open aortic valves",
      "Depolarization of all cells without recovery",
      "Closure of every valve for the whole interval"
    ],
    "answer": 0,
    "explain": "Relaxation is followed by filling when ventricular pressure falls below atrial pressure.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-3-cardiac-cycle"
    ],
    "lesson": {
      "system": "aspt",
      "index": "pressure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-18",
    "domain": "heart",
    "concept": "artery-direction",
    "guideRefs": [
      "T28",
      "T38",
      "1e"
    ],
    "prompt": "Why is the pulmonary artery still called an artery despite carrying oxygen-poor blood?",
    "options": [
      "All arteries contain oxygen-rich blood",
      "Its wall has no muscle",
      "It returns directly to the left atrium",
      "It carries blood away from the heart"
    ],
    "answer": 3,
    "explain": "Vessel naming follows direction; oxygenation depends on the circuit.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "blood"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-19",
    "domain": "heart",
    "concept": "exchange-vessels",
    "guideRefs": [
      "1e"
    ],
    "prompt": "Which vessel class provides thin exchange surfaces between blood and tissues?",
    "options": [
      "Vena cava",
      "Pulmonary trunk",
      "Capillaries",
      "Aorta"
    ],
    "answer": 2,
    "explain": "Thin capillary walls support exchange; large arteries and veins principally conduct blood.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "blood"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-20",
    "domain": "heart",
    "concept": "ischemia-infarction",
    "guideRefs": [
      "T20",
      "T24",
      "T66",
      "1g"
    ],
    "prompt": "Which statement distinguishes ischemia from myocardial infarction?",
    "options": [
      "Ischemia means excess coronary flow",
      "Ischemia is inadequate supply; infarction includes tissue death",
      "Every brief supply shortage is already infarction",
      "Infarction means an enlarged atrium only"
    ],
    "answer": 1,
    "explain": "Inadequate oxygen delivery may be reversible; prolonged severe ischemia can cause necrosis.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "disease"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-21",
    "domain": "heart",
    "concept": "angina",
    "guideRefs": [
      "T1",
      "T20",
      "1g"
    ],
    "prompt": "What does angina describe most directly?",
    "options": [
      "Discomfort associated with myocardial ischemia",
      "Proof that myocardium has died",
      "A normal valve-opening sound",
      "The resting membrane voltage"
    ],
    "answer": 0,
    "explain": "Angina is a symptom pattern; it does not by itself establish infarction.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "disease"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-22",
    "domain": "heart",
    "concept": "arterial-disease",
    "guideRefs": [
      "T5",
      "T6",
      "1g"
    ],
    "prompt": "Which term specifically denotes plaque disease within arteries?",
    "options": [
      "All forms of arteriosclerosis equally",
      "Diastole",
      "Vasodilation",
      "Atherosclerosis"
    ],
    "answer": 3,
    "explain": "Arteriosclerosis is broader arterial thickening or stiffening; atherosclerosis specifically involves plaque.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "disease"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-23",
    "domain": "heart",
    "concept": "murmur-valve",
    "guideRefs": [
      "T23",
      "T41",
      "1g"
    ],
    "prompt": "Which statement about a heart murmur is accurate?",
    "options": [
      "It means the SA node has stopped",
      "It is a visible ECG wave",
      "It is a sound associated with turbulent blood flow, requiring interpretation",
      "It proves one specific valve disease"
    ],
    "answer": 2,
    "explain": "A murmur is an auscultatory finding; its cause cannot be determined from the word alone.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy"
    ],
    "lesson": {
      "system": "aspt",
      "index": "disease"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-24",
    "domain": "heart",
    "concept": "vascular-tone",
    "guideRefs": [
      "T42",
      "T43",
      "1h"
    ],
    "prompt": "With other factors fixed, narrowing systemic arterioles generally does what?",
    "options": [
      "Changes arteries into veins",
      "Raises resistance to flow",
      "Eliminates the pressure gradient",
      "Turns arterial blood blue"
    ],
    "answer": 1,
    "explain": "Vasoconstriction increases resistance; vasodilation reduces it, with other conditions unchanged.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-3-cardiac-cycle",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-2-blood-flow-blood-pressure-and-resistance"
    ],
    "lesson": {
      "system": "aspt",
      "index": "pressure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-heart-25",
    "domain": "heart",
    "concept": "rheumatic-valves",
    "guideRefs": [
      "T33",
      "1g"
    ],
    "prompt": "Why is rheumatic fever relevant to cardiac anatomy study?",
    "options": [
      "It can cause lasting valve damage",
      "It creates a fifth heart chamber",
      "It normally replaces the SA node",
      "It makes all arteries become veins"
    ],
    "answer": 0,
    "explain": "Rheumatic heart disease can damage valves; this differs from a rhythm name.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy",
      "https://www.cdc.gov/group-a-strep/about/rheumatic-fever.html"
    ],
    "lesson": {
      "system": "aspt",
      "index": "disease"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-01",
    "domain": "respiration",
    "concept": "nasal-conditioning",
    "guideRefs": [
      "T87",
      "2e"
    ],
    "prompt": "What is an important role of the nasal cavity for inspired air?",
    "options": [
      "Warming, humidifying and filtering",
      "Pumping blood to alveoli",
      "Producing ventricular depolarization",
      "Removing all carbon dioxide from blood"
    ],
    "answer": 0,
    "explain": "The nasal passages condition air before it travels deeper into the respiratory tract.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-02",
    "domain": "respiration",
    "concept": "pharynx-route",
    "guideRefs": [
      "T88",
      "2e"
    ],
    "prompt": "During nasal breathing, air passes from the nasal cavity toward which region next?",
    "options": [
      "Left ventricle",
      "Pleural space",
      "Pulmonary vein",
      "Pharynx"
    ],
    "answer": 3,
    "explain": "The pharynx links the nasal route to the larynx; pleural space is not an airway.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-03",
    "domain": "respiration",
    "concept": "larynx-trachea",
    "guideRefs": [
      "T85",
      "T89",
      "2e"
    ],
    "prompt": "Which order correctly connects throat to the central windpipe?",
    "options": [
      "Larynx → pulmonary vein → trachea",
      "Pharynx → alveolus → trachea",
      "Pharynx → larynx → trachea",
      "Trachea → pharynx → larynx"
    ],
    "answer": 2,
    "explain": "The larynx sits between the pharynx and trachea.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-04",
    "domain": "respiration",
    "concept": "main-bronchi",
    "guideRefs": [
      "T80",
      "T89",
      "2e"
    ],
    "prompt": "What branches directly from the trachea to enter the two lungs?",
    "options": [
      "Pleural sacs",
      "Right and left main bronchi",
      "Pulmonary veins",
      "Alveolar capillaries"
    ],
    "answer": 1,
    "explain": "The central airway divides into two main bronchi before progressively smaller branches.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-05",
    "domain": "respiration",
    "concept": "bronchioles",
    "guideRefs": [
      "T81",
      "2a"
    ],
    "prompt": "Which comparison correctly describes bronchioles?",
    "options": [
      "Smaller airway branches lacking the cartilage plates of bronchi",
      "Large blood vessels leaving the heart",
      "Fluid-filled spaces outside the lungs",
      "The two main branches of the aorta"
    ],
    "answer": 0,
    "explain": "Bronchioles distribute air deeper into the lungs; they are airways, not vessels.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-06",
    "domain": "respiration",
    "concept": "alveolar-surface",
    "guideRefs": [
      "T79",
      "2e"
    ],
    "prompt": "Which structure provides a large thin surface for lung gas exchange?",
    "options": [
      "Nasal hairs",
      "Tracheal cartilage rings",
      "Vocal cords",
      "Alveoli"
    ],
    "answer": 3,
    "explain": "Alveolar walls lie close to pulmonary capillaries, reducing the diffusion distance.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-07",
    "domain": "respiration",
    "concept": "right-left-lobes",
    "guideRefs": [
      "T86",
      "2e"
    ],
    "prompt": "Which normal adult lobe pattern is correct?",
    "options": [
      "Both four",
      "Both one",
      "Right three lobes; left two",
      "Right two; left three"
    ],
    "answer": 2,
    "explain": "The left lung has two lobes and cardiac accommodation; the right has three.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-08",
    "domain": "respiration",
    "concept": "conducting-zone",
    "guideRefs": [
      "T81",
      "T89",
      "2e"
    ],
    "prompt": "Which structure belongs to the conducting zone rather than the alveolated exchange region?",
    "options": [
      "Respiratory bronchiole",
      "Terminal bronchiole",
      "Alveolus",
      "Alveolar duct"
    ],
    "answer": 1,
    "explain": "Terminal bronchioles conduct air; respiratory bronchioles begin the respiratory zone.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system"
    ],
    "lesson": {
      "system": "aspt",
      "index": "airway"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-09",
    "domain": "respiration",
    "concept": "ventilation-definition",
    "guideRefs": [
      "T91",
      "2b"
    ],
    "prompt": "A patient moves air through the airway. Which process is being described?",
    "options": [
      "Ventilation",
      "Blood transportation",
      "Cellular metabolism",
      "Ventricular ejection"
    ],
    "answer": 0,
    "explain": "Ventilation is bulk air movement; it does not by itself establish effective gas exchange.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-10",
    "domain": "respiration",
    "concept": "inspiration-diaphragm",
    "guideRefs": [
      "T84",
      "2b"
    ],
    "prompt": "During quiet spontaneous inspiration, the diaphragm normally does what?",
    "options": [
      "Relaxes and rises first to draw air in",
      "Contracts upward into the lungs",
      "Remains rigid while the heart moves air",
      "Contracts and descends"
    ],
    "answer": 3,
    "explain": "Diaphragm contraction enlarges the thoracic space and helps reduce alveolar pressure.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-11",
    "domain": "respiration",
    "concept": "inspiration-pressure",
    "guideRefs": [
      "T84",
      "2b"
    ],
    "prompt": "Which pressure relation drives air inward during spontaneous inspiration?",
    "options": [
      "All pressure gradients are absent",
      "Blood pressure becomes identical to atmospheric pressure",
      "Alveolar pressure is lower than airway-opening pressure",
      "Alveolar pressure exceeds airway-opening pressure"
    ],
    "answer": 2,
    "explain": "Air flows down the airway pressure gradient; pleural and alveolar pressures are distinct quantities.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-12",
    "domain": "respiration",
    "concept": "quiet-expiration",
    "guideRefs": [
      "T83",
      "2b"
    ],
    "prompt": "What primarily drives quiet expiration after inspiratory muscles relax?",
    "options": [
      "Reversal of pulmonary blood circulation",
      "Elastic recoil",
      "Active contraction of every expiratory muscle",
      "Complete collapse of healthy alveoli"
    ],
    "answer": 1,
    "explain": "Quiet expiration is largely passive recoil; forceful expiration can recruit muscles.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-13",
    "domain": "respiration",
    "concept": "expiration-pressure",
    "guideRefs": [
      "T83",
      "2b"
    ],
    "prompt": "For air to flow outward through an open airway, which relation is expected?",
    "options": [
      "Alveolar pressure exceeds airway-opening pressure",
      "Alveolar pressure must remain below opening pressure",
      "Pleural pressure must equal systemic arterial pressure",
      "There must be no pressure difference"
    ],
    "answer": 0,
    "explain": "Outward flow requires a pressure drop from alveoli toward the airway opening.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-14",
    "domain": "respiration",
    "concept": "residual-air",
    "guideRefs": [
      "T83",
      "T86",
      "2b"
    ],
    "prompt": "After a normal quiet expiration, what remains in the lungs?",
    "options": [
      "No gas at all",
      "Only liquid blood with no airspaces",
      "Exactly one tidal volume in every adult",
      "A substantial volume of gas"
    ],
    "answer": 3,
    "explain": "Quiet expiration returns toward an end-expiratory volume; it does not empty the lungs.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-15",
    "domain": "respiration",
    "concept": "adult-rate",
    "guideRefs": [
      "2c"
    ],
    "prompt": "Which range is commonly taught for resting adult respiratory rate?",
    "options": [
      "60–100 breaths/min",
      "120–200 breaths/min",
      "12–20 breaths/min",
      "2–4 breaths/min"
    ],
    "answer": 2,
    "explain": "The course and common adult teaching range are 12–20/min; age and context matter.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-16",
    "domain": "respiration",
    "concept": "diffusion-gradient",
    "guideRefs": [
      "T82",
      "2a"
    ],
    "prompt": "For each gas crossing the alveolar barrier, what determines net diffusion direction?",
    "options": [
      "Whether it is inspiration or expiration only",
      "Its own partial-pressure gradient",
      "The color of the diagram arrow",
      "The total blood volume alone"
    ],
    "answer": 1,
    "explain": "Oxygen and carbon dioxide have separate partial-pressure gradients.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-17",
    "domain": "respiration",
    "concept": "oxygen-direction",
    "guideRefs": [
      "T79",
      "T82",
      "2a"
    ],
    "prompt": "In usual pulmonary exchange, net oxygen movement is from where to where?",
    "options": [
      "Alveolar gas → pulmonary capillary blood",
      "Capillary blood → tracheal cartilage",
      "Pulmonary artery → room air without alveoli",
      "Red cells → alveolar gas under all conditions"
    ],
    "answer": 0,
    "explain": "Alveolar oxygen partial pressure normally exceeds that of incoming pulmonary capillary blood.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-18",
    "domain": "respiration",
    "concept": "carbon-dioxide-direction",
    "guideRefs": [
      "T79",
      "T82",
      "2a"
    ],
    "prompt": "In usual pulmonary exchange, net carbon dioxide moves in which direction?",
    "options": [
      "Alveolar gas → incoming blood only",
      "Nasal cavity → systemic arteries directly",
      "Pleural fluid → SA node",
      "Incoming capillary blood → alveolar gas"
    ],
    "answer": 3,
    "explain": "Incoming venous blood has a higher carbon dioxide partial pressure than alveolar gas.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-19",
    "domain": "respiration",
    "concept": "blood-transport",
    "guideRefs": [
      "T90",
      "2a"
    ],
    "prompt": "How does circulation link lung exchange to tissues?",
    "options": [
      "Oxygen turns into carbon dioxide inside each red cell",
      "The pleural sac pumps gases through nerves",
      "Blood carries gases between lungs and body tissues",
      "Airways extend directly into every tissue cell"
    ],
    "answer": 2,
    "explain": "Transport in blood differs from ventilation and diffusion; metabolism produces carbon dioxide in tissues.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-20",
    "domain": "respiration",
    "concept": "perfusion",
    "guideRefs": [
      "T90",
      "2a"
    ],
    "prompt": "Which activity is pulmonary perfusion?",
    "options": [
      "CO2 being displayed on a screen",
      "Blood flowing through pulmonary capillaries",
      "Air moving through the trachea",
      "Diaphragm shortening"
    ],
    "answer": 1,
    "explain": "Perfusion is blood flow; ventilation is air movement, and both support exchange.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-21",
    "domain": "respiration",
    "concept": "ventilation-not-exchange",
    "guideRefs": [
      "T82",
      "T91",
      "2a"
    ],
    "prompt": "Why can visible chest movement fail to prove adequate oxygen transfer?",
    "options": [
      "Air movement can persist despite impaired alveolar-capillary exchange",
      "Chest movement directly measures arterial oxygen",
      "Every breath guarantees normal diffusion",
      "Pulmonary capillaries contain no blood during inspiration"
    ],
    "answer": 0,
    "explain": "Barrier damage or poor perfusion can limit exchange despite ventilation.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-22",
    "domain": "respiration",
    "concept": "barrier-thickness",
    "guideRefs": [
      "T82",
      "2a"
    ],
    "prompt": "With other factors fixed, a thicker alveolar-capillary barrier tends to do what?",
    "options": [
      "Guarantee greater diffusion",
      "Make bronchi become arteries",
      "Eliminate the need for perfusion",
      "Reduce diffusion rate"
    ],
    "answer": 3,
    "explain": "Greater diffusion distance slows transfer; surface area and gradients also matter.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-23",
    "domain": "respiration",
    "concept": "minute-ventilation",
    "guideRefs": [
      "T91",
      "2b"
    ],
    "prompt": "At 12 breaths/min and 0.5 L per breath, what is total minute ventilation?",
    "options": [
      "24L/min",
      "12.5L/min",
      "6 L/min",
      "0.042L/min"
    ],
    "answer": 2,
    "explain": "Multiply rate by tidal volume:12/min × 0.5 L=6 L/min; this is not alveolar ventilation.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-24",
    "domain": "respiration",
    "concept": "anatomical-deadspace",
    "guideRefs": [
      "T91",
      "2e"
    ],
    "prompt": "Why does tidal volume not equal the volume of fresh gas reaching exchange surfaces?",
    "options": [
      "The alveoli contain only liquid",
      "Some gas fills conducting dead space",
      "All inspired gas enters blood immediately",
      "The trachea removes all oxygen"
    ],
    "answer": 1,
    "explain": "Conducting airways hold gas without direct alveolar exchange; dead space reduces fresh alveolar delivery.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-respiration-25",
    "domain": "respiration",
    "concept": "pleural-coupling",
    "guideRefs": [
      "T86",
      "2b"
    ],
    "prompt": "What helps the lungs follow normal chest expansion?",
    "options": [
      "Mechanical coupling across the thin pleural-fluid interface",
      "Air normally flowing freely into pleural space",
      "Bronchi pulling directly on the diaphragm",
      "Blood filling the pleural cavity each inspiration"
    ],
    "answer": 0,
    "explain": "Pleural surfaces and pressure relationships couple chest wall and lung movement; pleural space is not the airway.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"
    ],
    "lesson": {
      "system": "aspt",
      "index": "respiration"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-01",
    "domain": "conduction",
    "concept": "sa-role",
    "guideRefs": [
      "T26",
      "T34",
      "3c"
    ],
    "prompt": "In normal sinus rhythm, where does the impulse usually begin?",
    "options": [
      "SA node",
      "AV bundle",
      "Left bundle branch",
      "Purkinje fiber in the apex"
    ],
    "answer": 0,
    "explain": "The SA node normally initiates the atrial impulse before downstream conduction.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-02",
    "domain": "conduction",
    "concept": "sa-location",
    "guideRefs": [
      "T34",
      "3c"
    ],
    "prompt": "Where is the SA node located approximately?",
    "options": [
      "Left ventricular apex",
      "Inside the aortic valve",
      "Within the pulmonary vein lumen",
      "Upper right atrium near the SVC junction"
    ],
    "answer": 3,
    "explain": "The SA node lies high in the right atrial wall, near superior venous entry.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-03",
    "domain": "conduction",
    "concept": "av-delay",
    "guideRefs": [
      "T9",
      "3b"
    ],
    "prompt": "What is a useful effect of relatively slow AV nodal conduction?",
    "options": [
      "Stops all electrical recovery",
      "Oxygenates blood directly",
      "Allows atrial activation before ventricular activation",
      "Forces both ventricles to eject before atrial activation"
    ],
    "answer": 2,
    "explain": "AV nodal delay helps coordinate sequential atrial and ventricular activity.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-04",
    "domain": "conduction",
    "concept": "pathway-order",
    "guideRefs": [
      "T8",
      "T9",
      "T11",
      "T12",
      "T32",
      "T34",
      "3d"
    ],
    "prompt": "Which sequence correctly follows the atrial impulse toward ventricular muscle?",
    "options": [
      "Bundle branches → AV node → SA node → His",
      "AV node → His bundle → bundle branches → Purkinje fibers",
      "Purkinje → SA node → aorta → AV node",
      "His bundle → SA node → atria → AV node"
    ],
    "answer": 1,
    "explain": "The impulse passes through AV junction and specialized ventricular conduction tissue.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-05",
    "domain": "conduction",
    "concept": "his-synonym",
    "guideRefs": [
      "T8",
      "T12",
      "3a"
    ],
    "prompt": "How should AV bundle and Bundle of His be treated in a conduction sequence?",
    "options": [
      "Two names for the same conducting bundle",
      "Two valves opening in sequence",
      "Two separate SA nodes",
      "One artery and one vein"
    ],
    "answer": 0,
    "explain": "The guide lists synonyms as separate terminology entries; do not invent an extra conduction step.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-06",
    "domain": "conduction",
    "concept": "av-location",
    "guideRefs": [
      "T9",
      "3c"
    ],
    "prompt": "Which location best describes the AV node?",
    "options": [
      "Upper left ventricular free wall",
      "Inside the pulmonary artery",
      "Diaphragm center",
      "Lower right atrial septal region near the AV junction"
    ],
    "answer": 3,
    "explain": "The AV node lies near the inferior interatrial septal region, upstream of the His bundle.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-07",
    "domain": "conduction",
    "concept": "branches-location",
    "guideRefs": [
      "T11",
      "3c"
    ],
    "prompt": "The right and left bundle branches primarily run along which region?",
    "options": [
      "Pericardial cavity only",
      "Pulmonary veins",
      "Interventricular septum",
      "Nasal septum"
    ],
    "answer": 2,
    "explain": "Bundle branches distribute activation down the ventricular septum toward the Purkinje system.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-08",
    "domain": "conduction",
    "concept": "purkinje-distribution",
    "guideRefs": [
      "T32",
      "3c"
    ],
    "prompt": "Which network rapidly distributes activation through ventricular subendocardial regions?",
    "options": [
      "Pleural fibers",
      "Purkinje fibers",
      "Chordae tendineae",
      "Coronary veins"
    ],
    "answer": 1,
    "explain": "Purkinje cells are specialized conducting cells, not the structural cords of AV valves.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-09",
    "domain": "conduction",
    "concept": "automaticity",
    "guideRefs": [
      "3b"
    ],
    "prompt": "Which property allows pacemaker cells to initiate impulses without a preceding nerve impulse?",
    "options": [
      "Automaticity",
      "Contractility alone",
      "Valve competence",
      "Arterial compliance"
    ],
    "answer": 0,
    "explain": "Spontaneous pacemaker depolarization supports automaticity; nerves modulate the rate.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-10",
    "domain": "conduction",
    "concept": "excitability",
    "guideRefs": [
      "3b"
    ],
    "prompt": "A cardiac cell responds to a sufficient electrical stimulus. Which property is illustrated?",
    "options": [
      "Stroke volume",
      "Vasodilation",
      "Regurgitation",
      "Excitability"
    ],
    "answer": 3,
    "explain": "Excitability is the capacity to respond to stimulation, distinct from propagation and force.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-11",
    "domain": "conduction",
    "concept": "conductivity",
    "guideRefs": [
      "3b"
    ],
    "prompt": "An impulse propagates from one cardiac region to another. Which property is involved?",
    "options": [
      "Diffusion of oxygen only",
      "Valve closure",
      "Conductivity",
      "Elastic recoil"
    ],
    "answer": 2,
    "explain": "Conductivity describes propagation of electrical activity, not the force of contraction.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-12",
    "domain": "conduction",
    "concept": "contractility",
    "guideRefs": [
      "3e"
    ],
    "prompt": "Which property describes cardiac muscle's ability to develop force?",
    "options": [
      "Electrical isolation",
      "Contractility",
      "Automaticity alone",
      "Airway resistance"
    ],
    "answer": 1,
    "explain": "Contractility is mechanical force generation, distinct from impulse initiation and conduction.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-13",
    "domain": "conduction",
    "concept": "intercalated-disks",
    "guideRefs": [
      "T19",
      "3b"
    ],
    "prompt": "Why are intercalated disks important to coordinated cardiac activity?",
    "options": [
      "They provide mechanical and electrical connections between adjacent cells",
      "They are replacement valves",
      "They pump air into alveoli",
      "They prevent all cell-to-cell signaling"
    ],
    "answer": 0,
    "explain": "Desmosomes support attachment and gap junctions permit electrical communication.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-14",
    "domain": "conduction",
    "concept": "striated-muscle",
    "guideRefs": [
      "T13",
      "T36",
      "3a"
    ],
    "prompt": "Which description fits cardiac muscle?",
    "options": [
      "Nonmuscular voluntary connective tissue",
      "Avascular cartilage",
      "Only smooth muscle without organized filaments",
      "Striated involuntary muscle"
    ],
    "answer": 3,
    "explain": "Cardiac muscle has sarcomeric striations but is not controlled as voluntary skeletal muscle.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "muscle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-15",
    "domain": "conduction",
    "concept": "resting-polarization",
    "guideRefs": [
      "T68",
      "T72",
      "3a"
    ],
    "prompt": "What does a polarized resting cardiac cell possess?",
    "options": [
      "An open aortic valve as a defining feature",
      "No ion concentration differences",
      "A voltage difference across its membrane",
      "Identical charges everywhere with no gradient"
    ],
    "answer": 2,
    "explain": "Resting polarization refers to membrane electrical potential, not a particular ECG lead direction.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-16",
    "domain": "conduction",
    "concept": "activation",
    "guideRefs": [
      "T54",
      "3a"
    ],
    "prompt": "What does depolarization describe?",
    "options": [
      "Air leaving alveoli",
      "A change toward a less negative membrane potential",
      "Blood passing through a valve",
      "Muscle relaxation alone"
    ],
    "answer": 1,
    "explain": "Depolarization is an electrical membrane change; mechanical activity follows excitation.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-17",
    "domain": "conduction",
    "concept": "recovery",
    "guideRefs": [
      "T71",
      "3a"
    ],
    "prompt": "What does repolarization describe?",
    "options": [
      "Electrical recovery toward the resting membrane state",
      "The creation of a new coronary artery",
      "Venous oxygenation in the atrium",
      "A guaranteed pulse"
    ],
    "answer": 0,
    "explain": "Repolarization restores membrane potential after activation; it is not identical to mechanical relaxation.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-18",
    "domain": "conduction",
    "concept": "p-atria",
    "guideRefs": [
      "T69",
      "3e"
    ],
    "prompt": "Which event is represented by the P wave?",
    "options": [
      "Ventricular ejection itself",
      "Ventricular repolarization",
      "Opening of the pulmonary valve",
      "Atrial depolarization"
    ],
    "answer": 3,
    "explain": "The P wave reflects atrial electrical activation; atrial contraction follows.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-19",
    "domain": "conduction",
    "concept": "qrs-ventricles",
    "guideRefs": [
      "T69",
      "3e"
    ],
    "prompt": "What is the principal electrical event represented by QRS?",
    "options": [
      "Ventricular repolarization",
      "Gas diffusion",
      "Ventricular depolarization",
      "Atrial filling only"
    ],
    "answer": 2,
    "explain": "QRS reflects activation of ventricular myocardium; it is not an instantaneous ejection marker.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-20",
    "domain": "conduction",
    "concept": "t-recovery",
    "guideRefs": [
      "T69",
      "T71",
      "3e"
    ],
    "prompt": "Which event is associated with the T wave?",
    "options": [
      "AV valve opening in every lead",
      "Ventricular repolarization",
      "Atrial depolarization",
      "Blood entering the vena cava only"
    ],
    "answer": 1,
    "explain": "T reflects ventricular electrical recovery, not a direct recording of valve motion.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-21",
    "domain": "conduction",
    "concept": "electromechanical-delay",
    "guideRefs": [
      "3e"
    ],
    "prompt": "Immediately after ventricular electrical activation, why is ejection not instantaneous?",
    "options": [
      "Pressure must develop before outflow valves open",
      "The aorta first sends blood into the right atrium",
      "All ventricular valves are already open",
      "Contraction always waits a full breath"
    ],
    "answer": 0,
    "explain": "Excitation precedes force development and isovolumetric pressure rise; ejection follows arterial pressure crossover.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-22",
    "domain": "conduction",
    "concept": "electrical-not-pulse",
    "guideRefs": [
      "3e"
    ],
    "prompt": "Why must a visible organized ECG not be treated as proof of effective circulation?",
    "options": [
      "Every QRS guarantees a normal pulse",
      "An ECG measures oxygen saturation",
      "An ECG directly measures cardiac output",
      "Electrical activity does not directly measure mechanical output"
    ],
    "answer": 3,
    "explain": "Assess the patient and mechanical perfusion separately from electrical recording.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-23",
    "domain": "conduction",
    "concept": "ectopic-source",
    "guideRefs": [
      "T56",
      "3a"
    ],
    "prompt": "What makes an impulse ectopic in a sinus-rhythm context?",
    "options": [
      "It only appears during expiration",
      "It is always a loose-electrode artifact",
      "It originates outside the usual SA pacemaker site",
      "It passes through the SA node normally"
    ],
    "answer": 2,
    "explain": "Ectopic activity arises from another focus; origin and timing require interpretation.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-24",
    "domain": "conduction",
    "concept": "backup-pacemakers",
    "guideRefs": [
      "T67",
      "3c"
    ],
    "prompt": "If the SA node fails, what may occur in specialized cardiac tissue?",
    "options": [
      "The lungs generate the QRS directly",
      "A slower subsidiary pacemaker may initiate activity",
      "All cardiac cells permanently lose excitability",
      "The aortic valve becomes the pacemaker"
    ],
    "answer": 1,
    "explain": "Other conducting tissues can possess automaticity; resulting rate and rhythm depend on the site.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "conduction"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-conduction-25",
    "domain": "conduction",
    "concept": "cardiac-cycle",
    "guideRefs": [
      "T53",
      "3e",
      "4d"
    ],
    "prompt": "Which best describes a complete cardiac cycle?",
    "options": [
      "One sequence of atrial and ventricular contraction and relaxation",
      "Only the QRS waveform",
      "One entire trip of a blood cell through the body",
      "One respiratory inspiration"
    ],
    "answer": 0,
    "explain": "A cardiac cycle is the coordinated beat sequence; full circulation takes more than a single beat.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
    ],
    "lesson": {
      "system": "aspt",
      "index": "cycle"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-01",
    "domain": "electrocardiograph",
    "concept": "machine-trace",
    "guideRefs": [
      "T55",
      "T57",
      "T58",
      "4b"
    ],
    "prompt": "Which pairing correctly names equipment and its output?",
    "options": [
      "Electrocardiograph: instrument; electrocardiogram: tracing",
      "Electrocardiogram: valve; electrocardiograph: artery",
      "Both terms mean ultrasound imaging",
      "Both terms mean blood pressure"
    ],
    "answer": 0,
    "explain": "ECG/EKG denotes the electrical tracing or test; the recording instrument is the electrocardiograph.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "instrument"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-02",
    "domain": "electrocardiograph",
    "concept": "electrode-lead",
    "guideRefs": [
      "T59",
      "T63",
      "4a"
    ],
    "prompt": "How does an electrode differ from a lead?",
    "options": [
      "Electrode is a wave; lead is a valve",
      "Every lead requires a separate chest electrode",
      "The two terms always mean identical objects",
      "Electrode is a sensor contact; lead is an electrical view"
    ],
    "answer": 3,
    "explain": "Several leads can be derived from shared electrodes; distinguish contact hardware from voltage view.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "instrument"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-03",
    "domain": "electrocardiograph",
    "concept": "ten-twelve",
    "guideRefs": [
      "T49",
      "T50",
      "T70",
      "T76",
      "4c"
    ],
    "prompt": "A standard resting 12-lead ECG generally uses how many electrodes?",
    "options": [
      "6",
      "3",
      "10",
      "12"
    ],
    "answer": 2,
    "explain": "Four limb and six chest electrodes produce twelve standard views.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "instrument"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-04",
    "domain": "electrocardiograph",
    "concept": "v1-location",
    "guideRefs": [
      "V1",
      "T61",
      "4g"
    ],
    "prompt": "Where is V1 placed for a standard adult 12-lead recording?",
    "options": [
      "Over the left clavicle",
      "Fourth intercostal space at right sternal border",
      "Fifth space at left midclavicular line",
      "Fourth space at left midaxillary line"
    ],
    "answer": 1,
    "explain": "V1 and V2 flank the sternum at the fourth intercostal space; patient right and left matter.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "placement"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-05",
    "domain": "electrocardiograph",
    "concept": "v2-location",
    "guideRefs": [
      "V2",
      "T61",
      "4g"
    ],
    "prompt": "Where is V2 placed?",
    "options": [
      "Fourth intercostal space at left sternal border",
      "Fourth space at right sternal border",
      "Fifth space at left midclavicular line",
      "At the left midaxillary line at V4 height"
    ],
    "answer": 0,
    "explain": "V2 is the left parasternal partner of V1.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "placement"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-06",
    "domain": "electrocardiograph",
    "concept": "v3-location",
    "guideRefs": [
      "V3",
      "4g"
    ],
    "prompt": "After locating V2 and V4, how is V3 located?",
    "options": [
      "At the right sternal border",
      "Directly above V6",
      "At the left wrist",
      "Midway between V2 and V4"
    ],
    "answer": 3,
    "explain": "V3 bridges V2 and V4; locating V4 first avoids guessing its position.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "placement"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-07",
    "domain": "electrocardiograph",
    "concept": "v4-location",
    "guideRefs": [
      "V4",
      "T65",
      "4g"
    ],
    "prompt": "Which landmark identifies V4?",
    "options": [
      "Left midaxillary line at any rib",
      "Sixth space at right clavicle",
      "Fifth intercostal space at left midclavicular line",
      "Fourth space at right sternal border"
    ],
    "answer": 2,
    "explain": "Use the fifth left intercostal space and a vertical line through the clavicle midpoint.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "placement"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-08",
    "domain": "electrocardiograph",
    "concept": "v5-location",
    "guideRefs": [
      "V5",
      "4g"
    ],
    "prompt": "V5 is placed on the left anterior axillary line at which level?",
    "options": [
      "At the level of V1 regardless of V4",
      "The same horizontal level as V4",
      "One rib space lower than V4 automatically",
      "At the clavicle"
    ],
    "answer": 1,
    "explain": "V5 and V6 remain horizontally aligned with V4 rather than following a sloping rib.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "placement"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-09",
    "domain": "electrocardiograph",
    "concept": "v6-location",
    "guideRefs": [
      "V6",
      "T64",
      "4g"
    ],
    "prompt": "Which location is correct for V6?",
    "options": [
      "Left midaxillary line level with V4",
      "Right anterior axillary line",
      "Left sternal border at fourth space",
      "Midclavicular line above V4"
    ],
    "answer": 0,
    "explain": "V6 uses the left midaxillary landmark at the V4/V5 horizontal level.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "placement"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-10",
    "domain": "electrocardiograph",
    "concept": "lead-ii-polarity",
    "guideRefs": [
      "T76",
      "4g"
    ],
    "prompt": "Which pair defines standard bipolar lead II?",
    "options": [
      "Left arm negative, right arm positive",
      "Left leg negative, right leg positive",
      "V1 negative, V6 positive",
      "Right arm negative, left leg positive"
    ],
    "answer": 3,
    "explain": "LeadII compares the right-arm and left-leg electrodes; right leg is not its positive pole.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "limb"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-11",
    "domain": "electrocardiograph",
    "concept": "augmented-leads",
    "guideRefs": [
      "T49",
      "T50",
      "4a"
    ],
    "prompt": "Which group contains the augmented limb leads?",
    "options": [
      "I, II, III only",
      "P, QRS, T",
      "aVR, aVL, aVF",
      "V1, V2, V3"
    ],
    "answer": 2,
    "explain": "Augmented limb leads provide frontal-plane views; V1–V6 are precordial leads.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "limb"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-12",
    "domain": "electrocardiograph",
    "concept": "skin-contact",
    "guideRefs": [
      "T60",
      "4g"
    ],
    "prompt": "Why prepare skin and ensure good electrode adhesion?",
    "options": [
      "To raise arterial oxygen content directly",
      "To improve electrical contact and reduce artifact",
      "To change the patient's intrinsic pacemaker",
      "To guarantee a normal rhythm"
    ],
    "answer": 1,
    "explain": "Preparation improves signal acquisition; it does not treat an arrhythmia.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "prep"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-13",
    "domain": "electrocardiograph",
    "concept": "artifact-patient",
    "guideRefs": [
      "T47",
      "4h"
    ],
    "prompt": "A noisy trace begins after movement. What is the best interpretation approach?",
    "options": [
      "Assess patient and check electrode contact before assigning a rhythm",
      "Assume every distortion is ventricular fibrillation",
      "Ignore the patient if the machine prints a label",
      "Diagnose infarction from noise alone"
    ],
    "answer": 0,
    "explain": "Movement and contact problems can distort the tracing; appearance alone may not establish the cause.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "artifacts"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-14",
    "domain": "electrocardiograph",
    "concept": "horizontal-scale",
    "guideRefs": [
      "T77",
      "4f"
    ],
    "prompt": "At 25 mm/s, how long is one 1 mm horizontal box?",
    "options": [
      "0.20 s",
      "1s",
      "0.004 s",
      "0.04 s"
    ],
    "answer": 3,
    "explain": "Time equals distance divided by speed:1 mm ÷ 25 mm/s=0.04 s.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "measure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-15",
    "domain": "electrocardiograph",
    "concept": "pr-calculation",
    "guideRefs": [
      "T62",
      "4f"
    ],
    "prompt": "At 25 mm/s, a PR interval spans five small boxes. What is its duration?",
    "options": [
      "0.50 s",
      "1.00 s",
      "0.20 s",
      "0.05 s"
    ],
    "answer": 2,
    "explain": "Five boxes × 0.04 s per box=0.20 s; explicit speed is required.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "measure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-16",
    "domain": "electrocardiograph",
    "concept": "regular-rate",
    "guideRefs": [
      "T73",
      "4f"
    ],
    "prompt": "A regular ECG at 25 mm/s has three large boxes between R peaks. What is the approximate rate?",
    "options": [
      "30/min",
      "100/min",
      "60/min",
      "150/min"
    ],
    "answer": 1,
    "explain": "Each large box is0.20 s: R–R=0.60 s and60/0.60=100/min.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "measure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-17",
    "domain": "electrocardiograph",
    "concept": "six-second-rate",
    "guideRefs": [
      "4f"
    ],
    "prompt": "Eight QRS complexes occur within a documented six-second window. Estimate ventricular rate.",
    "options": [
      "80/min",
      "48/min",
      "8/min",
      "160/min"
    ],
    "answer": 0,
    "explain": "Eight beats ×10 windows/min=80/min; count the complete known interval.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "measure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-18",
    "domain": "electrocardiograph",
    "concept": "voltage-scale",
    "guideRefs": [
      "T77",
      "4f"
    ],
    "prompt": "At 10 mm/mV, what voltage does a 5 mm vertical deflection represent?",
    "options": [
      "5 mV",
      "0.05 mV",
      "50 mV",
      "0.5 mV"
    ],
    "answer": 3,
    "explain": "Divide vertical height by gain:5 mm ÷ 10 mm/mV=0.5 mV.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "measure"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-19",
    "domain": "electrocardiograph",
    "concept": "pr-endpoints",
    "guideRefs": [
      "T62",
      "T74",
      "4e"
    ],
    "prompt": "Which endpoints define the PR interval?",
    "options": [
      "Beginning of QRS to end of T",
      "R peak to next R peak",
      "Beginning of P to beginning of QRS",
      "End of P to beginning of QRS only"
    ],
    "answer": 2,
    "explain": "The interval includes atrial depolarization and conduction toward ventricular activation; the segment excludes P.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "waves"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-20",
    "domain": "electrocardiograph",
    "concept": "qt-endpoints",
    "guideRefs": [
      "T62",
      "T69",
      "4e"
    ],
    "prompt": "Which endpoints define the QT interval?",
    "options": [
      "R peak to next R peak",
      "Beginning of QRS to end of T",
      "Beginning of P to end of P",
      "End of QRS to beginning of T only"
    ],
    "answer": 1,
    "explain": "QT spans ventricular depolarization and repolarization; ST segment is a narrower portion.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "waves"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-21",
    "domain": "electrocardiograph",
    "concept": "qrs-deflections",
    "guideRefs": [
      "T69",
      "4e"
    ],
    "prompt": "In a QRS complex, what is an S wave?",
    "options": [
      "A negative deflection after an R wave",
      "Any positive deflection before P",
      "The first positive QRS deflection",
      "The broad recovery wave after QRS"
    ],
    "answer": 0,
    "explain": "Q is an initial negative deflection, R a positive deflection, and S a negative deflection following R.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "waves"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-22",
    "domain": "electrocardiograph",
    "concept": "u-wave-limit",
    "guideRefs": [
      "T69",
      "4e"
    ],
    "prompt": "The supplied guide exercise has no clearly distinct U wave. What is appropriate?",
    "options": [
      "Label any baseline segment as U",
      "Assume U must be taller than R",
      "Declare the tracing impossible",
      "Identify visible P/QRS/T and avoid inventing a U"
    ],
    "answer": 3,
    "explain": "A listed terminology item does not make a feature reliably visible in every example.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "waves"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-23",
    "domain": "electrocardiograph",
    "concept": "sinus-evidence",
    "guideRefs": [
      "T75",
      "4h"
    ],
    "prompt": "Which combination supports normal sinus rhythm in a basic teaching example?",
    "options": [
      "Any wide QRS at140/min",
      "A flat line regardless of electrode contact",
      "Consistent sinus P before every QRS with a resting adult rate 60–100/min",
      "A rate75/min with no atrial information"
    ],
    "answer": 2,
    "explain": "Rate alone does not establish sinus origin; atrial activity and AV relationship are needed.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "rhythms"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-24",
    "domain": "electrocardiograph",
    "concept": "rate-category",
    "guideRefs": [
      "T52",
      "T78",
      "4h"
    ],
    "prompt": "Which statement correctly classifies resting adult rates without overnaming the rhythm?",
    "options": [
      "Both rates always indicate sinus rhythm",
      "50/min is bradycardic; 120/min is tachycardic",
      "Every50/min rhythm is complete heart block",
      "Every120/min rhythm is ventricular tachycardia"
    ],
    "answer": 1,
    "explain": "Bradycardia and tachycardia describe rate; mechanism requires more evidence.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "rhythms"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  },
  {
    "id": "aspt2-electrocardiograph-25",
    "domain": "electrocardiograph",
    "concept": "flat-trace-check",
    "guideRefs": [
      "T45",
      "T48",
      "4h"
    ],
    "prompt": "Why should a flat trace prompt patient assessment and connection checks?",
    "options": [
      "A disconnected lead can mimic absent recorded activity",
      "A flat trace always proves asystole without further checks",
      "Electrode contact cannot affect a trace",
      "Agonal activity means a perfectly normal rhythm"
    ],
    "answer": 0,
    "explain": "Asystole denotes absent discernible cardiac electrical activity; technical failure must be considered and the patient assessed.",
    "sourceRefs": [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity",
      "https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024"
    ],
    "lesson": {
      "system": "aspt",
      "index": "artifacts"
    },
    "authoring": "Original learning question; source-linked agent content review; not an official ASPT question."
  }
];
})(typeof window !== "undefined" ? window : globalThis);
