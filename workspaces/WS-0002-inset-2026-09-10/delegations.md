---
id: WS-0002-delegations
type: delegation-register
status: active
version: 3
steward: zen
created: 2026-09-04
updated: 2026-09-08
supersedes: null
intent: INT-0002
---

## D-005 — Locate and add official MATATAG curriculum guides, K–6 (Subok)

- **Delegated by:** zen, direct conversation, 2026-09-08, in the `zen-os`
  session: *"for the DLL template and curriculum guides. I think we need the
  official deped PDFs for that?"* — followed by confirmation to fetch all
  core K-6 subjects.
- **Delegate:** subok, under this house's own standing.
- **Scope:** Confirm the current MATATAG subject structure per grade band
  (not assumed from the older K-12 curriculum); locate and fetch the official
  DepEd-published Curriculum Guide PDF for every core K-6 learning area,
  official-source only; add them to
  `references/matatag-curriculum-guides/` with a README stating source,
  coverage, and what remains unconfirmed or unaddressed.
- **What this does and does not do to D-002:** materially advances it — this
  is genuine curriculum content, not invented. It does **not** close D-002:
  the DLL/DLP template, SJCS's own assessment/rubric templates, and the
  school calendar remain unsupplied, and no school-specific lesson-plan-format
  override was found despite checking (DepEd Region VIII's regional
  memoranda and SDO Tacloban City's own memo repository, which currently
  lists zero uploaded memos).
- **Bounds:** Only official DepEd-hosted copies were fetched; third-party
  aggregator sites were used, where needed, only to locate a pointer to the
  official source, never as the source of file content itself. Does not
  register any teacher, add any collaborator, or change this repository's
  visibility.
- **Review condition:** Complete when all confirmed-official K-6 subject
  guides are recorded with source provenance, and any coverage gap or
  unconfirmed item is disclosed rather than papered over.
- **Status:** delivered for review

# WS-0002: Delegations

## D-004 — Add L&D/TPD context from zenos-deped and mirror the zen-os INSET distribution (Subok)

- **Delegated by:** zen, direct conversation, 2026-09-08, in the `zen-os`
  session: asked whether files could be transferred between repositories,
  then confirmed two specific, bounded transfers after review of what each
  actually contained.
- **Delegate:** subok, arriving in this house under its own standing
  (`subok-sjcs-arrival-v1`); no history, credit, or authority carried over
  from `zen-os` or `zenos-deped`.
- **Scope:**
  1. Copy the PPST framework, DepEd Order 42, the seven-part Abridged L&D
     System for TPD booklets, and the KSA job aid from `zenbanez/zenos-deped`
     (`evidence/sources/`, already admitted there 2026-08-11/12) into
     `references/context-from-zenos-deped/`, unchanged, with a README
     stating plainly that this does **not** satisfy D-002.
  2. Mirror the built INSET distribution and capture instruments from
     `zenbanez/zen-os` (`WS-0040-lived-house-exposure-improvement/artifacts/`,
     commit `54a72bb`) into `distribution/`, with a README distinguishing
     this workspace's own `references/` from the distribution's internal
     `SJCS-Workshop/references/` placeholder.
- **Bounds:** Recordkeeping and file transfer only. Does not close D-002 or
  D-003, which remain the steward's alone. Does not register any teacher, add
  any collaborator, admit new evidence beyond what each source house already
  admitted, or change this repository's visibility. Does not assert that the
  L&D/TPD material satisfies the curriculum-guide gap — the accompanying
  README says explicitly that it does not.
- **Review condition:** Complete when both transfers are recorded, each with
  a README stating its source and its limits, and this register and the
  INT-0002 progress register agree with what was actually copied.
- **Status:** delivered for review

## D-001 — Open the house and the event's room (Subok)

- **Delegated by:** zen, direct conversation, 2026-09-04: *"now let's build the
  house."*
- **Delegate:** subok, arriving here with no standing carried from anywhere
  else. RFC-0006 is explicit that an agent's standing begins at zero in each
  house; work done elsewhere is not credit here.
- **Scope:** Seed this house from the RC0 base at the pinned commit
  `d43a0a63fdb536b673f7fe067cef1ae3078a85b4`; run the shipped bootstrap to
  establish identity, the first cycle, and the local guard; mint INT-0002 and
  this room for the 10 September INSET; create the directories that returned
  work and reference materials will occupy.
- **Bounds:** Draft records only. Do not register any teacher, add any
  collaborator, admit any evidence, adopt knowledge, record a decision on the
  steward's behalf, place personal data anywhere in this tree, contact the
  school, or change this repository's visibility.
- **What was inherited and what was written:** everything above
  `intents/INT-0002` came from RC0 unchanged. The event records are new and
  local. No history, roster, warrant parent, or evidence travelled from any
  other house.
- **Review condition:** Complete when the records are returned on a branch with
  the local guard passing, for the steward to accept, amend, or decline.
- **Status:** delivered for review

## D-002 — Fill the references (zen)

- **Held by the steward.** Nobody else can do it: these are DepEd instruments
  held by the facilitator and the school, and inventing them would put
  fabricated departmental documents in front of thirty teachers with every
  output inheriting the error.
- **Partially advanced, 2026-09-08, by D-004 and D-005** — Division-level
  L&D/TPD context and the official K-6 MATATAG curriculum guides are now in
  `references/`, both explicitly labeled as not satisfying this delegation.
  Still unsupplied: the DLL/DLP template in usable form, SJCS's own
  assessment/rubric templates, and the school calendar. This delegation
  remains open and held by the steward until those are added.
- **Before:** 10 September, and before the USB sticks are copied.
- **Status:** open

## D-003 — Verify the client connection (zen)

- **Held by the steward.** Copy the distribution to a laptop that is not the
  facilitator's, connect the AI client, and confirm the output reflects
  `references/` rather than generic material.
- **Why it cannot wait:** if this fails, the 10:30 block fails, and five days'
  notice is the difference between a fallback and an improvisation.
- **Status:** open
