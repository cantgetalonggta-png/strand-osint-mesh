---
name: metadata-extraction
description: "Extract and structure file metadata with exiftool, pdfinfo, strings, hashdeep covering EXIF, IPTC, XMP, PDF, Office, hashes, timestamps. Use for provenance (STAMP lane)."
type: workflow
lifecycle: active
---

# Metadata Extraction

## Tools
exiftool · pdfinfo · strings · hashdeep

## Types
EXIF · IPTC · XMP · PDF metadata · Office metadata · Hashes · Timestamps

## Procedure
1. Identify file class
2. Select tool
3. Extract + breadcrumb(`metadata_extract`)
4. Emit metadata card (fields + hash)
5. Share to hivemind / feed alteration detection

## Safety
Authorized or public files only.
