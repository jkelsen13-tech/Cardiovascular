# Heart v3 geometry attribution

`source-geometry.js` is a registered and coordinate-quantized derivative of the existing locally preserved HRA female heart and cardiac vasculature. It retains all 51 meshes and all 208,978 source triangles. Original GLB bytes in `../../ecg-study/assets/model-data.js` remain unchanged.

Creators: Kristen Browne and Heidi Schlehlein, HuBMAP / Human Reference Atlas, derived from the National Library of Medicine Visible Human Dataset. Citation: Browne, Kristen, and Heidi Schlehlein. 2022. [3D Reference Organ for Heart, Female v1.2](https://doi.org/10.48539/HBM384.VWVH.465). Collection: [HRA 3D Reference Object Library](https://humanatlas.io/3d-reference-library). Upstream revision: `f1a3a63f110e27ff0736047d52d04dba5d3087f9`.

License: [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). Complete text: [CC-BY-4.0.txt](CC-BY-4.0.txt). No endorsement is implied.

Changes: original node transforms applied; one shared landmark-derived display basis/translation/scale; coordinates rounded to 1e-6 display units; JSON/JavaScript transport; new materials and illustrative regional deformation at runtime. No decimation, proprietary-media extraction, or remote runtime anatomy request. Physical source units and independent anterior/posterior qualification remain unestablished. Full source hashes, URLs, actual mesh inventory and topology are in `source-inventory.json`; reproducible processing is `../../tools/heart-v3/derive-geometry.cjs`.

Historical authored geometry remains in ../anatomy.js for pure geometry contracts; it no longer supplies the default gross display. The displayed heart uses original source tissue surfaces, with source-derived cut faces and narrowly qualified wall-port rims. Supplementary leaflets, annular frames, chords and microscopic teaching scenes remain independently authored educational representations. See ../../docs/HEART-V3-ANATOMY.md.

The runtime uses the existing local Three.js0.180.0 subset (MIT). A heart-only ShapeUtils/Earcut subset of the same version triangulates concave tissue faces and preserves holes, without changing the shared renderer bundle. Notices: ../vendor/THREE-LICENSE.txt and ../vendor/EARCUT-LICENSE.txt (Mapbox Earcut3.0.1,ISC). Reproduction: ../vendor/BUILD.md. No paid or proprietary asset service is used.

## October21 original-foundation revision

Gross views now use original retained HRA surfaces and their shared transform. No abstract replacement cavity is inserted. A bounded shared illustrative deformation affects tissue and matching vessels; Original source pose is unchanged. Source payload, geometry, indices, inventory and coordinate transform remain unchanged.

Static source valves remain in Original source pose. Teaching views use supplementary leaflets whose insertion contours follow closed source boundary loops. Annular identity, commissures, leaflet mechanics and chordal anatomy remain inferred teaching reconstructions. Supplementary AV chords join original source papillary-tip vertices to representative leaflet margins. Missing separate atrial septum and microscopic details use labeled schematics. Source-edge correspondence is geometric evidence, not specialist anatomical approval.

Source-derived wall cut faces expose existing tissue volume rather than uniformly inflating the source. Explicitly paired wall rims join source boundaries without filling lumens; original source payload/indices remain unchanged. Supplementary valve leaflets have thin closed front/back/edge geometry about the original representative midpoint surface. Gold is an optional teaching wall highlight, not a calibrated thickness map.
