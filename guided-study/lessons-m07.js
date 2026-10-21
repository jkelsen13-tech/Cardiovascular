/* Delivered M07 lead-placement lessons; approved text/audio and measured static cues. */
(function(root){
 'use strict';
 const lessons=[
  {
    "id": "M07.01",
    "module": "M07",
    "title": "Electrodes, cables, and leads",
    "text": "An electrode is the sensor contacting the skin. A cable connects it to the recording system. An E C G lead is a calculated view of the heart's electrical activity, not simply the wire. A standard twelve-lead E C G uses ten electrodes to create twelve views. Six are limb-lead views, and six are chest-lead views. Keep those counts separate before placing anything on the body.",
    "transcript": "An electrode is the sensor contacting the skin. A cable connects it to the recording system. An E C G lead is a calculated view of the heart's electrical activity, not simply the wire. A standard twelve-lead E C G uses ten electrodes to create twelve views. Six are limb-lead views, and six are chest-lead views. Keep those counts separate before placing anything on the body.",
    "audio": {
      "src": "guided-study/assets/M07_01_adam_multilingual_v2.mp3",
      "duration": 24.737938,
      "sha256": "547acb4367f94bbe9bb287c8fc1c34e8385cf0c6ca073d0135d773032f793523"
    },
    "cues": [
      {
        "id": "M07.01.s01",
        "at": 0,
        "text": "An electrode is the sensor contacting the skin.",
        "title": "An electrode is the sensor contacting the skin.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The skin sensor is represented only by a teaching placement marker; contact mechanics and hardware are not modeled."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 3.02,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 7
        }
      },
      {
        "id": "M07.01.s02",
        "at": 3.53,
        "text": "A cable connects it to the recording system.",
        "title": "A cable connects it to the recording system.",
        "scene": {
          "organ": "explanation",
          "title": "Cable and recording system",
          "text": "A cable connects it to the recording system.",
          "source": "Owner-approved adapted M07.01 narration · source script lines 446-479 · course PDF physical pp243,248,252,258,263",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. No cable or recording-machine geometry exists in this thorax."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 3.53,
          "end": 5.71,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s02",
          "firstWordIndex": 8,
          "lastWordIndex": 15
        }
      },
      {
        "id": "M07.01.s03",
        "at": 6.13,
        "text": "An E C G lead is a calculated view of the heart's electrical activity, not simply the wire.",
        "title": "An E C G lead is a calculated view of the heart's electrical activity, not simply the wire.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Lead I is one calculated limb view, not an additional sensor or cable."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 6.13,
          "end": 11.94,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s03",
          "firstWordIndex": 16,
          "lastWordIndex": 33
        }
      },
      {
        "id": "M07.01.s04",
        "at": 12.52,
        "text": "A standard twelve-lead E C G uses ten electrodes to create twelve views.",
        "title": "A standard twelve-lead E C G uses ten electrodes to create twelve views.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Six chest markers plus four external limb labels represent 10 electrodes. The 12 lead views are comparisons; they are not 12 physical sensors."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 12.52,
          "end": 17.46,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s04",
          "firstWordIndex": 34,
          "lastWordIndex": 47
        }
      },
      {
        "id": "M07.01.s05",
        "at": 17.82,
        "text": "Six are limb-lead views, and six are chest-lead views.",
        "title": "Six are limb-lead views, and six are chest-lead views.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Six limb views use the limb electrodes; six chest views use V1–V6. No extra sensor is created for each view."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 17.82,
          "end": 21.12,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s05",
          "firstWordIndex": 48,
          "lastWordIndex": 58
        }
      },
      {
        "id": "M07.01.p01",
        "at": 20.13,
        "text": "Six are limb-lead views, and six are chest-lead views.",
        "title": "chest lead views · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Six chest views use V1–V6; this switches static placement context, not a computed waveform."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 20.13,
          "end": 21.12,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s05",
          "phrase": "chest lead views",
          "occurrence": 1,
          "firstWordIndex": 56,
          "lastWordIndex": 58
        }
      },
      {
        "id": "M07.01.s06",
        "at": 21.57,
        "text": "Keep those counts separate before placing anything on the body.",
        "title": "Keep those counts separate before placing anything on the body.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Keep electrode count 10 distinct from lead-view count 12."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 21.57,
          "end": 24.51,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.01.s06",
          "firstWordIndex": 59,
          "lastWordIndex": 68
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "446-479",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "243,248,252,258,263",
        "terminologyNote": "Electrode/cable/view distinctions and ten-electrode/twelve-view counts follow the approved adaptation. Cable hardware and measured electrical views are not rendered."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.01 narration · source script lines 446-479 · course PDF physical pp243,248,252,258,263",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.02",
    "module": "M07",
    "title": "The three bipolar limb views",
    "text": "Lead one compares the left arm with the right arm. Lead two compares the left leg with the right arm. Lead three compares the left leg with the left arm. The first location named is positive in each comparison. The remaining limb electrode does not become the ground for that lead. A separate right-leg electrode commonly provides a reference or driven-right-leg function in the recording system.",
    "transcript": "Lead one compares the left arm with the right arm. Lead two compares the left leg with the right arm. Lead three compares the left leg with the left arm. The first location named is positive in each comparison. The remaining limb electrode does not become the ground for that lead. A separate right-leg electrode commonly provides a reference or driven-right-leg function in the recording system.",
    "audio": {
      "src": "guided-study/assets/M07_02_adam_multilingual_v2.mp3",
      "duration": 25.44325,
      "sha256": "75eca12c9794aa2f3e8480871df35548f1e4c98412f41602b5940681c227402c"
    },
    "cues": [
      {
        "id": "M07.02.s01",
        "at": 0,
        "text": "Lead one compares the left arm with the right arm.",
        "title": "Lead one compares the left arm with the right arm.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Existing source polarity maps: I=LA positive/RA negative; II=LL positive/RA negative; III=LL positive/LA negative. References and input circuitry are explained, not simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 3.03,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.02.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 9
        }
      },
      {
        "id": "M07.02.s02",
        "at": 3.39,
        "text": "Lead two compares the left leg with the right arm.",
        "title": "Lead two compares the left leg with the right arm.",
        "scene": {
          "organ": "lead",
          "step": "lead-ii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Existing source polarity maps: I=LA positive/RA negative; II=LL positive/RA negative; III=LL positive/LA negative. References and input circuitry are explained, not simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 3.39,
          "end": 6.18,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.02.s02",
          "firstWordIndex": 10,
          "lastWordIndex": 19
        }
      },
      {
        "id": "M07.02.s03",
        "at": 6.5,
        "text": "Lead three compares the left leg with the left arm.",
        "title": "Lead three compares the left leg with the left arm.",
        "scene": {
          "organ": "lead",
          "step": "lead-iii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Existing source polarity maps: I=LA positive/RA negative; II=LL positive/RA negative; III=LL positive/LA negative. References and input circuitry are explained, not simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 6.5,
          "end": 9.29,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.02.s03",
          "firstWordIndex": 20,
          "lastWordIndex": 29
        }
      },
      {
        "id": "M07.02.s04",
        "at": 9.76,
        "text": "The first location named is positive in each comparison.",
        "title": "The first location named is positive in each comparison.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Existing source polarity maps: I=LA positive/RA negative; II=LL positive/RA negative; III=LL positive/LA negative. References and input circuitry are explained, not simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 9.76,
          "end": 13.28,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.02.s04",
          "firstWordIndex": 30,
          "lastWordIndex": 38
        }
      },
      {
        "id": "M07.02.s05",
        "at": 13.65,
        "text": "The remaining limb electrode does not become the ground for that lead.",
        "title": "The remaining limb electrode does not become the ground for that lead.",
        "scene": {
          "organ": "lead",
          "step": "lead-iii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Existing source polarity maps: I=LA positive/RA negative; II=LL positive/RA negative; III=LL positive/LA negative. References and input circuitry are explained, not simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 13.65,
          "end": 18.22,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.02.s05",
          "firstWordIndex": 39,
          "lastWordIndex": 50
        }
      },
      {
        "id": "M07.02.s06",
        "at": 18.68,
        "text": "A separate right-leg electrode commonly provides a reference or driven-right-leg function in the recording system.",
        "title": "A separate right-leg electrode commonly provides a reference or driven-right-leg function in the recording system.",
        "scene": {
          "organ": "lead",
          "step": "lead-ii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Existing source polarity maps: I=LA positive/RA negative; II=LL positive/RA negative; III=LL positive/LA negative. References and input circuitry are explained, not simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 18.68,
          "end": 24.94,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.02.s06",
          "firstWordIndex": 51,
          "lastWordIndex": 68
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "454-461",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "248–250,257–258",
        "terminologyNote": "Scientific correction: the unused RA/LA/LL electrode is not reassigned as ground for each bipolar lead, contrary to physical p250. Existing RL GND labels are teaching shorthand for a common reference/driven-right-leg function, not a measurement pole or guaranteed earth ground."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.02 narration · source script lines 454-461 · course PDF physical pp248–250,257–258",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.03",
    "module": "M07",
    "title": "Augmented and chest views",
    "text": "The augmented limb leads are a V R, a V L, and a V F. They view the heart from the right arm, left arm, and left leg, using calculated references. Together with leads one, two, and three, they show the frontal plane. Chest leads V one through V six view the heart in the transverse plane, each relative to a combined reference. The word unipolar is traditional shorthand; a voltage measurement still requires a comparison.",
    "transcript": "The augmented limb leads are a V R, a V L, and a V F. They view the heart from the right arm, left arm, and left leg, using calculated references. Together with leads one, two, and three, they show the frontal plane. Chest leads V one through V six view the heart in the transverse plane, each relative to a combined reference. The word unipolar is traditional shorthand; a voltage measurement still requires a comparison.",
    "audio": {
      "src": "guided-study/assets/M07_03_adam_multilingual_v2.mp3",
      "duration": 31.52975,
      "sha256": "d341c835ac3ea7b8c52669d3edc32db6d4f45b6da33222b44bd8341862a5b2e0"
    },
    "cues": [
      {
        "id": "M07.03.s01",
        "at": 0,
        "text": "The augmented limb leads are a V R, a V L, and a V F.",
        "title": "The augmented limb leads are a V R, a V L, and a V F.",
        "scene": {
          "organ": "lead",
          "step": "avr-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. aVR uses RA positive with LA/LL combined reference."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.07,
          "end": 4.43,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 14
        }
      },
      {
        "id": "M07.03.p01",
        "at": 2.5,
        "text": "The augmented limb leads are a V R, a V L, and a V F.",
        "title": "a V L · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "avl-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. LA is positive; RA and LL form its combined reference."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 2.5,
          "end": 3.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s01",
          "phrase": "a V L",
          "occurrence": 1,
          "firstWordIndex": 8,
          "lastWordIndex": 10
        }
      },
      {
        "id": "M07.03.p02",
        "at": 3.58,
        "text": "The augmented limb leads are a V R, a V L, and a V F.",
        "title": "a V F · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "avf-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. LL is positive; RA and LA form its combined reference."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 3.58,
          "end": 4.43,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s01",
          "phrase": "a V F",
          "occurrence": 1,
          "firstWordIndex": 12,
          "lastWordIndex": 14
        }
      },
      {
        "id": "M07.03.s02",
        "at": 4.73,
        "text": "They view the heart from the right arm, left arm, and left leg, using calculated references.",
        "title": "They view the heart from the right arm, left arm, and left leg, using calculated references.",
        "scene": {
          "organ": "lead",
          "step": "avr-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. The next measured phrases select the corresponding augmented right-arm, left-arm and left-leg views."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 4.73,
          "end": 10.83,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s02",
          "firstWordIndex": 15,
          "lastWordIndex": 30
        }
      },
      {
        "id": "M07.03.p03",
        "at": 6.81,
        "text": "They view the heart from the right arm, left arm, and left leg, using calculated references.",
        "title": "left arm · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "avl-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 6.81,
          "end": 7.58,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s02",
          "phrase": "left arm",
          "occurrence": 1,
          "firstWordIndex": 23,
          "lastWordIndex": 24
        }
      },
      {
        "id": "M07.03.p04",
        "at": 7.77,
        "text": "They view the heart from the right arm, left arm, and left leg, using calculated references.",
        "title": "left leg · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "avf-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 7.77,
          "end": 8.62,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s02",
          "phrase": "left leg",
          "occurrence": 1,
          "firstWordIndex": 26,
          "lastWordIndex": 27
        }
      },
      {
        "id": "M07.03.s03",
        "at": 11.2,
        "text": "Together with leads one, two, and three, they show the frontal plane.",
        "title": "Together with leads one, two, and three, they show the frontal plane.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Limb views are described in the frontal plane. No cutting plane or computed electrical field is drawn."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 11.2,
          "end": 16.12,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s03",
          "firstWordIndex": 31,
          "lastWordIndex": 42
        }
      },
      {
        "id": "M07.03.p05",
        "at": 12.93,
        "text": "Together with leads one, two, and three, they show the frontal plane.",
        "title": "two · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "lead-ii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Frontal-plane limb-view context; no anatomical plane or electrical field mesh."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 12.93,
          "end": 13.43,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s03",
          "phrase": "two",
          "occurrence": 1,
          "firstWordIndex": 35,
          "lastWordIndex": 35
        }
      },
      {
        "id": "M07.03.p06",
        "at": 13.75,
        "text": "Together with leads one, two, and three, they show the frontal plane.",
        "title": "three · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "lead-iii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Frontal-plane limb-view context; no anatomical plane or electrical field mesh."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 13.75,
          "end": 14.24,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s03",
          "phrase": "three",
          "occurrence": 1,
          "firstWordIndex": 37,
          "lastWordIndex": 37
        }
      },
      {
        "id": "M07.03.s04",
        "at": 16.52,
        "text": "Chest leads V one through V six view the heart in the transverse plane, each relative to a combined reference.",
        "title": "Chest leads V one through V six view the heart in the transverse plane, each relative to a combined reference.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Chest V1–V6 views are described in the transverse plane. The torso has no heart or moving plane; the markers provide placement context only."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 16.52,
          "end": 24.14,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s04",
          "firstWordIndex": 43,
          "lastWordIndex": 62
        }
      },
      {
        "id": "M07.03.s05",
        "at": 24.98,
        "text": "The word unipolar is traditional shorthand; a voltage measurement still requires a comparison.",
        "title": "The word unipolar is traditional shorthand; a voltage measurement still requires a comparison.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Unipolar is traditional shorthand. Each chest view compares its chest electrode with a combined reference; no reference voltage is calculated here."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 24.98,
          "end": 30.83,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.03.s05",
          "firstWordIndex": 63,
          "lastWordIndex": 75
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "462-479",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "251–258,263",
        "terminologyNote": "Traditional unipolar terminology still requires a voltage comparison. Registered polarity annotations are static context, not calculated reference voltages or cutting-plane geometry."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.03 narration · source script lines 462-479 · course PDF physical pp251–258,263",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.04",
    "module": "M07",
    "title": "Find chest landmarks",
    "text": "Use the patient's landmarks, not guessed distances. The sternal angle helps identify the second rib; the second intercostal space lies just below it. From there, count down. The midclavicular line descends from the midpoint of the clavicle. The anterior axillary line and midaxillary line descend from the front and middle of the armpit. There are twelve pairs of ribs and eleven intercostal spaces on each side.",
    "transcript": "Use the patient's landmarks, not guessed distances. The sternal angle helps identify the second rib; the second intercostal space lies just below it. From there, count down. The midclavicular line descends from the midpoint of the clavicle. The anterior axillary line and midaxillary line descend from the front and middle of the armpit. There are twelve pairs of ribs and eleven intercostal spaces on each side.",
    "audio": {
      "src": "guided-study/assets/M07_04_adam_multilingual_v2.mp3",
      "duration": 26.279125,
      "sha256": "f01838bce4cf9332f55335a8d16df5c68f4df1ddf2b8e361ff393234ef4cd7b7"
    },
    "cues": [
      {
        "id": "M07.04.s01",
        "at": 0,
        "text": "Use the patient's landmarks, not guessed distances.",
        "title": "Use the patient's landmarks, not guessed distances.",
        "scene": {
          "organ": "lead",
          "step": "orient",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 3.22,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 6
        }
      },
      {
        "id": "M07.04.s02",
        "at": 3.67,
        "text": "The sternal angle helps identify the second rib; the second intercostal space lies just below it.",
        "title": "The sternal angle helps identify the second rib; the second intercostal space lies just below it.",
        "scene": {
          "organ": "lead",
          "step": "sternal-angle",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The registered manubrium–sternal junction locates rib 2; count the space immediately below rib 2."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 3.67,
          "end": 9.2,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s02",
          "firstWordIndex": 7,
          "lastWordIndex": 22
        }
      },
      {
        "id": "M07.04.p01",
        "at": 5.49,
        "text": "The sternal angle helps identify the second rib; the second intercostal space lies just below it.",
        "title": "second rib · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "rib2",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Actual rib 2/costal-cartilage source structures registered at the sternal-angle level."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 5.49,
          "end": 6.22,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s02",
          "phrase": "second rib",
          "occurrence": 1,
          "firstWordIndex": 13,
          "lastWordIndex": 14
        }
      },
      {
        "id": "M07.04.p02",
        "at": 6.63,
        "text": "The sternal angle helps identify the second rib; the second intercostal space lies just below it.",
        "title": "second intercostal space · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "ics2",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Derived teaching space immediately below rib 2, bounded by ribs 2 and 3."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 6.63,
          "end": 8.12,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s02",
          "phrase": "second intercostal space",
          "occurrence": 1,
          "firstWordIndex": 16,
          "lastWordIndex": 18
        }
      },
      {
        "id": "M07.04.s03",
        "at": 9.56,
        "text": "From there, count down.",
        "title": "From there, count down.",
        "scene": {
          "organ": "lead",
          "step": "count-ics",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Numbered overlays cover 2nd–5th spaces only. Each space takes the number of the rib immediately above it."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 9.56,
          "end": 11.18,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s03",
          "firstWordIndex": 23,
          "lastWordIndex": 26
        }
      },
      {
        "id": "M07.04.s04",
        "at": 11.69,
        "text": "The midclavicular line descends from the midpoint of the clavicle.",
        "title": "The midclavicular line descends from the midpoint of the clavicle.",
        "scene": {
          "organ": "lead",
          "step": "mcl",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The left midclavicular line is a derived teaching guide from the registered clavicle."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 11.69,
          "end": 15.3,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s04",
          "firstWordIndex": 27,
          "lastWordIndex": 36
        }
      },
      {
        "id": "M07.04.s05",
        "at": 15.67,
        "text": "The anterior axillary line and midaxillary line descend from the front and middle of the armpit.",
        "title": "The anterior axillary line and midaxillary line descend from the front and middle of the armpit.",
        "scene": {
          "organ": "lead",
          "step": "aal",
          "preset": "left-oblique",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The anterior and midaxillary lines are derived reference guides; the next measured phrase changes to the midaxillary line."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 15.67,
          "end": 21.32,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s05",
          "firstWordIndex": 37,
          "lastWordIndex": 52
        }
      },
      {
        "id": "M07.04.p03",
        "at": 17.75,
        "text": "The anterior axillary line and midaxillary line descend from the front and middle of the armpit.",
        "title": "midaxillary line · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "mal",
          "preset": "left-oblique",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Patient-left derived midaxillary guide; camera is explicitly left-oblique."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 17.75,
          "end": 19.07,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s05",
          "phrase": "midaxillary line",
          "occurrence": 1,
          "firstWordIndex": 42,
          "lastWordIndex": 43
        }
      },
      {
        "id": "M07.04.s06",
        "at": 21.57,
        "text": "There are twelve pairs of ribs and eleven intercostal spaces on each side.",
        "title": "There are twelve pairs of ribs and eleven intercostal spaces on each side.",
        "scene": {
          "organ": "lead",
          "step": "orient",
          "preset": "front",
          "bodySurface": "hidden",
          "layers": {
            "body": false,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": false
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. All 12 rib pairs exist in the registered source thorax. Eleven intercostal spaces per side is a text explanation; only 2nd–5th numbered teaching overlays are provided."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 21.57,
          "end": 26.02,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.04.s06",
          "firstWordIndex": 53,
          "lastWordIndex": 65
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "42-97;474-479",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "30–33",
        "terminologyNote": "The sternal angle identifies rib2, then the second space immediately below it. Twelve PAIRS of ribs corrects the p31 shorthand. All 12 pairs exist in the source thorax; numbered instructional space overlays cover only 2nd–5th."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.04 narration · source script lines 42-97;474-479 · course PDF physical pp30–33",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.05",
    "module": "M07",
    "title": "Place V1 through V6",
    "text": "Locate V one at the fourth intercostal space, right sternal border, and V two at the fourth intercostal space, left sternal border. Locate V four at the fifth intercostal space on the left midclavicular line. V three lies halfway between V two and V four. V five is at the left anterior axillary line and V six at the left midaxillary line, both horizontally level with V four. Practice only in the website's learning model.",
    "transcript": "Locate V one at the fourth intercostal space, right sternal border, and V two at the fourth intercostal space, left sternal border. Locate V four at the fifth intercostal space on the left midclavicular line. V three lies halfway between V two and V four. V five is at the left anterior axillary line and V six at the left midaxillary line, both horizontally level with V four. Practice only in the website's learning model.",
    "audio": {
      "src": "guided-study/assets/M07_05_adam_multilingual_v2.mp3",
      "duration": 30.328125,
      "sha256": "23eb06f7b9b2ef7da537d4e28d72f3776f5d5efbc0072fac4aec0be9179a70a7"
    },
    "cues": [
      {
        "id": "M07.05.s01",
        "at": 0,
        "text": "Locate V one at the fourth intercostal space, right sternal border, and V two at the fourth intercostal space, left sternal border.",
        "title": "Locate V one at the fourth intercostal space, right sternal border, and V two at the fourth intercostal space, left sternal border.",
        "scene": {
          "organ": "lead",
          "step": "v1",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 8.51,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 21
        }
      },
      {
        "id": "M07.05.p01",
        "at": 4.45,
        "text": "Locate V one at the fourth intercostal space, right sternal border, and V two at the fourth intercostal space, left sternal border.",
        "title": "V two · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "v2",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 4.45,
          "end": 5.1,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s01",
          "phrase": "V two",
          "occurrence": 1,
          "firstWordIndex": 12,
          "lastWordIndex": 13
        }
      },
      {
        "id": "M07.05.s02",
        "at": 9.0,
        "text": "Locate V four at the fifth intercostal space on the left midclavicular line.",
        "title": "Locate V four at the fifth intercostal space on the left midclavicular line.",
        "scene": {
          "organ": "lead",
          "step": "v4",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 9.0,
          "end": 13.51,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s02",
          "firstWordIndex": 22,
          "lastWordIndex": 34
        }
      },
      {
        "id": "M07.05.s03",
        "at": 14.13,
        "text": "V three lies halfway between V two and V four.",
        "title": "V three lies halfway between V two and V four.",
        "scene": {
          "organ": "lead",
          "step": "v3",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 14.13,
          "end": 17.45,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s03",
          "firstWordIndex": 35,
          "lastWordIndex": 44
        }
      },
      {
        "id": "M07.05.s04",
        "at": 18.13,
        "text": "V five is at the left anterior axillary line and V six at the left midaxillary line, both horizontally level with V four.",
        "title": "V five is at the left anterior axillary line and V six at the left midaxillary line, both horizontally level with V four.",
        "scene": {
          "organ": "lead",
          "step": "v5",
          "preset": "left-oblique",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 18.13,
          "end": 27.17,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s04",
          "firstWordIndex": 45,
          "lastWordIndex": 67
        }
      },
      {
        "id": "M07.05.p02",
        "at": 21.84,
        "text": "V five is at the left anterior axillary line and V six at the left midaxillary line, both horizontally level with V four.",
        "title": "V six · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "v6",
          "preset": "left-oblique",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 21.84,
          "end": 22.57,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s04",
          "phrase": "V six",
          "occurrence": 1,
          "firstWordIndex": 55,
          "lastWordIndex": 56
        }
      },
      {
        "id": "M07.05.p03",
        "at": 24.91,
        "text": "V five is at the left anterior axillary line and V six at the left midaxillary line, both horizontally level with V four.",
        "title": "both horizontally level · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "v4-v6-level",
          "preset": "left-oblique",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 24.91,
          "end": 26.22,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s04",
          "phrase": "both horizontally level",
          "occurrence": 1,
          "firstWordIndex": 62,
          "lastWordIndex": 64
        }
      },
      {
        "id": "M07.05.s05",
        "at": 27.66,
        "text": "Practice only in the website's learning model.",
        "title": "Practice only in the website's learning model.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": true,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. V1: 4th intercostal space, patient-right sternal border. V2: 4th space, patient-left sternal border. Locate V4 at 5th space / left midclavicular line before placing V3 halfway between V2 and V4. V5 and V6 stay horizontally level with V4 at the left anterior and midaxillary lines. Numbered space overlays are the teaching subset 2nd–5th, not all 11 spaces. "
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 27.66,
          "end": 30.03,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.05.s05",
          "firstWordIndex": 68,
          "lastWordIndex": 74
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "474-479;SUPPLEMENT",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "30–33,263",
        "terminologyNote": "Exact V1–V6 placement is an approved narration supplement supported by the existing registered Lead Placement Lab facts/anchors; it is not claimed to be fully spelled out in extracted p263 text. Locate V4 before V3 and keep V4–V6 horizontally level."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.05 narration · source script lines 474-479;SUPPLEMENT · course PDF physical pp30–33,263",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.06",
    "module": "M07",
    "title": "Recording quality and configurations",
    "text": "Good recordings depend on reliable skin contact, secure electrodes, correct positions, and a relaxed, still subject. Movement, muscle activity, loose contacts, and electrical interference can distort a tracing. Limb-electrode colors vary by standard, so read the labels instead of relying on a color mnemonic alone. Torso placements used for continuous monitoring are not automatically equivalent to standard diagnostic limb placements. Follow the particular recording protocol rather than treating every configuration as interchangeable.",
    "transcript": "Good recordings depend on reliable skin contact, secure electrodes, correct positions, and a relaxed, still subject. Movement, muscle activity, loose contacts, and electrical interference can distort a tracing. Limb-electrode colors vary by standard, so read the labels instead of relying on a color mnemonic alone. Torso placements used for continuous monitoring are not automatically equivalent to standard diagnostic limb placements. Follow the particular recording protocol rather than treating every configuration as interchangeable.",
    "audio": {
      "src": "guided-study/assets/M07_06_adam_multilingual_v2.mp3",
      "duration": 37.198313,
      "sha256": "35b849191ea556e6a82e0344c324bb995eac611199576de260321ca12fae4db3"
    },
    "cues": [
      {
        "id": "M07.06.s01",
        "at": 0,
        "text": "Good recordings depend on reliable skin contact, secure electrodes, correct positions, and a relaxed, still subject.",
        "title": "Good recordings depend on reliable skin contact, secure electrodes, correct positions, and a relaxed, still subject.",
        "scene": {
          "organ": "explanation",
          "title": "Reliable contact and a still subject",
          "text": "Good recordings depend on reliable skin contact, secure electrodes, correct positions, and a relaxed, still subject.",
          "source": "Owner-approved adapted M07.06 narration · source script lines 446-479;480-505 · course PDF physical pp243,247–248,257–258,264",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. No skin contact, adhesive behavior or signal-quality process is modeled."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 7.92,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.06.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 15
        }
      },
      {
        "id": "M07.06.s02",
        "at": 8.43,
        "text": "Movement, muscle activity, loose contacts, and electrical interference can distort a tracing.",
        "title": "Movement, muscle activity, loose contacts, and electrical interference can distort a tracing.",
        "scene": {
          "organ": "explanation",
          "title": "Recording artifacts",
          "text": "Movement, muscle activity, loose contacts, and electrical interference can distort a tracing.",
          "source": "Owner-approved adapted M07.06 narration · source script lines 446-479;480-505 · course PDF physical pp243,247–248,257–258,264",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. No motion, muscle-noise, contact-loss or mains-interference tracing is generated."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 8.43,
          "end": 14.74,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.06.s02",
          "firstWordIndex": 16,
          "lastWordIndex": 27
        }
      },
      {
        "id": "M07.06.s03",
        "at": 15.23,
        "text": "Limb-electrode colors vary by standard, so read the labels instead of relying on a color mnemonic alone.",
        "title": "Limb-electrode colors vary by standard, so read the labels instead of relying on a color mnemonic alone.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. The current palette is explicitly AHA limb-electrode colors: RA white, LA black, RL green, LL red. Other standards vary; read the letter labels. No alternate palette or configuration is being simulated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 15.23,
          "end": 22.04,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.06.s03",
          "firstWordIndex": 28,
          "lastWordIndex": 45
        }
      },
      {
        "id": "M07.06.s04",
        "at": 22.94,
        "text": "Torso placements used for continuous monitoring are not automatically equivalent to standard diagnostic limb placements.",
        "title": "Torso placements used for continuous monitoring are not automatically equivalent to standard diagnostic limb placements.",
        "scene": {
          "organ": "explanation",
          "title": "Monitoring and diagnostic configurations",
          "text": "Torso placements used for continuous monitoring are not automatically equivalent to standard diagnostic limb placements.",
          "source": "Owner-approved adapted M07.06 narration · source script lines 446-479;480-505 · course PDF physical pp243,247–248,257–258,264",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. The thorax uses four external limb labels. These are not a demonstration of a validated torso-modified diagnostic configuration."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 22.94,
          "end": 30.69,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.06.s04",
          "firstWordIndex": 46,
          "lastWordIndex": 60
        }
      },
      {
        "id": "M07.06.s05",
        "at": 31.23,
        "text": "Follow the particular recording protocol rather than treating every configuration as interchangeable.",
        "title": "Follow the particular recording protocol rather than treating every configuration as interchangeable.",
        "scene": {
          "organ": "lead",
          "step": "review",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. This model is learning context, not a recording protocol. No patient or device configuration is selected by this lesson."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 31.23,
          "end": 36.98,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.06.s05",
          "firstWordIndex": 61,
          "lastWordIndex": 72
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "446-479;480-505",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "243,247–248,257–258,264",
        "terminologyNote": "Recording quality, color-standard variation and configuration differences are qualified explanations. No contact impedance, artifact generation, cable hardware or alternative validated electrode configuration is modeled."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.06 narration · source script lines 446-479;480-505 · course PDF physical pp243,247–248,257–258,264",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.07",
    "module": "M07",
    "title": "Why waves point up or down",
    "text": "A lead records the projection of the heart's changing electrical activity onto that lead's axis. A depolarization wave moving toward its positive pole usually creates a positive deflection; moving away usually creates a negative one. A near-perpendicular net vector can produce a small or biphasic complex. An isoelectric segment does not prove that every heart cell is electrically inactive. Opposing signals or little net change can also produce a near-flat line.",
    "transcript": "A lead records the projection of the heart's changing electrical activity onto that lead's axis. A depolarization wave moving toward its positive pole usually creates a positive deflection; moving away usually creates a negative one. A near-perpendicular net vector can produce a small or biphasic complex. An isoelectric segment does not prove that every heart cell is electrically inactive. Opposing signals or little net change can also produce a near-flat line.",
    "audio": {
      "src": "guided-study/assets/M07_07_adam_multilingual_v2.mp3",
      "duration": 31.190188,
      "sha256": "7107b356829bd1526fb5d1e5b974828319e63d7f1c46603629bccdd5a2f54012"
    },
    "cues": [
      {
        "id": "M07.07.s01",
        "at": 0,
        "text": "A lead records the projection of the heart's changing electrical activity onto that lead's axis.",
        "title": "A lead records the projection of the heart's changing electrical activity onto that lead's axis.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Only static Lead I poles are shown. Projection of changing cardiac activity and its trace are readable concepts; no dipole, heart mesh, wavefront or generated waveform exists in this scene."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 5.52,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.07.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 14
        }
      },
      {
        "id": "M07.07.s02",
        "at": 6.07,
        "text": "A depolarization wave moving toward its positive pole usually creates a positive deflection; moving away usually creates a negative one.",
        "title": "A depolarization wave moving toward its positive pole usually creates a positive deflection; moving away usually creates a negative one.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. Toward/away deflection rules are conceptual narration. The +/− markers do not change into waveform signs, and no moving vector or strip is generated."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 6.07,
          "end": 14.7,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.07.s02",
          "firstWordIndex": 15,
          "lastWordIndex": 34
        }
      },
      {
        "id": "M07.07.s03",
        "at": 15.25,
        "text": "A near-perpendicular net vector can produce a small or biphasic complex.",
        "title": "A near-perpendicular net vector can produce a small or biphasic complex.",
        "scene": {
          "organ": "explanation",
          "title": "Small and biphasic complexes",
          "text": "A near-perpendicular net vector can produce a small or biphasic complex.",
          "source": "Owner-approved adapted M07.07 narration · source script lines 446-453;480-519 · course PDF physical pp244–245,267,338",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. No net-vector projection, biphasic waveform or caliper measurements are generated."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 15.25,
          "end": 20.27,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.07.s03",
          "firstWordIndex": 35,
          "lastWordIndex": 46
        }
      },
      {
        "id": "M07.07.s04",
        "at": 20.67,
        "text": "An isoelectric segment does not prove that every heart cell is electrically inactive.",
        "title": "An isoelectric segment does not prove that every heart cell is electrically inactive.",
        "scene": {
          "organ": "explanation",
          "title": "An isoelectric segment",
          "text": "An isoelectric segment does not prove that every heart cell is electrically inactive.",
          "source": "Owner-approved adapted M07.07 narration · source script lines 446-453;480-519 · course PDF physical pp244–245,267,338",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. No tracing is displayed or measured; a near-flat surface recording does not establish cellular inactivity."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 20.67,
          "end": 25.71,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.07.s04",
          "firstWordIndex": 47,
          "lastWordIndex": 59
        }
      },
      {
        "id": "M07.07.s05",
        "at": 26.22,
        "text": "Opposing signals or little net change can also produce a near-flat line.",
        "title": "Opposing signals or little net change can also produce a near-flat line.",
        "scene": {
          "organ": "explanation",
          "title": "Opposing signals and little net change",
          "text": "Opposing signals or little net change can also produce a near-flat line.",
          "source": "Owner-approved adapted M07.07 narration · source script lines 446-453;480-519 · course PDF physical pp244–245,267,338",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. A net electrical comparison can be small despite active cells; no quantitative cancellation solver is present."
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 26.22,
          "end": 30.63,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.07.s05",
          "firstWordIndex": 60,
          "lastWordIndex": 72
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "446-453;480-519",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "244–245,267,338",
        "terminologyNote": "Approved correction: positive/negative deflection concerns net projection onto a lead, not a general rule that all electricity flows negative-to-positive; an isoelectric segment does not prove all cells inactive. No vector-to-trace solver is supplied."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.07 narration · source script lines 446-453;480-519 · course PDF physical pp244–245,267,338",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  },
  {
    "id": "M07.08",
    "module": "M07",
    "title": "Frontal axis without the shortcut error",
    "text": "The usual adult frontal Q R S axis reference is minus thirty to plus ninety degrees. Leads one and a V F give a quick quadrant screen. Both positive generally fits the normal quadrant. Lead one positive with a V F negative is not automatically left axis deviation: the axis may still lie between zero and minus thirty degrees. Lead two helps distinguish that borderline-normal region from a more leftward axis. Axis is a clue, not a diagnosis by itself.",
    "transcript": "The usual adult frontal Q R S axis reference is minus thirty to plus ninety degrees. Leads one and a V F give a quick quadrant screen. Both positive generally fits the normal quadrant. Lead one positive with a V F negative is not automatically left axis deviation: the axis may still lie between zero and minus thirty degrees. Lead two helps distinguish that borderline-normal region from a more leftward axis. Axis is a clue, not a diagnosis by itself.",
    "audio": {
      "src": "guided-study/assets/M07_08_adam_multilingual_v2.mp3",
      "duration": 35.552625,
      "sha256": "11a0d1712883124dd65798bf5773f62567f59f4d063320f30c51b08886f4321b"
    },
    "cues": [
      {
        "id": "M07.08.s01",
        "at": 0,
        "text": "The usual adult frontal Q R S axis reference is minus thirty to plus ninety degrees.",
        "title": "The usual adult frontal Q R S axis reference is minus thirty to plus ninety degrees.",
        "scene": {
          "organ": "explanation",
          "title": "Adult frontal QRS axis reference",
          "text": "The usual adult frontal Q R S axis reference is minus thirty to plus ninety degrees.",
          "source": "Owner-approved adapted M07.08 narration · source script lines 470-473;512-519 · course PDF physical pp262,266,339–345",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. "
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 0.0,
          "end": 6.61,
          "initialPoseAtZero": true,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 15
        }
      },
      {
        "id": "M07.08.s02",
        "at": 7.13,
        "text": "Leads one and a V F give a quick quadrant screen.",
        "title": "Leads one and a V F give a quick quadrant screen.",
        "scene": {
          "organ": "lead",
          "step": "lead-i-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. Lead I and the next measured aVF phrase locate relevant limb views only."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 7.13,
          "end": 10.45,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s02",
          "firstWordIndex": 16,
          "lastWordIndex": 26
        }
      },
      {
        "id": "M07.08.p01",
        "at": 8.02,
        "text": "Leads one and a V F give a quick quadrant screen.",
        "title": "a V F · measured spoken phrase",
        "scene": {
          "organ": "lead",
          "step": "avf-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. This locates the aVF view for the conceptual quadrant screen; no observed QRS sign is supplied."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "phrase",
          "measuredStart": 8.02,
          "end": 8.71,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s02",
          "phrase": "a V F",
          "occurrence": 1,
          "firstWordIndex": 19,
          "lastWordIndex": 21
        }
      },
      {
        "id": "M07.08.s03",
        "at": 10.86,
        "text": "Both positive generally fits the normal quadrant.",
        "title": "Both positive generally fits the normal quadrant.",
        "scene": {
          "organ": "explanation",
          "title": "Both QRS complexes positive",
          "text": "Both positive generally fits the normal quadrant.",
          "source": "Owner-approved adapted M07.08 narration · source script lines 470-473;512-519 · course PDF physical pp262,266,339–345",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. "
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 10.86,
          "end": 13.8,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s03",
          "firstWordIndex": 27,
          "lastWordIndex": 33
        }
      },
      {
        "id": "M07.08.s04",
        "at": 14.24,
        "text": "Lead one positive with a V F negative is not automatically left axis deviation: the axis may still lie between zero and minus thirty degrees.",
        "title": "Lead one positive with a V F negative is not automatically left axis deviation: the axis may still lie between zero and minus thirty degrees.",
        "scene": {
          "organ": "explanation",
          "title": "The I-positive/aVF-negative shortcut needs Lead II",
          "text": "Lead one positive with a V F negative is not automatically left axis deviation: the axis may still lie between zero and minus thirty degrees.",
          "source": "Owner-approved adapted M07.08 narration · source script lines 470-473;512-519 · course PDF physical pp262,266,339–345",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. "
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 14.24,
          "end": 25.12,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s04",
          "firstWordIndex": 34,
          "lastWordIndex": 58
        }
      },
      {
        "id": "M07.08.s05",
        "at": 25.59,
        "text": "Lead two helps distinguish that borderline-normal region from a more leftward axis.",
        "title": "Lead two helps distinguish that borderline-normal region from a more leftward axis.",
        "scene": {
          "organ": "lead",
          "step": "lead-ii-polarity",
          "preset": "front",
          "bodySurface": "translucent",
          "layers": {
            "body": true,
            "skeleton": true,
            "muscle": false,
            "landmarks": true,
            "leads": true
          },
          "showIntercostalSpaces": false,
          "showElectrodeColors": true,
          "showLeadTypes": true,
          "allLabels": false,
          "touch": false,
          "simulation": {
            "kind": "hold"
          },
          "detail": "Actual registered BodyParts3D thorax and existing Lead Placement Lab markers. Patient-right/left refer to the patient; front-view viewer left is patient RIGHT. The 50 source meshes include skin, sternum, clavicles, 12 rib pairs, costal cartilage and pectoralis; no heart, lungs, cable hardware or full limbs are present. Chest positions and intercostal overlays are derived reference-atlas teaching anchors, not measurements for an individual. The four limb labels point toward external limb regions, not validated diagnostic recording sites. This is a static anatomical/polarity lesson, with no ECG signal, contact-impedance or vector-projection solver. Lead RA/LA are electrode labels, not right/left atria. Any visible RL “GND” is the existing module’s teaching shorthand: the right-leg electrode commonly provides a common reference/driven-right-leg function; it is not a positive/negative measurement pole or necessarily literal earth ground. The unused RA/LA/LL electrode is never reassigned as ground. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. The source Lead II poles are context for the narrated borderline-region check, not measured axis data."
        },
        "visualStatus": "model-binding",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 25.59,
          "end": 30.97,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s05",
          "firstWordIndex": 59,
          "lastWordIndex": 71
        }
      },
      {
        "id": "M07.08.s06",
        "at": 31.6,
        "text": "Axis is a clue, not a diagnosis by itself.",
        "title": "Axis is a clue, not a diagnosis by itself.",
        "scene": {
          "organ": "explanation",
          "title": "Axis is a clue",
          "text": "Axis is a clue, not a diagnosis by itself.",
          "source": "Owner-approved adapted M07.08 narration · source script lines 470-473;512-519 · course PDF physical pp262,266,339–345",
          "qualification": "Supplemental explanation; no corresponding 3D process, instrument measurement, generated tracing or clinical prediction. Conceptual axis explanation only: no hexaxial wheel, calibrated tracing, QRS amplitude measurement or axis solver is displayed. The displayed +/− labels identify measurement poles or combined-reference electrodes; they are not the sign of an observed QRS complex. No strip or caliper values are invented. "
        },
        "visualStatus": "supplemental-explanation",
        "alignment": {
          "kind": "sentence",
          "measuredStart": 31.6,
          "end": 34.99,
          "initialPoseAtZero": false,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M07.08.s06",
          "firstWordIndex": 72,
          "lastWordIndex": 80
        }
      }
    ],
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "bytes": 127983,
      "lines": 881,
      "whitespaceWords": 20398,
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "observedCompleteness": "Ten numbered parts plus appendix; introduction and two closing passages saying four presentations are stale, not a content boundary.",
      "sourceLines": "470-473;512-519",
      "audioPackageLibraryFileId": "libfile_c0fdd4d3a694819193020179c980f783",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf",
        "pageNumbering": "Physical PDF pages, 1-based",
        "physicalPages": "262,266,339–345",
        "terminologyNote": "Approved correction to the p343 quadrant shortcut: Lead I positive/aVF negative includes0 to−30degrees; Lead II helps distinguish the borderline-normal region. No QRS amplitudes, axis computation or diagnosis is generated."
      }
    },
    "sourceLabel": "Owner-approved adapted M07.08 narration · source script lines 470-473;512-519 · course PDF physical pp262,266,339–345",
    "sourceUrl": "guided-study/assets/M07-provenance.json",
    "status": "Audio and measured static source-scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10ms frame grid; actual listening QA pending"
  }
];
 const existing=Array.isArray(root.GuidedStudyLessons)?root.GuidedStudyLessons:[];
 const present=new Set(existing.map(lesson=>lesson.id));
 root.GuidedStudyLessons=existing.concat(lessons.filter(lesson=>!present.has(lesson.id)));
 if(typeof module==='object'&&module.exports)module.exports=lessons;
})(typeof window==='object'?window:globalThis);
