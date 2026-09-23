---
name: osint-workflow
description: "Macro OSINT workflow spine: Start → recon → enumeration → extraction → analysis → reporting. Use to stage investigations and tag findings."
type: orchestrator
lifecycle: active
---

# OSINT Workflow

## Spine
**Start → recon → enumeration → extraction → analysis → reporting**

## Rules
- Default order is law (D-LAW-09)
- Nested domain playbook (9 steps) lives inside recon→report
- Stage transitions breadcrumbed
- Feedback loop may return to earlier stage after hivemind share
