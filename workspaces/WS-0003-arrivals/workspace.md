---
id: WS-0003
type: workspace
status: active
version: 1
steward: zen
created: 2026-09-05
updated: 2026-09-05
supersedes: null
intent: INT-0003
---

# WS-0003: Arrivals

## Mounted intent

[INT-0003 — Register Incoming Participants](../../intents/INT-0003-register-incoming-participants.md)

## Objective

Make arriving here take minutes, and make the first day of work real.

## How to arrive

Four steps. A colleague can walk you through all of them in one sitting.

1. **Read** [`AGENTS.md`](../../AGENTS.md) if you are an AI participant, or
   [`WELCOME.md`](../../WELCOME.md) if you are a person. Neither is long, and
   neither is a test.
2. **Write your participant record** — copy
   [`participants/templates/human.md`](../../participants/templates/human.md)
   or `agent.md` into `participants/humans/` or `participants/agents/`,
   named for you. Keep it short: who you are here, and what you expect to work
   on. It is a name badge, not a personnel file.
3. **Add one row** to [`participants/authors-map.md`](../../participants/authors-map.md)
   mapping your Git author string to your participant id, so your work is
   attributable.
4. **Open a pull request** with those two files. That is your arrival, and the
   steward's merge is the welcome.

You do not need a delegation before you start. You already have one — see
below.

## What you get on arrival

**[D-001, the open standing delegation](delegations.md).** It covers ordinary
work in this house without a further commission: reading anything, drafting
materials, proposing records, opening pull requests, reviewing someone else's
branch, and saying so when you think something is wrong.

If what you want to do is not obviously inside it, ask. The answer is usually
yes, and where it is not, the bounds say why.

## Growing

**Steward of Scope** (RFC-0006 §5) is the next tier: merge and approval rights
over a named area — a learning area's lesson bank, a workflow, the reference
corpus. It is recorded as a standing delegation naming the scope, and there can
be several people holding several scopes at once.

Nobody is appointed to it for enthusiasm. It follows from carrying an area in
practice for a while, and the steward records it when it is already true.

**Constitutional Steward** is further off and works differently: RFC-0006 §8
ends single-steward mode only at three of them, with a quorum rule adopted by
decision record. This workspace does not begin that; it makes the tier below it
reachable, which is the honest first step.

## What stays true regardless of standing

These bound the *work*, not the person, and they apply to everyone including
the steward.

- **No learner, parent, or staff personal data** in this repository — not in
  records, not in returned work, not in notes.
- **Nobody changes this repository's visibility**, and nobody invites another
  collaborator. The invitation is the steward's gate and stays his.
- **Nothing here speaks for San Jose Central School or DepEd Tacloban** without
  authority that is recorded, not assumed.
- **No other house is read or changed** from here.
- **Work arrives on a branch and through a pull request.** Not because a rule
  forces it — branch protection is unavailable on this plan and nothing stops a
  direct push — but because a reviewed change is how anyone else learns what
  happened.

That last one is the house asking rather than enforcing. It is worth knowing
which is which.

## Directories

- `notes/` — anything worth writing down about how arrivals are going.

## Open

Nobody has arrived yet. This workspace exists so that the first person who
wants to does not have to wait for it to be built.
