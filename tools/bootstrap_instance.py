#!/usr/bin/env python3
"""Create a deterministic first-cycle draft from explicit steward inputs."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path


def safe_id(value: str) -> str:
    if not re.fullmatch(r"[a-z][a-z0-9-]*", value):
        raise argparse.ArgumentTypeError("use lowercase letters, digits, and hyphens")
    return value


def write_new(path: Path, text: str) -> None:
    if path.exists():
        raise RuntimeError(f"refusing to overwrite {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8", newline="\n")


def frontmatter(identifier: str, kind: str, steward: str, date: str, extra: str = "") -> str:
    return (
        f"---\nid: {identifier}\ntype: {kind}\nstatus: active\nversion: 1\n"
        f"steward: {steward}\ncreated: {date}\nupdated: {date}\nsupersedes: null\n{extra}---\n\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--date", required=True, help="fixed YYYY-MM-DD")
    parser.add_argument("--issued-at", required=True, help="fixed UTC ISO timestamp")
    parser.add_argument("--steward-id", required=True, type=safe_id)
    parser.add_argument("--steward-name", required=True)
    parser.add_argument("--steward-email", required=True)
    parser.add_argument("--participant-id", required=True, type=safe_id)
    parser.add_argument("--participant-name", required=True)
    parser.add_argument("--participant-email", required=True)
    parser.add_argument("--agent-string", required=True, type=safe_id)
    parser.add_argument("--warrant-id", required=True)
    parser.add_argument("--observation-warrant-id", required=True)
    args = parser.parse_args()
    for option, value in (("--warrant-id", args.warrant_id), ("--observation-warrant-id", args.observation_warrant_id)):
        if not re.fullmatch(r"w_[A-Za-z0-9]{10,}", value):
            parser.error(f"{option} must be w_ plus at least 10 random-style characters")
    if args.warrant_id == args.observation_warrant_id:
        parser.error("warrant IDs must be distinct")

    root = args.root.resolve()
    if list((root / "intents").glob("INT-*.md")) or list((root / "workspaces").glob("WS-*")):
        raise RuntimeError("house already contains real intent or workspace records")

    intent = frontmatter("INT-0001", "intent", args.steward_id, args.date) + f"""# INT-0001: Test the First Contribution Loop

## Purpose

Verify that this local house can establish identity, delegation, evidence, and
one merge-ready contribution using only shipped guidance.

## In scope

- A synthetic first-participant observation and local guard run.

## Out of scope

- External communication, remote changes, real personal data, and
  institutional adoption.

## Success conditions

1. The participant records one bounded observation.
2. The local guard passes from committed state.
3. The steward reviews the contribution.
"""
    intent_path = root / "intents/INT-0001-first-contribution.md"
    write_new(intent_path, intent)
    intent_hash = hashlib.sha256(intent.encode("utf-8")).hexdigest()

    write_new(root / f"participants/humans/{args.steward_id}.md", frontmatter(args.steward_id, "participant-human", args.steward_id, args.date) + f"# {args.steward_name}\n\nInitial local steward.\n")
    write_new(root / f"participants/agents/{args.participant_id}.md", frontmatter(args.participant_id, "participant-agent", args.steward_id, args.date) + f"# {args.participant_name}\n\nAgent string: `{args.agent_string}`.\n")
    (root / "participants/authors-map.md").write_text(
        "# Git Author Map\n\n| Git author string | Participant ID |\n|---|---|\n"
        f"| `{args.steward_name} <{args.steward_email}>` | `{args.steward_id}` |\n"
        f"| `{args.participant_name} <{args.participant_email}>` | `{args.participant_id}` |\n",
        encoding="utf-8", newline="\n",
    )

    workspace_dir = root / "workspaces/WS-0001-first-contribution"
    write_new(workspace_dir / "workspace.md", frontmatter("WS-0001", "workspace", args.steward_id, args.date, "intent: INT-0001\n") + f"""# WS-0001: First Contribution

## Mounted intent

[INT-0001](../../intents/INT-0001-first-contribution.md)

## Objective

Return one bounded observation through the local branch-and-review loop.
""")
    write_new(workspace_dir / "delegations.md", frontmatter("WS-0001-delegations", "delegation-register", args.steward_id, args.date, "intent: INT-0001\nworkspace: WS-0001\n") + f"""# WS-0001: Active Delegations

## D-001 — First observation ({args.participant_id})

- **Delegated by:** {args.steward_id}, {args.date}.
- **Delegate:** {args.participant_id}.
- **Scope:** Inspect the base house, add one synthetic observation, run checks, and return a branch contribution.
- **Bounds:** No constitutional amendment, external communication, real personal data, or authority expansion.
- **Review condition:** Local steward reviews the committed diff.
- **Status:** active.
""")
    write_new(
        workspace_dir / "notes/observation.md",
        frontmatter(
            "WS-0001-observation-note", "workspace-note", args.steward_id,
            args.date, "intent: INT-0001\nworkspace: WS-0001\n",
        ) + f"# Synthetic Observation\n\n{args.participant_name} observed that the shipped arrival path was sufficient to establish the first bounded contribution.\n",
    )

    progress = frontmatter("INT-0001-progress", "progress-register", args.steward_id, args.date, "intent: INT-0001\n") + """# INT-0001 Progress — First Contribution

## Snapshot

- **Intent status from source:** active
- **Operational state:** awaiting-steward
- **Latest meaningful transition:** Synthetic participant delivered D-001.
- **Next action or judgment:** Local steward reviews the contribution.
"""
    write_new(root / "intents/progress/INT-0001.md", progress)
    (root / "intents/progress/index.md").write_text(frontmatter("intents-progress-index", "index", args.steward_id, args.date).replace("version: 1", "version: 2") + """# Intent Progress Index

| Intent | Source status | Operational view | Primary room | Attention |
|---|---|---|---|---|
| [INT-0001](INT-0001.md) | active | awaiting-steward | WS-0001 | Review the first contribution. |
""", encoding="utf-8", newline="\n")

    source = frontmatter("synthetic-bootstrap-observation", "evidence-source", args.steward_id, args.date, "intent: INT-0001\n") + """# Synthetic Bootstrap Observation

## Method

Followed the shipped arrival sequence and ran the deterministic local
scaffolder with fixed synthetic identities and dates.

## Observation

The repository supplied enough local guidance and scaffolding to create the
first intent, workspace, delegation, participant registration, and root
warrant without private-house context, real personal data, or network access.

## Limit

This observation covers only the bounded first-contribution path; it does not
establish production fitness.
"""
    write_new(root / "evidence/sources/synthetic-bootstrap-observation.md", source)
    source_hash = hashlib.sha256(source.encode("utf-8")).hexdigest()
    concept = frontmatter("first-loop-is-legible", "concept", args.steward_id, args.date, "intent: INT-0001\n").replace("status: active", "status: proposed") + """# The First Loop Is Legible

## Claim

The shipped repository is locally legible enough to instantiate its minimum
first-contribution relationships without outside house context.

## Evidence

- [Synthetic bootstrap observation](../../evidence/sources/synthetic-bootstrap-observation.md)

## Confidence and limits

Moderate confidence for this bounded synthetic path. Promotion remains with
the local human steward.
"""
    write_new(root / "knowledge/concepts/first-loop-is-legible.md", concept)
    (root / "knowledge/index.md").write_text(
        frontmatter("knowledge-index", "index", args.steward_id, args.date).replace("version: 1", "version: 2") + """# Knowledge Index

No local concepts have been promoted.

## Proposed candidates

- [The First Loop Is Legible](concepts/first-loop-is-legible.md)
""", encoding="utf-8", newline="\n",
    )
    decision = frontmatter("DEC-0001", "decision", args.steward_id, args.date, "intent: INT-0001\n").replace("status: active", "status: proposed") + """# DEC-0001: Accept or Amend the First Contribution

## Decision proposed

Accept or amend the bounded first contribution after local guard review.

## Basis and evidence

- [Synthetic bootstrap observation](../evidence/sources/synthetic-bootstrap-observation.md)

## Consequences and retained judgment

No institutional adoption occurs through this proposal. Final disposition
remains with the local steward.
"""
    write_new(root / "decisions/DEC-0001-first-contribution.md", decision)

    warrant = {
        "version": "v0", "warrant_id": args.warrant_id,
        "agent": args.agent_string, "action": "zenos.task.commission",
        "target": "WS-0001/D-001", "content_hash": f"sha256:{intent_hash}",
        "from": None, "issued_at": args.issued_at,
        "context": {"intent": "INT-0001", "workspace": "WS-0001", "delegation": "D-001", "synthetic": True},
    }
    observation_warrant = {
        "version": "v0", "warrant_id": args.observation_warrant_id,
        "agent": args.agent_string, "action": "zenos.evidence.observe",
        "target": "evidence/sources/synthetic-bootstrap-observation.md",
        "content_hash": f"sha256:{source_hash}", "from": args.warrant_id,
        "issued_at": args.issued_at,
        "context": {"intent": "INT-0001", "workspace": "WS-0001", "delegation": "D-001", "synthetic": True},
    }
    month = args.date[:7].replace("-", "/")
    write_new(
        root / f"evidence/warrants/{args.agent_string}/{month}.jsonl",
        json.dumps(warrant, separators=(",", ":")) + "\n" +
        json.dumps(observation_warrant, separators=(",", ":")) + "\n",
    )
    print(f"Drafted synthetic house at {root}")
    print(f"INT-0001 sha256:{intent_hash}")
    print("Review, commit with mapped identity, and run .github/scripts/run_checks.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
