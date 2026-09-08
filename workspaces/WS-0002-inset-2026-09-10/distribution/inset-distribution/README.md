# INSET distribution — San Jose Central School, 2026-09-10

Facilitator-facing. Participants never read this file.

## What this is

`SJCS-Workshop/` is the folder that goes on the USB sticks. It is a
**distribution**, not a repository and not a clone. It carries no house
records, no constitutional library, no warrant trail, and no git history.

That is deliberate. A new instance follows RC0 posture and is **private**,
which means thirty teachers cannot download it — each would need a GitHub
account and a collaborator invitation, and that flow is what consumed half of
the 2026-08-12 outing. Handing out a folder removes accounts, invitations,
and the venue network from the critical path entirely.

The receiving instance, when it exists, is the steward's record of what comes
back. It is not what the room holds during the day.

## What is missing and must be added before the 10th

**`SJCS-Workshop/references/` is empty.** It carries only a note to
participants and a checklist.

The corpus was not authored here on purpose. The materials that belong in it —
DLL templates, the lesson plan format, curriculum guides for the learning
areas actually present — are DepEd instruments held by the facilitator and the
school. Inventing their contents would put fabricated departmental documents
in front of thirty teachers, and every output produced from them would inherit
the error. The checklist in `references/PUT-SCHOOL-MATERIALS-HERE.txt` names
what to add.

The two cautions in that checklist are worth honouring: screen for learner and
parent identifying data before anything is copied thirty times, and prefer
plain formats over scanned PDFs, which the client reads poorly or not at all.

Participants **do** need to open these during the day — the first of the seven
checks asks whether a lesson matches the competency in the curriculum guide,
which cannot be answered without looking. The materials say so.

## Printed for participants

`INSET-Participant-Day-Guide.docx` — **print one per attendee, plus a few
spares.** Five A4 pages. It is the booklet each teacher keeps beside their
laptop all day.

It carries the schedule with a *what you do* column for every block, the three
setup steps, the starter questions in copy-ready form, the seven checks, the
naming convention and both collection points, what to do when something breaks,
and what the 16:15 reflection will ask.

Paper rather than a file on the stick, for two reasons: it works before anyone
has connected anything, and copying a prompt from paper beats alt-tabbing away
from the window you are working in. The questions and checks it prints are the
same ones in `SJCS-Workshop/guides/`, so a teacher who prefers the screen loses
nothing.

`make-participant-guide.js` regenerates it:

```bash
npm install docx && node make-participant-guide.js .
```

`INSET-Programme-Overview.docx` — three A4 pages. The formal description of the
programme: purpose, core message, learning outcomes, philosophy, the programme
of activities, facilitation approach, success indicators, and the closing
thought. For the school head, for INSET documentation, and for anyone who wants
to know what the day is before attending it.

**Its content is the steward's own *Institutions of Thought* facilitator guide,
preserved rather than rewritten.** Every section is his wording, the schedule
times are unchanged, and the reflection questions are his five. Nothing about
the programme was authored here.

Two things were added, and they are additions rather than sources:

- the **header block** — date, venue, participants, facilitator — which the
  original guide states in prose; and
- **What participants bring** — a laptop and the **Codex desktop**
  application, installed and signed in ahead of the day, which reflects what
  the steward has already asked of the room and which a programme document is
  normally expected to state.

No claim about accreditation, CPD units, PPST alignment, or departmental
endorsement appears anywhere in it, because none has been established.

```bash
npm install docx && node make-program-overview.js .
```

## The palette

Shared with the capture instruments and documented in
[`../inset-capture/README.md`](../inset-capture/README.md). Two colours, checked
in greyscale, scarce by design.

## Building the USB sticks

1. Fill `references/` per its checklist.
2. Copy the whole `SJCS-Workshop/` folder to each stick.
3. Optionally remove the facilitator checklist section at the bottom of
   `PUT-SCHOOL-MATERIALS-HERE.txt`. Participants will skip it either way.

The folder is text and a handful of documents — small enough that copying is
the fastest part of the preparation. Bring a Drive link as a backup, not as
the plan; the point of the sticks is that they work when the venue network
does not.

## The test to run before Monday

**The single highest-value hour of preparation.** Run it on a laptop that is
not the facilitator's — ideally a teacher's, at minimum a clean Windows
machine with a fresh account.

1. Insert the stick. Copy `SJCS-Workshop` to the Desktop.
2. Open **Codex desktop** and sign in. Open the copied `SJCS-Workshop`
   folder as the project or working folder. Note anything the on-screen
   labels call something different from what the guide says — the wording in
   the participant materials was written without a tested build in front of
   it, and this test is the chance to correct it.
3. Paste starter 1 from `guides/first-things-to-ask.txt`, filled in for a real
   grade and topic.
4. Confirm the output actually reflects the documents in `references/` rather
   than generic material. **This is the step that proves the whole design.** If
   the response could have been produced without the folder, the connection is
   not doing what the day depends on.
5. Save something into `my-work/` under the naming pattern.
6. Note how long steps 1–3 took for someone who has not seen it before.

If step 4 fails, there are five days to find a fallback. Discovering it on the
10th is the failure mode this test exists to prevent.

## Collection — the part that makes 3:15 work

The outline's centrepiece asks the room to see how the day's outputs become
institutional knowledge. If nothing was collected, that session describes an
idea. If work was collected, it demonstrates one, using their own files with
their own names on them.

Two collection points are written into the participant note: **before lunch**
and **before the 3:00 break**. The transport is not decided here and does not
matter much — a shared folder, a walked-around USB, an email address. What
matters is:

- it takes a participant under a minute and requires nothing technical;
- opting out is genuinely available and stated plainly; and
- what arrives records whether it was produced locally and handed in, so
  provenance survives.

Arrival is not admission. Nothing collected on the 10th becomes evidence,
adopted knowledge, or an institutional decision by virtue of having been
handed in.

## What this distribution deliberately omits

| Omitted | Why |
|---|---|
| Git, GitHub, clone, pull request | Consumed half the 2026-08-12 outing; nothing in the schedule needs it |
| RFC-0000 … RFC-0007 | Progressive disclosure. A folder opening onto seven constitutional documents reads as homework to a room being de-anxietised |
| Warrant trails, intents, delegations | The house's own machinery. Belongs on the facilitator's screen at 3:15, not in thirty laptops at 10:30 |
| Any DepEd document authored here | Not ours to write. See above |

## Known risks this folder does not solve

1. **Token limits.** Thirty participants generating continuously from 10:30 to
   2:30 will hit free-tier caps at peak productivity, as they did on
   2026-08-12. `READ-ME-FIRST.txt` tells participants to raise a hand rather
   than reinstall anything, which prevents the worst response — but the
   underlying decision (who pays, or what the fallback is) is the facilitator's
   and is still open.
2. **Client connection behaviour** is unverified. See the test above.
3. **Support staffing.** The outline says support circulates continuously
   during the 10:30 block. That fixes the one-facilitator bottleneck on paper;
   it needs actual named people who know what they are solving.

## Provenance

Built under WS-0040/D-005 for the second outing. The design responds to
counter-signals 1, 2, 3 and 5 recorded in the
[2026-08-12 training narration](../2026-08-12-deped-training-narration.md),
whose proportions and timings are facilitator recollection rather than
measured results. The direction is relied on here; the magnitudes are not.
