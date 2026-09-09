# ECG training review — 2026-09-09

## Previous behavior and scope

The two identical HTML entry points contained nine randomized SVG waveform generators. Grading used diagnosis-wide ranges and substring checks; it did not measure the displayed waveform. In read-only probes, “P waves not present” passed as present, and a VF answer of 100 bpm / PR 0.16 s passed as unmeasurable. Practice headings revealed the rhythm, and PR graphics joined wave centers.

This change replaces only the ECG trainer. The question bank, ordinary quizzes, topic/module navigation, labeling and Kahoot code remain in the original HTML. Both entry points are kept identical. Synthetic ECG generators are removed from this mode. Source ECG raster crops are evidence; these are not generated replacements.

## Source review

All 13 numbered course PDFs were supplied, separately. The combined PDF itself was not available; citations use the supplied chapter and its one-based PDF page. No combined-page number is treated as authoritative without the chapter match.

| Course file | Pages | Relevance |
|---|---:|---|
| 01 History of the ECG and Topographic Anatomy | 47 | Background |
| 02 Respiratory Anatomy and Physiology | 58 | Background |
| 03 Cardiovascular System Anatomy and Physiology | 118 | Background |
| 04 Electrophysiology — Leads, Waves and Measurements | 142 | Time scale and measurement context |
| 05 Systematic Approach to Rhythm Interpretation | 87 | Staged workflow and worked strip |
| 06 Chapter 4 — Sinus Rhythms | 77 | Sinus, bradycardia, tachycardia, arrhythmia, pause/arrest |
| 07 Chapter 5 — Atrial Rhythms | 104 | Wandering atrial pacemaker, PACs, atrial tachycardia, flutter, fibrillation |
| 08 Chapter 6 — Junctional Rhythms | 75 | Junctional escape/accelerated/tachycardia, PJC, broad SVT |
| 09 Chapter 7 — Heart Blocks | 97 | First degree, Mobitz I, Mobitz II, complete block |
| 10 Pacemakers | 36 | Pacing and malfunction examples |
| 11 Circulation in the Heart, ACS and 12-Lead ECG | 52 | ACS/12-lead material |
| 12 Sample 12-Lead Rhythm Strips | 17 | Additional worked examples |
| 13 Summary | 1 | Course summary |

The relevant rhythm chapter headings, example images, and systematic worked pages were reviewed. This is not a clinical audit of all statements throughout all supplied course pages.

## Included strips

| Neutral ID | Source | Supported interpretation | Specific evidence |
|---|---|---|---|
| a6d28f | 05 p.64; worked pp.65–71 | Normal sinus rhythm | Eight complexes in six seconds, uniform preceding P, normal-range PR, narrow QRS |
| b9e407 | 06 p.20 | Sinus bradycardia | Even R–R, about 29 small squares (~52 bpm), small preceding P |
| c2f861 | 06 p.29 | Sinus tachycardia | Even fast R–R, repeated upright pre-QRS deflections; PR onset obscured by T overlap |
| d7a350 | 06 p.39 | Sinus arrhythmia | Variable R–R, preserved sinus P pattern; breathing not recorded |
| e4b916 | 07 p.30 | Atrial flutter | Regular ventricular timing, repetitive sawtooth atrial waves |
| f8c205 | 07 p.42 | Atrial fibrillation | Irregular timing, no repeating discrete P; slow average ventricular response |
| g3d782 | 09 p.10 | Sinus rhythm with first-degree AV block | Regular sinus conduction, fixed PR longer than five small squares |
| h5e139 | 09 p.20 | Mobitz I / Wenckebach | Repeated two-beat groups, increasing conducted PR then a nonconducted P |
| j1f624 | 09 p.50 | Complete AV block | Faster independent atrial activity, slow regular narrow ventricular escape |
| k8a473 | 08 p.16 | Junctional escape | About 41 bpm, narrow QRS, inverted post-QRS atrial deflections |
| m2b695 | 08 p.20 | Accelerated junctional | About 75–80 bpm, narrow QRS, no distinct preceding P; source-supported interpretation with moderate confidence |
| n6c048 | 08 p.23 | Junctional tachycardia | About 107 bpm, narrow QRS, short-coupled inverted pre-QRS atrial deflections |
| p4d827 | 08 p.31 | Broad regular narrow-complex tachycardia / SVT | Rapid regular narrow bases; atrial activity unresolved, mechanism not over-specified |

This is 13 examples across 13 teaching interpretations, with 79 assessed fields. These are visual/source reviews by an AI assistant, not independent clinician certification. The supplied teaching rasters do not identify original patient recordings or acquisition equipment; no such provenance is invented.

## Image preparation and provenance

Images are decoded directly from the embedded raster in the PDF. Diagnosis text below the grid is removed with a rectangular crop; no waveform points are generated, redrawn, denoised, sharpened, stretched, straightened, or selectively erased. PNG output is lossless. The decoded prepared image was compared pixel-for-pixel with the corresponding source crop and matched for every included image.

The per-strip post-submission review records the source PDF SHA-256, one-based page, embedded image name, original dimensions, exact crop bounds, output PNG SHA-256, evidence, confidence and limitations. The complete source audit is also in `ecg/source-audit.json`, which the trainer does not load.

No external ECG images were added, and no paid licenses were introduced. Source pages credit Gail Walraven / Pearson, Basic Arrhythmias, eighth edition, © 2017, 2011, 2006 where shown. Attribution is retained in post-submission feedback. These user-supplied teaching materials are not represented as openly licensed or independently cleared for unrestricted redistribution.

## Questions, scoring and answer exposure

Learners first choose regularity, approximate ventricular rate, atrial activity, PR relationship and QRS width. The final rhythm question appears after those observations are completed. Nothing is graded or explained before final submission. Radio inputs, fieldsets, visible focus, keyboard controls, image enlargement and screen-reader status messages support accessibility.

Only neutral image IDs, options and prompts are loaded initially. Images, titles, alt text and pre-answer captions contain no keyed diagnosis. The individual review script is requested only after a complete submission. It contains answers, evidence and provenance. Failure to load either image or review does not create a score; retry preserves choices for a failed review.

This remains a static, self-study application. Its public repository and deliberately requested review URLs can be inspected; this is not a secure examination backend. Post-submit loading prevents accidental answer exposure, not deliberate source-code lookup. Repeated practice may also be familiar to the learner.

The ordinary study app remains offline-capable. ECG works when its accompanying `ecg/` directory is kept beside either HTML entry point; it uses local script loading rather than fetch-only JSON for file:// compatibility.

## Corrections and limitations in answer keys

- Removed diagnosis-level substring grading and broad diagnosis-derived rate tolerances.
- Rate is estimated for the specific displayed strip, using the course's 25 mm/s grid convention; that convention is explicitly shown rather than silently inferred. Irregular examples use whole-strip counts.
- First-degree block includes the underlying sinus rhythm.
- The AFib example has a slow response; it is not assigned a textbook rapid rate.
- Complete block has a narrow QRS in this specific source example, not the old universal wide-QRS key.
- Junctional P descriptions distinguish the actually visible before/after/undiscernible atrial activity. A P said to be hidden is not claimed to have been observed.
- Sinus tachycardia PR is not measured because the P onset blends with the preceding T wave.
- The systematic exercise reports QT 0.40 s, but the crop's T-end is insufficiently crisp for enforcing an exact QT/QTc value. Its QT question teaches that limitation.
- Source SVT rate is labeled 180 bpm; the grid supports the broader 150–199 choice, so 180 is not required. Clipped source peak tops prevent amplitude/full-morphology assessment.
- The old multipart patch's overlapping rate/QRS choices and pre-answer diagnoses are not retained. Its “verified” flags alone were not accepted as evidence.

## Rejected or deferred examples and coverage gaps

- Heart Blocks p.36 is labeled Mobitz II but shows a consistent 2:1 pattern. That displayed relationship alone does not reliably establish Mobitz I versus II. It is excluded from a forced Mobitz II identification key. This limitation agrees with the [2018 ACC/AHA/HRS guideline, section 6.2](https://www.ahajournals.org/doi/full/10.1161/CIR.0000000000000628). This external reference supplies no image asset.
- The other patch complete-block image is redundant for this initial set; a clearly reviewed p.50 example is included.
- The second normal-sinus and post-treatment sinus-tachycardia patch examples are redundant for the present set.
- The patch's sample-12-lead/PVC key and exact measurements have not been independently re-established against the displayed lead crop. That example is not shipped as verified.
- Wandering atrial pacemaker, PACs, atrial tachycardia, sinus pause/arrest, premature junctional complexes, variable-block flutter and paced/malfunction examples have curriculum coverage but still need their own completed image/measurement audits before inclusion.
- Mobitz II needs a sufficiently long example showing conducted PR behavior, not a forced subtype from 2:1 block.
- VT/VF were in the prior synthetic trainer but do not yet have an independently verified source example in this set. No new curriculum requirements were inferred.
- The many unlabeled chapter practice strips have not been exhaustively adjudicated. They are possible future sources, not verified inventory.

## Verification

Performed locally in memory only: source extraction; pixel-identity comparison of all 13 crops; source/output hashes; visual review of each source waveform; observation-to-interpretation audit; JavaScript syntax checks. No new files were written to the user's device.

The GitHub-hosted workflow `ECG training verification` checks synchronized HTML, all 79 keys and every individual distractor, image hashes/dimensions, no initial keyed data, every image's browser rendering, staged interpretation, delayed review requests, exact scoring, repeated-submit handling, partial test totals, image/review failure recovery, keyboard inputs, aspect ratios and overflow at 390/768/1280 px, plus existing-mode smoke checks. Its run is the authoritative automated test result; screenshots are emitted into cloud logs for visual review without a local download.

Future expansion should prioritize a clinician-reviewed Mobitz II example, source-verified ectopy/pacing examples, and measured QT examples with a clear T endpoint and specified correction formula. Add a server-side submission/grading service only if deliberate answer inspection must be prevented.
