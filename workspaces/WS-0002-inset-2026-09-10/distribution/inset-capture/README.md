# INSET capture — San Jose Central School, 2026-09-10

Facilitator-facing. Deliverable 4 of WS-0040/D-005, companion to the
[distribution](../inset-distribution/README.md).

## Why paper

Both instruments are paper on purpose.

At 16:15, after eight hours, asking thirty tired teachers to open a laptop and
type into a form is how a reflection block returns eight responses. Paper
returns thirty. It also survives an exhausted venue network, a dead battery,
and a spent free tier — none of which are hypothetical, since all three
appeared on 2026-08-12.

The first outing's weakness was never that people had nothing to say. It was
that nothing they said was written down in a form anyone could check later.

## The palette

All four documents share two colours, defined at the top of each generator.

| Token | Use |
|---|---|
| `DEEP` teal `#1F4E5F` | headings, section rules, table headers, prompt spines |
| `ACCENT` terracotta `#A8522C` | the few passages that must not be skimmed |
| `MUTED` `#55686F` | notes and secondary text |
| tints `#E7EFF2` / `#F4F8F9` / `#FAF2EC` | table headers and panels |

Terracotta is deliberately scarce. It marks three things and no others: the
privacy rule in the participant guide, the day log's *"not for the facilitator
to fill"*, and the closing lines. If it starts appearing anywhere else it stops
meaning anything.

**Checked in greyscale, not assumed.** These will meet a school printer that is
probably mono. Every page was rendered again desaturated: the hierarchy holds,
the accent panels stay distinguishable from the neutral ones, and no dark fill
sits behind body text. Colour marks structure here; it never carries meaning on
its own.

## What to print

| Sheet | Copies | Held by |
|---|---|---|
| `INSET-Reflection-Sheet.docx` | attendance + 5 | handed out at 16:15 |
| `INSET-Facilitator-Day-Log.docx` | 1 | **a support person, not the facilitator** |

**Print the `.docx` files.** They are A4 portrait, ruled for handwriting, and
verified by rendering: the reflection sheet is exactly **2 pages — one
double-sided sheet** — and the day log is 3.

The page size is **A4**. That was chosen for width — A4 is narrower than
Letter, 8.27in against 8.5in — but width is only half the question: **A4 is
also taller**, 11.69in against Letter's 11in. Printing A4 content onto Letter
paper can therefore clip or reflow at the bottom.

Set the printer to A4, or to fit-to-page, and **proof-print one copy** before
running thirty. No physical printer has been tested. Change `PAGE` in the
generator if A4 turns out wrong for the machine on the day.

The `.txt` versions are the readable source of record and are kept in step with
the Word files. Read those to review wording; print the Word ones.

They drifted once: section H of the day log was added to the Word file and not
to the text, while this README claimed they matched. Both now carry it. If the
two ever disagree again, the text file is what a reviewer will read, so the
divergence is the defect.

`make-forms.js` regenerates both documents:

```bash
npm install docx && node make-forms.js .
```

Committed so the forms can be corrected and rebuilt rather than edited as
opaque binaries — a Word file nobody can regenerate is exactly the kind of
artifact Sol's proposal item 7 warns about.

## The day log is somebody else's job

The log names this at the top and it is worth repeating: the facilitator will
be teaching, demonstrating, and troubleshooting all day. He cannot also be
counting. Hand it to a named support person before 08:00.

The one-facilitator bottleneck was counter-signal 2 on 12 August. Handing out
the counting is a small instance of fixing it.

## Running the 16:15 block

The schedule gives thirty minutes for reflection. Suggested split:

1. **Writing first — about 10 minutes, in silence.**
2. **Discussion after — about 20 minutes.**

The order matters, and not only for time. If the discussion runs first,
everyone writes down the room's consensus and the independent signal is gone.
Written-then-discussed gives thirty separate readings *and* a conversation.
Discussed-then-written gives one reading, thirty times.

This house already knows this — it is why DLB-0010's ballots were sealed before
positions were revealed. The same discipline applies to a room of teachers.

Collect the sheets before people leave. Sheets that go home do not come back.

## Question 11 earns its place

Questions 7 to 10 and 12 come from the steward's outline. Question 11 — *what
did you try that did NOT work* — was added.

**They are adapted, not verbatim**, and an earlier version of this README said
otherwise. Only *"What will you use tomorrow?"* survives word for word. The
changes, so they can be restored if the exact wording is preferred:

| Steward's original | On the sheet |
|---|---|
| What surprised you? | What surprised you **today**? |
| What will you use tomorrow? | *(unchanged)* |
| Where is AI most helpful? | Where **was the** AI most helpful? |
| Where must teachers remain central? | …central **— where should this never take over?** |
| What would you like future teachers to inherit? | …future teachers **at this school** to inherit **from today**? |

Everything else on the page invites a positive answer. WS-0040 exists
specifically to receive exposures *"without flattening them into praise,
failure, or an undifferentiated improvement backlog."* An instrument that only
has room for what went well will produce a record that only says what went
well, and the third outing will be designed against it.

## The six numbers

If everything else is lost, these are what make the next outing designable:

1. How many arrived with the client already installed.
2. How many were working by 10:30, counted rather than estimated.
3. When the first usage limit was hit.
4. How many hit a usage limit by day's end.
5. How many files were collected, and how many people declined.
6. Planned versus actual for each block.

None of these existed after 12 August. All six are recollection in the
narration, and the exposure register says so plainly.

## After the day — the privacy boundary

**The paper stays with the steward.** Do not photograph the sheets into any
repository, and do not transcribe them verbatim.

WS-0040's hard boundaries already forbid copying participant emails,
screenshots, or raw feedback into this house, and a reflection sheet with an
optional name on it is raw feedback. The receiving instance is also the wrong
home: sheets carrying names belong to the school and the people who wrote them.

What can travel is the **aggregate** — the counts, the tallies, the planned
versus actual, and themes drawn from the open answers without attribution. A
teacher who wrote something unflattering should be able to see the resulting
record and not find themselves in it.

Anyone who wrote their name did so to be credited or asked again later, which
is consent for those two things and nothing more.

## What this is not

Arrival is not admission. Nothing captured on 2026-09-10 becomes evidence, an
institutional finding, or adopted knowledge by virtue of having been written
down. Admission runs through the WS-0040 sequence like any other exposure, by
separate steward judgment.

The sheets are a better memory than the last outing had. They are not a
verdict on whether the day worked.
