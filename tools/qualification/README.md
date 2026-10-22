# Explicit preservation accounting

Run `node tools/qualification/authorized-preservation.cjs` from the repository.
Receipts default to the adjacent cloud folder `qualification-preservation/accounting`;
`PRESERVATION_ACCOUNTING_EVIDENCE` can select another cloud evidence folder.

The supplied `481319d3a351fa41827b75a1afda5485920f91ff` successor preserves
Guided/Explore adapters that live in four files protected by the original byte
contract. Their exact original hashes still describe the source before those
adapters existed. Restoring those bytes would remove these current adapters and
their cancellation/snapshot behavior. Moving them to another architecture would
be a new refactor, not a narrow preservation repair.

The original strict gate therefore remains **FAIL** at assertion 39, before its
subordinate CPU/browser suites. The original historical audit remains
**HISTORICAL_DELTA_FAIL** with 79 assertions and five failures: four additional
protected Guided bridge deltas and the exact-three-deltas expectation. The
inherited ECG original fingerprint also remains failed; its precisely three
lazy-load additions are provenance, not an original-gate pass.

This separate tool keeps both original scripts and the original baseline
hash-pinned, runs them unchanged, and verifies their exact failure sets. It then:

- Reconstructs the exact four protected Guided bridge patches from frozen
  `743a0a8` to supplied `481319d`, checking both endpoint hashes and patch bytes.
- Requires those four current files to equal the supplied authorized endpoint,
  with every other protected file still governed by its original contract or
  the existing exact historical audit.
- Checks supplied asset/vendor payload blobs and modes, all 111 existing MP3s,
  the corrected 611-question BANK literal, and model manifest semantics and
  actual byte/hash entries. Additional application changes are listed for review.
- Rejects in-memory mutations of untouched source, an approved bridge, source
  anatomy, narration, ECG, an original answer key, and manifest metadata through
  the same validator used by the real accounting check. No source is mutated.
- Runs four unchanged CPU suites: session (18 groups), player (19 groups), lead
  adapter (12 groups), and original simulator/question/storage/model checks.

Success is named `AUTHORIZED_DELTAS_ACCOUNTED_ORIGINAL_GATES_FAIL`. Its exit code
only describes this additional accounting. It must never be reported as a pass
of the original strict or historical gates. Changing this ledger requires
reviewing the actual patch and affected behavioral evidence; do not regenerate
expectations from arbitrary working bytes to get a green result.

This is not actual audiovisual presentation measurement, independent/Cursor
review, physical device validation, listening, or specialist/clinical approval.
