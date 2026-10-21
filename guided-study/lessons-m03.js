/* Existing delivered M03 audio, measured cues and registered teaching scenes.
 * Appends to M02; machine alignment does not establish listening/visual QA. */
(function(root){
 'use strict';
 const lessons=[
  {
    "id": "M03.01",
    "module": "M03",
    "title": "Heart wall and protective sac",
    "text": "Separate the heart wall from the sac around it. The heart wall has three layers: epicardium outside, myocardium in the middle, and endocardium inside. The myocardium provides most of the pumping force. The endocardium lines the chambers and covers the valves. The pericardium surrounds the heart. Its serous layers and small amount of fluid reduce friction. The visceral layer of serous pericardium is also the epicardium.",
    "transcript": "Separate the heart wall from the sac around it. The heart wall has three layers: epicardium outside, myocardium in the middle, and endocardium inside. The myocardium provides most of the pumping force. The endocardium lines the chambers and covers the valves. The pericardium surrounds the heart. Its serous layers and small amount of fluid reduce friction. The visceral layer of serous pericardium is also the epicardium.",
    "audio": {
      "src": "guided-study/assets/M03_01_adam_multilingual_v2.mp3",
      "duration": 27.611375,
      "sha256": "9baedd974a485cfc5dfe44ce7646b79c4387736d8d47409e54a7f44e0c55b377"
    },
    "cues": [
      {
        "id": "M03.01.s01",
        "at": 0,
        "text": "Separate the heart wall from the sac around it.",
        "title": "Separate the heart wall from the sac around it.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "wall",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.23,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.01.s02",
        "at": 2.78,
        "text": "The heart wall has three layers: epicardium outside, myocardium in the middle, and endocardium inside.",
        "title": "The heart wall has three layers: epicardium outside, myocardium in the middle, and endocardium inside.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "wall",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated."
        },
        "alignment": {
          "kind": "sentence",
          "end": 9.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s02",
          "firstWordIndex": 9,
          "lastWordIndex": 23
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.01.s03",
        "at": 10.53,
        "text": "The myocardium provides most of the pumping force.",
        "title": "The myocardium provides most of the pumping force.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "tissue",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.19,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s03",
          "firstWordIndex": 24,
          "lastWordIndex": 31
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.01.s04",
        "at": 13.78,
        "text": "The endocardium lines the chambers and covers the valves.",
        "title": "The endocardium lines the chambers and covers the valves.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "wall",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated. The wall section illustrates lining layers, not scanned valve endocardium."
        },
        "alignment": {
          "kind": "sentence",
          "end": 16.8,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s04",
          "firstWordIndex": 32,
          "lastWordIndex": 40
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.01.s05",
        "at": 17.3,
        "text": "The pericardium surrounds the heart.",
        "title": "The pericardium surrounds the heart.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "pericardium",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated."
        },
        "alignment": {
          "kind": "sentence",
          "end": 19.15,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s05",
          "firstWordIndex": 41,
          "lastWordIndex": 45
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.01.s06",
        "at": 19.43,
        "text": "Its serous layers and small amount of fluid reduce friction.",
        "title": "Its serous layers and small amount of fluid reduce friction.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "pericardium",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.8,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s06",
          "firstWordIndex": 46,
          "lastWordIndex": 55
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.01.s07",
        "at": 23.35,
        "text": "The visceral layer of serous pericardium is also the epicardium.",
        "title": "The visceral layer of serous pericardium is also the epicardium.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "pericardium",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Layer boundaries and pericardial layers are authored teaching sections; epicardium/endocardium/pericardium are not separate segmented HRA surfaces. The layer colors and thicknesses are not calibrated."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.36,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.01.s07",
          "firstWordIndex": 56,
          "lastWordIndex": 65
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology. Existing wall/tissue microviews are representative instructional reconstructions, with the original HRA return context preserved.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "218-247",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 218-247",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.02",
    "module": "M03",
    "title": "Cardiac muscle cells work together",
    "text": "Most cardiomyocytes are working contractile cells; specialized cardiomyocytes initiate and conduct impulses. They are striated, branched cells connected at intercalated discs. Mechanical junctions help cells remain attached during contraction. Gap junctions allow electrical current to pass between neighboring cells. Together, these connections help groups of cells activate and contract in a coordinated way. The heart has intrinsic electrical activity; nerves adjust its behavior rather than commanding every individual heartbeat.",
    "transcript": "Most cardiomyocytes are working contractile cells; specialized cardiomyocytes initiate and conduct impulses. They are striated, branched cells connected at intercalated discs. Mechanical junctions help cells remain attached during contraction. Gap junctions allow electrical current to pass between neighboring cells. Together, these connections help groups of cells activate and contract in a coordinated way. The heart has intrinsic electrical activity; nerves adjust its behavior rather than commanding every individual heartbeat.",
    "audio": {
      "src": "guided-study/assets/M03_02_adam_multilingual_v2.mp3",
      "duration": 37.0155,
      "sha256": "4f5018217c51959a6a53580e007dca24d263fb83515ec5fbcb955316c2fe0c1a"
    },
    "cues": [
      {
        "id": "M03.02.s01",
        "at": 0,
        "text": "Most cardiomyocytes are working contractile cells; specialized cardiomyocytes initiate and conduct impulses.",
        "title": "Most cardiomyocytes are working contractile cells; specialized cardiomyocytes initiate and conduct impulses.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "tissue",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Branching cells and intercalated-disc connections are representative teaching geometry. Gap-junction current and mechanical junction strength are explained, not solved numerically. No neural command is required for each normal beat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.02,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 11
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.02.phrase.1.specialized-cardiomyocytes",
        "at": 3.81,
        "text": "Most cardiomyocytes are working contractile cells; specialized cardiomyocytes initiate and conduct impulses.",
        "title": "specialized cardiomyocytes · measured spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "sa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "pulse",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "electrical",
            "stage": "SA-node"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. The inferred SA region and registered pathway remain on the original heart. Nerves modulate rate; the visible pulse is instructional, not a nerve or measured conduction velocity. The word cue identifies an inferred gross SA region as an example of specialized cardiac tissue; it is not a magnified working-cell view or segmented nodal cell population."
        },
        "alignment": {
          "kind": "phrase",
          "end": 5.76,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s01",
          "phrase": "specialized cardiomyocytes",
          "firstWordIndex": 6,
          "lastWordIndex": 7
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.02.s02",
        "at": 8.45,
        "text": "They are striated, branched cells connected at intercalated discs.",
        "title": "They are striated, branched cells connected at intercalated discs.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "tissue",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Branching cells and intercalated-disc connections are representative teaching geometry. Gap-junction current and mechanical junction strength are explained, not solved numerically. No neural command is required for each normal beat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 12.9,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s02",
          "firstWordIndex": 12,
          "lastWordIndex": 20
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.02.s03",
        "at": 13.37,
        "text": "Mechanical junctions help cells remain attached during contraction.",
        "title": "Mechanical junctions help cells remain attached during contraction.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "tissue",
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Branching cells and intercalated-disc connections are representative teaching geometry. Gap-junction current and mechanical junction strength are explained, not solved numerically. No neural command is required for each normal beat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 17.21,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s03",
          "firstWordIndex": 21,
          "lastWordIndex": 28
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.02.s04",
        "at": 17.8,
        "text": "Gap junctions allow electrical current to pass between neighboring cells.",
        "title": "Gap junctions allow electrical current to pass between neighboring cells.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "tissue",
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Branching cells and intercalated-disc connections are representative teaching geometry. Gap-junction current and mechanical junction strength are explained, not solved numerically. No neural command is required for each normal beat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.3,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s04",
          "firstWordIndex": 29,
          "lastWordIndex": 38
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.02.s05",
        "at": 22.7,
        "text": "Together, these connections help groups of cells activate and contract in a coordinated way.",
        "title": "Together, these connections help groups of cells activate and contract in a coordinated way.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeB",
          "stage": "tissue",
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 22.7,
            "endAudio": 28.47
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an existing representative wall/tissue mechanism, not measured microscopy or literal magnification. The original anatomical source/return view is retained; the main four-chamber display is temporarily replaced by this explicitly labeled scale change. Branching cells and intercalated-disc connections are representative teaching geometry. Gap-junction current and mechanical junction strength are explained, not solved numerically. No neural command is required for each normal beat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 28.47,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s05",
          "firstWordIndex": 39,
          "lastWordIndex": 52
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.02.s06",
        "at": 29.34,
        "text": "The heart has intrinsic electrical activity; nerves adjust its behavior rather than commanding every individual heartbeat.",
        "title": "The heart has intrinsic electrical activity; nerves adjust its behavior rather than commanding every individual heartbeat.",
        "scene": {
          "organ": "heart",
          "selected": "sa",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "pulse",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "electrical",
            "stage": "SA-node"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. The inferred SA region and registered pathway remain on the original heart. Nerves modulate rate; the visible pulse is instructional, not a nerve or measured conduction velocity."
        },
        "alignment": {
          "kind": "sentence",
          "end": 36.78,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.02.s06",
          "firstWordIndex": 53,
          "lastWordIndex": 68
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology. Existing wall/tissue microviews are representative instructional reconstructions, with the original HRA return context preserved. Alignment flags requiring listening review: cardiomyocytes 4.53–5.76 s (1.23 s).",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "218-247",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 218-247",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.03",
    "module": "M03",
    "title": "Filling and atrial systole",
    "text": "Watch ventricular filling. When ventricular pressure falls below atrial pressure, the atrioventricular valves open and blood enters the ventricles. Much filling is passive. The slower middle portion of filling is called diastasis. Near the end of ventricular diastole, atrial contraction adds more blood. This contribution is sometimes called the atrial kick. Its size varies with heart rate, age, and ventricular stiffness, so it is not a fixed percentage for every person or every beat.",
    "transcript": "Watch ventricular filling. When ventricular pressure falls below atrial pressure, the atrioventricular valves open and blood enters the ventricles. Much filling is passive. The slower middle portion of filling is called diastasis. Near the end of ventricular diastole, atrial contraction adds more blood. This contribution is sometimes called the atrial kick. Its size varies with heart rate, age, and ventricular stiffness, so it is not a fixed percentage for every person or every beat.",
    "audio": {
      "src": "guided-study/assets/M03_03_adam_multilingual_v2.mp3",
      "duration": 37.564063,
      "sha256": "d48fe1beee4eb1e095b87a9480eb8ea334751da57c36ecdc3929c88e1be0243d"
    },
    "cues": [
      {
        "id": "M03.03.s01",
        "at": 0,
        "text": "Watch ventricular filling.",
        "title": "Watch ventricular filling.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "sweep": true,
            "anchorAudio": 0,
            "endAudio": 2.17,
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.17,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 2
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.03.s02",
        "at": 2.94,
        "text": "When ventricular pressure falls below atrial pressure, the atrioventricular valves open and blood enters the ventricles.",
        "title": "When ventricular pressure falls below atrial pressure, the atrioventricular valves open and blood enters the ventricles.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "sweep": true,
            "anchorAudio": 2.94,
            "endAudio": 11.34,
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.34,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s02",
          "firstWordIndex": 3,
          "lastWordIndex": 18
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.03.s03",
        "at": 11.74,
        "text": "Much filling is passive.",
        "title": "Much filling is passive.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.26,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s03",
          "firstWordIndex": 19,
          "lastWordIndex": 22
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.03.s04",
        "at": 13.8,
        "text": "The slower middle portion of filling is called diastasis.",
        "title": "The slower middle portion of filling is called diastasis.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This model groups non-atrial filling under passive filling; it does not separately resolve or calibrate a diastasis phase. The slower mid-diastolic interval is explained here, not shown as a distinct model phase."
        },
        "alignment": {
          "kind": "sentence",
          "end": 17.74,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s04",
          "firstWordIndex": 23,
          "lastWordIndex": 31
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.03.s05",
        "at": 18.32,
        "text": "Near the end of ventricular diastole, atrial contraction adds more blood.",
        "title": "Near the end of ventricular diastole, atrial contraction adds more blood.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "atrial-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 18.32,
            "endAudio": 23.58
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 23.58,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s05",
          "firstWordIndex": 32,
          "lastWordIndex": 42
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.03.s06",
        "at": 24.06,
        "text": "This contribution is sometimes called the atrial kick.",
        "title": "This contribution is sometimes called the atrial kick.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "atrial-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.68,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s06",
          "firstWordIndex": 43,
          "lastWordIndex": 50
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.03.s07",
        "at": 28.42,
        "text": "Its size varies with heart rate, age, and ventricular stiffness, so it is not a fixed percentage for every person or every beat.",
        "title": "Its size varies with heart rate, age, and ventricular stiffness, so it is not a fixed percentage for every person or every beat.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "atrial-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. No fixed atrial-kick percentage is encoded or inferred from this geometry."
        },
        "alignment": {
          "kind": "sentence",
          "end": 37.29,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.03.s07",
          "firstWordIndex": 51,
          "lastWordIndex": 73
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology. Alignment flags requiring listening review: atrioventricular 6.66–7.94 s (1.28 s). Diastasis is not separately resolved by the current model; its terminology is explained in text.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;318-339;607-616",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 268-283;318-339;607-616",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.04",
    "module": "M03",
    "title": "Pressure rises before ejection",
    "text": "Next, the ventricles begin to contract. Rising pressure closes the atrioventricular valves. For a brief period, the semilunar valves have not opened yet, so all four valves are closed. Pressure rises while ventricular volume changes very little. This is isovolumetric contraction. The papillary muscles also contract, supporting the closed atrioventricular valves. Remember the sequence: electrical activation starts first; force and pressure develop afterward.",
    "transcript": "Next, the ventricles begin to contract. Rising pressure closes the atrioventricular valves. For a brief period, the semilunar valves have not opened yet, so all four valves are closed. Pressure rises while ventricular volume changes very little. This is isovolumetric contraction. The papillary muscles also contract, supporting the closed atrioventricular valves. Remember the sequence: electrical activation starts first; force and pressure develop afterward.",
    "audio": {
      "src": "guided-study/assets/M03_04_adam_multilingual_v2.mp3",
      "duration": 33.01875,
      "sha256": "6c9673bb9deb09e784915c14e92218d627ea38d9c483d9a199ce9798c436de2a"
    },
    "cues": [
      {
        "id": "M03.04.s01",
        "at": 0,
        "text": "Next, the ventricles begin to contract.",
        "title": "Next, the ventricles begin to contract.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 0,
            "endAudio": 2.59
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.59,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 5
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.s02",
        "at": 3.02,
        "text": "Rising pressure closes the atrioventricular valves.",
        "title": "Rising pressure closes the atrioventricular valves.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 6.55,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s02",
          "firstWordIndex": 6,
          "lastWordIndex": 11
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.s03",
        "at": 6.9,
        "text": "For a brief period, the semilunar valves have not opened yet, so all four valves are closed.",
        "title": "For a brief period, the semilunar valves have not opened yet, so all four valves are closed.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Inspect all four valve readouts at the actual model midpoint where all are closed."
        },
        "alignment": {
          "kind": "sentence",
          "end": 13.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s03",
          "firstWordIndex": 12,
          "lastWordIndex": 28
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.s04",
        "at": 13.8,
        "text": "Pressure rises while ventricular volume changes very little.",
        "title": "Pressure rises while ventricular volume changes very little.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 13.8,
            "endAudio": 17.67
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 17.67,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s04",
          "firstWordIndex": 29,
          "lastWordIndex": 36
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.s05",
        "at": 18.08,
        "text": "This is isovolumetric contraction.",
        "title": "This is isovolumetric contraction.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 20.47,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s05",
          "firstWordIndex": 37,
          "lastWordIndex": 40
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.s06",
        "at": 20.76,
        "text": "The papillary muscles also contract, supporting the closed atrioventricular valves.",
        "title": "The papillary muscles also contract, supporting the closed atrioventricular valves.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Original source papillary muscles and representative chordal supports restrain prolapse; they do not pull valves open."
        },
        "alignment": {
          "kind": "sentence",
          "end": 26.39,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s06",
          "firstWordIndex": 41,
          "lastWordIndex": 50
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.s07",
        "at": 26.79,
        "text": "Remember the sequence: electrical activation starts first; force and pressure develop afterward.",
        "title": "Remember the sequence: electrical activation starts first; force and pressure develop afterward.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. The next two measured phrases compare electrical activation with the later mechanical pressure rise; these are explicit guided inspection times, not a continuous real-time heartbeat."
        },
        "alignment": {
          "kind": "sentence",
          "end": 32.8,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s07",
          "firstWordIndex": 51,
          "lastWordIndex": 62
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.phrase.7.electrical-activation",
        "at": 28.27,
        "text": "Remember the sequence: electrical activation starts first; force and pressure develop afterward.",
        "title": "electrical activation · measured spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "his",
          "mode": "four-chamber",
          "preset": "four-chamber",
          "parameters": {
            "heartRate": 75,
            "bloodVolume": 5000,
            "systemicResistance": 1.05,
            "contractility": 1
          },
          "bloodView": "filled",
          "conductionView": "pulse",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "electrical",
            "stage": "bundle-branches"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. The next two measured phrases compare electrical activation with the later mechanical pressure rise; these are explicit guided inspection times, not a continuous real-time heartbeat. The surface ECG shows ventricular electrical activation before isovolumetric pressure develops; activation is not ejection."
        },
        "alignment": {
          "kind": "phrase",
          "end": 29.47,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s07",
          "phrase": "electrical activation",
          "firstWordIndex": 54,
          "lastWordIndex": 55
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.04.phrase.7.force-and-pressure",
        "at": 30.7,
        "text": "Remember the sequence: electrical activation starts first; force and pressure develop afterward.",
        "title": "force and pressure · measured spoken phrase",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 30.7,
            "endAudio": 32.8
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Mechanical force/pressure follows electrical activation with electromechanical delay; this pulse/phase comparison does not change the solver."
        },
        "alignment": {
          "kind": "phrase",
          "end": 31.58,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.04.s07",
          "phrase": "force and pressure",
          "firstWordIndex": 58,
          "lastWordIndex": 60
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology. Alignment flags requiring listening review: a 7.05–7.08 s (0.03 s).",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;318-339",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 268-283;318-339",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.05",
    "module": "M03",
    "title": "Ventricular ejection",
    "text": "When ventricular pressure exceeds pressure in the pulmonary trunk and aorta, the semilunar valves open. Blood is ejected into the pulmonary and systemic circuits. The atrioventricular valves remain closed during this phase. The two ventricles work against different pressures, but they normally eject similar stroke volumes over time. The heart does not empty completely with each beat; some blood remains in each ventricle after ejection.",
    "transcript": "When ventricular pressure exceeds pressure in the pulmonary trunk and aorta, the semilunar valves open. Blood is ejected into the pulmonary and systemic circuits. The atrioventricular valves remain closed during this phase. The two ventricles work against different pressures, but they normally eject similar stroke volumes over time. The heart does not empty completely with each beat; some blood remains in each ventricle after ejection.",
    "audio": {
      "src": "guided-study/assets/M03_05_adam_multilingual_v2.mp3",
      "duration": 29.257125,
      "sha256": "3a0042710f37a822d24c72214380d09ed00e2e29ba918cffd7f9dc09e161117a"
    },
    "cues": [
      {
        "id": "M03.05.s01",
        "at": 0,
        "text": "When ventricular pressure exceeds pressure in the pulmonary trunk and aorta, the semilunar valves open.",
        "title": "When ventricular pressure exceeds pressure in the pulmonary trunk and aorta, the semilunar valves open.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Both semilunar leaflet surfaces are not exposed in this all-four-chamber section. Their numerical open/closed states and gated local flow remain synchronized; the separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 6.44,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 14
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.05.phrase.1.pulmonary-trunk",
        "at": 2.41,
        "text": "When ventricular pressure exceeds pressure in the pulmonary trunk and aorta, the semilunar valves open.",
        "title": "pulmonary trunk · measured spoken phrase",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Both semilunar leaflet surfaces are not exposed in this all-four-chamber section. Their numerical open/closed states and gated local flow remain synchronized; the separate outflow view is available in Explore. The selected vessel is a verified source region, but complete gross vessel surfaces are omitted from this four-chamber section; pressure readouts and the circulation map provide context."
        },
        "alignment": {
          "kind": "phrase",
          "end": 3.34,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s01",
          "phrase": "pulmonary trunk",
          "firstWordIndex": 7,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.05.phrase.1.aorta",
        "at": 3.5,
        "text": "When ventricular pressure exceeds pressure in the pulmonary trunk and aorta, the semilunar valves open.",
        "title": "aorta · measured spoken phrase",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "right"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Both semilunar leaflet surfaces are not exposed in this all-four-chamber section. Their numerical open/closed states and gated local flow remain synchronized; the separate outflow view is available in Explore. The selected vessel is a verified source region, but complete gross vessel surfaces are omitted from this four-chamber section; pressure readouts and the circulation map provide context."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.14,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s01",
          "phrase": "aorta",
          "firstWordIndex": 10,
          "lastWordIndex": 10
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.05.s02",
        "at": 6.97,
        "text": "Blood is ejected into the pulmonary and systemic circuits.",
        "title": "Blood is ejected into the pulmonary and systemic circuits.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left",
            "sweep": true,
            "anchorAudio": 6.97,
            "endAudio": 10.67
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Ejection proceeds while AV valves remain closed; arterial reservoirs continue feeding peripheral beds between ejections."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.67,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s02",
          "firstWordIndex": 15,
          "lastWordIndex": 23
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.05.s03",
        "at": 11.09,
        "text": "The atrioventricular valves remain closed during this phase.",
        "title": "The atrioventricular valves remain closed during this phase.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 15.23,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s03",
          "firstWordIndex": 24,
          "lastWordIndex": 31
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.05.s04",
        "at": 15.65,
        "text": "The two ventricles work against different pressures, but they normally eject similar stroke volumes over time.",
        "title": "The two ventricles work against different pressures, but they normally eject similar stroke volumes over time.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Compare settled cycle stroke volumes, not identical instantaneous left/right pressures or flows."
        },
        "alignment": {
          "kind": "sentence",
          "end": 21.83,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s04",
          "firstWordIndex": 32,
          "lastWordIndex": 47
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.05.s05",
        "at": 22.57,
        "text": "The heart does not empty completely with each beat; some blood remains in each ventricle after ejection.",
        "title": "The heart does not empty completely with each beat; some blood remains in each ventricle after ejection.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-relaxation",
            "side": "right"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Continuous occupancy remains in both ventricular cavities after ejection; the numerical ESV is not zero. The reconstructed section is not a free liquid surface."
        },
        "alignment": {
          "kind": "sentence",
          "end": 28.97,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.05.s05",
          "firstWordIndex": 48,
          "lastWordIndex": 64
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;318-339",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 268-283;318-339",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.06",
    "module": "M03",
    "title": "Relaxation and the next cycle",
    "text": "As ventricular muscle relaxes, pressure falls and the semilunar valves close. During isovolumetric relaxation, all valves are briefly closed again. Once ventricular pressure falls below atrial pressure, the atrioventricular valves reopen and filling resumes. Systole refers to contraction; diastole to relaxation and filling. These terms describe mechanical events. An E C G is an electrical recording, so its waves are related to, but not identical with, these phases.",
    "transcript": "As ventricular muscle relaxes, pressure falls and the semilunar valves close. During isovolumetric relaxation, all valves are briefly closed again. Once ventricular pressure falls below atrial pressure, the atrioventricular valves reopen and filling resumes. Systole refers to contraction; diastole to relaxation and filling. These terms describe mechanical events. An E C G is an electrical recording, so its waves are related to, but not identical with, these phases.",
    "audio": {
      "src": "guided-study/assets/M03_06_adam_multilingual_v2.mp3",
      "duration": 37.564063,
      "sha256": "524bcfa144629999d9589d67487fd27d0727b37772a2af61b6581f7290091588"
    },
    "cues": [
      {
        "id": "M03.06.s01",
        "at": 0,
        "text": "As ventricular muscle relaxes, pressure falls and the semilunar valves close.",
        "title": "As ventricular muscle relaxes, pressure falls and the semilunar valves close.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-relaxation",
            "side": "right",
            "sweep": true,
            "anchorAudio": 0,
            "endAudio": 5.88
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Both semilunar leaflet surfaces are not exposed in this all-four-chamber section. Their numerical open/closed states and gated local flow remain synchronized; the separate outflow view is available in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 5.88,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 10
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.06.s02",
        "at": 6.59,
        "text": "During isovolumetric relaxation, all valves are briefly closed again.",
        "title": "During isovolumetric relaxation, all valves are briefly closed again.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-relaxation",
            "side": "right"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. The selected right-side isovolumetric-relaxation interval keeps all four numerical valves closed at the default lesson parameters."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.98,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s02",
          "firstWordIndex": 11,
          "lastWordIndex": 19
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.06.s03",
        "at": 12.73,
        "text": "Once ventricular pressure falls below atrial pressure, the atrioventricular valves reopen and filling resumes.",
        "title": "Once ventricular pressure falls below atrial pressure, the atrioventricular valves reopen and filling resumes.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "sweep": true,
            "anchorAudio": 12.73,
            "endAudio": 20.54,
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 20.54,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s03",
          "firstWordIndex": 20,
          "lastWordIndex": 33
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.06.s04",
        "at": 21.47,
        "text": "Systole refers to contraction; diastole to relaxation and filling.",
        "title": "Systole refers to contraction; diastole to relaxation and filling.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 26.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s04",
          "firstWordIndex": 34,
          "lastWordIndex": 42
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.06.phrase.4.diastole",
        "at": 23.98,
        "text": "Systole refers to contraction; diastole to relaxation and filling.",
        "title": "diastole · measured spoken phrase",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Diastole includes relaxation and ventricular filling; it is not identical to one ECG wave."
        },
        "alignment": {
          "kind": "phrase",
          "end": 24.67,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s04",
          "phrase": "diastole",
          "firstWordIndex": 38,
          "lastWordIndex": 38
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.06.s05",
        "at": 27.2,
        "text": "These terms describe mechanical events.",
        "title": "These terms describe mechanical events.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-relaxation",
            "side": "right"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.53,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s05",
          "firstWordIndex": 43,
          "lastWordIndex": 47
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.06.s06",
        "at": 30.17,
        "text": "An E C G is an electrical recording, so its waves are related to, but not identical with, these phases.",
        "title": "An E C G is an electrical recording, so its waves are related to, but not identical with, these phases.",
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
          "conductionView": "pulse",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "electrical",
            "stage": "ventricular-repolarization"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. This is an electrical-stage inspection. The current mechanical phase is displayed independently; the ECG trace is not a pressure waveform or a single-cell membrane trace."
        },
        "alignment": {
          "kind": "sentence",
          "end": 37.33,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.06.s06",
          "firstWordIndex": 48,
          "lastWordIndex": 67
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "268-283;318-339",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 268-283;318-339",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.07",
    "module": "M03",
    "title": "Rate, stroke volume, and output",
    "text": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
    "transcript": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
    "audio": {
      "src": "guided-study/assets/M03_07_adam_multilingual_v2.mp3",
      "duration": 28.604063,
      "sha256": "3b3cf4348f7b09ef1a408727e93f68679665eba8578ef59913b1230c737590ae"
    },
    "cues": [
      {
        "id": "M03.07.s01",
        "at": 0,
        "text": "Heart rate is beats per minute.",
        "title": "Heart rate is beats per minute.",
        "scene": {
          "organ": "explanation",
          "title": "Rate, stroke volume, and output",
          "text": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267;318-321;378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 1.29,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.07.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 5
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M03.07.s02",
        "at": 1.58,
        "text": "Stroke volume is the volume ejected by one ventricle per beat.",
        "title": "Stroke volume is the volume ejected by one ventricle per beat.",
        "scene": {
          "organ": "explanation",
          "title": "Rate, stroke volume, and output",
          "text": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267;318-321;378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 5.05,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.07.s02",
          "firstWordIndex": 6,
          "lastWordIndex": 16
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M03.07.s03",
        "at": 5.41,
        "text": "Cardiac output is heart rate multiplied by stroke volume.",
        "title": "Cardiac output is heart rate multiplied by stroke volume.",
        "scene": {
          "organ": "explanation",
          "title": "Rate, stroke volume, and output",
          "text": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267;318-321;378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.79,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.07.s03",
          "firstWordIndex": 17,
          "lastWordIndex": 25
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M03.07.s04",
        "at": 9.09,
        "text": "For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute.",
        "title": "For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute.",
        "scene": {
          "organ": "explanation",
          "title": "Rate, stroke volume, and output",
          "text": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267;318-321;378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.98,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.07.s04",
          "firstWordIndex": 26,
          "lastWordIndex": 51
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M03.07.s05",
        "at": 19.51,
        "text": "A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
        "title": "A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
        "scene": {
          "organ": "explanation",
          "title": "Rate, stroke volume, and output",
          "text": "Heart rate is beats per minute. Stroke volume is the volume ejected by one ventricle per beat. Cardiac output is heart rate multiplied by stroke volume. For example, seventy beats per minute times seventy milliliters per beat equals four thousand nine hundred milliliters per minute, or four point nine liters per minute. A resting adult output around four to eight liters per minute is a broad teaching reference, not a result predicted from an E C G alone.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267;318-321;378-387",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.91,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.07.s05",
          "firstWordIndex": 52,
          "lastWordIndex": 77
        },
        "visualStatus": "supplemental-explanation"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology. Alignment flags requiring listening review: a 25.2–25.23 s (0.03 s). The 70×70=4,900 mL/min=4.9 L/min worked example is independent of the current default model outputs.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "258-267;318-321;378-387",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 258-267;318-321;378-387",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.08",
    "module": "M03",
    "title": "Preload, afterload, and ejection fraction",
    "text": "Stroke volume depends partly on preload, afterload, and contractility. Preload relates to ventricular filling and muscle stretch before contraction. Afterload is the load the ventricle must overcome to eject blood. Contractility is the muscle's intrinsic ability to develop force. Ejection fraction is stroke volume divided by end-diastolic volume. A commonly used left ventricular reference range is about fifty-five to seventy percent. It is not the percentage of all blood in the body pumped per beat.",
    "transcript": "Stroke volume depends partly on preload, afterload, and contractility. Preload relates to ventricular filling and muscle stretch before contraction. Afterload is the load the ventricle must overcome to eject blood. Contractility is the muscle's intrinsic ability to develop force. Ejection fraction is stroke volume divided by end-diastolic volume. A commonly used left ventricular reference range is about fifty-five to seventy percent. It is not the percentage of all blood in the body pumped per beat.",
    "audio": {
      "src": "guided-study/assets/M03_08_adam_multilingual_v2.mp3",
      "duration": 36.022813,
      "sha256": "c22009951063f67997b4a361e2efb0bd8e68d75a7f32028545c8652684c63712"
    },
    "cues": [
      {
        "id": "M03.08.s01",
        "at": 0,
        "text": "Stroke volume depends partly on preload, afterload, and contractility.",
        "title": "Stroke volume depends partly on preload, afterload, and contractility.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Preload, afterload and contractility are distinct influences. These concepts are explained without changing the model inputs mid-sentence."
        },
        "alignment": {
          "kind": "sentence",
          "end": 5.2,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 8
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.08.s02",
        "at": 5.8,
        "text": "Preload relates to ventricular filling and muscle stretch before contraction.",
        "title": "Preload relates to ventricular filling and muscle stretch before contraction.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "sweep": true,
            "anchorAudio": 5.8,
            "endAudio": 10.18,
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Preload relates to filling/stretch before contraction; displayed cavity volume and authored deformation are not a complete preload measurement."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.18,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s02",
          "firstWordIndex": 9,
          "lastWordIndex": 18
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.08.s03",
        "at": 10.72,
        "text": "Afterload is the load the ventricle must overcome to eject blood.",
        "title": "Afterload is the load the ventricle must overcome to eject blood.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Both semilunar leaflet surfaces are not exposed in this all-four-chamber section. Their numerical open/closed states and gated local flow remain synchronized; the separate outflow view is available in Explore. The model systemic resistance is one afterload-related property, not the entire physiological definition."
        },
        "alignment": {
          "kind": "sentence",
          "end": 14.53,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s03",
          "firstWordIndex": 19,
          "lastWordIndex": 29
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.08.s04",
        "at": 15,
        "text": "Contractility is the muscle's intrinsic ability to develop force.",
        "title": "Contractility is the muscle's intrinsic ability to develop force.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 15,
            "endAudio": 19.11
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Contractility is force-generating ability; the illustrative wall does not measure a patient-specific contractile state."
        },
        "alignment": {
          "kind": "sentence",
          "end": 19.11,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s04",
          "firstWordIndex": 30,
          "lastWordIndex": 38
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.08.s05",
        "at": 19.99,
        "text": "Ejection fraction is stroke volume divided by end-diastolic volume.",
        "title": "Ejection fraction is stroke volume divided by end-diastolic volume.",
        "scene": {
          "organ": "explanation",
          "title": "Preload, afterload, and ejection fraction",
          "text": "Stroke volume depends partly on preload, afterload, and contractility. Preload relates to ventricular filling and muscle stretch before contraction. Afterload is the load the ventricle must overcome to eject blood. Contractility is the muscle's intrinsic ability to develop force. Ejection fraction is stroke volume divided by end-diastolic volume. A commonly used left ventricular reference range is about fifty-five to seventy percent. It is not the percentage of all blood in the body pumped per beat.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 24.8,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s05",
          "firstWordIndex": 39,
          "lastWordIndex": 48
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M03.08.s06",
        "at": 25.54,
        "text": "A commonly used left ventricular reference range is about fifty-five to seventy percent.",
        "title": "A commonly used left ventricular reference range is about fifty-five to seventy percent.",
        "scene": {
          "organ": "explanation",
          "title": "Preload, afterload, and ejection fraction",
          "text": "Stroke volume depends partly on preload, afterload, and contractility. Preload relates to ventricular filling and muscle stretch before contraction. Afterload is the load the ventricle must overcome to eject blood. Contractility is the muscle's intrinsic ability to develop force. Ejection fraction is stroke volume divided by end-diastolic volume. A commonly used left ventricular reference range is about fifty-five to seventy percent. It is not the percentage of all blood in the body pumped per beat.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 31.3,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s06",
          "firstWordIndex": 49,
          "lastWordIndex": 62
        },
        "visualStatus": "supplemental-explanation"
      },
      {
        "id": "M03.08.s07",
        "at": 31.94,
        "text": "It is not the percentage of all blood in the body pumped per beat.",
        "title": "It is not the percentage of all blood in the body pumped per beat.",
        "scene": {
          "organ": "explanation",
          "title": "Preload, afterload, and ejection fraction",
          "text": "Stroke volume depends partly on preload, afterload, and contractility. Preload relates to ventricular filling and muscle stretch before contraction. Afterload is the load the ventricle must overcome to eject blood. Contractility is the muscle's intrinsic ability to develop force. Ejection fraction is stroke volume divided by end-diastolic volume. A commonly used left ventricular reference range is about fifty-five to seventy percent. It is not the percentage of all blood in the body pumped per beat.",
          "source": "Owner-approved adapted M03 narration · original course script lines 258-267",
          "qualification": "Supplemental course explanation. No vessel-wall, blood-cell, measurement or treatment simulation is claimed by this card. The worked arithmetic/reference values are teaching examples, separate from the numerical heart model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 35.43,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.08.s07",
          "firstWordIndex": 63,
          "lastWordIndex": 76
        },
        "visualStatus": "supplemental-explanation"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "258-267",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 258-267",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  },
  {
    "id": "M03.09",
    "module": "M03",
    "title": "Pressure and mechanical checkpoint",
    "text": "Check the pump before moving to electricity. Which valves are open during ventricular ejection? Which are open during most ventricular filling? What happens to cardiac output if rate changes but stroke volume also changes? Blood pressure reflects interactions among cardiac output, vascular resistance, and other factors. A normal-looking rhythm does not prove normal pressure, normal ejection fraction, or adequate tissue perfusion.",
    "transcript": "Check the pump before moving to electricity. Which valves are open during ventricular ejection? Which are open during most ventricular filling? What happens to cardiac output if rate changes but stroke volume also changes? Blood pressure reflects interactions among cardiac output, vascular resistance, and other factors. A normal-looking rhythm does not prove normal pressure, normal ejection fraction, or adequate tissue perfusion.",
    "audio": {
      "src": "guided-study/assets/M03_09_adam_multilingual_v2.mp3",
      "duration": 31.242438,
      "sha256": "c3c635a36520f2959e5644a6c7694bdfa9bbf6e3023b8ad246a20f176c96f125"
    },
    "cues": [
      {
        "id": "M03.09.s01",
        "at": 0,
        "text": "Check the pump before moving to electricity.",
        "title": "Check the pump before moving to electricity.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 2.65,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.09.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 6
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.09.s02",
        "at": 3.17,
        "text": "Which valves are open during ventricular ejection?",
        "title": "Which valves are open during ventricular ejection?",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 6.16,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.09.s02",
          "firstWordIndex": 7,
          "lastWordIndex": 13
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.09.s03",
        "at": 6.65,
        "text": "Which are open during most ventricular filling?",
        "title": "Which are open during most ventricular filling?",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "passive-filling",
            "side": "left",
            "occurrence": "last"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ."
        },
        "alignment": {
          "kind": "sentence",
          "end": 9.49,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.09.s03",
          "firstWordIndex": 14,
          "lastWordIndex": 20
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.09.s04",
        "at": 10.13,
        "text": "What happens to cardiac output if rate changes but stroke volume also changes?",
        "title": "What happens to cardiac output if rate changes but stroke volume also changes?",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. Changing rate can change SV; cardiac output cannot be inferred from rate alone. Try the existing mechanics laboratory in Explore."
        },
        "alignment": {
          "kind": "sentence",
          "end": 15.89,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.09.s04",
          "firstWordIndex": 21,
          "lastWordIndex": 33
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.09.s05",
        "at": 16.4,
        "text": "Blood pressure reflects interactions among cardiac output, vascular resistance, and other factors.",
        "title": "Blood pressure reflects interactions among cardiac output, vascular resistance, and other factors.",
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
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. The displayed pressure is one model result, not a prediction from ECG morphology. Arterial source geometry is summarized in the external map in this section."
        },
        "alignment": {
          "kind": "sentence",
          "end": 23.12,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.09.s05",
          "firstWordIndex": 34,
          "lastWordIndex": 45
        },
        "visualStatus": "model-binding"
      },
      {
        "id": "M03.09.s06",
        "at": 23.66,
        "text": "A normal-looking rhythm does not prove normal pressure, normal ejection fraction, or adequate tissue perfusion.",
        "title": "A normal-looking rhythm does not prove normal pressure, normal ejection fraction, or adequate tissue perfusion.",
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
          "conductionView": "pulse",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": null,
          "stage": null,
          "simulation": {
            "kind": "electrical",
            "stage": "ventricular-plateau"
          },
          "detail": "Teaching time follows narration, not real-time clinical monitoring. The original four-chamber HRA source and continuous residual blood are retained in pumping views; geometry/deformation and blood occupancy are instructional, not measured patient mechanics or lumen CFD. Side-specific pressure/valve states share one numerical model; left/right event times can differ. A normal-looking rhythm does not establish normal blood pressure, EF or oxygen delivery. This instructional model is not a clinical predictor."
        },
        "alignment": {
          "kind": "sentence",
          "end": 31,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M03.09.s06",
          "firstWordIndex": 46,
          "lastWordIndex": 61
        },
        "visualStatus": "model-binding"
      }
    ],
    "qualification": "Existing M03 narration with source-bound measured sentence/phrase cues. Machine alignment uses 10 ms frames; this is granularity, not a ±10 ms accuracy claim. Human listening, pronunciation and native visual synchronization review remain pending. Phase sweeps stretch an actual model phase across the measured spoken interval, clamp before its boundary and stop with audio; they are instructional time, not real-time or measured physiology.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "258-267;318-339;234-247",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_c9b86de152a481919d5b9cc6dbadb45f"
    },
    "sourceLabel": "Owner-approved adapted M03 narration · original course script lines 258-267;318-339;234-247",
    "sourceUrl": "guided-study/assets/M03-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Existing delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured 10 ms frame grid; human listening QA pending"
  }
];
 const existing=Array.isArray(root.GuidedStudyLessons)?root.GuidedStudyLessons:[];
 const present=new Set(existing.map(lesson=>lesson.id));
 root.GuidedStudyLessons=existing.concat(lessons.filter(lesson=>!present.has(lesson.id)));
 if(typeof module==='object'&&module.exports)module.exports=lessons;
})(typeof window==='object'?window:globalThis);
