# Heart-only polygon triangulation

shape-utils.min.js bundles ShapeUtils and Earcut from the already-used Three.js0.180.0. Shared ecg-study/vendor/three-gltf.min.js remains unchanged. This subset is local and self-hostable; no runtime CDN or provider.

Sources: https://github.com/mrdoob/three.js/tree/r180/src/extras/ShapeUtils.js and its Earcut wrapper. Three includes Mapbox Earcut3.0.1: https://github.com/mapbox/earcut/tree/v3.0.1. Preserve THREE-LICENSE.txt (MIT) and EARCUT-LICENSE.txt (ISC).

Reproduction: install three@0.180.0 and esbuild@0.25.10 into a temporary prefix, without adding repository dependencies. Use esbuild's build API with stdin contents `export {ShapeUtils} from 'three/src/extras/ShapeUtils.js';`, resolveDir set to that prefix, bundle true, format iife, globalName HeartV3ShapeUtils, minify true, legalComments eof. The output banner identifies the Three version and MIT notice. File SHA256 is recorded in the model manifest.
