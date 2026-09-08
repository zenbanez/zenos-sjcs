---
id: WS-0002
type: workspace
status: active
version: 3
steward: zen
created: 2026-09-04
updated: 2026-09-08
supersedes: null
intent: INT-0002
---

# WS-0002: The INSET — 10 September 2026

## Mounted intent

[INT-0002 — Institutions of Thought, the first INSET](../../intents/INT-0002-inset-institutions-of-thought.md)

## Objective

Run the day well, and keep enough of it that a second one can be designed
rather than remembered.

## The shape of the day

| Time | Block | Where the house appears |
|---|---|---|
| 8:00 | Welcome and context | not at all |
| 8:30 | The changing landscape of education | not at all |
| 9:15 | AI for tomorrow's lesson — demonstration | facilitator's screen |
| 10:30 | Guided workshop | participants' folders |
| 12:00 | Lunch | **first collection point** |
| 1:00 | Collaborative lesson design | participants' folders |
| 2:30 | AI beyond lesson planning | facilitator's screen |
| 3:00 | Break | **second collection point** |
| 3:15 | The school as a learning institution | **this house, on the screen** |
| 4:15 | Reflection | paper |

The 3:15 block is the one this repository exists for. It is the difference
between describing institutional memory and showing the room a folder with
their own names on it, made four hours earlier.

## Two lanes, not three

**Visitor** — everyone, all day. No account, no install beyond the AI client,
no repository.

**Working** — the 10:30 and 1:00 blocks. A folder copied from a USB stick, an
AI client pointed at it, and materials saved into `my-work`.

**Contributor** — deliberately absent. Nobody registers, clones, branches, or
opens a pull request on 10 September. On 12 August that lane consumed roughly
half the available time and most participants never reached the work the day
was for.

Anyone who wants the contributor lane afterwards can have it. It is not a
session objective and it is not a measure of whether the day worked.

## Directories

- [`references/`](references/) — the school's own materials. **Still empty of
  the actual curriculum materials; D-002 remains open.** The same set goes
  into the distribution. As of 2026-09-08 it also carries
  [`context-from-zenos-deped/`](references/context-from-zenos-deped/) — PPST
  and Abridged TPD program-level materials mirrored in under D-004, which is
  background context, not a substitute for D-002.
- [`distribution/`](distribution/) — a 2026-09-08 mirror of the built INSET
  documents and `SJCS-Workshop/` folder from `zenbanez/zen-os` (D-004). A
  snapshot, not a live link; see its own README before building USB sticks.
- [`returned-work/`](returned-work/) — where handed-in materials land. Empty
  until the day.
- `notes/` — observations, and later the aggregate of the reflection sheets.

## Before the day

1. **Fill `references/`.** Screen every document for learner and parent names
   first. Blank templates are safe; filled-in samples often are not. Prefer
   plain formats — a scanned PDF is an image and the client reads it poorly.
2. **Test the client** against that folder on a laptop that is not the
   facilitator's. Confirm the output actually reflects the references rather
   than generic material. If it could have been produced without the folder,
   the connection is not doing what the day depends on.
3. **The token fallback is decided.** When a participant exhausts their Codex
   free usage, they move to **Muse Spark 1.3, free tier, via OpenCode Zen**
   (steward, 2026-09-05).

   One thing about it is still unverified and matters more than the choice
   itself: **can a teacher reach it mid-session without installing anything?**
   A fallback that needs a terminal, an API key, or a new account is a
   facilitator's tool, not a room's — and switching thirty people to it at
   11:15 would recreate the provisioning failure of 12 August at the worst
   possible moment. Confirm the actual path on the same non-facilitator laptop
   used for the Codex test, and if it turns out to need setup, the room's real
   fallback is pairing up and the sheet should say so.

   *Muse Spark 1.3 here names a model reached through a third-party gateway.
   It is not the house participant `muse-spark`, whose record deliberately
   declines to tie identity to model lineage. Nothing about this fallback
   grants that participant standing at this event, and nothing about the
   participant vouches for this tool.*

4. **The support person is Teacher Rachel Ann** (steward, 2026-09-05). She
   holds the day log — the counting the facilitator cannot
   do while teaching — and circulates during the working blocks.

   She is **not** a participant in this house: no registration, no standing, no
   repository access, and nothing she records is a delegation. She is a
   colleague doing a job on the day, and the log is paper.

5. **The references are the steward's**, in preparation as of 2026-09-05.

## Hard boundaries

- No teacher is registered as a participant, and nobody is added as a
  collaborator to this repository to run this event.
- No learner, parent, or staff personal data enters this house — not in
  references, not in returned work, not in notes.
- **The reflection sheets stay on paper with the steward.** They may carry
  names. Only aggregates are recorded here.
- Nothing returned on the day becomes evidence, knowledge, or a decision by
  virtue of having been handed in. Admission is a separate steward judgment.
- Nothing here speaks for San Jose Central School or DepEd Tacloban.
- This repository stays private. It is not published, shared, or made public
  without a separate decision.

## A note on the last boundary

On 12 August a sibling house was briefly public while its own records said it
was private and that publication was not authorized. It was contained on
20 August. Why it happened is still unknown.

Nothing prevents that here except attention. This repository has one
collaborator — the steward — and branch protection is not available on the
current plan, so no machinery is watching. That is the whole of the control.
