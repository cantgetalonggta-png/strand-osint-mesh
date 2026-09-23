---
name: alteration-detection
description: "Detect content/integrity changes via signals (removed pages, altered metadata, mismatched timestamps, cloaking, certificate changes) using snapshot diff, header analysis, CT logs."
type: workflow
lifecycle: active
---

# Alteration Detection

## Signals
removed pages · altered metadata · mismatched timestamps · cloaking · certificate changes

## Tools
snapshot diff · header analysis · certificate transparency logs

## Procedure
1. Baseline capture
2. Current capture
3. Diff + signal scoring
4. Timeline note + breadcrumb(`snapshot_diff`)
5. Share to WEFT logic map

## Caution
Certificate change alone ≠ compromise. Evidence chain required.
