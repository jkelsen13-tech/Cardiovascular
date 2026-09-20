# Lead Placement Lab 3D asset attribution and limitations

The local body-surface payload in `torso-model-data.js` is an optimized derivative of the HuBMAP Human Reference Atlas male skin model. It is decoded in memory by the repository's existing local Three.js/GLTFLoader bundle. The study module makes no model, texture, decoder, CDN, analytics, API, or other network request at runtime.

## Exact source and license

- Source organization: HuBMAP Human Reference Atlas (HRA), based on the National Library of Medicine Visible Human Male dataset.
- Source repository: https://github.com/hubmapconsortium/ccf-3d-reference-object-library
- Pinned source commit: `f1a3a63f110e27ff0736047d52d04dba5d3087f9`
- Source file: `VH_Male/v1.2/VH_M_Skin.glb`
- Source URL: https://github.com/hubmapconsortium/ccf-3d-reference-object-library/blob/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Male/v1.2/VH_M_Skin.glb
- Git blob SHA: `57b4af235eb34e2dce104b619c55b09ec44dae63`
- Original SHA-256: `8cab299d04323e6364938a271647df5671138a2177f412e741a0d6bd4536ee1c`
- License: Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/
- Full license text: `CC-BY-4.0.txt`

Requested citation: Browne, K., Schlehlein, H., Herr II, B. W., Quardokus, E., Bueckle, A., and Börner, K. (2022). *HuBMAP CCF 3D Reference Object Library*. https://humanatlas.io/3d-reference-library

The HRA source notes that this reference skin was created from the Visible Human Male dataset supplied by the National Library of Medicine. No endorsement by HuBMAP, HRA, NIH, NLM, the model authors, or the Visible Human Project is implied.

## Optimization and size

The original GLB contains one mesh, 92,659 vertices and 185,314 triangles, with no images or textures. It is 5,931,700 bytes.

For mobile study use, the source was processed with glTF Transform CLI 4.2.1:

1. `weld`
2. `simplify --ratio 0.5 --error 0.002`

The optimized GLB contains one mesh, 46,330 vertices and 92,656 triangles, with no images, textures, Draco, Meshopt, or external buffers. It is 2,410,628 bytes and has SHA-256 `02964abbb68b9232ce0e833ae4d517bece6167f2f113174a01d0886f3b9872b1`. Base64 packaging increases the checked-in JavaScript payload; the original and optimized binary GLBs are not duplicated in the repository.

## What comes from the model

Only the body/skin surface comes from the HRA GLB. The default camera frames the upper thorax and retains enough lateral surface to demonstrate the anterior and midaxillary lines. The rest of the full-body mesh remains in the GLB, outside the default camera frame.

## Schematic overlays and limitations

The sternum, clavicles, ribs, pectoral layer, intercostal-space guides, surface landmark lines and electrode markers are independently authored Three.js teaching overlays. They are not meshes extracted from HRA, are not patient measurements, and must not be interpreted as separable source-model anatomy. The muscle layer is optional and schematic.

Lead-marker positions are normalized teaching coordinates placed relative to the HRA surface. They encode the course rules: V1/V2 at the fourth intercostal space on the right/left sternal borders; V4 at the fifth space on the left midclavicular line; V3 halfway between V2 and V4; and V5/V6 level with V4 on the left anterior/midaxillary lines. They do not account for individual body habitus, breast tissue, deformity, age, or clinical variation.

The source body is a single male reference anatomy and is not representative of every patient. The module teaches landmark relationships rather than claiming patient-specific anatomical fidelity. Limb markers at the lower edge of the upper-torso view use downward labels to indicate that RL/LL continue to the lower limbs; their actual placement remains textual.

## Runtime and accessibility

The module reuses the repository's local `three@0.180.0`/GLTFLoader bundle (MIT; see `../../ecg-study/vendor/THREE-LICENSE.txt`). DPR is capped at 1.5, antialiasing is disabled, rendering occurs only after interaction/state changes, and the viewer pauses when hidden or offscreen. Touch rotation is opt-in so vertical page scrolling remains available. A native SVG/HTML torso diagram is the automatic WebGL fallback and provides equivalent lead facts in text.
