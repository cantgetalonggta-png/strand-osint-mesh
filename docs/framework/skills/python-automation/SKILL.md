---
name: python-automation
description: "Python OSINT automation scaffold with pydantic AppState, breadcrumb JSONL logging, multi-engine stubs, metadata extract, snapshot diff, and Orchestrator.run. Use when implementing automation or teaching the skeleton."
type: tool
lifecycle: active
---

# Python Automation

## Core API
- `AppState` — targets, results, logs
- `breadcrumb(event, data)` — JSONL append
- `google_search` / `bing_search` / `yandex_search`
- `shodan_lookup` / `censys_lookup` — **educational stubs; authorized use only**
- `extract_metadata(file_path)` — exiftool wrapper
- `diff_snapshots(old, new)`
- `Orchestrator.run(target)` — fan-out multi-engine

## Rules
- Every function breadcrumbs
- No hardcoded secrets
- Prefer synthetic/authorized targets in demos

## References
- `references/orchestrator_skeleton.py`
- `../../references/clean-vault/python_automation_system.py`
