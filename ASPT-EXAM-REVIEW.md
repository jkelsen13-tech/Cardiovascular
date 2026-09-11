# ASPT National EKG Exam — September 22, 2026

The existing site had 611 active class questions, shared answer explanations and source illustrations, and a separate 13-example source ECG trainer. It had no dedicated ASPT blueprint. This addition preserves those engines and adds 19 lessons, all 91 numbered guide terms, 26 competency mappings, 176 audit rows, 24 focused practice questions, a diagram lab and a separate 22-item Exam-Day Requirements reference.

## Sources and scope

Primary: supplied 2026 EKG Study Guide .docx 2.pdf, 9 pages, revised January 2026. Compared against all 13 supplied numbered chapter PDFs (911 pages), the existing question bank, source images and prior ECG/study audits. The combined slideshow file itself was not available; all 13 constituent chapter PDFs were used. ZIP patch copies were not reapplied over the functioning repository. The guide supplies exam scope; no exam question count or rhythm subtype weighting is invented.

## Coverage

- Covered but needs reinforcement: 17
- Covered completely: 135
- Missing from class materials: 24

Statuses describe source coverage, not learner mastery. The 24 missing-from-class rows include 22 administrative requirements supplied by the guide and two uncommon heart labels given explicit supplemental explanations. No topic is omitted for lack of class coverage. The exhaustive machine-readable checklist is aspt/coverage.json and the website Coverage checklist; aspt/blueprint.json preserves the 91 exact numbered terms and 26 competency IDs independently for regression checks.

## Images and preparation

- g01: ASPT 2026 guide, page 8; aspt/images/g01.jpg; 1652 × 920; SHA-256 e0d0da76660130b2e8a4ad96dad24494eb67999e853262168013065714fa6d04.
- g02: ASPT 2026 guide, page 8; aspt/images/g02.png; 997 × 699; SHA-256 5bf5731dbd91c087bb7b94a5e9ff165c6037fd5e498ffa2afc388f66f0bc5f4d.
- g03: ASPT 2026 guide, page 9; aspt/images/g03.png; 914 × 153; SHA-256 6f2aef265acdace4fb6728f5e1543a1759bf98695570c753ecdb904de1e1f98f.
- s01: Chapter 04, page 7; aspt/images/s01.jpg; 1440 × 810; SHA-256 f337570545f5ce353b2531f6b8cb768b4eeb1e66e9a1bbba6cc09ff2a68639d1.
- s02: Chapter 04, page 63; aspt/images/s02.jpg; 1213 × 1014; SHA-256 5880eba47db029fe101d3e4eb7b47d5588f91f8aa094c8a99b98d817849f712d.
- s03: Chapter 04, page 64; aspt/images/s03.jpg; 1213 × 1014; SHA-256 6b2b923cbb79714457e19fe37334c1cb7f16f0e9a8fc70846701010e9e02b201.

Three guide figures: heart anatomy (p.8), precordial placement (p.8), waveform naming (p.9). Three class figures: Chapter 04 p.7 paper scale and pp.63–64 artifact comparisons. Existing cited class figures are reused within the related lessons. No external images and no paid image licenses were introduced. Supplied educational sources retain their original ownership; this audit records provenance, not a claim of a newly obtained open redistribution license.

The heart image was decoded at native dimensions and JPEG-encoded for presentation. The chest JP2 was losslessly decoded to PNG at native dimensions. The waveform's transparent background was composited onto white at native dimensions; no waveform geometry was redrawn or altered. The paper-scale slide was rendered as a whole page. Both artifact figures preserve the exact original embedded JPEG bytes. Image hashes and native dimensions are verified in hosted tests. The guide logo and tiny non-instructional graphic were excluded. No patient strip was generated from a rhythm name.

## Interpretation and corrections

The guide waveform is an educational naming diagram, not a newly verified clinical rhythm strip. Its visible P/Q/R/S/T positions support seven image questions; no distinct U, exact rate or QTc is invented. Source images use neutral g/s identifiers. No new diagnosis-bearing image caption is presented as a rhythm question. Labeled study images intentionally teach structures; existing delayed feedback/source-ECG protections remain intact. The static study site's answer bank is not a secure testing system.

The guide's anterior axillary wording is clarified with class landmarks and the AHA standard. R-R complex is explained as R–R interval. Duplicate myocardial infarction entries 24/66 and AV bundle/His aliases are retained. ELECTOCARDIOGRAPH and PRECORDAL are retained for lookup with correct terminology in explanations. Blue venous blood and universal pulmonary-vessel exception wording are explicitly corrected for normal adult physiology. QRS describes ventricular depolarization, not directly contraction. A resting phase and U-wave mechanism are not given fabricated certainty.

Existing question 337 was corrected: pericarditis is inflammation of the pericardial sac, with infectious or noninfectious causes. Its original explanation incorrectly equated inflammation with infection. The corrected question is included in topic practice. Source: [NHLBI causes of heart inflammation](https://www.nhlbi.nih.gov/health/heart-inflammation/causes). The other 610 BANK questions and scoring architecture are preserved. See STUDY-REVIEW.md and ECG-REVIEW.md for earlier changes and remaining rhythm-image gaps. No additional rhythms are claimed verified in this addition.

## Supplemental text, not class claims

- [Supplemental anatomy: heart, chambers and supporting structures](https://www.ncbi.nlm.nih.gov/books/NBK482452/)
- [Supplemental explanation: CDC, About Rheumatic Fever](https://www.cdc.gov/group-a-strep/about/rheumatic-fever.html)
- [Placement clarification: AHA/ACCF/HRS ECG standardization statement](https://www.jacc.org/doi/10.1016/j.jacc.2007.01.024)
- [Supplemental anatomy: right ventricular outflow and trabeculae](https://pmc.ncbi.nlm.nih.gov/articles/PMC3473916/)
- [Supplemental anatomy: apex and base](https://content.byui.edu/file/2b0b1b6e-50ac-44a0-a596-903e16d582d3/8/mod2.pdf)

These clarify apex/base, conus/trabeculae, rheumatic fever and exact precordial placement. They do not expand the official exam blueprint. Patient preparation, equipment operation, mounting/signing and practical blood-pressure technique remain clearly flagged for instructor reinforcement where the slides are incomplete.

## Exam-day discrepancy

Guide p.2 requires a qualified supervisor/instructor letter documenting five recent mounted EKGs, plus one mounted and signed EKG in the packet. Page 3 uses less-specific singular wording. The website preserves both and advises confirming the packet with the instructor. Missing requirements can leave the test ungraded. The format is multiple choice, one correct answer, maximum 90 minutes, 80% pass; interpretation on the submitted EKG is optional. All other guide administration, scan-sheet, retake, renewal and CE instructions remain in their own section.

## Verification

The hosted workflow tests exact term numbering against the extracted blueprint, every checklist status, lesson navigation, source-image integrity/rendering, all four choices of each new question in both entry points, scoring idempotence, explanations, returns from quiz/results, 390/768/1280 layouts and keyboard image enlargement. It also runs the pre-existing complete study and ECG verification suites. Consult the PR and workflow result for actual pass/fail status; this document describes the checks, not an unrun result.

## Limits and next expansion

Source gaps are visible in the app. No guarantee of official question distribution or passing score prediction is made. Prioritize practical preparation/mounting confirmation, the ambiguous guide terms, and remaining source-strip verification before adding more questions. A future expansion can add individually reviewed practice questions for more terminology and class rhythm examples without replacing the source-first workflow.

All processing used existing attachments read-only and in-memory preparation; repository writes and tests occur on GitHub. No new local files or browser persistence are used.
