# RFC-0001: Composition of ZenOS

**Status:** Draft
**Version:** 0.1
**Depends on:** RFC-0000: Constitution of ZenOS
**Supersedes:** Earlier Repository Specification drafts

> *Markdown transcription of the ratified PDF (`RFC-0001-composition.pdf`, sha256 1b695eb9175b0330…), converted 2026-07-10 at the steward's direction; substance unchanged. The PDF remains the render of record.*

## 1. Purpose

This RFC defines the primary components of ZenOS and the relationships among them.

ZenOS is not a single application, agent framework, knowledge base, or automation platform.

ZenOS is a cognitive operating system composed of interdependent parts that enable humans and intelligent agents to think, collaborate, delegate, act, observe, and learn within a shared environment.

This document answers the question:

> **What is ZenOS made of?**

## 2. Constitutional Alignment

All components of ZenOS exist to serve the principles established in RFC-0000.

No component is valuable merely because it is powerful, intelligent, efficient, or automated.

A component is valuable only insofar as it supports:

- human flourishing
- interdependence
- stewardship
- explicit intent
- bounded delegation
- observable evidence
- durable knowledge
- calm collaboration

## 3. Core Composition

ZenOS is composed of the following primary components:

```
ZenOS
├── Constitution
├── Intent
├── Participants
├── Workspaces
├── Evidence
├── Knowledge
├── Projects
├── Workflows
├── Agents
├── Orchestrators
├── Tools
├── Warrants
├── Decisions
├── Interfaces
└── Archive
```

These components are not independent modules.

They form a living system.

## 4. Constitution

The Constitution defines the highest principles of ZenOS.

It governs all other components.

If any implementation conflicts with the Constitution, the implementation is wrong.

The Constitution answers:

> **Why does ZenOS exist?**

## 5. Intent

Intent is the source of meaningful action.

Intent defines what is worth pursuing and why.

Every significant project, workspace, workflow, delegation, and agent action SHOULD trace back to explicit intent.

Intent is not a task list.

Intent is not a prompt.

Intent is the purpose that gives work legitimacy.

## 6. Participants

Participants are entities capable of contributing to the shared cognitive environment.

Participants MAY include:

- humans
- AI agents
- orchestrators
- organizations
- systems
- future intelligent actors

Participants differ in capability and responsibility, but all participate through shared context, observable action, and bounded delegation.

## 7. Workspaces

Workspaces are versioned environments for sustained thought and collaboration.

A workspace represents active attention around a body of work.

Workspaces MAY contain:

- mounted intent
- active participants
- current objectives
- pinned knowledge
- relevant evidence
- open questions
- current constraints
- active delegations
- workspace history

A workspace is not the source of truth.

It is the current room in which thinking happens.

## 8. Evidence

Evidence consists of observable records from which trust, knowledge, and judgment may emerge.

Evidence includes:

- warrants
- logs
- transcripts
- meeting notes
- messages
- source documents
- external observations
- human attestations

Evidence is preserved so future participants may understand how conclusions were reached.

Evidence is not automatically knowledge.

## 9. Knowledge

Knowledge is durable understanding distilled from evidence, experience, reasoning, and stewardship.

Knowledge SHOULD be:

- explicit
- inspectable
- portable
- human-readable where practical
- agent-readable where useful
- versioned
- revisable

Knowledge is not memory.

Knowledge is not raw data.

Knowledge is what ZenOS currently understands to be true, useful, or guiding.

## 10. Projects

Projects organize purposeful work over time.

A project exists to advance one or more intents.

Projects MAY contain:

- goals
- roadmaps
- tasks
- decisions
- related workspaces
- related workflows
- related evidence
- project-specific knowledge

Projects answer:

> **What are we trying to bring into being?**

## 11. Workflows

Workflows define how work progresses.

A workflow represents a repeatable pattern of action.

Workflows MAY include:

- stages
- inputs
- outputs
- roles
- required approvals
- tools
- completion criteria
- warrant expectations

Workflows answer:

> **How does this kind of work move forward?**

## 12. Agents

Agents are specialized intelligent participants capable of performing work.

Agents MAY:

- analyze
- draft
- summarize
- research
- classify
- plan
- act through tools
- create warrants
- update workspaces
- propose decisions

Agents do not possess authority merely because they possess capability.

Their authority is delegated through intent, workspace context, and applicable warrants.

## 13. Orchestrators

Orchestrators coordinate work among participants.

An orchestrator MAY:

- interpret intent
- create tasks
- route work
- assign agents
- monitor progress
- request human intervention
- compose workspaces
- surface next actions

The orchestrator is not the owner of ZenOS.

It is a coordinator within ZenOS.

## 14. Tools

Tools allow participants to act upon the world.

Tools MAY include:

- file systems
- calendars
- email
- browsers
- terminals
- APIs
- databases
- messaging systems
- external services

Tool access SHALL be bounded by delegation, workspace context, and applicable policy.

A tool capability is not consent.

## 15. Warrants

Warrants are atomic records of action.

They are fast, atomic, non-blocking, and not a source of truth.

They are crumbs left along the way.

Warrants help participants reason about what happened, what came before, and whether a trail of action coheres with the originating intent.

Warrants do not replace authorization.

They provide evidence for trust.

## 16. Decisions

Decisions record meaningful commitments.

A decision SHOULD preserve:

- context
- options considered
- rationale
- expected consequences
- responsible participants
- review conditions
- related evidence

Decisions explain why a path was chosen.

If a decision changes, the change SHOULD be recorded rather than silently overwritten.

## 17. Interfaces

Interfaces are the surfaces through which participants interact with ZenOS.

Interfaces MAY include:

- chat
- voice
- dashboards
- editors
- file browsers
- notifications
- command lines
- ambient displays
- APIs

No interface is ZenOS itself.

Interfaces are doors into the shared environment.

## 18. Archive

The Archive preserves what is no longer active but remains meaningful.

Archived material MAY include:

- completed projects
- retired workspaces
- superseded knowledge
- historical evidence
- deprecated workflows
- past decisions

Archiving is not deletion.

It is respectful retirement from active attention.

## 19. Compositional Flow

The components of ZenOS form a cycle:

```
Intent
 ↓
Workspace
 ↓
Delegation
 ↓
Agent / Human Work
 ↓
Tool Action
 ↓
Warrant / Evidence
 ↓
Knowledge
 ↓
Decision
 ↓
Refined Intent
```

ZenOS is not linear.

It is recursive.

The system learns by acting, observing, reflecting, and refining.

## 20. Invariants

Any valid ZenOS implementation MUST preserve the following invariants:

1. Intent precedes meaningful action.
2. Delegation is bounded and observable.
3. Workspaces preserve active context.
4. Evidence remains distinguishable from knowledge.
5. Warrants record action without becoming the source of truth.
6. Knowledge remains inspectable and revisable.
7. Humans remain stewards of intent.
8. Agents act as participants, not masters.
9. Calm is preferred over unnecessary interruption.
10. The repository remains understandable beyond any single implementation.

## 21. What ZenOS Is Not

ZenOS is not a chatbot.

ZenOS is not merely an AI assistant.

ZenOS is not only an agent framework.

ZenOS is not only a knowledge base.

ZenOS is not only a workflow engine.

ZenOS is not only a productivity system.

ZenOS is the shared cognitive environment in which all of these may exist without becoming the whole.

## 22. Guiding Principle

The composition of ZenOS should remain simple enough to understand, yet rich enough to support human–AI interdependence across time.

When in doubt, prefer the component boundary that makes the system:

- more understandable
- more inspectable
- more calm
- more faithful to intent
- more capable of stewardship

ZenOS is composed not merely of software parts, but of relationships.

Its architecture is therefore not only technical.

It is relational.

## 23. Closing Statement

A system built only from agents becomes chaotic.

A system built only from rules becomes brittle.

A system built only from knowledge becomes passive.

A system built only from automation becomes careless.

ZenOS is composed so that intent, evidence, knowledge, workspaces, agents, tools, and humans may operate together in interdependence.

Its purpose is not to maximize action.

Its purpose is to create the conditions in which wise action can emerge.

— **Zen Bañez**
*Gardener of Systems*

*in dialogue with Aletheios*
