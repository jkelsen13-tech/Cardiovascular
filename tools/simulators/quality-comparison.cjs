/* Bounded raster comparison at emulated DPR 2; geometry and camera script stay unchanged. */
const { chromium } = require("playwright"),
  fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  try {
    const p = await b.newPage({
      viewport: { width: 1024, height: 768 },
      deviceScaleFactor: 2,
    });
    await p.goto("http://127.0.0.1:8765");
    const report = {
      platform:
        "Cloud Chromium / SwiftShader, emulated DPR 2, 8-second comparison per mode; not iPad",
      organs: {},
    };
    for (const system of ["heart", "respiratory"]) {
      await p.click("#" + system + "SimulatorLaunch");
      await p.click("[data-load-anatomy]");
      await p.waitForSelector("[data-organ-host][data-ready=true]");
      const selector =
        system === "heart" ? ".ecg-3d-canvas" : ".sim-atlas-canvas canvas";
      await p.locator(selector).scrollIntoViewIfNeeded();
      report.organs[system] = {};
      for (const quality of ["1.5", "1"]) {
        await p.locator("[data-render-detail]").selectOption(quality);
        report.organs[system][quality] = await p.evaluate(async (selector) => {
          const canvas = document.querySelector(selector),
            frames = [];
          let start, last;
          await new Promise((done) => {
            function frame(t) {
              if (start === undefined) start = t;
              if (last !== undefined) frames.push(t - last);
              last = t;
              canvas.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "ArrowRight",
                  bubbles: true,
                }),
              );
              if (t - start < 8000) requestAnimationFrame(frame);
              else done();
            }
            requestAnimationFrame(frame);
          });
          frames.sort((a, b) => a - b);
          return {
            canvasPixels: canvas.width * canvas.height,
            frames: frames.length,
            medianFrameMs: frames[Math.floor(frames.length / 2)],
            medianFps: 1000 / frames[Math.floor(frames.length / 2)],
            p95FrameMs: frames[Math.floor(frames.length * 0.95)],
          };
        }, selector);
      }
      await p.click("[data-home]");
    }
    fs.writeFileSync(
      "review-simulators/quality-comparison.json",
      JSON.stringify(report, null, 2) + "\n",
    );
    console.log(JSON.stringify(report));
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
