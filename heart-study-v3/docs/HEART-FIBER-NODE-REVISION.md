# Fiber and nodal teaching revision · 2026-10-21

Baseline: `22369d068fba918b5e451d8be4bf34986a6fda92`. This local revision retains the HRA heart, source surfaces, wall rims, model, lungs, quizzes and progress namespaces.

The wall scene shows local bundle directions without claiming measured whole-heart fibers. The tissue enlargement has four striated, branching cardiomyocytes with central nuclei exposed by an illustrative opened/stained surface. Three end-to-end interfaces remain connected during shortening and relaxation. Gap-junction and desmosome cues retain separate electrical and mechanical meanings. Vertex colors provide banding without separate ring meshes. The 2D fallback projects all six cell limbs and transverse band cues.

Myofibrils contain continuous serial sarcomeres with shared Z boundaries. A-band and actual filament lengths remain fixed as I-band/Z separation decreases. Cross-bridge detail remains in sarcomere/filament scenes; the wider myofibril view omits these small individual heads to reduce draw calls. There are no nuclei or branched cardiomyocytes at myofibril scale. Cellular calcium removal, relaxation and exact macro return remain functional.

SA and AV regions have elongated and compact forms in an opened right-atrial teaching section, with SVC/crista and Koch-region context respectively. Inspection outlines remain separate from time-driven activation. These nodes, surrounding landmarks and internodal guides are independently authored, enlarged teaching geometry, not literal dimensions or segmented HRA tissue. Gross nodal landmarks are projected onto exact original RA vertices using regional anatomical targets. The source does not segment crista terminalis, tendon of Todaro or Koch boundaries; this projection is unvalidated and is not a clinical localization. Gross node regions are pickable where visible.

References consulted as descriptions only; no figures, meshes or videos copied:

- [OpenStax 10.7, cardiac muscle tissue](https://openstax.org/books/anatomy-and-physiology-2e/pages/10-7-cardiac-muscle-tissue): branching, striations, central nuclei, intercalated discs.
- [University of Minnesota conduction tutorial](https://www.vhlab.umn.edu/atlas/conduction-system-tutorial/overview-of-cardiac-conduction.shtml): nodal regions and surrounding anatomy.
- [University of Minnesota triangle of Koch](https://www.vhlab.umn.edu/atlas/right-atrium/triangle-of-koch/index.shtml): regional AV landmarks.
- Existing independently worded calcium/sliding-filament sources and course terminology remain in `content.js` and the course audit. Course PDF pp211–216 support the SA→atria→AV→His sequence; the finer illustrative anatomy is added source-based resolution, not a claim that every detail appears on those slides.

Independent engineering review identified and prompted fixes for loss of 2D branching, missing gross-node picking, missing atrial-to-AV continuation, shared emissive-state leakage and a hardcoded continuation cutoff. Geometry checks verify actual transformed junctions and Z boundaries, fixed filament vertices, source vertex references, finite fallback paths and disposal. Browser checks cover picking without time/activation changes, 200% portrait/landscape layout, saved progress, both retained owner-selected demonstrations and source/valve/rim regressions. Physical iPad/Safari, specialist histological review and calibrated anatomical validation remain unexecuted.

The old teaching-clarity-preservation aggregate stops on a pre-existing ECG module fingerprint that changed before this revision. This revision does not modify `ecg-study/module.js`; direct baseline comparison and current focused checks are reported separately rather than editing the old fingerprint to manufacture a pass.
