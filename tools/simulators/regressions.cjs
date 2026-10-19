const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    headless: true,
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await p.goto("http://127.0.0.1:8765/");
    await p.click("#heartSimulatorLaunch");
    await p.click("[data-tab=practice]");
    await p.click('[data-session="5"]');
    await p.click("[data-home]");
    await p.click("#respiratorySimulatorLaunch");
    await p.click("[data-tab=practice]");
    assert(await p.locator('[data-session="5"]').isVisible());
    await p.click('[data-session="5"]');
    assert(
      (await p.evaluate(() => CardiorespiratoryStudy.getState().order)).every(
        (id) => id.startsWith("r"),
      ),
    );
    await p.click("[data-home]");
    await p.click("#heartSimulatorLaunch");
    await p.click("[data-load-anatomy]");
    await p.waitForSelector("[data-organ-host][data-ready=true]");
    await p.locator("[data-clock]").evaluate((el) => {
      el.value = "570";
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    assert.equal(
      await p
        .locator("[data-organ-host]")
        .getAttribute("data-mechanical-phase"),
      "relaxation",
    );
    await p.locator("[data-option=labels]").uncheck();
    await p.locator("[data-option=valves]").check();
    assert.equal(
      await p
        .locator("[data-organ-host]")
        .getAttribute("data-mechanical-phase"),
      "relaxation",
    );
    assert.equal(
      await p.locator("[data-organ-host]").getAttribute("data-valves"),
      "tv:CLOSED,mv:CLOSED,pv:CLOSED,av:CLOSED",
    );
    await p.locator("[data-option=labels]").check();
    for (const preset of [
      "0",
      "3.141592653589793",
      "0.7853981633974483",
      "-0.7853981633974483",
    ]) {
      await p.locator("[data-view]").selectOption(preset);
      await p.locator("[data-select-structure]").selectOption("rv");
      const boxes = await p
        .locator(".ecg-3d-label:not([hidden])")
        .evaluateAll((es) =>
          es.map((e) => {
            const r = e.getBoundingClientRect(),
              v = e.closest(".ecg-3d-viewport").getBoundingClientRect();
            return {
              id: e.dataset.structure,
              x: r.x,
              y: r.y,
              r: r.right,
              b: r.bottom,
              v: { x: v.x, y: v.y, r: v.right, b: v.bottom },
            };
          }),
        );
      assert(boxes.length <= 6);
      const selected = boxes.find((b) => b.id === "rv");
      assert(selected);
      assert(
        selected.x >= selected.v.x - 1 &&
          selected.r <= selected.v.r + 1 &&
          selected.y >= selected.v.y - 1 &&
          selected.b <= selected.v.b + 1,
        JSON.stringify(selected),
      );
      for (let i = 0; i < boxes.length; i++)
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i],
            b = boxes[j];
          assert(
            a.r <= b.x || b.r <= a.x || a.b <= b.y || b.b <= a.y,
            "label collision " + a.id + "/" + b.id,
          );
        }
    }
    await p.locator("[data-home]").click();
    await p.locator("#respiratorySimulatorLaunch").click();
    await p.locator("[data-load-anatomy]").click();
    await p.waitForSelector("[data-organ-host][data-ready=true]");
    await p.locator("[data-structure=rightlung]").click();
    assert(
      Number(
        await p
          .locator("[data-organ-host]")
          .getAttribute("data-selected-meshes"),
      ) > 0,
    );
    await p.locator("[data-isolate]").click();
    await p.locator("[data-structure=alveoli]").click();
    assert.match(
      await p.locator("[data-atlas-status]").textContent(),
      /context is restored/,
    );
    await p.locator("[data-tab=sources]").click();
    await p.locator("[data-progress-text]").fill(
      JSON.stringify({
        version: 1,
        sourceVersion: "2026-10-17",
        lessons: { heart: 100 },
        attempts: [],
      }),
    );
    await p.locator("[data-import]").click();
    assert.match(
      await p.locator("[data-progress-result]").textContent(),
      /rejected/,
    );
    console.log(
      "PASS independent-review regressions: organ session isolation, paused mechanics survive visual options, selected-label bounds and noncollision at all presets on 390px, invalid lesson import rejected.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
