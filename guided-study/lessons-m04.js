/* Delivered M04 conduction/cell lessons; exact audio, measured cues.
 * Appends to earlier modules; machine alignment is not listening/visual QA. */
(function(root){
 'use strict';
 const lessons=[
  {
    "id": "M04.01",
    "module": "M04",
    "title": "Conduction on the same heart",
    "text": "Now keep the same anatomical heart and follow its electrical pathway. Specialized cells initiate and conduct impulses, and working muscle cells produce force. Automaticity is spontaneous impulse generation. Excitability is responding to a stimulus. Conductivity is transmitting electrical activity. Contractility is developing force. These properties are related but not interchangeable. Electrical activation organizes the sequence of contraction; it does not by itself prove that the heart is pumping effectively.",
    "transcript": "Now keep the same anatomical heart and follow its electrical pathway. Specialized cells initiate and conduct impulses, and working muscle cells produce force. Automaticity is spontaneous impulse generation. Excitability is responding to a stimulus. Conductivity is transmitting electrical activity. Contractility is developing force. These properties are related but not interchangeable. Electrical activation organizes the sequence of contraction; it does not by itself prove that the heart is pumping effectively.",
    "audio": {
      "src": "guided-study/assets/M04_01_adam_multilingual_v2.mp3",
      "duration": 37.8775,
      "sha256": "f3da8d663b59db1f4012decedd1afc82bc604c23d2c8ec38a01745a449c893b2"
    },
    "cues": [
      {
        "id": "M04.01.s01",
        "at": 0,
        "text": "Now keep the same anatomical heart and follow its electrical pathway.",
        "title": "Now keep the same anatomical heart and follow its electrical pathway.",
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
            "kind": "cycle",
            "seconds": 0,
            "speed": 0.1,
            "anchorAudio": 0
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.74,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 10
        }
      },
      {
        "id": "M04.01.s02",
        "at": 5.25,
        "text": "Specialized cells initiate and conduct impulses, and working muscle cells produce force.",
        "title": "Specialized cells initiate and conduct impulses, and working muscle cells produce force.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.66,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s02",
          "firstWordIndex": 11,
          "lastWordIndex": 22
        }
      },
      {
        "id": "M04.01.phrase.2.working-muscle-cells",
        "at": 9.49,
        "text": "Specialized cells initiate and conduct impulses, and working muscle cells produce force.",
        "title": "working muscle cells · measured spoken phrase",
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
          "conductionView": "pulse",
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
            "anchorAudio": 9.49,
            "endAudio": 11.66
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "phrase",
          "end": 10.65,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s02",
          "phrase": "working muscle cells",
          "firstWordIndex": 18,
          "lastWordIndex": 20
        }
      },
      {
        "id": "M04.01.s03",
        "at": 12.3,
        "text": "Automaticity is spontaneous impulse generation.",
        "title": "Automaticity is spontaneous impulse generation.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 15.56,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s03",
          "firstWordIndex": 23,
          "lastWordIndex": 27
        }
      },
      {
        "id": "M04.01.s04",
        "at": 16.12,
        "text": "Excitability is responding to a stimulus.",
        "title": "Excitability is responding to a stimulus.",
        "scene": {
          "organ": "explanation",
          "title": "Excitability: stimulus response",
          "text": "Excitability is responding to a stimulus.",
          "source": "Owner-approved adapted M04 narration · source script lines 388-401",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.92,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s04",
          "firstWordIndex": 28,
          "lastWordIndex": 33
        }
      },
      {
        "id": "M04.01.s05",
        "at": 19.39,
        "text": "Conductivity is transmitting electrical activity.",
        "title": "Conductivity is transmitting electrical activity.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.49,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s05",
          "firstWordIndex": 34,
          "lastWordIndex": 38
        }
      },
      {
        "id": "M04.01.s06",
        "at": 22.82,
        "text": "Contractility is developing force.",
        "title": "Contractility is developing force.",
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
          "conductionView": "pulse",
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
            "anchorAudio": 22.82,
            "endAudio": 25.35
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 25.35,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s06",
          "firstWordIndex": 39,
          "lastWordIndex": 42
        }
      },
      {
        "id": "M04.01.s07",
        "at": 25.8,
        "text": "These properties are related but not interchangeable.",
        "title": "These properties are related but not interchangeable.",
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
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 28.63,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s07",
          "firstWordIndex": 43,
          "lastWordIndex": 49
        }
      },
      {
        "id": "M04.01.s08",
        "at": 29.13,
        "text": "Electrical activation organizes the sequence of contraction; it does not by itself prove that the heart is pumping effectively.",
        "title": "Electrical activation organizes the sequence of contraction; it does not by itself prove that the heart is pumping effectively.",
        "scene": {
          "organ": "heart",
          "selected": "purkinje",
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
            "stage": "Purkinje-myocardium"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. The current electrical-stage view does not establish adequate mechanical output or perfusion."
        },
        "alignment": {
          "kind": "sentence",
          "end": 37.09,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.01.s08",
          "firstWordIndex": 50,
          "lastWordIndex": 68
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "388-401",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 388-401",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.02",
    "module": "M04",
    "title": "The sinoatrial node",
    "text": "Find the sinoatrial node, or S A node, high in the right atrium near the superior vena cava. It is normally the dominant pacemaker. Its cells depolarize spontaneously, and activity spreads through the atrial muscle. A usual resting adult sinus rate is sixty to one hundred beats per minute. This is a clinical teaching range, not a claim that every healthy person's resting rate must fall inside it.",
    "transcript": "Find the sinoatrial node, or S A node, high in the right atrium near the superior vena cava. It is normally the dominant pacemaker. Its cells depolarize spontaneously, and activity spreads through the atrial muscle. A usual resting adult sinus rate is sixty to one hundred beats per minute. This is a clinical teaching range, not a claim that every healthy person's resting rate must fall inside it.",
    "audio": {
      "src": "guided-study/assets/M04_02_adam_multilingual_v2.mp3",
      "duration": 27.89875,
      "sha256": "6ff64b30952b30aa15e6e602af245cd43383b6fb38133dc2e32646e24935e5c2"
    },
    "cues": [
      {
        "id": "M04.02.s01",
        "at": 0,
        "text": "Find the sinoatrial node, or S A node, high in the right atrium near the superior vena cava.",
        "title": "Find the sinoatrial node, or S A node, high in the right atrium near the superior vena cava.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 6.8,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.02.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 17
        }
      },
      {
        "id": "M04.02.s02",
        "at": 7.26,
        "text": "It is normally the dominant pacemaker.",
        "title": "It is normally the dominant pacemaker.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 9.45,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.02.s02",
          "firstWordIndex": 18,
          "lastWordIndex": 23
        }
      },
      {
        "id": "M04.02.s03",
        "at": 9.84,
        "text": "Its cells depolarize spontaneously, and activity spreads through the atrial muscle.",
        "title": "Its cells depolarize spontaneously, and activity spreads through the atrial muscle.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 15.34,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.02.s03",
          "firstWordIndex": 24,
          "lastWordIndex": 34
        }
      },
      {
        "id": "M04.02.phrase.3.activity-spreads",
        "at": 12.88,
        "text": "Its cells depolarize spontaneously, and activity spreads through the atrial muscle.",
        "title": "activity spreads · measured spoken phrase",
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
            "stage": "atrial-propagation"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "phrase",
          "end": 13.93,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.02.s03",
          "phrase": "activity spreads",
          "firstWordIndex": 29,
          "lastWordIndex": 30
        }
      },
      {
        "id": "M04.02.s04",
        "at": 15.73,
        "text": "A usual resting adult sinus rate is sixty to one hundred beats per minute.",
        "title": "A usual resting adult sinus rate is sixty to one hundred beats per minute.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. The normal lesson uses 75 beats/min; the stated 60–100 range is a clinical teaching reference and allows individual variation."
        },
        "alignment": {
          "kind": "sentence",
          "end": 20.31,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.02.s04",
          "firstWordIndex": 35,
          "lastWordIndex": 48
        }
      },
      {
        "id": "M04.02.s05",
        "at": 21.13,
        "text": "This is a clinical teaching range, not a claim that every healthy person's resting rate must fall inside it.",
        "title": "This is a clinical teaching range, not a claim that every healthy person's resting rate must fall inside it.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. The rate range is educational, not an individual diagnosis or a restriction on every healthy resting rate."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.27,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.02.s05",
          "firstWordIndex": 49,
          "lastWordIndex": 67
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "388-401",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 388-401",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.03",
    "module": "M04",
    "title": "Atrial spread and AV delay",
    "text": "The impulse spreads across both atria and reaches the atrioventricular node, or A V node. Conduction slows substantially here. This delay helps coordinate atrial activation with ventricular activation, giving the ventricles time to fill before they contract. Do not spread this delay evenly along the whole pathway. After the A V node, the specialized ventricular conduction system is designed for rapid conduction.",
    "transcript": "The impulse spreads across both atria and reaches the atrioventricular node, or A V node. Conduction slows substantially here. This delay helps coordinate atrial activation with ventricular activation, giving the ventricles time to fill before they contract. Do not spread this delay evenly along the whole pathway. After the A V node, the specialized ventricular conduction system is designed for rapid conduction.",
    "audio": {
      "src": "guided-study/assets/M04_03_adam_multilingual_v2.mp3",
      "duration": 29.570563,
      "sha256": "548558f3fb827cce7e4330c193dcbbe1fe7a6825fea3b4b012d4340b3d534655"
    },
    "cues": [
      {
        "id": "M04.03.s01",
        "at": 0,
        "text": "The impulse spreads across both atria and reaches the atrioventricular node, or A V node.",
        "title": "The impulse spreads across both atria and reaches the atrioventricular node, or A V node.",
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
            "stage": "atrial-propagation"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 6.88,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 14
        }
      },
      {
        "id": "M04.03.phrase.1.atrioventricular-node",
        "at": 3.6,
        "text": "The impulse spreads across both atria and reaches the atrioventricular node, or A V node.",
        "title": "atrioventricular node · measured spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "avnode",
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
            "stage": "AV-delay"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "phrase",
          "end": 5.3,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s01",
          "phrase": "atrioventricular node",
          "firstWordIndex": 9,
          "lastWordIndex": 10
        }
      },
      {
        "id": "M04.03.s02",
        "at": 7.31,
        "text": "Conduction slows substantially here.",
        "title": "Conduction slows substantially here.",
        "scene": {
          "organ": "heart",
          "selected": "avnode",
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
            "stage": "AV-delay"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 9.53,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s02",
          "firstWordIndex": 15,
          "lastWordIndex": 18
        }
      },
      {
        "id": "M04.03.s03",
        "at": 9.92,
        "text": "This delay helps coordinate atrial activation with ventricular activation, giving the ventricles time to fill before they contract.",
        "title": "This delay helps coordinate atrial activation with ventricular activation, giving the ventricles time to fill before they contract.",
        "scene": {
          "organ": "heart",
          "selected": "avnode",
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
            "stage": "AV-delay"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. The current AV-delay hold precedes ventricular activation and ejection. Blood occupancy/readouts retain filling context."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.01,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s03",
          "firstWordIndex": 19,
          "lastWordIndex": 36
        }
      },
      {
        "id": "M04.03.s04",
        "at": 18.52,
        "text": "Do not spread this delay evenly along the whole pathway.",
        "title": "Do not spread this delay evenly along the whole pathway.",
        "scene": {
          "organ": "heart",
          "selected": "avnode",
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
            "stage": "AV-delay"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.28,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s04",
          "firstWordIndex": 37,
          "lastWordIndex": 46
        }
      },
      {
        "id": "M04.03.s05",
        "at": 22.8,
        "text": "After the A V node, the specialized ventricular conduction system is designed for rapid conduction.",
        "title": "After the A V node, the specialized ventricular conduction system is designed for rapid conduction.",
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
            "stage": "His-bundle"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. Local AV delay and later rapid distribution are distinct model stages; arrow speed is not measured conduction velocity."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s05",
          "firstWordIndex": 47,
          "lastWordIndex": 61
        }
      },
      {
        "id": "M04.03.phrase.5.rapid-conduction",
        "at": 28.07,
        "text": "After the A V node, the specialized ventricular conduction system is designed for rapid conduction.",
        "title": "rapid conduction · measured spoken phrase",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. Local AV delay and later rapid distribution are distinct model stages; arrow speed is not measured conduction velocity."
        },
        "alignment": {
          "kind": "phrase",
          "end": 29.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.03.s05",
          "phrase": "rapid conduction",
          "firstWordIndex": 60,
          "lastWordIndex": 61
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "388-401",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 388-401",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.04",
    "module": "M04",
    "title": "His, branches, and Purkinje fibers",
    "text": "From the A V node, the impulse enters the bundle of His, then the right and left bundle branches in the interventricular septum. Purkinje fibers rapidly distribute activation through the ventricles. This organization helps the ventricular muscle activate efficiently, with contraction developing from the apex toward the outflow regions. The colors in the overlay represent the teaching sequence, not the physical color of electricity inside the heart.",
    "transcript": "From the A V node, the impulse enters the bundle of His, then the right and left bundle branches in the interventricular septum. Purkinje fibers rapidly distribute activation through the ventricles. This organization helps the ventricular muscle activate efficiently, with contraction developing from the apex toward the outflow regions. The colors in the overlay represent the teaching sequence, not the physical color of electricity inside the heart.",
    "audio": {
      "src": "guided-study/assets/M04_04_adam_multilingual_v2.mp3",
      "duration": 30.275875,
      "sha256": "7db06e2bc3242508116f024e0d64d865becf23bc9789a63407a919ae11d9fb94"
    },
    "cues": [
      {
        "id": "M04.04.s01",
        "at": 0,
        "text": "From the A V node, the impulse enters the bundle of His, then the right and left bundle branches in the interventricular septum.",
        "title": "From the A V node, the impulse enters the bundle of His, then the right and left bundle branches in the interventricular septum.",
        "scene": {
          "organ": "heart",
          "selected": "avnode",
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
            "stage": "AV-delay"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 9.29,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.04.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 22
        }
      },
      {
        "id": "M04.04.phrase.1.bundle-of-his",
        "at": 3.38,
        "text": "From the A V node, the impulse enters the bundle of His, then the right and left bundle branches in the interventricular septum.",
        "title": "bundle of His · measured spoken phrase",
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
            "stage": "His-bundle"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "phrase",
          "end": 4.46,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.04.s01",
          "phrase": "bundle of His",
          "firstWordIndex": 9,
          "lastWordIndex": 11
        }
      },
      {
        "id": "M04.04.phrase.1.right-and-left-bundle-branches",
        "at": 5.36,
        "text": "From the A V node, the impulse enters the bundle of His, then the right and left bundle branches in the interventricular septum.",
        "title": "right and left bundle branches · measured spoken phrase",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "phrase",
          "end": 7.32,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.04.s01",
          "phrase": "right and left bundle branches",
          "firstWordIndex": 14,
          "lastWordIndex": 18
        }
      },
      {
        "id": "M04.04.s02",
        "at": 10.05,
        "text": "Purkinje fibers rapidly distribute activation through the ventricles.",
        "title": "Purkinje fibers rapidly distribute activation through the ventricles.",
        "scene": {
          "organ": "heart",
          "selected": "purkinje",
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
            "stage": "Purkinje-myocardium"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly."
        },
        "alignment": {
          "kind": "sentence",
          "end": 14.41,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.04.s02",
          "firstWordIndex": 23,
          "lastWordIndex": 30
        }
      },
      {
        "id": "M04.04.s03",
        "at": 14.96,
        "text": "This organization helps the ventricular muscle activate efficiently, with contraction developing from the apex toward the outflow regions.",
        "title": "This organization helps the ventricular muscle activate efficiently, with contraction developing from the apex toward the outflow regions.",
        "scene": {
          "organ": "explanation",
          "title": "Ventricular activation and contraction direction",
          "text": "This organization helps the ventricular muscle activate efficiently, with contraction developing from the apex toward the outflow regions.",
          "source": "Owner-approved adapted M04 narration · source script lines 388-401",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 23.17,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.04.s03",
          "firstWordIndex": 31,
          "lastWordIndex": 48
        }
      },
      {
        "id": "M04.04.s04",
        "at": 23.47,
        "text": "The colors in the overlay represent the teaching sequence, not the physical color of electricity inside the heart.",
        "title": "The colors in the overlay represent the teaching sequence, not the physical color of electricity inside the heart.",
        "scene": {
          "organ": "heart",
          "selected": "purkinje",
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
            "stage": "Purkinje-myocardium"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. Overlay colors are teaching conventions. They are not literal tissue color, electrical energy color or a blood-flow route."
        },
        "alignment": {
          "kind": "sentence",
          "end": 30.04,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.04.s04",
          "firstWordIndex": 49,
          "lastWordIndex": 66
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. The aligned word His at3.92–4.46 s carries a medical-name pronunciation review flag; forced alignment does not establish how it sounds. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "388-401",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 388-401",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.05",
    "module": "M04",
    "title": "Backup pacemakers and conduction speed",
    "text": "If the normal dominant pacemaker slows or impulses fail to reach lower tissue, an escape pacemaker may emerge. Usual teaching ranges are forty to sixty beats per minute for junctional escape and twenty to forty for ventricular escape. These are approximate ranges. Conduction speed and firing rate are different ideas: the A V node conducts slowly, while Purkinje tissue conducts rapidly. The fastest focus does not always control the heart if conduction is blocked.",
    "transcript": "If the normal dominant pacemaker slows or impulses fail to reach lower tissue, an escape pacemaker may emerge. Usual teaching ranges are forty to sixty beats per minute for junctional escape and twenty to forty for ventricular escape. These are approximate ranges. Conduction speed and firing rate are different ideas: the A V node conducts slowly, while Purkinje tissue conducts rapidly. The fastest focus does not always control the heart if conduction is blocked.",
    "audio": {
      "src": "guided-study/assets/M04_05_adam_multilingual_v2.mp3",
      "duration": 32.862,
      "sha256": "0b98be54911d178f0132b04ef3d1a4f133c4e4f4dcc73bf2a99b53d14aca80bb"
    },
    "cues": [
      {
        "id": "M04.05.s01",
        "at": 0,
        "text": "If the normal dominant pacemaker slows or impulses fail to reach lower tissue, an escape pacemaker may emerge.",
        "title": "If the normal dominant pacemaker slows or impulses fail to reach lower tissue, an escape pacemaker may emerge.",
        "scene": {
          "organ": "explanation",
          "title": "Escape pacemakers",
          "text": "If the normal dominant pacemaker slows or impulses fail to reach lower tissue, an escape pacemaker may emerge.",
          "source": "Owner-approved adapted M04 narration · source script lines 388-401;539-550",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.21,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.05.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 17
        }
      },
      {
        "id": "M04.05.s02",
        "at": 8.86,
        "text": "Usual teaching ranges are forty to sixty beats per minute for junctional escape and twenty to forty for ventricular escape.",
        "title": "Usual teaching ranges are forty to sixty beats per minute for junctional escape and twenty to forty for ventricular escape.",
        "scene": {
          "organ": "explanation",
          "title": "Approximate escape-rate teaching ranges",
          "text": "Usual teaching ranges are forty to sixty beats per minute for junctional escape and twenty to forty for ventricular escape.",
          "source": "Owner-approved adapted M04 narration · source script lines 388-401;539-550",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 16.11,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.05.s02",
          "firstWordIndex": 18,
          "lastWordIndex": 37
        }
      },
      {
        "id": "M04.05.s03",
        "at": 16.52,
        "text": "These are approximate ranges.",
        "title": "These are approximate ranges.",
        "scene": {
          "organ": "explanation",
          "title": "Approximate escape-rate teaching ranges",
          "text": "These are approximate ranges.",
          "source": "Owner-approved adapted M04 narration · source script lines 388-401;539-550",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.17,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.05.s03",
          "firstWordIndex": 38,
          "lastWordIndex": 41
        }
      },
      {
        "id": "M04.05.s04",
        "at": 18.78,
        "text": "Conduction speed and firing rate are different ideas: the A V node conducts slowly, while Purkinje tissue conducts rapidly.",
        "title": "Conduction speed and firing rate are different ideas: the A V node conducts slowly, while Purkinje tissue conducts rapidly.",
        "scene": {
          "organ": "heart",
          "selected": "avnode",
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
            "stage": "AV-delay"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. This simulator remains the normal authored conduction reference. Escape pacemaker emergence, AV block, dominance competition and junctional/ventricular rhythm generation are not simulated. The quoted rates are approximate teaching ranges, not predictions or universal thresholds. Firing frequency and conduction velocity are separate. No pulse-distance speed calibration is claimed."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.85,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.05.s04",
          "firstWordIndex": 42,
          "lastWordIndex": 60
        }
      },
      {
        "id": "M04.05.phrase.4.purkinje-tissue",
        "at": 25.48,
        "text": "Conduction speed and firing rate are different ideas: the A V node conducts slowly, while Purkinje tissue conducts rapidly.",
        "title": "Purkinje tissue · measured spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "purkinje",
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
            "stage": "Purkinje-myocardium"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. This simulator remains the normal authored conduction reference. Escape pacemaker emergence, AV block, dominance competition and junctional/ventricular rhythm generation are not simulated. The quoted rates are approximate teaching ranges, not predictions or universal thresholds. Firing frequency and conduction velocity are separate. No pulse-distance speed calibration is claimed."
        },
        "alignment": {
          "kind": "phrase",
          "end": 26.66,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.05.s04",
          "phrase": "Purkinje tissue",
          "firstWordIndex": 57,
          "lastWordIndex": 58
        }
      },
      {
        "id": "M04.05.s05",
        "at": 28.37,
        "text": "The fastest focus does not always control the heart if conduction is blocked.",
        "title": "The fastest focus does not always control the heart if conduction is blocked.",
        "scene": {
          "organ": "explanation",
          "title": "Conduction block and pacemaker dominance",
          "text": "The fastest focus does not always control the heart if conduction is blocked.",
          "source": "Owner-approved adapted M04 narration · source script lines 388-401;539-550",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 32.42,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.05.s05",
          "firstWordIndex": 61,
          "lastWordIndex": 73
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Escape rhythms, block, pacemaker competition, counted ion pumping and Mg/Cl transport are not simulated; cue details state the supported scope. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "388-401;539-550",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 388-401;539-550",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.06",
    "module": "M04",
    "title": "Working-cell action potential",
    "text": "Zoom conceptually from the heart to one ventricular muscle cell. Its action potential begins with rapid sodium entry. A brief early change is followed by a plateau, during which calcium entry and potassium exit both matter. Potassium currents then help repolarize the cell. These changing currents flow through ion channels. The sodium-potassium pump maintains ion gradients over time; it is not the channel that produces every action-potential upstroke.",
    "transcript": "Zoom conceptually from the heart to one ventricular muscle cell. Its action potential begins with rapid sodium entry. A brief early change is followed by a plateau, during which calcium entry and potassium exit both matter. Potassium currents then help repolarize the cell. These changing currents flow through ion channels. The sodium-potassium pump maintains ion gradients over time; it is not the channel that produces every action-potential upstroke.",
    "audio": {
      "src": "guided-study/assets/M04_06_adam_multilingual_v2.mp3",
      "duration": 30.772188,
      "sha256": "dbd0a36af0607db2f047b18a32d947ae42bdb2518260a57ac8aeaf5047b26c4d"
    },
    "cues": [
      {
        "id": "M04.06.s01",
        "at": 0,
        "text": "Zoom conceptually from the heart to one ventricular muscle cell.",
        "title": "Zoom conceptually from the heart to one ventricular muscle cell.",
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
          "route": "routeC",
          "stage": "ventricular",
          "simulation": {
            "kind": "cellular",
            "stage": "baseline"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.09,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.06.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 9
        }
      },
      {
        "id": "M04.06.s02",
        "at": 4.71,
        "text": "Its action potential begins with rapid sodium entry.",
        "title": "Its action potential begins with rapid sodium entry.",
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
          "route": "routeC",
          "stage": "ventricular",
          "simulation": {
            "kind": "cellular",
            "stage": "voltage-depolarization",
            "sweep": true,
            "anchorAudio": 4.71,
            "endAudio": 7.69
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Only representative membrane/channel cues and illustrative voltage traces are shown. Specific channel kinetics, ion flux magnitudes and the 3Na⁺ out/2K⁺ in transport count are not animated or solved."
        },
        "alignment": {
          "kind": "sentence",
          "end": 7.69,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.06.s02",
          "firstWordIndex": 10,
          "lastWordIndex": 17
        }
      },
      {
        "id": "M04.06.s03",
        "at": 8.12,
        "text": "A brief early change is followed by a plateau, during which calcium entry and potassium exit both matter.",
        "title": "A brief early change is followed by a plateau, during which calcium entry and potassium exit both matter.",
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
          "route": "routeC",
          "stage": "ventricular",
          "simulation": {
            "kind": "cellular",
            "stage": "voltage-plateau",
            "sweep": true,
            "anchorAudio": 8.12,
            "endAudio": 14.57
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Only representative membrane/channel cues and illustrative voltage traces are shown. Specific channel kinetics, ion flux magnitudes and the 3Na⁺ out/2K⁺ in transport count are not animated or solved."
        },
        "alignment": {
          "kind": "sentence",
          "end": 14.57,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.06.s03",
          "firstWordIndex": 18,
          "lastWordIndex": 35
        }
      },
      {
        "id": "M04.06.s04",
        "at": 15.22,
        "text": "Potassium currents then help repolarize the cell.",
        "title": "Potassium currents then help repolarize the cell.",
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
          "route": "routeC",
          "stage": "ventricular",
          "simulation": {
            "kind": "cellular",
            "stage": "voltage-repolarization",
            "sweep": true,
            "anchorAudio": 15.22,
            "endAudio": 18.47
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Only representative membrane/channel cues and illustrative voltage traces are shown. Specific channel kinetics, ion flux magnitudes and the 3Na⁺ out/2K⁺ in transport count are not animated or solved."
        },
        "alignment": {
          "kind": "sentence",
          "end": 18.47,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.06.s04",
          "firstWordIndex": 36,
          "lastWordIndex": 42
        }
      },
      {
        "id": "M04.06.s05",
        "at": 19.04,
        "text": "These changing currents flow through ion channels.",
        "title": "These changing currents flow through ion channels.",
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
          "route": "routeC",
          "stage": "ventricular",
          "simulation": {
            "kind": "cellular",
            "stage": "voltage-plateau"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Only representative membrane/channel cues and illustrative voltage traces are shown. Specific channel kinetics, ion flux magnitudes and the 3Na⁺ out/2K⁺ in transport count are not animated or solved."
        },
        "alignment": {
          "kind": "sentence",
          "end": 21.88,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.06.s05",
          "firstWordIndex": 43,
          "lastWordIndex": 49
        }
      },
      {
        "id": "M04.06.s06",
        "at": 22.33,
        "text": "The sodium-potassium pump maintains ion gradients over time; it is not the channel that produces every action-potential upstroke.",
        "title": "The sodium-potassium pump maintains ion gradients over time; it is not the channel that produces every action-potential upstroke.",
        "scene": {
          "organ": "explanation",
          "title": "Sodium-potassium pump versus rapid channels",
          "text": "The sodium-potassium pump maintains ion gradients over time; it is not the channel that produces every action-potential upstroke.",
          "source": "Owner-approved adapted M04 narration · source script lines 442-445;520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 30.53,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.06.s06",
          "firstWordIndex": 50,
          "lastWordIndex": 69
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "442-445;520-538;871-881",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 442-445;520-538;871-881",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.07",
    "module": "M04",
    "title": "Pacemaker cells are different",
    "text": "Pacemaker cells do not have the same stable resting potential or the same action-potential shape as ventricular working cells. Their membrane voltage drifts toward threshold, and calcium current contributes to the nodal upstroke. Threshold and resting values vary by cell type and conditions. Do not label calcium, sodium, and potassium with voltages as if those were their electrical charges. An ion's charge and its equilibrium potential are different quantities.",
    "transcript": "Pacemaker cells do not have the same stable resting potential or the same action-potential shape as ventricular working cells. Their membrane voltage drifts toward threshold, and calcium current contributes to the nodal upstroke. Threshold and resting values vary by cell type and conditions. Do not label calcium, sodium, and potassium with voltages as if those were their electrical charges. An ion's charge and its equilibrium potential are different quantities.",
    "audio": {
      "src": "guided-study/assets/M04_07_adam_multilingual_v2.mp3",
      "duration": 31.346938,
      "sha256": "811c5d9aad217063dee8885891731ae20b44635175b2e9b879765afc9f56c3c4"
    },
    "cues": [
      {
        "id": "M04.07.s01",
        "at": 0,
        "text": "Pacemaker cells do not have the same stable resting potential or the same action-potential shape as ventricular working cells.",
        "title": "Pacemaker cells do not have the same stable resting potential or the same action-potential shape as ventricular working cells.",
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
          "conductionView": "off",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeC",
          "stage": "nodal",
          "simulation": {
            "kind": "cellular",
            "stage": "cycle",
            "sweep": true,
            "anchorAudio": 0,
            "endAudio": 8.14
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.14,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.07.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 19
        }
      },
      {
        "id": "M04.07.s02",
        "at": 8.7,
        "text": "Their membrane voltage drifts toward threshold, and calcium current contributes to the nodal upstroke.",
        "title": "Their membrane voltage drifts toward threshold, and calcium current contributes to the nodal upstroke.",
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
          "conductionView": "off",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeC",
          "stage": "nodal",
          "simulation": {
            "kind": "cellular",
            "stage": "nodal-drift",
            "occurrence": "last",
            "sweep": true,
            "anchorAudio": 8.7,
            "endAudio": 11.93
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. This is a pacemaker cell trace, not the gross SA-node activity stage or a ventricular fast Na⁺ upstroke."
        },
        "alignment": {
          "kind": "sentence",
          "end": 15.14,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.07.s02",
          "firstWordIndex": 20,
          "lastWordIndex": 33
        }
      },
      {
        "id": "M04.07.phrase.2.calcium-current",
        "at": 11.93,
        "text": "Their membrane voltage drifts toward threshold, and calcium current contributes to the nodal upstroke.",
        "title": "calcium current · measured spoken phrase",
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
          "conductionView": "off",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeC",
          "stage": "nodal",
          "simulation": {
            "kind": "cellular",
            "stage": "nodal-upstroke",
            "sweep": true,
            "anchorAudio": 11.93,
            "endAudio": 15.14
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. This is a pacemaker cell trace, not the gross SA-node activity stage or a ventricular fast Na⁺ upstroke. At this measured phrase the actual nodal trace enters its calcium-mediated upstroke; it is not left in slow drift."
        },
        "alignment": {
          "kind": "phrase",
          "end": 12.96,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.07.s02",
          "phrase": "calcium current",
          "firstWordIndex": 27,
          "lastWordIndex": 28
        }
      },
      {
        "id": "M04.07.s03",
        "at": 15.71,
        "text": "Threshold and resting values vary by cell type and conditions.",
        "title": "Threshold and resting values vary by cell type and conditions.",
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
          "conductionView": "off",
          "conductionDisplay": "full-pulse",
          "wallHighlight": false,
          "flowStop": null,
          "route": "routeC",
          "stage": "nodal",
          "simulation": {
            "kind": "cellular",
            "stage": "nodal-drift",
            "occurrence": "last"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Displayed thresholds/voltages illustrate this cell type; they are not universal resting or threshold values."
        },
        "alignment": {
          "kind": "sentence",
          "end": 19.47,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.07.s03",
          "firstWordIndex": 34,
          "lastWordIndex": 43
        }
      },
      {
        "id": "M04.07.s04",
        "at": 19.74,
        "text": "Do not label calcium, sodium, and potassium with voltages as if those were their electrical charges.",
        "title": "Do not label calcium, sodium, and potassium with voltages as if those were their electrical charges.",
        "scene": {
          "organ": "explanation",
          "title": "Ion charge versus membrane voltage",
          "text": "Do not label calcium, sodium, and potassium with voltages as if those were their electrical charges.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 25.98,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.07.s04",
          "firstWordIndex": 44,
          "lastWordIndex": 59
        }
      },
      {
        "id": "M04.07.s05",
        "at": 26.41,
        "text": "An ion's charge and its equilibrium potential are different quantities.",
        "title": "An ion's charge and its equilibrium potential are different quantities.",
        "scene": {
          "organ": "explanation",
          "title": "Ion charge versus equilibrium potential",
          "text": "An ion's charge and its equilibrium potential are different quantities.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 30.89,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.07.s05",
          "firstWordIndex": 60,
          "lastWordIndex": 69
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "520-538;871-881",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.08",
    "module": "M04",
    "title": "Calcium couples signal to contraction",
    "text": "Now connect electricity to force. Calcium entering a cardiac muscle cell triggers a larger calcium release from the sarcoplasmic reticulum, the cell's internal calcium store. Calcium binds to troponin. This moves tropomyosin away from actin's binding sites so myosin can interact with actin. The process is called excitation-contraction coupling. The electrical signal starts the sequence, but calcium handling and the contractile machinery determine how force develops.",
    "transcript": "Now connect electricity to force. Calcium entering a cardiac muscle cell triggers a larger calcium release from the sarcoplasmic reticulum, the cell's internal calcium store. Calcium binds to troponin. This moves tropomyosin away from actin's binding sites so myosin can interact with actin. The process is called excitation-contraction coupling. The electrical signal starts the sequence, but calcium handling and the contractile machinery determine how force develops.",
    "audio": {
      "src": "guided-study/assets/M04_08_adam_multilingual_v2.mp3",
      "duration": 30.171375,
      "sha256": "31a4e0cdbf490c38a14bf6a9c098d29d5411cf96d7074259598943915be93260"
    },
    "cues": [
      {
        "id": "M04.08.s01",
        "at": 0,
        "text": "Now connect electricity to force.",
        "title": "Now connect electricity to force.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "electrical"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 1.9,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.08.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 4
        }
      },
      {
        "id": "M04.08.s02",
        "at": 2.52,
        "text": "Calcium entering a cardiac muscle cell triggers a larger calcium release from the sarcoplasmic reticulum, the cell's internal calcium store.",
        "title": "Calcium entering a cardiac muscle cell triggers a larger calcium release from the sarcoplasmic reticulum, the cell's internal calcium store.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "release",
            "sweep": true,
            "anchorAudio": 2.52,
            "endAudio": 19.37
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 10.59,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.08.s02",
          "firstWordIndex": 5,
          "lastWordIndex": 24
        }
      },
      {
        "id": "M04.08.s03",
        "at": 11.13,
        "text": "Calcium binds to troponin.",
        "title": "Calcium binds to troponin.",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "release",
            "sweep": true,
            "anchorAudio": 2.52,
            "endAudio": 19.37
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 12.97,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.08.s03",
          "firstWordIndex": 25,
          "lastWordIndex": 28
        }
      },
      {
        "id": "M04.08.s04",
        "at": 13.47,
        "text": "This moves tropomyosin away from actin's binding sites so myosin can interact with actin.",
        "title": "This moves tropomyosin away from actin's binding sites so myosin can interact with actin.",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "release",
            "sweep": true,
            "anchorAudio": 2.52,
            "endAudio": 19.37
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 19.37,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.08.s04",
          "firstWordIndex": 29,
          "lastWordIndex": 42
        }
      },
      {
        "id": "M04.08.s05",
        "at": 19.73,
        "text": "The process is called excitation-contraction coupling.",
        "title": "The process is called excitation-contraction coupling.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "cycle",
            "sweep": true,
            "anchorAudio": 19.73,
            "endAudio": 22.71
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 22.71,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.08.s05",
          "firstWordIndex": 43,
          "lastWordIndex": 49
        }
      },
      {
        "id": "M04.08.s06",
        "at": 23.17,
        "text": "The electrical signal starts the sequence, but calcium handling and the contractile machinery determine how force develops.",
        "title": "The electrical signal starts the sequence, but calcium handling and the contractile machinery determine how force develops.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "cycle",
            "sweep": true,
            "anchorAudio": 23.17,
            "endAudio": 29.93
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.93,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.08.s06",
          "firstWordIndex": 50,
          "lastWordIndex": 66
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "218-233;520-538;871-881;SUPPLEMENT",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 218-233;520-538;871-881;SUPPLEMENT",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.09",
    "module": "M04",
    "title": "The sarcomere shortens",
    "text": "Within a muscle cell, myofibrils contain repeating sarcomeres. Each sarcomere spans from one Z line to the next. At the sarcomere, myosin heads bind to actin, produce force, detach, and reset through repeated cross-bridge cycles. A T P is needed for this cycle, including detachment of myosin from actin. Thin and thick filaments slide past one another; the filaments themselves do not become shorter. The distance between the sarcomere boundaries decreases. Many sarcomeres acting together shorten the muscle cell and contribute to ventricular pressure.",
    "transcript": "Within a muscle cell, myofibrils contain repeating sarcomeres. Each sarcomere spans from one Z line to the next. At the sarcomere, myosin heads bind to actin, produce force, detach, and reset through repeated cross-bridge cycles. A T P is needed for this cycle, including detachment of myosin from actin. Thin and thick filaments slide past one another; the filaments themselves do not become shorter. The distance between the sarcomere boundaries decreases. Many sarcomeres acting together shorten the muscle cell and contribute to ventricular pressure.",
    "audio": {
      "src": "guided-study/assets/M04_09_adam_multilingual_v2.mp3",
      "duration": 39.549375,
      "sha256": "f6e6df3e439e8458d13a4f88f1e12dd37dce817d4101971ef7d7ccfec222ed69"
    },
    "cues": [
      {
        "id": "M04.09.s01",
        "at": 0,
        "text": "Within a muscle cell, myofibrils contain repeating sarcomeres.",
        "title": "Within a muscle cell, myofibrils contain repeating sarcomeres.",
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
          "route": "routeB",
          "stage": "myofibril",
          "simulation": {
            "kind": "cellular",
            "stage": "baseline"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.51,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 7
        }
      },
      {
        "id": "M04.09.s02",
        "at": 4.83,
        "text": "Each sarcomere spans from one Z line to the next.",
        "title": "Each sarcomere spans from one Z line to the next.",
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
          "route": "routeB",
          "stage": "sarcomere",
          "simulation": {
            "kind": "cellular",
            "stage": "baseline"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 8.7,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s02",
          "firstWordIndex": 8,
          "lastWordIndex": 17
        }
      },
      {
        "id": "M04.09.s03",
        "at": 9.15,
        "text": "At the sarcomere, myosin heads bind to actin, produce force, detach, and reset through repeated cross-bridge cycles.",
        "title": "At the sarcomere, myosin heads bind to actin, produce force, detach, and reset through repeated cross-bridge cycles.",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "cycle",
            "sweep": true,
            "anchorAudio": 9.15,
            "endAudio": 17.81
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 17.81,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s03",
          "firstWordIndex": 18,
          "lastWordIndex": 35
        }
      },
      {
        "id": "M04.09.s04",
        "at": 18.49,
        "text": "A T P is needed for this cycle, including detachment of myosin from actin.",
        "title": "A T P is needed for this cycle, including detachment of myosin from actin.",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "cycle",
            "sweep": true,
            "anchorAudio": 18.49,
            "endAudio": 23.59
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. ATP-dependent detachment/cycling is taught qualitatively; there is no molecule-by-molecule ATP consumption model."
        },
        "alignment": {
          "kind": "sentence",
          "end": 23.59,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s04",
          "firstWordIndex": 36,
          "lastWordIndex": 49
        }
      },
      {
        "id": "M04.09.s05",
        "at": 24.21,
        "text": "Thin and thick filaments slide past one another; the filaments themselves do not become shorter.",
        "title": "Thin and thick filaments slide past one another; the filaments themselves do not become shorter.",
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
          "route": "routeB",
          "stage": "sarcomere",
          "simulation": {
            "kind": "cellular",
            "stage": "cycle",
            "sweep": true,
            "anchorAudio": 24.21,
            "endAudio": 29.82
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Actual actin/myosin lengths and A-band lengths stay fixed while overlap and Z-disc separation change."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.82,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s05",
          "firstWordIndex": 50,
          "lastWordIndex": 64
        }
      },
      {
        "id": "M04.09.s06",
        "at": 30.36,
        "text": "The distance between the sarcomere boundaries decreases.",
        "title": "The distance between the sarcomere boundaries decreases.",
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
          "route": "routeB",
          "stage": "sarcomere",
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 30.36,
            "endAudio": 33.68
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Only Z-disc spacing/overlap changes during shortening; filaments are not scaled shorter."
        },
        "alignment": {
          "kind": "sentence",
          "end": 33.68,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s06",
          "firstWordIndex": 65,
          "lastWordIndex": 71
        }
      },
      {
        "id": "M04.09.s07",
        "at": 34.31,
        "text": "Many sarcomeres acting together shorten the muscle cell and contribute to ventricular pressure.",
        "title": "Many sarcomeres acting together shorten the muscle cell and contribute to ventricular pressure.",
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
          "route": "routeB",
          "stage": "myofibril",
          "simulation": {
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left",
            "sweep": true,
            "anchorAudio": 34.31,
            "endAudio": 39.29
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Micro motion is driven by regional model activation; chamber pressure is not computed from these representative sarcomeres."
        },
        "alignment": {
          "kind": "sentence",
          "end": 39.29,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s07",
          "firstWordIndex": 72,
          "lastWordIndex": 84
        }
      },
      {
        "id": "M04.09.phrase.7.ventricular-pressure",
        "at": 38.12,
        "text": "Many sarcomeres acting together shorten the muscle cell and contribute to ventricular pressure.",
        "title": "ventricular pressure · measured spoken phrase",
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
            "kind": "phase",
            "phase": "isovolumetric-contraction",
            "side": "left"
          },
          "detail": "Return to the original registered four-chamber HRA heart at ventricular pressure. Representative sarcomeres did not compute this pressure: it comes from the independent shared circulation model. Electrical activity, contraction and ejection remain distinct."
        },
        "alignment": {
          "kind": "phrase",
          "end": 39.29,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.09.s07",
          "phrase": "ventricular pressure",
          "firstWordIndex": 83,
          "lastWordIndex": 84
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "218-233;SUPPLEMENT",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 218-233;SUPPLEMENT",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.10",
    "module": "M04",
    "title": "Calcium removal permits relaxation",
    "text": "For relaxation, the free calcium concentration in the cell must fall. Much calcium returns to the sarcoplasmic reticulum through an A T P-dependent pump. Calcium also leaves the cell, especially through the sodium-calcium exchanger. As calcium dissociates from troponin, tropomyosin again limits actin-myosin interaction. The sodium-potassium pump supports the gradients that make this system possible. Relaxation is an active, energy-dependent process, not simply the absence of an electrical wave.",
    "transcript": "For relaxation, the free calcium concentration in the cell must fall. Much calcium returns to the sarcoplasmic reticulum through an A T P-dependent pump. Calcium also leaves the cell, especially through the sodium-calcium exchanger. As calcium dissociates from troponin, tropomyosin again limits actin-myosin interaction. The sodium-potassium pump supports the gradients that make this system possible. Relaxation is an active, energy-dependent process, not simply the absence of an electrical wave.",
    "audio": {
      "src": "guided-study/assets/M04_10_adam_multilingual_v2.mp3",
      "duration": 35.47425,
      "sha256": "308df712605904b22b0f9666bb8bde1685a696300e9fd56ff7e487e72c3cb2d9"
    },
    "cues": [
      {
        "id": "M04.10.s01",
        "at": 0,
        "text": "For relaxation, the free calcium concentration in the cell must fall.",
        "title": "For relaxation, the free calcium concentration in the cell must fall.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "removal",
            "sweep": true,
            "anchorAudio": 0,
            "endAudio": 23.17
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Calcium decline can overlap continuing force; mechanical relaxation lags calcium handling. The first falling calcium cue does not imply immediate loss of all tension."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.67,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.10.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 10
        }
      },
      {
        "id": "M04.10.s02",
        "at": 5.42,
        "text": "Much calcium returns to the sarcoplasmic reticulum through an A T P-dependent pump.",
        "title": "Much calcium returns to the sarcoplasmic reticulum through an A T P-dependent pump.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "removal-visible",
            "sweep": true,
            "anchorAudio": 5.42,
            "endAudio": 23.17
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Calcium decline can overlap continuing force; mechanical relaxation lags calcium handling. The first falling calcium cue does not imply immediate loss of all tension."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.07,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.10.s02",
          "firstWordIndex": 11,
          "lastWordIndex": 24
        }
      },
      {
        "id": "M04.10.s03",
        "at": 11.68,
        "text": "Calcium also leaves the cell, especially through the sodium-calcium exchanger.",
        "title": "Calcium also leaves the cell, especially through the sodium-calcium exchanger.",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "removal-visible",
            "sweep": true,
            "anchorAudio": 5.42,
            "endAudio": 23.17
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Calcium decline can overlap continuing force; mechanical relaxation lags calcium handling. The first falling calcium cue does not imply immediate loss of all tension."
        },
        "alignment": {
          "kind": "sentence",
          "end": 16.36,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.10.s03",
          "firstWordIndex": 25,
          "lastWordIndex": 35
        }
      },
      {
        "id": "M04.10.s04",
        "at": 16.78,
        "text": "As calcium dissociates from troponin, tropomyosin again limits actin-myosin interaction.",
        "title": "As calcium dissociates from troponin, tropomyosin again limits actin-myosin interaction.",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "removal-visible",
            "sweep": true,
            "anchorAudio": 5.42,
            "endAudio": 23.17
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Calcium decline can overlap continuing force; mechanical relaxation lags calcium handling. The first falling calcium cue does not imply immediate loss of all tension."
        },
        "alignment": {
          "kind": "sentence",
          "end": 23.17,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.10.s04",
          "firstWordIndex": 36,
          "lastWordIndex": 46
        }
      },
      {
        "id": "M04.10.s05",
        "at": 23.68,
        "text": "The sodium-potassium pump supports the gradients that make this system possible.",
        "title": "The sodium-potassium pump supports the gradients that make this system possible.",
        "scene": {
          "organ": "explanation",
          "title": "Pump maintenance of ion gradients",
          "text": "The sodium-potassium pump supports the gradients that make this system possible.",
          "source": "Owner-approved adapted M04 narration · source script lines 871-881;SUPPLEMENT",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 27.98,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.10.s05",
          "firstWordIndex": 47,
          "lastWordIndex": 58
        }
      },
      {
        "id": "M04.10.s06",
        "at": 28.5,
        "text": "Relaxation is an active, energy-dependent process, not simply the absence of an electrical wave.",
        "title": "Relaxation is an active, energy-dependent process, not simply the absence of an electrical wave.",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "relaxed",
            "occurrence": "last"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Relaxation remains ATP dependent even after the calcium cue has returned to baseline; it is not a passive absence-of-ECG-wave rule. Calcium decline can overlap continuing force; mechanical relaxation lags calcium handling. The first falling calcium cue does not imply immediate loss of all tension."
        },
        "alignment": {
          "kind": "sentence",
          "end": 35.19,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.10.s06",
          "firstWordIndex": 59,
          "lastWordIndex": 73
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "871-881;SUPPLEMENT",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 871-881;SUPPLEMENT",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.11",
    "module": "M04",
    "title": "Ions and the sodium-potassium pump",
    "text": "Ions are atoms or molecules carrying an electrical charge. Sodium, potassium, calcium, and magnesium are positive ions; chloride is a negative ion. Different concentrations inside and outside the cell, together with selective membrane permeability, create electrical and chemical gradients. The sodium-potassium pump uses A T P to move three sodium ions out and two potassium ions in. This maintains gradients over time and indirectly supports calcium handling; channels carry the rapid currents of each action potential.",
    "transcript": "Ions are atoms or molecules carrying an electrical charge. Sodium, potassium, calcium, and magnesium are positive ions; chloride is a negative ion. Different concentrations inside and outside the cell, together with selective membrane permeability, create electrical and chemical gradients. The sodium-potassium pump uses A T P to move three sodium ions out and two potassium ions in. This maintains gradients over time and indirectly supports calcium handling; channels carry the rapid currents of each action potential.",
    "audio": {
      "src": "guided-study/assets/M04_11_adam_multilingual_v2.mp3",
      "duration": 38.217125,
      "sha256": "b853a3fe4b45015ec2b68232b83273eed4bfafa908284f6d12147f506066fe8e"
    },
    "cues": [
      {
        "id": "M04.11.s01",
        "at": 0,
        "text": "Ions are atoms or molecules carrying an electrical charge.",
        "title": "Ions are atoms or molecules carrying an electrical charge.",
        "scene": {
          "organ": "explanation",
          "title": "What is an ion?",
          "text": "Ions are atoms or molecules carrying an electrical charge.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 4.02,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.11.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 8
        }
      },
      {
        "id": "M04.11.s02",
        "at": 4.46,
        "text": "Sodium, potassium, calcium, and magnesium are positive ions; chloride is a negative ion.",
        "title": "Sodium, potassium, calcium, and magnesium are positive ions; chloride is a negative ion.",
        "scene": {
          "organ": "explanation",
          "title": "Positive and negative ions",
          "text": "Sodium, potassium, calcium, and magnesium are positive ions; chloride is a negative ion.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 11.15,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.11.s02",
          "firstWordIndex": 9,
          "lastWordIndex": 21
        }
      },
      {
        "id": "M04.11.s03",
        "at": 11.69,
        "text": "Different concentrations inside and outside the cell, together with selective membrane permeability, create electrical and chemical gradients.",
        "title": "Different concentrations inside and outside the cell, together with selective membrane permeability, create electrical and chemical gradients.",
        "scene": {
          "organ": "explanation",
          "title": "Electrical and chemical gradients",
          "text": "Different concentrations inside and outside the cell, together with selective membrane permeability, create electrical and chemical gradients.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 20.4,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.11.s03",
          "firstWordIndex": 22,
          "lastWordIndex": 38
        }
      },
      {
        "id": "M04.11.s04",
        "at": 20.87,
        "text": "The sodium-potassium pump uses A T P to move three sodium ions out and two potassium ions in.",
        "title": "The sodium-potassium pump uses A T P to move three sodium ions out and two potassium ions in.",
        "scene": {
          "organ": "explanation",
          "title": "Sodium-potassium pump: three out, two in",
          "text": "The sodium-potassium pump uses A T P to move three sodium ions out and two potassium ions in.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 28.51,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.11.s04",
          "firstWordIndex": 39,
          "lastWordIndex": 57
        }
      },
      {
        "id": "M04.11.s05",
        "at": 29.13,
        "text": "This maintains gradients over time and indirectly supports calcium handling; channels carry the rapid currents of each action potential.",
        "title": "This maintains gradients over time and indirectly supports calcium handling; channels carry the rapid currents of each action potential.",
        "scene": {
          "organ": "explanation",
          "title": "Gradient maintenance versus rapid channel currents",
          "text": "This maintains gradients over time and indirectly supports calcium handling; channels carry the rapid currents of each action potential.",
          "source": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 37.9,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.11.s05",
          "firstWordIndex": 58,
          "lastWordIndex": 76
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Escape rhythms, block, pacemaker competition, counted ion pumping and Mg/Cl transport are not simulated; cue details state the supported scope. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "520-538;871-881",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 520-538;871-881",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  },
  {
    "id": "M04.12",
    "module": "M04",
    "title": "Refractory periods and checkpoint",
    "text": "During the refractory period, cardiac muscle cannot respond normally to another stimulus. Early in recovery, a new propagated response cannot be triggered normally; later, a sufficiently strong premature stimulus may trigger one. These cellular periods do not have one exact boundary on every surface T wave. Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation. Then return to the original heart and trace S A node to Purkinje fibers.",
    "transcript": "During the refractory period, cardiac muscle cannot respond normally to another stimulus. Early in recovery, a new propagated response cannot be triggered normally; later, a sufficiently strong premature stimulus may trigger one. These cellular periods do not have one exact boundary on every surface T wave. Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation. Then return to the original heart and trace S A node to Purkinje fibers.",
    "audio": {
      "src": "guided-study/assets/M04_12_adam_multilingual_v2.mp3",
      "duration": 35.186938,
      "sha256": "9ac3c08ae9fb09f4b100e24bfa14d507fbeb9215fc2e1220ac10569f9c4af84a"
    },
    "cues": [
      {
        "id": "M04.12.s01",
        "at": 0,
        "text": "During the refractory period, cardiac muscle cannot respond normally to another stimulus.",
        "title": "During the refractory period, cardiac muscle cannot respond normally to another stimulus.",
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
          "route": "routeC",
          "stage": "ventricular",
          "simulation": {
            "kind": "cellular",
            "stage": "voltage-plateau"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. The shaded single-cell refractory span is illustrative. No premature-stimulus response solver or exact absolute/relative boundary mapped to a surface T wave is claimed."
        },
        "alignment": {
          "kind": "sentence",
          "end": 5.31,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s01",
          "firstWordIndex": 0,
          "lastWordIndex": 11
        }
      },
      {
        "id": "M04.12.s02",
        "at": 5.87,
        "text": "Early in recovery, a new propagated response cannot be triggered normally; later, a sufficiently strong premature stimulus may trigger one.",
        "title": "Early in recovery, a new propagated response cannot be triggered normally; later, a sufficiently strong premature stimulus may trigger one.",
        "scene": {
          "organ": "explanation",
          "title": "Refractory periods and premature stimuli",
          "text": "Early in recovery, a new propagated response cannot be triggered normally; later, a sufficiently strong premature stimulus may trigger one.",
          "source": "Owner-approved adapted M04 narration · source script lines 480-505;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 14.72,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s02",
          "firstWordIndex": 12,
          "lastWordIndex": 31
        }
      },
      {
        "id": "M04.12.s03",
        "at": 15.52,
        "text": "These cellular periods do not have one exact boundary on every surface T wave.",
        "title": "These cellular periods do not have one exact boundary on every surface T wave.",
        "scene": {
          "organ": "explanation",
          "title": "Cellular refractoriness versus surface T waves",
          "text": "These cellular periods do not have one exact boundary on every surface T wave.",
          "source": "Owner-approved adapted M04 narration · source script lines 480-505;871-881",
          "qualification": "Supplemental explanation; no corresponding numerical/3D process or clinical prediction."
        },
        "alignment": {
          "kind": "sentence",
          "end": 20.51,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s03",
          "firstWordIndex": 32,
          "lastWordIndex": 45
        }
      },
      {
        "id": "M04.12.s04",
        "at": 21,
        "text": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
        "title": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. Return to the actual registered source-HRA His/bilateral-bundle route for impulse spread before inspecting representative cellular calcium/filament states. These are comparisons across scales, not a measured magnification of these conduction fibers."
        },
        "alignment": {
          "kind": "sentence",
          "end": 29.25,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s04",
          "firstWordIndex": 46,
          "lastWordIndex": 61
        }
      },
      {
        "id": "M04.12.phrase.4.impulse-spread",
        "at": 22.72,
        "text": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
        "title": "impulse spread · measured spoken phrase",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. Return to the actual registered source-HRA His/bilateral-bundle route for impulse spread before inspecting representative cellular calcium/filament states. These are comparisons across scales, not a measured magnification of these conduction fibers."
        },
        "alignment": {
          "kind": "phrase",
          "end": 23.75,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s04",
          "phrase": "impulse spread",
          "firstWordIndex": 51,
          "lastWordIndex": 52
        }
      },
      {
        "id": "M04.12.phrase.4.calcium-release",
        "at": 23.95,
        "text": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
        "title": "calcium release · measured spoken phrase",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "release"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Measured phrases will inspect activation, Ca²⁺ release, filament force, Ca²⁺ removal and full relaxation in order."
        },
        "alignment": {
          "kind": "phrase",
          "end": 24.99,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s04",
          "phrase": "calcium release",
          "firstWordIndex": 53,
          "lastWordIndex": 54
        }
      },
      {
        "id": "M04.12.phrase.4.cross-bridge-force",
        "at": 25.26,
        "text": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
        "title": "cross bridge force · measured spoken phrase",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "phase",
            "phase": "ejection",
            "side": "left"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Measured phrases will inspect activation, Ca²⁺ release, filament force, Ca²⁺ removal and full relaxation in order."
        },
        "alignment": {
          "kind": "phrase",
          "end": 26.36,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s04",
          "phrase": "cross bridge force",
          "firstWordIndex": 55,
          "lastWordIndex": 57
        }
      },
      {
        "id": "M04.12.phrase.4.calcium-removal",
        "at": 26.66,
        "text": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
        "title": "calcium removal · measured spoken phrase",
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
          "route": "routeB",
          "stage": "cell",
          "simulation": {
            "kind": "cellular",
            "stage": "removal-visible"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Measured phrases will inspect activation, Ca²⁺ release, filament force, Ca²⁺ removal and full relaxation in order."
        },
        "alignment": {
          "kind": "phrase",
          "end": 27.78,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s04",
          "phrase": "calcium removal",
          "firstWordIndex": 58,
          "lastWordIndex": 59
        }
      },
      {
        "id": "M04.12.phrase.4.relaxation",
        "at": 28.28,
        "text": "Put the sequence in order: impulse spread, calcium release, cross-bridge force, calcium removal, and relaxation.",
        "title": "relaxation · measured spoken phrase",
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
          "route": "routeB",
          "stage": "filaments",
          "simulation": {
            "kind": "cellular",
            "stage": "relaxed",
            "occurrence": "last"
          },
          "detail": "This existing enlarged cell/tissue/filament view is representative, not measured microscopy, a traced enlargement or an ion-channel/molecular solver. It retains the original heart return context. Cell membrane voltage, qualitative Ca²⁺ cue, regional mechanical activation and surface ECG are different signals; microgeometry does not calculate chamber pressure. Measured phrases will inspect activation, Ca²⁺ release, filament force, Ca²⁺ removal and full relaxation in order."
        },
        "alignment": {
          "kind": "phrase",
          "end": 29.25,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s04",
          "phrase": "relaxation",
          "firstWordIndex": 61,
          "lastWordIndex": 61
        }
      },
      {
        "id": "M04.12.s05",
        "at": 29.86,
        "text": "Then return to the original heart and trace S A node to Purkinje fibers.",
        "title": "Then return to the original heart and trace S A node to Purkinje fibers.",
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
            "kind": "cycle",
            "seconds": 0,
            "speed": 0.1,
            "anchorAudio": 29.86
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. This explicit return restores the original registered HRA heart. The audio-owned playback demonstrates the normal model pathway; manual Explore remains available for each structure."
        },
        "alignment": {
          "kind": "sentence",
          "end": 34.71,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s05",
          "firstWordIndex": 62,
          "lastWordIndex": 75
        }
      },
      {
        "id": "M04.12.phrase.5.s-a-node",
        "at": 32.1,
        "text": "Then return to the original heart and trace S A node to Purkinje fibers.",
        "title": "S A node · measured spoken phrase",
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
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. This explicit return restores the original registered HRA heart. The audio-owned playback demonstrates the normal model pathway; manual Explore remains available for each structure."
        },
        "alignment": {
          "kind": "phrase",
          "end": 33.25,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s05",
          "phrase": "S A node",
          "firstWordIndex": 70,
          "lastWordIndex": 72
        }
      },
      {
        "id": "M04.12.phrase.5.purkinje-fibers",
        "at": 33.41,
        "text": "Then return to the original heart and trace S A node to Purkinje fibers.",
        "title": "Purkinje fibers · measured spoken phrase",
        "scene": {
          "organ": "heart",
          "selected": "purkinje",
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
            "stage": "Purkinje-myocardium"
          },
          "detail": "The registered HRA heart retains its original coordinates and four-chamber/residual-blood context. Green pathways indicate inferred route location, yellow pulse/violet nodes indicate current activity, and white inspection is separate. Paths/nodes are inferred teaching geometry, not segmented conduction tissue, measured fibers or conduction velocity. Atrial spread routes are parallel; AV delay is localized, not distributed evenly. This explicit return restores the original registered HRA heart. The audio-owned playback demonstrates the normal model pathway; manual Explore remains available for each structure."
        },
        "alignment": {
          "kind": "phrase",
          "end": 34.71,
          "machineMeasured": true,
          "humanListeningQA": false,
          "sourceSentence": "M04.12.s05",
          "phrase": "Purkinje fibers",
          "firstWordIndex": 74,
          "lastWordIndex": 75
        }
      }
    ],
    "qualification": "Existing M04 narration with measured local alignment. Frame granularity is10 ms, not a ±10 ms accuracy claim; human listening/pronunciation and native visual synchronization review remain pending. Scene sweeps/cycles are audio-owned instructional pacing through existing shared model/cellular outputs, not measured cell physiology, conduction velocity or one literal tracked impulse/ion. Named inspections may compare separate model stages; selection remains distinct from timed activation. Cell, calcium and filament scenes are existing representative teaching views; they are not measured enlargements or a molecular/ion-channel solver. Unsupported mechanisms use explicit supplemental explanation cards instead of unrelated 3D highlighting; returning cues restore a complete supported heart scene.",
    "source": {
      "libraryFileId": "libfile_8c020d6fe95481918a074614fac6fea1",
      "fileName": "Complete Audiobook Script - All 10 Slideshows (Speechify)(1).md",
      "sha256": "7e3e99bb55ec291d61dd4924ac0195590d9971c9dd4128af12284e846c208ce0",
      "sourceLines": "480-505;871-881",
      "approvedAdaptation": "Website_Guided_Cardiorespiratory_Lesson_Draft.md / adaptation-v1",
      "courseReference": {
        "libraryFileId": "libfile_b6e5d46286d08191bf94e0d462359071",
        "fileName": "All Slideshows Combined (01-13).pdf"
      },
      "audioPackageLibraryFileId": "libfile_327e0e2453dc8191ac792e95e15f0654"
    },
    "sourceLabel": "Owner-approved adapted M04 narration · source script lines 480-505;871-881",
    "sourceUrl": "guided-study/assets/M04-provenance.json",
    "status": "Audio and measured source scene bindings available; native integration review pending",
    "audioStatus": "Delivered MP3 reused byte-for-byte; no new generation",
    "alignmentStatus": "Machine-measured10 ms frame grid; actual listening QA pending"
  }
];
 const existing=Array.isArray(root.GuidedStudyLessons)?root.GuidedStudyLessons:[];
 const present=new Set(existing.map(lesson=>lesson.id));
 root.GuidedStudyLessons=existing.concat(lessons.filter(lesson=>!present.has(lesson.id)));
 if(typeof module==='object'&&module.exports)module.exports=lessons;
})(typeof window==='object'?window:globalThis);
