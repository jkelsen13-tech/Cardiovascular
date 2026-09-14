# Anatomical heart assets: attribution and limitations

The base64-packaged GLB payloads in model-data.js are exact bytes from the HuBMAP HRA CCF 3D Reference Object Library. They are decoded in memory by the local GLTFLoader. No CDN, remote model request, decoder download, analytics, or API is used at runtime. This packaging supports opening either HTML entry point directly with file://.

## Provenance
Source repository: https://github.com/hubmapconsortium/ccf-3d-reference-object-library
Pinned source commit: f1a3a63f110e27ff0736047d52d04dba5d3087f9

- Heart: VH_Female/v1.2/VH_F_Heart.glb; 1,745,284 bytes; Git blob 7e4709ac174f4f43bedb80ed488fdcb62d02aac3; SHA-256 9afdfb2ccf926869813582cfe150dce8cb28377417a968a4f29a5b8dc060428b.
- Heart vasculature: VH_Female/v1.2/VH_F_Blood_Vasculature_Heart.glb; 2,512,720 bytes; Git blob d2758268f1811f5fb259ee0433199c74c6dff268; SHA-256 c7f196de2d36a354bf740176d3886c95a17da6b74d744423f2f82b61cf36af24.

Heart v1.2 citation: Browne, Kristen, and Heidi Schlehlein. 2022. 3D Reference Organ for Heart, Female v1.2. https://doi.org/10.48539/HBM384.VWVH.465.

Model geometry: Kristen Browne and Heidi Schlehlein, HuBMAP / Human Reference Atlas; derived from the National Library of Medicine Visible Human Dataset. Source library citation: Browne, Kristen, Heidi Schlehlein, Bruce W. Herr II, Ellen Quardokus, Andreas Bueckle, and Katy Börner. HuBMAP CCF 3D Reference Object Library. https://humanatlas.io/3d-reference-library

License: Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/. The complete source license is preserved in CC-BY-4.0.txt. No endorsement is implied.

Geometry bytes are unchanged. App modifications are base64 transport packaging, runtime orientation/recentering, new materials, clipping distant vascular continuations to the local heart view, clipping for cutaway, modest illustrative chamber scaling, and independently authored conduction/blood-flow overlays. No mesh is represented as a measured conduction pathway.

## Mesh inventory and budget
Heart: 14 meshes, 43,560 vertices, 85,914 triangles.
Vasculature: 37 meshes, 62,827 vertices, 123,064 triangles.
Combined: 51 meshes, 106,387 vertices, 208,978 triangles; no textures.
Base64 transport is 5,677,489 bytes. This is not geometry optimization; it increases transport by about one third to preserve offline file access. Original binary files are not duplicated in this repository. Full hashes, nodes and the bundled runtime size are recorded in model-manifest.json.

Runtime dependency: three@0.180.0 with GLTFLoader, locally bundled from the official npm package; MIT license in ../vendor/THREE-LICENSE.txt. No OrbitControls, compression decoder, physics engine, or textures. esbuild@0.25.10 is a build-only dependency, not shipped as runtime software.

## Teaching limitations
This is a reference anatomy illustration, not a clinical simulation. Chamber movement and directed blood paths teach phase relationships and do not calculate pressure, volume, velocity, valve dynamics, or exact electromechanical timing. Anatomical valve meshes are separate and visible in cutaway; they are not animated as physiologically measured leaflets.

The upstream mapping has conflicting left/right inferior pulmonary vein labels. All pulmonary vein labels here are generic PV. No inferior pulmonary vein laterality is asserted. The source meshes and coordinate relationships remain unchanged.

The front basis is derived from RA→LA, orthogonalized against the IVC→SVC superior direction. Viewer-left is patient-right in that front view. Rotation changes screen positions; a persistent orientation note and Reset / front view explain this.

Cutaway uses an uncapped clipping plane: it reveals interior surfaces but does not create a watertight surgical cut. Conduction nodes, bundle branches, Purkinje branches and blood arrows are schematic overlays using chamber/valve landmarks. Overlay depth testing is disabled to keep these teaching paths visible through exterior anatomy.

P illustrates atrial depolarization and contraction/filling; PR illustrates AV delay and filling; QRS illustrates His–Purkinje ventricular activation followed by contraction/ejection; ST illustrates continued depolarization/ejection; T illustrates repolarization/relaxation; TP illustrates baseline/passive filling. U has no invented mechanical event.

## Mobile and accessibility
DPR is capped at 1.5; antialiasing and textures are disabled. Rendering stops when paused, offscreen, hidden, or the module closes. Reduced motion uses static directional arrows; play still steps the textual stages. Controls have 44px minimum targets, keyboard orbit/zoom, checkbox labels, and a textual structure/flow key. The simplified SVG stays available and is the automatic fallback if loading/WebGL fails.

No real iPhone hardware performance claim is made. Hosted Chromium portrait checks are emulation, not Safari/iOS certification.
