/* Completion checks: actual browser touch events, route mapping and enlarged text. */
const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const p = await b.newPage({
    viewport: { width: 768, height: 1024 },
    hasTouch: true,
  });
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  try {
    await p.goto("http://127.0.0.1:8765");
    await p.click("#heartSimulatorLaunch");
    await p.click("[data-load-anatomy]");
    await p.waitForSelector("[data-organ-host][data-ready=true]");
    const route = [
      [],
      ["svc", "ivc"],
      ["ra"],
      ["tv"],
      ["rv"],
      ["pv"],
      ["pa"],
      [],
      ["vein"],
      ["la"],
      ["mv"],
      ["lv"],
      ["av"],
      ["aorta"],
      [],
    ];
    for (let i = 0; i < route.length; i++) {
      assert.equal(
        await p
          .locator("[data-organ-host]")
          .getAttribute("data-selected-structures"),
        route[i].join(","),
      );
      if (i < route.length - 1) await p.click("[data-route-next]");
    }
    await p.click("[data-coronary]");
    assert.equal(
      await p
        .locator("[data-organ-host]")
        .getAttribute("data-selected-structures"),
      "sinus",
    );
    await p.click("[data-home]");
    await p.click("#respiratorySimulatorLaunch");
    await p.click("[data-load-anatomy]");
    await p.waitForSelector("[data-organ-host][data-ready=true]");
    const canvas = p.locator(".sim-atlas-canvas canvas");
    assert.equal(
      await canvas.evaluate((c) => getComputedStyle(c).touchAction),
      "pan-y",
    );
    await p.click("[data-touch]");
    await canvas.scrollIntoViewIfNeeded();
    const r = await canvas.boundingBox(),
      cdp = await p.context().newCDPSession(p),
      cx = r.x + r.width / 2,
      cy = r.y + r.height / 2;
    const points = (d) => [
      { x: cx - d, y: cy, id: 1 },
      { x: cx + d, y: cy, id: 2 },
    ];
    const before = Number(
      await p.locator("[data-organ-host]").getAttribute("data-camera-distance"),
    );
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: points(35),
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: points(50),
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: points(75),
    });
    await p.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r)),
        ),
    );
    const after = Number(
      await p.locator("[data-organ-host]").getAttribute("data-camera-distance"),
    );
    assert(after < before && after >= 3.5);
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [points(75)[0]],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: cx - 70, y: cy + 10, id: 1 }],
    });
    await p.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r)),
        ),
    );
    assert.equal(
      Number(
        await p
          .locator("[data-organ-host]")
          .getAttribute("data-camera-distance"),
      ),
      after,
    );
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchCancel",
      touchPoints: [],
    });
    await p.click("[data-touch]");
    assert.equal(
      await canvas.evaluate((c) => getComputedStyle(c).touchAction),
      "pan-y",
    );
    for (const system of ["heart", "respiratory"]) {
      await p.click("[data-home]");
      await p.click("#" + system + "SimulatorLaunch");
      const base = await p
        .locator("[data-load-status]")
        .evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
      await p.click("[data-text-size]");
      const large = await p
        .locator("[data-load-status]")
        .evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
      assert.equal(large, base * 2);
      for (const width of [390, 768, 1024]) {
        await p.setViewportSize({ width, height: 1024 });
        assert(
          await p.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          "200% text must reflow at " + width,
        );
        const controls = await p
          .locator("#cardiorespiratoryStudy button:visible")
          .evaluateAll((es) =>
            es.map((e) => ({
              w: e.getBoundingClientRect().width,
              h: e.getBoundingClientRect().height,
            })),
          );
        assert(controls.every((r) => r.w >= 44 && r.h >= 44));
        assert((await p.locator("[data-diagram-equivalent]").count()) > 0);
        await p.screenshot({
          path: `review-simulators/${system}-text200-${width}.png`,
          fullPage: true,
        });
      }
      await p.click("[data-load-anatomy]");
      await p.waitForSelector("[data-organ-host][data-ready=true]");
      if (system === "heart") {
        await p.locator("[data-select-structure]").selectOption("rv");
        await p.locator(".ecg-3d-viewport").scrollIntoViewIfNeeded();
        await p.waitForFunction(
          () =>
            !document.querySelector(".ecg-3d-label[data-selected=true]").hidden,
        );
        assert.equal(
          await p
            .locator(".ecg-3d-label[data-selected=true]")
            .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
          30,
        );
        const bounds = await p
          .locator(".ecg-3d-label[data-selected=true]")
          .evaluate((e) => {
            const a = e.getBoundingClientRect(),
              b = e.closest(".ecg-3d-viewport").getBoundingClientRect();
            return (
              a.x >= b.x &&
              a.right <= b.right &&
              a.y >= b.y &&
              a.bottom <= b.bottom
            );
          });
        assert(bounds);
        for (const width of [390, 768, 1024]) {
          await p.setViewportSize({ width, height: 1024 });
          for (const id of ["rv", "svc", "septum"]) {
            await p.locator("[data-select-structure]").selectOption(id);
            await p.locator(".ecg-3d-viewport").scrollIntoViewIfNeeded();
            await p.waitForFunction(
              () =>
                !document.querySelector(".ecg-3d-label[data-selected=true]")
                  .hidden,
            );
            assert(
              await p
                .locator(".ecg-3d-label[data-selected=true]")
                .evaluate((e) => {
                  const a = e.getBoundingClientRect(),
                    b = e.closest(".ecg-3d-viewport").getBoundingClientRect();
                  return (
                    a.left >= b.left &&
                    a.right <= b.right &&
                    a.top >= b.top &&
                    a.bottom <= b.bottom
                  );
                }),
              "enlarged callout bounds: " + id + " at " + width,
            );
          }
        }
        await p.locator("[data-large]").check();
        assert.equal(
          await p
            .locator(".ecg-3d-label[data-selected=true]")
            .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
          36,
        );
        await p.locator("[data-large]").uncheck();
        await p.locator("[data-valve-example]").selectOption("Atresia");
        assert.match(
          await p
            .locator("[data-valve-diagram] [data-diagram-equivalent]")
            .textContent(),
          /Atresia/,
        );
      }
      await p.click("[data-text-size]");
      await p
        .locator("#cardiorespiratoryStudy")
        .evaluate((e) => (e.style.zoom = "2"));
      assert(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "Browser CSS 200% zoom reflow",
      );
      await p
        .locator("#cardiorespiratoryStudy")
        .evaluate((e) => (e.style.zoom = "1"));
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS completion: 15 circulation stops and coronary mesh mapping, real two-finger browser pinch/clamp/release/cancel/unlock, 200% text at 390/768/1024, 44px controls, readable diagram equivalents, enlarged selected label and browser 200% zoom reflow.",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
