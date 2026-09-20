/* Lead Placement Lab course data. Placement wording follows the repository course content. */
"use strict";
var LEAD_PLACEMENT = {
  title: "Lead Placement Lab",
  subtitle: "3D torso, landmarks, chest leads, limb leads, flashcards & quiz",
  patient: {
    viewerLeft: "PATIENT RIGHT",
    viewerRight: "PATIENT LEFT",
    note: "Default front view: viewer left is the patient's right; viewer right is the patient's left."
  },
  chestSequence: ["v1", "v2", "v4", "v3", "v5", "v6"],
  leads: [
    {id:"v1", name:"V1", family:"chest", side:"Patient right", placement:"4th intercostal space, right sternal border", landmark:"Right sternal border at the 4th intercostal space", plane:"Transverse plane", mnemonic:"V1 starts on the patient's right beside the sternum."},
    {id:"v2", name:"V2", family:"chest", side:"Patient left", placement:"4th intercostal space, left sternal border", landmark:"Left sternal border at the 4th intercostal space", plane:"Transverse plane", mnemonic:"V2 mirrors V1 across the sternum."},
    {id:"v3", name:"V3", family:"chest", side:"Patient left", placement:"Halfway between V2 and V4; locate V2 and V4 first", landmark:"Midpoint between V2 and V4", plane:"Transverse plane", mnemonic:"Place 2 and 4, then split the difference for 3."},
    {id:"v4", name:"V4", family:"chest", side:"Patient left", placement:"5th intercostal space, left midclavicular line", landmark:"Left midclavicular line at the 5th intercostal space", plane:"Transverse plane", mnemonic:"V4 comes before V3: fifth space, midclavicular."},
    {id:"v5", name:"V5", family:"chest", side:"Patient left", placement:"Left anterior axillary line, same horizontal level as V4", landmark:"Left anterior axillary line at V4 height", plane:"Transverse plane", mnemonic:"V5 moves laterally but stays level with V4."},
    {id:"v6", name:"V6", family:"chest", side:"Patient left", placement:"Left midaxillary line, same horizontal level as V4", landmark:"Left midaxillary line at V4 height", plane:"Transverse plane", mnemonic:"V6 is midaxillary and level with V4 and V5."},
    {id:"ra", name:"RA", family:"limb", side:"Patient right", placement:"Right arm electrode", landmark:"Right upper limb", plane:"Frontal plane", mnemonic:"RA is the negative pole for Leads I and II."},
    {id:"la", name:"LA", family:"limb", side:"Patient left", placement:"Left arm electrode", landmark:"Left upper limb", plane:"Frontal plane", mnemonic:"LA is positive for Lead I and negative for Lead III."},
    {id:"rl", name:"RL", family:"limb", side:"Patient right", placement:"Right leg electrode", landmark:"Right lower limb", plane:"Ground", mnemonic:"RL is the ground electrode; it is not one of the 12 electrical views."},
    {id:"ll", name:"LL", family:"limb", side:"Patient left", placement:"Left leg electrode", landmark:"Left lower limb", plane:"Frontal plane", mnemonic:"LL is positive for Leads II and III."}
  ],
  limbViews: [
    {id:"lead-i", name:"Lead I", placement:"RA(−) → LA(+)", landmark:"Right arm to left arm", plane:"Frontal plane", side:"Leftward view", mnemonic:"Lead I travels across the shoulders."},
    {id:"lead-ii", name:"Lead II", placement:"RA(−) → LL(+)", landmark:"Right arm to left leg", plane:"Frontal plane", side:"Inferior-left view", mnemonic:"Lead II runs diagonally down to the left leg."},
    {id:"lead-iii", name:"Lead III", placement:"LA(−) → LL(+)", landmark:"Left arm to left leg", plane:"Frontal plane", side:"Inferior view", mnemonic:"Lead III stays on the patient's left side."},
    {id:"avr", name:"aVR", placement:"Positive viewing direction: right arm", landmark:"Right arm", plane:"Frontal plane", side:"Patient right", mnemonic:"R in aVR means right arm."},
    {id:"avl", name:"aVL", placement:"Positive viewing direction: left arm", landmark:"Left arm", plane:"Frontal plane", side:"Patient left", mnemonic:"L in aVL means left arm."},
    {id:"avf", name:"aVF", placement:"Positive viewing direction: left foot", landmark:"Left foot / left leg electrode", plane:"Frontal plane", side:"Inferior", mnemonic:"F in aVF means foot."}
  ],
  landmarks: [
    {id:"sternum", name:"Sternum", placement:"Midline breastbone", mnemonic:"Find the sternum before finding its right and left borders."},
    {id:"clavicles", name:"Clavicles", placement:"Collarbones above the upper ribs", mnemonic:"Orient at the clavicles, then count downward to the intercostal spaces."},
    {id:"ics4", name:"4th intercostal space", placement:"Space between the 4th and 5th ribs", mnemonic:"V1 and V2 share the fourth space."},
    {id:"ics5", name:"5th intercostal space", placement:"Space between the 5th and 6th ribs", mnemonic:"V4 begins the horizontal V4–V6 level here."},
    {id:"mcl", name:"Left midclavicular line", placement:"Imaginary vertical line down from the middle of the left clavicle", mnemonic:"V4 = fifth space + midclavicular line."},
    {id:"aal", name:"Left anterior axillary line", placement:"Imaginary vertical line down from the front of the left axilla", mnemonic:"V5 uses the front of the armpit."},
    {id:"mal", name:"Left midaxillary line", placement:"Imaginary vertical line down from the middle of the left axilla", mnemonic:"V6 uses the middle of the armpit."}
  ],
  guided: [
    {id:"orient", lead:"Orient the chest", target:"sternum", highlights:["sternum","clavicles"], placement:"Find the sternum and both clavicles in the front-facing patient.", cue:"Viewer left is PATIENT RIGHT; viewer right is PATIENT LEFT."},
    {id:"count", lead:"Count to the 4th space", target:"ics4", highlights:["ribs","ics4"], placement:"Use the rib spaces to identify the 4th intercostal space.", cue:"Intercostal spaces are the gaps between adjacent ribs."},
    {id:"v1", lead:"V1", target:"v1", highlights:["v1","ics4","sternum"], placement:"4th intercostal space, right sternal border.", cue:"V1: fourth space, patient's right."},
    {id:"v2", lead:"V2", target:"v2", highlights:["v2","ics4","sternum"], placement:"4th intercostal space, left sternal border.", cue:"V2 mirrors V1 across the sternum."},
    {id:"mcl", lead:"Find the left midclavicular line", target:"mcl", highlights:["mcl","clavicles"], placement:"Trace down from the middle of the patient's left clavicle.", cue:"This vertical line locates V4."},
    {id:"v4", lead:"V4", target:"v4", highlights:["v4","mcl","ics5"], placement:"5th intercostal space, left midclavicular line.", cue:"Place V4 before V3."},
    {id:"v3", lead:"V3", target:"v3", highlights:["v2","v3","v4"], placement:"Halfway between V2 and V4.", cue:"Find 2 and 4, then split the difference."},
    {id:"aal", lead:"Find the anterior axillary line", target:"aal", highlights:["aal","v4"], placement:"Trace down from the front of the patient's left axilla.", cue:"Keep the next marker horizontally level with V4."},
    {id:"v5", lead:"V5", target:"v5", highlights:["v4","v5","aal"], placement:"Left anterior axillary line, same horizontal level as V4.", cue:"V5 moves lateral, not lower."},
    {id:"mal", lead:"Find the midaxillary line", target:"mal", highlights:["mal","v4"], placement:"Trace down from the middle of the patient's left axilla.", cue:"Midaxillary is farther lateral than anterior axillary."},
    {id:"v6", lead:"V6", target:"v6", highlights:["v4","v5","v6","mal"], placement:"Left midaxillary line, same horizontal level as V4.", cue:"V4, V5 and V6 form one horizontal level."},
    {id:"review", lead:"Full review", target:"v4", highlights:["v1","v2","v3","v4","v5","v6"], placement:"V1 → V2 → V4 → V3 → V5 → V6.", cue:"Sternal pair, anchor V4, fill V3, then move laterally without dropping."}
  ],
  cards: [
    {id:"lead-v1",term:"V1",definition:"4th intercostal space, right sternal border.",visual:"v1"},
    {id:"lead-v2",term:"V2",definition:"4th intercostal space, left sternal border.",visual:"v2"},
    {id:"lead-v3",term:"V3",definition:"Halfway between V2 and V4; place it after V2 and V4 are located.",visual:"v3"},
    {id:"lead-v4",term:"V4",definition:"5th intercostal space, left midclavicular line.",visual:"v4"},
    {id:"lead-v5",term:"V5",definition:"Left anterior axillary line, same horizontal level as V4.",visual:"v5"},
    {id:"lead-v6",term:"V6",definition:"Left midaxillary line, same horizontal level as V4.",visual:"v6"},
    {id:"lead-i",term:"Lead I",definition:"RA(−) → LA(+). Bipolar limb lead in the frontal plane."},
    {id:"lead-ii",term:"Lead II",definition:"RA(−) → LL(+). Bipolar limb lead in the frontal plane."},
    {id:"lead-iii",term:"Lead III",definition:"LA(−) → LL(+). Bipolar limb lead in the frontal plane."},
    {id:"lead-avr",term:"aVR",definition:"Augmented frontal-plane lead whose positive viewing direction is the right arm."},
    {id:"lead-avl",term:"aVL",definition:"Augmented frontal-plane lead whose positive viewing direction is the left arm."},
    {id:"lead-avf",term:"aVF",definition:"Augmented frontal-plane lead whose positive viewing direction is the left foot."},
    {id:"landmark-mcl",term:"Left midclavicular line",definition:"Imaginary vertical line down from the middle of the left clavicle; V4 is placed on this line."},
    {id:"landmark-aal",term:"Left anterior axillary line",definition:"Imaginary vertical line down from the front of the left axilla; V5 is placed here at V4 height."},
    {id:"landmark-mal",term:"Left midaxillary line",definition:"Imaginary vertical line down from the middle of the left axilla; V6 is placed here at V4 height."},
    {id:"plane-limb",term:"Limb leads view which plane?",definition:"Frontal plane."},
    {id:"plane-chest",term:"Chest (precordial) leads view which plane?",definition:"Transverse plane."},
    {id:"lead-orientation",term:"Front-view patient orientation",definition:"Viewer left = PATIENT RIGHT; viewer right = PATIENT LEFT."}
  ],
  quiz: [
    {id:"q-v1",type:"lead-to-location",prompt:"Where is V1 placed?",options:["4th intercostal space, right sternal border","4th intercostal space, left sternal border","5th intercostal space, left midclavicular line","Left midaxillary line at V4 height"],answer:0,explain:"V1 uses the 4th intercostal space at the patient's right sternal border."},
    {id:"q-v2-reverse",type:"location-to-lead",prompt:"Which lead belongs at the 4th intercostal space, left sternal border?",options:["V1","V2","V3","V4"],answer:1,explain:"V2 mirrors V1 across the sternum at the same fourth intercostal space."},
    {id:"q-v3",type:"lead-to-location",prompt:"How is V3 located?",options:["Halfway between V2 and V4","Halfway between V1 and V2","At the left anterior axillary line","Directly below V4"],answer:0,explain:"Locate V2 and V4 first, then place V3 halfway between them."},
    {id:"q-v4",type:"location-to-lead",prompt:"Which lead is at the 5th intercostal space on the left midclavicular line?",options:["V2","V3","V4","V5"],answer:2,explain:"V4 is the fifth-space midclavicular anchor and should be located before V3."},
    {id:"q-v5",type:"landmark",prompt:"Which landmark is used for V5?",options:["Left anterior axillary line","Left midaxillary line","Right sternal border","Left midclavicular line"],answer:0,explain:"V5 sits on the left anterior axillary line at the same horizontal level as V4."},
    {id:"q-v6",type:"landmark",prompt:"Which landmark is used for V6?",options:["Left midaxillary line","Left anterior axillary line","Right midclavicular line","Left sternal border"],answer:0,explain:"V6 sits on the left midaxillary line and stays level with V4 and V5."},
    {id:"q-sequence",type:"multiple-choice",prompt:"Which chest-lead placement sequence is preferred?",options:["V1 → V2 → V4 → V3 → V5 → V6","V1 → V2 → V3 → V4 → V5 → V6","V4 → V3 → V2 → V1 → V5 → V6","V6 → V5 → V4 → V3 → V2 → V1"],answer:0,explain:"V4 is deliberately located before V3 so V3 can be placed halfway between V2 and V4."},
    {id:"q-tap-v1",type:"tap",prompt:"Tap the V1 location.",target:"v1",explain:"Correct location: 4th intercostal space at the patient's right sternal border."},
    {id:"q-tap-v6",type:"tap",prompt:"Tap the V6 location.",target:"v6",explain:"Correct location: left midaxillary line at the same horizontal level as V4."},
    {id:"q-identify-v4",type:"identify",prompt:"Which lead is highlighted?",highlight:"v4",options:["V2","V3","V4","V5"],answer:2,explain:"The highlighted fifth-space midclavicular marker is V4."},
    {id:"q-lead-i",type:"bipolar",prompt:"What is the Lead I pairing?",options:["RA(−) → LA(+)","RA(−) → LL(+)","LA(−) → LL(+)","LL(−) → RA(+)"],answer:0,explain:"Lead I compares the right arm negative pole with the left arm positive pole."},
    {id:"q-lead-ii",type:"bipolar",prompt:"What is the Lead II pairing?",options:["RA(−) → LL(+)","RA(−) → LA(+)","LA(−) → LL(+)","LL(−) → LA(+)"],answer:0,explain:"Lead II runs from right arm negative to left leg positive."},
    {id:"q-lead-iii",type:"bipolar",prompt:"What is the Lead III pairing?",options:["LA(−) → LL(+)","RA(−) → LA(+)","RA(−) → LL(+)","LL(−) → RA(+)"],answer:0,explain:"Lead III runs from left arm negative to left leg positive."},
    {id:"q-avr",type:"augmented",prompt:"Which augmented lead looks toward the right arm?",options:["aVR","aVL","aVF","Lead II"],answer:0,explain:"The R in aVR identifies its right-arm positive viewing direction."},
    {id:"q-avl",type:"augmented",prompt:"Which augmented lead looks toward the left arm?",options:["aVR","aVL","aVF","Lead III"],answer:1,explain:"The L in aVL identifies its left-arm positive viewing direction."},
    {id:"q-avf",type:"augmented",prompt:"Which augmented lead looks toward the left foot?",options:["aVR","aVL","aVF","Lead I"],answer:2,explain:"The F in aVF identifies its footward positive viewing direction."},
    {id:"q-plane-limb",type:"plane",prompt:"Limb leads view the heart in which plane?",options:["Frontal plane","Transverse plane","Sagittal plane","No anatomical plane"],answer:0,explain:"Standard and augmented limb leads provide frontal-plane views."},
    {id:"q-plane-chest",type:"plane",prompt:"Chest leads V1–V6 view the heart in which plane?",options:["Transverse plane","Frontal plane","Sagittal plane","Coronal plane only"],answer:0,explain:"The six precordial leads provide transverse-plane views across the chest."}
  ]
};

/* Share one lead-placement deck with the existing reversible ECG flashcard renderer. */
if (typeof ECG_STUDY !== "undefined" && Array.isArray(ECG_STUDY.cards)) {
  const existingLeadCardIds = new Set(ECG_STUDY.cards.map((card) => card.id));
  LEAD_PLACEMENT.cards.forEach((card) => {
    if (!existingLeadCardIds.has(card.id)) ECG_STUDY.cards.push(card);
  });
}
