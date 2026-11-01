# Source slideshow and guided simulation separation

Baseline: published main 8c754cf730c0bc44d9c771173b0b7a708a15c93f (October 31, 2026).

## Confirmed cause

The source-ordered course reused the simulation tour's scene objects. In Unit 1 Lesson 3, M01.03.s02 at 4.01 seconds explicitly selected the right lung. Lesson 4 also reused a heart cue and lead-lab cues. These cues are appropriate only in an explicitly chosen adapted tour, not as automatic replacements for source slides.

## Correction

The course controller now resolves a presentation-specific cue before dispatch, prefetch, seek and resume. All 84 source lessons use source images; no source cue can open a simulator or explanation overlay. The optional guided simulation/concept-tour entry retains the original audio-driven model cues, the shared player and exact course return.

Directional narration uses the actual body-arrow diagram on PDF page 27 and body-plane diagram on page 28. The second clip uses pages 26/27 for definitions and proximal/distal diagrams. Chest landmarks use pages 30-34. The existing G01-G09 measured source-page cues are retained. All recorded words, timing anchors, 120 MP3s, source content, question banks and progress schema remain unchanged.

For other adapted clips without reviewed phrase-to-page mappings, the controller holds their already verified primary source page and explicitly discloses that it is an overview, not phrase-level slide alignment. This corrects cross-mode routing throughout the course; it does not claim a new full listening audit or perfect per-sentence coverage of all 911 source pages.

## Jitter safeguards

Source metadata is fetched once; matching images are decoded before presentation, and warm unchanged images are not blanked or reassigned. Stale completions are guarded. Slideshow cues never create a 3D renderer. Semantic UI text is updated on state changes rather than rebuilt on every audio tick. Captions and the source viewing box have stable dimensions; 4:3 and 16:9 pages are contained without stretching. Existing manual-page hold, Follow narration, question Reveal, silent resume and explicit simulation detours are preserved.

## Verification

Run `node tools/sequential-course/verify-presentations.cjs` for all 84 source lessons, 856 cue placements, untouched tour cues, audio-byte checks and progress compatibility. Run `node tools/sequential-course/presentation-browser.cjs` over HTTP for actual source lesson entry/seeking, native audio through the reported 4.01s boundary, stable image presentation, manual hold, Explore, explicit simulation return, consecutive clips, question gating, stale loads, failed images and enlarged layouts. Existing public-runtime checks remain unchanged.

Browser results must be read from the current workflow, not assumed from test presence. Viewport emulation is not physical iPad Safari testing. This change does not regenerate narration, spend synthesis credits, replace the medical models or certify clinical accuracy.
