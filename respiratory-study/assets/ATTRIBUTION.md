# Respiratory asset qualification and attribution

Selected source: HuBMAP Human Reference Atlas CCF 3D Reference Object Library, Visible Human Female v1.2, `VH_F_Lung.glb`, pinned commit `f1a3a63f110e27ff0736047d52d04dba5d3087f9`.

Source URL: https://raw.githubusercontent.com/hubmapconsortium/ccf-3d-reference-object-library/f1a3a63f110e27ff0736047d52d04dba5d3087f9/VH_Female/v1.2/VH_F_Lung.glb

Model creator/provenance record: Kristen Browne and Heidi Schlehlein, HuBMAP / Human Reference Atlas, derived from the National Library of Medicine Visible Human Dataset. This model provenance record is separate from the versioned library citation.

Official library citation for the **v1.2 release**: Schlehlein, Heidi, Bruce W. Herr II, Ellen M. Quardokus, Andreas Bueckle, and Katy Börner. 2022. *HuBMAP CCF 3D Reference Object Library.* Accessed May 06, 2022.

Citation guidance and CC BY 4.0 terms verified October 18, 2026 against the official [HRA 3D Reference Object Library](https://humanatlas.io/3d-reference-library), specifically its [first-party page data](https://humanatlas.io/assets/content/3d-reference-library-page/data.yaml), “If you use the data files v1.2 release” paragraph. The historical access date above is part of that published citation, not the date of this verification. The asset remains pinned to v1.2; the current page's default release does not change its version.

License: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ . Full notice is preserved beside this file. No endorsement is implied. The source license notice was checked at the pinned upstream revision on October 17, 2026.

The GLB bytes are unchanged. Adaptations: base64 packaging for file-open compatibility, replacement teaching materials, shared root scaling/recentering and selection visibility. There are no mesh merges, decimation, rigs or independently fitted structures. The exact hash, full named mesh inventory, transforms, source coordinate caveats and budgets are in model-manifest.json. Rebuild using `python3 tools/simulators/package-lung.py`.

## Qualification decision

The 65 meshes include lung segments under five lobe groups, trachea, carina, main/lobar/segmental bronchi and laryngeal cartilages. They do not establish microscopy, a full functional larynx, pleura or diaphragm. Those concepts use authored, labeled SVG schematics. The atlas is optional and static: breathing animation never deforms reference geometry as though it were a measured respiratory rig.

This 11,240,608-byte source contains 378,963 triangles. It exceeds the initial 250,000-triangle target and is not loaded on module entry. Base64 packaging adds roughly one third before compression. Load time and actual iPad performance remain release qualifications, not presumed successes. The schematic is complete without WebGL.

No heart, lung or male thorax models are superimposed. Source +X branch sidedness and +Y superior ordering can be checked from the named branch bounds; anterior surface orientation and detailed branch continuity still require an anatomy educator. Preset labels disclose this review limit.

## Candidates considered in order

1. Existing HRA heart: retained, 51 meshes, exact existing source/license records in ecg-study/assets. No respiratory anatomy extracted from it.
2. HRA female lung v1.2: inspected, inventoried and selected as the standalone optional reference above.
3. Direct BodyParts3D: current official license https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html and distribution https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html consulted. No new BodyParts3D meshes selected; existing male thorax is not assumed registered to the female atlas.
4. Z-Anatomy: not selected. Specific mesh provenance and incorporated-source exceptions would require separate verification. No bulk license assumption.

BioDigital and Visible Body are references only; no proprietary model extraction, copying or API integration. No paid provider, remote runtime anatomy request or analytics added.

## Respiratory v2 moving derivative

`breathing-data.js` is a CC BY 4.0 adaptation of the same pinned v1.2 source, not a replacement of the unmodified reference. Reproduce with `python3 tools/simulators/derive-breathing.py` using the retained source wrapper. It preserves all selected triangle topology and shared coordinates, merges source segments by lobe ancestry, and omits dense bronchial cartilage and laryngeal cartilages. The derivative has 54,594 triangles and 29,239 vertices. `breathing-provenance.json` records exact source/derived hashes, selected mesh names and one shared transform. Diaphragm, rib context and magnified alveolar-capillary geometry are independently authored instructional schematics. Runtime cage displacement is illustrative, not measured tissue mechanics or calibrated mesh volume. Original assets and their hashes remain unchanged.
