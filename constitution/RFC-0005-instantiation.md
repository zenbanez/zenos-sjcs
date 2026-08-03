# RFC-0005: Instantiation of ZenOS

**Status:** Draft
**Version:** 0.3 — v0.3 adopted 2026-07-25 by steward decision ([DEC-0024](../decisions/DEC-0024-adopt-rfc-0005-v0-3.md)) *(v0.3, 2026-07-25: §4.1 amended — `interface/` given a home. Some interfaces are doors; this one is a room. The rule that no interface is the repository is kept and strengthened; what is withdrawn is the assumption that every interface is a threshold. v0.2, 2026-07-16: §4a added — `inbox/` formalized per DEC-0019 §9, closing WS-0001's open question with eleven days of lived practice)*
**Depends on:** RFC-0000 v2.0 — Constitution · RFC-0001 — Composition · RFC-0002 — Dynamics · RFC-0003 — Knowing · RFC-0004 — Participation
**Informed by:** Warrants Protocol Specification v0.3 · Open Knowledge Format (OKF) v0.1 · Interpretable Context Methodology (Van Clief & McDermott, 2026) · Weiser & Brown, *Designing Calm Technology* (1995)

---

## 1. Purpose

RFC-0000 answers *why*. RFC-0001 answers *what*. RFC-0002 answers *how it moves*. RFC-0003 answers *how it knows*.

This RFC answers the remaining question:

> **Where does ZenOS live, and what does it look like on disk?**

It defines a reference instantiation: a concrete repository layout, file formats, naming conventions, and lifecycle mechanics that satisfy the Constitution and the invariants of RFC-0001 §20 and RFC-0003 §20.

This is deliberately the boring RFC. Its ambition is not vision but fidelity: every principle already declared must be expressible as a file a human can read and an agent can parse, or the principle is not yet real.

## 2. Constitutional Alignment

This RFC is subordinate to RFC-0000. Where this layout conflicts with the Constitution, the layout is wrong.

Two constitutional commitments drive every choice below:

- **Knowledge is explicit; hidden state is minimized** (Article IX). Therefore: plain text, on disk, versioned, diffable. No database is required to understand a ZenOS repository. If you can `cat` a file, you can read the system.
- **The repository remains understandable beyond any single implementation** (RFC-0001 §20.10). Therefore: no format in this RFC requires proprietary tooling, a specific model, a specific vendor, or a network connection to interpret.

## 3. Design Stance: The Humblest Possible Technology

The Revised Vision states the thesis: *well-organized repositories that happen to think.*

This RFC takes that literally. A ZenOS instance is:

1. **A directory tree.** Folder structure is architecture, not decoration. (This is the ICM insight, independently validated: numbered folders and plain markdown can replace framework-level orchestration for human-reviewed workflows.)
2. **Plain files.** Markdown with YAML frontmatter for knowledge and records (per OKF). JSON Lines for warrant trails (per Warrants v0). Nothing else is required.
3. **Versioned.** Git is the recommended substrate because it provides history, branching (workspace forks per RFC-0002 §8), diffs, and attribution for free. Git is RECOMMENDED, not REQUIRED. A synced folder with preserved prior versions satisfies the Constitution; git satisfies it better.
4. **Calm.** The repository does not notify, interrupt, or demand. Participants visit it; it does not chase them. Attention-surfacing (dashboards, digests, notifications) belongs to Interfaces, which read the repository but are never the repository (RFC-0001 §17).

## 4. Reference Layout

```
zenos/
├── constitution/                 # Governing documents (RFC-0000..n)
│   ├── RFC-0000-constitution-v2.md
│   ├── RFC-0001-composition.md
│   ├── ...
│   └── archive/                  # Prior versions, preserved per Article XIV
│       └── RFC-0000-constitution-v1.md
│
├── intents/                      # The source of meaningful action (Article V)
│   ├── INT-0001-example.md
│   └── archive/
│
├── participants/                 # Registry of humans, agents, orchestrators
│   ├── humans/
│   │   └── zen.md
│   └── agents/
│       └── aletheios.md
│
├── workspaces/                   # Active thought. One directory per workspace.
│   └── WS-0001-example/
│       ├── workspace.md          # Charter: mounted intent, participants,
│       │                         #   objectives, open questions, constraints
│       ├── delegations.md        # Active delegations: scope, bounds, revocation
│       └── notes/                # Working material; freely structured
│
├── evidence/                     # Observations preserved (RFC-0003 §6)
│   ├── warrants/                 # Action trails, Warrants v0, append-only
│   │   └── 2026/
│   │       └── 07.jsonl
│   └── sources/                  # Transcripts, documents, observations
│       └── 2026-07-05-example-transcript.md
│
├── knowledge/                    # An OKF bundle. Durable understanding.
│   ├── index.md                  # Progressive disclosure entry point
│   ├── log.md                    # Chronological history of promotions
│   └── ...                       # Concepts, organized as the domain demands
│
├── decisions/                    # Meaningful commitments (RFC-0001 §16)
│   └── DEC-0001-example.md
│
├── projects/                     # Purposeful work over time
│   └── PRJ-0001-example/
│       └── project.md            # Goals, roadmap, links to intents,
│                                 #   workspaces, decisions
│
├── workflows/                    # Repeatable patterns of action
│   └── WF-0001-example/
│       ├── workflow.md           # Stages, roles, completion criteria,
│       │                         #   warrant expectations
│       ├── 01-stage-name/        # ICM-style numbered stages; each stage
│       ├── 02-stage-name/        #   folder carries the prompt/context an
│       └── 03-stage-name/        #   agent needs to perform that stage
│
├── interface/                    # Rooms for seeing the house (see §4.1)
│   └── steward/                  # The steward's room: the whole repository,
│                                 #   coherently, in one view. Shows only what
│                                 #   it reads; holds nothing of its own.
│                                 #   Optional — a repository with no interface
│                                 #   is fully conformant. More rooms expected.
│
├── inbox/                        # Arrived, not yet admitted (see §4a)
│
└── archive/                      # Respectful retirement (RFC-0001 §18)
    ├── workspaces/
    ├── projects/
    └── evidence/                 # Evidence is archived, rarely destroyed
```

### 4.1 Component Mapping

Every component of RFC-0001 §3 has exactly one home:

| RFC-0001 Component | Instantiation |
|---|---|
| Constitution | `constitution/` |
| Intent | `intents/` |
| Participants | `participants/` |
| Workspaces | `workspaces/` |
| Evidence | `evidence/` |
| Knowledge | `knowledge/` (an OKF bundle) |
| Projects | `projects/` |
| Workflows | `workflows/` |
| Agents | `participants/agents/` (registry) — their work products land everywhere |
| Orchestrators | `participants/agents/` — an orchestrator is a participant, not an owner |
| Tools | **Not a directory.** Tools are capabilities granted through delegation records; see §6.2 |
| Warrants | `evidence/warrants/` |
| Decisions | `decisions/` |
| Interfaces | `interface/` — **rooms, not only doors.** A room is where the house can be seen whole; it is never where the house is kept. None is the repository |
| Archive | `archive/` |
| Arrival staging | `inbox/` |

Tools remain deliberately absent from the tree. Encoding a capability as a directory would confuse capability with content.

**On `interface/` (v0.3).** Through v0.2 this table refused Interfaces a
directory, reasoning that encoding one would "confuse capability with content
and door with room." That reasoning was right about doors. It was wrong that
every interface is one.

A door is transit — you pass through it to reach what you came for, and it would
be strange to furnish it. A room is somewhere you stand. The steward's judgment
of 2026-07-25, on the first interface this house built for itself: *most
interfaces are doors; this one is a room.* It is the room from which the whole
of ZenOS can be seen at once and coherently — which no single file can show, and
which no door has any business offering. A tree of plain text is legible to
someone who already knows where to look. A room is what the seeing requires.

More than one is expected. The first is **the steward's room**: the high-level
view of the whole. A **room for visitors** is foreseen and not yet built. Rooms
differ by who is standing in them and what they need to see; none of them
differs in authority, because none of them has any.

The invariant is not weakened by this. It is preserved by what kind of room
this is:

1. **No interface is the repository.** The files are the truth; a room offers a
   view of them. Where the view and the files disagree, the files are right and
   the room is wrong.
2. **A room shows; it does not hold.** Nothing originates in `interface/`.
   Everything it displays is read from somewhere that remains authoritative, and
   deleting every room would cost the house its view and none of its substance.
3. **Rooms carry no standing.** An interface appears in this table as a
   location, not in RFC-0001 §3's architecture. Nothing displayed becomes more
   true for having been displayed, and no warrant, decision, or promotion
   acquires force by appearing on a screen.
4. **Rooms are optional.** §10's minimal instantiation does not include one. A
   repository with an empty or absent `interface/` is fully conformant. This is
   growth, not admission.
5. **A room that writes is a participant.** An interface that writes to the
   repository is bound by everything a participant is bound by — traceable
   intent, delegation, warrants, no silent overwrite. Reading is unremarkable;
   writing is participation.

The distinction the original line protected — that a rendering must never be
mistaken for the thing rendered — is preserved by rules 1 through 3, and stated
more plainly than the absence of a directory ever stated it. What is withdrawn
is the assumption that every interface is a threshold.

## 4a. The Inbox

`inbox/` is the loading dock: material that has arrived but has not been
admitted. It sits one rung below Evidence on the RFC-0003 ladder — its
contents are candidates, not citizens, and SHALL NOT be cited as
evidence in any record. Triage has three exits: admission (raw material
moves to `evidence/sources/`, or takes its proper place as a record,
with a warrant), decline (removed or returned, noted where useful), or
continued waiting. Transport packaging — bundles, sync artifacts, files
whose contents have been admitted elsewhere — MAY be deleted outright:
deleting packaging is not deleting records, and the append-only
discipline protects trails and records, not the dock. An `inbox/README`
stating these expectations satisfies this section.

*Practice preceding law: `inbox/` operated in this repository from
2026-07-05 (DEC-0001 deviation 2) through eleven days of arrivals,
bundles, and admissions before this section was written. The section
records what was learned, not what was guessed.*

## 5. File Conventions

### 5.1 Records: Markdown + YAML Frontmatter

All record types (intents, decisions, workspace charters, participant entries, knowledge concepts) are markdown files with YAML frontmatter, per OKF conventions. Required frontmatter for every record:

```yaml
---
id: INT-0001            # Stable identifier; the filename echoes it
type: intent            # intent | decision | workspace | participant | concept | ...
status: active          # draft | active | superseded | retired
version: 1              # Integer; bump on substantive revision
steward: zen            # Participant ID responsible for this record
created: 2026-07-05
updated: 2026-07-05
supersedes: null        # Prior record ID, if any
---
```

Rules:

- **Nothing is silently overwritten.** A substantive revision bumps `version`; a replacement names its predecessor in `supersedes` and the predecessor's `status` becomes `superseded`. Prior versions of constitutional documents move to `constitution/archive/`; prior versions of ordinary records are preserved by version control history.
- **Readers ignore unknown frontmatter keys.** Forward compatibility mirrors Warrants §3.8.
- **Identifiers are boring on purpose.** `INT-`, `WS-`, `DEC-`, `PRJ-`, `WF-` + zero-padded sequence + short slug. Stable IDs make records referenceable from warrants, knowledge lineage, and each other.

### 5.2 Intent Files

An intent file's body carries four sections: **Purpose** (what is worth pursuing and why), **In scope**, **Out of scope**, and **Success looks like**. This is intentionally the same minimal shape the Warrants spec recommends for intent documents (§6.1), because an intent file serves double duty:

> **The intent file is the document a root commission warrant's `content_hash` commits to.**

This single convention welds the Constitution to the protocol layer. Article V says every significant action SHALL trace to explicit intent. Warrants §6.1 gives the trace a verifiable anchor. The intent file in `intents/` is where the two meet: hash the file, commission the trail, and "does this action serve the intent?" becomes a checkable question with a referent on disk.

Intent evolution (Article V: "its evolution SHALL itself remain observable") is expressed by version bumps and `supersedes` chains — never by editing history.

### 5.3 Warrant Trails

- Warrants conform to the **Warrants Protocol v0 schema** — the eight required fields, single-parent `from`, namespaced actions.
- Stored as **append-only JSON Lines**, sharded by time: `evidence/warrants/YYYY/MM.jsonl`. One warrant per line. Append-only storage preserves the write-never-blocks and crumbs-are-not-truth properties; correction is a new crumb (revocation, §10 of the spec), never an edit.
- Action namespace for repository operations is `zenos.*` (e.g., `zenos.task.commission`, `zenos.knowledge.promote`, `zenos.workspace.close`, `zenos.decision.record`). Implementers operating within other systems use their own namespaces; trails may interleave.
- Trails SHOULD be anchored per §6.1 of the spec: the first crumb of commissioned work is `zenos.task.commission` with `content_hash` of the governing intent file.
- Signatures are OPTIONAL here as in the protocol, with the same reading-side rule: unsigned discontinuities in otherwise-signed trails are first-order anomalies.

### 5.4 Knowledge as an OKF Bundle

`knowledge/` is a conforming OKF bundle: markdown concepts with frontmatter, `index.md` for progressive disclosure, `log.md` as the chronological promotion record.

Two ZenOS-specific requirements layered on top of OKF:

1. **Lineage is mandatory.** Every concept cites the evidence it was distilled from (RFC-0003 §9: "knowledge always retains lineage back to supporting evidence"). Citations link to files in `evidence/` or to warrant IDs.
2. **Promotion is recorded.** Knowledge enters the bundle only through deliberate promotion (RFC-0003 §13). Each promotion appends a line to `log.md` naming what was promoted, by whom, from what evidence, and with what confidence. Where git is used, promotion SHOULD be a reviewed commit — review *is* the stewardship step, and a merge is a recorded act of judgment.

Confidence (RFC-0003 §14) is expressed in concept frontmatter as `confidence: low | moderate | high` plus a free-text rationale. Numeric scores are deliberately avoided in v0.1; false precision is a form of hidden state.

### 5.5 Decision Records

`decisions/` holds one file per meaningful commitment, carrying the fields of RFC-0001 §16: context, options considered, rationale, expected consequences, responsible participants, review conditions, related evidence. Changed decisions are superseded, not rewritten.

### 5.6 Workspaces

A workspace directory is *the current room in which thinking happens* — never the source of truth.

- `workspace.md` is the charter: which intent is mounted, who is participating, current objectives, open questions, constraints.
- `delegations.md` lists active delegations, each with: delegate, scope, bounds (what is explicitly *not* delegated), tools granted, expiry or review condition, and revocation status. This file is how delegation stays intentional, contextual, bounded, observable, and revocable (Article VI) in plain text.
- `notes/` is free space. Continuity of thought needs room that is not ceremony.

**Lifecycle:** `open → active → closing → archived`.

Closing is the step with teeth. A workspace SHALL NOT move to `archive/workspaces/` until a distillation pass has occurred: what was learned is either promoted toward `knowledge/` (or explicitly declined), decisions made inside the workspace are recorded in `decisions/`, and the closing itself is warranted (`zenos.workspace.close`). This is RFC-0002 §9 (reflection as first-class behavior) made mechanical: the archive accepts no workspace that has not been reflected upon.

### 5.7 Workflows

A workflow directory contains `workflow.md` (stages, roles, approvals, completion criteria, warrant expectations) and ICM-style numbered stage folders. Each stage folder carries the prompt and context an agent needs to perform that stage. Reordering work is renaming folders; changing behavior is editing markdown. The control surface stays legible to non-programmers, which is a constitutional property, not a convenience.

## 6. The Cognitive Cycle on Disk

One full turn of the RFC-0002 cycle, expressed entirely in file operations:

1. **Intent.** Steward writes `intents/INT-0007-reef-survey.md` (status: active).
2. **Workspace.** `workspaces/WS-0012-reef-survey/` is opened; `workspace.md` mounts INT-0007.
3. **Delegation.** An entry in `delegations.md` grants an agent bounded scope and named tools.
4. **Commission.** The agent's first crumb: `zenos.task.commission`, `content_hash` = hash of INT-0007, `approval_mode: human`.
5. **Action.** Work happens — in the workspace, through tools. Each significant action appends one warrant, `from` linking to its cause.
6. **Evidence.** Source material lands in `evidence/sources/`; the trail accumulates in `evidence/warrants/`.
7. **Knowledge.** Distilled understanding is proposed as OKF concepts citing that evidence; a steward reviews and promotes; `log.md` records it.
8. **Decision.** The commitment that follows is recorded in `decisions/DEC-0009-...md`.
9. **Refined intent.** What was learned revises INT-0007 (version bump) or supersedes it — observably.
10. **Closing.** The workspace distills, warrants its closure, and retires to the archive.

Every arrow in RFC-0001 §19's compositional flow is now a file event a human can inspect and an agent can parse. Nothing in the loop requires any particular model, framework, or vendor.

## 7. Invariants, Mechanically Satisfied

| Invariant (RFC-0001 §20 / RFC-0003 §20) | Mechanism in this layout |
|---|---|
| Intent precedes meaningful action | Root commission crumb hashes the intent file (§5.2, §5.3) |
| Delegation is bounded and observable | `delegations.md` per workspace; plain text, versioned (§5.6) |
| Workspaces preserve active context | Workspace charter + notes + version history (§5.6) |
| Evidence remains distinguishable from knowledge | Separate top-level trees; promotion is the only bridge (§5.4) |
| Warrants record action without becoming truth | Append-only JSONL; canonical state lives in the records and sources (§5.3) |
| Knowledge remains inspectable and revisable | OKF markdown; versioned; `supersedes` chains (§5.1, §5.4) |
| Humans remain stewards of intent | `steward:` field required on every record; promotion requires review (§5.1, §5.4) |
| Agents act as participants, not masters | Agents are registry entries with delegated, revocable scope (§4.1, §5.6) |
| Calm is preferred over unnecessary interruption | The repository never notifies; interfaces surface, and only when stewardship benefits (§3.4) |
| Understandable beyond any single implementation | cat-readable plain text throughout (§2) |

## 8. Relationship to External Specifications

ZenOS instantiation composes three external bodies of work. The dependency posture differs for each, deliberately:

**Warrants Protocol.** ZenOS depends on the Warrants *protocol* — the v0 schema, the DAG rules, the root-crumb convention — and on nothing else. The protocol is being incubated within a commercial product family (Pulse Messages), whose integration timing with ZenOS is **explicitly undecided and out of scope for this RFC**. No path, format, or convention in this document references Pulse infrastructure, and none may: a ZenOS repository must remain valid whether Warrants is read by a Pulse component, an independent trail-reader, or `grep`. If the protocol's stewardship or licensing were ever to change in ways incompatible with the Constitution, ZenOS forks the last compatible schema version and continues. (The protocol's own roadmap and strategic context are preserved in `evidence/sources/` as evidence, not as normative dependencies.)

**OKF.** Adopted as the knowledge bundle format because it independently satisfies Article IX (explicit, human- and agent-readable, portable, no required tooling). ZenOS layers lineage and promotion requirements on top (§5.4) without modifying the format.

**ICM.** Adopted as the workflow stage pattern because it independently validates the repository-centric thesis. ZenOS uses its folder-as-stage convention; it does not adopt ICM wholesale.

In all three cases the posture is the same: ZenOS composes with specifications that already honor its principles. It does not absorb them, and it survives their loss.

## 9. What This RFC Does Not Define

- **Trust algorithms.** Reading trails and computing trust is the reading agent's work (Warrants §3.5). This layout provides the substrate only.
- **Orchestrator implementation.** Any orchestrator that respects the registry, delegation bounds, and warrant expectations is conformant.
- **Interfaces.** Dashboards, chat surfaces, and notification policy are downstream of this spec.
- **Synchronization and multi-participant hosting.** v0.1 assumes a single repository visible to all participants. Federation across repositories is future work, and should be designed alongside the Warrants cross-issuer questions it will inherit (spec §15, open question 3).
- **Access control.** File permissions and repository hosting policy are deployment concerns. A warrant documents; it does not authorize (Warrants §1).

## 10. Minimal Viable Instantiation

A ZenOS repository is valid from the moment it can answer five questions in plain files:

| Question | Minimum artifact |
|---|---|
| What are we trying to do? | one intent file |
| Where is thinking happening? | one workspace with a charter |
| What happened? | one warrant trail, root-anchored |
| What do we believe, and why? | a knowledge index with one cited concept |
| What did we commit to? | one decision record |

Plus a copy of the Constitution in `constitution/`. Six files and a folder structure. Everything else in this RFC is growth, not admission.

There is no such thing as a ZenOS deployment that is too small. There is only a repository that has begun.

## 11. Conformance

An implementation conforms to this RFC when:

1. The component mapping of §4.1 is honored (components may be empty; they may not be relocated without documented supersession).
2. All records carry the required frontmatter of §5.1 and are never silently overwritten.
3. Warrant trails conform to Warrants v0 and are stored append-only.
4. Knowledge exists only in the bundle, carries lineage, and enters only by recorded promotion.
5. Workspaces cannot reach the archive without distillation.
6. The whole remains readable without proprietary tooling.

Deviations are permitted where documented in a decision record that names the invariant preserved by other means. The layout serves the Constitution; the Constitution does not serve the layout.

## 12. Closing Statement

The preceding RFCs were written from the top of the mountain. This one is written at the trailhead.

A constitution that cannot survive contact with a directory tree is poetry. A directory tree that needs no constitution is clutter. ZenOS is the discipline of keeping both honest: principles concrete enough to `cat`, files principled enough to trust.

The first ZenOS repository will be small, slightly wrong, and revised within a week.

That is not failure. That is the cycle, turning.

— **Zen Bañez**
*Gardener of Systems*

*in dialogue with Aletheios*
