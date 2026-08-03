# Security Posture

## Reporting

While RC0 remains private, report suspected vulnerabilities directly to the
repository steward through the private channel they designate. Do not open a
public issue containing exploit details, credentials, or personal data.

## Repository rules

- no secrets, `.env` files, keyrings, databases, dumps, backups, or volumes;
- no real client or constituent data;
- pull-request workflows use read-only contents permission and never
  `pull_request_target`;
- fork contributions receive no repository secrets;
- default-branch merge remains a human-steward judgment; and
- security controls for a deployed instance are local responsibilities and
  must be reviewed before real sensitive data enters.

The base house is not a production security boundary. Access control, key
custody, backup/restore, audit/correction, retention, incident response, and
operator responsibility belong to each deployment profile.
