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
  nodeColors: {
    standard: "AHA limb-electrode colors",
    nodes: {
      ra: {name:"RA",colorName:"white",hex:"#f8fafc"},
      la: {name:"LA",colorName:"black",hex:"#111827"},
      rl: {name:"RL",colorName:"green",hex:"#22c55e"},
      ll: {name:"LL",colorName:"red",hex:"#ef4444"}
    }
  },
  thoracicTeaching: {
    sternalAngle: {
      name:"Sternal angle / Angle of Louis",
      explanation:"Use this landmark to find rib 2 and begin counting intercostal spaces.",
      structureIds:["FJ3290","FJ3178"],
      derivation:"Registered manubrium–sternal-body junction"
    },
    intercostalNumbering: {
      rule:"An intercostal space is named for the rib immediately above it.",
      cue:"Rib above gives the space its number.",
      examples:["Space below rib 2 = 2nd intercostal space","Space below rib 4 = 4th intercostal space","Space below rib 5 = 5th intercostal space"]
    },
    fourthSpace: {name:"4th intercostal space",leadIds:["v1","v2"],relationship:"V1 and V2 share the same 4th intercostal space on opposite sides of the sternum."},
    fifthSpace: {name:"5th intercostal space",leadIds:["v4"],relationship:"V4 is one intercostal space lower than V1 and V2."},
    horizontalRule: {
      leadIds:["v4","v5","v6"],
      rule:"V4 establishes the height. V5 and V6 remain on the same horizontal level.",
      cue:"V4 sets the floor. V5 and V6 walk sideways.",
      warning:"Do not follow the downward slope of the ribs when placing V5 or V6."
    }
  },
  landmarkLessons: [
    {id:"sternal-angle",label:"Sternal angle",stepId:"sternal-angle"},
    {id:"count-ics",label:"Count intercostal spaces",stepId:"count-ics"},
    {id:"v1v2-ics4",label:"V1/V2 at 4th ICS",stepId:"v1v2-ics4"},
    {id:"v4-ics5",label:"V4 at 5th ICS",stepId:"v4-ics5"},
    {id:"v4-v6-level",label:"V4–V6 same height",stepId:"v4-v6-level"}
  ],
  chestSequence: ["v1", "v2", "v4", "v3", "v5", "v6"],
  leads: [
    {id:"v1",name:"V1",family:"chest",side:"Patient right",placement:"4th intercostal space, right sternal border",landmark:"Right sternal border at the 4th intercostal space",landmarkIds:["ics4","right-sternal-border"],plane:"Transverse plane",mnemonic:"V1 starts on the patient's right beside the sternum.",anchor:{fallbackPercent:[43,43],model:[-0.0239735,0.0585575,0.217840942],tolerance:0.035}},
    {id:"v2",name:"V2",family:"chest",side:"Patient left",placement:"4th intercostal space, left sternal border",landmark:"Left sternal border at the 4th intercostal space",landmarkIds:["ics4","left-sternal-border"],plane:"Transverse plane",mnemonic:"V2 mirrors V1 across the sternum.",anchor:{fallbackPercent:[51,43],model:[0.0241852,0.0585575,0.218298008],tolerance:0.035}},
    {id:"v3",name:"V3",family:"chest",side:"Patient left",placement:"Halfway between V2 and V4; locate V2 and V4 first",landmark:"Midpoint between V2 and V4",landmarkIds:["v2","v4"],plane:"Transverse plane",mnemonic:"Place 2 and 4, then split the difference for 3.",anchor:{fallbackPercent:[57,51],model:[0.050172783,0.02416625,0.228197954],tolerance:0.04}},
    {id:"v4",name:"V4",family:"chest",side:"Patient left",placement:"5th intercostal space, left midclavicular line",landmark:"Left midclavicular line at the 5th intercostal space",landmarkIds:["ics5","mcl"],plane:"Transverse plane",mnemonic:"V4 comes before V3: fifth space, midclavicular.",anchor:{fallbackPercent:[63,58],model:[0.076160365,-0.010225,0.218989514],tolerance:0.035}},
    {id:"v5",name:"V5",family:"chest",side:"Patient left",placement:"Left anterior axillary line, same horizontal level as V4",landmark:"Left anterior axillary line at V4 height",landmarkIds:["aal","v4-level"],plane:"Transverse plane",mnemonic:"V5 moves laterally but stays level with V4.",anchor:{fallbackPercent:[74,58],model:[0.194262,-0.010225,0.118718248],tolerance:0.045}},
    {id:"v6",name:"V6",family:"chest",side:"Patient left",placement:"Left midaxillary line, same horizontal level as V4",landmark:"Left midaxillary line at V4 height",landmarkIds:["mal","v4-level"],plane:"Transverse plane",mnemonic:"V6 is midaxillary and level with V4 and V5.",anchor:{fallbackPercent:[84,58],model:[0.247363,-0.010225,0.0639755],tolerance:0.045}},
    {id:"ra",name:"RA",family:"limb",side:"Patient right",placement:"Right arm electrode",landmark:"Right upper limb",plane:"Frontal plane",mnemonic:"RA is the negative pole for Leads I and II.",anchor:{fallbackPercent:[13,25],model:null,tolerance:0.2},presentation:"external-label"},
    {id:"la",name:"LA",family:"limb",side:"Patient left",placement:"Left arm electrode",landmark:"Left upper limb",plane:"Frontal plane",mnemonic:"LA is positive for Lead I and negative for Lead III.",anchor:{fallbackPercent:[87,25],model:null,tolerance:0.2},presentation:"external-label"},
    {id:"rl",name:"RL",family:"limb",side:"Patient right",placement:"Right leg electrode",landmark:"Right lower limb",plane:"Ground",mnemonic:"RL is the ground electrode; it is not one of the 12 electrical views.",anchor:{fallbackPercent:[22,88],model:null,tolerance:0.2},presentation:"external-label"},
    {id:"ll",name:"LL",family:"limb",side:"Patient left",placement:"Left leg electrode",landmark:"Left lower limb",plane:"Frontal plane",mnemonic:"LL is positive for Leads II and III.",anchor:{fallbackPercent:[78,88],model:null,tolerance:0.2},presentation:"external-label"}
  ],
  limbViews: [
    {id:"lead-i",name:"Lead I",placement:"RA(−) → LA(+)",landmark:"Right arm to left arm",plane:"Frontal plane",side:"Leftward view",mnemonic:"Lead I travels across the shoulders."},
    {id:"lead-ii",name:"Lead II",placement:"RA(−) → LL(+)",landmark:"Right arm to left leg",plane:"Frontal plane",side:"Inferior-left view",mnemonic:"Lead II runs diagonally down to the left leg."},
    {id:"lead-iii",name:"Lead III",placement:"LA(−) → LL(+)",landmark:"Left arm to left leg",plane:"Frontal plane",side:"Inferior view",mnemonic:"Lead III stays on the patient's left side."},
    {id:"avr",name:"aVR",placement:"Positive viewing direction: right arm",landmark:"Right arm",plane:"Frontal plane",side:"Patient right",mnemonic:"R in aVR means right arm."},
    {id:"avl",name:"aVL",placement:"Positive viewing direction: left arm",landmark:"Left arm",plane:"Frontal plane",side:"Patient left",mnemonic:"L in aVL means left arm."},
    {id:"avf",name:"aVF",placement:"Positive viewing direction: left foot",landmark:"Left foot / left leg electrode",plane:"Frontal plane",side:"Inferior",mnemonic:"F in aVF means foot."}
  ],
  landmarks: [
    {id:"sternal-angle",name:"Sternal angle / Angle of Louis",placement:"Manubriosternal junction",mnemonic:"Use it to find rib 2 and begin counting intercostal spaces.",structureIds:["FJ3290","FJ3178"],anchor:{fallbackPercent:[49,31],model:[-0.00667,0.11303,0.17696],tolerance:0.035},derivedFrom:["manubrium","sternal-body"]},
    {id:"rib2",name:"Rib 2",placement:"Second rib and costal cartilage at the sternal-angle level",mnemonic:"The sternal angle leads to rib 2.",structureIds:["FJ3229","FJ3336","FJ3242","FJ3335"],anchor:{fallbackPercent:[50,34],model:[0,0.104,0.174],tolerance:0.045}},
    {id:"ics2",name:"2nd intercostal space",placement:"Space immediately below rib 2, between ribs 2 and 3",mnemonic:"Rib above gives the space its number.",derivedFrom:["rib2","rib3"],anchor:{fallbackPercent:[50,36],model:[0,0.09,0.182],tolerance:0.04}},
    {id:"rib3",name:"Rib 3",placement:"Third rib and costal cartilage",mnemonic:"The space immediately below is the 3rd ICS.",structureIds:["FJ3230","FJ3338","FJ3245","FJ3337"],anchor:{fallbackPercent:[50,38],model:[0,0.076,0.185],tolerance:0.045}},
    {id:"ics3",name:"3rd intercostal space",placement:"Space immediately below rib 3, between ribs 3 and 4",mnemonic:"Rib above gives the space its number.",derivedFrom:["rib3","rib4"],anchor:{fallbackPercent:[50,40],model:[0,0.063,0.193],tolerance:0.04}},
    {id:"rib4",name:"Rib 4",placement:"Fourth rib and costal cartilage",mnemonic:"The space immediately below is the 4th ICS.",structureIds:["FJ3231","FJ3340","FJ3248","FJ3339"],anchor:{fallbackPercent:[50,42],model:[0,0.049,0.198],tolerance:0.045}},
    {id:"rib5",name:"Rib 5",placement:"Fifth rib and costal cartilage",mnemonic:"The space immediately below is the 5th ICS.",structureIds:["FJ3232","FJ3342","FJ3251","FJ3341"],anchor:{fallbackPercent:[50,50],model:[0,0.019,0.204],tolerance:0.045}},
    {id:"rib6",name:"Rib 6",placement:"Sixth rib and costal cartilage",mnemonic:"Rib 6 bounds the lower side of the 5th ICS.",structureIds:["FJ3233","FJ3344","FJ3254","FJ3343"],anchor:{fallbackPercent:[50,55],model:[0,-0.008,0.205],tolerance:0.045}},
    {id:"sternum",name:"Sternum",placement:"Midline breastbone",mnemonic:"Find the sternum before finding its right and left borders."},
    {id:"right-sternal-border",name:"Right sternal border",placement:"Patient-right edge of the sternum",mnemonic:"V1 touches the patient's right edge of the sternum."},
    {id:"left-sternal-border",name:"Left sternal border",placement:"Patient-left edge of the sternum",mnemonic:"V2 touches the patient's left edge of the sternum."},
    {id:"clavicles",name:"Clavicles",placement:"Collarbones above the upper ribs",mnemonic:"Orient at the clavicles, then count downward to the intercostal spaces."},
    {id:"ics4",name:"4th intercostal space",placement:"Space immediately below rib 4, between ribs 4 and 5",mnemonic:"Rib above gives the space its number; V1 and V2 share this space.",derivedFrom:["rib4","rib5"],anchor:{fallbackPercent:[47,43],model:[0,0.0585575,0.218069475],tolerance:0.045}},
    {id:"ics5",name:"5th intercostal space",placement:"Space immediately below rib 5, between ribs 5 and 6",mnemonic:"Rib above gives the space its number; V4 establishes the V4–V6 level here.",derivedFrom:["rib5","rib6"],anchor:{fallbackPercent:[63,58],model:[0.076160365,-0.010225,0.218989514],tolerance:0.045}},
    {id:"mcl",name:"Left midclavicular line",placement:"Imaginary vertical line down from the middle of the left clavicle",mnemonic:"V4 = fifth space + midclavicular line."},
    {id:"aal",name:"Left anterior axillary line",placement:"Imaginary vertical line down from the front of the left axilla",mnemonic:"V5 uses the front of the armpit.",anchor:{fallbackPercent:[74,58],model:[0.194262,-0.010225,0.118718248],tolerance:0.06}},
    {id:"mal",name:"Left midaxillary line",placement:"Imaginary vertical line down from the middle of the left axilla",mnemonic:"V6 uses the middle of the armpit.",anchor:{fallbackPercent:[84,58],model:[0.247363,-0.010225,0.0639755],tolerance:0.06}},
    {id:"v4-level",name:"V4–V6 horizontal level",placement:"Horizontal level through V4, V5 and V6",mnemonic:"Move laterally from V4 without moving down."}
  ],
  guided: [
    {id:"orient",lead:"Orient the chest",target:"sternum",highlights:["sternum","clavicles"],placement:"Find the sternum and both clavicles in the front-facing patient.",cue:"Viewer left is PATIENT RIGHT; viewer right is PATIENT LEFT."},
    {id:"sternal-angle",lead:"STERNAL ANGLE (ANGLE OF LOUIS)",target:"sternal-angle",lesson:"sternal-angle",highlights:["sternal-angle"],placement:"Manubriosternal junction.",cue:"Use this landmark to find rib 2 and begin counting intercostal spaces."},
    {id:"rib2",lead:"RIB 2",target:"rib2",lesson:"rib2",highlights:["sternal-angle","rib2"],placement:"Follow the sternal angle laterally to the second rib and its costal cartilage.",cue:"The Angle of Louis identifies rib 2."},
    {id:"ics2",lead:"2nd INTERCOSTAL SPACE",target:"ics2",lesson:"ics2",highlights:["rib2","rib3","ics2"],placement:"The space immediately inferior to rib 2.",cue:"Rib above gives the space its number."},
    {id:"count-ics",lead:"Count intercostal spaces downward",target:"ics4",lesson:"count-ics",highlights:["rib2","rib3","rib4","rib5","ics2","ics3","ics4","ics5"],placement:"Rib 2 → 2nd ICS → Rib 3 → 3rd ICS → Rib 4 → 4th ICS → Rib 5 → 5th ICS.",cue:"Rib above gives the space its number."},
    {id:"v1v2-ics4",lead:"V1 and V2 share the 4th ICS",target:"ics4",lesson:"v1v2-ics4",activeElectrode:"v1",highlights:["v1","v2","ics4","right-sternal-border","left-sternal-border"],placement:"V1 is at the right sternal border and V2 at the left sternal border, both in the same 4th intercostal space.",cue:"Same space, opposite sides of the sternum."},
    {id:"v1",lead:"V1",target:"v1",highlights:["v1","ics4","right-sternal-border"]},
    {id:"v2",lead:"V2",target:"v2",highlights:["v2","ics4","left-sternal-border"]},
    {id:"mcl",lead:"Find the left midclavicular line",target:"mcl",highlights:["mcl","clavicles"]},
    {id:"v4-ics5",lead:"V4 is one space lower",target:"v4",lesson:"v4-ics5",activeElectrode:"v4",highlights:["v1","v2","v4","ics4","ics5","mcl"],placement:"V4 is in the 5th intercostal space at the left midclavicular line—one intercostal space lower than V1 and V2.",cue:"Find 5th ICS, then the left midclavicular line."},
    {id:"v4",lead:"V4",target:"v4",highlights:["v4","mcl","ics5"]},
    {id:"v3",lead:"V3",target:"v3",highlights:["v2","v3","v4"]},
    {id:"aal",lead:"Find the anterior axillary line",target:"aal",lesson:"v5-axillary",highlights:["aal","v4","v4-level"]},
    {id:"v5",lead:"V5",target:"v5",lesson:"v5-axillary",highlights:["v4","v5","aal","v4-level"]},
    {id:"mal",lead:"Find the midaxillary line",target:"mal",lesson:"v6-axillary",camera:"left-oblique",highlights:["mal","v4","v4-level"]},
    {id:"v6",lead:"V6",target:"v6",lesson:"v6-axillary",camera:"left-oblique",highlights:["v4","v5","v6","mal","v4-level"]},
    {id:"v4-v6-level",lead:"V4 → V5 → V6: SAME HEIGHT",target:"v4-level",lesson:"v4-v6-level",camera:"left-oblique",activeElectrode:"v4",highlights:["v4","v5","v6","mcl","aal","mal","v4-level"],placement:"V4 establishes the height. Move laterally to V5 at the left anterior axillary line and V6 at the left midaxillary line.",cue:"V4 sets the floor. V5 and V6 walk sideways. Do not follow the downward slope of the ribs."},
    {id:"review",lead:"Full chest-lead review",target:"v4",highlights:["v1","v2","v3","v4","v5","v6"],placement:"V1 → V2 → V4 → V3 → V5 → V6.",cue:"Sternal pair, anchor V4, fill V3, then move laterally without dropping."},
    {id:"lead-i-polarity",lead:"Lead I polarity",target:"lead-i",activeElectrode:"la",highlights:["ra","la","rl"],placement:"RA(−) → LA(+). RL is ground and is not a positive or negative pole.",cue:"Lead I travels leftward across the shoulders.",polarity:{ra:"−",la:"+",rl:"GND"}},
    {id:"lead-ii-polarity",lead:"Lead II polarity",target:"lead-ii",activeElectrode:"ll",highlights:["ra","ll","rl"],placement:"RA(−) → LL(+). RL is ground and is not a positive or negative pole.",cue:"Lead II travels down and left toward the positive left-leg electrode.",polarity:{ra:"−",ll:"+",rl:"GND"}},
    {id:"lead-iii-polarity",lead:"Lead III polarity",target:"lead-iii",activeElectrode:"ll",highlights:["la","ll","rl"],placement:"LA(−) → LL(+). RL is ground and is not a positive or negative pole.",cue:"Lead III travels inferiorly from left arm to left leg.",polarity:{la:"−",ll:"+",rl:"GND"}},
    {id:"avr-polarity",lead:"aVR polarity",target:"avr",activeElectrode:"ra",highlights:["ra","la","ll","rl"],placement:"RA is positive; LA and LL form the combined negative reference. RL is ground.",cue:"aVR looks toward the right arm.",polarity:{ra:"+",la:"− ref",ll:"− ref",rl:"GND"}},
    {id:"avl-polarity",lead:"aVL polarity",target:"avl",activeElectrode:"la",highlights:["ra","la","ll","rl"],placement:"LA is positive; RA and LL form the combined negative reference. RL is ground.",cue:"aVL looks toward the left arm.",polarity:{la:"+",ra:"− ref",ll:"− ref",rl:"GND"}},
    {id:"avf-polarity",lead:"aVF polarity",target:"avf",activeElectrode:"ll",highlights:["ra","la","ll","rl"],placement:"LL is positive; RA and LA form the combined negative reference. RL is ground.",cue:"aVF looks inferiorly toward the left foot.",polarity:{ll:"+",ra:"− ref",la:"− ref",rl:"GND"}}
  ],
  cards: [],
  quiz: []
};

/* Derived study material: every placement fact above is authored once, then reused. */
(function buildLeadPlacementStudyData(D) {
  const lead=(id)=>D.leads.find((item)=>item.id===id);
  const view=(id)=>D.limbViews.find((item)=>item.id===id);
  const landmark=(id)=>D.landmarks.find((item)=>item.id===id);
  const card=(id,term,definition,visual)=>({id,term,definition,...(visual?{visual}:{})});
  D.guided=D.guided.map((step)=>{
    const fact=lead(step.target)||landmark(step.target);
    return fact?{...step,placement:step.placement||`${fact.placement}.`,cue:step.cue||fact.mnemonic}:step;
  });
  D.cards=[
    ...["v1","v2","v3","v4","v5","v6"].map((id)=>card(`lead-${id}`,lead(id).name,`${lead(id).placement}.${["v5","v6"].includes(id)?" Remains horizontally level with V4.":""}`,id)),
    card("sternal-angle","Sternal angle / Angle of Louis",`${D.thoracicTeaching.sternalAngle.explanation}`, "sternal-angle"),
    card("intercostal-numbering","How are intercostal spaces numbered?",`By the rib immediately superior to the space. Memory cue: “${D.thoracicTeaching.intercostalNumbering.cue}”`, "ics2"),
    card("v5-height","V5 height",`Same horizontal level as V4. ${lead("v5").placement}.`, "v5"),
    card("v6-landmark","V6 landmark",`${lead("v6").placement}; horizontally level with V4 and V5.`, "v6"),
    ...["lead-i","lead-ii","lead-iii"].map((id)=>{const item=view(id);return card(id,item.name,`${item.placement}. Bipolar limb lead in the ${item.plane.toLowerCase()}.`);}),
    ...["avr","avl","avf"].map((id)=>{const item=view(id);return card(`lead-${id}`,item.name,`Augmented frontal-plane lead with a positive viewing direction toward the ${item.landmark.replace(" / left leg electrode","").toLowerCase()}.`);}),
    ...[["mcl","V4"],["aal","V5"],["mal","V6"]].map(([id,related])=>{const item=landmark(id);return card(`landmark-${id}`,item.name,`${item.placement}; ${related} is placed on this line.`);}),
    card("plane-limb","Limb leads view which plane?","Frontal plane."),
    card("plane-chest","Chest (precordial) leads view which plane?","Transverse plane."),
    card("lead-orientation","Front-view patient orientation",`Viewer left = ${D.patient.viewerLeft}; viewer right = ${D.patient.viewerRight}.`)
  ];

  const chest=D.leads.filter((item)=>item.family==="chest");
  const placementQuestion=(id,reverse=false)=>{
    const item=lead(id),index=chest.indexOf(item),indexes=[index,(index+1)%6,(index+3)%6,(index+5)%6];
    const options=indexes.map((i)=>reverse?chest[i].name:chest[i].placement);
    return {id:`q-${id}${reverse?"-reverse":""}`,type:reverse?"location-to-lead":"lead-to-location",prompt:reverse?`Which lead belongs at ${item.placement}?`:`Where is ${item.name} placed?`,options,answer:0,explain:`${item.name} is placed at ${item.placement}.`};
  };
  const tapQuestion=(id,prompt)=>{
    const item=lead(id)||landmark(id),isLead=!!lead(id);
    return {id:`q-tap-${id}`,type:"tap",prompt:prompt||`Tap the ${item.name} location.`,target:id,tolerance:item.anchor.tolerance,highlights:[id,...(isLead?item.landmarkIds||[]:item.derivedFrom||[])],explain:isLead?`Correct location: ${item.placement}. ${item.landmark}.`:`Correct landmark: ${item.placement}. ${item.mnemonic}`};
  };
  const pairOptions=[view("lead-i").placement,view("lead-ii").placement,view("lead-iii").placement,"LL(−) → RA(+)"];
  D.quiz=[
    placementQuestion("v1"),placementQuestion("v2",true),placementQuestion("v3"),placementQuestion("v4",true),
    {id:"q-v5",type:"landmark",prompt:"Which landmark is used for V5?",options:[landmark("aal").name,landmark("mal").name,landmark("right-sternal-border").name,landmark("mcl").name],answer:0,explain:`V5 sits on the ${landmark("aal").name.toLowerCase()} at the same horizontal level as V4.`},
    {id:"q-v6",type:"landmark",prompt:"Which landmark is used for V6?",options:[landmark("mal").name,landmark("aal").name,"Right midclavicular line",landmark("left-sternal-border").name],answer:0,explain:`V6 sits on the ${landmark("mal").name.toLowerCase()} and stays level with V4 and V5.`},
    {id:"q-sequence",type:"multiple-choice",prompt:"Which chest-lead placement sequence is preferred?",options:[D.chestSequence.map((id)=>lead(id).name).join(" → "),"V1 → V2 → V3 → V4 → V5 → V6","V4 → V3 → V2 → V1 → V5 → V6","V6 → V5 → V4 → V3 → V2 → V1"],answer:0,explain:"V4 is deliberately located before V3 so V3 can be placed halfway between V2 and V4."},
    tapQuestion("v1"),tapQuestion("v2"),tapQuestion("v4"),tapQuestion("v6"),
    tapQuestion("sternal-angle","Tap the sternal angle (Angle of Louis)."),
    {id:"q-angle-rib",type:"landmark",prompt:"Which rib does the sternal angle help identify?",options:["Rib 2","Rib 1","Rib 4","Rib 5"],answer:0,explain:D.thoracicTeaching.sternalAngle.explanation},
    tapQuestion("ics2","Tap the 2nd intercostal space."),
    {id:"q-below-rib4",type:"landmark",prompt:"The space immediately below rib 4 is which intercostal space?",options:["4th intercostal space","3rd intercostal space","5th intercostal space","2nd intercostal space"],answer:0,explain:`${D.thoracicTeaching.intercostalNumbering.rule} ${D.thoracicTeaching.intercostalNumbering.cue}`},
    {id:"q-ics-number-source",type:"landmark",prompt:"Which rib determines the number of an intercostal space?",options:["The rib immediately above it","The rib immediately below it","The closest rib to the clavicle","The lowest visible rib"],answer:0,explain:`${D.thoracicTeaching.intercostalNumbering.rule} ${D.thoracicTeaching.intercostalNumbering.cue}`},
    tapQuestion("ics4","Tap the 4th intercostal space."),
    {id:"q-ics4-leads",type:"landmark",prompt:"Which chest leads occupy the 4th intercostal space?",options:["V1 and V2","V3 and V4","V4 and V5","V5 and V6"],answer:0,explain:D.thoracicTeaching.fourthSpace.relationship},
    {id:"q-v4-height-source",type:"landmark",prompt:"Which lead establishes the horizontal level used for V5 and V6?",options:["V4","V1","V2","V6"],answer:0,explain:D.thoracicTeaching.horizontalRule.rule},
    {id:"q-v5-rib-slope",type:"landmark",prompt:"Should V5 follow the downward slope of the ribs or remain level with V4?",options:["Remain level with V4","Follow the downward rib slope","Move one intercostal space lower","Move above V4"],answer:0,explain:`${D.thoracicTeaching.horizontalRule.rule} ${D.thoracicTeaching.horizontalRule.warning}`},
    tapQuestion("aal","Tap the left anterior axillary line used for V5."),
    tapQuestion("mal","Tap the left midaxillary line used for V6."),
    {id:"q-identify-v4",type:"identify",prompt:"Which lead is highlighted?",highlight:"v4",options:["V2","V3","V4","V5"],answer:2,explain:`The highlighted marker is V4: ${lead("v4").placement}.`},
    ...["lead-i","lead-ii","lead-iii"].map((id)=>{const item=view(id),answer=pairOptions.indexOf(item.placement);return {id:`q-${id}`,type:"bipolar",prompt:`What is the ${item.name} pairing?`,options:pairOptions,answer,explain:`${item.name} is ${item.placement}. ${item.mnemonic}`};}),
    ...["avr","avl","avf"].map((id)=>{const item=view(id),dest=item.landmark.replace(" / left leg electrode","");return {id:`q-${id}`,type:"augmented",prompt:`Which augmented lead looks toward the ${dest.toLowerCase()}?`,options:["aVR","aVL","aVF","Lead II"],answer:["avr","avl","avf"].indexOf(id),explain:`${item.name}: ${item.placement}. ${item.mnemonic}`};}),
    {id:"q-plane-limb",type:"plane",prompt:"Limb leads view the heart in which plane?",options:[view("lead-i").plane,"Transverse plane","Sagittal plane","No anatomical plane"],answer:0,explain:"Standard and augmented limb leads provide frontal-plane views."},
    {id:"q-plane-chest",type:"plane",prompt:"Chest leads V1–V6 view the heart in which plane?",options:[lead("v1").plane,"Frontal plane","Sagittal plane","Coronal plane only"],answer:0,explain:"The six precordial leads provide transverse-plane views across the chest."}
  ];
})(LEAD_PLACEMENT);

/* Share one lead-placement deck with the existing reversible ECG flashcard renderer. */
if (typeof ECG_STUDY !== "undefined" && Array.isArray(ECG_STUDY.cards)) {
  const existingLeadCardIds = new Set(ECG_STUDY.cards.map((card) => card.id));
  LEAD_PLACEMENT.cards.forEach((card) => {
    if (!existingLeadCardIds.has(card.id)) ECG_STUDY.cards.push(card);
  });
}
