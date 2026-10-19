/* A separate namespace protects every existing quiz and study record. */
(function (root) {
  "use strict";
  const KEY = "cmt.simulators.progress.v1";
  const empty = () => ({
    version: 1,
    sourceVersion: "2026-10-17",
    lessons: {},
    attempts: [],
  });
  function validate(p) {
    if (
      !p ||
      p.version !== 1 ||
      p.sourceVersion !== "2026-10-17" ||
      !p.lessons ||
      Array.isArray(p.lessons) ||
      typeof p.lessons !== "object" ||
      !Array.isArray(p.attempts) ||
      p.attempts.length > 10000
    )
      throw Error("Unsupported or invalid simulator progress.");
    for (const [k, v] of Object.entries(p.lessons)) {
      if (
        !["heart", "respiratory"].includes(k) ||
        !Number.isInteger(v) ||
        v < 0 ||
        v > 100
      )
        throw Error("Invalid lesson step.");
    }
    for (const a of p.attempts) {
      if (
        !a ||
        typeof a.id !== "string" ||
        !/^[hr]\d+$/.test(a.id) ||
        typeof a.correct !== "boolean" ||
        typeof a.guided !== "boolean" ||
        typeof a.date !== "string" ||
        !Number.isFinite(Date.parse(a.date))
      )
        throw Error("Invalid practice attempt.");
    }
    return p;
  }
  function load(storage) {
    try {
      const raw = storage.getItem(KEY);
      return { data: raw ? validate(JSON.parse(raw)) : empty(), error: "" };
    } catch (e) {
      return {
        data: empty(),
        error:
          "Saved simulator progress could not be read. Export the stored text before resetting; other study history is untouched.",
      };
    }
  }
  function save(storage, data) {
    validate(data);
    storage.setItem(KEY, JSON.stringify(data));
  }
  function importData(storage, text) {
    const p = validate(JSON.parse(text));
    save(storage, p);
    return p;
  }
  function status(attempts, id) {
    const a = attempts.filter((x) => x.id === id);
    if (!a.length) return "Introduced";
    if (a.at(-1).correct === false) return "Revisit";
    return a.some((x) => x.correct && !x.guided)
      ? "Demonstrated"
      : "Practicing";
  }
  const api = { KEY, empty, validate, load, save, importData, status };
  root.CardioSimProgress = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window === "undefined" ? globalThis : window);
