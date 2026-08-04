# Warrant Trails

Each issuer owns one append-only path:

`evidence/warrants/<source-purpose-version>/YYYY/MM.jsonl`

Minimum fields are `version`, `warrant_id`, `agent`, `action`, `target`,
`content_hash`, `from`, and `issued_at`. IDs use random suffixes. A root
commission warrant has `from: null` and binds its content hash to the exact
governing intent bytes.

Never copy a warrant trail from another house. New instances create their own
roots and relationships.
