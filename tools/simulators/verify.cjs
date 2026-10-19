const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  crypto = require("node:crypto");
const C = require("../../simulation-core/controller.js"),
  P = require("../../simulation-core/progress.js");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync("simulation-core/content.js", "utf8"), ctx);
const D = JSON.parse(JSON.stringify(ctx.window.CardioSimContent));
assert.equal(
  fs.readFileSync("index.html", "utf8"),
  fs.readFileSync("cmt-quiz.html", "utf8"),
);
assert.equal(D.questions.filter((q) => q.system === "heart").length, 30);
assert.equal(D.questions.filter((q) => q.system === "respiratory").length, 20);
assert.equal(new Set(D.questions.map((q) => q.id)).size, 50);
for (const q of D.questions) {
  assert(q.options[q.answer]);
  assert(q.explain.length > 30);
  assert(q.sourceRefs.length);
  q.sourceRefs.forEach((id) => assert(D.sources[id]?.url));
  assert.match(q.reviewStatus, /pending/);
}
const allMeshes = JSON.parse(
  fs.readFileSync("ecg-study/assets/model-manifest.json"),
).models.flatMap((m) =>
  m.nodes.filter((n) => n.mesh !== undefined).map((n) => n.name),
);
const lung = JSON.parse(
  fs.readFileSync("respiratory-study/assets/model-manifest.json"),
);
for (const s of D.structures) {
  assert(s.sourceRefs.every((id) => D.sources[id]));
  if (s.representationType === "reference_mesh") {
    assert(
      s.sourceMeshNames.every((n) =>
        (s.system === "heart"
          ? allMeshes
          : lung.meshInventory.map((m) => m.name)
        ).some((name) => name.includes(n)),
      ),
      s.id,
    );
  } else assert.equal(s.sourceMeshNames.length, 0);
}
for (let t = 0; t < 800; t++) {
  const p = C.heartAt(t);
  assert(!(p.av === "OPEN" && p.sl === "OPEN"));
  if (p.id.startsWith("contraction") || p.id === "relaxation") {
    assert.equal(p.av, "CLOSED");
    assert.equal(p.sl, "CLOSED");
    assert.equal(p.volume, "constant");
    assert.equal(p.flow, "none");
  }
}
assert.equal(C.heartAt(205).stage, "qrs");
assert.equal(C.heartAt(205).flow, "none");
assert.equal(C.heartAt(260).flow, "none");
assert.equal(C.heartAt(270).flow, "eject");
assert.equal(C.heartAt(530).id, "relaxation");
assert.deepEqual(C.cardiacOutput(120, 50, 75), {
  sv: 70,
  co: 5.25,
  ef: (100 * 70) / 120,
  normalAnimation: true,
});
assert.equal(C.cardiacOutput(120, 120, 75).ef, 0);
for (const v of [
  [0, 0, 75],
  [120, 121, 75],
  [120, -1, 75],
  [120, 50, 0],
  [NaN, 50, 75],
  [120, 50, Infinity],
])
  assert.throws(() => C.cardiacOutput(...v));
assert.deepEqual(C.ventilation(12, 500, 150), { minute: 6, alveolar: 4.2 });
assert.throws(() => C.ventilation(12, 100, 150));
assert.equal(C.respiratoryAt(1).airflow, "Inward");
assert.equal(C.respiratoryAt(2.2).airflow, "Outward");
assert.match(C.respiratoryAt(2.2).source, /dead space/);
assert.equal(C.respiratoryAt(2.75).index, 2);
assert.equal(C.respiratoryAt(4.9).index, 3);
assert.equal(C.respiratoryAt(5).index, 4);
assert.equal(C.respiratoryAt(5).co2, 40);
assert.equal(C.respiratoryAt(5).airflow, "Zero at boundary");
assert.match(C.respiratoryAt(0).source, /last expired/);
assert.equal(C.respiratoryAt(2).pressure, "equal to ambient");
const data = new Map([["old-study", "preserve"]]),
  storage = {
    getItem: (k) => data.get(k) || null,
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  };
const p = P.empty();
p.lessons.heart = 3;
p.attempts.push({
  id: "h1",
  correct: true,
  guided: false,
  date: new Date().toISOString(),
});
P.save(storage, p);
assert.deepEqual(P.load(storage).data, p);
assert.equal(P.status(p.attempts, "h1"), "Demonstrated");
const prior = data.get(P.KEY);
for (const text of [
  "{}",
  '{"version":2}',
  '{"version":1,"lessons":{},"attempts":[]}',
])
  assert.throws(() => P.importData(storage, text));
assert.equal(data.get(P.KEY), prior);
assert.equal(data.get("old-study"), "preserve");
data.set(P.KEY, "broken");
assert(P.load(storage).error);
assert.equal(data.get(P.KEY), "broken");
const model = fs
  .readFileSync("respiratory-study/assets/model-data.js", "utf8")
  .match(/="([A-Za-z0-9+/=]+)"/)[1];
const bytes = Buffer.from(model, "base64");
assert.equal(
  crypto.createHash("sha256").update(bytes).digest("hex"),
  lung.originalSha256,
);
assert.equal(lung.meshes, 65);
assert.equal(lung.triangles, 378963);
console.log(
  "PASS: 50 original question keys and sources, structure mappings, 800 heart states, delays and valve invariants, capnography boundary/source semantics, calculations and invalid inputs, versioned storage integrity, pinned lung hash/inventory.",
);
