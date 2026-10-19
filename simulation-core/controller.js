/* Pure teaching state shared by both simulators. Times are illustrative, not patient predictions. */
(function (root) {
  "use strict";
  const heartPhases = [
    {
      id: "filling",
      name: "Passive filling",
      av: "OPEN",
      sl: "CLOSED",
      flow: "fill",
      volume: "rises",
      text: "Atrial pressure exceeds ventricular pressure. Both ventricles fill through open AV valves.",
    },
    {
      id: "atrial",
      name: "Atrial contraction",
      av: "OPEN",
      sl: "CLOSED",
      flow: "fill",
      volume: "rises",
      text: "Atrial shortening follows atrial depolarization and completes ventricular filling.",
    },
    {
      id: "contraction",
      name: "Isovolumetric contraction",
      av: "CLOSED",
      sl: "CLOSED",
      flow: "none",
      volume: "constant",
      text: "Ventricular pressure rises after activation. Both valve pairs are closed; ejection has not begun.",
    },
    {
      id: "ejection",
      name: "Ejection",
      av: "CLOSED",
      sl: "OPEN",
      flow: "eject",
      volume: "falls",
      text: "Ventricular pressure exceeds arterial pressure. Both ventricles eject toward their respective circuits.",
    },
    {
      id: "relaxation",
      name: "Isovolumetric relaxation",
      av: "CLOSED",
      sl: "CLOSED",
      flow: "none",
      volume: "constant",
      text: "Ventricular pressure falls after repolarization. Both valve pairs are closed until ventricular pressure falls below atrial pressure.",
    },
  ];
  // One 800 ms illustrative cycle (75 beats/min). Independent electrical and mechanical windows.
  const heartAt = (ms) => {
    const t = ((ms % 800) + 800) % 800;
    const i =
      t < 100 ? 0 : t < 200 ? 1 : t < 270 ? 2 : t < 500 ? 3 : t < 580 ? 4 : 0;
    const stage =
      t < 80
        ? "p"
        : t < 200
          ? "pr"
          : t < 260
            ? "qrs"
            : t < 400
              ? "st"
              : t < 500
                ? "t"
                : t < 560
                  ? "u"
                  : "tp";
    const schematicVolume =
      t < 100
        ? 50 + (55 * (t + 220)) / 320
        : t < 200
          ? 105 + (15 * (t - 100)) / 100
          : t < 270
            ? 120
            : t < 500
              ? 120 - (70 * (t - 270)) / 230
              : t < 580
                ? 50
                : 50 + (55 * (t - 580)) / 320;
    return { ...heartPhases[i], index: i, stage, ms: t, schematicVolume };
  };
  const phaseTimes = [650, 130, 230, 330, 530];
  const legacyPhase = { p: 0, pr: 1, qrs: 2, st: 3, t: 3, u: 4, tp: 0 };
  const respiratoryPhases = [
    {
      id: "inspiration",
      name: "Inspiration return to baseline",
      source: "Inspired fresh gas",
      co2: 0,
      airflow: "Inward",
      text: "The inspiratory downstroke follows the end-tidal point. Quiet inspiration: diaphragm contracts downward, thoracic volume rises, and alveolar pressure is below ambient while air enters.",
      start: 0,
    },
    {
      id: "deadspace",
      name: "Phase 1: dead-space expiration",
      source: "Conducting airway dead space",
      co2: 0,
      airflow: "Outward",
      text: "Early expired gas comes from conducting airways. Low CO₂ here describes expiration, unlike the low inspired baseline.",
      start: 2,
    },
    {
      id: "mixing",
      name: "Phase 2: mixing and rising CO₂",
      source: "Mixed airway and alveolar gas",
      co2: 20,
      airflow: "Outward",
      text: "As expiration continues, alveolar gas mixes with conducting-airway gas at the sample site. Measured CO₂ rises.",
      start: 2.5,
    },
    {
      id: "plateau",
      name: "Phase 3: alveolar plateau",
      source: "Predominantly alveolar gas",
      co2: 38,
      airflow: "Outward",
      text: "Later expired gas predominantly reflects alveolar gas. The synthetic plateau slopes gently upward; it is not inspired gas.",
      start: 3,
    },
    {
      id: "endtidal",
      name: "End-tidal point",
      source: "Last expired alveolar sample",
      co2: 40,
      airflow: "Zero at boundary",
      text: "EtCO₂ is the end-expiratory CO₂ value, immediately before inspiration. This synthetic example is 40 mmHg; it is not a clinical prediction.",
      start: 5,
    },
  ];
  function respiratoryAt(seconds) {
    const endpoint = seconds === 5;
    const t = endpoint ? 5 : ((seconds % 5) + 5) % 5;
    const i = endpoint ? 4 : t < 2 ? 0 : t < 2.5 ? 1 : t < 3 ? 2 : 3;
    const inspiration = t < 2;
    const boundary = t === 0 || t === 2 || endpoint;
    const inflation = inspiration
      ? (1 - Math.cos((Math.PI * t) / 2)) / 2
      : (1 + Math.cos((Math.PI * (t - 2)) / 3)) / 2;
    let co2 =
      t < 0.2
        ? 40 * (1 - t / 0.2)
        : t < 2.5
          ? 0
          : t < 3
            ? (36 * (t - 2.5)) / 0.5
            : 36 + (4 * (t - 3)) / 2;
    return {
      ...respiratoryPhases[i],
      index: i,
      seconds: t,
      co2,
      source:
        !endpoint && t < 0.2
          ? "Clearing the last expired sample at inspiration onset"
          : respiratoryPhases[i].source,
      inflation,
      diaphragm: inspiration ? "contracts downward" : "relaxes upward",
      pressure: boundary
        ? "equal to ambient"
        : inspiration
          ? "below ambient"
          : "above ambient",
      airflow: boundary
        ? "Zero at boundary"
        : inspiration
          ? "Inward"
          : "Outward",
    };
  }
  function cardiacOutput(edv, esv, hr) {
    if (
      ![edv, esv, hr].every(Number.isFinite) ||
      edv <= 0 ||
      esv < 0 ||
      esv > edv ||
      hr <= 0
    )
      throw Error("Use finite values: EDV > 0, 0 ≤ ESV ≤ EDV, and HR > 0.");
    const sv = edv - esv;
    return {
      sv,
      co: (sv * hr) / 1000,
      ef: (100 * sv) / edv,
      normalAnimation: sv > 0,
    };
  }
  function ventilation(rr, vt, vd) {
    if (
      ![rr, vt, vd].every(Number.isFinite) ||
      rr <= 0 ||
      vt < 0 ||
      vd < 0 ||
      vd > vt
    )
      throw Error("Use RR > 0 and volumes 0 ≤ VD ≤ VT, all finite.");
    return { minute: (rr * vt) / 1000, alveolar: (rr * (vt - vd)) / 1000 };
  }
  const api = {
    heartPhases,
    heartAt,
    phaseTimes,
    legacyPhase,
    respiratoryPhases,
    respiratoryAt,
    cardiacOutput,
    ventilation,
  };
  root.CardioSimCore = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window === "undefined" ? globalThis : window);
