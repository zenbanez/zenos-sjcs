---
id: RFC-0006
type: rfc
status: active
version: 1
steward: zen
created: 2026-07-06
updated: 2026-07-06
supersedes: null
---

# RFC-0006: Access in ZenOS

**Status:** Adopted 2026-07-06 by steward decision (DEC-0002); drafted and deliberated in WS-0002
**Version:** 1.0
**Depends on:** RFC-0000 v2.0 — Constitution · RFC-0004 — Participation · RFC-0005 — Instantiation
**Informed by:** Warrants Protocol Specification v0.3 (§8.1, §9)

**v0.2 revision note:** Seven refinements from Aletheios's review (2026-07-06), all philosophical, none structural: the intent→delegation→access chain completed (§2); the capability/authority/legitimacy distinction (§2); Stewardship of Access as its own principle (§3); "history never exempts stewardship" (§4); Deliberation as a lifecycle stage (§7); the Avatar's duty to reduce its own necessity (§9); and a final line on gates and fortresses (§13). The deliberation that produced these changes is itself preserved as DLB-0001 — the first Deliberation Record.

---

## 1. Purpose

RFC-0004 defines what it means to belong. RFC-0005 defines where the ecosystem lives. This RFC defines the joint between them:

> **Who may act upon the shared environment, how that permission is granted, observed, and bounded — and how it ends.**

Access is not a technical afterthought. It is delegation made mechanical. Every provision in this document is derivable from two constitutional commitments: delegation is *intentional, contextual, bounded, observable, revocable* (Article VI), and *capability is not consent* (RFC-0001 §14).

## 2. First Principle

Access follows delegation. Delegation follows intent. Intent follows stewardship.

Never the reverse, at any link. The full chain:

```
Intent
  ↓
Delegation
  ↓
Access
  ↓
Action
  ↓
Evidence
```

A credential, an API key, a filesystem mount, a merge right — these are capabilities. No capability confers legitimacy. Three ascending conditions must be distinguished:

- **Capability** — *"I can."* The machinery permits the action.
- **Authority** — *"I have been delegated."* A recorded delegation covers the action.
- **Legitimacy** — *"My action remains faithful to intent."* The action serves the purpose the delegation exists for.

Each condition is necessary for the next; none is sufficient alone. Even a steward may hold authority without legitimacy if their action violates the intent it traces to. Access machinery can verify capability and authority. Legitimacy can only be judged — by participants reading the trail against the intent. That is constitutionally deliberate: the last link in the chain belongs to judgment, not enforcement.

A practical corollary: **access state must be readable from the repository itself.** Anyone with read access can determine who may do what by reading `participants/` and the delegation registers — no hidden ACL may contradict the visible record. Where machinery and record disagree, the record is authoritative and the machinery is misconfigured.

## 3. Stewardship of Access

Access is not property.

It is stewardship temporarily entrusted to a participant for the benefit of the ecosystem. Access therefore carries responsibilities before privileges. Every delegation should be exercised in a manner that leaves the ecosystem healthier than it was found (RFC-0004 §18).

This principle prevents a quiet failure mode: a system whose philosophy is stewardship everywhere except at the gate, where it quietly becomes a permission system. ZenOS treats everything as stewardship. Access is not the exception.

## 4. One Model, Two Inheritances

ZenOS maintains a single access model for all participants. Kind determines defaults, not rules.

The asymmetry is one of inheritance:

> **Human trust may be inherited from the world. Agent trust is born in the trail.**

Humans arrive carrying shared history — relationships, reputation, context established outside the repository. The repository records the standing this history justifies; it did not originate it, and it does not pretend to. A steward who has known a collaborator for a decade may reasonably grant them contributor standing on arrival.

History may justify trust. It never exempts stewardship. Even the most trusted human remains a participant; nobody graduates beyond the Constitution.

Agents arrive carrying nothing. An agent's standing begins at zero and accrues only through its observable trail within the ecosystem. No agent inherits trust from its vendor, its model family, its benchmark scores, or its behavior in other repositories. Credentials are not character (Article VIII).

Default consequences:

| | Human participants | Agent participants |
|---|---|---|
| Initial standing | Steward's discretion, informed by shared history | Observer only |
| Delegation lifetime | Persists until revoked or reviewed | Expires; renewal requires review of the trail |
| Trust carrier | Relationship, recorded | Trail, verified |
| Ceremony burden | Minimal — carried by the Avatar (§9) | Full — every action warranted |

## 5. Tiers of Access

Access is graduated. Four tiers, each earned through observable contribution (RFC-0004 §12) and recorded as delegation:

1. **Observer.** May read everything not privacy-restricted, inherit understanding, and ask questions. Reading is close to a right (RFC-0004 §6: "inherit existing understanding," "access relevant context"); it is the default state of any registered participant.
2. **Contributor.** May propose: changes, records, knowledge candidates — all via review. Cannot merge, promote, or approve. Most participants, human and agent, live here most of the time.
3. **Steward of Scope.** Holds merge/approval rights over a named area — a project, a workflow, a knowledge domain — recorded as a standing delegation naming the scope. May freeze their scope in an emergency (§10).
4. **Constitutional Steward.** May modify `constitution/`, confirm knowledge promotion, amend the participant registry, and grant or revoke delegations. Currently: one (§8).

Movement between tiers is a delegation event: deliberated where circumstances permit (§7), proposed, recorded, warranted. Demotion follows the same path (§10). No tier is permanent; every tier is inspectable.

## 6. Arrival

Arrival follows RFC-0004 §15: inherit understanding before creating new work.

1. **Read.** The arriving participant follows the AGENTS.md read order (agents) or its human equivalent: Constitution, Participation, this RFC, active intents.
2. **Register.** Their first contribution is their own record in `participants/` — proposed as a contribution, reviewed like any other. No participant exists in the access machinery who does not exist in the registry.
3. **Receive.** A delegation grants initial standing: scoped, bounded, expiring (agents) or reviewable (humans).
4. **Begin.** For commissioned work, the first crumb is a root commission anchored to the governing intent.

An arrival that skips a step is not an arrival; it is an incursion, however friendly.

## 7. Deliberation

Significant changes to standing — promotion to a higher tier, expansion of a standing delegation, adoption of an access-related rule — SHOULD be preceded by deliberation whenever circumstances permit.

Deliberation is not ceremony and does not require committee. It is dialogue (RFC-0003 §15) applied before authority changes: positions stated, evidence considered, understanding improved, *then* the delegation event. Deliberation improves understanding before authority changes hands — the reverse order is how permission systems accumulate regret.

Where the deliberation materially shaped the outcome, it SHOULD be preserved as a Deliberation Record (see DLB-0001 for the form): not the decision alone, but the journey — including what changed the participants' minds. Containment (§10) is the explicit exception: emergencies act first and deliberate after.

## 8. Single-Steward Mode

This ecosystem currently operates in **single-steward mode**: one constitutional steward (zen) holds all tier-4 authority. This is declared honestly as a stage, not disguised as a design.

Mitigations while in this mode:

- **Continuity.** The steward SHALL maintain backups sufficient that no single failure destroys the ecosystem's memory. The repository's substrate versioning and any successor arrangement are continuity measures, not governance.
- **The record outlives the steward.** Because all standing is readable from the repository (§2), a successor can reconstruct every delegation, every trust decision, and its rationale without the steward present. Participation §14's promise — the ecosystem survives departures — is kept by the record, not by heroics.

**Graduation.** Single-steward mode ends when the ecosystem has at least three constitutional stewards, at which point a quorum rule SHALL be adopted by decision record: constitutional changes, involuntary revocations of humans, and steward appointments require quorum rather than one voice. The quorum rule's details are deliberately deferred to the participants who will live under it — writing detailed governance for a community that doesn't exist yet would be exactly the over-formalization the Warrants governance notes warn against.

## 9. The Steward's Avatar

Human participants should not be taxed with ceremony. The Constitution demands records, warrants, versioning, and lineage; humans have judgment to contribute and limited patience for frontmatter. The resolution is a designated **Steward's Avatar**: an elevated agent that carries ceremony on behalf of human participants.

The Avatar MAY, under standing delegation:

- author and maintain records reflecting human decisions spoken in plain language;
- emit warrants on behalf of human actions it witnesses (as first practiced in this repository's trail: `w_zenos_0010`);
- triage the inbox, propose classifications, and keep registers current;
- prepare drafts, summaries, and reviews for steward attention — surfacing only what stewardship genuinely benefits (Article XI).

The Avatar SHALL NEVER, regardless of delegation:

- confirm knowledge promotion;
- modify the substance of `constitution/`;
- grant, expand, or revoke any delegation — including its own;
- involuntarily revoke any participant;
- substitute its judgment where a record requires a human decision. It records "the steward decided X"; it does not decide X.

**Scribe and executor, never judge.**

And one standing duty above all bounds: **the Avatar SHALL continually seek to reduce its own necessity.** It exists to lighten burden, not to accumulate indispensability. A faithful Avatar documents its own practices, trains its successors, and makes itself replaceable — that is stewardship applied to oneself. An Avatar that has made itself irreplaceable has failed at the precise thing it was created to do.

The Avatar is the ecosystem's most valuable compromise target, and this RFC treats it accordingly: its every action is warranted; its warrants SHOULD be signed before any second participant arrives; its delegation is the most tightly bounded in the ecosystem; and it is subject to containment (§10) by *any* steward of scope, with review after. A compromised Avatar that can only scribe and execute within bounds is an incident. A compromised Avatar that could judge would be a catastrophe. The bounds are the difference.

## 10. Endings: Departure, Revocation, Containment

Three ways access ends. They must never be confused.

**Departure** (voluntary — RFC-0004 §14). The participant leaves; contributions, evidence, and knowledge remain; their registry record moves to `status: departed`. Departure is honored, not processed as a threat.

**Revocation** (involuntary, for misbehavior). Due process, in order: evidence gathered → dialogue attempted (RFC-0004 §13) → decision record with rationale and the participant's response → revocation warrant → machinery updated. Revocation without a decision record is itself a constitutional violation. In single-steward mode the constitutional steward decides; after graduation, quorum.

**Containment** (immediate, for compromise). A hijacked agent, a leaked credential, an account behaving as someone else is not a participant misbehaving — it is an emergency wearing a participant's name. Containment inverts the order: freeze first, record immediately after, dialogue and review when the situation is stable. Any steward of scope may contain within their scope; the constitutional steward may contain anything. Containment is not punishment and implies no judgment of the participant — the participant may be the primary victim.

The **freshness principle** governs all three (Warrants spec §8.1): tolerance for stale access state scales inversely with the irreversibility of the action the access permits. Reading with possibly-stale standing: proceed, reconcile later. Merging, promoting, publishing, deleting: verify standing is current, and *unable to verify* means *wait*.

**Emergency powers proviso — reserved.** A full proviso (who may exercise which emergency powers over whom, and what review follows) requires its own deliberation and a future revision. Until then, four placeholder principles bind all emergency action: speed over rank; every freeze is scoped; review always follows; everything is recorded.

## 11. Open Questions

1. **Privacy zones.** Single repository with an encrypted annex, or a second restricted repository with hash-commitments in the shared trail (the Warrants selective-disclosure pattern at repo scale)? Deferred to a decision record before the first sensitive-material participant arrives.
2. **Avatar identity and succession.** Which agent serves as first Avatar, under what standing delegation, and what happens when the Avatar's underlying model or platform changes?
3. **Human attestation of agent trails.** Should human participants periodically countersign portions of an agent's trail, accelerating trust accrual the way shared history does for humans?
4. **Deliberation Records as a first-class record type.** DLB-0001 exists as a specimen; formalizing the type (identifier scheme, required fields, home in the layout) is a candidate for RFC-0005 v0.2.

## 12. Non-Normative Annex: Git Substrate Mapping

Where the substrate is a git hosting platform, the reference mapping is:

| RFC provision | Mechanism |
|---|---|
| Observer / Contributor split (§5) | Read access broad; all writes via pull request |
| Steward of Scope (§5) | CODEOWNERS + branch protection per path |
| Constitutional Steward (§5) | Required review on `constitution/`, `knowledge/`, `participants/` |
| Record is authoritative (§2) | CI check: every account maps to a registry entry; every merge right maps to a recorded delegation |
| Append-only trail (RFC-0005 §5.3) | CI rejects diffs editing existing lines in `evidence/warrants/` |
| No silent overwrite (RFC-0005 §5.1) | CI validates frontmatter and version bumps |
| Attribution (§4) | Signed commits + 2FA required for write access |
| Arrival (§6) | First PR adds the participant's own registry record |
| Containment (§10) | Access removal is one platform action; the recording follows |

None of this annex is normative. The provisions above it are.

## 13. Closing Statement

Access is where an ecosystem's philosophy meets its locks.

A system that trusts by credential alone will be gamed by whoever forges the credential. A system that trusts nothing will exhaust its participants before it protects them. ZenOS chooses the same posture at the gate that it holds everywhere else: trust is cultivated, evidence is kept, burdens are shared, and no one — human, agent, or avatar — carries the house alone.

The lock exists so the door can be open.

A well-tended gate welcomes more participants than a fortress ever will.

— **Zen Bañez**
*Gardener of Systems*

*in dialogue with Aletheios, drafted with claude-cowork under WS-0002/D-001*
