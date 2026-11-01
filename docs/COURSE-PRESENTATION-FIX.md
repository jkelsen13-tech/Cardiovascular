# Source slideshow and guided simulation separation

Baseline: published main 8c754cf730c0bc44d9c771173b0b7a708a15c93f (October 31, 2026).

## Confirmed cause

The source-ordered course reused the simulation tour's scene objects. In Unit 1 Lesson 3, M01.03.s02 at 4.01 seconds explicitly selected the right lung. Lesson 4 also reused a heart cue and lead-lab cues. These cues are appropriate only in an explicitly chosen adapted tour, not as automatic replacements for source slides.

## Correction

The course controller now resolves a presentation-specific cue before dispatch, prefetch, seek and resume. All 84 source lessons use source images; no source cue can open a simulator or explanation overlay. An explicit optional selection may open one of47eligible preserved simulation recordings (orientation audio is excluded). Old optional bookmarks without an explicit simulation flag remain audio-only. The simulation entry retains the original audio-driven model cues, the shared player and exact course return.

Directional narration uses the actual body-arrow diagram on PDF page 27 and body-plane diagram on page 28. The second clip uses pages 26/27 for definitions and proximal/distal diagrams. Chest landmarks use pages 30-34. The existing G01-G09 measured source-page cues are retained. All recorded words, timing anchors, 120 MP3s, source content, question banks and progress schema remain unchanged.

The successor of main2741566 adds the versioned sequential-visuals manifest: all856cue placements across135recording placements and84source lessons have reviewed, lesson-local page bindings. These reuse the actual existing speech anchors; no proportional timestamps are created. Some narration is only a contextual summary, and the manifest records context holds, partial coverage and off-topic clauses instead of claiming a matching diagram exists. Source questions with answers printed on their image remain behind Reveal, while verified answer-free practice strips remain visible. Original blank pages and eight repeated Pacemakers title templates have explicit dispositions without inventing lessons or units. This is not a claim of perfect sentence-level coverage or a full listening audit of the911-page source.

## Jitter safeguards

Source metadata is fetched once; matching images are decoded before presentation, and warm unchanged images are not blanked or reassigned. Stale completions are guarded. Slideshow cues never create a 3D renderer. Semantic UI text is updated on state changes rather than rebuilt on every audio tick. Captions and the source viewing box have stable dimensions; 4:3 and 16:9 pages are contained without stretching. Existing manual-page hold, Follow narration, question Reveal, silent resume and explicit simulation detours are preserved.

## Verification

Run `node tools/sequential-course/verify-presentations.cjs` for all 84 source lessons, 856 cue placements, untouched tour cues, audio-byte checks and progress compatibility. Run `node tools/sequential-course/presentation-browser.cjs` over HTTP for actual source lesson entry/seeking, native audio through the reported 4.01s boundary, stable image presentation, manual hold, Explore, explicit simulation return, consecutive clips, question gating, stale loads, failed images and enlarged layouts. Existing public-runtime checks remain unchanged.

Browser results must be read from the current workflow, not assumed from test presence. Viewport emulation is not physical iPad Safari testing. This change does not regenerate narration, spend synthesis credits, replace the medical models or certify clinical accuracy.

The supplied November1repair matched the earlier8c754cf before hashes, while current main2741566 had newer runtime hashes. Its policy/loading safeguards were reconciled into that newer main rather than blindly applied. Compatibility APIs and all original simulation assets are retained. The complete reviewed source bindings and safe image preparation are covered by verify-slide-bindings.cjs, slide-runtime.cjs, slide-interactions.cjs and slide-image-failure.cjs. The native interaction suite plays a complete real two-clip lesson, crosses a real unit boundary, checks same-recording source/optional ledger isolation and tests phone/tablet reflow and touch targets.
