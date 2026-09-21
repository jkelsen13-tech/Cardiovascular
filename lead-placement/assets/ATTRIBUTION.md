# Lead Placement Lab 3D asset attribution and limitations

The local payload in `torso-model-data.js` is an optimized derivative of a
registered BodyParts3D / Anatomography thorax subset. It is decoded in memory by
the repository's local Three.js/GLTFLoader bundle. The study module makes no
model, texture, decoder, CDN, analytics, API or other network request at runtime.

## Exact source and license

- Source organization: Database Center for Life Science (DBCLS), Research Organization of Information and Systems, Japan.
- Dataset: BodyParts3D / Anatomography.
- Download page: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- Official selective mesh endpoint: https://lifesciencedb.jp/bp3d/download.cgi
- License: Creative Commons Attribution 4.0 International (CC BY 4.0).
- Designated license page: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- Accessed: 2026-09-20.

Attribution: **BodyParts3D, © Database Center for Life Science (DBCLS), Research Organization of Information and Systems, licensed
under CC BY 4.0.** Modifications are described below. No endorsement by DBCLS or
the BodyParts3D authors is implied.

The currently designated archive license and the release README were updated on
2025-02-27 to CC BY 4.0. Some older project pages and historical distributions
still display the former CC BY-SA 2.1 Japan notice. This derivative follows the
current license designated by the archive licensor; the historical discrepancy
is recorded here rather than silently omitted.

## Exact selected anatomy

Fifty named source meshes are included, all in the same BodyParts3D 4.x body
coordinate frame:

- skin: `FJ2810`
- manubrium, sternal body and xiphoid: `FJ3290`, `FJ3178`, `FJ3153`
- right/left clavicles: `FJ3362`, `FJ3237`
- all twelve paired ribs
- paired costal cartilages 1–7
- abdominal, clavicular and sternocostal parts of right and left pectoralis major

The per-structure FJ/BP/FMA identifiers, source hashes, bounds and processed
counts are in `registered-thorax-manifest.json`.

## Registration and processing

The source OBJs total 28,650,246 bytes, 220,218 vertices and 420,806 triangles.
They are not individually centered, fitted, rotated or scaled. A single transform
is applied identically to every structure to convert source millimetres and axes
to glTF metres/Y-up:

`x'=x/1000; y'=(z-1175)/1000; z'=-y/1000`

Only the skin envelope is cropped, at source `z=850..1500 mm`, to remove the
upper head and lower body while retaining the neck/lower-face orientation, upper thorax and axillary surface. Named
meshes remain separate. Conservative deterministic vertex clustering is applied
per structure at 1.2–2.5 mm. The resulting GLB contains 50 meshes, 96,542
vertices and 194,563 triangles. It is 3,529,136 bytes and has SHA-256
`465222925f5f63a47cd4e204ffb74a5852f157e6e27e48390fe671caf22d4f78`.

## Placement anchors

V1–V6 are not manually aligned to a foreign body. Anchors are calculated before
optimization from the named real geometry:

- the fourth intercostal level is derived from ribs/costal cartilages 4 and 5;
- the fifth intercostal level is derived from ribs/costal cartilages 5 and 6;
- sternal borders come from the sternum mesh at the derived level;
- the left midclavicular line comes from the midpoint of the left clavicle mesh;
- the anterior axillary line uses the lateral boundary of the left pectoralis
  major at the V4 level;
- the midaxillary position uses the lateral-most registered skin cross-section;
- V3 is halfway between V2 and V4 and is reprojected to the skin;
- all anterior anchors are projected onto the same-atlas skin surface.

The build asserts that V1 is on patient right, V2 is on patient left and V4/V5/V6
share one source-coordinate vertical level. These are reference-atlas teaching
anchors, not patient measurements.

## Thoracic landmark lesson derivation

The Sternal Angle lesson and intercostal-space overlays do not add or move
anatomical meshes. At runtime, the viewer resolves the registered FJ meshes by
name. It locates the manubriosternal junction from the closest sampled surface
pair on manubrium `FJ3290` and sternal body `FJ3178`. Rib 2 is highlighted
with its named bilateral rib and costal-cartilage meshes.

The 2nd through 5th intercostal-space guides are generated between the anterior
medial points of the adjacent registered costal-cartilage levels (2/3, 3/4,
4/5 and 5/6). The 4th-space guide also passes through the unchanged V1 and V2
anchors; the 5th-space guide passes through unchanged V4. The existing V4–V6
guide is generated through the three verified electrode anchors, whose model
Y coordinate is identical. These are instructional overlays derived from the
registered atlas geometry, not additional anatomical tissue.

## Exclusions and limitations

This is one adult male reference anatomy and is not representative of every
patient or body habitus. The module teaches landmark relationships and does not
claim patient-specific or diagnostic accuracy.

External/internal intercostal and serratus meshes were evaluated but excluded:
the four intercostal meshes alone exceed 377,000 triangles and 33 MB of OBJ data,
while the lead lesson needs the real rib spaces rather than muscle-fibre detail.
The optional muscle layer therefore shows real pectoralis-major geometry only.
Unrelated organs, skull, hands and lower-body anatomy are also excluded.

Landmark guides, leader lines, text labels and electrode markers are instructional
overlays anchored to the real meshes; they are not presented as anatomical tissue.
Individual patients may require palpation and clinical adjustment beyond this
reference model.

## Runtime and accessibility

The module reuses local `three@0.180.0`/GLTFLoader (MIT; see
`../../ecg-study/vendor/THREE-LICENSE.txt`). The GLB has no textures, external
buffers or compression decoder. The offline base64 wrapper is generated from the
verified GLB. The viewer caps device pixel ratio, renders on state/interaction
changes, pauses when hidden and retains the native 2D fallback.
