/* Delivered M02 audio and source-verified full-scene cue bindings.
 * Machine alignment is not listening/visual QA; remaining course narration is pending. */
(function(root){
 'use strict';
 const lessons=[
  {
    "id": "M02.01",
    "module": "M02",
    "title": "The four chambers",
    "text": "Find the four chambers in the heart. The right atrium and left atrium receive returning blood. The right ventricle and left ventricle eject blood. The septum separates the right and left sides. Now trace the two connected routes. Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs. Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body. Both sides pump during the same heartbeat, but toward different destinations. The right side supplies the pulmonary circuit. The left side supplies the systemic circuit. Pause here and point to each chamber. Use the patient's right and left, even when the front view reverses them on your screen.",
    "transcript": "Find the four chambers in the heart. The right atrium and left atrium receive returning blood. The right ventricle and left ventricle eject blood. The septum separates the right and left sides. Now trace the two connected routes. Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs. Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body. Both sides pump during the same heartbeat, but toward different destinations. The right side supplies the pulmonary circuit. The left side supplies the systemic circuit. Pause here and point to each chamber. Use the patient's right and left, even when the front view reverses them on your screen.",
    "audio": {
      "src": "guided-study/assets/M02_01_adam_multilingual_v2.mp3",
      "duration": 49.266938,
      "sha256": "fbef2ef3dd5da65b9284880d772f6b0f51e899d461b720dd92e0d41f217183fa"
    },
    "cues": [
      {
        "id": "M02_01.s01",
        "at": 0.0,
        "text": "Find the four chambers in the heart.",
        "title": "Find the four chambers in the heart.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.18,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 6
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s02",
        "at": 2.58,
        "text": "The right atrium and left atrium receive returning blood.",
        "title": "The right atrium and left atrium receive returning blood.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 6.2,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s02",
          "firstWordIndex": 7,
          "lastWordIndex": 15
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p01",
        "at": 2.71,
        "text": "The right atrium and left atrium receive returning blood.",
        "title": "right atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 3.66,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s02",
          "phrase": "right atrium",
          "occurrence": 1,
          "firstWordIndex": 8,
          "lastWordIndex": 9
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p03",
        "at": 3.78,
        "text": "The right atrium and left atrium receive returning blood.",
        "title": "left atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.69,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s02",
          "phrase": "left atrium",
          "occurrence": 1,
          "firstWordIndex": 11,
          "lastWordIndex": 12
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s03",
        "at": 6.62,
        "text": "The right ventricle and left ventricle eject blood.",
        "title": "The right ventricle and left ventricle eject blood.",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 9.88,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s03",
          "firstWordIndex": 16,
          "lastWordIndex": 23
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p05",
        "at": 6.71,
        "text": "The right ventricle and left ventricle eject blood.",
        "title": "right ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "rv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 7.68,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s03",
          "phrase": "right ventricle",
          "occurrence": 1,
          "firstWordIndex": 17,
          "lastWordIndex": 18
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p07",
        "at": 7.79,
        "text": "The right ventricle and left ventricle eject blood.",
        "title": "left ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 8.75,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s03",
          "phrase": "left ventricle",
          "occurrence": 1,
          "firstWordIndex": 20,
          "lastWordIndex": 21
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s04",
        "at": 10.36,
        "text": "The septum separates the right and left sides.",
        "title": "The septum separates the right and left sides.",
        "scene": {
          "organ": "heart",
          "selected": "septum",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The visible HRA interventricular septum separates ventricular sides; interatrial septum has no separately segmented source mesh."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.26,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s04",
          "firstWordIndex": 24,
          "lastWordIndex": 31
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p09",
        "at": 10.45,
        "text": "The septum separates the right and left sides.",
        "title": "septum · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "septum",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The visible interventricular septum is sourced. Interatrial septum has no separately segmented source mesh."
        },
        "alignment": {
          "kind": "phrase",
          "end": 10.92,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s04",
          "phrase": "septum",
          "occurrence": 1,
          "firstWordIndex": 25,
          "lastWordIndex": 25
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s05",
        "at": 13.65,
        "text": "Now trace the two connected routes.",
        "title": "Now trace the two connected routes.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 15.64,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s05",
          "firstWordIndex": 32,
          "lastWordIndex": 37
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s06",
        "at": 16.06,
        "text": "Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs.",
        "title": "Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs.",
        "scene": {
          "organ": "heart",
          "selected": "svc",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "caval-return",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.62,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s06",
          "firstWordIndex": 38,
          "lastWordIndex": 56
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p02",
        "at": 18.07,
        "text": "Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs.",
        "title": "right atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 18.98,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s06",
          "phrase": "right atrium",
          "occurrence": 2,
          "firstWordIndex": 45,
          "lastWordIndex": 46
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p06",
        "at": 19.96,
        "text": "Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs.",
        "title": "right ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "rv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 20.9,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s06",
          "phrase": "right ventricle",
          "occurrence": 2,
          "firstWordIndex": 50,
          "lastWordIndex": 51
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.destination.5.lungs",
        "at": 22.01,
        "text": "Blood returning from the body enters the right atrium, passes into the right ventricle, and travels to the lungs.",
        "title": "lungs · measured destination",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "lung-bed",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The capillary inset is a separate instructional schematic, not gross HRA lung/body microgeometry, measured diffusion or CFD. The original four-chamber source context remains visible."
        },
        "alignment": {
          "kind": "word",
          "end": 22.62,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s06",
          "word": "lungs",
          "firstWordIndex": 56,
          "lastWordIndex": 56
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s07",
        "at": 23.12,
        "text": "Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body.",
        "title": "Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body.",
        "scene": {
          "organ": "heart",
          "selected": "vein",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "pulmonary-veins",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.38,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s07",
          "firstWordIndex": 57,
          "lastWordIndex": 75
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.destination.6.lungs",
        "at": 24.13,
        "text": "Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body.",
        "title": "lungs · measured destination",
        "scene": {
          "organ": "heart",
          "selected": "vein",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "pulmonary-veins",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "word",
          "end": 24.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s07",
          "word": "lungs",
          "firstWordIndex": 61,
          "lastWordIndex": 61
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p04",
        "at": 25.11,
        "text": "Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body.",
        "title": "left atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 25.97,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s07",
          "phrase": "left atrium",
          "occurrence": 2,
          "firstWordIndex": 64,
          "lastWordIndex": 65
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.p08",
        "at": 27.02,
        "text": "Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body.",
        "title": "left ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 27.97,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s07",
          "phrase": "left ventricle",
          "occurrence": 2,
          "firstWordIndex": 69,
          "lastWordIndex": 70
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.01.destination.6.body",
        "at": 28.9,
        "text": "Blood returning from the lungs enters the left atrium, passes into the left ventricle, and leaves for the body.",
        "title": "body · measured destination",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "systemic-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "word",
          "end": 29.38,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s07",
          "word": "body",
          "firstWordIndex": 75,
          "lastWordIndex": 75
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s08",
        "at": 29.86,
        "text": "Both sides pump during the same heartbeat, but toward different destinations.",
        "title": "Both sides pump during the same heartbeat, but toward different destinations.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "cycle",
            "seconds": 0,
            "anchorAudio": 29.86,
            "speed": 0.25
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 34.62,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s08",
          "firstWordIndex": 76,
          "lastWordIndex": 86
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s09",
        "at": 35.04,
        "text": "The right side supplies the pulmonary circuit.",
        "title": "The right side supplies the pulmonary circuit.",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "rv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 37.52,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s09",
          "firstWordIndex": 87,
          "lastWordIndex": 93
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s10",
        "at": 37.99,
        "text": "The left side supplies the systemic circuit.",
        "title": "The left side supplies the systemic circuit.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 40.62,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s10",
          "firstWordIndex": 94,
          "lastWordIndex": 100
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s11",
        "at": 41.13,
        "text": "Pause here and point to each chamber.",
        "title": "Pause here and point to each chamber.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 43.39,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s11",
          "firstWordIndex": 101,
          "lastWordIndex": 107
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02_01.s12",
        "at": 43.81,
        "text": "Use the patient's right and left, even when the front view reverses them on your screen.",
        "title": "Use the patient's right and left, even when the front view reverses them on your screen.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Use the patient-side labels. The display camera does not change anatomical right/left."
        },
        "alignment": {
          "kind": "sentence",
          "end": 49.0,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02_01.s12",
          "firstWordIndex": 108,
          "lastWordIndex": 123
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "248-257",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_0fbd4952ccfc81918f4c259ee404ed56"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 248-257",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.02",
    "module": "M02",
    "title": "Systemic venous return",
    "text": "Start the blood-flow journey at the right atrium. The superior vena cava returns blood from much of the upper body. The inferior vena cava returns blood from much of the lower body. The coronary sinus returns much of the blood that has supplied the heart muscle itself. This returning blood contains less oxygen than blood leaving the lungs, but it is not completely without oxygen.",
    "transcript": "Start the blood-flow journey at the right atrium. The superior vena cava returns blood from much of the upper body. The inferior vena cava returns blood from much of the lower body. The coronary sinus returns much of the blood that has supplied the heart muscle itself. This returning blood contains less oxygen than blood leaving the lungs, but it is not completely without oxygen.",
    "audio": {
      "src": "guided-study/assets/M02_02_adam_multilingual_v2.mp3",
      "duration": 24.26775,
      "sha256": "f9c86e20509e10fe120c4b68c5a36c61440e270c3f37873a78855760121e5cb3"
    },
    "cues": [
      {
        "id": "M02.02.s01",
        "at": 0.0,
        "text": "Start the blood-flow journey at the right atrium.",
        "title": "Start the blood-flow journey at the right atrium.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.02.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.02.s02",
        "at": 3.07,
        "text": "The superior vena cava returns blood from much of the upper body.",
        "title": "The superior vena cava returns blood from much of the upper body.",
        "scene": {
          "organ": "heart",
          "selected": "svc",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "caval-return",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 7.01,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.02.s02",
          "firstWordIndex": 9,
          "lastWordIndex": 20
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.02.s03",
        "at": 7.54,
        "text": "The inferior vena cava returns blood from much of the lower body.",
        "title": "The inferior vena cava returns blood from much of the lower body.",
        "scene": {
          "organ": "heart",
          "selected": "ivc",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "venous-return",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.62,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.02.s03",
          "firstWordIndex": 21,
          "lastWordIndex": 32
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.02.s04",
        "at": 12.07,
        "text": "The coronary sinus returns much of the blood that has supplied the heart muscle itself.",
        "title": "The coronary sinus returns much of the blood that has supplied the heart muscle itself.",
        "scene": {
          "organ": "heart",
          "selected": "sinus",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The coronary sinus source is retained; its return is explained here, not an independently measured coronary model flow."
        },
        "alignment": {
          "kind": "sentence",
          "end": 16.58,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.02.s04",
          "firstWordIndex": 33,
          "lastWordIndex": 47
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.02.p01",
        "at": 12.16,
        "text": "The coronary sinus returns much of the blood that has supplied the heart muscle itself.",
        "title": "coronary sinus · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "sinus",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "phrase",
          "end": 13.22,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.02.s04",
          "phrase": "coronary sinus",
          "occurrence": 1,
          "firstWordIndex": 34,
          "lastWordIndex": 35
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.02.s05",
        "at": 17.23,
        "text": "This returning blood contains less oxygen than blood leaving the lungs, but it is not completely without oxygen.",
        "title": "This returning blood contains less oxygen than blood leaving the lungs, but it is not completely without oxygen.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 24.0,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.02.s05",
          "firstWordIndex": 48,
          "lastWordIndex": 65
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "248-257;356-359",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_16285c54951c8191be3913e017fc217a"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 248-257;356-359",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.03",
    "module": "M02",
    "title": "Tricuspid valve and right ventricle",
    "text": "Follow blood from the right atrium through the tricuspid valve into the right ventricle. Tricuspid means three cusps. This is an atrioventricular valve, because it lies between an atrium and a ventricle. When ventricular pressure rises, the valve closes and limits backward flow into the atrium. Chordae tendineae and papillary muscles help keep the valve cusps from prolapsing backward during contraction; they do not pull the valve open.",
    "transcript": "Follow blood from the right atrium through the tricuspid valve into the right ventricle. Tricuspid means three cusps. This is an atrioventricular valve, because it lies between an atrium and a ventricle. When ventricular pressure rises, the valve closes and limits backward flow into the atrium. Chordae tendineae and papillary muscles help keep the valve cusps from prolapsing backward during contraction; they do not pull the valve open.",
    "audio": {
      "src": "guided-study/assets/M02_03_adam_multilingual_v2.mp3",
      "duration": 30.119125,
      "sha256": "c526f07d1f4c3a27047d0d6858cc28849b5388c77496f027bd601fc4db3ca890"
    },
    "cues": [
      {
        "id": "M02.03.s01",
        "at": 0.0,
        "text": "Follow blood from the right atrium through the tricuspid valve into the right ventricle.",
        "title": "Follow blood from the right atrium through the tricuspid valve into the right ventricle.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 13
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.p02",
        "at": 2.2,
        "text": "Follow blood from the right atrium through the tricuspid valve into the right ventricle.",
        "title": "tricuspid valve · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "tricuspid",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "tricuspid",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 3.54,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s01",
          "phrase": "tricuspid valve",
          "occurrence": 1,
          "firstWordIndex": 8,
          "lastWordIndex": 9
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.p01",
        "at": 4.02,
        "text": "Follow blood from the right atrium through the tricuspid valve into the right ventricle.",
        "title": "right ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "rv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s01",
          "phrase": "right ventricle",
          "occurrence": 1,
          "firstWordIndex": 12,
          "lastWordIndex": 13
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.s02",
        "at": 5.49,
        "text": "Tricuspid means three cusps.",
        "title": "Tricuspid means three cusps.",
        "scene": {
          "organ": "heart",
          "selected": "tricuspid",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "tricuspid",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 7.55,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s02",
          "firstWordIndex": 14,
          "lastWordIndex": 17
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.s03",
        "at": 8.07,
        "text": "This is an atrioventricular valve, because it lies between an atrium and a ventricle.",
        "title": "This is an atrioventricular valve, because it lies between an atrium and a ventricle.",
        "scene": {
          "organ": "heart",
          "selected": "tricuspid",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "tricuspid",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.81,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s03",
          "firstWordIndex": 18,
          "lastWordIndex": 31
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.s04",
        "at": 14.36,
        "text": "When ventricular pressure rises, the valve closes and limits backward flow into the atrium.",
        "title": "When ventricular pressure rises, the valve closes and limits backward flow into the atrium.",
        "scene": {
          "organ": "heart",
          "selected": "tricuspid",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "right"
          },
          "flowStop": "tricuspid",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 20.37,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s04",
          "firstWordIndex": 32,
          "lastWordIndex": 45
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.s05",
        "at": 20.98,
        "text": "Chordae tendineae and papillary muscles help keep the valve cusps from prolapsing backward during contraction; they do not pull the valve open.",
        "title": "Chordae tendineae and papillary muscles help keep the valve cusps from prolapsing backward during contraction; they do not pull the valve open.",
        "scene": {
          "organ": "heart",
          "selected": "chordae",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "right"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The visible chordae are representative support cords anchored to source papillary tips, not scanned chordae. They restrain prolapse; they do not pull cusps open."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.92,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s05",
          "firstWordIndex": 46,
          "lastWordIndex": 67
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.03.p03",
        "at": 22.18,
        "text": "Chordae tendineae and papillary muscles help keep the valve cusps from prolapsing backward during contraction; they do not pull the valve open.",
        "title": "papillary muscles · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "papillary",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "right"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Chordae are representative support cords connected to source papillary tips; their role is to restrain cusp prolapse, not pull valves open."
        },
        "alignment": {
          "kind": "phrase",
          "end": 23.25,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.03.s05",
          "phrase": "papillary muscles",
          "occurrence": 1,
          "firstWordIndex": 49,
          "lastWordIndex": 50
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Alignment QA flag preserved: “atrioventricular” spans 8.49–9.74 s (1.25 s); listening review is required.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;356-359",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_afe8c298b32c8191b54dc50e64065b77"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 268-283;356-359",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.04",
    "module": "M02",
    "title": "Pulmonary valve and pulmonary arteries",
    "text": "The right ventricle ejects blood through the pulmonary valve into the pulmonary trunk, which branches toward the two lungs. The pulmonary valve is a semilunar valve. Its pocket-like cusps limit backward flow into the ventricle after ejection. Arteries are named for carrying blood away from the heart, not for carrying oxygen-rich blood. The pulmonary arteries are the important example: they carry relatively oxygen-poor blood toward the lungs.",
    "transcript": "The right ventricle ejects blood through the pulmonary valve into the pulmonary trunk, which branches toward the two lungs. The pulmonary valve is a semilunar valve. Its pocket-like cusps limit backward flow into the ventricle after ejection. Arteries are named for carrying blood away from the heart, not for carrying oxygen-rich blood. The pulmonary arteries are the important example: they carry relatively oxygen-poor blood toward the lungs.",
    "audio": {
      "src": "guided-study/assets/M02_04_adam_multilingual_v2.mp3",
      "duration": 31.190188,
      "sha256": "49504a9a48d970e357fad3fd62f8bf7e28c116d0dc2f91f1f95ee945170d2c4e"
    },
    "cues": [
      {
        "id": "M02.04.s01",
        "at": 0.0,
        "text": "The right ventricle ejects blood through the pulmonary valve into the pulmonary trunk, which branches toward the two lungs.",
        "title": "The right ventricle ejects blood through the pulmonary valve into the pulmonary trunk, which branches toward the two lungs.",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "rv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 7.37,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 18
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.04.p01",
        "at": 2.32,
        "text": "The right ventricle ejects blood through the pulmonary valve into the pulmonary trunk, which branches toward the two lungs.",
        "title": "pulmonary valve · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "pulmonary",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "pulmonary",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. This four-chamber view reports the pressure-driven semilunar valve state/flow; both semilunar leaflet surfaces are not exposed here. The separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "phrase",
          "end": 3.42,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s01",
          "phrase": "pulmonary valve",
          "occurrence": 1,
          "firstWordIndex": 7,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.04.p02",
        "at": 3.88,
        "text": "The right ventricle ejects blood through the pulmonary valve into the pulmonary trunk, which branches toward the two lungs.",
        "title": "pulmonary trunk · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "pulmonary-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "phrase",
          "end": 5.05,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s01",
          "phrase": "pulmonary trunk",
          "occurrence": 1,
          "firstWordIndex": 11,
          "lastWordIndex": 12
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.04.s02",
        "at": 7.83,
        "text": "The pulmonary valve is a semilunar valve.",
        "title": "The pulmonary valve is a semilunar valve.",
        "scene": {
          "organ": "heart",
          "selected": "pulmonary",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "pulmonary",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. This four-chamber view reports the pressure-driven semilunar valve state/flow; both semilunar leaflet surfaces are not exposed here. The separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.59,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s02",
          "firstWordIndex": 19,
          "lastWordIndex": 25
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.04.s03",
        "at": 11.01,
        "text": "Its pocket-like cusps limit backward flow into the ventricle after ejection.",
        "title": "Its pocket-like cusps limit backward flow into the ventricle after ejection.",
        "scene": {
          "organ": "heart",
          "selected": "pulmonary",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-relaxation",
            "side": "right"
          },
          "flowStop": "pulmonary",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. This four-chamber view reports the pressure-driven semilunar valve state/flow; both semilunar leaflet surfaces are not exposed here. The separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 16.0,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s03",
          "firstWordIndex": 26,
          "lastWordIndex": 37
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.04.s04",
        "at": 16.58,
        "text": "Arteries are named for carrying blood away from the heart, not for carrying oxygen-rich blood.",
        "title": "Arteries are named for carrying blood away from the heart, not for carrying oxygen-rich blood.",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "pulmonary-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 23.23,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s04",
          "firstWordIndex": 38,
          "lastWordIndex": 53
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.04.s05",
        "at": 23.87,
        "text": "The pulmonary arteries are the important example: they carry relatively oxygen-poor blood toward the lungs.",
        "title": "The pulmonary arteries are the important example: they carry relatively oxygen-poor blood toward the lungs.",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "pulmonary-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 30.72,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.04.s05",
          "firstWordIndex": 54,
          "lastWordIndex": 69
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;340-347;356-359",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_f7b9d91432488191a9eed7741e525c4c"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 268-283;340-347;356-359",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.05",
    "module": "M02",
    "title": "Pulmonary capillaries and return",
    "text": "In the pulmonary capillaries, blood comes close to air inside the alveoli without normally mixing with that air. Oxygen moves into the blood, and carbon dioxide moves toward the alveolar air. The pulmonary veins then return relatively oxygen-rich blood to the left atrium. Usually four pulmonary veins enter the left atrium. A vein carries blood toward the heart, so pulmonary veins remain veins even though their blood is oxygen-rich.",
    "transcript": "In the pulmonary capillaries, blood comes close to air inside the alveoli without normally mixing with that air. Oxygen moves into the blood, and carbon dioxide moves toward the alveolar air. The pulmonary veins then return relatively oxygen-rich blood to the left atrium. Usually four pulmonary veins enter the left atrium. A vein carries blood toward the heart, so pulmonary veins remain veins even though their blood is oxygen-rich.",
    "audio": {
      "src": "guided-study/assets/M02_05_adam_multilingual_v2.mp3",
      "duration": 31.164063,
      "sha256": "b507d69d57670266eae5a95240ec7dddb1a4ea038d72806aa8f2d560471ebd59"
    },
    "cues": [
      {
        "id": "M02.05.s01",
        "at": 0.0,
        "text": "In the pulmonary capillaries, blood comes close to air inside the alveoli without normally mixing with that air.",
        "title": "In the pulmonary capillaries, blood comes close to air inside the alveoli without normally mixing with that air.",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "lung-bed",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The capillary inset is a separate instructional schematic, not gross HRA lung/body microgeometry, measured diffusion or CFD. The original four-chamber source context remains visible."
        },
        "alignment": {
          "kind": "sentence",
          "end": 7.18,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 17
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.s02",
        "at": 7.7,
        "text": "Oxygen moves into the blood, and carbon dioxide moves toward the alveolar air.",
        "title": "Oxygen moves into the blood, and carbon dioxide moves toward the alveolar air.",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "lung-bed",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The capillary inset is a separate instructional schematic, not gross HRA lung/body microgeometry, measured diffusion or CFD. The original four-chamber source context remains visible."
        },
        "alignment": {
          "kind": "sentence",
          "end": 12.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s02",
          "firstWordIndex": 18,
          "lastWordIndex": 30
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.s03",
        "at": 13.51,
        "text": "The pulmonary veins then return relatively oxygen-rich blood to the left atrium.",
        "title": "The pulmonary veins then return relatively oxygen-rich blood to the left atrium.",
        "scene": {
          "organ": "heart",
          "selected": "vein",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "pulmonary-veins",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s03",
          "firstWordIndex": 31,
          "lastWordIndex": 43
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.p01",
        "at": 17.67,
        "text": "The pulmonary veins then return relatively oxygen-rich blood to the left atrium.",
        "title": "left atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 18.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s03",
          "phrase": "left atrium",
          "occurrence": 1,
          "firstWordIndex": 42,
          "lastWordIndex": 43
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.s04",
        "at": 19.14,
        "text": "Usually four pulmonary veins enter the left atrium.",
        "title": "Usually four pulmonary veins enter the left atrium.",
        "scene": {
          "organ": "heart",
          "selected": "vein",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "pulmonary-veins",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. Four pulmonary-vein branches are source anatomy; inlet terminals are authored guides, not independently measured branch flow."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.53,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s04",
          "firstWordIndex": 44,
          "lastWordIndex": 51
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.p03",
        "at": 19.97,
        "text": "Usually four pulmonary veins enter the left atrium.",
        "title": "pulmonary veins · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "vein",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "pulmonary-veins",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "phrase",
          "end": 21.17,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s04",
          "phrase": "pulmonary veins",
          "occurrence": 2,
          "firstWordIndex": 46,
          "lastWordIndex": 47
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.p02",
        "at": 21.54,
        "text": "Usually four pulmonary veins enter the left atrium.",
        "title": "left atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 22.53,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s04",
          "phrase": "left atrium",
          "occurrence": 2,
          "firstWordIndex": 50,
          "lastWordIndex": 51
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.05.s05",
        "at": 23.27,
        "text": "A vein carries blood toward the heart, so pulmonary veins remain veins even though their blood is oxygen-rich.",
        "title": "A vein carries blood toward the heart, so pulmonary veins remain veins even though their blood is oxygen-rich.",
        "scene": {
          "organ": "heart",
          "selected": "vein",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "pulmonary-veins",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 30.41,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.05.s05",
          "firstWordIndex": 52,
          "lastWordIndex": 70
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "340-347;356-359",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_532f41206a448191ba2b2350f19b111a"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 340-347;356-359",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.06",
    "module": "M02",
    "title": "Mitral valve and left ventricle",
    "text": "Blood passes from the left atrium through the mitral valve into the left ventricle. The mitral valve is also called the bicuspid valve because it normally has two cusps. Notice the thicker muscular wall of the left ventricle. It must generate the pressure needed for systemic circulation. Compare wall thickness, not a claim that the left ventricular chamber is always larger. In a steady state, both ventricles pump approximately the same volume per minute.",
    "transcript": "Blood passes from the left atrium through the mitral valve into the left ventricle. The mitral valve is also called the bicuspid valve because it normally has two cusps. Notice the thicker muscular wall of the left ventricle. It must generate the pressure needed for systemic circulation. Compare wall thickness, not a claim that the left ventricular chamber is always larger. In a steady state, both ventricles pump approximately the same volume per minute.",
    "audio": {
      "src": "guided-study/assets/M02_06_adam_multilingual_v2.mp3",
      "duration": 28.029375,
      "sha256": "143a7a31579e45da24a51fccac751d63c47b863191f9b832f4c66e5137abd9b5"
    },
    "cues": [
      {
        "id": "M02.06.s01",
        "at": 0.0,
        "text": "Blood passes from the left atrium through the mitral valve into the left ventricle.",
        "title": "Blood passes from the left atrium through the mitral valve into the left ventricle.",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 13
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.p03",
        "at": 2.34,
        "text": "Blood passes from the left atrium through the mitral valve into the left ventricle.",
        "title": "mitral valve · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "mitral",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "mitral",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 3.3,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s01",
          "phrase": "mitral valve",
          "occurrence": 1,
          "firstWordIndex": 8,
          "lastWordIndex": 9
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.p01",
        "at": 3.68,
        "text": "Blood passes from the left atrium through the mitral valve into the left ventricle.",
        "title": "left ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s01",
          "phrase": "left ventricle",
          "occurrence": 1,
          "firstWordIndex": 12,
          "lastWordIndex": 13
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.s02",
        "at": 5.13,
        "text": "The mitral valve is also called the bicuspid valve because it normally has two cusps.",
        "title": "The mitral valve is also called the bicuspid valve because it normally has two cusps.",
        "scene": {
          "organ": "heart",
          "selected": "mitral",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "mitral",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.29,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s02",
          "firstWordIndex": 14,
          "lastWordIndex": 28
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.s03",
        "at": 10.78,
        "text": "Notice the thicker muscular wall of the left ventricle.",
        "title": "Notice the thicker muscular wall of the left ventricle.",
        "scene": {
          "organ": "heart",
          "selected": "wall",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": true,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Source-derived myocardial walls/cut faces are visible; gold marks exposed tissue, not calibrated thickness. No claim that chamber cavity size measures wall thickness."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s03",
          "firstWordIndex": 29,
          "lastWordIndex": 37
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.p04",
        "at": 11.23,
        "text": "Notice the thicker muscular wall of the left ventricle.",
        "title": "thicker muscular wall · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "wall",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": true,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 12.52,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s03",
          "phrase": "thicker muscular wall",
          "occurrence": 1,
          "firstWordIndex": 31,
          "lastWordIndex": 33
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.p02",
        "at": 12.69,
        "text": "Notice the thicker muscular wall of the left ventricle.",
        "title": "left ventricle · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 13.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s03",
          "phrase": "left ventricle",
          "occurrence": 2,
          "firstWordIndex": 36,
          "lastWordIndex": 37
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.s04",
        "at": 13.96,
        "text": "It must generate the pressure needed for systemic circulation.",
        "title": "It must generate the pressure needed for systemic circulation.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 17.17,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s04",
          "firstWordIndex": 38,
          "lastWordIndex": 46
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.s05",
        "at": 17.8,
        "text": "Compare wall thickness, not a claim that the left ventricular chamber is always larger.",
        "title": "Compare wall thickness, not a claim that the left ventricular chamber is always larger.",
        "scene": {
          "organ": "heart",
          "selected": "wall",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": true,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Source-derived myocardial walls/cut faces are visible; gold marks exposed tissue, not calibrated thickness. No claim that chamber cavity size measures wall thickness."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.98,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s05",
          "firstWordIndex": 47,
          "lastWordIndex": 60
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.06.s06",
        "at": 23.53,
        "text": "In a steady state, both ventricles pump approximately the same volume per minute.",
        "title": "In a steady state, both ventricles pump approximately the same volume per minute.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "cycle",
            "seconds": 0,
            "anchorAudio": 23.53,
            "speed": 0.25
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Compare cycle-mean output, not simultaneous instantaneous left/right flow. The settled model has small timing differences between sides."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.82,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.06.s06",
          "firstWordIndex": 61,
          "lastWordIndex": 73
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "248-257;268-283;356-359",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_c12fb7fdd1c081918c752d0979f9c645"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 248-257;268-283;356-359",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.07",
    "module": "M02",
    "title": "Aortic valve and systemic arteries",
    "text": "The left ventricle ejects blood through the aortic valve into the aorta. From there, arteries branch into smaller arteries and arterioles. Capillary networks bring blood close to tissue cells. After exchange, blood enters venules and veins, eventually returning to the right atrium. The aortic valve is the second semilunar valve. Like the other valves, it opens and closes in response to pressure differences across it.",
    "transcript": "The left ventricle ejects blood through the aortic valve into the aorta. From there, arteries branch into smaller arteries and arterioles. Capillary networks bring blood close to tissue cells. After exchange, blood enters venules and veins, eventually returning to the right atrium. The aortic valve is the second semilunar valve. Like the other valves, it opens and closes in response to pressure differences across it.",
    "audio": {
      "src": "guided-study/assets/M02_07_adam_multilingual_v2.mp3",
      "duration": 27.533063,
      "sha256": "ad47b2d030321f96b740db3dfcec9ff8bed5bc48831fe214910c1155db685b40"
    },
    "cues": [
      {
        "id": "M02.07.s01",
        "at": 0.0,
        "text": "The left ventricle ejects blood through the aortic valve into the aorta.",
        "title": "The left ventricle ejects blood through the aortic valve into the aorta.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 11
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.p02",
        "at": 2.43,
        "text": "The left ventricle ejects blood through the aortic valve into the aorta.",
        "title": "aortic valve · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "aortic",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "aortic",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. This four-chamber view reports the pressure-driven semilunar valve state/flow; both semilunar leaflet surfaces are not exposed here. The separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "phrase",
          "end": 3.4,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s01",
          "phrase": "aortic valve",
          "occurrence": 1,
          "firstWordIndex": 7,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.p03",
        "at": 3.89,
        "text": "The left ventricle ejects blood through the aortic valve into the aorta.",
        "title": "aorta · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "systemic-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s01",
          "phrase": "aorta",
          "occurrence": 1,
          "firstWordIndex": 11,
          "lastWordIndex": 11
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.s02",
        "at": 4.76,
        "text": "From there, arteries branch into smaller arteries and arterioles.",
        "title": "From there, arteries branch into smaller arteries and arterioles.",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "systemic-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The external map summarizes downstream arterial branching; individual body arterioles are not modeled gross surfaces."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.89,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s02",
          "firstWordIndex": 12,
          "lastWordIndex": 20
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.s03",
        "at": 9.4,
        "text": "Capillary networks bring blood close to tissue cells.",
        "title": "Capillary networks bring blood close to tissue cells.",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "systemic-bed",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The capillary inset is a separate instructional schematic, not gross HRA lung/body microgeometry, measured diffusion or CFD. The original four-chamber source context remains visible."
        },
        "alignment": {
          "kind": "sentence",
          "end": 12.4,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s03",
          "firstWordIndex": 21,
          "lastWordIndex": 28
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.s04",
        "at": 12.9,
        "text": "After exchange, blood enters venules and veins, eventually returning to the right atrium.",
        "title": "After exchange, blood enters venules and veins, eventually returning to the right atrium.",
        "scene": {
          "organ": "heart",
          "selected": "ivc",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "venous-return",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.68,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s04",
          "firstWordIndex": 29,
          "lastWordIndex": 41
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.p01",
        "at": 17.83,
        "text": "After exchange, blood enters venules and veins, eventually returning to the right atrium.",
        "title": "right atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 18.68,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s04",
          "phrase": "right atrium",
          "occurrence": 1,
          "firstWordIndex": 40,
          "lastWordIndex": 41
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.s05",
        "at": 19.56,
        "text": "The aortic valve is the second semilunar valve.",
        "title": "The aortic valve is the second semilunar valve.",
        "scene": {
          "organ": "heart",
          "selected": "aortic",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "aortic",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. This four-chamber view reports the pressure-driven semilunar valve state/flow; both semilunar leaflet surfaces are not exposed here. The separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.22,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s05",
          "firstWordIndex": 42,
          "lastWordIndex": 49
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.07.s06",
        "at": 22.75,
        "text": "Like the other valves, it opens and closes in response to pressure differences across it.",
        "title": "Like the other valves, it opens and closes in response to pressure differences across it.",
        "scene": {
          "organ": "heart",
          "selected": "aortic",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "cycle",
            "seconds": 0,
            "anchorAudio": 22.75,
            "speed": 0.25
          },
          "flowStop": "aortic",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. This four-chamber view reports the pressure-driven semilunar valve state/flow; both semilunar leaflet surfaces are not exposed here. The separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.21,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.07.s06",
          "firstWordIndex": 50,
          "lastWordIndex": 64
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;296-309;356-359",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_5f55ecf12220819187690da9f481d99d"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 268-283;296-309;356-359",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.08",
    "module": "M02",
    "title": "Two circuits, one continuous route",
    "text": "The pulmonary and systemic circuits are connected in series. Pulmonary circulation runs from the right ventricle through the lungs to the left atrium. Systemic circulation runs from the left ventricle through the body to the right atrium. The heart's own coronary circulation is part of the systemic circuit. Blood-flow arrows should always follow this route. Red and blue are teaching colors for relative oxygen content; human blood is never actually blue.",
    "transcript": "The pulmonary and systemic circuits are connected in series. Pulmonary circulation runs from the right ventricle through the lungs to the left atrium. Systemic circulation runs from the left ventricle through the body to the right atrium. The heart's own coronary circulation is part of the systemic circuit. Blood-flow arrows should always follow this route. Red and blue are teaching colors for relative oxygen content; human blood is never actually blue.",
    "audio": {
      "src": "guided-study/assets/M02_08_adam_multilingual_v2.mp3",
      "duration": 29.07425,
      "sha256": "03e7ce937e75eb411565fd5dbb00600376cd452e117c0b22406ffd89109a4b3e"
    },
    "cues": [
      {
        "id": "M02.08.s01",
        "at": 0.0,
        "text": "The pulmonary and systemic circuits are connected in series.",
        "title": "The pulmonary and systemic circuits are connected in series.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 3.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.s02",
        "at": 3.74,
        "text": "Pulmonary circulation runs from the right ventricle through the lungs to the left atrium.",
        "title": "Pulmonary circulation runs from the right ventricle through the lungs to the left atrium.",
        "scene": {
          "organ": "heart",
          "selected": "rv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "rv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.84,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s02",
          "firstWordIndex": 9,
          "lastWordIndex": 22
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.p02",
        "at": 7.84,
        "text": "Pulmonary circulation runs from the right ventricle through the lungs to the left atrium.",
        "title": "left atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 8.84,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s02",
          "phrase": "left atrium",
          "occurrence": 1,
          "firstWordIndex": 21,
          "lastWordIndex": 22
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.s03",
        "at": 9.22,
        "text": "Systemic circulation runs from the left ventricle through the body to the right atrium.",
        "title": "Systemic circulation runs from the left ventricle through the body to the right atrium.",
        "scene": {
          "organ": "heart",
          "selected": "lv",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "lv",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.95,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s03",
          "firstWordIndex": 23,
          "lastWordIndex": 36
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.p01",
        "at": 12.97,
        "text": "Systemic circulation runs from the left ventricle through the body to the right atrium.",
        "title": "right atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 13.95,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s03",
          "phrase": "right atrium",
          "occurrence": 1,
          "firstWordIndex": 35,
          "lastWordIndex": 36
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.s04",
        "at": 14.56,
        "text": "The heart's own coronary circulation is part of the systemic circuit.",
        "title": "The heart's own coronary circulation is part of the systemic circuit.",
        "scene": {
          "organ": "heart",
          "selected": "lca",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Named coronary source meshes are retained, but their external surfaces are omitted in this four-chamber section. The selected coronary region is contextual; no measured coronary-flow waveform or diastolic-perfusion solver is displayed."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.51,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s04",
          "firstWordIndex": 37,
          "lastWordIndex": 47
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.s05",
        "at": 19.08,
        "text": "Blood-flow arrows should always follow this route.",
        "title": "Blood-flow arrows should always follow this route.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 21.82,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s05",
          "firstWordIndex": 48,
          "lastWordIndex": 55
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.08.s06",
        "at": 22.29,
        "text": "Red and blue are teaching colors for relative oxygen content; human blood is never actually blue.",
        "title": "Red and blue are teaching colors for relative oxygen content; human blood is never actually blue.",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "lung-bed",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The capillary inset is a separate instructional schematic, not gross HRA lung/body microgeometry, measured diffusion or CFD. The original four-chamber source context remains visible."
        },
        "alignment": {
          "kind": "sentence",
          "end": 28.58,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.08.s06",
          "firstWordIndex": 56,
          "lastWordIndex": 71
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "340-347;356-377",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_d9131461316c8191982a40d91aaf5f87"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 340-347;356-377",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.09",
    "module": "M02",
    "title": "Vessels and their walls",
    "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
    "transcript": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
    "audio": {
      "src": "guided-study/assets/M02_09_adam_multilingual_v2.mp3",
      "duration": 32.444063,
      "sha256": "cc3fe7c770edbc3de833d0beb2b1d5b57b7680d93366c34f8c7885852f71e1cf"
    },
    "cues": [
      {
        "id": "M02.09.s01",
        "at": 0.0,
        "text": "Arteries carry blood away from the heart; veins carry it toward the heart.",
        "title": "Arteries carry blood away from the heart; veins carry it toward the heart.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.2,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 12
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.09.s02",
        "at": 4.76,
        "text": "Arterioles regulate resistance and distribute flow.",
        "title": "Arterioles regulate resistance and distribute flow.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 7.89,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s02",
          "firstWordIndex": 13,
          "lastWordIndex": 18
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.09.s03",
        "at": 8.34,
        "text": "Capillaries are thin exchange vessels.",
        "title": "Capillaries are thin exchange vessels.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s03",
          "firstWordIndex": 19,
          "lastWordIndex": 23
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.09.s04",
        "at": 11.28,
        "text": "Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa.",
        "title": "Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.25,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s04",
          "firstWordIndex": 24,
          "lastWordIndex": 39
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.09.s05",
        "at": 19.32,
        "text": "The lumen is the open space inside.",
        "title": "The lumen is the open space inside.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 21.7,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s05",
          "firstWordIndex": 40,
          "lastWordIndex": 46
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.09.s06",
        "at": 22.03,
        "text": "Vasoconstriction narrows the lumen; vasodilation widens it.",
        "title": "Vasoconstriction narrows the lumen; vasodilation widens it.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 26.05,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s06",
          "firstWordIndex": 47,
          "lastWordIndex": 53
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.09.s07",
        "at": 26.53,
        "text": "Many veins have valves that help limit backward flow, especially in the limbs.",
        "title": "Many veins have valves that help limit backward flow, especially in the limbs.",
        "scene": {
          "organ": "explanation",
          "title": "Vessels and their walls",
          "text": "Arteries carry blood away from the heart; veins carry it toward the heart. Arterioles regulate resistance and distribute flow. Capillaries are thin exchange vessels. Larger vessels have an inner tunica intima, a middle tunica media, and an outer tunica externa. The lumen is the open space inside. Vasoconstriction narrows the lumen; vasodilation widens it. Many veins have valves that help limit backward flow, especially in the limbs.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 31.92,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.09.s07",
          "firstWordIndex": 54,
          "lastWordIndex": 66
        },
        "visualStatus": "supplemental-explanation"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Some narrated microscopic/composition/coronary concepts have text support only; cue details name the limits.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "296-309;322-339",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_e6e101298d24819181622b8c72417693"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 296-309;322-339",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.10",
    "module": "M02",
    "title": "What blood carries",
    "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
    "transcript": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
    "audio": {
      "src": "guided-study/assets/M02_10_adam_multilingual_v2.mp3",
      "duration": 34.168125,
      "sha256": "c101159ed411d6f31824a8ac4db53aa99edcf999823f66505083688c2b08f6cd"
    },
    "cues": [
      {
        "id": "M02.10.s01",
        "at": 0.0,
        "text": "Blood contains plasma and formed elements.",
        "title": "Blood contains plasma and formed elements.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.9,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 5
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.10.s02",
        "at": 3.54,
        "text": "Plasma is the liquid transport medium.",
        "title": "Plasma is the liquid transport medium.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 5.82,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s02",
          "firstWordIndex": 6,
          "lastWordIndex": 11
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.10.s03",
        "at": 6.52,
        "text": "Red blood cells contain hemoglobin, which carries most blood oxygen.",
        "title": "Red blood cells contain hemoglobin, which carries most blood oxygen.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.57,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s03",
          "firstWordIndex": 12,
          "lastWordIndex": 21
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.10.s04",
        "at": 11.18,
        "text": "White blood cells participate in immune defense.",
        "title": "White blood cells participate in immune defense.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 14.06,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s04",
          "firstWordIndex": 22,
          "lastWordIndex": 28
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.10.s05",
        "at": 14.53,
        "text": "Platelets help form clots.",
        "title": "Platelets help form clots.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 16.27,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s05",
          "firstWordIndex": 29,
          "lastWordIndex": 32
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.10.s06",
        "at": 16.74,
        "text": "Carbon dioxide travels in several forms, especially as bicarbonate in plasma.",
        "title": "Carbon dioxide travels in several forms, especially as bicarbonate in plasma.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.07,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s06",
          "firstWordIndex": 33,
          "lastWordIndex": 43
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M02.10.s07",
        "at": 22.71,
        "text": "Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
        "title": "Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
        "scene": {
          "organ": "explanation",
          "title": "What blood carries",
          "text": "Blood contains plasma and formed elements. Plasma is the liquid transport medium. Red blood cells contain hemoglobin, which carries most blood oxygen. White blood cells participate in immune defense. Platelets help form clots. Carbon dioxide travels in several forms, especially as bicarbonate in plasma. Tissue perfusion means blood flowing through tissues; adequate oxygen delivery also depends on the amount of hemoglobin, its oxygen saturation, and the flow reaching those tissues.",
          "source": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 33.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.10.s07",
          "firstWordIndex": 44,
          "lastWordIndex": 69
        },
        "visualStatus": "supplemental-explanation"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Some narrated microscopic/composition/coronary concepts have text support only; cue details name the limits.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "378-387",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_2654064c86948191a1d8dc85ec91cc2c"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 378-387",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.11",
    "module": "M02",
    "title": "Coronary circulation",
    "text": "The heart muscle needs its own blood supply. Coronary arteries branch from the aorta. Major vessels include the right coronary artery and the left coronary artery, which gives rise to the left anterior descending and circumflex arteries. Cardiac veins return much of this blood through the coronary sinus. Left ventricular coronary flow is greatest during diastole, largely because contraction compresses vessels in the ventricular wall. Valve closure is not a switch that turns coronary flow on.",
    "transcript": "The heart muscle needs its own blood supply. Coronary arteries branch from the aorta. Major vessels include the right coronary artery and the left coronary artery, which gives rise to the left anterior descending and circumflex arteries. Cardiac veins return much of this blood through the coronary sinus. Left ventricular coronary flow is greatest during diastole, largely because contraction compresses vessels in the ventricular wall. Valve closure is not a switch that turns coronary flow on.",
    "audio": {
      "src": "guided-study/assets/M02_11_adam_multilingual_v2.mp3",
      "duration": 33.149375,
      "sha256": "08a8f55ac18e39c6a39cac0dedcadf9d8d18cb2d9bdb7a43d62a6e5b22d521b6"
    },
    "cues": [
      {
        "id": "M02.11.s01",
        "at": 0.0,
        "text": "The heart muscle needs its own blood supply.",
        "title": "The heart muscle needs its own blood supply.",
        "scene": {
          "organ": "heart",
          "selected": "wall",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.19,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 7
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.s02",
        "at": 2.67,
        "text": "Coronary arteries branch from the aorta.",
        "title": "Coronary arteries branch from the aorta.",
        "scene": {
          "organ": "heart",
          "selected": "lca",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "sentence",
          "end": 5.18,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s02",
          "firstWordIndex": 8,
          "lastWordIndex": 13
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.p02",
        "at": 4.65,
        "text": "Coronary arteries branch from the aorta.",
        "title": "aorta · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "phrase",
          "end": 5.18,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s02",
          "phrase": "aorta",
          "occurrence": 1,
          "firstWordIndex": 13,
          "lastWordIndex": 13
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.s03",
        "at": 5.73,
        "text": "Major vessels include the right coronary artery and the left coronary artery, which gives rise to the left anterior descending and circumflex arteries.",
        "title": "Major vessels include the right coronary artery and the left coronary artery, which gives rise to the left anterior descending and circumflex arteries.",
        "scene": {
          "organ": "heart",
          "selected": "rca",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "sentence",
          "end": 14.79,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s03",
          "firstWordIndex": 14,
          "lastWordIndex": 36
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.s04",
        "at": 15.28,
        "text": "Cardiac veins return much of this blood through the coronary sinus.",
        "title": "Cardiac veins return much of this blood through the coronary sinus.",
        "scene": {
          "organ": "heart",
          "selected": "sinus",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "sentence",
          "end": 19.45,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s04",
          "firstWordIndex": 37,
          "lastWordIndex": 47
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.p01",
        "at": 18.14,
        "text": "Cardiac veins return much of this blood through the coronary sinus.",
        "title": "coronary sinus · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "sinus",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "phrase",
          "end": 19.45,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s04",
          "phrase": "coronary sinus",
          "occurrence": 1,
          "firstWordIndex": 46,
          "lastWordIndex": 47
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.s05",
        "at": 19.85,
        "text": "Left ventricular coronary flow is greatest during diastole, largely because contraction compresses vessels in the ventricular wall.",
        "title": "Left ventricular coronary flow is greatest during diastole, largely because contraction compresses vessels in the ventricular wall.",
        "scene": {
          "organ": "heart",
          "selected": "wall",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.93,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s05",
          "firstWordIndex": 48,
          "lastWordIndex": 64
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      },
      {
        "id": "M02.11.s06",
        "at": 28.74,
        "text": "Valve closure is not a switch that turns coronary flow on.",
        "title": "Valve closure is not a switch that turns coronary flow on.",
        "scene": {
          "organ": "heart",
          "selected": "aortic",
          "mode": "whole",
          "preset": "front",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "anatomy",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": null,
          "detail": "Original HRA external coronary vessel regions; no coronary flow waveform or capillary transport is computed in this view. Major named source surfaces retain their source location. Branch names and diastolic perfusion are explained in narration; finer coronary physiology remains an explicitly representative separate teaching lesson."
        },
        "alignment": {
          "kind": "sentence",
          "end": 32.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.11.s06",
          "firstWordIndex": 65,
          "lastWordIndex": 75
        },
        "visualStatus": "source-anatomy-with-qualified-physiology"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Some narrated microscopic/composition/coronary concepts have text support only; cue details name the limits.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "348-355",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_deab689f252c8191861aba9118134310"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 348-355",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  },
  {
    "id": "M02.12",
    "module": "M02",
    "title": "Trace the complete route",
    "text": "Now trace a complete circuit yourself. Begin at the right atrium. Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta. Then explain two exceptions to the shortcut that arteries contain oxygen-rich blood and veins contain oxygen-poor blood. Use the actual definitions: away from the heart for arteries, toward the heart for veins.",
    "transcript": "Now trace a complete circuit yourself. Begin at the right atrium. Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta. Then explain two exceptions to the shortcut that arteries contain oxygen-rich blood and veins contain oxygen-poor blood. Use the actual definitions: away from the heart for arteries, toward the heart for veins.",
    "audio": {
      "src": "guided-study/assets/M02_12_adam_multilingual_v2.mp3",
      "duration": 28.656313,
      "sha256": "2abbde222d8448e9d2e815cdb7d57884dab0118dc41a0d6a2c0dde0bf32899ca"
    },
    "cues": [
      {
        "id": "M02.12.s01",
        "at": 0.0,
        "text": "Now trace a complete circuit yourself.",
        "title": "Now trace a complete circuit yourself.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Independent recall: use Explore to move through the full existing itinerary; this cue is not an automatic one-beat circuit animation."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.49,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 5
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.s02",
        "at": 2.8,
        "text": "Begin at the right atrium.",
        "title": "Begin at the right atrium.",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.66,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s02",
          "firstWordIndex": 6,
          "lastWordIndex": 10
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.p01",
        "at": 3.59,
        "text": "Begin at the right atrium.",
        "title": "right atrium · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "ra",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "ra",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.66,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s02",
          "phrase": "right atrium",
          "occurrence": 1,
          "firstWordIndex": 9,
          "lastWordIndex": 10
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.s03",
        "at": 5.0,
        "text": "Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta.",
        "title": "Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta.",
        "scene": {
          "organ": "heart",
          "selected": "tricuspid",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "right"
          },
          "flowStop": "tricuspid",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. Name all valve/chamber stops yourself. Measured phrase cues will next show the separate lung bed, left side and aorta."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.81,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s03",
          "firstWordIndex": 11,
          "lastWordIndex": 28
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.destination.2.lungs",
        "at": 7.43,
        "text": "Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta.",
        "title": "lungs · measured destination",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "lung-bed",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The capillary inset is a separate instructional schematic, not gross HRA lung/body microgeometry, measured diffusion or CFD. The original four-chamber source context remains visible."
        },
        "alignment": {
          "kind": "word",
          "end": 8.06,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s03",
          "word": "lungs",
          "firstWordIndex": 18,
          "lastWordIndex": 18
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.destination.2.left",
        "at": 8.93,
        "text": "Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta.",
        "title": "left · measured destination",
        "scene": {
          "organ": "heart",
          "selected": "la",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "la",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat."
        },
        "alignment": {
          "kind": "word",
          "end": 9.23,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s03",
          "word": "left",
          "firstWordIndex": 22,
          "lastWordIndex": 22
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.p02",
        "at": 11.19,
        "text": "Name each valve and chamber, visit the lungs, return to the left side, and leave through the aorta.",
        "title": "aorta · spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "flowStop": "systemic-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory."
        },
        "alignment": {
          "kind": "phrase",
          "end": 11.81,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s03",
          "phrase": "aorta",
          "occurrence": 1,
          "firstWordIndex": 28,
          "lastWordIndex": 28
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.s04",
        "at": 12.24,
        "text": "Then explain two exceptions to the shortcut that arteries contain oxygen-rich blood and veins contain oxygen-poor blood.",
        "title": "Then explain two exceptions to the shortcut that arteries contain oxygen-rich blood and veins contain oxygen-poor blood.",
        "scene": {
          "organ": "heart",
          "selected": "pa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "flowStop": "pulmonary-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. The paired exceptions are pulmonary arteries carrying relatively oxygen-poor blood and pulmonary veins carrying relatively oxygen-rich blood."
        },
        "alignment": {
          "kind": "sentence",
          "end": 21.48,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s04",
          "firstWordIndex": 29,
          "lastWordIndex": 47
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M02.12.s05",
        "at": 22.17,
        "text": "Use the actual definitions: away from the heart for arteries, toward the heart for veins.",
        "title": "Use the actual definitions: away from the heart for arteries, toward the heart for veins.",
        "scene": {
          "organ": "heart",
          "selected": "aorta",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "off",
          "wallHighlight": false,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "flowStop": "systemic-arteries",
          "detail": "The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat. The selected source-vessel region is linked by its label/flow guide and external circulation map. This four-chamber section omits full gross vessel surfaces; the guide is not a measured lumen trajectory. Compare the circulation map directions. Arteries lead away from the heart; veins return toward it."
        },
        "alignment": {
          "kind": "sentence",
          "end": 28.39,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M02.12.s05",
          "firstWordIndex": 48,
          "lastWordIndex": 62
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M02 narration with machine-measured sentence/phrase cues. Alignment has 10 ms frame granularity, not a ±10 ms accuracy claim; human listening and synchronization review remain pending. The four-chamber HRA section retains all four source chambers and illustrative continuous blood occupancy. Blue/red encode relative oxygen content. The teaching itinerary spans many beats; it is not one blood particle completing a circuit in one heartbeat.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "322-339;356-377",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioLibraryFileId": "libfile_b4dfa9f291788191b59335c8a2a637ec"
    },
    "sourceLabel": "Owner-approved adapted M02 narration · course PDF pp123–137 (chambers, flow, valves),111–114 (wall); original course script lines 322-339;356-377",
    "status": "Audio available; 111 M02 scene bindings checked in cloud Chromium; listening review pending",
    "audioStatus": "Delivered MP3 reused unchanged; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frames; listening QA pending",
    "sourceUrl": "guided-study/assets/M02-provenance.json"
  }
];
 root.GuidedStudyLessons=lessons;
 if(typeof module==='object'&&module.exports)module.exports=lessons;
})(typeof window==='object'?window:globalThis);
