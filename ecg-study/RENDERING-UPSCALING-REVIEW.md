# Rendering/upscaling review — 2026-09-14

## Decision

Keep the existing Native anatomical-heart renderer. No DLSS or FSR option is shipped. The reviewed offline renderer, shared ECG state, simplified SVG fallback, accessibility controls and lazy/disposal behavior are unchanged by this investigation.

NVIDIA DLSS 5 is a proprietary NVIDIA RTX technology, not an offline WebGL2/iPhone solution. AMD FidelityFX Super Resolution 1 (FSR1) is a free MIT-licensed spatial upscaler, not DLSS, not AI frame generation, and not a source of additional anatomical detail. Its EASU edge-adaptive upsampling followed by RCAS sharpening was evaluated as an optional alternative. The performance gate did not justify shipping it for this scene.

## Exact candidate and provenance

- Official [GPUOpen FSR v1.0.2](https://github.com/GPUOpen-Effects/FidelityFX-FSR/tree/a21ffb8f6c13233ba336352bdff293894c706575), commit `a21ffb8f6c13233ba336352bdff293894c706575`.
- [`ffx-fsr/ffx_fsr1.h`](https://github.com/GPUOpen-Effects/FidelityFX-FSR/blob/a21ffb8f6c13233ba336352bdff293894c706575/ffx-fsr/ffx_fsr1.h): 60,310 bytes; Git blob `4e0b3d548553e61eedd384021409f24e3eb74de3`.
- [`ffx-fsr/ffx_a.h`](https://github.com/GPUOpen-Effects/FidelityFX-FSR/blob/a21ffb8f6c13233ba336352bdff293894c706575/ffx-fsr/ffx_a.h): 181,915 bytes; Git blob `d04bff55cbe5f0c77af7a39d6a3452f2744dc6f4`.
- [MIT license, Copyright (c) 2021 Advanced Micro Devices, Inc.](https://github.com/GPUOpen-Effects/FidelityFX-FSR/blob/a21ffb8f6c13233ba336352bdff293894c706575/license.txt): 1,094 bytes; Git blob `324cba594d11f918191907676a99deed2fea51d0`.

The hosted-runner-only prototype retained the official FP32 EASU/RCAS arithmetic and reciprocal approximations, added GLSL ES aliases, replaced a setup integer zero with an unsigned zero, and emulated unavailable WebGL2 `textureGather` with clamped `texelFetch` in the specified component order. Shader compilation and a nonlinear-RGB synthetic edge render succeeded. This is **not** a claim of complete numerical equivalence, integrated Three.js color-pipeline validation, or iPhone compatibility; the negative preliminary cost gate stopped further implementation.

## Reproducible experiment record

[Corrected successful GitHub Actions run 34888429078](https://github.com/jkelsen13-tech/Cardiovascular/actions/runs/34888429078), experimental commit [aff24ca2677a6d2c9b55d799ee0df857391ddf77](https://github.com/jkelsen13-tech/Cardiovascular/commit/aff24ca2677a6d2c9b55d799ee0df857391ddf77).

The temporary harness remains available in that historical commit, with the AMD license. It is deliberately absent from the final branch tree and is not loaded by the application. The run's review artifact contains synthetic FSR screenshots and the JSON timing report.

Method: Ubuntu GitHub-hosted runner, Playwright 1.55.1 / Chromium 140, ANGLE SwiftShader software WebGL2, 390 × 844 CSS viewport, DPR 1.5, actual heart output 450 × 450 pixels. For each setting, discard 5 warm-up draws, then measure 30 synchronous completed draws with `performance.now()`. A one-pixel `readPixels` forces completion; earlier submission-only `gl.finish` measurements were rejected. The current heart was kept intersecting the viewport, at its default front view and paused P stage. Its actual Three.js render was timed separately at each drawing-buffer resolution. EASU then RCAS (sharpness 0.2 stops) were timed on a synthetic nonlinear-RGB edge image in a separate WebGL2 context at the same output resolution.

| Setting | Scene pixels | Scene median / p95 | EASU+RCAS median / p95 | Sum of separate medians |
| --- | --- | --- | --- | --- |
| Native | 450 × 450 | 104.8 / 116.5 ms | none | 104.8 ms |
| FSR Quality candidate, 1.5× | 300 × 300 | 74.7 / 77.3 ms | 54.7 / 56.8 ms | 129.4 ms |
| FSR Performance candidate, 2× | 225 × 225 | 60.8 / 62.9 ms | 54.0 / 56.6 ms | 114.8 ms |

The sums are **estimates from separate passes**, not an integrated end-to-end benchmark. They include readback/synchronization overhead and cannot predict physical-device FPS. Nevertheless, observed filtering cost exceeded the scene-render savings: approximately 23.5% worse for Quality and 9.5% worse for Performance in this feasibility comparison. There is no measured benefit here that warrants shipping an option labelled as a performance enhancement.

## Limitations and next gate

No physical iPhone/Safari GPU, power, thermal or battery measurement was available. SwiftShader is not a mobile GPU. No device-wide performance claim is made. A future proposal needs actual target-device evidence, a correctly validated nonlinear-color EASU/RCAS pipeline, numerical/gather fixtures, Native/FSR anatomical screenshot comparisons, and full lifecycle/accessibility/offline regressions before it can ship.

No extra runtime dependency, shader, render target, quality selector, persistent preference or network request was added. Existing ECG/3D regression tests passed alongside the experiment; routine least-privilege verification is restored after removing the temporary harness.
