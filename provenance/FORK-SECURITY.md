# Fork and Hosted-CI Security

The hosted adapter uses `pull_request`, never `pull_request_target`, with
`contents: read` and no write permissions. It does not consume repository
secrets, comment on pull requests, upload private artifacts, or execute code
from a privileged base context.

Required repository settings before any public release:

1. protect the default branch and require the constitutional check;
2. require human review and dismiss stale approvals;
3. prohibit force pushes and branch deletion;
4. keep workflow permissions read-only by default;
5. require approval for first-time external contributors where supported;
6. audit Actions logs and artifact retention; and
7. verify the ruleset in the actual public repository after visibility change.

These settings are operator gates, not properties this Git tree can prove.
