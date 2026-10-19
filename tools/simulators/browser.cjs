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
  const page = await browser.newPage({
    viewport: { width: 1024, height: 768 },
  });
  const errors = [],
    external = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://127.0.0.1:8765/") &&
      !r.url().startsWith("data:")
    )
      external.push(r.url());
  });
  fs.mkdirSync("review-simulators", { recursive: true });
  try {
    await page.goto("http://127.0.0.1:8765/");
    await page.evaluate(() =>
      localStorage.setItem("regression-sentinel", "preserved"),
    );
    await page.locator("#heartSimulatorLaunch").click();
    await page.locator('[data-heart-phase="2"]').click();
    assert.match(
      await page.locator("[data-heart-clock]").textContent(),
      /Isovolumetric contraction/,
    );
    assert.match(await page.locator("[data-heart-clock]").textContent(), /QRS/);
    await page.locator('[data-heart-phase="4"]').click();
    assert.match(
      await page.locator("[data-heart-clock]").textContent(),
      /Isovolumetric relaxation/,
    );
    await page.locator("[data-cardiac-form] button").click();
    assert.match(
      await page.locator("[data-cardiac-result]").textContent(),
      /70.0.*5.25.*58.3/,
    );
    await page.locator('[data-structure="ias"]').click();
    assert.match(
      await page.locator("[data-structure-detail]").textContent(),
      /Supplementary schematic/,
    );
    await page.locator("[data-load-anatomy]").click();
    await page.waitForSelector('[data-organ-host][data-ready="true"]', {
      timeout: 30000,
    });
    assert.equal(await page.locator(".ecg-3d-canvas").count(), 1);
    await page.locator("[data-select-structure]").selectOption("ra");
    await page.locator('[data-select-action="isolate"]').click();
    await page.locator('[data-select-action="restore"]').click();
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1366, height: 1024 },
    ]) {
      await page.setViewportSize(viewport);
      await page.locator("[data-select-structure]").selectOption("rv");
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      const font = await page
        .locator('.ecg-3d-label[data-structure="rv"]')
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      assert(font >= 14);
      await page.screenshot({
        path: `review-simulators/heart-${viewport.width}.png`,
        fullPage: true,
      });
    }
    await page.locator('[data-tab="guided"]').click();
    await page.locator('[data-lesson="1"]').click();
    await page.locator('[data-tab="practice"]').click();
    await page.locator('[data-session="5"]').click();
    await page.locator("[data-answer]").first().click();
    assert(await page.locator(".sim-feedback").isVisible());
    await page.locator("[data-transfer-question]").click();
    assert(await page.locator("[data-hint]").isVisible());
    await page.locator("[data-answer]").first().click();
    await page.locator("[data-retry-question]").click();
    await page.locator("[data-answer]").first().click();
    await page.locator('[data-tab="sources"]').click();
    await page.locator("[data-export]").click();
    const saved = await page.locator("[data-progress-text]").inputValue();
    assert(JSON.parse(saved).attempts.length === 3);
    await page.locator("[data-progress-text]").fill("{}");
    await page.locator("[data-import]").click();
    assert.match(
      await page.locator("[data-progress-result]").textContent(),
      /rejected/,
    );
    await page.locator("[data-home]").click();
    await page.locator("#respiratorySimulatorLaunch").click();
    await page.waitForSelector("[data-dynamic=true]");
    assert.equal(await page.locator("canvas").count(), 1);
    await page.locator('[data-resp-phase="4"]').click();
    assert.match(
      await page.locator("[data-resp-clock]").textContent(),
      /40.0 mmHg.*5.00/,
    );
    await page.locator('[data-resp-phase="1"]').click();
    assert.match(
      await page.locator("[data-resp-clock]").textContent(),
      /dead space/,
    );
    await page.locator('[data-resp-view="exchange"]').click();
    assert.match(
      await page.locator("[data-resp-diagram]").textContent(),
      /O₂ ↓ toward blood/,
    );
    await page.locator('[data-cue="air"]').uncheck();
    assert.match(
      await page.locator("[data-resp-diagram]").textContent(),
      /O₂ ↓ toward blood/,
    );
    await page.locator("[data-ventilation-form] button").click();
    assert.match(
      await page.locator("[data-ventilation-result]").textContent(),
      /6.00.*4.20/,
    );
    await page.locator("[data-ventilation]").selectOption("positive");
    assert.match(
      await page.locator("[data-resp-clock]").textContent(),
      /Separate positive-pressure/,
    );
    await page.locator("[data-resp-view=whole]").click();
    assert.match(
      await page.locator("[data-resp-diagram]").textContent(),
      /no active contraction implied/,
    );
    for (const width of [390, 768, 1024, 1366]) {
      await page.setViewportSize({ width, height: width === 768 ? 1024 : 844 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      await page.screenshot({
        path: `review-simulators/respiratory-${width}.png`,
        fullPage: true,
      });
    }
    await page.locator("[data-load-anatomy]").click();
    await page.waitForSelector('[data-organ-host][data-ready="true"]', {
      timeout: 30000,
    });
    assert.equal(
      await page.locator("[data-organ-host]").getAttribute("data-meshes"),
      "65",
    );
    await page.screenshot({
      path: "review-simulators/lung-reference.png",
      fullPage: true,
    });
    await page.locator("[data-touch]").click();
    assert.equal(
      await page
        .locator(".sim-atlas-canvas canvas")
        .evaluate((c) => getComputedStyle(c).touchAction),
      "none",
    );
    await page.locator("[data-touch]").click();
    assert.equal(
      await page
        .locator(".sim-atlas-canvas canvas")
        .evaluate((c) => getComputedStyle(c).touchAction),
      "pan-y",
    );
    await page.locator("[data-home]").click();
    assert.equal(await page.locator("canvas").count(), 0);
    assert.equal(
      await page.evaluate(() => localStorage.getItem("regression-sentinel")),
      "preserved",
    );
    await page.locator("#ecgStudyLaunch").click();
    await page.waitForSelector('#ecg3DHost[data-ready="true"]');
    await page.locator("#ecgStageSlider").evaluate((el) => {
      el.value = "2";
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    assert.equal(
      await page.locator("#ecg3DHost").getAttribute("data-flow-phase"),
      "none",
    );
    assert.equal(
      await page.locator("#ecg3DHost").getAttribute("data-valves"),
      "tv:CLOSED,mv:CLOSED,pv:CLOSED,av:CLOSED",
    );
    assert.equal(errors.length, 0, errors.join("\n"));
    assert.equal(external.length, 0, external.join("\n"));
    console.log(
      "PASS browser: heart and respiratory flows, local atlas load, 4 responsive viewports, calculators, inset selection, new storage and existing sentinel, retries/import rejection, one renderer disposal, legacy QRS correction, no external requests or JS errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
