# Preview interface and progress

This heart-only wrapper loads the local Heart v3 controller, anatomy and one pinned Three.js subset. Microscopic content, explorer and detail geometry load on route entry. There is no respiratory module, older lesson/quiz navigation, remote runtime asset or account requirement.

Routes retain the selected source region, evidence status, adjusted gross camera and playback state. A continuously paused journey returns at the same time. A playing journey keeps the current clock instead of rewinding. Text/2D mode retains the same routes and source metadata; retry restores the current scene. Preview menu calls `HeartV3Study.close()` before showing the launch menu, disposing renderer, detail and explorer resources.

Controls support phase steps, keyboard inspection, opt-in touch rotation/pinch, readable labels, 200% text and a complete text/2D journey. These capabilities require separate runtime verification; their presence does not establish physical iPad Safari behavior.

The organ-first teaching shell keeps transport, current phase, four valve states and one selected synchronized trace together in the tested native 1024/1280/1440 layouts. The inspector and full six-plot analysis can collapse without resetting state. Narrow and enlarged-text layouts reflow: a compact pocket keeps Play/Pause, Next phase, the current phase and all four valve states with the visible organ, while the full selected curve follows below. The pocket uses the same physiological clock and preserves camera/source state. Its controls have 44px minimum targets; measured scroll space keeps it above the anatomy. Simultaneous curve/organ visibility is not claimed at every narrow or 200% viewport. Labels reserve valve/support space and the measured orientation/exit controls. Full selected names remain outside the organ when the overlay cannot fit; labels-off also hides the pocket name.

Preview progress uses only `cmt.heart.preview.progress.v1`. The original `cmt.heart.v3.progress.v1` is not used by this package. Same-origin folders share browser storage, so the explicit namespace is required. There is no automatic migration from private study or mock history. Export/import validates the module’s own schema; written explanations use a disclosed self-check rather than keyword grading.

The deterministic package manifest lists each exact source/template hash, adaptation and output hash. The package is prepared locally; publication requires a separately approved target and verified served files.
