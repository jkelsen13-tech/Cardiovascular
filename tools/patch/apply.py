#!/usr/bin/env python3
"""One-time patch: retag audit fixes + new Units 4-8 questions + Kahoot-style review mode.
Applies to cmt-quiz.html, then syncs index.html. Self-cleans patch files."""
import re, os, shutil

REPO = os.getcwd()
P = os.path.join(REPO, "tools", "patch")
f = os.path.join(REPO, "cmt-quiz.html")
src = open(f, encoding="utf-8").read()
orig_len = len(src)

# ---------- STEP 1: retag audit fixes (tags only, no content changes) ----------
src = src.replace("module:6, unit:3,", "module:3, unit:6,")

i = src.index("const BANK = ["); j = src.index("\n];", i)
bank = src[i:j]
starts = [m.start() for m in re.finditer(r'\{t:"', bank)]
blocks = []
for k, s in enumerate(starts):
    e = starts[k+1] if k+1 < len(starts) else len(bank)
    blocks.append(bank[s:e])
for k, b in enumerate(blocks):
    if b.startswith('{t:"therapy", module:1, unit:3,'):
        if ("AED" in b) or ("defibrillation" in b) or ("Heart Aid" in b) or ("Beck" in b):
            blocks[k] = b.replace('{t:"therapy", module:1, unit:3,', '{t:"therapy", module:3, unit:7,', 1)
        else:
            blocks[k] = b.replace('{t:"therapy", module:1, unit:3,', '{t:"therapy", module:3, unit:6,', 1)
    elif b.startswith('{t:"twelve", module:1, unit:3,'):
        blocks[k] = b.replace('{t:"twelve", module:1, unit:3,', '{t:"twelve", module:4, unit:8,', 1)
src = src[:i] + bank[:starts[0]] + "".join(blocks) + src[j:]

# ---------- STEP 2: append new questions (Units 4-8) ----------
nq = ""
for n in ["nq1.js", "nq2.js", "nq3.js", "nq4.js", "nq5.js"]:
    nq += open(os.path.join(P, n), encoding="utf-8").read() + "\n"
j = src.index("\n];", src.index("const BANK = ["))
src = src[:j] + "\n" + nq + src[j:]

# ---------- Kahoot-style review mode (new self-contained mode only) ----------
css = open(os.path.join(P, "kh_css.txt"), encoding="utf-8").read()
html = open(os.path.join(P, "kh_html.txt"), encoding="utf-8").read()
js = open(os.path.join(P, "kh_js.txt"), encoding="utf-8").read()
btn = open(os.path.join(P, "kh_btn.txt"), encoding="utf-8").read()

src = src.replace("  a{color:var(--accent)}", css + "  a{color:var(--accent)}", 1)
anchor = '      <button class="btn secondary" onclick="showEcg()">'
assert anchor in src
src = src.replace(anchor, btn + anchor, 1)
a2 = "    <!-- ECG Rhythm Practice: home -->"
assert a2 in src
src = src.replace(a2, html + a2, 1)
k = src.rindex("init();")
src = src[:k] + js + src[k:]

# ---------- integrity check ----------
m = re.search(r"const BANK = \[([\s\S]*?)\n\];", src)
qs = re.findall(r'\{t:"[^"]+", module:\d+, unit:\d+,', m.group(1))
print("question objects:", len(qs))
assert len(qs) == 611, "unexpected question count"

open(f, "w", encoding="utf-8").write(src)
shutil.copyfile(f, os.path.join(REPO, "index.html"))
print("patched", orig_len, "->", len(src))

# ---------- cleanup: remove probe files + patch tooling ----------
for p in [".probe", "images/slides/.push-test.jpg", "images/slides/.push-test2.txt",
          "images/slides/.push-test3.jpg", ".github/workflows/patch.yml"]:
    fp = os.path.join(REPO, p)
    if os.path.exists(fp):
        os.remove(fp)
shutil.rmtree(os.path.join(REPO, "tools"), ignore_errors=True)
print("cleanup done")
