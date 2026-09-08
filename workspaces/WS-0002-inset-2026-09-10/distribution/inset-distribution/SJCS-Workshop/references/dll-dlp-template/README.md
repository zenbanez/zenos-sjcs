<!-- Copy for the INSET USB distribution. The governed record with
     its frontmatter lives in the house at
     workspaces/WS-0002-inset-2026-09-10/references/ -- this copy is a
     participant-facing duplicate and is not a separate record. -->

# DLL / DLP template — official source and transcription

## What's here

- **`DO_s2016_042.pdf`** — the official DepEd Order 42, s. 2016, "Policy
  Guidelines on Daily Lesson Preparation for the K to 12 Basic Education
  Program," fetched from `deped.gov.ph/wp-content/uploads/2016/06/DO_s2016_042.pdf`.
  62 pages, scanned June 17, 2016, signed by Secretary Br. Armin A. Luistro
  FSC. This is the source of record.
- **`dll-dlp-template.md`** — a plain-text transcription of the blank DLL
  forms (Annex 1A, Kindergarten; Annex 1B, Grades 1–12) and a description of
  the DLP's structure, made because the source PDF is a scanned image with
  almost no text layer — the same "AI client reads it poorly" problem the
  distribution's own README already warns about for scanned forms.

## Why a transcription, not just the PDF

Confirmed by direct inspection (`pypdf` text extraction): of the PDF's 62
pages, only one carries any embedded text at all ("(Enclosure to DepEd Order
No. 42, s. 2016)" on page 3). The rest are pure scanned images. An AI client
pointed at this folder would not be able to read the template's field
structure from the PDF alone. The transcription in `dll-dlp-template.md`
exists so the actual field labels and structure are usable, not just
archived.

## What was verified, and how

- Rendered all 62 pages to PNG at 150dpi (PyMuPDF, no external dependency)
  and visually inspected the cover page, the full body text explaining DLL
  and DLP (§§A–H), Annex 1A (Kindergarten DLL, all 3 pages), and Annex 1B
  (Grades 1–12 DLL, both pages).
- Confirmed genuine: DepEd letterhead, correct order number and date on the
  cover, "(Enclosure to DepEd Order No. 42, s. 2016)" header repeated on
  annex pages, and the Secretary's signature block.
- The transcription's field labels, block order, and procedure steps (A–J)
  are copied directly from what is visible in the rendered pages — not
  reconstructed from memory of how DepEd forms typically look.
- Annexes 1C (Filipino-language DLL) and 1D (Multigrade DLL) were located in
  the PDF but not transcribed, noted in `dll-dlp-template.md`.
- No separate blank DLP table exists in this document — confirmed by reading
  §H (paragraphs 46–55) directly, which states the DLP shares the DLL's six
  components in narrative form for a single day, not a distinct table
  annex.

## What this does not establish

- Whether DepEd Tacloban or San Jose Central School use this national
  template unmodified, or a locally adapted version. A search of DepEd
  Region VIII's regional memoranda and SDO Tacloban City's own memo
  repository (zero memos currently uploaded there) found no Division- or
  school-specific override — see
  [`../matatag-curriculum-guides/README.md`](../matatag-curriculum-guides/README.md)
  for the same search, run under the same delegation.
- Whether DO 42, s. 2016 has been superseded in whole by a later national
  order. Search found SY2024-2025 clarificatory guidance (DepEd Memorandum
  497, s. 2024) layered on top of it, not a replacement of the DLL/DLP forms
  themselves.

## Rights

Publicly issued DepEd policy document, sourced from DepEd's own official
site. Held here for this house's own operational use; this repository stays
private per this workspace's standing posture.
