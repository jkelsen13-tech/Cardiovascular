# Cardiovascular Monitor Technician — Practice Test

A single self-contained, offline, mobile-friendly HTML study quiz for the
Cardiovascular Monitor Technician (CMT) class.

## Use
Open **`cmt-quiz.html`** (or **`index.html`**) in any web browser. No internet, server, or install required. Choose **ECG Waves & Intervals** on the home menu for flashcards and the interactive conduction slider; use **ECG Rhythm Practice** for source-strip interpretation.

## Structure
Every question is tagged with a **module** (a class test unit) and a **unit** (one source
deck inside a module). The study picker is built dynamically from these tags, so adding a
new deck later is just new questions tagged `module:N / unit:M` — the new unit, module
preset, and Module Test appear automatically with no code changes. (Topic overlap never
implies the same unit — source/timing decides.)

Units are scoped **per module**: the picker keys on the `module:unit` pair, so the same unit
number can appear in more than one module without their pools merging (e.g. Module 1's
Unit 3 and Module 6's Unit 3 are separate decks).

- **Module 1** — Unit 1 (History, Topographic & Respiratory), Unit 2 (Cardiovascular A&P),
  Unit 3 (Leads, Waves & Electrophysiology).
- **Module 2** — Unit 4 (Rhythm Interpretation & Sinus Rhythms).
- **Module 6** — Unit 3 (Heart Blocks & Pacemakers).

## Modes
- **Random Practice Test** — randomized subset (default 25; adjustable up to the full
  pool). Scope it by checking any units, a whole module preset, or Everything / Final
  Practice; the available-question count updates and caps to your selection.
- **Module Test** — a dedicated practice test scoped to one module's full pool (all its
  units combined) to simulate that module's exam; test-length default, editable.
- **Study by Topic** — drill one topic, limited to topics within your selected scope.

## Features
- One question at a time with instant feedback (correct in green, wrong in red).
- A 1–3 sentence explanation tied to the source concept on every answer.
- Live progress counter and running score.
- Embedded schematic diagrams with numbered-structure identification questions
  (directional terms, body planes, chest landmarks, heart structures, heart-wall layers,
  cardiac conduction system, ECG waveform, ECG graph paper, Einthoven's triangle).
- **📎 Slide-reference photos** pulled from the course slide decks, shown above the
  question on Position/Direction, Flow, and Oscillation topics (directional terms, body
  planes, landmark lines, circulation circuits, conduction system, autonomic control,
  ECG paper, ECG waveform/intervals, action potentials, and deflection direction).
- **ECG Waves & Intervals** — flip flashcards (including reverse term↔definition), an interactive
  seven-stage ECG/heart slider (P → PR → QRS → ST → T → U → TP) with persistent patient L/R labels,
  optional PR/QRS/J/ST/QT/U/TP landmarks on the tracing, and a short quiz with immediate feedback.
  Native SVG/CSS (not pasted screenshots). Open it from
  the home menu; keep the `ecg-study/` folder beside the HTML for downloaded copies.
- **Interactive ordering & labeling questions** (Canvas-style), graded per slot with
  partial credit (e.g. "9 / 12 correct"): sequence the conduction pathway and the
  reverse blood-flow path; label the heart-wall layers and heart-structure diagrams.
- Results screen: score, pass/fail (80% pass mark), per-topic breakdown,
  "topics you missed most," full review of every missed question with its explanation,
  and a Retake button that re-randomizes.

## Sources
Built entirely from the uploaded course materials:
- **Lecture slideshows** (History & Topographic Anatomy; Respiratory A&P) and the **Class Study Guide** — content the questions are pulled from.
- **Week 1–3 Student Assignment Booklets** and the slideshows' own "Progress Check" prompts — the model for question style, scope, and difficulty.
- **Class Study Guide** — topic weighting (heavier-emphasis modules get more questions).

Questions marked with a ⚑ flag note any added connecting fact or a point of ambiguity in the
source. Diagrams are clean schematic reconstructions drawn to match the source descriptions
and the booklet labeling exercises; they are illustrative and not to anatomical scale.

## Bank
457 questions across the topic set: ECG History & The Profession, Topographic Anatomy,
Respiratory System, Blood & Vasculature, Pulmonary & Systemic Circuits, Heart Anatomy,
Electrophysiology & Conduction, Leads & Cardiac Axis, ECG Waves & Measurements,
ECG Rhythms, Electrical Therapy (AED/Pacing), 12-Lead ECG & ACS, and National Testing Terminology.

## Source-based ECG training

The ECG practice mode uses 13 reviewed course raster strips with staged observations, delayed answer review, exact option scoring and per-strip provenance. Keep the `ecg/` folder beside either HTML entry point. See [ECG-REVIEW.md](ECG-REVIEW.md) for coverage, source limits, rejected examples and verification. The original question bank and other study modes are preserved.

## Anatomical 3D ECG heart

The ECG study slider now lazy-loads an anatomical HRA heart with separate chambers, valves and major vessels. Choose **3D anatomy** or **Simplified view**. The anatomical viewer supports cutaway, reset/front, drag/pinch/keyboard orbit and zoom, conduction, blood-flow arrows and labels. The same seven-stage state drives the tracing, text and heart; flashcards and quiz remain unchanged.

Keep the entire `ecg-study/` folder for offline use. Assets are base64-packaged GLBs decoded locally so direct `file://` opening needs no server. Model loading or WebGL failure automatically retains the simplified SVG. The 3D payload is about 5.7 MB plus a local Three.js/GLTFLoader bundle, loaded only when the anatomical module view opens.

See [model attribution and limitations](ecg-study/assets/ATTRIBUTION.md) and [exact asset manifest](ecg-study/assets/model-manifest.json). The heart is reference anatomy; contraction, conduction and blood arrows are schematic teaching overlays. The U wave has no invented mechanical event. On small screens, use cutaway and overlay toggles to reduce crowding. Reset/front restores patient-right on the viewer's left after rotation.
