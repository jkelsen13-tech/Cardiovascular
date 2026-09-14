# Design QA — ECG 3D flow, valves, and label modes

## Sources compared

- User-supplied iPhone screenshots: the original cutaway ECG heart at approximately 390 px portrait width.
- Hosted Chromium captures from workflow run 34892374225 at commit d072e8cbb28af9263024abb41212a09fbbcb5bd4:
  - `portrait-cutaway.png` — reduced-motion Clean default.
  - `portrait-qrs-valves.png` — QRS, Blood flow labels, and optional valve labels.
  - `desktop-front.png` and `desktop-cutaway.png`.

## Blocking comparison

- P0: none.
- P1: none.
- P2 label crowding: resolved. Clean is the default and shows only RA, RV, LA, LV, Aorta, and PA. Conduction, Blood flow, and Anatomy modes expose their scoped label sets. Valve labels are off by default.
- P2 weak flow visibility: resolved. Each route has a high-contrast halo, a thicker colored core, and five enlarged directional arrowheads that remain legible when animation is paused or reduced.
- P2 ambiguous valve state: resolved. QRS visibly identifies tricuspid/mitral as CLOSING and aortic/pulmonary as OPENING; the mesh highlight and text readout reinforce the optional labels without simulating unverified leaflet deformation.
- Mobile overflow: none at 390 × 844.
- Existing visual language: preserved; controls, typography, dark viewer palette, and patient-side orientation remain consistent.

## Functional checks

- All seven ECG stages drive flow, conduction, valve readouts, and label emphasis.
- Clean, Conduction, Blood flow, and Anatomy label modes pass.
- Show valves is keyboard accessible and defaults off.
- Reduced motion retains static directional arrows and complete text equivalents.
- Offline file operation, WebGL fallback/context loss, simple view, quiz, flashcards, slider, landmarks, and patient orientation pass.
- No runtime network requests or console/page errors.

final result: passed
