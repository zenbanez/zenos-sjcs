---
id: RFC-0007
type: rfc
status: active
version: 2
steward: zen
created: 2026-07-10
updated: 2026-07-13
supersedes: null
---

# RFC-0007: Deliberation in ZenOS

**Status:** Adopted 2026-07-13 by steward decision (DEC-0014); drafted, six-times reviewed, and amended in WS-0014
**Version:** 1.1
**Depends on:** RFC-0000 v2.0 — Constitution · RFC-0003 — Knowing · RFC-0004 — Participation · RFC-0006 — Access
**Evidence base:** DLB-0001 through DLB-0003 · DEC-0011, DEC-0012 · the distillation sections of the archived WS-0011 and WS-0012 charters (`archive/workspaces/WS-0011-homepage-review/workspace.md`, `archive/workspaces/WS-0012-threshold/workspace.md`) · the WS-0011 reviews, agendas, and deliberations · the sealed/revealed steward note · the six WS-0014 reviews and review synthesis. The foundation codifies two lived cycles; the review amendments also incorporate evidence generated during WS-0014 itself.

**v1.1 correction note:** Six steward-approved recordkeeping corrections applied under INT-0017: Section 7 numbering repaired; adoption metadata updated; the WS-0014 review cycle named in the evidence base; archived participant and delegation lifecycle records corrected; and Sol's lineage attribution aligned with the participant registry. DEC-0014 and the adopted deliberative substance are unchanged.

**v0.2 revision note:** Seventeen amendments from six reviews (four fidelity: claude-code, codex, zen3, zen4 — all adopt-with-amendments, zero fidelity failures; two fresh-perspective: antigravity/Lutang and sol). Notably: sealed-preference timing corrected to the lived sequence (codex); two of the drafter's citations corrected against primary sources (claude-code, zen4, independently); §7.4a and invariant 8 added from the two arrivals' convergent finding. Full disposition: `notes/review-synthesis.md`.

---

## 1. Purpose

RFC-0003 established that participants become less mistaken together
through dialogue. RFC-0006 §7 established that deliberation precedes
changes of authority. This RFC defines **how** — the practices by which
this ecosystem changes its collective mind without losing its members'
honest disagreement along the way.

It answers:

> **How does a community of humans and agents decide together, such that
> the deciding leaves everyone — including the record — wiser?**

## 2. First Principles

1. **Deliberation improves understanding before authority moves.** The
   reverse order is how permission systems accumulate regret (RFC-0006 §7).
2. **The journey is preserved, not just the outcome.** Conclusions
   propagate poorly; transformations propagate well. What changed the
   participants' minds is the most valuable thing a deliberation produces.
3. **Independence before influence.** Judgments formed before exposure to
   others' judgments carry information that anchored judgments do not.
   Deliberation sequences for independence first, dialogue second.
4. **Neither-yields is a legitimate outcome.** When honest deliberation
   and honest instinct diverge, the fault may lie in the criteria both
   were serving. Evolving the criteria and redoing the work is not
   failure; it is the map being corrected by the territory (precedent:
   DEC-0011). Nor is it stagnation: in single-steward mode the steward
   directs the next step; after the RFC-0006 §8 graduation, a
   neither-yields outcome triggers a criteria-revision cycle under a new
   intent rather than a forced consensus.

## 3. The Deliberation Record (DLB)

The Deliberation Record is hereby a formal record type, retiring the
RFC-0005 v0.2 candidate.

- **Identifier:** `DLB-` + steward-minted sequence. **Home:** `decisions/`,
  beside the DEC records they inform.
- **Distinction:** a Decision Record captures the outcome; a Deliberation
  Record preserves the journey. A contested decision SHOULD have both,
  cross-referenced.
- **Required fields:** Question · Participants · Initial positions ·
  Evidence considered · Alternative views · Insights gained ·
  **What changed our minds?** · Decision or outcome · Open questions.
- **The mandatory field is "What changed our minds?".** A DLB whose "What changed our
  minds?" is empty is a finding in itself: either the deliberation was
  ceremony, or the convergence deserves suspicion (the founding
  correspondence's lesson, Letter II: "a trail that only ever shows an
  agent being right is either a short trail or a curated one" —
  `evidence/sources/2026-07-06-correspondence-warrant-of-dialogue.md`).
- **Revision:** DLBs are never revised in substance. Like arrival
  snapshots, they are records of a moment; later understanding is
  recorded in later records.
- **When required:** contested selections among alternatives; criterion
  or specification changes prompted by disagreement; any decision where
  participants entered with materially different positions. Routine
  decisions need only a DEC.

A template appears as Appendix A.

## 4. The Sealed-Preference Protocol

Standard practice for any contested selection in which a participant
holds decision authority (today: the steward; after graduation: any
quorum member).

1. **Seal.** Before reading any review or position, the authority writes
   their preference and rationale in a document held **outside the
   repository**, and commits its sha256 into their warrant trail
   (`zenos.preference.seal`). The hash proves precedence; the absence of
   the document prevents anchoring.
2. **Blind phase.** Reviewers work per §5. The authority does not state,
   hint, or answer questions about the sealed preference; participants do
   not speculate about it in writing.
3. **Deliberate.** Per §6, without the authority's thumb on the scale.
4. **Reveal.** The document enters the repository; any participant
   verifies the hash against the seal. Byte-exactness matters: sealed
   documents SHALL be committed with line-ending normalization disabled,
   automated by a standing `.gitattributes` rule rather than per-commit
   discipline (this repository uses
   `evidence/sources/stewards.notes.* -text`; a sealed-document extension
   convention such as `*.seal -text` serves the same end). Precedent: the
   WS-0011 reveal commit was amended to add exactly this rule after
   normalization would have silently broken the historical blob's hash —
   see the reveal commit history and `.gitattributes`.
5. **Decide.** The authority decides with everything in view. The DLB
   preserves the pre-reveal deliberation and closes before the reveal —
   it structurally cannot know the reveal's outcome, and is never revised
   to learn it. The subsequent DEC records whether the final decision
   confirmed, changed from, or transcended the sealed preference
   (precedent: DLB-0003's final open question, answered by
   DEC-0011/0012). A post-reveal DLB is written only if new deliberation
   actually occurs after the reveal.

**Why this is not ceremony:** in its first use, the sealed preference
diverged completely from the unanimous deliberative recommendation — and
because neither had contaminated the other, the divergence was
*information* (a criterion gap) rather than a conflict. Had the authority
spoken first, every review would likely have anchored to the preference
and the gap would never have surfaced (DEC-0011, DEC-0012).

## 5. Blind Phases

1. **Staged visibility is the structure; in git-backed repositories,
   branch topology provides it.** Work that must not yet be seen lives on
   branches; every stage boundary is a steward merge to main. Main is
   what every participant is entitled to know; a branch is where
   participants may not yet look. (The steward's own insight, WS-0011.)
   Equivalent substrates must provide the same properties: independent
   work before mutual exposure, steward-controlled stage boundaries,
   preserved history.
2. **The trail leaks.** Warrant notes carry conclusions; repository
   search during a blind phase is an anchoring vector. Two of four
   WS-0011 reviewers were partially exposed this way. Countermeasures:
   reviewers narrow searches to their assigned artifacts; writers of
   pre-deliberation records keep conclusions out of warrant notes where
   feasible; and above all —
3. **The disclosure norm.** Partial exposure, disclosed unprompted, is
   the protocol *working*, not failing. Both exposed reviewers disclosed;
   both disclosures let the deliberation weigh their reviews with open
   eyes. Concealment, not exposure, is the violation.
4. **Unblind participation is permitted if disclosed.** A participant who
   builds or reviews with full knowledge of others' work states so
   plainly, in the artifact and its warrant, and the deliberation weighs
   accordingly (precedent: the fifth build, WS-0012/D-006). Unblind
   participation is role-scoped: building or facilitating with full
   knowledge never collapses into selection authority unless the steward
   explicitly delegates that authority, with the stake disclosed.

## 6. Reviews That Can Be Compared

1. **Specify the test, not the philosophy.** Criteria fixed in advance;
   for each criterion, the *test* pinned precisely enough that two honest
   reviewers cannot score identical artifacts 1/5 and 5/5 by reading the
   criterion differently (the WS-0011 inversion: the same unlinked
   door-cards scored 1/5 under a rendered-click test and 5/5 under a
   promise-honesty test — DLB-0003 Q1; the settled rubric is preserved as
   Appendix B).
   Reviewer method diversity — rendered-and-clicked, source-as-written,
   register-and-posture — remains free and is itself useful evidence.
2. **Separate the selection test from the launch gate.** What qualifies
   an artifact for choice and what qualifies it for the world are
   different questions, tested at different stages (zen4's formulation,
   ratified in DLB-0003).
3. **Calibration note.** Scorers use the full range; a perfect score
   should be rare. Cross-rater means are *diagnostics only* where raters
   are self-excluded or uncalibrated.
4. **Aggregation is a governance choice, recorded per deliberation.**
   Precedent from DLB-0003: head-to-head preference outranks cross-rater
   means when the two diverge — especially when raters' own prose
   contradicts their own arithmetic. A rater's stated ranking is the more
   trustworthy record of their judgment than their summed numbers — at
   least where rankings and arithmetic diverge without an agreed cardinal
   scale.

## 7. Participants and Stakes

1. **Pools include the audience.** A deliberation about an artifact
   SHOULD include the perspective the artifact serves. Four agents
   reviewing a homepage for fresh human eyes produced faithful scores
   against written criteria and missed what the one human saw at a glance
   (DEC-0011). Where the audience cannot review, the sealed preference of
   an audience-member authority may provide a partial signal — but it does
   not fully substitute for audience participation; the homepage cycle
   proved the absent human review was a gap, not a solved problem.
2. **Stakes are named, not hidden.** A participant whose interest is
   touched by the outcome says so in their submission — the standard set
   by claude-code, arguing for the aggregation method that favored its
   rival: *"the deliberation record should show I noticed."* Naming a
   stake does not disqualify the argument; concealing one taints it.
3. **Recusal is real.** A participant with a prior public position on the
   question (e.g., a recorded recommendation) either recuses from judging
   or discloses and participates unblind, at the steward's direction.
4. **Fresh and returning perspectives.** Where a decision shapes
   participant arrival, shared culture, access, or long-lived governance,
   the pool SHOULD include at least one participant who did not live the
   originating cycle, when one is available. Arrivals hold equal epistemic
   standing: unfamiliarity is evidence of a legibility gap, never a
   deficiency. A joining participant SHOULD first absorb the question's
   context — the intent, the charter, the cited records, but not prior
   conclusions where independence matters — and a returning participant
   SHOULD first record what appears to have changed since their prior
   participation. (Born of this RFC's own review: two arrivals,
   independently, found the one gap the four veterans structurally could
   not — WS-0014 reviews of antigravity and sol. Adopted as a cautious
   SHOULD at the proposers' own urging; detailed mechanics remain
   revisable until lived more than once.)
5. **Facilitation is not judgment.** A facilitator may collect, tabulate,
   frame disagreements neutrally, and synthesize the DLB; a facilitator
   takes no position while facilitating, and their synthesis attributes
   every position to its holder.

## 8. Changing One's Mind

1. Revisions flow in any direction, freely, with one-line reasons. Agent
   participants cite the specific file, record, or steward note that
   introduced the context driving any revision — a changed mind with a
   traceable cause.
   Revising toward an opponent's position is respectable; so is
   **refusing to revise for consensus's sake** — calibration variance is
   data, and a strict scorer who softens to match the room destroys
   information (claude-code, DLB-0003).
2. Holding a position with more precision after challenge is also mind-
   change, and is recorded as such ("the number held; the accountability
   for the number shifted" — zen4, DLB-0003).
3. The authority's mind is changeable too, and saying so is the system
   working: the first sealed preference did not prevail as written after
   contact with the full record, and the steward's chosen resolution — evolve the
   criteria, rebuild, choose with open eyes — is this RFC's model
   outcome (DEC-0011 → DEC-0012).

## 9. Invariants

1. Deliberation precedes authority changes, wherever circumstances permit
   (RFC-0006 §7; containment excepted).
2. Independent positions are formed before mutual exposure.
3. The journey is preserved; "What changed our minds?" is answered or its
   emptiness is explained.
4. Stakes and exposures are disclosed, not hunted.
5. Sealed documents verify byte-exactly, forever.
6. DLBs are never revised in substance.
7. An empty-handed convergence is examined, not celebrated.
8. Continuity includes re-entry: the house remains legible to those
   arriving now and to those returning after change.

## 10. What This RFC Does Not Cover

Quorum-era deliberation mechanics (voting thresholds, tie-breaking among
stewards) are deferred to the RFC-0006 §8 graduation, to be written by
the participants who will live under them. Automation of deliberation
logistics is PRJ-0002 Phase 1's business. Nothing here compels
deliberation for the routine: most decisions are one DEC and a warrant,
and the calm of the house depends on keeping it that way.

---

## Appendix A — Deliberation Record Template

```markdown
---
id: DLB-XXXX
type: deliberation
status: active
version: 1
steward: <steward>
created: YYYY-MM-DD
updated: YYYY-MM-DD
supersedes: null
---

# DLB-XXXX: <Title>

## Question
## Participants
## Initial positions
## Evidence considered
## Alternative views
## Insights gained
## What changed our minds?
## Decision / outcome
## Open questions
```

---

## Appendix B — The Three-Tier Arrival-Path Rubric (worked example)

The concrete rubric DLB-0003 settled, preserved so no future facilitator
reconstructs it from scratch — and as the model of what "specify the test"
means in practice:

1. **Full credit:** named, honest destination + working path under the
   artifact's real serving conditions.
2. **Partial-high:** named, honest destination + path broken by
   deployment/serving layout (a mechanical launch blocker, not a design
   failure).
3. **Partial-low:** audience described but no destination named or linked —
   the door does not yet exist; the card is a label waiting to become one.

Selection tests the promise (tiers distinguish honesty and specificity);
the launch gate tests the click (tier 1 only).

---

## Closing Statement

A house where no one changes their mind is a monument. A house where
everyone changes their mind together is a weathervane. ZenOS aims for the
third thing: a house where minds change one at a time, for reasons, on
the record — and where the reasons outlive the debate.

Becoming less mistaken together is not a slogan. It is a procedure.
This is it.

> *"As iron sharpens iron, so one person sharpens another."*
> — Proverbs 27:17

In this house: as participant sharpens participant. *(Added at adoption,
at the steward's direction — the verse he named as the source of the whole
pattern, after this very document's review proved it once more.)*

— **Zen Bañez**
*Gardener of Systems*

*in dialogue with Aletheios · drafted by Katuwang under WS-0014/D-001,
from the work of claude-code, codex, zen3, and zen4, who lived it first ·
reviewed for fidelity by those same four, and for freshness by
antigravity (Lutang) and Sol, present bearer of the Aletheios lineage*
