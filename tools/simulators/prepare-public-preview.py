"""Prepare an unpublished, respiratory-only public candidate under one allowed path.

Uses an allowlist instead of trying to redact the full private course app. Never
copies the legacy HTML/BANK, course media, ASPT image routes or private sources.
The complete private runtime is packaged separately. No network/publish action.
"""
import argparse, hashlib, json, pathlib, subprocess

ROOT = pathlib.Path(__file__).resolve().parents[2]
PREFIX = 'respiratory-v2-preview'
parser = argparse.ArgumentParser()
parser.add_argument('output', type=pathlib.Path)
args = parser.parse_args()
destination = args.output.resolve()
if destination == ROOT or ROOT in destination.parents:
    raise SystemExit('Use a scratch output outside the source repository.')
target = destination / PREFIX
target.mkdir(parents=True, exist_ok=True)

files = set()
for folder in ['simulation-core', 'respiratory-study']:
    files.update(p for p in (ROOT / folder).rglob('*') if p.is_file() and '.git' not in p.parts and '__pycache__' not in p.parts)
for name in ['docs/RESPIRATORY-EXPLORER.md', 'docs/RESPIRATORY-EXPLORER-PUBLIC-PREVIEW.md', 'ecg-study/vendor/three-gltf.min.js', 'ecg-study/vendor/THREE-LICENSE.txt', 'ecg-study/assets/ATTRIBUTION.md', 'ecg-study/assets/CC-BY-4.0.txt']:
    files.add(ROOT / name)
allowed_suffixes = {'.js', '.css', '.json', '.md', '.txt'}
if any(p.suffix not in allowed_suffixes for p in files):
    raise SystemExit('Unexpected asset type: review its provenance before public inclusion.')

manifest = {
    'preparedOnly': True,
    'proposedPublicPath': '/' + PREFIX + '/',
    'publicAccess': 'unlisted-public if explicitly authorized; no access-control claim',
    'sourceCommit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
    'sourceTree': subprocess.check_output(['git', 'rev-parse', 'HEAD^{tree}'], cwd=ROOT, text=True).strip(),
    'scope': 'Respiratory modules only; complete private app preserved separately.',
    'excluded': ['index.html/cmt-quiz.html legacy course BANK', 'images/', 'study/', 'ecg/images/', 'aspt/ and its course-image lessons', 'lead-placement/', 'all supplied PDFs/screenshots and private scratch files'],
    'dependencies': {},
    'adaptations': ['Dedicated respiratory-only entry wrapper', 'Copied simulator progress namespace isolated as cmt.respiratory.preview.progress.v1; Sources notice and home label updated to match preview scope'],
}
for source in sorted(files):
    relative = source.relative_to(ROOT)
    data = source.read_bytes()
    source_hash = hashlib.sha256(data).hexdigest()
    if str(relative) == 'simulation-core/module.js':
        data = data.replace(b'Only cmt.simulators.progress.v1', b'Only cmt.respiratory.preview.progress.v1')
        data = data.replace('← All study modes'.encode(), '← Preview home'.encode())
    if str(relative) == 'simulation-core/progress.js':
        old = b'cmt.simulators.progress.v1'
        if data.count(old) != 1:
            raise SystemExit('Progress namespace contract changed; review public isolation.')
        data = data.replace(old, b'cmt.respiratory.preview.progress.v1')
    result = target / relative
    result.parent.mkdir(parents=True, exist_ok=True)
    result.write_bytes(data)
    manifest['dependencies'][str(relative)] = {'sourceSha256': source_hash, 'preparedSha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)}

entry = (ROOT / 'tools/simulators/public-preview.html').read_bytes()
(target / 'index.html').write_bytes(entry)
manifest['dependencies']['index.html'] = {'source': 'tools/simulators/public-preview.html', 'preparedSha256': hashlib.sha256(entry).hexdigest(), 'bytes': len(entry)}

# A nonempty existing output may contain stale files from an earlier preparation.
# Fail rather than silently shipping or deleting anything outside this allowlist.
expected = set(manifest['dependencies']) | {'PREVIEW-MANIFEST.json'}
actual = {str(p.relative_to(target)) for p in target.rglob('*') if p.is_file()}
unexpected = actual - expected
if unexpected:
    raise SystemExit('Unexpected existing output files require separate inspection: ' + repr(sorted(unexpected)))
(target / 'PREVIEW-MANIFEST.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps({'path': str(target), 'files': len(manifest['dependencies']), 'sourceCommit': manifest['sourceCommit'], 'published': False}, indent=2))
