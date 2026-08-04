#!/usr/bin/env python3
"""Build or verify RC0's deterministic, explicit allowlist manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
SOURCE_COMMIT = "d5325bddc20da56d9cd40cf25cbfd9a1bd532ce7"
MANIFEST_PATH = "provenance/manifest.json"
PROVENANCE_PATH = "provenance/release-provenance.json"
CONTROL_PATHS = {MANIFEST_PATH, PROVENANCE_PATH}

EXACT = {
    "constitution/RFC-0000-constitution-v2.md": "constitution/RFC-0000-constitution-v2.md",
    "constitution/RFC-0001-composition.md": "constitution/RFC-0001-composition.md",
    "constitution/RFC-0002-dynamics.md": "constitution/RFC-0002-dynamics.md",
    "constitution/RFC-0003-knowing.md": "constitution/RFC-0003-knowing.md",
    "constitution/RFC-0004-participation.md": "constitution/RFC-0004-participation.md",
    "constitution/RFC-0005-instantiation.md": "constitution/RFC-0005-instantiation.md",
    "constitution/RFC-0006-access.md": "constitution/RFC-0006-access.md",
    "constitution/RFC-0007-deliberation.md": "constitution/RFC-0007-deliberation.md",
    "LICENSE": "workspaces/WS-0028-public-readiness-and-sustainable-ci/notes/license-set/LICENSE",
    "LICENSE-docs": "workspaces/WS-0028-public-readiness-and-sustainable-ci/notes/license-set/LICENSE-docs",
    "NOTICE": "workspaces/WS-0028-public-readiness-and-sustainable-ci/notes/license-set/NOTICE",
}

AUTHORED = {
    ".gitattributes", ".github/scripts/run_checks.py", ".github/workflows/constitutional-ci.yml", ".gitignore",
    "ADOPTION.md", "AGENTS.md", "CONTRIBUTING.md", "GOVERNANCE.md", "ONBOARDING.md", "README.md",
    "RIGHTS-STATUS.md", "SECURITY.md", "SUPPORT.md", "WELCOME.md",
    "archive/README.md", "archive/evidence/.gitkeep", "archive/projects/.gitkeep", "archive/workspaces/.gitkeep",
    "constitution/PROVENANCE.md", "decisions/README.md", "decisions/templates/decision.md",
    "decisions/templates/deliberation.md", "evidence/README.md", "evidence/sources/README.md",
    "evidence/warrants/README.md", "evidence/warrants/warrant-example.json", "examples/first-cycle.md",
    "inbox/README.md", "intents/README.md", "intents/progress/README.md", "intents/progress/index.md",
    "intents/progress/template.md", "intents/templates/intent.md", "knowledge/README.md", "knowledge/index.md",
    "knowledge/log.md", "knowledge/templates/concept.md", "modules/registry.md", "participants/README.md",
    "participants/authors-map.md", "participants/templates/agent.md", "participants/templates/human.md",
    "projects/README.md", "projects/templates/project.md", "provenance/FORK-SECURITY.md",
    "provenance/DISCLOSURE-REVIEW.md", "provenance/SOURCE-PROVENANCE.md", "provenance/VALIDATION.md",
    "provenance/build-authors-map.md", "tools/bootstrap_instance.py",
    "tools/build_manifest.py", "tools/verify_release.py", "workflows/README.md", "workflows/bootstrap.md",
    "workflows/deliberation.md", "workflows/intent-progress.md", "workflows/returned-wisdom.md",
    "workspaces/README.md", "workspaces/templates/delegations.md", "workspaces/templates/workspace.md",
}


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def source_bytes(repo: Path, source_path: str) -> bytes:
    result = subprocess.run(
        [
            "git", "-c", f"safe.directory={repo}", "-C", str(repo), "show",
            f"{SOURCE_COMMIT}:{source_path}",
        ],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    if result.returncode:
        raise RuntimeError(result.stderr.decode("utf-8", "replace").strip())
    return result.stdout


def all_output_paths() -> set[str]:
    paths: set[str] = set()
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        paths.add(path.relative_to(ROOT).as_posix())
    return paths


def validate_path(path: str) -> None:
    pure = PurePosixPath(path)
    if pure.is_absolute() or ".." in pure.parts or ":" in path or "\\" in path:
        raise RuntimeError(f"unsafe target path: {path}")


def build(source_repo: Path) -> tuple[dict, dict]:
    allowed = set(EXACT) | AUTHORED | CONTROL_PATHS
    actual = all_output_paths()
    extras = sorted(actual - allowed)
    missing = sorted((set(EXACT) | AUTHORED) - actual)
    if extras or missing:
        raise RuntimeError(f"allowlist mismatch; extras={extras}; missing={missing}")
    if len({p.lower() for p in allowed}) != len(allowed):
        raise RuntimeError("case-colliding allowlist paths")

    entries = []
    for target in sorted(set(EXACT) | AUTHORED, key=lambda p: p.encode("utf-8")):
        validate_path(target)
        data = (ROOT / target).read_bytes()
        if target in EXACT:
            expected = source_bytes(source_repo, EXACT[target])
            if data != expected:
                raise RuntimeError(f"exact-copy mismatch: {target}")
            origin = "zen-os-exact-copy"
            source_path = EXACT[target]
            source_hash = sha256(expected)
            if target.startswith("constitution/"):
                rights = "RIGHTS-STATUS.md#candidate-rights-status; private-evaluation-only"
                disclosure = "private-rc0-reviewed-exact-constitutional-source"
                role = "normative-core"
            else:
                rights = "WS-0028/D-007 candidate; redistribution-gate-open"
                disclosure = "private-rc0-license-candidate"
                role = "candidate-license"
        else:
            origin = "authored-for-rc0"
            source_path = None
            source_hash = None
            rights = "WS-0028/D-010 original integration; redistribution-gate-open"
            disclosure = "private-rc0-reviewed-new-artifact"
            role = "operating-core"
        entries.append({
            "target_path": target,
            "output_sha256": sha256(data),
            "origin": origin,
            "source_path": source_path,
            "source_sha256": source_hash,
            "mode": "exact-copy" if target in EXACT else "authored-for-rc0",
            "role": role,
            "required": True,
            "disclosure_class": disclosure,
            "rights_ref": rights,
            "canonical_after_instantiation": "local-instance",
            "update_policy": "local-steward-proposal-only",
        })

    digest_input = b"".join(
        e["target_path"].encode("utf-8") + b"\0" + e["output_sha256"].encode("ascii") + b"\n"
        for e in entries
    )
    manifest = {
        "schema_version": "zenos-rc0-manifest-v1",
        "release_id": "RC0-private-candidate",
        "source": {
            "repository": "zenbanez/zen-os (private)",
            "git_object_format": "sha1",
            "source_commit_oid": SOURCE_COMMIT,
        },
        "build": {
            "procedure_ref": "tools/build_manifest.py",
            "procedure_sha256": next(e["output_sha256"] for e in entries if e["target_path"] == "tools/build_manifest.py"),
            "deterministic_inputs_only": True,
        },
        "review": {
            "build_authority": "INT-0029 / WS-0028/D-010",
            "rights_review": "pending independent review",
            "disclosure_review": "pending independent review",
            "security_review": "RC0 local checks only; independent review pending",
            "adoption_decision_ref": None,
        },
        "control_paths": sorted(CONTROL_PATHS),
        "excluded_classes": [
            "private-instance-record", "evidence-source", "warrant-trail",
            "participant-registry", "generated-status", "credential-or-runtime",
            "client-data", "rights-uncleared-binary",
        ],
        "entries": entries,
        "output_content_sha256": sha256(digest_input),
    }
    manifest_bytes = (json.dumps(manifest, indent=2, ensure_ascii=False) + "\n").encode("utf-8")
    provenance = {
        "schema_version": "zenos-rc0-provenance-v1",
        "release_id": "RC0-private-candidate",
        "source_commit_oid": SOURCE_COMMIT,
        "manifest_sha256": sha256(manifest_bytes),
        "output_content_sha256": manifest["output_content_sha256"],
        "history_posture": "clean target history; no source Git objects copied",
        "publication_authorized": False,
        "field_deployment_authorized": False,
    }
    return manifest, provenance


def sync_exact_copies(source_repo: Path) -> None:
    for target, source_path in EXACT.items():
        destination = ROOT / target
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(source_bytes(source_repo, source_path))


def normalize_authored_text() -> None:
    """Materialize authored RC0 files with host-neutral LF bytes."""
    for target in AUTHORED:
        path = ROOT / target
        data = path.read_bytes()
        if b"\0" in data:
            raise RuntimeError(f"authored output is not text: {target}")
        path.write_bytes(data.replace(b"\r\n", b"\n").replace(b"\r", b"\n"))


def serialized(value: dict) -> bytes:
    return (json.dumps(value, indent=2, ensure_ascii=False) + "\n").encode("utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-repo", required=True, type=Path)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()
    source_repo = args.source_repo.resolve()
    if args.write:
        # Materialize from committed Git blobs, not a source working tree or
        # git-archive checkout filters. This prevents silent EOL conversion.
        sync_exact_copies(source_repo)
        normalize_authored_text()
    manifest, provenance = build(source_repo)
    expected_manifest, expected_provenance = serialized(manifest), serialized(provenance)
    if args.write:
        (ROOT / MANIFEST_PATH).write_bytes(expected_manifest)
        (ROOT / PROVENANCE_PATH).write_bytes(expected_provenance)
        print(f"manifest_sha256={sha256(expected_manifest)}")
        print(f"output_content_sha256={manifest['output_content_sha256']}")
        return 0
    for rel, expected in ((MANIFEST_PATH, expected_manifest), (PROVENANCE_PATH, expected_provenance)):
        if not (ROOT / rel).exists() or (ROOT / rel).read_bytes() != expected:
            raise RuntimeError(f"generated control file differs: {rel}")
    print("PASS: deterministic allowlist manifest and exact-copy verification")
    print(f"manifest_sha256={sha256(expected_manifest)}")
    print(f"output_content_sha256={manifest['output_content_sha256']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
