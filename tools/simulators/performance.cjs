/* Desktop software-rendered browser evidence only; not an actual iPad benchmark. */
const { chromium } = require("playwright"),
  fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    headless: true,
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const p = await browser.newPage({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: Number(process.env.PERF_DPR || 1),
  });
  const durationMs = Number(process.env.PERF_DURATION_MS || 30000);
  try {
    const report = {
      date: new Date().toISOString(),
      browser: await browser.version(),
      platform:
        "Cloud Linux desktop Chromium, SwiftShader software WebGL, 1024×768 CSS viewport; not iPad/Safari",
      target: "30 fps during a 30-second repeatable rotation script",
      durationMs,
      emulatedDPR: Number(process.env.PERF_DPR || 1),
      renderDetail: process.env.PERF_DETAIL || "1",
      organs: {},
    };
    await p.goto("http://127.0.0.1:8765/");
    for (const system of ["heart", "respiratory"]) {
      await p.locator("#" + system + "SimulatorLaunch").click();
      const start = Date.now();
      await p.click("[data-load-anatomy]");
      await p.waitForSelector("[data-organ-host][data-ready=true]", {
        timeout: 30000,
      });
      if (process.env.PERF_DETAIL)
        await p
          .locator("[data-render-detail]")
          .selectOption(process.env.PERF_DETAIL);
      const load = Date.now() - start;
      const selector =
        system === "heart" ? ".ecg-3d-canvas" : ".sim-atlas-canvas canvas";
      await p.locator(selector).scrollIntoViewIfNeeded();
      const timing = await p.evaluate(
        async ({ selector, durationMs }) => {
          const canvas = document.querySelector(selector),
            deltas = [];
          let first, previous;
          await new Promise((resolve) => {
            function frame(now) {
              if (first === undefined) first = now;
              if (previous !== undefined) deltas.push(now - previous);
              previous = now;
              canvas.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "ArrowRight",
                  bubbles: true,
                }),
              );
              if (now - first < durationMs) requestAnimationFrame(frame);
              else resolve();
            }
            requestAnimationFrame(frame);
          });
          const sorted = deltas.slice().sort((a, b) => a - b),
            median = sorted[Math.floor(sorted.length / 2)],
            p95 = sorted[Math.floor(sorted.length * 0.95)];
          return {
            frames: deltas.length,
            durationMs: deltas.reduce((a, b) => a + b, 0),
            medianFrameMs: median,
            p95FrameMs: p95,
            medianFps: 1000 / median,
            averageFps:
              (deltas.length * 1000) / deltas.reduce((a, b) => a + b, 0),
            framesSlowerThan33_34ms: deltas.filter((x) => x > 33.34).length,
          };
        },
        { selector, durationMs },
      );
      report.organs[system] = { localUnthrottledLoadMs: load, ...timing };
      await p.locator("[data-home]").click();
    }
    fs.writeFileSync(
      process.env.PERF_OUTPUT || "review-simulators/performance.json",
      JSON.stringify(report, null, 2) + "\n",
    );
    console.log(JSON.stringify(report));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
