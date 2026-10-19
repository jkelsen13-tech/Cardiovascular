# Cardiovascular Monitor Technician — Practice Test

A single self-contained, offline, mobile-friendly HTML study quiz for the
Cardiovascular Monitor Technician (CMT) class.

## Use
Open **`cmt-quiz.html`** (or **`index.html`**) in any web browser. No internet, server, or install required. Choose **ECG Waves & Intervals** on the home menu for flashcards and the interactive conduction slider; use **ECG Rhythm Practice** for source-strip interpretation. Choose **Lead Placement Lab** for a guided 3D/2D torso walkthrough, chest and limb lead exploration, reversible placement flashcards, and a placement quiz.

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
- **Lead Placement Lab** — guided placement in the preferred V1 → V2 → V4 → V3 → V5 → V6
  sequence, a rotatable registered upper-torso surface with real rib, sternum, clavicle, costal-cartilage
  and pectoralis-major geometry plus anatomy-derived landmark layers,
  chest and limb lead exploration, reversible flashcards, and mixed placement/plane/pairing quizzes.
  The viewer preserves front-view patient orientation (viewer left = patient right), is touch rotation
  opt-in, and falls back to a native SVG/HTML torso map if WebGL is unavailable. Keep the
  `lead-placement/` folder beside the HTML for offline use.
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

## Lead-placement 3D torso

The Lead Placement Lab lazy-loads a torso subset from BodyParts3D / Anatomography by the Database
Center for Life Science (DBCLS), licensed CC BY 4.0. Skin, sternum, clavicles, all paired ribs,
costal cartilages 1–7 and all three parts of the bilateral pectoralis major come from the same
verified BodyParts3D coordinate frame. The 50 selected source OBJs total 28,650,246 bytes and
420,806 triangles. After a source-coordinate torso crop and conservative per-structure vertex
clustering, the local GLB is 3,529,136 bytes and 194,563 triangles before base64 packaging. The
module reuses the existing local Three.js/GLTFLoader runtime and makes no runtime network request.
Instructional landmark lines and lead markers are derived from and projected onto that registered
geometry; they are overlays, not additional anatomical meshes. See [asset attribution and
limitations](lead-placement/assets/ATTRIBUTION.md), the [summary manifest](lead-placement/assets/model-manifest.json),
and the [per-structure build manifest](lead-placement/assets/registered-thorax-manifest.json).


## Integrated heart, respiratory and study update

The complete main-site experience includes Heart v3's four-chamber section, signed model flow, chamber traces and26 organ-to-mechanism scenes; the preserved Heart v2 lessons/calculations and30 original questions; respiratory mechanics, connected airway explorer, magnified exchange and capnography with20 original questions; the corrected registered lead lab; and the persisted original100-question ASPT mock. The original study bank, ECG trainer, existing media and source-index answer ordering remain.

All modules load local files. Existing URLs and progress namespaces remain; no progress reset or migration occurs. New anatomy assets retain their exact HRA/CC BY4.0 provenance. See [source notices](COPYRIGHT.md), [heart model](docs/HEART-V3-NUMERICAL-MODEL.md), [heart anatomy](docs/HEART-V3-ANATOMY.md), [interface/progress](docs/HEART-V3-INTERFACE.md), and [respiratory explorer](docs/RESPIRATORY-EXPLORER.md). `BUILD-IDENTITY.json` identifies the public runtime snapshot and individual file hashes.

These are instructional models, not validated clinical predictions. Physical iPad/Safari, VoiceOver and educator qualification remain unexecuted. The30fps goal was not met in software-rendered cloud measurements. No private course PDF, new course-image asset, private audit/report/log or restoration archive is published with this update.
