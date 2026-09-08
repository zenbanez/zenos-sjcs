---
id: WS-0002-distribution
type: workspace-note
status: active
version: 1
steward: zen
created: 2026-09-08
updated: 2026-09-08
supersedes: null
intent: INT-0002
---

# INSET distribution, mirrored from `zenbanez/zen-os`

## What this is

A snapshot of `zenbanez/zen-os`'s `WS-0040-lived-house-exposure-improvement`
artifacts, at commit `54a72bb` (branch `ws-0040-d008-presence-admission`,
merged with `main`), copied here at the steward's direction so this house
holds a copy of the actual materials for its own event.

- `inset-distribution/` — the participant day guide, programme overview, and
  the `SJCS-Workshop/` folder that goes on the USB sticks.
- `inset-capture/` — the facilitator day log and reflection sheet capture
  instruments.

This is a **snapshot, not a live link.** `zen-os` is where these documents
are built and edited (the `make-*.js` generators live there and here
identically); re-running a generator here produces the same file, but a
future edit made in one house does not appear in the other automatically.
If the documents change in `zen-os` after this copy, re-copy rather than
assume this folder is current.

## Important: two `references/` folders, one job

This distribution's own `inset-distribution/SJCS-Workshop/references/` is
still just its placeholder checklist — that is what actually ships on the
USB sticks. It is **not** the same folder as this workspace's own
`../references/` (WS-0002's master reference folder, which D-002 still holds
open, and which now also carries `../references/context-from-zenos-deped/`).

**Before the sticks are built:** once `../references/` is filled with the
school's actual DLL template, lesson plan format, and curriculum guides
(D-002), copy that content into
`inset-distribution/SJCS-Workshop/references/` here — replacing its
placeholder — not the other way around. Filling one does not fill the other.

## What was left out of this mirror

The facilitator slide deck built in the same `zen-os` session
(`INSET-Facilitator-Slides.pptx`, `make-slide-deck.js`) is **not** included.
It was still uncommitted in `zen-os` as of this copy, pending the steward's
own decision on whether to commit it there. It was not part of what was
asked to be mirrored here.

## Rights

Same posture as the rest of this house: private repository, not published,
not shared outside it without a separate steward decision.
