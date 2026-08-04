# Contributing to This Candidate

RC0 is private and review-only. Contribution does not imply acceptance.

1. Work from an issue, intent, or recorded delegation.
2. Create a branch; do not push directly to the protected default branch.
3. Preserve author identity and add `Signed-off-by:` when requested by the
   receiving repository.
4. Run `python .github/scripts/run_checks.py` from a clean committed tree.
5. Open a pull request describing scope, provenance, rights, security impact,
   and tests.
6. Never use `pull_request_target` to execute untrusted fork code and never
   expose secrets to pull-request jobs.

No contributor may import living-house records, client data, credentials, or
uncleared third-party material. See `GOVERNANCE.md` and `SECURITY.md`.
