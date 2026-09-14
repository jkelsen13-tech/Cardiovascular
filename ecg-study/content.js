/* ECG Waves & Intervals study data. No persistent storage. No raster screenshots. */
"use strict";
var ECG_STUDY = {
  title: "ECG Waves & Intervals",
  patient: {
    viewerLeft: "PATIENT RIGHT",
    viewerRight: "PATIENT LEFT",
    note: "Anatomical left/right are from the patient's perspective. From the front: screen LEFT = patient RIGHT; screen RIGHT = patient LEFT."
  },
  normals: {
    pr: "0.12–0.20 sec",
    qrs: "< 0.12 sec",
    qt: "QT is rate-dependent; QTc is the rate-corrected value. This module does not use a single millisecond cutoff."
  },
  stages: [
    {
      id: "p",
      name: "P wave",
      caption: "P wave: Signal spreads through the atria.",
      event: "Atrial depolarization",
      location: "Atria (from the SA node)",
      heart: "The SA node fires. The impulse spreads through both atria.",
      aria: "P wave. Atrial depolarization. Signal spreads through the atria from the SA node."
    },
    {
      id: "pr",
      name: "PR segment",
      caption: "PR segment: Signal pauses briefly at the AV node.",
      event: "AV nodal delay",
      location: "AV node",
      heart: "The impulse is delayed at the AV node so the atria can finish emptying.",
      aria: "PR segment. Signal pauses briefly at the AV node."
    },
    {
      id: "qrs",
      name: "QRS complex",
      caption: "QRS complex: Signal spreads through the ventricles.",
      event: "Ventricular depolarization",
      location: "Ventricles",
      heart: "His–Purkinje conduction depolarizes the ventricles. Atrial repolarization happens during QRS and is usually hidden.",
      aria: "QRS complex. Ventricular depolarization. Atrial repolarization is usually hidden on the tracing."
    },
    {
      id: "st",
      name: "ST segment",
      caption: "ST segment: Ventricles stay electrically active.",
      event: "Ventricles remain depolarized",
      location: "Ventricles",
      heart: "The ventricles stay electrically active between the end of QRS and the start of T.",
      aria: "ST segment. Ventricles stay electrically active."
    },
    {
      id: "t",
      name: "T wave",
      caption: "T wave: Ventricles electrically reset.",
      event: "Ventricular repolarization",
      location: "Ventricles",
      heart: "The ventricles electrically reset (repolarize) so they can fire again.",
      aria: "T wave. Ventricular repolarization. Ventricles electrically reset."
    },
    {
      id: "tp",
      name: "TP segment",
      caption: "TP segment: Electrical baseline between beats.",
      event: "Resting baseline",
      location: "Whole heart at rest",
      heart: "No wave of activation. This is the electrical baseline between beats.",
      aria: "TP segment. Electrical baseline between beats. The heart diagram is at rest."
    }
  ],
  landmarks: [
    {id: "pr-int", name: "PR interval", span: "Start of P → start of QRS", normal: "Normal 0.12–0.20 sec"},
    {id: "qrs-dur", name: "QRS duration", span: "Start of QRS → J point", normal: "Normal < 0.12 sec"},
    {id: "j", name: "J point", span: "Exact point where QRS ends and ST begins", normal: ""},
    {id: "st-seg", name: "ST segment", span: "End of QRS (J point) → start of T", normal: ""},
    {id: "qt-int", name: "QT interval", span: "Start of QRS → end of T", normal: "QT varies with rate; QTc is the correction. No single millisecond cutoff is taught here."}
  ],
  cards: [
    {
      id: "p-wave",
      term: "P wave",
      definition: "Atrial depolarization — “Atria fire.” Signal spreads through the atria."
    },
    {
      id: "qrs",
      term: "QRS complex",
      definition: "Ventricular depolarization — “Ventricles fire.” Signal spreads through the ventricles. Atrial repolarization during QRS is usually hidden."
    },
    {
      id: "t-wave",
      term: "T wave",
      definition: "Ventricular repolarization — “Ventricles reset.” Ventricles electrically reset."
    },
    {
      id: "qrs-dir",
      term: "Q, R, S direction",
      definition: "Q = downward deflection before R. R = upward deflection. S = downward deflection after R."
    },
    {
      id: "pr-int",
      term: "PR interval",
      definition: "Start of the P wave to the start of the QRS. Normal 0.12–0.20 sec."
    },
    {
      id: "qt-int",
      term: "QT interval",
      definition: "Start of the QRS to the end of the T wave. QT varies with heart rate; QTc is the rate-corrected value."
    },
    {
      id: "qrs-dur",
      term: "QRS duration",
      definition: "Width of the QRS complex. Normal < 0.12 sec."
    },
    {
      id: "st-seg",
      term: "ST segment",
      definition: "End of QRS (J point) to the start of T. Ventricles remain electrically active."
    },
    {
      id: "j-point",
      term: "J point",
      definition: "The exact point where the QRS ends and the ST segment begins."
    },
    {
      id: "pr-seg",
      term: "PR segment",
      definition: "Signal pauses briefly at the AV node (after P, before QRS)."
    },
    {
      id: "tp-seg",
      term: "TP segment",
      definition: "Electrical baseline between beats (after T, before the next P)."
    },
    {
      id: "sa",
      term: "SA node",
      definition: "Starts the cardiac impulse. Located in the right atrium."
    },
    {
      id: "av",
      term: "AV node",
      definition: "Briefly delays the impulse before it enters the ventricles."
    },
    {
      id: "p-where",
      term: "P wave occurs where?",
      definition: "Atria"
    },
    {
      id: "qrs-where",
      term: "QRS occurs where?",
      definition: "Ventricles"
    },
    {
      id: "t-where",
      term: "T wave occurs where?",
      definition: "Ventricles"
    },
    {
      id: "orient",
      term: "Patient-view orientation",
      definition: "From the front: screen LEFT = patient RIGHT; screen RIGHT = patient LEFT."
    }
  ],
  quiz: [
    {
      id: "p-dep",
      prompt: "The P wave represents:",
      options: ["Atrial depolarization", "Ventricular depolarization", "Ventricular repolarization", "AV nodal delay only"],
      answer: 0,
      explain: "The P wave is atrial depolarization — the atria fire as the SA-node impulse spreads through them."
    },
    {
      id: "qrs-dep",
      prompt: "The QRS complex represents:",
      options: ["Atrial depolarization", "Ventricular depolarization", "Ventricular repolarization", "The resting baseline between beats"],
      answer: 1,
      explain: "QRS is ventricular depolarization. Atrial repolarization occurs at the same time and is usually hidden."
    },
    {
      id: "t-rep",
      prompt: "The T wave represents:",
      options: ["Atrial depolarization", "Ventricular depolarization", "Ventricular repolarization", "SA-node firing"],
      answer: 2,
      explain: "The T wave is ventricular repolarization — the ventricles electrically reset."
    },
    {
      id: "q-dir",
      prompt: "In the QRS complex, Q is:",
      options: ["The first upward wave", "A downward wave after R", "A downward wave before R", "The end of the T wave"],
      answer: 2,
      explain: "Q is a downward deflection that occurs before R. R is up; S is a downward deflection after R."
    },
    {
      id: "r-dir",
      prompt: "In the QRS complex, R is:",
      options: ["Always a downward wave", "The first upward deflection", "The pause at the AV node", "The electrical baseline"],
      answer: 1,
      explain: "R is the upward deflection of the QRS. Q is down before R; S is down after R."
    },
    {
      id: "s-dir",
      prompt: "In the QRS complex, S is:",
      options: ["A downward deflection after R", "The start of the P wave", "Always taller than R", "The J point itself"],
      answer: 0,
      explain: "S is the downward deflection after R."
    },
    {
      id: "pr-span",
      prompt: "The PR interval is measured from:",
      options: ["Start of P to start of QRS", "End of P to end of QRS", "Start of QRS to end of T", "J point to start of T"],
      answer: 0,
      explain: "PR interval = start of the P wave to the start of the QRS (includes the AV delay)."
    },
    {
      id: "pr-nl",
      prompt: "A normal PR interval is:",
      options: ["Less than 0.06 sec", "0.12–0.20 sec", "Greater than 0.24 sec", "Exactly 0.40 sec"],
      answer: 1,
      explain: "In a sinus-generated rhythm the PR interval is 0.12–0.20 second (3 to 5 small squares at 25 mm/s)."
    },
    {
      id: "qt-span",
      prompt: "The QT interval is measured from:",
      options: ["Start of P to start of QRS", "Start of QRS to end of T", "End of T to the next P", "Peak of R to peak of T"],
      answer: 1,
      explain: "QT runs from the start of the QRS to the end of the T wave. It varies with rate; QTc is the correction."
    },
    {
      id: "qrs-nl",
      prompt: "A normal QRS duration is:",
      options: ["< 0.12 sec", "0.20–0.28 sec", "Always exactly 0.16 sec", "Longer than the PR interval"],
      answer: 0,
      explain: "A normal QRS is narrower than 0.12 second (three small squares at 25 mm/s)."
    },
    {
      id: "j-pt",
      prompt: "The J point is:",
      options: ["The peak of the R wave", "The start of the P wave", "The exact point where QRS ends and ST begins", "The end of the T wave"],
      answer: 2,
      explain: "The J point is the junction at the end of the QRS and the start of the ST segment."
    },
    {
      id: "st-act",
      prompt: "During the ST segment the ventricles:",
      options: ["Have fully returned to electrical rest", "Remain electrically active", "Are waiting at the SA node", "Produce the P wave"],
      answer: 1,
      explain: "ST is from the end of QRS (J point) to the start of T. The ventricles remain electrically active."
    },
    {
      id: "pr-pause",
      prompt: "The PR segment is the time when:",
      options: ["The ventricles reset", "The signal pauses briefly at the AV node", "The SA node is silent", "The tracing is artifact"],
      answer: 1,
      explain: "After atrial depolarization, the impulse is delayed at the AV node. That pause is the PR segment."
    },
    {
      id: "sa-loc",
      prompt: "The SA node, which starts the cardiac impulse, is located in the:",
      options: ["Left ventricle", "Right atrium", "Aortic valve", "Purkinje network only"],
      answer: 1,
      explain: "The SA node sits high in the wall of the right atrium and is the heart’s primary pacemaker."
    },
    {
      id: "orient",
      prompt: "Looking at the front of the patient (and this heart diagram), the LEFT side of the screen is the:",
      options: ["Patient’s left", "Patient’s right", "Patient’s feet", "Posterior wall only"],
      answer: 1,
      explain: "Left and right are the patient’s, not the viewer’s. From the front, screen left = patient right; screen right = patient left."
    },
    {
      id: "p-loc",
      prompt: "The P wave occurs in the:",
      options: ["Atria", "Ventricles", "Aorta", "Bundle branches only"],
      answer: 0,
      explain: "P-wave voltage comes from the atria."
    },
    {
      id: "hidden-atrial",
      prompt: "Atrial repolarization on a normal tracing is:",
      options: ["Seen as a second P wave after T", "Usually hidden in the QRS", "The TP segment", "The J point"],
      answer: 1,
      explain: "Atrial repolarization occurs during ventricular depolarization and is usually buried in the QRS."
    }
  ]
};
