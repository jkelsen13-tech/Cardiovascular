#!/usr/bin/env python3
"""One-time removal: strip the Kahoot-style Review mode from cmt-quiz.html, sync index.html.
Removes exactly the four self-contained blocks inserted by the earlier patch. Nothing else touched."""
import os, re, shutil

REPO = os.getcwd()
f = os.path.join(REPO, "cmt-quiz.html")
src = open(f, encoding="utf-8").read()
orig_len = len(src)

# 1) CSS block: from Kahoot comment to just before 'a{color:var(--accent)}'
c0 = src.index("  /* ---- Kahoot-style Review (self-contained mode) ---- */")
c1 = src.index("  a{color:var(--accent)}", c0)
src = src[:c0] + src[c1:]

# 2) Home-screen button (ends right before the showEcg button)
anchor = '      <button class="btn secondary" onclick="showEcg()">'
b0 = src.index('      <button class="btn secondary" onclick="showKahoot()">')
b1 = src.index(anchor, b0)
src = src[:b0] + src[b1:]

# 3) HTML cards: setup/play/results, up to the ECG home comment
h0 = src.index("    <!-- Kahoot-style Review: setup -->")
h1 = src.index("    <!-- ECG Rhythm Practice: home -->", h0)
src = src[:h0] + src[h1:]

# 4) JS: KAHOOT banner to just before final init();
j0 = src.index("/* ===================== KAHOOT-STYLE REVIEW (self-contained mode) ===================== */")
j1 = src.rindex("init();")
src = src[:j0] + src[j1:]

# ---- verification ----
bad = re.findall(r'kahoot|Kahoot|khSession|KH_SHAPES|kh-qstrip|kh-ans|showKahoot|khQuit|khHome|khBegin|khOptions|khRender|khPick|khNext|khResults', src)
assert not bad, "leftover kahoot refs: %s" % bad[:5]
m = re.search(r"const BANK = \[([\s\S]*?)\n\];", src)
qs = re.findall(r'\{t:"[^"]+", module:\d+, unit:\d+,', m.group(1))
assert len(qs) == 611, "question count changed: %d" % len(qs)
assert "init();" in src
open(f, "w", encoding="utf-8").write(src)
shutil.copyfile(f, os.path.join(REPO, "index.html"))
print("removed kahoot:", orig_len, "->", len(src), "| questions:", len(qs))

# cleanup patch tooling + this workflow
for p in [".github/workflows/run-patch.yml"]:
    fp = os.path.join(REPO, p)
    if os.path.exists(fp): os.remove(fp)
shutil.rmtree(os.path.join(REPO, "tools"), ignore_errors=True)
print("cleanup done")
