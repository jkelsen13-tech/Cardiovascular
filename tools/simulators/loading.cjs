const { chromium } = require("playwright"),
  fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  try {
    const result = {
      context:
        "Cold desktop Chromium HTTP cache disabled; 10 Mbps down, 100 ms network latency; not iPad",
      lessons: {},
    };
    for (const system of ["heart", "respiratory"]) {
      const p = await b.newPage({ viewport: { width: 768, height: 1024 } }),
        cdp = await p.context().newCDPSession(p);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 100,
        downloadThroughput: 1250000,
        uploadThroughput: 1250000,
      });
      const t = Date.now();
      await p.goto("http://127.0.0.1:8765/");
      await p.locator("#" + system + "SimulatorLaunch").click();
      await p.locator("[data-clock]").waitFor();
      result.lessons[system] = { textAnd2DUsableMs: Date.now() - t };
      const organ = Date.now();
      await p.locator("[data-load-anatomy]").click();
      await p.waitForSelector("[data-organ-host][data-ready=true]", {
        timeout: 60000,
      });
      result.lessons[system].optionalAtlasLoadMs = Date.now() - organ;
      result.lessons[system].renderedTriangles = +(await p
        .locator("[data-organ-host]")
        .getAttribute("data-triangles"));
      result.lessons[system].drawCalls = +(await p
        .locator("[data-organ-host]")
        .getAttribute("data-draw-calls"));
      await p.close();
    }
    fs.writeFileSync(
      "review-simulators/loading.json",
      JSON.stringify(result, null, 2) + "\n",
    );
    console.log(JSON.stringify(result));
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
