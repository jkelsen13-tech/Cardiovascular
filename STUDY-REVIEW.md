# Study-bank teaching upgrade — 2026-09-09

## Previous behavior

The existing single-page application contains 611 active questions: 606 multiple-choice, two ordering and three labeling exercises. Every question already had an explanation, although several were short or merely repeated a key. The standard quiz displayed that explanation after answering. Game mode substituted other questions' correct answers for the question's authored distractors, and could include ordering/labeling objects without multiple-choice options. Label/ordering feedback identified the correct text without explaining each structure or step. Many labeled reference slides appeared before the answer, making recall questions answerable by reading the illustration.

## What changed

- Kept the existing bank, 611 stable indices, navigation, topics/modules, quiz modes, 80% threshold, fractional slot scoring and separate verified ECG trainer.
- Both standard and game modes now show a question-specific “Why” explanation. Wrong selections also show the learner's choice and the correct choice. Missed-question reviews retain the teaching explanation and visuals.
- Game mode uses each question's four authored options. Only eligible active multiple-choice questions enter its queue. Duplicate submissions and advancing before answering are guarded.
- Added explanatory notes for all 53 slots across the five ordering/labeling exercises. Wrong rows explain the correct structure or transition, and the complete role/step review is available afterward.
- Added 29 reviewed slide illustrations to 180 questions. Each has a learning cue and chapter/page reference. These include photographic material, anatomical illustrations, conduction/lead maps and interval schematics; they are not all clinical photographs.
- Moved 102 labeled slide-reference placements out of the unanswered question. Images needed to identify numbered structures and existing image questions remain visible. The new source images load only after the learner answers and opens the slide review.
- Added image enlargement with keyboard/Escape support, preserved image proportions, and image-load failure/retry feedback that leaves the earned score and text explanation intact.
- Reused 32 other existing reference placements after answering; their exact PDF-page provenance was not reverified, and the interface says so.
- No new files were saved to the user's local device. PDF inspection, rendering and code preparation used memory; repository writes and browser-test files were on GitHub.

## New slide-image inventory

Page numbers are one-based pages in the supplied individual chapter PDFs, not inferred combined-PDF page numbers.

| Chapter | Pages used | Main learning use |
|---|---|---|
| 01 History / topographic anatomy | 16, 27, 28, 30, 32 | Historical recording, direction, planes, chest landmarks |
| 02 Respiratory anatomy / physiology | 10, 13, 17, 27, 33, 45, 49 | Upper/lower airway, pleura, ventilation, diffusion, oximetry, capnography |
| 03 Cardiovascular anatomy / physiology | 9, 28, 47, 51, 66, 105, 115 | Heart layers, valves, lumen size, plaque, circulation, conduction, autonomic influence |
| 04 Electrophysiology / leads / measurements | 26, 40, 46, 51, 58 | Lead direction, frontal/transverse views, waveform and interval landmarks |
| 10 Pacemakers | 6, 11 | Generator/leads and chamber arrangements |
| 11 Circulation / ACS / 12-lead ECG | 4, 35, 51 | Coronary vessels, lateral leads, posterior placement |

Full file names, PDF hashes, output hashes, dimensions, crop coordinates and question associations are recorded in [study/source-audit.json](study/source-audit.json).

Pages were rendered at a uniform 1440-pixel page width. Three images use rectangular crops around the illustration (heart layers, PR and QT); no waveform or anatomical feature was redrawn. JPEG images use quality 88 and unchanged proportions. They teach concepts and do not support new patient-specific ECG measurements. Interval schematics are explicitly identified as diagrams.

## Corrections and teaching clarifications

The following bank indices are zero-based stable internal identifiers.

| Index | Change |
|---|---|
| 41 | Clarified 12 **pairs** of ribs and 11 spaces on each side. |
| 51, 52, 58 | Corrected alveolar gas exchange versus the conducting airways, including terminal bronchioles. Replaced the misleading “only way” oxygenation question with a diffusion question. |
| 61, 83 | Scoped 94–99% to the course slide and removed the implication that 100% is inherently abnormal or proves oxygen toxicity. |
| 72 | Distinguished the nasopharynx from the nasal cavity. |
| 86 | Distinguished red-cell gas transport from nutrients carried mainly in plasma. |
| 121 | Replaced the false epicardial conduction key with a precise question about the subendocardial Purkinje network. |
| 158 | Distinguished the Na+/K+ pump's gradient-maintenance role from channel-mediated action potentials. |
| 163 | Corrected the nodal phase-0 upstroke to calcium-dependent depolarization. |
| 199 | Expanded the J-point explanation using waveform boundaries. |
| 299 | Removed a fixed 3–4 minute myocardial-death threshold. |
| 323 | Added a worked cardiac-output calculation with unit cancellation. |
| 368 | Replaced an unconditional half-RR “normal QT” rule with QT versus QTc interpretation. |
| 373–376 | Explained the axis quadrants and added Lead II to distinguish true left-axis deviation from the normal 0° to −30° range. |
| 555 | Corrected pulseless standstill/asystole teaching: cardiac-arrest CPR/epinephrine/reversible causes, rather than routine atropine/pacing. |

Supporting references are linked in affected feedback where applicable:
[Respiratory anatomy](https://www.ncbi.nlm.nih.gov/books/NBK594996/),
[FDA oximetry](https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics),
[Heart anatomy](https://www.ncbi.nlm.nih.gov/books/NBK482452/),
[SA node physiology](https://www.ncbi.nlm.nih.gov/books/NBK459238/),
[Axis interpretation](https://www.ncbi.nlm.nih.gov/books/NBK470532/),
[Myocardial viability](https://www.ncbi.nlm.nih.gov/books/NBK592410/), and
[AHA Adult Advanced Life Support](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support).

## Rejected images and provenance

The chapter 02 p.16 video still was rejected in favor of a clearer airway illustration. Chapter 03 pp.43–44 are text-only and add little as image evidence. The chapter 03 p.48 watermarked stock image was not added. The heart-wall and interval crops exclude surrounding statements that could confuse the teaching point; chapter/page provenance is retained.

No external images or paid-license assets were introduced. All 29 new images come from the user's supplied course PDFs. These are not represented as openly licensed or independently cleared for unrestricted redistribution. Source credits visible in the selected slides remain in the rendered images; the audit preserves source file/page information for every crop. External clinical references supply text validation only.

## Verification

The GitHub-hosted test suite checks all 606 multiple-choice questions with every one of their four selections in both modes (2,424 selections per mode). It checks unique authored options, valid keys, question-specific explanations, wrong-answer contrasts, repeated submission, missed-review choices, all five slot exercises with full/zero/partial credit, and all 53 slot notes.

Browser checks cover each of the 29 new images, delayed requests, source hashes, natural dimensions, mixed results totals, mobile/tablet/desktop overflow, image enlargement and Escape, keyboard answering, missing-image retry, and synchronized HTML entry points. The existing ECG verification suite also runs.

The first run exposed a test selector that counted hidden result-review notes alongside current-question notes. The assertion was scoped to the current feedback panel. Final workflow status and any later findings are recorded in the pull request.

## Limits and next expansion

This is a teaching-interface upgrade and a targeted correction pass, not a clinician-certified audit of every course statement or every inherited image. The remaining question-specific explanations are preserved, not claimed to have been independently rewritten for every distractor. Text-only concepts retain text feedback when an image would add little.

The 29 new images are **not** additional verified rhythm strips. The 13 reviewed ECG trainer examples and the previously documented missing-rhythm list are unchanged; see [ECG-REVIEW.md](ECG-REVIEW.md). Existing numbered worksheets and three Week 7 image questions were preserved without newly certifying their original answer keys.

This remains a static self-study application. Post-answer images avoid accidental hints, but deliberate inspection of the public code can reveal answers. Future work should prioritize clinician review of inherited clinical statements, exact provenance for remaining legacy references, and the pending ECG strip coverage rather than adding decorative pictures.
