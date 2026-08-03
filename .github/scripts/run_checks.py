#!/usr/bin/env python3
"""Host-neutral, dependency-free constitutional checks for a ZenOS base house."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REQUIRED_META = {"id", "type", "status", "version", "steward", "created", "updated", "supersedes"}
WARRANT_FIELDS = {"version", "warrant_id", "agent", "action", "target", "content_hash", "from", "issued_at"}
REQUIRED_PATHS = [
    "constitution", "intents", "intents/progress", "participants", "workspaces",
    "evidence/sources", "evidence/warrants", "knowledge", "decisions", "projects",
    "workflows", "inbox", "archive", "modules", "provenance", "AGENTS.md",
    "ONBOARDING.md", ".github/workflows/constitutional-ci.yml",
]


def git(*args: str, check: bool = True) -> str:
    result = subprocess.run(
        ["git", *args], cwd=ROOT, text=True, encoding="utf-8",
        stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    if check and result.returncode:
        raise RuntimeError(result.stderr.strip() or f"git {' '.join(args)} failed")
    return result.stdout


def git_succeeds(*args: str) -> bool:
    return subprocess.run(
        ["git", *args], cwd=ROOT, stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    ).returncode == 0


def tracked_files() -> list[Path]:
    return [ROOT / p for p in git("ls-files").splitlines() if p]


def parse_frontmatter(path: Path) -> dict[str, str] | None:
    text = path.read_text(encoding="utf-8")
    lines = text.replace("\r\n", "\n").split("\n")
    if not lines or lines[0] != "---":
        return None
    try:
        end = lines.index("---", 1)
    except ValueError:
        raise ValueError(f"{path.relative_to(ROOT)} has unclosed frontmatter")
    meta: dict[str, str] = {}
    for line in lines[1:end]:
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"{path.relative_to(ROOT)} has malformed frontmatter line: {line}")
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip().strip('"\'')
    return meta


def is_template(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix().lower()
    return "/templates/" in f"/{rel}" or rel.endswith("/template.md") or "example" in path.name.lower()


def check_clean_tree() -> list[str]:
    problems = []
    if not git_succeeds("diff", "--quiet") or not git_succeeds("diff", "--cached", "--quiet"):
        problems.append("worktree or index is dirty; checks read committed Git objects")
    return problems


def check_append_only() -> list[str]:
    problems: list[str] = []
    for path in tracked_files():
        if "evidence/warrants" not in path.as_posix() or path.suffix != ".jsonl":
            continue
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                problems.append(f"{path.relative_to(ROOT)}:{number}: blank warrant line")
                continue
            try:
                item = json.loads(line)
            except json.JSONDecodeError as exc:
                problems.append(f"{path.relative_to(ROOT)}:{number}: invalid JSON: {exc}")
                continue
            missing = WARRANT_FIELDS - item.keys()
            if missing:
                problems.append(f"{path.relative_to(ROOT)}:{number}: missing {sorted(missing)}")
            if not re.fullmatch(r"w_[A-Za-z0-9]{10,}", str(item.get("warrant_id", ""))):
                problems.append(f"{path.relative_to(ROOT)}:{number}: non-random-style warrant_id")
            if not re.fullmatch(r"sha256:[0-9a-f]{64}", str(item.get("content_hash", ""))):
                problems.append(f"{path.relative_to(ROOT)}:{number}: invalid content_hash")

    base = "origin/main"
    if git("rev-parse", "--verify", base, check=False).strip():
        diff = git("diff", "--unified=0", f"{base}...HEAD", "--", "evidence/warrants")
        for line in diff.splitlines():
            if line.startswith("-") and not line.startswith("---"):
                problems.append("warrant trail deletion or modification detected against origin/main")
                break
    return problems


def record_markdown(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if path.suffix != ".md" or is_template(path) or path.name == "README.md":
        return False
    return rel.startswith(("intents/", "participants/humans/", "participants/agents/", "participants/machinery/", "workspaces/", "decisions/", "projects/"))


def check_frontmatter() -> list[str]:
    problems: list[str] = []
    for path in tracked_files():
        if not record_markdown(path):
            continue
        try:
            meta = parse_frontmatter(path)
        except ValueError as exc:
            problems.append(str(exc))
            continue
        if meta is None:
            problems.append(f"{path.relative_to(ROOT)}: record lacks frontmatter")
            continue
        missing = REQUIRED_META - meta.keys()
        if missing:
            problems.append(f"{path.relative_to(ROOT)}: missing metadata {sorted(missing)}")
    return problems


def check_id_uniqueness() -> list[str]:
    seen: dict[str, str] = {}
    problems: list[str] = []
    for path in tracked_files():
        if path.suffix != ".md" or is_template(path):
            continue
        try:
            meta = parse_frontmatter(path)
        except ValueError:
            continue
        if not meta or not meta.get("id"):
            continue
        identifier = meta["id"]
        rel = path.relative_to(ROOT).as_posix()
        if identifier in seen:
            problems.append(f"duplicate id {identifier!r}: {seen[identifier]} and {rel}")
        else:
            seen[identifier] = rel
    return problems


def mapped_authors() -> set[str]:
    values: set[str] = set()
    for rel in ("participants/authors-map.md", "provenance/build-authors-map.md"):
        path = ROOT / rel
        if not path.exists():
            continue
        for match in re.finditer(r"`([^`]+\s<[^`<>]+>)`", path.read_text(encoding="utf-8")):
            values.add(match.group(1))
    return values


def check_author_mapping() -> list[str]:
    problems: list[str] = []
    allowed = mapped_authors()
    raw = git("log", "--format=%an <%ae>%x1f%B%x1e")
    for record in raw.split("\x1e"):
        if not record.strip():
            continue
        author, _, body = record.partition("\x1f")
        author = author.strip()
        if author not in allowed:
            problems.append(f"unmapped Git author: {author}")
        # Ambiguous mappings are handled by receiving-house extensions. The
        # base map contains no ambiguous real rows.
        if author.count("<") != 1:
            problems.append(f"malformed Git author: {author}")
    return sorted(set(problems))


def check_delegation_references() -> list[str]:
    problems: list[str] = []
    delegation_text = "\n".join(
        p.read_text(encoding="utf-8") for p in tracked_files()
        if p.name == "delegations.md" and not is_template(p)
    )
    for path in tracked_files():
        if "evidence/warrants" not in path.as_posix() or path.suffix != ".jsonl":
            continue
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            try:
                item = json.loads(line)
            except json.JSONDecodeError:
                continue
            delegation = item.get("context", {}).get("delegation") if isinstance(item.get("context"), dict) else None
            if delegation and delegation.split("/")[-1] not in delegation_text:
                problems.append(f"{path.relative_to(ROOT)}:{number}: delegation {delegation!r} not found")
    return problems


def check_layout() -> list[str]:
    return [f"missing required path: {path}" for path in REQUIRED_PATHS if not (ROOT / path).exists()]


CHECKS = [
    ("Clean committed state", check_clean_tree),
    ("Append-only warrant trails", check_append_only),
    ("Record frontmatter and versioning", check_frontmatter),
    ("Identifier uniqueness", check_id_uniqueness),
    ("Participant and build-author mapping", check_author_mapping),
    ("Delegation references", check_delegation_references),
    ("Layout conformance", check_layout),
]


def main() -> int:
    failed = False
    for name, check in CHECKS:
        try:
            problems = check()
        except Exception as exc:  # fail closed with a visible cause
            problems = [f"check crashed: {exc}"]
        if problems:
            failed = True
            print(f"FAIL: {name}")
            for problem in problems:
                print(f"  - {problem}")
        else:
            print(f"PASS: {name}")
    print("\nLOCAL CONSTITUTIONAL RESULT: " + ("FAIL" if failed else "PASS"))
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
