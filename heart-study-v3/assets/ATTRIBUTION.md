# Heart v3 geometry attribution

`source-geometry.js` is a registered and coordinate-quantized derivative of the existing locally preserved HRA female heart and cardiac vasculature. It retains all 51 meshes and all 208,978 source triangles. Original GLB bytes in `../../ecg-study/assets/model-data.js` remain unchanged.

Creators: Kristen Browne and Heidi Schlehlein, HuBMAP / Human Reference Atlas, derived from the National Library of Medicine Visible Human Dataset. Citation: Browne, Kristen, and Heidi Schlehlein. 2022. [3D Reference Organ for Heart, Female v1.2](https://doi.org/10.48539/HBM384.VWVH.465). Collection: [HRA 3D Reference Object Library](https://humanatlas.io/3d-reference-library). Upstream revision: `f1a3a63f110e27ff0736047d52d04dba5d3087f9`.

License: [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). Complete text: [CC-BY-4.0.txt](CC-BY-4.0.txt). No endorsement is implied.

Changes: original node transforms applied; one shared landmark-derived display basis/translation/scale; coordinates rounded to 1e-6 display units; JSON/JavaScript transport; new materials and illustrative regional deformation at runtime. No decimation, proprietary-media extraction, or remote runtime anatomy request. Physical source units and independent anterior/posterior qualification remain unestablished. Full source hashes, URLs, actual mesh inventory and topology are in `source-inventory.json`; reproducible processing is `../../tools/heart-v3/derive-geometry.cjs`.

Internal chambers, cavity measurement surrogates, moving leaflets/annuli, chordae, support attachments, cut faces and gross teaching guides are independently authored representative reconstructions in `../anatomy.js`. They are not scanned HRA interiors or patient-specific microscopic continuity. Mathematical caps close the invisible cavity measurement surrogate only. Source anatomy, numerical circulation, illustrative deformation and representative mechanism animation have separate evidence levels. See `../../docs/HEART-V3-ANATOMY.md`.

The runtime uses the existing local Three.js 0.180.0 subset; its MIT notice remains in `../../ecg-study/vendor/THREE-LICENSE.txt`. No additional runtime library is introduced.
