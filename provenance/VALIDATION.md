# RC0 Private Validation

Candidate source: private `zenbanez/zen-os` commit
`d5325bddc20da56d9cd40cf25cbfd9a1bd532ce7`.

This record supports private review. It is not a public release, adoption,
legal clearance, or production-fitness claim.

## Builder validation

- The deterministic builder was run twice from the frozen source and produced
  identical manifest and content digests.
- Every RFC and candidate licence output was compared byte-for-byte with its
  frozen source Git blob. Reading Git blobs directly prevented checkout and
  archive line-ending filters from silently altering exact copies.
- All text outputs, including extensionless files, are checkout-canonicalized
  to LF so authored-file hashes remain stable across host platforms.
- The explicit allowlist, containment scan, fork-safe hosted-workflow static
  review, and all local constitutional checks passed from committed state.
- A seeded dirty-tree test proved the local runner fails closed. An earlier
  implementation had inspected command output instead of the Git exit status;
  that defect was corrected before this candidate was delivered.

## Independent synthetic cold arrival

A fresh participant received an isolated local clone containing only RC0 and
no source-house remote or context. They used synthetic `.invalid` identities,
created the first intent, workspace, delegation, participants, evidence,
warrants, concept proposal, decision proposal, and progress records, committed
with a mapped participant identity, and ran the local guard.

The first traversal found that the bootstrapper emitted a workspace note
without frontmatter while the guard correctly required it. The builder repaired
the generator and strengthened the generated evidence, concept, decision,
indexes, intent bounds, and action warrant. A second fresh traversal from the
repaired candidate required no content repair and ended with a clean tree and
all seven configured checks passing.

Cold-trial evidence retained outside this candidate:

- failed traversal commit: `03d95ba35c039d08f51c50b7648ea91d5738c91a`;
- repaired candidate tested: `cf4353d90f2972b56b63000522cae93f657875b2`;
- passing traversal commit: `8785f0c3f3b4145fa0aca13c39b0c130ceff8178`;
- result: `LOCAL CONSTITUTIONAL RESULT: PASS` with all seven checks passing.

The trial noted one bounded ambiguity: first-instance standing, intent, and
delegation are created transactionally during bootstrap rather than arriving
through an already-operating house. `ONBOARDING.md` and the scaffolder make
that exceptional boundary explicit enough for RC0, but independent reviewers
may recommend clearer constitutional treatment later.

## Hosted review-boundary repair

The first GitHub PR run evaluated GitHub's synthetic merge commit rather than
only the candidate head. GitHub attributed that proposed merge to the steward,
whose identity was not yet in the distribution build-author map. The guard
failed correctly. The map now records Zen Bañez as the private RC0
commissioning/review steward, distinct from receiving-house participant
standing. The candidate continues to test the merged result; the workflow was
not weakened to ignore the boundary commit.

## Gates still open

- independent rights and contributor-attribution review;
- independent disclosure and security/fidelity review;
- counsel review of the candidate licence set;
- steward freeze, adoption, and publication judgment;
- actual GitHub ruleset verification for any later public repository;
- human arrival and accessibility testing; and
- field-security design and live-data approval for any organization instance.

## Human-arrival refinement

After private RC0 PR #1 was accepted, D-011 added the steward-reviewed arrival
infographic and prompt-flow guide, adapted the human welcome, and reorganized
the README around first arrival. The phrasebook explicitly carries no authority.
The SVG contains no script, external reference, embedded binary, or event
handler. Deterministic, containment, constitutional, fresh-checkout, and hosted
PR validation must pass again before this refinement is returned.

Recommendation: **GO for private steward and independent review; HOLD public
release, adoption, and field deployment.**
