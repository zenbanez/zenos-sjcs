#!/usr/bin/env python3
"""Containment checks for the private RC0 candidate."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_EXTENSIONS = {".md", ".json", ".jsonl", ".py", ".yml", ".yaml", ".txt", ""}
SECRET_PATTERNS = {
    "private key": rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
    "GitHub token": rb"\bgh[pousr]_[A-Za-z0-9]{20,}\b",
    "AWS access key": rb"\bAKIA[0-9A-Z]{16}\b",
    "absolute Windows user path": rb"[A-Za-z]:\\Users\\[^\\\s]+",
    "absolute Unix home path": rb"/(?:home|Users)/[^/\s]+/",
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-repo", required=True, type=Path)
    args = parser.parse_args()
    subprocess.run(
        ["python", str(ROOT / "tools/build_manifest.py"), "--source-repo", str(args.source_repo.resolve()), "--check"],
        cwd=ROOT, check=True,
    )
    manifest = json.loads((ROOT / "provenance/manifest.json").read_text(encoding="utf-8"))
    problems: list[str] = []
    binary_paths: list[str] = []
    for entry in manifest["entries"]:
        rel = entry["target_path"]
        path = ROOT / rel
        if path.is_symlink():
            problems.append(f"symlink prohibited: {rel}")
            continue
        data = path.read_bytes()
        if b"\0" in data or path.suffix.lower() not in TEXT_EXTENSIONS:
            binary_paths.append(rel)
        for label, pattern in SECRET_PATTERNS.items():
            if re.search(pattern, data):
                problems.append(f"{label} pattern in {rel}")

    if binary_paths:
        problems.append(f"unallowlisted binary-like files: {binary_paths}")
    workflow = (ROOT / ".github/workflows/constitutional-ci.yml").read_text(encoding="utf-8")
    if "pull_request_target" in workflow:
        problems.append("hosted workflow uses pull_request_target")
    if not re.search(r"permissions:\s*\n\s+contents:\s*read", workflow):
        problems.append("hosted workflow is not explicitly read-only")
    if "secrets." in workflow:
        problems.append("hosted workflow references repository secrets")

    # Exact constitutional attribution is expected and explained. It is not a
    # local participant registry. Any other private-house identity disclosure
    # belongs in independent review rather than being silently ignored.
    explained = []
    for name in ("Zen Bañez", "Aletheios"):
        count = sum((ROOT / e["target_path"]).read_text(encoding="utf-8", errors="ignore").count(name) for e in manifest["entries"])
        if count:
            explained.append(f"{name}: {count} exact-source attribution occurrence(s)")

    if problems:
        print("RC0 CONTAINMENT RESULT: FAIL")
        for problem in problems:
            print(f"  - {problem}")
        return 1
    print("PASS: no secrets, absolute user paths, symlinks, or unallowlisted binaries")
    print("PASS: hosted CI is read-only, fork-safe by file inspection, and consumes no secrets")
    for item in explained:
        print(f"EXPLAINED: {item}")
    print("RC0 CONTAINMENT RESULT: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
